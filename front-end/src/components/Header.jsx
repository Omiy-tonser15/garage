import { Link, NavLink, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container-fluid">

        {/* Left Side */}
        <div className="d-flex align-items-center">

          <Link
            to="/dashboard"
            className="navbar-brand fw-bold fs-3 me-4"
            style={{ textDecoration: "none" }}
          >
            🚗 Garage System
          </Link>

          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `nav-link fw-bold fs-5 ${
                isActive ? "text-warning" : "text-white"
              }`
            }
          >
            🏠 Home
          </NavLink>

        </div>

        {/* Right Side */}
        <div className="d-flex align-items-center">

          <span className="text-white fs-5 me-4">
            {user?.username} ({user?.role})
          </span>

          <button
            className="btn btn-danger"
            onClick={logout}
          >
            Logout
          </button>

        </div>

      </div>
    </nav>
  );
}

export default Header;