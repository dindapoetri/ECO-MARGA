import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Users, Package, DollarSign, TrendingUp, AlertCircle, CheckCircle, Settings, FileText, BarChart3, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading } = useAuth();

  // Redirect if not admin
  useEffect(() => {
    if (!isLoading && (!isAuthenticated || user?.role !== 'admin')) {
      navigate('/login');
    }
  }, [isAuthenticated, user?.role, isLoading, navigate]);

  // Don't render if not admin
  if (!isAuthenticated || user?.role !== 'admin') {
    return null;
  }

  const adminStats = {
    totalUsers: 1234,
    activeBankSampah: 89,
    totalTransactions: 5678,
    pendingApprovals: 23,
    totalRevenue: 150000000,
    totalWasteProcessed: 15600,
    co2Reduced: 12400,
    monthlyGrowth: 15.2,
    systemUptime: 99.9,
    activeUserGrowth: 8.5
  };

  const recentTransactions = [
    { id: 1, user: 'John Doe', type: 'Botol Plastik', amount: 7500, status: 'pending', time: '10 menit lalu' },
    { id: 2, user: 'Jane Smith', type: 'Kardus', amount: 10000, status: 'approved', time: '25 menit lalu' },
    { id: 3, user: 'Bob Wilson', type: 'Kaleng Aluminium', amount: 9600, status: 'pending', time: '1 jam lalu' },
    { id: 4, user: 'Alice Johnson', type: 'Kertas', amount: 5000, status: 'approved', time: '2 jam lalu' },
    { id: 5, user: 'Mike Brown', type: 'Plastik Kemasan', amount: 3200, status: 'pending', time: '3 jam lalu' },
  ];

  const systemAlerts = [
    { type: 'warning', message: '23 transaksi menunggu approval', action: 'Review' },
    { type: 'info', message: 'Update sistem tersedia v2.1.0', action: 'Update' },
    { type: 'success', message: 'Backup berhasil dilakukan', action: 'View' },
  ];

  const AdminStatCard = ({ icon: Icon, title, value, subtitle, trend, color = '#10b981' }) => (
    <div style={{
      background: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '12px',
      padding: '1.5rem',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '80px',
        height: '80px',
        background: `linear-gradient(135deg, ${color}20, ${color}10)`,
        borderRadius: '0 12px 0 100%'
      }} />
      
      <div style={{display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between'}}>
        <div style={{flex: 1}}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1rem'
          }}>
            <div style={{
              background: color,
              color: 'white',
              padding: '0.5rem',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Icon size={20} />
            </div>
            <h4 style={{
              margin: 0,
              fontSize: '0.875rem',
              fontWeight: '500',
              color: '#6b7280',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              {title}
            </h4>
          </div>
          
          <div style={{marginBottom: '0.5rem'}}>
            <span style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: '#1f2937'
            }}>
              {value}
            </span>
            {trend && (
              <span style={{
                marginLeft: '0.5rem',
                fontSize: '0.875rem',
                color: trend > 0 ? '#10b981' : '#ef4444',
                fontWeight: '500'
              }}>
                {trend > 0 ? '+' : ''}{trend}%
              </span>
            )}
          </div>
          
          <p style={{
            margin: 0,
            fontSize: '0.875rem',
            color: '#6b7280'
          }}>
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );

  const AlertCard = ({ type, message, action }) => {
    const alertStyles = {
      warning: { bg: '#fef3c7', border: '#f59e0b', text: '#92400e', icon: '⚠️' },
      info: { bg: '#dbeafe', border: '#3b82f6', text: '#1e40af', icon: 'ℹ️' },
      success: { bg: '#d1fae5', border: '#10b981', text: '#065f46', icon: '✅' },
    };

    const style = alertStyles[type];

    return (
      <div style={{
        background: style.bg,
        border: `1px solid ${style.border}`,
        borderRadius: '8px',
        padding: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem'
      }}>
        <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem'}}>
          <span style={{fontSize: '1.125rem'}}>{style.icon}</span>
          <span style={{color: style.text, fontSize: '0.875rem', fontWeight: '500'}}>
            {message}
          </span>
        </div>
        <button style={{
          background: style.border,
          color: 'white',
          border: 'none',
          padding: '0.375rem 0.75rem',
          borderRadius: '4px',
          fontSize: '0.75rem',
          fontWeight: '500',
          cursor: 'pointer'
        }}>
          {action}
        </button>
      </div>
    );
  };

  return (
    <div style={{
      padding: '2rem 0',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'
    }}>
      <div className="container">
        {/* Admin Header */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '2rem',
          marginBottom: '2rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem'}}>
            <div>
              <h1 style={{
                margin: '0 0 0.5rem 0',
                fontSize: '2rem',
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #1f2937, #3b82f6)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <Shield size={32} />
                Admin Control Panel
              </h1>
              <p style={{margin: 0, color: '#6b7280', fontSize: '1rem'}}>
                Selamat datang, {user?.name} • Kelola dan monitor sistem EcoMarga
              </p>
            </div>
            <div style={{display: 'flex', gap: '0.75rem'}}>
              <div style={{
                background: '#f3f4f6',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                fontSize: '0.875rem',
                color: '#374151'
              }}>
                Uptime: {adminStats.systemUptime}%
              </div>
              <div style={{
                background: '#10b981',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                fontSize: '0.875rem',
                fontWeight: '500'
              }}>
                System Active
              </div>
            </div>
          </div>
        </div>

        {/* System Alerts */}
        <div style={{marginBottom: '2rem'}}>
          <h3 style={{marginBottom: '1rem', color: '#1f2937', fontSize: '1.125rem', fontWeight: '600'}}>
            🔔 System Alerts
          </h3>
          <div style={{display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
            {systemAlerts.map((alert, index) => (
              <AlertCard key={index} {...alert} />
            ))}
          </div>
        </div>

        {/* Admin Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem'
        }}>
          <AdminStatCard
            icon={Users}
            title="Total Users"
            value={adminStats.totalUsers.toLocaleString()}
            subtitle="Pengguna terdaftar"
            trend={adminStats.activeUserGrowth}
            color="#3b82f6"
          />
          <AdminStatCard
            icon={Package}
            title="Bank Sampah"
            value={adminStats.activeBankSampah}
            subtitle="Mitra aktif"
            color="#10b981"
          />
          <AdminStatCard
            icon={DollarSign}
            title="Revenue"
            value={`Rp ${(adminStats.totalRevenue / 1000000).toFixed(1)}M`}
            subtitle="Total pendapatan"
            trend={adminStats.monthlyGrowth}
            color="#f59e0b"
          />
          <AdminStatCard
            icon={AlertCircle}
            title="Pending"
            value={adminStats.pendingApprovals}
            subtitle="Menunggu approval"
            color={adminStats.pendingApprovals > 20 ? "#ef4444" : "#10b981"}
          />
        </div>

        {/* Performance Metrics */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '2rem',
          marginBottom: '3rem',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e5e7eb'
        }}>
          <h3 style={{
            marginBottom: '1.5rem',
            color: '#1f2937',
            fontSize: '1.25rem',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <BarChart3 size={24} />
            Platform Performance
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem'
          }}>
            <div style={{textAlign: 'center', padding: '1rem'}}>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                color: '#3b82f6',
                marginBottom: '0.5rem'
              }}>
                {adminStats.totalTransactions.toLocaleString()}
              </div>
              <p style={{fontSize: '0.875rem', color: '#6b7280', margin: 0}}>
                Total Transaksi
              </p>
            </div>
            <div style={{textAlign: 'center', padding: '1rem'}}>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                color: '#10b981',
                marginBottom: '0.5rem'
              }}>
                {(adminStats.totalWasteProcessed / 1000).toFixed(1)}T
              </div>
              <p style={{fontSize: '0.875rem', color: '#6b7280', margin: 0}}>
                Sampah Diproses
              </p>
            </div>
            <div style={{textAlign: 'center', padding: '1rem'}}>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                color: '#059669',
                marginBottom: '0.5rem'
              }}>
                {(adminStats.co2Reduced / 1000).toFixed(1)}T
              </div>
              <p style={{fontSize: '0.875rem', color: '#6b7280', margin: 0}}>
                CO2 Dikurangi
              </p>
            </div>
            <div style={{textAlign: 'center', padding: '1rem'}}>
              <div style={{
                fontSize: '2.5rem',
                fontWeight: 'bold',
                color: '#f59e0b',
                marginBottom: '0.5rem'
              }}>
                +{adminStats.monthlyGrowth}%
              </div>
              <p style={{fontSize: '0.875rem', color: '#6b7280', margin: 0}}>
                Pertumbuhan Bulanan
              </p>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '2rem'
        }}>
          {/* Recent Transactions */}
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            border: '1px solid #e5e7eb'
          }}>
            <h3 style={{
              marginBottom: '1.5rem',
              color: '#1f2937',
              fontSize: '1.125rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <FileText size={20} />
              Recent Transactions
            </h3>
            <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
              {recentTransactions.map(transaction => (
                <div key={transaction.id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1rem',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  transition: 'all 0.2s ease'
                }}>
                  <div style={{flex: 1}}>
                    <div style={{fontWeight: '600', color: '#1f2937', marginBottom: '0.25rem'}}>
                      {transaction.user}
                    </div>
                    <div style={{fontSize: '0.875rem', color: '#6b7280'}}>
                      {transaction.type} • {transaction.time}
                    </div>
                  </div>
                  <div style={{textAlign: 'right'}}>
                    <div style={{fontWeight: '600', color: '#1f2937', marginBottom: '0.25rem'}}>
                      Rp {transaction.amount.toLocaleString()}
                    </div>
                    <div style={{
                      fontSize: '0.75rem',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '12px',
                      color: 'white',
                      backgroundColor: transaction.status === 'approved' ? '#10b981' : '#f59e0b',
                      fontWeight: '500',
                      textAlign: 'center'
                    }}>
                      {transaction.status === 'approved' ? 'Approved' : 'Pending'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/admin/transactions" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginTop: '1.5rem',
              color: '#3b82f6',
              textDecoration: 'none',
              fontSize: '0.875rem',
              fontWeight: '500',
              padding: '0.5rem 1rem',
              background: '#eff6ff',
              borderRadius: '8px',
              transition: 'all 0.2s ease'
            }}>
              View All Transactions →
            </Link>
          </div>

          {/* Admin Quick Actions */}
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            border: '1px solid #e5e7eb'
          }}>
            <h3 style={{
              marginBottom: '1.5rem',
              color: '#1f2937',
              fontSize: '1.125rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <Settings size={20} />
              Admin Actions
            </h3>
            <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
              <Link to="/admin/users" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem',
                background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '8px',
                fontWeight: '500',
                transition: 'all 0.2s ease'
              }}>
                <Users size={20} />
                Kelola Pengguna
              </Link>
              
              <Link to="/admin/transactions" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem',
                background: '#f8fafc',
                color: '#374151',
                textDecoration: 'none',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontWeight: '500',
                transition: 'all 0.2s ease'
              }}>
                <CheckCircle size={20} />
                Approve Transaksi
                {adminStats.pendingApprovals > 0 && (
                  <span style={{
                    background: '#ef4444',
                    color: 'white',
                    fontSize: '0.75rem',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '12px',
                    marginLeft: 'auto'
                  }}>
                    {adminStats.pendingApprovals}
                  </span>
                )}
              </Link>
              
              <Link to="/admin/bank-sampah" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem',
                background: '#f8fafc',
                color: '#374151',
                textDecoration: 'none',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontWeight: '500',
                transition: 'all 0.2s ease'
              }}>
                <Package size={20} />
                Kelola Bank Sampah
              </Link>
              
              <Link to="/admin/reports" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem',
                background: '#f8fafc',
                color: '#374151',
                textDecoration: 'none',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontWeight: '500',
                transition: 'all 0.2s ease'
              }}>
                <BarChart3 size={20} />
                Lihat Laporan
              </Link>
              
              <Link to="/admin/settings" style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem',
                background: '#f8fafc',
                color: '#374151',
                textDecoration: 'none',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontWeight: '500',
                transition: 'all 0.2s ease'
              }}>
                <Settings size={20} />
                Pengaturan Sistem
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;