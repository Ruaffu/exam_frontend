import React from "react";
import facade from "../apiFacade";
import { useState, useEffect } from "react";
import Unauthorized from "./Unauthorized";
import "../styles/Matches.css";
import { NavLink } from "react-router-dom";

const DeleteMatch = ({ isAdmin, setIsAdmin }) => {
  const [match, setMatch] = useState("");
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

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setMatch({ ...match, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    facade.deleteMatch(match.id);
    alert("Match Deleted");
  };

  return (
    <div>
      {isAdmin ? (
        <div>
             <NavLink className="button" to="/admin">
                Back
              </NavLink>
          <h2 className="center-text book-text">Delete Match</h2>
          <div className="input-section">
            <form>
              <label>Match ID</label>
              <input type="text" name="id" onChange={handleChange}></input>
              <br></br>
            </form>
            <button className="button" type="submit" onClick={handleSubmit}>
              Delete
            </button>
          </div>
        </div>
      ) : (
        <Unauthorized />
      )}
    </div>
  );
};

export default DeleteMatch;
