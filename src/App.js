import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import "./Hospital.css";
import AddMedicine from './components/AddMedicine';
import PatientRegistration from "./components/RegestrationPatient";
import Auth from "./components/Auth";
import Home from "./components/Home";
import AllMedicineDetails from "./components/AllMedicineDetails";
import DashboardLayout from "./components/Dashboard";
import { ThemeProviderWrapper } from "./Context/ThemeContext";

function App() {
  return (
    <ThemeProviderWrapper>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />  {/* ✅ Fixed this line */}
            <Route path="/add-medicine" element={<AddMedicine />} />
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route path="get-medicine" element={<AllMedicineDetails />} />
              <Route path="patient-registration" element={<PatientRegistration />} />
            </Route>
          </Routes>
        </div>
      </Router >
    </ThemeProviderWrapper>
  );
}

export default App;
