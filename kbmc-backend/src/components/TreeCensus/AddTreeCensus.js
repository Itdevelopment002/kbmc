import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify"; // Import ToastContainer here
import "react-toastify/dist/ReactToastify.css";
import api from "../api";

const AddTreeCensus = () => {
    const [formData, setFormData] = useState({
        description: "",
        total: "",
    });

    // Handle form field changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const navigate = useNavigate();

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate input
        if (!formData.description || !formData.total) {
            toast.error("All fields are required.");
            return;
        }

        try {
            const response = await api.post("/tree-census", formData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 201) {
                const data = response.data;
                toast.success("Tree Census data added successfully!");
                setFormData({ description: "", total: "" });
                setTimeout(() => {
                    navigate("/tree-census");
                }, 5000);
            } else {
                toast.error("Failed to add Tree Census data.");
            }
        } catch (error) {
            console.error("Error in submission:", error);
            toast.error("Error submitting form. Please try again.");
        }
    };

    return (
        <>
            <div className="page-wrapper">
                <div className="content">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">City Profile</Link></li>
                        <li className="breadcrumb-item"><Link to="/tree-census">Tree Census</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Add Tree Census</li>
                    </ol>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card-box">
                                <div className="card-block">
                                    <div className="row">
                                        <div className="col-sm-4 col-3">
                                            <h4 className="page-title">Add Tree Census</h4>
                                        </div>
                                    </div>
                                    <form onSubmit={handleSubmit}>

                                        <div className="form-group row">
                                            <label className="col-form-label col-md-3">Description <span className="text-danger">*</span></label>
                                            <div className="col-md-5">
                                                <input
                                                    type="text"
                                                    className="form-control form-control-lg"
                                                    name="description"
                                                    value={formData.description}
                                                    onChange={handleChange}
                                                    placeholder=""
                                                    required
                                                />

                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-form-label col-md-3">Total <span className="text-danger">*</span></label>
                                            <div className="col-md-5">
                                                <input
                                                    type="text"
                                                    className="form-control form-control-lg"
                                                    name="total"
                                                    value={formData.total}
                                                    onChange={handleChange}
                                                    placeholder=""
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

export default AddTreeCensus