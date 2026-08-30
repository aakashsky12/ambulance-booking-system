import { FaLocationArrow, FaPhoneAlt } from "react-icons/fa";
import "../styles/Hero.css";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>🚑 Emergency Ambulance Service</h1>

        <p>
          Book the nearest ambulance in seconds.
          <br />
          Fast • Reliable • 24×7
        </p>

        <div className="hero-buttons">
          <button className="location-btn">
            <FaLocationArrow />
            Use Current Location
          </button>

          <button className="call-btn">
            <FaPhoneAlt />
            Emergency Call
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;