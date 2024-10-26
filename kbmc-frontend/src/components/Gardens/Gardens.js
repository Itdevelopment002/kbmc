import React, { useState } from "react";
import GLightbox from "glightbox";
import "glightbox/dist/css/glightbox.css";
import innerBanner from "../../assets/images/banner/inner-banner.jpg";
import img1 from '../../assets/images/gardens/ambernath-buglow-gardens/img1.jpg';
import img2 from '../../assets/images/gardens/ambernath-buglow-gardens/img2.jpg';
import img3 from '../../assets/images/gardens/ambernath-buglow-gardens/img3.jpg';
import img4 from '../../assets/images/gardens/ambernath-buglow-gardens/img4.jpg';
import img5 from '../../assets/images/gardens/ambernath-buglow-gardens/img5.jpg';
import img6 from "../../assets/images/gardens/badlapur-gymkhana/img1.jpg";
import img7 from "../../assets/images/gardens/badlapur-gymkhana/img2.jpg";
import img8 from "../../assets/images/gardens/badlapur-gymkhana/img3.jpg";
import img9 from "../../assets/images/gardens/badlapur-gymkhana/img4.jpg";
import img10 from "../../assets/images/gardens/badlapur-gymkhana/img5.jpg";
import img11 from "../../assets/images/gardens/badlapur-gymkhana/img6.jpg";
import img12 from "../../assets/images/gardens/balasaheb-takare-udyan/img1.jpg"
import img13 from "../../assets/images/gardens/balasaheb-takare-udyan/img2.jpg"
import img14 from "../../assets/images/gardens/balasaheb-takare-udyan/img3.jpg"
import img15 from "../../assets/images/gardens/balasaheb-takare-udyan/img4.jpg"
import img16 from "../../assets/images/gardens/balasaheb-takare-udyan/img5.jpg"
import img17 from "../../assets/images/gardens/balasaheb-takare-udyan/img6.jpg"
import img18 from "../../assets/images/gardens/balasaheb-takare-udyan/img7.jpg"
import img19 from "../../assets/images/gardens/balasaheb-takare-udyan/img8.jpg"
import img20 from "../../assets/images/gardens/balasaheb-takare-udyan/img9.jpg"
import img21 from "../../assets/images/gardens/balasaheb-takare-udyan/img10.jpg"
import img22 from "../../assets/images/gardens/balasaheb-takare-udyan/img11.jpg"
import img23 from "../../assets/images/gardens/balasaheb-takare-udyan/img12.jpg"
import img24 from '../../assets/images/gardens/chaitanya-sankul-garden/img1.jpg';
import img25 from '../../assets/images/gardens/chaitanya-sankul-garden/img2.jpg';
import img26 from '../../assets/images/gardens/chaitanya-sankul-garden/img3.jpg';
import img27 from '../../assets/images/gardens/chaitanya-sankul-garden/img4.jpg';
import img28 from '../../assets/images/gardens/chaitanya-sankul-garden/img5.jpg';
import img29 from '../../assets/images/gardens/chaitanya-sankul-garden/img6.jpg';
import img30 from '../../assets/images/gardens/chaitanya-sankul-garden/img7.jpg';
import img31 from '../../assets/images/gardens/anand-dighe-sabhagruh/img1.jpg'

const Gardens = () => {
  const [activeTab, setActiveTab] = useState("#tab-1");

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  React.useEffect(() => {
    const lightbox = GLightbox({
      selector: ".glightbox",
    });
  }, []);

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
                    <li
                      className={`tab-btn ${
                        activeTab === "#tab-1" ? "active-btn" : ""
                      }`}
                      data-tab="#tab-1"
                      onClick={() => handleTabClick("#tab-1")}
                    >
                      Ambernath Bunglow Society Garden
                    </li>
                    <li
                      className={`tab-btn ${
                        activeTab === "#tab-2" ? "active-btn" : ""
                      }`}
                      data-tab="#tab-2"
                      onClick={() => handleTabClick("#tab-2")}
                    >
                      Badlapur Gymkhana
                    </li>
                    <li
                      className={`tab-btn ${
                        activeTab === "#tab-3" ? "active-btn" : ""
                      }`}
                      data-tab="#tab-3"
                      onClick={() => handleTabClick("#tab-3")}
                    >
                      Balasaheb Thakrey Smarak Udyan Shantinagar
                    </li>
                    <li
                      className={`tab-btn ${
                        activeTab === "#tab-4" ? "active-btn" : ""
                      }`}
                      data-tab="#tab-4"
                      onClick={() => handleTabClick("#tab-4")}
                    >
                      Chaitanya Sankul Garden
                    </li>
                    <li
                      className={`tab-btn ${
                        activeTab === "#tab-5" ? "active-btn" : ""
                      }`}
                      data-tab="#tab-5"
                      onClick={() => handleTabClick("#tab-5")}
                    >
                      Dharmaveer Anand Dighe Sabhagruh
                    </li>
                  </ul>
                </div>
                <div className="tabs-content">
                <div className={`tab ${activeTab === "#tab-1" ? "active-tab" : ""}`} id="tab-1">
                    <div className="content-box department-section">
                      <div className="row">
                        <a
                          href={img1}
                          data-toggle="lightbox"
                          data-gallery="example-gallery1"
                          className="col-sm-2 glightbox"
                        >
                          <img
                            src={img1}
                            alt="img1"
                            className="img-fluid"
                          />
                        </a>
                        <a
                          href={img2}
                          data-toggle="lightbox"
                          data-gallery="example-gallery1"
                          className="col-sm-2 glightbox"
                        >
                          <img
                            src={img2}
                            alt="img2"
                            className="img-fluid"
                          />
                        </a>
                        <a
                          href={img3}
                          data-toggle="lightbox"
                          data-gallery="example-gallery1"
                          className="col-sm-2 glightbox"
                        >
                          <img
                            src={img3}
                            alt="img3"
                            className="img-fluid"
                          />
                        </a>
                        <a
                          href={img4}
                          data-toggle="lightbox"
                          data-gallery="example-gallery1"
                          className="col-sm-2 glightbox"
                        >
                          <img
                            src={img4}
                            alt="img4"
                            className="img-fluid"
                          />
                        </a>
                        <a
                          href={img5}
                          data-toggle="lightbox"
                          data-gallery="example-gallery1"
                          className="col-sm-2 glightbox"
                        >
                          <img
                            src={img5}
                            alt="img5"
                            className="img-fluid"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className={`tab ${activeTab === "#tab-2" ? "active-tab" : ""}`} id="tab-2">
                    <div className="content-box department-section">
                      <div className="row">
                        <a
                          href={img6}
                          data-toggle="lightbox"
                          data-gallery="example-gallery2"
                          className="col-sm-2 glightbox"
                        >
                          <img
                            src={img6}
                            alt="img1"
                            className="img-fluid"
                          />
                        </a>
                        <a
                          href={img7}
                          data-toggle="lightbox"
                          data-gallery="example-gallery2"
                          className="col-sm-2 glightbox"
                        >
                          <img
                            src={img7}
                            alt="img2"
                            className="img-fluid"
                          />
                        </a>
                        <a
                          href={img8}
                          data-toggle="lightbox"
                          data-gallery="example-gallery2"
                          className="col-sm-2 glightbox"
                        >
                          <img
                            src={img8}
                            alt="img3"
                            className="img-fluid"
                          />
                        </a>
                        <a
                          href={img9}
                          data-toggle="lightbox"
                          data-gallery="example-gallery2"
                          className="col-sm-2 glightbox"
                        >
                          <img
                            src={img9}
                            alt="img4"
                            className="img-fluid"
                          />
                        </a>
                        <a
                          href={img10}
                          data-toggle="lightbox"
                          data-gallery="example-gallery2"
                          className="col-sm-2 glightbox"
                        >
                          <img
                            src={img10}
                            alt="img5"
                            className="img-fluid"
                          />
                        </a>
                        <a
                          href={img11}
                          data-toggle="lightbox"
                          data-gallery="example-gallery2"
                          className="col-sm-2 glightbox"
                        >
                          <img
                            src={img11}
                            alt="img6"
                            className="img-fluid"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className={`tab ${activeTab === "#tab-3" ? "active-tab" : ""}`} id="tab-3">
                    <div className="content-box department-section">
                      <div className="row">
                        <a
                          href={img12}
                          data-toggle="lightbox"
                          data-gallery="example-gallery3"
                          className="col-sm-2 glightbox"
                        >
                          <img
                            src={img12}
                            alt="img1"
                            className="img-fluid"
                          />
                        </a>
                        <a
                          href={img13}
                          data-toggle="lightbox"
                          data-gallery="example-gallery3"
                          className="col-sm-2 glightbox"
                        >
                          <img
                            src={img13}
                            alt="img2"
                            className="img-fluid"
                          />
                        </a>
                        <a
                          href={img14}
                          data-toggle="lightbox"
                          data-gallery="example-gallery3"
                          className="col-sm-2 glightbox"
                        >
                          <img
                            src={img14}
                            alt="img3"
                            className="img-fluid"
                          />
                        </a>
                        <a
                          href={img15}
                          data-toggle="lightbox"
                          data-gallery="example-gallery3"
                          className="col-sm-2 glightbox"
                        >
                          <img
                            src={img15}
                            alt="img4"
                            className="img-fluid"
                          />
                        </a>
                        <a
                          href={img16}
                          data-toggle="lightbox"
                          data-gallery="example-gallery3"
                          className="col-sm-2 glightbox"
                        >
                          <img
                            src={img16}
                            alt="img5"
                            className="img-fluid"
                          />
                        </a>
                        <a
                          href={img17}
                          data-toggle="lightbox"
                          data-gallery="example-gallery3"
                          className="col-sm-2 glightbox"
                        >
                          <img
                            src={img17}
                            alt="img6"
                            className="img-fluid"
                          />
                        </a>
                        <a
                          href={img18}
                          data-toggle="lightbox"
                          data-gallery="example-gallery3"
                          className="col-sm-2 glightbox"
                        >
                          <img
                            src={img18}
                            alt="img7"
                            className="img-fluid"
                          />
                        </a>
                        <a
                          href={img19}
                          data-toggle="lightbox"
                          data-gallery="example-gallery3"
                          className="col-sm-2 glightbox"
                        >
                          <img
                            src={img19}
                            alt="img8"
                            className="img-fluid"
                          />
                        </a>
                        <a
                          href={img20}
                          data-toggle="lightbox"
                          data-gallery="example-gallery3"
                          className="col-sm-2 glightbox"
                        >
                          <img
                            src={img20}
                            alt="img9"
                            className="img-fluid"
                          />
                        </a>
                        <a
                          href={img21}
                          data-toggle="lightbox"
                          data-gallery="example-gallery3"
                          className="col-sm-2 glightbox"
                        >
                          <img
                            src={img21}
                            alt="img10"
                            className="img-fluid"
                          />
                        </a>
                        <a
                          href={img22}
                          data-toggle="lightbox"
                          data-gallery="example-gallery3"
                          className="col-sm-2 glightbox"
                        >
                          <img
                            src={img22}
                            alt="img11"
                            className="img-fluid"
                          />
                        </a>
                        <a
                          href={img23}
                          data-toggle="lightbox"
                          data-gallery="example-gallery3"
                          className="col-sm-2 glightbox"
                        >
                          <img
                            src={img23}
                            alt="img12"
                            className="img-fluid"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className={`tab ${activeTab === "#tab-4" ? "active-tab" : ""}`} id="tab-4">
                    <div className="content-box department-section">
                      <div className="row">
                        <a
                          href={img24}
                          data-toggle="lightbox"
                          data-gallery="example-gallery4"
                          className="col-sm-2 glightbox"
                        >
                          <img
                            src={img24}
                            alt="img1"
                            className="img-fluid"
                          />
                        </a>
                        <a
                          href={img25}
                          data-toggle="lightbox"
                          data-gallery="example-gallery4"
                          className="col-sm-2 glightbox"
                        >
                          <img
                            src={img25}
                            alt="img2"
                            className="img-fluid"
                          />
                        </a>
                        <a
                          href={img26}
                          data-toggle="lightbox"
                          data-gallery="example-gallery4"
                          className="col-sm-2 glightbox"
                        >
                          <img
                            src={img26}
                            alt="img3"
                            className="img-fluid"
                          />
                        </a>
                        <a
                          href={img27}
                          data-toggle="lightbox"
                          data-gallery="example-gallery4"
                          className="col-sm-2 glightbox"
                        >
                          <img
                            src={img27}
                            alt="img4"
                            className="img-fluid"
                          />
                        </a>
                        <a
                          href={img28}
                          data-toggle="lightbox"
                          data-gallery="example-gallery4"
                          className="col-sm-2 glightbox"
                        >
                          <img
                            src={img28}
                            alt="img5"
                            className="img-fluid"
                          />
                        </a>
                        <a
                          href={img29}
                          data-toggle="lightbox"
                          data-gallery="example-gallery4"
                          className="col-sm-2 glightbox"
                        >
                          <img
                            src={img29}
                            alt="img6"
                            className="img-fluid"
                          />
                        </a>
                        <a
                          href={img30}
                          data-toggle="lightbox"
                          data-gallery="example-gallery4"
                          className="col-sm-2 glightbox"
                        >
                          <img
                            src={img30}
                            alt="img7"
                            className="img-fluid"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className={`tab ${activeTab === "#tab-5" ? "active-tab" : ""}`} id="tab-5">
                    <div className="content-box department-section">
                      <div className="row">
                        <a
                          href={img31}
                          data-toggle="lightbox"
                          data-gallery="example-gallery5"
                          className="col-sm-2 glightbox"
                        >
                          <img
                            src={img31}
                            alt="img1"
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
      {/* Gallery End */}
    </div>
  );
};

export default Gardens;
