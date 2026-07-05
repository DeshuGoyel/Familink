import { useOpsStore } from '../store/useOpsStore';

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
}

async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { token } = useOpsStore.getState();
  const { params, headers: customHeaders, ...rest } = options;

  let url = `${API_BASE_URL}${endpoint}`;
  if (params) {
    const searchParams = new URLSearchParams(params);
    url += `?${searchParams.toString()}`;
  }

  const headers = new Headers(customHeaders);
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  headers.set('Content-Type', 'application/json');

  const response = await fetch(url, {
    ...rest,
    headers,
    credentials: 'include',
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message = errorData.error?.message || errorData.message || `Request failed with status ${response.status}`;
    const code = errorData.error?.code || errorData.code;
    const reqId = errorData.error?.request_id || errorData.requestId || response.headers.get('x-request-id') || undefined;
    throw new ApiError(message, response.status, code, reqId);
  }

  return response.json();
}

export const opsApi = {
  get: <T>(endpoint: string, options?: RequestOptions) => 
    request<T>(endpoint, { ...options, method: 'GET' }),
  
  post: <T>(endpoint: string, body?: unknown, options?: RequestOptions) => 
    request<T>(endpoint, { ...options, method: 'POST', body: JSON.stringify(body) }),
  
  put: <T>(endpoint: string, body?: unknown, options?: RequestOptions) => 
    request<T>(endpoint, { ...options, method: 'PUT', body: JSON.stringify(body) }),
  
  delete: <T>(endpoint: string, options?: RequestOptions) => 
    request<T>(endpoint, { ...options, method: 'DELETE' }),
};
