import React from "react";
import { GitHubProvider } from "./context/GitHubContext";
import InputBox from "./components/InputBox/InputBox";
import './App.css';
import ErrorBoundary from "./ErrorBoundary";

const App: React.FC = () => {

  return (
    <GitHubProvider>
      <ErrorBoundary>
        <InputBox />
      </ErrorBoundary>
    </GitHubProvider>
  );
};

export default App;
