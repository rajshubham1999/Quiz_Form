
import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  questions: [
    {
      question: "What is the capital of France?",
      options: ["Paris", "London", "Berlin", "Madrid"],
      correctAnswers: ["Paris"],  
    },
    {
      question: "What is 2 + 2?",
      options: ["3", "4", "5", "6"],
      correctAnswers: ["4"],  
    },
    {
      question: "Which of the following are programming languages?",
      options: ["Python", "JavaScript", "HTML", "Photoshop"],
      correctAnswers: ["Python", "JavaScript"],  // Multiple correct answers
    },
    {
      question: "What planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Saturn"],
      correctAnswers: ["Mars"],  
    },
    {
      question: "What is the largest mammal?",
      options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
      correctAnswers: ["Blue Whale"],  
    },
  ],
};

// Create slice
const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    addQuestion: (state, action) => {
      state.questions.push(action.payload);
    },
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
  },
});

// Export actions
export const { addQuestion, setQuestions } = questionsSlice.actions;

// Export reducer
export default questionsSlice.reducer;

