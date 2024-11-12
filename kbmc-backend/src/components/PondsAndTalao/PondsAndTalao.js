import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import api from "../api";

const PondsAndTalao = () => {
    const [ponds, setPonds] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedPonds, setSelectedPonds] = useState(null);
    const [editedContent, setEditedContent] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const fetchPonds = async () => {
        try {
            const response = await api.get('/ponds-talao');
            setPonds(response.data);
        } catch (error) {
            console.error('Error fetching ponds:', error);
        }
    };

    useEffect(() => {
        fetchPonds();
    }, []);

    // Handle delete click
    const handleDeleteClick = (pondsId) => {
        setSelectedPonds(pondsId);
        setModalVisible(true);
    };

    // Confirm delete
    const handleDeleteConfirm = async () => {
        try {
            await api.delete(`/ponds-talao/${selectedPonds}`);
            setPonds(ponds.filter(item => item.id !== selectedPonds));
            setModalVisible(false);
            setSelectedPonds(null);
        } catch (error) {
            console.error('Error deleting ponds:', error);
        }
    };

    // Handle edit click
    const handleEditClick = (pondsItem) => {
        setSelectedPonds(pondsItem.id);
        setEditedContent(pondsItem.name);
        setShowEditModal(true);
    };

    // Save edited pond
    const handleSaveEdit = async () => {
        try {
            await api.put(`/ponds-talao/${selectedPonds}`, { name: editedContent });
            setPonds(ponds.map(item => item.id === selectedPonds ? { ...item, name: editedContent } : item));
            setShowEditModal(false);
            setSelectedPonds(null);
            setEditedContent('');
        } catch (error) {
            console.error('Error updating ponds:', error);
        }
    };

    const currentPageData = ponds.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <>
            <div className="page-wrapper">
                <div className="content">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/ponds-talao">City Profile</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Ponds and Talao</li>
                        </ol>
                    </nav>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card-box">
                                <div className="card-block">
                                    <div className="row">
                                        <div className="col-sm-4 col-3">
                                            <h4 className="page-title">Ponds and Talao</h4>
                                        </div>
                                        <div className="col-sm-8 col-9 text-right m-b-20">
                                            <Link to="/add-ponds-talao" className="btn btn-primary btn-rounded float-right">
                                                <i className="fa fa-plus"></i> Add Ponds and Talao
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="table-responsive">
                                        <table className="table table-bordered m-b-0">
                                            <thead>
                                                <tr>
                                                    <th width="10%">Sr. No.</th>
                                                    <th>Talao Name</th>
                                                    <th width="15%">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {currentPageData.length > 0 ? currentPageData.map((item, index) => (
                                                    <tr key={item.id}>
                                                        <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                                        <td>{item.name}</td>
                                                        <td>
                                                            <button
                                                                className="btn btn-danger btn-sm "
                                                                onClick={() => handleDeleteClick(item.id)}
                                                            >
                                                                Delete
                                                            </button>
                                                            <button
                                                                className="btn btn-success btn-sm"
                                                                onClick={() => handleEditClick(item)}
                                                            >
                                                                Edit
                                                            </button>
                                                        </td>
                                                    </tr>
                                                )) : (
                                                    <tr>
                                                        <td colSpan="3" style={{ textAlign: 'center' }}>No ponds available</td>
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
                    <div className="d-flex  mt-1">
                        <ul className="pagination">
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
                            </li>
                            {Array.from({ length: Math.ceil(ponds.length / itemsPerPage) }, (_, i) => (
                                <li className={`page-item ${currentPage === i + 1 ? 'active' : ''}`} key={i}>
                                    <button className="page-link" onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
                                </li>
                            ))}
                            <li className={`page-item ${currentPage === Math.ceil(ponds.length / itemsPerPage) ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
                            </li>
                        </ul>
                    </div>

                    {/* Delete Modal */}
                    {modalVisible && (
                        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                    <div className="modal-body">
                                        <h4>Are you sure you want to delete this item?</h4>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-sm btn-secondary" onClick={() => setModalVisible(false)}>Close</button>
                                        <button type="button" className="btn btn-sm btn-danger" onClick={handleDeleteConfirm}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Edit Modal */}
                    {showEditModal && (
                        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Edit Talao Name</h5>
                                        <button type="button" className="close" aria-label="Close" onClick={() => setShowEditModal(false)}>
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={editedContent}
                                            onChange={(e) => setEditedContent(e.target.value)}
                                        />
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-sm btn-secondary" onClick={() => setShowEditModal(false)}>Close</button>
                                        <button type="button" className="btn btn-sm btn-primary" onClick={handleSaveEdit}>Save changes</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default PondsAndTalao;
