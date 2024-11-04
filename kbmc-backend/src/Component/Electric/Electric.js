import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import api from '../api';

const Electric = () => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [editData, setEditData] = useState({ id: '', description: '', mobileNo: '', vendorName: '' });
    const [electricItems, setElectricItems] = useState([]);

    // Fetch electric items from the API
    useEffect(() => {
        const fetchElectricItems = async () => {
            try {
                const response = await api.get('/electric'); // Make sure the URL matches your backend API
                setElectricItems(response.data);
            } catch (error) {
                console.error('Error fetching electric items:', error);
            }
        };

        fetchElectricItems();
    }, []);

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
    const handleDelete = async () => {
        try {
            await api.delete(`/electric/${selectedItem}`); // Make sure the URL matches your backend API
            setElectricItems(electricItems.filter(item => item.id !== selectedItem)); // Remove the item from state
            setShowDeleteModal(false);
            setSelectedItem(null);
        } catch (error) {
            console.error('Error deleting electric item:', error);
        }
    };

    // Handle edit form submission
    const handleEditSubmit = async () => {
        try {
            await api.put(`/electric/${editData.id}`, editData); // Make sure the URL matches your backend API
            setElectricItems(electricItems.map(item => item.id === editData.id ? editData : item)); // Update item in state
            setShowEditModal(false);
        } catch (error) {
            console.error('Error updating electric item:', error);
        }
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
                            <li className="breadcrumb-item"><Link to="#">City Profile</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Electric</li>
                        </ol>
                    </nav>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card-box">
                                <div className="card-block">
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <h4 className="page-title">Electric</h4>
                                        </div>
                                        <div className="text-end mb-3">
                                            <Link
                                                to="/add-electric"
                                                className="btn btn-primary btn-rounded float-right"
                                                style={{ borderRadius: '100px' }}
                                            >
                                                <i className="fa fa-plus"></i>+ Add Electric
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="table-responsive">
                                        <table className="table table-bordered m-b-0">
                                            <thead>
                                                <tr>
                                                    <th width="10%">Sr. No.</th>
                                                    <th>Description</th>
                                                    <th>Mobile No.</th>
                                                    <th>Vendor Name</th>
                                                    <th width="15%">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {electricItems.map((item, index) => (
                                                    <tr key={item.id}>
                                                        <td>{index + 1}</td>
                                                        <td>{item.description}</td>
                                                        <td>{item.mobileNo}</td>
                                                        <td>{item.vendorName}</td>
                                                        <td>
                                                            <button 
                                                                className="btn btn-danger btn-sm mx-2" 
                                                                onClick={() => handleDeleteModalOpen(item.id)}
                                                            >
                                                                Delete
                                                            </button>
                                                            <button 
                                                                className="btn btn-success btn-sm mx-2" 
                                                                onClick={() => handleEditModalOpen(item)}
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
                            <li className="page-item active"><a className="page-link" href="#">2 <span className="sr-only"></span></a></li>
                            <li className="page-item"><a className="page-link" href="#">3</a></li>
                            <li className="page-item"><a className="page-link" href="#">Next</a></li>
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
                            <Modal.Title>Edit Electric Item</Modal.Title>
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
                                <Form.Group controlId="formMobileNo">
                                    <Form.Label>Mobile No.</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={editData.mobileNo}
                                        onChange={(e) => setEditData({ ...editData, mobileNo: e.target.value })}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formVendorName">
                                    <Form.Label>Vendor Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={editData.vendorName}
                                        onChange={(e) => setEditData({ ...editData, vendorName: e.target.value })}
                                    />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseEditModal}>Close</Button>
                            <Button variant="primary" onClick={handleEditSubmit}>Save Changes</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </>
    );
};

export default Electric;
