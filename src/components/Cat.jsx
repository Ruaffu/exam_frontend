import React from 'react'
import { useState } from 'react';
import apiFacade from "../apiFacade.js";
import "../styles/Cat.css";
const Cat = () => {
    const [cat, setCat] = useState("");


    function getCat() {
        apiFacade.fetchCat().then(data => setCat(data));
    }

    return (
        <main>
            <div className='container'>
                <div className='row'>
                    {cat != "" ?
                        <>
                            <div className='column'>
                                <img className='cat-img' src={cat.url} />
                            </div>
                            <div className='column'>
                                <div className='cat-fact-section'>
                                    <h2>Did you know..?</h2>
                                    <h3>{cat.fact}</h3>
                                    <button onClick={getCat}>Generate</button>
                                </div>
                            </div>
                        </> : <>
                            <div className='column'>
                                <div className='section'>
                                    <h2 className='center'>Get cat facts here!</h2>
                                    <h3 className='center'>Click here to get a random cat fact!</h3>
                                    <button onClick={getCat}>Generate</button>
                                </div>
                            </div>
                        </>
                    }
                </div>
            </div>
        </main>
    )
}

export default Cat