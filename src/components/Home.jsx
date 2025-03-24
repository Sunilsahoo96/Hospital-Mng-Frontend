import { Link } from "react-router-dom";
import "../Hospital.css"; // Import the CSS file

function Home() {
  return (
    <div className="container">
      <h2 className="heading">🏥 Welcome to the Hospital Management System</h2>

      <div className="button-container">
        <Link to="/auth" className="link">
          <button className="get-started-button">Get Started</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
