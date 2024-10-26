import React, { useEffect } from "react";
import GLightbox from "glightbox";
import "glightbox/dist/css/glightbox.min.css";
import innerBanner from "../../assets/images/banner/inner-banner.jpg";
import img1 from "../../assets/images/town-planning/BADLAPUR-D-all-dp.jpg";
import img2 from "../../assets/images/town-planning/01-Mankivali.jpg";
import img3 from "../../assets/images/town-planning/02-Badlapur-1.jpg";
import img4 from "../../assets/images/town-planning/03-Katrap.jpg";
import img5 from "../../assets/images/town-planning/04-Joveli.jpg";
import img6 from "../../assets/images/town-planning/05-Yernzad.jpg"
import img7 from "../../assets/images/town-planning/06-Badlapur-2.jpg"
import img8 from "../../assets/images/town-planning/07-Valivli.jpg"
import img9 from "../../assets/images/town-planning/08-Belavali.jpg"
import img10 from "../../assets/images/town-planning/09-Manjarli.jpg"
import img11 from "../../assets/images/town-planning/10-Sonivali.jpg";
import img12 from "../../assets/images/town-planning/11-Kharvai.jpg";
import img13 from "../../assets/images/town-planning/12-Shirgaon-2.jpg";
import img14 from "../../assets/images/town-planning/13-Shirgaon-02.jpg";
import img15 from "../../assets/images/town-planning/14-Kulgaon.jpg";
import pdf1 from "../../assets/images/town-planning/pdf/BADLAPUR-D-all-dp.pdf";
import pdf2 from "../../assets/images/town-planning/pdf/01-Mankivali.pdf";
import pdf3 from "../../assets/images/town-planning/pdf/02-Badlapur-1.pdf";
import pdf4 from "../../assets/images/town-planning/pdf/03-Katrap.pdf";
import pdf5 from "../../assets/images/town-planning/pdf/04-Joveli.pdf";
import pdf6 from "../../assets/images/town-planning/pdf/05-Yernzad.pdf"
import pdf7 from "../../assets/images/town-planning/pdf/06-Badlapur-2.pdf"
import pdf8 from "../../assets/images/town-planning/pdf/07-Valivli.pdf"
import pdf9 from "../../assets/images/town-planning/pdf/08-Belavali.pdf"
import pdf10 from "../../assets/images/town-planning/pdf/09-Manjarli.pdf"
import pdf11 from "../../assets/images/town-planning/pdf/10-Sonivali.pdf";
import pdf12 from "../../assets/images/town-planning/pdf/11-Kharvai.pdf";
import pdf13 from "../../assets/images/town-planning/pdf/12-Shirgaon-2.pdf";
import pdf14 from "../../assets/images/town-planning/pdf/13-Shirgaon-02.pdf";
import pdf15 from "../../assets/images/town-planning/pdf/14-Kulgaon.pdf";

const TownPlanning = () => {
  useEffect(() => {
    const lightbox = GLightbox({
      selector: ".glightbox",
      touchNavigation: true,
      loop: true,
      zoomable: true,
    });

    return () => {
      lightbox.destroy();
    };
  }, []);

  return (
    <div>
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
            <h1>Town Planning Department</h1>
            <ul className="bread-crumb clearfix">
              <li>
                <a href="/departments">Departments</a>
              </li>
              <li>
                <span>Town Planning Department</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <br />
      <section className="departments-style-two alternat-2" id="town-planning">
        <div className="auto-container">
          <div className="row clearfix">
            <div className="col-lg-9 col-md-12 col-sm-12 content-side">
              <div className="department-details-content">
                <div className="content-one">
                  <div className="title-box">
                    <h3>Town Planning Department</h3>
                  </div>
                  <div className="text-box">
                    <p>
                      The Urban Planning Department is responsible for creating
                      land use policies, zoning regulations, and development
                      plans to ensure organized and sustainable growth of the
                      city or town. This department plays a crucial role in
                      shaping the future growth and development of urban areas.
                      They work on creating plans and policies that promote
                      sustainable, well-organized, and comprehensive growth,
                      while also taking into consideration the environment and
                      community interests. Typically, this department consists
                      of urban planners, landscape architects, engineers, and
                      other professionals who collaborate to develop
                      comprehensive plans for the future development of the
                      community.
                    </p>
                  </div>
                </div>
                <br />
                <div className="content-box">
                  <div className="row">
                    <div className="col-lg-3 town_plan">
                      <a
                        href={img1}
                        data-toggle="lightbox"
                        data-gallery="example-gallery"
                        className=""
                      >
                        <img
                          src={img1}
                          alt=""
                          className="img-fluid"
                        />
                        <h6 className="text-center">Badlapur</h6>
                      </a>
                      <div className="pdf-dwnl">
                        <a
                          href={pdf1}
                          download
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="fa fa-download"></i>
                        </a>
                      </div>
                    </div>
                    <div className="col-lg-3 town_plan">
                      <a
                        href={img2}
                        data-toggle="lightbox"
                        data-gallery="example-gallery"
                        className=""
                      >
                        <img
                          src={img2}
                          alt=""
                          className="img-fluid"
                        />
                        <h6 className="text-center">Mankivali</h6>
                      </a>
                      <div className="pdf-dwnl">
                        <a
                          href={pdf2}
                          download
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="fa fa-download"></i>
                        </a>
                      </div>
                    </div>
                    <div className="col-lg-3 town_plan">
                      <a
                        href={img3}
                        data-toggle="lightbox"
                        data-gallery="example-gallery"
                        className="col-sm-3"
                      >
                        <img
                          src={img3}
                          alt=""
                          className="img-fluid"
                        />
                        <h6 className="text-center">Badlapur</h6>
                      </a>
                      <div className="pdf-dwnl">
                        <a
                          href={pdf3}
                          download
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="fa fa-download"></i>
                        </a>
                      </div>
                    </div>
                    <div className="col-lg-3 town_plan">
                      <a
                        href={img4}
                        data-toggle="lightbox"
                        data-gallery="example-gallery"
                        className="col-sm-3"
                      >
                        <img
                          src={img4}
                          alt=""
                          className="img-fluid"
                        />
                        <h6 className="text-center">Katrap</h6>
                      </a>
                      <div className="pdf-dwnl">
                        <a
                          href={pdf4}
                          download
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="fa fa-download"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-3 town_plan">
                      <a
                        href={img5}
                        data-toggle="lightbox"
                        data-gallery="example-gallery"
                        className="col-sm-3"
                      >
                        <img
                          src={img5}
                          alt=""
                          className="img-fluid"
                        />
                        <h6 className="text-center">Joveli</h6>
                      </a>
                      <div className="pdf-dwnl">
                        <a
                          href={pdf5}
                          download
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="fa fa-download"></i>
                        </a>
                      </div>
                    </div>
                    <div className="col-lg-3 town_plan">
                      <a
                        href={img6}
                        data-toggle="lightbox"
                        data-gallery="example-gallery"
                        className="col-sm-3"
                      >
                        <img
                          src={img6}
                          alt=""
                          className="img-fluid"
                        />
                        <h6 className="text-center">Yernzad</h6>
                      </a>
                      <div className="pdf-dwnl">
                        <a
                          href={pdf6}
                          download
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="fa fa-download"></i>
                        </a>
                      </div>
                    </div>
                    <div className="col-lg-3 town_plan">
                      <a
                        href={img7}
                        data-toggle="lightbox"
                        data-gallery="example-gallery"
                        className="col-sm-3"
                      >
                        <img
                          src={img7}
                          alt=""
                          className="img-fluid"
                        />
                        <h6 className="text-center">Badlapur</h6>
                      </a>
                      <div className="pdf-dwnl">
                        <a
                          href={pdf7}
                          download
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="fa fa-download"></i>
                        </a>
                      </div>
                    </div>
                    <div className="col-lg-3 town_plan">
                      <a
                        href={img8}
                        data-toggle="lightbox"
                        data-gallery="example-gallery"
                        className="col-sm-3"
                      >
                        <img
                          src={img8}
                          alt=""
                          className="img-fluid"
                        />
                        <h6 className="text-center">Valivli</h6>
                      </a>
                      <div className="pdf-dwnl">
                        <a
                          href={pdf8}
                          download
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="fa fa-download"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-3 town_plan">
                      <a
                        href={img9}
                        data-toggle="lightbox"
                        data-gallery="example-gallery"
                        className="col-sm-3"
                      >
                        <img
                          src={img9}
                          alt=""
                          className="img-fluid"
                        />
                        <h6 className="text-center">Belavali</h6>
                      </a>
                      <div className="pdf-dwnl">
                        <a
                          href={pdf9}
                          download
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="fa fa-download"></i>
                        </a>
                      </div>
                    </div>
                    <div className="col-lg-3 town_plan">
                      <a
                        href={img10}
                        data-toggle="lightbox"
                        data-gallery="example-gallery"
                        className="col-sm-3"
                      >
                        <img
                          src={img10}
                          alt=""
                          className="img-fluid"
                        />
                        <h6 className="text-center">Manjarli</h6>
                      </a>
                      <div className="pdf-dwnl">
                        <a
                          href={pdf10}
                          download
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="fa fa-download"></i>
                        </a>
                      </div>
                    </div>
                    <div className="col-lg-3 town_plan">
                      <a
                        href={img11}
                        data-toggle="lightbox"
                        data-gallery="example-gallery"
                        className="col-sm-3"
                      >
                        <img
                          src={img11}
                          alt=""
                          className="img-fluid"
                        />
                        <h6 className="text-center">Sonivali</h6>
                      </a>
                      <div className="pdf-dwnl">
                        <a
                          href={pdf11}
                          download
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="fa fa-download"></i>
                        </a>
                      </div>
                    </div>
                    <div className="col-lg-3 town_plan">
                      <a
                        href={img12}
                        data-toggle="lightbox"
                        data-gallery="example-gallery"
                        className="col-sm-3"
                      >
                        <img
                          src={img12}
                          alt=""
                          className="img-fluid"
                        />
                        <h6 className="text-center">Kharvai</h6>
                      </a>
                      <div className="pdf-dwnl">
                        <a
                          href={pdf12}
                          download
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="fa fa-download"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-3 town_plan">
                      <a
                        href={img13}
                        data-toggle="lightbox"
                        data-gallery="example-gallery"
                        className="col-sm-3"
                      >
                        <img
                          src={img13}
                          alt=""
                          className="img-fluid"
                        />
                        <h6 className="text-center">Shirgaon</h6>
                      </a>
                      <div className="pdf-dwnl">
                        <a
                          href={pdf13}
                          download
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="fa fa-download"></i>
                        </a>
                      </div>
                    </div>
                    <div className="col-lg-3 town_plan">
                      <a
                        href={img14}
                        data-toggle="lightbox"
                        data-gallery="example-gallery"
                        className="col-sm-3"
                      >
                        <img
                          src={img14}
                          alt=""
                          className="img-fluid"
                        />
                        <h6 className="text-center">Shirgaon</h6>
                      </a>
                      <div className="pdf-dwnl">
                        <a
                          href={pdf14}
                          download
                          target="_blank"
                          rel="noreferrer"
                        >
                          <i className="fa fa-download"></i>
                        </a>
                      </div>
                    </div>
                    <div className="col-lg-3 town_plan">
                      <a
                        href={img15}
                        data-toggle="lightbox"
                        data-gallery="example-gallery"
                        className="col-sm-3"
                      >
                        <img
                          src={img15}
                          alt=""
                          className="img-fluid"
                        />
                        <h6 className="text-center">Kulgaon</h6>
                      </a>
                      <div className="pdf-dwnl">
                        <a
                          href={pdf15}
                          download
                          target="_blank" 
                          rel="noreferrer"
                        >
                          <i className="fa fa-download"></i>
                        </a>
                      </div>
                    </div>
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
                        <a href="/general-admin-dept">
                          General Admin Department
                        </a>
                      </li>
                      <li>
                        {" "}
                        <a href="/audit-dept">Audit Department</a>
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
                        <a href="/income-dept">Milkat (Income)</a>
                      </li>
                      <li>
                        {" "}
                        <a href="/egovernance-dept">E-Governance Department</a>
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
                        <a href="/advertisement-dept">
                          Advertisement Department
                        </a>
                      </li>
                      <li>
                        {" "}
                        <a href="/education-department">Education Department</a>
                      </li>
                      <li>
                        {" "}
                        <a href="/#">Security Department</a>
                      </li>
                      <li>
                        {" "}
                        <a href="/vehicle-dept">Vehicle Department</a>
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
                        <a href="/legal-dept">Legal Department</a>
                      </li>
                      <li>
                        {" "}
                        <a href="/disability-welfare-dept">
                          Disability Welfare
                        </a>
                      </li>
                      <li>
                        {" "}
                        <a href="/#">Store &amp; Records Department</a>
                      </li>
                      <li>
                        {" "}
                        <a href="/#">Marriage Registration</a>
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

export default TownPlanning;
