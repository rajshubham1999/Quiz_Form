


import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/QuizResult.css';

const QuizResult = () => {
  const location = useLocation();
  const { score, totalQuestions } = location.state || { score: 0, totalQuestions: 0 };

  // Calculate correct and wrong answers
  const correctAnswers = score;
  const wrongAnswers = totalQuestions - score;
 

  const isPerfectScore = score === totalQuestions;

  return (
    <div className="quiz-result">
      <h2>Quiz Results</h2>
      <div className="score-summary">
        <p className="score-text">Your Score: <span className="score">{score} / {totalQuestions}</span></p>
        <div className="result-analysis">
          <p>Correct Answers: <span className="result-count">{correctAnswers}</span></p>
          <p>Wrong Answers: <span className="result-count">{wrongAnswers}</span></p>
          
        </div>
      </div>
      <div className="motivation">
        {isPerfectScore ? (
          <h3 className="well-done">Well Done!</h3>
        ) : (
          <h3 className="keep-learning">Keep Learning!</h3>
        )}
      </div>
    </div>
  );
};

export default QuizResult;


