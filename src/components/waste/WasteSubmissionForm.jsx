import React, { useState } from 'react';
import { Package, Camera, MapPin, CreditCard } from 'lucide-react';
import Button from '../common/Button';
import WasteTypeCard from './WasteTypeCard';
import CalculationPreview from './CalculationPreview';
import { wasteTypes, calculatePrice } from '../../data/wasteTypes';

const WasteSubmissionForm = ({ onSubmit, loading = false }) => {
  const [formData, setFormData] = useState({
    wasteType: null,
    weight: '',
    photos: [],
    location: null,
    notes: '',
    ewalletType: 'dana',
    ewalletNumber: ''
  });
  
  const [currentStep, setCurrentStep] = useState(1);
  const [calculation, setCalculation] = useState(null);
  const [errors, setErrors] = useState({});

  const ewalletOptions = [
    { value: 'dana', label: 'DANA', icon: '💙' },
    { value: 'ovo', label: 'OVO', icon: '💜' },
    { value: 'gopay', label: 'GoPay', icon: '💚' },
    { value: 'linkaja', label: 'LinkAja', icon: '❤️' },
    { value: 'shopeepay', label: 'ShopeePay', icon: '🧡' }
  ];

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData.wasteType) {
          newErrors.wasteType = 'Pilih jenis sampah terlebih dahulu';
        }
        break;
      case 2:
        if (!formData.weight || parseFloat(formData.weight) <= 0) {
          newErrors.weight = 'Berat sampah harus lebih dari 0';
        } else if (parseFloat(formData.weight) > 100) {
          newErrors.weight = 'Berat maksimal 100 kg per submission';
        }
        break;
      case 3:
        if (!formData.ewalletNumber) {
          newErrors.ewalletNumber = 'Nomor e-wallet harus diisi';
        } else if (!/^(\+62|62|0)8[1-9][0-9]{6,9}$/.test(formData.ewalletNumber)) {
          newErrors.ewalletNumber = 'Format nomor telepon tidak valid';
        }
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
      
      // Calculate when moving to step 3
      if (currentStep === 2 && formData.wasteType && formData.weight) {
        const calc = calculatePrice(formData.wasteType.id, parseFloat(formData.weight));
        setCalculation(calc);
      }
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
    setErrors({});
  };

  const handleWasteTypeSelect = (wasteType) => {
    setFormData(prev => ({ ...prev, wasteType }));
    setErrors(prev => ({ ...prev, wasteType: '' }));
  };

  const handleWeightChange = (weight) => {
    setFormData(prev => ({ ...prev, weight }));
    setErrors(prev => ({ ...prev, weight: '' }));
    
    // Real-time calculation
    if (formData.wasteType && weight && parseFloat(weight) > 0) {
      const calc = calculatePrice(formData.wasteType.id, parseFloat(weight));
      setCalculation(calc);
    } else {
      setCalculation(null);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) {
      return;
    }

    const submissionData = {
      ...formData,
      calculation,
      submittedAt: new Date(),
      id: Date.now()
    };

    if (onSubmit) {
      await onSubmit(submissionData);
    }
  };

  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => 
      file.type.startsWith('image/') && file.size <= 5 * 1024 * 1024 // 5MB max
    );

    if (validFiles.length !== files.length) {
      alert('Beberapa file tidak valid. Pastikan file berformat gambar dan ukuran < 5MB');
    }

    setFormData(prev => ({
      ...prev,
      photos: [...prev.photos, ...validFiles].slice(0, 3) // Max 3 photos
    }));
  };

  const removePhoto = (index) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            location: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
          }));
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Tidak bisa mendapatkan lokasi. Pastikan GPS aktif.');
        }
      );
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div>
            <h3 style={{ marginBottom: '1rem' }}>
              1. Pilih Jenis Sampah
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1rem'
            }}>
              {wasteTypes.map(type => (
                <WasteTypeCard
                  key={type.id}
                  wasteType={type}
                  selected={formData.wasteType?.id === type.id}
                  onClick={() => handleWasteTypeSelect(type)}
                />
              ))}
            </div>
            {errors.wasteType && (
              <p style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                {errors.wasteType}
              </p>
            )}
          </div>
        );

      case 2:
        return (
          <div>
            <h3 style={{ marginBottom: '1rem' }}>
              2. Input Berat & Detail
            </h3>
            
            {/* Weight Input */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '500'
              }}>
                Berat Sampah (kg)
              </label>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                maxWidth: '300px'
              }}>
                <Package size={20} style={{ color: '#6b7280' }} />
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  max="100"
                  value={formData.weight}
                  onChange={(e) => handleWeightChange(e.target.value)}
                  placeholder="0.0"
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    border: `2px solid ${errors.weight ? '#ef4444' : '#e5e7eb'}`,
                    borderRadius: '0.5rem',
                    fontSize: '1rem'
                  }}
                />
                <span>kg</span>
              </div>
              {errors.weight && (
                <p style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                  {errors.weight}
                </p>
              )}
            </div>

            {/* Photo Upload */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '500'
              }}>
                Foto Sampah (Opsional, max 3)
              </label>
              <div style={{
                border: '2px dashed #d1d5db',
                borderRadius: '0.5rem',
                padding: '2rem',
                textAlign: 'center',
                background: '#f9fafb'
              }}>
                <Camera size={48} style={{ color: '#9ca3af', marginBottom: '1rem' }} />
                <p style={{ marginBottom: '1rem', color: '#6b7280' }}>
                  Ambil foto sampah untuk verifikasi
                </p>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoUpload}
                  style={{ display: 'none' }}
                  id="photo-upload"
                />
                <label htmlFor="photo-upload">
                  <Button variant="outline" style={{ cursor: 'pointer' }}>
                    📸 Pilih Foto
                  </Button>
                </label>
              </div>
              
              {/* Photo Preview */}
              {formData.photos.length > 0 && (
                <div style={{
                  display: 'flex',
                  gap: '0.5rem',
                  marginTop: '1rem',
                  flexWrap: 'wrap'
                }}>
                  {formData.photos.map((photo, index) => (
                    <div key={index} style={{
                      position: 'relative',
                      width: '80px',
                      height: '80px',
                      borderRadius: '0.5rem',
                      overflow: 'hidden',
                      border: '2px solid #e5e7eb'
                    }}>
                      <img
                        src={URL.createObjectURL(photo)}
                        alt={`Preview ${index + 1}`}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                      />
                      <button
                        onClick={() => removePhoto(index)}
                        style={{
                          position: 'absolute',
                          top: '4px',
                          right: '4px',
                          background: '#ef4444',
                          color: 'white',
                          border: 'none',
                          borderRadius: '50%',
                          width: '20px',
                          height: '20px',
                          fontSize: '12px',
                          cursor: 'pointer'
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Location */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '500'
              }}>
                Lokasi (Opsional)
              </label>
              <Button
                variant="outline"
                onClick={getCurrentLocation}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <MapPin size={16} />
                {formData.location ? '📍 Lokasi Terdeteksi' : 'Dapatkan Lokasi'}
              </Button>
            </div>

            {/* Notes */}
            <div>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '500'
              }}>
                Catatan Tambahan (Opsional)
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Tambahkan catatan jika diperlukan..."
                rows={3}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid #e5e7eb',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  resize: 'vertical'
                }}
              />
            </div>

            {/* Real-time calculation preview */}
            {calculation && (
              <CalculationPreview
                wasteType={formData.wasteType}
                weight={formData.weight}
                calculation={calculation}
                compact={true}
              />
            )}
          </div>
        );

      case 3:
        return (
          <div>
            <h3 style={{ marginBottom: '1rem' }}>
              3. Konfirmasi & E-Wallet
            </h3>

            {/* Calculation Summary */}
            {calculation && (
              <CalculationPreview
                wasteType={formData.wasteType}
                weight={formData.weight}
                calculation={calculation}
                showDetails={true}
              />
            )}

            {/* E-wallet Selection */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '500'
              }}>
                Pilih E-Wallet untuk Transfer
              </label>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))',
                gap: '0.5rem',
                marginBottom: '1rem'
              }}>
                {ewalletOptions.map(option => (
                  <button
                    key={option.value}
                    onClick={() => setFormData(prev => ({ ...prev, ewalletType: option.value }))}
                    style={{
                      padding: '0.75rem',
                      border: `2px solid ${formData.ewalletType === option.value ? '#10b981' : '#e5e7eb'}`,
                      borderRadius: '0.5rem',
                      background: formData.ewalletType === option.value ? '#f0fdf4' : 'white',
                      cursor: 'pointer',
                      textAlign: 'center',
                      fontSize: '0.875rem',
                      fontWeight: '500'
                    }}
                  >
                    <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>
                      {option.icon}
                    </div>
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* E-wallet Number */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: '500'
              }}>
                Nomor {ewalletOptions.find(e => e.value === formData.ewalletType)?.label}
              </label>
              <div style={{ position: 'relative' }}>
                <CreditCard 
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
                  type="tel"
                  value={formData.ewalletNumber}
                  onChange={(e) => setFormData(prev => ({ ...prev, ewalletNumber: e.target.value }))}
                  placeholder="08xxxxxxxxxx"
                  style={{
                    width: '100%',
                    padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                    border: `2px solid ${errors.ewalletNumber ? '#ef4444' : '#e5e7eb'}`,
                    borderRadius: '0.5rem',
                    fontSize: '1rem'
                  }}
                />
              </div>
              {errors.ewalletNumber && (
                <p style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                  {errors.ewalletNumber}
                </p>
              )}
            </div>

            {/* Submission Summary */}
            <div style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '0.5rem',
              padding: '1rem'
            }}>
              <h4 style={{ marginBottom: '0.75rem', fontSize: '0.875rem' }}>
                📋 Ringkasan Submission
              </h4>
              <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                <p style={{ margin: '0.25rem 0' }}>
                  • Jenis: {formData.wasteType?.nama}
                </p>
                <p style={{ margin: '0.25rem 0' }}>
                  • Berat: {formData.weight} kg
                </p>
                <p style={{ margin: '0.25rem 0' }}>
                  • Foto: {formData.photos.length} gambar
                </p>
                <p style={{ margin: '0.25rem 0' }}>
                  • Lokasi: {formData.location ? 'Terdeteksi' : 'Tidak ada'}
                </p>
                <p style={{ margin: '0.25rem 0' }}>
                  • Transfer ke: {ewalletOptions.find(e => e.value === formData.ewalletType)?.label}
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="waste-submission-form">
      {/* Progress Indicator */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '2rem'
      }}>
        {[1, 2, 3].map(step => (
          <div key={step} style={{
            display: 'flex',
            alignItems: 'center'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: step <= currentStep ? '#10b981' : '#e5e7eb',
              color: step <= currentStep ? 'white' : '#6b7280',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold'
            }}>
              {step}
            </div>
            {step < 3 && (
              <div style={{
                width: '60px',
                height: '2px',
                background: step < currentStep ? '#10b981' : '#e5e7eb',
                marginLeft: '8px',
                marginRight: '8px'
              }} />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        {renderStep()}
      </div>

      {/* Navigation Buttons */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: '1rem'
      }}>
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 1}
          style={{ flex: 1 }}
        >
          ← Sebelumnya
        </Button>
        
        {currentStep < 3 ? (
          <Button
            variant="primary"
            onClick={handleNext}
            disabled={!formData.wasteType && currentStep === 1}
            style={{ flex: 1 }}
          >
            Selanjutnya →
          </Button>
        ) : (
          <Button
            variant="primary"
            onClick={handleSubmit}
            loading={loading}
            disabled={loading}
            style={{ flex: 1, fontSize: '1rem', fontWeight: '600' }}
          >
            {loading ? 'Memproses...' : '🚀 Submit Sampah'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default WasteSubmissionForm;