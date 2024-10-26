import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap'; // Import Modal and Button from react-bootstrap

const ContactUs = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null); // To track which feedback to delete

  const feedbacks = [
    {
      id: 1,
      fullName: 'Nishant Makam',
      mobileNo: '9988776655',
      subject: 'Tax Enquiry',
      email: 'email@gmail.com',
      feedbackDescription: 'Feedback Description Here',
    },
    {
      id: 2,
      fullName: 'Nishant Makam',
      mobileNo: '9988776655',
      subject: 'Tax Enquiry',
      email: 'email@gmail.com',
      feedbackDescription: 'Feedback Description Here',
    },
  ];

  const handleDeleteModalOpen = (feedbackId) => {
    setSelectedFeedback(feedbackId);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    console.log(`Feedback with ID ${selectedFeedback} deleted.`);
    setShowDeleteModal(false);
    setSelectedFeedback(null);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setSelectedFeedback(null);
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="#.">Home</a></li>
            <li className="breadcrumb-item active" aria-current="page">Contact Us</li>
          </ol>
        </nav>
        <div className="row">
          <div className="col-lg-12">
            <div className="card-box">
              <div className="card-block">
                <div className="row">
                  <div className="col-sm-4 col-3">
                    <h4 className="page-title">Contact Us</h4>
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="table table-bordered m-b-0">
                    <thead>
                      <tr>
                        <th width="10%">Sr. No.</th>
                        <th>Full Name</th>
                        <th>Mobile No.</th>
                        <th>Subject</th>
                        <th>Email Address</th>
                        <th>Feedback</th>
                        <th width="15%">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {feedbacks.map((feedback, index) => (
                        <tr key={feedback.id}>
                          <td>{index + 1}</td>
                          <td>{feedback.fullName}</td>
                          <td>{feedback.mobileNo}</td>
                          <td>{feedback.subject}</td>
                          <td>{feedback.email}</td>
                          <td>{feedback.feedbackDescription}</td>
                          <td>
                            <button
                              className="btn btn-primary btn-sm m-t-10"
                              onClick={() => handleDeleteModalOpen(feedback.id)}
                            >
                              Follow Up
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
  );
};

export default ContactUs;
