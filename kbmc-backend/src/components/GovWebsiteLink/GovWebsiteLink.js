import React, { useEffect, useState } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import api from '../api';

const Departments = () => {
    const [departments, setDepartments] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [editedName, setEditedName] = useState('');
    const [editedHod, setEditedHod] = useState('');
    const [editedLink, setEditedLink] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [departmentsPerPage] = useState(5);

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        try {
            const response = await api.get('/departments');
            setDepartments(response.data);
        } catch (error) {
            console.error('Error fetching departments:', error);
        }
    };

    const handleDelete = (id) => {
        setSelectedDepartment(id);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        try {
            await api.delete(`/departments/${selectedDepartment}`);
            fetchDepartments(); // Refresh the department list after deletion
            setShowDeleteModal(false);
        } catch (error) {
            console.error('Error deleting department:', error);
        }
    };

    const handleEdit = (department) => {
        setSelectedDepartment(department.id);
        setEditedName(department.name);
        setEditedHod(department.hod);
        setEditedLink(department.link);
        setShowEditModal(true);
    };

    const confirmEdit = async () => {
        try {
            await api.put(`/departments/${selectedDepartment}`, {
                name: editedName,
                hod: editedHod,
                link: editedLink,
            });
            fetchDepartments(); // Refresh the department list after editing
            setShowEditModal(false);
        } catch (error) {
            console.error('Error editing department:', error);
        }
    };

    // Pagination logic
    const indexOfLastDepartment = currentPage * departmentsPerPage;
    const indexOfFirstDepartment = indexOfLastDepartment - departmentsPerPage;
    const currentDepartments = departments.slice(indexOfFirstDepartment, indexOfLastDepartment);

    const totalPages = Math.ceil(departments.length / departmentsPerPage);

    return (
        <>
            <div className="page-wrapper">
                <div className="content">
                    {/* Breadcrumbs */}
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Departments</li>
                        </ol>
                    </nav>
                    
                    {/* Department Table */}
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card-box">
                                <div className="card-block">
                                    <h4 className="page-title">Departments</h4>
                                    <div className="table-responsive">
                                        <table className="table table-bordered m-b-0">
                                            <thead>
                                                <tr>
                                                    <th width="10%">Sr. No.</th>
                                                    <th>Departments Name</th>
                                                    <th>Name of HOD</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentDepartments.map((department, index) => (
                                                    <tr key={department.id}>
                                                        <td>{indexOfFirstDepartment + index + 1}</td>
                                                        <td>{department.name}</td>
                                                        <td>{department.hod}</td>
                                                        <td>
                                                            <Button
                                                                variant="danger"
                                                                size="sm"
                                                                className="me-2 m-t-10"
                                                                onClick={() => handleDelete(department.id)}
                                                            >
                                                                Delete
                                                            </Button>
                                                            <Button
                                                                variant="success"
                                                                size="sm"
                                                                className="me-2 m-t-10"
                                                                onClick={() => handleEdit(department)}
                                                            >
                                                                Edit
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

                    {/* Pagination */}
                    <div>
                        <ul className="pagination">
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
                            </li>
                            {Array.from({ length: totalPages }, (_, i) => (
                                <li className={`page-item ${currentPage === i + 1 ? 'active' : ''}`} key={i}>
                                    <button className="page-link" onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
                                </li>
                            ))}
                            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
                            </li>
                        </ul>
                    </div>

                    {/* Delete Modal */}
                    <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
                        <Modal.Body>Are you sure you want to delete this department?</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Close</Button>
                            <Button variant="danger" onClick={confirmDelete}>Delete</Button>
                        </Modal.Footer>
                    </Modal>

                    {/* Edit Modal */}
                    <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
                        <Modal.Header closeButton>Edit Department</Modal.Header>
                        <Modal.Body>
                            <input type="text" value={editedName} onChange={(e) => setEditedName(e.target.value)} placeholder="Name" />
                            <input type="text" value={editedHod} onChange={(e) => setEditedHod(e.target.value)} placeholder="HOD" />
                            <input type="text" value={editedLink} onChange={(e) => setEditedLink(e.target.value)} placeholder="Link" />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowEditModal(false)}>Close</Button>
                            <Button variant="primary" onClick={confirmEdit}>Save Changes</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        </>
    );
};

export default Departments;
