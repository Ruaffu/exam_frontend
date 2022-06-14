import React from "react";
import facade from "../apiFacade";
import { useState, useEffect } from "react";
import Unauthorized from "./Unauthorized";

const CreateMatch = ({ isAdmin, setIsAdmin }) => {
  const [matchInfo, setMatchInfo] = useState({
    opponentTeam: "",
    judge: "",
    type: "",
    inDoors: "",
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
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setMatchInfo({ ...matchInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    facade.createMatch(matchInfo);
    alert("Match created");
  };
  return (
    <div>
      {isAdmin ? (
        <div>
          <h2 className="center-text book-text">Create Match</h2>
          <div className="input-section">
            <form>
              <label>Team</label>
              <input
                type="text"
                name="opponentTeam"
                onChange={handleChange}
              ></input>
              <br></br>
              <label>Judge</label>
              <input type="text" name="judge" onChange={handleChange}></input>
              <br></br>
              <label>type</label>
              <input type="text" name="type" onChange={handleChange}></input>
              <br></br>
              <label>Indoors?</label>
              <input type="text" name="inDoors" onChange={handleChange}></input>
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

export default CreateMatch;
