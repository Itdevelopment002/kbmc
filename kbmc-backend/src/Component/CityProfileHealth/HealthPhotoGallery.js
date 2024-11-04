import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import api, { baseURL } from '../api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GLightbox from "glightbox";
import "glightbox/dist/css/glightbox.min.css";

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
      <div className="page-wrapper">
        <div className="content">
          <h4 className="page-title">Photo Gallery</h4>
          <Button onClick={() => setShowAddModal(true)} className="btn btn-primary mb-3 text-end">
            + Add Photo
          </Button>
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Sr. No.</th>
                  <th>Heading</th>
                  <th>Image</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {photos.map((photo, index) => (
                  <tr key={photo.id}>
                    <td>{index + 1}</td>
                    <td>{photo.heading}</td>
                    <td>
                            <a
                              href={`${baseURL}${photo.img_path}`}
                              className="glightbox"
                              data-gallery="slider-images"
                            >
                              <img
                                width="100px"
                                src={`${baseURL}${photo.img_path}`}
                                alt={`photo${index + 1}`}
                              />
                            </a>
                          </td>
                    <td>
                      <Button
                        onClick={() => {
                          setSelectedPhoto(photo);
                          setShowEditModal(true);
                        }}
                        className="btn btn-success btn-sm mx-1"
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

          {/* Add Photo Modal */}
          <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Add Photo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formBasicHeading">
                  <Form.Label>Heading</Form.Label>
                  <Form.Control type="text" value={heading} onChange={e => setHeading(e.target.value)} required />
                </Form.Group>
                <Form.Group controlId="formBasicImage">
                  <Form.Label>Image</Form.Label>
                  <Form.Control type="file" onChange={e => setImg(e.target.files[0])} required />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowAddModal(false)}>
                Close
              </Button>
              <Button variant="primary" onClick={handleAddPhoto}>
                Add Photo
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Edit Photo Modal */}
          <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Photo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formBasicHeading">
                  <Form.Label>Heading</Form.Label>
                  <Form.Control
                    type="text"
                    value={selectedPhoto?.heading || ''}
                    onChange={e => setSelectedPhoto({ ...selectedPhoto, heading: e.target.value })}
                    required
                  />
                </Form.Group>
                <Form.Group controlId="formBasicImage">
                  <Form.Label>Image</Form.Label>
                  <Form.Control type="file" onChange={e => setImg(e.target.files[0])} />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                Close
              </Button>
              <Button variant="primary" onClick={handleEditPhoto}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>

          <ToastContainer />
        </div>
      </div>
    </>
  );
};

export default HealthPhotoGallery;
