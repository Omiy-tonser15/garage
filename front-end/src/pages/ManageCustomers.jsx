import { useEffect, useState } from "react";
import api from "../api/axios";

function ManageCustomers() {
  const [customers, setCustomers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    fullName: "",
    phone: "",
  });

  const loadCustomers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("customers");
      setCustomers(response.data);
    } catch (err) {
      console.error(err.response?.data || err);
      setError("Failed to load customers.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addCustomer = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      await api.post("auth/register", formData);

      alert("Customer added successfully");

      setFormData({
        username: "",
        email: "",
        password: "",
        fullName: "",
        phone: "",
      });

      setShowForm(false);
      await loadCustomers();
    } catch (err) {
      console.error(err.response?.data || err);

      setError(
        typeof err.response?.data === "string"
          ? err.response.data
          : "Failed to add customer."
      );
    } finally {
      setSaving(false);
    }
  };

  const deleteCustomer = async (customer) => {
    const confirmed = window.confirm(
      `Delete customer ${customer.fullName}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      await api.delete(`customers/${customer.id}`);
      alert("Customer deleted successfully");
      await loadCustomers();
    } catch (err) {
      console.error(err.response?.data || err);

      alert(
        "Customer could not be deleted. The customer may have vehicles or bookings."
      );
    }
  };

  const filteredCustomers = customers.filter((customer) => {
    const keyword = search.toLowerCase();

    return (
      customer.fullName?.toLowerCase().includes(keyword) ||
      customer.phone?.toLowerCase().includes(keyword) ||
      customer.user?.username?.toLowerCase().includes(keyword) ||
      customer.user?.email?.toLowerCase().includes(keyword)
    );
  });

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mb-1">Manage Customers</h3>
          <p className="text-muted mb-0">
            Add, search and remove customer accounts.
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Close Form" : "+ Add Customer"}
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {showForm && (
        <form onSubmit={addCustomer} className="card shadow-sm p-4 mb-4">
          <h5 className="fw-bold mb-3">New Customer</h5>

          <div className="row">
            <div className="col-md-6">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="fullName"
                className="form-control mb-3"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Phone</label>
              <input
                type="text"
                name="phone"
                className="form-control mb-3"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Username</label>
              <input
                type="text"
                name="username"
                className="form-control mb-3"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-control mb-3"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-control mb-3"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-success"
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Customer"}
          </button>
        </form>
      )}

      <div className="card shadow-sm">
        <div className="card-body">
          <input
            type="search"
            className="form-control mb-3"
            placeholder="Search by name, username, email or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {loading ? (
            <div className="alert alert-info mb-0">
              Loading customers...
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>Full Name</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredCustomers.map((customer) => (
                    <tr key={customer.id}>
                      <td>{customer.id}</td>
                      <td>{customer.fullName}</td>
                      <td>{customer.user?.username}</td>
                      <td>{customer.user?.email}</td>
                      <td>{customer.phone}</td>

                      <td className="text-center">
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => deleteCustomer(customer)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}

                  {filteredCustomers.length === 0 && (
                    <tr>
                      <td colSpan="6" className="text-center text-muted">
                        No customers found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ManageCustomers;