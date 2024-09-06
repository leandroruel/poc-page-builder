import { createBrowserRouter } from "react-router-dom";
import App from '../App.tsx'
import Builder from "@/pages/builder/index.tsx";
import NotFound from "@/pages/NotFound.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      
    ],
  },
  {
    path: "/pagecreator",
    element: <Builder />,
  },
  {
    path: "/pagecreator/:pageId",
    element: <Builder />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
