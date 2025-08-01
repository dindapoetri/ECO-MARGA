import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { path: '/bank-sampah', label: 'Bank Sampah' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/submit', label: 'Submit Sampah' },
    { path: '/history', label: 'Riwayat' },
    { path: '/profile', label: 'Profil' }
  ];

  const socialLinks = [
    { 
      name: 'Instagram', 
      url: 'https://instagram.com/ecomarga', 
      icon: '📷' 
    },
    { 
      name: 'Facebook', 
      url: 'https://facebook.com/ecomarga', 
      icon: '📘' 
    },
    { 
      name: 'Twitter', 
      url: 'https://twitter.com/ecomarga', 
      icon: '🐦' 
    },
    { 
      name: 'YouTube', 
      url: 'https://youtube.com/ecomarga', 
      icon: '📺' 
    }
  ];

  return (
    <footer className="footer">
      <div className="container">
        {/* Main Footer Content */}
        <div className="footer-content">
          {/* Company Info */}
          <div className="footer-section">
            <div className="footer-logo">
              <span className="logo-icon">🌱</span>
              <span className="logo-text">EcoMarga</span>
            </div>
            <p className="footer-description">
              Platform digital bank sampah yang memudahkan pengelolaan sampah 
              dan memberikan reward kepada masyarakat untuk masa depan yang lebih hijau.
            </p>
            
            {/* Social Media */}
            <div className="social-links">
              <span className="social-title">Ikuti Kami:</span>
              <div className="social-icons">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    title={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="footer-section">
            <h3 className="footer-title">Link Cepat</h3>
            <ul className="footer-links">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div className="footer-section">
            <h3 className="footer-title">Kontak</h3>
            <div className="contact-info">
              <div className="contact-item">
                <span className="contact-icon">📧</span>
                <a href="mailto:support@ecomarga.com" className="contact-link">
                  support@ecomarga.com
                </a>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <a href="tel:+6281234567890" className="contact-link">
                  +62 812-3456-7890
                </a>
              </div>
              <div className="contact-item">
                <span className="contact-icon">💬</span>
                <a 
                  href="https://wa.me/6281234567890" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="contact-link"
                >
                  WhatsApp
                </a>
              </div>
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <span className="contact-text">Semarang, Jawa Tengah</span>
              </div>
            </div>
          </div>
          
          {/* App Info */}
          <div className="footer-section">
            <h3 className="footer-title">Tentang</h3>
            <ul className="footer-links">
              <li>
                <a href="/about" className="footer-link">Tentang EcoMarga</a>
              </li>
              <li>
                <a href="/how-it-works" className="footer-link">Cara Kerja</a>
              </li>
              <li>
                <a href="/privacy" className="footer-link">Kebijakan Privasi</a>
              </li>
              <li>
                <a href="/terms" className="footer-link">Syarat & Ketentuan</a>
              </li>
              <li>
                <a href="/help" className="footer-link">Bantuan</a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Stats Section */}
        <div className="footer-stats">
          <div className="stat-item">
            <span className="stat-number">1,234+</span>
            <span className="stat-label">Pengguna Aktif</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">15.6 Ton</span>
            <span className="stat-label">Sampah Terkumpul</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">Rp 45.2 Jt</span>
            <span className="stat-label">Total Reward</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">89</span>
            <span className="stat-label">Bank Sampah Mitra</span>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="copyright">
              <p>
                &copy; {currentYear} EcoMarga. Semua hak cipta dilindungi.
              </p>
              <p className="made-with">
                Dibuat dengan 💚 untuk lingkungan yang lebih baik
              </p>
            </div>
            
            <div className="footer-bottom-links">
              <a href="/privacy" className="bottom-link">Privacy</a>
              <span className="separator">•</span>
              <a href="/terms" className="bottom-link">Terms</a>
              <span className="separator">•</span>
              <a href="/sitemap" className="bottom-link">Sitemap</a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer {
          background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
          color: white;
          margin-top: auto;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 1rem;
        }

        .footer-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          padding: 3rem 0 2rem;
        }

        .footer-section {
          display: flex;
          flex-direction: column;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 1.5rem;
          font-weight: bold;
          color: var(--primary-color, #10b981);
          margin-bottom: 1rem;
        }

        .logo-icon {
          font-size: 2rem;
        }

        .footer-description {
          color: #d1d5db;
          line-height: 1.6;
          margin-bottom: 1.5rem;
          font-size: 0.95rem;
        }

        .social-links {
          margin-top: auto;
        }

        .social-title {
          font-size: 0.875rem;
          font-weight: 500;
          margin-bottom: 0.75rem;
          display: block;
        }

        .social-icons {
          display: flex;
          gap: 0.75rem;
        }

        .social-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 2.5rem;
          height: 2.5rem;
          background-color: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          color: white;
          text-decoration: none;
          font-size: 1.25rem;
          transition: all 0.3s ease;
        }

        .social-link:hover {
          background-color: var(--primary-color, #10b981);
          transform: translateY(-2px);
        }

        .footer-title {
          color: var(--primary-color, #10b981);
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 1rem;
        }

        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-links li {
          margin-bottom: 0.5rem;
        }

        .footer-link {
          color: #d1d5db;
          text-decoration: none;
          font-size: 0.95rem;
          transition: color 0.2s ease;
        }

        .footer-link:hover {
          color: var(--primary-color, #10b981);
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .contact-icon {
          font-size: 1.125rem;
          width: 1.5rem;
          text-align: center;
        }

        .contact-link {
          color: #d1d5db;
          text-decoration: none;
          font-size: 0.95rem;
          transition: color 0.2s ease;
        }

        .contact-link:hover {
          color: var(--primary-color, #10b981);
        }

        .contact-text {
          color: #d1d5db;
          font-size: 0.95rem;
        }

        .footer-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          padding: 2rem 0;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .stat-item {
          text-align: center;
          padding: 1rem;
        }

        .stat-number {
          display: block;
          font-size: 1.75rem;
          font-weight: bold;
          color: var(--primary-color, #10b981);
          margin-bottom: 0.25rem;
        }

        .stat-label {
          font-size: 0.875rem;
          color: #9ca3af;
        }

        .footer-bottom {
          padding: 1.5rem 0;
        }

        .footer-bottom-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .copyright {
          text-align: left;
        }

        .copyright p {
          margin: 0;
          color: #9ca3af;
          font-size: 0.875rem;
        }

        .made-with {
          font-size: 0.8rem !important;
          opacity: 0.8;
        }

        .footer-bottom-links {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .bottom-link {
          color: #9ca3af;
          text-decoration: none;
          font-size: 0.875rem;
          transition: color 0.2s ease;
        }

        .bottom-link:hover {
          color: var(--primary-color, #10b981);
        }

        .separator {
          color: #6b7280;
          font-size: 0.875rem;
        }

        /* Mobile Responsive */
        @media (max-width: 768px) {
          .footer-content {
            grid-template-columns: 1fr;
            gap: 2rem;
            padding: 2rem 0 1.5rem;
          }

          .footer-stats {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }

          .stat-item {
            padding: 0.75rem;
          }

          .stat-number {
            font-size: 1.5rem;
          }

          .footer-bottom-content {
            flex-direction: column;
            text-align: center;
          }

          .social-icons {
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .container {
            padding: 0 0.5rem;
          }

          .footer-stats {
            grid-template-columns: 1fr;
          }

          .footer-logo {
            justify-content: center;
          }

          .footer-section {
            text-align: center;
          }

          .contact-item {
            justify-content: center;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;