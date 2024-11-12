import React, { useState, useEffect } from "react";
// import { Modal, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import api, { baseURL } from "../api";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaTrash, FaEdit } from "react-icons/fa";
import GLightbox from "glightbox";
import "glightbox/dist/css/glightbox.min.css";

const Schools = () => {
    const [schoolData, setSchoolData] = useState([]);
    const [schoolImageData, setSchoolImageData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [modalType, setModalType] = useState("");
    const [selectedItem, setSelectedItem] = useState(null);
    const [editData, setEditData] = useState({});
    const [imagePreview, setImagePreview] = useState("");
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    useEffect(() => {
        fetchSchoolData();
        fetchSchoolImageData();
    }, []);

    useEffect(() => {
        const lightbox = GLightbox({
            selector: ".glightbox",
        });
        return () => {
            lightbox.destroy();
        };
    }, [schoolImageData]);

    const fetchSchoolData = async () => {
        try {
            const response = await api.get("/schools");
            setSchoolData(response.data);
        } catch (error) {
            toast.error("Failed to fetch school data.");
        }
    };

    const fetchSchoolImageData = async () => {
        try {
            const response = await api.get(
                "/school-images"
            );
            setSchoolImageData(response.data);
        } catch (error) {
            toast.error("Failed to fetch school image data.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id, type) => {
        try {
            if (type === "school") {
                await api.delete(`/schools/${id}`);
                setSchoolData((prevData) => prevData.filter((item) => item.id !== id));
            } else if (type === "school-image") {
                await api.delete(`/school-images/${id}`);
                setSchoolImageData((prevData) =>
                    prevData.filter((item) => item.id !== id)
                );
            }
            toast.success(
                `${type === "school" ? "School" : "School image"
                } entry deleted successfully.`
            );
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete the entry.");
        }
        closeModal();
    };

    const openEditModal = (item, type) => {
        setSelectedItem(item);
        setEditData(
            type === "school"
                ? {
                    heading: item.heading,
                    schoolName: item.schoolName,
                    address: item.address,
                    medium: item.medium,
                }
                : { ...item }
        );
        setImagePreview(
            type === "school-image" ? `${baseURL}${item.image_path}` : ""
        ); // Updated for proper preview
        setModalType(type);
        setShowEditModal(true);
    };

    const closeModal = () => {
        setShowEditModal(false);
        setShowDeleteModal(false);
        setSelectedItem(null);
        setEditData({});
        setImagePreview("");
    };

    const handleSaveChanges = async () => {
        try {
            if (modalType === "school") {
                await api.put(
                    `/schools/${selectedItem.id}`,
                    {
                        heading: editData.heading,
                        schoolName: editData.schoolName,
                        address: editData.address,
                        medium: editData.medium,
                    }
                );
                setSchoolData(
                    schoolData.map((item) =>
                        item.id === selectedItem.id
                            ? {
                                ...item,
                                heading: editData.heading,
                                schoolName: editData.schoolName,
                                address: editData.address,
                                mnedium: editData.medium,
                            }
                            : item
                    )
                );
                fetchSchoolData();
            } else if (modalType === "school-image") {
                const formData = new FormData();
                if (editData.imageFile) {
                    formData.append("schoolImage", editData.imageFile);
                }

                await api.put(
                    `/school-images/${selectedItem.id}`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                setSchoolImageData(
                    schoolImageData.map((item) =>
                        item.id === selectedItem.id ? { ...item, ...editData } : item
                    )
                ); // Update CO data locally
                fetchSchoolImageData();
            }
            toast.success(
                `${modalType === "school" ? "School" : "School image"
                } entry updated successfully.`
            );
            navigate("/schools");
        } catch (error) {
            console.error(error);
            toast.error("Failed to update the entry.");
        }
        closeModal();
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                setEditData({ ...editData, imageFile: file }); // Store the file in editData
            };
            reader.readAsDataURL(file);
        }
    };

    const currentPageData = schoolImageData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <div className="page-wrapper">
                <div className="content">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item"><Link to="/schools">City Profile</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Schools</li>
                        </ol>
                    </nav>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card-box">
                                <div className="card-block">
                                    <div className="row">
                                        <div className="col-sm-4 col-3">
                                            <h4 className="page-title">Schools</h4>
                                        </div>
                                        <div className="col-sm-8 col-9 text-right m-b-20">
                                            <Link to="/add-schools" className="btn btn-primary btn-rounded float-right"><i className="fa fa-plus"></i> Add Schools</Link>
                                        </div>
                                    </div>
                                    <div className="table-responsive">
                                        <table className="table table-bordered m-b-0">
                                            <thead>
                                                <tr>
                                                    <th width="10%">Sr. No.</th>
                                                    <th>School Names </th>
                                                    <th>Address</th>
                                                    <th>Medium</th>
                                                    <th width="15%">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {schoolData.map((item, index) => (
                                                    <tr key={item.id}>
                                                        <td>{index + 1}</td>
                                                        <td>{item.schoolName}</td>
                                                        <td>{item.address}</td>
                                                        <td>{item.medium}</td>
                                                        <td>
                                                            <button
                                                                onClick={() => {
                                                                    setSelectedItem(item);
                                                                    setModalType("school"); // Set the type to "co"
                                                                    setShowDeleteModal(true);
                                                                }}
                                                                className="btn btn-danger btn-sm m-t-10"
                                                            >
                                                                Delete
                                                            </button>
                                                            <button
                                                                onClick={() => openEditModal(item, "school")}
                                                                className="btn btn-success btn-sm m-t-10"
                                                            >
                                                                Edit
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className="card-block mt-5">
                                    <div className="row">
                                        <div className="col-sm-4 col-3">
                                            <h4 className="page-title">School Photos</h4>
                                        </div>
                                        <div className="col-sm-8 col-9 text-right m-b-20">
                                            <Link to="/add-schools" className="btn btn-primary btn-rounded float-right"><i className="fa fa-plus"></i> Add Photos</Link>
                                        </div>
                                    </div>
                                    <div className="table-responsive">
                                        <table className="table table-bordered m-b-0">
                                            <tbody>
                                                <tr>
                                                    {currentPageData.map((item) => (
                                                        

                                                        <td key={item.id} className="text-center">
                                                            <Link to={`${baseURL}${item.image_path}`} className="glightbox">
                                                                <img width="100px" src={`${baseURL}${item.image_path}`} alt="School" />
                                                            </Link>
                                                            <br />
                                                            <Link
                                                                to="#."
                                                                data-toggle="modal"
                                                                data-target="#deleteModal"
                                                                className="btn btn-danger btn-sm m-t-10"
                                                                onClick={() => {
                                                                    setSelectedItem(item);
                                                                    setModalType("school-image");
                                                                    setShowDeleteModal(true);
                                                                }}
                                                            >
                                                                <i className="fa fa-trash-o" aria-hidden="true"></i>
                                                            </Link>
                                                            <Link
                                                                to="#."
                                                                data-toggle="modal"
                                                                className="btn btn-success btn-sm m-t-10"
                                                                data-target="#editModal"
                                                                onClick={() => openEditModal(item, "school-image")}
                                                            >
                                                                <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                                                            </Link>
                                                        </td>
                                                    ))}

                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div >
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
                                { length: Math.ceil(schoolImageData.length / itemsPerPage) },
                                (_, i) => (
                                    <li
                                        className={`page-item ${currentPage === i + 1 ? "active" : ""
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
                                className={`page-item ${currentPage === Math.ceil(schoolImageData.length / itemsPerPage)
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

                    <div
                        className={`modal fade ${showEditModal ? "show" : ""}`}
                        tabIndex="-1"
                        aria-labelledby="editModalLabel"
                        aria-hidden={!showEditModal}
                        style={{ display: showEditModal ? "block" : "none" }}
                    >
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">
                                        {modalType === "school" ? "Edit School" : "Edit School Image"}
                                    </h5>
                                    <button
                                        type="button"
                                        className="close"
                                        data-dismiss="modal"
                                        aria-label="Close"
                                        onClick={closeModal}
                                    >
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    {modalType === "school" ? (
                                        <div>
                                            <div className="form-group">
                                                <label>Heading</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={editData.heading}
                                                    onChange={(e) =>
                                                        setEditData({ ...editData, heading: e.target.value })
                                                    }
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>School Name</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={editData.schoolName}
                                                    onChange={(e) =>
                                                        setEditData({ ...editData, schoolName: e.target.value })
                                                    }
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Address</label>
                                                <textarea
                                                    className="form-control"
                                                    value={editData.address}
                                                    onChange={(e) =>
                                                        setEditData({ ...editData, address: e.target.value })
                                                    }
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Medium</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={editData.medium}
                                                    onChange={(e) =>
                                                        setEditData({ ...editData, medium: e.target.value })
                                                    }
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        <div>
                                            <div className="form-group">
                                                <label>Image</label>
                                                <input
                                                    type="file"
                                                    className="form-control"
                                                    onChange={handleImageChange}
                                                />
                                                {imagePreview && (
                                                    <div className="mt-3">
                                                        <img src={imagePreview} alt="Preview" width="150" />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-sm btn-secondary" onClick={closeModal}>
                                        Close
                                    </button>
                                    <button type="button" className="btn btn-sm btn-primary" onClick={handleSaveChanges}>
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Delete Modal */}
                    <div
                        className={`modal fade ${showDeleteModal ? "show" : ""}`}
                        tabIndex="-1"
                        aria-labelledby="deleteModalLabel"
                        aria-hidden={!showDeleteModal}
                        style={{ display: showDeleteModal ? "block" : "none" }}
                    >
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Confirm Delete</h5>
                                    <button
                                        type="button"
                                        className="close"
                                        data-dismiss="modal"
                                        aria-label="Close"
                                        onClick={closeModal}
                                    >
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    Are you sure you want to delete this entry?
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-sm btn-secondary" onClick={closeModal}>
                                        Close
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-danger"
                                        onClick={() => handleDelete(selectedItem.id, modalType)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Schools