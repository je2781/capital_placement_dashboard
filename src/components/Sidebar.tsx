import React, { useState } from "react";

import classes from "./Sidebar.module.css";
import { Link, NavLink } from "react-router-dom";
import Clipboard from '../assets/clipboard_list.png';

type SidebarProps = {
  onSetSidebar: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Sidebar({onSetSidebar}: SidebarProps) {

  function handleOpen() {
    onSetSidebar((prevState) => !prevState);
  }
  return (
    <header className={classes.header}>
      <nav className="d-flex flex-column justify-content-start align-items-center">
        <div className={classes["toggle-icon"]} onClick={handleOpen}>
          <i className="fa-solid fa-bars"></i>
        </div>

        <ul className={classes.list}>
          <li>
            <NavLink to='/'>
              <i className="fa-solid fa-house"></i>
            </NavLink>
          </li>
          <li>
            <NavLink to='/todos'>
              <img src={Clipboard} className={classes.img}/>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
