import React, { useState } from "react";

const HistoryPage = () => {
  // Data dummy untuk testing
  const [submissions] = useState([
    {
      id: 1,
      waste_type: "Botol Plastik",
      berat_kg: 2.5,
      nilai_rupiah: 7500,
      platform_fee: 750,
      transfer_amount: 6750,
      status: "completed",
      created_at: "2024-01-15T10:30:00Z",
      ewallet_type: "dana",
    },
    {
      id: 2,
      waste_type: "Kardus",
      berat_kg: 5.0,
      nilai_rupiah: 10000,
      platform_fee: 1000,
      transfer_amount: 9000,
      status: "completed",
      created_at: "2024-01-10T14:20:00Z",
      ewallet_type: "ovo",
    },
    {
      id: 3,
      waste_type: "Kaleng Aluminium",
      berat_kg: 1.2,
      nilai_rupiah: 9600,
      platform_fee: 960,
      transfer_amount: 8640,
      status: "processing",
      created_at: "2024-01-08T09:15:00Z",
      ewallet_type: "gopay",
    },
  ]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      completed: { label: "Selesai", color: "#10b981" },
      processing: { label: "Diproses", color: "#3b82f6" },
      pending: { label: "Menunggu", color: "#f59e0b" },
      failed: { label: "Gagal", color: "#ef4444" },
    };

    const config = statusConfig[status] || statusConfig.pending;

    return (
      <span
        style={{
          padding: "0.25rem 0.75rem",
          borderRadius: "1rem",
          fontSize: "0.75rem",
          fontWeight: "500",
          backgroundColor: config.color,
          color: "white",
        }}
      >
        {config.label}
      </span>
    );
  };

  return (
    <div style={{ padding: "2rem 0", minHeight: "80vh" }}>
      <div className="container">
        <div style={{ marginBottom: "2rem" }}>
          <h1>Riwayat Transaksi</h1>
          <p style={{ color: "var(--text-light)" }}>
            Lihat semua submission sampah dan status transfer Anda
          </p>
        </div>

        {/* Summary Stats */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem",
            marginBottom: "2rem",
          }}
        >
          <div className="card" style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "var(--primary-color)",
              }}
            >
              {submissions.length}
            </div>
            <div style={{ color: "var(--text-light)", fontSize: "0.875rem" }}>
              Total Submission
            </div>
          </div>

          <div className="card" style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "var(--primary-color)",
              }}
            >
              Rp{" "}
              {submissions
                .reduce((sum, item) => sum + item.transfer_amount, 0)
                .toLocaleString()}
            </div>
            <div style={{ color: "var(--text-light)", fontSize: "0.875rem" }}>
              Total Diterima
            </div>
          </div>

          <div className="card" style={{ textAlign: "center" }}>
            <div
              style={{
                fontSize: "1.5rem",
                fontWeight: "bold",
                color: "var(--primary-color)",
              }}
            >
              {submissions.reduce((sum, item) => sum + item.berat_kg, 0)} kg
            </div>
            <div style={{ color: "var(--text-light)", fontSize: "0.875rem" }}>
              Total Berat
            </div>
          </div>
        </div>

        {/* History List */}
        <div className="card">
          <h3 style={{ marginBottom: "1.5rem" }}>Riwayat Submission</h3>

          {submissions.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "3rem 0",
                color: "var(--text-light)",
              }}
            >
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>📭</div>
              <h4>Belum Ada Riwayat</h4>
              <p>Mulai submit sampah untuk melihat riwayat transaksi</p>
              <a
                href="/submit"
                className="btn btn-primary"
                style={{ marginTop: "1rem" }}
              >
                Submit Sampah Sekarang
              </a>
            </div>
          ) : (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              {submissions.map((submission) => (
                <div
                  key={submission.id}
                  className="card"
                  style={{
                    border: "1px solid var(--border-color)",
                    padding: "1.5rem",
                    transition: "all 0.2s ease",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      flexWrap: "wrap",
                      gap: "1rem",
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.75rem",
                          marginBottom: "0.5rem",
                        }}
                      >
                        <h4 style={{ margin: 0, color: "var(--text-color)" }}>
                          {submission.waste_type}
                        </h4>
                        {getStatusBadge(submission.status)}
                      </div>

                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns:
                            "repeat(auto-fit, minmax(120px, 1fr))",
                          gap: "1rem",
                          marginBottom: "0.75rem",
                        }}
                      >
                        <div>
                          <div
                            style={{
                              fontSize: "0.75rem",
                              color: "var(--text-light)",
                            }}
                          >
                            Berat
                          </div>
                          <div style={{ fontWeight: "500" }}>
                            {submission.berat_kg} kg
                          </div>
                        </div>

                        <div>
                          <div
                            style={{
                              fontSize: "0.75rem",
                              color: "var(--text-light)",
                            }}
                          >
                            Nilai Total
                          </div>
                          <div style={{ fontWeight: "500" }}>
                            Rp {submission.nilai_rupiah.toLocaleString()}
                          </div>
                        </div>

                        <div>
                          <div
                            style={{
                              fontSize: "0.75rem",
                              color: "var(--text-light)",
                            }}
                          >
                            Anda Terima
                          </div>
                          <div
                            style={{
                              fontWeight: "500",
                              color: "var(--primary-color)",
                            }}
                          >
                            Rp {submission.transfer_amount.toLocaleString()}
                          </div>
                        </div>

                        <div>
                          <div
                            style={{
                              fontSize: "0.75rem",
                              color: "var(--text-light)",
                            }}
                          >
                            E-Wallet
                          </div>
                          <div
                            style={{
                              fontWeight: "500",
                              textTransform: "uppercase",
                            }}
                          >
                            {submission.ewallet_type}
                          </div>
                        </div>
                      </div>

                      <div
                        style={{
                          fontSize: "0.875rem",
                          color: "var(--text-light)",
                        }}
                      >
                        📅 {formatDate(submission.created_at)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pagination (untuk masa depan) */}
        {submissions.length > 0 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "2rem",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                fontSize: "0.875rem",
                color: "var(--text-light)",
              }}
            >
              <span>
                Menampilkan {submissions.length} dari {submissions.length}{" "}
                transaksi
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
