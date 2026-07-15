import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function UserDashboard() {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <Header />

      <div className="container my-4 flex-grow-1">
        <h3 className="fw-bold mb-4">Customer Dashboard</h3>

        <div className="row">
          <div className="col-md-4 mb-3">
            <div className="card shadow dashboard-card h-100">
              <div className="card-body text-center">
                <h5>🚗 My Vehicles</h5>
                <p>Register and view your vehicles.</p>
                <Link to="/vehicles" className="btn btn-primary">
                  Open
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card shadow dashboard-card h-100">
              <div className="card-body text-center">
                <h5>🛠 Book Service</h5>
                <p>Request maintenance or repair.</p>
                <Link to="/booking" className="btn btn-success">
                  Book Now
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card shadow dashboard-card h-100">
              <div className="card-body text-center">
                <h5>📋 Service Status</h5>
                <p>Track booking and repair progress.</p>
                <Link to="/status" className="btn btn-warning">
                  View Status
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default UserDashboard;