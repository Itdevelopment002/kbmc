import React, { useEffect } from 'react';
import pdficon from '../../assets/images/icons/PDF-Icons.png';
import g1 from '../../assets/images/gallery/gallery-1.jpg';
import g2 from '../../assets/images/gallery/gallery-2.jpg';
import g3 from '../../assets/images/gallery/gallery-3.jpg';
import g5 from '../../assets/images/gallery/gallery-5.jpg';
import g6 from '../../assets/images/gallery/gallery-6.jpg';
import g7 from '../../assets/images/gallery/gallery-7.jpg';
import g8 from '../../assets/images/gallery/gallery-8.jpg';
import g9 from '../../assets/images/gallery/gallery-9.jpg';
import g10 from '../../assets/images/gallery/gallery-10.jpg';
import g11 from '../../assets/images/gallery/gallery-11.jpg';
import g12 from '../../assets/images/gallery/gallery-12.jpg';
import g13 from '../../assets/images/gallery/gallery-13.jpg';
import v1 from '../../assets/images/home/online-tax.jpg';
import v2 from '../../assets/images/gallery/ceo-kbmc.jpg';
import GLightbox from 'glightbox';
import 'glightbox/dist/css/glightbox.css';




const DepartmentDetails = () => {

    useEffect(() => {
        const lightbox = GLightbox({
            selector: '.glightbox', 
        });
    }, []);

    const images = [
        g1, g2, g3, g5, g6, g7, g8, g9, g10, g11, g12, g13
    ];

    return (
        <>
            <section className="department-details">
                <div className="container-fluid">
                    <div className="row clearfix">
                        <div className="col-lg-9 col-md-12 col-sm-12 content-side">
                            <div className="department-details-content">
                                <div className="content-one">
                                    <section className="youtube-sec">
                                        <div className="">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="row" id="video-01">
                                                        <div className="col-4 col-md-3">
                                                            <a href="https://www.youtube.com/watch?v=RiWpJkYSnNE" data-toggle="lightbox">
                                                                <img src={v1} alt="ceo-video2" className="img-fluid" />
                                                            </a>
                                                        </div>
                                                        <div className="col-8 col-md-9 px-0">
                                                            <p className="h6 video-title">Online Tax Filling procedure by KBMC</p>
                                                            <p className="video-desc">Date: 01 May, 2023.</p>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                    <div className="row" id="video-02">
                                                        <div className="col-4 col-md-3">
                                                            <a href="https://www.youtube.com/watch?v=OhWuHjMXBkM" data-toggle="lightbox" data-gallery="youtubevideos">
                                                                <img src={v2} alt="v-img5" className="img-fluid" />
                                                            </a>
                                                        </div>
                                                        <div className="col-8 col-md-9 px-0">
                                                            <p className="h6 video-title">Meeting with the newly elected Chief Officer of... Kulgaon Badlapur Municipal Council, Yogesh Godse Sir.</p>
                                                            <p className="video-desc">Date: 25 June, 2023.</p>
                                                        </div>
                                                    </div>
                                                    <hr />
                                                </div>
                                                <div className="col-md-6 col-12">
                                                    <div className="map-style">
                                                        <iframe
                                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30149.71769291419!2d73.20470302114111!3d19.163961329513864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ed5c9bc71bbd%3A0x87d539b0621850f3!2sBadlapur%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1712733207421!5m2!1sen!2sin"
                                                            width="100%"
                                                            height="280"
                                                            style={{ border: 0 }}
                                                            allowFullScreen
                                                            loading="lazy"
                                                            referrerPolicy="no-referrer-when-downgrade">
                                                        </iframe>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>

                                    {/* <!-- Gallery --> */}
                                    <div className="col-lg-12 col-md-12 col-sm-12 content-side">
                                        <div className="department-details-content">
                                            <div className="content-three">
                                                <div className="tabs-box lightbox-tab">
                                                    <div className="tab-btn-box">
                                                        <ul className="tab-btns tab-buttons clearfix">
                                                            <li className="tab-btn active-btn" data-tab="#tab-1">Photo Gallery</li>
                                                        </ul>
                                                    </div>
                                                    <div className="tabs-content">
                                                        <div className="tab active-tab" id="tab-1">
                                                            <div className="content-box department-section">
                                                                <div className="row">
                                                                    {images.map((image, index) => (
                                                                        <a
                                                                            key={index}
                                                                            href={image}
                                                                            className="glightbox col-sm-2 col-4"
                                                                            data-gallery="example-gallery"
                                                                        >
                                                                            <img
                                                                                src={image}
                                                                                className="img-fluid"
                                                                                alt={`Gallery item ${index + 1}`}
                                                                                style={{
                                                                                    width: '100%',
                                                                                    height: 'auto',
                                                                                    objectFit: 'cover',
                                                                                    borderRadius: '1px' // Optional: Adds rounded corners to the images
                                                                                }}
                                                                            />
                                                                        </a>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-12 col-sm-12 content-side">
                            <div className="sidebar-side department-sidebar">
                                <div className="department-sidebar">
                                    <div className="content-two category-widget right-side-sec">
                                        <h3><i className="ri-article-line"></i> Tenders</h3>
                                        <div className="widget-content">
                                            <div className="text-box">
                                                <div className="marquee-wrapper">
                                                    <div className="marquee-block">
                                                        <div className="marquee-inner tender-sidebar to-left">
                                                            <ul className="text-start">
                                                                <li><img src={pdficon} alt="pdficon" /><a href="#.">Appointment of Consultant for GAD approval Bid process management and supervision for the construction of Rail Over Bridge ROB between Katrap to Belvali Badlapur in KBMC area.</a><img src="assets/images/icons/new-icon1.gif" className="newgif" alt="newgif" /></li>
                                                                <li><img src={pdficon} alt="pdficon" /><a href="#.">Appointment of Consultant for GAD approval Bid process management and supervision for the construction of Rail Over Bridge ROB between Katrap to Belvali Badlapur in KBMC area.</a></li>
                                                                <li><img src={pdficon} alt="pdficon" /><a href="#.">Appointment of Consultant for GAD approval Bid process management and supervision for the construction of Rail Over Bridge ROB between Katrap to Belvali Badlapur in KBMC area.</a></li>
                                                                <li><img src={pdficon} alt="pdficon" /><a href="#.">Appointment of Consultant for GAD approval Bid process management and supervision for the construction of Rail Over Bridge ROB between Katrap to Belvali Badlapur in KBMC area.</a></li>
                                                                <li><img src={pdficon} alt="pdficon" /><a href="#.">Appointment of Consultant for GAD approval Bid process management and supervision for the construction of Rail Over Bridge ROB between Katrap to Belvali Badlapur in KBMC area.</a></li>
                                                                <li><img src={pdficon} alt="pdficon" /><a href="#.">Appointment of Consultant for GAD approval Bid process management and supervision for the construction of Rail Over Bridge ROB between Katrap to Belvali Badlapur in KBMC area.</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <!-- news-section end --> */}

                                <div class="service-block-three">
                                    <div class="inner-box">
                                        <h6>Service for</h6>
                                        <h3><a href="#.">Our City Residents</a></h3>
                                        <ul class="list-item clearfix">
                                            {/* <!-- <li><a href="#.">Public Transit</a></li> --> */}
                                            <li><a href="#.">Helpline - 0251-2690271</a></li>
                                            <li><a href="#.">Emergency - </a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="client-logo-slider my-3">
                <div class="">
                    <div class="content-box">
                        <div class="inner-box">
                            <div class="logo-slider-1">
                                {/* <!-- <h3>Citizen Services</h3> --> */}
                                <div class="owl-carousel version-1">
                                    <div><a href="https://urban.maharashtra.gov.in/" target="_blank" rel="noreferrer"><img src="assets/images/footerlogo/01.png" alt="img1" /></a></div>
                                    <div><a href="https://www.mygov.in/" target="_blank" rel="noreferrer"><img src="assets/images/footerlogo/02.png" alt="img2" /></a></div>
                                    <div><a href="https://www.midcindia.org/" target="_blank" rel="noreferrer"><img src="assets/images/footerlogo/03.png" alt="img3" /></a></div>
                                    <div><a href="https://mmrda.maharashtra.gov.in/" target="_blank" rel="noreferrer"><img src="assets/images/footerlogo/04.png" alt="img4" /></a></div>
                                    <div><a href="https://www.mpcb.gov.in/" target="_blank" rel="noreferrer"><img src="assets/images/footerlogo/05.png" alt="img5" /></a></div>
                                    <div><a href="https://divcomkonkan.gov.in/" target="_blank" rel="noreferrer"><img src="assets/images/footerlogo/01.png" alt="img1" /></a></div>
                                    <div><a href="https://aaplesarkar.mahaonline.gov.in/" target="_blank" rel="noreferrer"><img src="assets/images/footerlogo/06.png" alt="img6" /></a></div>
                                    <div><a href="https://thane.nic.in/" target="_blank" rel="noreferrer"><img src="assets/images/footerlogo/07.png" alt="img7" /></a></div>
                                    <div><a href="https://www.eci.gov.in/" target="_blank" rel="noreferrer"><img src="assets/images/footerlogo/08.png" alt="img8" /></a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default DepartmentDetails;
