import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { lazy } from "react";
import './App.css';
import "./Hospital.css";
import Home from "./components/Home";
import PrivateRoute from "./components/PrivateRoute";
const Auth = lazy(() => import("./components/Auth"));
const AddMedicine = lazy(() => import("./components/Medicine/AddMedicine"));
const PatientRegistration = lazy(() => import("./components/Patient/RegestrationPatient"));
const AllMedicineDetails = lazy(() => import("./components/Medicine/AllMedicineDetails"));
const AdminDashboard = lazy(() => import("./components/Roles/AdminDashboard"));
const MedicineCashierDashboard = lazy(() => import("./components/Medicine/MedicineCashierDashboard"));
const DoctorDashboard = lazy(() => import("./components/Roles/DoctorDashboard"));
const NurseDashboard = lazy(() => import("./components/Roles/NurseDashboard"));
const ReceptionDashboard = lazy(() => import("./components/Roles/ReceptionDashboard"));
const AllPatients = lazy(() => import("./components/Patient/AllPatients"));
const SellMedicine = lazy(() => import("./components/Medicine/SellMedicine"));
const DoctorHomeDashboard = lazy(() => import("./components/Roles/DoctorHomeDashboard"));


function App() {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/add-medicine" element={<AddMedicine />} />
        <Route path="/sell-medicine" element={<SellMedicine />} />

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
          <Route path="/doctor-dashboard" element={<DoctorDashboard />}>
            <Route path="doctor-home-dashboard" element={<DoctorHomeDashboard />} />
          </Route>
        </Route>

      </Routes>
    </Router >

  )
}

export default App
