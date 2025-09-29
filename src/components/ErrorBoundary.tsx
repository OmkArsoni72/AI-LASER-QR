import React from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    console.error('ErrorBoundary caught:', error);
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary details:', { error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f8fafc',
          fontFamily: 'system-ui, sans-serif'
        }}>
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#dc2626' }}>
              App Error
            </h1>
            <p style={{ marginBottom: '2rem', color: '#64748b' }}>
              {this.state.error?.message || 'React createContext error detected'}
            </p>
            <button 
              onClick={() => window.location.reload()}
              style={{
                padding: '0.8rem 2rem',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: 'pointer'
              }}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
