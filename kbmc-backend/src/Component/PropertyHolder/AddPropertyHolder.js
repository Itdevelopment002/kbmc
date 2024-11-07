import React, { useState } from 'react';
import api from '../api';
import { useNavigate } from 'react-router-dom'; // Correctly import useNavigate
import { Link } from "react-router-dom";

const AddPropertyHolder = () => {
  const [formData, setFormData] = useState({
    heading: '',
    description: '',
    property: ''
  });
  
  const navigate = useNavigate(); // Use the useNavigate hook

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Make a POST request to the backend API
      const response = await api.post('/property_holder', formData); // Adjusted URL to match your backend route
      
      console.log('Property holder added successfully:', response.data);
      
      // Reset the form or provide user feedback
      setFormData({
        heading: '',
        description: '',
        property: ''
      });
      navigate('/property-holder');

    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error('Error adding property holder:', error.response.data);
        alert(error.response.data.error || 'Error adding property holder');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error submitting form:', error.message);
        alert('An error occurred while adding the property holder');
      }
    }
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="#.">City Profile</Link></li>
          <li className="breadcrumb-item"><Link to="/property-holder">Property Holder</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Add Property Holder</li>
        </ol>

        <div className="row">
          <div className="col-lg-12">
            <div className="card-box">
              <div className="card-block">
                <div className="row">
                  <div className="col-sm-4 col-3">
                    <h4 className="page-title">Add Property Holder</h4>
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="form-group row">
                    <label className="col-form-label col-md-3">Heading</label>
                    <div className="col-md-5 mb-3">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="heading"
                        value={formData.heading}
                        onChange={handleChange}
                        placeholder="Enter heading"
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-form-label col-md-3">Description <span className="text-danger">*</span></label>
                    <div className="col-md-5">
                      <input
                        type="text"
                        className="form-control form-control-lg mb-3"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter description"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-form-label col-md-3">Property <span className="text-danger">*</span></label>
                    <div className="col-md-5 mb-3">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="property"
                        value={formData.property}
                        onChange={handleChange}
                        placeholder="Enter property details"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className="col-md-8 offset-md-3">
                      <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                  </div>
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPropertyHolder;
