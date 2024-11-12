import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

const AddGovtWebsiteLink = () => {
    const [websitelink, setLink] = useState('');
    const [websitelogo, setLogo] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!websitelink || !websitelogo) {
            alert('Please provide both the website link and logo.');
            return;
        }

        const formData = new FormData();
        formData.append('websitelink', websitelink); // Ensure key matches the server
        formData.append('websitelogo', websitelogo); // Ensure key matches the server

        try {
            const response = await api.post('/websitelinks', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 201) { // Check for 201 Created status
                navigate('/gov-website-link', { replace: true });
            } else {
                alert('Failed to add website link. Please try again.');
            }
        } catch (error) {
            console.error('Error uploading website link:', error);
            if (error.response) {
                alert(`Error: ${error.response.data.message || 'Failed to upload the website link.'}`);
            } else {
                alert('Error: Unable to connect to the server.');
            }
        }
    };

    return (
        <>
            <div className="page-wrapper">
                <div className="content">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item"><Link to="/gov-website-link">Govt. Website Link</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Add Govt. Website Link</li>
                    </ol>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card-box">
                                <div className="card-block">
                                    <div className="row">
                                        <div className="col-sm-4 col-3">
                                            <h4 className="page-title">Add Govt. Website Link</h4>
                                        </div>
                                    </div>
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group row">
                                            <label className="col-form-label col-md-2">Govt. Website Link</label>
                                            <div className="col-md-4">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Enter website link"
                                                    value={websitelink}
                                                    onChange={(e) => setLink(e.target.value)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-form-label col-lg-2">Govt. Website Link Logo</label>
                                            <div className="col-md-4">
                                                <div className="input-group mb-3">
                                                    <input
                                                        type="file"
                                                        id="userfile"
                                                        name="websitelogo"
                                                        className="form-control col-md-12 col-xs-12"
                                                        onChange={(e) => setLogo(e.target.files[0])}
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

export default AddGovtWebsiteLink