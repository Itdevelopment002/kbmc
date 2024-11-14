import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

const AddDepartments = () => {
    const [departmentName, setDepartmentName] = useState("");
    const [departmentHod, setDepartmentHod] = useState("");
    const [departmentLink, setDepartmentLink] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); // For handling error messages
    const [errors, setErrors] = useState({}); // For field-specific errors
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};
        if (!departmentName.trim()) newErrors.departmentName = "Department name is required.";
        if (!departmentHod.trim()) newErrors.departmentHod = "Name of HOD is required.";
        if (!departmentLink.trim()) newErrors.departmentLink = "Department link is required.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

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

    const handleFieldChange = (setter, fieldName) => (e) => {
        setter(e.target.value);
        setErrors((prevErrors) => ({ ...prevErrors, [fieldName]: "" })); // Clear error for the field
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
                                                    className={`form-control ${errors.departmentName ? "is-invalid" : ""
                                                        }`}
                                                    placeholder="Enter department name"
                                                    value={departmentName}
                                                    onChange={handleFieldChange(setDepartmentName, "departmentName")}
                                                />
                                                {errors.departmentName && (
                                                    <div className="invalid-feedback">{errors.departmentName}</div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-form-label col-md-3">Name of HOD <span className="text-danger">*</span></label>
                                            <div className="col-md-4">
                                                <input
                                                    type="text"
                                                    className={`form-control  ${errors.departmentHod ? "is-invalid" : ""
                                                        }`}
                                                    placeholder="Enter HOD name"
                                                    value={departmentHod}
                                                    onChange={handleFieldChange(setDepartmentHod, "departmentHod")}
                                                />
                                                {errors.departmentHod && (
                                                    <div className="invalid-feedback">{errors.departmentHod}</div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-form-label col-md-3">
                                                Department Link <span className="text-danger">*</span>
                                            </label>
                                            <div className="col-md-4">
                                                <input
                                                    type="text"
                                                    className={`form-control ${errors.departmentLink ? "is-invalid" : ""
                                                        }`}
                                                    placeholder="Enter department link"
                                                    value={departmentLink}
                                                    onChange={handleFieldChange(setDepartmentLink, "departmentLink")}
                                                />
                                                {errors.departmentLink && (
                                                    <div className="invalid-feedback">{errors.departmentLink}</div>
                                                )}
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