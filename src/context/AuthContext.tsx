import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'wouter';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'recruiter' | 'organizer';
  avatar: string;
}

interface AuthContextType {
  user: User | null;
  login: (role: 'student' | 'recruiter' | 'organizer') => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Check sessionStorage only (cleared on browser close)
    const storedUser = sessionStorage.getItem('codecraft_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse user data:', error);
        sessionStorage.removeItem('codecraft_user');
      }
    }
  }, []);

  const login = (role: 'student' | 'recruiter' | 'organizer') => {
    const roleNames = {
      student: 'Alex Coder',
      recruiter: 'Sarah Recruiter',
      organizer: 'Event Organizer'
    };
    const roleEmails = {
      student: 'alex@codecraft.dev',
      recruiter: 'sarah@hiring.com',
      organizer: 'organizer@events.com'
    };
    const roleSeed = {
      student: 'AlexCoder',
      recruiter: 'SarahRecruiter',
      organizer: 'EventOrganizer'
    };

    const mockUser: User = {
      id: String(Math.random()),
      name: roleNames[role],
      email: roleEmails[role],
      role: role,
      avatar: `https://api.dicebear.com/7.x/anime/svg?seed=${roleSeed[role]}&scale=80`
    };
    setUser(mockUser);
    // Only use sessionStorage for security (cleared when browser closes)
    sessionStorage.setItem('codecraft_user', JSON.stringify(mockUser));
    
    if (role === 'student') {
      setLocation('/dashboard');
    } else if (role === 'recruiter') {
      setLocation('/recruiter');
    } else {
      setLocation('/hackathons');
    }
  };

  const logout = () => {
    setUser(null);
    // Clear sessionStorage only (no localStorage to clear now)
    sessionStorage.removeItem('codecraft_user');
    setLocation('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
