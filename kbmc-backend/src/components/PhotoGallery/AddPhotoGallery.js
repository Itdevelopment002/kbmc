import React, { useState } from "react";
import api from "../api";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const AddPhotoGallery = () => {

  const [photoName, setPhotoName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});


  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!photoName.trim()) {
      newErrors.photoName = "Photo gallery name is required.";
    }
    if (!selectedFile) {
      newErrors.selectedFile = "Please select a file to upload.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("photoName", photoName);

    try {
      const response = await api.post(
        "/gallerys",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setPhotoName("");
      setSelectedFile(null);
      document.getElementById("image").value = "";
      toast.success("File uploaded successfully!");

      navigate("/photo-gallery");

    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Error uploading file. Please try again.");
    }
  };

  return (
    <>

      <div className="page-wrapper">
        <div className="content">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item"><Link to="/photo-gallery">Photo Gallery</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Add Photo Gallery</li>
          </ol>
          <div className="row">
            <div className="col-lg-12">
              <div className="card-box">
                <div className="card-block">
                  <div className="row">
                    <div className="col-sm-4 col-3">
                      <h4 className="page-title">Add Photo Gallery</h4>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group row">
                      <label className="col-form-label col-md-2">Photo Gallery Name <span className="text-danger">*</span></label>
                      <div className="col-md-4">
                        <input
                          type="text"
                          className={`form-control form-control-lg ${errors.photoName ? "is-invalid" : ""
                            }`}
                          placeholder=""
                          value={photoName}
                          onChange={(e) => {
                            setPhotoName(e.target.value);
                            setErrors((prevErrors) => ({ ...prevErrors, photoName: "" })); // Clear error if any
                          }}
                        />
                        {errors.photoName && (
                          <div className="invalid-feedback">{errors.photoName}</div>
                        )}
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-form-label col-lg-2">Upload Photo Gallery <span className="text-danger">*</span></label>
                      <div className="col-md-4">
                        <div className="input-group mb-3">
                          <input
                            type="file"
                            id="image"
                            name="image"
                            className={`form-control col-md-12 col-xs-12 userfile ${errors.selectedFile ? "is-invalid" : ""
                              }`}
                            onChange={(e) => {
                              handleFileChange(e); // Call the existing file change handler
                              if (e.target.files[0]) {
                                setErrors((prevErrors) => ({ ...prevErrors, selectedFile: "" })); // Clear the error
                              }
                            }}
                          />
                          {errors.selectedFile && (
                            <div className="invalid-feedback">{errors.selectedFile}</div>
                          )}

                        </div>
                      </div>
                    </div>
                    <input type="submit" className="btn btn-primary" value="Upload" />
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

export default AddPhotoGallery