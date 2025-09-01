# Simpler Todoist Clone

A clean and responsive to-do list app inspired by Todoist, built for learning and showcasing front-end engineering skills. **All features are implemented without a backend—using a client-side database**.

## IMPORTANT

> This project is a simplified clone for educational purposes only. Please support the original app at [Todist.com](https://www.todoist.com/).

## Quick Preview

Checkout live website at: [Todoist Clone Vercel App](https://simpler-todoist-clone.vercel.app/)

### Task Creation

Create tasks in:

- The always available add task button in sidebar
- In Todays task
- In Upcoming tasks, a view of all tasks for a given week
- Or in any category selected
  
![todoist-task-creation](https://github.com/user-attachments/assets/2e6ec220-4c32-43b8-8ad0-afa6e1b61409)

### Keyword search

Search for keywords in the title or description of a task.

Keywords are also saved as button in case you need to search again for the keyword later. Saved by session.

![todist-create-and-search-task](https://github.com/user-attachments/assets/13382f14-28a3-4286-b29b-d668a637249d)

### Completing a task

All interactive tasks can completed by checkmarking it. They will be moved into completed with a timestamp for completion and will be removed the next day.

![todoist-complete-task](https://github.com/user-attachments/assets/89abea0b-5237-4ef5-b0c6-8fe8b9489dd2)

### Expired Tasks

Tasks past due by date will be moved into overdue.

![todoist-overdue](https://github.com/user-attachments/assets/8d2acfdd-580f-435b-a286-75d09014ec0d)

### 

## Tech Stack

- React – UI component architecture

- TypeScript – Type-safe JavaScript

- Tailwind CSS – Utility-first styling

- Vite – Fast development/build tool

- Sql.js – Front-end database for storing tasks

- Calendar.js – Custom calendar logic

- Figma – Design/prototyping

- ESLint & Prettier – Code quality and formatting

- Vercel – Deployment

- Git/GitHub – Version control

## Design (Figma)

You can view the full design [here](https://www.figma.com/design/8JFoXj8L31TZR6YgiWT3Uz/Todist?m=auto&t=czCg1iuOXjtQFcAt-1).

## Documentation

- [User Stories](docs/user-stories.md)

## Installing & Running Locally

1. Clone repo
2. Install Dependencies: `npm install`
3. Run Server: `npm run server`
4. Open google chrome and go to: `localhost:5173`

## Layout Overview

### Sidebar

- Navigation: Add Task, Search, Today, Upcoming, Completed, Overdue

- Category list with task counters

- Sidebar is always visible for quick access

### Main Area

- Content dynamically updates based on sidebar selection

- Default view is Today

- All task interaction (view/edit/complete) happens here

## Features

### Task Management

- Add tasks with customizable title, description, date, time, and category

- Edit and complete tasks

- Persistent task storage using `sql.js`.

- Tasks auto-expire from the “Completed” view after 1 day

### Smart Search

- Search tasks by keyword (title/description)

- Saves recent searches as quick filters

- Excludes completed tasks from results

### Views

- Today – All tasks due today

- Upcoming – Weekly view with ability to add/edit for any day

- Overdue – Tasks past their due date

- Completed – Shows timestamp of completion

### Custom Categories

- Default: Personal, Work, Other

- Add your own categories

- Category views show task counts and filter tasks by type

### Purpose

This project was built to:

- Practice TypeScript and state management in React

- Explore client-side data persistence using sql.js

- Emulate core UX patterns of a modern task manager

- Serve as a portfolio piece for front-end engineering roles
