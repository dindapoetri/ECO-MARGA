import React, { useState, useEffect } from "react";
import { MapPin, Phone, Clock, Star, Navigation } from "lucide-react";
import {
  bankSampahList,
  findNearestBankSampah,
  filterBankSampahByCategory,
} from "../data/bankSampah";
import { getUniqueCategories } from "../data/wasteTypes";

const BankSampah = () => {
  const [bankSampah, setBankSampah] = useState(bankSampahList);
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(false);

  const categories = ["Semua", ...getUniqueCategories()];

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          // Default to Semarang coordinates
          setUserLocation({
            lat: -7.0052,
            lng: 110.4381,
          });
        }
      );
    }
  }, []);

  // Filter bank sampah by category
  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    if (category === "Semua") {
      setBankSampah(bankSampahList);
    } else {
      setBankSampah(filterBankSampahByCategory(category));
    }
  };

  // Sort by nearest
  const handleSortByNearest = () => {
    if (userLocation) {
      setLoading(true);
      const sorted = findNearestBankSampah(userLocation);
      setBankSampah(sorted);
      setLoading(false);
    }
  };

  // Open in maps
  const openInMaps = (bank) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${bank.koordinat.lat},${bank.koordinat.lng}`;
    window.open(url, "_blank");
  };

  return (
    <div style={{ padding: "2rem 0", minHeight: "80vh" }}>
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: "2rem" }}>
          <h1>Bank Sampah Terdekat</h1>
          <p style={{ color: "var(--text-light)" }}>
            Temukan bank sampah mitra EcoMarga di sekitar Anda
          </p>
        </div>

        {/* Filters */}
        <div className="card" style={{ marginBottom: "2rem" }}>
          <h3 style={{ marginBottom: "1rem" }}>Filter & Urutkan</h3>

          {/* Category Filter */}
          <div style={{ marginBottom: "1rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontWeight: "500",
              }}
            >
              Kategori Sampah:
            </label>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryFilter(category)}
                  className={`btn ${
                    selectedCategory === category
                      ? "btn-primary"
                      : "btn-outline"
                  }`}
                  style={{ fontSize: "0.875rem", padding: "0.5rem 1rem" }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Sort Button */}
          <div>
            <button
              onClick={handleSortByNearest}
              disabled={!userLocation || loading}
              className="btn btn-secondary"
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <Navigation size={16} />
              {loading ? "Mengurutkan..." : "Urutkan Berdasarkan Jarak"}
            </button>
          </div>
        </div>

        {/* Bank Sampah List */}
        <div className="grid grid-2">
          {bankSampah.length === 0 ? (
            <div
              style={{
                gridColumn: "1 / -1",
                textAlign: "center",
                padding: "3rem 0",
                color: "var(--text-light)",
              }}
            >
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🏪</div>
              <h4>Tidak Ada Bank Sampah</h4>
              <p>
                Tidak ditemukan bank sampah untuk kategori "{selectedCategory}"
              </p>
            </div>
          ) : (
            bankSampah.map((bank) => (
              <div
                key={bank.id}
                className="card"
                style={{ height: "fit-content" }}
              >
                {/* Header */}
                <div style={{ marginBottom: "1rem" }}>
                  <h3
                    style={{
                      marginBottom: "0.5rem",
                      color: "var(--text-color)",
                    }}
                  >
                    {bank.nama}
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <Star
                      size={16}
                      style={{ color: "#fbbf24", fill: "#fbbf24" }}
                    />
                    <span style={{ fontWeight: "500" }}>{bank.rating}</span>
                    <span style={{ color: "var(--text-light)" }}>
                      • {bank.jarak}
                    </span>
                  </div>

                  {/* Categories */}
                  <div
                    style={{
                      display: "flex",
                      gap: "0.25rem",
                      flexWrap: "wrap",
                      marginBottom: "1rem",
                    }}
                  >
                    {bank.kategori.map((kategori) => (
                      <span
                        key={kategori}
                        style={{
                          background: "var(--primary-color)",
                          color: "white",
                          padding: "0.125rem 0.5rem",
                          borderRadius: "0.25rem",
                          fontSize: "0.75rem",
                        }}
                      >
                        {kategori}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Contact Info */}
                <div style={{ marginBottom: "1.5rem" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "0.5rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <MapPin
                      size={16}
                      style={{ color: "var(--text-light)", marginTop: "2px" }}
                    />
                    <span style={{ fontSize: "0.9rem", lineHeight: "1.4" }}>
                      {bank.alamat}
                    </span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <Phone size={16} style={{ color: "var(--text-light)" }} />
                    <a
                      href={`tel:${bank.telepon}`}
                      style={{
                        fontSize: "0.9rem",
                        color: "var(--primary-color)",
                        textDecoration: "none",
                      }}
                    >
                      {bank.telepon}
                    </a>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <Clock size={16} style={{ color: "var(--text-light)" }} />
                    <span style={{ fontSize: "0.9rem" }}>
                      {bank.jam_operasional}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button
                    className="btn btn-primary"
                    style={{ flex: 1 }}
                    onClick={() =>
                      alert(`Detail untuk ${bank.nama} akan segera tersedia`)
                    }
                  >
                    Lihat Detail
                  </button>
                  <button
                    className="btn btn-outline"
                    onClick={() => openInMaps(bank)}
                    title="Buka di Google Maps"
                  >
                    📍 Rute
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Info Section */}
        <div
          className="card"
          style={{
            marginTop: "3rem",
            background: "linear-gradient(145deg, #f0fdf4, #ecfdf5)",
          }}
        >
          <h3 style={{ marginBottom: "1rem", color: "var(--primary-color)" }}>
            💡 Tips Berkunjung ke Bank Sampah
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "1rem",
            }}
          >
            <div>
              <h4 style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>
                📋 Persiapan
              </h4>
              <p style={{ fontSize: "0.9rem", color: "var(--text-light)" }}>
                Pisahkan sampah berdasarkan jenisnya dan pastikan dalam kondisi
                bersih
              </p>
            </div>
            <div>
              <h4 style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>
                ⏰ Waktu Kunjungan
              </h4>
              <p style={{ fontSize: "0.9rem", color: "var(--text-light)" }}>
                Datang saat jam operasional dan hindari waktu puncak
              </p>
            </div>
            <div>
              <h4 style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>
                💳 Pembayaran
              </h4>
              <p style={{ fontSize: "0.9rem", color: "var(--text-light)" }}>
                Siapkan akun e-wallet untuk menerima pembayaran
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankSampah;
