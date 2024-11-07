import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import api from '../../api'; // Add api for API requests

function Add_RTSDES() {
  const [heading, setHeading] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState(''); // To show success/error messages

  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!heading || !description) {
      setMessage('Both Heading and Description are required.');
      return;
    }

    // Send data to the API
    try {
      const response = await api.post('/righttoservices', {
        heading,
        description,
      });

      // If success, show success message and clear form
      setMessage('Right to Service added successfully.');
      setHeading('');
      setDescription('');

      // After a short delay, navigate to the RTS page
      setTimeout(() => {
        navigate('/rts'); // Redirect to RTS page
      }, 1000); // 1 second delay to show the success message

    } catch (error) {
      // Handle error
      console.error('Error adding Right to Service:', error);
      setMessage('Failed to add Right to Service.');
    }
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/rts">Right to Service</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Add Right to Service
          </li>
        </ol>
        <div className="row">
          <div className="col-lg-12">
            <div className="card-box">
              <div className="card-block">
                <div className="row">
                  <div className="col-sm-4 col-3">
                    <h4 className="page-title">Add Right to Service</h4>
                  </div>
                </div>
                {/* Display success or error messages */}
                {message && <div className="alert alert-info">{message}</div>}

                <form onSubmit={handleSubmit}>
                  {/* Heading Field */}
                  <div className="form-group row">
                    <label className="col-form-label col-md-2">
                      Heading <span className="text-danger">*</span>
                    </label>
                    <div className="col-md-4">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder=""
                        value={heading}
                        onChange={(e) => setHeading(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Description Field */}
                  <div className="form-group row">
                    <label className="col-form-label col-md-2">
                      Description <span className="text-danger">*</span>
                    </label>
                    <div className="col-md-4">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder=""
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
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
}

export default Add_RTSDES;
