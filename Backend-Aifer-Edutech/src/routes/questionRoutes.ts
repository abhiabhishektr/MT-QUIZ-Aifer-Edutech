// Backend-Aifer-Edutech/src/routes/questionRoutes.ts
import { Router } from 'express';
import { getAllQuestions, createQuestion, submitAnswers } from '../controllers/questionController';
import { validateCreateQuestion, validateSubmitAnswers } from '../utils/validateInputs';
import { handleValidationErrors } from '../middlewares/validationMiddleware';

const router = Router();

router.get('/', (req, res) => {
    res.send("Test route working. You have connected to Abhishek T R's server.");
});

router.get('/questions', getAllQuestions);

router.post('/questions', validateCreateQuestion, handleValidationErrors, createQuestion);

router.post('/questions/submit', validateSubmitAnswers, handleValidationErrors, submitAnswers);

export default router;
