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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const [location] = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [showLogoutConfirm, setShowLogoutConfirm] = React.useState(false);

  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  const handleConfirmLogout = () => {
    setShowLogoutConfirm(false);
    logout();
  };

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

  const recruiterLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/recruiter', label: 'Dashboard', icon: Briefcase },
    { href: '/jobs', label: 'Jobs', icon: Briefcase },
    { href: '/hackathons', label: 'Hackathons', icon: Trophy },
    { href: '/portfolio', label: 'Portfolio', icon: User },
  ];

  const organizerLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/hackathons', label: 'Manage Hackathons', icon: Trophy },
    { href: '/portfolio', label: 'Profile', icon: User },
  ];

  const getRoleLinks = () => {
    if (!user) return [];
    if (user.role === 'recruiter') return recruiterLinks;
    if (user.role === 'organizer') return organizerLinks;
    return studentLinks;
  };

  const links = getRoleLinks();

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground overflow-hidden">
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative">
        {/* Top Navigation Bar */}
        <nav className="h-14 flex items-center justify-between px-8 sticky top-0 z-30 glass border-b border-white/10" role="navigation" aria-label="Main navigation">
          {/* Logo Section */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary animate-pulse" aria-hidden="true" />
            <h2 className="text-xl font-bold tracking-tighter hidden md:block">
              Code<span className="text-neon-cyan">Craft</span>
            </h2>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-1">
            {links.map((link) => {
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
                    aria-current={isActive ? 'page' : undefined}
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
            <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" aria-hidden="true" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search navigation"
              className="w-48 bg-transparent border-b border-white/20 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:border-b-2 transition-colors px-1 py-2"
            />
          </div>
          
          <div className="flex items-center gap-6">
            {/* Settings & Logout */}
            <Link href="/settings">
              <a 
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Go to settings"
              >
                <Settings className="w-5 h-5" aria-hidden="true" />
              </a>
            </Link>
            <button 
              onClick={handleLogoutClick}
              className="text-muted-foreground hover:text-destructive transition-colors"
              aria-label="Logout from account"
            >
              <LogOut className="w-5 h-5" aria-hidden="true" />
            </button>
            
            {/* User Profile */}
            <div className="flex items-center gap-4 pl-6 border-l border-white/10">
             <div className="text-right hidden md:block">
               <p className="text-sm font-medium text-foreground">{user.name}</p>
               <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
             </div>
             <img 
               src={user.avatar} 
               alt={`${user.name}'s avatar`}
               className="w-10 h-10 rounded-full border border-white/10" 
             />
           </div>
          </div>
        </header>

        <div className="p-4 md:p-8 max-w-7xl mx-auto pb-20">
          {children}
        </div>
        {/* Logout confirmation dialog */}
        <Dialog open={showLogoutConfirm} onOpenChange={setShowLogoutConfirm}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Logout</DialogTitle>
              <DialogDescription>
                Are you sure you want to logout? You will be signed out of your
                session and returned to the home page.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowLogoutConfirm(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleConfirmLogout}>
                Logout
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default Layout;
