import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

function ServiceStatus() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [bookings, setBookings] = useState([]);
  const [services, setServices] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    vehicleId: "",
    serviceId: "",
    serviceDate: "",
  });

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      const [bookingsResponse, servicesResponse, vehiclesResponse] =
        await Promise.all([
          api.get("bookings"),
          api.get("services"),
          api.get("vehicles"),
        ]);

      let customerBookings = bookingsResponse.data;

      /*
       * Kama LoginResponse yako baadaye itakuwa na customerId,
       * itaonyesha bookings za customer aliye-login pekee.
       * Kwa sasa, kama customerId haipo, itaonyesha zote.
       */
      if (user?.customerId) {
        customerBookings = bookingsResponse.data.filter(
          (booking) => booking.customer?.id === user.customerId
        );
      }

      setBookings(customerBookings);
      setServices(servicesResponse.data);
      setVehicles(vehiclesResponse.data);
    } catch (err) {
      console.error("Loading error:", err.response?.data || err);
      setError("Failed to load service history.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const startEdit = (booking) => {
    setEditingId(booking.id);

    setFormData({
      vehicleId: booking.vehicle?.id || "",
      serviceId: booking.service?.id || "",
      serviceDate: booking.serviceDate || "",
    });
  };

  const cancelEdit = () => {
    setEditingId(null);

    setFormData({
      vehicleId: "",
      serviceId: "",
      serviceDate: "",
    });
  };

  const updateBooking = async (booking) => {
    try {
      /*
       * Backend yako ya update inataka Booking object nzima,
       * ndiyo maana tunatuma pia customer, status, bookingDate na staff.
       */
      const updatedBooking = {
        bookingDate: booking.bookingDate,
        serviceDate: formData.serviceDate,
        status: booking.status,

        customer: {
          id: booking.customer.id,
        },

        vehicle: {
          id: Number(formData.vehicleId),
        },

        service: {
          id: Number(formData.serviceId),
        },

        staff: booking.staff
          ? {
              id: booking.staff.id,
            }
          : null,
      };

      await api.put(`bookings/${booking.id}`, updatedBooking);

      alert("✅ Booking updated successfully");

      setEditingId(null);
      await loadData();
    } catch (err) {
      alert("❌ Update failed");
      console.error("Update error:", err.response?.data || err);
    }
  };

  const getStatusBadge = (status) => {
    const normalizedStatus = status?.toUpperCase();

    if (normalizedStatus === "PENDING") {
      return "bg-warning text-dark";
    }

    if (normalizedStatus === "APPROVED") {
      return "bg-success";
    }

    if (normalizedStatus === "REJECTED") {
      return "bg-danger";
    }

    if (
      normalizedStatus === "COMPLETED" ||
      normalizedStatus === "FINISHED"
    ) {
      return "bg-primary";
    }

    return "bg-secondary";
  };

  const isPending = (status) => {
    return status?.toUpperCase() === "PENDING";
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
      <Header />

      <div className="container my-4 flex-grow-1">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-bold mb-0">My Service History</h3>

        </div>

        {loading && (
          <div className="alert alert-info">
            Loading service history...
          </div>
        )}

        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && bookings.length === 0 && (
          <div className="alert alert-warning">
            No bookings found.
          </div>
        )}

        {!loading && bookings.length > 0 && (
          <div className="card shadow">
            <div className="card-body table-responsive">
              <table className="table table-bordered table-hover align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>Vehicle</th>
                    <th>Service</th>
                    <th>Status</th>
                    <th>Service Date</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking.id}>
                      <td>
                        {editingId === booking.id ? (
                          <select
                            className="form-select"
                            value={formData.vehicleId}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                vehicleId: e.target.value,
                              })
                            }
                            required
                          >
                            <option value="">Select Vehicle</option>

                            {vehicles.map((vehicle) => (
                              <option
                                key={vehicle.id}
                                value={vehicle.id}
                              >
                                {vehicle.vehicleType} -{" "}
                                {vehicle.plateNumber}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <>
                            {booking.vehicle?.vehicleType}
                            {booking.vehicle?.plateNumber && (
                              <small className="d-block text-muted">
                                {booking.vehicle.plateNumber}
                              </small>
                            )}
                          </>
                        )}
                      </td>

                      <td>
                        {editingId === booking.id ? (
                          <select
                            className="form-select"
                            value={formData.serviceId}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                serviceId: e.target.value,
                              })
                            }
                            required
                          >
                            <option value="">Select Service</option>

                            {services.map((service) => (
                              <option
                                key={service.id}
                                value={service.id}
                              >
                                {service.serviceName} - TZS{" "}
                                {service.price}
                              </option>
                            ))}
                          </select>
                        ) : (
                          booking.service?.serviceName
                        )}
                      </td>

                      <td>
                        <span
                          className={`badge ${getStatusBadge(
                            booking.status
                          )}`}
                        >
                          {booking.status}
                        </span>
                      </td>

                      <td>
                        {editingId === booking.id ? (
                          <input
                            type="date"
                            className="form-control"
                            value={formData.serviceDate}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                serviceDate: e.target.value,
                              })
                            }
                            required
                          />
                        ) : (
                          booking.serviceDate
                        )}
                      </td>

                      <td className="text-center">
                        {isPending(booking.status) ? (
                          editingId === booking.id ? (
                            <>
                              <button
                                className="btn btn-success btn-sm me-2"
                                onClick={() =>
                                  updateBooking(booking)
                                }
                              >
                                Save
                              </button>

                              <button
                                className="btn btn-secondary btn-sm"
                                onClick={cancelEdit}
                              >
                                Cancel
                              </button>
                            </>
                          ) : (
                            <button
                              className="btn btn-primary btn-sm"
                              onClick={() => startEdit(booking)}
                            >
                              Update
                            </button>
                          )
                        ) : (
                          <span className="text-muted">
                            Locked
                          </span>
                        )}
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

export default ServiceStatus;