import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { Link } from "react-router-dom";

const AddTermsAndConditions = () => {
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      heading,
      description,
    };

    try {
      const response = await api.post("/terms-and-conditions", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        setHeading("");
        setDescription("");
        navigate("/terms-and-conditions");
      }
    } catch (error) {
      console.error("Error adding terms & conditions:", error);
    }
  };
  return (
    <div>
      <div className="page-wrapper">
        <div className="content">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/terms-and-conditions">Terms & Conditions</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Add Terms & Conditions
            </li>
          </ol>
          <div className="row">
            <div className="col-lg-12">
              <div className="card-box">
                <div className="card-block">
                  <div className="row">
                    <div className="col-sm-4 col-3">
                      <h4 className="page-title">Add Terms & Conditions</h4>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="form-group row">
                      <label className="col-form-label col-md-2">
                        Heading <span className="text-danger">*</span>
                      </label>
                      <div className="col-md-4">
                        <input
                          type="text"
                          className="form-control form-control-md"
                          placeholder="Enter heading"
                          value={heading}
                          onChange={(e) => setHeading(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-form-label col-lg-2">
                        Description<span className="text-danger">*</span>
                      </label>
                      <div className="col-md-4">
                        <div className="input-group mb-3">
                          <textarea
                            className="form-control form-control-md"
                            placeholder="Enter description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            rows="2"
                            required
                          />
                        </div>
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

export default AddTermsAndConditions;
