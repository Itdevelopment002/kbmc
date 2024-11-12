import React, { useState } from "react";
import api from "../api"; 
import { Link, useNavigate } from "react-router-dom"; 
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";
const AddPhotoGallery = () => {

    const [photoName, setPhotoName] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const navigate = useNavigate(); 
  
    const handleFileChange = (e) => {
      setSelectedFile(e.target.files[0]);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      if (!selectedFile) {
        toast.error("Please select a file to upload."); 
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
                                <label className="col-form-label col-md-2">Photo Gallery Name</label>
                                <div className="col-md-4">
                                    <input
                                     type="text"
                                      className="form-control form-control-lg"
                                       placeholder=""
                                       value={photoName}
                                       onChange={(e) => setPhotoName(e.target.value)}
                                       />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-form-label col-lg-2">Upload Photo Gallery</label>
                                <div className="col-md-4">
                                    <div className="input-group mb-3">
                                       <input 
                                       type="file" 
                                       id="image" 
                                       name="image" 
                                       className="form-control col-md-12 col-xs-12 userfile"
                                       onChange={handleFileChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <input type="submit" className="btn btn-primary" value="Upload"/>
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