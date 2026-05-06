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
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          height: '100vh', 
          width: '100vw',
          backgroundColor: '#0a1128', 
          color: 'white', 
          fontFamily: 'sans-serif',
          textAlign: 'center',
          padding: '2rem',
          boxSizing: 'border-box'
        }}>
          <h2 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>Oops! Something went wrong.</h2>
          <p style={{ marginBottom: '2rem', color: '#e2e8f0', maxWidth: '400px' }}>
            We encountered an unexpected error. Please try refreshing the page.
          </p>
          <button 
            onClick={() => window.location.reload()}
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
