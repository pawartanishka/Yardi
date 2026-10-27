/**
 * Precision Demo Data Cleanup Script (Development & Migration Utility)
 *
 * Safely removes demo accounts ('user@yardi.com' / 'alex.rivera@yardi.com')
 * and their associated user progress, badges, and notifications.
 *
 * PRESERVES all curriculum days, activities, quizzes, badges, and legitimate users.
 *
 * Usage:
 *   node scripts/cleanDemoData.js --dry-run   (Preview records to be deleted)
 *   node scripts/cleanDemoData.js --execute   (Permanently clean demo records)
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const User = require('../models/User');
const ActivityProgress = require('../models/ActivityProgress');
const UserBadge = require('../models/UserBadge');
const Notification = require('../models/Notification');
const QuizAttempt = require('../models/QuizAttempt');

const DEMO_EMAILS = ['user@yardi.com', 'alex.rivera@yardi.com'];

async function cleanDemoData() {
  const isExecute = process.argv.includes('--execute');
  const isDryRun = process.argv.includes('--dry-run') || !isExecute;

  const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/yardi_launchpad';

  console.log('='.repeat(60));
  console.log(`[Demo Cleanup] Mode: ${isExecute ? 'EXECUTE (Permanent)' : 'DRY RUN (Preview Only)'}`);
  console.log(`[Demo Cleanup] Target Emails: ${DEMO_EMAILS.join(', ')}`);
  console.log('='.repeat(60));

  try {
    await mongoose.connect(mongoUri);
    console.log('[Demo Cleanup] Connected to MongoDB');

    const demoUsers = await User.find({ email: { $in: DEMO_EMAILS } });
    if (demoUsers.length === 0) {
      console.log('[Demo Cleanup] No demo users found matching target criteria.');
      process.exit(0);
    }

    const demoUserIds = demoUsers.map((u) => u._id);
    console.log(`[Demo Cleanup] Found ${demoUsers.length} demo user(s):`);
    demoUsers.forEach((u) => console.log(`  - ID: ${u._id} | Name: ${u.name} | Email: ${u.email}`));

    const progressCount = await ActivityProgress.countDocuments({ userId: { $in: demoUserIds } });
    const badgesCount = await UserBadge.countDocuments({ userId: { $in: demoUserIds } });
    const notifsCount = await Notification.countDocuments({ userId: { $in: demoUserIds } });
    const attemptsCount = await QuizAttempt.countDocuments({ userId: { $in: demoUserIds } });

    console.log(`\nLinked Demo Records Identified:`);
    console.log(`  - Activity Progress: ${progressCount}`);
    console.log(`  - User Badges:       ${badgesCount}`);
    console.log(`  - Notifications:     ${notifsCount}`);
    console.log(`  - Quiz Attempts:     ${attemptsCount}`);

    if (isDryRun) {
      console.log('\n[DRY RUN COMPLETE] No records were modified.');
      console.log('To execute cleanup, run: node scripts/cleanDemoData.js --execute');
      process.exit(0);
    }

    console.log('\n[Executing Cleanup] Removing demo records...');
    await ActivityProgress.deleteMany({ userId: { $in: demoUserIds } });
    await UserBadge.deleteMany({ userId: { $in: demoUserIds } });
    await Notification.deleteMany({ userId: { $in: demoUserIds } });
    await QuizAttempt.deleteMany({ userId: { $in: demoUserIds } });
    await User.deleteMany({ _id: { $in: demoUserIds } });

    console.log('[Demo Cleanup] Successfully deleted demo users and linked records.');
    process.exit(0);
  } catch (err) {
    console.error('[Demo Cleanup Error]:', err.message);
    process.exit(1);
  }
}

cleanDemoData();
