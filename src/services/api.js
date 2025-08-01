// Base API configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

// Helper function untuk membuat request
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  };

  // Add auth token if available
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Request failed:', error);
    throw error;
  }
};

// API methods
export const api = {
  // Auth endpoints
  auth: {
    login: (credentials) => apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    }),
    
    register: (userData) => apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    }),
    
    logout: () => apiRequest('/auth/logout', {
      method: 'POST'
    }),
    
    verifyToken: () => apiRequest('/auth/verify')
  },

  // User endpoints
  user: {
    getProfile: () => apiRequest('/user/profile'),
    
    updateProfile: (data) => apiRequest('/user/profile', {
      method: 'PUT',
      body: JSON.stringify(data)
    }),
    
    getStats: () => apiRequest('/user/stats')
  },

  // Waste endpoints
  waste: {
    getTypes: () => apiRequest('/waste/types'),
    
    submitWaste: (data) => apiRequest('/waste/submit', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
    
    getHistory: () => apiRequest('/waste/history'),
    
    calculatePrice: (wasteTypeId, weight) => apiRequest('/waste/calculate', {
      method: 'POST',
      body: JSON.stringify({ wasteTypeId, weight })
    })
  },

  // Bank Sampah endpoints
  bankSampah: {
    getAll: () => apiRequest('/bank-sampah'),
    
    getById: (id) => apiRequest(`/bank-sampah/${id}`),
    
    findNearest: (coordinates) => apiRequest('/bank-sampah/nearest', {
      method: 'POST',
      body: JSON.stringify(coordinates)
    })
  }
};

export default api;