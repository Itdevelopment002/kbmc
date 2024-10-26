import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { toast, ToastContainer } from "react-toastify"; // Import toastify
import axios from "axios"; // Import axios
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";

function Add_electedwings() {
  const navigate = useNavigate(); // Initialize useNavigate
  // State variables for form fields
  const [correspondentName, setCorrespondentName] = useState("");
  const [wardNo, setWardNo] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [correspondentImage, setCorrespondentImage] = useState(null);

  // Form submission handler
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
      const response = await axios.post(
        "http://localhost:5000/api/elected-wings",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        toast.success("Correspondent added successfully!", { autoClose: 5000 });
        // Reset form fields
        setCorrespondentName("");
        setWardNo("");
        setStartDate("");
        setEndDate("");
        setMobileNo("");
        setCorrespondentImage(null); // Reset image state

        // Reset the file input value
        document.getElementById("userfile").value = null; // Clear the input

        setTimeout(() => {
          navigate("/Electedwings");
        }, 5000);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to add correspondent."
      );
    }
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Handling file upload
  const handleFileChange = (e) => {
    setCorrespondentImage(e.target.files[0]);
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/">About KBMC</a>
          </li>
          <li className="breadcrumb-item">
            <a href="/elected-wings">Elected Wings</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Add Correspondent
          </li>
        </ol>
        <div className="row mt-3">
          <div className="col-lg-12">
            <div className="card-box">
              <div className="card-block">
                <div className="row">
                  <div className="col-sm-4 col-3">
                    <h4 className="page-title">Add Correspondent</h4>
                  </div>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="form-group row mt-3">
                    <label className="col-form-label col-md-2">
                      Correspondent Name <span className="text-danger">*</span>
                    </label>
                    <div className="col-md-4">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter Correspondent's Name"
                        value={correspondentName}
                        onChange={(e) => setCorrespondentName(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-group row mt-3">
                    <label className="col-form-label col-md-2">
                      Ward No. <span className="text-danger">*</span>
                    </label>
                    <div className="col-md-4">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter Ward Number"
                        value={wardNo}
                        onChange={(e) => setWardNo(e.target.value)}
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
                    <label className="col-form-label col-md-2">
                      Mobile No. <span className="text-danger">*</span>
                    </label>
                    <div className="col-md-4">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Enter Mobile Number"
                        value={mobileNo}
                        onChange={(e) => setMobileNo(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-group row my-3">
                    <label className="col-form-label col-lg-2">
                      Upload Correspondent Image
                    </label>
                    <div className="col-md-4">
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
}

export default Add_electedwings;
