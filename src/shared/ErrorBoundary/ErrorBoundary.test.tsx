import { render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';

jest.mock('../../components/Nav/NavBar/NavBar', () => () => <div>Mocked NavBar</div>);
jest.mock('../MessagePage/MessagePage', () => ({ children }: { children: React.ReactNode }) => <div>{children}</div>);

describe('ErrorBoundary', () => {
  it('should render children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Child Component</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Child Component')).toBeInTheDocument();
  });

  it('should render fallback UI when there is an error', () => {
    const ProblemChild = () => {
      throw new Error('Test error');
    };

    const consoleError = console.error;
    console.error = jest.fn();

    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    expect(screen.getByText('Mocked NavBar')).toBeInTheDocument();
    expect(screen.getByText('Something went wrong.')).toBeInTheDocument();

    console.error = consoleError;
  });
});
