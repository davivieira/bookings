import { render, screen, waitFor } from '@testing-library/react';
import SearchModalGroup from './SearchModalGroup';
import { useState as useStateMock } from 'react';
import userEvent from '@testing-library/user-event';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

describe('SearchModalGroup Component', () => {
  beforeEach(() => {
    (useStateMock as jest.Mock).mockReturnValue([false, jest.fn()]);
  });

  it('opens modal when search button is clicked', () => {
    const { getByRole } = render(<SearchModalGroup />);

    expect(screen.queryByRole('dialog')).toBeNull();
    waitFor(() => userEvent.click(getByRole('button')));

    waitFor(() => {
      expect(screen.getByRole('presentation')).toBeInTheDocument();
    })
  });

  it('opens modal when search button is clicked and closes when click away', () => {
    const { getByRole } = render(<SearchModalGroup />);

    expect(screen.queryByRole('dialog')).toBeNull();
    waitFor(() => userEvent.click(getByRole('button')));

    waitFor(() => {
      expect(screen.getByRole('presentation')).toBeInTheDocument();
    })

    waitFor(() => {
      userEvent.click(document.body);
    });

    expect(screen.queryByRole('presentation')).toBeNull();
  });
  
});
