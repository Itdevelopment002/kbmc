import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';  // Import Axios
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

const AddFireStation = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);  // Use useRef to reference the file input
  const [formData, setFormData] = useState({
    heading: '',
    address: '',
    phoneNo: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('heading', formData.heading);
    formDataToSend.append('address', formData.address);
    formDataToSend.append('phoneNo', formData.phoneNo);
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }

    try {
      const response = await axios.post('http://localhost:5000/api/fire-stations', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        toast.success('Fire station added successfully!');
        
        // Reset form fields including the file input
        setFormData({
          heading: '',
          address: '',
          phoneNo: '',
          image: null,
        });

        // Reset the file input using ref
        if (fileInputRef.current) {
          fileInputRef.current.value = '';  // This clears the file input
        }

        // Navigate after a delay
        setTimeout(() => {
          navigate('/firestation');
        }, 5000);  
      }
    } catch (error) {
      console.error('Error adding fire station:', error);
      toast.error('Error adding fire station. Please try again.');
    }
  };

  return (
    <>
      <ToastContainer /> {/* ToastContainer is required to show toast messages */}
      <div className="page-wrapper">
        <div className="content">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="#">City Profile</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/firestation">Fire Station</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Add Fire Station
            </li>
          </ol>
          <div className="row">
            <div className="col-lg-12">
              <div className="card-box">
                <div className="card-block">
                  <div className="row">
                    <div className="col-sm-4 col-3">
                      <h4 className="page-title">Add Fire Station</h4>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group row">
                      <label className="col-form-label col-md-3">
                        Heading <span className="text-danger">*</span>
                      </label>
                      <div className="col-md-5">
                        <input
                          type="text"
                          name="heading"
                          className="form-control form-control-lg"
                          placeholder="Enter heading"
                          value={formData.heading}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-form-label col-md-3">
                        Address <span className="text-danger">*</span>
                      </label>
                      <div className="col-md-5">
                        <input
                          type="text"
                          name="address"
                          className="form-control form-control-lg"
                          placeholder="Enter address"
                          value={formData.address}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-form-label col-md-3">
                        Phone No. <span className="text-danger">*</span>
                      </label>
                      <div className="col-md-5">
                        <input
                          type="text"
                          name="phoneNo"
                          className="form-control form-control-lg"
                          placeholder="Enter phone number"
                          value={formData.phoneNo}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-form-label col-md-3">
                        Upload Fire Station Image
                      </label>
                      <div className="col-md-5">
                        <div className="input-group mb-3">
                          <input
                            type="file"
                            name="image"
                            className="form-control"
                            onChange={handleChange}
                            ref={fileInputRef}  // Attach the ref to the file input
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
  );
};

export default AddFireStation;
