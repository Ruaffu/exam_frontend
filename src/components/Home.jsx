import React from 'react'
import cat from "../img/cat.jpg";
import "../styles/Home.css";
const Home = () => {
  return (
    <main>
      <div className='row'>
        <div className='column'>
          <div className='image-container'>
            <img style={{ width: "100%" }} src={cat} />
            <div className='centered'>
              <h2>Cat facts!</h2>
            </div>
          </div>
          <div className='home-section'>
            <h2>
              blabakabal
            </h2>
            <h3>dshfoidhfhdsoihfodhsfodusfh</h3>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Home