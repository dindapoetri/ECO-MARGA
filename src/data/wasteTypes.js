// Data jenis sampah dan harga per kg
export const wasteTypes = [
  {
    id: 1,
    nama: 'Botol Plastik',
    kategori: 'Plastik',
    harga_per_kg: 3000,
    icon: '🍶',
    deskripsi: 'Botol plastik bekas minuman (PET)',
    tips: 'Pastikan botol bersih dari label dan tutup',
    warna: '#3B82F6'
  },
  {
    id: 2,
    nama: 'Kertas Koran',
    kategori: 'Kertas',
    harga_per_kg: 1500,
    icon: '📰',
    deskripsi: 'Koran bekas, majalah, dan kertas sejenis',
    tips: 'Kertas harus kering dan tidak sobek-sobek',
    warna: '#F59E0B'
  },
  {
    id: 3,
    nama: 'Kaleng Aluminium',
    kategori: 'Logam',
    harga_per_kg: 8000,
    icon: '🥤',
    deskripsi: 'Kaleng minuman aluminium bekas',
    tips: 'Penyok tidak masalah, yang penting bersih',
    warna: '#10B981'
  },
  {
    id: 4,
    nama: 'Kardus',
    kategori: 'Kertas',
    harga_per_kg: 2000,
    icon: '📦',
    deskripsi: 'Kardus bekas kemasan dalam kondisi baik',
    tips: 'Lipat rapi dan pastikan tidak basah',
    warna: '#8B5CF6'
  },
  {
    id: 5,
    nama: 'Botol Kaca',
    kategori: 'Kaca',
    harga_per_kg: 1000,
    icon: '🍾',
    deskripsi: 'Botol kaca bekas minuman atau makanan',
    tips: 'Hati-hati saat mengangkut, pastikan tidak pecah',
    warna: '#EF4444'
  },
  {
    id: 6,
    nama: 'Plastik Kemasan',
    kategori: 'Plastik',
    harga_per_kg: 2500,
    icon: '🛍️',
    deskripsi: 'Kantong plastik, kemasan makanan plastik',
    tips: 'Bersihkan dari sisa makanan terlebih dahulu',
    warna: '#06B6D4'
  },
  {
    id: 7,
    nama: 'Kertas HVS',
    kategori: 'Kertas',
    harga_per_kg: 2500,
    icon: '📄',
    deskripsi: 'Kertas putih bekas fotokopi, print',
    tips: 'Pisahkan dari kertas warna atau bergambar',
    warna: '#84CC16'
  },
  {
    id: 8,
    nama: 'Elektronik Kecil',
    kategori: 'Elektronik',
    harga_per_kg: 5000,
    icon: '📱',
    deskripsi: 'HP bekas, charger, kabel, komponen elektronik',
    tips: 'Pastikan tidak ada data pribadi di dalamnya',
    warna: '#F97316'
  }
];

// Function untuk mendapatkan jenis sampah berdasarkan kategori
export const getWasteTypesByCategory = (category) => {
  return wasteTypes.filter(waste => waste.kategori === category);
};

// Function untuk menghitung estimasi harga
export const calculatePrice = (wasteTypeId, weight, platformFeePercent = 10) => {
  const wasteType = wasteTypes.find(w => w.id === wasteTypeId);
  if (!wasteType) return null;

  const totalValue = weight * wasteType.harga_per_kg;
  const platformFee = totalValue * (platformFeePercent / 100);
  const userReceives = totalValue - platformFee;

  return {
    wasteType: wasteType,
    weight: weight,
    pricePerKg: wasteType.harga_per_kg,
    totalValue: totalValue,
    platformFee: platformFee,
    platformFeePercent: platformFeePercent,
    userReceives: userReceives
  };
};

// Function untuk mendapatkan kategori unik
export const getUniqueCategories = () => {
  return [...new Set(wasteTypes.map(waste => waste.kategori))];
};