import React from 'react';
import { render, screen } from '@testing-library/react';
import MessagePage from './MessagePage';

jest.mock('@/styles', () => ({
  SCMessagePageContainer: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  SCMessage: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

describe('MessagePage', () => {
  it('renders the children text correctly', () => {
    render(<MessagePage>Test Message</MessagePage>);

    expect(screen.getByText('Test Message')).toBeInTheDocument();
  });
});
