import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from "../api"

const AddPondsAndTalao = () => {
    const [pondsName, setPondsName] = useState('');
    const navigate = useNavigate(); // To redirect the user

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post('/ponds-talao', {
                name: pondsName,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });


            if (response.status === 200) {
                console.log('Ponds/Talao added successfully');
                // Redirect to news update page
                navigate('/ponds-talao');
            } else {
                console.error('Failed to add ponds');
            }
        } catch (error) {
            console.error('Error while adding ponds:', error);
        }

        // Reset the form
        setPondsName('');
    };
    return (
        <>
            <div className="page-wrapper">
                <div className="content">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">City Profile</Link></li>
                        <li className="breadcrumb-item"><Link to="/ponds-talao">Ponds and Talao</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Add Ponds and Talao</li>
                    </ol>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card-box">
                                <div className="card-block">
                                    <div className="row">
                                        <div className="col-sm-4 col-3">
                                            <h4 className="page-title">Add Tree Ponds and Talao</h4>
                                        </div>
                                    </div>
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-group row">
                                            <label className="col-form-label col-md-3">Talao Name <span className="text-danger">*</span></label>
                                            <div className="col-md-5">
                                                <input
                                                    type="text"
                                                    className="form-control form-control-lg"
                                                    placeholder=""
                                                    value={pondsName}
                                                    onChange={(e) => setPondsName(e.target.value)}
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

export default AddPondsAndTalao