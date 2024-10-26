import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";

const Home_video = () => {
  const [videos, setVideos] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);

  // Fetch all videos from the server
  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/home-videos");
      setVideos(response.data);
    } catch (error) {
      console.error("Error fetching videos:", error);
      toast.error("Error fetching videos");
    }
  };

  const handleDelete = (video) => {
    setSelectedVideo(video);
    setShowDeleteModal(true);
  };

  const handleEdit = (video) => {
    setSelectedVideo(video);
    setShowEditModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedVideo(null);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedVideo(null);
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleSaveEdit = async () => {
    try {
      setIsLoading(true);
      const { description, video_url } = selectedVideo;
      
      // Convert publish_date before sending it to the backend
      const formattedPublishDate = selectedVideo.publish_date
      ? formatDate(selectedVideo.publish_date)
      : "";
  
      await axios.put(
        `http://localhost:5000/api/home-videos/${selectedVideo.id}`,
        { description, publish_date: formattedPublishDate, video_url }
      );
      toast.success("Video updated successfully");
      fetchVideos(); // Refresh video list after editing
    } catch (error) {
      console.error("Error updating video:", error);
      toast.error("Error updating video");
    } finally {
      setIsLoading(false);
      handleCloseEditModal();
    }
  };

  const handleDeleteVideo = async () => {
    try {
      setIsLoading(true);
      await axios.delete(
        `http://localhost:5000/api/home-videos/${selectedVideo.id}`
      );
      toast.success("Video deleted successfully");
      fetchVideos(); // Refresh video list after deleting
    } catch (error) {
      console.error("Error deleting video:", error);
      toast.error("Error deleting video");
    } finally {
      setIsLoading(false);
      handleCloseDeleteModal();
    }
  };

  const getYouTubeVideoId = (url) => {
    const regExp =
      /^.*(youtu.be\/|v\/|\/u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const handleOpenVideoModal = (video) => {
    setSelectedVideo(video);
    setShowVideoModal(true);
  };

  const handleCloseVideoModal = () => {
    setShowVideoModal(false);
    setSelectedVideo(null);
  };

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/index">Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Home Video
              </li>
            </ol>
          </nav>

          <div className="row">
            <div className="col-lg-12">
              <div className="card-box">
                <div className="card-block">
                  <div className="row">
                    <div className="col-sm-4 col-3">
                      <h4 className="page-title">Home Video</h4>
                    </div>
                    <div className="col-sm-8 col-9 text-end mb-3">
                      <Link
                        to="/add_homvideo"
                        className="btn btn-primary btn-rounded float-right"
                        style={{ borderRadius: "100px" }}
                      >
                        <i className="fa fa-plus"></i>+ Add Video
                      </Link>
                    </div>
                  </div>

                  <div className="table-responsive">
                    <table className="table table-bordered m-b-0">
                      <thead>
                        <tr>
                          <th width="10%">Sr. No.</th>
                          <th>Video Description</th>
                          <th>Publish Date</th>
                          <th>Video</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {videos.map((video, index) => (
                          <tr key={video.id}>
                            <td>{index + 1}</td>
                            <td>{video.description}</td>
                            <td>
                              {new Date(video.publish_date)
                                .toLocaleDateString("en-GB", {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                })
                                .replace(/ (\d{4})$/, ", $1")}
                            </td>

                            <td>
                              <button
                                type="button"
                                className="btn btn-link p-0"
                                onClick={() => handleOpenVideoModal(video)} // Open video modal
                              >
                                <img
                                  src={`https://img.youtube.com/vi/${getYouTubeVideoId(
                                    video.video_url
                                  )}/0.jpg`} // Get thumbnail
                                  alt={video.description}
                                  style={{
                                    width: "100px",
                                    height: "56px",
                                    cursor: "pointer",
                                  }}
                                />
                              </button>
                            </td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-danger btn-sm m-t-10"
                                onClick={() => handleDelete(video)}
                              >
                                Delete
                              </button>{" "}
                              <button
                                type="button"
                                className="btn btn-success btn-sm m-t-10"
                                onClick={() => handleEdit(video)}
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
              </div>
            </div>
          </div>

          <div>
            <ul className="pagination">
              <li className="page-item disabled">
                <Link className="page-link" to="#" tabIndex="-1">
                  Previous
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  1
                </Link>
              </li>
              <li className="page-item active">
                <Link className="page-link" to="#">
                  2 <span className="sr-only"></span>
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  3
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" to="#">
                  Next
                </Link>
              </li>
            </ul>
          </div>

          {/* Delete Modal */}
          <Modal
            show={showDeleteModal}
            onHide={handleCloseDeleteModal}
            centered
          >
            <Modal.Body>
              <h4 style={{ textAlign: "center" }}>
                Are you sure you want to delete this item?
              </h4>
            </Modal.Body>
            <Modal.Footer style={{ justifyContent: "center" }}>
              <Button variant="secondary" onClick={handleCloseDeleteModal}>
                Close
              </Button>
              <Button
                variant="danger"
                onClick={handleDeleteVideo}
                disabled={isLoading}
              >
                Delete
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Edit Modal */}
          <Modal show={showEditModal} onHide={handleCloseEditModal} centered>
            <Modal.Header>
              <h5 className="modal-title">Edit Video</h5>
              <button
                type="button"
                className="btn-close"
                onClick={handleCloseEditModal}
              ></button>
            </Modal.Header>
            <Modal.Body>
              <form>
                <div className="mb-3">
                  <label className="form-label">Video Description</label>
                  <input
                    type="text"
                    className="form-control"
                    value={selectedVideo?.description || ""}
                    onChange={(e) =>
                      setSelectedVideo({
                        ...selectedVideo,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Publish Date</label>
                  <Flatpickr
                    value={
                      selectedVideo?.publish_date
                        ? new Date(selectedVideo.publish_date)
                        : null
                    }
                    onChange={(date) =>
                      setSelectedVideo({
                        ...selectedVideo,
                        publish_date: date[0], // Store as YYYY-MM-DD
                      })
                    }
                    className="form-control"
                    options={{ dateFormat: "d-m-Y" }} // Display format as dd-mm-yyyy
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Video Url</label>
                  <input
                    type="text"
                    className="form-control"
                    value={selectedVideo?.video_url || ""}
                    onChange={(e) =>
                      setSelectedVideo({
                        ...selectedVideo,
                        video_url: e.target.value,
                      })
                    }
                  />
                </div>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseEditModal}>
                Close
              </Button>
              <Button
                variant="primary"
                onClick={handleSaveEdit}
                disabled={isLoading}
              >
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Video Modal */}
          <Modal
            show={showVideoModal}
            onHide={handleCloseVideoModal}
            centered
            size="lg"
          >
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
              {selectedVideo && (
                <iframe
                  width="100%"
                  height="400"
                  src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                    selectedVideo.video_url
                  )}`}
                  frameBorder="0"
                  allowFullScreen
                  title={selectedVideo.description}
                ></iframe>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseVideoModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Home_video;
