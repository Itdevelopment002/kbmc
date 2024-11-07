import React, { useEffect, useState } from "react";
import GLightbox from "glightbox";
import "glightbox/dist/css/glightbox.min.css";
import innerBanner from "../../assets/images/banner/inner-banner.jpg";
import api, { baseURL } from "../api";
import {Link} from "react-router-dom";

const Schools = () => {
  const [schools, setSchools] = useState([]);
  const [schoolPhotos, setSchoolPhotos] = useState([]);

  useEffect(() => {
    const lightbox = GLightbox({
      selector: ".glightbox",
    });

    return () => {
      lightbox.destroy();
    };
  }, [schoolPhotos]);

  const fetchSchools = async () => {
    try {
      const response = await api.get("/schools");
      setSchools(response.data);
    } catch (error) {
      console.error("Error fetching school data");
    }
  };

  const fetchSchoolPhotos = async () => {
    try {
      const response = await api.get("/school-images");
      setSchoolPhotos(response.data);
    } catch (error) {
      console.error("Error fetching school images data");
    }
  };

  useEffect(() => {
    fetchSchools();
    fetchSchoolPhotos();
  }, []);

  useEffect(() => {
    const lightbox = GLightbox({
      selector: ".glightbox",
    });
  }, []);

  return (
    <div>
      <section className="page-title">
        <div
          className="bg-layer"
          style={{ backgroundImage: `url(${innerBanner})` }}
        ></div>
        <div className="auto-container">
          <div className="content-box">
            <h1>Schools</h1>
            <ul className="bread-crumb clearfix">
              <li>
                <Link to="#.">City Profile</Link>
              </li>
              <li>
                <span>Schools</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <br />

      <section className="service-style-four mt-5 pb-1">
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
                    School Names
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
                    Medium
                  </th>
                </tr>
              </thead>
              <tbody>
                {schools.map((school, index) => (
                  <tr key={school.id}>
                    <td>{index + 1}</td>
                    <td>{school.schoolName}</td>
                    <td>{school.address}</td>
                    <td>{school.medium}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <div class="auto-container mb-5">
        <div class="col-lg-12 col-md-12 col-sm-12 content-side">
          <div class="department-details-content">
            <div class="content-three">
              <div class="tabs-box">
                <div class="tab-btn-box">
                  <ul class="tab-btns tab-buttons clearfix">
                    <li class="tab-btn active-btn" data-tab="#tab-1">
                      Schools Photo Gallery
                    </li>
                  </ul>
                </div>
                <div class="tabs-content">
                  <div class="tab active-tab" id="tab-1">
                    <div class="content-box">
                      <div class="content-box department-section">
                        <div class="row">
                          {schoolPhotos.map((image, index) => (
                            <Link
                              to={`${baseURL}${image.image_path}`}
                              className="glightbox col-sm-2"
                              data-gallery="slider-images"
                            >
                              <img
                                src={`${baseURL}${image.image_path}`}
                                alt={`img${index + 1}`}
                                className="img-fluid"
                              />
                            </Link>
                          ))}
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
    </div>
  );
};

export default Schools;
