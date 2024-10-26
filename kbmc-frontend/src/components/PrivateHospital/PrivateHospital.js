import React from "react";

// Import the banner image
import bannerImage from "../../assets/images/banner/inner-banner.jpg"; // Adjust this path based on your project structure

const PrivateHospital = () => {
  return (
    <div>
      {/* Page Title Section */}
      <section className="page-title">
        <div
          className="bg-layer"
          style={{ backgroundImage: `url(${bannerImage})` }}
        ></div>
        {/* <div className="pattern-layer" style={{ backgroundImage: 'url(assets/images/shape/shape-25.png)' }}></div> */}
        <div className="line-box">
          <div className="line-1"></div>
          <div className="line-2"></div>
        </div>
        <div className="auto-container">
          <div className="content-box">
            <h1>Private Hospital</h1>
            <ul className="bread-crumb clearfix">
              <li>
                <a href="#.">City Profile</a>
              </li>
              <li>
                <span>Private Hospital</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <br />

      {/* Service Style Section */}
      <section className="service-style-four mt-5">
        <div className="auto-container">
          <h5>
            List of Major Hospitals (Government and Private) in Kulgaon Badlapur
            Municipal Council Areas
          </h5>
          <div className="table-responsive mt-3">
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
                    Hospitals
                    style={{
                      backgroundColor: "#29aae1",
                      color: "#fff",
                    }}
                  >
                    Hospitals Name
                  </th>
                  <th
                    style={{
                      backgroundColor: "#29aae1",
                      color: "#fff",
                    }}
                  >
                    Name of Principal Doctor &nbsp; speciality
                  </th>
                  <th
                    style={{
                      backgroundColor: "#29aae1",
                      color: "#fff",
                    }}
                  >
                    Address
                  </th>
                  <th
                    style={{
                      backgroundColor: "#29aae1",
                      color: "#fff",
                    }}
                  >
                    Phone No.
                  </th>
                  <th
                    style={{
                      backgroundColor: "#29aae1",
                      color: "#fff",
                    }}
                  >
                    No. of Beds
                  </th>
                  <th
                    style={{
                      backgroundColor: "#29aae1",
                      color: "#fff",
                    }}
                  >
                    Facilities Provided in Hospital
                  </th>
                </tr>
              </thead>

              {/* East Division Hospitals */}
              <tbody>
                <tr>
                  <td colSpan="7">
                    <b>Names of East Division Hospital</b>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>K. B. S. Dube Hospital, KBMC</td>
                  <td>Dr. Rajesh Ankur, MBBS.</td>
                  <td>
                    Near Adharsh Vidhyamandhir, Station Road, Kulgaon Badlapur.
                  </td>
                  <td>0251-2690920 / 8380007056</td>
                  <td>05</td>
                  <td>
                    Outpatient, leprosy, Tuberculosis treatment, blood test,
                    vaccination. <br />
                    <span>hosp.kbmc@gmail.com</span>
                  </td>
                </tr>
              </tbody>

              {/* West Division Hospitals */}
              <tbody>
                <tr>
                  <td colSpan="7">
                    <b>Names of West Division Hospital</b>
                  </td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>Primary Health Center Badlapur Village (PHC)</td>
                  <td>Dr. Prashant Kanojiya / Dr. Ashwini Kodilkar</td>
                  <td>Badlapur Village</td>
                  <td>0251-2665915 / 9822740508</td>
                  <td>06</td>
                  <td>
                    Outpatient department, maternity facility, family planning
                    surgery facility
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivateHospital;
