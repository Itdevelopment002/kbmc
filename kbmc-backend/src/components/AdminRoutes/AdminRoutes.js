import React, {useState, useEffect} from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AddGeneralAdminDepartment from "../GenAdminDept/AddGeneralAdminDepartment";
import AddGeneralYear from "../GenAdminDept/AddGeneralYear";
import api from "../api"

function AdminRoutes({department}) {
  const [departments, setDepartments] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);

  const fetchDepartments = async () => {
    try {
      const response = await api.get("/public_disclosure");
      setDepartments(response.data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  // Fetch department data
  const fetchDepartmentData = async () => {
    try {
      const response = await api.get("/department-datas");
      setDepartmentData(response.data);
    } catch (error) {
      console.error("Error fetching department data:", error);
    }
  };

  useEffect(() => {
    fetchDepartments();
    fetchDepartmentData();
  }, []);
  return (
    <div>
      <Routes>
        <Route
          path="/add-general-department"
          element={<AddGeneralAdminDepartment />}
        />
        <Route
          path="/add-general-department-year"
          element={<AddGeneralYear />}
        />
        <Route path="*" element={<Navigate to="/add-general-department" />} />
      </Routes>
    </div>
  );
}

export default AdminRoutes;
