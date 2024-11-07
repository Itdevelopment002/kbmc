import React, { useState } from 'react';
import api from '../../api'; // For making the API request
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'; // For navigation
import { Link } from "react-router-dom";

const Add_history = () => {
    const [description, setDescription] = useState('');
    const navigate = useNavigate(); 

    const handleChange = (e) => {
        setDescription(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            // Post the description to the server
            await api.post('/history', { description });
            toast.success("Description submitted successfully!");
            setTimeout(() => {
                navigate('/history');
            }, 5000);
        } catch (error) {
            toast.error("Failed to submit description.");
            console.error("Error submitting description:", error);
        }
    };

    return (
        <div className="page-wrapper">
            <div className="content">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="#.">About KBMC</Link></li>
                    <li className="breadcrumb-item"><Link to="/history">History and Chief Officer</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Add History</li>
                </ol>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card-box">
                            <div className="card-block">
                                <div className="row">
                                    <div className="col-sm-4 col-3">
                                        <h4 className="page-title">Add History</h4>
                                    </div>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group row mt-3">
                                        <label className="col-form-label col-md-2">
                                            Description <span className="text-danger">*</span>
                                        </label>
                                        <div className="col-md-4">
                                            <input
                                                type="text"
                                                className="form-control form-control-lg"
                                                name="description"
                                                value={description}
                                                onChange={handleChange}
                                                placeholder="Enter description"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row ">
                                        <div className="col-md-4 md-2 my-3">
                                            <input
                                                type="submit"
                                                className="btn btn-primary"
                                                value="Submit"
                                            />
                                        </div>
                                    </div>
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

export default Add_history;
