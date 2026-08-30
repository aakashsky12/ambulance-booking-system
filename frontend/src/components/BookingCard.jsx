import { useState } from "react";
import { FaUser, FaMapMarkerAlt, FaHospital } from "react-icons/fa";
import api from "../services/api";
import "../styles/BookingCard.css";

function BookingCard({ selectedAmbulance }) {
  const [patientName, setPatientName] = useState("");
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");

  const bookAmbulance = async () => {

  if (!selectedAmbulance) {
    alert("Please select an ambulance first");
    return;
  }

  try {
      const token = localStorage.getItem("token");

     const response = await api.post(
  "/bookings",
  {
    patient_name: patientName,
    pickup_location: pickup,
    destination: destination,
    ambulance_id: selectedAmbulance.id,
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
      if (err.response) {
        alert(err.response.data.detail);
      } else {
        alert(err.message);
      }
    }
  };

  return (
    <div className="booking-card">

      <h2>Book an Ambulance</h2>

      <div className="input-box">
        <FaUser />
        <input
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          placeholder="Patient Name"
        />
      </div>

      <div className="input-box">
        <FaMapMarkerAlt />
        <input
          value={pickup}
          onChange={(e) => setPickup(e.target.value)}
          placeholder="Pickup Location"
        />
      </div>

      <div className="input-box">
        <FaHospital />
        <input
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Destination Hospital"
        />
      </div>
      {selectedAmbulance && (
  <div
    style={{
      background: "#fff3f3",
      padding: "15px",
      borderRadius: "10px",
      marginBottom: "20px",
      border: "1px solid #ffcdd2",
    }}
  >
    <strong>🚑 Selected Ambulance</strong>

    <p style={{ margin: "5px 0 0" }}>
      {selectedAmbulance.vehicle_number} —{" "}
      {selectedAmbulance.driver_name}
    </p>
  </div>
)}

      <button className="book-btn" onClick={bookAmbulance}>
        🚑 Book Ambulance
      </button>

    </div>
  );
}

export default BookingCard;