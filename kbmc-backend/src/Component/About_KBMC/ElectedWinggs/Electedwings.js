import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import api, { baseURL } from "../../api";
import { toast, ToastContainer } from "react-toastify";
import GLightbox from "glightbox";
import "glightbox/dist/css/glightbox.min.css";
import "react-toastify/dist/ReactToastify.css";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";

function Electedwings() {
  const [correspondents, setCorrespondents] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCorrespondentId, setSelectedCorrespondentId] = useState(null);
  const [editData, setEditData] = useState({
    correspondentName: "",
    wardNo: "",
    startDate: "",
    endDate: "",
    mobileNo: "",
    image_path: "",
  });
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const lightbox = GLightbox({
      selector: ".glightbox",
    });

    return () => {
      lightbox.destroy();
    };
  }, [correspondents]);

  // Fetch correspondents data when component mounts
  const fetchCorrespondents = async () => {
    try {
      const response = await api.get(
        "/elected-wings"
      );
      setCorrespondents(response.data);
    } catch (error) {
      toast.error("Failed to fetch correspondents.");
    }
  };

  useEffect(() => {
    fetchCorrespondents();
  }, []);

  const handleDeleteClick = (id) => {
    setSelectedCorrespondentId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await api.delete(
        `/elected-wings/${selectedCorrespondentId}`
      );
      setCorrespondents(
        correspondents.filter(
          (correspondent) => correspondent.id !== selectedCorrespondentId
        )
      );
      toast.success("Correspondent deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete correspondent.");
    } finally {
      setShowDeleteModal(false);
    }
  };

  const handleEditClick = (id) => {
    const correspondentToEdit = correspondents.find(
      (correspondent) => correspondent.id === id
    );
    setEditData(correspondentToEdit);
    setSelectedCorrespondentId(id);
    setShowEditModal(true);
    setImageFile(null); // Reset the image file state for the preview
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const formattedStartDate = editData.startDate ? formatDate(editData.startDate) : "";
    const formattedEndDate = editData.endDate ? formatDate(editData.endDate) : "";
    
    const formData = new FormData();
    formData.append("correspondentName", editData.correspondentName);
    formData.append("wardNo", editData.wardNo);
    formData.append("startDate", formattedStartDate);
    formData.append("endDate", formattedEndDate);
    formData.append("mobileNo", editData.mobileNo);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      await api.put(
        `/elected-wings/${selectedCorrespondentId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Correspondent updated successfully!");
      fetchCorrespondents(); // Refetch the correspondents to update the list
    } catch (error) {
      toast.error("Failed to update correspondent.");
    } finally {
      setShowEditModal(false);
    }
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    // Show a preview of the image
    if (file) {
      setEditData((prevData) => ({
        ...prevData,
        image_path: URL.createObjectURL(file), // Use this for preview
      }));
    }
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="#.">About KBMC</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Elected Wings
            </li>
          </ol>
        </nav>

        <div className="row">
          <div className="col-lg-12">
            <div className="card-box">
              <div className="card-block">
                <div className="row mb-3">
                  <div className="col-sm-4 col-3">
                    <h4 className="page-title">Elected Wings</h4>
                  </div>
                  <div className="col-sm-8 col-9 text-end m-b-20">
                    <a
                      href="/Add_electedwings"
                      className="btn btn-primary btn-rounded float-right"
                      style={{ borderRadius: "100px" }}
                    >
                      <i className="fa fa-plus"></i> + Add Correspondent
                    </a>
                  </div>
                </div>

                <div className="table-responsive">
                  <table className="table table-bordered m-b-0">
                    <thead>
                      <tr>
                        <th width="10%">Sr. No.</th>
                        <th>Correspondent Image</th>
                        <th>Correspondent Name</th>
                        <th>Ward No.</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Mobile No.</th>
                        <th width="15%">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {correspondents.map((correspondent, index) => (
                        <tr key={correspondent.id}>
                          <td>{index + 1}</td>
                          <td>
                            <a
                              href={`${baseURL}${correspondent.image_path}`}
                              className="glightbox"
                              data-gallery="correspondent-images"
                            >
                              <img
                                width="50px"
                                src={`${baseURL}${correspondent.image_path}`}
                                alt={`correspondent${index + 1}`}
                              />
                            </a>
                          </td>
                          <td>{correspondent.correspondentName}</td>
                          <td>{correspondent.wardNo}</td>
                          <td>
                            {new Date(correspondent.startDate)
                              .toLocaleDateString("en-GB")
                              .replace(/\//g, "-")}
                          </td>
                          <td>
                            {new Date(correspondent.endDate)
                              .toLocaleDateString("en-GB")
                              .replace(/\//g, "-")}
                          </td>
                          <td>{correspondent.mobileNo}</td>
                          <td>
                            <button
                              className="btn btn-success btn-sm m-t-10 mx-1"
                              onClick={() => handleEditClick(correspondent.id)}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-danger btn-sm m-t-10 "
                              onClick={() =>
                                handleDeleteClick(correspondent.id)
                              }
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

        {/* Delete Modal */}
        <Modal
          show={showDeleteModal}
          onHide={() => setShowDeleteModal(false)}
          centered
        >
          <Modal.Body>
            <h4>Are you sure you want to delete this correspondent?</h4>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => setShowDeleteModal(false)}>
              Cancel
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
          <Modal.Header closeButton>
            <Modal.Title>Edit Correspondent</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleEditSubmit}>
              <Form.Group>
                <Form.Label>Correspondent Name</Form.Label>
                <Form.Control
                  type="text"
                  name="correspondentName"
                  value={editData.correspondentName}
                  onChange={handleFormChange}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Ward No.</Form.Label>
                <Form.Control
                  type="text"
                  name="wardNo"
                  value={editData.wardNo}
                  onChange={handleFormChange}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Start Date</Form.Label>
                <Flatpickr
                  value={editData.startDate ? new Date(editData.startDate) : ""}
                  onChange={(date) =>
                    handleFormChange({
                      target: { name: "startDate", value: date[0] },
                    })
                  }
                  className="form-control"
                  options={{ dateFormat: "d-m-Y" }} // Set format as dd-mm-yyyy
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>End Date</Form.Label>
                <Flatpickr
                  value={editData.endDate ? new Date(editData.endDate) : ""}
                  onChange={(date) =>
                    handleFormChange({
                      target: { name: "endDate", value: date[0] },
                    })
                  }
                  className="form-control"
                  options={{ dateFormat: "d-m-Y" }} // Set format as dd-mm-yyyy
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Mobile No.</Form.Label>
                <Form.Control
                  type="text"
                  name="mobileNo"
                  value={editData.mobileNo}
                  onChange={handleFormChange}
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Upload Image</Form.Label>
                <Form.Control type="file" onChange={handleImageChange} />
              </Form.Group>
              <div className="mt-3">
                {imageFile ? (
                  <img
                    src={URL.createObjectURL(imageFile)}
                    alt="Preview"
                    width="100"
                  />
                ) : (
                  editData.image_path && (
                    <img
                      src={`${baseURL}${editData.image_path}`}
                      alt="Current"
                      width="100"
                    />
                  )
                )}
              </div>
              <div className="mt-3">
                <Button variant="primary" type="submit">
                  Update Correspondent
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Electedwings;
