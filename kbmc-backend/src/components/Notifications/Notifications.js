import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [remark, setRemark] = useState("");

  // Fetch notifications from the API
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await api.get("/admin-notifications");
        setNotifications(response.data.reverse());
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
    fetchNotifications();
  }, []);

  // Approve functionality
  const handleApprove = async (id, description) => {
    try {
      await api.delete(`/admin-notifications/${id}`);
      setNotifications(notifications.filter((notification) => notification.id !== id));

      const notificationData = {
        heading: "Approved",
        description: `${description} has been successfully approved.`,
        readed: 0, // Default unread status
      };

      // Post the notification data to the notification API
      const notificationResponse = await api.post("/notification", notificationData);
      console.log("Notification API response:", notificationResponse.data);
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  // Disapprove functionality
  const handleDisapprove = (id) => {
    setSelectedNotification(id);
  };

  const handleModalClose = () => {
    setSelectedNotification(null);
    setRemark("");
  };

  const handleDisapproveSubmit = async () => {
    try {
      await api.put(`/admin-notifications/${selectedNotification}`, { remark });
      setNotifications(
        notifications.map((notification) =>
          notification.id === selectedNotification
            ? { ...notification, remark }
            : notification
        )
      );
      handleModalClose();
    } catch (error) {
      console.error("Error updating notification:", error);
    }
  };

  // Helper function to format date as "29 June 2024"
  const formatDate = (dateString) => {
    if (!dateString) return "Invalid Date";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid Date";

    const options = { day: "2-digit", month: "long", year: "numeric" };
    return date.toLocaleDateString("en-GB", options);
  };

  // Helper function to format time as "01:20:30 PM"
  const formatTime = (timeString) => {
    if (!timeString) return "Invalid Time";

    const timeParts = timeString.split(":");
    if (timeParts.length !== 3) return "Invalid Time";

    const now = new Date();
    now.setHours(timeParts[0]);
    now.setMinutes(timeParts[1]);
    now.setSeconds(timeParts[2]);

    if (isNaN(now.getTime())) return "Invalid Time";

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return `${hours}:${minutes}:${seconds} ${ampm}`;
  };

  return (
    <div>
      <div className="page-wrapper">
        <div className="content">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/">Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Notifications
              </li>
            </ol>
          </nav>
          <div className="row">
            <div className="col-lg-12">
              <div className="card-box">
                <div className="card-block">
                  <div className="row">
                    <div className="col-sm-4 col-3">
                      <h4 className="page-title">Notifications</h4>
                    </div>
                  </div>
                  <div className="table-responsive">
                    <table className="table table-bordered m-b-0">
                      <thead>
                        <tr>
                          <th width="8%">Sr. No.</th>
                          <th>Notification Description</th>
                          <th>Date</th>
                          <th>Time</th>
                          <th>Remark</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {notifications.map((notification, index) => (
                          <tr key={notification.id}>
                            <td>{index + 1}</td>
                            <td>{notification.description}</td>
                            <td>{formatDate(notification.date)}</td>
                            <td>{formatTime(notification.time)}</td>
                            <td>{notification.remark}</td>
                            <td>
                              <button
                                className="btn btn-success btn-sm m-t-10"
                                onClick={() => handleApprove(notification.id, notification.description)}
                              >
                                Approve
                              </button>{" "}
                              <button
                                className="btn btn-danger btn-sm m-t-10"
                                onClick={() => handleDisapprove(notification.id)}
                              >
                                Disapprove
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

          {/* Disapprove Modal */}
          {selectedNotification && (
            <div
              className="modal fade show"
              style={{ display: "block", background: "rgba(0, 0, 0, 0.5)" }}
            >
              <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Disapprove Notification</h5>
                    <button
                      type="button"
                      className="close"
                      onClick={handleModalClose}
                    >
                      &times;
                    </button>
                  </div>
                  <div className="modal-body">
                    <label htmlFor="remark">Remark:</label>
                    <input
                      type="text"
                      id="remark"
                      className="form-control"
                      value={remark}
                      onChange={(e) => setRemark(e.target.value)}
                    />
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-sm btn-primary"
                      onClick={handleModalClose}
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn btn-sm btn-danger"
                      onClick={handleDisapproveSubmit}
                    >
                      Disapprove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
