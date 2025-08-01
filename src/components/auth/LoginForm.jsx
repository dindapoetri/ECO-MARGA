import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Button from '../common/Button';
import { useAuth } from '../../context/AuthContext';

const LoginForm = ({ onSuccess, showDemoAccounts = true }) => {
  const { login, isLoading } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // Demo accounts for testing
  const demoAccounts = [
    { email: 'user@demo.com', password: 'demo123', role: 'User' },
    { email: 'admin@demo.com', password: 'admin123', role: 'Admin' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Email dan password harus diisi');
      return;
    }
    
    try {
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        if (onSuccess) {
          onSuccess(result.user);
        }
      } else {
        setError(result.error || 'Login gagal. Silakan coba lagi.');
      }
    } catch (err) {
      setError('Terjadi kesalahan. Silakan coba lagi.');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const loginWithDemo = async (demoAccount) => {
    setFormData({
      email: demoAccount.email,
      password: demoAccount.password
    });
    
    try {
      const result = await login(demoAccount.email, demoAccount.password);
      if (result.success && onSuccess) {
        onSuccess(result.user);
      }
    } catch (err) {
      setError('Demo login gagal');
    }
  };

  return (
    <div className="login-form">
      {/* Demo Accounts */}
      {showDemoAccounts && (
        <div style={{
          marginBottom: '2rem',
          padding: '1rem',
          backgroundColor: '#eff6ff',
          border: '1px solid #3b82f6',
          borderRadius: '0.5rem'
        }}>
          <h4 style={{
            marginBottom: '1rem', 
            fontSize: '0.9rem',
            color: '#1e40af'
          }}>
            🚀 Demo Accounts (Frontend Only)
          </h4>
          <div style={{
            display: 'flex', 
            flexDirection: 'column', 
            gap: '0.5rem'
          }}>
            {demoAccounts.map((account, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => loginWithDemo(account)}
                disabled={isLoading}
                style={{
                  fontSize: '0.8rem',
                  padding: '0.5rem',
                  justifyContent: 'flex-start'
                }}
              >
                {account.role}: {account.email}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div style={{
          backgroundColor: '#fee2e2',
          border: '1px solid #fca5a5',
          color: '#dc2626',
          padding: '0.75rem',
          borderRadius: '0.5rem',
          marginBottom: '1rem',
          fontSize: '0.875rem'
        }}>
          {error}
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit}>
        {/* Email Field */}
        <div className="form-group">
          <label className="form-label">Email</label>
          <div style={{ position: 'relative' }}>
            <Mail 
              size={16} 
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#6b7280'
              }} 
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Masukkan email Anda"
              className="form-input"
              style={{ paddingLeft: '2.5rem' }}
              required
              disabled={isLoading}
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="form-group">
          <label className="form-label">Password</label>
          <div style={{ position: 'relative' }}>
            <Lock 
              size={16} 
              style={{
                position: 'absolute',
                left: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#6b7280'
              }} 
            />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Masukkan password Anda"
              className="form-input"
              style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
              required
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#6b7280',
                padding: 0
              }}
              disabled={isLoading}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <Button 
          type="submit" 
          variant="primary"
          loading={isLoading}
          disabled={isLoading}
          style={{ width: '100%', marginTop: '1rem' }}
        >
          {isLoading ? 'Masuk...' : 'Masuk'}
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;