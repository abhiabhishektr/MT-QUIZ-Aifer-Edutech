import { useEffect, useState } from 'react';
import { questions as sampleQuestions } from '../constants/sampleQuestions'; 
import { getAllQuestions } from '../api/questionApi';
import Spinner from './Spinner';


export interface Question {
    question: string;
    options: string[];
    explanation: string;
    correctAnswer: number;
    quizId: string;
}

const QuizApp = () => {
    const [questions, setQuestions] = useState<Question[]>(sampleQuestions);
    const [object, setObject] = useState({});
    const [loading, setLoading] = useState<boolean>(true);
    const [questionnotArray, setQuestionnotArray] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
    const [showExplanation, setShowExplanation] = useState<Record<string, boolean>>({});
    const [quizResults, setQuizResults] = useState<{
        attended: number;
        correct: number;
        wrong: number;
        percentage: string;
    } | null>({
        attended: 0,
        correct: 0,
        wrong: 0,
        percentage: '',
    });  

    const [showResults, setShowResults] = useState<boolean>(false);  


  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await getAllQuestions();
        setObject(data);
      } catch (err) {
        setError('Error fetching questions. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    if ( Array.isArray(object)) {
        setQuestionnotArray(true);
    } else {
        setQuestionnotArray(false);
    }
    },[object])

    const handleOptionSelect = (questionId: string, optionIndex: number) => {
        setSelectedAnswers((prev) => ({
            ...prev,
            [questionId]: optionIndex,
        }));
    };

    const handleExplanationToggle = (questionId: string) => {
        if (selectedAnswers[questionId] === undefined) {
            alert('Please answer the question before viewing the explanation.');
            return;
        }
        setShowExplanation((prev) => ({
            ...prev,
            [questionId]: !prev[questionId],
        }));
    }; 

    const getOptionStyles = (questionId: string, optionIndex: number) => {
        const isSelected = selectedAnswers[questionId] === optionIndex;

        if (!showExplanation[questionId]) {
            return isSelected ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-50';
        }

        if (isSelected) {
            return optionIndex === questions[currentQuestion].correctAnswer
                ? 'bg-green-500 text-white'
                : 'bg-red-500 text-white';
        }

        return 'bg-white hover:bg-gray-50';
    };

    const getQuestionProgressStyle = (questionId: string) => {
        const answer = selectedAnswers[questionId];
        if (answer === undefined) return 'bg-white';
        else{
            return answer === questions[currentQuestion].correctAnswer
                ? 'bg-blue-500 text-white'
                : 'bg-blue-500 text-white';
        }
            
    };

    const handleSubmit = () => {
        let attended = 0;
        let correct = 0;
        let wrong = 0;
    
        questions.forEach((question) => {
            if (selectedAnswers[question.quizId] !== undefined) {
                attended += 1;
                if (selectedAnswers[question.quizId] === question.correctAnswer) {
                    correct += 1;
                } else {
                    wrong += 1;
                }
            }
        });
    
        if (attended === 0) {
            alert('Please answer at least one question before submitting.');
            return;  
        }
    
        const percentage = ((correct / attended) * 100).toFixed(2);
    
        setQuizResults({
            attended,
            correct,
            wrong,
            percentage,
        });
        setShowResults(true);  
    };
    

    const handleBackToQuestions = () => {
        setShowResults(false);  
    };

    if (loading) {
        return <Spinner />;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-6xl mx-auto">
            <h1 className="text-2xl text-center text-gray-700 mb-6">Aifer Education</h1>
                {showResults ? (
                    <div className="w-full h-screen flex items-center justify-center bg-gray-100">
                        <div className="bg-white rounded-lg shadow-md p-6 text-center max-w-md w-full">
                            <h2 className="text-xl font-medium mb-4">Quiz Results</h2>
                            <p>Attended: {quizResults?.attended}</p>
                            <p>Correct: {quizResults?.correct}</p>
                            <p>Wrong: {quizResults?.wrong}</p>
                            <p>Percentage: {quizResults?.percentage}%</p>
                            <button
                                onClick={handleBackToQuestions}
                                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                            >
                                Back to Quiz
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex gap-8">
                        <div className="flex-grow min-w-[50%]">
                            <div className="bg-white rounded-lg shadow-md p-6 mb-4 border border-gray-300">
                                <div className="text-gray-700 mb-4">
                                    <span className="font-medium">Question {currentQuestion + 1}</span>
                                    <p className="mt-2">{questions[currentQuestion].question}</p>
                                </div>

                                <div className="space-y-3">
                                    {questions[currentQuestion].options.map((option: string, index: number) => (
                                        <button
                                            key={index}
                                            className={`w-full text-left p-4 rounded-md border transition-colors
                                                ${getOptionStyles(questions[currentQuestion].quizId, index)} border-gray-300`}
                                            onClick={() =>
                                                handleOptionSelect(questions[currentQuestion].quizId, index)
                                            }
                                        >
                                            {option}
                                        </button>
                                    ))}
                                </div>

                                <div className="flex justify-between mt-6">
                                    <button
                                        className="px-4 py-2 bg-white rounded-md shadow hover:bg-gray-50 disabled:opacity-50"
                                        onClick={() => setCurrentQuestion((prev) => prev - 1)}
                                        disabled={currentQuestion === 0}
                                    >
                                        Prev
                                    </button>
                                    <button
                                        className="px-4 py-2 bg-white rounded-md shadow hover:bg-gray-50 disabled:opacity-50"
                                        onClick={() => setCurrentQuestion((prev) => prev + 1)}
                                        disabled={currentQuestion === questions.length - 1}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-md p-6">
                                <div className="flex justify-between items-center mb-2">
                                    <h2 className="text-lg font-medium">Explanation</h2>
                                    <button
                                        onClick={() => handleExplanationToggle(questions[currentQuestion].quizId)}
                                        className="text-blue-500 hover:text-blue-600"
                                    >
                                        {showExplanation[questions[currentQuestion].quizId] ? 'Hide' : 'Show'}
                                    </button>
                                </div>
                                {showExplanation[questions[currentQuestion].quizId] && (
                                    <p className="text-gray-600">{questions[currentQuestion].explanation}</p>
                                )}
                            </div>
                        </div>

                        <div className="w-64 flex flex-col gap-4 min-w-[20%]">
                            <div className="bg-white rounded-lg shadow-md p-6">
                                <div className="flex justify-between items-center mb-4">
                                    <span>
                                        Question {currentQuestion + 1}/{questions.length}
                                    </span>
                                    <a href="https://github.com/abhiabhishektr?tab=repositories" target="_blank" rel="noopener noreferrer">
                                        <button className="text-blue-500 hover:text-blue-600">
                                            Need Help?
                                        </button>
                                    </a>
                                </div>

                                <div className="grid grid-cols-5 gap-2">
                                    {questionnotArray? 
                                    questions.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentQuestion(index)}
                                            className={`w-8 h-8 rounded-full flex items-center justify-center
                                            ${currentQuestion === index ? 'bg-blue-500 text-white' : getQuestionProgressStyle(questions[index].quizId)}`}
                                        >
                                            {index + 1}
                                        </button>
                                    ))
                                    :
                                    <p>not available</p>
                                }
                                </div>

                                <button
                                    onClick={handleSubmit}
                                    className="w-full mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuizApp;
