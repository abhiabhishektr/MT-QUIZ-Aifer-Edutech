import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';
import Landing from './pages/Landing';
import CreateQuiz from './pages/CreateQuiz';
import QuizApp from './pages/QuizApp';

function App() {
    return (
        <ErrorBoundary>
            <Router>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/create-question" element={<CreateQuiz />} />
                    <Route path="/take-quiz" element={<QuizApp />} />
                </Routes>
            </Router>
        </ErrorBoundary>
    );
}

export default App;
