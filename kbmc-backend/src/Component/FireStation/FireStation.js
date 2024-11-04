import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import GLightbox from "glightbox";
import "glightbox/dist/css/glightbox.min.css";
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";
import api, { baseURL } from "../api";

const FireStation = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedStation, setSelectedStation] = useState(null);
  const [fireStations, setFireStations] = useState([]);
  const [editData, setEditData] = useState({
    heading: "",
    address: "",
    phoneNo: "",
    image: null, // Change to null initially
  });
  const [imagePreview, setImagePreview] = useState(null); // For image preview

  // Fetch fire stations when the component mounts
  useEffect(() => {
    const lightbox = GLightbox({
      selector: ".glightbox",
    });

    return () => {
      lightbox.destroy();
    };
  }, [fireStations]);

  const fetchFireStations = () => {
    api
      .get("/fire-stations")
      .then((response) => {
        setFireStations(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the fire stations!", error);
        toast.error("Failed to load fire stations.");
      });
  };
  
  // Update your useEffect to call fetchFireStations
  useEffect(() => {
    fetchFireStations();
  }, []);

  // Handle Delete Modal open
  const handleDeleteModalOpen = (station) => {
    setSelectedStation(station);
    setShowDeleteModal(true);
  };

  // Handle Edit Modal open
  const handleEditModalOpen = (station) => {
    setEditData(station);
    setImagePreview(`${baseURL}${station.image_path}`); // Set initial image preview
    setShowEditModal(true);
  };

  // Handle Delete action
  const handleDelete = () => {
    api
      .delete(`/fire-stations/${selectedStation.id}`)
      .then(() => {
        setFireStations(
          fireStations.filter((station) => station.id !== selectedStation.id)
        );
        setShowDeleteModal(false);
        setSelectedStation(null);
        toast.success("Fire station deleted successfully!");
      })
      .catch((error) => {
        console.error("There was an error deleting the fire station!", error);
        toast.error("Failed to delete the fire station.");
      });
  };

  // Handle Edit Submit action
  const handleEditSubmit = async () => {
    const formData = new FormData();
    formData.append("heading", editData.heading);
    formData.append("address", editData.address);
    formData.append("phoneNo", editData.phoneNo);
    if (editData.image) {
      formData.append("image", editData.image);
    }
  
    try {
      await api.put(`/fire-stations/${editData.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      // Fetch the updated fire stations list again
      fetchFireStations();
  
      setShowEditModal(false);
      toast.success("Fire station updated successfully!");
    } catch (error) {
      console.error("There was an error updating the fire station!", error);
      toast.error("Failed to update the fire station.");
    }
  };

  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditData({
      heading: "",
      address: "",
      phoneNo: "",
      image: null,
    });
    setImagePreview(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditData({ ...editData, image: file });
      setImagePreview(URL.createObjectURL(file)); // Create a preview URL
    }
  };

  return (
    <>
      <ToastContainer /> {/* ToastContainer for displaying toasts */}
      <div className="page-wrapper">
        <div className="content">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="#.">City Profile</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Fire Station
              </li>
            </ol>
          </nav>
          <div className="row">
            <div className="col-lg-12">
              <div className="card-box">
                <div className="card-block">
                  <div className="row">
                    <div className="col-sm-4 col-3">
                      <h4 className="page-title">Fire Station</h4>
                    </div>
                    <div className="text-end mb-3">
                      <Link to="/add-fire">
                        <button
                          className="btn btn-primary"
                          style={{ borderRadius: "100px" }}
                        >
                          + Add Fire Station
                        </button>
                      </Link>
                    </div>
                  </div>
                  <div className="table-responsive m-t-10">
                    <Table bordered>
                      <thead>
                        <tr>
                          <th width="10%">Sr. No.</th>
                          <th>Heading</th>
                          <th>Address</th>
                          <th>Phone No.</th>
                          <th>Image</th>
                          <th width="15%">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {fireStations.map((station, index) => (
                          <tr key={station.id}>
                            <td>{index + 1}</td>
                            <td>{station.heading}</td>
                            <td>{station.address}</td>
                            <td>{station.phoneNo}</td>
                            <td>
                              <a
                                href={`${baseURL}${station.image_path}`}
                                className="glightbox"
                                data-gallery="slider-images"
                              >
                                <img
                                  width="50px"
                                  src={`${baseURL}${station.image_path}`}
                                  alt={`fire-station-img${station.image_path}`}
                                />
                              </a>
                            </td>
                            <td>
                              <Button
                                variant="danger"
                                size="sm"
                                className="m-t-10"
                                onClick={() => handleDeleteModalOpen(station)}
                              >
                                Delete
                              </Button>
                              <Button
                                variant="success"
                                size="sm"
                                className="m-t-10"
                                style={{ marginLeft: "5px" }}
                                onClick={() => handleEditModalOpen(station)}
                              >
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

          {/* Delete Modal */}
          <Modal
            show={showDeleteModal}
            onHide={handleCloseDeleteModal}
            centered
          >
            <Modal.Body>
              <h4 style={{ textAlign: "center" }}>
                Are you sure you want to delete this item?
              </h4>
            </Modal.Body>
            <Modal.Footer style={{ justifyContent: "center" }}>
              <Button variant="secondary" onClick={handleCloseDeleteModal}>
                Close
              </Button>
              <Button variant="danger" onClick={handleDelete}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Edit Modal */}
          <Modal show={showEditModal} onHide={handleCloseEditModal} centered>
            <Modal.Header closeButton>
              <Modal.Title>Edit Fire Station</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formHeading">
                  <Form.Label>Heading</Form.Label>
                  <Form.Control
                    type="text"
                    value={editData.heading}
                    onChange={(e) =>
                      setEditData({ ...editData, heading: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="formAddress">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    value={editData.address}
                    onChange={(e) =>
                      setEditData({ ...editData, address: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="formPhone">
                  <Form.Label>Phone No.</Form.Label>
                  <Form.Control
                    type="text"
                    value={editData.phoneNo}
                    onChange={(e) =>
                      setEditData({ ...editData, phoneNo: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="formImage">
                  <Form.Label>Image Upload</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      style={{ width: "100px", marginTop: "10px" }}
                    />
                  )}
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseEditModal}>
                Close
              </Button>
              <Button variant="primary" onClick={handleEditSubmit}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default FireStation;
