import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Add_tender = () => {
    const [tenderDescription, setTenderDescription] = useState('');
    const [isNew, setIsNew] = useState(false);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate(); // For navigation after form submission

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            // Make the API request to add the tender
            await axios.post('http://localhost:5000/api/tenders', {
                tenders: tenderDescription,
                status: isNew ? 'New' : '-'  // Assuming status can be 'New' or 'Old'
            });

            // On success, navigate back to the Tender list page
            navigate('/Tenders');
        } catch (error) {
            setError('There was an issue submitting the tender. Please try again.');
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="page-wrapper">
            <div className="content">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                    <li className="breadcrumb-item"><Link to="/tender">Tender</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Add Tender</li>
                </ol>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card-box">
                            <div className="card-block">
                                <div className="row">
                                    <div className="col-sm-4 col-3">
                                        <h4 className="page-title">Add Tender</h4>
                                    </div>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group row">
                                        <label className="col-form-label col-md-3 mb-3">
                                            Tender Description <span className="text-danger">*</span>
                                        </label>
                                        <div className="col-md-4">
                                            <input
                                                type="text"
                                                className="form-control form-control-lg"
                                                placeholder="Enter tender description"
                                                value={tenderDescription}
                                                onChange={(e) => setTenderDescription(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-form-label col-md-3 mt-3">
                                            Status <span className="text-danger">*</span>
                                        </label>
                                        <div className="col-md-3 mt-3 mb-3">
                                            <div className="checkbox">
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        checked={isNew}
                                                        onChange={() => setIsNew(!isNew)}
                                                    />{' '}
                                                    New
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    {error && <div className="alert alert-danger">{error}</div>}
                                    <input
                                        type="submit"
                                        className="btn btn-primary"
                                        value={isSubmitting ? 'Submitting...' : 'Submit'}
                                        disabled={isSubmitting}
                                    />
                                </form>
                            </div>
                        </div>
                    </div>	
                </div>
            </div>
        </div>
    );
};

export default Add_tender;
