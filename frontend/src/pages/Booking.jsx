import { useState } from "react";
import api from "../services/api";

function Booking() {
  const [patientName, setPatientName] = useState("");
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");

  const bookAmbulance = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("Frontend Token:", token);

      const response = await api.post(
        "/bookings",
        {
          patient_name: patientName,
          pickup_location: pickup,
          destination: destination,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);

      setPatientName("");
      setPickup("");
      setDestination("");

    } catch (err) {
  console.log(err);

  if (err.response) {
    console.log(err.response.data);
    alert(JSON.stringify(err.response.data));
  } else {
    alert(err.message);
  }
}
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#f4f6f9",
      }}
    >
      <div
        style={{
          width: "400px",
          background: "white",
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0 0 15px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ textAlign: "center" }}>
          🚑 Book Ambulance
        </h2>

        <input
          placeholder="Patient Name"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          style={inputStyle}
        />

        <input
          placeholder="Pickup Location"
          value={pickup}
          onChange={(e) => setPickup(e.target.value)}
          style={inputStyle}
        />

        <input
          placeholder="Destination Hospital"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          style={inputStyle}
        />

        <button
          onClick={bookAmbulance}
          style={buttonStyle}
        >
          Book Now
        </button>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "15px",
  boxSizing: "border-box",
};

const buttonStyle = {
  width: "100%",
  padding: "10px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

export default Booking;