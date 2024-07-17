import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Details from '../Details';

const mockUniversity = {
  name: 'Test University',
  country: 'Test Country',
  domains: ['test.edu'],
  web_pages: ['https://test.edu']
};

describe('Details Component', () => {
  beforeEach(() => {
    localStorage.setItem('universities', JSON.stringify([mockUniversity]));
  });

  afterEach(() => {
    localStorage.clear();
  });

  const renderWithRouter = (name: string) => {
    render(
      <MemoryRouter initialEntries={[`/university/${name}`]}>
        <Routes>
          <Route path="/university/:name" element={<Details />} />
        </Routes>
      </MemoryRouter>
    );
  };

  test('renders university details when university is found', () => {
    renderWithRouter('Test University');

    expect(screen.getByText('Test University')).toBeInTheDocument();
    expect(screen.getByText('Test Country')).toBeInTheDocument();
    expect(screen.getByText('test.edu')).toBeInTheDocument();
    expect(screen.getByText('Visit Website')).toHaveAttribute('href', 'https://test.edu');
  });

  test('renders "University not found" when university is not found', () => {
    renderWithRouter('Non-existent University');

    expect(screen.getByText('University not found')).toBeInTheDocument();
    expect(screen.getByText("We couldn't find the university you are looking for.")).toBeInTheDocument();
  });

  test('renders back button', () => {
    renderWithRouter('Test University');

    const backButton = screen.getByText('Back');
    expect(backButton).toBeInTheDocument();
    expect(backButton.closest('a')).toHaveAttribute('href', '/');
  });

  test('renders "N/A" for missing domain', () => {
    localStorage.setItem('universities', JSON.stringify([{ ...mockUniversity, domains: [] }]));
    renderWithRouter('Test University');

    expect(screen.getByText('N/A')).toBeInTheDocument();
  });

  test('renders "N/A" for missing website', () => {
    localStorage.setItem('universities', JSON.stringify([{ ...mockUniversity, web_pages: [] }]));
    renderWithRouter('Test University');
  
    const websiteElement = screen.getByText('Website').nextElementSibling;
    expect(websiteElement).toHaveTextContent('N/A');
  });  
});
