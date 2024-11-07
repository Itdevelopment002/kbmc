import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

const MunicipalProperties = () => {
  const [properties, setProperties] = useState([]);
  const [editData, setEditData] = useState({ id: "", name: "", propertyType: "", address: "" });
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Fetch properties from the API
  const fetchProperties = async () => {
    try {
      const response = await api.get('/muncipal'); // Update with your API endpoint
      setProperties(response.data);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await api.delete(`/muncipal/${id}`); // Update with your API endpoint
        setProperties(properties.filter((property) => property.id !== id));
      } catch (error) {
        console.error("Error deleting property:", error);
      }
    }
  };

  const handleEdit = (property) => {
    setEditData(property);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditData({ id: "", name: "", propertyType: "", address: "" });
  };

  const handleEditSubmit = async () => {
    try {
      await api.put(`/muncipal/${editData.id}`, editData);
      setProperties(properties.map(property =>
        property.id === editData.id ? { ...property, ...editData } : property
      ));
      handleCloseEditModal();
    } catch (error) {
      console.error('Error updating property:', error);
    }
  };

  const currentPageData = properties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="page-wrapper">
      <div className="content">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="#.">City Profile</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Municipal Properties
            </li>
          </ol>
        </nav>

        <div className="row">
          <div className="col-lg-12">
            <div className="card-box">
              <div className="card-block">
                <div className="row">
                  <div className="col-sm-4 col-3">
                    <h4 className="page-title">Municipal Properties</h4>
                  </div>
                  <div className="text-end mb-3">
                    <Link
                      to="/add-municipal"
                      className="btn btn-primary btn-rounded float-right"
                      style={{ borderRadius: '100px' }}
                    >
                      <i className="fa fa-plus"></i> + Add Municipal Property 
                    </Link>
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="table table-bordered m-b-0">
                    <thead>
                      <tr>
                        <th width="10%">Sr. No.</th>
                        <th>Name</th>
                        <th>Shops / Sabhagruha / Community Hall / Gymnasium / Library</th>
                        <th>Address</th>
                        <th width="15%">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                    {currentPageData.length > 0 ? (
                          currentPageData.map((property, index) => (
                        <tr key={property.id}>
                          <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                          <td>{property.name}</td>
                          <td>{property.propertyType}</td>
                          <td>{property.address}</td>
                          <td>
                            <button
                              className="btn btn-danger btn-sm m-t-10"
                              onClick={() => handleDelete(property.id)}
                              style={{ marginRight: "10px" }}
                            >
                              Delete
                            </button>
                            <button
                              className="btn btn-success btn-sm m-t-10"
                              onClick={() => handleEdit(property)}
                            >
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" style={{ textAlign: "center" }}>
                          No Muncipal properties data available
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

        <div className="mt-4">
            <ul className="pagination">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Previous
                </button>
              </li>
              {Array.from(
                { length: Math.ceil(properties.length / itemsPerPage) },
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
                  currentPage === Math.ceil(properties.length / itemsPerPage)
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

      {/* Edit Modal */}
        {showEditModal && (
          <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog" aria-hidden="true">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header justify-content-between">
                  <h5 className="modal-title" style={{ margin: 0 }}>Edit Property</h5>
                  <button type="button" className="close" onClick={handleCloseEditModal}>
                    <span>&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="form-group mb-3">
                    <label className="fw-semibold">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editData.name}
                      onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                      style={{ marginTop: '8px' }} // Adds space between label and input
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label className="fw-semibold">Shops / Sabhagruha / Community Hall / Gymnasium / Library</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editData.propertyType}
                      onChange={(e) => setEditData({ ...editData, propertyType: e.target.value })}
                      style={{ marginTop: '8px' }} // Adds space between label and input
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label className="fw-semibold">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editData.address}
                      onChange={(e) => setEditData({ ...editData, address: e.target.value })}
                      style={{ marginTop: '8px' }} // Adds space between label and input
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={handleCloseEditModal}>
                    Close
                  </button>
                  <button type="button" className="btn btn-primary" onClick={handleEditSubmit}>
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

    </div>
  );
};

export default MunicipalProperties;
