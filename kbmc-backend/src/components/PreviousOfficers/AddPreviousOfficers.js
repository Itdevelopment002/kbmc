import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";

const AddPreviousOfficers = () => {
  const [officerName, setOfficerName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [officerImage, setOfficerImage] = useState("");
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const formattedStartDate = startDate ? formatDate(startDate) : "";
    const formattedEndDate = endDate ? formatDate(endDate) : "";

    const formData = new FormData();
    formData.append("officerName", officerName);
    formData.append("startDate", formattedStartDate);
    formData.append("endDate", formattedEndDate);
    formData.append("officerImage", officerImage);

    try {
      const response = await api.post("/chief-officers", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setOfficerName("");
      setStartDate("");
      setEndDate("");
      setOfficerImage(null);
      document.getElementById("userfile").value = null;
      navigate("/previous-officers");
    } catch (error) {
      console.error("Error adding officer", error);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!officerName.trim()) errors.officerName = "Officer name is required.";
    if (!startDate) errors.startDate = "Start date is required.";
    if (!endDate) errors.endDate = "End date is required.";
    if (!officerImage) errors.officerImage = "Officer image is required.";
    return errors;
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const handleFileChange = (e) => {
    setOfficerImage(e.target.files[0]);
    setErrors((prev) => ({ ...prev, officerImage: "" }));
  };

  const handleFieldChange = (field, value) => {
    if (field === "officerName") setOfficerName(value);
    if (field === "startDate") setStartDate(value);
    if (field === "endDate") setEndDate(value);

    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  return (
    <div>
      <div className="page-wrapper">
        <div className="content">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="#.">About KBMC</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/previous-officers">
                Previous Chief officers of the council
              </Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Add Officer
            </li>
          </ol>
          <div className="row">
            <div className="col-lg-12">
              <div className="card-box">
                <div className="card-block">
                  <div className="row">
                    <div className="col-sm-4 col-3">
                      <h4 className="page-title">Add Officer</h4>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group row">
                      <label className="col-form-label col-md-2">
                        Officer Name <span className="text-danger">*</span>
                      </label>
                      <div className="col-md-4">
                        <input
                          type="text"
                          className={`form-control form-control-md ${
                            errors.officerName ? "is-invalid" : ""
                          }`}
                          placeholder="Enter Officer's Name"
                          value={officerName}
                          onChange={(e) =>
                            handleFieldChange("officerName", e.target.value)
                          }
                        />
                        {errors.officerName && (
                          <span className="text-danger">
                            {errors.officerName}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-form-label col-md-2">
                        Start Date <span className="text-danger">*</span>
                      </label>
                      <div className="cal-icon col-md-4">
                        <Flatpickr
                          id="startDatePicker"
                          className={`flatpickr-input form-control form-control-md ${
                            errors.startDate ? "is-invalid" : ""
                          }`}
                          placeholder="Select Start Date"
                          value={startDate}
                          onChange={(date) =>
                            handleFieldChange("startDate", date[0])
                          }
                          options={{
                            dateFormat: "d-m-Y",
                            monthSelectorType: "dropdown",
                            prevArrow:
                              '<svg><path d="M10 5L5 10L10 15"></path></svg>',
                            nextArrow:
                              '<svg><path d="M5 5L10 10L5 15"></path></svg>',
                          }}
                        />
                        {errors.startDate && (
                          <span className="text-danger">
                            {errors.startDate}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-form-label col-md-2">
                        End Date <span className="text-danger">*</span>
                      </label>
                      <div className="cal-icon col-md-4">
                        <Flatpickr
                          id="endDatePicker"
                          className={`flatpickr-input form-control form-control-md ${
                            errors.endDate ? "is-invalid" : ""
                          }`}
                          placeholder="Select End Date"
                          value={endDate}
                          onChange={(date) =>
                            handleFieldChange("endDate", date[0])
                          }
                          options={{
                            dateFormat: "d-m-Y",
                            monthSelectorType: "dropdown",
                            prevArrow:
                              '<svg><path d="M10 5L5 10L10 15"></path></svg>',
                            nextArrow:
                              '<svg><path d="M5 5L10 10L5 15"></path></svg>',
                          }}
                        />
                        {errors.endDate && (
                          <span className="text-danger">{errors.endDate}</span>
                        )}
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-form-label col-lg-2">
                        Upload Officer Image <span className="text-danger">*</span>
                      </label>
                      <div className="col-md-4">
                        <div className="input-group ">
                          <input
                            type="file"
                            id="userfile"
                            name="userfile"
                            className={`form-control form-control-md ${
                              errors.officerImage ? "is-invalid" : ""
                            }`}
                            onChange={handleFileChange}
                          />
                        </div>
                        {errors.officerImage && (
                          <span className="text-danger">
                            {errors.officerImage}
                          </span>
                        )}
                      </div>
                    </div>
                    <input
                      type="submit"
                      className="btn btn-primary btn-sm"
                      value="Submit"
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPreviousOfficers;
