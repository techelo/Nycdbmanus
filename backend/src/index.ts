import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { Pool } from 'pg';

// Import routes
import datasetsRoutes from './routes/datasets';
import propertiesRoutes from './routes/properties';
import searchRoutes from './routes/search';
import violationsRoutes from './routes/violations';
import salesRoutes from './routes/sales';
import neighborhoodsRoutes from './routes/neighborhoods';
import boroughsRoutes from './routes/boroughs';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Database connection
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'postgres',
  password: process.env.DB_PASSWORD || 'nycdb',
  port: parseInt(process.env.DB_PORT || '5432'),
});

// Test database connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection error:', err.stack);
  } else {
    console.log('Database connected:', res.rows[0]);
  }
});

// Basic route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to NYCDB API',
    version: '1.0.0',
    endpoints: {
      datasets: '/api/datasets',
      properties: '/api/properties',
      search: '/api/search',
      violations: '/api/violations',
      sales: '/api/sales',
      neighborhoods: '/api/neighborhoods',
      boroughs: '/api/boroughs'
    }
  });
});

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// API routes
app.use('/api/datasets', datasetsRoutes);
app.use('/api/properties', propertiesRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/violations', violationsRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/neighborhoods', neighborhoodsRoutes);
app.use('/api/boroughs', boroughsRoutes);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
