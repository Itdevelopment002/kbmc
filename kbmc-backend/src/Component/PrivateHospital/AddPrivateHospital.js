import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS

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
      const response = await fetch('http://localhost:5000/api/private-hospital', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(hospitalData),
      });

      if (response.ok) {
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
    <div className="page-wrapper">
      <div className="content">
        <form onSubmit={handleSubmit}>
          <div className="row">
            {/* Hospital Name */}
            <div className="col-md-5 mb-3">
              <div className="form-group">
                <label>Hospital Name</label>
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

            {/* Division */}
            <div className="col-md-2 mb-3">
              <div className="form-group">
                <label>Division</label>
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

            {/* Principal Doctor */}
            <div className="col-md-5 mb-3">
              <div className="form-group">
                <label>Principal Doctor's Name</label>
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

            {/* Address */}
            <div className="col-md-6 mb-3">
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

            {/* Phone No. */}
            <div className="col-md-3 mb-3">
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

            {/* Mobile No. */}
            <div className="col-md-3 mb-3">
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

            {/* Number of Beds */}
            <div className="col-md-2 mb-3">
              <div className="form-group">
                <label>No. of Beds</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter number of beds"
                  value={beds}
                  onChange={(e) => setBeds(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Facilities Provided */}
            <div className="col-md-4 mb-3">
              <div className="form-group">
                <label>Facilities Provided</label>
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

            {/* Submit Button */}
            <div className="col-md-12">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </form>
        <ToastContainer /> {/* Add ToastContainer for notifications */}
      </div>
    </div>
  );
};

export default AddPrivateHospital;
