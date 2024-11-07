import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa'; // Import a cross icon for the remove button
import GLightbox from "glightbox";
import "glightbox/dist/css/glightbox.min.css";
import api, { baseURL } from '../api';

const Gardens = () => {
    const [gardensData, setGardensData] = useState([]); // State to hold garden data
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedGarden, setSelectedGarden] = useState(null);
    const [selectedFiles, setSelectedFiles] = useState([]); // State to hold the selected files for upload
    const [currentImages, setCurrentImages] = useState([]); // State to hold current images for editing
    const [removedImages, setRemovedImages] = useState([]); // State to track removed images

    useEffect(() => {
        const lightbox = GLightbox({
            selector: ".glightbox",
        });

        return () => {
            lightbox.destroy();
        };
    }, [gardensData]);

    // Fetch gardens data on component mount
    useEffect(() => {
        const fetchGardens = async () => {
            try {
                const response = await api.get('/gardens'); // Replace with your API endpoint
                setGardensData(response.data); // Set the fetched data
            } catch (error) {
                console.error('Error fetching gardens data:', error);
            }
        };

        fetchGardens();
    }, []);

    const handleDelete = (garden) => {
        setSelectedGarden(garden);
        setShowDeleteModal(true);
    };

    const handleEdit = (garden) => {
        setSelectedGarden(garden);
        setSelectedFiles([]); // Reset the file selection on edit
        setCurrentImages(JSON.parse(garden.images)); // Set current images for editing
        setRemovedImages([]); // Reset removed images state
        setShowEditModal(true);
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
        setSelectedGarden(null);
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
        setSelectedGarden(null);
        setSelectedFiles([]); // Reset file selection on close
        setCurrentImages([]); // Reset current images
        setRemovedImages([]); // Reset removed images
    };

    const handleSaveEdit = async () => {
        try {
            const formData = new FormData();
            formData.append('heading', selectedGarden.heading); // Use the correct field for heading

            // Include remaining images (after removing any)
            currentImages.forEach(img => {
                if (!removedImages.includes(img)) {
                    formData.append('images', img); // Use 'images' to match the upload field in your API
                }
            });

            // Include newly selected images
            selectedFiles.forEach(file => {
                formData.append('images', file);
            });

            // Send a request to update the garden
            await api.put(`/gardens/${selectedGarden.id}`, formData); // Replace with your API endpoint

            // Fetch updated gardens data
            const response = await api.get('/gardens'); // Replace with your API endpoint
            setGardensData(response.data); // Update state with new data

            setShowEditModal(false);
        } catch (error) {
            console.error('Error saving garden changes:', error);
        }
    };

    const handleFileChange = (e) => {
        setSelectedFiles([...selectedFiles, ...Array.from(e.target.files)]);
    };

    const handleDeleteConfirm = async () => {
        try {
            await api.delete(`/gardens/${selectedGarden.id}`); // Delete the selected garden
            setGardensData(gardensData.filter(garden => garden.id !== selectedGarden.id)); // Update state to remove deleted garden
            handleCloseDeleteModal(); // Close modal
        } catch (error) {
            console.error('Error deleting garden:', error);
        }
    };

    // Function to remove an image from currentImages state
    const handleRemoveImage = (image) => {
        if (currentImages.includes(image)) {
            // If it's an existing image, add it to removedImages
            setRemovedImages([...removedImages, image]);
            setCurrentImages(currentImages.filter(img => img !== image));
        } else {
            // If it's a newly selected image, remove it from selectedFiles
            setSelectedFiles(selectedFiles.filter(file => file.name !== image.name));
        }
    };

    return (
        <div className="page-wrapper">
            <div className="content">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="#.">City Profile</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Gardens</li>
                    </ol>
                </nav>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card-box">
                            <div className="card-block">
                                <div className="row">
                                    <div className="col-sm-4 col-3">
                                        <h4 className="page-title">Gardens</h4>
                                    </div>
                                    <div className="text-end mb-3">
                                        <Link to="/add-gardens">
                                            <button className="btn btn-primary" style={{ borderRadius: "100px" }}>+ Add Gardens</button>
                                        </Link>
                                    </div>
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-bordered m-b-0">
                                        <thead>
                                            <tr>
                                                <th width="10%">Sr. No.</th>
                                                <th>Garden Names</th>
                                                <th>Garden Images</th>
                                                <th width="15%">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {gardensData.map((garden, index) => (
                                                <tr key={garden.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{garden.heading}</td>
                                                    <td>
                                                        <div className="d-flex flex-wrap">
                                                            {JSON.parse(garden.images).map((img, imgIndex) => (
                                                                <div key={imgIndex} className="position-relative me-2">
                                                                    <img
                                                                        src={`${baseURL}${img}`}
                                                                        alt=""
                                                                        className="glightbox"
                                                                        style={{ width: '50px', height: '50px', marginRight: '5px' }} // Removed data-title attribute
                                                                    />
                                                                </div>
                                                            ))}
                                                        </div>

                                                    </td>
                                                    <td>
                                                        <button className="btn btn-success" onClick={() => handleEdit(garden)}>Edit</button>
                                                        <button className="btn btn-danger mx-1" onClick={() => handleDelete(garden)}>Delete</button>
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

            {/* Delete Confirmation Modal */}
            <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this garden?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDeleteModal}>Cancel</Button>
                    <Button variant="danger" onClick={handleDeleteConfirm}>Delete</Button>
                </Modal.Footer>
            </Modal>

            {/* Edit Modal */}
            <Modal show={showEditModal} onHide={handleCloseEditModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Garden</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedGarden && (
                        <>
                            <div className="form-group">
                                <label>Heading</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={selectedGarden.heading}
                                    onChange={(e) => setSelectedGarden({ ...selectedGarden, heading: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <label>Uploaded Images</label>
                                <div className="d-flex flex-wrap mb-2">
                                    {currentImages.map((img, index) => (
                                        <div key={index} className="position-relative me-2">
                                            <img
                                                src={`${baseURL}${img}`}
                                                alt={`Uploaded Image ${index}`}
                                                style={{ width: '50px', height: '50px', marginRight: '5px' }}
                                            />
                                            <button
                                                type="button"
                                                className="btn btn-danger position-absolute top-0 end-0 d-flex align-items-center justify-content-center"
                                                onClick={() => handleRemoveImage(img)}
                                                style={{
                                                    borderRadius: '50%',
                                                    width: '20px',
                                                    height: '20px',
                                                    padding: 0,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                <FaTimes size={10} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="form-group">
                                <label>New Images</label>
                                <input type="file" accept="image/*" multiple onChange={handleFileChange} />
                                <div className="d-flex flex-wrap mt-2">
                                    {selectedFiles.map((file, index) => (
                                        <div key={index} className="position-relative me-2">
                                            <img
                                                src={URL.createObjectURL(file)}
                                                alt={`Selected File ${index}`}
                                                style={{ width: '50px', height: '50px', marginRight: '5px' }}
                                            />
                                            <button
                                                type="button"
                                                className="btn btn-danger position-absolute top-0 end-0 d-flex align-items-center justify-content-center"
                                                onClick={() => handleRemoveImage(file)}
                                                style={{
                                                    borderRadius: '50%',
                                                    width: '20px',
                                                    height: '20px',
                                                    padding: 0,
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                <FaTimes size={10} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseEditModal}>Cancel</Button>
                    <Button variant="primary" onClick={handleSaveEdit}>Save Changes</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Gardens;
