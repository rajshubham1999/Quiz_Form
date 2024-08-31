import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import QuizCreation from './components/QuizCreation';
import QuizTaking from './components/QuizTaking';
import QuizResult from './components/QuizResult';
import './styles/App.css';

const App = () => (
  <Router>
    <Navbar />
    <div className="content">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-questions" element={<QuizCreation />} />
        <Route path="/start-quiz" element={<QuizTaking />} />
        <Route path="/quiz-result" element={<QuizResult />} />
      </Routes>
    </div>
  </Router>
);

export default App;
