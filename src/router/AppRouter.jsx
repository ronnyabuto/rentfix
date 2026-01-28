// src/router/AppRouter.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";

import Home from "../pages/Home.jsx";
import About from "../pages/About.jsx";

import TenantDashboardPage from "../pages/tenant/TenantDashboardPage.jsx";
import ReportIssuePage from "../pages/tenant/ReportIssuePage.jsx";

import LandlordDashboardPage from "../pages/landlord/LandlordDashboardPage.jsx";

import NotFound from "../pages/NotFound.jsx";
import RoleRoute from "./RoleRoute.jsx";

export default function AppRouter() {
  return (
    <Routes>
      {/* Public pages (No Layout) */}
      <Route path="/" element={<Home />} />

      <Route element={<MainLayout />}>
        {/* About Page */}
        <Route path="/about" element={<About />} />

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
