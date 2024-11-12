import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

const AddElectric = () => {
    const [formData, setFormData] = useState({
        heading: '',        
        description: '',
        mobileNo: '',
        vendorName: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Sending form data to the backend, including heading
            const response = await api.post('/electric', {
                heading: formData.heading,  // Include heading
                description: formData.description,
                mobileNo: formData.mobileNo,
                vendorName: formData.vendorName
            });

            console.log('Response:', response.data); // Handle success response
            navigate('/electric'); // Redirect to the electric items list
        } catch (err) {
            console.error('Error:', err);
            setError('Failed to add electric item. Please try again.'); // Display error message
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <div className="page-wrapper">
                <div className="content">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">City Profile</Link></li>
                        <li className="breadcrumb-item"><Link to="/electric">Electric</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Add Electric</li>
                    </ol>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card-box">
                                <div className="card-block">
                                    <div className="row">
                                        <div className="col-sm-4 col-3">
                                            <h4 className="page-title">Add Electric</h4>
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
                                                    required
                                                    placeholder=""
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-form-label col-md-3">Description <span className="text-danger">*</span></label>
                                            <div className="col-md-5">
                                                <input
                                                 type="text" 
                                                 className="form-control form-control-lg" 
                                                 placeholder="" 
                                                 name="description"
                                                value={formData.description} 
                                                onChange={handleChange}
                                                required/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-form-label col-md-3">Mobile No. <span className="text-danger">*</span></label>
                                            <div className="col-md-5">
                                                <input 
                                                type="text" 
                                                className="form-control form-control-lg" 
                                                placeholder="" 
                                                name="mobileNo"
                                                value={formData.mobileNo} 
                                                onChange={handleChange}
                                                required/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-form-label col-md-3">Vendor Name <span className="text-danger">*</span></label>
                                            <div className="col-md-5">
                                                <input 
                                                type="text" 
                                                className="form-control form-control-lg" 
                                                placeholder="" 
                                                name="vendorName"
                                                value={formData.vendorName} 
                                                onChange={handleChange}
                                                required/>
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

export default AddElectric