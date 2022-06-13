import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate, NavLink } from 'react-router-dom'
import facade from '../apiFacade';
import Unauthorized from './Unauthorized';

const Admin = ({ isAdmin, setIsAdmin}) => {
    useEffect(() =>{
      if (facade.getToken() != undefined) {
        
        
        const role = facade.decodeToken().roles
        if (role == "admin") {
          setIsAdmin(true)
        }else{
          setIsAdmin(false)
        }

 
      }
      
        
    })


  return (
    <div>
      
      { isAdmin ?
         (<div><h1>Admin page</h1>
         <div className='login'>
      <li>
      <NavLink className="button" to="/">Home</NavLink>
      </li>
      <li>
      <NavLink className="button" to="/connect">Connect boat to harbour</NavLink>
      </li>
      <li>
      <NavLink className="button" to="/update">Update boat info</NavLink>
      </li>
      <li>
      <NavLink className="button" to="/delete">Delete boat</NavLink>
      </li>
    </div></div>)
    :
    (<Unauthorized/>)

}
    </div>
  )
}

export default Admin