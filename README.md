# Simpler Todoist Clone

A clean and responsive to-do list app inspired by Todoist, built for learning and showcasing front-end engineering skills. **All features are implemented without a backend—using a client-side database**.

## IMPORTANT

> This project is a simplified clone for educational purposes only. Please support the original app at [Todist.com](https://www.todoist.com/).

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
