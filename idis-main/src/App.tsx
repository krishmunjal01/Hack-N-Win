import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/auth/AuthContext";
import ProtectedRoute from "@/auth/ProtectedRoute";
import DashboardLayout from "@/layouts/DashboardLayout";

// Public pages
import Landing from "./pages/Landing";
import ContributeX from "./pages/ContributeX";
import CitizenPortal from "./pages/CitizenPortal";

// Auth pages
import OfficerLogin from "./pages/auth/OfficerLogin";
import OfficerRegister from "./pages/auth/OfficerRegister";
import AdminLogin from "./pages/auth/AdminLogin";
import ForgotPassword from "./pages/auth/ForgotPassword";
import OTPVerification from "./pages/auth/OTPVerification";

// Dashboard pages
import NationalControlCenter from "./pages/NationalControlCenter";
import StateCommand from "./pages/StateCommand";
import BuildingsOverview from "./pages/BuildingsOverview";
import BuildingDetail from "./pages/BuildingDetail";
import Analytics from "./pages/Analytics";
import AlertsPage from "./pages/AlertsPage";
import IncidentsPage from "./pages/IncidentsPage";
import AccountSettings from "./pages/AccountSettings";
import DistrictDashboard from "./pages/DistrictDashboard";
import OfficerDashboard from "./pages/OfficerDashboard";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public */}
            <Route path="/" element={<Landing />} />
            <Route path="/contributex" element={<ContributeX />} />
            <Route path="/citizen" element={<CitizenPortal />} />

            {/* Auth */}
            <Route path="/auth/login" element={<OfficerLogin />} />
            <Route path="/auth/register" element={<OfficerRegister />} />
            <Route path="/auth/admin-login" element={<AdminLogin />} />
            <Route path="/auth/forgot-password" element={<ForgotPassword />} />
            <Route path="/auth/otp-verify" element={<OTPVerification />} />

            {/* Protected Dashboard */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<NationalControlCenter />} />
              <Route path="states/:stateId" element={<StateCommand />} />
              <Route path="buildings" element={<BuildingsOverview />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="alerts" element={<AlertsPage />} />
              <Route path="incidents" element={<IncidentsPage />} />
              <Route path="settings" element={<AccountSettings />} />
              <Route path="district" element={<DistrictDashboard />} />
              <Route path="officer" element={<OfficerDashboard />} />
            </Route>

            {/* Building detail (protected) */}
            <Route
              path="/building/:id"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<BuildingDetail />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
