import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import facade from "../apiFacade";
import Unauthorized from "./Unauthorized";
import "../styles/Matches.css";

const Admin = ({ isAdmin, setIsAdmin }) => {
  useEffect(() => {
    if (facade.getToken() != undefined) {
      const role = facade.decodeToken().roles;
      if (role == "admin") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    }
  },[]);

  return (
    <div>
      {isAdmin ? (
        <div className="input-section">
          <h1 className="center-text book-text">Admin page</h1>
          <div className="login">
            <li>
              <NavLink className="button" to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink className="button" to="/location">
                Create new location
              </NavLink>
            </li>
            <li>
              <NavLink className="button" to="/creatematch">
                Create new Match
              </NavLink>
            </li>
            <li>
              <NavLink className="button" to="/player">
                Create new player
              </NavLink>
            </li>
            <li>
              <NavLink className="button" to="/update">
                Update Match
              </NavLink>
            </li>
            <li>
              <NavLink className="button" to="/connect">
                Connect Match
              </NavLink>
            </li>
            <li>
              <NavLink className="button" to="/delete">
                Delete player
              </NavLink>
            </li>
            <li>
              <NavLink className="button" to="/deletem">
                Delete Match
              </NavLink>
            </li>
            <li>
              <NavLink className="button" to="/deletel">
                Delete Location
              </NavLink>
            </li>
          </div>
        </div>
      ) : (
        <Unauthorized message={"an Admin"} />
      )}
    </div>
  );
};

export default Admin;
