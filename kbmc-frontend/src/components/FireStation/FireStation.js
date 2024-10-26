import React from "react";

// Import images
import fireEastImg from "../../assets/images/gallery/Fire_East.jpg";
import fireWestImg from "../../assets/images/gallery/Fire_West.jpg";
import bannerImage from "../../assets/images/banner/inner-banner.jpg"; 


const FireStation = () => {
  return (
    <>
      <section className="page-title">
        <div
          className="bg-layer"
          style={{ backgroundImage: `url(${bannerImage})` }}
        ></div>
        <div className="line-box">
          <div className="line-1"></div>
          <div className="line-2"></div>
        </div>
        <div className="auto-container">
          <div className="content-box">
            <h1>Fire Station</h1>
            <ul className="bread-crumb clearfix">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <span>Fire Station</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <br/> <br/>
      <section
        className="sidebar-page-container event-page-section mt-5"
        id="fire-station"
       >
        <div className="auto-container">
          <div className="row clearfix">
            <div className="col-lg-6 col-md-12 col-sm-12 content-side">
              <div className="event-list-content">
                <div className="event-block-two">
                  <div className="inner-box">
                    <div className="image-box">
                      <figure className="image">
                        <a href="#.">
                          <img src={fireEastImg} alt="Fire Station East" />
                        </a>
                      </figure>
                    </div>
                    <div className="content-inner">
                      <h5>Kulgaon Badlapur Municipal Council</h5>
                      <br />
                      <ul className="info-list clearfix">
                        <li>
                          <p>
                            <i
                              className="fa-solid fa-location-dot"
                              style={{ color: "#3ea4ed" }}
                            ></i>
                            <b> Fire Station</b>, Shirgaon MIDC, Badlapur East
                          </p>
                        </li>
                        <li>
                          <p>
                            <i
                              className="fa-solid fa-phone"
                              style={{ color: "#3ea4ed" }}
                            ></i>{" "}
                            0251 2690890
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12 content-side">
              <div className="event-list-content">
                <div className="event-block-two">
                  <div className="inner-box">
                    <div className="image-box">
                      <figure className="image">
                        <a href="#.">
                          <img src={fireWestImg} alt="Fire Station West" />
                        </a>
                      </figure>
                    </div>
                    <div className="content-inner">
                      <h5>Kulgaon Badlapur Municipal Council</h5>
                      <br />
                      <ul className="info-list clearfix">
                        <li>
                          <p>
                            <i
                              className="fa-solid fa-location-dot"
                              style={{ color: "#3ea4ed" }}
                            ></i>
                            <b> Fire Station</b>, Shaswat Park, Manjarli,
                            Badlapur West
                          </p>
                        </li>
                        <li>
                          <p>
                            <i
                              className="fa-solid fa-phone"
                              style={{ color: "#3ea4ed" }}
                            ></i>{" "}
                            0251 2990890
                          </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FireStation;
