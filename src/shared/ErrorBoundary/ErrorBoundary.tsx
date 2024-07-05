import { Component, ErrorInfo, ReactNode } from 'react';
import NavBar from '../../components/Nav/NavBar/NavBar';
import MessagePage from '../MessagePage/MessagePage';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <NavBar />
          <MessagePage>Something went wrong.</MessagePage>
        </>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
