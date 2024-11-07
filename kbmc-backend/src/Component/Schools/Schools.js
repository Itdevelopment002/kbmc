import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import api, { baseURL } from "../api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaTrash, FaEdit } from "react-icons/fa";
import GLightbox from "glightbox";
import "glightbox/dist/css/glightbox.min.css";

const School = () => {
  const [schoolData, setSchoolData] = useState([]);
  const [schoolImageData, setSchoolImageData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [editData, setEditData] = useState({});
  const [imagePreview, setImagePreview] = useState("");
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    fetchSchoolData();
    fetchSchoolImageData();
  }, []);

  useEffect(() => {
    const lightbox = GLightbox({
      selector: ".glightbox",
    });
    return () => {
      lightbox.destroy();
    };
  }, [schoolImageData]);

  const fetchSchoolData = async () => {
    try {
      const response = await api.get("/schools");
      setSchoolData(response.data);
    } catch (error) {
      toast.error("Failed to fetch school data.");
    }
  };

  const fetchSchoolImageData = async () => {
    try {
      const response = await api.get(
        "/school-images"
      );
      setSchoolImageData(response.data);
    } catch (error) {
      toast.error("Failed to fetch school image data.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, type) => {
    try {
      if (type === "school") {
        await api.delete(`/schools/${id}`);
        setSchoolData((prevData) => prevData.filter((item) => item.id !== id));
      } else if (type === "school-image") {
        await api.delete(`/school-images/${id}`);
        setSchoolImageData((prevData) =>
          prevData.filter((item) => item.id !== id)
        );
      }
      toast.success(
        `${
          type === "school" ? "School" : "School image"
        } entry deleted successfully.`
      );
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete the entry.");
    }
    closeModal();
  };

  const openEditModal = (item, type) => {
    setSelectedItem(item);
    setEditData(
      type === "school"
        ? {
            heading: item.heading,
            schoolName: item.schoolName,
            address: item.address,
            medium: item.medium,
          }
        : { ...item }
    );
    setImagePreview(
      type === "school-image" ? `${baseURL}${item.image_path}` : ""
    ); // Updated for proper preview
    setModalType(type);
    setShowEditModal(true);
  };

  const closeModal = () => {
    setShowEditModal(false);
    setShowDeleteModal(false);
    setSelectedItem(null);
    setEditData({});
    setImagePreview("");
  };

  const handleSaveChanges = async () => {
    try {
      if (modalType === "school") {
        await api.put(
          `/schools/${selectedItem.id}`,
          {
            heading: editData.heading,
            schoolName: editData.schoolName,
            address: editData.address,
            medium: editData.medium,
          }
        );
        setSchoolData(
          schoolData.map((item) =>
            item.id === selectedItem.id
              ? {
                  ...item,
                  heading: editData.heading,
                  schoolName: editData.schoolName,
                  address: editData.address,
                  mnedium: editData.medium,
                }
              : item
          )
        );
        fetchSchoolData();
      } else if (modalType === "school-image") {
        const formData = new FormData();
        if (editData.imageFile) {
          formData.append("schoolImage", editData.imageFile);
        }

        await api.put(
          `/school-images/${selectedItem.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setSchoolImageData(
          schoolImageData.map((item) =>
            item.id === selectedItem.id ? { ...item, ...editData } : item
          )
        ); // Update CO data locally
        fetchSchoolImageData();
      }
      toast.success(
        `${
          modalType === "school" ? "School" : "School image"
        } entry updated successfully.`
      );
      navigate("/schools");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update the entry.");
    }
    closeModal();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setEditData({ ...editData, imageFile: file }); // Store the file in editData
      };
      reader.readAsDataURL(file);
    }
  };

  const currentPageData = schoolImageData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="page-wrapper">
      <div className="content">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="#.">City Profile</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Schools
            </li>
          </ol>
        </nav>

        {/* School Table Section */}
        <div className="row">
          <div className="col-lg-12">
            <div className="card-box">
              <div className="card-block">
                <div className="row">
                  <div className="col-sm-4 col-3">
                    <h4 className="page-title">Schools</h4>
                  </div>
                  <div className="col-sm-8 text-end m-b-20">
                    <Link
                      to="/add-schools"
                      className="btn btn-primary btn-rounded float-right mb-2"
                      style={{ borderRadius: "100px" }}
                    >
                      <i className="fa fa-plus"></i> + Add Schools
                    </Link>
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="table table-bordered m-b-0">
                    <thead>
                      <tr>
                        <th width="10%">Sr. No.</th>
                        <th>School Name</th>
                        <th>Address</th>
                        <th>Medium</th>
                        <th width="15%">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {schoolData.map((item, index) => (
                        <tr key={item.id}>
                          <td>{index + 1}</td>
                          <td>{item.schoolName}</td>
                          <td>{item.address}</td>
                          <td>{item.medium}</td>
                          <td>
                            <button
                              onClick={() => {
                                setSelectedItem(item);
                                setModalType("school"); // Set the type to "co"
                                setShowDeleteModal(true);
                              }}
                              className="btn btn-danger btn-sm m-t-10"
                            >
                              Delete
                            </button>
                            <button
                              onClick={() => openEditModal(item, "school")}
                              className="btn btn-success btn-sm m-t-10 mx-2"
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

              {/* School Photos Section */}
              <div className="card-block mt-5">
                <div className="row">
                  <div className="col-sm-4 col-3">
                    <h4 className="page-title">School Photos</h4>
                  </div>
                  <div className="col-sm-8 col-9 text-end m-b-20">
                    <Link to="/add-school-images"
                      className="btn btn-primary btn-rounded float-right mb-3"
                      style={{ borderRadius: "100px" }}
                    >
                      <i className="fa fa-plus"></i>+ Add Photos
                    </Link>
                  </div>
                </div>

                <div className="row">
                {currentPageData.length > 0 ? (
                          currentPageData.map((item, index) => (
                    <div
                      key={index}
                      className="col-sm-2 col-4 text-center"
                      style={{
                        padding: "15px", // Adjusted padding for spacing
                      }}
                    >
                      <div
                        style={{
                          border: "1px solid #ddd", // Border around each photo
                          borderRadius: "5px", // Rounded corners
                          padding: "10px", // Padding inside the border
                          textAlign: "center", // Center align text
                        }}
                      >
                        <Link
                          className="glightbox"
                          to={`${baseURL}${item.image_path}`}
                        >
                          <img
                            src={`${baseURL}${item.image_path}`}
                            alt="school-image"
                            width="120px"
                            height="60px"
                          />
                        </Link>

                        <br />
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop: "10px",
                          }}
                        >
                          <button
                            onClick={() => {
                              setSelectedItem(item);
                              setModalType("school-image"); // Set the type to "co"
                              setShowDeleteModal(true);
                            }}
                            className="btn btn-danger btn-sm"
                          >
                            <FaTrash />
                          </button>
                          <button
                            onClick={() => openEditModal(item, "school-image")}
                            className="btn btn-success btn-sm mx-1"
                          >
                            <FaEdit />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>
                      No school images available
                  </div>
                )}
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
                { length: Math.ceil(schoolImageData.length / itemsPerPage) },
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
                  currentPage === Math.ceil(schoolImageData.length / itemsPerPage)
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

        {/* Edit Modal */}
        <Modal show={showEditModal} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              {modalType === "school" ? "Edit School" : "Edit School Image"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {modalType === "school" ? (
              <>
                <div className="form-group">
                  <label htmlFor="heading">Heading</label>
                  <textarea
                    className="form-control"
                    id="heading"
                    value={editData.heading}
                    onChange={(e) =>
                      setEditData({ ...editData, heading: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="schoolName">School Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="schoolName"
                    value={editData.schoolName}
                    onChange={(e) =>
                      setEditData({ ...editData, schoolName: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <textarea
                    className="form-control"
                    id="address"
                    value={editData.address}
                    onChange={(e) =>
                      setEditData({ ...editData, address: e.target.value })
                    }
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="medium">Medium</label>
                  <select
                    className="form-control"
                    id="medium"
                    value={editData.medium}
                    onChange={(e) =>
                      setEditData({ ...editData, medium: e.target.value })
                    }
                  >
                    <option value="">Select Medium</option>
                    <option value="Marathi">Marathi</option>
                    <option value="Urdu">Urdu</option>
                    <option value="English">English</option>
                    <option value="Semi English">Semi English</option>
                  </select>
                </div>
              </>
            ) : (
              <>
                <div className="form-group">
                  <label htmlFor="schoolImage">School Image</label>
                  <input
                    type="file"
                    className="form-control"
                    id="schoolImage"
                    onChange={handleImageChange}
                  />
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      style={{
                        width: "100px",
                        height: "100px",
                        marginTop: "10px",
                      }}
                    />
                  )}
                </div>
              </>
            )}
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSaveChanges}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>

        {/* Delete Modal */}
        <Modal show={showDeleteModal} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this entry?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => handleDelete(selectedItem.id, modalType)}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default School;
