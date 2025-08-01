import React, { useState } from 'react';
import { CreditCard, Check, AlertCircle } from 'lucide-react';
import Button from '../common/Button';

const EwalletSetup = ({ userProfile, onUpdate, isEditing = false }) => {
  const [ewalletData, setEwalletData] = useState({
    dana: userProfile?.ewallet_accounts?.dana || '',
    ovo: userProfile?.ewallet_accounts?.ovo || '',
    gopay: userProfile?.ewallet_accounts?.gopay || '',
    linkaja: userProfile?.ewallet_accounts?.linkaja || '',
    shopeepay: userProfile?.ewallet_accounts?.shopeepay || ''
  });
  
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const ewalletOptions = [
    {
      key: 'dana',
      name: 'DANA',
      icon: '💙',
      color: '#118EEA',
      placeholder: 'Nomor telepon DANA (08xxxxxxxxxx)',
      description: 'E-wallet DANA untuk menerima transfer'
    },
    {
      key: 'ovo',
      name: 'OVO',
      icon: '💜',
      color: '#4C3494',
      placeholder: 'Nomor telepon OVO (08xxxxxxxxxx)',
      description: 'E-wallet OVO untuk menerima transfer'
    },
    {
      key: 'gopay',
      name: 'GoPay',
      icon: '💚',
      color: '#00AA13',
      placeholder: 'Nomor telepon GoPay (08xxxxxxxxxx)',
      description: 'E-wallet GoPay untuk menerima transfer'
    },
    {
      key: 'linkaja',
      name: 'LinkAja',
      icon: '❤️',
      color: '#E61E2B',
      placeholder: 'Nomor telepon LinkAja (08xxxxxxxxxx)',
      description: 'E-wallet LinkAja untuk menerima transfer'
    },
    {
      key: 'shopeepay',
      name: 'ShopeePay',
      icon: '🧡',
      color: '#FF5722',
      placeholder: 'Nomor telepon ShopeePay (08xxxxxxxxxx)',
      description: 'E-wallet ShopeePay untuk menerima transfer'
    }
  ];

  const validatePhoneNumber = (phone) => {
    // Indonesian phone number validation
    const phoneRegex = /^(\+62|62|0)8[1-9][0-9]{6,9}$/;
    return phoneRegex.test(phone);
  };

  const handleInputChange = (key, value) => {
    setEwalletData(prev => ({
      ...prev,
      [key]: value
    }));

    // Clear error when user starts typing
    if (errors[key]) {
      setErrors(prev => ({
        ...prev,
        [key]: ''
      }));
    }

    // Clear success message
    if (successMessage) {
      setSuccessMessage('');
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    Object.keys(ewalletData).forEach(key => {
      const value = ewalletData[key];
      if (value && !validatePhoneNumber(value)) {
        newErrors[key] = 'Format nomor telepon tidak valid';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (onUpdate) {
        await onUpdate({
          ewallet_accounts: ewalletData
        });
      }
      
      setSuccessMessage('Pengaturan e-wallet berhasil disimpan!');
    } catch (error) {
      console.error('Error saving e-wallet settings:', error);
      setErrors({ general: 'Gagal menyimpan pengaturan. Silakan coba lagi.' });
    } finally {
      setLoading(false);
    }
  };

  const getActiveEwallets = () => {
    return Object.entries(ewalletData).filter(([key, value]) => value.trim() !== '');
  };

  return (
    <div className="ewallet-setup">
      <div style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem',
          marginBottom: '0.5rem'
        }}>
          <CreditCard size={20} />
          Pengaturan E-Wallet
        </h3>
        <p style={{ 
          color: '#6b7280', 
          fontSize: '0.875rem',
          margin: 0 
        }}>
          Atur akun e-wallet untuk menerima transfer reward dari submission sampah
        </p>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div style={{
          background: '#ecfdf5',
          border: '1px solid #10b981',
          color: '#059669',
          padding: '0.75rem',
          borderRadius: '0.5rem',
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <Check size={16} />
          {successMessage}
        </div>
      )}

      {/* General Error */}
      {errors.general && (
        <div style={{
          background: '#fee2e2',
          border: '1px solid #ef4444',
          color: '#dc2626',
          padding: '0.75rem',
          borderRadius: '0.5rem',
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <AlertCircle size={16} />
          {errors.general}
        </div>
      )}

      {/* E-wallet Forms */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {ewalletOptions.map((ewallet) => (
          <div key={ewallet.key} style={{
            border: '1px solid #e5e7eb',
            borderRadius: '0.75rem',
            padding: '1rem',
            background: ewalletData[ewallet.key] ? '#f8fafc' : 'white'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.75rem',
              marginBottom: '0.75rem'
            }}>
              <span style={{ fontSize: '1.5rem' }}>{ewallet.icon}</span>
              <div>
                <h4 style={{ 
                  margin: 0, 
                  fontSize: '1rem',
                  color: ewallet.color 
                }}>
                  {ewallet.name}
                </h4>
                <p style={{ 
                  margin: 0, 
                  fontSize: '0.75rem', 
                  color: '#6b7280' 
                }}>
                  {ewallet.description}
                </p>
              </div>
              {ewalletData[ewallet.key] && (
                <div style={{
                  marginLeft: 'auto',
                  background: '#10b981',
                  color: 'white',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '0.25rem',
                  fontSize: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}>
                  <Check size={12} />
                  Aktif
                </div>
              )}
            </div>

            <div>
              <input
                type="tel"
                value={ewalletData[ewallet.key]}
                onChange={(e) => handleInputChange(ewallet.key, e.target.value)}
                placeholder={ewallet.placeholder}
                disabled={!isEditing}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: `2px solid ${errors[ewallet.key] ? '#ef4444' : '#e5e7eb'}`,
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  background: isEditing ? 'white' : '#f3f4f6'
                }}
              />
              {errors[ewallet.key] && (
                <p style={{
                  color: '#ef4444',
                  fontSize: '0.75rem',
                  marginTop: '0.25rem',
                  margin: '0.25rem 0 0 0'
                }}>
                  {errors[ewallet.key]}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Save Button */}
      {isEditing && (
        <div style={{ marginTop: '1.5rem' }}>
          <Button
            onClick={handleSave}
            loading={loading}
            disabled={loading}
            style={{ width: '100%' }}
          >
            💾 Simpan Pengaturan E-Wallet
          </Button>
        </div>
      )}

      {/* Active E-wallets Summary */}
      {!isEditing && getActiveEwallets().length > 0 && (
        <div style={{
          marginTop: '1.5rem',
          padding: '1rem',
          background: '#f0fdf4',
          border: '1px solid #10b981',
          borderRadius: '0.5rem'
        }}>
          <h4 style={{ 
            margin: '0 0 0.75rem 0', 
            color: '#059669',
            fontSize: '0.875rem'
          }}>
            ✅ E-Wallet Aktif ({getActiveEwallets().length})
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {getActiveEwallets().map(([key, value]) => {
              const ewallet = ewalletOptions.find(e => e.key === key);
              return (
                <div key={key} style={{
                  background: 'white',
                  border: `1px solid ${ewallet.color}`,
                  color: ewallet.color,
                  padding: '0.25rem 0.75rem',
                  borderRadius: '1rem',
                  fontSize: '0.75rem',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}>
                  {ewallet.icon} {ewallet.name}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Info Tips */}
      <div style={{
        marginTop: '1.5rem',
        padding: '1rem',
        background: '#eff6ff',
        border: '1px solid #3b82f6',
        borderRadius: '0.5rem'
      }}>
        <h4 style={{ 
          margin: '0 0 0.75rem 0', 
          color: '#1e40af',
          fontSize: '0.875rem'
        }}>
          💡 Tips Pengaturan E-Wallet
        </h4>
        <ul style={{ 
          margin: 0, 
          paddingLeft: '1rem',
          fontSize: '0.875rem',
          color: '#1e40af'
        }}>
          <li>Pastikan nomor telepon sudah terdaftar di e-wallet yang dipilih</li>
          <li>Gunakan format nomor Indonesia (08xxxxxxxxxx)</li>
          <li>Anda bisa mengaktifkan lebih dari satu e-wallet</li>
          <li>Transfer akan dilakukan ke e-wallet yang dipilih saat submission</li>
        </ul>
      </div>
    </div>
  );
};

export default EwalletSetup;