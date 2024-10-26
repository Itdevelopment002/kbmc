import React, { useState, useEffect } from 'react';

const PublicDis = () => {
  const [departments, setDepartments] = useState([]);
  const [newDepartment, setNewDepartment] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const departmentsPerPage = 10;

  // Fetch departments from API on component mount
  useEffect(() => {
    const fetchDepartments = async () => {
      const response = await fetch('http://localhost:5000/api/public_disclosure'); // Adjust this URL as needed
      const data = await response.json();
      setDepartments(data);
    };
    fetchDepartments();
  }, []);

  // Get current departments based on page
  const indexOfLastDepartment = currentPage * departmentsPerPage;
  const indexOfFirstDepartment = indexOfLastDepartment - departmentsPerPage;
  const currentDepartments = departments.slice(indexOfFirstDepartment, indexOfLastDepartment);

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

  const handleAdd = (id) => {
    console.log('Add button clicked for department:', id);
  };

  const handleAddDepartment = async (e) => {
    e.preventDefault();
    if (newDepartment) {
      const response = await fetch('http://localhost:5000/api/public_disclosure', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ department_name: newDepartment }),
      });
      const data = await response.json();
      setDepartments([...departments, { id: data.id, department_name: newDepartment }]);
      setNewDepartment('');
    }
  };

  const handleEditDepartment = async (e) => {
    e.preventDefault();
    if (selectedDepartment) {
      const response = await fetch(`http://localhost:5000/api/public_disclosure/${selectedDepartment.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ department_name: selectedDepartment.department_name }),
      });
      if (response.ok) {
        const updatedDepartments = departments.map((department) =>
          department.id === selectedDepartment.id
            ? { ...department, department_name: selectedDepartment.department_name }
            : department
        );
        setDepartments(updatedDepartments);
        setIsEditModalOpen(false);
        setSelectedDepartment(null);
      }
    }
  };

  const handleDeleteDepartment = async () => {
    await fetch(`http://localhost:5000/api/public_disclosure/${selectedDepartment.id}`, {
      method: 'DELETE',
    });
    setDepartments(departments.filter((department) => department.id !== selectedDepartment.id));
    setIsDeleteModalOpen(false);
    setSelectedDepartment(null);
  };

  return (
    <div>
      <div className="page-wrapper">
        <div className="content">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="/home">Home</a></li>
              <li className="breadcrumb-item active" aria-current="page">Public Disclosure</li>
            </ol>
          </nav>
          <div className="row">
            <div className="col-lg-12">
              <div className="card-box">
                <div className="card-block">
                  <div className="row">
                    <div className="col-sm-4 col-3">
                      <h4 className="page-title">Public Disclosure</h4>
                    </div>
                  </div>
                  <hr />
                  <div className="card-block">
                    <form onSubmit={handleAddDepartment}>
                      <div className="form-group row my-3">
                        <label className="col-form-label col-md-3">Department Name <span className="text-danger">*</span></label>
                        <div className="col-md-4">
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            value={newDepartment}
                            onChange={(e) => setNewDepartment(e.target.value)}
                          />
                        </div>
                        <div className="col-md-2">
                          <input type="submit" className="btn btn-primary" value="Submit" />
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="table-responsive">
                    <table className="table table-bordered m-b-0 mt-3">
                      <thead>
                        <tr>
                          <th width="10%">Sr. No.</th>
                          <th>Departments Name</th>
                          <th width="20%">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentDepartments.map((department, index) => (
                          <tr key={department.id}>
                            <td>{indexOfFirstDepartment + index + 1}</td>
                            <td>{department.department_name}</td>
                            <td>
                              <a href="/GeneralDepartment" className="btn btn-primary btn-sm m-t-10 mx-1" onClick={() => handleAdd(department.id)}>Add</a>
                              <button
                                className="btn btn-success btn-sm m-t-10 mx-1"
                                onClick={() => {
                                  setSelectedDepartment(department);
                                  setIsEditModalOpen(true);
                                }}
                              >
                                Edit
                              </button>
                              <button
                                className="btn btn-danger btn-sm m-t-10 mx-1"
                                onClick={() => {
                                  setSelectedDepartment(department);
                                  setIsDeleteModalOpen(true);
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
                        <a className="page-link" href="#!" onClick={handlePreviousClick}>Previous</a>
                      </li>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                          <a className="page-link" href="#!" onClick={() => handlePageClick(page)}>
                            {page}
                          </a>
                        </li>
                      ))}
                      <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <a className="page-link" href="#!" onClick={handleNextClick}>Next</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Delete Modal */}
          {isDeleteModalOpen && (
            <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
              <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                  <div className="modal-body">
                    <h4>Are you sure you want to delete {selectedDepartment?.department_name}?</h4>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setIsDeleteModalOpen(false)}>Close</button>
                    <button type="button" className="btn btn-danger" onClick={handleDeleteDepartment}>Delete</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Edit Modal */}
          {isEditModalOpen && (
            <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
              <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                  <div className="modal-body">
                    <h4>Edit Department</h4>
                    <form onSubmit={handleEditDepartment}>
                      <div className="form-group my-3">
                        <label>Department Name</label>
                        <input
                          type="text"
                          className="form-control mt-2"
                          value={selectedDepartment?.department_name || ''}
                          onChange={(e) =>
                            setSelectedDepartment({ ...selectedDepartment, department_name: e.target.value })
                          }
                        />
                      </div>


                  
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setIsEditModalOpen(false)}>Close</button>
                    <button type="submit" className="btn btn-success">Save changes</button>
                  </div>
                </form>
                </div>
              </div>
            </div>
            </div>
          )}
      </div>
    </div>
    </div >
  );
};

export default PublicDis;
