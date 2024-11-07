import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import api from '../api';

const NewsUpdate = () => {
    const [news, setNews] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedNews, setSelectedNews] = useState(null);
    const [editedContent, setEditedContent] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Fetch news data from the API
    const fetchNews = async () => {
        try {
            const response = await api.get('/newsupdate'); // Replace with your API URL
            setNews(response.data);
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    };

    useEffect(() => {
        fetchNews(); // Fetch news when component mounts
    }, []);

    // Handle delete click
    const handleDeleteClick = (newsId) => {
        setSelectedNews(newsId);
        setModalVisible(true);
    };

    // Confirm delete
    const handleDeleteConfirm = async () => {
        try {
            await api.delete(`/newsupdate/${selectedNews}`); // Replace with your API URL
            // Update state to remove the deleted item
            setNews(news.filter(item => item.id !== selectedNews));
            setModalVisible(false);
            setSelectedNews(null);
        } catch (error) {
            console.error('Error deleting news:', error);
        }
    };

    // Handle edit click
    const handleEditClick = (newsItem) => {
        setSelectedNews(newsItem.id);
        setEditedContent(newsItem.description); // Set the content to edit
        setShowEditModal(true);
    };

    // Save edited news
    const handleSaveEdit = async () => {
        try {
            await api.put(`/newsupdate/${selectedNews}`, {
                description: editedContent, // Ensure this matches your API's expected field
            });

            // Update the news state with the edited content
            setNews(news.map(item =>
                item.id === selectedNews ? { ...item, description: editedContent } : item // Update the description
            ));
            setShowEditModal(false);
            setSelectedNews(null);
            setEditedContent(''); // Reset the content after saving
        } catch (error) {
            console.error('Error updating news:', error);
        }
    };

    // Pagination logic
    const currentPageData = news.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className="page-wrapper d-flex">
            <div className="content flex-fill">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">News Update</li>
                    </ol>
                </nav>

                <div className="row">
                    <div className="col-lg-12">
                        <div className="card-box">
                            <div className="card-block">
                                <div className="row">
                                    <div className="col-sm-4 col-3">
                                        <h4 className="page-title">News Update</h4>
                                    </div>
                                    <div className="col-sm-8 col-9 text-end mb-3">
                                        <Link to="/add-news" className="btn btn-primary btn-rounded float-end" style={{ borderRadius: "100px" }}>
                                            <i className="fa fa-plus"></i> + Add News
                                        </Link>
                                    </div>
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-bordered m-b-0">
                                        <thead>
                                            <tr>
                                                <th width="10%">Sr. No.</th>
                                                <th>Description</th>
                                                <th width="15%">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentPageData.length > 0 ? currentPageData.map((item, index) => (
                                                <tr key={item.id}>
                                                    <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                                    <td>{item.description}</td>
                                                    <td>
                                                        <button
                                                            className="btn btn-danger btn-sm m-t-10 mx-1"
                                                            onClick={() => handleDeleteClick(item.id)}
                                                        >
                                                            Delete
                                                        </button>
                                                        <button
                                                            className="btn btn-success btn-sm m-t-10"
                                                            onClick={() => handleEditClick(item)}
                                                        >
                                                            Edit
                                                        </button>
                                                    </td>
                                                </tr>
                                            )) : (
                                                <tr>
                                                    <td colSpan="3" style={{ textAlign: 'center' }}>No news available</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>

                                {/* Pagination */}
                                <div className="mt-4">
                                    <ul className="pagination">
                                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                            <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
                                        </li>
                                        {Array.from({ length: Math.ceil(news.length / itemsPerPage) }, (_, i) => (
                                            <li className={`page-item ${currentPage === i + 1 ? 'active' : ''}`} key={i}>
                                                <button className="page-link" onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
                                            </li>
                                        ))}
                                        <li className={`page-item ${currentPage === Math.ceil(news.length / itemsPerPage) ? 'disabled' : ''}`}>
                                            <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Delete Modal */}
                <Modal show={modalVisible} onHide={() => setModalVisible(false)} centered>
                    <Modal.Body>
                        <h4 style={{ textAlign: 'center' }}>Are you sure you want to delete this news item?</h4>
                    </Modal.Body>
                    <Modal.Footer style={{ justifyContent: 'center' }}>
                        <Button variant="secondary" onClick={() => setModalVisible(false)}>Close</Button>
                        <Button variant="danger" onClick={handleDeleteConfirm}>Delete</Button>
                    </Modal.Footer>
                </Modal>

                {/* Edit Modal */}
                {showEditModal && (
                    <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
                        <Modal.Header>
                            <h5 className="modal-title">Edit News</h5>
                            <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}></button>
                        </Modal.Header>
                        <Modal.Body>
                            <form>
                                <div className="mb-3">
                                    <label className="form-label">News Description</label>
                                    <textarea
                                        className="form-control"
                                        value={editedContent}
                                        onChange={(e) => setEditedContent(e.target.value)}
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

export default NewsUpdate;
