import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import App from '../src/App';

describe('App', () => {
  it('renders the zerograviti site shell', () => {
    render(<App />);

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
