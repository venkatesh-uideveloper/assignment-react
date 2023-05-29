import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <div style={{ textAlign: "center" }}>
      <h2 data-testid="heading">Welcome!</h2>
      <button onClick={() => navigate("sessions")}>Navigate to Sessions</button>
    </div>
  );
}

export default Home;
