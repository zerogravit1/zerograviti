import { render, screen } from '@testing-library/react'
import { afterEach, describe, it, vi, expect } from 'vitest'

import App from '../src/App'

describe('App', () => {
  it('renders the zerograviti application', async () => {
    render(<App />);

    expect(screen.findByText('Get Started')).toBeDefined();
  });
})