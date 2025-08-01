import React, { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import Button from '../common/Button';
import { useAuth } from '../../context/AuthContext';

const RegisterForm = ({ onSuccess }) => {
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
    
    // Name validation
    if (!formData.nama.trim()) {
      errors.nama = 'Nama lengkap harus diisi';
    } else if (formData.nama.length < 2) {
      errors.nama = 'Nama minimal 2 karakter';
    } else if (formData.nama.length > 50) {
      errors.nama = 'Nama maksimal 50 karakter';
    }
    
    // Email validation
    if (!formData.email.trim()) {
      errors.email = 'Email harus diisi';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Format email tidak valid';
    }
    
    // Password validation
    if (!formData.password) {
      errors.password = 'Password harus diisi';
    } else if (formData.password.length < 6) {
      errors.password = 'Password minimal 6 karakter';
    }
    
    // Confirm password validation
    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Konfirmasi password harus diisi';
    } else if (formData.password !== formData.confirmPassword) {
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
        if (onSuccess) {
          onSuccess(result.user);
        }
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
    
    // Clear general error
    if (error) setError('');
  };

  const getInputStyle = (fieldName) => ({
    borderColor: validationErrors[fieldName] ? '#ef4444' : '#e5e7eb'
  });

  return (
    <div className="register-form">
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
          color: '#059669'
        }}>
          💡 <strong>Demo Mode:</strong> Registrasi akan membuat akun sementara di browser Anda
        </p>
      </div>

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

      {/* Register Form */}
      <form onSubmit={handleSubmit}>
        {/* Name Field */}
        <div className="form-group">
          <label className="form-label">Nama Lengkap</label>
          <div style={{ position: 'relative' }}>
            <User 
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
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              placeholder="Masukkan nama lengkap"
              className="form-input"
              style={{ 
                paddingLeft: '2.5rem',
                ...getInputStyle('nama')
              }}
              required
              disabled={isLoading}
            />
          </div>
          {validationErrors.nama && (
            <p style={{
              color: '#ef4444',
              fontSize: '0.75rem',
              marginTop: '0.25rem',
              marginBottom: 0
            }}>
              {validationErrors.nama}
            </p>
          )}
        </div>

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
              style={{ 
                paddingLeft: '2.5rem',
                ...getInputStyle('email')
              }}
              required
              disabled={isLoading}
            />
          </div>
          {validationErrors.email && (
            <p style={{
              color: '#ef4444',
              fontSize: '0.75rem',
              marginTop: '0.25rem',
              marginBottom: 0
            }}>
              {validationErrors.email}
            </p>
          )}
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
              placeholder="Masukkan password"
              className="form-input"
              style={{ 
                paddingLeft: '2.5rem',
                paddingRight: '2.5rem',
                ...getInputStyle('password')
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
                color: '#6b7280',
                padding: 0
              }}
              disabled={isLoading}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {validationErrors.password && (
            <p style={{
              color: '#ef4444',
              fontSize: '0.75rem',
              marginTop: '0.25rem',
              marginBottom: 0
            }}>
              {validationErrors.password}
            </p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="form-group">
          <label className="form-label">Konfirmasi Password</label>
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
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Konfirmasi password"
              className="form-input"
              style={{ 
                paddingLeft: '2.5rem',
                ...getInputStyle('confirmPassword')
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
                color: '#6b7280',
                padding: 0
              }}
              disabled={isLoading}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {/* <button
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
            </button> */}
            
          {validationErrors.confirmPassword && (
            <p style={{
              color: '#ef4444',
              fontSize: '0.75rem',
              marginTop: '0.25rem',
              marginBottom: 0
            }}>
              {validationErrors.confirmPassword}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <Button 
          type="submit" 
          variant="primary"
          loading={isLoading}
          disabled={isLoading}
          style={{ width: '100%', marginTop: '1rem' }}
        >
          {isLoading ? 'Mendaftar...' : 'Daftar Sekarang'}
        </Button>
      </form>
    </div>
  );
};

export default RegisterForm;