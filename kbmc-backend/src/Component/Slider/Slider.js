import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import GLightbox from "glightbox";
import "glightbox/dist/css/glightbox.min.css";
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles

const Slider = () => {
  const [sliders, setSliders] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedSlider, setSelectedSlider] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    fetchSliders();
  }, []);

  useEffect(() => {
    const lightbox = GLightbox({
      selector: ".glightbox",
    });

    return () => {
      lightbox.destroy();
    };
  }, [sliders]);

  const fetchSliders = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/sliders");
      setSliders(response.data);
    } catch (error) {
      console.error("Error fetching sliders:", error);
    }
  };

  const handleDelete = (slider) => {
    setSelectedSlider(slider);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/api/sliders/${selectedSlider.id}`
      );
      setSliders(sliders.filter((slider) => slider.id !== selectedSlider.id));
      toast.success("Slider deleted successfully!"); // Toast notification
      setShowDeleteModal(false);
      setSelectedSlider(null);
    } catch (error) {
      console.error("Error deleting slider:", error);
      toast.error("Error deleting slider!"); // Toast notification on error
    }
  };

  const handleEdit = (slider) => {
    setSelectedSlider(slider);
    setShowEditModal(true);
    setSelectedFile(null);
  };

  const handleSaveEdit = async () => {
    const formData = new FormData();

    // Append the new slider_name if it has been changed
    if (selectedSlider.slider_name) {
      formData.append("slider_name", selectedSlider.slider_name);
    }

    // If a new file is uploaded, append it
    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    try {
      await axios.put(
        `http://localhost:5000/api/sliders/${selectedSlider.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      fetchSliders(); // Refresh the list of sliders
      toast.success("Slider updated successfully!"); // Toast notification
      setShowEditModal(false); // Close the modal
    } catch (error) {
      console.error("Error updating slider:", error);
      toast.error("Error updating slider!"); // Toast notification on error
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    if (e.target.files[0]) {
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setSelectedSlider({ ...selectedSlider, image: imageUrl });
    }
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/">Home</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Slider
            </li>
          </ol>
        </nav>
        <div className="row">
          <div className="col-lg-12">
            <div className="card-box">
              <div className="card-block">
                <div className="row">
                  <div className="col-sm-4 col-3">
                    <h4 className="page-title">Slider</h4>
                  </div>
                  <div className="col-sm-8 col-9 text-right text-end mb-3">
                    <Link
                      to="/add_slider"
                      className="btn btn-primary btn-rounded float-right"
                      style={{ borderRadius: "100px" }}
                    >
                      <i className="fa fa-plus"></i>+ Add Slider
                    </Link>
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="table table-bordered m-b-0">
                    <thead>
                      <tr>
                        <th width="10%">Sr. No.</th>
                        <th>Image Name</th>
                        <th>Slider Image</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sliders.map((slider, index) => (
                        <tr key={slider.id}>
                          <td>{index + 1}</td>
                          <td>{slider.slider_name}</td>
                          <td>
                            <a
                              href={`http://localhost:5000${slider.file_path}`}
                              className="glightbox"
                              data-gallery="slider-images"
                            >
                              <img
                                width="200px"
                                src={`http://localhost:5000${slider.file_path}`}
                                alt={`slider${index + 1}`}
                              />
                            </a>
                          </td>
                          <td>
                            <button
                              className="btn btn-danger btn-sm m-t-10"
                              onClick={() => handleDelete(slider)}
                            >
                              Delete
                            </button>
                            <button
                              className="btn btn-success btn-sm m-t-10 mx-1"
                              onClick={() => handleEdit(slider)}
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
              Are you sure you want to delete {selectedSlider?.slider_name}?
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

        {selectedSlider && (
          <Modal
            show={showEditModal}
            onHide={() => setShowEditModal(false)}
            centered
          >
            <Modal.Header>
              <h5 className="modal-title">Edit Slider</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowEditModal(false)}
              ></button>
            </Modal.Header>
            <Modal.Body>
              <form>
                <div className="mb-3">
                  <label className="form-label">Image Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={selectedSlider.slider_name || ""}
                    onChange={(e) =>
                      setSelectedSlider({
                        ...selectedSlider,
                        slider_name: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    Upload New Image
                  </label>
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
                        src={`http://localhost:5000${selectedSlider.file_path}`}
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

export default Slider;
