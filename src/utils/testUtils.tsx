import { configureStore } from "@reduxjs/toolkit";
import { render } from "@testing-library/react";
import userReducer from '../features/userSlice';
import { Provider } from "react-redux";

export const renderWithRedux = (
  component: React.ReactElement,
  { initialState = {} } = {}
) => {
  const store = configureStore({ reducer: { user: userReducer }, preloadedState: initialState });
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
};