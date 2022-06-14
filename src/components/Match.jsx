import { React ,useState, useEffect } from 'react'
import { Link, Outlet, NavLink } from "react-router-dom";
import facade from "../apiFacade";
import "../styles/Matches.css";

const Match = ({loggedIn, isUser, setIsUser}) => {
    const [matches, setMatches] = useState([])
    const [player, setPlayer] = useState('')

    useEffect(() =>{
        
        if (facade.getToken() != undefined) {
        
        
            const role = facade.decodeToken().roles
            if (role == "user") {
              setIsUser(true)
            }else{
              setIsUser(false)
            }
    
     
          }
    })

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setPlayer({...player,[name]: value });
      };

     

    const getMatch = (e) =>{
        e.preventDefault()
        facade.fetchByPlayerId(player.id).then(data => setMatches(data))
    }

    const getMatchLo = (e) =>{
        e.preventDefault()
        facade.fetchByLocationId(player.id).then(data => setMatches(data))
    }

  return (
    <div>
          <h1 className="center-text book-text">Matches</h1>
          <div className='input-section'>
          <input name='id' type="text" placeholder="player id" onChange={handleChange}></input>
          <button className='button' onClick={getMatch} type="submit" >Find</button>

          <input name='id' type="text" placeholder="Location id" onChange={handleChange}></input>
          <button className='button' onClick={getMatchLo} type="submit" >Find</button>
          </div>
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

export default Match