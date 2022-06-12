import React from 'react'
import { Outlet, Link, NavLink } from "react-router-dom";

function logout() {
    setLoggedIn(false)
    apiFacade.logout();
}

const Header = ( { loggedIn, isAdmin, setLoggedIn } ) => {
  return (
    <div>
      <header>
        <nav>
          <NavLink className="nav-link" to="/">Home</NavLink>
          <NavLink className="nav-link" to="cat">Generate</NavLink>


          {
            loggedIn ?
                <NavLink className="nav-button" to="/" onClick={logout}>Logout</NavLink>
              : 
              <NavLink className="nav-button" to="login">Login</NavLink>
          }
            {
            loggedIn && isAdmin &&
            <NavLink className="nav-link" to="/admin">Admin page</NavLink>
          }


        </nav>
      </header>
      <Outlet />
    </div>
  )
}

export default Header