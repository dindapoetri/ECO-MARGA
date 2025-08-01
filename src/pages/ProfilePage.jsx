import React, { useState } from 'react';

const ProfilePage = () => {
  // Data dummy user
  const [userProfile, setUserProfile] = useState({
    nama: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+62 812-3456-7890',
    address: 'Jl. Contoh No. 123, Semarang',
    join_date: '2024-01-01',
    ewallet_accounts: {
      dana: '081234567890',
      ovo: '081234567890',
      gopay: '081234567890'
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(userProfile);

  const handleEdit = () => {
    setIsEditing(true);
    setFormData(userProfile);
  };

  const handleSave = () => {
    setUserProfile(formData);
    setIsEditing(false);
    alert('Profil berhasil diperbarui!');
  };

  const handleCancel = () => {
    setFormData(userProfile);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('ewallet_')) {
      const walletType = name.replace('ewallet_', '');
      setFormData({
        ...formData,
        ewallet_accounts: {
          ...formData.ewallet_accounts,
          [walletType]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  };

  // Stats dummy
  const userStats = {
    total_earnings: 125000,
    submission_count: 8,
    member_since_days: Math.floor((new Date() - new Date(userProfile.join_date)) / (1000 * 60 * 60 * 24))
  };

  return (
    <div style={{ padding: '2rem 0', minHeight: '80vh' }}>
      <div className="container">
        <div style={{ marginBottom: '2rem' }}>
          <h1>Profil Pengguna</h1>
          <p style={{ color: 'var(--text-light)' }}>
            Kelola informasi pribadi dan pengaturan akun Anda
          </p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '2rem' 
        }}>
          {/* Profile Info Card */}
          <div className="card">
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '1.5rem'
            }}>
              <h3>Informasi Pribadi</h3>
              {!isEditing && (
                <button 
                  onClick={handleEdit}
                  className="btn btn-outline"
                  style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}
                >
                  ✏️ Edit
                </button>
              )}
            </div>

            <form>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  fontWeight: '500',
                  fontSize: '0.875rem'
                }}>
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  disabled={!isEditing}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid var(--border-color)',
                    borderRadius: '0.5rem',
                    fontSize: '1rem',
                    backgroundColor: isEditing ? 'white' : 'var(--secondary-color)'
                  }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  fontWeight: '500',
                  fontSize: '0.875rem'
                }}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid var(--border-color)',
                    borderRadius: '0.5rem',
                    fontSize: '1rem',
                    backgroundColor: isEditing ? 'white' : 'var(--secondary-color)'
                  }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  fontWeight: '500',
                  fontSize: '0.875rem'
                }}>
                  Nomor Telepon
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid var(--border-color)',
                    borderRadius: '0.5rem',
                    fontSize: '1rem',
                    backgroundColor: isEditing ? 'white' : 'var(--secondary-color)'
                  }}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '0.5rem', 
                  fontWeight: '500',
                  fontSize: '0.875rem'
                }}>
                  Alamat
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  disabled={!isEditing}
                  rows="3"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '2px solid var(--border-color)',
                    borderRadius: '0.5rem',
                    fontSize: '1rem',
                    backgroundColor: isEditing ? 'white' : 'var(--secondary-color)',
                    resize: 'vertical'
                  }}
                />
              </div>

              {isEditing && (
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button 
                    type="button"
                    onClick={handleSave}
                    className="btn btn-primary"
                    style={{ flex: 1 }}
                  >
                    💾 Simpan
                  </button>
                  <button 
                    type="button"
                    onClick={handleCancel}
                    className="btn btn-outline"
                    style={{ flex: 1 }}
                  >
                    ❌ Batal
                  </button>
                </div>
              )}
            </form>

            <div style={{ 
              marginTop: '1.5rem', 
              paddingTop: '1.5rem', 
              borderTop: '1px solid var(--border-color)',
              fontSize: '0.875rem',
              color: 'var(--text-light)'
            }}>
              👤 Bergabung sejak {formatDate(userProfile.join_date)}
            </div>
          </div>

          {/* E-Wallet Settings Card */}
          <div className="card">
            <h3 style={{ marginBottom: '1.5rem' }}>Pengaturan E-Wallet</h3>
            
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                fontWeight: '500',
                fontSize: '0.875rem'
              }}>
                💙 DANA
              </label>
              <input
                type="text"
                name="ewallet_dana"
                value={formData.ewallet_accounts.dana}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="Nomor telepon DANA"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid var(--border-color)',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  backgroundColor: isEditing ? 'white' : 'var(--secondary-color)'
                }}
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                fontWeight: '500',
                fontSize: '0.875rem'
              }}>
                💜 OVO
              </label>
              <input
                type="text"
                name="ewallet_ovo"
                value={formData.ewallet_accounts.ovo}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="Nomor telepon OVO"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid var(--border-color)',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  backgroundColor: isEditing ? 'white' : 'var(--secondary-color)'
                }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ 
                display: 'block', 
                marginBottom: '0.5rem', 
                fontWeight: '500',
                fontSize: '0.875rem'
              }}>
                💚 GoPay
              </label>
              <input
                type="text"
                name="ewallet_gopay"
                value={formData.ewallet_accounts.gopay}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder="Nomor telepon GoPay"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '2px solid var(--border-color)',
                  borderRadius: '0.5rem',
                  fontSize: '1rem',
                  backgroundColor: isEditing ? 'white' : 'var(--secondary-color)'
                }}
              />
            </div>

            <div style={{ 
              padding: '1rem',
              backgroundColor: 'var(--secondary-color)',
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              color: 'var(--text-light)'
            }}>
              💡 <strong>Tips:</strong> Pastikan nomor telepon e-wallet yang Anda masukkan 
              sudah terdaftar dan aktif untuk menerima transfer reward.
            </div>
          </div>
        </div>

        {/* User Stats */}
        <div className="card" style={{ marginTop: '2rem' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Statistik Anda</h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '1rem' 
          }}>
            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <div style={{ 
                fontSize: '2rem', 
                fontWeight: 'bold', 
                color: 'var(--primary-color)',
                marginBottom: '0.5rem'
              }}>
                Rp {userStats.total_earnings.toLocaleString()}
              </div>
              <div style={{ color: 'var(--text-light)', fontSize: '0.875rem' }}>
                Total Penghasilan
              </div>
            </div>

            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <div style={{ 
                fontSize: '2rem', 
                fontWeight: 'bold', 
                color: 'var(--primary-color)',
                marginBottom: '0.5rem'
              }}>
                {userStats.submission_count}
              </div>
              <div style={{ color: 'var(--text-light)', fontSize: '0.875rem' }}>
                Total Submission
              </div>
            </div>

            <div style={{ textAlign: 'center', padding: '1rem' }}>
              <div style={{ 
                fontSize: '2rem', 
                fontWeight: 'bold', 
                color: 'var(--primary-color)',
                marginBottom: '0.5rem'
              }}>
                {userStats.member_since_days}
              </div>
              <div style={{ color: 'var(--text-light)', fontSize: '0.875rem' }}>
                Hari Bergabung
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          marginTop: '2rem',
          flexWrap: 'wrap'
        }}>
          <a href="/submit" className="btn btn-primary">
            📱 Submit Sampah Baru
          </a>
          <a href="/history" className="btn btn-outline">
            📊 Lihat Riwayat
          </a>
          <button 
            className="btn btn-outline"
            style={{ color: 'var(--error-color)', borderColor: 'var(--error-color)' }}
            onClick={() => {
              if (confirm('Apakah Anda yakin ingin logout?')) {
                alert('Logout berhasil!');
                // Implement logout logic
              }
            }}
          >
            🚪 Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;