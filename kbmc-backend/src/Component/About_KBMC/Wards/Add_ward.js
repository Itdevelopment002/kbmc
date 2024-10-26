import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';  
import axios from 'axios';

const AddWard = () => {
    const [wardNo, setWardNo] = useState('');
    const [wardName, setWardName] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/wards', {
                ward_no: wardNo,
                ward_name: wardName,
            });
            console.log('Response:', response.data);
            setSuccessMessage('Ward added successfully!');
            // Reset form
            setWardNo('');
            setWardName('');
            setError(null); 

            navigate('/ward');  
        } catch (err) {
            console.error('Error adding ward:', err);
            setError('Error adding ward. Please try again.');
            setSuccessMessage(null);
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
                        <Link to="ward.php">Ward</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Add Ward
                    </li>
                </ol>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card-box">
                            <div className="card-block">
                                <div className="row">
                                    <div className="col-sm-4 col-3">
                                        <h4 className="page-title">Add Ward</h4>
                                    </div>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group row">
                                        <label className="col-form-label col-md-2">
                                            Ward No. <span className="text-danger">*</span>
                                        </label>
                                        <div className="col-md-4">
                                            <input
                                                type="text"
                                                className="form-control form-control-lg"
                                                placeholder=""
                                                value={wardNo}
                                                onChange={(e) => setWardNo(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row mt-3">
                                        <label className="col-form-label col-md-2">
                                            Ward Name <span className="text-danger">*</span>
                                        </label>
                                        <div className="col-md-4">
                                            <input
                                                type="text"
                                                className="form-control form-control-lg"
                                                placeholder=""
                                                value={wardName}
                                                onChange={(e) => setWardName(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row mt-3">
                                        <div className="col-md-4 md-2">
                                            <input type="submit" className="btn btn-primary" value="Submit" />
                                        </div>
                                    </div>
                                    
                                    {error && <div className="alert alert-danger">{error}</div>}
                                    {successMessage && <div className="alert alert-success">{successMessage}</div>}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddWard;
