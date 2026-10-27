# 📋 YARDI LaunchPad – Remaining Tasks & Roadmap

This checklist tracks the pending tasks, enhancements, and operational items required to bring **YARDI LaunchPad** to full production readiness.

---

## 🔴 Phase 1: Immediate & Core Functionality (High Priority)

### 1. Database & Content Seeding
- [ ] **Start Local/Cloud MongoDB**: Ensure MongoDB instance is connected and accessible.
- [ ] **Run Initial Seed Script**: Run `npm run seed` to verify user, badge, day, and activity population without errors.
- [ ] **Populate Activities for Days 1–4 and 6–15**:
  - *Current state*: Only Day 5 has full activities (videos, readings, scenario challenge, quiz, reflection) seeded.
  - *Remaining*: Add curriculum content for the other 14 days in `server/seed/seedData.js` or via the Admin Portal.
- [ ] **Create Knowledge Check Quizzes for All Days**:
  - *Remaining*: Add quiz questions, answer options, and explanations for Days 1–4 and 6–15.

### 2. End-to-End Verification
- [ ] **Learner Flow Test**:
  - Login as `user@yardi.com` / `User@123`.
  - Complete reading, video, scenario, and quiz activities.
  - Verify XP increases and streaks calculate accurately.
  - Check badge unlock modals and in-app notifications.
- [ ] **Admin Flow Test**:
  - Login as `admin@yardi.com` / `Admin@123`.
  - Create/edit a new journey day.
  - Add/modify an activity and a quiz.
  - Inspect user analytics and completion rates.

---

## 🟡 Phase 2: Feature Enhancements & Polish (Medium Priority)

### 3. Certificate of Completion & Graduation
- [ ] **Day 15 Graduation Certificate**:
  - Generate a downloadable/printable PDF certificate when a learner completes all 15 days.
  - Include learner name, completion date, readiness score, and Yardi Leadership signature/seal.

### 4. Interactive & Social Features
- [ ] **Buddy Matching System (Day 13)**:
  - Add UI for new hires to see their assigned onboarding buddy's bio, email, Teams handle, and schedule an introductory coffee chat.
- [ ] **Day 14 Pre-Arrival Verification Checklist**:
  - Add interactive check-off items for laptop delivery confirmation, badge photo submission, tax/HR forms, and Day 1 reporting zoom/office location.

### 5. Email & Notification Integrations
- [ ] **Real Email Dispatch**:
  - Connect Nodemailer or SendGrid for:
    - Welcome / invitation emails with login credentials.
    - Daily reminder / streak preservation notifications.
    - Password reset link generation.

---

## 🟢 Phase 3: Codebase Maintenance & Git Cleanup (Recommended)

### 6. Git Repository Optimization
- [ ] **Untrack Committed `node_modules`**:
  - Remove `server/node_modules/` from Git history/index:
    ```bash
    git rm -r --cached server/node_modules
    git commit -m "chore: untrack server node_modules"
    git push origin main
    ```
- [ ] **Update `.gitignore`**:
  - Ensure `**/node_modules/` and `.env` are universally ignored across subdirectories.

### 7. Performance & Bundle Optimization
- [ ] **Code Splitting in Vite**:
  - Use dynamic `React.lazy()` imports for admin pages (`AdminDashboard`, `AdminUsers`, `AdminAnalytics`) to reduce initial JS chunk size (< 500 kB).

---

## 🔵 Phase 4: Production & Deployment (Final Step)

### 8. Cloud Deployment Setup
- [ ] **MongoDB Atlas**:
  - Create a managed cloud cluster and whitelist deployment IP addresses.
- [ ] **Environment Configuration**:
  - Generate secure random `JWT_SECRET`.
  - Configure `NODE_ENV=production`.
- [ ] **Hosting Setup**:
  - Deploy Frontend to Vercel / Netlify / Cloudflare Pages.
  - Deploy Backend to Render / Railway / AWS / Azure App Service.
- [ ] **CORS & Domain Configuration**:
  - Update allowed origins in `server/server.js` with the production frontend domain.
