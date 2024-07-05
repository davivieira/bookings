import { render, screen } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import UserMenuPopover from './UserMenuPopover';
import userEvent from '@testing-library/user-event';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

const mockNavigate = jest.fn();
const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('UserMenuPopover', () => {

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    (useSelector as unknown as jest.Mock).mockReturnValue(null);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders user menu popover with options', () => {
    render(<UserMenuPopover />);

    expect(screen.getByText(/My Bookings/i)).toBeInTheDocument();
    expect(screen.getByText(/Logout/i)).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = render(<UserMenuPopover />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('navigates to bookings page when "My Bookings" is clicked', async () => {
    const user = userEvent.setup();
    render(<UserMenuPopover />);

    await user.click(screen.getByText(/My Bookings/i));
    expect(mockNavigate).toHaveBeenCalledWith('/bookings');
  });

  it('navigates to home page when "logout" is clicked', async () => {
    const user = userEvent.setup();
    render(<UserMenuPopover />);

    await user.click(screen.getByText(/logout/i));
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
