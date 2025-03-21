import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Clients from "./Clients";
import Users from "./users/UsersPage";
import Rdv from "./Rdv";
import ClientComponent from "./client/ClientComponent";
import ClientProfile from "./clientProfile/ClientProfile";
import ProfilePage from "./clientProfile/ProfilePage";
import ClientsList from "./client/ClientsList ";
import ClientDetails from "./clientProfile/ClientDetails";
import LoginPage from "../login/login";
import PlanningPage from "./Planning/PlanningPage";

const AppRoutes = ({ isLoggedIn }) => {
  return (
    <Routes>
      {/* Public route */}
      <Route path="/login" element={!isLoggedIn ? <LoginPage /> : <Navigate to="/" />} />

      {/* Protected routes */}
      <Route path="/" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
      <Route path="/clients" element={isLoggedIn ? <ClientComponent /> : <Navigate to="/login" />} />
      <Route path="/client/:id" element={isLoggedIn ? <ProfilePage /> : <Navigate to="/login" />} />
      <Route path="/users" element={isLoggedIn ? <Users /> : <Navigate to="/login" />} />
      <Route path="/rdv" element={isLoggedIn ? <PlanningPage /> : <Navigate to="/login" />} />

      {/* If trying to access a non-existent route */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRoutes;
