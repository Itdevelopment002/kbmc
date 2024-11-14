import React, { useState, useEffect } from "react";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Import icons

const AddUsers = () => {
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    department: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();

  const fetchDepartments = async () => {
    try {
      const response = await api.get("/departments");
      setDepartments(response.data);
    } catch (error) {
      console.error("Error fetching departments", error);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear specific field error
    if (fieldErrors[name]) {
      setFieldErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

      const errors = {};
  if (!formData.username) errors.username = "Username is required.";
  if (!formData.password) errors.password = "Password is required.";
  if (!formData.confirmPassword) errors.confirmPassword = "Confirm Password is required.";
  if (!formData.department) errors.department = "Department is required.";
  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = "Passwords do not match. Please try again.";
  }

  if (Object.keys(errors).length > 0) {
    setFieldErrors(errors); // Assuming setFieldErrors sets field-specific errors
    return;
  }

    try {
      const response = await api.post("/users", {
        username: formData.username,
        password: formData.password,
        department: formData.department,
      });
      console.log("User added:", response.data);
      setSuccess(true);
      setError("");
      navigate("/user");
    } catch (error) {
      console.error("There was an error adding the user:", error);
      setError("Error adding user. Please try again.");
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
            <li className="breadcrumb-item active" aria-current="page">
              <Link to="/user">User</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Add User
            </li>
          </ol>
          <div className="row">
            <div className="col-lg-12">
              <div className="card-box">
                <div className="card-block">
                  <div className="row">
                    <div className="col-sm-4 col-3">
                      <h4 className="page-title">Add User</h4>
                    </div>
                  </div>
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>User Name</label>
                          <input
                            type="text"
                            className={`form-control ${
                              fieldErrors.username ? "is-invalid" : ""
                            }`}
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                          />
                          {fieldErrors.username && (
                            <div className="invalid-feedback">
                              {fieldErrors.username}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>Type of Department</label>
                          <select
                            className={`form-control ${
                              fieldErrors.department ? "is-invalid" : ""
                            }`}
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                          >
                            <option value="" disabled>
                              Select Department
                            </option>
                            {departments.map((department) => (
                              <option value={department.name} key={department.id}>
                                {department.name}
                              </option>
                            ))}
                          </select>
                          {fieldErrors.department && (
                            <div className="invalid-feedback">
                              {fieldErrors.department}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>Password</label>
                          <div className="input-group">
                            <input
                              type={showPassword ? "text" : "password"}
                              className={`form-control ${
                              fieldErrors.password ? "is-invalid" : ""
                            }`}
                              name="password"
                              value={formData.password}
                              onChange={handleChange}
                            />
          
                            <span
                              className="input-group-text"
                              onClick={() => setShowPassword(!showPassword)}
                              style={{ cursor: "pointer" }}
                            >
                              {showPassword ? (
                                <AiOutlineEyeInvisible />
                              ) : (
                                <AiOutlineEye />
                              )}
                            </span>
                          </div>
                           {fieldErrors.password && (
                            <div className="invalid-feedback">
                              {fieldErrors.password}
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-group">
                          <label>Confirm Password</label>
                          <div className="input-group">
                            <input
                              type={showConfirmPassword ? "text" : "password"}
                              className="form-control"
                              name="confirmPassword"
                              value={formData.confirmPassword}
                              onChange={handleChange}
                            />
                            <span
                              className="input-group-text"
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                              style={{ cursor: "pointer" }}
                            >
                              {showConfirmPassword ? (
                                <AiOutlineEyeInvisible />
                              ) : (
                                <AiOutlineEye />
                              )}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <input
                      type="submit"
                      className="btn btn-primary"
                      value="Submit"
                    />
                    {success && (
                      <p className="text-success">User added successfully!</p>
                    )}
                    {error && <p className="text-danger">{error}</p>}
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

export default AddUsers;
