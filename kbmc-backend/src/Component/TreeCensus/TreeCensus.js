import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify'; // Import Toast
import 'react-toastify/dist/ReactToastify.css';

const TreeCensus = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [editData, setEditData] = useState({ id: '', description: '', total: '' });
    const [treeCensusData, setTreeCensusData] = useState([]);

    // Fetch Tree Census data on component mount
    useEffect(() => {
        fetchTreeCensusData();
    }, []);

    const fetchTreeCensusData = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/tree-census');
            const data = await response.json();
            setTreeCensusData(data);
        } catch (error) {
            console.error('Error fetching tree census data:', error);
            toast.error('Error fetching tree census data.');
        }
    };

    const handleDeleteClick = (row) => {
        setSelectedRow(row);
        setModalOpen(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/tree-census/${selectedRow.id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                toast.success('Tree Census deleted successfully!');
                fetchTreeCensusData(); // Refresh the data
            } else {
                toast.error('Failed to delete Tree Census.');
            }
        } catch (error) {
            console.error('Error deleting tree census:', error);
            toast.error('Error deleting Tree Census.');
        } finally {
            setModalOpen(false);
        }
    };

    const handleEditModalOpen = (row) => {
        setEditData(row);
        setShowEditModal(true);
    };

    const handleEditSubmit = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/tree-census/${editData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editData),
            });

            if (response.ok) {
                toast.success('Tree Census updated successfully!');
                fetchTreeCensusData(); // Refresh the data
            } else {
                toast.error('Failed to update Tree Census.');
            }
        } catch (error) {
            console.error('Error updating tree census:', error);
            toast.error('Error updating Tree Census.');
        } finally {
            setShowEditModal(false);
        }
    };

    return (
        <div className="page-wrapper">
            <div className="content">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <Link to="#">City Profile</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">Tree Census</li>
                    </ol>
                </nav>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card-box">
                            <div className="card-block">
                                <div className="row">
                                    <div className="col-sm-4">
                                        <h4 className="page-title">Tree Census</h4>
                                    </div>
                                    <div className="col-sm-8 text-end m-b-20">
                                        <Link to="/add-tree-census" className="btn btn-primary btn-rounded float-right mb-2" style={{ borderRadius: "100px" }}>
                                            <i className="fa fa-plus"></i> + Add Tree Census
                                        </Link>
                                    </div>
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-bordered m-b-0">
                                        <thead>
                                            <tr>
                                                <th width="10%">Sr. No.</th>
                                                <th>Description</th>
                                                <th>Total</th>
                                                <th width="15%">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {treeCensusData.map((row) => (
                                                <tr key={row.id}>
                                                    <td>{row.id}</td>
                                                    <td>{row.description}</td>
                                                    <td>{row.total}</td>
                                                    <td>
                                                        <button
                                                            className="btn btn-danger btn-sm m-t-10"
                                                            onClick={() => handleDeleteClick(row)}
                                                        >
                                                            Delete
                                                        </button>
                                                        <button
                                                            className="btn btn-success btn-sm m-t-10 mx-2"
                                                            onClick={() => handleEditModalOpen(row)}
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

                {/* Delete Modal */}
                {isModalOpen && (
                    <div className="modal delete_modal fade show" style={{ display: 'block' }}>
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-body">
                                    <h4>Are you sure you want to delete this item?</h4>
                                </div>
                                <div className="modal-footer text-center">
                                    <button type="button" className="btn btn-primary btn-lg" onClick={() => setModalOpen(false)}>Close</button>
                                    <button type="button" className="btn btn-danger btn-lg" onClick={handleDeleteConfirm}>Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Edit Modal */}
                <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Tree Census</Modal.Title>
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
                            <Form.Group controlId="formTotal">
                                <Form.Label>Total</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={editData.total}
                                    onChange={(e) => setEditData({ ...editData, total: e.target.value })}
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

                {/* Toast Container for notifications */}
                <ToastContainer />
            </div>
        </div>
    );
};

export default TreeCensus;
