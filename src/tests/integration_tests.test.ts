import { describe, it, expect, vi, beforeEach } from 'vitest';
import { api } from '../lib/api';

describe('API Client Integration Tests', () => {
  beforeEach(() => {
    vi.spyOn(global, 'fetch');
    localStorage.clear();
  });

  it('should_attach_idempotency_headers_and_request_metadata_automatically', async () => {
    const mockResponseData = { data: { success: true } };
    
    // Mock the global fetch to return a JSON response
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponseData
    });

    localStorage.setItem('tl_session_token', 'valid-jwt-token-xyz');
    
    await api.post('/app/waitlist', { email: 'test@familink.com' }, { skipAead: true });

    expect(global.fetch).toHaveBeenCalledTimes(1);
    const [calledUrl, calledOptions] = (global.fetch as any).mock.calls[0];
    
    const headers = calledOptions.headers;
    expect(headers.get('x-request-id')).toBeDefined();
    expect(headers.get('x-seq')).toBeDefined();
    expect(headers.get('x-timestamp')).toBeDefined();
    expect(headers.get('Authorization')).toBe('Bearer valid-jwt-token-xyz');
  });

  it('should_throw_an_error_when_response_is_not_ok_representing_http_failures', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: async () => ({ message: 'Invalid payload signature' })
    });

    await expect(
      api.post('/app/waitlist', { email: 'bad-email' }, { skipAead: true })
    ).rejects.toThrow('Invalid payload signature');
  });

  it('should_reject_requests_with_401_on_expired_or_absent_auth_tokens', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: false,
      status: 401,
      json: async () => ({ error: { message: 'Unauthorized session' } })
    });

    await expect(
      api.post('/vault/items/list', { user_id: '123' })
    ).rejects.toThrow('Unauthorized session');
  });
});
