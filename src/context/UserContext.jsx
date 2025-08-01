import React, { createContext, useContext, useState, useCallback } from "react";

// Membuat context untuk data user
const UserContext = createContext();

// Provider component
const UserProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState(null);
  const [userStats, setUserStats] = useState({
    total_earnings: 0,
    submission_count: 0,
    total_weight: 0,
    environmental_impact: {
      co2_reduced: 0,
      trees_saved: 0,
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  // Load user data
  const loadUserData = useCallback(async (userId) => {
    try {
      setIsLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Mock data based on user ID
      const mockProfile = {
        id: userId,
        nama: "John Doe",
        email: "john.doe@email.com",
        phone: "+62 812-3456-7890",
        address: "Jl. Contoh No. 123, Semarang",
        join_date: "2024-01-01",
        ewallet_accounts: {
          dana: "081234567890",
          ovo: "081234567890",
          gopay: "081234567890",
        },
      };

      const mockStats = {
        total_earnings: 125000,
        submission_count: 8,
        total_weight: 15.5,
        environmental_impact: {
          co2_reduced: 12.5,
          trees_saved: 2,
        },
      };

      setUserProfile(mockProfile);
      setUserStats(mockStats);
    } catch (error) {
      console.error("Failed to load user data:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Update user profile
  const updateUserProfile = useCallback(async (updatedData) => {
    try {
      setIsLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setUserProfile((prev) => ({ ...prev, ...updatedData }));
      return { success: true };
    } catch (error) {
      console.error("Failed to update profile:", error);
      return { success: false, error: error.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Update user stats (usually called after waste submission)
  const updateUserStats = useCallback((newStats) => {
    setUserStats((prev) => ({
      ...prev,
      ...newStats,
    }));
  }, []);

  const value = React.useMemo(() => ({
    userProfile,
    userStats,
    isLoading,
    loadUserData,
    updateUserProfile,
    updateUserStats,
  }), [userProfile, userStats, isLoading, loadUserData, updateUserProfile, updateUserStats]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// Hook untuk menggunakan context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export default UserProvider;