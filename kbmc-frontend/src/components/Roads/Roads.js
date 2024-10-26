import React from "react";
import innerBanner from '../../assets/images/banner/inner-banner.jpg';

const Roads = () => {
  return (
    <>
      <section className="page-title">
        <div
          className="bg-layer"
          style={{
            backgroundImage: `url(${innerBanner})`,
          }}
        ></div>
        <div className="line-box">
          <div className="line-1"></div>
          <div className="line-2"></div>
        </div>
        <div className="auto-container">
          <div className="content-box">
            <h1>Roads</h1>
            <ul className="bread-crumb clearfix">
              <li>
                <a href="#.">City Profile</a>
              </li>
              <li>
                <span>Roads</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      {/* page-title end */}
      <br />
      <br />
      <br />

      {/* service-style-four */}
      <section className="service-style-four">
        <div className="auto-container">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead className="text-center">
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
                    Length
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Total Road Length</td>
                  <td>149.35 Km</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Asphalt Road Length</td>
                  <td>23.75 Km</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Cement Road Length</td>
                  <td>125.60 Km</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default Roads;
