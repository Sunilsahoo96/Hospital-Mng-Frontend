import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import "./Hospital.css";
import AddMedicine from './components/AddMedicine';
import PatientRegistration from "./components/RegestrationPatient";
import Auth from "./components/Auth";
import Home from "./components/Home";
import AllMedicineDetails from "./components/AllMedicineDetails";
import DashboardLayout from "./components/Dashboard";
import AdminDashboard from "./components/AdminDashboard";
import MedicineCashierDashboard from "./components/MedicineCashierDashboard"
import DoctorDashboard from "./components/DoctorDashboard";
import NurseDashboard from "./components/NurseDashboard";
import ReceptionDashboard from "./components/ReceptionDashboard";
import PrivateRoute from "./components/PrivateRoute";
import { ThemeProviderWrapper } from "./Context/ThemeContext";

function App() {
  return (
    <ThemeProviderWrapper>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />  
            <Route path="/add-medicine" element={<AddMedicine />} />

            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route path="get-medicine" element={<AllMedicineDetails />} />
              <Route path="patient-registration" element={<PatientRegistration />} />
            </Route>

            <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
            </Route>
            <Route element={<PrivateRoute allowedRoles={["doctor"]} />}>
              <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
            </Route>
            <Route element={<PrivateRoute allowedRoles={["nurse"]} />}>
              <Route path="/nurse-dashboard" element={<NurseDashboard />} />
            </Route>
            <Route element={<PrivateRoute allowedRoles={["medicine cashier"]} />}>
              <Route path="/medicine-cashier-dashboard" element={<MedicineCashierDashboard />} />
            </Route>
            <Route element={<PrivateRoute allowedRoles={["reception"]} />}>
              <Route path="/reception-dashboard" element={<ReceptionDashboard />} />
            </Route>


          </Routes>
        </div>
      </Router >
    </ThemeProviderWrapper>
  )
}

export default App
