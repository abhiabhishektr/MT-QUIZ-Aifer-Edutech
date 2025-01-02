import axios from 'axios';

const API_URL =
    import.meta.env.VITE_MODE === "development"
        ? "http://localhost:3000/api/questions"
        : "https://projects.abhishektr.in/aifer/api";

// Get all questions
export const getAllQuestions = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching questions: ', error);
    throw new Error('Error fetching questions');
  }
};

// Submit answers
export const submitAnswers = async (answers: any) => {
  try {
    const response = await axios.post(`${API_URL}/submit`, { answers });
    return response.data;
  } catch (error) {
    console.error('Error submitting answers: ', error);
    throw new Error('Error submitting answers');
  }
};

// Create a new question
export const createQuestion = async (questionData: any) => {
  try {
    const response = await axios.post(API_URL, questionData);
    return response.data;
  } catch (error: any) {
    if (error.response && error.response.data) {
        console.error('Error creating question: ', error.response.data);
        throw new Error(error.response.data.message);  
      } else {
        console.error('Error creating question: ', error);
        throw new Error('Error creating question');
      }
    }
  }

