import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import NavBar from './NavBar';
import { RootState } from '@/store'; 
import { configureStore, EnhancedStore } from '@reduxjs/toolkit';
import userReducer, { setCurrentUser } from '@/features/userSlice';
import { BrowserRouter } from 'react-router-dom';

let store: EnhancedStore<RootState>;

beforeEach(() => {
  store = configureStore({
    reducer: {
      user: userReducer,
    },
  });

  store.dispatch(setCurrentUser(    {
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

describe('NavBar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders user menu when user is logged in', () => {
    renderWithProviders(<NavBar />, { user: { currentUser: { id: "0", name: "John Doe", email: "johndoe@example.com", properties: ["0", "1"] } } });

    const userMenuButton = screen.getByText('John Doe');
    expect(userMenuButton).toBeInTheDocument();
  });

  it('renders user menu when user is logged off', () => {
    renderWithProviders(<NavBar />);

    const userMenuButton = screen.getByText('Login');
    expect(userMenuButton).toBeInTheDocument();
  });
});
