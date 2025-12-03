import React, { Suspense, useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { Toaster } from "@/components/ui/toaster";
import ErrorBoundary from "@/components/ErrorBoundary";
import NotFound from "@/pages/not-found";
import Forbidden from "@/pages/Forbidden";
import { RoleProtectedRoute } from "@/components/RoleProtectedRoute";
import GlassCard from "@/components/GlassCard";

// Pages
import Home from "@/pages/Home";
import Auth from "@/pages/Auth";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Dashboard from "@/pages/Dashboard";
import Practice from "@/pages/Practice";
import Progress from "@/pages/Progress";
import Jobs from "@/pages/Jobs";
import Roadmap from "@/pages/Roadmap";
import Mentor from "@/pages/Mentor";
import Hackathons from "@/pages/Hackathons";
import Portfolio from "@/pages/Portfolio";
import Settings from "@/pages/Settings";
import RecruiterDashboard from "@/pages/RecruiterDashboard";
import SubmitProject from "@/pages/SubmitProject";
import About from "@/pages/About";

// Loading Fallback Component
function LoadingFallback() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <GlassCard className="p-8 text-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading...</p>
      </GlassCard>
    </div>
  );
}

// Protected Route Wrapper
function ProtectedRoute({ component: Component }: { component: React.ComponentType<{}> }) {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  if (!user) {
    setTimeout(() => setLocation("/auth"), 0);
    return null;
  }

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Component />
    </Suspense>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/auth" component={Auth} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/about" component={About} />
      <Route path="/forbidden" component={Forbidden} />
      
      {/* Protected Routes - Available to all authenticated users */}
      <Route path="/dashboard">
        {() => <RoleProtectedRoute component={Dashboard} />}
      </Route>
      <Route path="/settings">
        {() => <RoleProtectedRoute component={Settings} />}
      </Route>
      <Route path="/portfolio">
        {() => <RoleProtectedRoute component={Portfolio} />}
      </Route>

      {/* Student-only Routes */}
      <Route path="/practice">
        {() => <RoleProtectedRoute component={Practice} requiredRoles={['student']} />}
      </Route>
      <Route path="/progress">
        {() => <RoleProtectedRoute component={Progress} requiredRoles={['student']} />}
      </Route>
      <Route path="/roadmap">
        {() => <RoleProtectedRoute component={Roadmap} requiredRoles={['student']} />}
      </Route>
      <Route path="/mentor">
        {() => <RoleProtectedRoute component={Mentor} requiredRoles={['student']} />}
      </Route>
      <Route path="/submit-project">
        {() => <RoleProtectedRoute component={SubmitProject} requiredRoles={['student']} />}
      </Route>

      {/* Student/Recruiter can view jobs */}
      <Route path="/jobs">
        {() => <RoleProtectedRoute component={Jobs} requiredRoles={['student', 'recruiter']} />}
      </Route>

      {/* Hackathons - All roles can access but organizers have special access */}
      <Route path="/hackathons">
        {() => <RoleProtectedRoute component={Hackathons} />}
      </Route>

      {/* Recruiter-only Routes */}
      <Route path="/recruiter">
        {() => <RoleProtectedRoute component={RecruiterDashboard} requiredRoles={['recruiter']} />}
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

// Meta Tags Manager Component
function MetaTags() {
  useEffect(() => {
    document.title = "CodeCraft - Learn to Code, Build Projects, Get Hired";
    
    const meta = (name: string, content: string) => {
      const tag = document.querySelector(`meta[name="${name}"]`) || document.createElement('meta');
      tag.setAttribute('name', name);
      tag.setAttribute('content', content);
      document.head.appendChild(tag);
    };

    const property = (prop: string, content: string) => {
      const tag = document.querySelector(`meta[property="${prop}"]`) || document.createElement('meta');
      tag.setAttribute('property', prop);
      tag.setAttribute('content', content);
      document.head.appendChild(tag);
    };

    meta('description', 'CodeCraft - Learn modern web development, practice coding problems, get personalized roadmaps, and connect with mentors. Start your tech career today!');
    meta('keywords', 'coding, programming, web development, React, JavaScript, tutorials, practice, roadmap');
    meta('viewport', 'width=device-width, initial-scale=1');
    meta('theme-color', '#050505');
    meta('apple-mobile-web-app-capable', 'yes');
    meta('apple-mobile-web-app-status-bar-style', 'black-translucent');

    property('og:title', 'CodeCraft - Learn to Code');
    property('og:description', 'Master web development with interactive roadmaps and AI mentorship');
    property('og:type', 'website');
    property('og:image', '/logo.svg');
    
    meta('twitter:card', 'summary_large_image');
    meta('twitter:title', 'CodeCraft');
    meta('twitter:description', 'Learn to code with AI mentors and personalized roadmaps');
  }, []);

  return null;
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <MetaTags />
          <Toaster />
          <Router />
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
