import React from "react";
import facade from "../apiFacade";
import { useState, useEffect } from "react";
import Unauthorized from "./Unauthorized";

const CreateLocation = ({ isAdmin, setIsAdmin }) => {
  const [locationInfo, setLocationInfo] = useState({
    address: "",
    city: "",
    condition: "",
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
    setLocationInfo({ ...locationInfo, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    facade.createLocation(locationInfo);
    alert("location created");
  };
  return (
    <div>
      {isAdmin ? (
        <div>
          <h2 className="center-text book-text">Create Location</h2>
          <div className="input-section">
            <form>
              <label>Address</label>
              <input type="text" name="address" onChange={handleChange}></input>
              <br></br>
              <label>City</label>
              <input type="text" name="city" onChange={handleChange}></input>
              <br></br>
              <label>Condition</label>
              <input
                type="text"
                name="condition"
                onChange={handleChange}
              ></input>
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

export default CreateLocation;
