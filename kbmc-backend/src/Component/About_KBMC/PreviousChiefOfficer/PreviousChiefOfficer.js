import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import api, { baseURL } from "../../api";
import GLightbox from "glightbox";
import "glightbox/dist/css/glightbox.min.css";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const PreviousChiefOfficer = () => {
  const [officers, setOfficers] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedOfficerId, setSelectedOfficerId] = useState(null);
  const [editData, setEditData] = useState({
    officer_name: "",
    start_date: "",
    end_date: "",
    image_path: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const lightbox = GLightbox({
      selector: ".glightbox",
    });

    return () => {
      lightbox.destroy();
    };
  }, [officers]);

  // Fetch officers on component mount
  const fetchOfficers = async () => {
    try {
      const response = await api.get("/chief-officers");
      setOfficers(response.data);
    } catch (error) {
      toast.error("Failed to fetch officers.");
    }
  };

  useEffect(() => {
    fetchOfficers();
  }, []);

  // Handle delete button click
  const handleDeleteClick = (id) => {
    setSelectedOfficerId(id);
    setShowDeleteModal(true);
  };

  // Confirm delete action and call API
  // Confirm delete action and call API
  const confirmDelete = () => {
    api
      .delete(`/chief-officers/${selectedOfficerId}`)
      .then(() => {
        setOfficers(
          officers.filter((officer) => officer.id !== selectedOfficerId)
        );
        setShowDeleteModal(false);
        toast.success("Officer deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting officer:", error);
        toast.error("Failed to delete officer.");
      });
  };

  // Handle edit button click, populate the modal
  const handleEditClick = (id) => {
    const officerToEdit = officers.find((officer) => officer.id === id);
    setEditData(officerToEdit);
    setSelectedOfficerId(id);
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
    formData.append("officer_name", editData.officer_name);
    formData.append("start_date", formattedStartDate);
    formData.append("end_date", formattedEndDate);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      await api.put(`/chief-officers/${selectedOfficerId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Officer updated successfully!");
      fetchOfficers(); // Refetch the officers to update the list
    } catch (error) {
      toast.error("Failed to update officer.");
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

  const currentPageData = officers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <div className="page-wrapper">
        <div className="content">
          {/* Breadcrumb */}
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="#.">About KBMC</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Previous Chief Officers of the Council
              </li>
            </ol>
          </nav>

          <div className="row">
            <div className="col-lg-12">
              <div className="card-box">
                <div className="card-block">
                  <div className="row mb-3">
                    <div className="col-sm-4 col-3">
                      <h4 className="page-title">Previous Chief Officers</h4>
                    </div>
                    <div className="col-sm-8 col-9 text-end m-b-20">
                      <Link
                        to="/add-previous-chief-officer"
                        className="btn btn-primary btn-rounded float-right"
                        style={{ borderRadius: "100px" }}
                      >
                        <i className="fa fa-plus"></i> + Add Officer
                      </Link>
                    </div>
                  </div>

                  {/* Table Section */}
                  <div className="table-responsive">
                    <table className="table table-bordered m-b-0">
                      <thead>
                        <tr>
                          <th width="10%">Sr. No.</th>
                          <th>Officer Name</th>
                          <th>Start Date</th>
                          <th>End Date</th>
                          <th>Image</th>
                          <th width="15%">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentPageData.length > 0 ? (
                          currentPageData.map((officer, index) => (
                            <tr key={officer.id}>
                              <td>
                                {(currentPage - 1) * itemsPerPage + index + 1}
                              </td>
                              <td>{officer.officer_name}</td>
                              <td>
                                {new Date(officer.start_date)
                                  .toLocaleDateString("en-GB")
                                  .replace(/\//g, "-")}
                              </td>
                              <td>
                                {new Date(officer.end_date)
                                  .toLocaleDateString("en-GB")
                                  .replace(/\//g, "-")}
                              </td>
                              <td>
                                <Link
                                  to={`${baseURL}${officer.image_path}`}
                                  className="glightbox"
                                  data-gallery="chief-images"
                                >
                                  <img
                                    width="50px"
                                    src={`${baseURL}${officer.image_path}`}
                                    alt={`chief${index + 1}`}
                                  />
                                </Link>
                              </td>
                              <td>
                                <button
                                  className="btn btn-danger btn-sm m-t-10"
                                  onClick={() => handleDeleteClick(officer.id)}
                                  style={{ marginRight: "10px" }}
                                >
                                  Delete
                                </button>
                                <button
                                  className="btn btn-success btn-sm m-t-10"
                                  onClick={() => handleEditClick(officer.id)}
                                >
                                  Edit
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="6" style={{ textAlign: "center" }}>
                              No officer available
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pagination */}
          <div className="mt-4">
            <ul className="pagination">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Previous
                </button>
              </li>
              {Array.from(
                { length: Math.ceil(officers.length / itemsPerPage) },
                (_, i) => (
                  <li
                    className={`page-item ${
                      currentPage === i + 1 ? "active" : ""
                    }`}
                    key={i}
                  >
                    <button
                      className="page-link"
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  </li>
                )
              )}
              <li
                className={`page-item ${
                  currentPage === Math.ceil(officers.length / itemsPerPage)
                    ? "disabled"
                    : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next
                </button>
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
              <Modal.Title>Edit Officer</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleEditSubmit}>
                <Form.Group>
                  <Form.Label>Officer Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="officer_name"
                    value={editData.officer_name}
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

export default PreviousChiefOfficer;
