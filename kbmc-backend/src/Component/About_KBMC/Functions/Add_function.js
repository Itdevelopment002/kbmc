import React, { useState } from "react";
import { toast, ToastContainer } from 'react-toastify'; // Import Toast
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import api from "../../api";
import { Link } from "react-router-dom";

// Function component for Add Functions page
const AddFunction = () => {
    // State to manage the form inputs
    const [heading, setHeading] = useState("");
    const [description, setDescription] = useState("");

    const navigate = useNavigate();

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Logic to submit form data
        const formData = {
            heading,
            description,
        };

        try {
            const response = await api.post('/functions', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 201) {
                toast.success('Function added successfully!');
                setHeading(""); // Reset the form inputs
                setDescription("");
                setTimeout(() => {
                    navigate("/functions");
                }, 5000);
            } else {
                toast.error('Failed to add function.');
            }
        } catch (error) {
            console.error('Error adding function:', error);
            toast.error('Error adding function.');
        }
    };

    return (
        <div>
            <div className="page-wrapper">
                <div className="content">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="#.">About KBMC</Link>
                        </li>
                        <li className="breadcrumb-item">
                            <Link to="/functions">Functions</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            Add Functions
                        </li>
                    </ol>

                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card-box">
                                <div className="card-block">
                                    <div className="row">
                                        <div className="col-sm-4 col-3">
                                            <h4 className="page-title">Add Functions</h4>
                                        </div>
                                    </div>

                                    {/* Form Section */}
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group row">
                                            <label className="col-form-label col-md-2">
                                                Heading <span className="text-danger">*</span>
                                            </label>
                                            <div className="col-md-4">
                                                <input
                                                    type="text"
                                                    className="form-control form-control-lg"
                                                    placeholder=""
                                                    value={heading}
                                                    onChange={(e) => setHeading(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>

                                        <div className="form-group row mt-3">
                                            <label className="col-form-label col-lg-2">Description<span className="text-danger">*</span></label>
                                            <div className="col-md-4">
                                                <textarea
                                                    className="form-control form-control-lg"
                                                    placeholder="Enter description"
                                                    value={description}
                                                    onChange={(e) => setDescription(e.target.value)}
                                                    rows="2"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group mt-3">
                                            <input
                                                type="submit"
                                                className="btn btn-primary"
                                                value="Submit"
                                            />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Toast Container for notifications */}
                <ToastContainer />
            </div>
        </div>
    );
};

export default AddFunction;
