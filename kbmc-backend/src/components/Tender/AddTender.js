import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

const AddTender = () => {

    const [tenderDescription, setTenderDescription] = useState('');
    const [isNew, setIsNew] = useState(false);
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
           
            await api.post('/tenders', {
                tenders: tenderDescription,
                status: isNew ? 'New' : '-'  
            });

           
            navigate('/tenders');
        } catch (error) {
            setError('There was an issue submitting the tender. Please try again.');
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

  return (
    <>
    <div className="page-wrapper">
    <div className="content">
        <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item"><Link to="/tenders">Tender</Link></li>
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
                                <label className="col-form-label col-md-2">Tender Description <span className="text-danger">*</span></label>
                                <div className="col-md-4">
                                    <input 
                                    type="text" 
                                    className="form-control form-control-lg"
                                     placeholder=""
                                     value={tenderDescription}
                                     onChange={(e) => setTenderDescription(e.target.value)}
                                     required/>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-form-label col-md-2">Status <span className="text-danger">*</span></label>
                                <div className="col-md-10">
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
                            <input type="submit" className="btn btn-primary" value="Submit"/>
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

export default AddTender