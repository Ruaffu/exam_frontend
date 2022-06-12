import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'

const Admin = ({ isAdmin }) => {
    const navigate = useNavigate();
    useEffect(() =>{
        if (!isAdmin) {
            navigate("/unauthorized")
        }
    })
  return (
    <div>Admin</div>
  )
}

export default Admin