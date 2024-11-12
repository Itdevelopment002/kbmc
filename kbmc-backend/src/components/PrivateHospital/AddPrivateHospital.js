import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from "../api"

const AddPrivateHospital = () => {
    const [hospitalName, setHospitalName] = useState('');
    const [division, setDivision] = useState('West');
    const [principalDoctor, setPrincipalDoctor] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [beds, setBeds] = useState('');
    const [facilities, setFacilities] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const hospitalData = {
            hospitalName,
            division,
            principalDoctor,
            address,
            phoneNo,
            mobileNo,
            beds,
            facilities,
        };

        try {
            const response = await api.post('/private-hospital', hospitalData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });


            if (response.status === 200) {
                toast.success('Hospital added successfully!'); // Show success toast
                // Reset form fields
                setHospitalName('');
                setDivision('West');
                setPrincipalDoctor('');
                setAddress('');
                setPhoneNo('');
                setMobileNo('');
                setBeds('');
                setFacilities('');

                setTimeout(() => {
                    navigate("/private-hospital");
                }, 5000);
            } else {
                toast.error('Failed to add hospital. Please try again.'); // Show error toast
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            toast.error('Error submitting form. Please try again.'); // Show error toast on catch
        }
    };


    return (
        <>
            <div className="page-wrapper">
                <div className="content">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                        <li className="breadcrumb-item active" aria-current="page"><Link to="/private-hospital">Private Hospital</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Add Private Hospital</li>
                    </ol>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="card-box">
                                <div className="card-block">
                                    <div className="row">
                                        <div className="col-sm-4 col-3">
                                            <h4 className="page-title">Add Private Hospital</h4>
                                        </div>
                                    </div>
                                    <form onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-md-5">
                                                <div className="form-group">
                                                    <label>Hospitals Name</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Enter hospital name"
                                                        value={hospitalName}
                                                        onChange={(e) => setHospitalName(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-2">
                                                <div className="form-group">
                                                    <label>Names of Division</label>
                                                    <select
                                                        className="form-control"
                                                        value={division}
                                                        onChange={(e) => setDivision(e.target.value)}
                                                        required
                                                    >
                                                        <option>West</option>
                                                        <option>East</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-5">
                                                <div className="form-group">
                                                    <label>Name of Principal Doctor speciality</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Enter principal doctor's name"
                                                        value={principalDoctor}
                                                        onChange={(e) => setPrincipalDoctor(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group">
                                                    <label>Address</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Enter address"
                                                        value={address}
                                                        onChange={(e) => setAddress(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="form-group">
                                                    <label>Phone No.</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Enter phone number"
                                                        value={phoneNo}
                                                        onChange={(e) => setPhoneNo(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="form-group">
                                                    <label>Mobile No.</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Enter mobile number"
                                                        value={mobileNo}
                                                        onChange={(e) => setMobileNo(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-2">
                                                <div className="form-group">
                                                    <label>No. of Beds</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Enter number of beds"
                                                        value={beds}
                                                        onChange={(e) => setBeds(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <label>Facilities Provided in Hospital</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Enter facilities"
                                                        value={facilities}
                                                        onChange={(e) => setFacilities(e.target.value)}
                                                        required
                                                    />
                                                </div>
                                            </div>

                                        </div>
                                        <input type="submit" className="btn btn-primary" value="Submit" />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default AddPrivateHospital