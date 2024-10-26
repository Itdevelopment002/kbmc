import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddServices = () => {
  const [serviceHeading, setServiceHeading] = useState('');
  const [mainIcon, setMainIcon] = useState(null);
  const [hoverIcon, setHoverIcon] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleFileChange = (file, setFile) => {
    if (file && file.type.startsWith('image/')) {
      setFile(file);
    } else {
      toast.error('Please upload a valid image file.');
    }
  };

  const handleChange = (e) => {
    setServiceHeading(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('serviceHeading', serviceHeading);
    if (mainIcon) {
      formData.append('mainIcon', mainIcon);
    }
    if (hoverIcon) {
      formData.append('hoverIcon', hoverIcon);
    }

    try {
      const response = await axios.post('http://localhost:5000/api/services', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success(response.data.message);
      
      // Reset the form
      setServiceHeading('');
      setMainIcon(null);
      setHoverIcon(null);

      // Reset the file inputs
      document.getElementById('mainIconInput').value = '';
      document.getElementById('hoverIconInput').value = '';

      // Navigate after 5 seconds
      setTimeout(() => {
        navigate('/services'); // Use navigate to redirect
      }, 5000);
    } catch (error) {
        console.error('Error uploading file:', error);
        toast.error('Failed to add service. Please try again.');
    }
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a href="index.php">Home</a></li>
          <li className="breadcrumb-item"><a href="services.php">Services</a></li>
          <li className="breadcrumb-item active" aria-current="page">Add Services</li>
        </ol>
        <div className="row">
          <div className="col-lg-12">
            <div className="card-box">
              <div className="card-block">
                <div className="row">
                  <div className="col-sm-4 col-3">
                    <h4 className="page-title">Add Services</h4>
                  </div>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="form-group row">
                    <label className="col-form-label col-md-3">Service Heading <span className="text-danger">*</span></label>
                    <div className="col-md-4 mb-3">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter service heading"
                        value={serviceHeading}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-form-label col-lg-3">Service Icon (Main Icon) <span className="text-danger">*</span></label>
                    <div className="col-md-4">
                      <div className="input-group mb-3">
                        <input 
                          type="file"
                          id="mainIconInput"
                          className="form-control"
                          accept="image/*"
                          onChange={(e) => handleFileChange(e.target.files[0], setMainIcon)}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-form-label col-lg-3">Service Icon (Hover Icon) <span className="text-danger">*</span></label>
                    <div className="col-md-4">
                      <div className="input-group mb-3">
                        <input
                          type="file"
                          id="hoverIconInput"
                          className="form-control"
                          accept="image/*"
                          onChange={(e) => handleFileChange(e.target.files[0], setHoverIcon)}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <input type="submit" className="btn btn-primary" value="Submit" />
                </form>
                <ToastContainer />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddServices;
