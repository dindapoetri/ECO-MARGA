// Utility functions for formatting data

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount);
};

export const formatDate = (date) => {
  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(new Date(date));
};

export const formatDateTime = (date) => {
  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date));
};

export const formatWeight = (weight) => {
  return `${weight} kg`;
};

export const formatPhoneNumber = (phone) => {
  // Format phone number to Indonesian format
  return phone.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
};

export const formatPercentage = (value, decimals = 1) => {
  return `${value.toFixed(decimals)}%`;
};

export const formatNumber = (number) => {
  return new Intl.NumberFormat('id-ID').format(number);
};