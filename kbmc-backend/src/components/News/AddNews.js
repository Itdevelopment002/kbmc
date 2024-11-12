import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from "../api"
const AddNews = () => {

    const [newsDescription, setNewsDescription] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            
            const response = await api.post('/newsupdate', {
                description: newsDescription,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                navigate('/news');
            } else {
                console.error('Failed to add news');
            }
        } catch (error) {
            console.error('Error while adding news:', error);
        }

 
        setNewsDescription('');
    };
    return (
        <>

            <div className="page-wrapper">
                <div className="content">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item"><Link to="/news">News Update</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Add News</li>
                    </ol>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card-box">
                                <div className="card-block">
                                    <div className="row">
                                        <div className="col-sm-4 col-3">
                                            <h4 className="page-title">Add News</h4>
                                        </div>
                                    </div>
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group row">
                                            <label className="col-form-label col-md-2">News Description <span className="text-danger">*</span></label>
                                            <div className="col-md-4">
                                                <input
                                                    type="text"
                                                    className="form-control form-control-lg"
                                                    placeholder=""
                                                    value={newsDescription} 
                                                onChange={(e) => setNewsDescription(e.target.value)} 
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

export default AddNews