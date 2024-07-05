import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import userReducer, { setCurrentUser } from '../../../features/userSlice';
import BookingForm from './BookingForm';
import { RootState } from '../../../store';
import { usePostBookingData } from '../../../api/bookings/bookings';

jest.mock('../../../api/bookings/bookings');
jest.mock('../../../utils', () => ({
  useSearchParams: () => ({
    get: jest.fn().mockReturnValue('07-11-2024'),
  }),
}));

describe('BookingForm', () => {
  let store: EnhancedStore<RootState>;
  const queryClient = new QueryClient();

  const renderWithProviders = (ui: React.ReactElement, initialState?: RootState) => {
    store = configureStore({
      reducer: {
        user: userReducer,
      },
      preloadedState: initialState,
    });

    return render(
      <BrowserRouter>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              {ui}
            </LocalizationProvider>
          </QueryClientProvider>
        </Provider>
      </BrowserRouter>
    );
  };

  let mockMutate: jest.Mock;

  afterEach(() => {
    jest.clearAllMocks();
    });

  beforeEach(() => {
    store = configureStore({
      reducer: {
        user: userReducer,
      },
    });

    

    store.dispatch(setCurrentUser({
      id: "0",
      name: "John Doe",
      email: "johndoe@example.com",
      properties: ["0", "1"],
    }));

    mockMutate = jest.fn((_, { onSuccess }) => onSuccess());

    (usePostBookingData as jest.Mock).mockReturnValue({ mutate: mockMutate })
  });

  it('renders booking form with initial values', async () => {
    renderWithProviders(<BookingForm handleClose={jest.fn()} propertyId="1" />, { user: { currentUser: { id: "0", name: "John Doe", email: "johndoe@example.com", properties: ["0", "1"] } } });

    await waitFor(() => {
      expect(screen.getAllByText(/From/i)).toHaveLength(1);
      expect(screen.getAllByText(/To/i)).toHaveLength(1);
    });

    expect(screen.getByText('Confirm')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('disables confirm button if user is not logged in', async () => {
    renderWithProviders(<BookingForm handleClose={jest.fn()} propertyId="1" />);

    await waitFor(() => {
      expect(screen.getByText(/you must be logged in to make a booking/i)).toBeInTheDocument();
    });

    expect(screen.getByText('Confirm')).toBeDisabled();
  });

  it('enables confirm button when form is valid and user is logged in', async () => {
    renderWithProviders(<BookingForm handleClose={jest.fn()} propertyId="1" />, { user: { currentUser: { id: "0", name: "John Doe", email: "johndoe@example.com", properties: ["0", "1"] } } });

    await waitFor(() => {
      expect(screen.getAllByText(/From/i)).toHaveLength(1);
      expect(screen.getAllByText(/To/i)).toHaveLength(1);
    });

    expect(screen.getByText('Confirm')).toBeEnabled();
  });

  it('submits form correctly', async () => {
    const handleClose = jest.fn();

    renderWithProviders(<BookingForm handleClose={handleClose} propertyId="1" />, { user: { currentUser: { id: "0", name: "John Doe", email: "johndoe@example.com", properties: ["0", "1"] } } });

    await waitFor(() => {
      expect(screen.getAllByText(/From/i)).toHaveLength(1);
      expect(screen.getAllByText(/To/i)).toHaveLength(1);
    });

    await act(async () => {
      fireEvent.click(screen.getByRole('button', { name: /Confirm/i }));
    });

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith({
        checkinDate: '07-11-2024',
        checkoutDate: '07-11-2024',
        userId: "0",
        propertyId: "1"
      }, expect.anything());
    });
  });
});
