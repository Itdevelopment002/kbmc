import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";
import { Link } from "react-router-dom";

const AddElectedWings = () => {
  const navigate = useNavigate();
  const [correspondentName, setCorrespondentName] = useState("");
  const [wardNo, setWardNo] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [correspondentImage, setCorrespondentImage] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedStartDate = startDate ? formatDate(startDate) : "";
    const formattedEndDate = endDate ? formatDate(endDate) : "";

    const formData = new FormData();
    formData.append("correspondentName", correspondentName);
    formData.append("wardNo", wardNo);
    formData.append("startDate", formattedStartDate);
    formData.append("endDate", formattedEndDate);
    formData.append("mobileNo", mobileNo);
    if (correspondentImage) {
      formData.append("image", correspondentImage);
    }

    try {
      const response = await api.post("/elected-wings", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        setCorrespondentName("");
        setWardNo("");
        setStartDate("");
        setEndDate("");
        setMobileNo("");
        setCorrespondentImage(null);
        document.getElementById("userfile").value = null;
        navigate("/elected-wings");
      }
    } catch (error) {
      console.error("Error updating data", error);
    }
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Handling file upload
  const handleFileChange = (e) => {
    setCorrespondentImage(e.target.files[0]);
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
              <Link to="/elected-wings">Elected Wings</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Add Correspondent
            </li>
          </ol>
          <div className="row">
            <div className="col-lg-12">
              <div className="card-box">
                <div className="card-block">
                  <div className="row">
                    <div className="col-sm-4 col-3">
                      <h4 className="page-title">Add Correspondent</h4>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group row">
                      <label className="col-form-label col-md-2">
                        Correspondent Name{" "}
                        <span className="text-danger">*</span>
                      </label>
                      <div className="col-md-4">
                        <input
                          type="text"
                          className="form-control form-control-md"
                          placeholder="Enter Correspondent's Name"
                          value={correspondentName}
                          onChange={(e) => setCorrespondentName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-form-label col-md-2">
                        Ward No. <span className="text-danger">*</span>
                      </label>
                      <div className="col-md-4">
                        <input
                          type="text"
                          className="form-control form-control-md"
                          placeholder="Enter Ward Number"
                          value={wardNo}
                          onChange={(e) => setWardNo(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="form-group row">
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
                            dateFormat: "d-m-Y",
                            monthSelectorType: "dropdown",
                            prevArrow:
                              '<svg><path d="M10 5L5 10L10 15"></path></svg>',
                            nextArrow:
                              '<svg><path d="M5 5L10 10L5 15"></path></svg>',
                          }}
                        />
                      </div>
                    </div>
                    <div className="form-group row">
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
                            dateFormat: "d-m-Y",
                            monthSelectorType: "dropdown",
                            prevArrow:
                              '<svg><path d="M10 5L5 10L10 15"></path></svg>',
                            nextArrow:
                              '<svg><path d="M5 5L10 10L5 15"></path></svg>',
                          }}
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-form-label col-md-2">
                        Mobile No. <span className="text-danger">*</span>
                      </label>
                      <div className="col-md-4">
                        <input
                          type="text"
                          className="form-control form-control-md"
                          placeholder="Enter Mobile Number"
                          value={mobileNo}
                          onChange={(e) => setMobileNo(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-form-label col-lg-2">
                        Upload Correspondent Image
                      </label>
                      <div className="col-md-4">
                        <input
                          type="file"
                          id="userfile"
                          name="userfile"
                          className="form-control form-control-md"
                          onChange={handleFileChange}
                        />
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
      </div>
    </div>
  );
};

export default AddElectedWings;
