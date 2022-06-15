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
import Matches from "./components/Matches";
import Match from "./components/Match";
import CreateLocation from "./components/CreateLocation";
import CreateMatch from "./components/CreateMatch";
import CreatePlayers from "./components/CreatePlayers";
import UpdateMatch from "./components/UpdateMatch";
import DeletePlayer from "./components/DeletePlayer";
import Connect from "./components/Connect";
import Locations from "./components/Locations";
import Players from "./components/Players";
import DeleteMatch from "./components/DeleteMatch";
import DeleteLocation from "./components/DeleteLocation";

export default function App() {


  const [loggedIn, setLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUser, setIsUser] = useState(false);

  return (
    <div>
      <BrowserRouter>
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} isAdmin={isAdmin} setIsAdmin={setIsAdmin}/>
    <Routes>
        <Route path="/" element={<Home/>}>
        </Route>
        <Route path="login" element={<LoginPage loggedIn={loggedIn} setLoggedIn={setLoggedIn} setIsAdmin={setIsAdmin} setIsUser={setIsUser}/>} />
        <Route path="admin" element={<Admin isAdmin={isAdmin} setIsAdmin={setIsAdmin}/>}/>
        <Route path="matches" element={<Matches loggedIn={loggedIn} isUser={isUser} setIsUser={setIsUser}/>} />
        <Route path="match" element={<Match loggedIn={loggedIn} isUser={isUser} setIsUser={setIsUser}/>} />
        <Route path="location" element={<CreateLocation isAdmin={isAdmin} setIsAdmin={setIsAdmin}/>} />
        <Route path="creatematch" element={<CreateMatch isAdmin={isAdmin} setIsAdmin={setIsAdmin}/>} />
        <Route path="player" element={<CreatePlayers isAdmin={isAdmin} setIsAdmin={setIsAdmin}/>} />
        <Route path="update" element={<UpdateMatch isAdmin={isAdmin} setIsAdmin={setIsAdmin}/>} />
        <Route path="connect" element={<Connect isAdmin={isAdmin} setIsAdmin={setIsAdmin}/>} />
        <Route path="delete" element={<DeletePlayer isAdmin={isAdmin} setIsAdmin={setIsAdmin}/>} />
        <Route path="deletem" element={<DeleteMatch isAdmin={isAdmin} setIsAdmin={setIsAdmin}/>} />
        <Route path="deletel" element={<DeleteLocation isAdmin={isAdmin} setIsAdmin={setIsAdmin}/>} />
        <Route path="locations" element={<Locations isUser={isUser} setIsUser={setIsUser}/>} />
        <Route path="players" element={<Players isUser={isUser} setIsUser={setIsUser}/>} />
        <Route path="unauthorized" element={<Unauthorized/>} />
        <Route path="*" element={<NoMatch/>} />
    </Routes>
  </BrowserRouter>,
    </div>
    
  );
}
