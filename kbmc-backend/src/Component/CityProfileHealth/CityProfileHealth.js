import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap'; // Import Bootstrap Modal and Form
import api from '../api';
import { toast, ToastContainer } from 'react-toastify'; // Import Toast
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";
import ZoneWiseSanitationInspectors from './ZoneWiseSanitationInspectors';

import WardWiseLitigations from './WardWiseLitigations';
import TreatmentFacility from './TreatmentFacility';
import HealthPhotoGallery from './HealthPhotoGallery';

const CityProfileHealth = () => {
  const [works, setWorks] = useState([]);
  const [description, setDescription] = useState('');
  const [showAddNewModal, setShowAddNewModal] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedWork, setSelectedWork] = useState(null);
  const [editData, setEditData] = useState({ id: '', description: '' });

  // Fetch existing works on component mount
  useEffect(() => {
    fetchWorks();
  }, []);

  const fetchWorks = async () => {
    try {
      const response = await api.get('/health_dep_sec');
      setWorks(response.data);
    } catch (error) {
      toast.error('Error fetching works.');
    }
  };

  const handleAddWork = async () => {
    if (description) {
      const newWork = { description };
      try {
        const response = await api.post('/health_dep_sec', newWork);
        setWorks([...works, response.data]);
        setDescription('');
        setShowAddNewModal(false);
        toast.success('Work added successfully!');
      } catch (error) {
        toast.error('Error adding work.');
      }
    }
  };

  const handleDeleteClick = (work) => {
    setSelectedWork(work);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await api.delete(`/health_dep_sec/${selectedWork.id}`);
      setWorks(works.filter(work => work.id !== selectedWork.id));
      toast.success('Work deleted successfully!');
    } catch (error) {
      toast.error('Error deleting work.');
    } finally {
      setDeleteModalOpen(false);
    }
  };

  const handleEditClick = (work) => {
    setEditData(work);
    setShowEditModal(true);
  };
  const handleEditSubmit = async () => {
    try {
        // Ensure the right API endpoint is being hit
        const response = await api.put(`/health_dep_sec/${editData.id}`, {
            description: editData.description, // Ensure you send only the necessary fields
        });

        if (response.status === 200) {
            setWorks(works.map(work => (work.id === editData.id ? response.data : work)));
            toast.success('Work updated successfully!');
        } else {
            toast.error('Failed to update Work.');
        }
    } catch (error) {
        console.error('Error updating work:', error);
        toast.error('Error updating Work.');
    } finally {
        setShowEditModal(false); // Close the edit modal
    }
};


  return (
   <> <div className="page-wrapper">
   <div className="content">
     <nav aria-label="breadcrumb">
       <ol className="breadcrumb">
         <li className="breadcrumb-item">
           <Link to="#.">City Profile</Link>
         </li>
         <li className="breadcrumb-item active" aria-current="page">
           Health
         </li>
       </ol>
     </nav>

     {/* Health Department Section */}
     <div className="row mt-4">
       <div className="col-lg-12 mt-4">
         <div className="card-box">
           <div className="card-block">
             <div className="row align-items-center mb-4">
               <div className="col-sm-6 col-4">
                 <h4 className="page-title">Works under Health Department</h4>
               </div>
               <div className="text-end mb-3">
                 <button
                   onClick={() => setShowAddNewModal(true)}
                   className="btn btn-primary btn-rounded float-right"
                   style={{ borderRadius: "100px" }}
                 >
                   <i className="fa fa-plus"></i> + Add New
                 </button>
               </div>
             </div>

             {/* Display Works */}
             <div className="table-responsive">
               <table className="table table-bordered m-b-0">
                 <thead>
                   <tr>
                     <th width="10%">ID</th>
                     <th>Description</th>
                     <th width="15%">Action</th>
                   </tr>
                 </thead>
                 <tbody>
                   {works.map((item, index) => (
                     <tr key={item.id}>
                       <td>{index + 1}</td>
                       <td>{item.description}</td>
                       <td>
                         <button
                           className="btn btn-danger btn-sm m-t-10"
                           onClick={() => handleDeleteClick(item)}
                         >
                           Delete
                         </button>
                         <button
                           className="btn btn-success btn-sm m-t-10 mx-2"
                           onClick={() => handleEditClick(item)}
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

     {/* Add New Work Modal */}
     {showAddNewModal && (
       <Modal show={showAddNewModal} onHide={() => setShowAddNewModal(false)} centered>
         <Modal.Header closeButton>
           <Modal.Title>Add New Work</Modal.Title>
         </Modal.Header>
         <Modal.Body>
           <Form>
             <Form.Group>
               <Form.Label>Description</Form.Label>
               <Form.Control
                 type="text"
                 placeholder="Enter Description"
                 value={description}
                 onChange={(e) => setDescription(e.target.value)}
               />
             </Form.Group>
           </Form>
         </Modal.Body>
         <Modal.Footer>
           <Button variant="secondary" onClick={() => setShowAddNewModal(false)}>
             Close
           </Button>
           <Button variant="primary" onClick={handleAddWork}>
             Add Work
           </Button>
         </Modal.Footer>
       </Modal>
     )}

     {/* Delete Confirmation Modal */}
     {isDeleteModalOpen && (
       <Modal show={isDeleteModalOpen} onHide={() => setDeleteModalOpen(false)} centered>
         <Modal.Header closeButton>
           <Modal.Title>Delete Work</Modal.Title>
         </Modal.Header>
         <Modal.Body>
           <p>Are you sure you want to delete this work?</p>
         </Modal.Body>
         <Modal.Footer>
           <Button variant="secondary" onClick={() => setDeleteModalOpen(false)}>
             Close
           </Button>
           <Button variant="danger" onClick={handleDeleteConfirm}>
             Delete
           </Button>
         </Modal.Footer>
       </Modal>
     )}

     {/* Edit Work Modal */}
     {showEditModal && (
       <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
         <Modal.Header closeButton>
           <Modal.Title>Edit Work</Modal.Title>
         </Modal.Header>
         <Modal.Body>
           <Form>
             <Form.Group>
               <Form.Label>Description</Form.Label>
               <Form.Control
                 type="text"
                 value={editData.description}
                 onChange={(e) => setEditData({ ...editData, description: e.target.value })}
               />
             </Form.Group>
           </Form>
         </Modal.Body>
         <Modal.Footer>
           <Button variant="secondary" onClick={() => setShowEditModal(false)}>
             Close
           </Button>
           <Button variant="primary" onClick={handleEditSubmit}>
             Save Changes
           </Button>
         </Modal.Footer>
       </Modal>
     )}

     {/* Toast notifications */}
     <ToastContainer />
   </div>
 </div>
 <ZoneWiseSanitationInspectors />
<TreatmentFacility />
 <WardWiseLitigations />
 <HealthPhotoGallery />
   </>
  );
};

export default CityProfileHealth;
