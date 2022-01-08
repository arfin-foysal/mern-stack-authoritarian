import React from "react";
import { NavLink } from "react-bootstrap";

export default function Navbar() {
  function deleteToken() {
    localStorage.removeItem("token");
    setTimeout(() => {
      window.location.reload(false);
    }, 500);
  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-info">
        <div className="container-fluid">
          <NavLink className="navbar-brand" href="#">
            AUTH
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className="nav-link active"
                  aria-current="page"
                  href="#"
                >
                  Home
                </NavLink>
              </li>
            </ul>
            <span className="navbar-text " style={{cursor: "pointer"}} onClick={deleteToken}>Logout</span>
          </div>
        </div>
      </nav>
    </div>
  );
}
