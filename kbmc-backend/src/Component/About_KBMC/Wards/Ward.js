import React, { useState, useEffect } from 'react';
import { Modal, Button, Table, Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import api from '../../api';

const Ward = () => {
    const [wards, setWards] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedWard, setSelectedWard] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const wardsPerPage = 10; 

    useEffect(() => {
        fetchWards();
    }, []);

    const fetchWards = async () => {
        try {
            const response = await api.get('/wards');
            setWards(response.data);
        } catch (error) {
            console.error('Error fetching wards:', error);
        }
    };

    const handleDelete = async (ward) => {
        try {
            await api.delete(`/wards/${ward.id}`);
            setWards(wards.filter((w) => w.id !== ward.id));
            setShowDeleteModal(false);
        } catch (error) {
            console.error('Error deleting ward:', error);
        }
    };

    const handleEditSave = async () => {
        try {
            await api.put(`/wards/${selectedWard.id}`, {
                ward_no: selectedWard.ward_no,
                ward_name: selectedWard.ward_name,
            });
            const updatedWards = wards.map((ward) =>
                ward.id === selectedWard.id ? selectedWard : ward
            );
            setWards(updatedWards);
            setShowEditModal(false);
        } catch (error) {
            console.error('Error updating ward:', error);
        }
    };

    const handleEditClick = (ward) => {
        setSelectedWard({ ...ward });
        setShowEditModal(true);
    };

    const handleDeleteClick = (ward) => {
        setSelectedWard(ward);
        setShowDeleteModal(true);
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setSelectedWard({ ...selectedWard, [name]: value });
    };

    const indexOfLastWard = currentPage * wardsPerPage;
    const indexOfFirstWard = indexOfLastWard - wardsPerPage;
    const currentWards = wards.slice(indexOfFirstWard, indexOfLastWard);

    return (
        <div className="page-wrapper">
            <div className="content">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <a href="#.">About KBMC</a>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            Ward
                        </li>
                    </ol>
                </nav>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card-box">
                            <div className="card-block">
                                <div className="row">
                                    <div className="col-sm-4 col-3">
                                        <h4 className="page-title">Ward</h4>
                                    </div>
                                    <div className="col-sm-8 col-9 text-end mb-3">
                                        <Link to="/Add_ward" className="btn btn-primary btn-rounded float-right" style={{ borderRadius: '100px' }}>
                                            <i className="fa fa-plus"></i> + Add Ward
                                        </Link>
                                    </div>
                                </div>
                                <div className="table-responsive">
                                    <Table bordered>
                                        <thead>
                                            <tr>
                                                <th>Sr. No.</th>
                                                <th>Ward No.</th>
                                                <th>Ward Name</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentWards.map((ward, index) => (
                                                <tr key={ward.id}>
                                                    <td>{index + 1 + (currentPage - 1) * wardsPerPage}</td>
                                                    <td>{ward.ward_no}</td>
                                                    <td>{ward.ward_name}</td>
                                                    <td>
                                                        
                                                        <Button
                                                            variant="danger"
                                                            size="sm"
                                                            onClick={() => handleDeleteClick(ward)}
                                                        >
                                                            Delete
                                                        </Button>{' '}
                                                        <Button
                                                            variant="success"
                                                            size="sm"
                                                            onClick={() => handleEditClick(ward)}
                                                        >
                                                            Edit
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <Pagination>
                    <Pagination.Prev disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Previous</Pagination.Prev>
                    {Array.from({ length: Math.ceil(wards.length / wardsPerPage) }, (_, index) => (
                        <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => setCurrentPage(index + 1)}>
                            {index + 1}
                        </Pagination.Item>
                    ))}
                    <Pagination.Next disabled={currentPage === Math.ceil(wards.length / wardsPerPage)} onClick={() => setCurrentPage(currentPage + 1)}>Next</Pagination.Next>
                </Pagination>

                <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
                    <Modal.Body>
                        <h4>Are you sure you want to delete this item?</h4>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            variant="secondary"
                            onClick={() => setShowDeleteModal(false)}
                        >
                            Close
                        </Button>
                        <Button
                            variant="danger"
                            onClick={() => handleDelete(selectedWard)}
                        >
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Ward</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {selectedWard && (
                            <div>
                                <div className="form-group">
                                    <label>Ward No.</label>
                                    <input
                                        type="text"
                                        name="ward_no" // Match the property in selectedWard
                                        value={selectedWard.ward_no} // Match the property in selectedWard
                                        onChange={handleEditChange}
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Ward Name</label>
                                    <input
                                        type="text"
                                        name="ward_name" // Match the property in selectedWard
                                        value={selectedWard.ward_name} // Match the property in selectedWard
                                        onChange={handleEditChange}
                                        className="form-control"
                                    />
                                </div>
                            </div>
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

export default Ward;
