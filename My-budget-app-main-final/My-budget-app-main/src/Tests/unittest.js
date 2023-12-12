import React from 'react';
import { render, screen } from '@testing-library/react';
import components from '../components';

test('renders components', () => {
  render(<components />);
  expect(screen.getByText('Hello, World!')).toBeInTheDocument();
});