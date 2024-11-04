import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import api, { baseURL } from '../../api';
import GLightbox from "glightbox";
import "glightbox/dist/css/glightbox.min.css";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PreviousPresidents = () => {
  const [presidents, setPresidents] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPresidentId, setSelectedPresidentId] = useState(null);
  const [editData, setEditData] = useState({
    president_name: "",
    start_date: "",
    end_date: "",
    image_path: "",
  });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const lightbox = GLightbox({
      selector: ".glightbox",
    });

    return () => {
      lightbox.destroy();
    };
  }, [presidents]);

  // Fetch officers on component mount
  const fetchPresidents = async () => {
    try {
      const response = await api.get("/presidents");
      setPresidents(response.data);
    } catch (error) {
      toast.error("Failed to fetch presidents.");
    }
  };

  useEffect(() => {
    fetchPresidents();
  }, []);

  // Handle delete button click
  const handleDeleteClick = (id) => {
    setSelectedPresidentId(id);
    setShowDeleteModal(true);
  };

  // Confirm delete action and call API
  // Confirm delete action and call API
  const confirmDelete = () => {
    api
      .delete(`/presidents/${selectedPresidentId}`)
      .then(() => {
        setPresidents(
          presidents.filter((president) => president.id !== selectedPresidentId)
        );
        setShowDeleteModal(false);
        toast.success("President deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting President:", error);
        toast.error("Failed to delete president.");
      });
  };

  // Handle edit button click, populate the modal
  const handleEditClick = (id) => {
    const presidentToEdit = presidents.find((president) => president.id === id);
    setEditData(presidentToEdit);
    setSelectedPresidentId(id);
    setShowEditModal(true);
    setImageFile(null);
  };

  // Handle edit form submission
  // Handle edit form submission
  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const formattedStartDate = editData.start_date
      ? formatDate(editData.start_date)
      : "";
    const formattedEndDate = editData.end_date
      ? formatDate(editData.end_date)
      : "";

    const formData = new FormData();
    formData.append("president_name", editData.president_name);
    formData.append("start_date", formattedStartDate);
    formData.append("end_date", formattedEndDate);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      await api.put(
        `/presidents/${selectedPresidentId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("President updated successfully!");
      fetchPresidents(); // Refetch the officers to update the list
    } catch (error) {
      toast.error("Failed to update president.");
    } finally {
      setShowEditModal(false);
    }
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Handle form changes for edit modal
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    // Show a preview of the image
    if (file) {
      setEditData((prevData) => ({
        ...prevData,
        image_path: URL.createObjectURL(file), // Use this for preview
      }));
    }
  };

  return (
    <div>
      <div className="page-wrapper">
        <div className="content">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="#.">About KBMC</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Previous President's
              </li>
            </ol>
          </nav>

          <div className="row">
            <div className="col-lg-12">
              <div className="card-box">
                <div className="card-block">
                  <div className="row mb-3">
                    <div className="col-sm-4 col-3">
                      <h4 className="page-title">Previous President's</h4>
                    </div>
                    <div className="col-sm-8 col-9 text-end m-b-20">
                      <a
                        href="/Add_PreviousPresident"
                        className="btn btn-primary btn-rounded float-right "
                        style={{ borderRadius: "100px" }}
                      >
                        <i className="fa fa-plus"></i> + Add President
                      </a>
                    </div>
                  </div>

                  {/* Table Section */}
                  <div className="table-responsive">
                    <table className="table table-bordered m-b-0">
                      <thead>
                        <tr>
                          <th width="10%">Sr. No.</th>
                          <th>President Name</th>
                          <th>Start Date</th>
                          <th>End Date</th>
                          <th>Image</th>
                          <th width="15%">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {presidents.map((president, index) => (
                          <tr key={president.id}>
                            {/* Dynamically incrementing index */}
                            <td>{index + 1}</td>
                            <td>{president.president_name}</td>
                            <td>
                              {new Date(president.start_date)
                                .toLocaleDateString("en-GB")
                                .replace(/\//g, "-")}
                            </td>
                            <td>
                              {new Date(president.end_date)
                                .toLocaleDateString("en-GB")
                                .replace(/\//g, "-")}
                            </td>
                            <td>
                              <a
                                href={`${baseURL}${president.image_path}`}
                                className="glightbox"
                                data-gallery="president-images"
                              >
                                <img
                                  width="50px"
                                  src={`${baseURL}${president.image_path}`}
                                  alt={`president${index + 1}`}
                                />
                              </a>
                            </td>
                            <td>
                              <button
                                className="btn btn-danger btn-sm m-t-10"
                                onClick={() => handleDeleteClick(president.id)}
                                style={{ marginRight: "10px" }} // Added spacing
                              >
                                Delete
                              </button>
                              <button
                                className="btn btn-success btn-sm m-t-10"
                                onClick={() => handleEditClick(president.id)}
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

          {/* Pagination (can be dynamic based on total items) */}
          <div>
            <ul className="pagination">
              <li className="page-item disabled">
                <a className="page-link" href="#" tabIndex="-1">
                  Previous
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  1
                </a>
              </li>
              <li className="page-item active">
                <a className="page-link" href="#">
                  2 <span className="sr-only"></span>
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  Next
                </a>
              </li>
            </ul>
          </div>

          {/* Delete Modal */}
          <Modal
            show={showDeleteModal}
            onHide={() => setShowDeleteModal(false)}
            centered
          >
            <Modal.Body>
              <h4>Are you sure you want to delete this item?</h4>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="primary"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </Button>
              <Button variant="danger" onClick={confirmDelete}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Edit Modal */}
          <Modal
            show={showEditModal}
            onHide={() => setShowEditModal(false)}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Edit President</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleEditSubmit}>
                <Form.Group>
                  <Form.Label>President Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="president_name"
                    value={editData.president_name}
                    onChange={handleFormChange}
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Start Date</Form.Label>
                  <Flatpickr
                    value={
                      editData.start_date ? new Date(editData.start_date) : ""
                    }
                    onChange={(date) =>
                      handleFormChange({
                        target: { name: "start_date", value: date[0] },
                      })
                    }
                    className="form-control"
                    options={{ dateFormat: "d-m-Y" }} // Set format as dd-mm-yyyy
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>End Date</Form.Label>
                  <Flatpickr
                    value={editData.end_date ? new Date(editData.end_date) : ""}
                    onChange={(date) =>
                      handleFormChange({
                        target: { name: "end_date", value: date[0] },
                      })
                    }
                    className="form-control"
                    options={{ dateFormat: "d-m-Y" }} // Set format as dd-mm-yyyy
                    required
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Upload Image</Form.Label>
                  <Form.Control type="file" onChange={handleImageChange} />
                </Form.Group>
                <div className="mt-3">
                  {imageFile ? (
                    <img
                      src={URL.createObjectURL(imageFile)}
                      alt="Preview"
                      width="100"
                    />
                  ) : (
                    editData.image_path && (
                      <img
                        src={`${baseURL}${editData.image_path}`}
                        alt="Current"
                        width="100"
                      />
                    )
                  )}
                </div>
                <Modal.Footer>
                  <Button
                    variant="secondary"
                    onClick={() => setShowEditModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button variant="primary" type="submit">
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Form>
            </Modal.Body>
          </Modal>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default PreviousPresidents;
