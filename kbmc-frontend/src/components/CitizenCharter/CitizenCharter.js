import React, { useEffect, useState } from "react";
import innerBanner from "../../assets/images/banner/inner-banner.jpg";
import pdficon from "../../assets/images/icons/PDF-Icons.png";
import api, { baseURL } from '../api';
import {Link} from "react-router-dom";

const CitizenCharter = () => {
  const [departments, setDepartments] = useState([]);
  const [citDepartments, setCitDepartments] = useState([]);

  const fetchDepartments = async () => {
    try {
      const response = await api.get("/departments");
      setDepartments(response.data);
    } catch (error) {
      console.error("Error fetching departments data");
    }
  };

  const fetchCitDepartments = async () => {
    try {
      const response = await api.get("/citizen-charter");
      setCitDepartments(response.data);
    } catch (error) {
      console.error("Error fetching citizen department data:", error);
    }
  };

  useEffect(() => {
    fetchCitDepartments();
    fetchDepartments();
  }, []);

  const unmatchedDepartments = citDepartments.filter(
    (citDept) => !departments.some((dept) => dept.name === citDept.name)
  );

  return (
    <>
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
            <h1>Citizen Charter</h1>
            <ul className="bread-crumb clearfix">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <span>Citizen Charter</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <br />
      <section className="departments-style-two alternat-2">
        <div className="auto-container">
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 content-side">
              <div className="row clearfix">
                {departments.map((department) => {
                  const matchingDepartment = citDepartments.find(
                    (dept) => dept.name === department.name
                  );

                  return (
                    <div key={department.id} className="col-md-6">
                      <div className="department-details-content citizen-chart-pdf">
                        <div className="content-two">
                          <div className="download-box">
                            <div className="icon-box">
                              <img src={pdficon} alt="" />
                            </div>
                            <h6>{department.name}</h6>
                            <div className="download-btn">
                              <Link
                                to={
                                  matchingDepartment
                                    ? `${baseURL}/${matchingDepartment.pdf}`
                                    : "#."
                                }
                                rel="noreferrer"
                                target="_blank"
                                className="theme-btn btn-one"
                              >
                                View
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {unmatchedDepartments.map((citDept) => (
                  <div key={citDept.id} className="col-md-6">
                    <div className="department-details-content citizen-chart-pdf">
                      <div className="content-two">
                        <div className="download-box">
                          <div className="icon-box">
                            <img src={pdficon} alt="" />
                          </div>
                          <h6>{citDept.name}</h6>
                          <div className="download-btn">
                            <Link
                              to={`${baseURL}/${citDept.pdf}`}
                              rel="noreferrer"
                              target="_blank"
                              className="theme-btn btn-one"
                            >
                              View
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CitizenCharter;
