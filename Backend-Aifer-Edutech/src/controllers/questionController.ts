import { Request, Response } from 'express';
import Question from '../models/Question';
import { QuestionDTO, QuestionSubmitDTO } from '../dtos/QuestionDTO';
import sendResponse from '../utils/response';

// Get all questions
export const getAllQuestions = async (req: Request, res: Response): Promise<void> => {
    try {
        const questions = await Question.find().select(' -_id -__v');
        sendResponse(res, 200, 'Retrieved all questions successfully', questions);
    } catch (err) {
        console.error('Error fetching questions: ', err);
        sendResponse(res, 500, 'Error fetching questions');
    }
};

// Create a new question
export const createQuestion = async (req: Request, res: Response): Promise<void> => {
    const { question, options, correctAnswer, explanation, quizId }: QuestionDTO = req.body;

    try {
        const newQuestion = new Question({
            question,
            options,
            correctAnswer,
            explanation,
            quizId,
        });

        await newQuestion.save();
        sendResponse(res, 201, 'Question created successfully', newQuestion);
    } catch (err: any) {
        if (err.code === 11000) {
            sendResponse(res, 400, `A question with quizId '${quizId}' already exists.`);
        } else {
            console.error('Error creating question: ', err);
            sendResponse(res, 500, 'Error creating question');
        }
    }
};

// Score sheet endpoint
export const submitAnswers = async (req: Request, res: Response): Promise<void> => {
    const { answers }: QuestionSubmitDTO = req.body;

    try {
        const questions = await Question.find({ quizId: { $in: answers.map(answer => answer.quizId) } });

        let attended = 0;
        let correct = 0;
        let wrong = 0;

        answers.forEach(answer => {
            const question = questions.find(q => q.quizId === answer.quizId);
            if (question) {
                attended++;
                if (question.correctAnswer === answer.selectedAnswer) {
                    correct++;
                } else {
                    wrong++;
                }
            }
        });

        const percentage = ((correct / attended) * 100).toFixed(2);

        sendResponse(res, 200, 'Score calculated successfully', {
            attended,
            correct,
            wrong,
            percentage
        });
    } catch (err) {
        console.error('Error calculating score: ', err);
        sendResponse(res, 500, 'Error calculating score');
    }
};
