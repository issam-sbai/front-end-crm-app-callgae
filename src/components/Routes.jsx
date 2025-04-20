import { Routes, Route, Navigate } from "react-router-dom";
//import Dashboard from "./Dashboard";
// import Clients from "./Clients";
import Users from "./users/UsersPage";
// import Rdv from "./Rdv";
// import ClientComponent from "./client/ClientComponent";
// import ClientProfile from "./clientProfile/ClientProfile";
// 
// import ClientsList from "./client/ClientsList ";
// import ClientDetails from "./clientProfile/ClientDetails";
import LoginPage from "../login/login";
import PlanningPage from "./Planning/PlanningPage";
import TestPage from "./test/TestPage";
// import ProfilePage from "./clientProfile/ProfilePage";
import ProfileClientPage from "./profileClient/ProfileClientPage";
import HistoryComponent from './../components/hirstoryData/HistoryComponent';
import DashboardPage from "../components/dashboard/DashboardPage";
const AppRoutes = ({ isLoggedIn }) => {
  return (
    <Routes>
      {/* Public route */}
      <Route path="/login" element={ <LoginPage />} />

      {/* Protected routes */}
      <Route path="/" element={<DashboardPage/>} />
      {/* <Route path="/clients" element={<ClientComponent />} /> */}
      {/* <Route path="/client/:id" element={<ProfilePage /> } /> */}
      <Route path="/users" element={ <Users />} />
      <Route path="/rdv" element={<PlanningPage />} />
      <Route path="/test" element={<TestPage/>} />
      <Route path="/client/:id" element={<ProfileClientPage />} />
      <Route path="/history" element={<HistoryComponent />} />


      {/* If trying to access a non-existent route */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRoutes;
