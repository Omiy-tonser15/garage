import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

function AdminLayout() {
  return (
    <div className="d-flex min-vh-100">
      <AdminSidebar />

      <div className="flex-grow-1 bg-light">
        <nav className="navbar navbar-light bg-white shadow-sm px-4">
          <h5 className="mb-0 fw-bold">
            Garage Management System
          </h5>
        </nav>

        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;