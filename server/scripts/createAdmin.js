/**
 * Secure Administrator Provisioning Script
 *
 * Creates or updates an administrative user with securely hashed credentials.
 * Never creates an admin with default publicly known credentials.
 *
 * Usage:
 *   node scripts/createAdmin.js --email admin@company.com --password YourSecurePassword123! --name "Admin Name"
 * Or via environment variables:
 *   ADMIN_EMAIL=admin@company.com ADMIN_PASSWORD=... node scripts/createAdmin.js
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const bcrypt = require('bcryptjs');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const User = require('../models/User');

function getArg(flag) {
  const index = process.argv.indexOf(flag);
  if (index !== -1 && process.argv[index + 1]) {
    return process.argv[index + 1];
  }
  return null;
}

async function createAdmin() {
  const email = (getArg('--email') || process.env.ADMIN_EMAIL || '').toLowerCase().trim();
  const password = getArg('--password') || process.env.ADMIN_PASSWORD || '';
  const name = getArg('--name') || process.env.ADMIN_NAME || 'Yardi System Administrator';
  const department = getArg('--department') || 'Talent & Organizational Development';

  if (!email || !password) {
    console.error('Error: Both email and password are required to provision an administrator.');
    console.log('\nUsage:');
    console.log('  node scripts/createAdmin.js --email <email> --password <password> [--name <name>] [--department <dept>]\n');
    process.exit(1);
  }

  if (password.length < 8) {
    console.error('Error: Administrator password must be at least 8 characters in length.');
    process.exit(1);
  }

  const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/yardi_launchpad';

  try {
    await mongoose.connect(mongoUri);
    console.log('[Admin Provisioning] Connected to MongoDB');

    let user = await User.findOne({ email });

    if (user) {
      console.log(`[Admin Provisioning] User with email '${email}' exists. Updating to Administrator role...`);
      user.name = name;
      user.role = 'admin';
      user.department = department;
      user.password = password; // Will be hashed by User pre-save hook
      await user.save();
      console.log(`[Admin Provisioning] Successfully promoted '${email}' to Administrator!`);
    } else {
      user = await User.create({
        name,
        email,
        password,
        role: 'admin',
        department,
        currentDay: 15,
        overallProgress: 100,
        xp: 0,
        status: 'active',
      });
      console.log(`[Admin Provisioning] Successfully created new Administrator account: '${email}'`);
    }

    process.exit(0);
  } catch (err) {
    console.error('[Admin Provisioning Error]:', err.message);
    process.exit(1);
  }
}

createAdmin();
