import sodium from 'libsodium-wrappers-sumo';

// Base64 URL-safe with no padding conversion helpers
export function toBase64Url(uint8Array: Uint8Array): string {
  let binary = '';
  const len = uint8Array.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(uint8Array[i]);
  }
  const base64 = btoa(binary);
  return base64
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

export function fromBase64Url(base64url: string): Uint8Array {
  let base64 = base64url.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  const binary = atob(base64);
  const len = binary.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

// Device configuration helpers
export function getDeviceId(): string {
  let deviceId = localStorage.getItem('tl_device_id');
  if (!deviceId) {
    deviceId = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2) + Date.now().toString(36);
    localStorage.setItem('tl_device_id', deviceId);
  }
  return deviceId;
}

export function getNextSequenceNumber(): number {
  const deviceId = getDeviceId();
  const key = `tl_seq_${deviceId}`;
  const seqStr = localStorage.getItem(key);
  let seq = seqStr ? parseInt(seqStr, 10) : 0;
  seq += 1;
  localStorage.setItem(key, seq.toString());
  return seq;
}

// AEAD Transport Crypto helpers
let cachedKey: Uint8Array | null = null;

export function getAeadKey(): Uint8Array {
  if (cachedKey) return cachedKey;
  let keyB64 = import.meta.env.VITE_SERVER_AEAD_KEY;
  if (!keyB64) {
    if (import.meta.env.DEV) {
      console.warn('VITE_SERVER_AEAD_KEY is not defined, falling back to development transport key.');
      keyB64 = 'IY7rssrYCCjx92L0S0Yl1M_Un_JktyajiirhVSGeswc';
    } else {
      throw new Error('VITE_SERVER_AEAD_KEY is not defined in environment variables');
    }
  }
  cachedKey = fromBase64Url(keyB64);
  return cachedKey;
}

const encoder = new TextEncoder();
const decoder = new TextDecoder();

export interface AeadEnvelope {
  nonce: string;
  ciphertext: string;
}

export async function encryptPayload<T>(
  payload: T,
  requestId: string,
  seq: number,
  timestamp: number
): Promise<AeadEnvelope> {
  await sodium.ready;
  
  const key = getAeadKey();
  const plaintext = encoder.encode(JSON.stringify(payload));
  
  // Associated Data (AAD) format: {request_id}|{seq}|{ts}
  const aadString = `${requestId}|${seq}|${timestamp}`;
  const aad = encoder.encode(aadString);
  
  // Generate random 24-byte nonce
  const nonce = sodium.randombytes_buf(24);
  
  // Encrypt using XChaCha20-Poly1305
  const ciphertext = sodium.crypto_aead_xchacha20poly1305_ietf_encrypt(
    plaintext,
    aad,
    null,
    nonce,
    key
  );
  
  return {
    nonce: toBase64Url(nonce),
    ciphertext: toBase64Url(ciphertext)
  };
}

export async function decryptPayload<T>(
  envelope: AeadEnvelope,
  requestId: string,
  seq: number,
  timestamp: number
): Promise<T> {
  await sodium.ready;
  
  const key = getAeadKey();
  const nonce = fromBase64Url(envelope.nonce);
  const ciphertext = fromBase64Url(envelope.ciphertext);
  
  const aadString = `${requestId}|${seq}|${timestamp}`;
  const aad = encoder.encode(aadString);
  
  const decrypted = sodium.crypto_aead_xchacha20poly1305_ietf_decrypt(
    null,
    ciphertext,
    aad,
    nonce,
    key
  );
  
  const plaintext = decoder.decode(decrypted);
  return JSON.parse(plaintext) as T;
}
