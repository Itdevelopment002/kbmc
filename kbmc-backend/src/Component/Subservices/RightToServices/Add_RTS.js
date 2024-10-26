import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';

function Add_RTS() {
  const [description, setDescription] = useState(''); // Change here
  const [file, setFile] = useState(null);
  const navigate = useNavigate(); // Get the navigate function

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to send file and pdfdescription
    const formData = new FormData();
    formData.append('description', description); // Change here
    formData.append('userfile', file);

    try {
      // Send data to the server
      const response = await axios.post('http://localhost:5000/api/rts_table', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Response:', response.data);
      // Optionally reset the form or handle success message
      setDescription(''); // Change here
      setFile(null);
      navigate('/RTS'); // Navigate to /rts after successful submission
    } catch (error) {
      console.error('Error uploading Right to Service:', error.response.data);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <ol className="breadcrumb">
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
                <form onSubmit={handleSubmit}>
                  <div className="form-group row">
                    <label className="col-form-label col-md-2">
                      PDF Description <span className="text-danger">*</span> {/* Change here */}
                    </label>
                    <div className="col-md-4">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder=""
                        value={description} // Change here
                        onChange={(e) => setDescription(e.target.value)} // Change here
                        required // Added required attribute for validation
                      />
                    </div>
                  </div>
                  <div className="form-group row mt-3">
                    <label className="col-form-label col-lg-2">Upload PDF <span className="text-danger">*</span></label>
                    <div className="col-md-4">
                      <div className="input-group mb-3">
                        <input
                          type="file"
                          id="userfile"
                          name="userfile"
                          className="form-control col-md-12 col-xs-12 userfile"
                          onChange={handleFileChange}
                          required // Added required attribute for validation
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
  );
}

export default Add_RTS;
