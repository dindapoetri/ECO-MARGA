import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const result = await login(formData.email, formData.password);
      
      if (result.success) {
        // Redirect to dashboard after successful login
        navigate('/dashboard');
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
  };

  // Demo accounts for testing
  const demoAccounts = [
    { email: 'user@demo.com', password: 'demo123', role: 'User' },
    { email: 'admin@demo.com', password: 'admin123', role: 'Admin' }
  ];

  const loginWithDemo = async (demoAccount) => {
    setFormData({
      email: demoAccount.email,
      password: demoAccount.password
    });
    
    const result = await login(demoAccount.email, demoAccount.password);
    if (result.success) {
      navigate('/dashboard');
    }
  };

  return (
    <div style={{padding: '4rem 0', minHeight: '80vh', display: 'flex', alignItems: 'center'}}>
      <div className="container">
        <div style={{maxWidth: '400px', margin: '0 auto'}}>
          <div className="card">
            <div className="text-center mb-4">
              <h1>Masuk ke EcoMarga</h1>
              <p style={{color: 'var(--text-light)'}}>
                Selamat datang kembali! Silakan masuk ke akun Anda
              </p>
            </div>

            {/* Demo Accounts */}
            <div style={{
              marginBottom: '2rem',
              padding: '1rem',
              backgroundColor: 'var(--secondary-color)',
              borderRadius: '0.5rem'
            }}>
              <h4 style={{marginBottom: '1rem', fontSize: '0.9rem'}}>🚀 Demo Accounts (Frontend Only)</h4>
              <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                {demoAccounts.map((account, index) => (
                  <button
                    key={index}
                    onClick={() => loginWithDemo(account)}
                    className="btn btn-outline"
                    style={{fontSize: '0.8rem', padding: '0.5rem'}}
                    disabled={isLoading}
                  >
                    {account.role}: {account.email}
                  </button>
                ))}
              </div>
            </div>

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

            <form onSubmit={handleSubmit}>
              <div style={{marginBottom: '1rem'}}>
                <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '500'}}>
                  Email
                </label>
                <div style={{position: 'relative'}}>
                  <Mail size={16} style={{position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)'}} />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Masukkan email Anda"
                    style={{
                      width: '100%',
                      padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                      border: '2px solid var(--border-color)',
                      borderRadius: '0.5rem',
                      fontSize: '1rem'
                    }}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div style={{marginBottom: '1.5rem'}}>
                <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '500'}}>
                  Password
                </label>
                <div style={{position: 'relative'}}>
                  <Lock size={16} style={{position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)'}} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Masukkan password Anda"
                    style={{
                      width: '100%',
                      padding: '0.75rem 2.5rem 0.75rem 2.5rem',
                      border: '2px solid var(--border-color)',
                      borderRadius: '0.5rem',
                      fontSize: '1rem'
                    }}
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
                      color: 'var(--text-light)'
                    }}
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button 
                type="submit" 
                className="btn btn-primary" 
                style={{width: '100%', marginBottom: '1rem'}}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'}}>
                    <div className="loading"></div>
                    Masuk...
                  </span>
                ) : (
                  'Masuk'
                )}
              </button>

              <div className="text-center">
                <p style={{color: 'var(--text-light)'}}>
                  Belum punya akun?{' '}
                  <Link to="/register" style={{color: 'var(--primary-color)', textDecoration: 'none'}}>
                    Daftar di sini
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;