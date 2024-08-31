
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaClock } from 'react-icons/fa';
import '../styles/QuizTaking.css';
import Timer from './Timer';

const QuizTaking = () => {
  const navigate = useNavigate();
  const questions = useSelector((state) => state.questions.questions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);
  const [score, setScore] = useState(0);

  const handleOptionClick = (option) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = currentQuestion.correctAnswers.includes(option);
  
    // Update selected options
    const newSelectedOptions = [...selectedOptions];
    newSelectedOptions[currentQuestionIndex] = newSelectedOptions[currentQuestionIndex] || [];
  
    if (newSelectedOptions[currentQuestionIndex].includes(option)) {
      newSelectedOptions[currentQuestionIndex] = newSelectedOptions[currentQuestionIndex].filter(
        (selectedOption) => selectedOption !== option
      );
    } else {
      newSelectedOptions[currentQuestionIndex].push(option);
    }
  
    setSelectedOptions(newSelectedOptions);
  
    // Update correct and incorrect selections
    const newCorrectAnswers = [...correctAnswers];
    const newIncorrectAnswers = [...incorrectAnswers];
  
    if (isCorrect) {
      newCorrectAnswers[currentQuestionIndex] = newCorrectAnswers[currentQuestionIndex] || [];
      if (!newCorrectAnswers[currentQuestionIndex].includes(option)) {
        newCorrectAnswers[currentQuestionIndex].push(option);
      }
      newIncorrectAnswers[currentQuestionIndex] = (newIncorrectAnswers[currentQuestionIndex] || []).filter(
        (incorrectOption) => incorrectOption !== option
      );
    } else {
      newIncorrectAnswers[currentQuestionIndex] = newIncorrectAnswers[currentQuestionIndex] || [];
      if (!newIncorrectAnswers[currentQuestionIndex].includes(option)) {
        newIncorrectAnswers[currentQuestionIndex].push(option);
      }
      newCorrectAnswers[currentQuestionIndex] = (newCorrectAnswers[currentQuestionIndex] || []).filter(
        (correctOption) => correctOption !== option
      );
    }
  
    setCorrectAnswers(newCorrectAnswers);
    setIncorrectAnswers(newIncorrectAnswers);
  
    // Check if the user has selected the required number of options
    const selectedOptionsForCurrentQuestion = newSelectedOptions[currentQuestionIndex] || [];
    if (selectedOptionsForCurrentQuestion.length === currentQuestion.correctAnswers.length) {
      // Calculate the score for correct answers
      const correctCount = currentQuestion.correctAnswers.filter(answer => 
        selectedOptionsForCurrentQuestion.includes(answer)
      ).length;
  
      // Update the score if all correct answers are selected
      if (correctCount === currentQuestion.correctAnswers.length) {
        setScore(prevScore => prevScore + 1);
      }
  
      
      setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
          
          navigate('/quiz-result', {
            state: { score: score + (correctCount === currentQuestion.correctAnswers.length ? 1 : 0), totalQuestions: questions.length, selectedOptions: newSelectedOptions },
          });
        }
      }, 1000);
    }
  };
  

  const handleTimeUp = () => {
    navigate('/quiz-result', { state: { score, totalQuestions: questions.length, selectedOptions } });
  };

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div>
      <div className="quiz-taking">
        <h2>Quiz</h2>
        <div className="timer-container">
          <FaClock className="clock-icon" />
          <Timer duration={300} onTimeUp={handleTimeUp} />
        </div>
        <div className="question">
          <p>
            <span className="question-number">Question {currentQuestionIndex + 1}:</span> {currentQuestion.question}
          </p>
          {currentQuestion.correctAnswers.length > 1 && (
            <p className="note" style={{ fontSize: '16px', color: '#555', marginTop: '5px', marginBottom: '15px' }}>Note: This question has more than one correct answer.</p>
          )}
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              className={`option 
                ${correctAnswers[currentQuestionIndex]?.includes(option) ? 'correct' : ''} 
                ${incorrectAnswers[currentQuestionIndex]?.includes(option) ? 'incorrect' : ''}`}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuizTaking;
