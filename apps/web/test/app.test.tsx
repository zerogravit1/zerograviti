import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import App from '../src/App';

describe('App', () => {
  it('starts at an interactive system prompt', () => {
    render(<App />);

    expect(screen.getByLabelText('System command')).toBeDefined();
    expect(screen.getByText('ERROR: duplicate infrastructure detected')).toBeDefined();
    expect(screen.getByRole('button', { name: 'explore' })).toBeDefined();
  });

  it('reveals the site when exploration begins', () => {
    render(<App />);

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
