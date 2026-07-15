# ResumeAI

<div align="center">

### AI-Powered Resume Analyzer & ATS Optimizer

Analyze resumes, compare them against job descriptions, improve ATS compatibility, and generate ATS-friendly LaTeX resumes using Google Gemini AI.

**Live Demo:** https://ai-resume-analyzer-52.vercel.app

</div>

---

## Overview

ResumeAI is a full-stack AI application that helps job seekers optimize their resumes for Applicant Tracking Systems (ATS).

The application analyzes resumes, compares them with job descriptions, provides actionable feedback, identifies missing skills, suggests important keywords, and generates an ATS-friendly LaTeX version of the resume.

---

## Features

* Google Authentication (Auth.js)
* ATS Score Analysis
* Job Description Matching
* Resume Strength & Weakness Analysis
* Missing Skills Detection
* Keyword Recommendations
* AI Resume Suggestions
* ATS Report Export (PDF)
* ATS-Friendly LaTeX Resume Generation
* Resume Analysis History
* Responsive Dashboard
* Modern UI with Tailwind CSS

---

## Tech Stack

### Frontend

* Next.js 16
* React 19
* Tailwind CSS
* Framer Motion
* Lucide React

### Backend

* Next.js App Router
* MongoDB Atlas
* Mongoose
* Auth.js

### AI

* Google Gemini 2.5 Flash

### Deployment

* Vercel

---

## Screenshots

### Landing Page

<p align="center">
<img src="./screenshot/landing.png" width="900"/>
</p>

---

### Dashboard

<p align="center">
<img src="./screenshot/dashboard.png" width="900"/>
</p>

---

### Analysis History

<p align="center">
<img src="./screenshot/history.png" width="900"/>
</p>

---

### User Profile

<p align="center">
<img src="./screenshot/profile.png" width="900"/>
</p>

---

## Installation

Clone the repository

```bash
git clone https://github.com/Yuvraj2005-commits/AI-resume-analyzer.git
```

Move into the project

```bash
cd ai-resume-analyzer
```

Install dependencies

```bash
npm install
```

Run the development server

```bash
npm run dev
```

Open:

```
http://localhost:3000
```

---

## Environment Variables

Create a `.env.local` file.

```env
GOOGLE_GENERATIVE_AI_API_KEY=

AUTH_SECRET=

AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=

MONGODB_URI=

NEXTAUTH_URL=http://localhost:3000
```

---

## Project Structure

```
src/
│
├── app/
│   ├── api/
│   ├── dashboard/
│   ├── history/
│   ├── profile/
│   └── rewrite/
│
├── components/
│   ├── dashboard/
│   └── ui/
│
├── lib/
│
├── models/
│
└── auth.ts
```

---

## AI Analysis Includes

* ATS Score
* Job Match Percentage
* Strengths
* Weaknesses
* Resume Suggestions
* Missing Skills
* Keyword Recommendations
* ATS-Friendly LaTeX Resume Generation

---

## Future Improvements

* Resume PDF Upload
* DOCX Resume Support
* Cover Letter Generator
* Resume Templates
* Multiple Resume Management
* LinkedIn Profile Analysis
* AI Interview Preparation

---

## Author

**Yuvraj Prakash**

GitHub: https://github.com/Yuvraj2005-commits

LinkedIn: https://linkedin.com/in/yuvraj-prakash

---

If you found this project useful, consider giving it a star.
