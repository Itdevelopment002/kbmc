import React, { useState, useEffect } from "react";
import innerBanner from "../../assets/images/banner/inner-banner.jpg"; // Background image
import axios from "axios";

const ElectedWing = () => {
  const [electedData, setElectedData] = useState([]);

  const fetchElectedData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/elected-wings"
      );
      setElectedData(response.data);
    } catch (error) {
      console.error("Error fetching eleced wings data");
    }
  };

  useEffect(() => {
    fetchElectedData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0'); // Ensure two-digit day
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day}.${month}.${year}`; // Format as DD.MM.YYYY
};

  return (
    <>
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
            <h1>Elected Wings</h1>
            <ul className="bread-crumb clearfix">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <span>Elected Wings</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <br />
      <br />
      <br />
      <br />
      <section className="team-section sec-pad member-section">
        <div className="auto-container">
          
            <div className="row clearfix">
            {electedData.map((data, index) => (
              <div
                className="col-lg-3 col-md-6 col-sm-12 team-block mb-4"
                key={index}
              >
                <div
                  className="team-block-one wow fadeInUp animated"
                  data-wow-delay="00ms"
                  data-wow-duration="1500ms"
                  style={{ visibility: "visible" }}
                >
                  <div className="inner-box">
                    <figure className="image-box">
                      <img
                        src={`http://localhost:5000${data.image_path}`}
                        alt="Correspondent Img"
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
                      <a href="#.">{data.correspondentName}</a>
                    </h3>
                    <span className="designation">{data.wardNo}</span>
                    <p>
                      <a href="#.">
                        <i className="ri-calendar-2-line"></i>{" "}
                        {formatDate(data.startDate)} to {formatDate(data.endDate)}
                      </a>
                    </p>
                    <p>
                      <a href="#.">
                        <i className="ri-smartphone-line"></i>
                        {data.mobileNo}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
              ))}
            </div>
          
        </div>
      </section>
    </>
  );
};

export default ElectedWing;