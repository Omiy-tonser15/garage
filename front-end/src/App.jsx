import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import UserDashboard from "./pages/UserDashboard";
import StaffDashboard from "./pages/StaffDashboard";
import AdminDashboard from "./pages/AdminDashboard";

import Vehicles from "./pages/Vehicles";
import Booking from "./pages/Booking";
import ServiceStatus from "./pages/ServiceStatus";
import GarageServices from "./pages/GarageServices";

import AdminLayout from "./components/AdminLayout";
import ManageBookings from "./pages/ManageBookings";
import ManageStaff from "./pages/ManageStaff";
import ManageCustomers from "./pages/ManageCustomers";
import ManageServices from "./pages/ManageServices";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/vehicles" element={<Vehicles />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/status" element={<ServiceStatus />} />
        <Route path="/services" element={<GarageServices />} />

        <Route path="/staff" element={<StaffDashboard />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="bookings" element={<ManageBookings />} />
          <Route path="staff" element={<ManageStaff />} />
          <Route path="customers" element={<ManageCustomers />} />
          <Route path="services" element={<ManageServices />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;