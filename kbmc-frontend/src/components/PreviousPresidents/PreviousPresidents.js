import React, { useState, useEffect } from "react";
import innerBanner from "../../assets/images/banner/inner-banner.jpg";
import axios from "axios";

const PreviousPresidents = () => {
  const [presidents, setPresidents] = useState([]);

  const fetchPresidents = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/presidents");
      setPresidents(response.data);
    } catch (error) {
      console.error("Error fetching previous president data");
    }
  };

  useEffect(() => {
    fetchPresidents();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0"); // Ensure two-digit day
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();
    return `${day}.${month}.${year}`; // Format as DD.MM.YYYY
  };

  return (
    <div>
      <section className="page-title">
        <div
          className="bg-layer"
          style={{ backgroundImage: `url(${innerBanner})` }}
        ></div>
        <div className="line-box">
          <div className="line-1"></div>
          <div className="line-2"></div>
        </div>
        <div className="auto-container">
          <div className="content-box">
            <h1>Previous President's of the council</h1>
            <ul className="bread-crumb clearfix">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <span>Previous President's of the council</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      {/* page-title end */}
      <br />

      <section className="event-details mt-5">
        <div className="auto-container">
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 content-side">
              <div className="event-details-content">
                <div className="content-three">
                  <div className="row clearfix">
                    {presidents.map((president, index) => (
                      <div
                        className="col-lg-3 col-md-6 col-sm-12 single-column"
                        key={index}
                      >
                        <div className="single-item">
                          <h3>
                            <a href="#.">{president.president_name}</a>
                          </h3>
                          <h6>
                            {formatDate(president.start_date)} -{" "}
                            {formatDate(president.end_date)}
                          </h6>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PreviousPresidents;
