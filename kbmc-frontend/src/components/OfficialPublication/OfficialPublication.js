import React from 'react'
import { Link } from 'react-router-dom';
import innerBanner from '../../assets/images/banner/inner-banner.jpg'; 
import Publication1 from '../../assets/images/home/official_publications1.jpeg';
import Publication2 from '../../assets/images/home/official_publications2.jpeg'
import pdf1 from "../../assets/documents/official_publications.pdf"


const OfficialPublication = () => {
  return (
    <>
    <section className="page-title ">
    <div className="bg-layer" style={{ backgroundImage: `url(${innerBanner})` }}></div>
    <div className="line-box">
        <div className="line-1"></div>
        <div className="line-2"></div>
    </div>
    <div className="auto-container">
        <div className="content-box">
            <h1>Official Publications</h1>
            <ul className="bread-crumb clearfix">
                <li><Link to="/">Home</Link></li>
                <li><span>Official Publications</span></li>
            </ul>
        </div>
    </div>
</section>
<br/>
<section className="departments-style-two alternat-2">
    <div className="auto-container">
        <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 content-side">
                <div className="row clearfix">
                    <div className="col-md-3">
                        <Link to={pdf1} target="_blank"><img src={Publication1} alt="official_publications1"/></Link>
                    </div>
                    <div className="col-md-3">
                        <Link to={pdf1} target="_blank"><img src={Publication2} alt="official_publications2"/></Link>
                    </div>
                </div>
            </div>
        </div>            
    </div>
</section>
    </>
  )
}

export default OfficialPublication