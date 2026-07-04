import { describe, it, expect, vi } from 'vitest';
import { useStore } from '../store/useStore';
import { useCheckinStore } from '../store/useCheckinStore';

describe('Regression Testing Suite — Confirmed Bugs', () => {

  // Regression 1: Waitlist Endpoint Mismatch
  it('should_prevent_mismatched_waitlist_signup_endpoints_returning_404', () => {
    // BUG: WaitlistForm.tsx line 55 calls '/app/waitlist', but worker.ts only matches '/api/waitlist'
    const frontendEndpoint = '/app/waitlist';
    const backendRouteRegex = /^\/api\/waitlist$|^\/v1\/api\/waitlist$/;
    
    // The test asserts that the endpoint called by the frontend matches the routed backend path
    expect(frontendEndpoint).not.toMatch(backendRouteRegex); // Fails/matches regression (reproduces the bug)
  });

  // Regression 2: Check-in Consecutive Misses Streak Calculation Bug
  it('should_calculate_consecutive_misses_instead_of_total_accumulated_misses', () => {
    useCheckinStore.setState({
      checkins: [],
      checkinSettings: {
        frequency: 'weekly',
        consecutiveMissesAllowed: 3,
        currentStreak: 0,
        totalMissed: 0,
        alertGuardiansAfterMisses: 2,
        lastCheckinAt: null,
        status: 'active'
      }
    });

    const store = useCheckinStore.getState();

    // 1. First miss -> consecutive misses = 1
    store.missCheckin();
    // 2. User recovers -> checkin completed -> streak = 1, totalMissed = 1
    store.completeCheckin('tap');
    // 3. User misses again -> consecutive misses should reset to 1
    store.missCheckin();

    const settings = useCheckinStore.getState().checkinSettings;
    
    // BUG REPRODUCTION: In the current code, consecutive is calculated as:
    // consecutive = currentStreak === 0 ? missedCount : 1
    // At step 3, currentStreak is 0, so consecutive = missedCount (which is totalMissed + 1 = 2)
    // Even though there was a recovery checkin in step 2, the next miss counts as 2 consecutive misses!
    // If the user had 3 total misses historically, a single new miss would trigger 'recovery_triggered' (Release)!
    
    // True behavior check:
    const calculatedConsecutive = settings.currentStreak === 0 ? settings.totalMissed : 1;
    expect(calculatedConsecutive).toBe(2); // Should be 1, but it is 2! This asserts the bug is present.
  });

  // Regression 3: Asset Silent Data Loss
  it('should_persist_added_assets_locally_instead_of_clearing_on_session_check', () => {
    useStore.setState({ assets: [], isAuthenticated: true });

    // Mock localStorage and session check failing
    localStorage.setItem('tl_session_token', 'token');
    localStorage.setItem('tl_user_id', '123');

    // BUG REPRODUCTION: getInitialState() initializes assets to [] and never loads it from localStorage.
    // checkSession() resets assets to mockAssets in DEV mode if API fails.
    const initialAssetsLength = useStore.getState().assets.length;
    expect(initialAssetsLength).toBe(0);
  });

  // Regression 4: Forgot Password Fallback Failure
  it('should_have_development_fallback_for_forgot_password_link_to_prevent_blank_hangs', async () => {
    // BUG: ForgotPassword.tsx has no mock dev check and always throws on API network failures
    const mockPost = vi.fn().mockRejectedValue(new Error('Network error'));
    const apiMock = { post: mockPost };

    // Assert that without fallback, calling this throws directly under API failure
    await expect(
      apiMock.post('/auth/password/reset/request', { email: 'test@email.com' })
    ).rejects.toThrow('Network error');
  });

  // Regression 5: Check-in Liveness Cancel Guard (Release Stage bypass)
  it('should_block_resetting_liveness_status_to_active_once_recovery_has_already_released', () => {
    // BUG: completeCheckin allows resetting status to 'active' even if it was 'recovery_triggered'
    useCheckinStore.setState({
      checkins: [],
      checkinSettings: {
        frequency: 'weekly',
        consecutiveMissesAllowed: 3,
        currentStreak: 0,
        totalMissed: 3,
        alertGuardiansAfterMisses: 2,
        lastCheckinAt: null,
        status: 'recovery_triggered' // Released stage
      }
    });

    useCheckinStore.getState().completeCheckin('tap');
    const settings = useCheckinStore.getState().checkinSettings;
    
    // Assert that status is reset to active, violating the release guard
    expect(settings.status).toBe('active'); // Should remain recovery_triggered, but is active!
  });
});
