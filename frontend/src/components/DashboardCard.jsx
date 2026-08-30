import "../styles/DashboardCard.css";

function DashboardCard({ title, value, color, icon }) {
  return (
    <div className="card" style={{ borderTop: `5px solid ${color}` }}>
      <div className="card-icon">{icon}</div>

      <div>
        <h3>{title}</h3>
        <h1>{value}</h1>
      </div>
    </div>
  );
}

export default DashboardCard;