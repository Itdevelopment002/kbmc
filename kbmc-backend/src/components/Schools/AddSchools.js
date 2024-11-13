import React, { useState } from "react";
import api from "../api";
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

    const handleSchoolChange = (e) => {
        const { name, value } = e.target;
        setSchoolData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        setImageData({
            schoolPhoto: e.target.files[0],
        });
    };

    const handleSchoolSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/schools", schoolData);
            setSchoolData({
                heading: "",
                schoolName: "",
                address: "",
                medium: "",
            });
            navigate("/schools");
        } catch (error) {
            console.error("Failed to submit school data", error);
        }
    };

    const handleImageSubmit = async (e) => {
        e.preventDefault();
        if (!imageData.schoolPhoto) {
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
            setImageData({
                schoolPhoto: null,
            });
            navigate("/schools");
        } catch (error) {
            console.error("Failed to upload image", error);
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
                                                    className="form-control form-control-md"
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
                                                    className="form-control form-control-md"
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
                                                    className="form-control form-control-md"
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
                                                    className="form-control form-control-md"
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
                                        <input type="submit" className="btn btn-primary btn-sm" value="Submit" />
                                    </form>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-4 col-3">
                                            <h4 className="page-title">Add School Images</h4>
                                        </div>
                                    </div>
                                    <form onSubmit={handleImageSubmit} className="pt-3">
                                        <div className="form-group row">
                                            <label className="col-form-label col-lg-2">Upload School Photos</label>
                                            <div className="col-md-4">
                                                <div className="input-group">
                                                    <input
                                                        type="file"
                                                        className="form-control form-control-md"
                                                        name="schoolPhoto"
                                                        onChange={handleImageChange}
                                                        accept="image/*"

                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <input type="submit" className="btn btn-primary btn-sm" value="Upload" />
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