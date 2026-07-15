import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Footer from "../components/Footer";

function StaffDashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadBookings = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("bookings");
      setBookings(response.data);
    } catch (err) {
      console.error(err.response?.data || err);
      setError("Failed to load bookings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
  }, []);

  const updateStatus = async (booking, newStatus) => {
    try {
      const updatedBooking = {
        bookingDate: booking.bookingDate,
        serviceDate: booking.serviceDate,
        status: newStatus,

        customer: {
          id: booking.customer.id,
        },

        vehicle: {
          id: booking.vehicle.id,
        },

        service: {
          id: booking.service.id,
        },

        staff: booking.staff
          ? {
              id: booking.staff.id,
            }
          : null,
      };

      await api.put(`bookings/${booking.id}`, updatedBooking);

      alert(`Booking changed to ${newStatus}`);
      await loadBookings();
    } catch (err) {
      alert("Failed to update booking");
      console.error(err.response?.data || err);
    }
  };

  const removeBooking = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this booking?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await api.delete(`bookings/${id}`);
      alert("Booking deleted successfully");
      await loadBookings();
    } catch (err) {
      alert("Failed to delete booking");
      console.error(err.response?.data || err);
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const badgeClass = (status) => {
    switch (status?.toUpperCase()) {
      case "PENDING":
        return "bg-warning text-dark";

      case "APPROVED":
        return "bg-success";

      case "REJECTED":
        return "bg-danger";

      case "IN_PROGRESS":
        return "bg-primary";

      case "COMPLETED":
        return "bg-info text-dark";

      default:
        return "bg-secondary";
    }
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
      <nav className="navbar navbar-dark bg-dark px-4 shadow-sm">
        <h4 className="text-white mb-0">
          🧑‍🔧 Staff Dashboard
        </h4>

        <div className="d-flex align-items-center gap-3">
          <span className="text-white">
            {user?.username} ({user?.role})
          </span>

          <button
            className="btn btn-danger btn-sm"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="container my-4 flex-grow-1">
        <div className="mb-4">
          <h3 className="fw-bold mb-1">
            Service Bookings
          </h3>

          <p className="text-muted mb-0">
            Review bookings and update vehicle repair progress.
          </p>
        </div>

        {loading && (
          <div className="alert alert-info">
            Loading bookings...
          </div>
        )}

        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        {!loading && !error && bookings.length === 0 && (
          <div className="alert alert-warning">
            No bookings available.
          </div>
        )}

        {!loading && !error && bookings.length > 0 && (
          <div className="card shadow-sm">
            <div className="card-body table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>Customer</th>
                    <th>Vehicle</th>
                    <th>Service</th>
                    <th>Service Date</th>
                    <th>Status</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking.id}>
                      <td>{booking.customer?.fullName}</td>

                      <td>
                        {booking.vehicle?.vehicleType}

                        <small className="d-block text-muted">
                          {booking.vehicle?.plateNumber}
                        </small>
                      </td>

                      <td>{booking.service?.serviceName}</td>

                      <td>{booking.serviceDate}</td>

                      <td>
                        <span
                          className={`badge ${badgeClass(
                            booking.status
                          )}`}
                        >
                          {booking.status}
                        </span>
                      </td>

                      <td className="text-center">
                        <button
                          className="btn btn-success btn-sm me-1"
                          disabled={
                            booking.status?.toUpperCase() !== "PENDING"
                          }
                          onClick={() =>
                            updateStatus(booking, "APPROVED")
                          }
                        >
                          Approve
                        </button>

                        <button
                          className="btn btn-warning btn-sm me-1"
                          disabled={
                            booking.status?.toUpperCase() !== "APPROVED"
                          }
                          onClick={() =>
                            updateStatus(booking, "IN_PROGRESS")
                          }
                        >
                          Start Repair
                        </button>

                        <button
                          className="btn btn-info btn-sm me-1"
                          disabled={
                            booking.status?.toUpperCase() !== "IN_PROGRESS"
                          }
                          onClick={() =>
                            updateStatus(booking, "COMPLETED")
                          }
                        >
                          Complete
                        </button>

                        <button
                          className="btn btn-danger btn-sm me-1"
                          disabled={
                            booking.status?.toUpperCase() !== "PENDING"
                          }
                          onClick={() =>
                            updateStatus(booking, "REJECTED")
                          }
                        >
                          Reject
                        </button>

                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() =>
                            removeBooking(booking.id)
                          }
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default StaffDashboard;