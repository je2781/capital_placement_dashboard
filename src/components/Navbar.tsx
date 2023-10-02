import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import classes from "./Nabar.module.css";

type NavbarProps = {
  onSetSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  mobileOverlayIsOpen: boolean;
};

export default function Navbar({
  onSetSidebar,
  mobileOverlayIsOpen,
}: NavbarProps) {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  function hideDividerHandler() {
    setIsVisible(false);
  }

  function showDividerHandler() {
    setIsVisible(true);
  }
  function handleClose() {
    onSetSidebar(true);
  }

  return (
    <header className={`${classes.header} navbar navbar-expand-lg`}>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <nav
        className={`${classes["main-nav"]} collapse navbar-collapse`}
        id="navbarSupportedContent"
      >
        <ul className={`${classes["main-list"]} navbar-nav`}>
          <NavLink
            to="/"
            onClick={showDividerHandler}
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            <li className="nav-item">
              <span>Program Details</span>
            </li>
          </NavLink>
          <NavLink
            to="/application-form"
            onClick={showDividerHandler}
            className={({ isActive }) =>
              isActive ? classes.active : undefined
            }
          >
            <li className="nav-item">
              <span>Application Form</span>
            </li>
          </NavLink>
          <NavLink
            to="/workflow"
            className={({ isActive }) =>
              isActive ? `${classes.active} px-4` : undefined
            }
            onClick={hideDividerHandler}
          >
            <li className="nav-item">
              <span>Workflow</span>
            </li>
          </NavLink>
          {isVisible && (
              <span
                className={`d-inline-block ms-5 me-0 mt-3 mb-4 ${classes["vertical-divider"]}`}
              ></span>
          )}
          <NavLink
            to="/preview"
            onClick={hideDividerHandler}
            className={({ isActive }) =>
              isActive ? `${classes.active} px-4` : undefined
            }
          >
            <li className="nav-item">
              <span>Preview</span>
            </li>
          </NavLink>
        </ul>
      </nav>
      {!mobileOverlayIsOpen && (
        <nav
          className={!mobileOverlayIsOpen ? "mobile-nav open" : "mobile-nav"}
        >
          <div onClick={handleClose} className="cancel">
            <i className="fa fa-times"></i>
          </div>
          <ul>
            <li className="nav-item">
              <span></span>
              <NavLink
                to="/products"
                onClick={handleClose}
                className={({ isActive }) =>
                  ["nav-link", isActive && classes.active].join("")
                }
              >
                Products<span className={classes.span}> </span>
                <i className="fa-solid fa-caret-down"></i>
              </NavLink>
            </li>
            <li className="nav-item">
              <span></span>
              <NavLink
                to="/business"
                onClick={handleClose}
                className={({ isActive }) =>
                  ["nav-link", isActive && classes.active].join("")
                }
              >
                Business<span className={classes.span}> </span>
                <i className={classes.beta}>Beta</i>
              </NavLink>
            </li>
            <li className="nav-item">
              <span></span>
              <NavLink
                to="/company"
                onClick={handleClose}
                className={({ isActive }) =>
                  ["nav-link", isActive && classes.active].join("")
                }
              >
                Company<span className={classes.span}> </span>
                <i className="fa-solid fa-caret-down"></i>
              </NavLink>
            </li>
            <li className="nav-item">
              <span></span>
              <NavLink
                to="/learn"
                onClick={handleClose}
                className={({ isActive }) =>
                  ["nav-link", isActive && classes.active].join("")
                }
              >
                Learn
              </NavLink>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
