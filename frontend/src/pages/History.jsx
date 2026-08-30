import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function History() {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await api.get("/bookings");
      setBookings(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to load booking history");
    }
  };

  return (
    <div
      style={{
        padding: "40px",
        background: "#f4f6f9",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ textAlign: "center" }}>🚑 Booking History</h1>

      <button
        onClick={() => navigate("/dashboard")}
        style={{
          marginBottom: "20px",
          padding: "10px 20px",
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        ← Back to Dashboard
      </button>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "white",
        }}
      >
        <thead>
          <tr style={{ background: "#2563eb", color: "white" }}>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>Patient</th>
            <th style={thStyle}>Pickup</th>
            <th style={thStyle}>Destination</th>
            <th style={thStyle}>Ambulance</th>
            <th style={thStyle}>Status</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td style={tdStyle}>{booking.id}</td>
              <td style={tdStyle}>{booking.patient_name}</td>
              <td style={tdStyle}>{booking.pickup_location}</td>
              <td style={tdStyle}>{booking.destination}</td>
              <td style={tdStyle}>{booking.ambulance}</td>

              <td
                style={{
                  ...tdStyle,
                  color:
                    booking.status === "Completed"
                      ? "green"
                      : "orange",
                  fontWeight: "bold",
                }}
              >
                {booking.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const thStyle = {
  padding: "12px",
};

const tdStyle = {
  padding: "12px",
  borderBottom: "1px solid #ddd",
};

export default History;