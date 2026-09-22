import { afterEach, describe, expect, it, vi } from 'vitest';

import { trackEvent } from '../src/analytics';

afterEach(() => {
  delete window.gtag;
});

describe('trackEvent', () => {
  it('sends an event to Google Analytics', () => {
    window.gtag = vi.fn();

    trackEvent('cta_click', {
      action: 'github',
      location: 'hero'
    });

    expect(window.gtag).toHaveBeenCalledWith('event', 'cta_click', {
      action: 'github',
      location: 'hero'
    });
  });

  it('does nothing when Google Analytics is unavailable', () => {
    expect(() => {
      trackEvent('cta_click', {
        action: 'github',
        location: 'hero'
      });
    }).not.toThrow();
  });
});
