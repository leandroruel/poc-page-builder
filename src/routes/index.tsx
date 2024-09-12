import { createBrowserRouter, Navigate } from "react-router-dom";
import { MsalAuthenticationTemplate } from "@azure/msal-react";
import { InteractionType } from "@azure/msal-browser";
import { DashboardLayout } from "../layouts/DashboardLayout";
import NotFound from "../pages/NotFound";
import Builder from "../pages/builder";
import ErrorBoundary from "@/pages/ErrorBoundary";
import { loginRequest } from "../../authConfig";
import { SSOLogin } from "@/components/admin/SSOLogin";
import LoggedOut from "@/components/admin/LoggedOut";

const AuthenticatedRoute = ({ children }: { children: React.ReactNode }) => (
  <MsalAuthenticationTemplate
    interactionType={InteractionType.Redirect}
    authenticationRequest={loginRequest}
  >
    {children}
  </MsalAuthenticationTemplate>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/auth" />,
  },
  {
    path: "/auth",
    element: <SSOLogin />,
  },
  {
    path: '/loggedout',
    element: <LoggedOut />
  },
  {
    path: "/dashboard",
    element: (
      <AuthenticatedRoute>
        <DashboardLayout />
      </AuthenticatedRoute>
    ),
    children: [
      {
        path: "overview",
        element: <div>Visão Geral</div>,
      },
      {
        path: "reports",
        element: <div>Relatórios</div>,
      },
    ],
  },
  {
    path: "/analytics",
    element: (
      <AuthenticatedRoute>
        <DashboardLayout />
      </AuthenticatedRoute>
    ),
    children: [
      {
        path: "sales",
        element: <div>Análise de Vendas</div>,
      },
      {
        path: "performance",
        element: <div>Desempenho</div>,
      },
    ],
  },
  {
    path: "/builder",
    element: (
      <AuthenticatedRoute>
        <Builder />
      </AuthenticatedRoute>
    ),
    errorElement: <ErrorBoundary />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
