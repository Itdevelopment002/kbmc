import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FaTimes } from 'react-icons/fa'; // Importing a cross icon from react-icons
import axios from 'axios'; // Import Axios for HTTP requests
import {useNavigate } from 'react-router-dom'; // Import useNavigate



const AddMainPage = () => {
  const initialMenuItems = [{ mainMenu: '', subMenus: [''] }];
  const [menuItems, setMenuItems] = useState(initialMenuItems);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [error, setError] = useState(null); // State to hold error messages
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset any previous error

    try {
      const response = await axios.post('http://localhost:5000/api/add-main-menu', {
        menuItems,
      });
      navigate('/');
      setMenuItems(initialMenuItems);
    } catch (err) {
      setError(err.response ? err.response.data.message : 'An error occurred.'); // Handle error
    }
  };

  const handleCancel = () => {
    setShowCancelModal(true); // Show cancel modal
  };

  const handleAddMoreSubMenu = (index) => {
    const newMenuItems = [...menuItems];
    newMenuItems[index].subMenus.push(''); // Add an empty submenu
    setMenuItems(newMenuItems);
  };

  const handleInputChange = (index, field, value) => {
    const newMenuItems = [...menuItems];
    newMenuItems[index][field] = value;
    setMenuItems(newMenuItems);
  };

  const handleSubMenuChange = (index, subIndex, value) => {
    const newMenuItems = [...menuItems];
    newMenuItems[index].subMenus[subIndex] = value; // Update the specific submenu
    setMenuItems(newMenuItems);
  };

  const handleDeleteSubMenu = (index, subIndex) => {
    const newMenuItems = [...menuItems];
    newMenuItems[index].subMenus.splice(subIndex, 1); // Remove the specific submenu
    setMenuItems(newMenuItems);
  };

  const handleCloseSubmitModal = () => setShowSubmitModal(false);
  const handleCloseCancelModal = () => setShowCancelModal(false);

  const handleConfirmCancel = () => {
    window.location.reload(); // Refresh the page
  };

  return (
    <>
      <div className="page-wrapper">
        <div className="content">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/home">Home</a></li>
            <li className="breadcrumb-item"><a href="/main-menu">Main Menu</a></li>
            <li className="breadcrumb-item active" aria-current="page">Add Main</li>
          </ol>
          <div className="row">
            <div className="col-lg-12">
              <div className="card-box">
                <div className="card-block">
                  <div className="row">
                    <div className="col-sm-4 col-3"><h4 className="page-title">Add Main</h4></div>
                    <div className="col-sm-8 col-9 d-flex justify-content-end">
                      <button type="button" className="btn btn-primary" onClick={() => handleAddMoreSubMenu(menuItems.length - 1)}>Add More</button>
                    </div>
                  </div>
                  {error && <div className="alert alert-danger">{error}</div>} {/* Display error message */}
                  <form onSubmit={handleSubmit}>
                    {menuItems.map((item, index) => (
                      <div key={index}>
                        <div className="form-group row" style={{ marginBottom: "10px" }}>
                          <label className="col-form-label col-md-3">Main Menu <span className="text-danger">*</span></label>
                          <div className="col-md-4">
                            <input type="text" className="form-control form-control-lg" value={item.mainMenu} onChange={(e) => handleInputChange(index, 'mainMenu', e.target.value)} />
                          </div>
                        </div>
                        {item.subMenus.map((subMenu, subIndex) => (
                          <div className="form-group row" style={{ marginBottom: "10px" }} key={subIndex}>
                            <label className="col-form-label col-md-3">Sub Menu <span className="text-danger">*</span></label>
                            <div className="col-md-4">
                              <input type="text" className="form-control form-control-lg" value={subMenu} onChange={(e) => handleSubMenuChange(index, subIndex, e.target.value)} />
                            </div>
                            <div className="col-md-1">
                              <button type="button" className="btn btn-danger" onClick={() => handleDeleteSubMenu(index, subIndex)}>
                                <FaTimes /> {/* Cross icon for deleting submenu */}
                              </button>
                            </div>
                          </div>
                        ))}
                        <hr />
                      </div>
                    ))}
                    <button type="submit" className="btn btn-primary" style={{ margin: '10px' }}>Submit</button>
                    <button type="button" className="btn btn-danger" onClick={handleCancel}>Cancel</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Success Modal */}
      <Modal show={showSubmitModal} onHide={handleCloseSubmitModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Submission Successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your form has been submitted successfully!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseSubmitModal}>OK</Button>
        </Modal.Footer>
      </Modal>

      {/* Cancel Confirmation Modal */}
      <Modal show={showCancelModal} onHide={handleCloseCancelModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Cancel Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to cancel and refresh the page?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCancelModal}>No</Button>
          <Button variant="danger" onClick={handleConfirmCancel}>Yes, Refresh</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddMainPage;
