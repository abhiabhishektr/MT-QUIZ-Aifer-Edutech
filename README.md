# Quiz Web App - Aifer Edutech

This is a Quiz Web App developed as part of a challenge for Aifer Edutech. It contains both frontend and backend components, with additional improvements and security features.

## Features

- **React Frontend**:
  - Five questions for each test.
  - Interactive UI with options that change color when selected.
  - Explanations hidden initially and can be expanded upon clicking.
  - Answers are displayed with color feedback (red or green) after explanation.

- **Node.js Backend**:
  - Provides data to the React frontend.
  - Implements security features such as CORS, rate-limiting, logging, and helmet.
  - Route validation to ensure proper API requests.

- **CI/CD**:
  - Integrated Continuous Integration and Continuous Deployment pipelines.

- **Hosting**:
  - Hosted on AWS for both frontend and backend.

## Links

- **GitHub Repository**: [MT-QUIZ-Aifer-Edutech](https://github.com/abhiabhishektr/MT-QUIZ-Aifer-Edutech)
- **Backend**: [API Endpoint](https://projects.abhishektr.in/Aifer/api/questions)
- **API Documentation**: [Postman API Docs](https://documenter.getpostman.com/view/31049459/2sAYJ7hzMi)
- **Frontend**: [Live App](https://aifer.abhishektr.in)

## Setup Instructions

1. Clone this repository:
   ```bash
   git clone https://github.com/abhiabhishektr/MT-QUIZ-Aifer-Edutech.git
   ```
   
2. **Backend Setup**:
   - Navigate to the backend directory:
     ```bash
     cd backend
     ```
   - Install dependencies using `yarn`:
     ```bash
     yarn install
     ```
   - Run the backend server:
     ```bash
     yarn start
     ```

3. **Frontend Setup**:
   - Navigate to the frontend directory:
     ```bash
     cd frontend
     ```
   - Install dependencies using `yarn`:
     ```bash
     yarn install
     ```
   - Run the frontend application:
     ```bash
     yarn start
     ```

## Additional Features

- Implemented CI/CD pipelines for automated deployments.
- Deployed both frontend and backend on AWS.

