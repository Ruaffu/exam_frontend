import React from "react";
import facade from "../apiFacade";
import { useState, useEffect } from "react";
import Unauthorized from "./Unauthorized";
import { NavLink } from "react-router-dom";

const CreatePlayers = ({ isAdmin, setIsAdmin }) => {
  const [playerInfo, setPlayerInfo] = useState({
    name: "",
    phone: "",
    email: "",
    status: "",
  });
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
    setPlayerInfo({ ...playerInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    facade.createPlayer(playerInfo);
    alert("Player created");
  };
  return (
    <div>
      {isAdmin ? (
        <div>
             <NavLink className="button" to="/admin">
                Back
              </NavLink>
          <h2 className="center-text book-text">Create Player</h2>
          <div className="input-section">
            <form>
              <label>Name</label>
              <input type="text" name="name" onChange={handleChange}></input>
              <br></br>
              <label>Phone number</label>
              <input type="text" name="phone" onChange={handleChange}></input>
              <br></br>
              <label>Email</label>
              <input type="text" name="email" onChange={handleChange}></input>
              <br></br>
              <label>Status?</label>
              <input type="text" name="status" onChange={handleChange}></input>
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
  );
};

export default CreatePlayers;
