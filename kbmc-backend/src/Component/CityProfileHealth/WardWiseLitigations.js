import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const WardWiseLitigations = () => {
  const [litigations, setLitigations] = useState([]);
  const [wardNo, setWardNo] = useState('');
  const [nameLawsuit, setNameLawsuit] = useState('');
  const [mobNo, setMobNo] = useState('');
  const [showAddNewModal, setShowAddNewModal] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedLitigation, setSelectedLitigation] = useState(null);
  const [editData, setEditData] = useState({ id: '', ward_no: '', name_lawsuit: '', mob_no: '' });

  // Fetch existing litigations on component mount
  useEffect(() => {
    fetchLitigations();
  }, []);

  const fetchLitigations = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/litigations');
      setLitigations(response.data);
    } catch (error) {
      toast.error('Error fetching litigations.');
    }
  };

  const handleAddLitigation = async () => {
    if (wardNo && nameLawsuit && mobNo) {
      const newLitigation = { ward_no: wardNo, name_lawsuit: nameLawsuit, mob_no: mobNo };
      try {
        const response = await axios.post('http://localhost:5000/api/litigations', newLitigation);
        setLitigations([...litigations, response.data]);
        setWardNo('');
        setNameLawsuit('');
        setMobNo('');
        setShowAddNewModal(false);
        toast.success('Litigation added successfully!');
      } catch (error) {
        toast.error('Error adding litigation.');
      }
    }
  };

  const handleDeleteClick = (litigation) => {
    setSelectedLitigation(litigation);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/litigations/${selectedLitigation.id}`);
      setLitigations(litigations.filter(litigation => litigation.id !== selectedLitigation.id));
      toast.success('Litigation deleted successfully!');
    } catch (error) {
      toast.error('Error deleting litigation.');
    } finally {
      setDeleteModalOpen(false);
    }
  };

  const handleEditClick = (litigation) => {
    setEditData(litigation);
    setShowEditModal(true);
  };

  const handleEditSubmit = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/litigations/${editData.id}`, {
        ward_no: editData.ward_no,
        name_lawsuit: editData.name_lawsuit,
        mob_no: editData.mob_no
      });

      if (response.status === 200) {
        setLitigations(litigations.map(litigation => (litigation.id === editData.id ? response.data : litigation)));
        toast.success('Litigation updated successfully!');
      } else {
        toast.error('Failed to update litigation.');
      }
    } catch (error) {
      toast.error('Error updating litigation.');
    } finally {
      setShowEditModal(false);
    }
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
                      <h4 className="page-title">Ward-wise Litigations</h4>
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

                  {/* Display Litigations */}
                  <div className="table-responsive">
                    <table className="table table-bordered m-b-0">
                      <thead>
                        <tr>
                          <th>Sr. No.</th>
                          <th>Ward No</th>
                          <th>Name of the lawsuit</th>
                          <th>Mobile No.</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {litigations.map((item, index) => (
                          <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.ward_no}</td>
                            <td>{item.name_lawsuit}</td>
                            <td>{item.mob_no}</td>
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

          {/* Add New Litigation Modal */}
          {showAddNewModal && (
            <Modal show={showAddNewModal} onHide={() => setShowAddNewModal(false)} centered>
              <Modal.Header closeButton>
                <Modal.Title>Add New Litigation</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group>
                    <Form.Label>Ward No</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Ward No."
                      value={wardNo}
                      onChange={(e) => setWardNo(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Name of the lawsuit</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Name of the lawsuit"
                      value={nameLawsuit}
                      onChange={(e) => setNameLawsuit(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Mobile No.</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Mobile No."
                      value={mobNo}
                      onChange={(e) => setMobNo(e.target.value)}
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowAddNewModal(false)}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleAddLitigation}>
                  Add Litigation
                </Button>
              </Modal.Footer>
            </Modal>
          )}

          {/* Delete Confirmation Modal */}
          {isDeleteModalOpen && (
            <Modal show={isDeleteModalOpen} onHide={() => setDeleteModalOpen(false)} centered>
              <Modal.Header closeButton>
                <Modal.Title>Delete Litigation</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>Are you sure you want to delete this litigation?</p>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setDeleteModalOpen(false)}>
                  Close
                </Button>
                <Button variant="danger" onClick={handleDeleteConfirm}>
                  Delete
                </Button>
              </Modal.Footer>
            </Modal>
          )}

          {/* Edit Litigation Modal */}
          {showEditModal && (
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
              <Modal.Header closeButton>
                <Modal.Title>Edit Litigation</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group>
                    <Form.Label>Ward No</Form.Label>
                    <Form.Control
                      type="text"
                      value={editData.ward_no}
                      onChange={(e) => setEditData({ ...editData, ward_no: e.target.value })}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Name of the lawsuit</Form.Label>
                    <Form.Control
                      type="text"
                      value={editData.name_lawsuit}
                      onChange={(e) => setEditData({ ...editData, name_lawsuit: e.target.value })}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Mobile No.</Form.Label>
                    <Form.Control
                      type="text"
                      value={editData.mob_no}
                      onChange={(e) => setEditData({ ...editData, mob_no: e.target.value })}
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleEditSubmit}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          )}
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default WardWiseLitigations;
