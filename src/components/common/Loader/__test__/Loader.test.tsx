import React from 'react';
import { render, screen } from '@testing-library/react';
import Loader from '../Loader';

describe('Loader component', () => {
  it('renders without crashing', () => {
    render(<Loader />);
  });

  it('displays the loading text', () => {
    render(<Loader />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('contains the loader container', () => {
    render(<Loader />);
    expect(screen.getByTestId('loader-container')).toBeInTheDocument();
  });

  it('contains the square element', () => {
    render(<Loader />);
    expect(screen.getByTestId('loader-square')).toBeInTheDocument();
  });

  it('contains the triangle element', () => {
    render(<Loader />);
    expect(screen.getByTestId('loader-triangle')).toBeInTheDocument();
  });

  it('contains the circle element', () => {
    render(<Loader />);
    expect(screen.getByTestId('loader-circle')).toBeInTheDocument();
  });

  it('contains the pulse element', () => {
    render(<Loader />);
    expect(screen.getByTestId('loader-pulse')).toBeInTheDocument();
  });
});
