import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

// Membuat context untuk autentikasi
const AuthContext = createContext();

// Provider component
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(null);

  // Check if user is authenticated on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const savedToken = localStorage.getItem("token");
        const savedUser = localStorage.getItem("user");
        
        if (savedToken && savedUser) {
          // Parse saved user data
          const userData = JSON.parse(savedUser);
          setUser(userData);
          setToken(savedToken);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        // Clear invalid data
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setToken(null);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = useCallback(async (email, password) => {
    try {
      setIsLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Determine user role based on email for demo
      const isAdmin = email.includes('admin');
      
      const mockToken = "mock-jwt-token-" + Date.now();
      const mockUser = {
        id: Date.now(),
        name: isAdmin ? "Admin User" : "John Doe",
        email: email,
        role: isAdmin ? 'admin' : 'user'
      };

      // Save to localStorage
      localStorage.setItem("token", mockToken);
      localStorage.setItem("user", JSON.stringify(mockUser));
      
      // Update state
      setToken(mockToken);
      setUser(mockUser);

      return { success: true, user: mockUser };
    } catch (error) {
      console.error("Login failed:", error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (userData) => {
    try {
      setIsLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const mockToken = "mock-jwt-token-" + Date.now();
      const mockUser = {
        id: Date.now(),
        name: userData.nama,
        email: userData.email,
        role: 'user'
      };

      // Save to localStorage
      localStorage.setItem("token", mockToken);
      localStorage.setItem("user", JSON.stringify(mockUser));
      
      // Update state
      setToken(mockToken);
      setUser(mockUser);

      return { success: true, user: mockUser };
    } catch (error) {
      console.error("Registration failed:", error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    // Clear localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    
    // Clear state
    setToken(null);
    setUser(null);
  }, []);

  const value = React.useMemo(() => ({
    user,
    token,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated: !!user && !!token,
  }), [user, token, isLoading, login, register, logout]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook untuk menggunakan context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;