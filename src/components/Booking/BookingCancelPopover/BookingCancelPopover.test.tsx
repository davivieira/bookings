import { render, fireEvent, waitFor } from '@testing-library/react';
import BookingCancelPopover from './BookingCancelPopover';
import { useDeleteBookingData } from '../../../api';
import { useQueryClient } from 'react-query';
import { BookingResponse } from '../../../types';

jest.mock('react-query');
jest.mock('../../../api');

describe('BookingCancelPopover Component', () => {
  let mockMutate: jest.Mock;

  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    (useQueryClient as jest.Mock).mockReturnValue({
      invalidateQueries: jest.fn(),
    });

     
    mockMutate = jest.fn().mockImplementation((_params, options) => {
      options.onSuccess();
    });

    (useDeleteBookingData as jest.Mock).mockReturnValue({ mutate: mockMutate })
  });

  const mockHandleClose = jest.fn();

  const mockBooking: BookingResponse = {
    id: '123',
    userId: 'user1',
    checkinDate: '2024-07-05',
    checkoutDate: '2024-07-07',
    property: {
      id: "0",
      userId: "0",
      name: "Luxury Lakeside Villa",
      location: "456 Lakefront Drive, Tahoe City, CA",
      price: 180,
      bookings: ["0"],
      description: "A luxurious lakeside villa offering breathtaking views of Lake Tahoe, private beach access, and elegant interiors.",
      picture: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?fit=crop&w=800&q=80"
    }
  };

  it('renders confirmation message and buttons', () => {
    const { getByText } = render(
      <BookingCancelPopover handleClose={mockHandleClose} booking={mockBooking} />
    );

    expect(getByText('Are you sure you want to cancel?')).toBeInTheDocument();
    expect(getByText('Yes, cancel it')).toBeInTheDocument();
    expect(getByText('No')).toBeInTheDocument();
  });

  it('handles cancellation when "Yes, cancel it" button is clicked', async () => {
    const mockInvalidateQueries = jest.fn();
    (useQueryClient as jest.Mock).mockReturnValue({ invalidateQueries: mockInvalidateQueries });

    const { getByText } = render(
      <BookingCancelPopover handleClose={mockHandleClose} booking={mockBooking} />
    );

    fireEvent.click(getByText('Yes, cancel it'));

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledTimes(1);
      expect(mockMutate).toHaveBeenCalledWith(
        { bookingId: '123' },
        expect.objectContaining({
          onSuccess: expect.any(Function),
        })
      );
      expect(mockInvalidateQueries).toHaveBeenCalledTimes(1);
      expect(mockInvalidateQueries).toHaveBeenCalledWith(['myBookings']);
      expect(mockHandleClose).toHaveBeenCalledTimes(1);
    });
  });

  it('handles cancellation when "No" button is clicked', () => {
    const { getByText } = render(
      <BookingCancelPopover handleClose={mockHandleClose} booking={mockBooking} />
    );

    fireEvent.click(getByText('No'));

    expect(mockHandleClose).toHaveBeenCalledTimes(1);
  });
});
