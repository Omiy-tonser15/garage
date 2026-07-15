import { useEffect, useState } from "react";
import api from "../api/axios";

function ManageStaff() {
  const [staffList, setStaffList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    staffName: "",
    phone: "",
    position: "",
  });

  const loadStaff = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("staff");
      setStaffList(response.data);
    } catch (err) {
      console.error(err.response?.data || err);
      setError("Failed to load staff.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStaff();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addStaff = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      await api.post("auth/register-staff", formData);

      alert("Staff added successfully");

      setFormData({
        username: "",
        email: "",
        password: "",
        staffName: "",
        phone: "",
        position: "",
      });

      setShowForm(false);
      await loadStaff();
    } catch (err) {
      console.error(err.response?.data || err);

      setError(
        typeof err.response?.data === "string"
          ? err.response.data
          : "Failed to add staff."
      );
    } finally {
      setSaving(false);
    }
  };

  const deleteStaff = async (staff) => {
    const confirmed = window.confirm(
      `Delete staff member ${staff.staffName}?`
    );

    if (!confirmed) {
      return;
    }

    try {
      await api.delete(`staff/${staff.id}`);
      alert("Staff deleted successfully");
      await loadStaff();
    } catch (err) {
      console.error(err.response?.data || err);

      alert(
        "Staff could not be deleted. The staff member may be connected to bookings."
      );
    }
  };

  const filteredStaff = staffList.filter((staff) => {
    const keyword = search.toLowerCase();

    return (
      staff.staffName?.toLowerCase().includes(keyword) ||
      staff.phone?.toLowerCase().includes(keyword) ||
      staff.position?.toLowerCase().includes(keyword) ||
      staff.user?.username?.toLowerCase().includes(keyword) ||
      staff.user?.email?.toLowerCase().includes(keyword)
    );
  });

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mb-1">Manage Staff</h3>
          <p className="text-muted mb-0">
            Add, search and remove garage staff accounts.
          </p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Close Form" : "+ Add Staff"}
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {showForm && (
        <form onSubmit={addStaff} className="card shadow-sm p-4 mb-4">
          <h5 className="fw-bold mb-3">New Staff Account</h5>

          <div className="row">
            <div className="col-md-6">
              <label className="form-label">Staff Name</label>
              <input
                type="text"
                name="staffName"
                className="form-control mb-3"
                value={formData.staffName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Position</label>
              <input
                type="text"
                name="position"
                className="form-control mb-3"
                placeholder="Example: Mechanic"
                value={formData.position}
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
            {saving ? "Saving..." : "Save Staff"}
          </button>
        </form>
      )}

      <div className="card shadow-sm">
        <div className="card-body">
          <input
            type="search"
            className="form-control mb-3"
            placeholder="Search by name, position, username, email or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {loading ? (
            <div className="alert alert-info mb-0">
              Loading staff...
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>Staff Name</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Position</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredStaff.map((staff) => (
                    <tr key={staff.id}>
                      <td>{staff.id}</td>
                      <td>{staff.staffName}</td>
                      <td>{staff.user?.username}</td>
                      <td>{staff.user?.email}</td>
                      <td>{staff.phone}</td>
                      <td>{staff.position}</td>

                      <td className="text-center">
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => deleteStaff(staff)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}

                  {filteredStaff.length === 0 && (
                    <tr>
                      <td colSpan="7" className="text-center text-muted">
                        No staff found.
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

export default ManageStaff;