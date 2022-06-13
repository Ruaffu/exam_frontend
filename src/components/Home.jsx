import React from 'react'
import cat from "../img/laugh.png";
import "../styles/Home.css";
import Footer from "../components/Footer";
const Home = () => {
  return (
    <main>
    <header className='header-large'>
        <div>
        <img style={{ width: "30%" }} src={cat} />
            <h1 className='title'>Exam!</h1>
            <p></p>
        </div>
    </header>
    <section>
        <div className='text-section'>
            <h3>You're all clear, kid. Let's blow this thing and go home!</h3>
            <p>Leave that to me. Send a distress signal, and inform the Senate that all on board were killed. No! Alderaan is peaceful. We have no weapons. You can't possibly… A tremor in the Force. The last time I felt it was in the presence of my old master.

In my experience, there is no such thing as luck. All right. Well, take care of yourself, Han. I guess that's what you're best at, ain't it? I call it luck. Alderaan? I'm not going to Alderaan. I've got to go home. It's late, I'm in for it as it is.</p>
            <Footer/>
        </div>
    </section>
</main>
  )
}

export default Home