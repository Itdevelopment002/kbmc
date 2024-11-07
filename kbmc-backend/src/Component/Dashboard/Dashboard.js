import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import MainMenuTable from '../MainMenuTable/MainMenuTable';
import Header from '../Header/Header';
import AddMainPage from '../MainMenuTable/AddMainPage';
import Notifications from '../Notifications/Notifications';
import ContactUs from '../Contactus/Contactus';
import TermsAndConditions from '../TermsAndConditions/TermsAndConditions';
import PrivacyPolicy from '../PrivacyPolicy/PrivacyPolicy';
import Add_slider from '../Slider/Add_slider';
import AddUser from '../AddUser/AddUser';
import User from '../AddUser/User';
import { FcDepartment } from 'react-icons/fc';
import Departments from '../Departments/Departments';
import AddDepartments from '../Departments/AddDepartments';
import Slider from '../Slider/Slider';
import PropertyHolder from '../PropertyHolder/PropertyHolder';
import AddPropertyHolder from '../PropertyHolder/AddPropertyHolder';
import MunicipalProperties from '../MunicipalProperties/MunicipalProperties';
import AddMunicipalProperties from '../MunicipalProperties/AddMunicipalProperties';
import Schools from '../Schools/Schools';
import Gardens from '../Gardens/Gardens';
import AddGardens from '../Gardens/AddGarden';
import Electric from '../Electric/Electric';
import AddElectric from '../Electric/AddElectric';
import Roads from '../Roads/Roads';
import AddRoads from '../Roads/AddRoads';
import TreeCensus from '../TreeCensus/TreeCensus';
import AddTreeCensus from '../TreeCensus/AddTreeCensus';
import PondsAndTalao from '../PondsAndTalao/PondsAndTalao';
import Add_ponds from '../PondsAndTalao/Add_ponds';
import FireStation from '../FireStation/FireStation';
import PrivateHospital from '../PrivateHospital/PrivateHospital';
import AddPrivateHospital from '../PrivateHospital/AddPrivateHospital';
import AddFireStation from '../FireStation/AddFireStation';
import AddSchools from '../Schools/AddSchools';
import AddSchoolImages from '../Schools/AddSchoolImages';
import CityProfileHealth from '../CityProfileHealth/CityProfileHealth';
import Services from '../Services/Services';
import Add_services from '../Services/Add_services';
import Home_video from '../Home-Video/Home_video';
import Add_homevideo from '../Home-Video/Add_homevideo';
import News from '../NewsUpdate/News';
import Add_news from '../NewsUpdate/Add_news';
import Tenders from '../Tenders/Tender';
import Add_tender from '../Tenders/Add_tender';
import RTS from '../Subservices/RightToServices/RTS'
import Add_RTS from '../Subservices/RightToServices/Add_RTS';
import Add_RTSDES from '../Subservices/RightToServices/Add_RTSDES';
import CitizenCharter from '../Subservices/CitizenCharter/CitizenCharter';
import PublicDisclosure from '../Subservices/PublicDisclosure/PublicDis';
import Photogallery from '../Photogallery/Photogallery';
import Add_photogallery from '../Photogallery/Add_photogallery';
import Award from '../About_KBMC/Awards/Award';
import Add_award from '../About_KBMC/Awards/Add_award';
import Ward from '../About_KBMC/Wards/Ward';
import Add_ward from '../About_KBMC/Wards/Add_ward';
import Functions from '../About_KBMC/Functions/Functions';
import Add_function from '../About_KBMC/Functions/Add_function';
import PreviousPresident from '../About_KBMC/PreviousPresident/PreviousPresident ';
import Add_PreviousPresident from '../About_KBMC/PreviousPresident/Add_PreviousPresident';
import PreviousChiefOfficer from '../About_KBMC/PreviousChiefOfficer/PreviousChiefOfficer'
import Add_previouschiefofficer from '../About_KBMC/PreviousChiefOfficer/Add_previouschiefofficer'
import Electedwings from '../About_KBMC/ElectedWinggs/Electedwings';
import Add_electedwings from '../About_KBMC/ElectedWinggs/Add_electedwings';
import History from '../About_KBMC/History/History';
import Add_history from '../About_KBMC/History/Add_history';
import Add_ceo from '../About_KBMC/History/Add_ceo';
import Websitelink from '../Websitelink/Websitelink';
import Add_websitelink from '../Websitelink/Add_websitelink';
import Add_gernaldepyear from '../Subservices/PublicDisclosure/Add_gernaldepyear';
import Generaladmindepartment from '../Subservices/PublicDisclosure/Generaladmindepartment';
import AddAwardImage from '../About_KBMC/Awards/AddAwardImage';
import './Dashboard.css'

const Dashboard = () => {
  return (
    <Router>
       <Header />
      <div className="d-flex" style={{ margin: 0 }}>
        <Sidebar />
        <div className="flex-grow-1 d-flex flex-column main-content" >
          <div className="p-4 flex-grow-1">
            <Routes>
              <Route path="/" element={<MainMenuTable />} />
              <Route path="/services" element={< Services/>} />
              <Route path="/add-main" element={<AddMainPage />} />
              <Route path="/notification" element={<Notifications />} />
              <Route path="/contact-us" element={<ContactUs />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
              <Route path="/add-user" element={<AddUser />} />
              <Route path="/user" element={<User />} />
              <Route path="/department" element={<Departments />} />
              <Route path="/d" element={<FcDepartment />} />
              <Route path="/add-department" element={<AddDepartments />} />
              <Route path="/slider" element={<Slider />} />
              <Route path="/add-slider" element={<Add_slider />} />
              <Route path="/add-property-holder" element={<AddPropertyHolder />} />
              <Route path="/property-holder" element={<PropertyHolder />} />
              <Route path="/municipal-properties" element={<MunicipalProperties />} />
              <Route path="/add-municipal" element={<AddMunicipalProperties />} />
              <Route path="/schools" element={<Schools />} />
              <Route path="/gardens" element={<Gardens />} />
              <Route path="/add-gardens" element={<AddGardens />} />
              <Route path="/electric" element={<Electric />} />
              <Route path="/add-electric" element={<AddElectric />} />
              <Route path="/roads" element={<Roads />} />
              <Route path="/add-roads" element={<AddRoads />} />
              <Route path="/tree-census" element={<TreeCensus />} />
              <Route path="/add-tree-census" element={<AddTreeCensus />} />
              <Route path="/ponds" element={<PondsAndTalao />} />
              <Route path="/add-ponds" element={<Add_ponds/>} />
              <Route path="/firestation" element={<FireStation />} />
              <Route path="/private-hospital" element={<PrivateHospital />} />
              <Route path="/add-private-hospital" element={<AddPrivateHospital />} />
              <Route path="/add-firestation" element={<AddFireStation />} />
              <Route path="/add-schools" element={<AddSchools />} />
              <Route path="/add-school-images" element={<AddSchoolImages />} />
              <Route path="/health" element={<CityProfileHealth />} />
              <Route path="/add-award-images" element={<AddAwardImage />} />
              <Route path="/add-services" element={<Add_services />} />
              <Route path="/health" element={<CityProfileHealth />} />
              <Route path="/home-video" element={<Home_video />} />
              <Route path="/add-home-video" element={<Add_homevideo />} />
              <Route path="/news" element={<News />} />
              <Route path="/add-news" element={<Add_news />} />
              <Route path="/tenders" element={<Tenders />} />
              <Route path="/Add-tender" element={<Add_tender />} />
              <Route path="/rts" element={<RTS />} />
              <Route path="/add-rts" element={<Add_RTS />} />
              <Route path="/add-rts-des" element={<Add_RTSDES />} />
              <Route path="/citizen-charter" element={<CitizenCharter />} />
              <Route path="/public-disclosure" element={<PublicDisclosure />} />
              <Route path="/photo-gallery" element={<Photogallery />} />
              <Route path="/add-photo-gallery" element={<Add_photogallery />} />
              <Route path="/award" element={<Award />} />
              <Route path="/add-award" element={<Add_award />} />
              <Route path="/ward" element={<Ward />} />
              <Route path="/add-ward" element={<Add_ward />} />
              <Route path="/functions" element={<Functions />} />
              <Route path="/add-function" element={<Add_function />} />
              <Route path="/previous-president" element={<PreviousPresident/>} />
              <Route path="/add-previous-president" element={<Add_PreviousPresident/>} />
              <Route path="/previous-chief-officer" element={<PreviousChiefOfficer/>} />
              <Route path="/add-previous-chief-officer" element={<Add_previouschiefofficer/>} />
              <Route path="/elected-wings" element={<Electedwings/>} />
              <Route path="/add-elected-wings" element={<Add_electedwings/>} />
              <Route path="/history" element={<History/>} />
              <Route path="/add-history" element={<Add_history/>} />
              <Route path="/add-ceo" element={<Add_ceo/>} />
              <Route path="/website-link" element={<Websitelink/>} />
              <Route path="/add-website-link" element={<Add_websitelink/>} />
              <Route path="/general-department" element={<Generaladmindepartment />} />
              <Route path="/add-general-dep-year" element={<Add_gernaldepyear/>} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default Dashboard;
