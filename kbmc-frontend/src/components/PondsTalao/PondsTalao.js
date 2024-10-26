import React, { useEffect } from "react";
import GLightbox from "glightbox";
import "glightbox/dist/css/glightbox.min.css";

import bannerImage from "../../assets/images/banner/inner-banner.jpg";
import talaoImg1 from "../../assets/images/talao/img1.jpg";
import talaoImg2 from "../../assets/images/talao/img2.jpg";
import talaoImg3 from "../../assets/images/talao/img3.jpg";
import talaoImg4 from "../../assets/images/talao/img4.jpg";
import talaoImg5 from "../../assets/images/talao/img5.jpg";
import talaoImg6 from "../../assets/images/talao/img6.jpg";
import talaoImg7 from "../../assets/images/talao/img7.jpg";
import talaoImg8 from "../../assets/images/talao/img8.jpg";

const PondsTalao = () => {
  useEffect(() => {
    // Initialize GLightbox
    const lightbox = GLightbox({
      selector: ".glightbox",
      touchNavigation: true,
      loop: true,
      autoplayVideos: true,
    });

    // Cleanup function to destroy the lightbox when the component unmounts
    return () => lightbox.destroy();
  }, []);

  return (
    <div>
      {/* Page Title Section */}
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
            <h1>Ponds / Talao</h1>
            <ul className="bread-crumb clearfix">
              <li>
                <a href="#.">City Profile</a>
              </li>
              <li>
                <span>Ponds / Talao</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <br />
      <br />
      <br />

      {/* Table Section */}
      <section className="service-style-four pb-2">
        <div className="auto-container">
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
                  Talao Name
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mahalaxmi Talao</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Badlapur Gaon Talao</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Gaondevi Talao</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Katrap Talao</td>
              </tr>
              <tr>
                <td>5</td>
                <td>Dagari Talao Badlapur Gaon</td>
              </tr>
              <tr>
                <td>6</td>
                <td>Near Juveli Shivshankar Talao</td>
              </tr>
              <tr>
                <td>7</td>
                <td>Wadwali Talao</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Gallery Section */}
      <div className="auto-container mb-5">
        <div className="col-lg-12 col-md-12 col-sm-12 content-side">
          <div className="department-details-content">
            <div className="content-three">
              <div className="tabs-box lightbox-tab">
                <div className="tab-btn-box">
                  <ul className="tab-btns tab-buttons clearfix">
                    <li className="tab-btn active-btn" data-tab="#tab-1">
                      Talao Photo Gallery
                    </li>
                  </ul>
                </div>
                <div className="tabs-content">
                  <div className="tab active-tab" id="tab-1">
                    <div className="content-box department-section">
                      <div className="row">
                        <a
                          href={talaoImg1}
                          className="glightbox col-sm-2"
                          data-gallery="example-gallery"
                        >
                          <img
                            src={talaoImg1}
                            alt="talaoimg1"
                            className="img-fluid"
                          />
                        </a>
                        <a
                          href={talaoImg2}
                          className="glightbox col-sm-2"
                          data-gallery="example-gallery"
                        >
                          <img
                            src={talaoImg2}
                            alt="talaoimg2"
                            className="img-fluid"
                          />
                        </a>
                        <a
                          href={talaoImg3}
                          className="glightbox col-sm-2"
                          data-gallery="example-gallery"
                        >
                          <img
                            src={talaoImg3}
                            alt="talaoimg3"
                            className="img-fluid"
                          />
                        </a>
                        <a
                          href={talaoImg4}
                          className="glightbox col-sm-2"
                          data-gallery="example-gallery"
                        >
                          <img
                            src={talaoImg4}
                            alt="talaoimg4"
                            className="img-fluid"
                          />
                        </a>
                        <a
                          href={talaoImg5}
                          className="glightbox col-sm-2"
                          data-gallery="example-gallery"
                        >
                          <img
                            src={talaoImg5}
                            alt="talaoimg5"
                            className="img-fluid"
                          />
                        </a>
                        <a
                          href={talaoImg6}
                          className="glightbox col-sm-2"
                          data-gallery="example-gallery"
                        >
                          <img
                            src={talaoImg6}
                            alt="talaoimg6"
                            className="img-fluid"
                          />
                        </a>
                        <a
                          href={talaoImg7}
                          className="glightbox col-sm-2"
                          data-gallery="example-gallery"
                        >
                          <img
                            src={talaoImg7}
                            alt="talaoimg7"
                            className="img-fluid"
                          />
                        </a>
                        <a
                          href={talaoImg8}
                          className="glightbox col-sm-2"
                          data-gallery="example-gallery"
                        >
                          <img
                            src={talaoImg8}
                            alt="talaoimg8"
                            className="img-fluid"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PondsTalao;
