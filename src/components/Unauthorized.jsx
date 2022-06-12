import React from 'react'
import { useNavigate } from 'react-router-dom'
import "../styles/Error.css";

const Unauthorized = () => {
    const navigate = useNavigate();
    function toLogin() {
        navigate("/login")
    }

  return (
    <div>
        <h1 className='errm'>Unauthorized!!!</h1>
        <h2 className='errm'>user not admin!</h2>
        <h2 className='message'>Please login with an Admin account</h2>
        <div className='message'>
        <button className='button' onClick={toLogin}>Login</button>
        </div>
    </div>
  )
}

export default Unauthorized