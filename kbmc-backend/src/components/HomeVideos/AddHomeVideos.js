import React, { useState } from 'react';
import api from '../api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";
import { Link } from "react-router-dom";

const AddHomeVideos = () => {
    const [description, setDescription] = useState('');
    const [publishDate, setPublishDate] = useState('');
    const [videoUrl, setVideoUrl] = useState('');

    const navigate = useNavigate();

    const formatDate = (date) => {
        const d = new Date(date);
        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const year = d.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formattedDate = formatDate(publishDate);

        const videoData = {
            description,
            publishDate: formattedDate,
            videoUrl,
        };

        try {
            await api.post('/home-videos', videoData);
            toast.success('Video added successfully!');
            setDescription('');
            setPublishDate('');
            setVideoUrl('');

            navigate('/home-videos');

        } catch (error) {
            toast.error('Failed to add video. Please try again.');
        }
    };
    return (
        <>
            <div className="page-wrapper">
                <div className="content">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item"><Link to="/home-videos">Home Video</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Add Home Video</li>
                    </ol>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card-box">
                                <div className="card-block">
                                    <div className="row">
                                        <div className="col-sm-4 col-3">
                                            <h4 className="page-title">Add Home Video</h4>
                                        </div>
                                    </div>
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group row">
                                            <label className="col-form-label col-md-2">Home Video Description <span className="text-danger">*</span></label>
                                            <div className="col-md-4">
                                                <input
                                                    type="text"
                                                    className="form-control form-control-lg"
                                                    placeholder=""
                                                    value={description}
                                                    onChange={(e) => setDescription(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-form-label col-md-2">Publish Date <span className="text-danger">*</span></label>
                                            <div className="cal-icon col-md-4">
                                                <Flatpickr
                                                    id="startDatePicker"
                                                    className="flatpickr-input form-control"
                                                    placeholder="Select Publish Date"
                                                    value={publishDate}
                                                    onChange={(date) => setPublishDate(date[0])}
                                                    options={{
                                                        dateFormat: 'd-m-Y',
                                                        monthSelectorType: 'dropdown',
                                                        prevArrow:
                                                            '<svg><path d="M10 5L5 10L10 15"></path></svg>',
                                                        nextArrow:
                                                            '<svg><path d="M5 5L10 10L5 15"></path></svg>',
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-form-label col-lg-2">Upload URL <span className="text-danger">*</span></label>
                                            <div className="col-md-4">
                                                <div className="input-group mb-3">
                                                    <input
                                                        type="text"
                                                        className="form-control col-md-12 col-xs-12 userfile"
                                                        placeholder=""
                                                        value={videoUrl}
                                                        onChange={(e) => setVideoUrl(e.target.value)}
                                                        required
                                                    />
                                                </div>
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

export default AddHomeVideos