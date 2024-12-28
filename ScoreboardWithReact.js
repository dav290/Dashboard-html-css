// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  // State for score, best score, cards, and clicked cards
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [cards, setCards] = useState([]);
  const [clickedCards, setClickedCards] = useState([]);

  // Fetch cards (images) from Giphy API
  useEffect(() => {
    axios
      .get('https://api.giphy.com/v1/gifs/trending?api_key=YOUR_API_KEY&limit=12')
      .then(response => {
        const fetchedCards = response.data.data.map(item => ({
          id: item.id,
          image: item.images.fixed_height.url,
        }));
        setCards(shuffleArray(fetchedCards));
      })
      .catch(err => console.error('Error fetching cards:', err));
  }, []);

  // Shuffle cards
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  // Handle card click
  const handleCardClick = (id) => {
    if (clickedCards.includes(id)) {
      // Game over
      alert('Game Over!');
      setScore(0);
      setClickedCards([]);
    } else {
      // Increase score
      setClickedCards([...clickedCards, id]);
      setScore(score + 1);
      if (score + 1 > bestScore) {
        setBestScore(score + 1);
      }
    }
  };

  return (
    <div className="App">
      <h1>Card Game</h1>
      <div className="scoreboard">
        <h2>Score: {score}</h2>
        <h3>Best Score: {bestScore}</h3>
      </div>

      <div className="card-deck">
        {cards.map(card => (
          <div className="card" key={card.id} onClick={() => handleCardClick(card.id)}>
            <img src={card.image} alt="Card" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
