import React, { useState } from "react";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";

const AddUsers = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    department: '',
  });
  const [success, setSuccess] = useState(false); // Success state
  const [error, setError] = useState(''); // Error state
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await api.post('/users', formData);
      console.log('User added:', response.data);
      setSuccess(true);
      navigate('/user');
    } catch (error) {
      console.error('There was an error adding the user:', error);
      setError('Error adding user. Please try again.');
    }
  };

  return (
    <div>
      <div className="page-wrapper">
        <div className="content">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              <Link to="/user">User</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Add User
            </li>
          </ol>
          <div className="row">
            <div className="col-lg-12">
              <div className="card-box">
                <div className="card-block">
                  <div className="row">
                    <div className="col-sm-4 col-3">
                      <h4 className="page-title">Add User</h4>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>User Name</label>
                          <input
                            type="text"
                            className="form-control"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>Password</label>
                          <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>Type of Department</label>
                          <select
                            className="form-control"
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                          >
                            <option value="">Select Department</option>
                            <option value="Account Department">Account Department</option>
                            <option value="Tax Department">Tax Department</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <input type="submit" className="btn btn-primary" value="Submit" />
                    {success && <p className="text-success">User added successfully!</p>}
                    {error && <p className="text-danger">{error}</p>}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUsers;
