import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaBell, FaUserCircle, FaChevronDown } from 'react-icons/fa';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  const [notificationsVisible, setNotificationsVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const notificationsRef = useRef(null);
  const dropdownRef = useRef(null);

  const toggleNotifications = () => {
    setNotificationsVisible(prevState => !prevState);
  };

  const toggleDropdown = (event) => {
    event.stopPropagation(); // Prevent event from bubbling up
    setDropdownVisible(prevState => !prevState);
  };

  const handleClickOutside = (event) => {
    if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
      setNotificationsVisible(false);
    }
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const notifications = [
    "John Doe added new task 'Patient appointment booking'",
    "Tarah Shropshire changed the task name 'Appointment booking with payment gateway'",
    "Misty Tison added 'Domenic Houston' and 'Claire Mapes' to project 'Doctor available module'",
    "Rolland Webber completed task 'Patient and Doctor video conferencing'",
    "Bernardo Galaviz added new task 'Private chat module'",
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary px-4 shadow-sm">
      <span className="navbar-brand text-white fw-bold">KBMC Dashboard</span>

      {/* Hamburger menu for mobile view */}
      <button
        className="navbar-toggler text-white border-white"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNav">
        <div className="ml-auto d-flex align-items-center ms-auto">
          {/* Notification Icon */}
          <div className="position-relative me-3" ref={notificationsRef} onClick={toggleNotifications}>
            <FaBell className="text-white notification-icon" size={24} />
            {notifications.length > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {notifications.length}
              </span>
            )}
            {notificationsVisible && (
              <div className="notification-dropdown bg-white text-dark p-3 shadow">
                <h6 className="mb-3">Notifications</h6>
                <ul className="list-unstyled" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                  {notifications.map((notification, index) => (
                    <li key={index} className="d-flex align-items-start notification-item">
                      <FaUserCircle className="me-2 text-secondary" size={20} />
                      <span>{notification}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Admin Profile Dropdown */}
          <div className="d-flex align-items-center position-relative" ref={dropdownRef}>
            <div onClick={toggleDropdown} style={{ cursor: 'pointer' }} className="admin-profile d-flex align-items-center">
              <FaUserCircle className="text-white me-1" size={24} />
              <span className="text-white me-2">Admin</span>
              <FaChevronDown className="text-white" />
            </div>

            {dropdownVisible && (
              <div className="dropdown-menu show position-absolute" style={{ top: '40px', right: '0', zIndex: 1000 }}>
                <Link className="dropdown-item" to="#profile">My Profile</Link>
                <Link className="dropdown-item" to="#edit-profile">Edit Profile</Link>
                <Link className="dropdown-item" to="#settings">Settings</Link>
                <Link className="dropdown-item" to="#logout">Logout</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
