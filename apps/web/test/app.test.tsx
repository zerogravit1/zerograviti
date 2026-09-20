import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import App from '../src/App';

afterEach(() => {
  vi.useRealTimers();
});

describe('App', () => {
  it('reveals the command prompt after the startup sequence', () => {
    vi.useFakeTimers();
    render(<App />);

    expect(screen.queryByLabelText('System command')).toBeNull();

    act(() => {
      vi.runAllTimers();
    });

    expect(screen.getByLabelText('System command')).toBeDefined();
    expect(screen.getByText('ERROR: duplicate infrastructure detected')).toBeDefined();
    expect(screen.getByRole('button', { name: 'explore' })).toBeDefined();
  });

  it('reruns startup when initialize is selected', () => {
    vi.useFakeTimers();
    render(<App />);

    act(() => {
      vi.runAllTimers();
    });

    fireEvent.click(screen.getByRole('button', { name: 'initialize' }));

    expect(screen.queryByLabelText('System command')).toBeNull();

    act(() => {
      vi.runAllTimers();
    });

    expect(screen.getByLabelText('System command')).toBeDefined();
    expect(screen.getByText('type "help" to list available commands')).toBeDefined();
  });

  it('reveals the site when exploration begins', () => {
    vi.useFakeTimers();
    render(<App />);

    act(() => {
      vi.runAllTimers();
    });

    fireEvent.click(screen.getByRole('button', { name: 'explore' }));

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'I build systems that make software easier to develop, validate, and ship with confidence.',
      }),
    ).toBeDefined();

    expect(screen.getByRole('navigation', { name: 'Primary navigation' })).toBeDefined();
    expect(screen.getByRole('heading', { name: 'Forene' })).toBeDefined();
  });
});
