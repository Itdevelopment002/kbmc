import React, { useState } from "react";
import "./Login.css";
import img from "../../assets/img/kbmc_logo.jpg";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../api";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {

  const navigate = useNavigate();

  const [userData, setData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [inputStyles, setInputStyles] = useState({
    username: "form-control",
    password: "form-control",
  });

  const handleChange = (e) => {
    setData({
      ...userData,
      [e.target.name]: e.target.value,
    });
    setErrors({ ...errors, [e.target.name]: "" });

    if (e.target.name === "username") {
      setInputStyles({
        ...inputStyles,
        username: e.target.value ? "form-control input-filled" : "form-control",
      });
    } else if (e.target.name === "password") {
      setInputStyles({
        ...inputStyles,
        password: e.target.value ? "form-control input-filled" : "form-control",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!userData.username) newErrors.username = "Username is required";
    if (!userData.password) newErrors.password = "Password is required";
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
      const response = await api.post("/login", userData); // Ensure API returns a token
      localStorage.setItem("authToken", response.data.token); // Store token
      onLogin(); // Notify parent of successful login
      navigate("/");
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Login Successfully",
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    }
  };

  return (
    <div className="login-page">
      <div className=" row row1 m-0 h-100">
        {/* Left Div */}
        <div className="col-md-6 d-none d-md-block left-side"></div>

        {/* Right Div */}
        <div className="col-md-6 d-flex align-items-center justify-content-center right-side">
          <div className="form-container form-container1 ">
            <img src={img} alt="Logo" className="mb-4" />
            <form>
              <div className="mb-3 text-start">
                <label className="mb-2 label1 text-start">Username or Email</label>
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
