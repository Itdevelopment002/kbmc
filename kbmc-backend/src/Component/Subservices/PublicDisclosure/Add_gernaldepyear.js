import React, { useState, useEffect } from 'react';
import { FaFilePdf } from 'react-icons/fa'; // PDF icon
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap'; // Ensure you have react-bootstrap installed

const AddGeneralDepYear = () => {
  const [year, setYear] = useState('');
  const [meetingType, setMeetingType] = useState('General Meeting');
  const [pdfHeading, setPdfHeading] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const [data, setData] = useState([]); // State to hold the list of records
  const [editAwardData, setEditAwardData] = useState({ heading: '', description: '', pdf: null }); // For editing
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentEditingId, setCurrentEditingId] = useState(null); // For identifying the item being edited
  const [currentDeletingId, setCurrentDeletingId] = useState(null); // For identifying the item being deleted


  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const currentPageData = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  // Fetch data from the API when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/generaladminaddyear');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('year', year);
    formData.append('meetingtype', meetingType);
    formData.append('pdfheading', pdfHeading);
    if (pdfFile) {
      formData.append('pdf', pdfFile); // Use 'pdf' as per the API
    }

    try {
      await axios.post('http://localhost:5000/api/generaladminaddyear', formData);
      fetchData(); // Refresh data after submission
      // Clear input fields after submission
      setYear('');
      setMeetingType('General Meeting');
      setPdfHeading('');
      setPdfFile(null);
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('year', editAwardData.heading);
    formData.append('meetingtype', meetingType);
    formData.append('pdfheading', editAwardData.description);
    if (editAwardData.pdf) {
      formData.append('pdf', editAwardData.pdf);
    }

    try {
      await axios.put(`http://localhost:5000/api/generaladminaddyear/${currentEditingId}`, formData);
      fetchData(); // Refresh data after editing
      setShowEditModal(false);
    } catch (error) {
      console.error('Error editing data:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/generaladminaddyear/${id}`);
      fetchData(); // Refresh data after deletion
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const handleDeleteConfirm = () => {
    if (currentDeletingId) {
      handleDelete(currentDeletingId);
      setShowDeleteModal(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a href="index.php">Home</a></li>
          <li className="breadcrumb-item"><a href="/GeneralDepartment">Add General Admin Department</a></li>
          <li className="breadcrumb-item active" aria-current="page">Add Year</li>
        </ol>

        <div className="row">
          <div className="col-lg-12">
            <div className="card-box">
              <div className="card-block">
                <div className="row">
                  <div className="col-sm-4 col-3">
                    <h4 className="page-title">Add Year</h4>
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-2">
                      <div className="form-group">
                        <label>Enter Year</label>
                        <input
                          type="text"
                          className="form-control mt-2"
                          value={year}
                          onChange={(e) => setYear(e.target.value)}
                          placeholder='Enter Year'
                        />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-group">
                        <label>Select Meeting</label>
                        <select
                          className="form-select mt-2"
                          value={meetingType}
                          onChange={(e) => setMeetingType(e.target.value)}
                        >
                          <option>General Meeting</option>
                          <option>Standing Committee Meeting</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-md-4">
                      <div className="form-group">
                        <label>PDF Heading</label>
                        <input
                          type="text"
                          className="form-control mt-2"
                          value={pdfHeading}
                          onChange={(e) => setPdfHeading(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="form-group">
                        <label>Upload PDF</label>
                        <input
                          type="file"
                          className="form-control mt-2"
                          onChange={(e) => setPdfFile(e.target.files[0])}
                        />
                      </div>
                    </div>
                    <div className="col-md-2 my-2">
                      <input type="submit" className="btn btn-primary" value="Submit" />
                    </div>
                  </div>
                </form>

                <hr />

                <div className="table-responsive mt-4">
                  <table className="table table-bordered m-b-0">
                    <thead>
                      <tr>
                        <th width="10%">Sr. No.</th>
                        <th>Year</th>
                        <th>Meeting Type</th>
                        <th>PDF Heading</th>
                        <th>PDF File</th>
                        <th width="20%">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((item, index) => (
                        <tr key={item.id}>
                          <td>{index + 1}</td>
                          <td>{item.year}</td>
                          <td>{item.meetingtype}</td>
                          <td>{item.pdfheading}</td>
                          <td>
                            <a href={`http://localhost:5000/${item.pdf}`} target="_blank" rel="noopener noreferrer">
                              <FaFilePdf style={{ color: 'red' }} size={35} />
                            </a>
                          </td>

                          <td>
                            <button
                              className="btn btn-success btn-sm m-t-10 mx-1"
                              onClick={() => {
                                setShowEditModal(true);
                                setCurrentEditingId(item.id);
                                setEditAwardData({
                                  heading: item.year,
                                  description: item.pdfheading,
                                  pdf: null
                                });
                              }}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-danger btn-sm m-t-10"
                              onClick={() => {
                                setCurrentDeletingId(item.id);
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
                    {Array.from({ length: Math.ceil(data.length / itemsPerPage) }, (_, i) => (
                      <li className={`page-item ${currentPage === i + 1 ? 'active' : ''}`} key={i}>
                        <button className="page-link" onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
                      </li>
                    ))}
                    <li className={`page-item ${currentPage === Math.ceil(data.length / itemsPerPage) ? 'disabled' : ''}`}>
                      <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
                    </li>
                  </ul>
                </div>
                {/* Delete Modal */}
                <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                  <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>Are you sure you want to delete this award?</Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
                    <Button variant="danger" onClick={handleDeleteConfirm}>Delete</Button>
                  </Modal.Footer>
                </Modal>

                {/* Edit Award Modal */}
                <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
                  <Modal.Header closeButton>
                    <Modal.Title>Edit Award</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <form onSubmit={handleEditSubmit}>
                      <div className="mb-3">
                        <label className="form-label">Year</label>
                        <input
                          type="text"
                          className="form-control"
                          value={editAwardData.heading}
                          onChange={(e) => setEditAwardData({ ...editAwardData, heading: e.target.value })}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Meeting Type</label>
                        <select
                          className="form-select"
                          value={meetingType}
                          onChange={(e) => setMeetingType(e.target.value)}
                        >
                          <option>General Meeting</option>
                          <option>Standing Committee Meeting</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <label className="form-label">PDF Heading</label>
                        <input
                          type="text"
                          className="form-control"
                          value={editAwardData.description}
                          onChange={(e) => setEditAwardData({ ...editAwardData, description: e.target.value })}
                        />
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Upload New PDF (optional)</label>
                        <input
                          type="file"
                          className="form-control"
                          onChange={(e) => setEditAwardData({ ...editAwardData, pdf: e.target.files[0] })}
                        />
                      </div>
                      <Button type="submit" className="btn btn-primary">Save Changes</Button>
                    </form>
                  </Modal.Body>
                </Modal>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddGeneralDepYear;
