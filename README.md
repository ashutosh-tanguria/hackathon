# StudyOS - AI Powered Learning Operating System

StudyOS is a personalized AI learning platform that helps students define goals, assess their skills, generate adaptive learning roadmaps, track study sessions, reflect on progress, and receive AI-powered guidance.

The goal is to transform self-learning from a fragmented process into a structured, intelligent, and personalized experience.

---

# Problem

Students often struggle with:

- Knowing what to learn next
- Creating structured learning plans
- Tracking consistency
- Understanding weaknesses
- Staying motivated during long learning journeys

Existing platforms provide content, but they do not provide a complete personal learning system.

---

# Solution

StudyOS acts as an AI learning companion that understands a student's goals, analyzes their progress, and continuously guides their learning journey.

The platform combines:

- Goal planning
- AI skill assessment
- Personalized roadmaps
- Study tracking
- Reflection analysis
- Progress analytics
- Real-time AI voice assistance

---

# Key Features

## 1. AI Goal Management

Students define their learning objectives.

Examples:

- Learn Machine Learning
- Prepare for interviews
- Master Web Development

StudyOS uses these goals as the foundation for personalization.

---

## 2. AI Skill Assessment

The assessment system analyzes:

- Current knowledge level
- Strengths
- Weak areas
- Learning requirements

The AI generates personalized insights that help students understand their current position.

---

## 3. Personalized AI Roadmaps

StudyOS automatically generates structured learning paths.

Features:

- Weekly milestones
- Difficulty levels
- Progress tracking
- Completion states

Students always know their next learning step.

---

## 4. Study Sessions

A built-in focus system helps students track learning time.

Features:

- Start study sessions
- Pause/resume tracking
- Session history
- Productivity measurement

---

## 5. Reflection System

After learning, students can reflect on their progress.

AI analyzes reflections and provides:

- Learning summary
- Strength identification
- Improvement areas
- Next actions

---

## 6. Learning Analytics

StudyOS tracks:

- Study time
- Completed milestones
- Sessions
- Reflections

AI generates personalized learning insights.

---

## 7. AI Voice Companion

A real-time conversational AI mentor powered by Gemini Live.

Students can:

- Ask doubts
- Discuss learning plans
- Get motivation
- Receive personalized guidance

---

# System Architecture

```
                         User
                          |
                          |
                    Next.js Frontend
                          |
        -----------------------------------
        |                |                |
       Auth          AI Features      Voice Layer
        |                |                |
   Better Auth      Gemini API       Gemini Live
        |
        |
    Prisma ORM
        |
        |
    PostgreSQL Database


Database Models:

Goals
Assessment
Roadmaps
Roadmap Nodes
Learning Sessions
Reflections
Analytics Data

```

---

# Technology Stack

## Frontend

- Next.js 16
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Lucide Icons

## Backend

- Next.js Server Actions
- WebSocket Server
- Prisma ORM

## Database

- PostgreSQL

## Authentication

- Better Auth

## AI

- Google Gemini API
- Gemini Live API

---

# AI Workflow

```
Student Goal

      |
      v

AI Assessment

      |
      v

Personalized Roadmap

      |
      v

Study Sessions

      |
      v

Reflection Analysis

      |
      v

Analytics + AI Recommendations

```

---

# Project Structure

```
app/
 ├── auth
 ├── dashboard
 ├── api

features/
 ├── goals
 ├── assessment
 ├── roadmap
 ├── reflection
 ├── study-session
 ├── analytics
 └── voice

lib/
 ├── prisma
 ├── auth
 ├── gemini

server/
 └── live-server.ts

```

---

# Local Setup

## Clone Repository

```bash
git clone <repository-url>

cd study-os
```

---

## Install Dependencies

```bash
npm install
```

---

## Environment Variables

Create `.env`

```
DATABASE_URL=

BETTER_AUTH_SECRET=

GEMINI_API_KEY=
```

---

## Database Setup

```bash
npx prisma migrate dev

npx prisma generate
```

---

## Run Development Server

```bash
npm run dev
```

Open:

```
"https://study-os-green-seven.vercel.app"
```

---

# Future Improvements

- Advanced learning recommendations
- AI generated study material
- Community learning spaces
- Mobile application
- More detailed performance analytics
- Adaptive difficulty adjustment

---

# Built With

Next.js + Gemini AI + PostgreSQL

Building a smarter way to learn.