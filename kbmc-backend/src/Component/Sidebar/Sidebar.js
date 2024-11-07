import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { MdLink, MdBusiness } from "react-icons/md";
import { MdMenu, MdClose, MdPersonAdd, MdPrivacyTip, MdContactMail, MdNotifications } from 'react-icons/md';import { BsFileEarmarkText } from 'react-icons/bs';
import {
  FaHome,
  FaClipboardList,
  FaUsers,
  FaVideo,
  FaNewspaper,
} from "react-icons/fa"; // Updated icons
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { FaImage } from "react-icons/fa";
import "./Sidebar.css";

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [showSubServices, setShowSubServices] = useState(false);
  const [showAboutKBMC, setShowAboutKBMC] = useState(false);
  const [showSubDepartments, setShowSubDepartments] = useState(false);
  const [showCityProfile, setShowCityProfile] = useState(false);
  const [showSchemes, setShowSchemes] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const submenuRef = useRef(null);

  const handleToggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleClickOutside = (event) => {
    if (submenuRef.current && !submenuRef.current.contains(event.target)) {
      setShowSubServices(false);
      setShowAboutKBMC(false);
    }
  };


  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 728) {
        setShowSidebar(true); // Show sidebar on larger screens
      } else {
        setShowSidebar(false); // Hide sidebar on smaller screens
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Check initial size

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={`sidebar ${showSidebar ? '' : 'hidden'}`}>
    <button className="toggle-btn" onClick={handleToggleSidebar}>
        {showSidebar ? <MdMenu /> : <MdMenu />}
    </button>
      {showSidebar && (
        <div className="sidebar" style={{ backgroundColor: "#f0f0f0" }}>
        <ul className="nav flex-column">
          <li className="nav-item">
            <NavLink to="/" className="nav-link" activeClassName="active">
              <FaHome className="me-2" />
              Main Menu
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/slider" className="nav-link" activeClassName="active">
              <FaClipboardList className="me-2" />
              Slider
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/services" className="nav-link" activeClassName="active">
              <FaUsers className="me-2" />
              Services
            </NavLink>
          </li>
          <li className="nav-item">
        <div
          className="nav-link"
          onClick={() => setShowSubServices((prev) => !prev)}
          style={{ cursor: "pointer" }}
        >
          <FaClipboardList className="me-2" />
          Sub Services {showSubServices ? <AiOutlineUp /> : <AiOutlineDown />}
        </div>
        {showSubServices && (
          <div ref={submenuRef}>
            <ul className="nav flex-column ms-3">
              <li className="nav-item">
                <NavLink to="/public-disclosure" className="nav-link">
                  Public Disclosure
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/citizen-charter" className="nav-link">
                  Citizen Charter
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/rts" className="nav-link">
                  Right to Service
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/xyz" className="nav-link">
                  Development Plan
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/xyz" className="nav-link">
                  Downloads
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/xyz" className="nav-link">
                  City Map
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/xyz" className="nav-link">
                  Elected Wing
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/xyz" className="nav-link">
                  Official Publications
                </NavLink>
              </li>
            </ul>
          </div>
        )}
      </li>
  
          <li className="nav-item">
            <NavLink
              to="/home-video"
              className="nav-link"
              activeClassName="active"
            >
              <FaVideo className="me-2" />
              Home Video
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/news" className="nav-link" activeClassName="active">
              <FaNewspaper className="me-2" />
              News Update
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/tenders" className="nav-link" activeClassName="active">
              <FaClipboardList className="me-2" />
              Tenders
            </NavLink>
          </li>
  
          <li className="nav-item">
            <div
              className="nav-link"
              onClick={() => setShowAboutKBMC(!showAboutKBMC)}
              style={{ cursor: "pointer" }}
            >
              <FaImage className="me-2" />
              Gallery {showAboutKBMC ? <AiOutlineUp /> : <AiOutlineDown />}
            </div>
            {showAboutKBMC && (
              <ul className="nav flex-column ms-3">
                <li className="nav-item">
                  <NavLink
                    to="/photo-gallery"
                    className="nav-link"
                    activeClassName="active"
                  >
                    Photo Gallery
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
  
          <li className="nav-item">
            <NavLink
              to="/website-link"
              className="nav-link"
              activeClassName="active"
            >
              <MdLink className="me-2" />
              Gov. Website Links
            </NavLink>
          </li>
  
          <li className="nav-item">
            <NavLink to="/department" className="nav-link" activeClassName="active">
              <MdBusiness className="me-2" />
              Department
            </NavLink>
          </li>
          <li className="nav-item">
            <div
              className="nav-link"
              onClick={() => setShowSubServices(!showSubServices)}
              style={{ cursor: "pointer" }}
            >
              <FaClipboardList className="me-2" />
              Sub Departments{" "}
              {showSubServices ? <AiOutlineUp /> : <AiOutlineDown />}
            </div>
            {showSubServices && (
              <ul className="nav flex-column ms-3">
                <li className="nav-item">
                  <NavLink to="/general-admin-department" className="nav-link">
                    General Admin Department
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/audit-department" className="nav-link">
                    Audit Department
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/tax-department" className="nav-link">
                    Tax Department
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/account-department" className="nav-link">
                    Account Department
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/town-planning" className="nav-link">
                    Town Planning
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/electrical-department" className="nav-link">
                    Electrical Department
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/pwd" className="nav-link">
                    Public Work Department (PWD)
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/milkat-income" className="nav-link">
                    Milkat (Income)
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/e-governance" className="nav-link">
                    E-Governance Department
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/health-department" className="nav-link">
                    Health Department
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/wcd" className="nav-link">
                    WCD (Women and Child Development)
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/advertisement-department" className="nav-link">
                    Advertisement Department
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/education-department" className="nav-link">
                    Education Department
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/security-department" className="nav-link">
                    Security Department
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/vehicle-department" className="nav-link">
                    Vehicle Department
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/nulm-department" className="nav-link">
                    NULM Department
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/hospital-department" className="nav-link">
                    Hospital Department
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/fire-department" className="nav-link">
                    Fire Department
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/legal-department" className="nav-link">
                    Legal Department
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/disability-welfare" className="nav-link">
                    Disability Welfare
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/store-records" className="nav-link">
                    Store & Records Department
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/marriage-registration" className="nav-link">
                    Marriage Registration
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/birth-death" className="nav-link">
                    Birth & Death Department
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
          <li className="nav-item">
            <div
              className="nav-link"
              onClick={() => setShowAboutKBMC(!showAboutKBMC)}
              style={{ cursor: "pointer" }}
            >
              <FaClipboardList className="me-2" />
              About KBMC {showAboutKBMC ? <AiOutlineUp /> : <AiOutlineDown />}
            </div>
            {showAboutKBMC && (
              <ul className="nav flex-column ms-3">
                <li className="nav-item">
                  <NavLink
                    to="/history"
                    className="nav-link"
                    activeClassName="active"
                  >
                    History
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/ward"
                    className="nav-link"
                    activeClassName="active"
                  >
                    Wards
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/elected-wings"
                    className="nav-link"
                    activeClassName="active"
                  >
                    Elected Wings
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/functions"
                    className="nav-link"
                    activeClassName="active"
                  >
                    Functions
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/previous-chief-officer"
                    className="nav-link"
                    activeClassName="active"
                  >
                    Previous Chief Officers
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/previous-president"
                    className="nav-link"
                    activeClassName="active"
                  >
                    Previous Presidents
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/award"
                    className="nav-link"
                    activeClassName="active"
                  >
                    Awards
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
          <li className="nav-item">
            <div
              className="nav-link"
              onClick={() => setShowCityProfile(!showCityProfile)}
              style={{ cursor: "pointer" }}
            >
              <FaUsers className="me-2" />
              City Profile {showCityProfile ? <AiOutlineUp /> : <AiOutlineDown />}
            </div>
            {showCityProfile && (
              <ul className="nav flex-column ms-3">
                <li className="nav-item">
                  <NavLink
                    to="/property-holder"
                    className="nav-link"
                    activeClassName="active"
                  >
                    Property Holder
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/municipal-properties"
                    className="nav-link"
                    activeClassName="active"
                  >
                    Municipal Properties
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/schools"
                    className="nav-link"
                    activeClassName="active"
                  >
                    Schools
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/gardens"
                    className="nav-link"
                    activeClassName="active"
                  >
                    Gardens
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/electric"
                    className="nav-link"
                    activeClassName="active"
                  >
                    Electric
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/roads"
                    className="nav-link"
                    activeClassName="active"
                  >
                    Roads
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/tree-census"
                    className="nav-link"
                    activeClassName="active"
                  >
                    Tree Census
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/health"
                    className="nav-link"
                    activeClassName="active"
                  >
                    Health
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/ponds"
                    className="nav-link"
                    activeClassName="active"
                  >
                    Ponds / Talao
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/firestation"
                    className="nav-link"
                    activeClassName="active"
                  >
                    Fire Station
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/private-hospital"
                    className="nav-link"
                    activeClassName="active"
                  >
                    Private Hospital
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
          <li className="nav-item">
            <div
              className="nav-link"
              onClick={() => setShowSchemes(!showSchemes)}
              style={{ cursor: "pointer" }}
            >
              <FaClipboardList className="me-2" />
              Schemes {showSchemes ? <AiOutlineUp /> : <AiOutlineDown />}
            </div>
            {showSchemes && (
              <ul className="nav flex-column ms-3">
                <li className="nav-item">
                  <NavLink
                    to="/nulm"
                    className="nav-link"
                    activeClassName="active"
                  >
                    NULM
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/pmay"
                    className="nav-link"
                    activeClassName="active"
                  >
                    PMAY
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/pmsvy"
                    className="nav-link"
                    activeClassName="active"
                  >
                    PMSVY
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/pmgsy"
                    className="nav-link"
                    activeClassName="active"
                  >
                    PMGSY
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/pmkvy"
                    className="nav-link"
                    activeClassName="active"
                  >
                    PMKVY
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/nuls"
                    className="nav-link"
                    activeClassName="active"
                  >
                    NULS
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/pmssy"
                    className="nav-link"
                    activeClassName="active"
                  >
                    PMSSY
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/other-schemes"
                    className="nav-link"
                    activeClassName="active"
                  >
                    Other Schemes
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
  
          <li className="nav-item">
            <NavLink to="/user" className="nav-link" activeClassName="active">
              <MdPersonAdd className="me-2" />
              Add User
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/privacy-policy" className="nav-link" activeClassName="active">
              <MdPrivacyTip className="me-2" />
              Privacy Policy
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/terms-and-conditions" className="nav-link" activeClassName="active">
              <BsFileEarmarkText className="me-2" />
              Terms & Conditions
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/contact-us" className="nav-link" activeClassName="active">
              <MdContactMail className="me-2" />
              Contact Us
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/notification" className="nav-link" activeClassName="active">
              <MdNotifications className="me-2" />
              Notifications
            </NavLink>
          </li>
        </ul>
      </div>
      )}
    </div>
  );
};

export default Sidebar;
