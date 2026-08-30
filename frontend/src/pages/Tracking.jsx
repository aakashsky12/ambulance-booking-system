import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/Tracking.css";

// Fix Leaflet marker icon
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Keep map centered on moving ambulance
function MapUpdater({ position }) {
  const map = useMap();

  useEffect(() => {
    map.setView(position, map.getZoom());
  }, [position, map]);

  return null;
}

function Tracking() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Try navigation state first
  // Then use saved booking information
  const savedBooking = JSON.parse(
    localStorage.getItem("activeBooking") || "null"
  );

  const booking = state || savedBooking;

  const [position, setPosition] = useState([19.025, 73.015]);
  const [eta, setEta] = useState(5);

  // Move ambulance every 3 seconds
  useEffect(() => {
    const move = setInterval(() => {
      setPosition(([lat, lng]) => [
        lat + 0.0004,
        lng + 0.0003,
      ]);

      setEta((currentEta) =>
        currentEta > 1 ? currentEta - 1 : 1
      );
    }, 3000);

    return () => clearInterval(move);
  }, []);

  return (
    <div className="tracking-page">

      {/* Header */}
      <div className="tracking-header">
        <h2>Ambulance Tracking</h2>

        <button onClick={() => navigate("/home")}>
          Back Home
        </button>
      </div>

      {/* Booking Information */}
      <div className="tracking-info">

        <p>
          <strong>Booking ID:</strong>{" "}
          {booking?.bookingId || "N/A"}
        </p>

        <p>
          <strong>Ambulance:</strong>{" "}
          {booking?.ambulance?.vehicle_number || "N/A"}
        </p>

        <p>
          <strong>Driver:</strong>{" "}
          {booking?.ambulance?.driver_name || "N/A"}
        </p>

        <p>
          <strong>ETA:</strong>{" "}
          {eta} mins
        </p>

        <p className="status">
          Status: On the way
        </p>

      </div>

      {/* Map */}
      <MapContainer
        center={position}
        zoom={13}
        style={{
          height: "500px",
          width: "100%",
        }}
      >

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        <MapUpdater position={position} />

        <Marker position={position}>

          <Popup>
            <strong>
              {booking?.ambulance?.vehicle_number || "Ambulance"}
            </strong>

            <br />

            Driver:{" "}
            {booking?.ambulance?.driver_name || "Driver"}

            <br />

            ETA: {eta} mins

            <br />

            Status: On the way
          </Popup>

        </Marker>

      </MapContainer>

    </div>
  );
}

export default Tracking;