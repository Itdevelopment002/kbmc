import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import Header from "./components/Header/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./App.css";
import "./responsive.css";
import "./custom.css";
import "./responsive-bkp.css";
import "./owl.css";
import "./nice-select.css";
import "./flaticon.css";
import "./color.css";
import "./animate.css";
import "./font-awesome-all.css";
import api from "./components/api";
import Footer from "./components/Footer/Footer";
import WhatsAppChat from "./components/WhatsAppChat/WhatsAppChat";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import Contact from "./components/Contact/Contact";
import PropertyHolder from "./components/PropertyHolder/PropertyHolder";
import MuncipalProperties from "./components/MuncipalProperties/MuncipalProperties";
import Schools from "./components/Schools/Schools";
import Gardens from "./components/Gardens/Gardens";
import Electric from "./components/Electric/Electric";
import Roads from "./components/Roads/Roads";
import TreeCensus from "./components/TreeCensus/TreeCensus";
import Health from "./components/Health/Health";
import PondsTalao from "./components/PondsTalao/PondsTalao";
import FireStation from "./components/FireStation/FireStation";
import PrivateHospital from "./components/PrivateHospital/PrivateHospital";
import Awards from "./components/Awards/Awards";
import PreviousPresidents from "./components/PreviousPresidents/PreviousPresidents";
import PreviousChiefOfficers from "./components/PreviousChiefOfficers/PreviousChiefOfficers";
import Departments from "./components/Departments/Departments";
import Functions from "./components/Functions/Functions";
import MainHome from "./components/MainHome/MainHome";
import History from "./components/History/History";
import Wards from "./components/Wards/Wards";
import ElectedWing from "./components/ElectedWing/ElectedWing";
import OrganisationStructure from "./components/OrganisationStructure/OrganisationStructure";
import Pmay from "./components/Pmay/Pmay";
import Nuhm from "./components/Nuhm/Nuhm";
import Amrut from "./components/Amrut/Amrut";
import GenAdminDept from "./components/GenAdminDept/GenAdminDept";
import DeptLayer2 from "./components/DeptLayer2/DeptLayer2";
import PublicDisclosure from "./components/PublicDisclosure/PublicDisclosure";
import CitizenCharter from "./components/CitizenCharter/CitizenCharter";
import RightToService from "./components/RightToService/RightToService";
import TownPlanning from "./components/TownPlanning/TownPlanning";
import Downloads from "./components/Downloads/Downloads";
import OfficialPublication from "./components/OfficialPublication/OfficialPublication";
import PrivacyPolicy from "./components/PrivacyPolicy/PrivacyPolicy";
import DeptData from "./components/DeptData/DeptData";
import DeptDataYear from "./components/DeptData/DeptDataYear";
import CookieConsent from "./components/CookieConsent/CookieConsent";
import TermsAndConditions from "./components/TermsAndConditions/TermsAndConditions";

function App() {
  const [departments, setDepartments] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);
  const [departmentDatas, setDepartmentDatas] = useState([]);

  const fetchDepartments = async () => {
    try {
      const response = await api.get("/public_disclosure");
      setDepartments(response.data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const fetchDepartmentData = async () => {
    try {
      const response = await api.get("/department-datas");
      setDepartmentData(response.data);
    } catch (error) {
      console.error("Error fetching department data:", error);
    }
  };

  const fetchDepartmentDatas = async () => {
    try {
      const response = await api.get("/generaladmindepartment");
      setDepartmentDatas(response.data);
    } catch (error) {
      console.error("Error fetching department data:", error);
    }
  };

  useEffect(() => {
    fetchDepartments();
    fetchDepartmentData();
    fetchDepartmentDatas();
  }, []);

  return (
    <Router>
      <Header />
      <CookieConsent />
      <Routes>
        <Route path="/" element={<MainHome />} />
        <Route path="/history" element={<History />} />
        <Route path="/ward" element={<Wards />} />
        <Route path="/elected-member" element={<ElectedWing />} />
        <Route path="/org-structure" element={<OrganisationStructure />} />
        <Route path="/functions" element={<Functions />} />
        <Route path="/departments" element={<Departments />} />
        <Route
          path="/elected-pre-officer"
          element={<PreviousChiefOfficers />}
        />
        <Route
          path="/elected-pre-representative"
          element={<PreviousPresidents />}
        />
        <Route path="/awards" element={<Awards />} />
        <Route path="/property-holder" element={<PropertyHolder />} />
        <Route path="/properties-milkat" element={<MuncipalProperties />} />
        <Route path="/schools" element={<Schools />} />
        <Route path="/gardens" element={<Gardens />} />
        <Route path="/electric" element={<Electric />} />
        <Route path="/roads" element={<Roads />} />
        <Route path="/tree-census" element={<TreeCensus />} />
        <Route path="/health" element={<Health />} />
        <Route path="/ponds-talao" element={<PondsTalao />} />
        <Route path="/fire-station" element={<FireStation />} />
        <Route path="/private-hospital" element={<PrivateHospital />} />
        <Route path="/pmay" element={<Pmay />} />
        <Route path="/nuhm" element={<Nuhm />} />
        <Route path="/amrut" element={<Amrut />} />
        <Route path="/general-admin-department" element={<GenAdminDept />} />
        <Route path="/dept-layer-2" element={<DeptLayer2 />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/public-disclosure"
          element={
            <PublicDisclosure
              fetchDepartments={fetchDepartments}
              fetchDepartmentData={fetchDepartmentData}
            />
          }
        />
        <Route path="/citizen-charter" element={<CitizenCharter />} />
        <Route path="/right-to-services" element={<RightToService />} />
        <Route path="/town-planning" element={<TownPlanning />} />
        <Route path="/downloads" element={<Downloads />} />
        <Route path="/official-publication" element={<OfficialPublication />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        {departmentDatas && departmentDatas.length > 0 ? (
          departmentDatas.map((data) =>
            data?.heading_link ? (
              <Route
                key={data?.heading_link}
                path={data?.heading_link} // Remove leading slash
                element={<DeptLayer2 />}
              />
            ) : null
          )
        ) : (
          <>Loding...</>
        )}
        {departments.map((department) =>
          department.department_name !== "General Admin Department" ? (
            <>
              <Route
                path={`/${department.department_name
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                element={
                  <DeptData
                    fetchDepartments={fetchDepartments}
                    fetchDepartmentData={fetchDepartmentData}
                  />
                }
              />
            </>
          ) : null
        )}
        {departmentData && departmentData.length > 0 ? (
          departmentData.map((data) =>
            data?.heading_link ? (
              <Route
                key={data?.heading_link}
                path={data?.heading_link}
                element={<DeptDataYear />}
              />
            ) : null
          )
        ) : (
          <>Loding...</>
        )}
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
      </Routes>
      <ScrollToTop />
      <WhatsAppChat />
      <Footer />
    </Router>
  );
}

export default App;
