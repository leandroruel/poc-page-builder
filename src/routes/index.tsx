import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { DashboardLayout } from "../layouts/DashboardLayout";
import NotFound from "../pages/NotFound";
import Builder from "../pages/builder";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
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
    element: <DashboardLayout />,
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
    element: <Builder />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
