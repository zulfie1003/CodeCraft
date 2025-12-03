import React, { useState } from 'react';
import Layout from '@/components/Layout';
import GlassCard from '@/components/GlassCard';
import NeonButton from '@/components/NeonButton';
import { 
  CheckCircle, Circle, Lock, Sparkles, ArrowRight, 
  Cpu, Database, Globe, Server, Layout as LayoutIcon,
  AlertTriangle, Lightbulb, BookOpen, Clock, RefreshCw, Zap
} from 'lucide-react';

// Types for our Roadmap Data
interface Task {
  name: string;
  isCompleted?: boolean;
  resources?: string[];
}

interface Module {
  id: number;
  title: string;
  desc: string;
  time: string;
  tasks: Task[];
  status: 'completed' | 'in-progress' | 'locked';
  skills?: string[];
  difficulty?: string;
}

interface Project {
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  desc: string;
  skills: string[];
  duration: string;
}

interface RoadmapData {
  goal: string;
  title: string;
  summary: string;
  duration: string;
  modules: Module[];
  tree: string[];
  projects: Project[];
  mistakes: string[];
  tips: string[];
  advice: string;
  prerequisites?: string[];
}

/**
 * Generate a realistic roadmap based on user input
 * This function uses pattern matching to create dynamic content
 */
const generateRoadmapFromGoal = (goal: string): RoadmapData => {
  const lowerGoal = goal.toLowerCase();
  
  // Pattern matching for different learning paths
  if (lowerGoal.includes('mern') || lowerGoal.includes('full stack')) {
    return generateMERNRoadmap();
  } else if (lowerGoal.includes('frontend') || lowerGoal.includes('react')) {
    return generateFrontendRoadmap();
  } else if (lowerGoal.includes('backend') || lowerGoal.includes('node')) {
    return generateBackendRoadmap();
  } else if (lowerGoal.includes('data science') || lowerGoal.includes('python')) {
    return generateDataScienceRoadmap();
  } else if (lowerGoal.includes('mobile') || lowerGoal.includes('android')) {
    return generateMobileRoadmap();
  } else if (lowerGoal.includes('devops') || lowerGoal.includes('cloud')) {
    return generateDevOpsRoadmap();
  } else if (lowerGoal.includes('first year') || lowerGoal.includes('beginner')) {
    return generateBeginnerRoadmap();
  } else {
    return generateGenericRoadmap(goal);
  }
};

const generateMERNRoadmap = (): RoadmapData => ({
  goal: "Full Stack MERN Developer",
  title: "Master MERN Stack Development",
  duration: "6-9 Months",
  summary: "Become proficient in MongoDB, Express.js, React, and Node.js. Build production-ready full-stack applications from database to deployment.",
  tree: ["HTML/CSS", "JavaScript", "React", "Node.js", "Express", "MongoDB", "Deployment"],
  modules: [
    {
      id: 1,
      title: "Module 1: Web Fundamentals",
      desc: "Master the building blocks of the web before diving into frameworks.",
      time: "2-3 Weeks",
      status: "completed",
      difficulty: "Beginner",
      skills: ["HTML5", "CSS3", "Responsive Design", "Git"],
      tasks: [
        { name: "HTML5 Semantic Structure", isCompleted: true, resources: ["MDN HTML Docs", "FreeCodeCamp"] },
        { name: "CSS3 Flexbox & Grid", isCompleted: true, resources: ["CSS Tricks", "MDN"] },
        { name: "Responsive Design & Media Queries", isCompleted: true },
        { name: "Git & GitHub Basics", isCompleted: true }
      ]
    },
    {
      id: 2,
      title: "Module 2: JavaScript Mastery",
      desc: "Deep dive into ES6+, async programming, and DOM manipulation.",
      time: "4 Weeks",
      status: "in-progress",
      difficulty: "Intermediate",
      skills: ["ES6+", "Async/Await", "DOM", "Fetch API"],
      tasks: [
        { name: "ES6+ Features (Arrow functions, Destructuring)", isCompleted: true },
        { name: "Async/Await & Promises", isCompleted: false },
        { name: "DOM Manipulation & Event Handling", isCompleted: false },
        { name: "Fetch API & Working with JSON", isCompleted: false },
        { name: "Error Handling & Debugging", isCompleted: false }
      ]
    },
    {
      id: 3,
      title: "Module 3: React Fundamentals",
      desc: "Build interactive user interfaces with React components and hooks.",
      time: "6 Weeks",
      status: "locked",
      difficulty: "Intermediate",
      skills: ["Components", "Hooks", "State Management", "Lifecycle"],
      tasks: [
        { name: "Components & Props" },
        { name: "Hooks (useState, useEffect, useContext)" },
        { name: "State Management with Redux" },
        { name: "React Router & Navigation" },
        { name: "API Integration & Data Fetching" }
      ]
    },
    {
      id: 4,
      title: "Module 4: Backend with Node.js & Express",
      desc: "Server-side logic and REST API development.",
      time: "5 Weeks",
      status: "locked",
      difficulty: "Intermediate",
      skills: ["Node.js", "Express", "Routing", "Middleware"],
      tasks: [
        { name: "Node.js Runtime & Module System" },
        { name: "Express Setup & Middleware" },
        { name: "REST API Design Principles" },
        { name: "Request/Response Handling" },
        { name: "Error Handling & Validation" }
      ]
    },
    {
      id: 5,
      title: "Module 5: Database Design with MongoDB",
      desc: "Learn NoSQL database design and schema management.",
      time: "3 Weeks",
      status: "locked",
      difficulty: "Intermediate",
      skills: ["MongoDB", "Mongoose", "Database Design", "Queries"],
      tasks: [
        { name: "MongoDB Basics & Collections" },
        { name: "Mongoose Schema & Models" },
        { name: "CRUD Operations" },
        { name: "Relationships & Aggregation" }
      ]
    },
    {
      id: 6,
      title: "Module 6: Full-Stack Integration",
      desc: "Connect frontend and backend into a complete application.",
      time: "4 Weeks",
      status: "locked",
      difficulty: "Advanced",
      skills: ["Integration", "Authentication", "JWT", "Deployment"],
      tasks: [
        { name: "Authentication with JWT" },
        { name: "User Authorization & Permissions" },
        { name: "CORS & Security Headers" },
        { name: "Testing (Unit & Integration)" }
      ]
    },
    {
      id: 7,
      title: "Module 7: Deployment & DevOps",
      desc: "Deploy your application to production.",
      time: "2 Weeks",
      status: "locked",
      difficulty: "Advanced",
      skills: ["Docker", "Deployment", "Monitoring", "CI/CD"],
      tasks: [
        { name: "Heroku/Vercel Deployment" },
        { name: "Environment Variables & Secrets" },
        { name: "Performance Optimization" },
        { name: "Monitoring & Logging" }
      ]
    }
  ],
  projects: [
    {
      title: "Todo App with Local Storage",
      difficulty: "Beginner",
      desc: "Learn React basics by building a simple todo list.",
      skills: ["React", "State Management", "LocalStorage"],
      duration: "1 Week"
    },
    {
      title: "Weather Dashboard",
      difficulty: "Beginner",
      desc: "Fetch data from public APIs and display real-time weather.",
      skills: ["React", "Fetch API", "Components"],
      duration: "1 Week"
    },
    {
      title: "Blog Platform",
      difficulty: "Intermediate",
      desc: "Full-stack blog with user authentication and CRUD operations.",
      skills: ["MERN", "Authentication", "Database"],
      duration: "3 Weeks"
    },
    {
      title: "E-Commerce Store",
      difficulty: "Intermediate",
      desc: "Shopping cart, payment integration, and admin panel.",
      skills: ["MERN", "Stripe API", "Redux"],
      duration: "4 Weeks"
    },
    {
      title: "Real-time Chat Application",
      difficulty: "Advanced",
      desc: "WebSockets, real-time messaging, and user presence.",
      skills: ["MERN", "Socket.io", "WebSockets"],
      duration: "3 Weeks"
    }
  ],
  mistakes: [
    "Don't skip HTML/CSS basics - they're foundational.",
    "Avoid 'Tutorial Hell' - build projects instead of watching tutorials.",
    "Don't ignore TypeScript - learn it early.",
    "Don't build complex apps without planning architecture first.",
    "Avoid deploying without understanding security (CORS, JWT, validation)."
  ],
  tips: [
    "Code every single day, even if just for 30 minutes.",
    "Build projects that solve real problems, not contrived examples.",
    "Read others' code to learn best practices.",
    "Document your code as you write it.",
    "Join developer communities for support and networking."
  ],
  advice: "The key to mastering MERN is consistent practice combined with building real projects. Don't just watch tutorials - code along and then build your own variations. Start small, ship projects, and iterate. Most importantly, enjoy the journey and celebrate small wins!"
});

const generateFrontendRoadmap = (): RoadmapData => ({
  goal: "Frontend Developer",
  title: "Master Modern Frontend Development",
  duration: "4-6 Months",
  summary: "Become expert in HTML, CSS, JavaScript, and React. Focus on building beautiful, responsive, and performant user interfaces.",
  tree: ["HTML/CSS", "JavaScript", "React", "CSS-in-JS", "Performance"],
  modules: [
    {
      id: 1,
      title: "HTML & CSS Mastery",
      desc: "Build semantic HTML and beautiful CSS layouts.",
      time: "3 Weeks",
      status: "completed",
      skills: ["HTML5", "CSS3", "Flexbox", "Grid"],
      tasks: [
        { name: "Semantic HTML Structure", isCompleted: true },
        { name: "CSS Selectors & Specificity", isCompleted: true },
        { name: "Flexbox & Grid Layouts", isCompleted: true },
        { name: "Responsive Web Design", isCompleted: true }
      ]
    },
    {
      id: 2,
      title: "JavaScript Fundamentals",
      desc: "Master modern JavaScript for DOM manipulation.",
      time: "4 Weeks",
      status: "in-progress",
      skills: ["ES6+", "DOM", "Events", "Async"],
      tasks: [
        { name: "ES6+ Syntax & Features", isCompleted: true },
        { name: "DOM Manipulation", isCompleted: false },
        { name: "Event Handling", isCompleted: false },
        { name: "Async JavaScript (Promises, Async/Await)", isCompleted: false }
      ]
    },
    {
      id: 3,
      title: "React Deep Dive",
      desc: "Build component-based UIs with React.",
      time: "6 Weeks",
      status: "locked",
      difficulty: "Intermediate",
      skills: ["Components", "Hooks", "State", "Performance"],
      tasks: [
        { name: "Functional Components & Hooks" },
        { name: "State Management (useState, useContext)" },
        { name: "Effect Management (useEffect)" },
        { name: "Custom Hooks" }
      ]
    },
    {
      id: 4,
      title: "Styling Solutions",
      desc: "Master CSS-in-JS and styling methodologies.",
      time: "2 Weeks",
      status: "locked",
      difficulty: "Intermediate",
      skills: ["Tailwind CSS", "CSS Modules", "Styled Components"],
      tasks: [
        { name: "Tailwind CSS Workflow" },
        { name: "CSS Modules" },
        { name: "Styled Components" }
      ]
    },
    {
      id: 5,
      title: "Performance & Optimization",
      desc: "Learn performance best practices.",
      time: "2 Weeks",
      status: "locked",
      difficulty: "Advanced",
      skills: ["Optimization", "Testing", "Accessibility"],
      tasks: [
        { name: "Code Splitting & Lazy Loading" },
        { name: "Image Optimization" },
        { name: "Performance Monitoring" },
        { name: "Accessibility (A11y)" }
      ]
    }
  ],
  projects: [
    {
      title: "Portfolio Website",
      difficulty: "Beginner",
      desc: "Showcase your skills with a personal portfolio.",
      skills: ["HTML", "CSS", "JavaScript"],
      duration: "1 Week"
    },
    {
      title: "UI Component Library",
      difficulty: "Intermediate",
      desc: "Build reusable React components.",
      skills: ["React", "Storybook", "CSS"],
      duration: "2 Weeks"
    },
    {
      title: "SPA Dashboard",
      difficulty: "Advanced",
      desc: "Single Page App with routing and state management.",
      skills: ["React", "Router", "Performance"],
      duration: "3 Weeks"
    }
  ],
  mistakes: [
    "Don't use div for everything - use semantic HTML.",
    "Avoid inline styles - use CSS classes.",
    "Don't build without responsive design in mind.",
    "Avoid accessibility (A11y) oversights - it's not optional."
  ],
  tips: [
    "Design mobile-first.",
    "Test on real devices, not just browsers.",
    "Learn browser DevTools thoroughly.",
    "Stay updated with latest CSS features."
  ],
  advice: "Frontend is about creating amazing user experiences. Focus on performance, accessibility, and responsiveness. Remember that pixels matter - small details make huge differences!"
});

const generateBackendRoadmap = (): RoadmapData => ({
  goal: "Backend Developer",
  title: "Master Backend Development with Node.js",
  duration: "5-7 Months",
  summary: "Become expert in server-side development, APIs, databases, and infrastructure.",
  tree: ["JavaScript", "Node.js", "Express", "Databases", "DevOps"],
  modules: [
    {
      id: 1,
      title: "JavaScript Fundamentals",
      desc: "Master JavaScript before diving into Node.js.",
      time: "3 Weeks",
      status: "completed",
      skills: ["ES6+", "Async", "Modules"],
      tasks: [
        { name: "ES6+ Features", isCompleted: true },
        { name: "Async/Await & Promises", isCompleted: true },
        { name: "Module System (CommonJS & ESM)", isCompleted: true }
      ]
    },
    {
      id: 2,
      title: "Node.js & Express Basics",
      desc: "Build REST APIs with Node.js and Express.",
      time: "4 Weeks",
      status: "in-progress",
      skills: ["Node.js", "Express", "Routing", "Middleware"],
      tasks: [
        { name: "Node.js Runtime & Modules", isCompleted: true },
        { name: "Express Setup & Routing", isCompleted: false },
        { name: "Middleware & Request Handling", isCompleted: false },
        { name: "Error Handling", isCompleted: false }
      ]
    },
    {
      id: 3,
      title: "Databases",
      desc: "Learn SQL and NoSQL databases.",
      time: "4 Weeks",
      status: "locked",
      difficulty: "Intermediate",
      skills: ["SQL", "MongoDB", "Database Design"],
      tasks: [
        { name: "Relational Databases (PostgreSQL)" },
        { name: "NoSQL (MongoDB)" },
        { name: "Database Design & Normalization" },
        { name: "ORMs & ODMs (Sequelize, Mongoose)" }
      ]
    }
  ],
  projects: [
    {
      title: "REST API",
      difficulty: "Beginner",
      desc: "Build a simple REST API with Express.",
      skills: ["Node.js", "Express", "REST"],
      duration: "1 Week"
    },
    {
      title: "Authentication System",
      difficulty: "Intermediate",
      desc: "User auth with JWT and role-based access.",
      skills: ["JWT", "Security", "Databases"],
      duration: "2 Weeks"
    },
    {
      title: "Microservices",
      difficulty: "Advanced",
      desc: "Build microservices architecture.",
      skills: ["Docker", "Kubernetes", "Communication"],
      duration: "4 Weeks"
    }
  ],
  mistakes: [
    "Don't hardcode secrets - use environment variables.",
    "Avoid monolithic architectures for large projects.",
    "Don't trust user input - always validate.",
    "Avoid database queries in loops - use batch operations."
  ],
  tips: [
    "Learn SQL deeply before NoSQL.",
    "Understand database indexing.",
    "Master API design principles.",
    "Learn containerization (Docker)."
  ],
  advice: "Backend development is about building reliable, scalable systems. Focus on security, performance, and maintainability. Always think about edge cases and error handling!"
});

const generateDataScienceRoadmap = (): RoadmapData => ({
  goal: "Data Science Professional",
  title: "Data Science Career Path",
  duration: "6-12 Months",
  summary: "Master Python, statistics, machine learning, and become a data scientist.",
  tree: ["Python", "Math & Stats", "Pandas & NumPy", "ML", "Deep Learning"],
  modules: [
    {
      id: 1,
      title: "Python Programming",
      desc: "Master Python for data science.",
      time: "4 Weeks",
      status: "completed",
      skills: ["Python", "OOP", "Functional"],
      tasks: [
        { name: "Python Basics & Syntax", isCompleted: true },
        { name: "Object-Oriented Programming", isCompleted: true },
        { name: "Libraries (Requests, BeautifulSoup)", isCompleted: true }
      ]
    },
    {
      id: 2,
      title: "Mathematics & Statistics",
      desc: "Essential math for machine learning.",
      time: "5 Weeks",
      status: "in-progress",
      skills: ["Linear Algebra", "Calculus", "Statistics"],
      tasks: [
        { name: "Linear Algebra Fundamentals", isCompleted: true },
        { name: "Probability & Distributions", isCompleted: false },
        { name: "Hypothesis Testing", isCompleted: false }
      ]
    },
    {
      id: 3,
      title: "Data Analysis & Visualization",
      desc: "Work with data using Pandas and Matplotlib.",
      time: "3 Weeks",
      status: "locked",
      difficulty: "Intermediate",
      skills: ["Pandas", "Matplotlib", "EDA"],
      tasks: [
        { name: "Pandas Data Structures" },
        { name: "Data Cleaning & Preprocessing" },
        { name: "Exploratory Data Analysis" },
        { name: "Data Visualization" }
      ]
    }
  ],
  projects: [
    {
      title: "Data Analysis Project",
      difficulty: "Beginner",
      desc: "Analyze and visualize a public dataset.",
      skills: ["Pandas", "Matplotlib", "Statistics"],
      duration: "1 Week"
    },
    {
      title: "Predictive Model",
      difficulty: "Intermediate",
      desc: "Build ML models with Scikit-learn.",
      skills: ["ML", "Feature Engineering", "Evaluation"],
      duration: "2 Weeks"
    },
    {
      title: "End-to-End ML Project",
      difficulty: "Advanced",
      desc: "Complete project from data to deployment.",
      skills: ["ML", "Deep Learning", "Deployment"],
      duration: "4 Weeks"
    }
  ],
  mistakes: [
    "Don't skip the math - it's fundamental.",
    "Avoid jumping to deep learning without mastering basics.",
    "Don't ignore data cleaning and preprocessing."
  ],
  tips: [
    "Work with real datasets.",
    "Learn visualization deeply.",
    "Understand statistical concepts thoroughly."
  ],
  advice: "Data science is 80% data cleaning and exploration, 20% modeling. Focus on understanding your data first!"
});

const generateMobileRoadmap = (): RoadmapData => ({
  goal: "Mobile Developer",
  title: "Master Mobile App Development",
  duration: "4-6 Months",
  summary: "Build iOS and Android apps using React Native or native technologies.",
  tree: ["JavaScript", "React Native", "Native APIs", "Deployment"],
  modules: [
    {
      id: 1,
      title: "Mobile Development Basics",
      desc: "Learn mobile paradigms and React Native.",
      time: "3 Weeks",
      status: "completed",
      skills: ["React Native", "Mobile UI", "Navigation"],
      tasks: [
        { name: "React Native Setup", isCompleted: true },
        { name: "Components & Layout", isCompleted: true },
        { name: "Navigation (React Navigation)", isCompleted: true }
      ]
    },
    {
      id: 2,
      title: "Native APIs & Permissions",
      desc: "Access device features and APIs.",
      time: "3 Weeks",
      status: "in-progress",
      skills: ["Native Modules", "Permissions", "Camera"],
      tasks: [
        { name: "Camera & Photo Library", isCompleted: false },
        { name: "Location Services", isCompleted: false },
        { name: "Local Storage", isCompleted: false }
      ]
    }
  ],
  projects: [
    {
      title: "Weather App",
      difficulty: "Beginner",
      desc: "Simple weather app using public APIs.",
      skills: ["React Native", "APIs", "UI"],
      duration: "1 Week"
    },
    {
      title: "Todo App",
      difficulty: "Beginner",
      desc: "Todo app with local storage.",
      skills: ["React Native", "State", "Storage"],
      duration: "1 Week"
    },
    {
      title: "Full Feature App",
      difficulty: "Intermediate",
      desc: "App with camera, location, and backend.",
      skills: ["React Native", "Native APIs", "Backend"],
      duration: "3 Weeks"
    }
  ],
  mistakes: [
    "Don't ignore platform differences (iOS vs Android).",
    "Avoid poor performance on older devices.",
    "Don't neglect battery consumption."
  ],
  tips: [
    "Test on real devices.",
    "Learn platform guidelines.",
    "Understand app lifecycle."
  ],
  advice: "Mobile development is about creating fast, responsive apps. Focus on performance and user experience. Always test on real devices!"
});

const generateDevOpsRoadmap = (): RoadmapData => ({
  goal: "DevOps Engineer",
  title: "Master DevOps & Cloud Infrastructure",
  duration: "6-9 Months",
  summary: "Learn containerization, orchestration, CI/CD, and cloud platforms like AWS, GCP, or Azure.",
  tree: ["Linux", "Docker", "Kubernetes", "CI/CD", "Cloud (AWS/GCP)"],
  modules: [
    {
      id: 1,
      title: "Linux Fundamentals",
      desc: "Master Linux command line and system administration.",
      time: "3 Weeks",
      status: "completed",
      skills: ["Linux", "Bash", "System Admin"],
      tasks: [
        { name: "Command Line Basics", isCompleted: true },
        { name: "File System & Permissions", isCompleted: true },
        { name: "Package Management", isCompleted: true }
      ]
    },
    {
      id: 2,
      title: "Docker & Containerization",
      desc: "Build and manage Docker containers.",
      time: "3 Weeks",
      status: "in-progress",
      skills: ["Docker", "Containers", "Images"],
      tasks: [
        { name: "Docker Setup & Images", isCompleted: true },
        { name: "Containers & Volumes", isCompleted: false },
        { name: "Docker Compose", isCompleted: false }
      ]
    }
  ],
  projects: [
    {
      title: "Dockerize an App",
      difficulty: "Beginner",
      desc: "Create Dockerfile for an application.",
      skills: ["Docker", "Containers"],
      duration: "1 Week"
    },
    {
      title: "CI/CD Pipeline",
      difficulty: "Intermediate",
      desc: "Set up GitHub Actions or GitLab CI.",
      skills: ["CI/CD", "Automation", "Testing"],
      duration: "2 Weeks"
    }
  ],
  mistakes: [
    "Don't run containers as root.",
    "Avoid hardcoding configuration.",
    "Don't neglect security and monitoring."
  ],
  tips: [
    "Master infrastructure as code.",
    "Learn monitoring and logging.",
    "Understand networking deeply."
  ],
  advice: "DevOps is about automating everything. Focus on infrastructure as code, continuous improvement, and reliability!"
});

const generateBeginnerRoadmap = (): RoadmapData => ({
  goal: "Programming Fundamentals",
  title: "Start Your Coding Journey",
  duration: "8-12 Weeks",
  summary: "Learn the fundamental concepts of programming and web development from scratch.",
  tree: ["Programming Basics", "HTML", "CSS", "JavaScript", "First Project"],
  modules: [
    {
      id: 1,
      title: "Programming Fundamentals",
      desc: "Learn core programming concepts.",
      time: "2 Weeks",
      status: "completed",
      skills: ["Variables", "Functions", "Logic"],
      tasks: [
        { name: "Variables & Data Types", isCompleted: true },
        { name: "Operators & Conditionals", isCompleted: true },
        { name: "Loops & Functions", isCompleted: true }
      ]
    },
    {
      id: 2,
      title: "HTML & CSS Basics",
      desc: "Build web pages with HTML and CSS.",
      time: "3 Weeks",
      status: "in-progress",
      skills: ["HTML", "CSS", "Layouts"],
      tasks: [
        { name: "HTML Structure", isCompleted: true },
        { name: "CSS Styling", isCompleted: false },
        { name: "Responsive Design", isCompleted: false }
      ]
    },
    {
      id: 3,
      title: "JavaScript Basics",
      desc: "Add interactivity with JavaScript.",
      time: "3 Weeks",
      status: "locked",
      difficulty: "Beginner",
      skills: ["JavaScript", "DOM", "Events"],
      tasks: [
        { name: "JavaScript Syntax" },
        { name: "DOM Manipulation" },
        { name: "Event Handling" }
      ]
    }
  ],
  projects: [
    {
      title: "Personal Website",
      difficulty: "Beginner",
      desc: "Create your first website.",
      skills: ["HTML", "CSS"],
      duration: "1 Week"
    },
    {
      title: "Interactive Game",
      difficulty: "Beginner",
      desc: "Build a simple game with JavaScript.",
      skills: ["JavaScript", "Logic", "DOM"],
      duration: "2 Weeks"
    },
    {
      title: "Todo App",
      difficulty: "Beginner",
      desc: "Your first dynamic web app.",
      skills: ["JavaScript", "DOM", "Logic"],
      duration: "2 Weeks"
    }
  ],
  mistakes: [
    "Don't skip the fundamentals.",
    "Avoid jumping to frameworks too early.",
    "Don't get discouraged - everyone starts here!"
  ],
  tips: [
    "Code every day.",
    "Start with small projects.",
    "Join beginner-friendly communities.",
    "Don't compare yourself to others."
  ],
  advice: "Welcome to coding! Remember that every expert programmer was once a complete beginner. Be patient with yourself, practice consistently, and celebrate every small victory. You've got this!"
});

const generateGenericRoadmap = (goal: string): RoadmapData => ({
  goal: goal,
  title: `Your ${goal} Learning Path`,
  duration: "3-6 Months",
  summary: `A customized roadmap designed specifically for: "${goal}". This path combines fundamentals, practical skills, and real-world projects.`,
  tree: ["Fundamentals", "Core Skills", "Projects", "Advanced Topics", "Mastery"],
  modules: [
    {
      id: 1,
      title: "Foundation & Prerequisites",
      desc: "Master the fundamentals needed for your journey.",
      time: "2-3 Weeks",
      status: "completed",
      difficulty: "Beginner",
      skills: ["Basics", "Tools", "Environment Setup"],
      tasks: [
        { name: "Environment Setup", isCompleted: true },
        { name: "Essential Tools & Version Control", isCompleted: true },
        { name: "Communication & Documentation", isCompleted: true }
      ]
    },
    {
      id: 2,
      title: "Core Concepts",
      desc: "Deep dive into the main topics.",
      time: "4-6 Weeks",
      status: "in-progress",
      difficulty: "Intermediate",
      skills: ["Core Skills", "Problem Solving"],
      tasks: [
        { name: "Core Concept 1", isCompleted: true },
        { name: "Core Concept 2", isCompleted: false },
        { name: "Core Concept 3", isCompleted: false }
      ]
    },
    {
      id: 3,
      title: "Practical Projects",
      desc: "Apply your knowledge with real projects.",
      time: "4-8 Weeks",
      status: "locked",
      difficulty: "Intermediate",
      skills: ["Application", "Integration"],
      tasks: [
        { name: "Small Project" },
        { name: "Medium Project" },
        { name: "Capstone Project" }
      ]
    },
    {
      id: 4,
      title: "Advanced Topics",
      desc: "Master advanced concepts and best practices.",
      time: "3-4 Weeks",
      status: "locked",
      difficulty: "Advanced",
      skills: ["Optimization", "Scalability", "Performance"],
      tasks: [
        { name: "Advanced Topic 1" },
        { name: "Best Practices" },
        { name: "Optimization Techniques" }
      ]
    }
  ],
  projects: [
    {
      title: "Foundation Project",
      difficulty: "Beginner",
      desc: "Your first project applying basic concepts.",
      skills: ["Basics"],
      duration: "1-2 Weeks"
    },
    {
      title: "Intermediate Project",
      difficulty: "Intermediate",
      desc: "A more complex project combining multiple concepts.",
      skills: ["Multiple Skills"],
      duration: "2-3 Weeks"
    },
    {
      title: "Capstone Project",
      difficulty: "Advanced",
      desc: "A comprehensive project showcasing your skills.",
      skills: ["All Skills"],
      duration: "4-6 Weeks"
    }
  ],
  mistakes: [
    "Don't skip foundational concepts - they matter.",
    "Avoid comparison - focus on your own progress.",
    "Don't give up when things get challenging."
  ],
  tips: [
    "Practice every single day.",
    "Build projects to solidify learning.",
    "Join communities for support and networking.",
    "Share your progress and projects."
  ],
  advice: "Your journey is unique. Progress over perfection. Focus on consistent learning and building real projects. Success comes from showing up every day!"
});

const Roadmap = () => {
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);
  const [roadmap, setRoadmap] = useState<RoadmapData | null>(null);

  const handleGenerate = () => {
    if (!input.trim()) return;
    
    setIsGenerating(true);
    setRoadmap(null);
    setGenerationStep(0);

    // Simulate AI Generation Steps
    const steps = [
      "Analyzing your goal...",
      "Identifying key skills needed...",
      "Structuring learning modules...",
      "Curating projects & resources...",
      "Finalizing your personalized path..."
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      setGenerationStep(currentStep);
      
      if (currentStep >= steps.length) {
        clearInterval(interval);
        setIsGenerating(false);
        // Generate dynamic roadmap based on user input
        const generatedRoadmap = generateRoadmapFromGoal(input);
        setRoadmap(generatedRoadmap);
      }
    }, 800);
  };

  const suggestedPaths = [
    "MERN Stack Developer",
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Mobile Developer",
    "DevOps Engineer",
    "I'm a complete beginner"
  ];

  const handleQuickStart = (path: string) => {
    setInput(path);
    setTimeout(() => {
      handleGenerate();
    }, 0);
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto pb-20">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-2">
            AI Learning Roadmap Generator
          </h1>
          <p className="text-muted-foreground">
            Get a personalized learning path generated in real-time based on your goals
          </p>
        </div>

        {/* Input Section */}
        <GlassCard className="bg-gradient-to-br from-primary/10 to-secondary/10 border-cyan-500/30 p-6 mb-8">
          <div className="space-y-4">
            <label className="text-sm font-semibold text-foreground">What do you want to learn?</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
                placeholder="e.g., MERN Stack, Frontend Developer, Data Science..."
                className="flex-1 bg-background/50 border border-cyan-500/30 rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition"
              />
              <NeonButton 
                onClick={handleGenerate}
                disabled={!input.trim() || isGenerating}
                className="px-6"
              >
                {isGenerating ? 'Generating...' : 'Generate'}
              </NeonButton>
            </div>

            {/* Suggested Paths */}
            <div className="pt-4 border-t border-cyan-500/20">
              <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">Quick Start</p>
              <div className="flex flex-wrap gap-2">
                {suggestedPaths.map((path) => (
                  <button
                    key={path}
                    onClick={() => handleQuickStart(path)}
                    disabled={isGenerating}
                    className="text-xs px-3 py-1.5 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-500/50 rounded-full transition text-cyan-400 hover:text-cyan-300 disabled:opacity-50"
                  >
                    {path}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Generation Steps */}
        {isGenerating && (
          <GlassCard className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border-cyan-500/30 mb-8">
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((step) => (
                <div key={step} className="flex items-center gap-3">
                  {step <= generationStep ? (
                    <CheckCircle className="w-5 h-5 text-cyan-400" />
                  ) : (
                    <Circle className="w-5 h-5 text-muted-foreground/50" />
                  )}
                  <span className={step <= generationStep ? 'text-foreground' : 'text-muted-foreground'}>
                    {step === 1 && 'Analyzing your goal...'}
                    {step === 2 && 'Identifying key skills needed...'}
                    {step === 3 && 'Structuring learning modules...'}
                    {step === 4 && 'Curating projects & resources...'}
                    {step === 5 && 'Finalizing your personalized path...'}
                  </span>
                </div>
              ))}
            </div>
          </GlassCard>
        )}

        {/* Roadmap Display */}
        {roadmap && !isGenerating && (
          <div className="space-y-6">
            {/* Overview */}
            <GlassCard className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border-cyan-500/30">
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="text-2xl font-bold text-foreground">{roadmap.title}</h2>
                    <span className="text-sm bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full">
                      {roadmap.duration}
                    </span>
                  </div>
                  <p className="text-muted-foreground">{roadmap.summary}</p>
                </div>

                {/* Skills Tree */}
                <div>
                  <h3 className="text-sm font-semibold text-foreground mb-3">Learning Path</h3>
                  <div className="flex flex-wrap gap-2">
                    {roadmap.tree.map((skill, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm font-medium">
                          {skill}
                        </span>
                        {idx < roadmap.tree.length - 1 && <ArrowRight className="w-4 h-4 text-muted-foreground" />}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Modules */}
            {roadmap.modules && roadmap.modules.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-cyan-400" /> Learning Modules
                </h2>
                {roadmap.modules.map((module) => (
                  <GlassCard key={module.id} className="border-cyan-500/20 hover:border-cyan-500/40 transition">
                    <div className="flex items-start gap-4 mb-4">
                      {module.status === 'completed' && <CheckCircle className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />}
                      {module.status === 'in-progress' && <Zap className="w-6 h-6 text-yellow-400 mt-1 flex-shrink-0 animate-pulse" />}
                      {module.status === 'locked' && <Lock className="w-6 h-6 text-muted-foreground/50 mt-1 flex-shrink-0" />}
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-foreground">{module.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{module.desc}</p>
                        <div className="flex gap-2 mt-2 flex-wrap">
                          <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded">
                            <Clock className="w-3 h-3 inline mr-1" />{module.time}
                          </span>
                          {module.difficulty && (
                            <span className={`text-xs px-2 py-1 rounded ${
                              module.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                              module.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-red-500/20 text-red-400'
                            }`}>
                              {module.difficulty}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Tasks */}
                    <div className="pl-10">
                      <ul className="space-y-2">
                        {module.tasks.map((task, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm">
                            {task.isCompleted ? (
                              <CheckCircle className="w-4 h-4 text-green-400" />
                            ) : module.status === 'locked' ? (
                              <Circle className="w-4 h-4 text-muted-foreground/50" />
                            ) : (
                              <Circle className="w-4 h-4 text-cyan-400/50" />
                            )}
                            <span className={task.isCompleted ? 'line-through text-muted-foreground' : 'text-foreground'}>
                              {task.name}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </GlassCard>
                ))}
              </div>
            )}

            {/* Projects */}
            {roadmap.projects && roadmap.projects.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                  <Cpu className="w-6 h-6 text-purple-400" /> Capstone Projects
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {roadmap.projects.map((project, idx) => (
                    <GlassCard key={idx} className="border-purple-500/20 hover:border-purple-500/40 transition">
                      <h3 className="font-bold text-lg text-foreground mb-2">{project.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{project.desc}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex gap-2 flex-wrap">
                          {project.skills.map((skill, i) => (
                            <span key={i} className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded">
                              {skill}
                            </span>
                          ))}
                        </div>
                        <span className={`text-xs font-semibold px-2 py-1 rounded ${
                          project.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-400' :
                          project.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {project.difficulty}
                        </span>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </div>
            )}

            {/* Common Mistakes */}
            {roadmap.mistakes && roadmap.mistakes.length > 0 && (
              <GlassCard className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border-red-500/20">
                <h3 className="text-lg font-bold flex items-center gap-2 mb-4 text-foreground">
                  <AlertTriangle className="w-5 h-5 text-red-400" /> Common Mistakes to Avoid
                </h3>
                <ul className="space-y-2">
                  {roadmap.mistakes.map((mistake, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex gap-2">
                      <span className="text-red-400 font-bold">•</span>
                      {mistake}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            )}

            {/* Tips */}
            {roadmap.tips && roadmap.tips.length > 0 && (
              <GlassCard className="bg-gradient-to-br from-green-500/10 to-cyan-500/10 border-green-500/20">
                <h3 className="text-lg font-bold flex items-center gap-2 mb-4 text-foreground">
                  <Lightbulb className="w-5 h-5 text-yellow-400" /> Pro Tips
                </h3>
                <ul className="space-y-2">
                  {roadmap.tips.map((tip, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex gap-2">
                      <span className="text-green-400 font-bold">✓</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            )}

            {/* Final Advice */}
            <GlassCard className="bg-gradient-to-br from-primary/10 to-secondary/10 border-none">
              <h3 className="text-lg font-bold flex items-center gap-2 mb-4 text-foreground">
                <Sparkles className="w-5 h-5 text-yellow-400" /> Mentor's Advice
              </h3>
              <blockquote className="text-sm italic text-muted-foreground border-l-2 border-primary pl-4">
                "{roadmap.advice}"
              </blockquote>
            </GlassCard>

            {/* Generate Another */}
            <div className="flex justify-center pt-4">
              <button
                onClick={() => {
                  setRoadmap(null);
                  setInput('');
                  setGenerationStep(0);
                }}
                className="flex items-center gap-2 px-6 py-3 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-500/50 rounded-lg text-cyan-400 hover:text-cyan-300 transition font-semibold"
              >
                <RefreshCw className="w-4 h-4" /> Generate Another Roadmap
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Roadmap;
