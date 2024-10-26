import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SanitationInspectorForm from './SanitationInspectorForm';

const ZoneWiseSanitationInspectors = () => {
    const [inspectors, setInspectors] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedInspector, setSelectedInspector] = useState(null);

    useEffect(() => {
        fetchInspectors();
    }, []);

    const fetchInspectors = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/sanitation_inspectors');
            setInspectors(response.data);
        } catch (error) {
            toast.error('Error fetching inspectors.');
        }
    };

    const handleAddInspector = async (formData) => {
        try {
            const response = await axios.post('http://localhost:5000/api/sanitation_inspectors', formData);
            setInspectors([...inspectors, response.data]); // Add inspector to state
            setShowAddModal(false);
            toast.success('Inspector added successfully!');
        } catch (error) {
            toast.error('Error adding inspector.');
        }
    };

    const handleEditInspector = async (formData) => {
        try {
            const response = await axios.put(
                `http://localhost:5000/api/sanitation_inspectors/${selectedInspector.id}`,
                formData
            );
            setInspectors(inspectors.map(inspector => 
                inspector.id === selectedInspector.id ? response.data : inspector
            ));
            setShowEditModal(false);
            toast.success('Inspector updated successfully!');
        } catch (error) {
            toast.error('Error updating inspector.');
        }
    };

    const handleDeleteInspector = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/sanitation_inspectors/${selectedInspector.id}`);
            setInspectors(inspectors.filter(inspector => inspector.id !== selectedInspector.id));
            setShowDeleteModal(false);
            toast.success('Inspector deleted successfully!');
        } catch (error) {
            toast.error('Error deleting inspector.');
        }
    };

    const handleEditClick = (inspector) => {
        setSelectedInspector(inspector);
        setShowEditModal(true);
    };

    const handleDeleteClick = (inspector) => {
        setSelectedInspector(inspector);
        setShowDeleteModal(true);
    };

    return (
        <div className="page-wrapper">
            <div className="content">
                <div className="row mt-4">
                    <div className="col-lg-12 mt-4">
                        <div className="card-box">
                            <div className="card-block">
                                <div className="row align-items-center mb-4">
                                    <div className="col-sm-6 col-4">
                                        <h4 className="page-title">Zone Wise Sanitation Inspectors</h4>
                                    </div>
                                    <div className="text-end mb-3">
                                        <Button onClick={() => setShowAddModal(true)} className="btn btn-primary" style={{borderRadius:"100px"}}>
                                            <i className="fa fa-plus"></i> + Add New
                                        </Button>
                                    </div>
                                </div>

                                {/* Table to display inspectors */}
                                <div className="table-responsive">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Zone No.</th>
                                                <th>Names of Sanitation Inspectors</th>
                                                <th>Mobile No.</th>
                                                <th>Ward No.</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {inspectors.map(inspector => (
                                                <tr key={inspector.id}>
                                                    <td>{inspector.zone_no}</td>
                                                    <td>{inspector.names}</td>
                                                    <td>{inspector.mob_no}</td>
                                                    <td>{inspector.ward_no}</td>
                                                    <td>
                                                        <Button className="btn btn-success btn-sm mx-2" onClick={() => handleEditClick(inspector)}>
                                                            Edit
                                                        </Button>
                                                        <Button className="btn btn-danger btn-sm" onClick={() => handleDeleteClick(inspector)}>
                                                            Delete
                                                        </Button>
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

                {/* Add Modal */}
                {showAddModal && (
                    <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Add New Inspector</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <SanitationInspectorForm onSubmit={handleAddInspector} />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowAddModal(false)}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                )}

                {/* Edit Modal */}
                {showEditModal && (
                    <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit Inspector</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <SanitationInspectorForm onSubmit={handleEditInspector} initialData={selectedInspector} />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                )}

                {/* Delete Confirmation Modal */}
                {showDeleteModal && (
                    <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
                        <Modal.Header closeButton>
                            <Modal.Title>Confirm Delete</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Are you sure you want to delete this inspector?
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                                Cancel
                            </Button>
                            <Button variant="danger" onClick={handleDeleteInspector}>
                                Delete
                            </Button>
                        </Modal.Footer>
                    </Modal>
                )}
            </div>
            <ToastContainer />
        </div>
    );
};

export default ZoneWiseSanitationInspectors;
