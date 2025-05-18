import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import hpp from 'hpp';

import MainRoutes from './mainRoutes.js';
import prisma from './db/db.config.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Secure HTTP headers
app.use(helmet());

// Limit repeated requests
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per window
  standardHeaders: true,
  legacyHeaders: false,
}));

// Prevent HTTP param pollution
app.use(hpp());

// Enable CORS with whitelist
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
}));

// Parse JSON requests
app.use(express.json());

// Health check
app.get('/', (_, res) => {
  res.send('🚀 RentLoop API is secure and running');
});

// Routes
app.use('/api', MainRoutes);

// Start server with DB connection safety
const startServer = async () => {
  try {
    await prisma.$connect();
    console.log('✅ Database connected');

    const server = app.listen(PORT, () => {
      console.log(`🔥 Server running on http://localhost:${PORT}`);
    });

    // Graceful shutdown
    process.on('SIGTERM', async () => {
      console.log('SIGTERM received. Closing app...');
      await prisma.$disconnect();
      server.close(() => process.exit(0));
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
  }
};

startServer();
