import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

const AddRoads = () => {
    const [heading, setHeading] = useState('');
    const [description, setDescription] = useState('');
    const [length, setLength] = useState('');
    const navigate = useNavigate(); // Get the navigate function

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/roads', {
                heading,
                description,
                length,
            });
            navigate('/roads'); // Navigate to the roads page after successful submission
        } catch (error) {
            console.error('Error adding road:', error.response ? error.response.data : error.message);
        }
    };
    return (
        <>
            <div className="page-wrapper">
                <div className="content">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">City Profile</Link></li>
                        <li className="breadcrumb-item"><Link to="/roads">Roads</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Add Roads</li>
                    </ol>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card-box">
                                <div className="card-block">
                                    <div className="row">
                                        <div className="col-sm-4 col-3">
                                            <h4 className="page-title">Add Roads</h4>
                                        </div>
                                    </div>
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group row">
                                            <label className="col-form-label col-md-3">Heading <span className="text-danger"></span></label>
                                            <div className="col-md-5">
                                                <input
                                                    type="text"
                                                    className="form-control form-control-lg"
                                                    placeholder=""
                                                    value={heading}
                                                    onChange={(e) => setHeading(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-form-label col-md-3">Description <span className="text-danger">*</span></label>
                                            <div className="col-md-5">
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
                                            <label className="col-form-label col-md-3">Length <span className="text-danger">*</span></label>
                                            <div className="col-md-5">
                                                <input 
                                                type="text" 
                                                className="form-control form-control-lg" 
                                                placeholder="" 
                                                value={length}
                                                onChange={(e) => setLength(e.target.value)}
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

export default AddRoads