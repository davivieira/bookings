import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import NavBarSearch from './NavBarSearch';
import { RootState } from '../../../store'; 
import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import userReducer, { setCurrentUser } from '../../../features/userSlice';

let store: EnhancedStore<RootState>;

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
});

function renderWithProviders(ui: React.ReactElement, initialState?: RootState) {
  store = configureStore({
    reducer: {
      user: userReducer,
    },
    preloadedState: initialState,
  });

  return render(
    <BrowserRouter>
      <Provider store={store}>
        {ui}
      </Provider>
    </BrowserRouter>
  );
}

describe('NavBarSearch', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders user menu when user is logged in', () => {
    renderWithProviders(<NavBarSearch />, { user: { currentUser: { id: "0", name: "John Doe", email: "johndoe@example.com", properties: ["0", "1"] } } });

    const userMenuButton = screen.getByText('John Doe');
    expect(userMenuButton).toBeInTheDocument();
  });

  it('renders login button when user is logged off', () => {
    renderWithProviders(<NavBarSearch />);

    const loginButton = screen.getByText('Login');
    expect(loginButton).toBeInTheDocument();
  });

  it('renders search form', () => {
    renderWithProviders(<NavBarSearch />);

    const searchFormField = screen.getAllByText('Check-in Date');
    expect(searchFormField).toHaveLength(2);
  });

});

