// src/components/HistoryPage.js

import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import api, { baseURL } from '../../api';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GLightbox from "glightbox";
import "glightbox/dist/css/glightbox.min.css";

const HistoryPage = () => {
  const [historyData, setHistoryData] = useState([]);
  const [coData, setCoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [editData, setEditData] = useState({});
  const [imagePreview, setImagePreview] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchHistoryData();
    fetchCoData();
  }, []);

  useEffect(() => {
    const lightbox = GLightbox({
      selector: ".glightbox",
    });
    return () => {
      lightbox.destroy();
    };
  }, [coData]);

  const fetchHistoryData = async () => {
    try {
      const response = await api.get("/history");
      setHistoryData(response.data);
    } catch (error) {
      toast.error("Failed to fetch history data.");
    }
  };

  const fetchCoData = async () => {
    try {
      const response = await api.get("/ceos");
      setCoData(response.data);
    } catch (error) {
      toast.error("Failed to fetch CO data.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, type) => {
    try {
      if (type === "history") {
        await api.delete(`/history/${id}`);
        setHistoryData((prevData) => prevData.filter((item) => item.id !== id));
      } else if (type === "co") {
        await api.delete(`/ceos/${id}`);
        setCoData((prevData) => prevData.filter((item) => item.id !== id));
      }
      toast.success(
        `${type === "history" ? "History" : "CO"} entry deleted successfully.`
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
      type === "history" ? { description: item.description } : { ...item }
    );
    setImagePreview(
      type === "co" ? `${baseURL}${item.image_path}` : ""
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
      if (modalType === "history") {
        await api.put(
          `/history/${selectedItem.id}`,
          { description: editData.description }
        );
        setHistoryData(
          historyData.map((item) =>
            item.id === selectedItem.id
              ? { ...item, description: editData.description }
              : item
          )
        );
        fetchHistoryData();
      } else if (modalType === "co") {
        const formData = new FormData();
        formData.append("coName", editData.coName);
        formData.append("designation", editData.designation);
        formData.append("email", editData.email);

        // Append the selected image file directly if it's present
        if (editData.imageFile) {
          formData.append("coImage", editData.imageFile);
        }

        await api.put(
          `/ceos/${selectedItem.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setCoData(
          coData.map((item) =>
            item.id === selectedItem.id ? { ...item, ...editData } : item
          )
        ); 
        fetchCoData();
      }
      toast.success(
        `${
          modalType === "history" ? "History" : "CO"
        } entry updated successfully.`
      );
      navigate("/History");
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

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="#.">Home</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                History and Chief Officer
              </li>
            </ol>
          </nav>

          {loading ? (
            <div>Loading...</div>
          ) : (
            <div className="row">
              <div className="col-lg-12">
                <div className="card-box">
                  <div className="card-block">
                    <div className="row">
                      <div className="col-sm-4 col-3">
                        <h4 className="page-title">History</h4>
                      </div>
                      <div className="col-sm-8 col-9 text-end mb-3">
                        <Link
                          to="/Add_history"
                          className="btn btn-primary btn-rounded float-right"
                          style={{ borderRadius: "100px" }}
                        >
                          <i className="fa fa-plus"></i> + Add History
                        </Link>
                      </div>
                    </div>

                    <div className="table-responsive">
                      <table className="table table-bordered m-b-0">
                        <thead>
                          <tr>
                            <th width="10%">Sr. No.</th>
                            <th>Description</th>
                            <th width="15%">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {historyData.length > 0 ? (
                            historyData.map((item, index) => (
                              <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.description}</td>
                                <td>
                                  <button
                                    onClick={() =>
                                      openEditModal(item, "history")
                                    }
                                    className="btn btn-success btn-sm m-t-10 mx-1"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => {
                                      setSelectedItem(item);
                                      setModalType("history"); // Set the type to "co"
                                      setShowDeleteModal(true);
                                    }}
                                    className="btn btn-danger btn-sm m-t-10"
                                  >
                                    Delete
                                  </button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="3">No History Data Available</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>

                    {/* Chief Officer Table */}
                    <div className="row mt-4">
                      <div className="col-sm-4 col-3">
                        <h4 className="page-title">Chief Officer</h4>
                      </div>
                      <div className="col-sm-8 col-9 text-end mb-3">
                        <Link
                          to="/Add_ceo"
                          className="btn btn-primary btn-rounded float-right"
                          style={{ borderRadius: "100px" }}
                        >
                          <i className="fa fa-plus"></i> + Add Chief Officer
                        </Link>
                      </div>
                    </div>

                    <div className="table-responsive m-t-10">
                      <table className="table table-bordered m-b-0">
                        <thead>
                          <tr>
                            <th width="10%">Sr. No.</th>
                            <th>CO Image</th>
                            <th>CO Name</th>
                            <th>Designation</th>
                            <th>Mail Id</th>
                            <th width="15%">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {coData.length > 0 ? (
                            coData.map((item, index) => (
                              <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>
                                  <a
                                    className="glightbox"
                                    href={`${baseURL}${item.image_path}`}
                                  >
                                    <img
                                      src={`${baseURL}${item.image_path}`}
                                      alt={item.coName}
                                      style={{
                                        width: "50px",
                                        height: "50px",
                                        borderRadius: "50%",
                                      }}
                                    />
                                  </a>
                                </td>
                                <td>{item.coName}</td>
                                <td>{item.designation}</td>
                                <td>{item.email}</td>
                                <td>
                                  <button
                                    onClick={() => openEditModal(item, "co")}
                                    className="btn btn-success btn-sm m-t-10 mx-1"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => {
                                      setSelectedItem(item);
                                      setModalType("co"); // Set the type to "co"
                                      setShowDeleteModal(true);
                                    }}
                                    className="btn btn-danger btn-sm m-t-10"
                                  >
                                    Delete
                                  </button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="6">
                                No Chief Officer Data Available
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
          )}

          {/* Edit Modal */}
          <Modal show={showEditModal} onHide={closeModal}>
            <Modal.Header closeButton>
              <Modal.Title>
                {modalType === "history"
                  ? "Edit History"
                  : "Edit Chief Officer"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {modalType === "history" ? (
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    className="form-control"
                    id="description"
                    value={editData.description}
                    onChange={(e) =>
                      setEditData({ ...editData, description: e.target.value })
                    }
                  />
                </div>
              ) : (
                <>
                  <div className="form-group">
                    <label htmlFor="coName">CO Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="coName"
                      value={editData.coName}
                      onChange={(e) =>
                        setEditData({ ...editData, coName: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="designation">Designation</label>
                    <input
                      type="text"
                      className="form-control"
                      id="designation"
                      value={editData.designation}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          designation: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Mail Id</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={editData.email}
                      onChange={(e) =>
                        setEditData({ ...editData, email: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="coImage">CO Image</label>
                    <input
                      type="file"
                      className="form-control"
                      id="coImage"
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
    </>
  );
};

export default HistoryPage;
