import React, { useState, useEffect } from "react";
import "./Login.css";
import img from "../../assets/img/kbmc_logo.jpg";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../api";

const Login = ({ onLogin }) => {

  const [departments, setDepartments] = useState([]);
  const [loginType, setLoginType] = useState("admin");
  const [userData, setData] = useState({
    username: "",
    password: "",
    department: "",
  });

  const [errors, setErrors] = useState({});

  const fetchDepartments = async () => {
    try {
      const response = await api.get("/public_disclosure");
      setDepartments(response.data);
    } catch (error) {
      console.error("Error fetching departments", error);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const handleLoginTypeChange = (type) => {
    setLoginType(type);
    setData({
      username: "",
      password: "",
      department: type === "superadmin" ? "Admin" : "", 
    });
    setErrors({});
  };

  const handleChange = (e) => {
    setData({
      ...userData,
      [e.target.name]: e.target.value,
    });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!userData.username) newErrors.username = "Username is required";
    if (!userData.password) newErrors.password = "Password is required";
    if (loginType === "admin" && !userData.department)
      newErrors.department = "Department is required";
    return newErrors;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const endpoint = "/login"; // Use the same endpoint for admin and superadmin
      const response = await api.post(endpoint, userData);
      localStorage.setItem("authToken", response.data.uniqueId); // Storing token
      localStorage.setItem("userData", JSON.stringify(response.data.user));
      onLogin();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response?.data?.msg || "Login failed",
      });
    }
  };

  return (
    <div className="login-page">
      <div className="row row1 m-0 h-100">
        {/* Left Div */}
        <div className="col-md-6 d-none d-md-block left-side"></div>

        {/* Right Div */}
        <div className="col-md-6 d-flex align-items-center justify-content-center right-side">
          <div className="form-container form-container1">
            <img src={img} alt="Logo" className="mb-4" />
            <div className="button-container mb-4 d-flex justify-content-center">
      <button
        className={`btn btn-sm mx-1 ${
          loginType === "admin" ? "btn-primary text-white" : "bg-transparent-info"
        }`}
        onClick={() => handleLoginTypeChange("admin")}
      >
        Admin
      </button>
      <button
        className={`btn btn-sm mx-1 ${
          loginType === "superadmin" ? "btn-primary text-white" : "bg-transparent-info"
        }`}
        onClick={() => handleLoginTypeChange("superadmin")}
      >
        Super Admin
      </button>
    </div>
            <form>
              {loginType === "admin" && (
                <div className="mb-3 text-start">
                  <label className="mb-2 label1">Department</label>
                  <select
                    className="form-control form-control1"
                    name="department"
                    value={userData.department}
                    onChange={handleChange}
                  >
                    <option value="" disabled>
                      Select Department
                    </option>
                    {departments.map((department) => (
                      <option
                        value={department.department_name}
                        key={department.id}
                      >
                        {department.department_name}
                      </option>
                    ))}
                  </select>
                  {errors.department && (
                    <div className="text-danger">{errors.department}</div>
                  )}
                </div>
              )}
              <div className="mb-3 text-start">
                <label className="mb-2 label1">Username</label>
                <input
                  type="text"
                  className="form-control form-control1"
                  name="username"
                  value={userData.username}
                  onChange={handleChange}
                />
                {errors.username && (
                  <div className="text-danger">{errors.username}</div>
                )}
              </div>
              <div className="mb-3 text-start">
                <label className="mb-2 label1">Password</label>
                <input
                  type="password"
                  className="form-control form-control1"
                  name="password"
                  value={userData.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <div className="text-danger">{errors.password}</div>
                )}
              </div>
              <div className="d-flex justify-content-between mb-4">
                <div></div>
                <Link to="#" className="a1 text-decoration-none">
                  Forget your Password?
                </Link>
              </div>
              <div className="button-container">
                <button onClick={onSubmit} className="btn btn-primary btn1">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
