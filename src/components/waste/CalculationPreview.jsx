import React from 'react';
import { Calculator, Info, TrendingUp, Coins } from 'lucide-react';

const CalculationPreview = ({ 
  wasteType, 
  weight, 
  calculation, 
  platformFeePercentage = 10,
  showDetails = true,
  compact = false 
}) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatWeight = (weight) => {
    return `${parseFloat(weight).toFixed(1)} kg`;
  };

  if (!wasteType || !weight || !calculation) {
    return null;
  }

  if (compact) {
    return (
      <div style={{
        background: 'linear-gradient(145deg, #f0fdf4, #ecfdf5)',
        border: '1px solid #10b981',
        borderRadius: '0.5rem',
        padding: '1rem',
        marginBottom: '1rem'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <h4 style={{ margin: 0, fontSize: '0.875rem', color: '#059669' }}>
              {wasteType.nama} • {formatWeight(weight)}
            </h4>
            <p style={{ margin: 0, fontSize: '0.75rem', color: '#065f46' }}>
              @ {formatCurrency(wasteType.harga_per_kg)}/kg
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ 
              fontSize: '1.25rem', 
              fontWeight: 'bold', 
              color: '#059669' 
            }}>
              {formatCurrency(calculation.userReceives)}
            </div>
            <div style={{ 
              fontSize: '0.75rem', 
              color: '#065f46' 
            }}>
              Anda terima
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      background: 'linear-gradient(145deg, #f0fdf4, #ecfdf5)',
      border: '1px solid #10b981',
      borderRadius: '0.75rem',
      padding: '2rem',
      marginBottom: '2rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '100px',
        height: '100px',
        background: 'linear-gradient(135deg, #10b98120, #10b98110)',
        borderRadius: '0 0.75rem 0 100%'
      }} />

      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        marginBottom: '1.5rem',
        position: 'relative'
      }}>
        <div style={{
          background: '#10b981',
          color: 'white',
          padding: '0.5rem',
          borderRadius: '0.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Calculator size={20} />
        </div>
        <div>
          <h3 style={{
            margin: 0,
            color: '#059669',
            fontSize: '1.25rem',
            fontWeight: '600'
          }}>
            Kalkulasi Reward
          </h3>
          <p style={{
            margin: 0,
            fontSize: '0.875rem',
            color: '#065f46'
          }}>
            {wasteType.nama} • {formatWeight(weight)}
          </p>
        </div>
      </div>

      {/* Waste Type Info */}
      <div style={{
        background: 'white',
        borderRadius: '0.5rem',
        padding: '1rem',
        marginBottom: '1.5rem',
        border: '1px solid #d1fae5'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '0.75rem'
        }}>
          <span style={{ fontSize: '2rem' }}>{wasteType.icon}</span>
          <div style={{ flex: 1 }}>
            <h4 style={{ margin: 0, color: '#1f2937' }}>
              {wasteType.nama}
            </h4>
            <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>
              {wasteType.deskripsi}
            </p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ 
              fontSize: '1.125rem', 
              fontWeight: 'bold', 
              color: '#10b981' 
            }}>
              {formatCurrency(wasteType.harga_per_kg)}
            </div>
            <div style={{ 
              fontSize: '0.75rem', 
              color: '#6b7280' 
            }}>
              per kg
            </div>
          </div>
        </div>
        
        {wasteType.tips && (
          <div style={{
            background: '#eff6ff',
            border: '1px solid #3b82f6',
            borderRadius: '0.375rem',
            padding: '0.75rem',
            display: 'flex',
            gap: '0.5rem'
          }}>
            <Info size={16} style={{ color: '#3b82f6', marginTop: '2px' }} />
            <p style={{
              margin: 0,
              fontSize: '0.75rem',
              color: '#1e40af'
            }}>
              <strong>Tips:</strong> {wasteType.tips}
            </p>
          </div>
        )}
      </div>

      {/* Calculation Breakdown */}
      <div style={{ position: 'relative' }}>
        {showDetails && (
          <>
            {/* Total Value */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0.75rem 0',
              borderBottom: '1px solid #d1fae5'
            }}>
              <span style={{ color: '#065f46', fontWeight: '500' }}>
                Nilai Total ({formatWeight(weight)} × {formatCurrency(wasteType.harga_per_kg)})
              </span>
              <span style={{ fontWeight: '600', color: '#1f2937' }}>
                {formatCurrency(calculation.totalValue)}
              </span>
            </div>

            {/* Platform Fee */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0.75rem 0',
              borderBottom: '1px solid #d1fae5'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: '#065f46', fontWeight: '500' }}>
                  Platform Fee ({platformFeePercentage}%)
                </span>
                <div 
                  title="Platform fee digunakan untuk operasional sistem dan maintenance"
                  style={{
                    background: '#6b7280',
                    color: 'white',
                    borderRadius: '50%',
                    width: '16px',
                    height: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.75rem',
                    cursor: 'help'
                  }}
                >
                  ?
                </div>
              </div>
              <span style={{ fontWeight: '600', color: '#ef4444' }}>
                - {formatCurrency(calculation.platformFee)}
              </span>
            </div>
          </>
        )}

        {/* Final Amount */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem 0 0.5rem 0',
          background: 'white',
          borderRadius: '0.5rem',
          margin: '1rem -1rem 0 -1rem',
          paddingLeft: '1rem',
          paddingRight: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Coins size={20} style={{ color: '#10b981' }} />
            <span style={{ 
              fontSize: '1.125rem',
              fontWeight: '600', 
              color: '#1f2937' 
            }}>
              Yang Anda Terima
            </span>
          </div>
          <span style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#10b981'
          }}>
            {formatCurrency(calculation.userReceives)}
          </span>
        </div>

        {/* Environmental Impact Estimate */}
        <div style={{
          marginTop: '1rem',
          padding: '1rem',
          background: 'rgba(16, 185, 129, 0.1)',
          borderRadius: '0.5rem',
          border: '1px solid #a7f3d0'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '0.75rem'
          }}>
            <TrendingUp size={16} style={{ color: '#059669' }} />
            <h5 style={{
              margin: 0,
              fontSize: '0.875rem',
              color: '#059669',
              fontWeight: '600'
            }}>
              Estimasi Dampak Lingkungan
            </h5>
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: '0.75rem'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '1rem',
                fontWeight: 'bold',
                color: '#059669'
              }}>
                {(parseFloat(weight) * 0.8).toFixed(1)} kg
              </div>
              <div style={{
                fontSize: '0.75rem',
                color: '#065f46'
              }}>
                🌱 CO2 Dikurangi
              </div>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '1rem',
                fontWeight: 'bold',
                color: '#059669'
              }}>
                {(parseFloat(weight) * 10).toFixed(0)} L
              </div>
              <div style={{
                fontSize: '0.75rem',
                color: '#065f46'
              }}>
                💧 Air Dihemat
              </div>
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '1rem',
                fontWeight: 'bold',
                color: '#059669'
              }}>
                {(parseFloat(weight) * 1.2).toFixed(1)} kWh
              </div>
              <div style={{
                fontSize: '0.75rem',
                color: '#065f46'
              }}>
                ⚡ Energi Dihemat
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculationPreview;