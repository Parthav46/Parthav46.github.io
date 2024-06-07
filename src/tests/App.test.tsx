import React from 'react';
import setup from './setupTests';
import { render, screen } from '@testing-library/react';
import App from '../screens/Placeholder';

test('renders learn react link', () => {
  setup();

  render(<App />);
  const linkElement = screen.getByText(/Site under Construction!!/i);
  expect(linkElement).toBeInTheDocument();
});
