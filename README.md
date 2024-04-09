# TaskTree

TaskTree is a platform to manage your tasks. Manage your tasks, cooperate with your partners and integrate your calendar all in one.

## Description

### Features

- Hierarchical Task Visualization: Treeview presents the structure of your tasks in a clear, hierarchical manner.
- Day View for Daily Goals: The Day View feature is designed to highlight your tasks for the day.
- Collaborative Chatroom: built-in chatroom facilitates real-time discussions with your partners, ensuring everyone is aligned and can share insights, updates, and feedback instantaneously.
- Google Calendar Integration: This feature allows you to synchronize your tasks with your calendar, providing a holistic view of your deadlines and commitments.

## Tech stack and frameworks

### Frontend

- Vite
- React.js
- FullCalendar
- TypeScript
- MUI
- react-route-dom

### Backend

- Node.js
- Express.js
- Socket.io
- OAuth
- RabbitMQ
- jsonwebtoken

### Deployment

- GCP

### DB schema

![db_schema](./image/db_schema.png)

## Run the project

If you want to run this project, you can follow the steps below.

### 1. Clone this project

```
git clone https://github.com/JimboLiao/TaskTree.git
```

### 2. Backend settings

#### Download dependencies

```
cd backend
npm install
```

#### Env settings

Create a `.env` file under directory `backend/` and setting variables.
You can follow the `.env.example`.

#### DB initialize

First, create the database tables according the prisma schema

```
npx prisma migrate dev --name 'init'
```

Then you can use seed to initialize some test data

```
npx prisma db seed
```

#### Run backend

Now, you could run the server by

```
npm run dev
```

### 3. Froneend settings

#### Download depencies

```
cd frontend
npm install
```

#### Env settings

Create a `.env.local` file under directory `frontend/` and setting variables.
You can follow the `.env.example`.

#### Run frontend

Now, you could run the frontend by

```
npm run dev
```

_This is a personal project for personal uses_
