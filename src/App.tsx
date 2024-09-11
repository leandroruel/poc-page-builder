import React from "react";
import {
  IPublicClientApplication,
  PublicClientApplication,
} from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "../authConfig";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { Route, Router, Routes, useNavigate } from "react-router-dom";
import { CustomNavigationClient } from "./utils/NavigationClient";
import { Home } from "./pages/Home";
import NotFound from "./pages/NotFound";

type AppProps = {
  pca: IPublicClientApplication;
};

const App = ({ pca }: AppProps) => {
  const navigate = useNavigate();
  const navigationClient = new CustomNavigationClient(navigate);
  pca.setNavigationClient(navigationClient);

  return (
    <MsalProvider instance={pca}>
      <AdminDashBoardPages />
    </MsalProvider>
  );
};

function AdminDashBoardPages() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<div>about</div>} />
        <Route path="settings" element={<div>settings</div>} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
