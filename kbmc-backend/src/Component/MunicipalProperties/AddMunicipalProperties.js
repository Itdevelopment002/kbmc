import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; // Correctly import useNavigate
import api from "../api"; // Import Axios

const AddMunicipalProperties = () => {
  // State to store form data
  const [formData, setFormData] = useState({
    heading: "",
    name: "",
    propertyType: "",
    address: "",
  });

  const navigate = useNavigate(); // Use the useNavigate hook

  // Handle change for all form inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    
    try {
      const response = await api.post('/muncipal', formData); // Make the API call
      console.log("Property holder added:", response.data);
      navigate('/municipal-properties'); // Redirect to the municipal properties list
      
    } catch (error) {
      console.error("Error adding property holder:", error.response?.data || error.message);
      // Handle error, show an alert or message to the user if needed
    }
    
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/city-profile">City Profile</a>
          </li>
          <li className="breadcrumb-item">
            <a href="/municipal-properties">Municipal Properties</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Add Municipal Properties
          </li>
        </ol>
        <div className="row">
          <div className="col-lg-12">
            <div className="card-box">
              <div className="card-block">
                <div className="row">
                  <div className="col-sm-4 col-3">
                    <h4 className="page-title">Add Municipal Properties</h4>
                  </div>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="form-group row">
                    <label className="col-form-label col-md-3">
                      Heading <span className="text-danger">*</span>
                    </label>
                    <div className="col-md-5 mb-2">
                      <input
                        type="text"
                        name="heading"
                        className="form-control form-control-lg "
                        placeholder=""
                        value={formData.heading}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-form-label col-md-3">
                      Name <span className="text-danger">*</span>
                    </label>
                    <div className="col-md-5 mb-2">
                      <input
                        type="text"
                        name="name"
                        className="form-control form-control-lg "
                        placeholder=""
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-form-label col-md-3">
                      Shops / Sabhagruha etc. <span className="text-danger">*</span>
                    </label>
                    <div className="col-md-5 mb-2">
                      <input
                        type="text"
                        name="propertyType"
                        className="form-control form-control-lg "
                        placeholder=""
                        value={formData.propertyType}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-form-label col-md-3">
                      Address <span className="text-danger">*</span>
                    </label>
                    <div className="col-md-5">
                      <textarea
                        className="form-control form-control-lg "
                        name="address"
                        rows="4"
                        value={formData.address}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                  </div>
                  <input
                    type="submit"
                    className="btn btn-primary"
                    value="Submit"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMunicipalProperties;
