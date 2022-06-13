import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/App.css";
import apiFacade from "./apiFacade.js";
import Home from "./components/Home";
import NoMatch from "./components/NoMatch";
import LoginPage from "./components/LoginPage";
import Cat from "./components/Cat";
import { useState } from "react";
import Header from "./components/Header";
import Admin from "./components/Admin";
import Unauthorized from "./components/Unauthorized";

export default function App() {


  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div>
      <BrowserRouter>
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} isAdmin={isAdmin} setIsAdmin={setIsAdmin}/>
    <Routes>
        <Route path="/" element={<Home/>}>
        </Route>
        <Route path="login" element={<LoginPage loggedIn={loggedIn} setLoggedIn={setLoggedIn} setIsAdmin={setIsAdmin}/>} />
        <Route path="admin" element={<Admin isAdmin={isAdmin} setIsAdmin={setIsAdmin}/>}/>
        <Route path="unauthorized" element={<Unauthorized/>} />
        <Route path="*" element={<NoMatch/>} />
    </Routes>
  </BrowserRouter>,
    </div>
    
  );
}
