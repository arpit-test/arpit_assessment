import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Search from '../Search';

describe('Search Component', () => {
  const mockSetSearchTerm = jest.fn();

  beforeEach(() => {
    mockSetSearchTerm.mockClear();
  });

  test('renders search input and button', () => {
    render(<Search searchTerm="" setSearchTerm={mockSetSearchTerm} />);
    expect(screen.getByPlaceholderText('Search University')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  test('displays the current search term', () => {
    render(<Search searchTerm="Test University" setSearchTerm={mockSetSearchTerm} />);
    expect(screen.getByDisplayValue('Test University')).toBeInTheDocument();
  });

  test('calls setSearchTerm when input changes', () => {
    render(<Search searchTerm="" setSearchTerm={mockSetSearchTerm} />);
    const input = screen.getByPlaceholderText('Search University');
    fireEvent.change(input, { target: { value: 'New University' } });
    expect(mockSetSearchTerm).toHaveBeenCalledWith('New University');
  });

  test('input has correct CSS class', () => {
    render(<Search searchTerm="" setSearchTerm={mockSetSearchTerm} />);
    const input = screen.getByPlaceholderText('Search University');
    expect(input).toHaveClass('search-input');
  });

  test('button has correct CSS class and aria-label', () => {
    render(<Search searchTerm="" setSearchTerm={mockSetSearchTerm} />);
    const button = screen.getByRole('button', { name: 'Search' });
    expect(button).toHaveClass('search-button');
    expect(button).toHaveAttribute('aria-label', 'Search');
  });

  test('search icon SVG is present', () => {
    render(<Search searchTerm="" setSearchTerm={mockSetSearchTerm} />);
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });
});
