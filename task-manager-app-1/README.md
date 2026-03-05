# Task Manager App

## Overview
This is a simple task manager application that allows users to create, categorize, and manage their tasks. The application connects to a database to store task information and provides a RESTful API for task operations.

## Features
- Add new tasks with a title and category
- Mark tasks as complete or incomplete
- Categorize tasks for better organization
- Retrieve a list of all tasks

## Technologies Used
- TypeScript
- Express.js
- Database (e.g., Supabase)

## Project Structure
```
task-manager-app
├── src
│   ├── app.ts                # Entry point of the application
│   ├── controllers
│   │   └── tasksController.ts # Handles task-related requests
│   ├── models
│   │   └── task.ts           # Represents the task entity
│   ├── routes
│   │   └── tasks.ts          # Sets up task-related routes
│   ├── services
│   │   └── taskService.ts     # Contains database operations for tasks
│   └── types
│       └── index.ts          # Defines task-related interfaces
├── package.json               # npm configuration file
├── tsconfig.json              # TypeScript configuration file
└── README.md                  # Project documentation
```

## Setup Instructions
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd task-manager-app
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Configure your database connection in `src/app.ts`.
5. Start the application:
   ```
   npm start
   ```

## Usage
- Use the API endpoints to manage tasks:
  - `POST /tasks` to add a new task
  - `GET /tasks` to retrieve all tasks
  - `PATCH /tasks/:id` to toggle task completion status

## Contributing
Feel free to submit issues or pull requests for improvements or bug fixes.