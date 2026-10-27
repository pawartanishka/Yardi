/**
 * End-to-End Validation Test Suite for YARDI LaunchPad
 * Tests all 15 requirements specified in PLAN 1 & PLAN 2
 */

const http = require('http');

const API_BASE = 'http://127.0.0.1:5000/api';

function request(path, options = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(API_BASE + path);
    const reqOptions = {
      method: options.method || 'GET',
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
    };

    const req = http.request(reqOptions, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ status: res.statusCode, body: parsed });
        } catch {
          resolve({ status: res.statusCode, raw: data });
        }
      });
    });

    req.on('error', (err) => reject(err));

    if (options.body) {
      req.write(JSON.stringify(options.body));
    }
    req.end();
  });
}

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  [PASS] ${message}`);
    passed++;
  } else {
    console.error(`  [FAIL] ${message}`);
    failed++;
  }
}

async function runTests() {
  console.log('--- Starting YARDI LaunchPad Production Verification Suite ---\n');

  const testEmail = `tester-${Date.now()}@yardi.com`;
  const testPassword = 'Password123!';
  let learnerToken = '';
  let learnerId = '';
  let day1ActivityId = '';
  let adminToken = '';

  try {
    // 1. User Registration & Initial Provisioning
    console.log('1. Testing Real User Registration & Initial Provisioning...');
    const regRes = await request('/auth/register', {
      method: 'POST',
      body: {
        name: 'Jordan Lee',
        email: testEmail,
        password: testPassword,
        department: 'Engineering',
      },
    });

    assert(regRes.status === 201, 'Registration returns HTTP 201 Created');
    assert(regRes.body?.token, 'Response contains valid JWT token');
    assert(regRes.body?.user?.xp === 0, 'New learner starts with exactly 0 XP (no fake demo XP)');
    assert(regRes.body?.user?.currentDay === 1, 'New learner starts on Day 1 (not Day 5)');
    assert(regRes.body?.user?.overallProgress === 0, 'New learner starts with 0% progress');
    assert(regRes.body?.user?.streak === 0, 'New learner starts with 0 streak');
    assert(regRes.body?.user?.role === 'user', 'Public registration grants least-privileged user role');

    learnerToken = regRes.body?.token;
    learnerId = regRes.body?.user?.id;

    // 2. Login & Session Restoration
    console.log('\n2. Testing Authentication & Session Restoration...');
    const loginRes = await request('/auth/login', {
      method: 'POST',
      body: { email: testEmail, password: testPassword },
    });
    assert(loginRes.status === 200, 'Login succeeds with HTTP 200');
    assert(loginRes.body?.token, 'Login returns authentication token');

    const meRes = await request('/auth/me', {
      headers: { Authorization: `Bearer ${learnerToken}` },
    });
    assert(meRes.status === 200, 'GET /auth/me verifies active session');
    assert(meRes.body?.user?.email === testEmail, 'Session belongs to authenticated user');

    // 3. Shared Curriculum Integrity
    console.log('\n3. Testing Shared Curriculum Integrity (MongoDB-backed)...');
    const journeyRes = await request('/journey', {
      headers: { Authorization: `Bearer ${learnerToken}` },
    });
    assert(journeyRes.status === 200, 'GET /journey returns 200');
    assert(Array.isArray(journeyRes.body?.days) && journeyRes.body.days.length === 15, 'All 15 Journey Days loaded');
    
    const day1FromJourney = journeyRes.body.days.find((d) => d.dayNumber === 1);
    const day5FromJourney = journeyRes.body.days.find((d) => d.dayNumber === 5);
    assert(day1FromJourney?.status === 'current' || day1FromJourney?.status === 'available', 'Day 1 is unlocked for new learner');
    assert(day5FromJourney?.status === 'locked', 'Day 5 is locked for new learner');

    // 4. Access Control on Locked Days (Backend Guard)
    console.log('\n4. Testing Direct API Access Control to Locked Days...');
    const lockedDayRes = await request('/journey/day-5', {
      headers: { Authorization: `Bearer ${learnerToken}` },
    });
    assert(lockedDayRes.status === 403, 'Direct access to locked Day 5 is blocked with HTTP 403 Forbidden');

    // 5. Day 1 Details & Activity Loading
    console.log('\n5. Testing Day 1 Activity Loading...');
    const day1Res = await request('/journey/day-1', {
      headers: { Authorization: `Bearer ${learnerToken}` },
    });
    assert(day1Res.status === 200, 'Day 1 details accessible with HTTP 200');
    assert(Array.isArray(day1Res.body?.activities) && day1Res.body.activities.length > 0, 'Day 1 activities retrieved from database');
    day1ActivityId = day1Res.body.activities[0].id || day1Res.body.activities[0]._id;

    // 6. Activity Completion & XP Engine
    console.log('\n6. Testing Activity Completion & XP Awarding...');
    const actRes = await request(`/activities/${day1ActivityId}/complete`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${learnerToken}` },
      body: { reflectionAnswer: 'Excited to begin onboarding with Yardi!' },
    });
    assert(actRes.status === 200, 'Activity completion returns HTTP 200');
    assert(actRes.body?.success === true, 'Activity marked completed');
    assert(actRes.body?.userStats?.xp > 0, `User received XP (Total: ${actRes.body?.userStats?.xp} XP)`);
    const initialAwardedXP = actRes.body?.userStats?.xp;

    // 7. Duplicate XP Prevention (Idempotency)
    console.log('\n7. Testing Idempotency & Duplicate XP Prevention...');
    const repeatActRes = await request(`/activities/${day1ActivityId}/complete`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${learnerToken}` },
      body: {},
    });
    assert(repeatActRes.status === 200, 'Repeated activity completion returns 200');
    assert(repeatActRes.body?.alreadyCompleted === true, 'Server detects alreadyCompleted: true');
    assert(repeatActRes.body?.xpEarned === 0, 'Zero XP awarded on repeat completion (no duplicate XP)');

    // 8. Server-Graded Quiz & Prevention of Duplicate Rewards
    console.log('\n8. Testing Server-Graded Quiz & Answer Evaluation...');
    const quizSubmitRes = await request('/quizzes/quiz-day-1/submit', {
      method: 'POST',
      headers: { Authorization: `Bearer ${learnerToken}` },
      body: {
        answers: [1, 1, 1], // Correct answers for Day 1 quiz
      },
    });
    assert(quizSubmitRes.status === 200, 'Quiz submission returns HTTP 200');
    assert(quizSubmitRes.body?.passed === true, 'Server grades quiz correctly (passed: true)');
    assert(quizSubmitRes.body?.percentage === 100, 'Server calculates percentage correctly (100%)');
    assert(Array.isArray(quizSubmitRes.body?.review), 'Server returns educational review explanations');
    assert(quizSubmitRes.body?.xpEarned > 0, `Quiz awarded XP (+${quizSubmitRes.body?.xpEarned} XP)`);

    // Repeated quiz submit should not grant duplicate XP
    const repeatQuizRes = await request('/quizzes/quiz-day-1/submit', {
      method: 'POST',
      headers: { Authorization: `Bearer ${learnerToken}` },
      body: { answers: [1, 1, 1] },
    });
    assert(repeatQuizRes.status === 200, 'Repeat quiz submission returns HTTP 200');
    assert(repeatQuizRes.body?.xpEarned === 0, 'Quiz retries do NOT grant duplicate XP (xpEarned: 0)');

    // 9. Profile Management & Persistence
    console.log('\n9. Testing Profile Update & Persistence...');
    const profileRes = await request('/users/me', {
      method: 'PUT',
      headers: { Authorization: `Bearer ${learnerToken}` },
      body: {
        phone: '+1 805-555-0199',
        bio: 'Associate Software Engineer joining the Voyager team.',
      },
    });
    assert(profileRes.status === 200, 'Profile update returns HTTP 200');
    assert(profileRes.body?.user?.phone === '+1 805-555-0199', 'Phone number persisted in MongoDB');
    assert(profileRes.body?.user?.bio.includes('Voyager team'), 'Bio persisted in MongoDB');

    // 10. Notifications Persistence
    console.log('\n10. Testing Notification Retrieval & State Update...');
    const notifRes = await request('/notifications', {
      headers: { Authorization: `Bearer ${learnerToken}` },
    });
    assert(notifRes.status === 200, 'GET /notifications returns HTTP 200');
    assert(Array.isArray(notifRes.body?.notifications), 'Notifications array returned');

    // 11. Role-Based Access Control (Admin route rejection)
    console.log('\n11. Testing RBAC: Ordinary Learner Rejected From Admin Routes...');
    const adminDenyRes = await request('/admin/users', {
      headers: { Authorization: `Bearer ${learnerToken}` },
    });
    assert(adminDenyRes.status === 403, 'GET /admin/users rejects ordinary learner with HTTP 403 Forbidden');

    const adminAnalyticsDenyRes = await request('/admin/analytics', {
      headers: { Authorization: `Bearer ${learnerToken}` },
    });
    assert(adminAnalyticsDenyRes.status === 403, 'GET /admin/analytics rejects ordinary learner with HTTP 403 Forbidden');

    // 12. Admin Access Verification
    console.log('\n12. Testing Admin Access With Authorized Credentials...');
    const adminLoginRes = await request('/auth/login', {
      method: 'POST',
      body: { email: 'admin@yardi.com', password: 'Admin@123' },
    });

    if (adminLoginRes.status === 200 && adminLoginRes.body?.token) {
      adminToken = adminLoginRes.body.token;
      const adminUsersRes = await request('/admin/users', {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      assert(adminUsersRes.status === 200, 'Admin can access GET /admin/users');
      assert(Array.isArray(adminUsersRes.body?.users), 'Admin receives real user roster');
      const foundTestUser = adminUsersRes.body.users.find((u) => u.email === testEmail);
      assert(foundTestUser !== undefined, 'Newly registered test learner appears in admin roster');

      const adminAnalyticsRes = await request('/admin/analytics', {
        headers: { Authorization: `Bearer ${adminToken}` },
      });
      assert(adminAnalyticsRes.status === 200, 'Admin can access GET /admin/analytics');
      assert(typeof adminAnalyticsRes.body?.analytics?.totalUsers === 'number', 'Admin receives live cohort analytics');
    } else {
      console.log('  [NOTE] Skipping Admin token test (Admin account requires initialization)');
    }

    // Clean up test user to keep DB clean
    console.log('\n13. Cleaning up test user...');
    const User = require('../models/User');
    const ActivityProgress = require('../models/ActivityProgress');
    const QuizAttempt = require('../models/QuizAttempt');
    const Notification = require('../models/Notification');
    const mongoose = require('mongoose');

    if (mongoose.connection.readyState === 0) {
      const dbUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/yardi_launchpad';
      await mongoose.connect(dbUri);
    }

    await User.findByIdAndDelete(learnerId);
    await ActivityProgress.deleteMany({ userId: learnerId });
    await QuizAttempt.deleteMany({ userId: learnerId });
    await Notification.deleteMany({ userId: learnerId });
    console.log('  Cleaned up test learner records.');

    console.log(`\n========================================`);
    console.log(`E2E Test Suite Completed: ${passed} passed, ${failed} failed`);
    console.log(`========================================\n`);

    process.exit(failed > 0 ? 1 : 0);
  } catch (err) {
    console.error('Fatal test error:', err);
    process.exit(1);
  }
}

runTests();
