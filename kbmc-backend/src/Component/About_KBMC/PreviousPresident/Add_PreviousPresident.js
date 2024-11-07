import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from '../../api';
import { toast, ToastContainer } from "react-toastify";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";

const Add_PreviousPresident = () => {
  const [presidentName, setPresidentName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [presidentImage, setPresidentImage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedStartDate = startDate ? formatDate(startDate) : "";
    const formattedEndDate = endDate ? formatDate(endDate) : "";

    const formData = new FormData();
    formData.append("presidentName", presidentName);
    formData.append("startDate", formattedStartDate);
    formData.append("endDate", formattedEndDate);
    formData.append("presidentImage", presidentImage);

    try {
      // Make POST request to your API
      const response = await api.post(
        "/presidents",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("President added successfully!");

      // Reset the form fields
      setPresidentName("");
      setStartDate("");
      setEndDate("");
      setPresidentImage(null);

      document.getElementById("userfile").value = null;

      // Navigate to PreviousChiefOfficer after 5 seconds
      setTimeout(() => {
        navigate("/previous-president");
      }, 5000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding president");
    }
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleFileChange = (e) => {
    setPresidentImage(e.target.files[0]);
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="#.">About KBMC</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/previous-president">Previous Presidents</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Add President
          </li>
        </ol>
        <div className="row">
          <div className="col-lg-12">
            <div className="card-box">
              <div className="card-block">
                <div className="row">
                  <div className="col-sm-4 col-3">
                    <h4 className="page-title">Add President</h4>
                  </div>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="form-group row">
                    <label className="col-form-label col-md-2">
                      President Name <span className="text-danger">*</span>
                    </label>
                    <div className="col-md-4">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter President's Name"
                        value={presidentName}
                        onChange={(e) => setPresidentName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-group row mt-3">
                    <label className="col-form-label col-md-2">
                      Start Date <span className="text-danger">*</span>
                    </label>
                    <div className="cal-icon col-md-4">
                      <Flatpickr
                        id="startDatePicker"
                        className="flatpickr-input form-control"
                        placeholder="Select Start Date"
                        value={startDate}
                        onChange={(date) => setStartDate(date[0])}
                        options={{
                          dateFormat: "d-m-Y", // dd-mm-yyyy format
                          monthSelectorType: "dropdown",
                          prevArrow:
                            '<svg><path d="M10 5L5 10L10 15"></path></svg>',
                          nextArrow:
                            '<svg><path d="M5 5L10 10L5 15"></path></svg>',
                        }}
                      />
                    </div>
                  </div>

                  <div className="form-group row mt-3">
                    <label className="col-form-label col-md-2">
                      End Date <span className="text-danger">*</span>
                    </label>
                    <div className="cal-icon col-md-4">
                      <Flatpickr
                        id="endDatePicker"
                        className="flatpickr-input form-control"
                        placeholder="Select End Date"
                        value={endDate}
                        onChange={(date) => setEndDate(date[0])}
                        options={{
                          dateFormat: "d-m-Y", // dd-mm-yyyy format
                          monthSelectorType: "dropdown",
                          prevArrow:
                            '<svg><path d="M10 5L5 10L10 15"></path></svg>',
                          nextArrow:
                            '<svg><path d="M5 5L10 10L5 15"></path></svg>',
                        }}
                      />
                    </div>
                  </div>
                  <div className="form-group row mt-3">
                    <label className="col-form-label col-lg-2">
                      Upload President Image
                      <span className="text-danger">*</span>
                    </label>
                    <div className="col-md-4 mb-3">
                      <div className="input-group mb-3">
                        <input
                          type="file"
                          id="userfile"
                          name="userfile"
                          className="form-control"
                          onChange={handleFileChange}
                        />
                      </div>
                    </div>
                  </div>
                  <input
                    type="submit"
                    className="btn btn-primary"
                    value="Submit"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Add_PreviousPresident;
