# Quick Start Checklist

## Frontend-Backend Connection - Step by Step

### ✅ Phase 1: Backend Setup (10 minutes)

```bash
# 1. Create backend folder
cd /Users/julfekarali/Downloads
mkdir backend && cd backend

# 2. Initialize
npm init -y

# 3. Install core packages
npm install express cors dotenv jsonwebtoken bcryptjs pg
npm install --save-dev typescript nodemon ts-node @types/express @types/node

# 4. Create tsconfig.json (copy from guide)
# 5. Create src/server.ts (copy from guide)
# 6. Create .env with:
#    - DATABASE_URL
#    - JWT_SECRET
#    - NODE_ENV=development
#    - PORT=5000
#    - FRONTEND_URL=http://localhost:5174

# 7. Test backend
npm run dev
# Should see: 🚀 Server running on http://localhost:5000
```

### ✅ Phase 2: Database Setup (5 minutes)

**PostgreSQL:**
```bash
# Start PostgreSQL
brew services start postgresql@15

# Create DB and user
psql
# Run SQL from BACKEND_SETUP.md - Database Schema section
```

**MongoDB:**
```bash
# Start MongoDB
brew services start mongodb-community

# Connection string: mongodb://localhost:27017/codecraft_db
```

### ✅ Phase 3: Frontend Updates (10 minutes)

```bash
cd /Users/julfekarali/Downloads/client

# 1. Create src/lib/apiClient.ts (copy from guide)
# 2. Create .env.local with:
#    VITE_API_URL=http://localhost:5000/api
# 3. Update src/context/AuthContext.tsx (copy from guide)
# 4. Test frontend
npm run dev
```

### ✅ Phase 4: Test Connection (5 minutes)

1. Open http://localhost:5174/auth
2. Try signup with:
   - Name: Test User
   - Email: test@example.com
   - Password: Password123!
3. Check browser Console for requests
4. Check backend terminal for logs
5. Verify auth_token in sessionStorage

---

## Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| CORS Error | Check FRONTEND_URL in backend .env |
| 401 Error | Verify JWT token is sent in Authorization header |
| DB Connection Failed | Ensure PostgreSQL is running: `brew services start postgresql@15` |
| Port 5000 in use | Kill process: `lsof -i :5000` then `kill -9 <PID>` |
| Blank page on signup | Check browser Network tab for API errors |

---

## Verify Everything Works

### Backend Health Check
```bash
curl http://localhost:5000/api/health
# Should return: {"status":"Backend is running"}
```

### Frontend API Client
1. Open DevTools Console
2. Run: `await fetch('http://localhost:5000/api/health').then(r => r.json())`
3. Should return same JSON response

---

## Next: Add More API Routes

After basic auth works, add endpoints for:
- `/api/mentors` - GET all mentors
- `/api/mentors/:id/book` - Book a mentor session
- `/api/jobs` - GET all jobs
- `/api/user/profile` - GET current user
- `/api/user/profile` - PUT update profile

See BACKEND_SETUP.md for full examples.
