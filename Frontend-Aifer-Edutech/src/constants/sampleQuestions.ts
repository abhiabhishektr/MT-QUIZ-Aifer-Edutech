import { Question } from "../pages/QuizApp";

export const questions: Question[] = [
    {
        "question": "What is the capital of France?",
        "options": [
            "Paris",
            "Berlin",
            "Madrid",
            "Rome"
        ],
        "correctAnswer": 0,
        "explanation": "think of the capital of France",
        "quizId": "sasa"
    },
    {
        "question": "What is the capital of France?",
        "options": [
            "Paris",
            "Berlin",
            "Madrid",
            "Rome"
        ],
        "correctAnswer": 0,
        "explanation": "think of the capital of France",
        "quizId": "math-001"
    },
    {
        "question": "What is the capital of France?",
        "options": [
            "Paris",
            "Berlin",
            "Madrid",
            "Rome"
        ],
        "correctAnswer": 0,
        "explanation": "Paris is the capital of France.",
        "quizId": "quiz123"
    },
    {
        "question": "What is the capital of France?",
        "options": [
            "Paris",
            "Berlin",
            "Madrid",
            "Rome"
        ],
        "correctAnswer": 0,
        "explanation": "Paris is the capital of France.",
        "quizId": "quiz124"
    }
]

// Fetch questions on component mount
//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const data = await getAllQuestions();
//         setQuestions(data);
//       } catch (err) {
//         setError('Error fetching questions. Please try again.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchQuestions();
//   }, []);