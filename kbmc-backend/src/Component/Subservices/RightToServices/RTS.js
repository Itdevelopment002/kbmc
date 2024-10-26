// src/components/HistoryPage.js

import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GLightbox from "glightbox";
import "glightbox/dist/css/glightbox.min.css";
import { FaFilePdf } from "react-icons/fa";

const HistoryPage = () => {
  const [rtsData, setRtsData] = useState([]);
  const [pdfData, setPdfData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [editData, setEditData] = useState({});
  const [pdfPreview, setPdfPreview] = useState(""); // For PDF preview link
  const navigate = useNavigate();

  useEffect(() => {
    fetchRtsData();
    fetchPdfData();
  }, []);

  useEffect(() => {
    const lightbox = GLightbox({
      selector: ".glightbox",
    });
    return () => {
      lightbox.destroy();
    };
  }, [pdfData]);

  const fetchRtsData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/righttoservices"
      );
      setRtsData(response.data);
    } catch (error) {
      toast.error("Failed to fetch rts data.");
    }
  };

  const fetchPdfData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/rts_table");
      setPdfData(response.data);
    } catch (error) {
      toast.error("Failed to fetch Pdf data.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, type) => {
    try {
      if (type === "rts") {
        await axios.delete(`http://localhost:5000/api/righttoservices/${id}`);
        setRtsData((prevData) => prevData.filter((item) => item.id !== id));
      } else if (type === "pdf") {
        await axios.delete(`http://localhost:5000/api/rts_table/${id}`);
        setPdfData((prevData) => prevData.filter((item) => item.id !== id));
      }
      toast.success(
        `${type === "rts" ? "RTS" : "PDF"} entry deleted successfully.`
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
      type === "rts"
        ? { heading: item.heading, description: item.description }
        : { ...item }
    );
    setPdfPreview(
      type === "pdf" && item.pdf_path
        ? `http://localhost:5000/${item.pdf_path}`
        : ""
    );
    setModalType(type);
    setShowEditModal(true);
  };

  const closeModal = () => {
    setShowEditModal(false);
    setShowDeleteModal(false);
    setSelectedItem(null);
    setEditData({});
    setPdfPreview("");
  };

  const handleSaveChanges = async () => {
    try {
      if (modalType === "rts") {
        await axios.put(
          `http://localhost:5000/api/righttoservices/${selectedItem.id}`,
          { heading: editData.heading, description: editData.description }
        );
        fetchRtsData();
      } else if (modalType === "pdf") {
        const formData = new FormData();
        formData.append("description", editData.description);

        // Only append the file if a new one is selected
        if (editData.pdfFile) {
          formData.append("userfile", editData.pdfFile);
        }

        await axios.put(
          `http://localhost:5000/api/rts_table/${selectedItem.id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        fetchPdfData();
      }

      toast.success(
        `${modalType === "rts" ? "RTS" : "PDF"} entry updated successfully.`
      );
      navigate("/rts");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update the entry.");
    }
    closeModal();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPdfPreview(URL.createObjectURL(file)); // Set URL for preview/download
      setEditData({ ...editData, pdfFile: file }); // Store the file in editData
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
                        <h4 className="page-title">Right to Service</h4>
                      </div>
                      <div className="col-sm-8 col-9 text-end mb-3">
                        <Link
                          to="/Add_RTSDES"
                          className="btn btn-primary btn-rounded float-right"
                          style={{ borderRadius: "100px" }}
                        >
                          <i className="fa fa-plus"></i>+ Add RTS
                        </Link>
                      </div>
                    </div>

                    <div className="table-responsive">
                      <table className="table table-bordered m-b-0">
                        <thead>
                          <tr>
                            <th width="5%">Sr. No.</th>
                            <th>Heading</th>
                            <th>Description</th>
                            <th width="15%">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {rtsData.length > 0 ? (
                            rtsData.map((item, index) => (
                              <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.heading}</td>
                                <td>{item.description}</td>
                                <td>
                                  <button
                                    onClick={() => openEditModal(item, "rts")}
                                    className="btn btn-success btn-sm m-t-10 mx-1"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => {
                                      setSelectedItem(item);
                                      setModalType("rts"); // Set the type to "co"
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
                              <td colSpan="3">No Rts Data Available</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>

                    {/* Chief Officer Table */}
                    <div className="row mt-4">
                      <div className="col-sm-4 col-3">
                        <h4 className="page-title">Right to Service PDF</h4>
                      </div>
                      <div className="col-sm-8 col-9 text-end mb-3">
                        <Link
                          to="/Add_RTS"
                          className="btn btn-primary btn-rounded float-right"
                          style={{ borderRadius: "100px" }}
                        >
                          <FaFilePdf /> Upload PDF
                        </Link>
                      </div>
                    </div>

                    <div className="table-responsive m-t-10">
                      <table className="table table-bordered m-b-0">
                        <thead>
                          <tr>
                            <th width="5%">Sr. No.</th>
                            <th>PDF Description</th>
                            <th>Uploaded PDF</th>
                            <th width="15%">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {pdfData.length > 0 ? (
                            pdfData.map((item, index) => (
                              <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td>{item.description}</td>
                                <td style={{ textAlign: "center" }}>
                                  <a
                                    href={`http://localhost:5000/${item.pdf_path}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <FaFilePdf
                                      size={24}
                                      style={{ color: "red" }}
                                    />
                                  </a>
                                </td>
                                <td>
                                  <button
                                    onClick={() => openEditModal(item, "pdf")}
                                    className="btn btn-success btn-sm m-t-10 mx-1"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => {
                                      setSelectedItem(item);
                                      setModalType("pdf"); // Set the type to "co"
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
                              <td colSpan="6">No Pdf Data Available</td>
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
                {modalType === "rts" ? "Edit Rts" : "Edit Pdf"}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {modalType === "rts" ? (
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
                    <label htmlFor="description">Pdf Description</label>
                    <input
                      type="text"
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
                  <div className="form-group">
                    <label htmlFor="pdf">Upload PDF</label>
                    <input
                      type="file"
                      className="form-control"
                      id="pdf"
                      accept="application/pdf"
                      onChange={handleFileChange}
                    />
                    {pdfPreview && (
                      <a
                        href={pdfPreview}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ display: "block", marginTop: "10px" }}
                      >
                        Preview PDF
                      </a>
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
