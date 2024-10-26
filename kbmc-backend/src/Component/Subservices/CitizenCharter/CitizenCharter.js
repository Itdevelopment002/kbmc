import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { FaFilePdf, FaTimes } from 'react-icons/fa'; // Importing icons
import axios from 'axios'; // Make sure to install axios

const CitizenCharter = () => {
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [departments, setDepartments] = useState([]);
    const [newDepartment, setNewDepartment] = useState({ name: '', pdf: null });
    const [selectedDepartmentId, setSelectedDepartmentId] = useState(null); // For editing and deleting

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/citizen-charter');
            setDepartments(response.data);
        } catch (error) {
            console.error('Error fetching departments:', error);
        }
    };

    const handleFileChange = (e) => {
        setNewDepartment({ ...newDepartment, pdf: e.target.files[0] });
    };

   const handleAddDepartment = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', newDepartment.name);
    formData.append('pdf', newDepartment.pdf);

    try {
        await axios.post('http://localhost:5000/api/citizen-charter', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        // Reset the form fields after successful submission
        setNewDepartment({ name: '', pdf: null });
        fetchDepartments(); 
    } catch (error) {
        console.error('Error adding department:', error);
    }
};

    const handleOpenDeleteModal = (id) => {
        setSelectedDepartmentId(id);
        setShowDeleteModal(true);
    };

    const handleDeleteDepartment = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/citizen-charter/${selectedDepartmentId}`);
            fetchDepartments(); // Refresh the list
            setShowDeleteModal(false); // Close the modal after deletion
        } catch (error) {
            console.error('Error deleting department:', error);
        }
    };

    const handleOpenEditModal = (dept) => {
        setSelectedDepartmentId(dept.id);
        setNewDepartment({ name: dept.name, pdf: null }); // Set the selected department details
        setShowEditModal(true);
    };

    const handleEditDepartment = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', newDepartment.name);
        if (newDepartment.pdf) {
            formData.append('pdf', newDepartment.pdf);
        }

        try {
            await axios.put(`http://localhost:5000/api/citizen-charter/${selectedDepartmentId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setShowEditModal(false);
            fetchDepartments(); // Refresh the list
        } catch (error) {
            console.error('Error editing department:', error);
        }
    };

    return (
        <div className="page-wrapper">
            <div className="content">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Citizen Charter</li>
                    </ol>
                </nav>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card-box">
                            <div className="card-block">
                                <h4 className="page-title m-b-0">Citizen Charter</h4>
                                <hr />
                                <Form onSubmit={handleAddDepartment}>
                                    <Form.Group controlId="formDepartmentName" className="row">
                                        <Form.Label className="col-form-label col-md-2">
                                            Department Name <span className="text-danger">*</span>
                                        </Form.Label>
                                        <div className="col-md-4">
                                            <Form.Control
                                                type="text"
                                                value={newDepartment.name}
                                                onChange={(e) => setNewDepartment({ ...newDepartment, name: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </Form.Group>
                                    <Form.Group controlId="formFile" className="row mt-3">
                                        <Form.Label className="col-form-label col-lg-2">
                                            Upload PDF <span className="text-danger">*</span>
                                        </Form.Label>
                                        <div className="col-md-4">
                                            <Form.Control
                                                type="file"
                                                accept=".pdf"
                                                onChange={handleFileChange}
                                                required
                                            />
                                        </div>
                                    </Form.Group>
                                    <Form.Group className="row my-3">
                                        <div className="col-md-2">
                                            <Button variant="primary" type="submit">Submit</Button>
                                        </div>
                                    </Form.Group>
                                </Form>
                                <div className="table-responsive">
                                    <table className="table table-bordered m-b-0">
                                        <thead>
                                            <tr>
                                                <th width="10%">Sr. No.</th>
                                                <th>Departments Name</th>
                                                <th>Uploaded PDF</th>
                                                <th width="20%" style={{ textAlign: 'center' }}>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {departments.map((dept, index) => (
                                                <tr key={dept.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{dept.name}</td>
                                                    <td>
                                                        <a href={`http://localhost:5000/${dept.pdf}`} target="_blank" rel="noopener noreferrer">
                                                            <FaFilePdf size={35} color="red" />
                                                        </a>
                                                    </td>
                                                    <td style={{ textAlign: 'center' }}>
                                                        <Button variant="success" onClick={() => handleOpenEditModal(dept)}>Edit</Button>
                                                        <Button variant="danger mx-1" onClick={() => handleOpenDeleteModal(dept.id)}>Delete</Button>
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
            </div>

            {/* Edit Modal */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Citizen Charter</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleEditDepartment}>
                        <Form.Group controlId="editFormDepartmentName" className="mb-3">
                            <Form.Label>Department Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={newDepartment.name}
                                onChange={(e) => setNewDepartment({ ...newDepartment, name: e.target.value })}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="editFormFile" className="mb-3">
                            <Form.Label>Upload New PDF (optional)</Form.Label>
                            <Form.Control
                                type="file"
                                accept=".pdf"
                                onChange={handleFileChange}
                            />
                        </Form.Group>
                        <div className="d-flex justify-content-end">
                            <Button variant="secondary" className="mx-2" onClick={() => setShowEditModal(false)}>Cancel</Button>
                            <Button variant="primary" type="submit">Update</Button>
                        </div>
                    </Form>
                </Modal.Body>

            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Citizen Charter</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete this citizen charter?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
                    <Button variant="danger" onClick={handleDeleteDepartment}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CitizenCharter;
