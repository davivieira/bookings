import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { BrowserRouter } from 'react-router-dom';
import userReducer, { setCurrentUser } from '../../../features/userSlice';
import BookingList from './BookingList';
import { RootState } from '../../../store';
import { getMyBookings, useDeleteBookingData } from '../../../api/bookings/bookings';

jest.mock('../../../api/bookings/bookings');

const mockGetMyBookings = getMyBookings as jest.Mock;

describe('BookingList', () => {
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
            {ui}
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

    mockMutate = jest.fn().mockImplementation((_params, options) => {
      options.onSuccess();
    });

    (useDeleteBookingData as jest.Mock).mockReturnValue({ mutate: mockMutate })

    mockGetMyBookings.mockResolvedValue([
      {
        id: '1',
        property: { name: 'Property 1', description: 'Description 1', picture: 'pic1.jpg' },
        checkinDate: '2024-07-01',
        checkoutDate: '2024-07-05',
      },
      {
        id: '2',
        property: { name: 'Property 2', description: 'Description 2', picture: 'pic2.jpg' },
        checkinDate: '2024-07-10',
        checkoutDate: '2024-07-15',
      },
    ]);
  });

  it('renders no bookings message when there are no bookings', async () => {
    mockGetMyBookings.mockResolvedValueOnce([]);

    renderWithProviders(<BookingList />, { user: { currentUser: { id: "0", name: "John Doe", email: "johndoe@example.com", properties: ["0", "1"] } } });

    await waitFor(() => {
      expect(screen.getByText(/no bookings/i)).toBeInTheDocument();
    });
  });

  it('renders bookings when there are bookings', async () => {

    renderWithProviders(<BookingList />, { user: { currentUser: { id: "0", name: "John Doe", email: "johndoe@example.com", properties: ["0", "1"] } } });

    await waitFor(() => {
      expect(screen.getByText('Property 1')).toBeInTheDocument();
      expect(screen.getByText('Property 2')).toBeInTheDocument();
    });
  });

  it('renders cancel button for each booking', async () => {


    renderWithProviders(<BookingList />, { user: { currentUser: { id: "0", name: "John Doe", email: "johndoe@example.com", properties: ["0", "1"] } } });

    await waitFor(() => {
      expect(screen.getAllByText('Cancel')).toHaveLength(2);
    });
  });

  it('opens popover when cancel button is clicked', async () => {

    renderWithProviders(<BookingList />, { user: { currentUser: { id: "0", name: "John Doe", email: "johndoe@example.com", properties: ["0", "1"] } } });

    await waitFor(() => {
      expect(screen.getByText('Property 1')).toBeInTheDocument();
      expect(screen.getByText('Property 2')).toBeInTheDocument();
    });

    const cancelButtons = screen.getAllByText('Cancel');

    await act(async () => {
      fireEvent.click(cancelButtons[0]);
    });

    await waitFor(() => {
      expect(screen.getByRole('presentation')).toBeInTheDocument();
    });
  });
});