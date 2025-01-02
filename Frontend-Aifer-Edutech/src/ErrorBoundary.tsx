import  { Component, ReactNode } from 'react';

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(): ErrorBoundaryState {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-100">
                    <div className="text-center bg-white p-6 rounded-md shadow-md">
                        <h1 className="text-2xl font-bold text-red-500 mb-4">Oops! Something went wrong.</h1>
                        <p className="text-gray-700 mb-4">Please contact the developer for assistance.</p>
                        <div className="flex justify-center space-x-4">
                            <a
                                href="https://github.com/abhiabhishektr"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 underline"
                            >
                                GitHub
                            </a>
                            <a
                                href="https://www.linkedin.com/in/abhiabhishektr/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 underline"
                            >
                                LinkedIn
                            </a>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
