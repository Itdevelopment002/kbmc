import React, { useState } from 'react';
import api from '../api';  // Import api for API requests
import { Link, useNavigate } from 'react-router-dom';  // Import useNavigate
import { toast, ToastContainer } from 'react-toastify';  // Import Toastify components
import 'react-toastify/dist/ReactToastify.css';  // Import Toastify styles

const Add_slider = () => {
  const [sliderName, setSliderName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();  // Initialize useNavigate

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      toast.error('Please select a file to upload.');  // Show error toast
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);  // File input name
    formData.append('sliderName', sliderName);  // Pass slider name from state

    try {
      const response = await api.post('/sliders', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSliderName('');  // Reset slider name
      setSelectedFile(null);  // Reset file selection
      document.getElementById('image').value = ''; 
      toast.success('File uploaded successfully!');  // Show success toast
      setTimeout(() => {
        navigate('/slider');  // Navigate after successful post
      }, 5000);  // Wait for 2 seconds before navigating

    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Error uploading file. Please try again.');  // Show error toast
    }
  };


  return (
    <div className="page-wrapper">
      <ToastContainer />  {/* Render ToastContainer for toasts */}
      <div className="content">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/slider">Slider</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Add Slider
          </li>
        </ol>

        <div className="row">
          <div className="col-lg-12">
            <div className="card-box">
              <div className="card-block">
                <div className="row">
                  <div className="col-sm-4 col-3">
                    <h4 className="page-title">Add Slider</h4>
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="form-group row">
                    <label className="col-form-label col-md-2">Slider Name</label>
                    <div className="col-md-4 mb-3">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        value={sliderName}
                        onChange={(e) => setSliderName(e.target.value)}
                        placeholder="Enter slider name"
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <label className="col-form-label col-lg-2">Upload Image</label>
                    <div className="col-md-4">
                      <div className="input-group mb-3">
                        <input
                          type="file"
                          id="image"
                          name="image"  // Change to match backend field
                          className="form-control col-md-12 col-xs-12"
                          onChange={handleFileChange}
                        />
                      </div>
                    </div>
                  </div>

                  <input type="submit" className="btn btn-primary" value="Upload" />
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add_slider;
