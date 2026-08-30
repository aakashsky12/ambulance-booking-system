import React, { useState } from "react";
import "../styles/Home.css";
import LiveMap from "../components/LiveMap";
import NearbyAmbulances from "../components/NearbyAmbulances";
import api from "../services/api";
import BookingSuccessModal from "../components/BookingSuccessModal";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const [patientName, setPatientName] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [ambulanceType, setAmbulanceType] = useState("Basic");
  const [selectedAmbulance, setSelectedAmbulance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(null);

  const handleBooking = async () => {
    // Check ambulance selection
    if (!selectedAmbulance) {
      window.alert("Please select an ambulance first.");
      return;
    }

    // Check form fields
    if (!patientName || !pickupLocation || !destination) {
      window.alert("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      // Send booking request to backend
      const response = await api.post("/bookings", {
        user_id: 1,
        ambulance_id: selectedAmbulance.id,
        patient_name: patientName,
        pickup_location: pickupLocation,
        destination: destination,
        ambulance_type: ambulanceType,
      });

      console.log("Booking response:", response.data);

      // Get booking ID from backend response
      const bookingId =
        response.data.id ||
        response.data.booking_id ||
        response.data.booking?.id ||
        "N/A";

      // Save active booking in localStorage
      localStorage.setItem(
        "activeBooking",
        JSON.stringify({
          bookingId: bookingId,
          ambulance: selectedAmbulance,
        })
      );

      // Store booking information for success modal
      setBookingSuccess({
        id: bookingId,
        vehicle_number: selectedAmbulance.vehicle_number,
        driver_name: selectedAmbulance.driver_name,
      });

      // Reset form
      setPatientName("");
      setPickupLocation("");
      setDestination("");
      setSelectedAmbulance(null);
      setAmbulanceType("Basic");
    } catch (error) {
      console.error(
        "Booking error:",
        error.response?.data || error
      );

      window.alert(
        error.response?.data?.detail ||
          "Booking failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-page">

      {/* ================= NAVBAR ================= */}
      <nav className="home-navbar">

        <div className="logo">
          <div className="logo-icon">+</div>

          <div>
            <h2>RapidAid EMS</h2>
            <span>Emergency Response Network</span>
          </div>
        </div>

        <div className="nav-actions">
          <button className="sos-btn">
            SOS Emergency
          </button>

          <div className="profile-avatar">
            A
          </div>
        </div>

      </nav>


      {/* ================= HERO SECTION ================= */}
      <section className="hero-section">

        <div className="hero-content">

          <span className="status-badge">
            24/7 Live Dispatch
          </span>

          <h1>
            Book the nearest ambulance
            <br />
            in under 60 seconds
          </h1>

          <p>
            Real-time ambulance tracking, verified drivers,
            ICU & ALS support, and instant emergency dispatch.
          </p>

          <div className="hero-stats">

            <div>
              <strong>2 min</strong>
              <span>Average ETA</span>
            </div>

            <div>
              <strong>150+</strong>
              <span>Active Ambulances</span>
            </div>

            <div>
              <strong>24/7</strong>
              <span>Emergency Support</span>
            </div>

          </div>

        </div>


        {/* ================= BOOKING PANEL ================= */}
        <div className="booking-panel">

          <h3>
            Request Ambulance
          </h3>


          {/* Selected Ambulance */}
          {selectedAmbulance && (
            <div className="selected-ambulance">

              <p>
                <strong>Selected:</strong>{" "}
                {selectedAmbulance.vehicle_number}
              </p>

              <p>
                Driver:{" "}
                {selectedAmbulance.driver_name}
              </p>

            </div>
          )}


          {/* Patient Name */}
          <input
            type="text"
            placeholder="Patient Name"
            value={patientName}
            onChange={(e) =>
              setPatientName(e.target.value)
            }
          />


          {/* Pickup Location */}
          <input
            type="text"
            placeholder="Pickup Location"
            value={pickupLocation}
            onChange={(e) =>
              setPickupLocation(e.target.value)
            }
          />


          {/* Destination */}
          <input
            type="text"
            placeholder="Destination Hospital"
            value={destination}
            onChange={(e) =>
              setDestination(e.target.value)
            }
          />


          {/* Ambulance Types */}
          <div className="ambulance-types">

            {[
              "Basic",
              "ICU",
              "ALS",
              "Neonatal",
            ].map((type) => (

              <button
                type="button"
                key={type}
                className={
                  ambulanceType === type
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setAmbulanceType(type)
                }
              >
                {type}
              </button>

            ))}

          </div>


          {/* Fare */}
          <div className="fare-box">

            <div>
              <span>
                Estimated Fare
              </span>

              <strong>
                ₹950
              </strong>
            </div>

            <div>
              <span>
                ETA
              </span>

              <strong>
                5 mins
              </strong>
            </div>

          </div>


          {/* Book Button */}
          <button
            className="book-btn"
            onClick={handleBooking}
            disabled={loading}
          >
            {loading
              ? "Booking..."
              : "Book Ambulance"}
          </button>

        </div>

      </section>


      {/* ================= LIVE MAP ================= */}
      <section className="map-section">

        <div className="section-header">

          <h2>
            Live Ambulance Tracking
          </h2>

          <span>
            Track nearby ambulances in real time
          </span>

        </div>


        <div className="map-card">
          <LiveMap />
        </div>

      </section>


      {/* ================= NEARBY AMBULANCES ================= */}
      <NearbyAmbulances
        onSelectAmbulance={(ambulance) => {

          setSelectedAmbulance(ambulance);

          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });

        }}
      />


      {/* ================= BOOKING SUCCESS MODAL ================= */}
      <BookingSuccessModal

        booking={bookingSuccess}

        onClose={() =>
          setBookingSuccess(null)
        }

        onTrack={() => {

          // Make sure booking data exists
          if (!bookingSuccess) {
            return;
          }

          // Close the success modal
          setBookingSuccess(null);

          // Navigate to Tracking page
          navigate("/tracking", {

            state: {

              bookingId:
                bookingSuccess.id,

              ambulance: {

                vehicle_number:
                  bookingSuccess.vehicle_number,

                driver_name:
                  bookingSuccess.driver_name,

              },

            },

          });

        }}

      />

    </div>
  );
}

export default Home;