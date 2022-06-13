import React from 'react'
import { Outlet, NavLink } from "react-router-dom";

import "../styles/Header.css";
import facade from '../apiFacade';

function logout({setLoggedIn, setIsAdmin}) {
  facade.logout();
  setLoggedIn(false)
  setIsAdmin(false)
  window.location.reload();
}

const Header = () => {
  return (
    <div>
      <header>
        <nav>
          <div className='left'>
          <NavLink  to="/">Home</NavLink>
          {
            facade.getToken() != undefined && facade.decodeToken().roles  == "admin"  &&
            <NavLink  to="/admin">Admin page</NavLink>
          }
          </div>
<div className='right'>
          {
            facade.getToken() != undefined ?
           
                <NavLink to="/" onClick={logout}>Logout</NavLink>
              : 
              <NavLink to="login">Login</NavLink>
          }
           </div>
        </nav>
      </header>
      <Outlet />
    </div>
  )
}

export default Header