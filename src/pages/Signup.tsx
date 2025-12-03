import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/context/AuthContext';
import NeonButton from '@/components/NeonButton';
import GlassCard from '@/components/GlassCard';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Github, Mail, Lock, User, ArrowRight, Eye, EyeOff } from 'lucide-react';

const SignupPage = () => {
  const { login } = useAuth();
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [signupError, setSignupError] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (pwd: string) => {
    // Minimum 8 characters, at least one uppercase, one lowercase, one number
    const minLength = pwd.length >= 8;
    const hasUppercase = /[A-Z]/.test(pwd);
    const hasLowercase = /[a-z]/.test(pwd);
    const hasNumbers = /\d/.test(pwd);
    
    return minLength && hasUppercase && hasLowercase && hasNumbers;
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError('');

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
      setSignupError('Please fill in all fields');
      return;
    }

    if (!validateEmail(formData.email)) {
      setSignupError('Please enter a valid email address');
      return;
    }

    if (!validatePassword(formData.password)) {
      setSignupError('Password must be at least 8 characters with uppercase, lowercase, and numbers');
      return;
    }

    // Validate name length
    if (formData.firstName.length < 2 || formData.lastName.length < 2) {
      setSignupError('First and last names must be at least 2 characters');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      login('student');
      setIsLoading(false);
    }, 1500);
  };

  const handleGithubSignup = () => {
    setIsLoading(true);
    setTimeout(() => {
      login('student');
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden p-4">
      {/* Background FX */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] animate-pulse delay-700" />
      </div>

      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tighter mb-2">
            Join <span className="text-neon-cyan">CodeCraft</span>
          </h1>
          <p className="text-muted-foreground">Start your coding journey today.</p>
        </div>

        <GlassCard className="p-8 border-primary/20 shadow-[0_0_50px_-10px_rgba(0,243,255,0.1)]">
          <form onSubmit={handleSignup} className="space-y-4">
            {signupError && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500 text-sm">
                {signupError}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="firstName" 
                    placeholder="Alex" 
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="pl-10 bg-black/20 border-white/10" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="lastName" 
                    placeholder="Coder" 
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="pl-10 bg-black/20 border-white/10" 
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="email" 
                  type="email"
                  placeholder="alex@example.com" 
                  value={formData.email}
                  onChange={handleInputChange}
                  className="pl-10 bg-black/20 border-white/10" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="pl-10 pr-10 bg-black/20 border-white/10" 
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <NeonButton type="submit" className="w-full mt-6" disabled={isLoading}>
              {isLoading ? (
                <span className="animate-pulse">Creating Account...</span>
              ) : (
                <>Create Account <ArrowRight className="w-4 h-4 ml-2" /></>
              )}
            </NeonButton>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or sign up with</span>
              </div>
            </div>

            <button 
              type="button"
              onClick={handleGithubSignup}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors"
            >
              <Github className="w-5 h-5" />
              <span>GitHub</span>
            </button>

            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <button 
                type="button" 
                onClick={() => setLocation('/login')}
                className="text-primary hover:underline font-semibold"
              >
                Sign in
              </button>
            </div>
          </form>
        </GlassCard>

        <p className="text-center text-xs text-muted-foreground mt-6">
          By signing up, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
