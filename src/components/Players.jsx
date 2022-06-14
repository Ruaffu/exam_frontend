import { React, useState, useEffect } from "react";
import { Link, Outlet, NavLink } from "react-router-dom";
import Unauthorized from "./Unauthorized";
import facade from "../apiFacade";
import "../styles/Matches.css";

const Players = ({isUser, setIsUser}) => {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
      facade.fetchPlayers().then((data) => setPlayers(data));
      if (facade.getToken() != undefined) {
        const role = facade.decodeToken().roles;
        if (role == "user") {
          setIsUser(true);
        } else {
          setIsUser(false);
        }
      }
    },[]);;

  return (
    <div>
    {isUser ? (
      <>
        <h1 className="center-text book-text">All Players</h1>
        <div className="card-list">
          {players.map((player) => (
            <div className="card-container" key={player.id}>
              <h2 className="center-text">Player ID: {player.id}</h2>
              <h2 className="center-text">Name: {player.name}</h2>
              <h2 className="center-text">Phone number: {player.phone}</h2>
              <h2 className="center-text">Email: {player.email}</h2>
              <h2 className="center-text">Status: {player.status}</h2>
            </div>
          ))}
        </div>
      </>
    ) : (
      <Unauthorized message={"a User"} />
    )}
  </div>
  )
}

export default Players