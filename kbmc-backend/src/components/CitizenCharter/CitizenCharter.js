import React, { useState, useEffect } from "react";
import { FaFilePdf } from "react-icons/fa"; // Importing icons
import api, { baseURL } from "../api"; // Make sure to install api
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const CitizenCharter = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [newDepartment, setNewDepartment] = useState({ name: "", pdf: null });
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const departmentsPerPage = 10;

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await api.get("/citizen-charter");
      setDepartments(response.data);
    } catch (error) {
      console.error("Error fetching departments:", error);
      toast.error("Error fetching department!");
    }
  };

  const indexOfLastDepartment = currentPage * departmentsPerPage;
  const indexOfFirstDepartment = indexOfLastDepartment - departmentsPerPage;
  const currentDepartments = departments.slice(
    indexOfFirstDepartment,
    indexOfLastDepartment
  );

  const totalPages = Math.ceil(departments.length / departmentsPerPage);

  // Handle page click
  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  // Handle Next button
  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle Previous button
  const handlePreviousClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleFileChange = (e) => {
    setNewDepartment({ ...newDepartment, pdf: e.target.files[0] });
  };

  const handleAddDepartment = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", newDepartment.name);
    if (newDepartment.pdf) {
      formData.append("pdf", newDepartment.pdf);
    }

    try {
      await api.post("/citizen-charter", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // Reset the form fields after successful submission
      setNewDepartment({ name: "", pdf: null });
      fetchDepartments();
      toast.success("Department added successfully!");
    } catch (error) {
      console.error("Error adding department:", error);
      toast.error("Error adding department!");
    }
  };

  const handleOpenDeleteModal = (id) => {
    setSelectedDepartmentId(id);
    setShowDeleteModal(true);
  };

  const handleDeleteDepartment = async () => {
    try {
      await api.delete(`/citizen-charter/${selectedDepartmentId}`);
      fetchDepartments(); // Refresh the list
      setShowDeleteModal(false); // Close the modal after deletion
      setNewDepartment({ name: "", pdf: null });
      toast.success("Department deleted successfully!");
    } catch (error) {
        toast.error("Error deleting department!");
    }
  };

  const handleOpenEditModal = (dept) => {
    setSelectedDepartmentId(dept.id);
    setNewDepartment({ name: dept.name, pdf: null }); // Set the selected department details
    setShowEditModal(true);
  };

  const handleEditDepartment = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", newDepartment.name);
    if (newDepartment.pdf) {
      formData.append("pdf", newDepartment.pdf);
    }

    try {
      await api.put(`/citizen-charter/${selectedDepartmentId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setShowEditModal(false);
      fetchDepartments(); // Refresh the list
      setNewDepartment({ name: "", pdf: null });
      toast.success("Department updated successfully!");
    } catch (error) {
      console.error("Error editing department:", error);
      toast.error("Error updating department!");
    }
  };

  return (
    <div>
      <div className="page-wrapper">
        <div className="content">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Citizen Charter
              </li>
            </ol>
          </nav>
          <div className="row">
            <div className="col-lg-12">
              <div className="card-box">
                <div className="card-block">
                  <div className="row">
                    <div className="col-sm-4 col-3">
                      <h4 className="page-title m-b-0">Citizen Charter</h4>
                    </div>
                  </div>
                  <hr />
                  <div className="card-block">
                    <form onSubmit={handleAddDepartment}>
                      <div className="form-group row">
                        <label className="col-form-label col-md-2">
                          Department Name <span className="text-danger">*</span>
                        </label>
                        <div className="col-md-4">
                          <input
                            className="form-control form-control-md"
                            type="text"
                            value={newDepartment.name}
                            onChange={(e) =>
                              setNewDepartment({
                                ...newDepartment,
                                name: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label className="col-form-label col-lg-2">
                          Upload PDF <span className="text-danger">*</span>
                        </label>
                        <div className="col-md-4">
                          <div className="input-group">
                            <input
                              type="file"
                              accept=".pdf"
                              onChange={handleFileChange}
                              className="form-control form-control-md"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="form-group row">
                        <div className="col-md-2">
                          <input
                            type="submit"
                            className="btn btn-primary btn-sm"
                            value="Submit"
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="table-responsive">
                    <table className="table table-bordered m-b-0">
                      <thead>
                        <tr>
                          <th width="10%">Sr. No.</th>
                          <th>Department Name</th>
                          <th>Uploaded PDF</th>
                          <th width="20%">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentDepartments.map((dept, index) => (
                          <tr key={dept.id}>
                            <td>{indexOfFirstDepartment + index + 1}</td>
                            <td>{dept.name}</td>
                            <td>
                              <Link
                                to={`${baseURL}/${dept.pdf}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <FaFilePdf size={35} color="red" />
                              </Link>
                            </td>
                            <td>
                              <button
                                className="btn btn-success btn-sm m-t-10"
                                onClick={() => handleOpenEditModal(dept)}
                              >
                                Edit
                              </button>
                              <button
                                className="btn btn-danger btn-sm m-t-10"
                                onClick={() => handleOpenDeleteModal(dept.id)}
                              >
                                Delete
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

          <div className="mt-4">
            <ul className="pagination">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <Link
                  className="page-link"
                  to="#!"
                  onClick={handlePreviousClick}
                >
                  Previous
                </Link>
              </li>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <li
                    key={page}
                    className={`page-item ${
                      currentPage === page ? "active" : ""
                    }`}
                  >
                    <Link
                      className="page-link"
                      to="#!"
                      onClick={() => handlePageClick(page)}
                    >
                      {page}
                    </Link>
                  </li>
                )
              )}
              <li
                className={`page-item ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
              >
                <Link className="page-link" to="#!" onClick={handleNextClick}>
                  Next
                </Link>
              </li>
            </ul>
          </div>

          {showDeleteModal && (
            <div
              className="modal fade show"
              style={{
                display: "block",
                backgroundColor: "rgba(0,0,0,0.5)",
                overflowY: "scroll",
                scrollbarWidth: "none",
              }}
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-body">
                    Are you sure you want to delete this entry?
                  </div>
                  <div className="modal-footer">
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => setShowDeleteModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={handleDeleteDepartment}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {showEditModal && (
            <div
              className="modal fade show"
              style={{
                display: "block",
                backgroundColor: "rgba(0,0,0,0.5)",
                overflowY: "scroll",
                scrollbarWidth: "none",
              }}
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Edit Citizen Charter</h5>
                  </div>
                  <div className="modal-body">
                    <form>
                      <div className="mb-3">
                        <label className="form-label">Department Name</label>
                        <input
                          className="form-control form-control-md"
                          type="text"
                          value={newDepartment.name}
                          onChange={(e) =>
                            setNewDepartment({
                              ...newDepartment,
                              name: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Upload Pdf</label>
                        <input
                          className="form-control form-control-md"
                          type="file"
                          accept=".pdf"
                          onChange={handleFileChange}
                        />
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => setShowEditModal(false)}
                    >
                      Close
                    </button>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={handleEditDepartment}
                    >
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CitizenCharter;
