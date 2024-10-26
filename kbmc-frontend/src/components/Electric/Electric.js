import React from "react";
import innerBanner from  '../../assets/images/banner/inner-banner.jpg'

const Electric = () => {
  return (
    <>
      <section className="page-title">
        <div
          className="bg-layer"
          style={{
            backgroundImage: `url(${innerBanner})`,
          }}
        ></div>
        {/* <div className="pattern-layer" style={{ backgroundImage: 'url(assets/images/shape/shape-25.png)' }}></div> */}
        <div className="line-box">
          <div className="line-1"></div>
          <div className="line-2"></div>
        </div>
        <div className="auto-container">
          <div className="content-box">
            <h1>Electric</h1>
            <ul className="bread-crumb clearfix">
              <li>
                <a href="#.">City Profile</a>
              </li>
              <li>
                <span>Electric</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      {/* page-title end */}
      <br /> <br />
      {/* service-style-four */}
      <section className="service-style-four">
        <div className="auto-container">
          <h5 className="pb-4 fs-5 fw-none">
            In the Kulgaon Badlapur Municipal Council area, there are a total of
            15418 lamps in the east and west areas and the maintenance of the
            said lamps is done through the municipal council for the eastern
            division. Hi-Tech Construction Group for Navi Mumbai and West
            Division. Maintenance and repairs are done through Sagar Sai
            Construction.
          </h5>
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
                    Mobile No.
                  </th>
                  <th
                    style={{
                      backgroundColor: "#29aae1",
                      color: "#fff",
                    }}
                  >
                    Vendor Name
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Citizens Grievance Redressal No.</td>
                  <td>8263936484</td>
                  <td>M/s Hi-Tech Construction, East Division</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Citizens Grievance Redressal No.</td>
                  <td>7757840944</td>
                  <td>M/s Sagar Sai Construction, Western Division</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default Electric;
