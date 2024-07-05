/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import GenericModal from './GenericModal';

jest.mock('./GenericModal.styles', () => ({
  SCModal: jest.fn(({ open, children }: any) => (open ? <div>{children}</div> : null)),
}));

jest.mock('@mui/material', () => ({
  ...jest.requireActual('@mui/material'),
  ClickAwayListener: jest.fn(({ children, onClickAway }: any) => (
    <div onClick={() => onClickAway && onClickAway()}>{children}</div>
  )),
  Box: jest.fn(({ children, ...props }: any) => <div {...props}>{children}</div>),
}));

const mockHandleClose = jest.fn();

describe('GenericModal', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('matches snapshot when open is true', () => {
    const { asFragment } = render(
      <GenericModal open={true} handleClose={mockHandleClose}>
        <div>Modal Content</div>
      </GenericModal>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders the modal when open is true', () => {
    render(
      <GenericModal open={true} handleClose={mockHandleClose}>
        <div>Modal Content</div>
      </GenericModal>
    );

    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });

  it('does not render the modal when open is false', () => {
    render(
      <GenericModal open={false} handleClose={mockHandleClose}>
        <div>Modal Content</div>
      </GenericModal>
    );

    expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
  });

  it('calls handleClose when clicking away', async () => {
    const user = userEvent.setup();
    render(
      <GenericModal open={true} handleClose={mockHandleClose}>
        <div>Modal Content</div>
      </GenericModal>
    );

    await user.click(screen.getByText('Modal Content').parentElement!);
    expect(mockHandleClose).toHaveBeenCalledTimes(1);
  });

  it('renders children inside the modal', () => {
    render(
      <GenericModal open={true} handleClose={mockHandleClose}>
        <div>Modal Content</div>
      </GenericModal>
    );

    expect(screen.getByText('Modal Content')).toBeInTheDocument();
  });
});
