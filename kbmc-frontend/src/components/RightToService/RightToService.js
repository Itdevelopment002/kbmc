import React from 'react'
import { Link } from 'react-router-dom'
import innerBanner from '../../assets/images/banner/inner-banner.jpg';
import pdficon from "../../assets/images/icons/PDF-Icons.png"
import pdf1 from "../../assets/documents/rts/rts_act_eng.pdf";
import pdf2 from "../../assets/documents/rts/rts_act_mar.pdf";
import pdf3 from "../../assets/documents/rts/rts_gr.pdf";
import pdf4 from "../../assets/documents/rts/designated_officer.pdf";
import pdf5 from "../../assets/documents/rts/acknowledgement.pdf";
import pdf6 from "../../assets/documents/rts/first_appeal.pdf";
import pdf7 from "../../assets/documents/rts/seond_appeal.pdf";
import pdf8 from "../../assets/documents/rts/state_commission.pdf";
import pdf9 from "../../assets/documents/rts/register_of_cases.pdf";
import pdf10 from "../../assets/documents/rts/office_inspection.pdf";

const RightToService = () => {
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
                        <h1>Right to Service</h1>
                        <ul className="bread-crumb clearfix">
                            <li><a href="/">Home</a></li>
                            <li><span>Right to Service</span></li>
                        </ul>
                    </div>
                </div>
            </section>
            <br />
            <br/>
            <section className="service-style-four rts_inner">
                <div className="auto-container">
                    <h4 className="mb-3 color_blue">Kulgaon Badlapur Municipal Council, Kulgaon.</h4>
                    <h5 className="mb-3">Right To Services Act, 2015</h5>
                    <p>The Maharashtra Right to Public Services Act, 2015 is enacted and is in force since 28.04.2015 to ensure that notified services are provided to the citizens in a transparent, speedy and time-bound manner by various Government Departments and Public Authorities under the Government. Its objective is to provide easy, prompt and time bound services to the citizens.</p>

                    <p>The Maharashtra State Commission for Right to Public Service has been constituted under the above Act to monitor, coordinate, control and improve the public services being provided by the Government. The Commission consists of a Chief Commissioner and six Commissioners. The headquarter of the Commission is at the New Administrative Building, Opposite Mantralaya, Mumbai and the Divisional Offices of the Commissioners are at the six Divisional Headquarters.</p>

                    <p>If any notified service is not provided to any eligible person within stipulated time or is rejected without proper grounds, the concerned person may file 1st and 2nd appeals with the higher authorities and if he is not satisfied with their decision, he may prefer third appeal to the Commission. The erring officer is liable for a penalty up to Rs 5000/- per case. Notified Services rendered by this Department are as per enclosed proforma.</p>
                    <div className="table-responsive mt-3">
                        <table className="table table-bordered">
                            <thead className="text-center">
                                <tr>
                                    <th width="10%" style={{backgroundColor: "#29aae1",color: "#fff",}}>Sr. No</th>
                                    <th className="text-center"style={{backgroundColor: "#29aae1",color: "#fff",}}>Description</th>
                                    <th width="15%"style={{backgroundColor: "#29aae1",color: "#fff",}}>Download PDF</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td className="text-center">1</td>
                                    <td className="text-center">The Maharashtra Right to Public Service Act, 2015 (English)</td>
                                    <td className="text-center">
                                        <div className="download-box">
                                            <div className="icon-box"><Link to={pdf1} target="_blank"><img width="25px" src={pdficon} alt="pdf_icon" /> </Link></div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-center">2</td>
                                    <td className="text-center">The Maharashtra Right to Public Service Act, 2015 (Marathi)</td>
                                    <td className="text-center">
                                        <div className="download-box">
                                            <div className="icon-box"><Link to={pdf2} target="_blank"><img width="25px" src={pdficon} alt="pdf_icon" /> </Link></div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-center">3</td>
                                    <td className="text-center">RTS GR</td>
                                    <td className="text-center">
                                        <div className="download-box">
                                            <div className="icon-box"><Link to={pdf3} target="_blank"><img width="25px" src={pdficon} alt="pdf_icon" /> </Link></div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-center">4</td>
                                    <td className="text-center">Form of application to Designated officer</td>
                                    <td className="text-center">
                                        <div className="download-box">
                                            <div className="icon-box"><Link to={pdf4} target="_blank"><img width="25px" src={pdficon} alt="pdf_icon" /> </Link></div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-center">5</td>
                                    <td className="text-center">Acknowledgement</td>
                                    <td className="text-center">
                                        <div className="download-box">
                                            <div className="icon-box"><Link to={pdf5} target="_blank"><img width="25px" src={pdficon} alt="pdf_icon" /> </Link></div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-center">6</td>
                                    <td className="text-center">Form of First Appeal to First Appellate Authority</td>
                                    <td className="text-center">
                                        <div className="download-box">
                                            <div className="icon-box"><Link to={pdf6} target="_blank"><img width="25px" src={pdficon} alt="pdf_icon" /> </Link></div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-center">7</td>
                                    <td className="text-center">Form of Second Appeal to Second Appellate Authority</td>
                                    <td className="text-center">
                                        <div className="download-box">
                                            <div className="icon-box"><Link to={pdf7} target="_blank"><img width="25px" src={pdficon} alt="pdf_icon" /> </Link></div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-center">8</td>
                                    <td className="text-center">Form of Appeal to Maharashtra State Commission for Right to Public Service</td>
                                    <td className="text-center">
                                        <div className="download-box">
                                            <div className="icon-box"><Link to={pdf8} target="_blank"><img width="25px" src={pdficon} alt="pdf_icon" /> </Link></div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-center">9</td>
                                    <td className="text-center">Register of cases</td>
                                    <td className="text-center">
                                        <div className="download-box">
                                            <div className="icon-box"><Link to={pdf9} target="_blank"><img width="25px" src={pdficon} alt="pdf_icon" /> </Link></div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="text-center">10</td>
                                    <td className="text-center">Office Inspection format</td>
                                    <td className="text-center">
                                        <div className="download-box">
                                            <div className="icon-box"><Link to={pdf10} target="_blank"><img width="25px" src={pdficon} alt="pdf_icon" /> </Link></div>
                                        </div>
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </>
    )
}

export default RightToService