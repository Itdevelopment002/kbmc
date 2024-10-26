import React, { useState } from "react";
import innerBanner from "../../assets/images/banner/inner-banner.jpg";
import pdf1 from "../../assets/documents/general_admin_deprt/year-2021-22/01_Prashaskiy Tharav April - 2021.pdf"
import pdf2 from "../../assets/documents/general_admin_deprt/year-2021-22/02_Prashaskiy Tharav May - 2021.pdf"
import pdf3 from "../../assets/documents/general_admin_deprt/year-2021-22/03_Prashaskiy Tharav June - 2021.pdf"
import pdf4 from "../../assets/documents/general_admin_deprt/year-2021-22/04_Prashaskiy Tharav July - 2021.pdf"
import pdf5 from "../../assets/documents/general_admin_deprt/year-2021-22/05_Prashaskiy Tharav Aug - 2021.pdf"
import pdf6 from "../../assets/documents/general_admin_deprt/year-2021-22/06_Prashaskiy Tharav Sept - 2021.pdf"
import pdf7 from "../../assets/documents/general_admin_deprt/year-2021-22/07_Prashaskiy Tharav Oct - 2021.pdf"
import pdf8 from "../../assets/documents/general_admin_deprt/year-2021-22/08_Prashaskiy Tharav Nov - 2021.pdf"
import pdf9 from "../../assets/documents/general_admin_deprt/year-2021-22/09_Prashaskiy Tharav Dec - 2021.pdf"
import pdf10 from "../../assets/documents/general_admin_deprt/year-2021-22/10_Prashaskiy Tharav Jan - 2022.pdf"
import pdf11 from "../../assets/documents/general_admin_deprt/year-2021-22/11_Prashaskiy Tharav Feb - 2022.pdf"
import pdf12 from "../../assets/documents/general_admin_deprt/year-2021-22/12_Prashaskiy Tharav Mar - 2022.pdf"
import pdf13 from "../../assets/documents/general_admin_deprt/year-2022-23/01_Prashaskiy Tharav April - 2022.pdf"
import pdf14 from "../../assets/documents/general_admin_deprt/year-2022-23/02_Prashaskiy Tharav May - 2022.pdf"
import pdf15 from "../../assets/documents/general_admin_deprt/year-2022-23/03_Prashaskiy Tharav June - 2022.pdf"
import pdf16 from "../../assets/documents/general_admin_deprt/year-2022-23/04_Prashaskiy Tharav July - 2022.pdf"
import pdf17 from "../../assets/documents/general_admin_deprt/year-2022-23/05_Prashaskiy Tharav Aug - 2022.pdf"
import pdf18 from "../../assets/documents/general_admin_deprt/year-2022-23/06_Prashaskiy Tharav Sept - 2022.pdf"
import pdf19 from "../../assets/documents/general_admin_deprt/year-2022-23/07_Prashaskiy Tharav Oct - 2022.pdf"
import pdf20 from "../../assets/documents/general_admin_deprt/year-2022-23/08_Prashaskiy Tharav Nov - 2022.pdf"
import pdf21 from "../../assets/documents/general_admin_deprt/year-2022-23/09_Prashaskiy Tharav Dec - 2022.pdf"
import pdf22 from "../../assets/documents/general_admin_deprt/year-2022-23/10_Prashaskiy Tharav Jan - 2023.pdf"
import pdf23 from "../../assets/documents/general_admin_deprt/year-2022-23/11_Prashaskiy Tharav Feb - 2023.pdf"
import pdf24 from "../../assets/documents/general_admin_deprt/year-2022-23/12_Prashaskiy Tharav Mar - 2023.pdf"
import pdf25 from "../../assets/documents/general_admin_deprt/year-2023-24/01_Prashaskiy Tharav April - 2023.pdf"
import pdf26 from "../../assets/documents/general_admin_deprt/year-2023-24/02_Prashaskiy Tharav May - 2023.pdf"
import pdf27 from "../../assets/documents/general_admin_deprt/year-2023-24/03_Prashaskiy Tharav June - 2023.pdf"
import pdf28 from "../../assets/documents/general_admin_deprt/year-2023-24/04_Prashaskiy Tharav July - 2023.pdf"
import pdf29 from "../../assets/documents/general_admin_deprt/year-2023-24/05_Prashaskiy Tharav Aug - 2023.pdf"
import pdf30 from "../../assets/documents/general_admin_deprt/year-2023-24/06_Prashaskiy Tharav Sapt - 2023.pdf"
import pdf31 from "../../assets/documents/general_admin_deprt/year-2023-24/07_Prashaskiy Tharav Oct - 2023.pdf"
import pdf32 from "../../assets/documents/general_admin_deprt/year-2023-24/08_Prashaskiy Tharav Nov -2023.pdf"
import pdf33 from "../../assets/documents/general_admin_deprt/year-2023-24/09_Prashaskiy Tharav Dec - 2023.pdf"
import pdf34 from "../../assets/documents/general_admin_deprt/year-2023-24/10_Prashaskiy Tharav Jan - 2024.pdf"


const DeptLayer2 = () => {
  const [activeIndex, setActiveIndex] = useState(null); // State to track the active accordion

  // Function to handle the click event on an accordion
  const handleAccordionClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index); // Toggle active accordion
  };

  return (
    <div>
      <section className="page-title ">
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
                <a href="/departments">Departments</a>
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
                      {/* First Accordion */}
                      <li className={`accordion block ${activeIndex === 0 ? 'active-block' : ''}`}>
                        <div className="acc-btn" onClick={() => handleAccordionClick(0)}>
                          <span className="count-text">01</span>
                          <h3>Year 2021 - 2022</h3>
                        </div>
                        <div className="acc-content" style={{ display: activeIndex === 0 ? 'block' : 'none' }}>
                          <div className="row">
                            <div className="col-md-6">
                              <h5 className="pb-3 pl-5">General Meeting</h5>
                              <ul></ul>
                            </div>
                            <div className="col-md-6">
                              <h5 className="pb-3 pl-5">
                                Standing Committee Meeting Resolutions
                              </h5>
                              <ul>
                                <li>
                                  <a
                                    href={pdf1}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    Prashaskiy Tharav April 2021
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href={pdf2}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    Prashaskiy Tharav May 2021
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href={pdf3}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    Prashaskiy Tharav June 2021
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href={pdf4}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    Prashaskiy Tharav July 2021
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href={pdf5}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    Prashaskiy Tharav August 2021
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href={pdf6}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    Prashaskiy Tharav September 2021
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href={pdf7}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    Prashaskiy Tharav October 2021
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href={pdf8}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    Prashaskiy Tharav November 2021
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href={pdf9}
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    Prashaskiy Tharav December 2021
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href={pdf10}
                                    target="_blank" rel="noreferrer"
                                  >
                                    Prashaskiy Tharav January 2022
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href={pdf11}
                                    target="_blank" rel="noreferrer"
                                  >
                                    Prashaskiy Tharav February 2022
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href={pdf12}
                                    target="_blank" rel="noreferrer"
                                  >
                                    Prashaskiy Tharav March 2022
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className={`accordion block ${activeIndex === 1 ? 'active-block' : ''}`}>
                        <div className="acc-btn" onClick={() => handleAccordionClick(1)}>
                          <span className="count-text">02</span>
                          <h3>Year 2022 - 2023</h3>
                        </div>
                        <div className="acc-content" style={{ display: activeIndex === 1 ? 'block' : 'none' }}>
                          <div className="row">
                            <div className="col-md-6">
                              <h5 className="pb-3 pl-5">General Meeting</h5>
                              <ul></ul>
                            </div>
                            <div className="col-md-6">
                              <h5 className="pb-3 pl-5">
                                Standing Committee Meeting Resolutions
                              </h5>
                              <ul>
                                <li>
                                  <a
                                    href={pdf13}
                                    target="_blank" rel="noreferrer"
                                  >
                                    Prashaskiy Tharav April 2022
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href={pdf14}
                                    target="_blank" rel="noreferrer"
                                  >
                                    Prashaskiy Tharav May 2022
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href={pdf15}
                                    target="_blank" rel="noreferrer"
                                  >
                                    Prashaskiy Tharav June 2022
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href={pdf16}
                                    target="_blank" rel="noreferrer"
                                  >
                                    Prashaskiy Tharav July 2022
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href={pdf17}
                                    target="_blank" rel="noreferrer"
                                  >
                                    Prashaskiy Tharav August 2022
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href={pdf18}
                                    target="_blank" rel="noreferrer"
                                  >
                                    Prashaskiy Tharav September 2022
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href={pdf19}
                                    target="_blank" rel="noreferrer"
                                  >
                                    Prashaskiy Tharav October 2022
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href={pdf20}
                                    target="_blank" rel="noreferrer"
                                  >
                                    Prashaskiy Tharav November 2022
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href={pdf21}
                                    target="_blank" rel="noreferrer"
                                  >
                                    Prashaskiy Tharav December 2022
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href={pdf22}
                                    target="_blank" rel="noreferrer"
                                  >
                                    Prashaskiy Tharav January 2023
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href={pdf23}
                                    target="_blank" rel="noreferrer"
                                  >
                                    Prashaskiy Tharav February 2023
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href={pdf24}
                                    target="_blank" rel="noreferrer"
                                  >
                                    Prashaskiy Tharav March 2023
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className={`accordion block ${activeIndex === 2 ? 'active-block' : ''}`}>
                        <div className="acc-btn" onClick={() => handleAccordionClick(2)}>
                          <span className="count-text">03</span>
                          <h3>Year 2023 - 2024</h3>
                        </div>
                        <div className="acc-content" style={{ display: activeIndex === 2 ? 'block' : 'none' }}>
                          <div className="row">
                            <div className="col-md-6">
                              <h5 className="pb-3 pl-5">General Meeting</h5>
                              <ul>
                              </ul>
                            </div>
                            <div className="col-md-6">
                              <h5 className="pb-3 pl-5">
                                Standing Committee Meeting Resolutions
                              </h5>
                              <ul>
                                <li>
                                  <a
                                    href={pdf25}
                                    target="_blank" rel="noreferrer"
                                  >
                                    Prashaskiy Tharav April 2023
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href={pdf26}
                                    target="_blank" rel="noreferrer"
                                  >
                                    Prashaskiy Tharav May 2023
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href={pdf27}
                                    target="_blank" rel="noreferrer"
                                  >
                                    Prashaskiy Tharav June 2023
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href={pdf28}
                                    target="_blank" rel="noreferrer"
                                  >
                                    Prashaskiy Tharav July 2023
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href={pdf29}
                                    target="_blank" rel="noreferrer"
                                  >
                                    Prashaskiy Tharav August 2023
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href={pdf30}
                                    target="_blank" rel="noreferrer"
                                  >
                                    Prashaskiy Tharav September 2023
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href={pdf31}
                                    target="_blank" rel="noreferrer"
                                  >
                                    Prashaskiy Tharav October 2023
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href={pdf32}
                                    target="_blank" rel="noreferrer"
                                  >
                                    Prashaskiy Tharav November 2023
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href={pdf33}
                                    target="_blank" rel="noreferrer"
                                  >
                                    Prashaskiy Tharav December 2023
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href={pdf34}
                                    target="_blank" rel="noreferrer"
                                  >
                                    Prashaskiy Tharav January 2024
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </li>
                      <li className={`accordion block ${activeIndex === 3 ? 'active-block' : ''}`}>
                        <div className="acc-btn" onClick={() => handleAccordionClick(3)}>
                          <span className="count-text">04</span>
                          <h3>Year 2024 - 2025</h3>
                        </div>
                        <div className="acc-content" style={{ display: activeIndex === 3 ? 'block' : 'none' }}>
                          <div className="row">
                            <div className="col-md-6">
                              <h5 className="pb-3 pl-5">General Meeting</h5>
                              <ul></ul>
                            </div>
                            <div className="col-md-6">
                              <h5 className="pb-3 pl-5">
                                Standing Committee Meeting Resolutions
                              </h5>
                              <ul></ul>
                            </div>
                          </div>
                        </div>
                      </li>
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
                      <li>
                        {" "}
                        <a href="/general-admin-department">
                          General Admin Department
                        </a>
                      </li>
                      <li>
                        {" "}
                        <a href="/audit-department">Audit Department</a>
                      </li>
                      <li>
                        {" "}
                        <a href="/tax-department">Tax Department</a>
                      </li>
                      <li>
                        {" "}
                        <a href="/account-department">Account Department</a>
                      </li>
                      <li>
                        {" "}
                        <a href="/town-planning">Town Planning</a>
                      </li>
                      <li>
                        {" "}
                        <a href="/electrical-department">
                          Electrical Department
                        </a>
                      </li>
                      <li>
                        {" "}
                        <a href="/public-work-department">
                          Public Work Department (PWD)
                        </a>
                      </li>
                      <li>
                        {" "}
                        <a href="/income-department">Milkat (Income)</a>
                      </li>
                      <li>
                        {" "}
                        <a href="/egovernance-department">
                          E-Governance Department
                        </a>
                      </li>
                      <li>
                        {" "}
                        <a href="/health-department">Health Department</a>
                      </li>
                      <li>
                        {" "}
                        <a href="/wcd">WCD (Women and Child Development)</a>
                      </li>
                      <li>
                        {" "}
                        <a href="/advertisement-department">
                          Advertisement Department
                        </a>
                      </li>
                      <li>
                        {" "}
                        <a href="/education-department">Education Department</a>
                      </li>
                      <li>
                        {" "}
                        <a href="#.">Security Department</a>
                      </li>
                      <li>
                        {" "}
                        <a href="/vehicle-department">Vehicle Department</a>
                      </li>
                      <li>
                        {" "}
                        <a href="/nulm-department">NULM Department</a>
                      </li>
                      <li>
                        {" "}
                        <a href="/hospital-department">Hospital Department</a>
                      </li>
                      <li>
                        {" "}
                        <a href="/fire-department">Fire Department</a>
                      </li>
                      <li>
                        {" "}
                        <a href="/legal-department">Legal Department</a>
                      </li>
                      <li>
                        {" "}
                        <a href="/disability-welfare-department">
                          Disability Welfare
                        </a>
                      </li>
                      <li>
                        {" "}
                        <a href="#.">Store &amp; Records Department</a>
                      </li>
                      <li>
                        {" "}
                        <a href="#.">Marriage Registration</a>
                      </li>
                      <li>
                        {" "}
                        <a href="/birth-death-department">
                          Birth &amp; Death Department
                        </a>
                      </li>
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
