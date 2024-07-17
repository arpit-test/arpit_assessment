import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Sorting from '../Sorting';

describe('Sorting Component', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  test('renders both sorting options', () => {
    render(<Sorting onChange={mockOnChange} />);
    expect(screen.getByLabelText('A-Z')).toBeInTheDocument();
    expect(screen.getByLabelText('Z-A')).toBeInTheDocument();
  });

  test('A-Z option is checked by default', () => {
    render(<Sorting onChange={mockOnChange} />);
    const ascRadio = screen.getByLabelText('A-Z') as HTMLInputElement;
    expect(ascRadio.checked).toBe(true);
  });

  test('calls onChange with "desc" when Z-A is selected', () => {
    render(<Sorting onChange={mockOnChange} />);
    const descRadio = screen.getByLabelText('Z-A');
    fireEvent.click(descRadio);
    expect(mockOnChange).toHaveBeenCalledWith('desc');
  });

  test('only one option can be selected at a time', () => {
    render(<Sorting onChange={mockOnChange} />);
    const ascRadio = screen.getByLabelText('A-Z') as HTMLInputElement;
    const descRadio = screen.getByLabelText('Z-A') as HTMLInputElement;
    
    fireEvent.click(descRadio);
    expect(descRadio.checked).toBe(true);
    expect(ascRadio.checked).toBe(false);

    fireEvent.click(ascRadio);
    expect(ascRadio.checked).toBe(true);
    expect(descRadio.checked).toBe(false);
  });
});
