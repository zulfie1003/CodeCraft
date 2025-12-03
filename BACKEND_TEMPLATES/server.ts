import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5174',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Health Check Route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'Backend is running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Import routes (will be added later)
// app.use('/api/auth', authRoutes);
// app.use('/api/mentors', mentorRoutes);
// app.use('/api/jobs', jobRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error Handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ 
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║  🚀 CodeCraft Backend Server Running  ║
╠════════════════════════════════════════╣
║  📍 URL: http://localhost:${PORT}        ║
║  🔗 CORS: ${process.env.FRONTEND_URL || 'http://localhost:5174'}
║  📦 Environment: ${process.env.NODE_ENV || 'development'}       ║
╚════════════════════════════════════════╝
  `);
});

export default app;
