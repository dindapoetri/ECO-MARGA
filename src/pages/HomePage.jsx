import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Recycle, TreePine, DollarSign } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>Kelola Sampah, Raih Manfaat</h1>
          <p>
            Platform digital bank sampah yang memudahkan Anda mengelola sampah 
            dan mendapatkan reward finansial sambil menjaga lingkungan.
          </p>
          <div style={{display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap'}}>
            <Link to="/register" className="btn btn-primary">
              Mulai Sekarang <ArrowRight size={16} />
            </Link>
            <Link to="/bank-sampah" className="btn btn-outline">
              Cari Bank Sampah
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{padding: '4rem 0'}}>
        <div className="container">
          <h2 className="text-center mb-4">Mengapa Pilih EcoMarga?</h2>
          <div className="action-cards">
            <div className="action-card primary">
              <DollarSign className="action-icon" size={48} />
              <h3>Dapatkan Reward</h3>
              <p>Tukar sampah Anda dengan uang tunai yang langsung masuk ke e-wallet</p>
            </div>
            <div className="action-card secondary">
              <TreePine className="action-icon" size={48} />
              <h3>Jaga Lingkungan</h3>
              <p>Berkontribusi dalam menjaga kelestarian lingkungan untuk generasi mendatang</p>
            </div>
            <div className="action-card tertiary">
              <Recycle className="action-icon" size={48} />
              <h3>Mudah & Praktis</h3>
              <p>Submit sampah kapan saja, dimana saja dengan aplikasi yang user-friendly</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{padding: '4rem 0', backgroundColor: 'var(--secondary-color)'}}>
        <div className="container">
          <h2 className="text-center mb-4">Dampak Bersama</h2>
          <div className="stats-grid">
            <div className="stat-card card">
              <span className="stat-number">1,234</span>
              <span className="stat-label">Pengguna Aktif</span>
            </div>
            <div className="stat-card card">
              <span className="stat-number">15.6 Ton</span>
              <span className="stat-label">Sampah Terkumpul</span>
            </div>
            <div className="stat-card card">
              <span className="stat-number">Rp 45.2 Jt</span>
              <span className="stat-label">Total Reward</span>
            </div>
            <div className="stat-card card">
              <span className="stat-number">89</span>
              <span className="stat-label">Bank Sampah Mitra</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{padding: '4rem 0'}}>
        <div className="container text-center">
          <h2>Siap Mulai Perjalanan Ramah Lingkungan?</h2>
          <p style={{marginBottom: '2rem', color: 'var(--text-light)'}}>
            Bergabunglah dengan ribuan orang yang sudah merasakan manfaat EcoMarga
          </p>
          <Link to="/register" className="btn btn-primary">
            Daftar Gratis Sekarang
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;