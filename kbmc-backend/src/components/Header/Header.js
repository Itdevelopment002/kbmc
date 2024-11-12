import React, { useState, useEffect } from "react";
import img from "../../assets/img/user.jpg";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import './Header.css'

const Header = ({ onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScreenLarge, setIsScreenLarge] = useState(window.innerWidth > 990);
  const [isNotificationDropdownOpen, setIsNotificationDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // Close sidebar when clicking outside or on an item
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // Update screen size state and auto-close sidebar for large screens
  useEffect(() => {
    const handleResize = () => {
      const isLarge = window.innerWidth > 990;
      setIsScreenLarge(isLarge);
      if (isLarge) {
        setIsSidebarOpen(false); // Auto-close sidebar on large screens
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close all dropdowns when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest(".dropdown-toggle") && !event.target.closest(".dropdown-menu")) {
        setIsNotificationDropdownOpen(false);
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <>
      <Link
        id="mobile_btn"
        className="mobile_btn float-left"
        to="#"
        onClick={(e) => {
          e.preventDefault();
          toggleSidebar();
        }}
      >
        <i className="fa fa-bars"></i>
      </Link>
      <div className="main-wrapper">
        <div className="header">
          <div className="header-left">
            <Link to="#." className="logo">KBMC</Link>
          </div>
          <Link
            id="mobile_btn"
            className="mobile_btn float-left"
            to="#"
            onClick={(e) => {
              e.preventDefault();
              toggleSidebar();
            }}
          >
            <i className="fa fa-bars"></i>
          </Link>
          <ul className="nav user-menu float-right">
            <li className="nav-item dropdown d-none d-sm-block">
              <Link
                to="#."
                className="dropdown-toggle nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  setIsNotificationDropdownOpen((prev) => !prev);
                  setIsUserDropdownOpen(false);
                }}
              >
                <i className="fa fa-bell-o"></i>
                <span className="badge badge-pill bg-danger float-right">1</span>
              </Link>
              {isNotificationDropdownOpen && (
                <div className="dropdown-menu notifications show notification-keep-visible">
                  <div className="topnav-dropdown-header">
                    <span>Notifications</span>
                  </div>
                  <div className="drop-scroll">
                    <ul className="notification-list">
                      <li className="notification-message">
                        <Link to="activities.html">
                          <div className="media">
                            <span className="avatar">
                              <img alt="John Doe" src={img} className="img-fluid" />
                            </span>
                            <div className="media-body">
                              <p className="noti-details">
                                <span className="noti-title">John Doe</span> added new task
                                <span className="noti-title"> Patient appointment booking</span>
                              </p>
                              <p className="noti-time">
                                <span className="notification-time">4 mins ago</span>
                              </p>
                            </div>
                          </div>
                        </Link>
                      </li>
                      <li className="notification-message">
                        <Link to="activities.html">
                          <div className="media">
                            <span className="avatar">
                              <img alt="John Doe" src={img} className="img-fluid" />
                            </span>
                            <div className="media-body">
                              <p className="noti-details">
                                <span className="noti-title">Tarah Shropshire</span> changed the task name
                                <span className="noti-title">Appointment booking with payment gateway</span>
                              </p>
                              <p className="noti-time">
                                <span className="notification-time">6 mins ago</span></p>
                            </div>
                          </div>
                        </Link>
                      </li>
                      <li className="notification-message">
                        <Link to="activities.html">
                          <div className="media">
                            <span className="avatar">
                              <img alt="John Doe" src={img} className="img-fluid" />
                            </span>
                            <div className="media-body">
                              <p className="noti-details">
                                <span className="noti-title">Misty Tison</span> added
                                <span className="noti-title">Domenic Houston</span> and
                                <span className="noti-title">Claire Mapes</span> to project
                                <span className="noti-title">Doctor available module</span>
                              </p>
                              <p className="noti-time">
                                <span className="notification-time">8 mins ago</span></p>
                            </div>
                          </div>
                        </Link>
                      </li>
                      <li className="notification-message">
                        <Link to="activities.html">
                          <div className="media">
                            <span className="avatar">
                              <img alt="John Doe" src={img} className="img-fluid" />
                            </span>
                            <div className="media-body">
                              <p className="noti-details">
                                <span className="noti-title">Rolland Webber</span> completed task
                                <span className="noti-title">Patient and Doctor video conferencing</span>
                              </p>
                              <p className="noti-time">
                                <span className="notification-time">12 mins ago</span></p>
                            </div>
                          </div>
                        </Link>
                      </li>
                      <li className="notification-message">
                        <Link to="activities.html">
                          <div className="media">
                            <span className="avatar">
                              <img alt="John Doe" src={img} className="img-fluid" />
                            </span>
                            <div className="media-body">
                              <p className="noti-details">
                                <span className="noti-title">Bernardo Galaviz</span> added new task
                                <span className="noti-title">Private chat module</span>
                              </p>
                              <p className="noti-time">
                                <span className="notification-time">2 days ago</span></p>
                            </div>
                          </div>
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="topnav-dropdown-footer">
                    <Link to="activities.html">View all Notifications</Link>
                  </div>
                </div>
              )}
            </li>

            {/* User Profile with Online Status */}
            <li className="nav-item dropdown d-none d-sm-block">
              <Link
                to="#."
                className="dropdown-toggle nav-link user-link"
                onClick={(e) => {
                  e.preventDefault();
                  setIsUserDropdownOpen((prev) => !prev);
                  setIsNotificationDropdownOpen(false);
                }}
              >
                <span className="user-img">
                  <img className="rounded-circle" src={img} width="24" alt="Admin" />
                  <span className="status online"></span> {/* Online status dot */}
                </span>
                <span>Admin</span> <i className="fa fa-angle-down ml-1"></i>
              </Link>
              {isUserDropdownOpen && (
                <div className="dropdown-menu show dropdown-keep-visible">
                  <Link className="dropdown-item" to="profile.html">My Profile</Link>
                  <Link className="dropdown-item" to="edit-profile.html">Edit Profile</Link>
                  <Link className="dropdown-item" to="settings.html">Settings</Link>
                  <Link className="dropdown-item" onClick={onLogout}>Logout</Link>
                </div>
              )}
            </li>

            {/* Mobile user menu, only visible on small screens */}
            <div className="dropdown mobile-user-menu float-right d-block d-sm-none">
              <Link
                to="#."
                className="dropdown-toggle"
                onClick={(e) => {
                  e.preventDefault();
                  setIsUserDropdownOpen((prev) => !prev);
                }}
              >
                <i className="fa fa-ellipsis-v"></i>
              </Link>
              {isUserDropdownOpen && (
                <div className="dropdown-menu dropdown-menu-right show mx-2 dropdown-keep-visible">
                  <Link className="dropdown-item" to="profile.html">My Profile</Link>
                  <Link className="dropdown-item" to="edit-profile.html">Edit Profile</Link>
                  <Link className="dropdown-item" to="settings.html">Settings</Link>
                  <Link className="dropdown-item" onClick={onLogout}>Logout</Link>
                </div>
              )}
            </div>
          </ul>
        </div>
      </div>
      <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
    </>
  );
};

export default Header;
