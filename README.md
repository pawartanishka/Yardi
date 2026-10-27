# 🚀 YARDI LaunchPad – 15-Day Pre-Joining Journey Platform

> **Empowering new hires from the moment they accept their offer until their first day at Yardi.**

---

## 📖 Overview

**YARDI LaunchPad** is an interactive, gamified pre-boarding and learning platform designed for incoming employees. Starting from the offer acceptance stage, new hires embark on a structured **15-Day Pre-Joining Journey** that prepares them culturally, technically, and operationally before Day 1.

Instead of traditional static PDF handbooks or dry email attachments, **LaunchPad** transforms pre-boarding into an engaging experience with interactive scenarios, daily streaks, XP points, milestone badges, knowledge checks, and progress tracking.

---

## 🎯 Key Objectives

1. **Reduce Day 1 Anxiety**: Give candidates a clear roadmap of what to expect, whom they will work with, and what tools they will use.
2. **Culture & Values First**: Impart Yardi's core philosophy—taking care of clients, employees, and communities.
3. **Interactive & Gamified Learning**: Encourage daily engagement through streak rewards, badges, and scenario-based problem solving.
4. **Day 1 Readiness**: Ensure hardware verification, HR documentation, communication norms, and security guidelines are completed beforehand.
5. **HR & Admin Oversight**: Provide talent development teams with real-time analytics on new hire engagement, quiz performance, and completion rates.

---

## ✨ Core Features

### 👤 For Learners (New Hires)
- **📅 15-Day Guided Journey**: Daily micro-learning modules covering organizational history, team structure, workplace tools, cybersecurity, agile practices, and team introductions.
- **🎮 Gamification & Rewards**:
  - **XP Points**: Earn experience points for completing lessons, readings, and challenges.
  - **Learning Streaks**: Maintain daily streaks with flame indicators and consistency badges.
  - **Achievement Badges**: Unlock collectible badges (*First Step*, *Quiz Master*, *Culture Champion*, *LaunchPad Champion*, etc.).
- **🧩 Diverse Content Formats**:
  - 🎥 **Video Lessons**: Curated walkthroughs and leadership introductions.
  - 📖 **Interactive Readings**: Core playbooks, guidelines, and workplace best practices.
  - ⚔️ **Scenario Challenges**: Real-world workplace problem solving (e.g., code reviews, async collaboration, conflict resolution).
  - 📝 **Knowledge Check Quizzes**: Instant-feedback quizzes with scoring thresholds.
  - 💭 **Reflection Prompts**: Personal goal setting and reflections for the upcoming role.
- **🔔 Live Notifications**: Real-time alerts when new days unlock, badges are awarded, or milestones are reached.
- **📊 Progress & Analytics**: Visual progress bars, daily completion stats, and overall readiness index.
- **👤 Profile Management**: Track individual profile details, joining dates, assigned department, and earned accomplishments.

### 🛡️ For Administrators (Talent & HR Teams)
- **📈 Admin Dashboard & Analytics**: High-level metrics on total onboarded users, average completion rates, active streaks, and engagement trends.
- **👥 User Management**: Monitor candidates' progress, view individual activity completions, and manage accounts.
- **🗺️ Journey Management**: Customize journey day titles, descriptions, XP rewards, and ordering.
- **📚 Activity & Quiz Builder**: Create, edit, and assign videos, readings, scenario challenges, and quizzes dynamically.
- **⚙️ Platform Settings**: Manage platform-wide configurations and learning rules.

---

## 🗺️ The 15-Day Learning Roadmap

| Day | Theme | Description |
|:---:|:---|:---|
| **Day 1** | Welcome to YARDI LaunchPad | Platform introduction, leadership welcome, and pre-boarding expectations. |
| **Day 2** | Understanding the Organization | Yardi legacy, global property tech footprint, and market impact. |
| **Day 3** | Culture & Core Values | Core ethos: taking care of clients, employees, and communities. |
| **Day 4** | People & Teams | Organizational structure, squads, and cross-functional teams. |
| **Day 5** | Communication & Collaboration | Mastering asynchronous workflows, meeting hygiene, and constructive feedback. |
| **Day 6** | Workplace Tools & Tech Ecosystem | Cloud toolchains, development environments, and communication tools. |
| **Day 7** | Security & Data Awareness | Enterprise data privacy, cybersecurity standards, and compliance. |
| **Day 8** | Professional Skills & Agility | Problem decomposition, time management, and agile delivery. |
| **Day 9** | Workplace Etiquette & Inclusivity | Virtual etiquette, inclusive culture, and collaborative teamwork. |
| **Day 10** | Continuous Learning & Growth | Certifications, internal learning portals, and mentorship pathways. |
| **Day 11** | Role Preparation & Expectations | Squad expectations, key deliverables, and the first 90-day roadmap. |
| **Day 12** | Real-World Scenarios & Case Studies | Practical software engineering and client-success case studies. |
| **Day 13** | Connect & Engage | Meet your assigned buddy, join employee resource groups, and squad intro. |
| **Day 14** | Final Day 1 Checklist & Verification | Hardware check, HR documents verification, and Day 1 reporting link. |
| **Day 15** | LaunchPad Completion & Celebration | Final readiness assessment, reflection, and graduation certificate. |

---

## 🛠️ Technology Stack

### **Frontend**
- **Framework**: [React](https://react.dev/) (Vite bundler for ultra-fast HMR)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (modern responsive UI, glassmorphism, gradient accents)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: [React Router DOM](https://reactrouter.com/)
- **HTTP Client**: [Axios](https://axios-http.com/)

### **Backend**
- **Runtime**: [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) via [Mongoose ODM](https://mongoosejs.com/)
- **Authentication**: JWT (JSON Web Tokens) with secure [bcryptjs](https://github.com/dcodeIO/bcrypt.js) password hashing
- **Development Tooling**: Concurrently & Nodemon

---

## 📂 Project Architecture

```
Yardi/
├── client/                     # Frontend Application (React + Vite)
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── assets/             # Images and design graphics
│   │   ├── components/         # Reusable UI components (Sidebar, Navbar, Cards, Badges)
│   │   ├── context/            # AuthContext and state providers
│   │   ├── data/               # Static fallbacks and constants
│   │   ├── pages/
│   │   │   ├── admin/          # Admin pages (Dashboard, Users, Journey, Activities, Quizzes)
│   │   │   ├── auth/           # Login, Register, Forgot Password
│   │   │   └── user/           # Learner pages (Dashboard, Journey, DayDetails, Progress, etc.)
│   │   ├── routes/             # ProtectedRoute and AppRoutes definition
│   │   ├── services/           # Axios API services
│   │   ├── App.jsx             # Main App layout
│   │   └── index.css           # Global stylesheet & Tailwind directives
│   ├── package.json
│   └── vite.config.js
│
├── server/                     # Backend API (Node.js + Express + Mongoose)
│   ├── config/                 # Database connection config
│   ├── controllers/            # Route business logic (Auth, Journey, Activities, Quizzes, etc.)
│   ├── middleware/             # Auth & Role verification middleware
│   ├── models/                 # Mongoose schemas (User, JourneyDay, Activity, Quiz, Badge, etc.)
│   ├── routes/                 # Express API routes
│   ├── seed/                   # Database seeder (sample users, 15 days, Day 5 activities)
│   ├── utils/                  # Token generators, streak calculators, badge assigners
│   ├── server.js               # Express app entry point
│   ├── package.json
│   └── .env.example            # Environment variable template
│
├── package.json                # Root package with monorepo scripts
└── README.md                   # Project documentation
```

---

## ⚡ Getting Started

### 1. Prerequisites
Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MongoDB](https://www.mongodb.com/try/download/community) (running locally on port `27017` or a MongoDB Atlas URI)
- [Git](https://git-scm.com/)

---

### 2. Installation

Clone the repository and install all dependencies for the root, server, and client:

```bash
# Clone the repository
git clone https://github.com/pawartanishka/Yardi.git

# Navigate into the project folder
cd Yardi

# Install all dependencies across root, server, and client
npm run install:all
```

---

### 3. Environment Variables Setup

Configure the backend environment variables in `server/.env`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/yardi_launchpad
JWT_SECRET=yardi_launchpad_jwt_secret_key_2026_super_secure
JWT_EXPIRE=30d
NODE_ENV=development
```

---

### 4. Database Seeding (Sample Data)

Populate the database with pre-configured demo users, 15-day journey metadata, Day 5 interactive content, quizzes, and badges:

```bash
npm run seed
```

---

### 5. Running the Application

Launch both the Express backend and React Vite frontend concurrently with a single command:

```bash
npm run dev
```

- **Frontend**: Accessible at [http://localhost:5173](http://localhost:5173)
- **Backend API**: Accessible at [http://localhost:5000](http://localhost:5000)

---

## 🔑 Demo Credentials

Once the seed script has run, use the following pre-configured accounts:

### 🎓 Learner Account (New Hire)
- **Email**: `user@yardi.com`
- **Password**: `User@123`
- *Access*: Learner Dashboard, 15-Day Roadmap, Interactive Lessons, Quizzes, Badges, Streaks.

### 🛡️ Admin Account (HR / Talent Lead)
- **Email**: `admin@yardi.com`
- **Password**: `Admin@123`
- *Access*: Admin Dashboard, Analytics, User Progress Monitoring, Journey & Activity Management.

---

## 🔒 Security & Best Practices
- **Password Hashing**: Passwords stored securely using salt-hashed `bcryptjs`.
- **JWT Protection**: Protected routes authenticated via bearer token middleware with role checking (`user` vs `admin`).
- **Input Validation**: Sanitized MongoDB queries and structured schema validations.

---

## 📄 License
This project is proprietary and intended for **Yardi Systems** pre-onboarding workflows.
