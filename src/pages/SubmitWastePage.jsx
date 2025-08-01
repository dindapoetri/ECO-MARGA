import React, { useState } from 'react';
import { Calculator, Package } from 'lucide-react';

const SubmitWastePage = () => {
  const [selectedType, setSelectedType] = useState(null);
  const [weight, setWeight] = useState('');
  
  const wasteTypes = [
    { id: 1, nama: 'Botol Plastik', harga_per_kg: 3000, icon: '🍶' },
    { id: 2, nama: 'Kertas Koran', harga_per_kg: 1500, icon: '📰' },
    { id: 3, nama: 'Kaleng Aluminium', harga_per_kg: 8000, icon: '🥤' },
    { id: 4, nama: 'Kardus', harga_per_kg: 2000, icon: '📦' }
  ];

  const calculation = selectedType && weight ? {
    nilaiRupiah: parseFloat(weight) * selectedType.harga_per_kg,
    platformFee: (parseFloat(weight) * selectedType.harga_per_kg) * 0.1,
    transferAmount: (parseFloat(weight) * selectedType.harga_per_kg) * 0.9
  } : null;

  return (
    <div style={{padding: '2rem 0', minHeight: '80vh'}}>
      <div className="container">
        <div style={{maxWidth: '800px', margin: '0 auto'}}>
          <div style={{marginBottom: '2rem'}}>
            <h1>Submit Sampah</h1>
            <p style={{color: 'var(--text-light)'}}>
              Pilih jenis sampah dan masukkan beratnya untuk menghitung reward
            </p>
          </div>

          {/* Step 1: Pilih Jenis Sampah */}
          <div className="card" style={{marginBottom: '2rem'}}>
            <h3 style={{marginBottom: '1rem'}}>1. Pilih Jenis Sampah</h3>
            <div className="grid grid-2">
              {wasteTypes.map(type => (
                <div
                  key={type.id}
                  onClick={() => setSelectedType(type)}
                  className={`card ${selectedType?.id === type.id ? 'selected' : ''}`}
                  style={{
                    cursor: 'pointer',
                    border: selectedType?.id === type.id ? '2px solid var(--primary-color)' : '2px solid transparent',
                    transition: 'all 0.2s'
                  }}
                >
                  <div style={{textAlign: 'center'}}>
                    <div style={{fontSize: '2rem', marginBottom: '0.5rem'}}>{type.icon}</div>
                    <h4>{type.nama}</h4>
                    <p style={{color: 'var(--primary-color)', fontWeight: 'bold'}}>
                      Rp {type.harga_per_kg.toLocaleString()}/kg
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Step 2: Input Berat */}
          {selectedType && (
            <div className="card" style={{marginBottom: '2rem'}}>
              <h3 style={{marginBottom: '1rem'}}>2. Input Berat Sampah</h3>
              <div style={{display: 'flex', alignItems: 'center', gap: '1rem', maxWidth: '300px'}}>
                <Package size={20} style={{color: 'var(--text-light)'}} />
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="0.0"
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    border: '2px solid var(--border-color)',
                    borderRadius: '0.5rem',
                    fontSize: '1rem'
                  }}
                />
                <span>kg</span>
              </div>
            </div>
          )}

          {/* Step 3: Calculation Preview */}
          {calculation && (
            <div className="card" style={{marginBottom: '2rem', background: 'linear-gradient(145deg, #f0fdf4, #ecfdf5)'}}>
              <h3 style={{marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                <Calculator size={20} />
                Kalkulasi Reward
              </h3>
              <div style={{space: 'y-2'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid var(--border-color)'}}>
                  <span>Nilai Total ({weight} kg × Rp {selectedType.harga_per_kg.toLocaleString()})</span>
                  <span>Rp {calculation.nilaiRupiah.toLocaleString()}</span>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid var(--border-color)'}}>
                  <span>Platform Fee (10%)</span>
                  <span>- Rp {calculation.platformFee.toLocaleString()}</span>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', fontWeight: 'bold', fontSize: '1.1rem', color: 'var(--primary-color)'}}>
                  <span>Yang Anda Terima</span>
                  <span>Rp {calculation.transferAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}

          {/* Submit Button */}
          {calculation && (
            <button className="btn btn-primary" style={{width: '100%', fontSize: '1rem', padding: '1rem'}}>
              Submit Sampah
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubmitWastePage;