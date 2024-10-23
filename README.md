# RuleEngine with AST

## Description

RuleEngine with AST is a 3-tier application that uses Abstract Syntax Trees (AST) to represent and evaluate conditional rules. It allows users to create, combine, and evaluate rules based on various attributes like age, department, income, etc.

## Features

- Create rules using a simple string syntax
- Combine multiple rules
- Evaluate rules against provided data
- RESTful API for rule management and evaluation
- Web interface for easy interaction with the rule engine

## Technologies Used

- Backend: Node.js, Express.js, MongoDB
- Frontend: React.js
- Database: MongoDB

## Prerequisites

- Node.js (v14 or later)
- MongoDB (v4 or later)
- npm (v6 or later)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Yashwanth023/RuleEngineAST_Assessment.git
    cd rule-engine-ast
    ```

2. Install backend dependencies:
    ```bash
    cd backend
    npm install
    ```

3. Install frontend dependencies:
    ```bash
    cd ../frontend
    npm install
    ```

4. Create a `.env` file in the backend directory with the following content:
    ```bash
    MONGODB_URI=mongodb://localhost:27017/rule-engine
    PORT=3000
    ```

## Running the Application

1. Start the MongoDB server (if not already running)

2. Start the backend server:
    ```bash
    cd backend
    npm start
    ```

3. In a new terminal, start the frontend development server:
    ```bash
    cd frontend
    npm start
    ```

4. Open your browser and navigate to `http://localhost:3001` to access the application

## Usage

1. **Create a Rule:**
    - Navigate to the "Create Rule" page
    - Enter a rule name and rule string (e.g., "age>18 AND income>50000")
    - Click "Create Rule"

2. **Evaluate a Rule:**
    - Navigate to the "Evaluate Rule" page
    - Select a rule from the dropdown
    - Enter JSON data for evaluation (e.g., `{"age": 25, "income": 60000}`)
    - Click "Evaluate Rule" to see the result

3. **Combine Rules:**
    - Navigate to the "Combine Rules" page
    - Select multiple rules to combine
    - Click "Combine Rules" to see the combined AST

## API Endpoints

- `POST /api/rules`: Create a new rule
- `GET /api/rules`: Get all rules
- `POST /api/rules/evaluate`: Evaluate a rule
- `POST /api/rules/combine`: Combine multiple rules
