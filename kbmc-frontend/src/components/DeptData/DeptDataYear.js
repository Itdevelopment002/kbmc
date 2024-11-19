import React, { useState, useEffect } from "react";
import api, { baseURL } from "../api";
import innerBanner from "../../assets/images/banner/inner-banner.jpg";
import { Link, useLocation } from "react-router-dom";

const DeptDataYear = () => {
  const location = useLocation();
  const state = location.state || {};
  const { id } = state;
  const [activeIndex, setActiveIndex] = useState(null);
  const [data, setData] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);
  const [deptData, setDeptData] = useState([]);
  const [departmentName, setDepartmentName] = useState([]);

  const fetchDeptData = async () => {
    try {
      const response = await api.get("department-datas");
      const filteredData = response.data.filter(
        (item) => String(item.id) === String(id)
      );
      setDeptData(filteredData); // Set department data
    } catch (error) {
      console.error("Error fetching department data:", error);
    }
  };

  const fetchData = async () => {
    try {
      if (deptData.length === 0) return;
      const response = await api.get("/department-data-year");
      const filteredData = response.data.filter(
        (item) => item.department_id === deptData[0]?.id
      );
      setData(filteredData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchDepartmentData = async () => {
    try {
      const response = await api.get("public_disclosure");
      setDepartmentName(response.data);
      const filteredData = response.data.filter(
        (item) => String(item.id) === String(deptData[0]?.public_disclosure_id)
      );
      setDepartmentData(filteredData); // Set department data
    } catch (error) {
      console.error("Error fetching department data:", error);
    }
  };

  useEffect(() => {
    fetchDeptData(); // Fetch department data on initial render
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (deptData.length > 0) {
      fetchData(); // Fetch data only when deptData is available
      fetchDepartmentData();
    }
    // eslint-disable-next-line
  }, [deptData]);

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
                    <h3>{deptData[0]?.department_heading}</h3>
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
                            acc[yearKey] = [];
                          }
                          acc[yearKey].push({
                            pdf: item.pdf,
                            pdfheading: item.pdfheading,
                          });
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
                            <h3>{year}</h3>
                          </div>
                          <div
                            className="acc-content"
                            style={{
                              display: activeIndex === index ? "block" : "none",
                            }}
                          >
                            <div className="row">
                              <div className="col-md-6">
                                <ul>
                                  {yearData.map((resolution, idx) => (
                                    <li key={idx}>
                                      <Link
                                        to={`${baseURL}/${resolution.pdf}`}
                                        target="_blank"
                                        rel="noreferrer"
                                      >
                                        {resolution.pdfheading}
                                      </Link>
                                    </li>
                                  ))}
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
                      {departmentName.map((department, index) => (
                        <li key={index}>
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

export default DeptDataYear;
