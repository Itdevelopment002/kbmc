import React, { useState, useEffect } from "react";
import axios from "axios";
import GLightbox from "glightbox";
import "glightbox/dist/css/glightbox.css";
import innerBanner from "../../assets/images/banner/inner-banner.jpg"; // Adjust path as necessary

const Gardens = () => {
  const [activeTab, setActiveTab] = useState("#tab-1");
  const [gardenData, setGardenData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  // Fetch garden data from API
  useEffect(() => {
    const fetchGardenData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/gardens");
        setGardenData(response.data); // Assuming response.data is an array of gardens
      } catch (error) {
        console.error("Error fetching garden data:", error);
        setError("Failed to fetch garden data.");
      } finally {
        setLoading(false);
      }
    };

    fetchGardenData();

    // Initialize lightbox
    const lightbox = GLightbox({
      selector: ".glightbox",
    });

    return () => {
      // Clean up GLightbox on component unmount
      lightbox.close();
    };
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
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
            <h1>Gardens</h1>
            <ul className="bread-crumb clearfix">
              <li>
                <a href="#.">City Profile</a>
              </li>
              <li>
                <span>Gardens</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <br />
      <br />
      <br />
      <br />

      <div className="auto-container mb-5 mt-5">
        <div className="col-lg-12 col-md-12 col-sm-12 content-side">
          <div className="department-details-content">
            <div className="content-three">
              <div className="tabs-box">
                <div className="tab-btn-box">
                  <ul className="tab-btns tab-buttons clearfix">
                    {gardenData.map((garden, index) => (
                      <li
                        key={index}
                        className={`tab-btn ${activeTab === `#tab-${index + 1}` ? "active-btn" : ""}`}
                        data-tab={`#tab-${index + 1}`}
                        onClick={() => handleTabClick(`#tab-${index + 1}`)}
                      >
                        {garden.heading}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="tabs-content">
                  {gardenData.map((garden, index) => (
                    <div
                      key={index}
                      className={`tab ${activeTab === `#tab-${index + 1}` ? "active-tab" : ""}`}
                      id={`tab-${index + 1}`}
                    >
                      <div className="content-box department-section">
                        <div className="row d-flex justify-content-start"> {/* Change to 'justify-content-start' for left alignment */}
                          {activeTab === `#tab-${index + 1}` && garden.images ? (
                            JSON.parse(garden.images).map((img, imgIndex) => (
                              <div key={imgIndex} className="col-2 mb-3"> {/* Use col-4 for a grid layout */}
                                <div className="position-relative">
                                  <img
                                    src={`http://localhost:5000${img}`}
                                    alt=""
                                    className="glightbox img-fluid"
                                  />
                                </div>
                              </div>
                            ))
                          ) : (
                            activeTab === `#tab-${index + 1}` && <p className="col-sm-12">No images available for this garden.</p>
                          )}
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gardens;
