import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // ✅ Import BrowserRouter
import './App.css';
import AddMedicine from './components/AddMedicine';
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";  // Create a Home page with both options


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />  {/* Default Route - Shows Signup & Login */}
          <Route path="/signup" element={<Signup />} />  
          <Route path="/login" element={<Login />} />  
          <Route path="/add-medicine" element={<AddMedicine />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
