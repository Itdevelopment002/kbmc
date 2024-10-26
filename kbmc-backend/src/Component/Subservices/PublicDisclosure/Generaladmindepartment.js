import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

function Generaladmindepartment() {
  const [headings, setHeadings] = useState([]);
  const [newHeadings, setNewHeadings] = useState(['']);
  const [editingId, setEditingId] = useState(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedHeadingId, setSelectedHeadingId] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchHeadings();
  }, []);

  const fetchHeadings = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/generaladmindepartment');
      setHeadings(response.data);
    } catch (error) {
      console.error('Error fetching headings:', error);
    }
  };

  const handleAddRow = () => {
    setNewHeadings([...newHeadings, '']);
  };

  const handleInputChange = (index, value) => {
    const updatedHeadings = [...newHeadings];
    updatedHeadings[index] = value;
    setNewHeadings(updatedHeadings);
  };

  const handleSaveHeadings = async () => {
    // Filter out empty headings
    const newHeadingsData = newHeadings.filter(h => h.trim() !== '');

    if (newHeadingsData.length === 0) {
      alert('Please enter at least one heading.');
      return;
    }

    try {
      for (let heading of newHeadingsData) {
        await axios.post('http://localhost:5000/api/generaladmindepartment', {
          departments_heading: heading,
        });
      }
      fetchHeadings();
      setNewHeadings(['']);
    } catch (error) {
      console.error('Error saving headings:', error);
    }
  };

  const handleEdit = (id, title) => {
    setEditingId(id);
    setEditingTitle(title);
    setShowEditModal(true);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/generaladmindepartment/${editingId}`, {
        departments_heading: editingTitle,
      });
      fetchHeadings();
      setEditingId(null);
      setEditingTitle('');
      setShowEditModal(false);
    } catch (error) {
      console.error('Error updating heading:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/generaladmindepartment/${id}`);
      fetchHeadings();
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting heading:', error);
    }
  };

  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleCloseEditModal = () => setShowEditModal(false);

  // Pagination handlers
  const indexOfLastHeading = currentPage * itemsPerPage;
  const indexOfFirstHeading = indexOfLastHeading - itemsPerPage;
  const currentHeadings = headings.slice(indexOfFirstHeading, indexOfLastHeading);

  return (
    <div className="page-wrapper">
      <div className="content">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item"><Link to="/public-disclosure">Publick Disclosure</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Add General Admin Department</li>
        </ol>
        <div className="row">
          <div className="col-lg-12">
            <div className="card-box">
              <div className="card-block">
                <h4 className="page-title">Add General Admin Department</h4>
                <hr />
                <form onSubmit={(e) => { e.preventDefault(); handleSaveHeadings(); }}>
                  {newHeadings.map((heading, index) => (
                    <div className="form-group row" key={index}>
                      <label className="col-form-label col-md-2">Add Heading</label>
                      <div className="col-md-4 d-flex align-items-center">
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          value={heading}
                          onChange={(e) => handleInputChange(index, e.target.value)}
                          placeholder="Enter heading"
                        />
                        <button
                          type="button"
                          className="btn btn-success btn-sm mt-10"
                          style={{ marginLeft: '10px', width: '200px' }}
                          onClick={handleAddRow}
                        >
                          Add More
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="col-md-4 mt-3">
                    <button
                      type="submit"
                      className="btn btn-primary btn-sm ml-2"
                    >
                      Save
                    </button>
                  </div>
                </form>

                <div className="table-responsive mt-4">
                  <table className="table table-bordered m-b-0">
                    <thead>
                      <tr>
                        <th width="10%">Sr. No.</th>
                        <th>Departments Heading</th>
                        <th width="20%">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentHeadings.map((heading, index) => (
                        <tr key={heading.id}>
                          {/* Generate serial number based on current page and index */}
                          <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                          <td>{heading.departments_heading}</td>
                          <td>
                            <Link to="/Add_gernaldepyear" className="btn btn-primary btn-sm m-t-10" style={{ marginRight: '10px' }}>
                              Add
                            </Link>
                            <button
                              className="btn btn-success btn-sm m-t-10"
                              onClick={() => handleEdit(heading.id, heading.departments_heading)}
                              style={{ marginRight: '10px' }}
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

                {/* Pagination */}
                <div className="mt-4">
                  <ul className="pagination">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
                    </li>
                    {Array.from({ length: Math.ceil(headings.length / itemsPerPage) }, (_, i) => (
                      <li className={`page-item ${currentPage === i + 1 ? 'active' : ''}`} key={i}>
                        <button className="page-link" onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
                      </li>
                    ))}
                    <li className={`page-item ${currentPage === Math.ceil(headings.length / itemsPerPage) ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
                    </li>
                  </ul>
                </div>

                {/* Edit Modal */}
                {showEditModal && (
                  <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-labelledby="editHeadingLabel" aria-hidden="true" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered" role="document">
                      <div className="modal-content">
                        <div className="modal-body">
                          <h4>Edit Heading</h4>
                          <form onSubmit={handleUpdate}>
                            <div className="form-group my-3">
                              <label>Heading Title</label>
                              <input
                                type="text"
                                className="form-control mt-2"
                                value={editingTitle}
                                onChange={(e) => setEditingTitle(e.target.value)}
                              />
                            </div>

                            <div className="modal-footer">
                              <button type="button" className="btn btn-secondary" onClick={handleCloseEditModal}>Close</button>
                              <button type="submit" className="btn btn-success">Save Changes</button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                )}


                {/* Delete Modal */}
                <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
                  <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    Are you sure you want to delete this heading?
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDeleteModal}>Close</Button>
                    <Button variant="danger" onClick={() => handleDelete(selectedHeadingId)}>Delete</Button>
                  </Modal.Footer>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Generaladmindepartment;
