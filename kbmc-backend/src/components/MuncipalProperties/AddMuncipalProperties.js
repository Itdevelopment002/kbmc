import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import api from "../api";
import { Link } from "react-router-dom";

const AddMuncipalProperties = () => {
    const [formData, setFormData] = useState({
        heading: "",
        name: "",
        propertyType: "",
        address: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Form Data Submitted:", formData);

        try {
            const response = await api.post('/muncipal', formData);
            console.log("Property holder added:", response.data);
            navigate('/muncipal-properties');

        } catch (error) {
            console.error("Error adding property holder:", error.response?.data || error.message);
        }

    };
    return (
        <>
            <div className="page-wrapper">
                <div className="content">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">City Profile</Link></li>
                        <li className="breadcrumb-item"><Link to="/muncipal-properties">Muncipal Properties</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Add Muncipal Properties</li>
                    </ol>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card-box">
                                <div className="card-block">
                                    <div className="row">
                                        <div className="col-sm-4 col-3">
                                            <h4 className="page-title">Add Muncipal Properties</h4>
                                        </div>
                                    </div>
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group row">
                                            <label className="col-form-label col-md-3">Heading <span className="text-danger">*</span></label>
                                            <div className="col-md-5">
                                                <input
                                                    type="text"
                                                    className="form-control form-control-lg"
                                                    name="heading"
                                                    value={formData.heading}
                                                    onChange={handleChange}
                                                    placeholder="" />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-form-label col-md-3">Name <span className="text-danger">*</span></label>
                                            <div className="col-md-5">
                                                <input
                                                    type="text"
                                                    className="form-control form-control-lg"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    placeholder=""
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-form-label col-md-3">Shops / Sabhagruha etc. <span className="text-danger">*</span></label>
                                            <div className="col-md-5">
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
                                            <label className="col-form-label col-md-3">Address <span className="text-danger">*</span></label>
                                            <div className="col-md-5">
                                                <textarea
                                                    className="form-control form-control-lg"
                                                    rows="4"
                                                    cols="50"
                                                    name="address"
                                                    value={formData.address}
                                                    onChange={handleChange}
                                                ></textarea>
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

export default AddMuncipalProperties