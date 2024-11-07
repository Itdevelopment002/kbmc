import React, { useState, useEffect } from "react";
import innerBanner from "../../assets/images/banner/inner-banner.jpg";
import api from "../api";
import {Link} from "react-router-dom";

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Fetch departments data from the API
  const fetchDepartments = async () => {
    try {
      const response = await api.get("/departments");
      setDepartments(response.data);
    } catch (error) {
      console.error("Error fetching departments data");
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  // Calculate total pages
  const totalPages = Math.ceil(departments.length / itemsPerPage);

  // Get current page departments
  const currentDepartments = departments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <section className="page-title">
        <div
          className="bg-layer"
          style={{ backgroundImage: `url(${innerBanner})` }}
        ></div>
        <div className="line-box">
          <div className="line-1"></div>
          <div className="line-2"></div>
        </div>
        <div className="auto-container">
          <div className="content-box">
            <h1>Departments</h1>
            <ul className="bread-crumb clearfix">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <span>Departments</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <br />
      <section className="departments-style-two alternat-2">
        <div className="auto-container">
          <div className="row clearfix">
            {currentDepartments.map((department, index) => (
              <div key={department.id} className="col-lg-4 col-md-12 col-sm-12 departments-block">
                <div className="departments-block-two">
                  <div className="inner-box">
                    <div className="content-box">
                      <h3>
                        <Link href={department.link}>{department.name}</Link>
                      </h3>
                      <p>Name of HOD: {department.hod}</p>
                      <div className="link-box">
                        <Link href={department.link}>
                          <span>Read More</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="pagination-wrapper centred">
          <ul className="pagination clearfix">
            <li>
              <Link
                to="#."
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) setCurrentPage(currentPage - 1);
                }}
                className={currentPage === 1 ? "disabled" : ""}
              >
                <i className="flaticon-right-chevron"></i>
              </Link>
            </li>
            {Array.from({ length: totalPages }, (_, i) => (
              <li key={i}>
                <Link
                  to="#."
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(i + 1);
                  }}
                  className={currentPage === i + 1 ? "current" : ""}
                >
                  {i + 1}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="#."
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                }}
                className={currentPage === totalPages ? "disabled" : ""}
              >
                <i className="flaticon-right-chevron"></i>
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Departments;