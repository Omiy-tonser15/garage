import { useEffect, useState } from "react";
import api from "../api/axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Vehicles() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [vehicles, setVehicles] = useState([]);

  const [formData, setFormData] = useState({
    plateNumber: "",
    vehicleType: "",
    customer: { id: user?.customerId || 1 },
  });

  const loadVehicles = () => {
    api.get("vehicles").then((res) => setVehicles(res.data));
  };

  useEffect(() => {
    loadVehicles();
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    await api.post("vehicles", formData);
    setFormData({
      plateNumber: "",
      vehicleType: "",
      customer: { id: user?.customerId || 1 },
    });
    loadVehicles();
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
      <Header />

      <div className="container my-4 flex-grow-1">
        <h3 className="fw-bold mb-4">My Vehicles</h3>

        <form onSubmit={submit} className="card shadow p-4 mb-4">
          <input
            className="form-control mb-3"
            placeholder="Plate Number"
            value={formData.plateNumber}
            onChange={(e) =>
              setFormData({ ...formData, plateNumber: e.target.value })
            }
            required
          />

          <input
            className="form-control mb-3"
            placeholder="Vehicle Type"
            value={formData.vehicleType}
            onChange={(e) =>
              setFormData({ ...formData, vehicleType: e.target.value })
            }
            required
          />

          <button className="btn btn-primary">Add Vehicle</button>
        </form>

        <table className="table table-bordered bg-white">
          <thead className="table-dark">
            <tr>
              <th>Plate Number</th>
              <th>Vehicle Type</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((v) => (
              <tr key={v.id}>
                <td>{v.plateNumber}</td>
                <td>{v.vehicleType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Footer />
    </div>
  );
}

export default Vehicles;