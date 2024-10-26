import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import GLightbox from "glightbox";
import "glightbox/dist/css/glightbox.min.css";

const Award = () => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedAward, setSelectedAward] = useState(null);
    const [showEditAwardModal, setShowEditAwardModal] = useState(false);
    const [editAwardData, setEditAwardData] = useState({ id: null, heading: '', description: '', imgSrc: '' });
    const [awards, setAwards] = useState([]);
    const [lightboxImage, setLightboxImage] = useState(null);
    const [imageFile, setImageFile] = useState(null); // State for image file
    const [newImagePreview, setNewImagePreview] = useState(null); // New state for image preview

    useEffect(() => {
        fetchAwards();
    }, []);

    useEffect(() => {
        const lightbox = GLightbox({
            selector: ".glightbox",
        });

        return () => {
            lightbox.destroy();
        };
    }, [awards]);

    // Fetch Awards from the API
    const fetchAwards = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/awards'); // Adjust the URL as per your API
            setAwards(response.data);
        } catch (error) {
            console.error('Error fetching awards:', error);
        }
    };

    const handleDeleteClick = (awardId) => {
        setSelectedAward(awardId);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/awards/${selectedAward}`); // Adjust the URL as per your API
            fetchAwards(); // Refresh the awards list
        } catch (error) {
            console.error('Error deleting award:', error);
        }
        setShowDeleteModal(false);
        setSelectedAward(null);
    };

    const handleEditAwardClick = (award) => {
        setEditAwardData({ id: award.id, heading: award.heading, description: award.description, imgSrc: award.awardimage });
        setImageFile(null); // Reset the image file state
        setNewImagePreview(null); // Reset new image preview
        setShowEditAwardModal(true);
    };

    const handleUpdateAward = async () => {
        const formData = new FormData();
        formData.append('heading', editAwardData.heading);
        formData.append('description', editAwardData.description);
        
        if (imageFile) {
            formData.append('awardimage', imageFile); // Append the new image file
        }

        try {
            await axios.put(`http://localhost:5000/api/awards/${editAwardData.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data' // Set the appropriate headers for file upload
                }
            });
            fetchAwards(); // Refresh the awards list
        } catch (error) {
            console.error('Error updating award:', error);
        }
        setShowEditAwardModal(false);
    };

    return (
        <div className="page-wrapper">
            <div className="content">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="#">About KBMC</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Awards</li>
                    </ol>
                </nav>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card-box">
                            <div className="card-block">
                                <div className="row">
                                    <div className="col-sm-4 col-3">
                                        <h4 className="page-title">Awards</h4>
                                    </div>
                                    <div className="col-sm-8 col-9 text-end mb-3">
                                        <Link to="/Add_award" className="btn btn-primary btn-rounded float-right" style={{ borderRadius: '100px' }}>
                                            <i className="fa fa-plus"></i> + Add Award
                                        </Link>
                                    </div>
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-bordered m-b-0">
                                        <thead>
                                            <tr>
                                                <th width="10%">Sr. No.</th>
                                                <th>Heading</th>
                                                <th>Description</th>
                                                <th>Award Image</th>
                                                <th width="15%">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {awards.map((award, index) => (
                                                <tr key={award.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{award.heading}</td>
                                                    <td>{award.description}</td>
                                                    <td>
                                                        <a
                                                            href={`http://localhost:5000${award.awardimage}`}
                                                            className="glightbox"
                                                            data-gallery="award-images"
                                                        >
                                                            <img
                                                                width="50px"
                                                                src={`http://localhost:5000${award.awardimage}`}
                                                                alt={`award${index + 1}`}
                                                            />
                                                        </a>
                                                    </td>
                                                    <td>
                                                        <button
                                                            className="btn btn-danger btn-sm m-t-10"
                                                            onClick={() => handleDeleteClick(award.id)}
                                                        >
                                                            Delete
                                                        </button>
                                                        <button
                                                            className="btn btn-success btn-sm m-t-10 mx-1"
                                                            onClick={() => handleEditAwardClick(award)}
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

                {/* Pagination */}
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
                <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Delete</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to delete this award?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
                        <Button variant="danger" onClick={handleDeleteConfirm}>Delete</Button>
                    </Modal.Footer>
                </Modal>

                {/* Edit Award Modal */}
                <Modal show={showEditAwardModal} onHide={() => setShowEditAwardModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Award</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className="mb-3">
                                <label className="form-label">Heading</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={editAwardData.heading}
                                    onChange={(e) => setEditAwardData({ ...editAwardData, heading: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Description</label>
                                <textarea
                                    className="form-control"
                                    value={editAwardData.description}
                                    onChange={(e) => setEditAwardData({ ...editAwardData, description: e.target.value })}
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Award Image</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    accept="image/*"
                                    onChange={(e) => {
                                        setImageFile(e.target.files[0]); // Set the selected image file
                                        setNewImagePreview(URL.createObjectURL(e.target.files[0])); // Preview the selected image
                                    }}
                                />
                                {newImagePreview ? ( // Show the new image preview if available
                                    <img
                                        src={newImagePreview}
                                        alt="New Preview"
                                        className="img-thumbnail mt-2"
                                        style={{ maxHeight: '100px' }}
                                    />
                                ) : (
                                    editAwardData.imgSrc && ( // If no new image, show existing image
                                        <img
                                            src={`http://localhost:5000${editAwardData.imgSrc}`}
                                            alt="Current Preview"
                                            className="img-thumbnail mt-2"
                                            style={{ maxHeight: '100px' }}
                                        />
                                    )
                                )}
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowEditAwardModal(false)}>Cancel</Button>
                        <Button variant="primary" onClick={handleUpdateAward}>Update</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
};

export default Award;
