import React, { useEffect, useState } from 'react';
import { Modal, Button, Table, Pagination } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Functions = () => {
    const [functionsData, setFunctionsData] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedFunction, setSelectedFunction] = useState(null);
    const navigate = useNavigate(); // Updated to useNavigate

    useEffect(() => {
        fetchFunctions();
    }, []);

    const fetchFunctions = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/functions');
            const data = await response.json();
            setFunctionsData(data);
        } catch (error) {
            console.error('Error fetching functions:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await fetch(`http://localhost:5000/api/functions/${selectedFunction.id}`, { method: 'DELETE' });
            setFunctionsData(functionsData.filter((func) => func.id !== selectedFunction.id));
            setShowDeleteModal(false);
        } catch (error) {
            console.error('Error deleting function:', error);
        }
    };

    const handleEditSave = async () => {
        try {
            await fetch(`http://localhost:5000/api/functions/${selectedFunction.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    heading: selectedFunction.heading,
                    description: selectedFunction.description,
                }),
            });
            const updatedFunctions = functionsData.map((func) =>
                func.id === selectedFunction.id ? selectedFunction : func
            );
            setFunctionsData(updatedFunctions);
            setShowEditModal(false);
        } catch (error) {
            console.error('Error updating function:', error);
        }
    };

    const handleEditClick = (func) => {
        setSelectedFunction({ ...func });
        setShowEditModal(true);
    };

    const handleDeleteClick = (func) => {
        setSelectedFunction(func);
        setShowDeleteModal(true);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setSelectedFunction({ ...selectedFunction, [name]: value });
    };

    // After adding a function, navigate back to Functions page
    const handleAddFunction = () => {
        navigate('/Add_function'); // Updated to use navigate
    };

    return (
        <div className="page-wrapper">
            <div className="content">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <a href="#.">About KBMC</a>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            Functions
                        </li>
                    </ol>
                </nav>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card-box">
                            <div className="card-block">
                                <div className="row mb-4">
                                    <div className="col-sm-4 col-3">
                                        <h4 className="page-title">Functions</h4>
                                    </div>
                                    <div className="col-sm-8 col-9 text-end">
                                        <Button
                                            className="btn btn-primary btn-rounded float-right"
                                            style={{ borderRadius: '100px', marginBottom: '20px' }}
                                            onClick={handleAddFunction}
                                        >
                                            <i className="fa fa-plus"></i> + Add New Function
                                        </Button>
                                    </div>
                                </div>
                                <div className="table-responsive mt-50">
                                    <Table bordered>
                                        <thead>
                                            <tr>
                                                <th width="5%">Sr. No.</th>
                                                <th width="30%">Heading</th>
                                                <th width="30%">Description</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {functionsData.length > 0 ? (
                                                functionsData.map((func, index) => (
                                                    <tr key={func.id}>
                                                        <td>{index + 1}</td>
                                                        <td>{func.heading}</td>
                                                        <td>{func.description}</td>
                                                        <td width="10%">
                                                            <Button variant="success" size="sm" onClick={() => handleEditClick(func)}>
                                                                Edit
                                                            </Button>{' '}
                                                            <Button variant="danger" size="sm" onClick={() => handleDeleteClick(func)}>
                                                                Delete
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="4" className="text-center">
                                                        No functions available.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pagination */}
                <Pagination>
                    <Pagination.Prev disabled>Previous</Pagination.Prev>
                    <Pagination.Item>1</Pagination.Item>
                    <Pagination.Item active>2</Pagination.Item>
                    <Pagination.Item>3</Pagination.Item>
                    <Pagination.Next>Next</Pagination.Next>
                </Pagination>

                {/* Delete Modal */}
                <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
                    <Modal.Body>
                        <h4>Are you sure you want to delete this item?</h4>
                    </Modal.Body>
                    <Modal.Footer className="d-flex justify-content-center">
                        <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                            Close
                        </Button>
                        <Button variant="danger" onClick={handleDelete}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/* Edit Modal */}
                <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Function</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {selectedFunction && (
                            <>
                                <div className="form-group">
                                    <label>Heading</label>
                                    <input
                                        type="text"
                                        name="heading"
                                        value={selectedFunction.heading}
                                        onChange={handleEditChange}
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Description</label>
                                    <textarea
                                        name="description"
                                        value={selectedFunction.description}
                                        onChange={handleEditChange}
                                        className="form-control"
                                        rows="5"
                                    />
                                </div>
                            </>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleEditSave}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};

export default Functions;
