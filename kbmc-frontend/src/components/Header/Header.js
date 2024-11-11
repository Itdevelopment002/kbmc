import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import $ from "jquery";
import "malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js";
import "malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css";
import img1 from "../../assets/images/satymev-jayate-3.png";
import img2 from "../../assets/images/icons/icon-25.png";
import img3 from "../../assets/images/kbmc_logo.jpg";
import img5 from "../../assets/images/icons/icon-4.png";
import "./Header.css";
import api, { baseURL } from "../api";
import { Link } from "react-router-dom";

const Header = () => {
  const [menuData, setMenuData] = useState([]);
  const location = useLocation();

  const fetchMenuData = async () => {
    try {
      const response = await api.get("/main-menus");
      setMenuData(response.data);
    } catch (error) {
      console.error("Error fetching menu data:", error);
    }
  };

  useEffect(() => {
    fetchMenuData();
  }, []);

  useEffect(() => {
    if ($(".mobile-menu").length) {
      const mobileMenuContent = $(".main-header .menu-area .main-menu").html();
      $(".mobile-menu .menu-box .menu-outer").html(mobileMenuContent);
      $(".sticky-header .main-menu").html(mobileMenuContent);

      $(".mobile-menu").on("click", "li.dropdown .dropdown-btn", function (e) {
        e.stopPropagation();
        const $this = $(this);
        const $dropdownMenu = $this.prev("ul");

        if ($this.hasClass("open")) {
          $this.removeClass("open");
          $dropdownMenu.slideUp(500);
          $this.find(".fas").removeClass("rotate-icon");
        } else {
          $(".mobile-menu li.dropdown .dropdown-btn.open")
            .removeClass("open")
            .prev("ul")
            .slideUp(500)
            .find(".fas")
            .removeClass("rotate-icon");
          $this.addClass("open");
          $dropdownMenu.slideDown(500);
          $this.find(".fas").addClass("rotate-icon");
        }
      });

      $(".mobile-nav-toggler").on("click", function () {
        $("body").addClass("mobile-menu-visible");
        $(".mobile-menu").addClass("visible");
      });

      $(".mobile-menu .menu-backdrop, .mobile-menu .close-btn").on(
        "click",
        function () {
          $("body").removeClass("mobile-menu-visible");
          $(".mobile-menu").removeClass("visible");

          $(".mobile-menu li.dropdown .dropdown-btn").removeClass("open");
          $(".mobile-menu li.dropdown ul").slideUp(500);
        }
      );

      $(document).on("click", function (e) {
        if (!$(e.target).closest(".mobile-menu").length) {
          $(".mobile-menu li.dropdown .dropdown-btn").removeClass("open");
          $(".mobile-menu li.dropdown ul").slideUp(500);
        }
      });

      return () => {
        $(".mobile-menu").off("click", "li.dropdown .dropdown-btn");
        $(".mobile-nav-toggler").off("click");
        $(".mobile-menu .menu-backdrop, .mobile-menu .close-btn").off("click");
        $(document).off("click");
      };
    }
  }, [menuData]);

  return (
    <>
      <div className="boxed_wrapper">
        <div id="search-popup" className="search-popup">
          <div className="popup-inner">
            <div className="upper-box clearfix">
              <figure className="logo-box pull-left">
                <Link to="/">
                  <img src={img3} alt="KBMC Logo" />
                </Link>
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
                  <Link to="#.">
                    <img src={img1} alt="logo" style={{ width: "50px" }} />
                  </Link>
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
                    <Link to="#.">
                      <span className="fab fa-youtube"></span>
                    </Link>
                  </li>
                  <li>
                    <Link to="#.">
                      <span className="fab fa-instagram"></span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="https://twitter.com/home"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span className="fab fa-twitter"></span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="https://www.facebook.com/profile.php?id=100015538206978&mibextid=ZbWKwL"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span className="fab fa-facebook"></span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="header-lower">
            <div className="outer-box">
              <div className="logo-box">
                <figure className="logo">
                  <Link to="/">
                    <img src={img3} alt="logo" />
                  </Link>
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
                      {menuData.map((menuItem, index) => {
                        const isMainMenuActive =
                          (location.pathname === "/" &&
                            menuItem.mainMenu === "Home") ||
                          menuItem.subMenus.some((subMenuItem) =>
                            location.pathname.endsWith(subMenuItem.subLink)
                          );

                        return (
                          <li
                            key={index}
                            className={`${
                              menuItem.subMenus.length ? "dropdown" : ""
                            } ${isMainMenuActive ? "current" : ""}`}
                          >
                            <Link to={menuItem.mainMenu === "Home" ? "/" : "#"}>
                              {menuItem.mainMenu}
                            </Link>
                            {menuItem.subMenus.length > 0 && (
                              <ul>
                                {menuItem.subMenus.map(
                                  (subMenuItem, subIndex) => (
                                    <li key={subIndex}>
                                      <Link
                                        to={
                                          subMenuItem.subLink.endsWith(".pdf")
                                            ? `${baseURL}${subMenuItem.subLink}`
                                            : subMenuItem.subLink
                                        }
                                        target={
                                          subMenuItem.subLink.startsWith(
                                            "http"
                                          ) ||
                                          subMenuItem.subLink.endsWith(".pdf")
                                            ? "_blank"
                                            : undefined
                                        }
                                        rel={
                                          subMenuItem.subLink.startsWith(
                                            "http"
                                          ) ||
                                          subMenuItem.subLink.endsWith(".pdf")
                                            ? "noopener noreferrer"
                                            : undefined
                                        }
                                      >
                                        {subMenuItem.subMenu}
                                      </Link>
                                    </li>
                                  )
                                )}
                              </ul>
                            )}
                          </li>
                        );
                      })}
                      <div className="menu-right-content">
                        <div className="btn-box mx-1">
                          <Link to="/login" className="header-btn">
                            Login
                          </Link>
                        </div>
                      </div>
                    </ul>
                  </div>
                </nav>
              </div>
            </div>
          </div>

          <div className="sticky-header">
            <div className="outer-container">
              <div className="outer-box">
                <div className="logo-box">
                  <figure className="logo">
                    <Link to="#.">
                      <img
                        src="assets/images/KBMC-logo-1-edited2.png"
                        alt="logo"
                      />
                    </Link>
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
                      <Link to="#." className="header-btn">
                        Administration Chief
                      </Link>
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
              <Link to="#.">
                <img src={img3} alt="KBMC Logo" title="KBMC Logo" />
              </Link>
            </div>

            <div
              className="collapse navbar-collapse show clearfix"
              id="navbarSupportedContent"
            >
              <ul className="navigation clearfix">
                {menuData.map((menuItem, index) => {
                  const isMainMenuActive =
                    (location.pathname === "/" &&
                      menuItem.mainMenu === "Home") ||
                    menuItem.subMenus.some((subMenuItem) =>
                      location.pathname.endsWith(subMenuItem.subLink)
                    );

                  return (
                    <li
                      key={index}
                      className={`${
                        menuItem.subMenus.length ? "dropdown" : ""
                      } ${isMainMenuActive ? "current" : ""}`}
                    >
                      <Link to={menuItem.mainMenu === "Home" ? "/" : "#"}>
                        {menuItem.mainMenu}
                      </Link>

                      {menuItem.subMenus.length > 0 && (
                        <ul>
                          {menuItem.subMenus.map((subMenuItem, subIndex) => (
                            <li key={subIndex}>
                              <Link
                                to={
                                  subMenuItem.subLink.endsWith(".pdf")
                                    ? `${baseURL}${subMenuItem.subLink}`
                                    : subMenuItem.subLink
                                }
                                target={
                                  subMenuItem.subLink.startsWith("http") ||
                                  subMenuItem.subLink.endsWith(".pdf")
                                    ? "_blank"
                                    : undefined
                                }
                                rel={
                                  subMenuItem.subLink.startsWith("http") ||
                                  subMenuItem.subLink.endsWith(".pdf")
                                    ? "noopener noreferrer"
                                    : undefined
                                }
                              >
                                {subMenuItem.subMenu}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}

                      {menuItem.subMenus.length > 0 && (
                        <div className="dropdown-btn">
                          <span className="fas fa-angle-down"></span>
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="social-links">
              <ul className="clearfix">
                <li>
                  <Link to="#.">
                    <span className="fab fa-youtube"></span>
                  </Link>
                </li>
                <li>
                  <Link to="#.">
                    <span className="fab fa-instagram"></span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="https://twitter.com/home"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="fab fa-twitter"></span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="https://www.facebook.com/profile.php?id=100015538206978&amp;mibextid=ZbWKwL"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="fab fa-facebook"></span>
                  </Link>
                </li>
              </ul>
              <div className="menu-right-content">
                <div className="btn-box btn-sm">
                  <Link to="/login" className="header-btn btn-sm">
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
