import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaShieldAlt } from "react-icons/fa";
import api from "../services/api";
import "../styles/auth.css";
import ambulanceHero from "../assets/ambulance-login.png";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const formData = new URLSearchParams();

    formData.append("username", email);
    formData.append("password", password);

    const response = await api.post("/login", formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    console.log("LOGIN RESPONSE:", response.data);

    const token = response.data.access_token;

    if (!token) {
      throw new Error("No access token received from backend");
    }

    // Remove old token first
    localStorage.removeItem("token");

    // Save fresh token
    localStorage.setItem("token", token);

    console.log("TOKEN SAVED:", localStorage.getItem("token"));

    navigate("/home");

  } catch (err) {
    console.error(
      "LOGIN ERROR:",
      err.response?.data || err.message || err
    );

    alert(
      err.response?.data?.detail ||
      err.message ||
      "Login failed"
    );
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="auth-page">
      <div className="auth-left">
  <div className="brand">
    <div className="logo-box">+</div>
    <div>
      <h2>RapidAid EMS</h2>
      <span>Every Second Counts</span>
    </div>
  </div>

  <div className="badge">24/7 Emergency Support</div>

  <h1>
    Fast Response.
    <br />
    <span>Better Care.</span>
  </h1>

  <p>
    {/* Hero Banner */}
<div className="hero-banner">
  <span className="hero-tag">Trusted Emergency Response</span>
  <h3>Emergency care that reaches you in minutes, not hours.</h3>
  <p>
    Book the nearest verified ambulance instantly with real-time tracking,
    trained medical staff, and 24/7 emergency support.
  </p>
</div>
  </p>

  <div className="hero-image">
    <img src={ambulanceHero} alt="RapidAid Ambulance" />
  </div>

  <div className="stats-card">
    <div><strong>10K+</strong><span>Lives Assisted</span></div>
    <div><strong>5K+</strong><span>Ambulances</span></div>
    <div><strong>50K+</strong><span>Happy Users</span></div>
  </div>
</div>
      <div className="auth-right">
        <div className="auth-card">
          <div className="ambulance-icon">🚑</div>

          <h2>Welcome Back!</h2>
          <p>Login to your RapidAid EMS account</p>

          <form onSubmit={handleLogin}>
            <div className="input-group">
              <FaEnvelope />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group">
              <FaLock />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <FaEye className="eye" />
            </div>

            <div className="row">
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <a href="#">Forgot Password?</a>
            </div>

            <button type="submit" className="login-btn" disabled={loading}>
              {loading ? "Signing In..." : "Login"}
            </button>
          </form>

          <div className="divider">or continue with</div>

          <button className="google-btn">Continue with Google</button>

          <div className="footer">
            Don't have an account?
            <Link to="/register">Create Account</Link>
          </div>

          <div className="security">
            <FaShieldAlt />
            <span>Your Safety, Our Priority</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;