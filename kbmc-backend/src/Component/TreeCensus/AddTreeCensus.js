import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'; // Import ToastContainer here
import 'react-toastify/dist/ReactToastify.css';

const AddTreeCensus = () => {
  const [formData, setFormData] = useState({
    description: '',
    total: '',
  });

  // Handle form field changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input
    if (!formData.description || !formData.total) {
      toast.error('All fields are required.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/tree-census', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success('Tree Census data added successfully!');
        // Reset form fields after successful submission
        setFormData({ description: '', total: '' });
        setTimeout(() => {
          navigate("/tree-census")
        }, 5000);
      } else {
        toast.error('Failed to add Tree Census data.');
      }
    } catch (error) {
      console.error('Error in submission:', error);
      toast.error('Error submitting form. Please try again.');
    }
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="index">City Profile</Link></li>
          <li className="breadcrumb-item"><Link to="tree-census">Tree Census</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Add Tree Census</li>
        </ol>
        <div className="row">
          <div className="col-lg-12">
            <div className="card-box">
              <div className="card-block">
                <div className="row">
                  <div className="col-sm-4 col-3">
                    <h4 className="page-title">Add Tree Census</h4>
                  </div>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="form-group row">
                    <label className="col-form-label col-md-3 mb-3">Description <span className="text-danger">*</span></label>
                    <div className="col-md-5">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter description"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group row">
                    <label className="col-form-label col-md-3 mb-3">Total <span className="text-danger">*</span></label>
                    <div className="col-md-5">
                      <input
                        type="number"
                        className="form-control form-control-lg"
                        name="total"
                        value={formData.total}
                        onChange={handleChange}
                        placeholder="Enter total"
                        required
                      />
                    </div>
                  </div>
                  <input type="submit" className="btn btn-primary mt-2" value="Submit" />
                </form>
                {/* Toast Container for notifications */}
                <ToastContainer />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTreeCensus;
