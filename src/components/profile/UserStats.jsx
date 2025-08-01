import React from 'react';
import { TrendingUp, Package, DollarSign, Leaf, Calendar, Award, Target, Zap } from 'lucide-react';

const UserStats = ({ userStats, loading = false }) => {
  // Default stats jika tidak ada data
  const stats = userStats || {
    total_earnings: 125000,
    submission_count: 8,
    total_weight: 15.5,
    environmental_impact: {
      co2_reduced: 12.5,
      trees_saved: 2,
      water_saved: 125,
      energy_saved: 85
    },
    streak_days: 7,
    rank: 'Bronze',
    monthly_target: 5,
    monthly_progress: 3
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (number) => {
    return new Intl.NumberFormat('id-ID').format(number);
  };

  const StatCard = ({ icon: Icon, title, value, subtitle, color = '#10b981', trend, trendValue }) => (
    <div style={{
      background: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '0.75rem',
      padding: '1.5rem',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.2s ease',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '60px',
        height: '60px',
        background: `linear-gradient(135deg, ${color}20, ${color}10)`,
        borderRadius: '0 0.75rem 0 100%'
      }} />
      
      <div style={{ position: 'relative' }}>
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
            borderRadius: '0.5rem',
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
        
        <div style={{ marginBottom: '0.5rem' }}>
          <span style={{
            fontSize: '1.75rem',
            fontWeight: 'bold',
            color: '#1f2937'
          }}>
            {value}
          </span>
          {trend && trendValue && (
            <span style={{
              marginLeft: '0.5rem',
              fontSize: '0.75rem',
              color: trend === 'up' ? '#10b981' : trend === 'down' ? '#ef4444' : '#6b7280',
              fontWeight: '500'
            }}>
              {trend === 'up' ? '↗️' : trend === 'down' ? '↘️' : '➡️'} {trendValue}
            </span>
          )}
        </div>
        
        <p style={{
          margin: 0,
          fontSize: '0.75rem',
          color: '#6b7280'
        }}>
          {subtitle}
        </p>
      </div>
    </div>
  );

  const ProgressCard = ({ title, current, target, unit, color = '#10b981' }) => {
    const percentage = Math.min((current / target) * 100, 100);
    
    return (
      <div style={{
        background: 'white',
        border: '1px solid #e5e7eb',
        borderRadius: '0.75rem',
        padding: '1.5rem',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem'
        }}>
          <h4 style={{ margin: 0, fontSize: '0.875rem', color: '#1f2937' }}>
            {title}
          </h4>
          <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>
            {current}/{target} {unit}
          </span>
        </div>
        
        <div style={{
          background: '#f3f4f6',
          borderRadius: '0.5rem',
          height: '8px',
          marginBottom: '0.5rem',
          overflow: 'hidden'
        }}>
          <div style={{
            background: color,
            height: '100%',
            width: `${percentage}%`,
            borderRadius: '0.5rem',
            transition: 'width 0.3s ease'
          }} />
        </div>
        
        <p style={{
          margin: 0,
          fontSize: '0.75rem',
          color: percentage >= 100 ? '#059669' : '#6b7280'
        }}>
          {percentage >= 100 ? '🎉 Target tercapai!' : `${(100 - percentage).toFixed(0)}% lagi untuk mencapai target`}
        </p>
      </div>
    );
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
        <div className="loading"></div>
      </div>
    );
  }

  return (
    <div className="user-stats">
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          📊 Statistik Anda
        </h3>
        <p style={{ color: '#6b7280', fontSize: '0.875rem', margin: 0 }}>
          Lihat pencapaian dan dampak lingkungan yang telah Anda buat
        </p>
      </div>

      {/* Main Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <StatCard
          icon={DollarSign}
          title="Total Penghasilan"
          value={formatCurrency(stats.total_earnings)}
          subtitle="Dari semua submission"
          color="#10b981"
          trend="up"
          trendValue="+15%"
        />
        
        <StatCard
          icon={Package}
          title="Total Submission"
          value={formatNumber(stats.submission_count)}
          subtitle="Sampah yang disubmit"
          color="#3b82f6"
          trend="up"
          trendValue="+2 bulan ini"
        />
        
        <StatCard
          icon={TrendingUp}
          title="Total Berat"
          value={`${stats.total_weight} kg`}
          subtitle="Sampah terkumpul"
          color="#f59e0b"
          trend="up"
          trendValue="+3.2 kg"
        />
        
        <StatCard
          icon={Award}
          title="Streak"
          value={`${stats.streak_days} hari`}
          subtitle="Submission berturut-turut"
          color="#8b5cf6"
        />
      </div>

      {/* Environmental Impact */}
      <div style={{
        background: 'linear-gradient(145deg, #ecfdf5, #f0fdf4)',
        border: '1px solid #10b981',
        borderRadius: '0.75rem',
        padding: '2rem',
        marginBottom: '2rem'
      }}>
        <h4 style={{
          marginBottom: '1.5rem',
          color: '#059669',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '1rem'
        }}>
          🌍 Dampak Lingkungan
        </h4>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '1rem'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#059669',
              marginBottom: '0.25rem'
            }}>
              {stats.environmental_impact.co2_reduced} kg
            </div>
            <p style={{ fontSize: '0.75rem', color: '#065f46', margin: 0 }}>
              🌱 CO2 Dikurangi
            </p>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#059669',
              marginBottom: '0.25rem'
            }}>
              {stats.environmental_impact.trees_saved}
            </div>
            <p style={{ fontSize: '0.75rem', color: '#065f46', margin: 0 }}>
              🌳 Setara Menanam Pohon
            </p>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#059669',
              marginBottom: '0.25rem'
            }}>
              {stats.environmental_impact.water_saved || 125} L
            </div>
            <p style={{ fontSize: '0.75rem', color: '#065f46', margin: 0 }}>
              💧 Air Dihemat
            </p>
          </div>
          
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: '#059669',
              marginBottom: '0.25rem'
            }}>
              {stats.environmental_impact.energy_saved || 85} kWh
            </div>
            <p style={{ fontSize: '0.75rem', color: '#065f46', margin: 0 }}>
              ⚡ Energi Dihemat
            </p>
          </div>
        </div>
      </div>

      {/* Progress & Goals */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <ProgressCard
          title="🎯 Target Bulanan"
          current={stats.monthly_progress || 3}
          target={stats.monthly_target || 5}
          unit="submission"
          color="#3b82f6"
        />
        
        <ProgressCard
          title="🏆 Menuju Rank Silver"
          current={stats.submission_count}
          target={15}
          unit="submission"
          color="#f59e0b"
        />
      </div>

      {/* Rank & Achievements */}
      <div style={{
        background: 'white',
        border: '1px solid #e5e7eb',
        borderRadius: '0.75rem',
        padding: '1.5rem',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
      }}>
        <h4 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          🏆 Rank & Pencapaian
        </h4>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '60px',
              height: '60px',
              background: 'linear-gradient(135deg, #cd7f32, #b87333)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem',
              color: 'white'
            }}>
              🥉
            </div>
            <div>
              <h5 style={{ margin: 0, color: '#1f2937' }}>
                {stats.rank || 'Bronze'} Member
              </h5>
              <p style={{ margin: 0, fontSize: '0.75rem', color: '#6b7280' }}>
                {stats.submission_count} submission
              </p>
            </div>
          </div>
          
          <div style={{ textAlign: 'right' }}>
            <p style={{ margin: 0, fontSize: '0.75rem', color: '#6b7280' }}>
              Next Rank: Silver
            </p>
            <p style={{ margin: 0, fontSize: '0.75rem', color: '#10b981' }}>
              {15 - stats.submission_count} submission lagi
            </p>
          </div>
        </div>
        
        {/* Achievement Badges */}
        <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid #e5e7eb' }}>
          <p style={{ margin: '0 0 0.75rem 0', fontSize: '0.75rem', color: '#6b7280' }}>
            🏅 Badge yang Diraih:
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span style={{
              background: '#ecfdf5',
              color: '#059669',
              padding: '0.25rem 0.75rem',
              borderRadius: '1rem',
              fontSize: '0.75rem',
              border: '1px solid #10b981'
            }}>
              🌱 First Submission
            </span>
            <span style={{
              background: '#eff6ff',
              color: '#1e40af',
              padding: '0.25rem 0.75rem',
              borderRadius: '1rem',
              fontSize: '0.75rem',
              border: '1px solid #3b82f6'
            }}>
              📦 5 Submissions
            </span>
            <span style={{
              background: '#fef3c7',
              color: '#92400e',
              padding: '0.25rem 0.75rem',
              borderRadius: '1rem',
              fontSize: '0.75rem',
              border: '1px solid #f59e0b'
            }}>
              🔥 Week Streak
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserStats;