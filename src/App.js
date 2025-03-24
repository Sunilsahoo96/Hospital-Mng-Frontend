import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import './App.css';
import "./Hospital.css";
import AddMedicine from './components/AddMedicine';
import PatientRegistration from "./components/Patient/RegestrationPatient";
import Auth from "./components/Auth"; 
import Home from "./components/Home"; 
import AllMedicineDetails from "./components/AllMedicineDetails";
import AllPatients from "./components/Patient/AllPatients";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/auth" element={<Auth />} />
          <Route path="/add-medicine" element={<AddMedicine />} />
          <Route path="/get-medicine" element={<AllMedicineDetails />} />
          <Route path="/patient-registration" element={<PatientRegistration />} />
          <Route path="/all-patient" element={<AllPatients/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
