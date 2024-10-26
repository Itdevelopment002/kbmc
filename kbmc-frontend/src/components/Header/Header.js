import React, { useEffect } from "react";
import $ from "jquery";
import "malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js";
import "malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css";
import img1 from "../../assets/images/satymev-jayate-3.png";
import img2 from "../../assets/images/icons/icon-25.png";
import img3 from "../../assets/images/kbmc_logo.jpg";
import img5 from "../../assets/images/icons/icon-4.png";
import nulm from "../../assets/documents/Nulm_mahiti.pdf"
import areas from "../../assets/documents/KBMC CIRCULATION A3 COLOR-Brown-24 (1).pdf"
import "./Header.css";

const Header = () => {
  useEffect(() => {
    if ($(".mobile-menu").length) {
        const mobileMenuContent = $(".main-header .menu-area .main-menu").html();
        $(".mobile-menu .menu-box .menu-outer").append(mobileMenuContent);
        $(".sticky-header .main-menu").append(mobileMenuContent);

        $(".mobile-menu li.dropdown .dropdown-btn").each(function () {
            const $this = $(this);
            $this.addClass("open"); 
            $this.prev("ul").slideDown(0);
            $this.find(".fas").addClass("rotate-icon");
        });

        $(".mobile-menu li.dropdown .dropdown-btn").on("click", function (e) {
            e.stopPropagation();

            const $this = $(this);
            const $dropdownMenu = $this.prev("ul");

            if ($this.hasClass("open")) {
                return;
            } else {
                $(".mobile-menu li.dropdown .dropdown-btn.open").each(function () {
                    $(this).removeClass("open");
                    $(this).prev("ul").slideUp(500);
                    $(this).find(".fas").removeClass("rotate-icon");
                });

                $this.addClass("open");
                $dropdownMenu.slideDown(500);
                $this.find(".fas").addClass("rotate-icon");
            }
        });

        $(".mobile-nav-toggler").on("click", function () {
            $("body").addClass("mobile-menu-visible");
            $(".mobile-menu").addClass("visible");
        });

        $(".mobile-menu .menu-backdrop, .mobile-menu .close-btn").on("click", function () {
            $("body").removeClass("mobile-menu-visible");
            $(".mobile-menu").removeClass("visible");

            $(".mobile-menu li.dropdown .dropdown-btn").removeClass("open");
            $(".mobile-menu li.dropdown li.dropdown-btn ul").slideUp(500);
        });

        $(document).on("click", function () {
            $(".mobile-menu li.dropdown .dropdown-btn").removeClass("open");
            $(".mobile-menu li.dropdown ul").slideUp(500);
        });
    }
}, []);


  return (
    <>
    
      <div className="boxed_wrapper">
        <div id="search-popup" className="search-popup">
          <div className="popup-inner">
            <div className="upper-box clearfix">
              <figure className="logo-box pull-left">
                <a href="/">
                  <img src={img3} alt="KBMC Logo" />
                </a>
              </figure>
              <div className="close-search pull-right">
                <i className="fa-solid fa-xmark"></i>
              </div>
            </div>
            <div className="overlay-layer"></div>
            <div className="auto-container">
              <div className="search-form">
                <form method="post" action="#.">
                  <div className="form-group">
                    <fieldset>
                      <input
                        type="search"
                        className="form-control"
                        name="search-input"
                        value=""
                        placeholder="Type your keyword and hit"
                        required
                      />
                      <button type="submit">
                        <img src={img5} alt="" />
                      </button>
                    </fieldset>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <header className="main-header">
          <div className="header-top">
            <div className="row" style={{ alignItems: "center" }}>
              <div className="col-md-5 col-xl-5 text-start"></div>
              <div className="col-md-2 col-xl-2">
                <figure className="logo text-center">
                  <a href="#.">
                    <img src={img1} alt="logo" style={{ width: "50px" }} />
                  </a>
                </figure>
              </div>

              <div className="col-md-2 col-xl-2">
                <div className="search-box">
                  <form method="post" action="#.">
                    <div className="form-group">
                      <input
                        type="search"
                        name="search-field"
                        placeholder="Search here..."
                        required
                      />
                      <button type="submit">
                        <img src={img2} alt="" />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
              <div className="col-md-2 col-xl-3">
                <ul className="social-links clearfix d-none d-md-block">
                  <li>
                    <div className="language-box">
                      <div className="select-box">
                        <select className="selectmenu">
                          <option>English</option>
                          <option>Marathi</option>
                        </select>
                      </div>
                    </div>
                  </li>
                  <li>
                    <a href="#.">
                      <span className="fab fa-youtube"></span>
                    </a>
                  </li>
                  <li>
                    <a href="#.">
                      <span className="fab fa-instagram"></span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://twitter.com/home"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span className="fab fa-twitter"></span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.facebook.com/profile.php?id=100015538206978&mibextid=ZbWKwL"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span className="fab fa-facebook"></span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="header-lower">
            <div className="outer-box">
              <div className="logo-box">
                <figure className="logo">
                  <a href="/">
                    <img src={img3} alt="logo" />
                  </a>
                </figure>
              </div>
              <div className="menu-area">
                <div className="mobile-nav-toggler">
                  <i className="icon-bar"></i>
                  <i className="icon-bar"></i>
                  <i className="icon-bar"></i>
                </div>
                <nav className="main-menu navbar-expand-md navbar-light">
                  <div
                    className="collapse navbar-collapse show clearfix"
                    id="navbarSupportedContent"
                  >
                    <ul className="navigation clearfix">
                      <li className="current">
                        <a href="/">Home</a>{" "}
                      </li>
                      <li className="dropdown">
                        <a href="#.">About KBMC</a>
                        <ul>
                          <li>
                            <a href="/history">History</a>
                          </li>
                          <li>
                            <a href="/ward">Wards</a>
                          </li>
                          <li>
                            <a href="/elected-member">Elected Wing</a>
                          </li>
                          <li>
                            <a href="/org-structure">Organization Structure</a>
                          </li>
                          <li>
                            <a href="/functions">Functions</a>
                          </li>
                          <li>
                            <a href="/departments">Departments</a>
                          </li>
                          <li>
                            <a href="/elected-pre-officer">
                              Previous Chief Officers
                            </a>
                          </li>
                          <li>
                            <a href="/elected-pre-representative">
                              Previous Presidents
                            </a>
                          </li>
                          <li>
                            <a href="/awards">Awards</a>
                          </li>
                        </ul>
                      </li>
                      <li className="dropdown">
                        <a href="#.">City Profile</a>
                        <ul>
                          <li>
                            <a
                              href={areas}
                              target="_blank"
                              rel="noreferrer"
                            >
                              Areas{" "}
                            </a>
                          </li>
                          <li>
                            <a href="/property-holder">Property Holder</a>
                          </li>
                          <li>
                            <a href="/properties-milkat">Muncipal Properties</a>
                          </li>
                          <li>
                            <a href="/schools">Schools</a>
                          </li>
                          <li>
                            <a href="/gardens">Gardens</a>
                          </li>
                          <li>
                            <a href="/electric">Electric</a>
                          </li>
                          <li>
                            <a href="/roads">Roads</a>
                          </li>
                          <li>
                            <a href="/tree-census">Tree Census</a>
                          </li>
                          <li>
                            <a href="/health">Health</a>
                          </li>
                          <li>
                            <a href="/ponds-talao">Ponds / Talao</a>
                          </li>
                          <li>
                            <a href="/fire-station">Fire Station</a>
                          </li>
                          <li>
                            <a href="/private-hospital">Private Hospital</a>
                          </li>
                        </ul>
                      </li>
                      <li className="dropdown">
                        <a href="#.">Online Services</a>
                        <ul>
                          <li>
                            <a
                              href="https://mahaulb.in/MahaULB/property/propertyOnlinePay"
                              target="_blank"
                              rel="noreferrer"
                            >
                              Property Tax Payment
                            </a>
                          </li>
                          <li>
                            <a
                              href="https://mahaulb.in/MahaULB/property/onlineReceiptReprint"
                              target="_blank"
                              rel="noreferrer"
                            >
                              Property Tax Receipt
                            </a>
                          </li>
                          <li>
                            <a
                              href="https://mjp.maharashtra.gov.in/pay-water-bill-online/"
                              target="_blank"
                              rel="noreferrer"
                            >
                              Water Tax Payment
                            </a>
                          </li>
                          <li>
                            <a
                              href="https://crsorgi.gov.in/web/index.php/auth/login"
                              target="_blank"
                              rel="noreferrer"
                            >
                              Birth &amp; Death Search{" "}
                            </a>
                          </li>
                          <li>
                            <a
                              href="https://mahatenders.gov.in/nicgep/app"
                              target="_blank"
                              rel="noreferrer"
                            >
                              Online Tenders
                            </a>
                          </li>
                          <li>
                            <a
                              href="https://maha.autodcr.com/BPAMSClient/Default.aspx"
                              target="_blank"
                              rel="noreferrer"
                            >
                              Auto DCR
                            </a>
                          </li>
                        </ul>
                      </li>
                      <li className="dropdown">
                        <a href="#.">Schemes</a>
                        <ul>
                          <li>
                            <a
                              href={nulm}
                              target="_blank"
                              rel="noreferrer"
                            >
                              NULM
                            </a>
                          </li>
                          <li>
                            <a href="/pmay">PMAY</a>
                          </li>
                          <li>
                            <a href="/nuhm">NUHM</a>
                          </li>
                          <li>
                            <a href="/amrut">AMRUT</a>
                          </li>
                          <li>
                            <a
                              href="assets/documents/Swachh_Bharat_Abhiyan.pdf"
                              target="_blank"
                              rel="noreferrer"
                            >
                              Swachh Bharat
                            </a>
                          </li>
                        </ul>
                      </li>

                      <li className="dropdown">
                        <a href="#.">Complaints</a>
                        <ul>
                          <li>
                            <a
                              href="https://aaplesarkar.mahaonline.gov.in/en"
                              target="_blank"
                              rel="noreferrer"
                            >
                              Aaple Sarkar
                            </a>
                          </li>
                          <li>
                            <a
                              href="https://pgportal.gov.in/"
                              target="_blank"
                              rel="noreferrer"
                            >
                              P G Portal
                            </a>
                          </li>
                          <li>
                            <a
                              href="https://rtionline.maharashtra.gov.in/RTIMIS/login/index.php"
                              target="_blank"
                              rel="noreferrer"
                            >
                              Right to Information
                            </a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </nav>
                <div className="menu-right-content">
                  <div className="btn-box">
                    <a href="#." className="header-btn">
                      Login
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="sticky-header">
            <div className="outer-container">
              <div className="outer-box">
                <div className="logo-box">
                  <figure className="logo">
                    <a href="#.">
                      <img
                        src="assets/images/KBMC-logo-1-edited2.png"
                        alt="logo"
                      />
                    </a>
                  </figure>
                </div>
                <div className="menu-area clearfix">
                  <nav className="main-menu clearfix"></nav>
                  <div className="menu-right-content">
                    <div className="search-box">
                      <div className="search-box-outer search-toggler">
                        <img src="assets/images/icons/icon-4.png" alt="" />
                      </div>
                    </div>

                    <div className="btn-box">
                      <a href="#." className="header-btn">
                        Administration Chief
                      </a>
                    </div>
                    <div className="language-box">
                      <div className="select-box">
                        <select className="selectmenu">
                          <option>English</option>
                          <option>Marathi</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="mobile-menu">
          <div className="menu-backdrop"></div>
          <div className="close-btn">
            <i className="fas fa-times"></i>
          </div>

          <nav className="menu-box">
            <div className="nav-logo">
              <a href="#.">
                <img
                  src="assets/images/KBMC-logo-1-edited2.png"
                  alt=""
                  title=""
                />
              </a>
            </div>

            <div
              className="collapse navbar-collapse show clearfix"
              id="navbarSupportedContent"
            >
              <ul className="navigation clearfix">
                <li className="current">
                  <a href="/">Home</a>
                </li>
                <li className="dropdown">
                  <a href="#.">About KBMC</a>
                  <ul>
                    <li>
                      <a href="/history">History</a>
                    </li>
                    <li>
                      <a href="/ward">Wards</a>
                    </li>
                    <li>
                      <a href="/elected-member">Elected Wing</a>
                    </li>
                    <li>
                      <a href="/org-structure">Organization Structure</a>
                    </li>
                    <li>
                      <a href="/functions">Functions</a>
                    </li>
                    <li>
                      <a href="/departments">Departments</a>
                    </li>
                    <li>
                      <a href="/elected-pre-officer">Previous Chief Officers</a>
                    </li>
                    <li>
                      <a href="/elected-pre-representative">
                        Previous Presidents
                      </a>
                    </li>
                    <li>
                      <a href="/awards">Awards</a>
                    </li>
                  </ul>
                  <div className="dropdown-btn">
                    <span className="fas fa-angle-down"></span>
                  </div>
                </li>
                <li className="dropdown">
                  <a href="#.">City Profile</a>
                  <ul>
                    <li>
                      <a
                        href="assets/documents/KBMC CIRCULATION A3 COLOR-Brown-24 (1).pdf"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Areas
                      </a>
                    </li>
                    <li>
                      <a href="/property-holder">Property Holder</a>
                    </li>
                    <li>
                      <a href="/properties-milkat">Municipal Properties</a>
                    </li>
                    <li>
                      <a href="/schools">Schools</a>
                    </li>
                    <li>
                      <a href="/gardens">Gardens</a>
                    </li>
                    <li>
                      <a href="/electric">Electric</a>
                    </li>
                    <li>
                      <a href="/roads">Roads</a>
                    </li>
                    <li>
                      <a href="/tree-census">Tree Census</a>
                    </li>
                    <li>
                      <a href="/health">Health</a>
                    </li>
                    <li>
                      <a href="/ponds-talao">Ponds / Talao</a>
                    </li>
                    <li>
                      <a href="/fire-station">Fire Station</a>
                    </li>
                    <li>
                      <a href="/private-hospital">Private Hospital</a>
                    </li>
                  </ul>
                  <div className="dropdown-btn">
                    <span className="fas fa-angle-down"></span>
                  </div>
                </li>
                <li className="dropdown">
                  <a href="#.">Online Services</a>
                  <ul>
                    <li>
                      <a
                        href="https://mahaulb.in/MahaULB/property/propertyOnlinePay"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Property Tax Payment
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://mahaulb.in/MahaULB/property/onlineReceiptReprint"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Property Tax Receipt
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://mjp.maharashtra.gov.in/pay-water-bill-online/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Water Tax Payment
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://crsorgi.gov.in/web/index.php/auth/login"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Birth & Death Search
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://mahatenders.gov.in/nicgep/app"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Online Tenders
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://maha.autodcr.com/BPAMSClient/Default.aspx"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Auto DCR
                      </a>
                    </li>
                  </ul>
                  <div className="dropdown-btn">
                    <span className="fas fa-angle-down"></span>
                  </div>
                </li>
                <li className="dropdown">
                  <a href="#.">Schemes</a>
                  <ul>
                    <li>
                      <a
                        href="assets/documents/Nulm_mahiti.pdf"
                        target="_blank"
                        rel="noreferrer"
                      >
                        NULM
                      </a>
                    </li>
                    <li>
                      <a href="/pmay">PMAY</a>
                    </li>
                    <li>
                      <a href="/nuhm">NUHM</a>
                    </li>
                    <li>
                      <a href="/amrut">AMRUT</a>
                    </li>
                    <li>
                      <a
                        href="assets/documents/Swachh Bharat Abhiyan (Health).pdf"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Swachh Bharat
                      </a>
                    </li>
                  </ul>
                  <div className="dropdown-btn">
                    <span className="fas fa-angle-down"></span>
                  </div>
                </li>
                <li className="dropdown">
                  <a href="#.">Complaints</a>
                  <ul>
                    <li>
                      <a
                        href="https://aaplesarkar.mahaonline.gov.in/en"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Aaple Sarkar
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://pgportal.gov.in/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        P G Portal
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://rtionline.maharashtra.gov.in/RTIMIS/login/index.php"
                        target="_blank"
                        rel="noreferrer"
                      >
                        Right to Information
                      </a>
                    </li>
                  </ul>
                  <div className="dropdown-btn">
                    <span className="fas fa-angle-down"></span>
                  </div>
                </li>
              </ul>
            </div>

            <div className="social-links">
              <ul className="clearfix">
                <li>
                  <a href="#.">
                    <span className="fab fa-youtube"></span>
                  </a>
                </li>
                <li>
                  <a href="#.">
                    <span className="fab fa-instagram"></span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com/home"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="fab fa-twitter"></span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.facebook.com/profile.php?id=100015538206978&amp;mibextid=ZbWKwL"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="fab fa-facebook"></span>
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
