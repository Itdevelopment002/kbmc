import React, {useEffect, useState} from 'react';
import innerBanner from "../../assets/images/banner/inner-banner.jpg"
import api from "../api";

const PreviousChiefOfficers = () => {
  const [chiefs, setChiefs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const fetchChiefs = async () => {
    try {
      const response = await api.get("/chief-officers");
      setChiefs(response.data);
    } catch (error) {
      console.error("Error fetching previous president data");
    }
  };

  useEffect(() => {
    fetchChiefs();
  }, []);

  // Calculate total pages
  const totalPages = Math.ceil(chiefs.length / itemsPerPage);

  // Get current page departments
  const currentChiefs = chiefs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0"); // Ensure two-digit day
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();
    return `${day}.${month}.${year}`; // Format as DD.MM.YYYY
  };

  return (
    <div>
      <section className="page-title">
        <div className="bg-layer" style={{ backgroundImage: `url(${innerBanner})` }}></div>
        <div className="line-box">
          <div className="line-1"></div>
          <div className="line-2"></div>
        </div>
        <div className="auto-container">
          <div className="content-box">
            <h1>Previous Chief Officers of the Council</h1>
            <ul className="bread-crumb clearfix">
              <li><a href="/">Home</a></li>
              <li><span>Previous Chief Officers of the Council</span></li>
            </ul>
          </div>
        </div>
      </section>
      
      <br/>

      <section className="event-details mt-5">
        <div className="auto-container">
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 content-side">
              <div className="event-details-content">
                <div className="content-three">
                  <div className="row clearfix">
                    {currentChiefs.map((chief, index) => (
                      <div className="col-lg-3 col-md-6 col-sm-12 single-column" key={index}>
                        <div className="single-item">
                          <h3><a href="#.">{chief.officer_name}</a></h3>
                          <h6>{formatDate(chief.start_date)} - {formatDate(chief.end_date)}</h6>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="pagination-wrapper centred">
          <ul className="pagination clearfix">
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) setCurrentPage(currentPage - 1);
                }}
                className={currentPage === 1 ? "disabled" : ""}
              >
                <i className="flaticon-right-chevron"></i>
              </a>
            </li>
            {Array.from({ length: totalPages }, (_, i) => (
              <li key={i}>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(i + 1);
                  }}
                  className={currentPage === i + 1 ? "current" : ""}
                >
                  {i + 1}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                }}
                className={currentPage === totalPages ? "disabled" : ""}
              >
                <i className="flaticon-right-chevron"></i>
              </a>
            </li>
          </ul>
        </div>
        </div>
      </section>
    </div>
  );
};

export default PreviousChiefOfficers;
