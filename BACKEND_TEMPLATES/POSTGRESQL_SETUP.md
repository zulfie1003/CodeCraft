# PostgreSQL Setup

## Install PostgreSQL

### macOS
```bash
brew install postgresql@15
brew services start postgresql@15
```

### Linux (Ubuntu/Debian)
```bash
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql
```

### Windows
Download from: https://www.postgresql.org/download/windows/

## Create Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE codecraft_db;

# Create user
CREATE USER codecraft_user WITH PASSWORD 'change_this_password';

# Grant privileges
ALTER ROLE codecraft_user SET client_encoding TO 'utf8';
ALTER ROLE codecraft_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE codecraft_user SET default_transaction_deferrable TO on;
ALTER ROLE codecraft_user SET default_transaction_read_uncommitted TO off;
GRANT ALL PRIVILEGES ON DATABASE codecraft_db TO codecraft_user;

# Exit
\q
```

## Create Tables

Connect to your database:
```bash
psql -U codecraft_user -d codecraft_db -h localhost
```

Run these SQL commands:

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
  user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE,
  hourly_rate DECIMAL(10, 2),
  expertise TEXT[],
  rating DECIMAL(3, 2) DEFAULT 5.0,
  reviews INTEGER DEFAULT 0,
  response_time VARCHAR(100),
  total_sessions INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Mentor Sessions table
CREATE TABLE mentor_sessions (
  id SERIAL PRIMARY KEY,
  mentor_id INTEGER REFERENCES mentors(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  topic VARCHAR(255) NOT NULL,
  duration INTEGER NOT NULL,
  scheduled_at TIMESTAMP NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  notes TEXT,
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
  match_score INTEGER,
  posted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Job Applications table
CREATE TABLE job_applications (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  job_id INTEGER REFERENCES jobs(id) ON DELETE CASCADE,
  status VARCHAR(50) DEFAULT 'applied',
  applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, job_id)
);

-- Portfolio Projects table
CREATE TABLE portfolio_projects (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  tags TEXT[],
  image VARCHAR(255),
  github_url VARCHAR(255),
  live_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Practice Problems table
CREATE TABLE practice_problems (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  difficulty VARCHAR(50),
  category VARCHAR(100),
  tags TEXT[],
  solution TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- User Problem Progress table
CREATE TABLE user_problem_progress (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  problem_id INTEGER REFERENCES practice_problems(id) ON DELETE CASCADE,
  status VARCHAR(50) DEFAULT 'attempted',
  solved_at TIMESTAMP,
  attempts INTEGER DEFAULT 0,
  UNIQUE(user_id, problem_id)
);

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_job_applications_user_id ON job_applications(user_id);
CREATE INDEX idx_mentor_sessions_user_id ON mentor_sessions(user_id);
CREATE INDEX idx_mentor_sessions_mentor_id ON mentor_sessions(mentor_id);
CREATE INDEX idx_portfolio_projects_user_id ON portfolio_projects(user_id);
CREATE INDEX idx_user_problem_progress_user_id ON user_problem_progress(user_id);

-- Check all tables
\dt

-- Exit
\q
```

## Verify Connection

```bash
# Test connection
psql -U codecraft_user -d codecraft_db -h localhost -c "SELECT * FROM users;"

# Should return: "0 rows" (table is empty but exists)
```

## Environment Variable

Add to backend .env:
```env
DATABASE_URL=postgresql://codecraft_user:change_this_password@localhost:5432/codecraft_db
```

## Common Commands

```bash
# List databases
psql -U postgres -l

# Connect to specific database
psql -U codecraft_user -d codecraft_db

# List tables
\dt

# Describe table
\d users

# Drop database (careful!)
DROP DATABASE codecraft_db;

# Backup database
pg_dump -U codecraft_user -d codecraft_db > backup.sql

# Restore database
psql -U codecraft_user -d codecraft_db < backup.sql
```

## Troubleshooting

### Connection refused
```bash
# Check if PostgreSQL is running
brew services list

# Start PostgreSQL
brew services start postgresql@15

# Or on Linux
sudo systemctl start postgresql
```

### Password authentication failed
```bash
# Reset PostgreSQL password
sudo -u postgres psql
ALTER USER codecraft_user WITH PASSWORD 'new_password';
```

### Database already exists
```bash
psql -U postgres
DROP DATABASE codecraft_db;
# Then create new one following the steps above
```
