import React from "react";
import "../styles/BookingSuccessModal.css";

function BookingSuccessModal({ booking, onClose, onTrack }) {
  if (!booking) return null;

  return (
    <div className="modal-overlay">
      <div className="booking-modal">
        <div className="success-icon">✓</div>
        <h2>Booking Confirmed!</h2>
        <p>Your ambulance has been dispatched successfully.</p>

        <div className="booking-details">
          <div>
            <span>Booking ID</span>
            <strong>#{booking.id}</strong>
          </div>
          <div>
            <span>Ambulance</span>
            <strong>{booking.vehicle_number}</strong>
          </div>
          <div>
            <span>Driver</span>
            <strong>{booking.driver_name}</strong>
          </div>
          <div>
            <span>ETA</span>
            <strong>5 mins</strong>
          </div>
        </div>

        <div className="modal-actions">
          <button className="track-btn" onClick={onTrack}>
  Track Ambulance
</button>
          <button className="done-btn" onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookingSuccessModal;