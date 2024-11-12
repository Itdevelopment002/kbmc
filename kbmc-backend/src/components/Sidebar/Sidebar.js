import React, { useState } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { BiSliderAlt } from "react-icons/bi";
import { MdMiscellaneousServices } from "react-icons/md";
import { GrServices } from "react-icons/gr";
import { ImNewspaper } from "react-icons/im";
import { GrGallery } from "react-icons/gr";
import { FaLink } from "react-icons/fa";
import { BsFillMenuButtonWideFill } from "react-icons/bs";
import { BiSolidWidget } from "react-icons/bi";
import { SiDeutschepost } from "react-icons/si";
import { IoPersonAdd } from "react-icons/io5";
import { MdPrivacyTip } from "react-icons/md";
import { BiMessageSquareError } from "react-icons/bi";
import { MdContactMail } from "react-icons/md";
import { MdNotificationsActive } from "react-icons/md";


const Sidebar = ({ isOpen, closeSidebar }) => {
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [activeItem, setActiveItem] = useState("/");

  const toggleSubmenu = (menuId) => {
    setOpenSubmenu((prevId) => (prevId === menuId ? null : menuId));
  };

  const handleItemClick = (path) => {
    setActiveItem(path); // Set active item
    if (isOpen) {
      closeSidebar();
    }
  };


  return (
    <>
      {isOpen && (
        <div
          className="sidebar-overlay opened"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar component */}
      <div className={`sidebar ${isOpen ? "opened" : ""}`}>
        <div className="sidebar-inner">
          <div id="sidebar-menu" className="sidebar-menu">
            <ul>
              <li className={activeItem === "/" ? "active" : ""}
                onClick={() => handleItemClick("/")}>
                <Link to="/" >
                  <i className="fa fa-dashboard"></i>Main Menu
                </Link>
              </li>
              <li className={activeItem === "/slider" ? "active" : ""}
                onClick={() => handleItemClick("/slider")}>
                <Link to="/slider">
                  <i className="fa"><BiSliderAlt /></i> Slider
                </Link>
              </li>
              <li className={activeItem === "/services" ? "active" : ""}
                onClick={() => handleItemClick("/services")}>
                <Link to="/services" >
                  <i className="fa"><MdMiscellaneousServices /></i> Services
                </Link>
              </li>
              <li className="submenu">
                <Link to="#." onClick={() => toggleSubmenu("subservices")}>
                  <i className="fa"><GrServices /></i> <span>Sub Services </span>{" "}
                  <span
                    className={`menu-arrow ${openSubmenu === "subservices" ? "rotate" : ""
                      }`}
                  ></span>
                </Link>
                <ul className={openSubmenu === "subservices" ? "open" : ""}>
                  <li className={activeItem === "/public-disclosure" ? "active" : ""}
                    onClick={() => handleItemClick("/public-disclosure")}>
                    <Link to="/public-disclosure">Public Disclosure</Link>
                  </li>
                  <li className={activeItem === "/citizen-charter" ? "active" : ""}
                    onClick={() => handleItemClick("/citizen-charter")}>
                    <Link to="/citizen-charter">Citizen Charter</Link>
                  </li>
                  <li className={activeItem === "/rts" ? "active" : ""}
                    onClick={() => handleItemClick("/rts")}>
                    <Link to="/rts">Right to Service</Link>
                  </li>
                  <li className={activeItem === "#." ? "active" : ""}
                    onClick={() => handleItemClick("#.")}>
                    <Link to="#.">Development Plan</Link>
                  </li>
                  <li className={activeItem === "#.." ? "active" : ""}
                    onClick={() => handleItemClick("#..")}>
                    <Link to="#.." onClick={handleItemClick}>Downloads</Link>
                  </li>
                  <li className={activeItem === "#..." ? "active" : ""}
                    onClick={() => handleItemClick("#...")}>
                    <Link to="#..." onClick={handleItemClick}>City Map</Link>
                  </li>
                  <li className={activeItem === "#" ? "active" : ""}
                    onClick={() => handleItemClick("#")}>
                    <Link to="#" onClick={handleItemClick}>Elected Wing</Link>
                  </li>
                  <li className={activeItem === "##" ? "active" : ""}
                  onClick={() => handleItemClick("##")}>
                    <Link to="##" onClick={handleItemClick}>Official Publications</Link>
                  </li>
                </ul>
              </li>
              <li className={activeItem === "/home-videos" ? "active" : ""}
                  onClick={() => handleItemClick("/home-videos")}>
                <Link to="/home-videos">
                  <i className="fa fa-video-camera camera"></i> Home Video
                </Link>
              </li>
              <li className={activeItem === "/news" ? "active" : ""}
                  onClick={() => handleItemClick("/news")}>
                <Link to="/news">
                  <i className="fa"><ImNewspaper /></i> News Update
                </Link>
              </li>
              <li className={activeItem === "/tenders" ? "active" : ""}
                  onClick={() => handleItemClick("/tenders")}>
                <Link to="/tenders">
                  <i className="fa fa-calendar"></i> Tenders
                </Link>
              </li>
              <li className="submenu">
                <Link to="#." onClick={() => toggleSubmenu("gallery")}>
                  <i className="fa"><GrGallery /></i> <span>Gallery </span>{" "}
                  <span
                    className={`menu-arrow ${openSubmenu === "gallery" ? "rotate" : ""
                      }`}
                  ></span>
                </Link>
                <ul className={openSubmenu === "gallery" ? "open" : ""}>
                  <li className={activeItem === "/photo-gallery" ? "active" : ""}
                  onClick={() => handleItemClick("/photo-gallery")}>
                    <Link to="/photo-gallery">Photo Gallery</Link>
                  </li>
                </ul>
              </li>
              <li className={activeItem === "/gov-website-link" ? "active" : ""}
              onClick={() => handleItemClick("/gov-website-link")}>
                <Link to="/gov-website-link">
                  <i className="fa "><FaLink /></i>Govt. Website Links
                </Link>
              </li>
              <li className={activeItem === "/departments" ? "active" : ""}
              onClick={() => handleItemClick("/departments")}>
                <Link to="/departments">
                  <i className="fa fa-calendar-check-o"></i>Departments
                </Link>
              </li>

              <li className="submenu">
                <Link to="#." onClick={() => toggleSubmenu("subdepartments")}>
                  <i className="fa fa-money"></i> <span>Sub Departments</span>{" "}
                  <span
                    className={`menu-arrow ${openSubmenu === "subdepartments" ? "rotate" : ""
                      }`}
                  ></span>
                </Link>
                <ul className={openSubmenu === "subdepartments" ? "open" : ""}>
                  <li className={activeItem === "#1" ? "active" : ""}
                  onClick={() => handleItemClick("#1")}>
                    <Link to="#1">General Admin Department</Link>
                  </li>
                  <li className={activeItem === "#2" ? "active" : ""}
                  onClick={() => handleItemClick("#2")}>
                    <Link to="#2">Audit Department</Link>
                  </li>
                  <li className={activeItem === "#3" ? "active" : ""}
                  onClick={() => handleItemClick("#3")}>
                    <Link to="#3">Tax Department</Link>
                  </li>
                  <li className={activeItem === "#4" ? "active" : ""}
                  onClick={() => handleItemClick("#4")}>
                    <Link to="#4">Account Department</Link>
                  </li>
                  <li className={activeItem === "#5" ? "active" : ""}
                  onClick={() => handleItemClick("#5")}>
                    <Link to="#5">Town Planning</Link>
                  </li>
                  <li className={activeItem === "#6" ? "active" : ""}
                  onClick={() => handleItemClick("#6")}>
                    <Link to="#6">Electrical Department</Link>
                  </li>
                  <li className={activeItem === "#7" ? "active" : ""}
                  onClick={() => handleItemClick("#7")}>
                    <Link to="#7">Public Work Department (PWD)</Link>
                  </li>
                  <li className={activeItem === "#8" ? "active" : ""}
                  onClick={() => handleItemClick("#8")}>
                    <Link to="#8">Milkat (Income)</Link>
                  </li>
                  <li className={activeItem === "#9" ? "active" : ""}
                  onClick={() => handleItemClick("#9")}>
                    <Link to="#9">E-Governance Department</Link>
                  </li>
                  <li className={activeItem === "#10" ? "active" : ""}
                  onClick={() => handleItemClick("#10")}>
                    <Link to="#10">Health Department</Link>
                  </li>
                  <li className={activeItem === "#11" ? "active" : ""}
                  onClick={() => handleItemClick("#11")}>
                    <Link to="#11">WCD (Women and Child Development)</Link>
                  </li>
                  <li className={activeItem === "#12" ? "active" : ""}
                  onClick={() => handleItemClick("#12")}>
                    <Link to="#12">Advertisement Department</Link>
                  </li>
                  <li className={activeItem === "#13" ? "active" : ""}
                  onClick={() => handleItemClick("#13")}>
                    <Link to="#13">Education Department</Link>
                  </li>
                  <li className={activeItem === "#14" ? "active" : ""}
                  onClick={() => handleItemClick("#14")}>
                    <Link to="#14">Security Department</Link>
                  </li>
                  <li className={activeItem === "#15" ? "active" : ""}
                  onClick={() => handleItemClick("#15")}>
                    <Link to="#15">Vehicle Department</Link>
                  </li>
                  <li className={activeItem === "#16" ? "active" : ""}
                  onClick={() => handleItemClick("#16")}>
                    <Link to="#16">NULM Department</Link>
                  </li>
                  <li className={activeItem === "#17" ? "active" : ""}
                  onClick={() => handleItemClick("#17")}>
                    <Link to="#17">Hospital Department</Link>
                  </li>
                  <li className={activeItem === "#18" ? "active" : ""}
                  onClick={() => handleItemClick("#18")}>
                    <Link to="#18">Fire Department</Link>
                  </li>
                  <li className={activeItem === "#19" ? "active" : ""}
                  onClick={() => handleItemClick("#19")}>
                    <Link to="#19">Legal Department</Link>
                  </li>
                  <li className={activeItem === "#20" ? "active" : ""}
                  onClick={() => handleItemClick("#20")}>
                    <Link to="#20">Disability Welfare</Link>
                  </li>
                  <li className={activeItem === "#21" ? "active" : ""}
                  onClick={() => handleItemClick("#21")}>
                    <Link to="#21">Store & Records Department</Link>
                  </li>
                  <li className={activeItem === "#22" ? "active" : ""}
                  onClick={() => handleItemClick("#22")}>
                    <Link to="#22">Marriage Registration</Link>
                  </li>
                  <li className={activeItem === "#23" ? "active" : ""}
                  onClick={() => handleItemClick("#23")}>
                    <Link to="#23" >Birth & Death Department</Link>
                  </li>
                </ul>
              </li>
              <li className="submenu">
                <Link to="#." onClick={() => toggleSubmenu("aboutkbmc")}>
                  <i className="fa"><BsFillMenuButtonWideFill /></i>{" "}
                  <span> About KBMC</span>{" "}
                  <span
                    className={`menu-arrow ${openSubmenu === "aboutkbmc" ? "rotate" : ""
                      }`}
                  ></span>
                </Link>
                <ul className={openSubmenu === "aboutkbmc" ? "open" : ""}>
                  <li className={activeItem === "/history" ? "active" : ""}
                  onClick={() => handleItemClick("/history")}>
                    <Link to="/history">History</Link>
                  </li>
                  <li className={activeItem === "/wards" ? "active" : ""}
                  onClick={() => handleItemClick("/wards")}> 
                    <Link to="/wards">Wards</Link>
                  </li>
                  <li className={activeItem === "/elected-wings" ? "active" : ""}
                  onClick={() => handleItemClick("/elected-wings")}>
                    <Link to="/elected-wings">Elected Wings</Link>
                  </li>
                  <li className={activeItem === "/functions" ? "active" : ""}
                  onClick={() => handleItemClick("/functions")}>
                    <Link to="/functions">Functions</Link>
                  </li>
                  <li className={activeItem === "/previous-officers" ? "active" : ""}
                  onClick={() => handleItemClick("/previous-officers")}>
                    <Link to="/previous-officers" >
                      Previous Chief officers of the council
                    </Link>
                  </li>
                  <li className={activeItem === "/previous-presidents" ? "active" : ""}
                  onClick={() => handleItemClick("/previous-presidents")}>
                    <Link to="/previous-presidents" onClick={handleItemClick}>Previous Presidents</Link>
                  </li>
                  <li className={activeItem === "/awards" ? "active" : ""}
                  onClick={() => handleItemClick("/awards")}>
                    <Link to="/awards" onClick={handleItemClick}>Awards</Link>
                  </li>
                </ul>
              </li>
              <li className="submenu">
                <Link to="#." onClick={() => toggleSubmenu("cityprofile")}>
                  <i className=""><BiSolidWidget /></i>{" "}
                  <span> City Profile</span>{" "}
                  <span
                    className={`menu-arrow ${openSubmenu === "cityprofile" ? "rotate" : ""
                      }`}
                  ></span>
                </Link>
                <ul className={openSubmenu === "cityprofile" ? "open" : ""}>
                  <li className={activeItem === "/property-holder" ? "active" : ""}
                  onClick={() => handleItemClick("/property-holder")}>
                    <Link to="/property-holder">Property Holder</Link>
                  </li>
                  <li className={activeItem === "/muncipal-properties" ? "active" : ""}
                  onClick={() => handleItemClick("/muncipal-properties")}>
                    <Link to="/muncipal-properties">Muncipal Properties</Link>
                  </li>
                  <li className={activeItem === "/schools" ? "active" : ""}
                  onClick={() => handleItemClick("/schools")}>
                    <Link to="/schools">Schools</Link>
                  </li>
                  <li className={activeItem === "/garden" ? "active" : ""}
                  onClick={() => handleItemClick("/garden")}>
                    <Link to="/garden">Gardens</Link>
                  </li>
                  <li className={activeItem === "/electric" ? "active" : ""}
                  onClick={() => handleItemClick("/electric")}>
                    <Link to="/electric">Electric</Link>
                  </li>
                  <li className={activeItem === "/roads" ? "active" : ""}
                  onClick={() => handleItemClick("/roads")}>
                    <Link to="/roads">Roads</Link>
                  </li>
                  <li className={activeItem === "/tree-census" ? "active" : ""}
                  onClick={() => handleItemClick("/tree-census")}>
                    <Link to="/tree-census">Tree Census</Link>
                  </li>
                  <li className={activeItem === "/health" ? "active" : ""}
                  onClick={() => handleItemClick("//health")}>
                    <Link to="/health">Health</Link>
                  </li>
                  <li className={activeItem === "/ponds-talao" ? "active" : ""}
                  onClick={() => handleItemClick("/ponds-talao")}>
                    <Link to="/ponds-talao">Ponds / Talao</Link>
                  </li>
                  <li className={activeItem === "/fire-station" ? "active" : ""}
                  onClick={() => handleItemClick("/fire-station")}>
                    <Link to="/fire-station">Fire Station</Link>
                  </li>
                  <li className={activeItem === "/private-hospital" ? "active" : ""}
                  onClick={() => handleItemClick("/private-hospital")}>
                    <Link to="/private-hospital" onClick={handleItemClick}>Private Hospital</Link>
                  </li>
                </ul>
              </li>
              <li className="submenu">
                <Link to="#." onClick={() => toggleSubmenu("schemes")}>
                  <i className="fa"><SiDeutschepost /></i>{" "}
                  <span>Schemes</span>{" "}
                  <span
                    className={`menu-arrow ${openSubmenu === "schemes" ? "rotate" : ""
                      }`}
                  ></span>
                </Link>
                <ul className={openSubmenu === "schemes" ? "open" : ""}>
                  <li className={activeItem === "#NULM" ? "active" : ""}
                  onClick={() => handleItemClick("#NULM")}>
                    <Link to="#NULM">NULM</Link>
                  </li>
                  <li className={activeItem === "#PMAY" ? "active" : ""}
                  onClick={() => handleItemClick("#PMAY")}>
                    <Link to="#PMAY">PMAY</Link>
                  </li>
                  <li className={activeItem === "#NUHM" ? "active" : ""}
                  onClick={() => handleItemClick("#NUHM")}>
                    <Link to="#NUHM">NUHM</Link>
                  </li>
                  <li className={activeItem === "#Amrut" ? "active" : ""}
                  onClick={() => handleItemClick("/#Amrut")}>
                    <Link to="#Amrut">Amrut</Link>
                  </li>
                  <li className={activeItem === "#SWACHH" ? "active" : ""}
                  onClick={() => handleItemClick("#SWACHH")}>
                    <Link to="#SWACHH">Swachh Bharat</Link>
                  </li>
                </ul>
              </li>
              <li className={activeItem === "/user" ? "active" : ""}
                  onClick={() => handleItemClick("/user")}>
                <Link to="/user">
                  <i className="fa"><IoPersonAdd /></i>Add User
                </Link>
              </li>
              <li className={activeItem === "/privacy-policy" ? "active" : ""}
              onClick={() => handleItemClick("/privacy-policy")}>
                <Link to="/privacy-policy">
                  <i className="fa"><MdPrivacyTip /></i>Privacy Policy
                </Link>
              </li>
              <li className={activeItem === "/terms-conditions" ? "active" : ""}
              onClick={() => handleItemClick("/terms-conditions")}>
                <Link to="/terms-conditions">
                  <i className="fa"><BiMessageSquareError /></i>Terms & Conditions
                </Link>
              </li>
              <li className={activeItem === "/contact-us" ? "active" : ""}
              onClick={() => handleItemClick("/contact-us")}>
                <Link to="/contact-us">
                  <i className="fa" ><MdContactMail /></i>Contact Us{" "}
                </Link>
              </li>
              <li className={activeItem === "/notification" ? "active" : ""}
              onClick={() => handleItemClick("/notification")}>
                <Link to="/notification">
                  <i className="fa" ><MdNotificationsActive /></i>Notifications{" "}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
