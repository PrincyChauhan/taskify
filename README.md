# Task Management System

This project is a Task Management System that consists of both User and Admin modules. The system allows the Admin to create users, assign tasks, and manage subtasks. It also includes authentication and task assignment features, ensuring efficient task management.

## Features

### Admin Module:

- **Create User**: Admin can create a new user, and an invitation email is sent to the user.
- **User Login**: Users can log in with credentials.
- **Task Assignment**: Admin can assign tasks to users.
- **View Users**: Admin can view all registered users.

### User Module:

- **User Login**: Users can log in via email and password sent by the admin.
- **View Tasks**: Users can view all tasks assigned to them.
- **Update Task** Status: Users can update the status of their assigned tasks (e.g., mark as "Completed").

### Task Module:

- **Create Task**: Admin can create a task with associated subtasks.
- **Update Task**: Admin can update an existing task, including subtasks.
- **Delete Task**: Admin can delete a task.
- **View Tasks**: Admin can view all tasks.
- **Update Task Status**: Admin can update the status of a task.
- **View Task Count**: Admin can get the total task count.

### Sub Task Module:

- **Create Subtask**: Admin can create subtasks for tasks.
- **Update Subtask**: Admin can update existing subtasks.
- **Delete Subtask**: Admin can delete a subtask.
- **View Subtask Count**: Admin can get the count of subtasks.

## Endpoints

### Admin Routes

- `POST /admin/signup`: Admin sign-up endpoint.
- `POST /create-invite-user`: Admin creates and invites a new user.
- `POST /signin`: User sign-in endpoint.
- `GET /get-users`: Get all users (Admin only).

### Task Routes

- `POST /create-task`: Admin creates a task with subtasks.
- `POST /update-task/:taskId`: Admin updates an existing task with subtasks.
- `GET /get-tasks`: Get all tasks (Admin only).
- `GET /get-task/:taskId`: Get a specific task by ID.
- `DELETE /delete-task/:taskId`: Admin deletes a task.
- `POST /update-task-status`: Update the status of a task.
- `GET /task-counts`: Get the total task count.

### User Routes

- `GET /get-tasks/:userId`: Get all tasks assigned to the user by `userId`.
- `POST /update-task-status`: User updates the status of a task assigned to them.
- `GET /get-subtasks/:taskId`: Get all subtasks associated with the specified task ID.

### Subtask Routes

- `POST /create-subtask`: Admin creates a new subtask.
- `POST /update-subtask`: Admin updates an existing subtask.
- `POST /delete-subtask`: Admin deletes a subtask.
- `GET /get-subtask/:subtaskId`: Get a specific subtask by ID.
- `GET /subtask-count`: Get the total subtask count.

## Tech Stack

<p align="left">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js"/>
  <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL"/>
  <img src="https://img.shields.io/badge/Sequelize-03AFEF?style=for-the-badge&logo=sequelize&logoColor=white" alt="Sequelize"/>
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"/>
  <img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT"/>
  <img src="https://img.shields.io/badge/Nodemailer-3498DB?style=for-the-badge&logo=gmail&logoColor=white" alt="Nodemailer"/>
  <img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white" alt="Postman"/>
</p>
