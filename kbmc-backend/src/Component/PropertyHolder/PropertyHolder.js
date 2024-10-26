import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const PropertyHolder = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editData, setEditData] = useState({ id: '', description: '', property: '' });
  const [propertyHolders, setPropertyHolders] = useState([]);

  // Fetch property holders data
  useEffect(() => {
    const fetchPropertyHolders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/property_holder'); // Adjust the URL as per your API
        setPropertyHolders(response.data);
      } catch (error) {
        console.error('Error fetching property holders:', error);
      }
    };

    fetchPropertyHolders();
  }, []);

  const handleDeleteModalOpen = (itemId) => {
    setSelectedItem(itemId);
    setShowDeleteModal(true);
  };

  const handleEditModalOpen = (item) => {
    setEditData(item);
    setShowEditModal(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/property_holder/${selectedItem}`); // Adjust the URL as per your API
      setPropertyHolders(propertyHolders.filter(holder => holder.id !== selectedItem));
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting property holder:', error);
    }
  };

  const handleEditSubmit = async () => {
    try {
      await axios.put(`http://localhost:5000/api/property_holder/${editData.id}`, editData); // Adjust the URL as per your API
      setPropertyHolders(propertyHolders.map(holder =>
        holder.id === editData.id ? { ...holder, description: editData.description, property: editData.property } : holder
      ));
      setShowEditModal(false);
    } catch (error) {
      console.error('Error updating property holder:', error);
    }
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedItem(null);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="#.">City Profile</a></li>
              <li className="breadcrumb-item active" aria-current="page">Property Holder</li>
            </ol>
          </nav>
          <div className="text-end mb-3">
            <Link
              to="/add-propertyholder"
              className="btn btn-primary btn-rounded float-right"
              style={{ borderRadius: '100px' }}
            >
              <i className="fa fa-plus"></i> + Add Property Holder
            </Link>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="card-box">
                <div className="card-block">
                  <div className="table-responsive">
                    <table className="table table-bordered m-b-0">
                      <thead>
                        <tr>
                          <th width="10%">Sr. No.</th>
                          <th>Description</th>
                          <th>Property</th>
                          <th width="15%">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {propertyHolders.map((holder, index) => (
                          <tr key={holder.id}>
                            <td>{index + 1}</td>
                            <td>{holder.description}</td>
                            <td>{holder.property}</td>
                            <td>
                              <button
                                className="btn btn-danger btn-sm m-t-10"
                                onClick={() => handleDeleteModalOpen(holder.id)}
                              >
                                Delete
                              </button>
                              <button
                                className="btn btn-success btn-sm m-t-10"
                                onClick={() => handleEditModalOpen(holder)}
                                style={{ marginLeft: '5px' }}
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

          {/* Pagination */}
          <div>
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
        </div>

        {/* Delete Modal */}
        <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered>
          <Modal.Body>
            <h4>Are you sure you want to delete this item?</h4>
          </Modal.Body>
          <Modal.Footer className="text-center">
            <Button variant="primary" onClick={handleCloseDeleteModal}>
              Close
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Edit Modal */}
        <Modal show={showEditModal} onHide={handleCloseEditModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Edit Property Holder</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  value={editData.description}
                  onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="formProperty">
                <Form.Label>Property</Form.Label>
                <Form.Control
                  type="text"
                  value={editData.property}
                  onChange={(e) => setEditData({ ...editData, property: e.target.value })}
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
    </>
  );
};

export default PropertyHolder;
