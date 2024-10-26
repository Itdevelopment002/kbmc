import React from "react";
import img1 from "../../assets/images/banner/inner-banner.jpg";

const PropertyHolder = () => {
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
                <tr>
                  <td>1</td>
                  <td>Residential Property</td>
                  <td>123213</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Commercial Property</td>
                  <td>14365</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Industrial Property</td>
                  <td>642</td>
                </tr>
                <tr>
                  <th>4</th>
                  <th>Total Property</th>
                  <th>138299</th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default PropertyHolder;
