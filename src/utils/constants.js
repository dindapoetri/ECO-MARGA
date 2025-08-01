// Application constants

// API Configuration
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api",
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
};

// App Configuration
export const APP_CONFIG = {
  NAME: "EcoMarga",
  VERSION: "1.0.0",
  DESCRIPTION: "Platform Digital Bank Sampah",
  CONTACT_EMAIL: "support@ecomarga.com",
  CONTACT_PHONE: "+62 812-3456-7890",
};

// Platform Fee
export const PLATFORM_FEE = {
  PERCENTAGE: 10,
  MINIMUM_FEE: 500,
};

// Waste Categories
export const WASTE_CATEGORIES = {
  PLASTIK: "Plastik",
  KERTAS: "Kertas",
  LOGAM: "Logam",
  KACA: "Kaca",
  ELEKTRONIK: "Elektronik",
  ORGANIK: "Organik",
};

// E-Wallet Types
export const EWALLET_TYPES = {
  DANA: "dana",
  OVO: "ovo",
  GOPAY: "gopay",
  LINKAJA: "linkaja",
  SHOPEEPAY: "shopeepay",
};

// Submission Status
export const SUBMISSION_STATUS = {
  PENDING: "pending",
  PROCESSING: "processing",
  COMPLETED: "completed",
  REJECTED: "rejected",
  CANCELLED: "cancelled",
};

// User Roles
export const USER_ROLES = {
  USER: "user",
  ADMIN: "admin",
  BANK_SAMPAH: "bank_sampah",
};

// Local Storage Keys
export const STORAGE_KEYS = {
  TOKEN: "token",
  USER: "user",
  THEME: "theme",
  LANGUAGE: "language",
};

// Routes
export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  DASHBOARD: "/dashboard",
  SUBMIT: "/submit",
  HISTORY: "/history",
  PROFILE: "/profile",
  BANK_SAMPAH: "/bank-sampah",
};

// Theme Colors
export const COLORS = {
  PRIMARY: "#10b981",
  PRIMARY_DARK: "#059669",
  PRIMARY_LIGHT: "#34d399",
  SECONDARY: "#f3f4f6",
  ACCENT: "#3b82f6",
  SUCCESS: "#10b981",
  WARNING: "#f59e0b",
  ERROR: "#ef4444",
  INFO: "#3b82f6",
};

// Breakpoints for responsive design
export const BREAKPOINTS = {
  SM: "640px",
  MD: "768px",
  LG: "1024px",
  XL: "1280px",
};

// Form Validation Rules
export const VALIDATION_RULES = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^(\+62|62|0)8[1-9][0-9]{6,9}$/,
  PASSWORD_MIN_LENGTH: 8,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
};

// Weight Limits (in kg)
export const WEIGHT_LIMITS = {
  MIN: 0.1,
  MAX: 100,
  DECIMAL_PLACES: 1,
};

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: "DD MMMM YYYY",
  DISPLAY_WITH_TIME: "DD MMMM YYYY HH:mm",
  ISO: "YYYY-MM-DD",
  API: "YYYY-MM-DDTHH:mm:ss.sssZ",
};
