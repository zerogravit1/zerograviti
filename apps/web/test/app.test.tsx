import { render, screen } from '@testing-library/react'
import { afterEach, describe, it, vi } from 'vitest'

import { App } from '../src/App'

describe('App', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renders the zerograviti application', async () => {
    render(<App />);

    expect(screen.findByText('Get started')).toBeDefined();
  });
})