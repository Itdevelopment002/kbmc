import React, { useState } from "react";
import api from "../api"; 
import { Link, useNavigate } from "react-router-dom"; 
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";

const Add_PhotoGallery = () => {
  const [photoName, setPhotoName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate(); 

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      toast.error("Please select a file to upload."); // Show error toast
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile); // File input name
    formData.append("photoName", photoName); // Pass slider name from state

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
      setTimeout(() => {
        navigate("/photo-gallery"); 
      }, 5000); 
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Error uploading file. Please try again."); // Show error toast
    }
  };

  return (
    <div className="page-wrapper">
      <div className="content">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/photo-gallery">Photo Gallery</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Add Photo Gallery
          </li>
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
                    <label className="col-form-label col-md-3">
                      Photo Gallery Name <span className="text-danger">*</span>
                    </label>
                    <div className="col-md-4 mb-3">
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        value={photoName}
                        onChange={(e) => setPhotoName(e.target.value)}
                        placeholder="Enter photo name"
                      />
                    </div>
                  </div>
                  <div className="form-group row mt-3">
                    <label className="col-form-label col-lg-3">
                      Upload Photo Gallery{" "}
                      <span className="text-danger">*</span>
                    </label>
                    <div className="col-md-4">
                      <div className="input-group mb-3">
                        <input
                          type="file"
                          id="image"
                          name="image"  // Change to match backend field
                          className="form-control col-md-12 col-xs-12"
                          onChange={handleFileChange}
                        />
                      </div>
                    </div>
                  </div>
                  <input
                    type="submit"
                    className="btn btn-primary"
                    value="Upload"
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

export default Add_PhotoGallery;
