import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import innerBanner from '../../assets/images/banner/inner-banner.jpg';
import pdficon from "../../assets/images/icons/PDF-Icons.png";

const RightToService = () => {
    const [pdfData, setPdfData] = useState([]);


    useEffect(() => {
        // Fetch data from the API
        axios.get('http://localhost:5000/api/rts_table')
            .then(response => {
                setPdfData(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);


    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch data from API
        axios.get('http://localhost:5000/api/righttoservices')
            .then(response => {
                console.log("API response:", response.data); // Debug log to check response
                setServices(response.data); // Assuming response.data is the array of services
                setLoading(false);
            })
            .catch(err => {
                console.error("There was an error fetching the data!", err);
                setError("Failed to fetch services. Please try again later.");
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;


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
            <br />
            <br/>
            <section className="service-style-four rts_inner">
                <div className="auto-container">
                    <h4 className="mb-3 color_blue">Kulgaon Badlapur Municipal Council, Kulgaon.</h4>
                    {/* <h5 className="mb-3">Right To Services Act, 2015</h5> */}
                    {/* <p>The Maharashtra Right to Public Services Act, 2015 is enacted and is in force since 28.04.2015 to ensure that notified services are provided to the citizens in a transparent, speedy and time-bound manner by various Government Departments and Public Authorities under the Government...</p> */}
                    <div>
                        {services.length === 0 ? (
                            <p>No services available.</p>
                        ) : (
                            services.map(service => (
                                <div key={service.id}>
                                    <h5 className="mb-3" >{service.heading}</h5>
                                    {/* <p>{service.description}</p> */}
                                    {service.description
                                        .split('\n')
                                        .slice(0, 5)  
                                        .map((para, index) => (
                                            <p className='mb-0'key={index}>{para}</p>
                                        ))
                                    }
                                </div>
                            ))
                        )}
                    </div>

                    <div className="table-responsive mt-3">
                        <table className="table table-bordered">
                            <thead className="text-center">
                                <tr>
                                    <th width="10%" style={{ backgroundColor: "#29aae1", color: "#fff" }}>Sr. No</th>
                                    <th className="text-center" style={{ backgroundColor: "#29aae1", color: "#fff" }}>Description</th>
                                    <th width="15%" style={{ backgroundColor: "#29aae1", color: "#fff" }}>Download PDF</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pdfData.map((item, index) => (
                                    <tr key={item.id}>
                                        <td className="text-center">{index + 1}</td>
                                        <td className="text-center">{item.description}</td>
                                        <td className="text-center">
                                            <div className="download-box">
                                                <div className="icon-box">
                                                    <Link to={`http://localhost:5000/${item.pdf_path}`} target="_blank">
                                                        <img width="25px" src={pdficon} alt="pdf_icon" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </>
    );
};

export default RightToService;
