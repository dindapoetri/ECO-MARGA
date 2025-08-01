import React from 'react';

const LoadingSpinner = ({ 
  size = 'md', 
  message = 'Memuat...', 
  showMessage = true,
  color = 'primary',
  className = '',
  style = {}
}) => {
  const sizeClasses = {
    sm: { width: '16px', height: '16px', borderWidth: '2px' },
    md: { width: '24px', height: '24px', borderWidth: '3px' },
    lg: { width: '40px', height: '40px', borderWidth: '4px' },
    xl: { width: '60px', height: '60px', borderWidth: '6px' }
  };

  const colorClasses = {
    primary: '#10b981',
    secondary: '#6b7280',
    white: '#ffffff'
  };

  const spinnerSize = sizeClasses[size] || sizeClasses.md;
  const spinnerColor = colorClasses[color] || colorClasses.primary;

  const spinnerStyle = {
    border: `${spinnerSize.borderWidth} solid #e5e7eb`,
    borderTop: `${spinnerSize.borderWidth} solid ${spinnerColor}`,
    borderRadius: '50%',
    width: spinnerSize.width,
    height: spinnerSize.height,
    animation: 'spin 1s linear infinite',
    ...style
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '1rem'
  };

  return (
    <div className={`loading-container ${className}`} style={containerStyle}>
      <div className="spinner" style={spinnerStyle}></div>
      {showMessage && message && (
        <p style={{ 
          color: '#6b7280', 
          margin: 0, 
          fontSize: size === 'sm' ? '0.75rem' : '0.875rem' 
        }}>
          {message}
        </p>
      )}
      
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

// Full page loading component
export const PageLoader = ({ message = 'Memuat halaman...' }) => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '60vh',
    flexDirection: 'column',
    gap: '1rem'
  }}>
    <LoadingSpinner size="lg" message={message} />
  </div>
);

// Inline loading component
export const InlineLoader = ({ message = 'Memuat...' }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
    <LoadingSpinner size="sm" showMessage={false} />
    <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>{message}</span>
  </span>
);

export default LoadingSpinner;