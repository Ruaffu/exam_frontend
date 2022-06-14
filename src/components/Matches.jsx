import { React ,useState, useEffect } from 'react'
import { Link, Outlet, NavLink } from "react-router-dom";
import facade from "../apiFacade";
import "../styles/Matches.css";

const Matches = ({loggedIn, isUser, setIsUser}) => {
    const [matches, setMatches] = useState([])

    useEffect(() =>{
        facade.fetchMatches().then(data => setMatches(data));
        if (facade.getToken() != undefined) {
        
        
            const role = facade.decodeToken().roles
            if (role == "user") {
              setIsUser(true)
            }else{
              setIsUser(false)
            }
    
     
          }
    })

  return (
    <div>
          <h1 className="center-text book-text">Matches</h1>
        {isUser?

     <div className='card-list'> 
     {matches.map(match => (
         <div className='card-container' key={match.id}>
            <h2 className='center-text'>Match ID: {match.id}</h2>
            <h2 className='center-text'>Team: {match.opponentTeam}</h2>
            <h2 className='center-text'>Judge: {match.judge}</h2>
            <h2 className='center-text'>Match type: {match.type}</h2>
            <h2 className='center-text'>Indoors: {match.inDoors}</h2>
            <h2 className='center-text'>Players: {match.players}</h2>
            
            </div>
     ))}
     </div>

     :<>
     
     <h3 className="center-text book-text">Please Login</h3>
     <NavLink className="navlink book-text" to="/login">Login</NavLink>
     </>
}
    </div>
  )
}

export default Matches