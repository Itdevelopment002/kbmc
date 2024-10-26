import React from 'react';
import './Awards.css'
import bannerImage from '../../assets/images/banner/inner-banner.jpg'; 
import awardImage1 from '../../assets/images/awards/img1.jpg';
import awardImage2 from '../../assets/images/awards/img2.jpg';

const Awards = () => {
  return (
    <div>
      <section className="page-title">
        <div className="bg-layer" style={{ backgroundImage: `url(${bannerImage})` }}></div>
        <div className="line-box">
          <div className="line-1"></div>
          <div className="line-2"></div>
        </div>
        <div className="auto-container">
          <div className="content-box">
            <h1>Awards</h1>
            <ul className="bread-crumb clearfix">
              <li><a href="/">Home</a></li>
              <li><span>Awards</span></li>
            </ul>
          </div>
        </div>
      </section>
      <br />
      <section className="departments-style-two alternat-2 nuhm_inner">
        <div className="auto-container">
          <div className="content-two">
            <h5 className="mb-3">Awards received at National / State level</h5>
            <ul className="nuhm_list">
              <li>In Swachh Bharat Abhiyan Swachh Survekshan 2021, Kulgaon Badlapur Municipal Council is ranked 14th at the national level and 2nd at the state level in the group of Amrit Cities. This is the best performance of the city till date in Swachh Survey.</li>
              <li>Swachh Survekshan 2022 under Swachh Bharat Abhiyaan has ranked 33rd in the Amrit Cities group at the country level and 7th at the state level.</li>
              <li>Swachh Survekshan 2023 under Swachh Bharat Abhiyaan has ranked 183rd in the Amrit Cities group at the country level and 36th at the state level.</li>
              <li>The city has achieved ODF++ status in Recertification in ODF City (Hagandari Free City).</li>
              <li>Achieved 3 star rating in GFC Rating (Garbage Free Star City).</li>
            </ul>
          </div>
          <div className="row mt-3 pmay_img">
            <div className="col-md-3">
              <img src={awardImage1} alt="Award 1" />
            </div>
            <div className="col-md-3">
              <img src={awardImage2} alt="Award 2" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Awards;
