import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css'

const Home = () => (
  <div className="home">
    <h1>Welcome to the Quiz Platform</h1>
    <div className="buttons">
      <Link to="/add-questions" className="button">Add Questions</Link>
      <Link to="/start-quiz" className="button">Start Quiz</Link>
    </div>
  </div>
);

export default Home;
