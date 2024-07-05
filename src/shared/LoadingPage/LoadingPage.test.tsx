import { render, screen } from '@testing-library/react';
import LoadingPage from './LoadingPage';

describe('LoadingPage', () => {
  it('renders loading indicator', () => {
    render(<LoadingPage />);
    const loadingIndicator = screen.getByRole('progressbar');
    expect(loadingIndicator).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = render(<LoadingPage />);
    expect(container.firstChild).toMatchSnapshot();
  });
})

