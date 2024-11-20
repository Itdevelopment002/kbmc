import React, { useState, useEffect } from "react";
import api, { baseURL } from "../api";
import innerBanner from "../../assets/images/banner/inner-banner.jpg";
import { Link } from "react-router-dom";

const DeptLayer2 = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [data, setData] = useState([]);
  const [departments, setDepartments] = useState([]);

  const fetchDepartments = async () => {
    try {
      const response = await api.get("/public_disclosure");
      const filteredDepartments = response.data.filter(
        (department) => department.status === 1
      );
      setDepartments(filteredDepartments);
    } catch (error) {
      console.error("Error fetching departments data");
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/generaladminaddyear");
        const filteredDepartments = response.data.filter(
          (department) => department.status === 1
        );
        setData(filteredDepartments);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleAccordionClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

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
            <h1>General Admin Department</h1>
            <ul className="bread-crumb clearfix">
              <li>
                <Link to="/departments">Departments</Link>
              </li>
              <li>
                <span>General Admin Department</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="departments-style-two faq-section alternat-2">
        <div className="auto-container">
          <div className="row clearfix">
            <div className="col-lg-9 col-md-12 col-sm-12 content-side">
              <div className="department-details-content">
                <div className="content-one dept_leyer_1">
                  <div className="title-box">
                    <h3>
                      General Meeting and Standing Committee Meeting Resolutions
                    </h3>
                    <hr />
                  </div>
                </div>
              </div>
              <div className="row clearfix">
                <div className="col-lg-1 col-md-1 col-sm-1 image-column">
                  <div className="image-box">
                    <figure className="image">
                      <img src="assets/images/resource/faq-1.jpg" alt="" />
                    </figure>
                  </div>
                </div>
                <div className="col-lg-11 col-md-11 col-sm-11 content-column">
                  <div className="content-box">
                    <ul className="accordion-box year-accordion-box">
                      {Object.entries(
                        data.reduce((acc, item) => {
                          const yearKey = item.year;
                          if (!acc[yearKey]) {
                            acc[yearKey] = {
                              generalMeetings: [],
                              standingCommitteeMeetings: [],
                            };
                          }
                          if (item.meetingtype === "General Meeting") {
                            acc[yearKey].generalMeetings.push(item.pdfheading);
                          } else if (
                            item.meetingtype === "Standing Committee Meeting"
                          ) {
                            acc[yearKey].standingCommitteeMeetings.push({
                              pdf: item.pdf,
                              pdfheading: item.pdfheading,
                            });
                          }

                          return acc;
                        }, {})
                      ).map(([year, yearData], index) => (
                        <li
                          key={index}
                          className={`accordion block ${
                            activeIndex === index ? "active-block" : ""
                          }`}
                        >
                          <div
                            className="acc-btn"
                            onClick={() => handleAccordionClick(index)}
                          >
                            <span className="count-text">{index + 1}</span>
                            <h3>{`Year ${year}`}</h3>
                          </div>
                          <div
                            className="acc-content"
                            style={{
                              display: activeIndex === index ? "block" : "none",
                            }}
                          >
                            <div className="row">
                              <div className="col-md-6">
                                <h5 className="pb-3 pl-5">General Meeting</h5>
                                <ul>
                                  {yearData.generalMeetings.map(
                                    (resolution, idx) => (
                                      <li key={idx}>
                                        <Link
                                          to={`${baseURL}/${resolution.pdf}`}
                                          target="_blank"
                                          rel="noreferrer"
                                        >
                                          {resolution.pdfheading}
                                        </Link>
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>
                              <div className="col-md-6">
                                <h5 className="pb-3 pl-5">
                                  Standing Committee Meeting Resolutions
                                </h5>
                                <ul>
                                  {yearData.standingCommitteeMeetings.map(
                                    (resolution, idx) => (
                                      <li key={idx}>
                                        <Link
                                          to={`${baseURL}/${resolution.pdf}`}
                                          target="_blank"
                                          rel="noreferrer"
                                        >
                                          {resolution.pdfheading}
                                        </Link>
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-12 col-sm-12 sidebar-side">
              <div className="department-sidebar">
                <div className="category-widget">
                  <div className="widget-content">
                    <ul className="category-list clearfix">
                      {departments.map((department, index) => (
                        <li key={index}>
                          {" "}
                          <Link
                            to={
                              department?.department_name ===
                              "General Admin Department"
                                ? "/general-admin-department"
                                : department?.department_name ===
                                  "Town Planning"
                                ? "/town-planning"
                                : `/${department?.department_name
                                    .toLowerCase()
                                    .replace(/\s+/g, "-")}`
                            }
                            state={{ id: department?.id }}
                          >
                            {department?.department_name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DeptLayer2;
