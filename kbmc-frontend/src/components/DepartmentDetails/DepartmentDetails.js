import React, { useEffect, useState } from "react";
import pdficon from "../../assets/images/icons/PDF-Icons.png";
import { Modal, Button } from "react-bootstrap";
import GLightbox from "glightbox";
import "glightbox/dist/css/glightbox.min.css";
import axios from "axios";
import image from "../../assets/images/icons/new-icon1.gif";

const DepartmentDetails = () => {
  const [gallerys, setGallerys] = useState([]);
  const [tenders, setTenders] = useState([]);
  const [videos, setVideos] = useState([]);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const FetchImages = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/gallerys");
      setGallerys(response.data);
    } catch (error) {
      console.log("Error fetching photo gallery images");
    }
  };

  const FetchTenders = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tenders");
      setTenders(response.data);
    } catch (error) {
      console.log("Error fetching tenders data");
    }
  };

  const FetchVideos = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/home-videos");
      setVideos(response.data);
    } catch (error) {
      console.log("Error fetching videos data");
    }
  };

  useEffect(() => {
    FetchImages();
    FetchTenders();
    FetchVideos();
  }, []);

  useEffect(() => {
    const lightbox = GLightbox({
      selector: ".glightbox",
    });

    return () => {
      lightbox.destroy();
    };
  }, [gallerys]);

  const getYouTubeVideoId = (url) => {
    const regExp =
      /^.*(youtu.be\/|v\/|\/u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const handleOpenVideoModal = (video) => {
    setSelectedVideo(
      `https://www.youtube.com/embed/${getYouTubeVideoId(video.video_url)}`
    );
    setShowVideoModal(true);
  };

  const handleCloseVideoModal = () => {
    setShowVideoModal(false);
    setSelectedVideo(null); // Clear the video URL to prevent autoplay on reopen
  };

  return (
    <>
      <section className="department-details">
        <div className="container-fluid">
          <div className="row clearfix">
            <div className="col-lg-9 col-md-12 col-sm-12 content-side">
              <div className="department-details-content">
                <div className="content-one">
                  <section className="youtube-sec">
                    <div className="">
                      <div className="row">
                        <div className="col-md-6">
                          {videos.map((video, index) => (
                            <React.Fragment key={index}>
                              <div className="row" id="video-01">
                                <div className="col-4 col-md-3">
                                  <a
                                    onClick={() => handleOpenVideoModal(video)} // Open modal on click
                                    className="lightbox"
                                    style={{ cursor: "pointer" }}
                                  >
                                    <img
                                      src={`https://img.youtube.com/vi/${getYouTubeVideoId(
                                        video.video_url
                                      )}/0.jpg`} // Get thumbnail
                                      alt={video.description}
                                      style={{
                                        width: "100px",
                                        height: "56px",
                                        cursor: "pointer",
                                        objectFit: "cover",
                                      }}
                                    />
                                  </a>
                                </div>
                                <div className="col-8 col-md-9 px-0">
                                  <p className="h6 video-title">
                                    {video.description}
                                  </p>
                                  <p className="video-desc">
                                    Date:{" "}
                                    {new Date(
                                      video.publish_date
                                    ).toLocaleDateString("en-US", {
                                      day: "2-digit",
                                      month: "long",
                                      year: "numeric",
                                    })}
                                  </p>
                                </div>
                              </div>
                              <hr />
                            </React.Fragment>
                          ))}
                        </div>
                        <div className="col-md-6 col-12">
                          <div className="map-style">
                            <iframe
                              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30149.71769291419!2d73.20470302114111!3d19.163961329513864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ed5c9bc71bbd%3A0x87d539b0621850f3!2sBadlapur%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1712733207421!5m2!1sen!2sin"
                              width="100%"
                              height="280"
                              style={{ border: 0 }}
                              allowFullScreen
                              loading="lazy"
                              referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                          </div>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* <!-- Gallery --> */}
                  <div className="col-lg-12 col-md-12 col-sm-12 content-side">
                    <div className="department-details-content">
                      <div className="content-three">
                        <div className="tabs-box lightbox-tab">
                          <div className="tab-btn-box">
                            <ul className="tab-btns tab-buttons clearfix">
                              <li
                                className="tab-btn active-btn"
                                data-tab="#tab-1"
                              >
                                Photo Gallery
                              </li>
                            </ul>
                          </div>
                          <div className="tabs-content">
                            <div className="tab active-tab" id="tab-1">
                              <div className="content-box department-section">
                                <div className="row">
                                  {gallerys.map((image, index) => (
                                    <a
                                      key={index}
                                      href={`http://localhost:5000${image.file_path}`}
                                      className="glightbox col-sm-2 col-4"
                                      data-gallery="slider-images"
                                    >
                                      <img
                                        className="img-fluid"
                                        src={`http://localhost:5000${image.file_path}`}
                                        alt={`slider${index + 1}`}
                                        style={{
                                          width: "100%",
                                          height: "auto",
                                          objectFit: "cover",
                                          borderRadius: "1px", // Optional: Adds rounded corners to the images
                                        }}
                                      />
                                    </a>
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

            <div className="col-lg-3 col-md-12 col-sm-12 content-side">
              <div className="sidebar-side department-sidebar">
                <div className="department-sidebar">
                  <div className="content-two category-widget right-side-sec">
                    <h3>
                      <i className="ri-article-line"></i> Tenders
                    </h3>
                    <div className="widget-content">
                      <div className="text-box">
                        <div className="marquee-wrapper">
                          <div className="marquee-block">
                            <div className="marquee-inner tender-sidebar to-left">
                              <ul className="text-start">
                                {tenders.map((tender, index) => (
                                  <li key={index}>
                                    <img src={pdficon} alt="pdficon" />
                                    <a href="#.">{tender.tenders}</a>
                                    {tender.status === "New" && (
                                      <img
                                        src={image}
                                        className="newgif"
                                        alt="newgif"
                                      />
                                    )}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <!-- news-section end --> */}

                <div class="service-block-three">
                  <div class="inner-box">
                    <h6>Service for</h6>
                    <h3>
                      <a href="#.">Our City Residents</a>
                    </h3>
                    <ul class="list-item clearfix">
                      {/* <!-- <li><a href="#.">Public Transit</a></li> --> */}
                      <li>
                        <a href="#.">Helpline - 0251-2690271</a>
                      </li>
                      <li>
                        <a href="#.">Emergency - </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="client-logo-slider my-3">
        <div class="">
          <div class="content-box">
            <div class="inner-box">
              <div class="logo-slider-1">
                {/* <!-- <h3>Citizen Services</h3> --> */}
                <div class="owl-carousel version-1">
                  <div>
                    <a
                      href="https://urban.maharashtra.gov.in/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img src="assets/images/footerlogo/01.png" alt="img1" />
                    </a>
                  </div>
                  <div>
                    <a
                      href="https://www.mygov.in/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img src="assets/images/footerlogo/02.png" alt="img2" />
                    </a>
                  </div>
                  <div>
                    <a
                      href="https://www.midcindia.org/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img src="assets/images/footerlogo/03.png" alt="img3" />
                    </a>
                  </div>
                  <div>
                    <a
                      href="https://mmrda.maharashtra.gov.in/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img src="assets/images/footerlogo/04.png" alt="img4" />
                    </a>
                  </div>
                  <div>
                    <a
                      href="https://www.mpcb.gov.in/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img src="assets/images/footerlogo/05.png" alt="img5" />
                    </a>
                  </div>
                  <div>
                    <a
                      href="https://divcomkonkan.gov.in/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img src="assets/images/footerlogo/01.png" alt="img1" />
                    </a>
                  </div>
                  <div>
                    <a
                      href="https://aaplesarkar.mahaonline.gov.in/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img src="assets/images/footerlogo/06.png" alt="img6" />
                    </a>
                  </div>
                  <div>
                    <a
                      href="https://thane.nic.in/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img src="assets/images/footerlogo/07.png" alt="img7" />
                    </a>
                  </div>
                  <div>
                    <a
                      href="https://www.eci.gov.in/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img src="assets/images/footerlogo/08.png" alt="img8" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <Modal
        show={showVideoModal}
        onHide={handleCloseVideoModal}
        centered
        size="lg"
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          {selectedVideo && (
            <iframe
              width="100%"
              height="400"
              objectFit="cover"
              src={selectedVideo} // Using selectedVideo state for src
              frameBorder="0"
              allowFullScreen
              title="YouTube video"
            ></iframe>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DepartmentDetails;
