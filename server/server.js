const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Load environment variables
dotenv.config();

// Validate required environment configuration
const requiredEnv = ['MONGO_URI', 'JWT_SECRET'];
const missingEnv = requiredEnv.filter((key) => !process.env[key]);
if (missingEnv.length > 0) {
  console.error(`[CRITICAL CONFIG ERROR] Missing required environment variables: ${missingEnv.join(', ')}`);
  console.error('Please configure these in server/.env before starting the server.');
  process.exit(1);
}

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Health Check Route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'YARDI LaunchPad API',
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/journey', require('./routes/journeyRoutes'));
app.use('/api/activities', require('./routes/activityRoutes'));
app.use('/api/quizzes', require('./routes/quizRoutes'));
app.use('/api/progress', require('./routes/progressRoutes'));
app.use('/api/badges', require('./routes/badgeRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

// Error Middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = parseInt(process.env.PORT, 10) || 5000;

// Centralized Async Startup: Do not report ready before DB connection succeeds
async function startServer() {
  try {
    await connectDB();

    const server = app.listen(PORT, () => {
      console.log(`[YARDI LaunchPad Server] Listening on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
    });

    const shutdown = () => {
      console.log('[Server] Gracefully shutting down...');
      server.close(() => {
        console.log('[Server] Closed HTTP listener.');
        process.exit(0);
      });
    };

    process.on('SIGTERM', shutdown);
    process.on('SIGINT', shutdown);

    process.on('unhandledRejection', (err) => {
      console.error(`[Unhandled Rejection]: ${err.message}`);
      server.close(() => process.exit(1));
    });
  } catch (error) {
    console.error(`[Startup Failure]: ${error.message}`);
    process.exit(1);
  }
}

startServer();
