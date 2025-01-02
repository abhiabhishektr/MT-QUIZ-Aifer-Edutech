import React, { useState } from 'react';
import { createQuestion } from '../api/questionApi';
import { useNavigate } from 'react-router-dom';

const CreateQuiz = () => {
    const navigate = useNavigate();
    const [question, setQuestion] = useState<string>('');
    const [options, setOptions] = useState<string[]>(['', '', '', '']);
    const [correctAnswer, setCorrectAnswer] = useState<number | null>(null); // Allow null if no answer selected yet
    const [explanation, setExplanation] = useState<string>('');
    const [quizId, setQuizId] = useState<string>('quiz124');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const handleOptionChange = (index: number, value: string) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handleCorrectAnswerChange = (index: number) => {
        setCorrectAnswer(index);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        if (options.some(option => option.trim() === '')) {
            setError('Please fill in all option fields before submitting.');
            setLoading(false);
            return;
        }

        if (correctAnswer === null) {
            setError('Please select the correct answer.');
            setLoading(false);
            return;
        }

        const questionData = {
            question,
            options,
            correctAnswer,
            explanation,
            quizId
        };

        try {
            await createQuestion(questionData);
            setSuccess('Question added successfully!');
            setQuestion('');
            setOptions(['', '', '', '']);
            setCorrectAnswer(null);
            setExplanation('');
            setQuizId('');
        } catch (err: any) {
            const errorMessage = err.message || 'Something went wrong. Please try again later.';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h1 className="text-2xl font-semibold mb-6 text-gray-800">Create a New Question</h1>
                    <form onSubmit={handleSubmit}>
                        {/* Quiz ID */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-medium mb-2">Quiz ID</label>
                            <input
                                type="text"
                                value={quizId}
                                onChange={(e) => setQuizId(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none text-sm"
                                placeholder="Enter the Quiz ID"
                                required
                            />
                        </div>


                        {/* Question */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-medium mb-2">Question</label>
                            <input
                                type="text"
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none text-sm"
                                placeholder="Enter your question"
                                required
                            />
                        </div>

                        {/* Options */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-medium mb-2">Options</label>
                            {options.map((option, index) => (
                                <div key={index} className="flex items-center space-x-2 mb-3">
                                    <input
                                        type="text"
                                        value={option}
                                        onChange={(e) => handleOptionChange(index, e.target.value)}
                                        className="w-4/5 p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none text-sm"
                                        placeholder={`Option ${index + 1}`}
                                        required
                                    />
                                    <input
                                        type="radio"
                                        name="correctAnswer"
                                        value={index}
                                        checked={correctAnswer === index}
                                        onChange={() => handleCorrectAnswerChange(index)}
                                        className="form-radio h-5 w-5 text-blue-600"
                                    />
                                </div>
                            ))}
                            <div className="mt-2">
                                <span className="text-gray-500 text-sm italic">
                                    Select the radio button next to the correct option
                                </span>
                            </div>
                        </div>



                        {/* Explanation */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-medium mb-2">Explanation</label>
                            <textarea
                                value={explanation}
                                onChange={(e) => setExplanation(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none text-sm"
                                placeholder="Provide an explanation for the correct answer"
                                rows={4} // Added rows for better multi-line input
                                required
                            />
                        </div>


                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
                            disabled={loading}
                        >
                            {loading ? 'Adding Question...' : 'Add Question'}
                        </button>
                        <button
                            onClick={() => navigate('/quiz')}
                            className="mb-4 w-full px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                        >
                            Go to Quiz Page
                        </button>
                    </form>
                    {/* Success or Error message */}
                    {success && <div className="mt-4 text-green-600">{success}</div>}
                    {error && <div className="mt-4 text-red-600">{error}</div>}
                </div>
            </div>
        </div>
    );
};

export default CreateQuiz;