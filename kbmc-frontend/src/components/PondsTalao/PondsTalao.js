import React, { useEffect, useState } from "react";
import api from "../api";
import GLightbox from "glightbox";
import "glightbox/dist/css/glightbox.min.css";
import {Link} from "react-router-dom";

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
  const [ponds, setPonds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch ponds data from the API
    const fetchPonds = async () => {
      try {
        const response = await api.get("/ponds-talao"); // Update the endpoint as needed
        setPonds(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPonds();
  }, []);

  useEffect(() => {
    const lightbox = GLightbox({
      selector: ".glightbox",
    });

    return () => {
      lightbox.destroy();
    };
  }, [ponds]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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
                <Link to="#.">City Profile</Link>
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
              {ponds.length > 0 ? (
                ponds.map((pond, index) => (
                  <tr key={pond.id}>
                    <td>{index + 1}</td>
                    <td>{pond.name}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="text-center">
                    No ponds available
                  </td>
                </tr>
              )}
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
                        {[talaoImg1, talaoImg2, talaoImg3, talaoImg4, talaoImg5, talaoImg6, talaoImg7, talaoImg8].map(
                          (img, index) => (
                            <Link
                              key={index}
                              to={img}
                              className="glightbox col-sm-2"
                              data-gallery="example-gallery"
                            >
                              <img src={img} alt={`talaoimg${index + 1}`} className="img-fluid" />
                            </Link>
                          )
                        )}
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
