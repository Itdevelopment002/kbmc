import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import api from '../api'; // Import api

const Tender = () => {
    const [tenders, setTenders] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedTender, setSelectedTender] = useState(null);
    const [editedDescription, setEditedDescription] = useState('');

    // Fetch tenders from API
    useEffect(() => {
        api.get('/tenders')
            .then(response => setTenders(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleDeleteClick = (tenderId) => {
        setSelectedTender(tenderId);
        setModalVisible(true);
    };

    const handleDeleteConfirm = () => {
        api.delete(`/tenders/${selectedTender}`)
            .then(() => {
                setTenders(tenders.filter(tender => tender.id !== selectedTender));
                setModalVisible(false);
                setSelectedTender(null);
            })
            .catch(error => console.error(error));
    };

    const handleEditClick = (tender) => {
        setSelectedTender(tender.id);
        setEditedDescription(tender.tenders);
        setShowEditModal(true);
    };

    const handleSaveEdit = () => {
        api.put(`/tenders/${selectedTender}`, { tenders: editedDescription })
            .then(() => {
                setTenders(tenders.map(tender =>
                    tender.id === selectedTender ? { ...tender, tenders: editedDescription } : tender
                ));
                setShowEditModal(false);
                setSelectedTender(null);
            })
            .catch(error => console.error(error));
    };

    return (
        <div className="page-wrapper d-flex">
            <div className="content flex-fill">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Tender</li>
                    </ol>
                </nav>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card-box">
                            <div className="card-block">
                                <div className="row">
                                    <div className="col-sm-4 col-3">
                                        <h4 className="page-title">Tender</h4>
                                    </div>
                                    <div className="col-sm-8 col-9 text-end mb-3">
                                        <Link to="/add-tender" className="btn btn-primary btn-rounded float-end" style={{borderRadius:"100px"}}>
                                            <i className="fa fa-plus"></i> + Add Tender
                                        </Link>
                                    </div>
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-bordered m-b-0">
                                        <thead>
                                            <tr>
                                                <th width="10%">Sr. No.</th>
                                                <th>Tender Description</th>
                                                <th>Status</th>
                                                <th width="15%">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {tenders.map((tender, index) => (
                                                <tr key={tender.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{tender.tenders}</td>
                                                    <td>{tender.status}</td>
                                                    <td>
                                                        <button
                                                            className="btn btn-danger btn-sm m-t-10 mx-1"
                                                            onClick={() => handleDeleteClick(tender.id)}
                                                        >
                                                            Delete
                                                        </button>
                                                        <button
                                                            className="btn btn-success btn-sm m-t-10"
                                                            onClick={() => handleEditClick(tender)}
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
                <Modal show={modalVisible} onHide={() => setModalVisible(false)} centered>
                    <Modal.Body>
                        <h4 style={{ textAlign: 'center' }}>Are you sure you want to delete this item?</h4>
                    </Modal.Body>
                    <Modal.Footer style={{ justifyContent: 'center' }}>
                        <Button variant="secondary" onClick={() => setModalVisible(false)}>Close</Button>
                        <Button variant="danger" onClick={handleDeleteConfirm}>Delete</Button>
                    </Modal.Footer>
                </Modal>

                {/* Edit Modal */}
                {selectedTender && (
                    <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
                        <Modal.Header>
                            <h5 className="modal-title">Edit Tender</h5>
                            <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}></button>
                        </Modal.Header>
                        <Modal.Body>
                            <form>
                                <div className="mb-3">
                                    <label className="form-label">Tender Description</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={editedDescription}
                                        onChange={(e) => setEditedDescription(e.target.value)}
                                    />
                                </div>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowEditModal(false)}>Close</Button>
                            <Button variant="primary" onClick={handleSaveEdit}>Save Changes</Button>
                        </Modal.Footer>
                    </Modal>
                )}
            </div>
        </div>
    );
};

export default Tender;
