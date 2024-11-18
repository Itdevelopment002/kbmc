import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import api from "../api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddDepartmentData = () => {
  const location = useLocation();
  const state = location.state || {};
  const { id } = state;
  const [headings, setHeadings] = useState([]);
  const [deptData, setDeptData] = useState([]);
  const [newHeadings, setNewHeadings] = useState([{ heading: "", link: "" }]);
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState("");
  const [editingLink, setEditingLink] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedHeadingId, setSelectedHeadingId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchDeptData = async () => {
    try {
      const response = await api.get(`/public_disclosure`);
      const filteredData = response.data.filter(
        (item) => String(item.id) === String(id)
      );
      setDeptData(filteredData); // Set department data
    } catch (error) {
      console.error("Error fetching department data:", error);
    }
  };

  const fetchHeadings = async () => {
    try {
      if (deptData.length === 0) return; // Wait until deptData is available
      const response = await api.get("/department-datas");
      const filteredData = response.data.filter(
        (item) => item.department_name === deptData[0]?.department_name
      );
      setHeadings(filteredData);
    } catch (error) {
      console.error("Error fetching headings:", error);
    }
  };

  useEffect(() => {
    fetchDeptData(); 
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchHeadings(); 
    // eslint-disable-next-line
  }, [deptData]);

  const handleAddRow = () => {
    setNewHeadings([...newHeadings, { heading: "", link: "" }]);
  };

  const handleInputChange = (index, field, value) => {
    const updatedHeadings = [...newHeadings];
    updatedHeadings[index][field] = value;
    setNewHeadings(updatedHeadings);
  };

  const handleSaveHeadings = async () => {
    const validHeadings = newHeadings.filter(
      (h) => h.heading.trim() !== "" && h.link.trim() !== ""
    );

    if (validHeadings.length === 0) {
      toast.error("Please fill in all heading and link fields.");
      return;
    }

    try {
      for (let heading of validHeadings) {
        await api.post("/department-datas", {
          public_disclosure_id: deptData[0].id,
          department_name: deptData[0].department_name,
          department_heading: heading.heading,
          heading_link: heading.link,
        });
      }
      fetchHeadings();
      setNewHeadings([{ heading: "", link: "" }]);
      toast.success("Headings added successfully!");
    } catch (error) {
      console.error("Error saving heading:", error);
      toast.error("Error adding headings");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/department-datas/${id}`);
      fetchHeadings();
      setShowDeleteModal(false);
      toast.success("Heading deleted successfully!");
    } catch (error) {
      console.error("Error deleting heading:", error);
      toast.error("Error deleting heading!");
    }
  };

  const handleEdit = (id, title, link) => {
    setEditingId(id);
    setEditingTitle(title);
    setEditingLink(link); // Set the link to edit
    setShowEditModal(true);
  };

  const handleUpdate = async () => {
    try {
      await api.put(`/department-datas/${editingId}`, {
        department_heading: editingTitle,
        heading_link: editingLink,
      });
      fetchHeadings();
      setEditingId(null);
      setEditingTitle("");
      setEditingLink("");
      setShowEditModal(false);
      toast.success("Heading updated successfully!");
    } catch (error) {
      console.error("Error updating heading:", error);
      toast.error("Error updating heading!");
    }
  };

  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditingId(null);
    setEditingTitle("");
    setEditingLink("");
  };

  const indexOfLastHeading = currentPage * itemsPerPage;
  const indexOfFirstHeading = indexOfLastHeading - itemsPerPage;
  const currentHeadings = headings.slice(
    indexOfFirstHeading,
    indexOfLastHeading
  );

  return (
    <div>
      <div className="page-wrapper">
        <div className="content">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/public-disclosure">Public Disclosure</Link>
            </li>
            {deptData.map((dept) => (
              <li className="breadcrumb-item active" aria-current="page">
                Add {dept.department_name}
              </li>
            ))}
          </ol>
          <div className="row">
            <div className="col-lg-12">
              <div className="card-box">
                <div className="card-block">
                  {deptData.map((dept) => (
                    <h4 className="page-title">Add {dept.department_name}</h4>
                  ))}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSaveHeadings();
                    }}
                  >
                    {newHeadings.map((headingData, index) => (
                      <div className="form-group row" key={index}>
                        <label className="col-form-label col-md-2">
                          Add Heading
                        </label>
                        <div className="col-md-4">
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            value={headingData.heading}
                            onChange={(e) =>
                              handleInputChange(
                                index,
                                "heading",
                                e.target.value
                              )
                            }
                            placeholder="Enter heading"
                          />
                        </div>
                        <div className="col-md-4">
                          <input
                            type="text"
                            className="form-control form-control-sm"
                            value={headingData.link}
                            onChange={(e) =>
                              handleInputChange(index, "link", e.target.value)
                            }
                            placeholder="Enter link"
                          />
                        </div>
                        <div className="col-md-2">
                          <button
                            type="button"
                            className="btn btn-success btn-sm"
                            onClick={handleAddRow}
                          >
                            Add More
                          </button>
                        </div>
                      </div>
                    ))}
                    <div className="col-md-4 mt-3">
                      <button type="submit" className="btn btn-primary btn-sm">
                        Save
                      </button>
                    </div>
                  </form>
                  <hr />
                  <div className="table-responsive mt-4">
                    <table className="table table-bordered m-b-0">
                      <thead>
                        <tr>
                          <th width="10%">Sr. No.</th>
                          <th>Department Heading</th>
                          <th>Heading Link</th>
                          <th width="20%">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentHeadings.map((heading, index) => (
                          <tr key={heading.id}>
                            <td>
                              {(currentPage - 1) * itemsPerPage + index + 1}
                            </td>
                            <td>{heading.department_heading}</td>
                            <td>{heading.heading_link}</td>
                            <td>
                            <Link
                                to={`/add-${heading.department_heading.toLowerCase().replace(/\s+/g, "-")}`}
                                state={{ id: heading?.id }}
                                className="btn btn-primary btn-sm m-t-10"
                              >
                                Add
                              </Link>
                              <button
                                className="btn btn-success btn-sm m-t-10"
                                onClick={() =>
                                  handleEdit(
                                    heading.id,
                                    heading.department_heading,
                                    heading.heading_link
                                  )
                                }
                              >
                                Edit
                              </button>
                              <button
                                className="btn btn-danger btn-sm m-t-10"
                                onClick={() => {
                                  setSelectedHeadingId(heading.id);
                                  setShowDeleteModal(true);
                                }}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4">
                    <ul className="pagination">
                      <li
                        className={`page-item ${
                          currentPage === 1 ? "disabled" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => setCurrentPage(currentPage - 1)}
                        >
                          Previous
                        </button>
                      </li>
                      {Array.from(
                        { length: Math.ceil(headings.length / itemsPerPage) },
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
                          currentPage ===
                          Math.ceil(headings.length / itemsPerPage)
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
                </div>
              </div>
            </div>
          </div>

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
                    <h5 className="modal-title">Edit Heading</h5>
                  </div>
                  <div className="modal-body">
                    <form>
                      <div className="mb-3">
                        <label className="form-label">Heading</label>
                        <input
                          type="text"
                          className="form-control form-control-md"
                          value={editingTitle}
                          onChange={(e) => setEditingTitle(e.target.value)}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Heading Link</label>
                        <input
                          type="text"
                          className="form-control form-control-md"
                          value={editingLink}
                          onChange={(e) => setEditingLink(e.target.value)}
                        />
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={handleCloseEditModal}
                    >
                      Close
                    </button>
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={handleUpdate}
                    >
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

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
                  <div className="modal-body text-center">
                    <h5>Are you sure you want to delete this entry?</h5>
                  </div>
                  <div className="modal-footer">
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={handleCloseDeleteModal}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(selectedHeadingId)}
                    >
                      Delete
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

export default AddDepartmentData;
