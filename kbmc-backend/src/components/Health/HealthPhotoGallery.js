import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import api, { baseURL } from '../api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GLightbox from "glightbox";
import "glightbox/dist/css/glightbox.min.css";
import { Link } from "react-router-dom";

const HealthPhotoGallery = () => {
    const [photos, setPhotos] = useState([]);
    const [heading, setHeading] = useState('');
    const [img, setImg] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    // Fetch existing photos on component mount
    useEffect(() => {
        fetchPhotos();
    }, []);

    useEffect(() => {
        const lightbox = GLightbox({
            selector: ".glightbox",
        });

        return () => {
            lightbox.destroy();
        };
    }, [photos]);

    // GET Request to fetch all photos
    const fetchPhotos = async () => {
        try {
            const response = await api.get('/health_photo_gallery');
            setPhotos(response.data);
        } catch (error) {
            toast.error('Error fetching photos.');
        }
    };

    // POST Request to add a new photo
    const handleAddPhoto = async () => {
        if (heading && img) {
            const formData = new FormData();
            formData.append('heading', heading);
            formData.append('image', img); // Image key as 'image' to match backend

            try {
                const response = await api.post('/health_photo_gallery', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                setPhotos([...photos, response.data]); // Update state with new photo
                resetForm();
                setShowAddModal(false);
                fetchPhotos();
                toast.success('Photo added successfully!');

            } catch (error) {
                console.error('Error details:', error.response ? error.response.data : error.message);
                toast.error('Error adding photo.');
            }
        } else {
            toast.error('Please provide heading and image.');
        }
    };

    // PUT Request to edit an existing photo
    const handleEditPhoto = async () => {
        const formData = new FormData();
        formData.append('heading', selectedPhoto.heading); // Always update heading

        // Only append the image if a new file is selected
        if (img) {
            formData.append('image', img);
        }

        try {
            const response = await api.put(
                `/health_photo_gallery/${selectedPhoto.id}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            // Update state with the edited photo
            setPhotos(photos.map(photo => (photo.id === selectedPhoto.id ? response.data : photo)));
            fetchPhotos();
            toast.success('Photo updated successfully!');
        } catch (error) {
            toast.error('Error updating photo.');
        } finally {
            setShowEditModal(false);
        }
    };


    // DELETE Request to delete a photo by ID
    const handleDeletePhoto = async (id) => {
        try {
            await api.delete(`/health_photo_gallery/${id}`);
            setPhotos(photos.filter(photo => photo.id !== id)); // Remove photo from state
            fetchPhotos();
            toast.success('Photo deleted successfully!');
        } catch (error) {
            toast.error('Error deleting photo.');
        }
    };

    // Reset form after adding/editing a photo
    const resetForm = () => {
        setHeading('');
        setImg(null);
    };
    return (
        <>
            <div className="row">
                <div className="col-lg-12">
                    <div className="card-box">
                        <div className="card-block">
                            <div className="row">
                                <div className="col-sm-4 col-3">
                                    <h4 className="page-title">Photo Gallery</h4>
                                </div>
                                <div className="col-sm-8 col-9 text-right m-b-20">
                                    <button onClick={() => setShowAddModal(true)} className="btn btn-primary btn-rounded float-right">
                                        <i className="fa fa-plus"></i> Add New
                                    </button>
                                </div>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-bordered m-b-0">
                                    <thead>
                                        <tr>
                                            <th width="10%">Sr. No.</th>
                                            <th>Heading</th>
                                            <th>Image</th>
                                            <th width="15%">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {photos.map((photo, index) => (
                                            <tr key={photo.id}>
                                                <td>{index + 1}</td>
                                                <td>{photo.heading}</td>
                                                <td>
                                                    <Link
                                                        to={`${baseURL}${photo.img_path}`}
                                                        className="glightbox"
                                                        data-gallery="slider-images"
                                                    >
                                                        <img
                                                            width="100px"
                                                            src={`${baseURL}${photo.img_path}`}
                                                            alt={`photo${index + 1}`}
                                                        />
                                                    </Link>
                                                </td>
                                                <td>
                                                    <Button
                                                        onClick={() => {
                                                            setSelectedPhoto(photo);
                                                            setShowEditModal(true);
                                                        }}
                                                        className="btn btn-success btn-sm "
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button onClick={() => handleDeletePhoto(photo.id)} className="btn btn-danger btn-sm">
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
            {/* Add Photo Modal */}
            {showAddModal && (
                <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" aria-labelledby="addPhotoModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="addPhotoModalLabel">Add Photo</h5>
                                <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowAddModal(false)}>
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="formBasicHeading" className="form-label">Heading</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="formBasicHeading"
                                            value={heading}
                                            onChange={e => setHeading(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="formBasicImage" className="form-label">Image</label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            id="formBasicImage"
                                            onChange={e => setImg(e.target.files[0])}
                                            required
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-sm btn-secondary" onClick={() => setShowAddModal(false)}>Close</button>
                                <button type="button" className="btn btn-sm btn-primary" onClick={handleAddPhoto}>Add Photo</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Photo Modal */}
            {showEditModal && (
                <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" aria-labelledby="editPhotoModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="editPhotoModalLabel">Edit Photo</h5>
                                <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setShowEditModal(false)}>
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="formBasicHeading" className="form-label">Heading</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="formBasicHeading"
                                            value={selectedPhoto?.heading || ''}
                                            onChange={e => setSelectedPhoto({ ...selectedPhoto, heading: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="formBasicImage" className="form-label">Image</label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            id="formBasicImage"
                                            onChange={e => setImg(e.target.files[0])}
                                        />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-sm btn-secondary" onClick={() => setShowEditModal(false)}>Close</button>
                                <button type="button" className="btn btn-sm btn-primary" onClick={handleEditPhoto}>Save Changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </>
    )
}

export default HealthPhotoGallery