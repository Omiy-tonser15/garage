import { useEffect, useState } from "react";
import api from "../api/axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

function GarageServices() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    api.get("services").then((res) => setServices(res.data));
  }, []);

  return (
    <div className="min-vh-100 d-flex flex-column">
      <Header />

      <div className="container my-4 flex-grow-1">
        <h3 className="fw-bold mb-4">Available Services</h3>

        <div className="row">
          {services.map((service) => (
            <div className="col-md-4 mb-3" key={service.id}>
              <div className="card shadow h-100">
                <div className="card-body">
                  <h5>{service.serviceName}</h5>
                  <p>{service.description}</p>
                  <p className="fw-bold">TZS {service.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default GarageServices;