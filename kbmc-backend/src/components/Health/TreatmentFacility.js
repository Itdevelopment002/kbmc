import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import api from '../api';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TreatmentFacility = () => {
    const [facilities, setFacilities] = useState([]);
    const [name, setName] = useState('');
    const [loc, setLoc] = useState('');
    const [capacity, setCapacity] = useState('');
    const [intake, setIntake] = useState('');
    const [output, setOutput] = useState('');
    const [showAddNewModal, setShowAddNewModal] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedFacility, setSelectedFacility] = useState(null);
    const [editData, setEditData] = useState({ id: '', name: '', loc: '', capacity: '', intake: '', output: '' });

    useEffect(() => {
        fetchFacilities();
    }, []);

    const fetchFacilities = async () => {
        try {
            const response = await api.get('/treatment_facility');
            setFacilities(response.data);
        } catch (error) {
            toast.error('Error fetching treatment facilities.');
        }
    };

    const handleAddFacility = async () => {
        if (name && loc && capacity && intake && output) {
            const newFacility = { name, loc, capacity, intake, output };
            try {
                const response = await api.post('/treatment_facility', newFacility);
                setFacilities([...facilities, response.data]);
                resetForm();
                setShowAddNewModal(false);
                toast.success('Facility added successfully!');
            } catch (error) {
                toast.error('Error adding facility.');
            }
        }
    };

    const handleDeleteClick = (facility) => {
        setSelectedFacility(facility);
        setDeleteModalOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!selectedFacility) return; // Check before proceeding

        try {
            await api.delete(`/treatment_facility/${selectedFacility.id}`);
            setFacilities(facilities.filter(facility => facility.id !== selectedFacility.id));
            toast.success('Facility deleted successfully!');
        } catch (error) {
            toast.error('Error deleting facility.');
        } finally {
            setDeleteModalOpen(false);
        }
    };

    const handleEditClick = (facility) => {
        if (facility) {
            setEditData(facility);
            setShowEditModal(true);
        }
    };

    const handleEditSubmit = async () => {
        if (!editData.id) return; // Prevent proceeding if no ID is set
        try {
            const response = await api.put(`/treatment_facility/${editData.id}`, editData);
            setFacilities(facilities.map(facility => (facility.id === editData.id ? response.data : facility)));
            toast.success('Facility updated successfully!');
        } catch (error) {
            toast.error('Error updating facility.');
        } finally {
            setShowEditModal(false);
        }
    };

    const resetForm = () => {
        setName('');
        setLoc('');
        setCapacity('');
        setIntake('');
        setOutput('');
    };
    return (
        <>
            <div className="row">
                <div className="col-lg-12">
                    <div className="card-box">
                        <div className="card-block">
                            <div className="row">
                                <div className="col-sm-4 col-3">
                                    <h4 className="page-title">Treatment Facility</h4>
                                </div>
                                <div className="col-sm-8 col-9 text-right m-b-20">
                                    <button onClick={() => setShowAddNewModal(true)} className="btn btn-primary btn-rounded float-right">
                                        <i className="fa fa-plus"></i> Add New
                                    </button>
                                </div>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-bordered m-b-0">
                                    <thead>
                                        <tr>
                                            <th width="10%">Sr. No.</th>
                                            <th>Name of the Plant</th>
                                            <th>Location of the Plant</th>
                                            <th>Designed Plant Capacity (MTD)</th>
                                            <th>Present waste Intake (MTD)</th>
                                            <th>Output of plant</th>
                                            <th width="15%">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {facilities.map((item, index) => (
                                            <tr key={item.id}>
                                                <td>{index + 1}</td>
                                                <td>{item.name}</td>
                                                <td>{item.loc}</td>
                                                <td>{item.capacity}</td>
                                                <td>{item.intake}</td>
                                                <td>{item.output}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-danger btn-sm m-t-10"
                                                        onClick={() => handleDeleteClick(item)}
                                                    >
                                                        Delete
                                                    </button>
                                                    <button
                                                        className="btn btn-success btn-sm m-t-10"
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

            <div className={`modal ${showAddNewModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: showAddNewModal ? 'block' : 'none' }}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add New Treatment Facility</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setShowAddNewModal(false)}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" className="form-control" value={name} onChange={e => setName(e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <label>Location</label>
                                    <input type="text" className="form-control" value={loc} onChange={e => setLoc(e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <label>Capacity</label>
                                    <input type="number" className="form-control" value={capacity} onChange={e => setCapacity(e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <label>Intake</label>
                                    <input type="number" className="form-control" value={intake} onChange={e => setIntake(e.target.value)} required />
                                </div>
                                <div className="form-group">
                                    <label>Output</label>
                                    <input type="text" className="form-control" value={output} onChange={e => setOutput(e.target.value)} required />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => setShowAddNewModal(false)}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleAddFacility}>Add Facility</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            <div className={`modal ${isDeleteModalOpen ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: isDeleteModalOpen ? 'block' : 'none' }}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Confirm Deletion</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setDeleteModalOpen(false)}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            Are you sure you want to delete this treatment facility?
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => setDeleteModalOpen(false)}>Cancel</button>
                            <button type="button" className="btn btn-danger" onClick={handleDeleteConfirm}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Edit Treatment Facility Modal */}
            <div className={`modal ${showEditModal ? 'show' : ''}`} tabIndex="-1" role="dialog" style={{ display: showEditModal ? 'block' : 'none' }}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Treatment Facility</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setShowEditModal(false)}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label>Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={editData.name}
                                        onChange={e => setEditData({ ...editData, name: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Location</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={editData.loc}
                                        onChange={e => setEditData({ ...editData, loc: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Capacity</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={editData.capacity}
                                        onChange={e => setEditData({ ...editData, capacity: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Intake</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        value={editData.intake}
                                        onChange={e => setEditData({ ...editData, intake: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Output</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={editData.output}
                                        onChange={e => setEditData({ ...editData, output: e.target.value })}
                                        required
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleEditSubmit}>Update Facility</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TreatmentFacility