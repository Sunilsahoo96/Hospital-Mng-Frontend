import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import "./Hospital.css";
import AddMedicine from './components/Medicine/AddMedicine';
import PatientRegistration from "./components/Patient/RegestrationPatient";
import Auth from "./components/auth";
import Home from "./components/Home";
import AllMedicineDetails from "./components/Medicine/AllMedicineDetails";
import AdminDashboard from "./components/Roles/AdminDashboard";
import MedicineCashierDashboard from "./components/Medicine/MedicineCashierDashboard"
import DoctorDashboard from "./components/Roles/DoctorDashboard";
import NurseDashboard from "./components/Roles/NurseDashboard";
import ReceptionDashboard from "./components/Roles/ReceptionDashboard";
import PrivateRoute from "./components/PrivateRoute";
import AllPatients from "./components/Patient/AllPatients";
import SellMedicine from "./components/Medicine/SellMedicine";
import DoctorHomeDashboard from "./components/Roles/DoctorHomeDashboard";

function App() {
  return (
    
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/add-medicine" element={<AddMedicine />} />
            <Route path ="/sell-medicine" element={<SellMedicine />}/>

            {/* <Route path="/dashboard" element={<DashboardLayout />}>
              <Route path="get-medicine" element={<AllMedicineDetails />} />
              <Route path="patient-registration" element={<PatientRegistration />} />
            </Route> */}

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


            <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
              <Route path="/admin-dashboard" element={<AdminDashboard />}>
                <Route path="all-medicine" element={<AllMedicineDetails />} />
                <Route path="add-medicine" element={<AddMedicine />} />
                <Route path="medicinecashier" element={<MedicineCashierDashboard />} />
                <Route path="patient-registration" element={<PatientRegistration />} />
                <Route path="all-patients" element={<AllPatients />} />
              </Route>
            </Route>


            <Route element={<PrivateRoute allowedRoles={["doctor"]} />}>
              <Route path="/doctor-dashboard" element={<DoctorDashboard/>}>
                  <Route path="doctor-home-dashboard" element={<DoctorHomeDashboard/>}/>
              </Route>
            </Route>

          </Routes>
        </div>
      </Router >

  )
}

export default App
