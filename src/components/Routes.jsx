import { Routes, Route, Navigate } from "react-router-dom";
import Users from "./users/UsersPage";
import LoginPage from "../login/login";
import PlanningPage from "./Planning/PlanningPage";
import TestPage from "./test/TestPage";
import ProfileClientPage from "./profileClient/ProfileClientPage";
import HistoryComponent from './../components/hirstoryData/HistoryComponent';
import DashboardPage from "../components/dashboardData/DashboardPage";
import PrivateRoute from "./PrivateRoute";

  // import your PrivateRoute

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public route */}
      <Route path="/login" element={<LoginPage />} />

      {/* Protected routes */}
      <Route path="/" element={
        <PrivateRoute>
          <DashboardPage />
        </PrivateRoute>
      } />

    <Route path="/dashboard" element={
        <PrivateRoute>
          <DashboardPage />
        </PrivateRoute>
      } />


      <Route path="/users" element={
        <PrivateRoute>
          <Users />
        </PrivateRoute>
      } />

      <Route path="/rdv" element={
        <PrivateRoute>
          <PlanningPage />
        </PrivateRoute>
      } />

      <Route path="/test" element={
        <PrivateRoute>
          <TestPage />
        </PrivateRoute>
      } />

      <Route path="/client/:id" element={
        <PrivateRoute>
          <ProfileClientPage />
        </PrivateRoute>
      } />

      <Route path="/history" element={
        <PrivateRoute>
          <HistoryComponent />
        </PrivateRoute>
      } />

      {/* Fallback to login if route not found */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRoutes;
