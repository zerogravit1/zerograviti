export {};

declare global {
  interface Window {
    gtag?: (
      command: 'event' | 'config' | 'js',
      targetOrEventName: string | Date,
      params?: Record<string, unknown>,
    ) => void;
  }
}