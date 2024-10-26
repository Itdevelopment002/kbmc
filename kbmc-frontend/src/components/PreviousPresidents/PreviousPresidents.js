import React from 'react';
import innerBanner from "../../assets/images/banner/inner-banner.jpg"

const PreviousPresidents = () => {
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
                        <h1>Previous President's of the council</h1>
                        <ul className="bread-crumb clearfix">
                            <li><a href="/">Home</a></li>
                            <li><span>Previous President's of the council</span></li>
                        </ul>
                    </div>
                </div>
            </section>
            {/* page-title end */}
            <br />

            <section className="event-details mt-5">
                <div className="auto-container">
                    <div className="row clearfix">
                        <div className="col-lg-12 col-md-12 col-sm-12 content-side">
                            <div className="event-details-content">
                                <div className="content-three">
                                    <div className="row clearfix">
                                        {[
                                            { name: "Shri. U.P.S.Madan (IAS)", tenure: "10.06.92 - 18.01.1994" },
                                            { name: "Shri. Padmakar Bhandari", tenure: "06.07.1992 - 06.04.1993" },
                                            { name: "Shri. V. V.Avatade", tenure: "06.04.1993 - 27.07.1993" },
                                            { name: "Shri. R.D.Shinde", tenure: "27.07.1993 - 10.05.1995" },
                                            { name: "Shri. Manohar Ambwane", tenure: "10.05.1995 - 08.05.1996" },
                                            { name: "Mr. Anant L. Sakpal", tenure: "08.05.1996 - 09.05.1997" },
                                            { name: "Shri. Tulshiram Meher", tenure: "09.05.1997 - 08.05.1998" },
                                            { name: "Shri. Dashrath Margaj", tenure: "08.05.1998 - 09.05.2000" },
                                            { name: "Shri. Yashwant Kulkarni", tenure: "09.05.2000 - 10.05.2000" },
                                            { name: "Shri. Jayaprakash Tanksalkar", tenure: "10.05.2000 - 20.08.2001" },
                                            { name: "Shri. BL. Giri (Admin)", tenure: "20.08.2001 - 04.09.2001" },
                                            { name: "Shri. Nandkishore (Ram) b. Patkar", tenure: "04.09.2001 - 10.05.2005" },
                                            { name: "Shri. Nandkishore (Ram) b. Patkar (Direct Selection)", tenure: "10.05.2005 - 10.05.2010" },
                                            { name: "Mr. Rajendra Pandharinath Ghorpade", tenure: "10.05.2010 - 09.12.2011" },
                                            { name: "Mr. Nitin Mundaware (Administrator)", tenure: "16.12.2011 - 23.12.2011" },
                                            { name: "Mr. Vaman Barku Mhatre", tenure: "23.12.2011 - 10.11.2012" },
                                            { name: "Mrs. Jayashree Mukund Bhoir", tenure: "10.11.2012 - 20.11.2013" },
                                            { name: "Hon. Mr. B. G. Gawande (Administrator)", tenure: "21.11.2013 - 10.12.2013" },
                                            { name: "Mrs. Sneha Avinash Patkar", tenure: "10.12.2013 - 11.09.2014" },
                                            { name: "Mrs. Usha Tukaram Mhatre", tenure: "11.09.2014 - 09.05.2015" },
                                            { name: "Dr. Dhananjay Savalkar (Administrator)", tenure: "11.05.2015 - 18.05.2015" },
                                            { name: "Mr. Vaman Barku Mhatre", tenure: "18.05.2015 - 18.11.2017" },
                                            { name: "Mr. Vijaya Mohan Raut", tenure: "21.11.2017 - 01.03.2019" },
                                            { name: "Mr. Jagat Singh Girase (Administrator)", tenure: "06.03.2019 - 02.05.2019" },
                                            { name: "Shri. Priyesh Ramesh Jadhav", tenure: "02.05.2019 - 17.05.2020" },
                                            { name: "Mr. Jagat Singh Girase (Administrator)", tenure: "18.05.2020 - 02.12.2020" },
                                            { name: "Mr. Deepak Pujari", tenure: "02.12.2020 - 11.08.2021" },
                                            { name: "Mr. Yogesh Godse (Administrator)", tenure: "12.08.2021 - ...." },
                                        ].map((president, index) => (
                                            <div className="col-lg-3 col-md-6 col-sm-12 single-column" key={index}>
                                                <div className="single-item">
                                                    <h3><a href="#.">{president.name}</a></h3>
                                                    <h6>{president.tenure}</h6>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default PreviousPresidents;
