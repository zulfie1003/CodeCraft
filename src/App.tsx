import React from "react";
import { Switch, Route, useLocation } from "wouter";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";

// Pages
import Home from "@/pages/Home";
import Auth from "@/pages/Auth";
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

// Protected Route Wrapper
function ProtectedRoute({ component: Component }: { component: React.ComponentType<{}> }) {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  if (!user) {
    setTimeout(() => setLocation("/auth"), 0);
    return null;
  }

  return <Component />;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/auth" component={Auth} />
      
      {/* Protected Routes */}
      <Route path="/dashboard">
        {() => <ProtectedRoute component={Dashboard} />}
      </Route>
      <Route path="/practice">
        {() => <ProtectedRoute component={Practice} />}
      </Route>
      <Route path="/progress">
        {() => <ProtectedRoute component={Progress} />}
      </Route>
      <Route path="/jobs">
        {() => <ProtectedRoute component={Jobs} />}
      </Route>
      <Route path="/roadmap">
        {() => <ProtectedRoute component={Roadmap} />}
      </Route>
      <Route path="/mentor">
        {() => <ProtectedRoute component={Mentor} />}
      </Route>
      <Route path="/hackathons">
        {() => <ProtectedRoute component={Hackathons} />}
      </Route>
      <Route path="/portfolio">
        {() => <ProtectedRoute component={Portfolio} />}
      </Route>
      <Route path="/submit-project">
        {() => <ProtectedRoute component={SubmitProject} />}
      </Route>
      <Route path="/settings">
        {() => <ProtectedRoute component={Settings} />}
      </Route>
      <Route path="/recruiter">
        {() => <ProtectedRoute component={RecruiterDashboard} />}
      </Route>
      <Route path="/about">
        {() => <ProtectedRoute component={About} />}
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Toaster />
        <Router />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
