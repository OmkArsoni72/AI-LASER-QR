import React from 'react';

// Minimal test component to verify React is working
const TestApp = () => {
  console.log("🧪 TestApp component rendering...");
  
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'system-ui, sans-serif',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      textAlign: 'center',
      padding: '2rem'
    }}>
      <div>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>🚀 React Works!</h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
          AI-LASER-QR is loading successfully
        </p>
        <div style={{ 
          background: 'rgba(255,255,255,0.2)', 
          padding: '1rem', 
          borderRadius: '8px',
          marginBottom: '2rem'
        }}>
          <strong>Debug Info:</strong><br/>
          Environment: {import.meta.env.MODE}<br/>
          Base URL: {import.meta.env.BASE_URL}<br/>
          Timestamp: {new Date().toLocaleString()}
        </div>
        <button 
          onClick={() => {
            console.log("🔄 Loading full app...");
            window.location.href = window.location.href + "?full=true";
          }}
          style={{
            background: '#10b981',
            color: 'white',
            border: 'none',
            padding: '1rem 2rem',
            borderRadius: '8px',
            fontSize: '1.1rem',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          Load Full App →
        </button>
      </div>
    </div>
  );
};

export default TestApp;