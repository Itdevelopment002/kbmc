import React, { useEffect, useState } from 'react';
import axios from 'axios';
import innerBanner from '../../assets/images/banner/inner-banner.jpg'; // Background image

const PublicDisclosure = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch departments from the API
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/public_disclosure'); // Adjust this URL based on your setup
        setDepartments(response.data);
      } catch (error) {
        console.error('Error fetching departments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  if (loading) {
    return <p>Loading...</p>; // Optional: Show a loading indicator while fetching data
  }

  return (
    <>
      <section className="page-title">
        <div className="bg-layer" style={{ backgroundImage: `url(${innerBanner})` }}></div>
        <div className="line-box">
          <div className="line-1"></div>
          <div className="line-2"></div>
        </div>
        <div className="auto-container">
          <div className="content-box">
            <h1>Public Disclosure</h1>
            <ul className="bread-crumb clearfix">
              <li><a href="/">Home</a></li>
              <li><span>Public Disclosure</span></li>
            </ul>
          </div>
        </div>
      </section>
      <br />
      <section className="departments-style-two alternat-2 pub-dsclr">
        <div className="auto-container">
          <div className="row clearfix">
            {departments.map((department) => (
              <div className="col-lg-4 col-md-12 col-sm-12 departments-block" key={department.id}>
                <div className="departments-block-two">
                  <div className="inner-box">
                    <div className="content-box">
                      <h5><a href={`/${department.department_name.toLowerCase().replace(/\s+/g, '-')}`}>{department.department_name}</a></h5>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default PublicDisclosure;
