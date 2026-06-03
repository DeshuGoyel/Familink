import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Analytics Interface
 * Standardizes event tracking across the platform
 */
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as unknown).gtag) {
    (window as unknown).gtag('event', eventName, properties);
  }
  // Console logging for dev mode parity
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Analytics] ${eventName}`, properties);
  }
};

export const AnalyticsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    // Page View Tracking
    // PRODUCTION_READY: Replace G-XXXXXXXXXX with your actual Google Analytics 4 Measurement ID
    if (typeof window !== 'undefined' && (window as unknown).gtag) {
      (window as unknown).gtag('config', 'G-XXXXXXXXXX', {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  return <>{children}</>;
};

// Common Event Constants
export const EVENTS = {
  VAULT_INITIATED: 'vault_initiated',
  HEARTBEAT_SYNC: 'heartbeat_sync',
  RESOURCE_CLICK: 'resource_click',
  TOOL_USED: 'tool_used',
  PLANNER_COMPLETED: 'planner_completed',
  WHITEPAPER_VIEWED: 'whitepaper_viewed',
  COORDINATOR_INVITED: 'coordinator_invited',
};
