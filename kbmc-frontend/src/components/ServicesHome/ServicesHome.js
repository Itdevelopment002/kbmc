import React from 'react'
import {Link} from 'react-router-dom'
import s1 from '../../assets/images/icons/Public Disclosure.png'
import s2 from '../../assets/images/icons/Public Disclosure-WH.png'
import s3 from '../../assets/images/icons/Citizen Charter.png'
import s4 from '../../assets/images/icons/Citizen Charter-WH.png'
import s5 from '../../assets/images/icons/Right to Service.png'
import s6 from '../../assets/images/icons/Right to Service-WH.png'
import s7 from '../../assets/images/icons/Development Plan.png'
import s8 from '../../assets/images/icons/Development Plan-WH.png'
import s9 from '../../assets/images/icons/Downloads.png'
import s10 from '../../assets/images/icons/Downloads-WH.png'
import s11 from '../../assets/images/icons/City Map.png'
import s12 from '../../assets/images/icons/City Map-WH.png'
import s13 from '../../assets/images/icons/Elected Wings.png'
import s14 from '../../assets/images/icons/Elected Wings-WH.png'
import s15 from '../../assets/images/icons/Official Publications.png'
import s16 from '../../assets/images/icons/Official Publications-WH.png'
import './ServiceHome.css'

const ServicesHome = () => {
    return (
        <div className="container-fluid container-fluid1">
            <section className="service-section-new">
                <section className="council-section service-home">
                    <div className="service-sec">
                        <div className="row align-items-center">
                            <div className="col-lg-12 col-md-12 col-sm-12 links-column">
                                <div className="links-inner">
                                    <div className="row clearfix mb-2">
                                        <div className="col-lg-3 col-md-6 col-sm-12 single-column">
                                            <Link to="/public-disclosure">
                                                <div className="single-links theme-btn btn-one">
                                                    <div className="figure">
                                                        <img className="Sirv image-main sirv-image-loaded" src={s1} data-src="assets/images/icons/Public Disclosure.png" referrerpolicy="no-referrer-when-downgrade" id="responsive-image-1972685" loading="lazy" alt="" />
                                                            <img className="Sirv image-hover sirv-image-loaded" data-src="assets/images/icons/Public Disclosure-WH.png" referrerpolicy="no-referrer-when-downgrade" id="responsive-image-9979409" loading="lazy" src={s2} alt="" />
                                                            </div>
                                                            <h5><span>Public Disclosure</span></h5>
                                                    </div>
                                            </Link>
                                        </div>
                                        <div className="col-lg-3 col-md-6 col-sm-12 single-column">
                                            <Link to="/citizen-charter">
                                                <div className="single-links theme-btn btn-one">
                                                    <div className="figure">
                                                        <img className="Sirv image-main sirv-image-loaded" src={s3} data-src="assets/images/icons/Citizen Charter.png" referrerpolicy="no-referrer-when-downgrade" id="responsive-image-9044609" loading="lazy" alt="" />
                                                            <img className="Sirv image-hover sirv-image-loaded" data-src="assets/images/icons/Citizen Charter-WH.png" referrerpolicy="no-referrer-when-downgrade" id="responsive-image-3757604" loading="lazy" src={s4} alt=""/>
                                                            </div>
                                                            <h5><span>Citizen Charter </span></h5>
                                                    </div>
                                            </Link>
                                        </div>
                                        <div className="col-lg-3 col-md-6 col-sm-12 single-column">
                                            <Link to="/right-to-services">
                                                <div className="single-links theme-btn btn-one">
                                                    <div className="figure">
                                                        <img className="Sirv image-main sirv-image-loaded" src={s5} data-src="assets/images/icons/Right to Service.png" referrerpolicy="no-referrer-when-downgrade" id="responsive-image-3590607" loading="lazy" alt="" />
                                                            <img className="Sirv image-hover sirv-image-loaded" data-src="assets/images/icons/Right to Service-WH.png" referrerpolicy="no-referrer-when-downgrade" id="responsive-image-6939514" loading="lazy" src={s6} alt="" />
                                                            </div>
                                                            <h5><span>Right to Service</span></h5>
                                                    </div>
                                            </Link>
                                        </div>
                                        <div className="col-lg-3 col-md-6 col-sm-12 single-column">
                                            <Link to="/town-planning">
                                                <div className="single-links theme-btn btn-one">
                                                    <div className="figure">
                                                        <img className="Sirv image-main sirv-image-loaded" src={s7} data-src="assets/images/icons/Development Plan.png" referrerpolicy="no-referrer-when-downgrade" id="responsive-image-619500" loading="lazy" alt="" />
                                                            <img className="Sirv image-hover sirv-image-loaded" data-src="assets/images/icons/Development Plan-WH.png" referrerpolicy="no-referrer-when-downgrade" id="responsive-image-5814142" loading="lazy" src={s8} alt="" />
                                                            </div>
                                                            <h5><span>Development Plan </span></h5>
                                                    </div>
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="row clearfix">
                                        <div className="col-lg-3 col-md-6 col-sm-12 single-column">
                                            <Link to="/downloads">
                                                <div className="single-links theme-btn btn-one">
                                                    <div className="figure">
                                                        <img className="Sirv image-main sirv-image-loaded" src={s9} data-src="assets/images/icons/Downloads.png" referrerpolicy="no-referrer-when-downgrade" id="responsive-image-3918361" loading="lazy" alt="" />
                                                            <img className="Sirv image-hover sirv-image-loaded" data-src="assets/images/icons/Downloads-WH.png" referrerpolicy="no-referrer-when-downgrade" id="responsive-image-7898476" loading="lazy" src={s10} alt="" />
                                                            </div>
                                                            <h5><span>Downloads </span></h5>
                                                    </div>
                                            </Link>
                                        </div>
                                        <div className="col-lg-3 col-md-6 col-sm-12 single-column">
                                            <Link to="#.">
                                                <div className="single-links theme-btn btn-one">
                                                    <div className="figure">
                                                        <img className="Sirv image-main sirv-image-loaded" src={s11} data-src="assets/images/icons/City Map.png" referrerpolicy="no-referrer-when-downgrade" id="responsive-image-7409019" loading="lazy" alt="" />
                                                            <img className="Sirv image-hover sirv-image-loaded" data-src="assets/images/icons/City Map-WH.png" referrerpolicy="no-referrer-when-downgrade" id="responsive-image-9750410" loading="lazy" src={s12} alt="" />
                                                            </div>
                                                            <h5><span>City Map</span></h5>
                                                    </div>
                                            </Link>
                                        </div>
                                        <div className="col-lg-3 col-md-6 col-sm-12 single-column">
                                            <Link to="/elected-member">
                                                <div className="single-links theme-btn btn-one">
                                                    <div className="figure">
                                                        <img className="Sirv image-main sirv-image-loaded" src={s13} data-src="assets/images/icons/Elected Wings.png" referrerpolicy="no-referrer-when-downgrade" id="responsive-image-3973420" loading="lazy" alt="" />
                                                            <img className="Sirv image-hover sirv-image-loaded" data-src="assets/images/icons/Elected Wings-WH.png" referrerpolicy="no-referrer-when-downgrade" id="responsive-image-7562018" loading="lazy" src={s14}alt=""  />
                                                            </div>
                                                            <h5><span>Elected Wing</span></h5>
                                                    </div>
                                            </Link>
                                        </div>
                                        <div className="col-lg-3 col-md-6 col-sm-12 single-column">
                                            <Link to="/official-publication">
                                                <div className="single-links theme-btn btn-one">
                                                    <div className="figure">
                                                        <img className="Sirv image-main sirv-image-loaded" src={s15} data-src="assets/images/icons/Official Publications.png" referrerpolicy="no-referrer-when-downgrade" id="responsive-image-3618032" loading="lazy" alt="" />
                                                            <img className="Sirv image-hover sirv-image-loaded" data-src="assets/images/icons/Official Publications-WH.png" referrerpolicy="no-referrer-when-downgrade" id="responsive-image-1786321" loading="lazy" src={s16} alt="" />
                                                            </div>
                                                            <h5><span>Official Publications</span></h5>
                                                    </div>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        </div>
    )
}

export default ServicesHome