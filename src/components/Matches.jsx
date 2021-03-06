import { React, useState, useEffect } from "react";
import { Link, Outlet, NavLink } from "react-router-dom";
import Unauthorized from "./Unauthorized";
import facade from "../apiFacade";
import "../styles/Matches.css";

const Matches = ({ loggedIn, isUser, setIsUser }) => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    facade.fetchMatches().then((data) => setMatches(data));
    if (facade.getToken() != undefined) {
      const role = facade.decodeToken().roles;
      if (role == "user") {
        setIsUser(true);
      } else {
        setIsUser(false);
      }
    }
  },[]);

  return (
    <div>
      {isUser ? (
        <>
          <h1 className="center-text book-text">All Matches</h1>
          <div className="card-list">
            {matches.map((match) => (
              <div className="card-container" key={match.id}>
                <h2 className="center-text">Match ID: {match.id}</h2>
                <h2 className="center-text">Team: {match.opponentTeam}</h2>
                <h2 className="center-text">Judge: {match.judge}</h2>
                <h2 className="center-text">Match type: {match.type}</h2>
                <h2 className="center-text">Indoors: {match.inDoors}</h2>
                <h2 className="center-text">Players: {match.players}</h2>
              </div>
            ))}
          </div>
        </>
      ) : (
        <Unauthorized message={"a User"} />
      )}
    </div>
  );
};

export default Matches;
