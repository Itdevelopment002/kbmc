import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 

const Add_ponds = () => {
    const [pondsName, setPondsName] = useState('');
    const navigate = useNavigate(); // To redirect the user

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Make the POST request to your backend API
            const response = await fetch('http://localhost:5000/api/ponds-talao', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: pondsName }),
            });

            if (response.ok) {
                console.log('Ponds/Talao added successfully');
                // Redirect to news update page
                navigate('/ponds');
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
        <div className="page-wrapper">
            <div className="content">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">City Profile</Link></li>
                    <li className="breadcrumb-item"><Link to="/ponds">Ponds / Talao</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Add Ponds/Talao</li>
                </ol>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card-box">
                            <div className="card-block">
                                <div className="row">
                                    <div className="col-sm-4 col-3">
                                        <h4 className="page-title">Add Ponds/Talao</h4>
                                    </div>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group row">
                                        <label className="col-form-label col-md-2">Talao Name <span className="text-danger">*</span></label>
                                        <div className="col-md-4">
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
    );
};

export default Add_ponds;
