# Job Matching Platform

A full-stack job matching platform that connects candidates with relevant job opportunities using a skill-based matching system. The project includes role-based access for candidates and recruiters, authentication, skill management, job creation, and match scoring. It is built with React on the frontend, Node.js + Express on the backend, Sequelize ORM, and PostgreSQL on Supabase.

## Live Demo

- Frontend: https://job-matching-platform-two.vercel.app/  
- Backend: https://job-matching-platform-jgbg.onrender.com

## Features

- User registration and login
- JWT-based authentication
- Role-based access for candidates and recruiters
- Candidate skill management
- Recruiters can create jobs and define required skills
- Skill-based job matching
- Match score calculation and ranking
- Candidate job applications
- Recruiter view for applicants per posted job
- Deployed frontend and backend

## Tech Stack

### Frontend
- React (Create React App)
- Axios
- Bootstrap

### Backend
- Node.js
- Express.js
- Sequelize ORM
- JWT
- bcryptjs

### Database
- PostgreSQL on Supabase
- Transaction Pooler recommended for Render deployment

### Deployment
- Frontend: Vercel
- Backend: Render

## Project Structure

job-matching-platform/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── server.js
│   └── .env
└── frontend/
    ├── src/
    │   ├── pages/
    │   ├── components/
    │   ├── App.js
    │   └── index.js
    └── .env

## How It Works

1. A user registers as either a candidate or recruiter.
2. The backend hashes the password and stores the user in PostgreSQL.
3. On login, the backend verifies credentials and returns a JWT token.
4. Candidates add their skills.
5. Recruiters post jobs and attach required skills.
6. The matching engine compares candidate skills with job skills.
7. Candidates see matched jobs and can apply.
8. Recruiters can view applicants for the jobs they posted.

## Matching Logic

Job matching is based on skill overlap.

**Match Score = (Matched Skills / Total Job Skills) × 100**

Jobs are ranked by match score so the most relevant jobs appear first.

## API Endpoints

### Auth
- `POST /auth/register`
- `POST /auth/login`

### User
- `POST /user/skills`
- `GET /user/profile`

### Jobs
- `POST /jobs`
- `POST /jobs/:id/skills`
- `GET /jobs`
- `GET /jobs/match`
- `POST /jobs/apply/:jobId`
- `GET /jobs/applicants`

## Setup Instructions

### 1) Clone the repository

git clone https://github.com/sreekruthy/job-matching-platform.git
cd job-matching-platform

### 2) Backend Setup

cd backend
npm install

Create a .env file inside backend/:

```env
PORT=5001
DATABASE_URL=postgresql://postgres.rtuussegktnmgocasjvv:sreekruthy15@aws-1-ap-southeast-2.pooler.supabase.com:6543/postgres
JWT_SECRET=secret123
```

Start the backend:
node server.js

If configured correctly, the server should start and the database should sync successfully.

### 3) Frontend Setup

cd frontend
npm install

Create a .env file inside frontend/:

```env
REACT_APP_API_URL=http://localhost:5001
```

Start the frontend:
npm start

The app will run at `http://localhost:3000`.

## Deployment Guide

### Backend on Render

1. Create a new Web Service on Render.
2. Connect the GitHub repository.
3. Set the root directory to `backend`.
4. Set the build command to: npm install
5. Set the start command to: node server.js
6. Add environment variables:
```env
DATABASE_URL=postgresql://postgres.rtuussegktnmgocasjvv:sreekruthy15@aws-1-ap-southeast-2.pooler.supabase.com:6543/postgres
JWT_SECRET=secret123
PORT=5001
```

### Frontend on Vercel

1. Import the GitHub repository into Vercel.
2. Set the root directory to `frontend`.
3. Add the environment variable:
```env
REACT_APP_API_URL= https://job-matching-platform-jgbg.onrender.com
```
4. Deploy the frontend.

## Typical User Flow

### Candidate Flow

1. Register as a candidate
2. Login
3. Add skills
4. View job matches
5. Apply for jobs

### Recruiter Flow

1. Register as a recruiter
2. Login
3. Post a job
4. Add required skills to the job
5. View applicants for posted jobs

## Common Issues and Fixes

### Login or registration fails
- Verify `REACT_APP_API_URL` on the frontend.
- Make sure the backend service is running.
- Confirm the backend route paths are correct.

### Cannot connect to database
- Use the Supabase connection string.
- For Render, use the Supabase Transaction Pooler if required.
- Ensure the database credentials are correct.

### CORS errors
- Confirm CORS is enabled in the backend.
- Make sure the frontend URL is allowed.

### Empty match results
- Add skills to the candidate profile.
- Add skills to the posted job.
- Ensure job matching data exists in the database.

## Future Improvements

- Advanced filters for jobs
- Pagination
- Recruiter dashboard analytics
- Resume upload and parsing
- AI-based job recommendations
- Better UI/UX improvements

## Author

Tummala Sreekruthy Reddy

## Acknowledgements

- Supabase for PostgreSQL hosting
- Render for backend deployment
- Vercel for frontend deployment

---


