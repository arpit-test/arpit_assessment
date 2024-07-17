import { render, screen } from '@testing-library/react';
import App from './App';

test('renders heading University Explorer', () => {
  render(<App />);
  const headingElement = screen.getByText(/University Explorer/i);
  expect(headingElement).toBeInTheDocument();
});