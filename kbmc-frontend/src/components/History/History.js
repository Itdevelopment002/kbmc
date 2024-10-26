import React from 'react';
import ceo from '../../assets/images/about/ceo.jpg';
import banner from '../../assets/images/banner/inner-banner.jpg';
import './History.css'

const History = () => {
  return (
    <>
      <section className="page-title">
        <div className="bg-layer" style={{ backgroundImage: `url(${banner})` }}></div>
        <div className="line-box">
          <div className="line-1"></div>
          <div className="line-2"></div>
        </div>
        <div className="auto-container">
          <div className="content-box">
            <h1>History</h1>
            <ul className="bread-crumb clearfix">
              <li><a href="/">Home</a></li>
              <li><span>History</span></li>
            </ul>
          </div>
        </div>
      </section>
      <br/>

      <section className="about-style-three history-content white-bg mt-5">
        <div className="auto-container">
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 content-column">
              <div className="content-box">
                <div className="text-box">
                  <h3 className="pb-3">Welcome to Kulgaon Badlapur Municipal Council.</h3>
                  <p>
                    Kulgaon Badlapur city is just 55 km east from Mumbai. is sitting at a distance. 
                    Naturally Badlapur city is famous for its human friendly environment, clean water, 
                    pollution free environment etc. Due to this, thousands of families have migrated 
                    from Mumbai to Badlapur. Another main reason is that due to the planned development 
                    brought about by Badlapur Municipal Council, the name of Badlapur Municipal Council 
                    is being taken with great respect today. Various projects implemented by the municipal 
                    council for the service of the citizens and to maintain the balance of nature have 
                    been honored by the President of the country. All his credit goes to the first citizen 
                    of the city Hon. Mayor, Mr. The chief officer, all the members of the party have 
                    unitedly cooperated for the development of the city and the support given by the citizens 
                    of the city.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="team-section sec-pad member-section">
        <div className="auto-container">
          <div className="row clearfix">
            <div className="col-lg-3 col-md-6 col-sm-12 team-block">
              <div className="team-block-one wow fadeInUp animated" data-wow-delay="00ms" data-wow-duration="1500ms" style={{ visibility: 'visible', animationDuration: '1500ms', animationDelay: '0ms', animationName: 'fadeInUp' }}>
                <div className="inner-box">
                  <figure className="image-box">
                    <img src={ceo} alt="ceo-img" />
                  </figure>
                  <div className="share-box">
                    <span className="share-text"><i class="flaticon-sharing"></i>Share</span>
                    <ul className="share-links">
                      <li><a href="#."><span className="fab fa-facebook-square"></span></a></li>
                      <li><a href="#."><span className="fab fa-twitter-square"></span></a></li>
                      <li><a href="#."><span className="fab fa-instagram-square"></span></a></li>
                    </ul>
                  </div>
                  <h3><a href="#.">Maruti Gaikwad</a></h3>
                  <span className="designation">Chief Officer</span>
                  <p><a href="mailto:support@kbmc.gov.in">support@kbmc.gov.in</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default History;
