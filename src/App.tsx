import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./components/pages/Root";
import ProgramDetails from "./components/pages/ProgramDetails";
import Application from "./components/pages/Application";
import Preview from "./components/pages/Preview";
import Workflow from "./components/pages/Workflow";
import Home from "./components/pages/Home";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "details",
          element: <ProgramDetails />,
        },
        {
          path: "application-form",
          element: (
            <Application
              
            />
          ),
        },
        {
          path: "workflow",
          element: <Workflow />,
        },
        {
          path: "preview",
          element: <Preview />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
