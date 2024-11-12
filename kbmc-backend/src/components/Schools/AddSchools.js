import React, { useState } from "react";
import api from "../api";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const AddSchools = () => {
    const [schoolData, setSchoolData] = useState({
        heading: "",
        schoolName: "",
        address: "",
        medium: "",
    });

    const [imageData, setImageData] = useState({
        schoolPhoto: null,
    });

    const navigate = useNavigate();

    // Handle change for school form inputs
    const handleSchoolChange = (e) => {
        const { name, value } = e.target;
        setSchoolData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle change for image input
    const handleImageChange = (e) => {
        setImageData({
            schoolPhoto: e.target.files[0],
        });
    };

    // Submit school form data
    const handleSchoolSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/schools", schoolData);
            toast.success("School data submitted successfully!", {
                position: "top-right",
                autoClose: 5000,
            });
            setSchoolData({
                heading: "",
                schoolName: "",
                address: "",
                medium: "",
            });
            navigate("/schools");
        } catch (error) {
            toast.error("Failed to submit school data. Please try again.", {
                position: "top-right",
                autoClose: 5000,
            });
        }
    };

    // Submit image data
    const handleImageSubmit = async (e) => {
        e.preventDefault();
        if (!imageData.schoolPhoto) {
            toast.error("Please select an image before submitting.", {
                position: "top-right",
                autoClose: 5000,
            });
            return;
        }

        try {
            const imageFormData = new FormData();
            imageFormData.append("schoolPhoto", imageData.schoolPhoto);

            await api.post("/school-images", imageFormData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            toast.success("Image uploaded successfully!", {
                position: "top-right",
                autoClose: 5000,
            });

            setImageData({
                schoolPhoto: null,
            });
            navigate("/schools");
        } catch (error) {
            toast.error("Failed to upload image. Please try again.", {
                position: "top-right",
                autoClose: 5000,
            });
        }
    };

    return (
        <>
            <div className="page-wrapper">
                <div className="content">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">City Profile</Link></li>
                        <li className="breadcrumb-item"><Link to="/schools">Schools</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Add Schools</li>
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
                                    <form onSubmit={handleSchoolSubmit}>
                                        <div className="form-group row">
                                            <label className="col-form-label col-md-3">Heading <span className="text-danger"></span></label>
                                            <div className="col-md-5">
                                                <input
                                                    type="text"
                                                    className="form-control form-control-lg"
                                                    placeholder=""
                                                    name="heading"
                                                    value={schoolData.heading}
                                                    onChange={handleSchoolChange} />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-form-label col-md-3">School Names <span className="text-danger">*</span></label>
                                            <div className="col-md-5">
                                                <input
                                                    type="text"
                                                    className="form-control form-control-lg"
                                                    placeholder=""
                                                    name="schoolName"
                                                    value={schoolData.schoolName}
                                                    onChange={handleSchoolChange} />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-form-label col-md-3">Address <span className="text-danger">*</span></label>
                                            <div className="col-md-5">
                                                <textarea
                                                    className="form-control form-control-lg"
                                                    rows="4"
                                                    cols="50"
                                                    id="address"
                                                    name="address"
                                                    value={schoolData.address}
                                                    onChange={handleSchoolChange}
                                                ></textarea>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-md-3 col-form-label">Medium</label>
                                            <div className="col-md-5">
                                                <select
                                                    className="select"
                                                    name="medium"
                                                    value={schoolData.medium}
                                                    onChange={handleSchoolChange}
                                                >
                                                    <option>Select Medium</option>
                                                    <option value="Marathi">Marathi</option>
                                                    <option value="Urdu">Urdu</option>
                                                    <option value="English">English</option>
                                                    <option value="Semi English">Semi English</option>
                                                </select>
                                            </div>
                                        </div>
                                        <input type="submit" className="btn btn-primary" value="Submit" />
                                    </form>
                                    <hr />
                                    <form onSubmit={handleImageSubmit} className="pt-3">
                                        <div className="form-group row">
                                            <label className="col-form-label col-lg-2">Upload School Photos</label>
                                            <div className="col-md-4">
                                                <div className="input-group">
                                                    <input
                                                        type="file"
                                                        className="form-control col-md-12 col-xs-12 userfile"
                                                        name="schoolPhoto"
                                                        onChange={handleImageChange}
                                                        accept="image/*"

                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-2">
                                                <input type="submit" className="btn btn-primary" value="Submit" />
                                            </div>
                                        </div>

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

export default AddSchools