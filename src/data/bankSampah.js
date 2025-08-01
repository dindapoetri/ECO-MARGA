// Data bank sampah mitra EcoMarga
export const bankSampahList = [
  {
    id: 1,
    nama: 'Bank Sampah Melati',
    alamat: 'Jl. Raya Semarang No. 123, Tembalang',
    telepon: '0856-1234-5678',
    jam_operasional: 'Senin-Sabtu: 08:00 - 16:00',
    rating: 4.5,
    jarak: '2.3 km',
    koordinat: {
      lat: -7.0519,
      lng: 110.4386
    },
    kategori: ['Plastik', 'Kertas', 'Logam'],
    foto: '/images/bank-sampah-1.jpg'
  },
  {
    id: 2,
    nama: 'Bank Sampah Mawar',
    alamat: 'Jl. Pandanaran No. 456, Candisari',
    telepon: '0857-9876-5432',
    jam_operasional: 'Senin-Jumat: 09:00 - 17:00',
    rating: 4.2,
    jarak: '1.8 km',
    koordinat: {
      lat: -7.0611,
      lng: 110.4203
    },
    kategori: ['Plastik', 'Kertas', 'Elektronik'],
    foto: '/images/bank-sampah-2.jpg'
  },
  {
    id: 3,
    nama: 'Bank Sampah Kenanga',
    alamat: 'Jl. Gajah Mada No. 789, Gayamsari',
    telepon: '0858-1111-2222',
    jam_operasional: 'Selasa-Minggu: 07:00 - 15:00',
    rating: 4.8,
    jarak: '3.1 km',
    koordinat: {
      lat: -7.0066,
      lng: 110.4381
    },
    kategori: ['Plastik', 'Logam', 'Kaca'],
    foto: '/images/bank-sampah-3.jpg'
  },
  {
    id: 4,
    nama: 'Bank Sampah Cempaka',
    alamat: 'Jl. Ahmad Yani No. 321, Pedurungan',
    telepon: '0859-3333-4444',
    jam_operasional: 'Senin-Sabtu: 08:30 - 16:30',
    rating: 4.4,
    jarak: '4.2 km',
    koordinat: {
      lat: -7.0197,
      lng: 110.4658
    },
    kategori: ['Kertas', 'Kardus', 'Plastik'],
    foto: '/images/bank-sampah-4.jpg'
  },
  {
    id: 5,
    nama: 'Bank Sampah Anggrek',
    alamat: 'Jl. Diponegoro No. 567, Semarang Tengah',
    telepon: '0851-5555-6666',
    jam_operasional: 'Senin-Jumat: 08:00 - 16:00',
    rating: 4.6,
    jarak: '5.1 km',
    koordinat: {
      lat: -6.9899,
      lng: 110.4203
    },
    kategori: ['Semua Jenis', 'Organik'],
    foto: '/images/bank-sampah-5.jpg'
  }
];

// Function untuk mencari bank sampah terdekat
export const findNearestBankSampah = (userLocation) => {
  // Simple distance calculation (in real app, use proper geolocation)
  return bankSampahList.sort((a, b) => {
    const distanceA = Math.sqrt(
      Math.pow(a.koordinat.lat - userLocation.lat, 2) +
      Math.pow(a.koordinat.lng - userLocation.lng, 2)
    );
    const distanceB = Math.sqrt(
      Math.pow(b.koordinat.lat - userLocation.lat, 2) +
      Math.pow(b.koordinat.lng - userLocation.lng, 2)
    );
    return distanceA - distanceB;
  });
};

// Function untuk filter bank sampah berdasarkan kategori
export const filterBankSampahByCategory = (category) => {
  return bankSampahList.filter(bank => 
    bank.kategori.includes(category) || bank.kategori.includes('Semua Jenis')
  );
};