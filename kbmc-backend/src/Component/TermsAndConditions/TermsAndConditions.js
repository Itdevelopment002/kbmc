import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const TermsAndConditions = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false); // Modal for editing
  const [selectedItem, setSelectedItem] = useState(null);
  const [editData, setEditData] = useState({ id: '', description: '' }); // State for editing data

  const terms = [
    {
      id: 1,
      description: 'Kulgaon Badlapur city is just 55 km east from Mumbai...',
    },
    // Add more terms as needed
  ];

  // Function to handle the delete modal
  const handleDeleteModalOpen = (itemId) => {
    setSelectedItem(itemId);
    setShowDeleteModal(true);
  };

  // Function to handle the edit modal
  const handleEditModalOpen = (item) => {
    setEditData(item);
    setShowEditModal(true);
  };

  // Handle delete action
  const handleDelete = () => {
    console.log(`Term with ID ${selectedItem} deleted.`);
    setShowDeleteModal(false);
    setSelectedItem(null);
  };

  // Handle edit form submission
  const handleEditSubmit = () => {
    console.log(`Term with ID ${editData.id} updated with description: ${editData.description}`);
    setShowEditModal(false);
  };

  // Close modals
  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleCloseEditModal = () => setShowEditModal(false);

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="#.">Home</a></li>
              <li className="breadcrumb-item active" aria-current="page">Terms & Conditions</li>
            </ol>
          </nav>
          <div className="row">
            <div className="col-lg-12">
              <div className="card-box">
                <div className="card-block">
                  <div className="row">
                    <div className="col-sm-4">
                      <h4 className="page-title">Terms & Conditions</h4>
                    </div>
                  </div>
                  <div className="table-responsive">
                    <table className="table table-bordered m-b-0">
                      <thead>
                        <tr>
                          <th width="10%">Sr. No.</th>
                          <th>Description</th>
                          <th width="15%">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {terms.map((term, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{term.description}</td>
                            <td>
                              <button 
                                className="btn btn-danger btn-sm m-t-10" 
                                onClick={() => handleDeleteModalOpen(term.id)}
                              >
                                Delete
                              </button>
                              <button 
                                className="btn btn-success btn-sm m-t-10" 
                                style={{ marginLeft: '5px' }} 
                                onClick={() => handleEditModalOpen(term)}
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

          <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <ul className="pagination">
              <li className="page-item disabled">
                <a className="page-link" href="#" tabIndex="-1">Previous</a>
              </li>
              <li className="page-item"><a className="page-link" href="#">1</a></li>
              <li className="page-item active">
                <a className="page-link" href="#">2 <span className="sr-only"></span></a>
              </li>
              <li className="page-item"><a className="page-link" href="#">3</a></li>
              <li className="page-item">
                <a className="page-link" href="#">Next</a>
              </li>
            </ul>
          </div>

          {/* Delete Modal */}
          <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered>
            <Modal.Body>
              <h4>Are you sure you want to delete this item?</h4>
            </Modal.Body>
            <Modal.Footer className="text-center">
              <Button variant="primary" onClick={handleCloseDeleteModal}>Close</Button>
              <Button variant="danger" onClick={handleDelete}>Delete</Button>
            </Modal.Footer>
          </Modal>

          {/* Edit Modal */}
          <Modal show={showEditModal} onHide={handleCloseEditModal} centered>
            <Modal.Header closeButton>
              <Modal.Title>Edit Terms & Conditions</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    value={editData.description}
                    onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseEditModal}>
                Close
              </Button>
              <Button variant="primary" onClick={handleEditSubmit}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default TermsAndConditions;
