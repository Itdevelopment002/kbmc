import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TreatmentFacilities = () => {
  const [facilities, setFacilities] = useState([]);
  const [name, setName] = useState('');
  const [loc, setLoc] = useState('');
  const [capacity, setCapacity] = useState('');
  const [intake, setIntake] = useState('');
  const [output, setOutput] = useState('');
  const [showAddNewModal, setShowAddNewModal] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [editData, setEditData] = useState({ id: '', name: '', loc: '', capacity: '', intake: '', output: '' });

  useEffect(() => {
    fetchFacilities();
  }, []);

  const fetchFacilities = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/treatment_facility');
      setFacilities(response.data);
    } catch (error) {
      toast.error('Error fetching treatment facilities.');
    }
  };

  const handleAddFacility = async () => {
    if (name && loc && capacity && intake && output) {
      const newFacility = { name, loc, capacity, intake, output };
      try {
        const response = await axios.post('http://localhost:5000/api/treatment_facility', newFacility);
        setFacilities([...facilities, response.data]);
        resetForm();
        setShowAddNewModal(false);
        toast.success('Facility added successfully!');
      } catch (error) {
        toast.error('Error adding facility.');
      }
    }
  };

  const handleDeleteClick = (facility) => {
    setSelectedFacility(facility);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedFacility) return; // Check before proceeding

    try {
      await axios.delete(`http://localhost:5000/api/treatment_facility/${selectedFacility.id}`);
      setFacilities(facilities.filter(facility => facility.id !== selectedFacility.id));
      toast.success('Facility deleted successfully!');
    } catch (error) {
      toast.error('Error deleting facility.');
    } finally {
      setDeleteModalOpen(false);
    }
  };

  const handleEditClick = (facility) => {
    if (facility) {
      setEditData(facility);
      setShowEditModal(true);
    }
  };

  const handleEditSubmit = async () => {
    if (!editData.id) return; // Prevent proceeding if no ID is set
    try {
      const response = await axios.put(`http://localhost:5000/api/treatment_facility/${editData.id}`, editData);
      setFacilities(facilities.map(facility => (facility.id === editData.id ? response.data : facility)));
      toast.success('Facility updated successfully!');
    } catch (error) {
      toast.error('Error updating facility.');
    } finally {
      setShowEditModal(false);
    }
  };

  const resetForm = () => {
    setName('');
    setLoc('');
    setCapacity('');
    setIntake('');
    setOutput('');
  };

 
  return (
    <>
      <div className="page-wrapper">
        <div className="content">
         
          <div className="row mt-4">
            <div className="col-lg-12 mt-4">
              <div className="card-box">
                <div className="card-block">
                  <div className="row align-items-center mb-4">
                    <div className="col-sm-6 col-4">
                      <h4 className="page-title">Treatment Facilities</h4>
                    </div>
                    <div className="text-end mb-3">
                      <button
                        onClick={() => setShowAddNewModal(true)}
                        className="btn btn-primary btn-rounded float-right"
                        style={{ borderRadius: '100px' }}
                      >
                        <i className="fa fa-plus"></i> + Add New
                      </button>
                    </div>
                  </div>

                  {/* Display Facilities */}
                  <div className="table-responsive">
                    <table className="table table-bordered m-b-0">
                      <thead>
                        <tr>
                          <th>Sr. No.</th>
                          <th>Name</th>
                          <th>Location</th>
                          <th>Capacity</th>
                          <th>Intake</th>
                          <th>Output</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {facilities.map((item, index) => (
                          <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.loc}</td>
                            <td>{item.capacity}</td>
                            <td>{item.intake}</td>
                            <td>{item.output}</td>
                            <td>
                              <button
                                className="btn btn-danger btn-sm m-t-10"
                                onClick={() => handleDeleteClick(item)}
                              >
                                Delete
                              </button>
                              <button
                                className="btn btn-success btn-sm m-t-10 mx-2"
                                onClick={() => handleEditClick(item)}
                              >
                                Edit
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Add New Facility Modal */}
          <Modal show={showAddNewModal} onHide={() => setShowAddNewModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Add New Treatment Facility</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formBasicName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" value={name} onChange={e => setName(e.target.value)} required />
                </Form.Group>
                <Form.Group controlId="formBasicLoc">
                  <Form.Label>Location</Form.Label>
                  <Form.Control type="text" value={loc} onChange={e => setLoc(e.target.value)} required />
                </Form.Group>
                <Form.Group controlId="formBasicCapacity">
                  <Form.Label>Capacity</Form.Label>
                  <Form.Control type="number" value={capacity} onChange={e => setCapacity(e.target.value)} required />
                </Form.Group>
                <Form.Group controlId="formBasicIntake">
                  <Form.Label>Intake</Form.Label>
                  <Form.Control type="number" value={intake} onChange={e => setIntake(e.target.value)} required />
                </Form.Group>
                <Form.Group controlId="formBasicOutput">
                  <Form.Label>Output</Form.Label>
                  <Form.Control type="number" value={output} onChange={e => setOutput(e.target.value)} required />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowAddNewModal(false)}>Close</Button>
              <Button variant="primary" onClick={handleAddFacility}>Add Facility</Button>
            </Modal.Footer>
          </Modal>

          {/* Delete Confirmation Modal */}
          <Modal show={isDeleteModalOpen} onHide={() => setDeleteModalOpen(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Confirm Deletion</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this treatment facility?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
              <Button variant="danger" onClick={handleDeleteConfirm}>Delete</Button>
            </Modal.Footer>
          </Modal>

          {/* Edit Facility Modal */}
          <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Treatment Facility</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formBasicName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control 
                    type="text" 
                    value={editData.name} 
                    onChange={e => setEditData({ ...editData, name: e.target.value })} 
                    required 
                  />
                </Form.Group>
                <Form.Group controlId="formBasicLoc">
                  <Form.Label>Location</Form.Label>
                  <Form.Control 
                    type="text" 
                    value={editData.loc} 
                    onChange={e => setEditData({ ...editData, loc: e.target.value })} 
                    required 
                  />
                </Form.Group>
                <Form.Group controlId="formBasicCapacity">
                  <Form.Label>Capacity</Form.Label>
                  <Form.Control 
                    type="number" 
                    value={editData.capacity} 
                    onChange={e => setEditData({ ...editData, capacity: e.target.value })} 
                    required 
                  />
                </Form.Group>
                <Form.Group controlId="formBasicIntake">
                  <Form.Label>Intake</Form.Label>
                  <Form.Control 
                    type="number" 
                    value={editData.intake} 
                    onChange={e => setEditData({ ...editData, intake: e.target.value })} 
                    required 
                  />
                </Form.Group>
                <Form.Group controlId="formBasicOutput">
                  <Form.Label>Output</Form.Label>
                  <Form.Control 
                    type="number" 
                    value={editData.output} 
                    onChange={e => setEditData({ ...editData, output: e.target.value })} 
                    required 
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowEditModal(false)}>Close</Button>
              <Button variant="primary" onClick={handleEditSubmit}>Update Facility</Button>
            </Modal.Footer>
          </Modal>

          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default TreatmentFacilities;
