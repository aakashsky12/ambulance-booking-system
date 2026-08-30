import { FaAmbulance, FaUserCircle } from "react-icons/fa";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <FaAmbulance />
        <span>RapidAid EMS</span>
      </div>

      <div className="nav-user">
        <FaUserCircle size={28} />
        <span>Welcome</span>
      </div>
    </nav>
  );
}

export default Navbar;