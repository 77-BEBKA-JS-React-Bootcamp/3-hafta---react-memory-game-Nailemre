import React, { useEffect, useState } from "react";
import "./App.css";

const url = "https://pokeres.bastionbot.org/images/pokemon";

export default function App() {
    const [openedCard, setOpenedCard] = useState([]);
    const [matched, setMatched] = useState([]);

    const pokemons = [
        { id: 1, name: "balbasaur" },
        { id: 8, name: "wartotle" },
        { id: 9, name: "blastoise" },
        { id: 6, name: "charizard" }
    ];
     
 

    const pairOfPokemons = [...pokemons, ...pokemons];

    function flipCard(index) {
        setOpenedCard((opened) => [...opened, index]);
    }

    useEffect(() => {
        if (openedCard < 2) return;

        const firstMatched = pairOfPokemons[openedCard[0]];
        const secondMatched = pairOfPokemons[openedCard[1]];

        if (secondMatched && firstMatched.id === secondMatched.id) {
            setMatched([...matched, firstMatched.id]);
        }

        if (openedCard.length === 2) setTimeout(() => setOpenedCard([]), 1000);
    }, [openedCard]);

    return (
        <div className="App">
            <div className="cards">
                {pairOfPokemons.map((pokemon, index) => {
                    

                    let isFlipped = false;

                    if (openedCard.includes(index)) isFlipped = true;
                    if (matched.includes(pokemon.id)) isFlipped = true;
                    return (
                        <div
                            className={`pokemon-card ${isFlipped ? "flipped" : ""} `}
                            key={index}
                            onClick={() => flipCard(index)}
                        >
                            <div className="inner">
                                <div className="front">
                                    <img
                                        src={`${url}/${pokemon.id}.png`}
                                        alt="pokemon-name"
                                        width="100"
                                    />
                                </div>
                                <div className="back"></div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
