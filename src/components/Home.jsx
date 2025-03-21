import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>🏥 Welcome to the Hospital Management System</h2>
      <p style={styles.description}>
        If you're new, please <span style={{ color: "green", textShadow: "2px 2px 4px rgba(0,0,0,0.5)" , fontWeight: "bold"}}>Sign Up</span>

        . If you already have an account, <span style={{ color: "blue", textShadow: "2px 2px 4px rgba(0,0,0,0.5)" , fontWeight: "bold"}}>Log In.</span>
        
      </p>

      <div style={styles.buttonContainer}>
        <Link to="/signup" style={styles.link}>
          <button style={styles.button}>Sign Up</button>
        </Link>

        <Link to="/login" style={styles.link}>
          <button style={{ ...styles.button, backgroundColor: "#007bff" }}>Login</button>
        </Link>
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: "relative",
    textAlign: "center",
    padding: "9rem",
    height: "100vh",
    backgroundImage: "url('https://www.sermo.com/wp-content/uploads/2023/11/improve-medical-practice-management-hero-min-1050x591.jpg.webp')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: "2.9rem",
    marginBottom: "1rem",
    color: "#333",
    fontFamily: "Quicksand",
    fontWeight: "bold",
  },
  description: {
    fontSize: "1rem",
    color: "black",
    marginBottom: "2rem",

  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
  },
  button: {
    padding: "10px 20px",
    fontSize: "1rem",
    borderRadius: "5px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#28a745",
    color: "#fff",
    transition: "all 0.3s",
  },
  link: {
    textDecoration: "none",
  },
};

export default Home;
