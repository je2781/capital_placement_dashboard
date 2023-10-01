import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import SideBarWithHeader from "../SidebarWithHeader";

function RootLayout() {
  
  return (
    <div className="d-flex flex-column layout">
      <SideBarWithHeader />
      <Outlet />
    </div>
  );
}

export default RootLayout;
