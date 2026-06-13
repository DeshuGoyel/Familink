import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Analytics Interface
 * Standardizes event tracking across the platform
 */
export const trackEvent = (eventName: string, properties?: Record<string, unknown>) => {
  const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  if (typeof window !== 'undefined' && (window as any).gtag && gaId && gaId !== 'G-XXXXXXXXXX') {
    (window as any).gtag('event', eventName, properties);
  }
  // Console logging for dev mode parity
  if (import.meta.env.DEV) {
    console.log(`[Analytics] ${eventName}`, properties);
  }
};

export const AnalyticsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID;

  useEffect(() => {
    if (!gaId || gaId === 'G-XXXXXXXXXX') return;

    // Dynamically inject Google Tag Manager script
    if (!document.getElementById('gtag-script')) {
      const script = document.createElement('script');
      script.id = 'gtag-script';
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      document.head.appendChild(script);

      (window as any).dataLayer = (window as any).dataLayer || [];
      (window as any).gtag = function () {
        (window as any).dataLayer.push(arguments);
      };
      (window as any).gtag('js', new Date());
      (window as any).gtag('config', gaId, { anonymize_ip: true });
    }
  }, [gaId]);

  useEffect(() => {
    if (!gaId || gaId === 'G-XXXXXXXXXX') return;

    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('config', gaId, {
        page_path: location.pathname + location.search,
      });
    }
  }, [location, gaId]);

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
