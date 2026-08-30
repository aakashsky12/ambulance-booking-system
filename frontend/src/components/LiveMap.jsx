import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import api from "../services/api";

// Fix Leaflet marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function LiveMap() {
  const [ambulances, setAmbulances] = useState([]);

  useEffect(() => {
    const fetchAmbulances = async () => {
      try {
        const res = await api.get("/ambulances");

        const coordinates = {
          1: { lat: 19.0330, lng: 73.0297 }, // MH01AB1234
          2: { lat: 19.0450, lng: 73.0400 }, // GJO1CD4041
          3: { lat: 19.0250, lng: 73.0150 }, // Available ambulance
        };

        // Keep only available ambulances
        const data = res.data
          .filter((a) => a.status === "Available")
          .map((a) => ({
            ...a,
            position: coordinates[a.id] || { lat: 19.0330, lng: 73.0297 },
          }));

        setAmbulances(data);
      } catch (err) {
        console.error("Map error:", err);
      }
    };

    fetchAmbulances();
  }, []);

  return (
    <MapContainer
      center={[19.0330, 73.0297]}
      zoom={12}
      style={{ height: "380px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      {ambulances.map((ambulance) => (
        <Marker
          key={ambulance.id}
          position={[ambulance.position.lat, ambulance.position.lng]}
        >
          <Popup>
            <strong>{ambulance.vehicle_number}</strong>
            <br />
            Driver: {ambulance.driver_name}
            <br />
            Status: {ambulance.status}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default LiveMap;