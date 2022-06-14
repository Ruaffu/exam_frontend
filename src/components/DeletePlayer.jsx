import React from "react";
import facade from "../apiFacade";
import { useState, useEffect } from "react";
import Unauthorized from "./Unauthorized";
import "../styles/Matches.css";

const DeletePlayer = ({ isAdmin, setIsAdmin }) => {
  const [player, setPlayer] = useState("");
  useEffect(() => {
    if (facade.getToken() != undefined) {
      const role = facade.decodeToken().roles;
      if (role == "admin") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    }
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setPlayer({ ...player, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    facade.deletePlayer(player.id);
    alert("Player Deleted");
  };

  return (
    <div>
      {isAdmin ? (
        <div>
          <h2 className="center-text book-text">Delete Player</h2>
          <div className="input-section">
            <form>
              <label>Player ID</label>
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

export default DeletePlayer;
