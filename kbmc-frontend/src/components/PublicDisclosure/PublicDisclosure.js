import React, { useEffect, useState } from 'react';
import api from "../api";
import innerBanner from '../../assets/images/banner/inner-banner.jpg';
import {Link} from "react-router-dom"

const PublicDisclosure = () => {
  const [pubDepartments, setPubDepartments] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDepartments = async () => {
    try {
      const response = await api.get('/departments'); // Adjust this URL based on your setup
      setDepartments(response.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  useEffect(() => {
    const fetchPubDepartments = async () => {
      try {
        const response = await api.get('/public_disclosure'); // Adjust this URL based on your setup
        setPubDepartments(response.data);
      } catch (error) {
        console.error('Error fetching departments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPubDepartments();
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
              <li><Link to="/">Home</Link></li>
              <li><span>Public Disclosure</span></li>
            </ul>
          </div>
        </div>
      </section>
      <br />
      <section className="departments-style-two alternat-2 pub-dsclr">
        <div className="auto-container">
          <div className="row clearfix">
            {pubDepartments.map((pubDepartment) => {
              // Find matching department in the departments list
              const matchingDepartment = departments.find(
                (dept) => dept.name === pubDepartment.department_name
              );

              return (
                <div className="col-lg-4 col-md-12 col-sm-12 departments-block" key={pubDepartment.id}>
                  <div className="departments-block-two">
                    <div className="inner-box">
                      <div className="content-box">
                        <h5>
                          <Link to={matchingDepartment ? matchingDepartment.link : `/${pubDepartment.department_name.toLowerCase().replace(/\s+/g, '-')}`}>
                            {pubDepartment.department_name}
                          </Link>
                        </h5>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default PublicDisclosure;
