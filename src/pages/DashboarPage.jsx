import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TrendingUp, Package, DollarSign, Leaf } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useUser } from '../context/UserContext';
import AdminDashboard from './AdminDashboard'; // Import admin dashboard
// Uncomment next line for debugging
// import DebugInfo from '../components/DebugInfo';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const { userStats, loadUserData, isLoading } = useUser();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, authLoading, navigate]);

  // Load user data when component mounts
  useEffect(() => {
    if (user?.id) {
      loadUserData(user.id);
    }
  }, [user?.id, loadUserData]);

  // Loading Component
  const LoadingSpinner = ({ message = "Memuat..." }) => (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '60vh',
      flexDirection: 'column',
      gap: '1rem'
    }}>
      <div style={{
        width: '40px',
        height: '40px',
        border: '4px solid #e5e7eb',
        borderTop: '4px solid #10b981',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }}></div>
      <p style={{color: '#6b7280'}}>{message}</p>
      
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );

  // Show loading while checking authentication
  if (authLoading) {
    return <LoadingSpinner message="Memuat..." />;
  }

  // Don't render anything if not authenticated (will redirect)
  if (!isAuthenticated) {
    return null;
  }

  // Show Admin Dashboard for admin users
  if (user?.role === 'admin') {
    return <AdminDashboard />;
  }

  // Show loading while loading user data
  if (isLoading) {
    return <LoadingSpinner message="Memuat data dashboard..." />;
  }

  // Default stats if no data loaded yet (for regular users only)
  const stats = userStats || {
    total_earnings: 125000,
    submission_count: 8,
    total_weight: 15.5,
    environmental_impact: {
      co2_reduced: 12.5,
      trees_saved: 2
    }
  };

  // Action Card Component
  const ActionCard = ({ to, gradient, bgColor, children, style = {} }) => (
    <Link 
      to={to} 
      style={{
        textDecoration: 'none',
        display: 'block',
        padding: '2rem',
        borderRadius: '0.75rem',
        background: gradient || bgColor || 'white',
        border: !gradient ? '1px solid #e5e7eb' : 'none',
        color: gradient ? 'white' : '#1f2937',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
        ...style
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {children}
    </Link>
  );

  return (
    <div style={{padding: '2rem 0', minHeight: '80vh'}}>
      <div className="container">
        {/* Welcome Section */}
        <div style={{marginBottom: '2rem'}}>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            marginBottom: '0.5rem',
            color: '#1f2937'
          }}>
            Selamat datang, {user?.name || 'User'}! 👋
          </h1>
          <p style={{color: '#6b7280', fontSize: '1.1rem'}}>
            Berikut ringkasan aktivitas dan pencapaian Anda di EcoMarga
          </p>
        </div>

        {/* Stats Grid - User Only */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem'
        }}>
          <div className="card">
            <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
              <div style={{
                background: '#10b981', 
                color: 'white', 
                padding: '0.75rem', 
                borderRadius: '0.5rem'
              }}>
                <DollarSign size={24} />
              </div>
              <div>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: '#1f2937',
                  marginBottom: '0.25rem'
                }}>
                  Rp {stats.total_earnings.toLocaleString()}
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  color: '#6b7280'
                }}>
                  Total Penghasilan
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
              <div style={{
                background: '#3b82f6', 
                color: 'white', 
                padding: '0.75rem', 
                borderRadius: '0.5rem'
              }}>
                <Package size={24} />
              </div>
              <div>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: '#1f2937',
                  marginBottom: '0.25rem'
                }}>
                  {stats.submission_count}
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  color: '#6b7280'
                }}>
                  Total Submission
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
              <div style={{
                background: '#f59e0b', 
                color: 'white', 
                padding: '0.75rem', 
                borderRadius: '0.5rem'
              }}>
                <TrendingUp size={24} />
              </div>
              <div>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: '#1f2937',
                  marginBottom: '0.25rem'
                }}>
                  {stats.total_weight} kg
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  color: '#6b7280'
                }}>
                  Total Berat Sampah
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
              <div style={{
                background: '#10b981', 
                color: 'white', 
                padding: '0.75rem', 
                borderRadius: '0.5rem'
              }}>
                <Leaf size={24} />
              </div>
              <div>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: '#1f2937',
                  marginBottom: '0.25rem'
                }}>
                  {stats.environmental_impact.co2_reduced} kg
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  color: '#6b7280'
                }}>
                  CO2 Dikurangi
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Environmental Impact Section - User Only */}
        <div className="card" style={{
          marginBottom: '3rem',
          background: 'linear-gradient(145deg, #ecfdf5, #f0fdf4)',
          border: '1px solid #10b981'
        }}>
          <h3 style={{
            marginBottom: '1.5rem',
            color: '#10b981',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '1.25rem'
          }}>
            🌍 Dampak Lingkungan Anda
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem'
          }}>
            <div style={{textAlign: 'center'}}>
              <div style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: '#10b981',
                marginBottom: '0.5rem'
              }}>
                {stats.environmental_impact.co2_reduced} kg
              </div>
              <p style={{fontSize: '0.875rem', color: '#6b7280', margin: 0}}>
                🌱 CO2 yang berhasil dikurangi
              </p>
            </div>
            <div style={{textAlign: 'center'}}>
              <div style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: '#10b981',
                marginBottom: '0.5rem'
              }}>
                {stats.environmental_impact.trees_saved}
              </div>
              <p style={{fontSize: '0.875rem', color: '#6b7280', margin: 0}}>
                🌳 Setara dengan menanam pohon
              </p>
            </div>
            <div style={{textAlign: 'center'}}>
              <div style={{
                fontSize: '2rem',
                fontWeight: 'bold',
                color: '#10b981',
                marginBottom: '0.5rem'
              }}>
                {Math.round(stats.total_weight * 0.8)} L
              </div>
              <p style={{fontSize: '0.875rem', color: '#6b7280', margin: 0}}>
                💧 Air yang dihemat
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions - User Only */}
        <div>
          <h2 style={{marginBottom: '1.5rem', fontSize: '1.5rem', color: '#1f2937'}}>
            Aksi Cepat
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem'
          }}>
            <ActionCard 
              to="/submit" 
              gradient="linear-gradient(145deg, #10b981, #059669)"
            >
              <div style={{fontSize: '3rem', marginBottom: '1rem'}}>📱</div>
              <h3 style={{marginBottom: '0.5rem', color: 'white', fontSize: '1.25rem'}}>
                Submit Sampah
              </h3>
              <p style={{margin: 0, opacity: 0.9, fontSize: '0.9rem'}}>
                Catat sampah Anda dan dapatkan reward sekarang juga
              </p>
            </ActionCard>
            
            <ActionCard to="/history">
              <div style={{fontSize: '3rem', marginBottom: '1rem'}}>📊</div>
              <h3 style={{marginBottom: '0.5rem', fontSize: '1.25rem'}}>
                Riwayat Transaksi
              </h3>
              <p style={{margin: 0, color: '#6b7280', fontSize: '0.9rem'}}>
                Lihat semua submission dan status transfer Anda
              </p>
            </ActionCard>
            
            <ActionCard to="/bank-sampah">
              <div style={{fontSize: '3rem', marginBottom: '1rem'}}>🏪</div>
              <h3 style={{marginBottom: '0.5rem', fontSize: '1.25rem'}}>
                Bank Sampah
              </h3>
              <p style={{margin: 0, color: '#6b7280', fontSize: '0.9rem'}}>
                Temukan bank sampah mitra terdekat dari lokasi Anda
              </p>
            </ActionCard>
          </div>
        </div>

        {/* Recent Activity Section - User Only */}
        <div style={{marginTop: '3rem'}}>
          <h2 style={{marginBottom: '1.5rem', fontSize: '1.5rem', color: '#1f2937'}}>
            Aktivitas Terbaru
          </h2>
          <div className="card">
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '2rem',
              textAlign: 'center',
              color: '#6b7280'
            }}>
              <div style={{fontSize: '3rem', marginBottom: '1rem'}}>📋</div>
              <h4 style={{marginBottom: '0.5rem', color: '#1f2937'}}>
                Belum Ada Aktivitas
              </h4>
              <p style={{marginBottom: '1.5rem', color: '#6b7280'}}>
                Mulai submit sampah untuk melihat aktivitas terbaru
              </p>
              <Link to="/submit" className="btn btn-primary">
                Submit Sampah Sekarang
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Debug Component - Remove in production */}
      {/* <DebugInfo show={true} /> */}
    </div>
  );
};

export default DashboardPage;