import React, { useEffect, useState } from "react";
import { Modal, Button, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api";

const Functions = () => {
  const [functionsData, setFunctionsData] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedFunction, setSelectedFunction] = useState(null);
  const navigate = useNavigate(); 
  const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

  useEffect(() => {
    fetchFunctions();
  }, []);

  const fetchFunctions = async () => {
    try {
      const response = await api.get("/functions");
      setFunctionsData(response.data);
    } catch (error) {
      console.error("Error fetching functions:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/functions/${selectedFunction.id}`);
      setFunctionsData(
        functionsData.filter((func) => func.id !== selectedFunction.id)
      );
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting function:", error);
    }
  };

  const handleEditSave = async () => {
    try {
      await api.put(
        `/functions/${selectedFunction.id}`,
        {
          heading: selectedFunction.heading,
          description: selectedFunction.description,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const updatedFunctions = functionsData.map((func) =>
        func.id === selectedFunction.id ? selectedFunction : func
      );
      setFunctionsData(updatedFunctions);
      setShowEditModal(false);
    } catch (error) {
      console.error("Error updating function:", error);
    }
  };

  const handleEditClick = (func) => {
    setSelectedFunction({ ...func });
    setShowEditModal(true);
  };

  const handleDeleteClick = (func) => {
    setSelectedFunction(func);
    setShowDeleteModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setSelectedFunction({ ...selectedFunction, [name]: value });
  };

  // After adding a function, navigate back to Functions page
  const handleAddFunction = () => {
    navigate("/add-function"); // Updated to use navigate
  };

  const currentPageData = functionsData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="page-wrapper">
      <div className="content">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="#.">About KBMC</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Functions
            </li>
          </ol>
        </nav>
        <div className="row">
          <div className="col-lg-12">
            <div className="card-box">
              <div className="card-block">
                <div className="row mb-4">
                  <div className="col-sm-4 col-3">
                    <h4 className="page-title">Functions</h4>
                  </div>
                  <div className="col-sm-8 col-9 text-end">
                    <Button
                      className="btn btn-primary btn-rounded float-right"
                      style={{ borderRadius: "100px", marginBottom: "20px" }}
                      onClick={handleAddFunction}
                    >
                      <i className="fa fa-plus"></i> + Add New Function
                    </Button>
                  </div>
                </div>
                <div className="table-responsive mt-50">
                  <Table bordered>
                    <thead>
                      <tr>
                        <th width="5%">Sr. No.</th>
                        <th width="30%">Heading</th>
                        <th width="30%">Description</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                    {currentPageData.length > 0 ? (
                          currentPageData.map((func, index) => (
                          <tr key={func.id}>
                            <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                            <td>{func.heading}</td>
                            <td>{func.description}</td>
                            <td width="10%">
                              <Button
                                variant="success"
                                size="sm"
                                onClick={() => handleEditClick(func)}
                              >
                                Edit
                              </Button>{" "}
                              <Button
                                variant="danger"
                                size="sm"
                                onClick={() => handleDeleteClick(func)}
                              >
                                Delete
                              </Button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="4" className="text-center">
                            No functions available.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="mt-4">
          <ul className="pagination">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className="page-link"
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous
              </button>
            </li>
            {Array.from(
              { length: Math.ceil(functionsData.length / itemsPerPage) },
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
                currentPage === Math.ceil(functionsData.length / itemsPerPage)
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
          <Modal.Footer className="d-flex justify-content-center">
            <Button
              variant="secondary"
              onClick={() => setShowDeleteModal(false)}
            >
              Close
            </Button>
            <Button variant="danger" onClick={handleDelete}>
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
            <Modal.Title>Edit Function</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedFunction && (
              <>
                <div className="form-group">
                  <label>Heading</label>
                  <input
                    type="text"
                    name="heading"
                    value={selectedFunction.heading}
                    onChange={handleEditChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    name="description"
                    value={selectedFunction.description}
                    onChange={handleEditChange}
                    className="form-control"
                    rows="5"
                  />
                </div>
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleEditSave}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Functions;
