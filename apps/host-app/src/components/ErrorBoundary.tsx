import React from 'react';
import logger from '../utils/logger';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  onError: (error: Error, componentStack: string) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
    this.error = null;
  }

  error: Error | null;

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.error = error;
    console.error('[ErrorBoundary] Caught error:', error, errorInfo);
    this.props.onError(error, errorInfo.componentStack || '');
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ color: 'red', padding: 16 }}>
          <h1>Something went wrong.</h1>
          {this.error && <pre>{this.error.message}</pre>}
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary; 