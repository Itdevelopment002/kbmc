import React from "react";
import innerBanner from "../../assets/images/banner/inner-banner.jpg";

const AccountDepartment = () => {
  return (
    <>
      <section className="page-title ">
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
            <h1>Account Department</h1>
            <ul className="bread-crumb clearfix">
              <li>
                <a href="/departments">Departments</a>
              </li>
              <li>
                <span>Account Department</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <br />
      <section className="departments-style-two alternat-2">
        <div className="auto-container">
          <div className="row clearfix">
            <div className="col-lg-9 col-md-12 col-sm-12 content-side">
              <div className="department-details-content">
                <div className="content-one dept_leyer_1">
                  <div className="title-box">
                    <h3>Account Department</h3>
                    <hr />
                  </div>
                  <ul>
                    <li>
                      <a href="#.">Heading 1</a>
                    </li>
                    <li>
                      <a href="#.">Heading 2</a>
                    </li>
                    <li>
                      <a href="#.">Heading 3</a>
                    </li>
                    <li>
                      <a href="#.">Heading 4</a>
                    </li>
                    <li>
                      <a href="#.">Heading 5</a>
                    </li>
                  </ul>
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
    </>
  );
};

export default AccountDepartment;
