import React from "react";
import { Info } from "lucide-react";

const WasteTypeCard = ({
  wasteType,
  selected = false,
  onClick,
  showDetails = true,
  compact = false,
}) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const cardStyle = {
    background: selected ? "#f0fdf4" : "white",
    border: `2px solid ${selected ? "#10b981" : "transparent"}`,
    borderRadius: "0.75rem",
    padding: compact ? "1rem" : "1.5rem",
    cursor: "pointer",
    transition: "all 0.2s ease",
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
    boxShadow: selected
      ? "0 4px 6px rgba(16, 185, 129, 0.1)"
      : "0 1px 3px rgba(0, 0, 0, 0.1)",
    transform: selected ? "translateY(-2px)" : "translateY(0)",
  };

  const hoverStyle = {
    borderColor: "#10b981",
    transform: "translateY(-2px)",
    boxShadow: "0 4px 6px rgba(16, 185, 129, 0.1)",
  };

  if (compact) {
    return (
      <div
        style={cardStyle}
        onClick={onClick}
        onMouseEnter={(e) => {
          if (!selected) {
            Object.assign(e.target.style, hoverStyle);
          }
        }}
        onMouseLeave={(e) => {
          if (!selected) {
            e.target.style.borderColor = "transparent";
            e.target.style.transform = "translateY(0)";
            e.target.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)";
          }
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
          }}
        >
          <span style={{ fontSize: "1.5rem" }}>{wasteType.icon}</span>
          <div style={{ flex: 1, textAlign: "left" }}>
            <h4
              style={{
                margin: 0,
                fontSize: "0.875rem",
                color: "#1f2937",
              }}
            >
              {wasteType.nama}
            </h4>
            <p
              style={{
                margin: 0,
                fontSize: "0.75rem",
                color: wasteType.warna || "#10b981",
                fontWeight: "bold",
              }}
            >
              {formatCurrency(wasteType.harga_per_kg)}/kg
            </p>
          </div>
          {selected && (
            <div
              style={{
                background: "#10b981",
                color: "white",
                borderRadius: "50%",
                width: "20px",
                height: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.75rem",
              }}
            >
              ✓
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      style={cardStyle}
      onClick={onClick}
      onMouseEnter={(e) => {
        if (!selected) {
          Object.assign(e.target.style, hoverStyle);
        }
      }}
      onMouseLeave={(e) => {
        if (!selected) {
          e.target.style.borderColor = "transparent";
          e.target.style.transform = "translateY(0)";
          e.target.style.boxShadow = "0 1px 3px rgba(0, 0, 0, 0.1)";
        }
      }}
    >
      {/* Background Pattern */}
      {selected && (
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "60px",
            height: "60px",
            background: "linear-gradient(135deg, #10b98120, #10b98110)",
            borderRadius: "0 0.75rem 0 100%",
          }}
        />
      )}

      {/* Selected Indicator */}
      {selected && (
        <div
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            background: "#10b981",
            color: "white",
            borderRadius: "50%",
            width: "24px",
            height: "24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.875rem",
            fontWeight: "bold",
          }}
        >
          ✓
        </div>
      )}

      {/* Content */}
      <div style={{ position: "relative" }}>
        {/* Icon */}
        <div
          style={{
            fontSize: "3rem",
            marginBottom: "1rem",
            filter: selected ? "none" : "grayscale(20%)",
          }}
        >
          {wasteType.icon}
        </div>

        {/* Title */}
        <h3
          style={{
            marginBottom: "0.5rem",
            fontSize: "1.125rem",
            fontWeight: "600",
            color: selected ? "#059669" : "#1f2937",
          }}
        >
          {wasteType.nama}
        </h3>

        {/* Category */}
        <div
          style={{
            display: "inline-block",
            background: wasteType.warna || "#10b981",
            color: "white",
            padding: "0.25rem 0.75rem",
            borderRadius: "1rem",
            fontSize: "0.75rem",
            fontWeight: "500",
            marginBottom: "0.75rem",
          }}
        >
          {wasteType.kategori}
        </div>

        {/* Price */}
        <div
          style={{
            background: selected ? "white" : "#f8fafc",
            border: "1px solid #e2e8f0",
            borderRadius: "0.5rem",
            padding: "0.75rem",
            marginBottom: "1rem",
          }}
        >
          <div
            style={{
              fontSize: "1.25rem",
              fontWeight: "bold",
              color: wasteType.warna || "#10b981",
              marginBottom: "0.25rem",
            }}
          >
            {formatCurrency(wasteType.harga_per_kg)}
          </div>
          <div
            style={{
              fontSize: "0.75rem",
              color: "#6b7280",
            }}
          >
            per kilogram
          </div>
        </div>

        {/* Description */}
        {showDetails && wasteType.deskripsi && (
          <p
            style={{
              fontSize: "0.875rem",
              color: "#6b7280",
              lineHeight: "1.4",
              marginBottom: "1rem",
            }}
          >
            {wasteType.deskripsi}
          </p>
        )}

        {/* Tips */}
        {showDetails && wasteType.tips && (
          <div
            style={{
              background: "#eff6ff",
              border: "1px solid #3b82f6",
              borderRadius: "0.375rem",
              padding: "0.75rem",
              display: "flex",
              gap: "0.5rem",
              alignItems: "flex-start",
            }}
          >
            <Info
              size={14}
              style={{
                color: "#3b82f6",
                marginTop: "2px",
                flexShrink: 0,
              }}
            />
            <div>
              <p
                style={{
                  margin: 0,
                  fontSize: "0.75rem",
                  color: "#1e40af",
                  fontWeight: "500",
                }}
              >
                Tips:
              </p>
              <p
                style={{
                  margin: 0,
                  fontSize: "0.75rem",
                  color: "#1e40af",
                  lineHeight: "1.3",
                }}
              >
                {wasteType.tips}
              </p>
            </div>
          </div>
        )}

        {/* Example Calculation */}
        {showDetails && (
          <div
            style={{
              marginTop: "1rem",
              padding: "0.75rem",
              background: selected ? "rgba(16, 185, 129, 0.1)" : "#f8fafc",
              borderRadius: "0.5rem",
              border: `1px solid ${selected ? "#a7f3d0" : "#e2e8f0"}`,
            }}
          >
            <h5
              style={{
                margin: "0 0 0.5rem 0",
                fontSize: "0.75rem",
                color: selected ? "#059669" : "#6b7280",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Contoh Perhitungan
            </h5>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontSize: "0.875rem",
                  color: "#6b7280",
                }}
              >
                1 kg =
              </span>
              <span
                style={{
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  color: selected ? "#059669" : "#1f2937",
                }}
              >
                {formatCurrency(wasteType.harga_per_kg * 0.9)} (setelah fee)
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WasteTypeCard;
