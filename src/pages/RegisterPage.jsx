import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, isLoading } = useAuth();
  
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    
    if (!formData.nama.trim()) {
      errors.nama = 'Nama lengkap harus diisi';
    } else if (formData.nama.length < 2) {
      errors.nama = 'Nama minimal 2 karakter';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email harus diisi';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Format email tidak valid';
    }
    
    if (!formData.password) {
      errors.password = 'Password harus diisi';
    } else if (formData.password.length < 6) {
      errors.password = 'Password minimal 6 karakter';
    }
    
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Konfirmasi password tidak cocok';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) {
      return;
    }
    
    try {
      const result = await register(formData);
      
      if (result.success) {
        // Redirect to dashboard after successful registration
        navigate('/dashboard');
      } else {
        setError(result.error || 'Registrasi gagal. Silakan coba lagi.');
      }
    } catch (err) {
      setError('Terjadi kesalahan. Silakan coba lagi.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors({
        ...validationErrors,
        [name]: ''
      });
    }
  };

  return (
    <div style={{padding: '4rem 0', minHeight: '80vh', display: 'flex', alignItems: 'center'}}>
      <div className="container">
        <div style={{maxWidth: '400px', margin: '0 auto'}}>
          <div className="card">
            <div className="text-center mb-4">
              <h1>Daftar EcoMarga</h1>
              <p style={{color: 'var(--text-light)'}}>
                Bergabunglah dan mulai kelola sampah dengan bijak
              </p>
            </div>

            {/* Info Banner */}
            <div style={{
              marginBottom: '2rem',
              padding: '1rem',
              backgroundColor: '#ecfdf5',
              border: '1px solid #10b981',
              borderRadius: '0.5rem'
            }}>
              <p style={{
                margin: 0,
                fontSize: '0.875rem',
                color: 'var(--primary-color)'
              }}>
                💡 <strong>Demo Mode:</strong> Registrasi akan membuat akun sementara di browser Anda
              </p>
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
                  Nama Lengkap
                </label>
                <div style={{position: 'relative'}}>
                  <User size={16} style={{position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)'}} />
                  <input
                    type="text"
                    name="nama"
                    value={formData.nama}
                    onChange={handleChange}
                    placeholder="Masukkan nama lengkap"
                    style={{
                      width: '100%',
                      padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                      border: `2px solid ${validationErrors.nama ? '#ef4444' : 'var(--border-color)'}`,
                      borderRadius: '0.5rem',
                      fontSize: '1rem'
                    }}
                    required
                    disabled={isLoading}
                  />
                </div>
                {validationErrors.nama && (
                  <p style={{color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem'}}>
                    {validationErrors.nama}
                  </p>
                )}
              </div>

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
                      border: `2px solid ${validationErrors.email ? '#ef4444' : 'var(--border-color)'}`,
                      borderRadius: '0.5rem',
                      fontSize: '1rem'
                    }}
                    required
                    disabled={isLoading}
                  />
                </div>
                {validationErrors.email && (
                  <p style={{color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem'}}>
                    {validationErrors.email}
                  </p>
                )}
              </div>

              <div style={{marginBottom: '1rem'}}>
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
                    placeholder="Masukkan password"
                    style={{
                      width: '100%',
                      padding: '0.75rem 2.5rem 0.75rem 2.5rem',
                      border: `2px solid ${validationErrors.password ? '#ef4444' : 'var(--border-color)'}`,
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
                {validationErrors.password && (
                  <p style={{color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem'}}>
                    {validationErrors.password}
                  </p>
                )}
              </div>

              <div style={{marginBottom: '1.5rem'}}>
                <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: '500'}}>
                  Konfirmasi Password
                </label>
                <div style={{position: 'relative'}}>
                  <Lock size={16} style={{position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)'}} />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Konfirmasi password"
                    style={{
                      width: '100%',
                      padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                      border: `2px solid ${validationErrors.confirmPassword ? '#ef4444' : 'var(--border-color)'}`,
                      borderRadius: '0.5rem',
                      fontSize: '1rem'
                    }}
                    required
                    disabled={isLoading}
                  />
                </div>
                {validationErrors.confirmPassword && (
                  <p style={{color: '#ef4444', fontSize: '0.75rem', marginTop: '0.25rem'}}>
                    {validationErrors.confirmPassword}
                  </p>
                )}
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
                    Mendaftar...
                  </span>
                ) : (
                  'Daftar Sekarang'
                )}
              </button>

              <div className="text-center">
                <p style={{color: 'var(--text-light)'}}>
                  Sudah punya akun?{' '}
                  <Link to="/login" style={{color: 'var(--primary-color)', textDecoration: 'none'}}>
                    Masuk di sini
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

export default RegisterPage;