// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import "react-toastify/dist/ReactToastify.css";
// import api from "../api";

// const PondsAndTalao = () => {
//   const [ponds, setPonds] = useState([]);
//   const [pondImages, setPondImages] = useState([]);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [selectedPonds, setSelectedPonds] = useState(null);
//   const [editedContent, setEditedContent] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   const fetchPonds = async () => {
//     try {
//       const response = await api.get("/ponds-talao");
//       setPonds(response.data);
//     } catch (error) {
//       console.error("Error fetching ponds:", error);
//     }
//   };

//   const fetchPondImages = async () => {
//     try {
//       const response = await api.get("/award-images");
//       setPondImages(response.data);
//     } catch (error) {
//       console.error("Error fetching pond images:", error);
//     }
//   };

//   useEffect(() => {
//     fetchPonds();
//     fetchPondImages();
//   }, []);

//   // Handle delete click
//   const handleDeleteClick = (pondsId) => {
//     setSelectedPonds(pondsId);
//     setModalVisible(true);
//   };

//   // Confirm delete
//   const handleDeleteConfirm = async () => {
//     try {
//       await api.delete(`/ponds-talao/${selectedPonds}`);
//       setPonds(ponds.filter((item) => item.id !== selectedPonds));
//       setModalVisible(false);
//       setSelectedPonds(null);
//     } catch (error) {
//       console.error("Error deleting ponds:", error);
//     }
//   };

//   // Handle edit click
//   const handleEditClick = (pondsItem) => {
//     setSelectedPonds(pondsItem.id);
//     setEditedContent(pondsItem.name);
//     setShowEditModal(true);
//   };

//   // Save edited pond
//   const handleSaveEdit = async () => {
//     try {
//       await api.put(`/ponds-talao/${selectedPonds}`, { name: editedContent });
//       setPonds(
//         ponds.map((item) =>
//           item.id === selectedPonds ? { ...item, name: editedContent } : item
//         )
//       );
//       setShowEditModal(false);
//       setSelectedPonds(null);
//       setEditedContent("");
//     } catch (error) {
//       console.error("Error updating ponds:", error);
//     }
//   };

//   const currentPageData = ponds.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   return (
//     <>
//       <div className="page-wrapper">
//         <div className="content">
//           <nav aria-label="breadcrumb">
//             <ol className="breadcrumb">
//               <li className="breadcrumb-item">
//                 <Link to="/ponds-talao">City Profile</Link>
//               </li>
//               <li className="breadcrumb-item active" aria-current="page">
//                 Ponds and Talao
//               </li>
//             </ol>
//           </nav>
//           <div className="row">
//             <div className="col-lg-12">
//               <div className="card-box">
//                 <div className="card-block">
//                   <div className="row">
//                     <div className="col-sm-4 col-3">
//                       <h4 className="page-title">Ponds and Talao</h4>
//                     </div>
//                     <div className="col-sm-8 col-9 text-right m-b-20">
//                       <Link
//                         to="/add-ponds-talao"
//                         className="btn btn-primary btn-rounded float-right"
//                       >
//                         <i className="fa fa-plus"></i> Add Ponds and Talao
//                       </Link>
//                     </div>
//                   </div>
//                   <div className="table-responsive">
//                     <table className="table table-bordered m-b-0">
//                       <thead>
// <tr>
//   <th width="10%">Sr. No.</th>
//   <th>Talao Name</th>
//   <th width="15%">Action</th>
// </tr>
//                       </thead>
//                       <tbody>
//                         {currentPageData.length > 0 ? (
//                           currentPageData.map((item, index) => (
//                             <tr key={item.id}>
//                               <td>
//                                 {(currentPage - 1) * itemsPerPage + index + 1}
//                               </td>
//                               <td>{item.name}</td>
//                               <td>
//                                 <button
//                                   className="btn btn-danger btn-sm "
//                                   onClick={() => handleDeleteClick(item.id)}
//                                 >
//                                   Delete
//                                 </button>
//                                 <button
//                                   className="btn btn-success btn-sm"
//                                   onClick={() => handleEditClick(item)}
//                                 >
//                                   Edit
//                                 </button>
//                               </td>
//                             </tr>
//                           ))
//                         ) : (
//                           <tr>
//                             <td colSpan="3" style={{ textAlign: "center" }}>
//                               No ponds available
//                             </td>
//                           </tr>
//                         )}
//                       </tbody>
//                     </table>
//                   </div>
//                   <div className="mt-4">
//                     <ul className="pagination">
//                       <li
//                         className={`page-item ${
//                           currentPage === 1 ? "disabled" : ""
//                         }`}
//                       >
//                         <button
//                           className="page-link"
//                           onClick={() => setCurrentPage(currentPage - 1)}
//                         >
//                           Previous
//                         </button>
//                       </li>
//                       {Array.from(
//                         { length: Math.ceil(ponds.length / itemsPerPage) },
//                         (_, i) => (
//                           <li
//                             className={`page-item ${
//                               currentPage === i + 1 ? "active" : ""
//                             }`}
//                             key={i}
//                           >
//                             <button
//                               className="page-link"
//                               onClick={() => setCurrentPage(i + 1)}
//                             >
//                               {i + 1}
//                             </button>
//                           </li>
//                         )
//                       )}
//                       <li
//                         className={`page-item ${
//                           currentPage === Math.ceil(ponds.length / itemsPerPage)
//                             ? "disabled"
//                             : ""
//                         }`}
//                       >
//                         <button
//                           className="page-link"
//                           onClick={() => setCurrentPage(currentPage + 1)}
//                         >
//                           Next
//                         </button>
//                       </li>
//                     </ul>
//                   </div>
//                   <div className="row mt-5">
//                     <div className="col-sm-4 col-3">
//                       <h4 className="page-title">Ponds and Talao Images</h4>
//                     </div>
//                     <div className="col-sm-8 col-9 text-right m-b-20">
//                       <Link
//                         to="/add-ponds-images"
//                         className="btn btn-primary btn-rounded float-right"
//                       >
//                         <i className="fa fa-plus"></i> Add Ponds Images
//                       </Link>
//                     </div>
//                   </div>
//                   <div className="table-responsive">
//                     <table className="table table-bordered m-b-0">
//                       <thead>
//                         <tr>
//                           <th width="10%">Sr. No.</th>
//                           <th>Talao Image</th>
//                           <th width="15%">Action</th>
//                         </tr>
//                       </thead>
//                       <tbody>
//                         {currentPageData.length > 0 ? (
//                           currentPageData.map((item, index) => (
//                             <tr key={item.id}>
//                               <td>
//                                 {(currentPage - 1) * itemsPerPage + index + 1}
//                               </td>
//                               <td>{item.name}</td>
//                               <td>
//                                 <button
//                                   className="btn btn-danger btn-sm "
//                                   onClick={() => handleDeleteClick(item.id)}
//                                 >
//                                   Delete
//                                 </button>
//                                 <button
//                                   className="btn btn-success btn-sm"
//                                   onClick={() => handleEditClick(item)}
//                                 >
//                                   Edit
//                                 </button>
//                               </td>
//                             </tr>
//                           ))
//                         ) : (
//                           <tr>
//                             <td colSpan="3" style={{ textAlign: "center" }}>
//                               No ponds available
//                             </td>
//                           </tr>
//                         )}
//                       </tbody>
//                     </table>
//                   </div>
//                   <div className="mt-4">
//                     <ul className="pagination">
//                       <li
//                         className={`page-item ${
//                           currentPage === 1 ? "disabled" : ""
//                         }`}
//                       >
//                         <button
//                           className="page-link"
//                           onClick={() => setCurrentPage(currentPage - 1)}
//                         >
//                           Previous
//                         </button>
//                       </li>
//                       {Array.from(
//                         { length: Math.ceil(ponds.length / itemsPerPage) },
//                         (_, i) => (
//                           <li
//                             className={`page-item ${
//                               currentPage === i + 1 ? "active" : ""
//                             }`}
//                             key={i}
//                           >
//                             <button
//                               className="page-link"
//                               onClick={() => setCurrentPage(i + 1)}
//                             >
//                               {i + 1}
//                             </button>
//                           </li>
//                         )
//                       )}
//                       <li
//                         className={`page-item ${
//                           currentPage === Math.ceil(ponds.length / itemsPerPage)
//                             ? "disabled"
//                             : ""
//                         }`}
//                       >
//                         <button
//                           className="page-link"
//                           onClick={() => setCurrentPage(currentPage + 1)}
//                         >
//                           Next
//                         </button>
//                       </li>
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Delete Modal */}
//           {modalVisible && (
//             <div
//               className="modal fade show d-block"
//               tabIndex="-1"
//               role="dialog"
//             >
//               <div
//                 className="modal-dialog modal-dialog-centered"
//                 role="document"
//               >
//                 <div className="modal-content">
//                   <div className="modal-body">
//                     <h4>Are you sure you want to delete this item?</h4>
//                   </div>
//                   <div className="modal-footer">
//                     <button
//                       type="button"
//                       className="btn btn-sm btn-secondary"
//                       onClick={() => setModalVisible(false)}
//                     >
//                       Close
//                     </button>
//                     <button
//                       type="button"
//                       className="btn btn-sm btn-danger"
//                       onClick={handleDeleteConfirm}
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Edit Modal */}
//           {showEditModal && (
//             <div
//               className="modal fade show d-block"
//               tabIndex="-1"
//               role="dialog"
//             >
//               <div
//                 className="modal-dialog modal-dialog-centered"
//                 role="document"
//               >
//                 <div className="modal-content">
//                   <div className="modal-header">
//                     <h5 className="modal-title">Edit Talao Name</h5>
//                     <button
//                       type="button"
//                       className="close"
//                       aria-label="Close"
//                       onClick={() => setShowEditModal(false)}
//                     >
//                       <span aria-hidden="true">&times;</span>
//                     </button>
//                   </div>
//                   <div className="modal-body">
//                     <input
//                       type="text"
//                       className="form-control"
//                       value={editedContent}
//                       onChange={(e) => setEditedContent(e.target.value)}
//                     />
//                   </div>
//                   <div className="modal-footer">
//                     <button
//                       type="button"
//                       className="btn btn-sm btn-secondary"
//                       onClick={() => setShowEditModal(false)}
//                     >
//                       Close
//                     </button>
//                     <button
//                       type="button"
//                       className="btn btn-sm btn-primary"
//                       onClick={handleSaveEdit}
//                     >
//                       Save changes
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default PondsAndTalao;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GLightbox from "glightbox";
import "glightbox/dist/css/glightbox.min.css";
import api, { baseURL } from "../api";

const PondsAndTalao = () => {
  const [pondData, setPondData] = useState([]);
  const [pondImageData, setPondImageData] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [editData, setEditData] = useState({});
  const [imagePreview, setImagePreview] = useState("");
  useEffect(() => {
    fetchPondData();
    fetchPondImageData();
  }, []);

  useEffect(() => {
    const lightbox = GLightbox({
      selector: ".glightbox",
    });
    return () => {
      lightbox.destroy();
    };
  }, [pondImageData]);

  const fetchPondData = async () => {
    try {
      const response = await api.get("/ponds-talao");
      setPondData(response.data);
    } catch (error) {
      toast.error("Failed to fetch pond data.");
    }
  };

  const fetchPondImageData = async () => {
    try {
      const response = await api.get("/pond-images");
      setPondImageData(response.data);
    } catch (error) {
      toast.error("Failed to fetch Pond Images.");
    }
  };

  const handleDelete = async (id, type) => {
    try {
      if (type === "pond") {
        await api.delete(`/ponds-talao/${id}`);
        setPondData((prevData) => prevData.filter((item) => item.id !== id));
      } else if (type === "pondImage") {
        await api.delete(`/pond-images/${id}`);
        setPondImageData((prevData) =>
          prevData.filter((item) => item.id !== id)
        );
      }
      toast.success(
        `${type === "pond" ? "Pond" : "Pond image"} deleted successfully.`
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
      type === "pond"
        ? { name: item.name }
        : { ...item }
    );
    setImagePreview(type === "pondImage" ? `${baseURL}${item.image_path}` : "");
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
      if (modalType === "pond") {
        await api.put(`/ponds-talao/${selectedItem.id}`, {
          name: editData.name,
        });
        setPondData(
          pondData.map((item) =>
            item.id === selectedItem.id
              ? {
                  ...item,
                  name: editData.name,
                }
              : item
          )
        );
        fetchPondData();
      } else if (modalType === "pondImage") {
        const formData = new FormData();
        if (editData.imageFile) {
          formData.append("pondImage", editData.imageFile);
        }

        await api.put(`/pond-images/${selectedItem.id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setPondImageData(
          pondImageData.map((item) =>
            item.id === selectedItem.id ? { ...item, ...editData } : item
          )
        );
        fetchPondImageData();
      }
      toast.success(
        `${modalType === "pond" ? "Pond" : "Pond image"} updated successfully.`
      );
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
        setEditData({ ...editData, imageFile: file });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div className="page-wrapper">
        <div className="content">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="#.">City Profile</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Ponds and Talao
              </li>
            </ol>
          </nav>
          <div className="row">
            <div className="col-lg-12">
              <div className="card-box">
                <div className="card-block">
                  <div className="row">
                    <div className="col-sm-4 col-3">
                      <h4 className="page-title">Ponds and Talao</h4>
                    </div>
                    <div className="col-sm-8 col-9 text-right m-b-20">
                      <Link
                        to="/add-ponds-talao"
                        className="btn btn-primary btn-rounded float-right"
                      >
                        <i className="fa fa-plus"></i> Add Ponds and Talao
                      </Link>
                    </div>
                  </div>
                  <div className="table-responsive">
                    <table className="table table-bordered m-b-0">
                      <thead>
                        <tr>
                          <th width="10%">Sr. No.</th>
                          <th>Talao Name</th>
                          <th width="15%">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pondData.length > 0 ? (
                          pondData.map((item, index) => (
                            <tr key={item.id}>
                              <td>{index + 1}</td>
                              <td>{item.name}</td>
                              <td>
                                <button
                                  onClick={() => openEditModal(item, "pond")}
                                  className="btn btn-success btn-sm m-t-10"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => {
                                    setSelectedItem(item);
                                    setModalType("pond");
                                    setShowDeleteModal(true);
                                  }}
                                  className="btn btn-danger btn-sm m-t-10"
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="4">No Pond Data Available</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  <div className="row m-t-50">
                    <div className="col-sm-4 col-3">
                      <h4 className="page-title">Ponds and Talao Images</h4>
                    </div>
                    <div className="col-sm-8 col-9 text-right m-b-20">
                      <Link
                        to="/add-pond-images"
                        className="btn btn-primary btn-rounded float-right"
                      >
                        <i className="fa fa-plus"></i> Add Talao Images
                      </Link>
                    </div>
                  </div>
                  <div className="table-responsive m-t-10">
                    <table className="table table-bordered m-b-0">
                      <thead>
                        <tr>
                          <th width="10%">Sr. No.</th>
                          <th>Talao Image</th>
                          <th width="15%">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pondImageData.length > 0 ? (
                          pondImageData.map((item, index) => (
                            <tr key={item.id}>
                              <td>{index + 1}</td>
                              <td>
                                <Link
                                  className="glightbox"
                                  to={`${baseURL}${item.image_path}`}
                                >
                                  <img
                                    src={`${baseURL}${item.image_path}`}
                                    alt={item.coName}
                                    style={{
                                      width: "100px",
                                    }}
                                  />
                                </Link>
                              </td>
                              <td>
                                <button
                                  onClick={() =>
                                    openEditModal(item, "pondImage")
                                  }
                                  className="btn btn-success btn-sm m-t-10 mx-1"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => {
                                    setSelectedItem(item);
                                    setModalType("pondImage");
                                    setShowDeleteModal(true);
                                  }}
                                  className="btn btn-danger btn-sm m-t-10"
                                >
                                  Delete
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="3">No Pond Images Data Available</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
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
                    <h5 className="modal-title">
                      {modalType === "pond"
                        ? "Edit Ponds and Talao"
                        : "Edit Ponds and Talao Image"}
                    </h5>
                  </div>
                  <div className="modal-body">
                    {modalType === "pond" ? (
                      <>
                        <div className="form-group">
                          <label htmlFor="name">Talao Name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="name"
                            value={editData.name}
                            onChange={(e) =>
                              setEditData({
                                ...editData,
                                name: e.target.value,
                              })
                            }
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="form-group">
                          <label htmlFor="pondImage">Talao Image</label>
                          <input
                            type="file"
                            className="form-control"
                            id="pondImage"
                            onChange={handleImageChange}
                          />
                          {imagePreview && (
                            <img
                              src={imagePreview}
                              alt="Preview"
                              style={{
                                width: "100px",
                                marginTop: "10px",
                              }}
                            />
                          )}
                        </div>
                      </>
                    )}
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      onClick={handleSaveChanges}
                    >
                      Save Changes
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
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(selectedItem.id, modalType)}
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

export default PondsAndTalao;
