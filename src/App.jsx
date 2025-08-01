import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import ProtectedRoute from "./components/common/ProtectedRoute";

// Pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboarPage";
import SubmitWastePage from "./pages/SubmitWastePage";
import HistoryPage from "./pages/HistoryPage";
import ProfilePage from "./pages/ProfilePage";
import BankSampah from "./pages/BankSampah";

// Context Providers
import AuthProvider from "./context/AuthContext";
import UserProvider from "./context/UserContext";

// Styles
import "./index.css";
import "./styles/globals.css";
import "./styles/pages.css";

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <h1 style={{ color: '#ef4444', marginBottom: '1rem' }}>
            Oops! Terjadi Kesalahan
          </h1>
          <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
            Mohon maaf, terjadi kesalahan yang tidak terduga. Silakan refresh halaman.
          </p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              background: '#10b981',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              cursor: 'pointer'
            }}
          >
            Refresh Halaman
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// 404 Page Component
const NotFoundPage = () => (
  <div style={{
    padding: '4rem 0',
    textAlign: 'center',
    minHeight: '60vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }}>
    <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🌿</div>
    <h1 style={{ 
      fontSize: '2rem', 
      marginBottom: '1rem',
      color: '#1f2937'
    }}>
      404 - Halaman Tidak Ditemukan
    </h1>
    <p style={{ 
      color: '#6b7280', 
      marginBottom: '2rem',
      maxWidth: '400px'
    }}>
      Halaman yang Anda cari tidak tersedia atau mungkin telah dipindahkan.
    </p>
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <a 
        href="/" 
        style={{
          background: '#10b981',
          color: 'white',
          padding: '0.75rem 1.5rem',
          borderRadius: '0.5rem',
          textDecoration: 'none',
          fontWeight: '500'
        }}
      >
        Kembali ke Beranda
      </a>
      <a 
        href="/dashboard" 
        style={{
          background: 'transparent',
          color: '#10b981',
          border: '2px solid #10b981',
          padding: '0.75rem 1.5rem',
          borderRadius: '0.5rem',
          textDecoration: 'none',
          fontWeight: '500'
        }}
      >
        📊 Dashboard
      </a>
    </div>
  </div>
);

// Admin Routes Protection
const AdminRoute = ({ children }) => {
  return (
    <ProtectedRoute>
      {children}
    </ProtectedRoute>
  );
};

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <UserProvider>
          <Router>
            <div className="app">
              <Header />
              <main className="main-content">
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/bank-sampah" element={<BankSampah />} />
                  
                  {/* Protected Routes */}
                  <Route 
                    path="/dashboard" 
                    element={
                      <ProtectedRoute>
                        <DashboardPage />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/submit" 
                    element={
                      <ProtectedRoute>
                        <SubmitWastePage />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/history" 
                    element={
                      <ProtectedRoute>
                        <HistoryPage />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/profile" 
                    element={
                      <ProtectedRoute>
                        <ProfilePage />
                      </ProtectedRoute>
                    } 
                  />
                  
                  {/* Admin Routes */}
                  <Route 
                    path="/admin" 
                    element={
                      <AdminRoute>
                        <DashboardPage />
                      </AdminRoute>
                    } 
                  />
                  <Route 
                    path="/admin/users" 
                    element={
                      <AdminRoute>
                        <DashboardPage />
                      </AdminRoute>
                    } 
                  />
                  <Route 
                    path="/admin/transactions" 
                    element={
                      <AdminRoute>
                        <HistoryPage />
                      </AdminRoute>
                    } 
                  />
                  <Route 
                    path="/admin/reports" 
                    element={
                      <AdminRoute>
                        <DashboardPage />
                      </AdminRoute>
                    } 
                  />
                  <Route 
                    path="/admin/settings" 
                    element={
                      <AdminRoute>
                        <ProfilePage />
                      </AdminRoute>
                    } 
                  />
                  
                  {/* Catch-all route untuk 404 */}
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </UserProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;