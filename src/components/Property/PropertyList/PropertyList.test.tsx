import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import { QueryClient, QueryClientProvider, setLogger } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { RootState } from '../../../store';
import userReducer, { setCurrentUser } from '../../../features/userSlice';
import PropertyList from './PropertyList';
import { fetchAvailableProperties } from '../../../api';
import { useSearchParams } from '@/utils';

jest.mock('../../../api');
jest.mock('@/utils', () => ({
  useSearchParams: jest.fn(),
}));

const mockFetchAvailableProperties = fetchAvailableProperties as jest.Mock;
const mockUseSearchParams = useSearchParams as jest.Mock;

describe('PropertyList', () => {
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

    setLogger({
      log: console.log,
      warn: console.warn,
      error: () => {},
    });

    jest.clearAllMocks();

    mockUseSearchParams.mockReturnValue({
      get: jest.fn((param) => (param === 'checkinDate' ? '2024-07-10' : '2024-07-15')),
    });
  });

  it('renders property cards when data is fetched', async () => {
    const mockProperties = [
      { id: '1', name: 'Property 1', picture: 'pic1.jpg', description: 'Description 1' },
      { id: '2', name: 'Property 2', picture: 'pic2.jpg', description: 'Description 2' },
    ];

    mockFetchAvailableProperties.mockResolvedValue(mockProperties);

    renderWithProviders(<PropertyList />, { user: { currentUser: { id: "0", name: "John Doe", email: "johndoe@example.com", properties: ["0", "1"] } } });

    await waitFor(() => {
      expect(screen.getByText('Property 1')).toBeInTheDocument();
      expect(screen.getByText('Property 2')).toBeInTheDocument();
    });
  });

  it('renders no properties message when no data is fetched', async () => {
    mockFetchAvailableProperties.mockResolvedValue([]);

    renderWithProviders(<PropertyList />, { user: { currentUser: { id: "0", name: "John Doe", email: "johndoe@example.com", properties: ["0", "1"] } } });

    await waitFor(() => {
      expect(screen.queryByText(/property/i)).not.toBeInTheDocument();
      expect(screen.getByText(/no properties available/i)).toBeInTheDocument();
    });
  });
});
