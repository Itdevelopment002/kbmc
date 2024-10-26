import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const User = () => {
    const [users, setUsers] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [userToEdit, setUserToEdit] = useState(null);
    const [editUserData, setEditUserData] = useState({ username: '', password: '', department: '' });

    useEffect(() => {
        // Fetch all users on component mount
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/users');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleDeleteClick = (user) => {
        setUserToDelete(user);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/users${userToDelete.id}`);
            setUsers(users.filter(user => user.id !== userToDelete.id)); // Remove the deleted user from state
            setShowDeleteModal(false);
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleEditClick = (user) => {
        setUserToEdit(user);
        setEditUserData(user);  // Populate form with selected user data
        setShowEditModal(true);
    };

    const handleEditSave = async () => {
        try {
            await axios.put(`http://localhost:5000/api/users${userToEdit.id}`, editUserData);
            setUsers(users.map(user => (user.id === userToEdit.id ? { ...user, ...editUserData } : user)));
            setShowEditModal(false);
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    return (
        <div className="page-wrapper">
            <div className="content">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="index.php">Home</a></li>
                    <li className="breadcrumb-item active" aria-current="page">User</li>
                </ol>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card-box">
                            <div className="card-block">
                                <div className="row">
                                    <div className="col-sm-4 col-3">
                                        <h4 className="page-title">User</h4>
                                    </div>
                                    <div className="text-end mb-3">
                                        <Link to="/adduser">
                                            <button className="btn btn-primary">+ Add User</button>
                                        </Link>
                                    </div>
                                </div>
                                <div className="table-responsive datatable">
                                    <table className="table table-bordered m-b-0">
                                        <thead>
                                            <tr>
                                                <th width="10%">Sr. No.</th>
                                                <th>User Name</th>
                                                <th>Password</th>
                                                <th>Type of Department</th>
                                                <th width="20%">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.map((user, index) => (
                                                <tr key={user.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{user.username}</td>
                                                    <td>{user.password}</td>
                                                    <td>{user.department}</td>
                                                    <td>
                                                        <button
                                                            onClick={() => handleEditClick(user)}
                                                            className="btn btn-success btn-sm me-2"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteClick(user)}
                                                            className="btn btn-danger btn-sm"
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="mt-4">
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
                            </div>
                        </div>
                    </div>
                </div>

                {/* Edit Modal */}
                {showEditModal && (
                    <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Edit User</h5>
                                    <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}></button>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <div className="mb-3">
                                            <label className="form-label">Username</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={editUserData.username}
                                                onChange={(e) => setEditUserData({ ...editUserData, username: e.target.value })}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Password</label>
                                            <input
                                                type="password"
                                                className="form-control"
                                                value={editUserData.password}
                                                onChange={(e) => setEditUserData({ ...editUserData, password: e.target.value })}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Department</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={editUserData.department}
                                                onChange={(e) => setEditUserData({ ...editUserData, department: e.target.value })}
                                            />
                                        </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>
                                        Close
                                    </button>
                                    <button type="button" className="btn btn-primary" onClick={handleEditSave}>
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Delete Modal */}
                {showDeleteModal && (
                    <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-body">
                                    <h4>Are you sure you want to delete this item?</h4>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>
                                        Close
                                    </button>
                                    <button type="button" className="btn btn-danger" onClick={handleDeleteConfirm}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default User;
