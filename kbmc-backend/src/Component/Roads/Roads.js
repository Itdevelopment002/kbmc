import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Roads = () => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [editData, setEditData] = useState({ id: '', description: '', length: '' });
    const [roads, setRoads] = useState([]);

    useEffect(() => {
        // Fetch roads data when component mounts
        fetchRoads();
    }, []);

    const fetchRoads = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/roads'); // Adjust the endpoint as necessary
            setRoads(response.data);
        } catch (error) {
            console.error('Error fetching roads data:', error);
        }
    };

    const handleDeleteModalOpen = (id) => {
        setSelectedItem(id);
        setShowDeleteModal(true);
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/roads/${selectedItem}`); // Adjust the endpoint as necessary
            setRoads(roads.filter(item => item.id !== selectedItem));
        } catch (error) {
            console.error('Error deleting road:', error);
        } finally {
            setShowDeleteModal(false);
            setSelectedItem(null);
        }
    };

    const handleEditModalOpen = (item) => {
        setEditData(item);
        setShowEditModal(true);
    };

    const handleEditSubmit = async () => {
        try {
            await axios.put(`http://localhost:5000/api/roads/${editData.id}`, editData); // Adjust the endpoint as necessary
            setRoads(roads.map(item => (item.id === editData.id ? editData : item)));
        } catch (error) {
            console.error('Error updating road:', error);
        } finally {
            setShowEditModal(false);
        }
    };

    const handleCloseDeleteModal = () => setShowDeleteModal(false);
    const handleCloseEditModal = () => setShowEditModal(false);

    return (
        <div className="page-wrapper">
            <div className="content">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="#">City Profile</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">Roads</li>
                    </ol>
                </nav>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card-box">
                            <div className="card-block">
                                <div className="row">
                                    <div className="col-sm-4">
                                        <h4 className="page-title">Roads</h4>
                                    </div>
                                    <div className="col-sm-8 text-end mb-3">
                                        <Link to="/add-roads" className="btn btn-primary btn-rounded float-right " style={{ borderRadius: "100px" }}>
                                            <i className="fa fa-plus"></i> + Add Roads
                                        </Link>
                                    </div>
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-bordered m-b-0">
                                        <thead>
                                            <tr>
                                                <th width="10%">Sr. No.</th>
                                                <th>Description</th>
                                                <th>Length</th>
                                                <th width="15%">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {roads.map((item, index) => (
                                                <tr key={item.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.description}</td>
                                                    <td>{item.length}</td>
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
                {/* Delete Modal */}
                <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered>
                    <Modal.Body>
                        <h4>Are you sure you want to delete this item?</h4>
                    </Modal.Body>
                    <Modal.Footer className="text-center">
                        <Button variant="secondary" onClick={handleCloseDeleteModal}>Close</Button>
                        <Button variant="danger" onClick={handleDelete}>Delete</Button>
                    </Modal.Footer>
                </Modal>

                {/* Edit Modal */}
                <Modal show={showEditModal} onHide={handleCloseEditModal} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Road Length</Modal.Title>
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
                            <Form.Group controlId="formLength">
                                <Form.Label>Length</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={editData.length}
                                    onChange={(e) => setEditData({ ...editData, length: e.target.value })}
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
    );
};

export default Roads;
