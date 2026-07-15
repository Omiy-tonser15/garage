import { NavLink, useNavigate } from "react-router-dom";

function AdminSidebar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `nav-link text-white px-3 py-2 rounded mb-2 ${
      isActive ? "bg-primary fw-bold" : ""
    }`;

  return (
    <aside
      className="bg-dark text-white p-3 d-flex flex-column"
      style={{
        width: "250px",
        minHeight: "100vh",
      }}
    >
      <div>
        <h4 className="fw-bold mb-1">🚗 Garage Admin</h4>

        <small className="text-light d-block mb-4">
          {user?.username} ({user?.role})
        </small>

        <nav className="nav flex-column">
          <NavLink to="/admin" end className={linkClass}>
            📊 Dashboard
          </NavLink>

          <NavLink to="/admin/bookings" className={linkClass}>
            📋 Manage Bookings
          </NavLink>

          <NavLink to="/admin/staff" className={linkClass}>
            🧑‍🔧 Manage Staff
          </NavLink>

          <NavLink to="/admin/customers" className={linkClass}>
            👥 Manage Customers
          </NavLink>

          <NavLink to="/admin/services" className={linkClass}>
            🛠 Manage Services
          </NavLink>
        </nav>
      </div>

      <div className="mt-auto pt-3 border-top border-secondary">
        <button
          className="btn btn-danger w-100"
          onClick={logout}
        >
          🚪 Logout
        </button>
      </div>
    </aside>
  );
}

export default AdminSidebar;