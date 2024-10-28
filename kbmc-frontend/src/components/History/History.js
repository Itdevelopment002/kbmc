import React, { useEffect, useState } from "react";
import banner from "../../assets/images/banner/inner-banner.jpg";
import "./History.css";
import axios from "axios";

const History = () => {
  const [historyData, setHistoryData] = useState([]);
  const [ceoData, setCeoData] = useState([]);

  const fetchHistoryData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/history");
      setHistoryData(response.data);
    } catch (error) {
      console.error("Error fetching history data:", error);
    }
  };

  const fetchCeoData = async () => {
    try {
      const response1 = await axios.get("http://localhost:5000/api/ceos");
      setCeoData(response1.data);
    } catch (error) {
      console.error("Error fetching CEO data:", error);
    }
  };

  useEffect(() => {
    fetchHistoryData();
    fetchCeoData();
  }, []);

  return (
    <>
      <section className="page-title">
        <div
          className="bg-layer"
          style={{ backgroundImage: `url(${banner})` }}
        ></div>
        <div className="line-box">
          <div className="line-1"></div>
          <div className="line-2"></div>
        </div>
        <div className="auto-container">
          <div className="content-box">
            <h1>History</h1>
            <ul className="bread-crumb clearfix">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <span>History</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <br />

      <section className="about-style-three history-content white-bg mt-5">
        {historyData.length > 0 && (
        <div className="auto-container">
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 content-column">
              <div className="content-box">
                <div className="text-box">
                  <h3 className="pb-3">
                    Welcome to Kulgaon Badlapur Municipal Council.
                  </h3>
                  <p>{historyData[0].description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        )}
      </section>

      <section className="team-section sec-pad member-section">
        <div className="auto-container">
          <div className="row clearfix">
            {ceoData.length > 0 && (
              <div className="col-lg-3 col-md-6 col-sm-12 team-block">
                <div
                  className="team-block-one wow fadeInUp animated"
                  data-wow-delay="00ms"
                  data-wow-duration="1500ms"
                  style={{
                    visibility: "visible",
                    animationDuration: "1500ms",
                    animationDelay: "0ms",
                    animationName: "fadeInUp",
                  }}
                >
                  <div className="inner-box">
                    <figure className="image-box">
                      <img
                        src={`http://localhost:5000${ceoData[0].image_path}`}
                        alt="ceo-img"
                      />
                    </figure>
                    <div className="share-box">
                      <span className="share-text">
                        <i className="flaticon-sharing"></i>Share
                      </span>
                      <ul className="share-links">
                        <li>
                          <a href="#.">
                            <span className="fab fa-facebook-square"></span>
                          </a>
                        </li>
                        <li>
                          <a href="#.">
                            <span className="fab fa-twitter-square"></span>
                          </a>
                        </li>
                        <li>
                          <a href="#.">
                            <span className="fab fa-instagram-square"></span>
                          </a>
                        </li>
                      </ul>
                    </div>
                    <h3>
                      <a href="#.">{ceoData[0].coName}</a>
                    </h3>
                    <span className="designation">
                      {ceoData[0].designation}
                    </span>
                    <p>
                      <a href="mailto:support@kbmc.gov.in">
                        {ceoData[0].email}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default History;
