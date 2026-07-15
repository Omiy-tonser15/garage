import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Booking() {
  const navigate = useNavigate();

  const [vehicles, setVehicles] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    bookingDate: new Date().toISOString().split("T")[0],
    serviceDate: "",
    status: "PENDING",
    customer: { id: 1 },
    vehicle: { id: "" },
    service: { id: "" },
    staff: null,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError("");

        const [vehiclesResponse, servicesResponse] = await Promise.all([
          api.get("vehicles"),
          api.get("services"),
        ]);

        console.log("Vehicles:", vehiclesResponse.data);
        console.log("Services:", servicesResponse.data);

        setVehicles(vehiclesResponse.data);
        setServices(servicesResponse.data);
      } catch (err) {
        console.error("Loading error:", err.response?.data || err);
        console.error("Status:", err.response?.status);

        setError(
          `Failed to load data. Status: ${err.response?.status || "Unknown"}`
        );
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    try {
      console.log("Booking data:", formData);

      await api.post("bookings", formData);

      alert("✅ Booking successful");
      navigate("/status");
    } catch (err) {
      alert("❌ Booking failed");
      console.error(err.response?.data || err);
    }
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
      <Header />

      <div className="container my-4 flex-grow-1">
        <h3 className="fw-bold mb-4">Book Service</h3>

        {loading && (
          <div className="alert alert-info">Loading vehicles and services...</div>
        )}

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={submit} className="card shadow p-4">
          <label className="form-label">Vehicle</label>

          <select
            className="form-select mb-3"
            required
            value={formData.vehicle.id}
            onChange={(e) =>
              setFormData({
                ...formData,
                vehicle: { id: Number(e.target.value) },
              })
            }
          >
            <option value="">Select Vehicle</option>

            {vehicles.map((vehicle) => (
              <option key={vehicle.id} value={vehicle.id}>
                {vehicle.vehicleType} - {vehicle.plateNumber}
              </option>
            ))}
          </select>

          {vehicles.length === 0 && !loading && (
            <p className="text-danger">No vehicles found.</p>
          )}

          <label className="form-label">Garage Service</label>

          <select
            className="form-select mb-3"
            required
            value={formData.service.id}
            onChange={(e) =>
              setFormData({
                ...formData,
                service: { id: Number(e.target.value) },
              })
            }
          >
            <option value="">Select Service</option>

            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.serviceName} - TZS {service.price}
              </option>
            ))}
          </select>

          {services.length === 0 && !loading && (
            <p className="text-danger">No services found.</p>
          )}

          <label className="form-label">Service Date</label>

          <input
            type="date"
            className="form-control mb-3"
            required
            value={formData.serviceDate}
            onChange={(e) =>
              setFormData({
                ...formData,
                serviceDate: e.target.value,
              })
            }
          />

          <button className="btn btn-success">Submit Booking</button>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default Booking;