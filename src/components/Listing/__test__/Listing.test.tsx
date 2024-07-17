import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Listing from '../Listing';
import ListingController from '../ListingController';
jest.mock('../ListingController');

const mockUniversities = [
  { name: 'University A', country: 'Country A' },
  { name: 'University B', country: 'Country B' },
];

const renderWithRouter = (ui: React.ReactElement) => {
  return render(ui, { wrapper: BrowserRouter });
};

describe('Listing Component', () => {
  beforeEach(() => {
    (ListingController.fetchUniversities as jest.Mock).mockResolvedValue(mockUniversities);
  });

  test('renders university listing', async () => {
    renderWithRouter(<Listing />);
    await waitFor(() => {
      expect(screen.getByText('University Explorer')).toBeInTheDocument();
      expect(screen.getByText('University A')).toBeInTheDocument();
      expect(screen.getByText('University B')).toBeInTheDocument();
    });
  });

  test('filters universities based on search term', async () => {
    renderWithRouter(<Listing />);
  
    await waitFor(() => {
      expect(screen.getByText('University A')).toBeInTheDocument();
      expect(screen.getByText('University B')).toBeInTheDocument();
    });
  
    const searchInput = screen.getByPlaceholderText('Search University');
    fireEvent.change(searchInput, { target: { value: 'University A' } });
  
    await waitFor(() => {
      expect(screen.getByText('University A')).toBeInTheDocument();
      expect(screen.queryByText('University B')).not.toBeInTheDocument();
    });
  });

  test('deletes a university when delete button is clicked', async () => {
    window.confirm = jest.fn(() => true);
    renderWithRouter(<Listing />);
    await waitFor(() => {
      const deleteButtons = screen.getAllByTitle('Remove');
      fireEvent.click(deleteButtons[0]);
      expect(screen.queryByText('University A')).not.toBeInTheDocument();
      expect(screen.getByText('University B')).toBeInTheDocument();
    });
  });

  test('displays error message when fetching universities fails', async () => {
    (ListingController.fetchUniversities as jest.Mock).mockRejectedValue(new Error('Failed to fetch'));
    renderWithRouter(<Listing />);
    await waitFor(() => {
      expect(screen.getByText('Failed to load universities. Please try again later.')).toBeInTheDocument();
    });
  });

  test('navigates to university details page when explore button is clicked', async () => {
    renderWithRouter(<Listing />);
    await waitFor(() => {
      const exploreButtons = screen.getAllByTitle('Explore');
      expect(exploreButtons[0]).toHaveAttribute('href', '/university/University%20A');
    });
  });
});
