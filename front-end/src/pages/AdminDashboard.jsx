import { useEffect, useState } from "react";
import api from "../api/axios";

function AdminDashboard() {
  const [counts, setCounts] = useState({
    users: 0,
    customers: 0,
    vehicles: 0,
    bookings: 0,
    services: 0,
    staff: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCounts = async () => {
      try {
        setLoading(true);
        setError("");

        const [users, customers, vehicles, bookings, services, staff] =
          await Promise.all([
            api.get("users"),
            api.get("customers"),
            api.get("vehicles"),
            api.get("bookings"),
            api.get("services"),
            api.get("staff"),
          ]);

        setCounts({
          users: users.data.length,
          customers: customers.data.length,
          vehicles: vehicles.data.length,
          bookings: bookings.data.length,
          services: services.data.length,
          staff: staff.data.length,
        });
      } catch (err) {
        console.error(err.response?.data || err);
        setError("Failed to load dashboard statistics.");
      } finally {
        setLoading(false);
      }
    };

    loadCounts();
  }, []);

  return (
    <div>
      <div className="mb-4">
        <h3 className="fw-bold mb-1">Administrator Dashboard</h3>
        <p className="text-muted mb-0">
          Overview of the Garage Management System.
        </p>
      </div>

      {loading && (
        <div className="alert alert-info">
          Loading dashboard statistics...
        </div>
      )}

      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <div className="row">
          <DashboardCard
            title="Users"
            value={counts.users}
            icon="👤"
          />

          <DashboardCard
            title="Customers"
            value={counts.customers}
            icon="👥"
          />

          <DashboardCard
            title="Staff"
            value={counts.staff}
            icon="🧑‍🔧"
          />

          <DashboardCard
            title="Vehicles"
            value={counts.vehicles}
            icon="🚗"
          />

          <DashboardCard
            title="Services"
            value={counts.services}
            icon="🛠"
          />

          <DashboardCard
            title="Bookings"
            value={counts.bookings}
            icon="📋"
          />
        </div>
      )}
    </div>
  );
}

function DashboardCard({ title, value, icon }) {
  return (
    <div className="col-lg-4 col-md-6 mb-4">
      <div className="card shadow-sm h-100 dashboard-card">
        <div className="card-body d-flex align-items-center">
          <div
            className="d-flex justify-content-center align-items-center me-3"
            style={{
              width: "65px",
              height: "65px",
              borderRadius: "12px",
              backgroundColor: "#f1f3f5",
              fontSize: "30px",
            }}
          >
            {icon}
          </div>

          <div>
            <p className="text-muted mb-1">{title}</p>
            <h2 className="fw-bold mb-0">{value}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;