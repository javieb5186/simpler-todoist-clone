# User Stories

## Default State

### SideBar

**As a** customer,  
**I want** to see a clear, accessible, and coherent sidebar,
**so that** I can navigate to where I need to efficiently.

#### **Acceptance Criteria**:

- Common tasks and actions are listed in a column
- Categories listed after common tasks/actions

**As a** customer,  
**I want** to see a button to create categories,  
**so that** I can organize my to dos.

#### **Acceptance Criteria**

- There is an input to add category
- On complete, updates database

### Main

**As a** customer,  
**I want** to see a list of tasks for today,
**so that** I can focus on tasks that need to be completed soon.

#### **Acceptance Criteria**:

- Main renders the today tasks
- If applicable, sort by nearest time

## Popups

### Add Task

**As a** customer,
**I want** to create a task on a popup,  
**so that** I can have the same experience when creating a task wherever.

#### **Acceptance Criteria**

- An add task popup will open
- Includes: Add Title and Description, Set Date and Time, Caetgory selection, and cancel and add task button

### Category Selection

**As a** customer,
**I want** to select a category via a popup,  
**so that** whenever I need to set anything to a category anywhere, I have a similar experience.

#### **Acceptance Criteria**

- A category popup can open
- If applicable: A search for faster selection and categories

### Calendar

**As a** customer,
**I want** to have a calendar popup,  
**so that** whenever I select a date, I will have a similar experience.

#### **Acceptance Criteria**

- A calendar popup can open
- Can navigate back and forth to different months
- Past days are disabled

### Edit

**As a** customer,
**I want** to have a edit popup,  
**so that** whenever I want to, I can edit the detail of the item I selected.

#### **Acceptance Criteria**

- An edit popup can open
- Includes: Edit, Set Date, and Set Time

## Upcoming

### Main

**As a** customer,
**I want** to be able to view all upcoming tasks,  
**so that** I can anticipate and plan for upcoming tasks.

#### **Acceptance Criteria**

- Main renders upcoming tasks when clicking upcoming
- Displays current and upcoming days and their tasks
- Restricted to per week

## Completed

### Main

**As a** customer,
**I want** to be able to view all completed tasks,  
**so that** I can review and track what tasks I have completed.

#### **Acceptance Criteria**

- Main renders completed tasks when clicking completed
- Displays a history of completed tasks
- Save history for 1 day

## Core Functionality

### SideBar

#### Task counter

**As a** customer,
**I want** to be able to view the amount of tasks in a category or section,  
**so that** I can, at a glance, see the amount of tasks to be aware of the amount.

#### **Acceptance Criteria**

- Category or section has a counter to the right

### Main

**As a** customer,
**I want** to be able to add tasks in today, upcoming, and categories,  
**so that** I can easily add tasks when looking at main.

#### **Acceptance Criteria**

- Todays tasks have an add task button at the bottom of the tasks
- Upcoming tasks have an add task button at the bottom of the tasks for each day
- Any category tasks have an add task button at the bottom of the tasks
- Pressing button will open add task modal

**As a** customer,
**I want** to be able to complete any task by pressing a button,  
**so that** I can complete a task and move it to completed.

#### **Acceptance Criteria**

- All tasks have a button to complete it.
- Completing tasks will move it to completed

**As a** customer,
**I want** to be able to edit any task,  
**so that** I can adjust the text, date, or time if needed.

#### **Acceptance Criteria**

- All tasks have an edit button which opens edit modal.
- Pressing any button, will open the modal with filled data.

### Search

**As a** customer,
**I want** to have a search functionality,  
**so that** I can quickly find keywords in tasks.

#### **Acceptance Criteria**

- A search renders in main
- Includes: An input for typing and recently viewed

### Responsive

**As a** cross device customer,
**I want** todoist to be responsive,  
**so that** I can easily view the app on mobile or desktop

#### **Acceptance Criteria**

- App is reponsive to smallest mobile device.
- Sidebar is false toggled by default for mobile
