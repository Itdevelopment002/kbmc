import React, { useState, useEffect } from 'react';
import api, { baseURL } from '../api';
import { Modal, Button, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import GLightbox from 'glightbox';
import 'glightbox/dist/css/glightbox.css';

const GovernmentWebsiteLinks = () => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editLinkData, setEditLinkData] = useState({ id: '', websitelink: '', websitelogo: '' });
    const [links, setLinks] = useState([]);
    const [selectedLinkId, setSelectedLinkId] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const currentPageData = links.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const API_URL = '/websitelinks';

    useEffect(() => {
        fetchLinks();
    }, []);

    useEffect(() => {
        // Initialize GLightbox after links have been fetched and updated
        initLightbox();
    }, [links]);

    const initLightbox = () => {
        GLightbox({
            selector: '.glightbox',
        });
    };

    const fetchLinks = () => {
        api.get(API_URL)
            .then((response) => {
                setLinks(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    const handleDeleteConfirm = () => {
        if (selectedLinkId) {
            api.delete(`${API_URL}/${selectedLinkId}`)
                .then(() => {
                    setLinks(links.filter(websitelink => websitelink.id !== selectedLinkId));
                    setShowDeleteModal(false);
                })
                .catch((error) => {
                    console.error('Error deleting websitelink:', error);
                });
        }
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('websitelink', editLinkData.websitelink);

        // Append the new logo only if it's a file
        if (editLinkData.websitelogo instanceof File) {
            formData.append('websitelogo', editLinkData.websitelogo);
        }

        // Optimistic UI update
        const updatedLinks = links.map(websitelink =>
            websitelink.id === editLinkData.id
                ? { ...websitelink, websitelink: editLinkData.websitelink, websitelogo: editLinkData.websitelogo instanceof File ? URL.createObjectURL(editLinkData.websitelogo) : websitelink.websitelogo }
                : websitelink
        );
        setLinks(updatedLinks);

        api.put(`${API_URL}/${editLinkData.id}`, formData)
            .then((response) => {
                // Update the links state with the new data from the response
                setLinks(links.map(websitelink => (websitelink.id === editLinkData.id ? response.data : websitelink)));
                setShowEditModal(false);
                fetchLinks();
            })
            .catch((error) => {
                console.error('Error updating websitelink:', error);
                // Optionally revert the optimistic update here if needed
            });
    };

    const openEditModal = (websitelink) => {
        setEditLinkData({
            id: websitelink.id,
            websitelink: websitelink.websitelink,
            websitelogo: websitelink.websitelogo // Keeping the logo URL to display as preview
        });
        setShowEditModal(true);
    };

    return (
        <div className="page-wrapper">
            <div className="content">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><a href="/">Home</a></li>
                        <li className="breadcrumb-item active" aria-current="page">Govt. Website Link</li>
                    </ol>
                </nav>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card-box">
                            <div className="card-block">
                                <div className="row">
                                    <div className="col-sm-4 col-3">
                                        <h4 className="page-title">Govt. Website Links</h4>
                                    </div>
                                    <div className="col-sm-8 col-9 text-right m-b-20">
                                        <Link to="/Add_websitelink" style={{ borderRadius: '100px', float: 'right', display: 'inline-block' }} className="btn btn-primary">
                                            <i className="fa fa-plus"></i> Add Link
                                        </Link>
                                    </div>
                                </div>
                                <div className="table-responsive mt-5">
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>
                                                <th width="10%">Sr. No.</th>
                                                <th>Govt. Website Link</th>
                                                <th>Govt. Website Logo</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentPageData.map((websitelink, index) => (
                                                <tr key={websitelink.id}>
                                                    <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                                                    <td>{websitelink.websitelink}</td>
                                                    <td>
                                                        <a
                                                            href={`${baseURL}${websitelink.websitelogo}`}
                                                            className="glightbox"
                                                            data-gallery="web-links-gallery"
                                                        // data-title={websitelink.websitelink}
                                                        >
                                                            <img
                                                                width="50px"
                                                                src={`${baseURL}${websitelink.websitelogo}`}
                                                                alt={websitelink.id}
                                                                style={{ borderRadius: '5px' }}
                                                            />
                                                        </a>
                                                    </td>
                                                    <td>
                                                        <Button
                                                            variant="danger"
                                                            className="btn-sm m-t-10 mx-1"
                                                            onClick={() => {
                                                                setSelectedLinkId(websitelink.id);
                                                                setShowDeleteModal(true);
                                                            }}>
                                                            Delete
                                                        </Button>
                                                        <Button
                                                            variant="success"
                                                            className="btn-sm m-t-10"
                                                            onClick={() => openEditModal(websitelink)}>
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
                {/* Pagination */}
                <div className="mt-4">
                    <ul className="pagination">
                        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
                        </li>
                        {Array.from({ length: Math.ceil(links.length / itemsPerPage) }, (_, i) => (
                            <li className={`page-item ${currentPage === i + 1 ? 'active' : ''}`} key={i}>
                                <button className="page-link" onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
                            </li>
                        ))}
                        <li className={`page-item ${currentPage === Math.ceil(links.length / itemsPerPage) ? 'disabled' : ''}`}>
                            <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
                        </li>
                    </ul>
                </div>

                {/* Delete Modal */}
                <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Delete</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
                        <Button variant="danger" onClick={handleDeleteConfirm}>Delete</Button>
                    </Modal.Footer>
                </Modal>
                {/* {editmodel} */}
                <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Government Website Link</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={handleEditSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Website Link</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={editLinkData.websitelink}
                                    onChange={(e) => setEditLinkData({ ...editLinkData, websitelink: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Website Logo</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    accept="image/*"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        setEditLinkData({
                                            ...editLinkData,
                                            websitelogo: file,
                                            websitelogoPreview: URL.createObjectURL(file), // Preview for new image
                                        });
                                    }}
                                />
                            </div>
                            <div>
                                <img
                                    src={editLinkData.websitelogoPreview ? editLinkData.websitelogoPreview : `${baseURL}${editLinkData.websitelogo}`}
                                    alt="Preview"
                                    style={{ maxWidth: '50%', marginTop: '10px' }}
                                />
                            </div>
                            <Button type="submit" className="mt-3">Update</Button>
                        </form>
                    </Modal.Body>
                </Modal>

            </div>
        </div>
    );
};

export default GovernmentWebsiteLinks;
