type AnalyticsEvent =
  | 'cta_click'
  | 'console_command';

type EventParams = Record<string, string | number | boolean>;

export function trackEvent(
  event: AnalyticsEvent,
  params: EventParams = {},
) {
  if (typeof window.gtag !== 'function') {
    return;
  }

  window.gtag('event', event, params);
}