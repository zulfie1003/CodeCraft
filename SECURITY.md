# Security Guidelines & Fixes

## Critical Security Issues to Fix

### 1. **API Key Security (CRITICAL)**

**Problem**: Groq API key stored in localStorage in plain text

**Solution**: Move to environment variable
```bash
# .env.local
VITE_GROQ_API_KEY=your_groq_api_key_here
```

**Update Mentor.tsx**:
```tsx
const savedKey = import.meta.env.VITE_GROQ_API_KEY;
```

**Better**: Use a backend proxy instead:
```tsx
// frontend
const response = await fetch('/api/chat', {
  method: 'POST',
  body: JSON.stringify({ messages })
});

// backend (Node.js/Express)
app.post('/api/chat', async (req, res) => {
  const apiKey = process.env.GROQ_API_KEY; // Never exposed to frontend
  const response = await fetch('https://api.groq.com/...', {
    headers: { 'Authorization': `Bearer ${apiKey}` }
  });
});
```

---

### 2. **Authentication Security (HIGH)**

**Problems**:
- User data in localStorage (not HttpOnly)
- Mock hardcoded users
- Weak password validation

**Solutions**:

```tsx
// Better Auth Implementation
const handleLogin = async (email: string, password: string) => {
  // Send to secure backend only
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    credentials: 'include', // Send cookies
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  
  // Token stored in HttpOnly cookie (not accessible to JS)
  // Backend handles session management
};
```

**Password Requirements**:
```tsx
const validatePassword = (pwd: string) => {
  const minLength = pwd.length >= 12;
  const hasUppercase = /[A-Z]/.test(pwd);
  const hasLowercase = /[a-z]/.test(pwd);
  const hasNumbers = /\d/.test(pwd);
  const hasSpecial = /[!@#$%^&*]/.test(pwd);
  
  return minLength && hasUppercase && hasLowercase && hasNumbers && hasSpecial;
};
```

---

### 3. **Input Validation & Sanitization (HIGH)**

**Problem**: User input not validated/sanitized

**Solution**: Implement validation everywhere
```tsx
import DOMPurify from 'dompurify';

// Sanitize user input
const sanitized = DOMPurify.sanitize(userInput);

// Validate email
const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Validate URLs
const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};
```

---

### 4. **XSS Prevention (HIGH)**

**Risk**: React Markdown could render malicious content

**Fix**: Add sanitization
```tsx
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';

<ReactMarkdown 
  rehypePlugins={[rehypeSanitize]}
  remarkPlugins={[remarkGfm]}
>
  {content}
</ReactMarkdown>
```

---

### 5. **CORS & Security Headers (MEDIUM)**

**Add to backend**:
```tsx
// Express.js example
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline'");
  next();
});
```

---

### 6. **Rate Limiting (MEDIUM)**

```tsx
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.post('/api/chat', limiter, async (req, res) => {
  // Handle request
});
```

---

### 7. **Environment Variables (.env.local)**

```env
# API Keys (NEVER commit to git)
VITE_GROQ_API_KEY=gsk_xxxxx
VITE_API_BASE_URL=https://api.yourdomain.com

# Feature Flags
VITE_ENABLE_DEBUG=false
```

**Add to .gitignore**:
```
.env.local
.env.*.local
*.key
*.pem
```

---

### 8. **Session Security (MEDIUM)**

**Use HttpOnly Cookies**:
```tsx
// Backend sets secure cookie
res.cookie('authToken', token, {
  httpOnly: true,      // Not accessible to JavaScript (XSS protection)
  secure: true,        // HTTPS only
  sameSite: 'strict',  // CSRF protection
  maxAge: 3600000      // 1 hour
});

// Frontend automatically sends with requests
fetch('/api/protected', {
  credentials: 'include' // Include cookies
});
```

---

## Implementation Priority

**Immediate (Week 1)**:
1. ✅ Move API keys to .env.local
2. ✅ Implement proper password validation
3. ✅ Add input sanitization
4. ✅ Remove mock hardcoded users

**Short-term (Week 2-3)**:
5. ✅ Create backend API for authentication
6. ✅ Implement HttpOnly cookies
7. ✅ Add CORS headers
8. ✅ Add security headers

**Medium-term (Month 1)**:
9. ✅ Implement rate limiting
10. ✅ Add CSP headers
11. ✅ Add HTTPS/TLS
12. ✅ Security audit

**Long-term**:
13. ✅ Implement 2FA
14. ✅ Regular security testing
15. ✅ Dependency updates
16. ✅ Penetration testing

---

## Dependencies to Add

```bash
npm install dompurify
npm install express-rate-limit
npm install helmet  # Security headers
npm install cors    # CORS handling
npm install rehype-sanitize
npm install remark-gfm
```

---

## Checklist Before Production

- [ ] Remove all mock data and hardcoded credentials
- [ ] Environment variables configured
- [ ] API keys stored securely
- [ ] Input validation on all forms
- [ ] Output sanitization for AI responses
- [ ] HTTPS/TLS enabled
- [ ] Security headers configured
- [ ] CORS properly configured
- [ ] Rate limiting implemented
- [ ] Dependency vulnerabilities checked (`npm audit`)
- [ ] .gitignore includes sensitive files
- [ ] OWASP Top 10 review completed
- [ ] Security headers tested
- [ ] XSS protection verified
- [ ] CSRF protection enabled

---

## Testing Security

```bash
# Check for known vulnerabilities
npm audit

# Check dependencies for security issues
npm audit --production

# Use security scanners
npm install -g snyk
snyk test
```

---

## Resources

- OWASP Top 10: https://owasp.org/www-project-top-ten/
- OWASP Web Security: https://cheatsheetseries.owasp.org/
- React Security: https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml
