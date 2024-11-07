import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify"; // Import ToastContainer and toast
import "react-toastify/dist/ReactToastify.css";
import api from "../api";
import { Link } from "react-router-dom";

const PrivateHospital = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [editData, setEditData] = useState({
    id: "",
    name: "",
    division: "",
    specialty: "",
    address: "",
    phone: "",
    mobile: "",
    beds: "",
    facilities: "",
  });
  const [hospitals, setHospitals] = useState([]);

  // Fetch hospitals when the component mounts
  useEffect(() => {
    fetchHospitals();
  }, []);

  const fetchHospitals = async () => {
    try {
      const response = await api.get("/private-hospital");
      setHospitals(response.data);
    } catch (error) {
      console.error("Error fetching hospitals:", error);
    }
  };

  const handleDeleteModalOpen = (hospital) => {
    setSelectedHospital(hospital);
    setShowDeleteModal(true);
  };

  const handleEditModalOpen = (hospital) => {
    setEditData({
      // Set editData to the hospital's current data
      id: hospital.id,
      name: hospital.hospital_name,
      division: hospital.division,
      specialty: hospital.principal_doctor,
      address: hospital.address,
      phone: hospital.phone_no,
      mobile: hospital.mobile_no,
      beds: hospital.beds,
      facilities: hospital.facility,
    });
    setShowEditModal(true);
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/private-hospital/${selectedHospital.id}`);
      toast.success(`Hospital deleted successfully.`);
      fetchHospitals();
    } catch (error) {
      console.error("Error deleting hospital:", error);
      toast.error("Failed to delete hospital.");
    } finally {
      setShowDeleteModal(false);
      setSelectedHospital(null);
    }
  };

  const handleEditSubmit = async () => {
    try {
      await api.put(
        `/private-hospital/${editData.id}`,
        {
          hospitalName: editData.name,
          division: editData.division,
          principalDoctor: editData.specialty,
          address: editData.address,
          phoneNo: editData.phone,
          mobileNo: editData.mobile,
          beds: editData.beds,
          facilities: editData.facilities,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(`Hospital updated successfully.`);
      fetchHospitals();
    } catch (error) {
      console.error("Error updating hospital:", error);
      toast.error("Failed to update hospital.");
    } finally {
      setShowEditModal(false);
    }
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="#">City Profile</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Private Hospital
            </li>
          </ol>
        </nav>
        <div className="row">
          <div className="col-lg-12">
            <div className="card-box">
              <div className="card-block">
                <div className="row">
                  <div className="col-sm-4 col-3">
                    <h4 className="page-title">Private Hospital</h4>
                  </div>
                  <div className="col-sm-8 col-9 text-end">
                    <Link
                      to="/add-private-hospital"
                      className="btn btn-primary btn-rounded float-right"
                      style={{ borderRadius: "100px" }}
                    >
                      <i className="fa fa-plus"></i> + Add Hospital
                    </Link>
                  </div>
                </div>
                <div className="table-responsive mt-4">
                  <table className="table table-bordered m-b-0 text-top">
                    <thead>
                      <tr className="text-top">
                        <th width="10%">Sr. No.</th>
                        <th>Hospitals Name</th>
                        <th>Names of Division</th>
                        <th>Name of Principal Doctor specialty</th>
                        <th>Address</th>
                        <th>Phone No.</th>
                        <th>Mobile No.</th>
                        <th>No. of Beds</th>
                        <th>Facilities Provided in Hospital</th>
                        <th width="20%">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {hospitals.map((hospital, index) => (
                        <tr key={hospital.id}>
                          <td>{index + 1}</td>
                          <td>{hospital.hospital_name}</td>
                          <td>{hospital.division}</td>
                          <td>{hospital.principal_doctor}</td>
                          <td>{hospital.address}</td>
                          <td>{hospital.phone_no}</td>
                          <td>{hospital.mobile_no}</td>
                          <td>{hospital.beds}</td>
                          <td>{hospital.facility}</td>
                          <td>
                            <button
                              className="btn btn-success btn-sm m-t-10"
                              onClick={() => handleEditModalOpen(hospital)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-danger btn-sm m-t-10 mx-2"
                              onClick={() => handleDeleteModalOpen(hospital)}
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
        <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered>
          <Modal.Body>
            <h4>
              Are you sure you want to delete {selectedHospital?.hospital_name}?
            </h4>
          </Modal.Body>
          <Modal.Footer className="text-center">
            <Button variant="secondary" onClick={handleCloseDeleteModal}>
              Close
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
        {/* Edit Modal */}
        <Modal show={showEditModal} onHide={handleCloseEditModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Edit Private Hospital</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formHospitalName">
                <Form.Label>Hospital Name</Form.Label>
                <Form.Control
                  type="text"
                  value={editData.name}
                  onChange={(e) =>
                    setEditData({ ...editData, name: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formDivision">
                <Form.Label>Division</Form.Label>
                <Form.Control
                  type="text"
                  value={editData.division}
                  onChange={(e) =>
                    setEditData({ ...editData, division: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formSpecialty">
                <Form.Label>Principal Doctor's Specialty</Form.Label>
                <Form.Control
                  type="text"
                  value={editData.specialty}
                  onChange={(e) =>
                    setEditData({ ...editData, specialty: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formAddress">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  value={editData.address}
                  onChange={(e) =>
                    setEditData({ ...editData, address: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formPhone">
                <Form.Label>Phone No.</Form.Label>
                <Form.Control
                  type="text"
                  value={editData.phone}
                  onChange={(e) =>
                    setEditData({ ...editData, phone: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formMobile">
                <Form.Label>Mobile No.</Form.Label>
                <Form.Control
                  type="text"
                  value={editData.mobile}
                  onChange={(e) =>
                    setEditData({ ...editData, mobile: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formBeds">
                <Form.Label>No. of Beds</Form.Label>
                <Form.Control
                  type="text"
                  value={editData.beds}
                  onChange={(e) =>
                    setEditData({ ...editData, beds: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formFacilities">
                <Form.Label>Facilities Provided</Form.Label>
                <Form.Control
                  type="text"
                  value={editData.facilities}
                  onChange={(e) =>
                    setEditData({ ...editData, facilities: e.target.value })
                  }
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseEditModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleEditSubmit}>
              Save changes
            </Button>
          </Modal.Footer>
        </Modal>
        <ToastContainer /> {/* Add ToastContainer for notifications */}
      </div>
    </div>
  );
};

export default PrivateHospital;
