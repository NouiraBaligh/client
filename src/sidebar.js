import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./sidebar.css";

const SideBar = ({ userInfo }) => {
  const deconnecter = () => {
    fetch("http://localhost:5000/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data.error) {
          localStorage.removeItem("token");
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error("Erreur réseau lors de la déconnexion :", error);
      });
  };

  return (
    <div class="container-fluid sidebar">
      <div class="row flex-nowrap">
        <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
          <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <a
              href="/"
              class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
            >
              <img
                src="/88cecf48-d1ee-406c-9dcb-c8fcb4f413ec.webp"
                alt="hugenerd"
                width="30"
                height="30"
              />
              <span class="fs-5 d-none d-md-inline ms-3">TAWA-DIGITAL</span>
            </a>
            <ul
              class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >
              <li class="nav-item">
                <NavLink
                  to="/home"
                  class="nav-link align-middle px-0 text-white"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <i class="fs-4 bi-house"></i>{" "}
                  <span class="ms-1 d-none d-md-inline">Dashboard</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/articles"
                  class="nav-link px-0 align-middle text-white"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <i class="fs-4 bi-grid"></i>{" "}
                  <span class="ms-1 d-none d-md-inline">Articles</span>{" "}
                </NavLink>
              </li>
            </ul>
            <hr />
            <div class="dropdown pb-4">
              <a
                href="#"
                class="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                id="dropdownUser1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span class="d-none d-md-inline mx-1">
                  {" "}
                  {userInfo?.name && userInfo?.name?.length > 20
                    ? userInfo?.name?.substring(0, 20) + "..."
                    : userInfo?.name}
                </span>
              </a>
              <ul
                class="dropdown-menu dropdown-menu-dark text-small shadow"
                aria-labelledby="dropdownUser1"
              >
                <li>
                  <a class="dropdown-item" onClick={deconnecter}>
                    Déonnecter
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
