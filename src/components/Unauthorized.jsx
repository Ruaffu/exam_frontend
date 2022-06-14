import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Error.css";

const Unauthorized = ({ message }) => {
  const navigate = useNavigate();
  function toLogin() {
    navigate("/login");
  }

  return (
    <div>
      <h1 className="errm">Unauthorized!!!</h1>
      <h2 className="errm">Not {message}!</h2>
      <h2 className="message">Please login with {message} account</h2>
      <div className="message">
        <button className="button" onClick={toLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Unauthorized;
