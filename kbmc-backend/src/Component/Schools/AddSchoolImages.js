import React, { useState } from "react";
import api from "../api";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const AddSchools = () => {
  const [formData, setFormData] = useState({
    schoolPhoto: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      schoolPhoto: files[0], // Get the selected file
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.schoolPhoto) {
      toast.error("Please select an image to upload");
      return;
    }

    const data = new FormData(); // Create FormData object
    data.append("schoolPhoto", formData.schoolPhoto); // Append the selected file

    try {
      const response = await api.post("/school-images", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Handle success
      toast.success("Image Uploaded Successfully!");

      setTimeout(()=>{
        navigate('/schools')
      },5000);

      // Optionally reset form or perform other actions
    } catch (error) {
      // Handle error
      toast.error("Image upload failed. Please try again.");
    }
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="index.php">City Profile</a>
          </li>
          <li className="breadcrumb-item">
            <a href="schools.php">Schools</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Add School Images
          </li>
        </ol>
        <div className="row">
          <div className="col-lg-12">
            <div className="card-box">
              <div className="card-block">
                <div className="row">
                  <div className="col-sm-4 col-3">
                    <h4 className="page-title">Add School Images</h4>
                  </div>
                </div>
                <form action="#" className="pt-3" onSubmit={handleSubmit}>
                  <div className="form-group row">
                    <label className="col-form-label col-lg-2">
                      Upload School Photos
                    </label>
                    <div className="col-md-4 d-flex flex-column">
                      <div className="input-group mb-3">
                        <input
                          type="file"
                          id="schoolPhoto"
                          name="schoolPhoto"
                          className="form-control"
                          onChange={handleChange}
                          accept="image/*" // Only accept image files
                        />
                      </div>
                      <input
                        type="submit"
                        className="btn btn-primary"
                        value="Submit"
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer /> {/* Toastify Container */}
    </div>
  );
};

export default AddSchools;
