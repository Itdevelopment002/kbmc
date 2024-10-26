import React from 'react'
import innerBanner from '../../assets/images/banner/inner-banner.jpg'; // Background image
import pdficon from "../../assets/images/icons/PDF-Icons.png"
import pdf1 from "../../assets/documents/department/tax-dept.pdf";
import pdf2 from "../../assets/documents/department/town-plal-dept.pdf";
import pdf3 from "../../assets/documents/department/electrical-dept.pdf";
import pdf4 from "../../assets/documents/department/pwd-dept.pdf";
import pdf5 from "../../assets/documents/department/health-dept.pdf";
import pdf6 from "../../assets/documents/department/education-dept.pdf";
import pdf7 from "../../assets/documents/department/vehicle-dept.pdf";
import pdf8 from "../../assets/documents/department/nulm-dept.pdf";
import pdf9 from "../../assets/documents/department/hospital-dept.pdf";
import pdf10 from "../../assets/documents/department/establishment-dept.pdf";

const CitizenCharter = () => {
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
                <h1>Citizen Charter</h1>
                <ul className="bread-crumb clearfix">
                    <li><a href="/">Home</a></li>
                    <li><span>Citizen Charter</span></li>
                </ul>
            </div>
        </div>
    </section>
    <br />
    <section className="departments-style-two alternat-2">
        <div className="auto-container">
            <div className="row clearfix">
                <div className="col-lg-12 col-md-12 col-sm-12 content-side">
                    <div className="row clearfix">
                        <div className="col-md-6">
                            <div className="department-details-content citizen-chart-pdf">
                                
                                <div className="content-two">                            
                                    <div className="download-box">
                                        <div className="icon-box"><img src={pdficon} alt=""/></div>
                                        <h6>General Admin Department</h6>
                                        <div className="download-btn">
                                            <a href="#." className="theme-btn btn-one">View</a>
                                        </div>
                                    </div> 
                                    <div className="download-box">
                                        <div className="icon-box"><img src={pdficon} alt=""/></div>
                                        <h6>Audit Department</h6>
                                        <div className="download-btn">
                                            <a href="#." className="theme-btn btn-one">View</a>
                                        </div>
                                    </div>
                                    <div className="download-box">
                                        <div className="icon-box"><img src={pdficon} alt=""/></div>
                                        <h6>Tax Department</h6>
                                        <div className="download-btn">
                                            <a href={pdf1} rel="noreferrer" target="_blank" className="theme-btn btn-one">View</a>
                                        </div>
                                    </div>
                                    <div className="download-box">
                                        <div className="icon-box"><img src={pdficon} alt=""/></div>
                                        <h6>Account Department</h6>
                                        <div className="download-btn">
                                            <a href="#." className="theme-btn btn-one">View</a>
                                        </div>
                                    </div> 
                                    <div className="download-box">
                                        <div className="icon-box"><img src={pdficon} alt=""/></div>
                                        <h6>Town Planning</h6>
                                        <div className="download-btn">
                                            <a href={pdf2} rel="noreferrer" target="_blank" className="theme-btn btn-one">View</a>
                                        </div>
                                    </div>
                                    <div className="download-box">
                                        <div className="icon-box"><img src={pdficon} alt=""/></div>
                                        <h6>Electrical Department</h6>
                                        <div className="download-btn">
                                            <a href={pdf3} rel="noreferrer" target="_blank" className="theme-btn btn-one">View</a>
                                        </div>
                                    </div>
                                    <div className="download-box">
                                        <div className="icon-box"><img src={pdficon} alt=""/></div>
                                        <h6>Public Work Department</h6>
                                        <div className="download-btn">
                                            <a href={pdf4} rel="noreferrer" target="_blank" className="theme-btn btn-one">View</a>
                                        </div>
                                    </div>
                                    <div className="download-box">
                                        <div className="icon-box"><img src={pdficon} alt=""/></div>
                                        <h6>Milkat (Income)</h6>
                                        <div className="download-btn">
                                            <a href="#." className="theme-btn btn-one">View</a>
                                        </div>
                                    </div>
                                    <div className="download-box">
                                        <div className="icon-box"><img src={pdficon} alt=""/></div>
                                        <h6>E-Governance Department</h6>
                                        <div className="download-btn">
                                            <a href="#." className="theme-btn btn-one">View</a>
                                        </div>
                                    </div>
                                    <div className="download-box">
                                        <div className="icon-box"><img src={pdficon} alt=""/></div>
                                        <h6>Health Department</h6>
                                        <div className="download-btn">
                                            <a href={pdf5} rel="noreferrer" target="_blank" className="theme-btn btn-one">View</a>
                                        </div>
                                    </div>
                                    <div className="download-box">
                                        <div className="icon-box"><img src={pdficon} alt=""/></div>
                                        <h6>WCD (Women and Child Development)</h6>
                                        <div className="download-btn">
                                            <a href="#." className="theme-btn btn-one">View</a>
                                        </div>
                                    </div>
                                    <div className="download-box">
                                        <div className="icon-box"><img src={pdficon} alt=""/></div>
                                        <h6>Advertisement Department</h6>
                                        <div className="download-btn">
                                            <a href="#." className="theme-btn btn-one">View</a>
                                        </div>
                                    </div>
                                </div>                 
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="department-details-content citizen-chart-pdf">    
                                <div className="content-two">                            
                                    <div className="download-box">
                                        <div className="icon-box"><img src={pdficon} alt=""/></div>
                                        <h6>Education Department</h6>
                                        <div className="download-btn">
                                            <a href={pdf6} rel="noreferrer" target="_blank" className="theme-btn btn-one">View</a>
                                        </div>
                                    </div> 
                                    <div className="download-box">
                                        <div className="icon-box"><img src={pdficon} alt=""/></div>
                                        <h6>Security Department</h6>
                                        <div className="download-btn">
                                            <a href="#." className="theme-btn btn-one">View</a>
                                        </div>
                                    </div> 
                                    <div className="download-box">
                                        <div className="icon-box"><img src={pdficon} alt=""/></div>
                                        <h6>Vehicle Department</h6>
                                        <div className="download-btn">
                                            <a href={pdf7} rel="noreferrer" target="_blank" className="theme-btn btn-one">View</a>
                                        </div>
                                    </div> 
                                    <div className="download-box">
                                        <div className="icon-box"><img src={pdficon} alt=""/></div>
                                        <h6>NULM Department</h6>
                                        <div className="download-btn">
                                            <a href={pdf8} rel="noreferrer" target="_blank" className="theme-btn btn-one">View</a>
                                        </div>
                                    </div>
                                    <div className="download-box">
                                        <div className="icon-box"><img src={pdficon} alt=""/></div>
                                        <h6>Hospital Department</h6>
                                        <div className="download-btn">
                                            <a href={pdf9} rel="noreferrer" target="_blank" className="theme-btn btn-one">View</a>
                                        </div>
                                    </div>
                                    <div className="download-box">
                                        <div className="icon-box"><img src={pdficon} alt=""/></div>
                                        <h6>Fire Department</h6>
                                        <div className="download-btn">
                                            <a href="#." className="theme-btn btn-one">View</a>
                                        </div>
                                    </div> 
                                    <div className="download-box">
                                        <div className="icon-box"><img src={pdficon} alt=""/></div>
                                        <h6>Legal Department</h6>
                                        <div className="download-btn">
                                            <a href="#." className="theme-btn btn-one">View</a>
                                        </div>
                                    </div>  
                                    <div className="download-box">
                                        <div className="icon-box"><img src={pdficon} alt=""/></div>
                                        <h6>Disability Department</h6>
                                        <div className="download-btn">
                                            <a href="#." className="theme-btn btn-one">View</a>
                                        </div>
                                    </div> 
                                    <div className="download-box">
                                        <div className="icon-box"><img src={pdficon} alt=""/></div>
                                        <h6>Store &amp; Records Department</h6>
                                        <div className="download-btn">
                                            <a href="#." className="theme-btn btn-one">View</a>
                                        </div>
                                    </div>  
                                    <div className="download-box">
                                        <div className="icon-box"><img src={pdficon} alt=""/></div>
                                        <h6>Marriage Registration</h6>
                                        <div className="download-btn">
                                            <a href="#." className="theme-btn btn-one">View</a>
                                        </div>
                                    </div> 
                                    <div className="download-box">
                                        <div className="icon-box"><img src={pdficon} alt=""/></div>
                                        <h6>Birth &amp; Death Department</h6>
                                        <div className="download-btn">
                                            <a href="#." className="theme-btn btn-one">View</a>
                                        </div>
                                    </div>
                                    <div className="download-box">
                                        <div className="icon-box"><img src={pdficon} alt=""/></div>
                                        <h6>Water Department</h6>
                                        <div className="download-btn">
                                            <a href="#." className="theme-btn btn-one">View</a>
                                        </div>
                                    </div> 
                                    <div className="download-box">
                                        <div className="icon-box"><img src={pdficon} alt=""/></div>
                                        <h6>Establishment Department</h6>
                                        <div className="download-btn">
                                            <a href={pdf10} rel="noreferrer" target="_blank" className="theme-btn btn-one">View</a>
                                        </div>
                                    </div>
                                </div>                 
                            </div>
                        </div>
                    </div>
                </div>
            </div>            
        </div>
    </section>
    </>
  )
}

export default CitizenCharter