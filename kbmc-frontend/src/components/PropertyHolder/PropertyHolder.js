import React, { useState, useEffect } from "react";
import img1 from "../../assets/images/banner/inner-banner.jpg";
import axios from "axios";

const PropertyHolder = () => {
  const [property, setProperty] = useState([]);

  const fetchProperty = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/property_holder"
      );
      setProperty(response.data);
    } catch (error) {
      console.error("Error fetching property data");
    }
  };

  useEffect(() => {
    fetchProperty();
  }, []);

  return (
    <>
      <section className="page-title">
        <div
          className="bg-layer"
          style={{ backgroundImage: `url(${img1})` }}
        ></div>
        <div className="line-box">
          <div className="line-1"></div>
          <div className="line-2"></div>
        </div>
        <div className="auto-container">
          <div className="content-box">
            <h1>Property Holder</h1>
            <ul className="bread-crumb clearfix">
              <li>
                <a href="#.">City Profile</a>
              </li>
              <li>
                <span>Property Holder</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <br />
      <br />
      <br />

      <section className="service-style-four">
        <div className="auto-container">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead
                className="text-center"
                style={{ backgroundColor: "#29aae1" }}
              >
                <tr>
                  <th
                    style={{
                      backgroundColor: "#29aae1",
                      color: "#fff",
                    }}
                  >
                    Sr. No
                  </th>
                  <th
                    style={{
                      backgroundColor: "#29aae1",
                      color: "#fff",
                    }}
                  >
                    Description
                  </th>
                  <th
                    style={{
                      backgroundColor: "#29aae1",
                      color: "#fff",
                    }}
                  >
                    Property
                  </th>
                </tr>
              </thead>
              <tbody>
                {property.map((property, index) => (
                  <tr key={property.id}>
                    <td>{index + 1}</td>
                    <td>{property.description}</td>
                    <td>{property.property}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default PropertyHolder;
