import React from 'react'
import facade from "../apiFacade";
import { useState, useEffect } from "react";
import Unauthorized from "./Unauthorized";
import { NavLink } from "react-router-dom";

const Connect = ({ isAdmin, setIsAdmin }) => {
      const [ids, setIds] = useState({ matchId: "", locationId: "",  });
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
        setIds({ ...ids, [name]: value });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        facade.connectMatch(ids);
        alert("Match Connected");
      };
  return (
    <div>
    {isAdmin ? (
      <div>
           <NavLink className="button" to="/admin">
              Back
            </NavLink>
        <h2 className="center-text book-text">Connect match to location</h2>
        <div className="input-section">
          <form>
            <label>Match ID</label>
            <input type="text" name="matchId" onChange={handleChange}></input>
            <label>Location ID</label>
            <input type="text" name="locationId" onChange={handleChange}></input>
            <br></br>
          </form>
          <button className="button" type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
    ) : (
      <Unauthorized />
    )}
  </div>
  )
}

export default Connect