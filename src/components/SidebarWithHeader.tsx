import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useState } from "react";

export default function SideBarWithHeader() {
  const [sideBarIsOpen, setSideBarIsOpen] = useState<boolean>(false);

  return (
    <>
      <Sidebar onSetSidebar={setSideBarIsOpen}/>
      <Navbar onSetSidebar={setSideBarIsOpen} mobileOverlayIsOpen={sideBarIsOpen}/>
    </>
  );
}
