import { Routes, Route, Navigate } from "react-router-dom";
import Users from "./users/UsersPage";
import LoginPage from "../login/login";
import PlanningPage from "./Planning/PlanningPage";
import TestPage from "./test/TestPage";
import ProfileClientPage from "./profileClient/ProfileClientPage";
import HistoryComponent from './../components/hirstoryData/HistoryComponent';
import DashboardPage from "../components/dashboard/DashboardPage";
import HelloPage from "./HelloPage";
const AppRoutes = ({ isLoggedIn }) => {
  return (
    <Routes>
      {/* Public route */}
      <Route path="/login" element={ <LoginPage />} />

      {/* Protected routes */}
      <Route path="/" element={<HelloPage/>} />
      <Route path="/dashboard" element={<DashboardPage/>} />
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
