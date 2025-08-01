// Data dummy untuk testing aplikasi EcoMarga

// Dummy user data
export const dummyUsers = [
  {
    id: 1,
    nama: "John Doe",
    email: "john@example.com",
    phone: "+62 812-3456-7890",
    address: "Jl. Contoh No. 123, Semarang",
    join_date: "2024-01-01",
    ewallet_accounts: {
      dana: "081234567890",
      ovo: "081234567890",
      gopay: "081234567890"
    }
  },
  {
    id: 2,
    nama: "Jane Smith",
    email: "jane@example.com",
    phone: "+62 813-4567-8901",
    address: "Jl. Contoh No. 456, Semarang",
    join_date: "2024-01-15",
    ewallet_accounts: {
      dana: "081345678901",
      ovo: "081345678901",
      gopay: "081345678901"
    }
  }
];

// Dummy submission history
export const dummySubmissions = [
  {
    id: 1,
    user_id: 1,
    waste_type: 'Botol Plastik',
    berat_kg: 2.5,
    nilai_rupiah: 7500,
    platform_fee: 750,
    transfer_amount: 6750,
    status: 'completed',
    created_at: '2024-01-15T10:30:00Z',
    ewallet_type: 'dana'
  },
  {
    id: 2,
    user_id: 1,
    waste_type: 'Kardus',
    berat_kg: 5.0,
    nilai_rupiah: 10000,
    platform_fee: 1000,
    transfer_amount: 9000,
    status: 'completed',
    created_at: '2024-01-10T14:20:00Z',
    ewallet_type: 'ovo'
  },
  {
    id: 3,
    user_id: 1,
    waste_type: 'Kaleng Aluminium',
    berat_kg: 1.2,
    nilai_rupiah: 9600,
    platform_fee: 960,
    transfer_amount: 8640,
    status: 'processing',
    created_at: '2024-01-08T09:15:00Z',
    ewallet_type: 'gopay'
  }
];

// Dummy stats
export const dummyStats = [
  {
    user_id: 1,
    total_earnings: 125000,
    submission_count: 8,
    total_weight: 15.5,
    environmental_impact: {
      co2_reduced: 12.5,
      trees_saved: 2
    }
  }
];

// Function untuk mendapatkan user berdasarkan ID
export const getUserById = (id) => {
  return dummyUsers.find(user => user.id === id);
};

// Function untuk mendapatkan submissions berdasarkan user ID
export const getSubmissionsByUserId = (userId) => {
  return dummySubmissions.filter(submission => submission.user_id === userId);
};

// Function untuk mendapatkan stats berdasarkan user ID
export const getStatsByUserId = (userId) => {
  return dummyStats.find(stat => stat.user_id === userId);
};