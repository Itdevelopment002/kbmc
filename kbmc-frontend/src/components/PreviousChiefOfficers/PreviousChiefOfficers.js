import React from 'react';
import innerBanner from "../../assets/images/banner/inner-banner.jpg"

const PreviousChiefOfficers = () => {
  const chiefOfficers = [
    { name: "Mr. Maruti Gaikwad", tenure: "25.07.2024 – Present" },
    { name: "Mr. Yogesh Godse", tenure: "12.08.2021 – 24.07.2024" },
    { name: "Mr. Deepak Pujari", tenure: "12.05.2020 - 11.08.2021" },
    { name: "Mr. Prakash N. Borse", tenure: "03.07.2017 - 12.05.2020" },
    { name: "Mr. D.G. Pawar", tenure: "12.12.2014 - 03.07.2017" },
    { name: "Mr. Amit Sanap", tenure: "13.11.2014 - 12.12.2014" },
    { name: "Mr. Jameer Lengarekar", tenure: "27.10.2014 – 07.11.2014" },
    { name: "Mr. Amit Sanap", tenure: "01.10.2014 - 27.10.2014" },
    { name: "Mr. Rajesh D. Kande", tenure: "12.08.2013 - 08.10.2014" },
    { name: "Mr. Bhalchandra Gosavi", tenure: "10.07.2013 - 11.08.2013" },
    { name: "Mr. Bha. V. Gosavi", tenure: "17.08.2010 - 08.07.2013" },
    { name: "Mr. S.S. Dhupate", tenure: "18.06.2008 - 17.08.2010" },
    { name: "Mr. Prakash N. Borse", tenure: "07.07.2005 – 18.06.2008" },
    { name: "Mr. Bhalchandra Gosavi", tenure: "09.06.2003 – 07.07.2005" },
    { name: "Mr. Milind Savant", tenure: "31.05.2003 - 09.06.2003" },
    { name: "Mr. Shridhar Patankar", tenure: "28.04.2003 - 31.05.2003" },
    { name: "Mr. Milind Savant", tenure: "17.07.2001 - 28.04.2003" },
    { name: "Mr. M.V. Shelke", tenure: "03.07.2000 - 04.07.2001" },
    { name: "Mr. Y.D. Kulkarni", tenure: "23.06.2000 - 03.07.2000" },
    { name: "Mr. Milind Vani", tenure: "17.06.2000 - 23.06.2000" },
    { name: "Mr. M.V. Shelke", tenure: "24.02.2000 - 17.06.2000" },
    { name: "Mr. Y.D. Kulkarni", tenure: "10.02.2000 - 24.02.2000" },
    { name: "Mr. M.V. Shelke", tenure: "29.12.99 - 09.02.2000" },
    { name: "Mr. Purushottam Vidhwans", tenure: "24.12.99 - 29.12.1999" },
    { name: "Mr. Sapant Rao Shinde", tenure: "22.10.99 - 24.12.1999" },
    { name: "Mr. Shridhar Patankar", tenure: "13.10.99 - 21.10.1999" },
    { name: "Mr. S.M. Lokhande", tenure: "23.07.99 - 13.10.1999" },
    { name: "Mr. Shridhar Patankar", tenure: "29.06.99 - 23.07.1999" },
    { name: "Mr. Bhalchandra Gosavi", tenure: "19.7.98 - 29.06.1999" },
    { name: "Mr. Sanjay Ahire", tenure: "02.07.98 - 19.07.1998" },
    { name: "Mr. Ashok Bageshwar", tenure: "21.6.96 - 02.07.1998" },
    { name: "Mr. V. C. Nandgaonkar", tenure: "05.12.94 - 04.11.1995" },
    { name: "Mr. D. M. Pawar", tenure: "14.02.94 - 5.12.1994" },
    { name: "Mr. Ra. Da. Shinde", tenure: "19.01.94 - 13.02.1994" },
    { name: "Mr. Narendra Ashtikar", tenure: "10.06.92 - 18.01.1994" }
  ];

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
                    {chiefOfficers.map((officer, index) => (
                      <div className="col-lg-3 col-md-6 col-sm-12 single-column" key={index}>
                        <div className="single-item">
                          <h3><a href="#.">{officer.name}</a></h3>
                          <h6>{officer.tenure}</h6>
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
              <li><a href="#."><i className="flaticon-right-chevron"></i></a></li>
              <li><a href="#." className="current">1</a></li>
              <li><a href="#.">2</a></li>
              <li><a href="#.">3</a></li>
              <li><a href="#."><i className="flaticon-right-chevron"></i></a></li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PreviousChiefOfficers;
