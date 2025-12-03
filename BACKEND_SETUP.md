# CodeCraft Backend Setup Guide

## Complete Frontend-Backend-Database Integration

This guide will help you set up a backend server and connect it to your CodeCraft frontend.

---

## Prerequisites

- Node.js v18+ 
- npm or yarn
- PostgreSQL or MongoDB (your choice)
- Git

---

## Part 1: Backend Server Setup (Node.js + Express)

### Step 1: Create Backend Directory

```bash
# Create a backend folder at the same level as your client
cd /Users/julfekarali/Downloads
mkdir backend
cd backend
```

### Step 2: Initialize Node Project

```bash
npm init -y
```

### Step 3: Install Dependencies

```bash
npm install express cors dotenv jsonwebtoken bcryptjs axios
npm install --save-dev nodemon typescript @types/express @types/node ts-node
```

### Step 4: Create Project Structure

```bash
mkdir src
mkdir src/routes
mkdir src/controllers
mkdir src/models
mkdir src/middleware
mkdir src/config
touch .env
touch src/server.ts
touch src/config/database.ts
```

### Step 5: Update package.json

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "dev": "nodemon --exec ts-node src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js"
  },
  "devDependencies": {
    "nodemon": "^3.0.1",
    "typescript": "^5.3.3",
    "@types/express": "^4.17.21",
    "@types/node": "^20.10.6",
    "ts-node": "^10.9.2"
  }
}
```

---

## Part 2: Database Setup

### Option A: PostgreSQL Setup

#### Install PostgreSQL
```bash
# macOS
brew install postgresql@15
brew services start postgresql@15

# Linux
sudo apt-get install postgresql postgresql-contrib

# Windows
# Download from: https://www.postgresql.org/download/windows/
```

#### Create Database
```bash
# Open PostgreSQL shell
psql

# Create database and user
CREATE DATABASE codecraft_db;
CREATE USER codecraft_user WITH PASSWORD 'your_secure_password';
ALTER ROLE codecraft_user SET client_encoding TO 'utf8';
ALTER ROLE codecraft_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE codecraft_user SET default_transaction_deferrable TO on;
ALTER ROLE codecraft_user SET default_transaction_read_uncommitted TO off;
GRANT ALL PRIVILEGES ON DATABASE codecraft_db TO codecraft_user;
\q
```

#### Update .env
```env
DATABASE_URL=postgresql://codecraft_user:your_secure_password@localhost:5432/codecraft_db
JWT_SECRET=your_super_secret_jwt_key_change_this
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:5174
```

---

### Option B: MongoDB Setup

#### Install MongoDB Community

```bash
# macOS
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community

# Linux
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
sudo apt-get install -y mongodb-org
sudo systemctl start mongod

# Windows
# Download from: https://www.mongodb.com/try/download/community
```

#### Update .env
```env
MONGODB_URI=mongodb://localhost:27017/codecraft_db
JWT_SECRET=your_super_secret_jwt_key_change_this
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:5174
```

---

## Part 3: Backend Server Setup

### Create tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ES2020",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "moduleResolution": "node"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

### Create src/server.ts

```typescript
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

// Health Check Route
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 CORS enabled for ${process.env.FRONTEND_URL}`);
});
```

### Start Backend Server

```bash
npm run dev
```

You should see: `🚀 Server running on http://localhost:5000`

---

## Part 4: Update Frontend API Configuration

### Step 1: Create API Client

Create a new file: `src/lib/apiClient.ts`

```typescript
import axios, { AxiosInstance, AxiosError } from 'axios';
import { toast } from 'sonner';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

interface ApiError {
  message: string;
  status?: number;
}

const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('auth_token') || localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle responses
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      sessionStorage.removeItem('auth_token');
      localStorage.removeItem('auth_token');
      window.location.href = '/auth';
    }
    
    const message = (error.response?.data as any)?.message || 'An error occurred';
    toast.error(message);
    return Promise.reject(error);
  }
);

export default apiClient;
```

### Step 2: Create .env.local in Frontend

```env
VITE_API_URL=http://localhost:5000/api
VITE_GROQ_API_KEY=your_groq_key_here
```

### Step 3: Update Auth API

Update `src/api/github.ts` or create new auth API file:

```typescript
import apiClient from '@/lib/apiClient';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
  role: 'student' | 'recruiter' | 'organizer';
}

export interface AuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
    avatar: string;
    role: string;
  };
  token: string;
}

export const loginUser = async (data: LoginRequest): Promise<AuthResponse> => {
  const response = await apiClient.post('/auth/login', data);
  const token = response.data.token;
  sessionStorage.setItem('auth_token', token);
  return response.data;
};

export const signupUser = async (data: SignupRequest): Promise<AuthResponse> => {
  const response = await apiClient.post('/auth/signup', data);
  const token = response.data.token;
  sessionStorage.setItem('auth_token', token);
  return response.data;
};

export const logoutUser = async (): Promise<void> => {
  await apiClient.post('/auth/logout');
  sessionStorage.removeItem('auth_token');
  localStorage.removeItem('auth_token');
};
```

---

## Part 5: Backend Routes & Controllers

### Create src/config/database.ts (PostgreSQL Example)

```typescript
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

export const query = (text: string, params?: any[]) => {
  return pool.query(text, params);
};

export default pool;
```

### Create src/middleware/auth.ts

```typescript
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
  user?: { id: string; role: string };
}

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = decoded as any;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
```

### Create src/controllers/authController.ts

```typescript
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import { query } from '../config/database';

export const signup = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Hash password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Insert user (PostgreSQL example)
    const result = await query(
      'INSERT INTO users (name, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role',
      [name, email, hashedPassword, role || 'student']
    );

    const user = result.rows[0];

    // Generate token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: `https://ui-avatars.com/api/?name=${user.name}`,
      },
    });
  } catch (error: any) {
    console.error('Signup error:', error);
    res.status(500).json({ message: error.message || 'Signup failed' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password required' });
    }

    // Query user (PostgreSQL example)
    const result = await query(
      'SELECT id, name, email, password_hash, role FROM users WHERE email = $1',
      [email]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = result.rows[0];

    // Verify password
    const isValidPassword = await bcryptjs.compare(password, user.password_hash);

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: `https://ui-avatars.com/api/?name=${user.name}`,
      },
    });
  } catch (error: any) {
    console.error('Login error:', error);
    res.status(500).json({ message: error.message || 'Login failed' });
  }
};
```

### Create src/routes/authRoutes.ts

```typescript
import { Router } from 'express';
import { signup, login } from '../controllers/authController';

const router = Router();

router.post('/signup', signup);
router.post('/login', login);

export default router;
```

### Update src/server.ts

```typescript
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5174',
  credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running' });
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 CORS enabled for ${process.env.FRONTEND_URL}`);
});
```

---

## Part 6: Update Frontend Auth Context

Update `src/context/AuthContext.tsx`:

```typescript
import React, { createContext, useContext, useState, useEffect } from 'react';
import apiClient from '@/lib/apiClient';

interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'student' | 'recruiter' | 'organizer';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, role: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on mount
  useEffect(() => {
    const token = sessionStorage.getItem('auth_token') || localStorage.getItem('auth_token');
    if (token) {
      // Verify token with backend
      apiClient.get('/auth/me')
        .then((res) => setUser(res.data.user))
        .catch(() => {
          sessionStorage.removeItem('auth_token');
          localStorage.removeItem('auth_token');
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const res = await apiClient.post('/auth/login', { email, password });
    setUser(res.data.user);
    sessionStorage.setItem('auth_token', res.data.token);
  };

  const signup = async (name: string, email: string, password: string, role: string) => {
    const res = await apiClient.post('/auth/signup', { name, email, password, role });
    setUser(res.data.user);
    sessionStorage.setItem('auth_token', res.data.token);
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('auth_token');
    localStorage.removeItem('auth_token');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
```

---

## Part 7: Database Schema (PostgreSQL Example)

Create migrations or run these SQL commands:

```sql
-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  avatar VARCHAR(255),
  bio TEXT,
  role VARCHAR(50) DEFAULT 'student',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Mentors table
CREATE TABLE mentors (
  id SERIAL PRIMARY KEY,
  user_id INTEGER UNIQUE REFERENCES users(id),
  hourly_rate DECIMAL(10, 2),
  expertise TEXT[],
  rating DECIMAL(3, 2),
  reviews INTEGER DEFAULT 0,
  response_time VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Mentor Sessions table
CREATE TABLE mentor_sessions (
  id SERIAL PRIMARY KEY,
  mentor_id INTEGER REFERENCES mentors(id),
  user_id INTEGER REFERENCES users(id),
  topic VARCHAR(255),
  duration INTEGER,
  scheduled_at TIMESTAMP,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Jobs table
CREATE TABLE jobs (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  description TEXT,
  salary VARCHAR(100),
  location VARCHAR(255),
  logo VARCHAR(255),
  required_skills TEXT[],
  posted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Job Applications table
CREATE TABLE job_applications (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  job_id INTEGER REFERENCES jobs(id),
  status VARCHAR(50) DEFAULT 'applied',
  applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster queries
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_job_applications_user_id ON job_applications(user_id);
CREATE INDEX idx_mentor_sessions_user_id ON mentor_sessions(user_id);
```

---

## Part 8: Running Everything Together

### Terminal 1 - PostgreSQL (if needed)
```bash
brew services start postgresql@15
# or just let it run in background
```

### Terminal 2 - Backend Server
```bash
cd /Users/julfekarali/Downloads/backend
npm run dev
# Should show: 🚀 Server running on http://localhost:5000
```

### Terminal 3 - Frontend Dev Server
```bash
cd /Users/julfekarali/Downloads/client
npm run dev
# Should show: ➜  Local:   http://localhost:5174/
```

### Test Connection
1. Open `http://localhost:5174`
2. Navigate to Auth page
3. Try to sign up
4. Check backend console for requests
5. Check if token is saved in sessionStorage

---

## Part 9: Deployment Checklist

### Backend Deployment (Heroku/Railway/Render Example)

```bash
# Install Heroku CLI
npm install -g heroku

# Login
heroku login

# Create app
heroku create your-codecraft-backend

# Set environment variables
heroku config:set JWT_SECRET=your_production_secret
heroku config:set DATABASE_URL=your_production_db_url
heroku config:set FRONTEND_URL=https://your-frontend.vercel.app
heroku config:set NODE_ENV=production

# Deploy
git push heroku main
```

### Frontend Deployment (Vercel Example)

```bash
npm install -g vercel

# Deploy
cd /Users/julfekarali/Downloads/client
vercel

# Update .env.production
VITE_API_URL=https://your-backend-url.com/api
```

---

## Troubleshooting

### CORS Error
- Ensure `FRONTEND_URL` in backend .env matches your frontend URL
- Check CORS middleware in Express server

### 401 Unauthorized
- Verify JWT token format in Authorization header
- Check token expiration time
- Ensure `JWT_SECRET` matches on frontend and backend

### Database Connection Error
- Verify DATABASE_URL format
- Check if PostgreSQL/MongoDB service is running
- Verify credentials

### Port Already in Use
```bash
# Kill process on port 5000
lsof -i :5000
kill -9 <PID>
```

---

## Next Steps

1. ✅ Set up backend with Express
2. ✅ Configure database (PostgreSQL or MongoDB)
3. ✅ Update frontend API configuration
4. ✅ Implement authentication endpoints
5. 📝 Add more API routes for:
   - Mentors (GET, POST, PUT, DELETE)
   - Jobs (GET, POST, PUT, DELETE)
   - Hackathons (GET, POST)
   - Practice Problems (GET)
   - User Profile (GET, PUT)
6. 🚀 Deploy to production

---

Good luck! 🚀
