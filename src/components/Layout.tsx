import React from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  Code2, 
  Map, 
  Bot, 
  Briefcase, 
  Trophy, 
  User, 
  Settings, 
  LogOut,
  Menu,
  X,
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const [location] = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');

  if (!user) {
    return <>{children}</>;
  }

  const studentLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/practice', label: 'Practice', icon: Code2 },
    { href: '/roadmap', label: 'Roadmap', icon: Map },
    { href: '/mentor', label: 'AI Mentor', icon: Bot },
    { href: '/jobs', label: 'Jobs', icon: Briefcase },
    { href: '/hackathons', label: 'Hackathons', icon: Trophy },
    { href: '/portfolio', label: 'Portfolio', icon: User },
  ];

  const links = studentLinks; // Can add recruiter toggle later

  const navLinks = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/practice', label: 'Practice' },
    { href: '/roadmap', label: 'Roadmap' },
    { href: '/mentor', label: 'AI Mentor' },
    { href: '/jobs', label: 'Jobs' },
    { href: '/hackathons', label: 'Hackathons' },
    { href: '/portfolio', label: 'Portfolio' },
    { href: '/about', label: 'About Us' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground overflow-hidden">
      {/* Mobile Sidebar Toggle - Hidden */}

      {/* Sidebar - Hidden */}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative">
        {/* Top Navigation Bar */}
        <nav className="h-14 flex items-center justify-between px-8 sticky top-0 z-30 glass border-b border-white/10">
          {/* Logo Section */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary animate-pulse" />
            <h2 className="text-xl font-bold tracking-tighter hidden md:block">
              Code<span className="text-neon-cyan">Craft</span>
            </h2>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location === link.href;
              return (
                <Link key={link.href} href={link.href}>
                  <a
                    className={`
                      px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap
                      ${isActive
                        ? 'text-primary bg-primary/10 border border-primary/20'
                        : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                      }
                    `}
                  >
                    {link.label}
                  </a>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Header for Mobile/Desktop consistency */}
        <header className="h-16 flex items-center justify-between px-8 sticky top-14 z-20 glass md:glass-none md:bg-transparent">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-48 bg-transparent border-b border-white/20 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:border-b-2 transition-colors px-1 py-2"
            />
          </div>
          
          <div className="flex items-center gap-6">
            {/* Settings & Logout */}
            <Link href="/settings">
              <a className="text-muted-foreground hover:text-primary transition-colors">
                <Settings className="w-5 h-5" />
              </a>
            </Link>
            <button 
              onClick={logout}
              className="text-muted-foreground hover:text-destructive transition-colors"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
            
            {/* User Profile */}
            <div className="flex items-center gap-4 pl-6 border-l border-white/10">
             <div className="text-right hidden md:block">
               <p className="text-sm font-medium text-foreground">{user.name}</p>
               <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
             </div>
             <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full border border-white/10" />
           </div>
          </div>
        </header>

        <div className="p-4 md:p-8 max-w-7xl mx-auto pb-20">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
