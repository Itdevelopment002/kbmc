import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

const AddGarden = () => {
    const [heading, setHeading] = useState('');
    const [images, setImages] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('heading', heading);
        images.forEach((image) => {
            formData.append('images', image);
        });

        try {
            const response = await api.post('/gardens', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert(response.data.message);
            navigate('/garden');
        } catch (error) {
            console.error('Error adding garden:', error);
            alert('Failed to add garden. Please try again.');
        }
    };

    const handleImageChange = (e) => {
        setImages([...e.target.files]); // Store selected images
    };

    return (
        <>
            <div className="page-wrapper">
                <div className="content">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">City Profile</Link></li>
                        <li className="breadcrumb-item"><Link to="/garden">Gardens</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Add Gardens</li>
                    </ol>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card-box">
                                <div className="card-block">
                                    <div className="row">
                                        <div className="col-sm-4 col-3">
                                            <h4 className="page-title">Add Gardens</h4>
                                        </div>
                                    </div>
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group row">
                                            <label className="col-form-label col-md-3">Heading <span className="text-danger">*</span></label>
                                            <div className="col-md-5">
                                                <input
                                                    type="text"
                                                    className="form-control form-control-lg"
                                                    value={heading}
                                                    onChange={(e) => setHeading(e.target.value)}
                                                    placeholder=""
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-form-label col-lg-3">Upload Garden Photos</label>
                                            <div className="col-md-5">
                                                <div className="input-group mb-3">
                                                    <input
                                                        type="file"
                                                        id="images"
                                                        name="images"
                                                        className="form-control col-md-12 col-xs-12 userfile"
                                                        multiple
                                                        onChange={handleImageChange}
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

export default AddGarden