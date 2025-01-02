// Backend-Aifer-Edutech/src/utils/validateInputs.ts
import { body } from 'express-validator';

export const validateCreateQuestion = [
  body('question').isString().withMessage('Question is required').notEmpty(),
  body('options').isArray({ min: 2 }).withMessage('At least two options are required').notEmpty(),
  body('correctAnswer').isInt({ min: 0 }).withMessage('Correct answer index is required and should be a valid integer'),
  body('explanation').isString().withMessage('Explanation is required').notEmpty(),
  body('quizId').isString().withMessage('Quiz ID is required').notEmpty(),
];

export const validateSubmitAnswers = [
  body('answers').isArray().withMessage('Answers should be an array').notEmpty(),
  body('answers.*.quizId').isString().withMessage('Quiz ID is required for each answer').notEmpty(),
  body('answers.*.selectedAnswer').isInt({ min: 0 }).withMessage('Selected answer should be a valid integer').notEmpty(),
];
