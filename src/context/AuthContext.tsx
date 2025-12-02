import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation } from 'wouter';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'recruiter';
  avatar: string;
}

interface AuthContextType {
  user: User | null;
  login: (role: 'student' | 'recruiter') => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Check local storage for existing session
    const storedUser = localStorage.getItem('codecraft_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (role: 'student' | 'recruiter') => {
    const mockUser: User = {
      id: '1',
      name: role === 'student' ? 'Alex Coder' : 'Sarah Recruiter',
      email: role === 'student' ? 'alex@codecraft.dev' : 'sarah@hiring.com',
      role: role,
      avatar: `https://ui-avatars.com/api/?name=${role === 'student' ? 'Alex+Coder' : 'Sarah+Recruiter'}&background=random`
    };
    setUser(mockUser);
    localStorage.setItem('codecraft_user', JSON.stringify(mockUser));
    
    if (role === 'student') {
      setLocation('/dashboard');
    } else {
      setLocation('/recruiter');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('codecraft_user');
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
