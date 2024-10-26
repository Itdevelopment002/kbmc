import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import Header from './components/Header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './App.css'
import './responsive.css'
import './custom.css'
import './responsive-bkp.css'
import './owl.css'
import './nice-select.css'
import './flaticon.css'
import './color.css'
import './animate.css'
import './font-awesome-all.css'
import Footer from './components/Footer/Footer';
import WhatsAppChat from './components/WhatsAppChat/WhatsAppChat';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import Contact from './components/Contact/Contact';
import PropertyHolder from './components/PropertyHolder/PropertyHolder';
import MuncipalProperties from './components/MuncipalProperties/MuncipalProperties';
import Schools from './components/Schools/Schools';
import Gardens from './components/Gardens/Gardens';
import Electric from './components/Electric/Electric';
import Roads from './components/Roads/Roads';
import TreeCensus from './components/TreeCensus/TreeCensus';
import Health from './components/Health/Health';
import PondsTalao from './components/PondsTalao/PondsTalao';
import FireStation from './components/FireStation/FireStation';
import PrivateHospital from './components/PrivateHospital/PrivateHospital';
import Awards from './components/Awards/Awards';
import PreviousPresidents from './components/PreviousPresidents/PreviousPresidents';
import PreviousChiefOfficers from './components/PreviousChiefOfficers/PreviousChiefOfficers';
import Departments from './components/Departments/Departments';
import Functions from './components/Functions/Functions';
import MainHome from './components/MainHome/MainHome';
import History from './components/History/History';
import Wards from './components/Wards/Wards';
import ElectedWing from './components/ElectedWing/ElectedWing';
import OrganisationStructure from './components/OrganisationStructure/OrganisationStructure';
import Pmay from './components/Pmay/Pmay';
import Nuhm from './components/Nuhm/Nuhm';
import Amrut from './components/Amrut/Amrut';
import GenAdminDept from './components/GenAdminDept/GenAdminDept';
import DeptLayer2 from './components/DeptLayer2/DeptLayer2';
import PublicDisclosure from './components/PublicDisclosure/PublicDisclosure';
import CitizenCharter from './components/CitizenCharter/CitizenCharter';
import RightToService from './components/RightToService/RightToService';
import TownPlanning from './components/TownPlanning/TownPlanning';
import Downloads from './components/Downloads/Downloads';
import OfficialPublication from './components/OfficialPublication/OfficialPublication';
import TaxDepartment from './components/TaxDepartment/TaxDepartment';
import AccountDepartment from './components/AccountDepartment/AccountDepartment';
import ElectricalDepartment from './components/ElectricalDepartment/ElectricalDepartment';
import PublicWorkDepartment from './components/PublicWorkDepartment/PublicWorkDepartment';
import HealthDepartment from './components/HealthDepartment/HealthDepartment';
import EducationDepartment from './components/EducationDepartment/EducationDepartment';
import NULMDepartment from './components/NULMDepartment/NULMDepartment';
import HospitalDepartment from './components/HospitalDepartment/HospitalDeparment';
import FireDepartment from './components/FireDepartment/FireDepartment';
import BirthDeathDepartment from './components/Birth&DeathDepartment/BirthDeathDepartment';
import AuditDepartment from './components/AuditDepartment/AuditDepartment';
import IncomeDepartment from './components/IncomeDepartment/IncomeDepartment';
import EGovernanceDepartment from './components/EGovernanceDepartment/EGovernanceDepartment';
import WcdDepartment from './components/WcdDepartment/WcdDepartment';
import AdDepartment from './components/AdDepartment/AdDepartment';
import VehicleDepartment from './components/VehicleDepartment/VehicleDepartment';
import LegalDepartment from './components/LegalDepartment/LegalDepartment';
import DisabilityDepartment from './components/DisabilityDepartment/DisabilityDepartment';
import PrivacyPolicy from './components/PrivacyPolicy/PrivacyPolicy';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<MainHome />} />
        <Route path="/history" element={<History />} />
        <Route path="/ward" element={<Wards />} />
        <Route path="/elected-member" element={<ElectedWing />} />
        <Route path="/org-structure" element={<OrganisationStructure />} />
        <Route path="/functions" element={<Functions />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/elected-pre-officer" element={<PreviousChiefOfficers />} />
        <Route path="/elected-pre-representative" element={<PreviousPresidents />} />
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
        <Route path="/public-disclosure" element={<PublicDisclosure />} />
        <Route path="/citizen-charter" element={<CitizenCharter />} />
        <Route path="/right-to-services" element={<RightToService />} />
        <Route path="/town-planning" element={<TownPlanning />} />
        <Route path="/downloads" element={<Downloads />} />
        <Route path="/official-publication" element={<OfficialPublication />} />
        <Route path="/audit-department" element={<AuditDepartment />} />
        <Route path="/income-department" element={<IncomeDepartment />} />
        <Route path="/egovernance-department" element={<EGovernanceDepartment />} />
        <Route path="/wcd" element={<WcdDepartment />} />
        <Route path="/advertisement-department" element={<AdDepartment />} />
        <Route path="/vehicle-department" element={<VehicleDepartment />} />
        <Route path="/legal-department" element={<LegalDepartment />} />
        <Route path="/disability-welfare-department" element={<DisabilityDepartment />} />
        <Route path="/tax-department" element={<TaxDepartment />} />
        <Route path="/account-department" element={<AccountDepartment />} />
        <Route path="/electrical-department" element={<ElectricalDepartment />} />
        <Route path="/public-work-department" element={<PublicWorkDepartment />} />
        <Route path="/health-department" element={<HealthDepartment />} />
        <Route path="/education-department" element={<EducationDepartment />} />
        <Route path="/nulm-department" element={<NULMDepartment />} />
        <Route path="/hospital-department" element={<HospitalDepartment />} />
        <Route path="/fire-department" element={<FireDepartment />} />
        <Route path="/birth-death-department" element={<BirthDeathDepartment />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
      <ScrollToTop />
      <WhatsAppChat />
      <Footer />
    </Router>
  );
}

export default App;
