import { Link } from "react-router-dom";
import "../Hospital.css"; // Import the CSS file

const WELCOME_MESSAGE = "Welcome to the Hospital Management System";

function Home() {
  return (
    <div className="container">
      <h2 className="heading mt-5">
        <span>{WELCOME_MESSAGE}</span>
      </h2>

      <div
        className="button-container d-flex justify-content-center align-items-center"
        style={{ height: "70vh" }}
      >
        <Link to="/auth" className="link">
          <button className="get-started-button">Get Started</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
