import { useEffect, useState } from 'react';
import {
  FaAmbulance,
  FaMapMarkerAlt,
  FaStar,
  FaClock,
  FaPhone,
  FaArrowRight,
} from 'react-icons/fa';

import api from '../services/api';
import '../styles/NearbyAmbulances.css';

function NearbyAmbulances({ onSelectAmbulance }) {
  const [ambulances, setAmbulances] = useState([]);

  useEffect(() => {
    loadAmbulances();
  }, []);

  const loadAmbulances = async () => {
  try {
    const response = await api.get("/ambulances");

    console.log("API Response:", response.data);

    const available = response.data.filter(
      (ambulance) =>
        ambulance.status &&
        ambulance.status.toLowerCase() === "available"
    );

    setAmbulances(available);
  } catch (error) {
    console.error("Error loading ambulances:", error);
  }
};

  return (
    <section className="nearby-section">
      <div className="section-header">
        <div>
          <h2>Nearby Ambulances</h2>
          <p>Verified ambulances available near your location</p>
        </div>

        <div className="available-count">
          {ambulances.length} Available
        </div>
      </div>

      {ambulances.length === 0 ? (
        <div className="empty-state">
          <FaAmbulance className="empty-icon" />
          <h3>No ambulances available</h3>
          <p>Please try again in a few minutes.</p>
        </div>
      ) : (
        <div className="ambulance-grid">
          {ambulances.map((item) => (
            <div className="ambulance-card" key={item.id}>
              <div className="card-top">
                <div className="vehicle-info">
                  <div className="ambulance-badge">
                    <FaAmbulance />
                  </div>

                  <div>
                    <h3>{item.vehicle_number}</h3>
                    <p>Advanced Life Support</p>
                  </div>
                </div>

                <span className="status available">
                  Available
                </span>
              </div>

              <div className="driver-row">
                <div className="driver-avatar">
                  {item.driver_name?.charAt(0)}
                </div>

                <div className="driver-info">
                  <strong>{item.driver_name}</strong>
                  <p>Verified Driver ★ 4.9</p>
                </div>

                <button className="call-btn">
                  <FaPhone />
                </button>
              </div>

              <div className="card-stats">
                <div className="stat">
                  <FaMapMarkerAlt />
                  <div>
                    <span>Distance</span>
                    <strong>2.1 km</strong>
                  </div>
                </div>

                <div className="stat">
                  <FaClock />
                  <div>
                    <span>ETA</span>
                    <strong>4 min</strong>
                  </div>
                </div>

                <div className="stat">
                  <FaStar />
                  <div>
                    <span>Rating</span>
                    <strong>4.9</strong>
                  </div>
                </div>
              </div>

              <div className="fare-row">
                <div>
                  <span>Estimated Fare</span>
                  <strong>₹850</strong>
                </div>

                <div>
                  <span>Type</span>
                  <strong>ICU</strong>
                </div>
              </div>

              <div className="card-actions">
                <button className="track-btn">
                  Track
                </button>

                <button
                  className="book-now-btn"
                  onClick={() => onSelectAmbulance(item)}
                >
                  Book Now
                  <FaArrowRight />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default NearbyAmbulances;