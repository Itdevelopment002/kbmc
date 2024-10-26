import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap'; // Import Modal and Button from react-bootstrap

const Notifications = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null); // To track which notification to delete

  const notifications = [
    { id: 1, description: 'Tax Department Added New Content', date: '29 June 2024', time: '01:20:30 PM' },
    { id: 2, description: 'Tax Department Added New Content', date: '29 June 2024', time: '01:20:30 PM' },
    { id: 3, description: 'Tax Department Added New Content', date: '29 June 2024', time: '01:20:30 PM' },
  ];

  const handleDeleteModalOpen = (notificationId) => {
    setSelectedNotification(notificationId);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    console.log(`Notification with ID ${selectedNotification} deleted.`);
    setShowDeleteModal(false);
    setSelectedNotification(null);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedNotification(null);
  };

  return (
    <>
      <div style={{ padding: '20px' }}>
        <div style={{ borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', padding: '20px' }}>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><a href="index.php">Home</a></li>
              <li className="breadcrumb-item active" aria-current="page">Notifications</li>
            </ol>
          </nav>
          <h4 className="page-title" style={{ marginBottom: '20px', color: 'black' }}>Notifications</h4>
          <div style={{ overflowX: 'auto' }}>
            <table className="table table-bordered" style={{ textAlign: 'center', width: '100%' }}>
              <thead>
                <tr style={{ backgroundColor: '#f8f9fa' }}>
                  <th width="8%">Sr. No.</th>
                  <th>Notification Description</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {notifications.map((notification, index) => (
                  <tr
                    key={notification.id}
                    style={{
                      transition: 'background-color 0.2s',
                      cursor: 'pointer',
                      backgroundColor: selectedNotification === notification.id ? 'lightblue' : 'transparent', // Highlight active notification
                    }}
                    onClick={() => setSelectedNotification(notification.id)} // Set active notification on click
                  >
                    <td>{index + 1}</td>
                    <td>{notification.description}</td>
                    <td>{notification.date}</td>
                    <td>{notification.time}</td>
                    <td>
                      <button style={{ marginRight: '5px', backgroundColor: '#28a745', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}>
                        Approve
                      </button>
                      <button
                        style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer' }}
                        onClick={() => handleDeleteModalOpen(notification.id)}
                      >
                        Disapprove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <ul className="pagination">
              <li className="page-item disabled">
                <a className="page-link" href="#" tabIndex="-1">Previous</a>
              </li>
              <li className="page-item"><a className="page-link" href="#">1</a></li>
              <li className="page-item active">
                <a className="page-link" href="#">2 <span className="sr-only"></span></a>
              </li>
              <li className="page-item"><a className="page-link" href="#">3</a></li>
              <li className="page-item">
                <a className="page-link" href="#">Next</a>
              </li>
            </ul>
          </div>

          {/* Delete Modal */}
          <Modal show={showDeleteModal} onHide={handleCloseDeleteModal} centered>
            <Modal.Body>
              <h4 style={{ textAlign: 'center' }}>Are you sure you want to delete this item?</h4>
            </Modal.Body>
            <Modal.Footer style={{ justifyContent: 'center' }}>
              <Button variant="secondary" onClick={handleCloseDeleteModal}>Close</Button>
              <Button variant="danger" onClick={handleDelete}>Delete</Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default Notifications;
