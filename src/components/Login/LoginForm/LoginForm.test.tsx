import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from './LoginForm';
import usePostUserData from '../../../api/users/users';
import { QueryClient, QueryClientProvider } from 'react-query';

jest.mock('../../../api/users/users');

const mockUsePostUserData = usePostUserData as jest.Mock;

describe('LoginForm', () => {
  const queryClient = new QueryClient();

  const renderWithClient = (ui: React.ReactElement) => {
    return render(
      <QueryClientProvider client={queryClient}>
        {ui}
      </QueryClientProvider>
    );
  };

  it('renders the login form and submits correctly', async () => {
    const handleClose = jest.fn();
    const mockMutate = jest.fn();
    mockUsePostUserData.mockReturnValue({ mutate: mockMutate, isLoading: false });

    renderWithClient(<LoginForm handleClose={handleClose} />);

    const emailInput = screen.getByPlaceholderText('Use your email to login');
    const submitButton = screen.getByRole('button', { name: /login/i });

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith('test@example.com');
      expect(handleClose).toHaveBeenCalled();
    });
  });

  it('shows loading indicator when submitting', async () => {
    const handleClose = jest.fn();
    const mockMutate = jest.fn();
    mockUsePostUserData.mockReturnValue({ mutate: mockMutate, isLoading: true });

    renderWithClient(<LoginForm handleClose={handleClose} />);

    const emailInput = screen.getByPlaceholderText('Use your email to login');
    const submitButton = screen.getByRole('button');

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.click(submitButton);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const handleClose = jest.fn();
    mockUsePostUserData.mockReturnValue({ mutate: jest.fn(), isLoading: false });

    const { asFragment } = renderWithClient(<LoginForm handleClose={handleClose} />);

    expect(asFragment()).toMatchSnapshot();
  });
});
