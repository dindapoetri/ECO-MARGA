import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close menus when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [location.pathname]);

  // Navigation links - different for user and admin
  const publicNavLinks = [
    { path: '/', label: 'Beranda', icon: '🏠' },
    { path: '/bank-sampah', label: 'Bank Sampah', icon: '🏪' },
  ];

  const userNavLinks = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/submit', label: 'Submit', icon: '📱' },
    { path: '/history', label: 'Riwayat', icon: '📋' },
    { path: '/bank-sampah', label: 'Bank Sampah', icon: '🏪' },
  ];

  const adminNavLinks = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/admin/users', label: 'Kelola User', icon: '👥' },
    { path: '/admin/transactions', label: 'Transaksi', icon: '💳' },
    { path: '/admin/bank-sampah', label: 'Bank Sampah', icon: '🏪' },
    { path: '/admin/reports', label: 'Laporan', icon: '📈' },
    { path: '/admin/settings', label: 'Pengaturan', icon: '⚙️' },
  ];

  // Determine which navigation to show
  const getNavLinks = () => {
    if (!isAuthenticated) return publicNavLinks;
    if (user?.role === 'admin') return adminNavLinks;
    return userNavLinks;
  };

  const navLinks = getNavLinks();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/');
  };

  const handleLinkClick = (path) => {
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
    navigate(path);
  };

  // Inline styles
  const styles = {
    header: {
      background: '#ffffff',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      padding: '1rem 0',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 1rem',
    },
    headerContent: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '1.25rem',
      fontWeight: 'bold',
      color: '#10b981',
      textDecoration: 'none',
      transition: 'transform 0.2s ease',
    },
    logoIcon: {
      fontSize: '1.5rem',
    },
    navDesktop: {
      display: isMobile ? 'none' : 'flex',
    },
    navLinks: {
      display: 'flex',
      gap: user?.role === 'admin' ? '1.5rem' : '2rem',
      listStyle: 'none',
      margin: 0,
      padding: 0,
    },
    navLink: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      color: '#1f2937',
      textDecoration: 'none',
      fontWeight: 500,
      padding: '0.5rem 1rem',
      borderRadius: '0.5rem',
      transition: 'all 0.2s ease',
      cursor: 'pointer',
      border: 'none',
      background: 'none',
      outline: 'none',
      boxShadow: 'none',
      fontSize: user?.role === 'admin' ? '0.875rem' : '1rem',
    },
    navLinkActive: {
      color: '#10b981',
      backgroundColor: '#f3f4f6',
    },
    navIcon: {
      fontSize: user?.role === 'admin' ? '0.875rem' : '1rem',
    },
    authSection: {
      display: isMobile ? 'none' : 'flex',
      alignItems: 'center',
    },
    authButtons: {
      display: 'flex',
      gap: '0.5rem',
    },
    btn: {
      padding: '0.75rem 1.5rem',
      border: 'none',
      borderRadius: '0.5rem',
      fontWeight: 500,
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      textDecoration: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.5rem',
      fontSize: '0.875rem',
    },
    btnPrimary: {
      backgroundColor: '#10b981',
      color: 'white',
    },
    btnOutline: {
      backgroundColor: 'transparent',
      color: '#10b981',
      border: '2px solid #10b981',
    },
    userMenuBtn: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '0.5rem',
      borderRadius: '0.5rem',
      transition: 'background-color 0.2s',
      outline: 'none',
      boxShadow: 'none',
    },
    userAvatar: {
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      backgroundColor: user?.role === 'admin' ? '#3b82f6' : '#10b981',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '0.875rem',
      fontWeight: 'bold',
    },
    userDropdown: {
      position: 'absolute',
      top: '100%',
      right: 0,
      marginTop: '0.5rem',
      backgroundColor: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '0.5rem',
      boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
      minWidth: '200px',
      zIndex: 1000,
    },
    dropdownHeader: {
      padding: '0.75rem',
      borderBottom: '1px solid #e5e7eb',
      background: user?.role === 'admin' ? '#eff6ff' : '#f0fdf4',
    },
    dropdownItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.75rem',
      textDecoration: 'none',
      color: '#1f2937',
      fontSize: '0.875rem',
      transition: 'background-color 0.2s',
      border: 'none',
      background: 'none',
      width: '100%',
      cursor: 'pointer',
      outline: 'none',
      boxShadow: 'none',
    },
    dropdownItemLogout: {
      color: '#ef4444',
      borderTop: '1px solid #e5e7eb',
    },
    mobileMenuBtn: {
      display: isMobile ? 'block' : 'none',
      background: 'none',
      border: 'none',
      fontSize: '1.5rem',
      cursor: 'pointer',
      padding: '0.5rem',
      color: '#1f2937',
      outline: 'none',
      boxShadow: 'none',
    },
    navMobile: {
      display: isMobileMenuOpen ? 'block' : 'none',
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      background: '#ffffff',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      borderTop: '1px solid #e5e7eb',
    },
    mobileNavLinks: {
      listStyle: 'none',
      margin: 0,
      padding: '1rem 0',
    },
    mobileNavLink: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      color: '#1f2937',
      textDecoration: 'none',
      fontWeight: 500,
      padding: '1rem 1.5rem',
      transition: 'all 0.2s ease',
      border: 'none',
      background: 'none',
      width: '100%',
      textAlign: 'left',
      cursor: 'pointer',
      outline: 'none',
      boxShadow: 'none',
    },
    mobileAuthDivider: {
      borderTop: '1px solid #e5e7eb',
      margin: '0.5rem 0',
    },
    adminBadge: {
      background: '#3b82f6',
      color: 'white',
      padding: '0.25rem 0.5rem',
      borderRadius: '0.25rem',
      fontSize: '0.75rem',
      fontWeight: '500',
      marginLeft: '0.5rem',
    },
  };

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <div style={styles.headerContent}>
          {/* Logo */}
          <Link 
            to="/" 
            style={styles.logo}
            onClick={() => handleLinkClick('/')}
          >
            <span style={styles.logoIcon}>🌱</span>
            <span className="logo-text">EcoMarga</span>
            {user?.role === 'admin' && (
              <span style={styles.adminBadge}>Admin</span>
            )}
          </Link>
          
          {/* Desktop Navigation */}
          <nav style={styles.navDesktop}>
            <ul style={styles.navLinks}>
              {navLinks.map(link => (
                <li key={link.path}>
                  <button
                    onClick={() => handleLinkClick(link.path)}
                    style={{
                      ...styles.navLink,
                      ...(location.pathname === link.path ? styles.navLinkActive : {})
                    }}
                    onMouseEnter={(e) => {
                      if (location.pathname !== link.path) {
                        e.target.style.color = '#10b981';
                        e.target.style.backgroundColor = '#f3f4f6';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (location.pathname !== link.path) {
                        e.target.style.color = '#1f2937';
                        e.target.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    <span style={styles.navIcon}>{link.icon}</span>
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Auth Section */}
          <div style={styles.authSection}>
            {isAuthenticated ? (
              /* User Menu */
              <div style={{position: 'relative'}}>
                <button 
                  style={styles.userMenuBtn}
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  <div style={styles.userAvatar}>
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <span style={{fontSize: '0.875rem', fontWeight: '500'}}>
                    {user?.name || 'User'}
                  </span>
                  <span style={{fontSize: '0.75rem'}}>▼</span>
                </button>

                {/* Dropdown Menu */}
                {isUserMenuOpen && (
                  <div style={styles.userDropdown}>
                    <div style={styles.dropdownHeader}>
                      <div style={{fontWeight: '500', fontSize: '0.875rem'}}>
                        {user?.name}
                        {user?.role === 'admin' && (
                          <span style={{
                            ...styles.adminBadge,
                            marginLeft: '0.5rem',
                            fontSize: '0.625rem'
                          }}>
                            Administrator
                          </span>
                        )}
                      </div>
                      <div style={{fontSize: '0.75rem', color: '#6b7280'}}>
                        {user?.email}
                      </div>
                    </div>
                    
                    <button
                      onClick={() => handleLinkClick('/profile')}
                      style={styles.dropdownItem}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                    >
                      👤 Profil Saya
                    </button>
                    
                    {user?.role === 'admin' && (
                      <button
                        onClick={() => handleLinkClick('/admin/settings')}
                        style={styles.dropdownItem}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                      >
                        ⚙️ Pengaturan Sistem
                      </button>
                    )}
                    
                    <button
                      onClick={handleLogout}
                      style={{...styles.dropdownItem, ...styles.dropdownItemLogout}}
                      onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                      onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                    >
                      🚪 Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Auth Buttons for non-authenticated users */
              <div style={styles.authButtons}>
                <button
                  onClick={() => handleLinkClick('/login')}
                  style={{...styles.btn, ...styles.btnOutline}}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#10b981';
                    e.target.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = '#10b981';
                  }}
                >
                  🔐 Masuk
                </button>
                <button
                  onClick={() => handleLinkClick('/register')}
                  style={{...styles.btn, ...styles.btnPrimary}}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#059669';
                    e.target.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#10b981';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  ✨ Daftar
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            style={styles.mobileMenuBtn}
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <span>☰</span>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div style={styles.navMobile}>
          <ul style={styles.mobileNavLinks}>
            {navLinks.map(link => (
              <li key={link.path}>
                <button
                  onClick={() => handleLinkClick(link.path)}
                  style={{
                    ...styles.mobileNavLink,
                    ...(location.pathname === link.path ? {
                      color: '#10b981',
                      backgroundColor: '#f3f4f6'
                    } : {})
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.color = '#10b981';
                    e.target.style.backgroundColor = '#f3f4f6';
                  }}
                  onMouseLeave={(e) => {
                    if (location.pathname !== link.path) {
                      e.target.style.color = '#1f2937';
                      e.target.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <span>{link.icon}</span>
                  <span>{link.label}</span>
                </button>
              </li>
            ))}
            
            {/* Mobile Auth Section */}
            <li style={styles.mobileAuthDivider}></li>
            
            {isAuthenticated ? (
              <>
                <li>
                  <button
                    onClick={() => handleLinkClick('/profile')}
                    style={styles.mobileNavLink}
                  >
                    👤 Profil ({user?.name})
                    {user?.role === 'admin' && (
                      <span style={{
                        ...styles.adminBadge,
                        marginLeft: '0.5rem',
                        fontSize: '0.625rem'
                      }}>
                        Admin
                      </span>
                    )}
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    style={{...styles.mobileNavLink, color: '#ef4444'}}
                  >
                    🚪 Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <button
                    onClick={() => handleLinkClick('/login')}
                    style={styles.mobileNavLink}
                  >
                    🔐 Masuk
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleLinkClick('/register')}
                    style={{...styles.mobileNavLink, color: '#10b981', fontWeight: 600}}
                  >
                    ✨ Daftar
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;