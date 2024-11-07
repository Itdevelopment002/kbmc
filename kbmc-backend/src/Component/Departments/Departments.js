import React, { useEffect, useState } from 'react';
import { Modal, Button, Table, Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import api from '../api';

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedHod, setEditedHod] = useState('');
  const [editedLink, setEditedLink] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [departmentsPerPage] = useState(5); 

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await api.get('/departments');
      setDepartments(response.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const handleDelete = (id) => {
    setSelectedDepartment(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/departments/${selectedDepartment}`);
      console.log(`Deleted department with ID: ${selectedDepartment}`);
      setShowDeleteModal(false);
      fetchDepartments(); // Refresh the department list after deletion
    } catch (error) {
      console.error('Error deleting department:', error);
    }
  };

  const handleEdit = (department) => {
    setSelectedDepartment(department.id);
    setEditedName(department.name);
    setEditedHod(department.hod);
    setEditedLink(department.link);
    setShowEditModal(true);
  };

  const confirmEdit = async () => {
    try {
      await api.put(`/departments/${selectedDepartment}`, {
        name: editedName,
        hod: editedHod,
        link: editedLink,
      });
      console.log(`Edited department with ID: ${selectedDepartment}`);
      fetchDepartments(); // Refresh the department list after editing
      setShowEditModal(false);
    } catch (error) {
      console.error('Error editing department:', error);
    }
  };

  // Pagination logic
  const indexOfLastDepartment = currentPage * departmentsPerPage;
  const indexOfFirstDepartment = indexOfLastDepartment - departmentsPerPage;
  const currentDepartments = departments.slice(indexOfFirstDepartment, indexOfLastDepartment);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/">Home</Link></li>
              <li className="breadcrumb-item active" aria-current="page">Departments</li>
            </ol>
          </nav>
          <div className="row">
            <div className="col-lg-12">
              <div className="card-box">
                <div className="card-block">
                  <div className="row">
                    <div className="col-sm-4 col-3">
                      <h4 className="page-title">Departments</h4>
                    </div>
                    <div className="text-end mb-3">
                      <Link to="/add-department">
                        <button className="btn btn-primary">+ Add Departments</button>
                      </Link>
                    </div>
                  </div>
                  <div className="table-responsive">
                    <Table bordered>
                      <thead>
                        <tr>
                          <th width="10%">Sr. No.</th>
                          <th>Departments Name</th>
                          <th>Name of HOD</th>
                          <th>Department Link</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentDepartments.map((department, index) => (
                          <tr key={department.id}>
                            <td>{indexOfFirstDepartment + index + 1}</td>
                            <td>{department.name}</td>
                            <td>{department.hod}</td>
                            <td>{department.link}</td>
                            <td>
                              <Button
                                variant="danger"
                                size="sm"
                                className="me-2"
                                onClick={() => handleDelete(department.id)}
                              >
                                Delete
                              </Button>
                              <Button
                                variant="success"
                                size="sm"
                                onClick={() => handleEdit(department)}
                              >
                                Edit
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                  {/* Pagination */}
                  <Pagination className="justify-content-center">
                    {[...Array(Math.ceil(departments.length / departmentsPerPage)).keys()].map(number => (
                      <Pagination.Item key={number + 1} onClick={() => paginate(number + 1)}>
                        {number + 1}
                      </Pagination.Item>
                    ))}
                  </Pagination>
                </div>
              </div>
            </div>
          </div>

          {/* Delete Modal */}
          <Modal
            show={showDeleteModal}
            onHide={() => setShowDeleteModal(false)}
            centered
          >
            <Modal.Body>
              <h4>Are you sure you want to delete this department?</h4>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                Close
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
            <Modal.Body>
              <h4>Edit Department</h4>
              <div className="mb-3">
                <label htmlFor="departmentName" className="form-label">Department Name</label>
                <input
                  type="text"
                  id="departmentName"
                  className="form-control"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="hodName" className="form-label">HOD Name</label>
                <input
                  type="text"
                  id="hodName"
                  className="form-control"
                  value={editedHod}
                  onChange={(e) => setEditedHod(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="departmentLink" className="form-label">Department Link</label>
                <input
                  type="text"
                  id="departmentLink"
                  className="form-control"
                  value={editedLink}
                  onChange={(e) => setEditedLink(e.target.value)}
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                Close
              </Button>
              <Button variant="success" onClick={confirmEdit}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default Departments;
