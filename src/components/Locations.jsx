import { React, useState, useEffect } from "react";
import { Link, Outlet, NavLink } from "react-router-dom";
import Unauthorized from "./Unauthorized";
import facade from "../apiFacade";
import "../styles/Matches.css";

const Locations = ({isUser, setIsUser}) => {
    const [locations, setLocations] = useState([]);

    useEffect(() => {
      facade.fetchLocations().then((data) => setLocations(data));
      if (facade.getToken() != undefined) {
        const role = facade.decodeToken().roles;
        if (role == "user") {
          setIsUser(true);
        } else {
          setIsUser(false);
        }
      }
    },[]);
    console.log(locations);

  return (
    <div>
    {isUser ? (
      <>
        <h1 className="center-text book-text">All Locations</h1>
        <div className="card-list">
          {locations.map((location) => (
            <div className="card-container" key={location.id}>
              <h2 className="center-text">Location ID: {location.id}</h2>
              <h2 className="center-text">Address: {location.address}</h2>
              <h2 className="center-text">City: {location.city}</h2>
              <h2 className="center-text">Condition: {location.condition}</h2>
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

export default Locations