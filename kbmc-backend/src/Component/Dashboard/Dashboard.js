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


//Manoj
import Services from '../Services/Services';
import AddServices from '../Services/Add_services';
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
import GeneralDepartment from '../Subservices/PublicDisclosure/Generaladmindepartment';
import Add_gernaldepyear from '../Subservices/PublicDisclosure/Add_gernaldepyear';
import Generaladmindepartment from '../Subservices/PublicDisclosure/Generaladmindepartment';


const Dashboard = () => {
  return (
    <Router>
       <Header />
      <div className="d-flex" style={{ height: '100vh', margin: 0 }}>
        <Sidebar />
        <div className="flex-grow-1 d-flex flex-column" style={{ marginLeft: '250px' }}> {/* Leave space for the sidebar */}
         
          <div className="p-4 flex-grow-1"> {/* Allow this div to take remaining space */}
            {/* Define the routes here */}
            <Routes>
              <Route path="/" element={<MainMenuTable />} />
              <Route path="/services" element={< Services/>} />
              <Route path="/add-main" element={<AddMainPage />} />
              <Route path="/noti" element={<Notifications />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/pp" element={<PrivacyPolicy />} />
              <Route path="/tac" element={<TermsAndConditions />} />
        
              <Route path="/adduser" element={<AddUser />} />
              <Route path="/user" element={<User />} />
              <Route path="/dep" element={<Departments />} />
              <Route path="/d" element={<FcDepartment />} />
              <Route path="/adddep" element={<AddDepartments />} />
              <Route path="/slider" element={<Slider />} />
              <Route path="/add_slider" element={<Add_slider />} />
              <Route path="/add-propertyholder" element={<AddPropertyHolder />} />
              <Route path="/property_holder" element={<PropertyHolder />} />
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
              <Route path="/add-fire" element={<AddFireStation />} />
              <Route path="/add-schools" element={<AddSchools />} />
              <Route path="/add-school-images" element={<AddSchoolImages />} />
              <Route path="/health" element={<CityProfileHealth />} />


              //Manoj
              <Route path="/Add_services" element={<Add_services />} />
             
              <Route path="/health" element={<CityProfileHealth />} />
              <Route path="/Home_video" element={<Home_video />} />
              <Route path="/add_homvideo" element={<Add_homevideo />} />
              <Route path="/News" element={<News />} />
              <Route path="/Add_news" element={<Add_news />} />
              <Route path="/Tenders" element={<Tenders />} />
              <Route path="/Add_tender" element={<Add_tender />} />
              <Route path="/RTS" element={<RTS />} />
              <Route path="/Add_RTS" element={<Add_RTS />} />
              <Route path="/Add_RTSDES" element={<Add_RTSDES />} />
              <Route path="/citizen-charter" element={<CitizenCharter />} />
              <Route path="/public-disclosure" element={<PublicDisclosure />} />
              <Route path="/Photogallery" element={<Photogallery />} />


              <Route path="/Add_photogallery" element={<Add_photogallery />} />
              <Route path="/Award" element={<Award />} />
              <Route path="/Add_award" element={<Add_award />} />
              <Route path="/Ward" element={<Ward />} />
              <Route path="/Add_ward" element={<Add_ward />} />
              <Route path="/Functions" element={<Functions />} />
              <Route path="/Add_function" element={<Add_function />} />
              <Route path="/PreviousPresident" element={<PreviousPresident/>} />
              <Route path="/Add_PreviousPresident" element={<Add_PreviousPresident/>} />
              <Route path="/PreviousChiefOfficer" element={<PreviousChiefOfficer/>} />


              <Route path="/Add_previouschiefofficer" element={<Add_previouschiefofficer/>} />
              <Route path="/Electedwings" element={<Electedwings/>} />


              <Route path="/Add_electedwings" element={<Add_electedwings/>} />
              <Route path="/History" element={<History/>} />


              <Route path="/Add_history" element={<Add_history/>} />
              <Route path="/Add_ceo" element={<Add_ceo/>} />

              <Route path="/Websitelink" element={<Websitelink/>} />
              <Route path="/Add_websitelink" element={<Add_websitelink/>} />
              <Route path="/GeneralDepartment" element={<Generaladmindepartment />} />
              <Route path="/Add_gernaldepyear" element={<Add_gernaldepyear/>} />


            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default Dashboard;
