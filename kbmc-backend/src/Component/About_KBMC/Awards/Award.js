import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GLightbox from "glightbox";
import "glightbox/dist/css/glightbox.min.css";
import api, { baseURL } from "../../api";

const Award = () => {
  const [awardData, setAwardData] = useState([]);
  const [awardImageData, setAwardImageData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [editData, setEditData] = useState({});
  const [imagePreview, setImagePreview] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchAwardData();
    fetchAwardImageData();
  }, []);

  useEffect(() => {
    const lightbox = GLightbox({
      selector: ".glightbox",
    });
    return () => {
      lightbox.destroy();
    };
  }, [awardImageData]);

  const fetchAwardData = async () => {
    try {
      const response = await api.get("/awards");
      setAwardData(response.data);
    } catch (error) {
      toast.error("Failed to fetch award data.");
    }
  };

  const fetchAwardImageData = async () => {
    try {
      const response = await api.get(
        "/award-images"
      );
      setAwardImageData(response.data);
    } catch (error) {
      toast.error("Failed to fetch Award Images.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, type) => {
    try {
      if (type === "award") {
        await api.delete(`/awards/${id}`);
        setAwardData((prevData) => prevData.filter((item) => item.id !== id));
      } else if (type === "awardImage") {
        await api.delete(`/award-images/${id}`);
        setAwardImageData((prevData) =>
          prevData.filter((item) => item.id !== id)
        );
      }
      toast.success(
        `${
          type === "award" ? "Award" : "Award image"
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
      type === "award"
        ? { heading: item.heading, description: item.description }
        : { ...item }
    );
    setImagePreview(
      type === "awardImage" ? `${baseURL}${item.image_path}` : ""
    );
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
      if (modalType === "award") {
        await api.put(`/awards/${selectedItem.id}`, {
          heading: editData.heading,
          description: editData.description,
        });
        setAwardData(
          awardData.map((item) =>
            item.id === selectedItem.id
              ? {
                  ...item,
                  heading: editData.heading,
                  description: editData.description,
                }
              : item
          )
        );
        fetchAwardData();
      } else if (modalType === "awardImage") {
        const formData = new FormData();
        if (editData.imageFile) {
          formData.append("awardImage", editData.imageFile);
        }

        await api.put(
          `/award-images/${selectedItem.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setAwardImageData(
          awardImageData.map((item) =>
            item.id === selectedItem.id ? { ...item, ...editData } : item
          )
        ); 
        fetchAwardImageData();
      }
      toast.success(
        `${
          modalType === "award" ? "Award" : "Award image"
        } entry updated successfully.`
      );
      navigate("/Award");
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
                Awards
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
                        <h4 className="page-title">Awards</h4>
                      </div>
                      <div className="col-sm-8 col-9 text-end mb-3">
                        <Link
                          to="/Add_award"
                          className="btn btn-primary btn-rounded float-right"
                          style={{ borderRadius: "100px" }}
                        >
                          <i className="fa fa-plus"></i> + Add Award
                        </Link>
                      </div>
                    </div>

                    <div className="table-responsive">
                      <table className="table table-bordered m-b-0">
                        <thead>
                          <tr>
                            <th width="10%">Sr. No.</th>
                            <th>Heading</th>
                            <th>Description</th>
                            <th width="15%">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {awardData.length > 0 ? (
                            awardData.map((item, index) => (
                              <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.heading}</td>
                                <td>{item.description}</td>
                                <td>
                                  <button
                                    onClick={() => openEditModal(item, "award")}
                                    className="btn btn-success btn-sm m-t-10 mx-1"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => {
                                      setSelectedItem(item);
                                      setModalType("award"); // Set the type to "co"
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
                              <td colSpan="3">No Award Data Available</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>

                    {/* Chief Officer Table */}
                    <div className="row mt-4">
                      <div className="col-sm-4 col-3">
                        <h4 className="page-title">Award Images</h4>
                      </div>
                      <div className="col-sm-8 col-9 text-end mb-3">
                        <Link
                          to="/add-award-images"
                          className="btn btn-primary btn-rounded float-right"
                          style={{ borderRadius: "100px" }}
                        >
                          <i className="fa fa-plus"></i> + Add Award Images
                        </Link>
                      </div>
                    </div>

                    <div className="table-responsive m-t-10">
                      <table className="table table-bordered m-b-0">
                        <thead>
                          <tr>
                            <th width="10%">Sr. No.</th>
                            <th>Award Image</th>
                            <th width="15%">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {awardImageData.length > 0 ? (
                            awardImageData.map((item, index) => (
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
                                        width: "100px",
                                      }}
                                    />
                                  </a>
                                </td>
                                <td>
                                  <button
                                    onClick={() =>
                                      openEditModal(item, "awardImage")
                                    }
                                    className="btn btn-success btn-sm m-t-10 mx-1"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => {
                                      setSelectedItem(item);
                                      setModalType("awardImage"); // Set the type to "co"
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
                              <td colSpan="6">No Award image Data Available</td>
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
                {modalType === "award" ? "Edit Award" : "Edit Award Image"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {modalType === "award" ? (
                <>
                  <div className="form-group">
                    <label htmlFor="heading">Heading</label>
                    <input
                      type="text"
                      className="form-control"
                      id="heading"
                      value={editData.heading}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          heading: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                      className="form-control"
                      id="description"
                      value={editData.description}
                      onChange={(e) =>
                        setEditData({
                          ...editData,
                          description: e.target.value,
                        })
                      }
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="form-group">
                    <label htmlFor="awardImage">Award Image</label>
                    <input
                      type="file"
                      className="form-control"
                      id="awardImage"
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

export default Award;
