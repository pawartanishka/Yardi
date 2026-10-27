# Phase 0 — Comprehensive Project Audit & Full-Stack Integration Plan

## 1. Executive Summary
The YARDI LaunchPad platform is undergoing a production transition from demo-oriented static/fallback behavior to a real-user application with persistent MongoDB storage, authenticated sessions, real-time curriculum tracking, and complete frontend-to-backend connectivity.

---

## 2. Audit Findings

### 2.1 Demo Data & Automatic Seeding
- **`server/seed/seedData.js`**: Contains destructive `deleteMany()` operations across 8 collections and creates hardcoded demo users (`admin@yardi.com` / `Sarah Connor` and `user@yardi.com` / `Alex Rivera`) with pre-completed Day 5 progress, 1,450 XP, and 5 badges.
- **`server/server.js`**: Starts `app.listen()` synchronously before `connectDB()` completes. Lacks runtime validation for required environment variables (`JWT_SECRET`, `MONGO_URI`).
- **`client/src/pages/auth/Login.jsx`**: Features "Quick Demo Access" buttons that log directly into `user@yardi.com` and `admin@yardi.com`.
- **`client/src/context/AuthContext.jsx`**: Falls back to `mockUser` and a dummy JWT token (`'demo-jwt-token'`) if the backend is unreachable, masking backend disconnects.
- **`client/src/context/JourneyContext.jsx`**: Initializes `days`, `activitiesMap`, and `badges` from `localStorage` or `mockData.js`, handling activity completion and badge unlocks entirely in browser memory.
- **`client/src/context/NotificationContext.jsx`**: Initializes from `mockNotifications` and never fetches from `GET /api/notifications`.

### 2.2 Database Models & Backend Deficiencies
- **`User.js`**: Contains hardcoded defaults (`bio`, `phone: '+1 (555) 234-8921'`, `currentStreak: 1`, `longestStreak: 1`) that assign fake information to newly registered learners.
- **`Activity.js`**: Contains only Day 5 activities in MongoDB. Days 1–4 and 6–15 have zero activities stored in the database.
- **`ActivityProgress.js`**: Lacks a `reflectionAnswer` field to persist user reflection responses.
- **`quizController.js`**: Does not check for previous passing attempts in `submitQuiz()`, awarding duplicate XP on retries.
- **`progressController.js`**: Hardcodes fallback values (`user.overallProgress || 42`, `avgQuiz || 90`, `totalActivities: 58`), displaying fake metrics to real users.
- **`adminController.js`**: Hardcodes fallback statistics (`totalUsers || 148`, `activeUsers || 132`, `completedUsers || 45`, `averageProgress || 68`).

### 2.3 Frontend API Integration Deficiencies
- **`client/src/services/api.js`**: Configured with Axios interceptors, but multiple contexts and pages bypass it, importing raw `axios` without base URLs or Authorization headers.
- **`QuizPlayer.jsx`**: Performs client-side grading using `q.correctAnswer` and does not call `POST /api/quizzes/:id/submit`.
- **`Profile.jsx`**: Updates only local React state and does not call `PUT /api/users/me`.
- **`Progress.jsx`**: Uses hardcoded static arrays (`weeklyData`, `categoryData`) and hardcoded fallback numbers.
- **`Dashboard.jsx` & `DayDetails.jsx`**: Directly import and render `mockQuizDay5`.

### 2.4 Challenges Tab Audit
- The learner `/challenges` route and standalone `Challenges.jsx` page were previously unmounted from `AppRoutes.jsx` and `Sidebar.jsx`.
- Day 5 includes an activity of type `challenge` ("Interactive Scenario: Conflict Resolution & Feedback"), which is rendered by `ChallengeModal.jsx`. This scenario activity will remain functional as an in-journey simulation module without any dedicated Challenges navigation item.

---

## 3. Implementation Phasing Plan

- **Phase 1: Safe Demo Removal & Controlled Migration**
  - Disable automatic/destructive seeding.
  - Create `server/scripts/cleanDemoData.js` to target and clean demo users safely.
  - Create `server/scripts/createAdmin.js` for secure administrator provisioning.
  - Remove "Quick Demo Access" buttons from `Login.jsx`.
  - Remove demo user fallback in `AuthContext.jsx`.

- **Phase 2: Database Configuration & Model Hardening**
  - Validate environment variables at server startup; exit on failure.
  - Await MongoDB connection before starting Express HTTP listener.
  - Clean `User.js` defaults (`bio`, `phone`, initial streaks).
  - Add `reflectionAnswer` to `ActivityProgress.js`.
  - Remove fake fallback stats in `progressController.js` and `adminController.js`.

- **Phase 3: Shared Curriculum Initialization**
  - Implement `server/scripts/initCurriculum.js` to idempotently upsert all 15 Journey Days, activities across the curriculum, quizzes, and badges.

- **Phase 4: Centralized API & Authentication**
  - Standardize `client/src/services/api.js` across all contexts.
  - Connect `AuthContext` to `POST /api/auth/login`, `POST /api/auth/register`, and `GET /api/auth/me`.

- **Phase 5: Journey, Day Details & Activity Completion**
  - Connect `JourneyContext` to `GET /api/journey` and `POST /api/activities/:id/complete`.
  - Connect `DayDetails.jsx` to `GET /api/journey/:dayId`.

- **Phase 6: Quizzes, XP, Badges & Notifications**
  - Connect `QuizPlayer` to `POST /api/quizzes/:id/submit`.
  - Fix quiz XP duplication on retries in `quizController.js`.
  - Connect `Achievements.jsx` to `GET /api/badges`.
  - Connect `NotificationContext` to `GET /api/notifications` and `PUT /api/notifications/:id/read`.

- **Phase 7: Profile & Learning Analytics**
  - Connect `Profile.jsx` to `PUT /api/users/me`.
  - Connect `Progress.jsx` to `GET /api/progress`.

- **Phase 8: Challenges Tab Cleanliness Audit**
  - Verify complete absence of dead routes, dead links, or console errors.

- **Phase 9: Comprehensive End-to-End Validation**
  - Register new learner, verify Day 1 0% starting state, complete activities, submit quizzes, verify persistence across sessions.
