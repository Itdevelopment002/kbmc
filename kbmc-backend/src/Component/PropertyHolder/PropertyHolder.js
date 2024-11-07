import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import api from '../api';

const PropertyHolder = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editData, setEditData] = useState({ id: '', description: '', property: '' });
  const [propertyHolders, setPropertyHolders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch property holders data
  useEffect(() => {
    const fetchPropertyHolders = async () => {
      try {
        const response = await api.get('/property_holder'); // Adjust the URL as per your API
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
      await api.delete(`/property_holder/${selectedItem}`); // Adjust the URL as per your API
      setPropertyHolders(propertyHolders.filter(holder => holder.id !== selectedItem));
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting property holder:', error);
    }
  };

  const handleEditSubmit = async () => {
    try {
      await api.put(`/property_holder/${editData.id}`, editData); // Adjust the URL as per your API
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

  const currentPageData = propertyHolders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="#.">City Profile</Link></li>
              <li className="breadcrumb-item active" aria-current="page">Property Holder</li>
            </ol>
          </nav>
          <div className="text-end mb-3">
            <Link
              to="/add-property-holder"
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
                      {currentPageData.length > 0 ? (
                          currentPageData.map((holder, index) => (
                          <tr key={holder.id}>
                            <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
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
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" style={{ textAlign: "center" }}>
                            No property holder available
                          </td>
                        </tr>
                      )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pagination */}
          <div className="mt-4">
            <ul className="pagination">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Previous
                </button>
              </li>
              {Array.from(
                { length: Math.ceil(propertyHolders.length / itemsPerPage) },
                (_, i) => (
                  <li
                    className={`page-item ${
                      currentPage === i + 1 ? "active" : ""
                    }`}
                    key={i}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  </li>
                )
              )}
              <li
                className={`page-item ${
                  currentPage === Math.ceil(propertyHolders.length / itemsPerPage)
                    ? "disabled"
                    : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next
                </button>
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
