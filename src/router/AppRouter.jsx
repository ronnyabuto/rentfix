// src/router/AppRouter.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";

import HomePage from "../pages/HomePage.jsx";
import AboutPage from "../pages/AboutPage.jsx";

import TenantDashboardPage from "../pages/tenant/TenantDashboardPage.jsx";
import ReportIssuePage from "../pages/tenant/ReportIssuePage.jsx";

import LandlordDashboardPage from "../pages/landlord/LandlordDashboardPage.jsx";

import NotFound from "../pages/NotFound.jsx";
import RoleRoute from "./RoleRoute.jsx";

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* Public pages */}
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />

        {/* Tenant routes */}
        <Route
          path="/tenant/dashboard"
          element={
            <RoleRoute allow="tenant">
              <TenantDashboardPage />
            </RoleRoute>
          }
        />
        <Route
          path="/tenant/report"
          element={
            <RoleRoute allow="tenant">
              <ReportIssuePage />
            </RoleRoute>
          }
        />

        {/* Landlord routes */}
        <Route
          path="/landlord/dashboard"
          element={
            <RoleRoute allow="landlord">
              <LandlordDashboardPage />
            </RoleRoute>
          }
        />

        {/* Redirect helpers */}
        <Route path="/tenant" element={<Navigate to="/tenant/dashboard" replace />} />
        <Route path="/landlord" element={<Navigate to="/landlord/dashboard" replace />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
