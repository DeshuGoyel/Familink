import { useOpsStore } from '../store/useOpsStore';
import { encryptPayload, decryptPayload, getDeviceId, getNextSequenceNumber } from './aeadClient';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/v1';

export class ApiError extends Error {
  status: number;
  code?: string;
  requestId?: string;

  constructor(message: string, status: number, code?: string, requestId?: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.requestId = requestId;
  }
}

interface RequestOptions extends RequestInit {
  params?: Record<string, string>;
  skipAead?: boolean;
}

interface SuccessEnvelope<T> {
  data: T;
  requestId: string;
}

async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { token } = useOpsStore.getState();
  const { params, headers: customHeaders, skipAead = true, body, ...rest } = options;

  let url = `${API_BASE_URL}${endpoint}`;
  if (params) {
    const searchParams = new URLSearchParams(params);
    url += `?${searchParams.toString()}`;
  }

  const requestId = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2) + Date.now().toString(36);
  const timestamp = Math.floor(Date.now() / 1000);
  const seq = getNextSequenceNumber();
  const deviceId = getDeviceId();

  const headers = new Headers(customHeaders);
  headers.set('x-request-id', requestId);
  headers.set('x-seq', seq.toString());
  headers.set('x-timestamp', timestamp.toString());
  headers.set('x-device-id', deviceId);
  headers.set('x-idempotency-key', requestId);

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  let finalBody: BodyInit | undefined = undefined;

  if (body) {
    if (skipAead) {
      headers.set('Content-Type', 'application/json');
      finalBody = typeof body === 'string' ? body : JSON.stringify(body);
    } else {
      headers.set('Content-Type', 'application/json');
      const payloadObj = typeof body === 'string' ? JSON.parse(body) : body;
      const envelope = await encryptPayload(payloadObj, requestId, seq, timestamp);
      finalBody = JSON.stringify(envelope);
    }
  }

  const response = await fetch(url, {
    ...rest,
    headers,
    body: finalBody,
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message = errorData.error?.message || errorData.message || `Request failed with status ${response.status}`;
    const code = errorData.error?.code || errorData.code;
    const reqId = errorData.error?.request_id || errorData.requestId || response.headers.get('x-request-id') || undefined;
    throw new ApiError(message, response.status, code, reqId);
  }

  const jsonResult = await response.json();

  if (skipAead) {
    return jsonResult as T;
  }

  if (jsonResult && jsonResult.nonce && jsonResult.ciphertext) {
    const decryptedEnvelope = await decryptPayload<SuccessEnvelope<T>>(
      jsonResult,
      requestId,
      seq,
      timestamp
    );
    return decryptedEnvelope.data;
  }

  return jsonResult as T;
}

export const opsApi = {
  get: <T>(endpoint: string, options?: RequestOptions) => 
    request<T>(endpoint, { ...options, method: 'GET' }),
  
  post: <T>(endpoint: string, body?: unknown, options?: RequestOptions) => 
    request<T>(endpoint, { ...options, method: 'POST', body }),
  
  put: <T>(endpoint: string, body?: unknown, options?: RequestOptions) => 
    request<T>(endpoint, { ...options, method: 'PUT', body }),
  
  delete: <T>(endpoint: string, options?: RequestOptions) => 
    request<T>(endpoint, { ...options, method: 'DELETE' }),
};
