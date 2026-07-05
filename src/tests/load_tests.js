import http from 'k6/http';
import { sleep, check } from 'k6';

const BASE_URL = __ENV.BASE_URL || 'http://localhost:8080/v1';

export const options = {
  scenarios: {
    // 1. Ramping & Baseline Load Test: 0 to 50 VUs over 30s, sustained at 50 VUs for 1m
    baseline: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '30s', target: 50 }, // Ramp-up
        { duration: '1m', target: 50 },  // Sustained load
        { duration: '15s', target: 0 },  // Ramp-down
      ],
      gracefulRampDown: '5s',
    },
    // 2. Spike Test: Sudden surge of 150 VUs
    spike: {
      executor: 'ramping-vus',
      startTime: '2m', // Start after baseline scenario
      startVUs: 0,
      stages: [
        { duration: '10s', target: 150 }, // Rapid spike
        { duration: '30s', target: 150 }, // Sustain spike
        { duration: '10s', target: 0 },   // Cool down
      ],
    }
  },
  thresholds: {
    // 95% of requests must complete under 400ms; error rate must be < 1%
    http_req_duration: ['p(95)<400'],
    http_req_failed: ['rate<0.01'],
  },
};

export default function () {
  const waitlistHeaders = {
    'Content-Type': 'application/json',
    'x-request-id': `loadtest-req-${__VU}-${__ITER}`,
    'x-device-id': 'loadtest-device-vu',
    'x-seq': `${__ITER}`
  };

  // Target waitlist signup endpoint
  const payload = JSON.stringify({
    email: `loadtest-user-${__VU}-${__ITER}@estate.org`,
    name: 'Load Tester VU'
  });

  // 1. POST waitlist signup
  const response = http.post(`${BASE_URL}/api/waitlist`, payload, {
    headers: waitlistHeaders,
  });

  check(response, {
    'is status 201 or 200': (r) => r.status === 201 || r.status === 200,
    'has position id': (r) => r.json().position !== undefined,
  });

  sleep(1 + Math.random() * 2); // Think time: 1-3 seconds
}
