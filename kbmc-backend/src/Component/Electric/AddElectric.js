import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const AddElectric = () => {
    // State to manage form data and loading/error states
    const [formData, setFormData] = useState({
        heading: '',         // Include heading in the state
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
            const response = await axios.post('http://localhost:5000/api/electric', {
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
        <div className="page-wrapper">
            <div className="content">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to="/index">City Profile</Link>
                    </li>
                    <li className="breadcrumb-item">
                        <Link to="/electric">Electric</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        Add Electric
                    </li>
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

                                <Form onSubmit={handleSubmit}>
                                    {/* Heading Field - Required */}
                                    <Form.Group className="row">
                                        <Form.Label className="col-form-label col-md-3">
                                            Heading <span className="text-danger">*</span>
                                        </Form.Label>
                                        <div className="col-md-5 mb-2">
                                            <Form.Control 
                                                type="text" 
                                                name="heading"
                                                className="form-control-lg" 
                                                placeholder="Enter heading" 
                                                value={formData.heading} 
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </Form.Group>

                                    {/* Description Field - Required */}
                                    <Form.Group className="row">
                                        <Form.Label className="col-form-label col-md-3">
                                            Description <span className="text-danger">*</span>
                                        </Form.Label>
                                        <div className="col-md-5 mb-2">
                                            <Form.Control 
                                                type="text" 
                                                name="description"
                                                className="form-control-lg" 
                                                placeholder="Enter description" 
                                                value={formData.description} 
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </Form.Group>

                                    {/* Mobile Number Field - Required */}
                                    <Form.Group className="row">
                                        <Form.Label className="col-form-label col-md-3">
                                            Mobile No. <span className="text-danger">*</span>
                                        </Form.Label>
                                        <div className="col-md-5 mb-2">
                                            <Form.Control 
                                                type="text" 
                                                name="mobileNo"
                                                className="form-control-lg" 
                                                placeholder="Enter mobile number" 
                                                value={formData.mobileNo} 
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </Form.Group>

                                    {/* Vendor Name Field - Required */}
                                    <Form.Group className="row">
                                        <Form.Label className="col-form-label col-md-3">
                                            Vendor Name <span className="text-danger">*</span>
                                        </Form.Label>
                                        <div className="col-md-5 mb-2">
                                            <Form.Control 
                                                type="text" 
                                                name="vendorName"
                                                className="form-control-lg" 
                                                placeholder="Enter vendor name" 
                                                value={formData.vendorName} 
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </Form.Group>

                                    {/* Error Display */}
                                    {error && <div className="text-danger">{error}</div>}

                                    {/* Submit Button */}
                                    <Button type="submit" className="btn btn-primary" disabled={loading}>
                                        {loading ? 'Submitting...' : 'Submit'}
                                    </Button>
                                </Form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddElectric;
