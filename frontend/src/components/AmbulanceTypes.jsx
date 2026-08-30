import { FaAmbulance, FaHeartbeat, FaBolt, FaBaby } from "react-icons/fa";
import "../styles/AmbulanceTypes.css";

const ambulances = [
  {
    title: "Basic",
    icon: <FaAmbulance />,
    price: "₹499",
    desc: "General emergencies",
  },
  {
    title: "ICU",
    icon: <FaHeartbeat />,
    price: "₹1499",
    desc: "Critical care support",
  },
  {
    title: "ALS",
    icon: <FaBolt />,
    price: "₹999",
    desc: "Advanced life support",
  },
  {
    title: "Neonatal",
    icon: <FaBaby />,
    price: "₹1999",
    desc: "Baby transport",
  },
];

function AmbulanceTypes() {
  return (
    <section className="ambulance-section">
      <h2>Choose Ambulance Type</h2>

      <div className="ambulance-grid">
        {ambulances.map((item, index) => (
          <div className="ambulance-card" key={index}>
            <div className="icon">{item.icon}</div>

            <h3>{item.title}</h3>

            <p>{item.desc}</p>

            <span>{item.price}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default AmbulanceTypes;