import React, { useState } from "react";
import api from "../api";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const AddSchools = () => {
  const [formData, setFormData] = useState({
    heading: "",
    schoolName: "",
    address: "",
    medium: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Send POST request to the backend
      const response = await api.post("/schools", formData);
      
      // Show success message using Toastify
      toast.success("School added successfully!", {
        position: "top-right",
        autoClose: 5000,
      });

      setTimeout(()=>{
        navigate("/schools");
      },5000);

      // Clear the form fields after submission
      setFormData({
        heading: "",
        schoolName: "",
        address: "",
        medium: "",
      });

    } catch (error) {
      // Show error message using Toastify
      toast.error("Failed to add school. Please try again.", {
        position: "top-right",
        autoClose: 5000,
      });
    }
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="#.">City Profile</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/schools">Schools</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Add Schools
          </li>
        </ol>
        <div className="row">
          <div className="col-lg-12">
            <div className="card-box">
              <div className="card-block">
                <div className="row">
                  <div className="col-sm-4 col-3">
                    <h4 className="page-title">Add Schools</h4>
                  </div>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="form-group row">
                    <label className="col-form-label col-md-3">Heading</label>
                    <div className="col-md-5 mb-3">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder=""
                        name="heading"
                        value={formData.heading}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-form-label col-md-3">
                      School Names <span className="text-danger">*</span>
                    </label>
                    <div className="col-md-5 mb-3 ">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder=""
                        name="schoolName"
                        value={formData.schoolName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-form-label col-md-3">
                      Address <span className="text-danger">*</span>
                    </label>
                    <div className="col-md-5 mb-3">
                      <textarea
                        className="form-control form-control-lg"
                        id="address"
                        name="address"
                        rows="4"
                        value={formData.address}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-md-3 col-form-label">Medium</label>
                    <div className="col-md-5">
                      <select
                        className="form-control"
                        name="medium"
                        value={formData.medium}
                        onChange={handleChange}
                      >
                        <option value="">Select Medium</option>
                        <option value="Marathi">Marathi</option>
                        <option value="Urdu">Urdu</option>
                        <option value="English">English</option>
                        <option value="Semi English">Semi English</option>
                      </select>
                    </div>
                  </div>
                  <input type="submit" className="btn btn-primary" value="Submit" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddSchools;
