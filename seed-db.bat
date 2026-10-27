@echo off
title YARDI LaunchPad - Database Seeder
echo ====================================================
echo Seeding YARDI LaunchPad MongoDB Database
echo MongoDB URI: mongodb://127.0.0.1:27017/yardi_launchpad
echo ====================================================
npm run seed
pause
