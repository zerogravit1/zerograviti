import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import App from '../src/App';

describe('App', () => {
  it('renders the zerograviti application', () => {
    render(<App />);

    expect(screen.getByText('Get started')).toBeDefined();
  });
});
