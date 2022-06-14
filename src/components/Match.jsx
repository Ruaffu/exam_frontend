import React from 'react'

const Match = ({loggedIn, isUser, setIsUser}) => {
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

export default Match