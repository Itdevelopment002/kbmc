import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const AddDepartments = () => {
  const [departmentName, setDepartmentName] = useState("");
  const [departmentHod, setDepartmentHod] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // For handling error messages
  const navigate = useNavigate(); // Use navigate for redirection after submission

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset error message before form submission
    try {
      const response = await axios.post('http://localhost:5000/api/departments', {
        name: departmentName,
        hod: departmentHod,
      });
      console.log('Department added:', response.data);

      // Clear the form fields after successful submission
      setDepartmentName("");
      setDepartmentHod("");

      // Optionally navigate to the departments list page
      navigate('/dep');
    } catch (error) {
      console.error('Error adding department:', error);
      setErrorMessage('Failed to add department. Please try again.'); // Set error message for UI feedback
    }
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/departments">Departments</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Add Departments
          </li>
        </ol>
        <div className="row">
          <div className="col-lg-12">
            <div className="card-box">
              <div className="card-block">
                <div className="row">
                  <div className="col-sm-4 col-3">
                    <h4 className="page-title">Add Departments</h4>
                  </div>
                </div>
                {errorMessage && (
                  <div className="alert alert-danger" role="alert">
                    {errorMessage}
                  </div>
                )}
                <form onSubmit={handleSubmit}>
                  <div className="form-group row">
                    <label className="col-form-label col-md-3">
                      Department Name <span className="text-danger">*</span>
                    </label>
                    <div className="col-md-4 mb-3">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        value={departmentName}
                        onChange={(e) => setDepartmentName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-form-label col-md-3">
                      Name of HOD <span className="text-danger">*</span>
                    </label>
                    <div className="col-md-4">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        value={departmentHod}
                        onChange={(e) => setDepartmentHod(e.target.value)}
                        required
                      />
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

export default AddDepartments;
