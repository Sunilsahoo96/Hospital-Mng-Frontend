import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import './App.css';
import AddMedicine from './components/AddMedicine';
import PatientRegistration from "./components/RegestrationPatient";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home"; 


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/signup" element={<Signup />} />  
          <Route path="/login" element={<Login />} />  
          <Route path="/add-medicine" element={<AddMedicine />} />
          <Route path="/patient-registration" element={<PatientRegistration />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
