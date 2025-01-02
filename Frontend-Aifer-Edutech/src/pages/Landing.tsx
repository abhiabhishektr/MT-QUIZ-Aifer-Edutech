import React from 'react';
import { useNavigate } from 'react-router-dom';

const Landing: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-100">
            <div className="text-center bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome to the Quiz App</h1>
                <p className="text-gray-600 mb-6">
                    Choose an option below to get started:
                </p>
                <div className="space-y-4">
                    <button
                        onClick={() => navigate('/create-question')}
                        className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                    >
                        Create a Question
                    </button>
                    <button
                        onClick={() => navigate('/take-quiz')}
                        className="w-full px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors"
                    >
                        Take a Quiz
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Landing;
