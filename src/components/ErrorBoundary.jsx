import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          textAlign: 'center',
          backgroundColor: '#0a0a0a',
          color: '#ffffff',
          fontFamily: 'system-ui, sans-serif'
        }}>
          <h1 style={{ color: '#00b4d8' }}>Something went wrong.</h1>
          <p style={{ color: '#888', maxWidth: '500px', marginBottom: '2rem' }}>
            We're sorry, but an unexpected error occurred while loading the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#00b4d8',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
