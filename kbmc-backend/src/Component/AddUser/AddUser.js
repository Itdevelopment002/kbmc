import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import api from '../api'; // Import Axios
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const AddUser = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    department: '',
  });
  const [error, setError] = useState(null); // For handling errors
  const [success, setSuccess] = useState(false); // For handling success messages
  const navigate = useNavigate(); // Initialize useNavigate

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
      setSuccess(true); // Show success message
      navigate('/user'); // Redirect to the user list or desired route after success
    } catch (error) {
      console.error('There was an error adding the user:', error);
      setError('Error adding user. Please try again.'); // Show error message
    }
  };

  const handleDelete = () => {
    console.log('User deleted.');
    setShowDeleteModal(false);
  };

  const handleEdit = async () => {
    try {
      const response = await api.put(`/users/${formData.id}`, formData);
      console.log('User edited:', response.data);
      setShowEditModal(false);
    } catch (error) {
      console.error('There was an error editing the user:', error);
    }
  };

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="#/">Home</a></li>
            <li className="breadcrumb-item active" aria-current="page"><a href="#/user">User</a></li>
            <li className="breadcrumb-item active" aria-current="page">Add User</li>
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
                  {error && <div className="alert alert-danger">{error}</div>}
                  {success && <div className="alert alert-success">User added successfully!</div>}
                  <Form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-4">
                        <Form.Group>
                          <Form.Label>User Name</Form.Label>
                          <Form.Control
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                      </div>
                      <div className="col-md-4">
                        <Form.Group>
                          <Form.Label>Password</Form.Label>
                          <Form.Control
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                          />
                        </Form.Group>
                      </div>
                      <div className="col-md-4">
                        <Form.Group style={{ position: 'relative' }}>
                          <Form.Label>Type of Department</Form.Label>
                          <Form.Control
                            as="select"
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            required
                            style={{ paddingRight: '35px' }}
                          >
                            <option value="">Select Department</option>
                            <option>Account Department</option>
                            <option>Tax Department</option>
                          </Form.Control>
                          <i
                            className="fa fa-chevron-down"
                            style={{
                              position: 'absolute',
                              top: '50%',
                              right: '10px',
                              transform: 'translateY(-50%)',
                              pointerEvents: 'none',
                              color: '#555',
                            }}
                          />
                        </Form.Group>
                      </div>
                    </div>
                    <Button type="submit" className="btn btn-primary mt-3">Submit</Button>
                  </Form>
                </div>
              </div>
            </div>
          </div>

          {/* Delete Modal */}
          <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
            <Modal.Body>
              <h4>Are you sure you want to delete this item?</h4>
            </Modal.Body>
            <Modal.Footer className="text-center">
              <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Close</Button>
              <Button variant="danger" onClick={handleDelete}>Delete</Button>
            </Modal.Footer>
          </Modal>

          {/* Edit Modal */}
          <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
            <Modal.Header closeButton>
              <Modal.Title>Edit User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group>
                  <Form.Label>User Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Type of Department</Form.Label>
                  <Form.Control
                    as="select"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Department</option>
                    <option>Account Department</option>
                    <option>Tax Department</option>
                  </Form.Control>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowEditModal(false)}>Close</Button>
              <Button variant="primary" onClick={handleEdit}>Save Changes</Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default AddUser;
