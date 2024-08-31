
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addQuestion } from '../redux/questionsSlice';
import { useNavigate } from 'react-router-dom';
import '../styles/QuizCreation.css';

const QuizCreation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [message, setMessage] = useState('');

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleCorrectAnswerChange = (index, value) => {
    const newCorrectAnswers = [...correctAnswers];
    if (newCorrectAnswers.includes(value)) {
      newCorrectAnswers.splice(newCorrectAnswers.indexOf(value), 1); 
    } else {
      newCorrectAnswers.push(value); 
    }
    setCorrectAnswers(newCorrectAnswers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (questionText && options.every(opt => opt) && correctAnswers.length > 0) {
      const newQuestion = {
        question: questionText,
        options,
        correctAnswers, // Use the array of correct answers
      };

      dispatch(addQuestion(newQuestion));

      setMessage('Question added successfully!');

      setTimeout(() => {
        navigate('/');
      }, 2000);
    } else {
      setMessage('Please fill out all fields and select at least one correct answer.');
    }
  };

  return (
    <div className="quiz-creation">
      <h2>Add a New Question</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Question:</label>
          <input
            type="text"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Options:</label>
          {options.map((option, index) => (
            <input
              key={index}
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              required
              placeholder={`Option ${index + 1}`}
            />
          ))}
        </div>
        <div>
          <label>Correct Answers:</label>
          {options.map((option, index) => (
            <div key={index} className="correct-answer">
              <input
                type="checkbox"
                checked={correctAnswers.includes(option)}
                onChange={() => handleCorrectAnswerChange(index, option)}
              />
              <label>{option}</label>
            </div>
          ))}
        </div>
        <button type="submit">Add Question</button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
};

export default QuizCreation;
