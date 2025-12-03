import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/context/AuthContext';
import NeonButton from '@/components/NeonButton';
import GlassCard from '@/components/GlassCard';
import { PasswordStrengthIndicator } from '@/components/PasswordStrengthIndicator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Github, Mail, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

const LoginPage = () => {
  const { login } = useAuth();
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (pwd: string) => {
    const minLength = pwd.length >= 8;
    const hasUppercase = /[A-Z]/.test(pwd);
    const hasLowercase = /[a-z]/.test(pwd);
    const hasNumbers = /\d/.test(pwd);
    
    return minLength && hasUppercase && hasLowercase && hasNumbers;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({ email: '', password: '' });
    
    let hasError = false;

    if (!email) {
      setErrors(prev => ({ ...prev, email: 'Email is required' }));
      hasError = true;
    } else if (!validateEmail(email)) {
      setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
      hasError = true;
    }

    if (!password) {
      setErrors(prev => ({ ...prev, password: 'Password is required' }));
      hasError = true;
    } else if (!validatePassword(password)) {
      setErrors(prev => ({ ...prev, password: 'Password must be 8+ chars with uppercase, lowercase, and numbers' }));
      hasError = true;
    }

    if (hasError) {
      toast.error('Please fix the errors above');
      return;
    }

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      login('student');
      toast.success('Welcome back! 🎉');
    } catch (error) {
      toast.error('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGithubLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      try {
        login('student');
        toast.success('GitHub login successful! 🚀');
      } catch (error) {
        toast.error('GitHub login failed');
      } finally {
        setIsLoading(false);
      }
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
            Welcome <span className="text-neon-cyan">Back</span>
          </h1>
          <p className="text-muted-foreground">Enter the gateway to your coding future.</p>
        </div>

        <GlassCard className="p-8 border-primary/20 shadow-[0_0_50px_-10px_rgba(0,243,255,0.1)]">
          <form onSubmit={handleLogin} className="space-y-6" noValidate>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                <Input 
                  id="email" 
                  type="email"
                  placeholder="alex@codecraft.dev" 
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                  }}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className="pl-10 bg-black/20 border-white/10 focus:border-primary" 
                />
              </div>
              {errors.email && (
                <p id="email-error" className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors(prev => ({ ...prev, password: '' }));
                  }}
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? 'password-error' : undefined}
                  className="pl-10 pr-10 bg-black/20 border-white/10 focus:border-primary" 
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" aria-hidden="true" /> : <Eye className="h-4 w-4" aria-hidden="true" />}
                </button>
              </div>
              {password && <PasswordStrengthIndicator password={password} />}
              {errors.password && (
                <p id="password-error" className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>

            <NeonButton type="submit" className="w-full" disabled={isLoading} aria-busy={isLoading}>
              {isLoading ? (
                <span className="animate-pulse">Authenticating...</span>
              ) : (
                <>Sign In <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" /></>
              )}
            </NeonButton>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/10" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            <button 
              type="button"
              onClick={handleGithubLogin}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors disabled:opacity-50"
              aria-label="Sign in with GitHub"
            >
              <Github className="w-5 h-5" aria-hidden="true" />
              <span>GitHub</span>
            </button>

            <div className="text-center text-sm text-muted-foreground">
              Don't have an account?{' '}
              <button 
                type="button" 
                onClick={() => setLocation('/signup')}
                className="text-primary hover:underline font-semibold"
                aria-label="Go to sign up page"
              >
                Sign up
              </button>
            </div>
          </form>
        </GlassCard>
      </div>
    </div>
  );
};


export default LoginPage;
