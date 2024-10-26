import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom'

const MainMenuTable = () => {
  const [menuData, setMenuData] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newSubMenu, setNewSubMenu] = useState('');

  const fetchMenuData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/main-menus');
      setMenuData(response.data);
    } catch (error) {
      console.error('Error fetching menu data:', error);
    }
  };

  useEffect(() => {
    fetchMenuData();
  }, []);

  // Edit modal open and populate selected menu
  const handleEditClick = (menu) => {
    setSelectedMenu({ ...menu, subMenus: [...menu.subMenus] });
    setShowEditModal(true);
  };

  // Save changes to the main menu and submenus
  const handleSaveChanges = async () => {
    if (!selectedMenu.mainMenu || !selectedMenu.subMenus.length) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/update-main-menu/${selectedMenu.id}`, {
        mainMenu: selectedMenu.mainMenu,
        subMenus: selectedMenu.subMenus.map(sub => sub.subMenu),
      });
      setShowEditModal(false);
      fetchMenuData();
    } catch (error) {
      console.error('Error updating menu:', error);
    }
  };

  // Add new submenu to the selected menu
  const handleAddSubMenu = () => {
    if (newSubMenu) {
      setSelectedMenu(prev => ({
        ...prev,
        subMenus: [...prev.subMenus, { subMenu: newSubMenu }],
      }));
      setNewSubMenu('');
    }
  };

  // Delete submenu from the selected menu
  const handleDeleteSubMenu = (index) => {
    setSelectedMenu(prev => ({
      ...prev,
      subMenus: prev.subMenus.filter((_, i) => i !== index),
    }));
  };

  const handleDeleteClick = (menu) => {
    setSelectedMenu(menu);
    setShowDeleteModal(true);
  };

  // Confirm and delete the selected menu or submenu
  const handleConfirmDelete = async () => {
    try {
      // Delete the main menu along with all its submenus
      await axios.delete(`http://localhost:5000/api/delete-main-menu/${selectedMenu.id}`);

      setShowDeleteModal(false);
      fetchMenuData();
    } catch (error) {
      console.error('Error deleting menu:', error);
    }
  };


  return (
    <div className="container mt-4">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Main Menu</li>
        </ol>
      </nav>
      <h4>Main Menu</h4>
      <div className="text-end mb-3">
        <Link to="/add-main">
          <button className="btn btn-primary">+ Add Main Menu</button>
        </Link>
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Sr. No.</th>
            <th>Main Menu</th>
            <th >Sub Menu</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {menuData.map((item, index) => (
            <React.Fragment key={item.mainMenuId}>
              <tr>
                <td>{index + 1}</td>
                <td>{item.mainMenu}</td>
                <td style={{ paddingLeft: '0px', paddingRight: '0px' }}>
                  {item.subMenus && item.subMenus.length > 0 ? (
                    <ul className="list-unstyled mb-0">
                      {item.subMenus.map((sub, index) => (
                        <React.Fragment key={sub.subMenuId}>
                          <li style={{ paddingLeft: '10px' }}>{sub.subMenu}</li>
                          {index < item.subMenus.length - 1 && <hr />}
                        </React.Fragment>
                      ))}
                    </ul>
                  ) : (
                    "No sub menu"
                  )}
                </td>
                <td>
                  <Button variant="success" onClick={() => handleEditClick(item)}>Edit</Button>{' '}
                  <Button variant="danger" onClick={() => handleDeleteClick(item)}>Delete</Button>
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Main Menu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label className='fw-semibold'>Main Menu</Form.Label>
            <Form.Control
              type="text"
              value={selectedMenu?.mainMenu || ''}
              onChange={(e) =>
                setSelectedMenu((prev) => ({ ...prev, mainMenu: e.target.value }))
              }
            />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label className='fw-semibold'>Sub Menus</Form.Label>
            <ul>
              {selectedMenu?.subMenus.map((subMenu, index) => (
                <li key={index} className="d-flex justify-content-between">
                  <span>{subMenu.subMenu}</span>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeleteSubMenu(index)}
                    className='mb-1'
                  >
                    Delete
                  </Button>
                </li>
              ))}
            </ul>
            <Form.Control
              type="text"
              placeholder="New Sub Menu"
              value={newSubMenu}
              onChange={(e) => setNewSubMenu(e.target.value)}
              className="mt-2"
            />
            <Button variant="primary" onClick={handleAddSubMenu} className="mt-2">
              Add Sub Menu
            </Button>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this menu?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Confirm Delete
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};

export default MainMenuTable;
