import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from "../../api"

const Add_award = () => {
    const [heading, setHeading] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            // Make a POST request to the API with JSON content
            const response = await api.post('/awards', {
                heading,
                description,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
    
            if (response.status !== 201) {
                throw new Error('Failed to add award');
            }
    
            // Reset form fields after successful submission
            setHeading('');
            setDescription('');
    
            // Navigate to awards page
            navigate('/Award'); // Change this path if needed
        } catch (error) {
            console.error('Error:', error);
            // Display a user-friendly error message here if needed
        }
    };
    

    return (
        <div className="page-wrapper">
            <div className="content">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="index.php">About KBMC</Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link to="award.php">Awards</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Add Awards
                    </li>
                </ol>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card-box">
                            <div className="card-block">
                                <div className="row">
                                    <div className="col-sm-4 col-3">
                                        <h4 className="page-title">Add Awards</h4>
                                    </div>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group row">
                                        <label className="col-form-label col-md-2">
                                            Heading <span className="text-danger">*</span>
                                        </label>
                                        <div className="col-md-5">
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={heading}
                                                onChange={(e) => setHeading(e.target.value)}
                                                placeholder="Enter award heading"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row mt-3">
                                        <label className="col-form-label col-md-2">Description <span className="text-danger">*</span></label>
                                        <div className="col-md-5">
                                            <textarea
                                                className="form-control"
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                                placeholder="Enter a brief description"
                                                rows="3"
                                                style={{ resize: 'none' }}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row mt-3">
                                        <div className="col-md-6 col-md-2">
                                            <button type="submit" className="btn btn-primary">
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Add_award;
