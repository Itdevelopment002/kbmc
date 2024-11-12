import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

const AddDepartments = () => {
    const [departmentName, setDepartmentName] = useState("");
    const [departmentHod, setDepartmentHod] = useState("");
    const [departmentLink, setDepartmentLink] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); // For handling error messages
    const navigate = useNavigate(); // Use navigate for redirection after submission

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(""); // Reset error message before form submission
        try {
            const response = await api.post('/departments', {
                name: departmentName,
                hod: departmentHod,
                link: departmentLink,
            });

            // Clear the form fields after successful submission
            setDepartmentName("");
            setDepartmentHod("");
            setDepartmentLink("");

            // Optionally navigate to the departments list page
            navigate('/departments');
        } catch (error) {
            console.error('Error adding department:', error);
            setErrorMessage('Failed to add department. Please try again.'); // Set error message for UI feedback
        }
    };
    return (
        <>
            <div className="page-wrapper">
                <div className="content">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item"><Link to="/departments">Departments</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Add Departments</li>
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
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group row">
                                            <label className="col-form-label col-md-3">Department Name <span className="text-danger">*</span></label>
                                            <div className="col-md-4">
                                                <input
                                                    type="text"
                                                    className="form-control form-control-lg"
                                                    placeholder=""
                                                    value={departmentName}
                                                    onChange={(e) => setDepartmentName(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-form-label col-md-3">Name of HOD <span className="text-danger">*</span></label>
                                            <div className="col-md-4">
                                                <input
                                                    type="text"
                                                    className="form-control form-control-lg"
                                                    placeholder=""
                                                    value={departmentHod}
                                                    onChange={(e) => setDepartmentHod(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-form-label col-md-3">
                                                Department Link <span className="text-danger">*</span>
                                            </label>
                                            <div className="col-md-4">
                                                <input
                                                    type="text"
                                                    className="form-control form-control-lg"
                                                    value={departmentLink}
                                                    onChange={(e) => setDepartmentLink(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <input type="submit" className="btn btn-primary" value="Submit" />
                                    </form>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddDepartments