import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import GLightbox from "glightbox";
import "glightbox/dist/css/glightbox.min.css";
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Ensure you have react-bootstrap installed

const Photogallery = () => {
  const [gallerys, setGallerys] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    fetchGallerys();
  }, []);

  useEffect(() => {
    const lightbox = GLightbox({
      selector: ".glightbox",
    });

    return () => {
      lightbox.destroy();
    };
  }, [gallerys]);

  const fetchGallerys = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/gallerys");
      setGallerys(response.data);
    } catch (error) {
      console.error("Error fetching gallerys:", error);
    }
  };

  const handleDelete = (gallery) => {
    setSelectedGallery(gallery);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/api/gallerys/${selectedGallery.id}`
      );
      setGallerys(
        gallerys.filter((gallery) => gallery.id !== selectedGallery.id)
      );
      toast.success("Gallery deleted successfully!"); // Toast notification
      setShowDeleteModal(false);
      setSelectedGallery(null);
    } catch (error) {
      console.error("Error deleting gallery:", error);
      toast.error("Error deleting gallery!"); // Toast notification on error
    }
  };

  const handleEdit = (gallery) => {
    setSelectedGallery(gallery);
    setShowEditModal(true);
    setSelectedFile(null);
  };

  const handleSaveEdit = async () => {
    const formData = new FormData();

    // Append the new slider_name if it has been changed
    if (selectedGallery.photo_name) {
      formData.append("photo_name", selectedGallery.photo_name);
    }

    // If a new file is uploaded, append it
    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    try {
      await axios.put(
        `http://localhost:5000/api/gallerys/${selectedGallery.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      fetchGallerys(); // Refresh the list of sliders
      toast.success("Gallery updated successfully!"); // Toast notification
      setShowEditModal(false); // Close the modal
    } catch (error) {
      console.error("Error updating galllery:", error);
      toast.error("Error updating gallery!"); // Toast notification on error
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    if (e.target.files[0]) {
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setSelectedGallery({ ...selectedGallery, image: imageUrl });
    }
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Photo Gallery
            </li>
          </ol>
        </nav>
        <div className="row">
          <div className="col-lg-12">
            <div className="card-box">
              <div className="card-block">
                <div className="row">
                  <div className="col-sm-4 col-3">
                    <h4 className="page-title">Photo Gallery</h4>
                  </div>
                  <div className="col-sm-8 col-9 text-end mb-3">
                    <Link
                      to="/Add_photogallery"
                      className="btn btn-primary btn-rounded float-right"
                      style={{ borderRadius: "100px" }}
                    >
                      <i className="fa fa-plus"></i> + Add Photos
                    </Link>
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="table table-bordered m-b-0">
                    <thead>
                      <tr>
                        <th width="10%">Sr. No.</th>
                        <th>Photo Gallery Name</th>
                        <th>Photo Gallery Image</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {gallerys.map((gallery, index) => (
                        <tr key={gallery.id}>
                          <td>{index + 1}</td>
                          <td>{gallery.photo_name}</td>
                          <td>
                            <a
                              href={`http://localhost:5000${gallery.file_path}`}
                              className="glightbox"
                              data-gallery="gallery-images"
                            >
                              <img
                                width="200px"
                                src={`http://localhost:5000${gallery.file_path}`}
                                alt={`gallery${index + 1}`}
                              />
                            </a>
                          </td>
                          <td>
                            <button
                              className="btn btn-danger btn-sm m-t-10"
                              onClick={() => handleDelete(gallery)}
                            >
                              Delete
                            </button>
                            <button
                              className="btn btn-success btn-sm m-t-10 mx-1"
                              onClick={() => handleEdit(gallery)}
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
        <Modal
          show={showDeleteModal}
          onHide={() => setShowDeleteModal(false)}
          centered
        >
          <Modal.Body>
            <h4 style={{ textAlign: "center" }}>
              Are you sure you want to delete {selectedGallery?.photo_name}?
            </h4>
          </Modal.Body>
          <Modal.Footer style={{ justifyContent: "center" }}>
            <Button
              variant="secondary"
              onClick={() => setShowDeleteModal(false)}
            >
              Close
            </Button>
            <Button variant="danger" onClick={confirmDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Edit Modal */}
        {selectedGallery && (
          <Modal
            show={showEditModal}
            onHide={() => setShowEditModal(false)}
            centered
          >
            <Modal.Header>
              <h5 className="modal-title">Edit Photo Gallery</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowEditModal(false)}
              ></button>
            </Modal.Header>
            <Modal.Body>
              <form>
                <div className="mb-3">
                  <label className="form-label">Gallery Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={selectedGallery.photo_name || ""}
                    onChange={(e) =>
                      setSelectedGallery({
                        ...selectedGallery,
                        photo_name: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Upload New Image</label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <div className="mt-2">
                    {selectedFile ? (
                      <img
                        src={URL.createObjectURL(selectedFile)}
                        alt="Selected"
                        width="200"
                        className="img-thumbnail"
                      />
                    ) : (
                      <img
                        src={`http://localhost:5000${selectedGallery.file_path}`}
                        alt="Stored"
                        width="200"
                        className="img-thumbnail"
                      />
                    )}
                  </div>
                </div>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowEditModal(false)}
              >
                Close
              </Button>
              <Button variant="primary" onClick={handleSaveEdit}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Photogallery;
