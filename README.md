# CodeCraft 🚀

A modern, neon-styled coding education platform built with React, TypeScript, and Vite. Learn to code, practice problems, connect with mentors, and discover job opportunities.

## ✨ Features

### 🎓 Core Learning
- **Dashboard** - Personalized learning dashboard with progress tracking
- **Practice** - Interactive coding problems and challenges
- **Progress** - Visual progress tracking with charts and statistics
- **Roadmap** - Structured learning paths and curriculum

### 🤖 AI Integration
- **AI Mentor** - Groq-powered AI chatbot for real-time coding help
  - Uses Llama 3.3 70B model
  - Markdown-formatted responses with code highlighting
  - Professional system prompts

### 💼 Career Tools
- **Jobs** - Discover job opportunities for developers
- **Hackathons** - Find and join hackathons
- **Portfolio** - Editable profile with customizable information
  - Avatar URL customization
  - Bio, location, email, social links
  - Anime avatar support via DiceBear API

### 👥 Community
- **About Us** - Company information and team showcase
  - Meet Our Team section with 5 team members
  - Company values and statistics
  - Contact information
  - Social media links (GitHub, LinkedIn, Twitter, Instagram)

### 🎨 Design Features
- **Dark/Light Mode** - Toggle between themes with persistence
- **Glassmorphism UI** - Modern frosted glass effect design
- **Neon Theme** - Cyan (#00f3ff) and purple (#bc13fe) accents
- **Responsive** - Mobile-friendly interface
- **Anime Branding** - Custom anime coder avatar and favicon

## 🛠️ Tech Stack

### Core
- **React** 19.2.0 - UI Framework
- **TypeScript** 5.9.3 - Type safety
- **Vite** 7.2.6 - Build tool
- **Wouter** 3.8.1 - Lightweight routing

### Styling
- **Tailwind CSS** 4.1.17 - Utility-first CSS
- **Radix UI** - Headless UI components
- **Lucide React** 0.555.0 - Beautiful icons

### UI Components
- Dialog, Tabs, Toast (Radix UI)
- Sonner 2.0.7 - Toast notifications
- React Markdown - Rich text rendering

### AI & APIs
- **Groq API** - Free tier AI inference
- **DiceBear API** - Anime avatar generation

## 📦 Installation

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Setup
```bash
# Clone the repository
git clone https://github.com/zulfie1003/codecraft.git
cd client

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🚀 Running the Project

```bash
npm run dev
```

The app will be available at `http://localhost:5173/`

## 📁 Project Structure

```
src/
├── components/
│   ├── GlassCard.tsx          # Glassmorphism card component
│   ├── NeonButton.tsx         # Neon-styled button
│   ├── Layout.tsx             # Main layout with navbar
│   └── ui/                    # Radix UI components
├── pages/
│   ├── Home.tsx               # Landing page
│   ├── Login.tsx              # Login page
│   ├── Signup.tsx             # Sign up page
│   ├── Auth.tsx               # Combined auth with tabs
│   ├── Dashboard.tsx          # User dashboard
│   ├── Practice.tsx           # Practice problems
│   ├── Mentor.tsx             # AI mentor chatbot
│   ├── Jobs.tsx               # Job listings
│   ├── Hackathons.tsx         # Hackathon finder
│   ├── Portfolio.tsx          # Editable profile
│   ├── About.tsx              # About & team page
│   ├── Progress.tsx           # Progress tracking
│   ├── Roadmap.tsx            # Learning roadmap
│   └── Settings.tsx           # User settings
├── context/
│   ├── AuthContext.tsx        # Auth state management
│   └── ThemeContext.tsx       # Theme state management
├── api/
│   └── github.ts              # API integrations
├── lib/
│   ├── utils.ts               # Utility functions
│   └── queryClient.ts         # React Query config
└── App.tsx                    # Root component
```

## 🔐 Authentication

- **Login Page** - Email/password authentication
- **Signup Page** - New user registration
- **GitHub OAuth** - Social login option
- **Auth Context** - Centralized auth state with localStorage persistence

### Routes
- `/login` - Standalone login page
- `/signup` - Standalone signup page
- `/auth` - Combined auth page with tabs

## 🤖 AI Mentor Integration

The AI Mentor uses Groq's free tier API with the Llama 3.3 70B model:

1. Add your Groq API key in the Mentor page
2. Chat with the AI for coding help
3. Responses are formatted with Markdown
4. Includes code blocks, headings, lists, and formatting

## 🎨 Theme System

- **Dark Mode (Default)** - Neon cyan and purple on dark background
- **Light Mode** - Adjusted colors for visibility
- **Persistence** - Theme preference saved to localStorage

Toggle theme using the button in the navbar.

## 👥 Team

Meet Our Team (in About Us section):
- **Zulfiquar Ali** - Founder & Team Leader
- **Vipul Paswan** - Developer
- **Anas** - Developer
- **Furqan** - Developer
- **Raj Kumar Singh** - Developer

Each team member has social media links (GitHub, LinkedIn, Twitter, Instagram).

## 📱 Navigation

Top Navigation Bar includes:
- CodeCraft Logo
- Dashboard
- Practice
- Roadmap
- AI Mentor
- Jobs
- Hackathons
- Portfolio
- About Us
- Search Bar
- Theme Toggle
- Settings

## 🔒 Protected Routes

Authenticated users can access:
- Dashboard
- Practice
- Progress
- Jobs
- Roadmap
- Mentor
- Hackathons
- Portfolio
- Submit Project
- Settings
- Recruiter Dashboard
- About

Unauthenticated users are redirected to `/auth`

## 🎯 Key Features Implementation

### Dark/Light Mode
```tsx
<button onClick={toggleTheme}>
  {theme === 'dark' ? <Sun /> : <Moon />}
</button>
```

### Editable Portfolio
- Click edit to modify profile
- Changes saved to localStorage
- Avatar URL customization
- Social links support

### AI Mentor Chat
- Real-time responses from Groq API
- Markdown rendering for formatted output
- Professional system prompt
- Chat history in conversation

## 🚀 Deployment

### Build
```bash
npm run build
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Drag dist/ folder to Netlify
```

## 📝 Environment Variables

Create a `.env.local` file:

```env
VITE_GROQ_API_KEY=your_groq_api_key_here
```

## 🐛 Troubleshooting

### Dev Server Issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
npm run dev
```

### Build Errors
```bash
# Clear Vite cache
rm -rf dist
npm run build
```

### Missing Dependencies
```bash
npm install
```

## 📄 License

MIT License - feel free to use this project for your own purposes.

## 🤝 Contributing

We welcome contributions! Please feel free to submit a Pull Request.

## 📞 Contact

- **GitHub** - [CodeCraft Repository]
- **Email** - contact@codecraft.dev
- **Twitter** - @CodeCraftTeam

## 🎉 Support

If you found this project helpful, please give it a ⭐ Star!

---

**Built with ❤️ by CodeCraft Team**

Last Updated: December 2, 2025
