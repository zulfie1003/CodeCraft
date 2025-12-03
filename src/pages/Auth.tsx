import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/context/AuthContext';
import NeonButton from '@/components/NeonButton';
import GlassCard from '@/components/GlassCard';
import { PasswordStrengthIndicator } from '@/components/PasswordStrengthIndicator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Github, Mail, Lock, User, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

const AuthPage = () => {
  const { login } = useAuth();
  const [, setLocation] = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [signupError, setSignupError] = useState('');
  const [selectedRole, setSelectedRole] = useState<'student' | 'recruiter' | 'organizer'>('student');
  const [signupRole, setSignupRole] = useState<'student' | 'recruiter' | 'organizer'>('student');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    signupEmail: '',
    signupPassword: ''
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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    if (!validateEmail(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (!validatePassword(formData.password)) {
      toast.error('Password must be 8+ chars with uppercase, lowercase, and numbers');
      return;
    }

    setIsLoading(true);
    try {
      setTimeout(() => {
        login(selectedRole);
        const roleText = selectedRole === 'recruiter' ? 'Recruiter' : 'Student';
        toast.success(`Welcome back, ${roleText}! 🎉`);
      }, 1500);
    } catch (error) {
      toast.error('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError('');

    if (!formData.firstName || !formData.lastName || !formData.signupEmail || !formData.signupPassword) {
      toast.error('Please fill in all fields');
      return;
    }

    if (!validateEmail(formData.signupEmail)) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (!validatePassword(formData.signupPassword)) {
      toast.error('Password must be 8+ chars with uppercase, lowercase, and numbers');
      return;
    }

    if (formData.firstName.length < 2 || formData.lastName.length < 2) {
      toast.error('First and last names must be at least 2 characters');
      return;
    }

    setIsLoading(true);
    try {
      setTimeout(() => {
        login(signupRole);
        const roleText = signupRole === 'recruiter' ? 'Recruiter' : 'Student';
        toast.success(`Account created! Welcome to CodeCraft as a ${roleText}! 🚀`);
      }, 1500);
    } catch (error) {
      toast.error('Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGithubLogin = () => {
    setIsLoading(true);
    try {
      setTimeout(() => {
        login(selectedRole);
        toast.success('GitHub login successful! 🚀');
      }, 1500);
    } catch (error) {
      toast.error('GitHub login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const switchToSignup = () => {
    const signupTab = document.querySelector('[value="signup"]') as HTMLButtonElement;
    if (signupTab) signupTab.click();
  };

  const switchToLogin = () => {
    const loginTab = document.querySelector('[value="login"]') as HTMLButtonElement;
    if (loginTab) loginTab.click();
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
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 bg-black/40">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-6" noValidate>
                <div className="space-y-2">
                  <Label>I am a</Label>
                  <div className="flex gap-2 flex-wrap">
                    <button
                      type="button"
                      onClick={() => setSelectedRole('student')}
                      className={`flex-1 py-2 px-3 rounded-lg border transition-all text-sm ${
                        selectedRole === 'student'
                          ? 'bg-primary/20 border-primary text-primary'
                          : 'bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10'
                      }`}
                    >
                      Student
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedRole('recruiter')}
                      className={`flex-1 py-2 px-3 rounded-lg border transition-all text-sm ${
                        selectedRole === 'recruiter'
                          ? 'bg-primary/20 border-primary text-primary'
                          : 'bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10'
                      }`}
                    >
                      Recruiter
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedRole('organizer')}
                      className={`flex-1 py-2 px-3 rounded-lg border transition-all text-sm ${
                        selectedRole === 'organizer'
                          ? 'bg-primary/20 border-primary text-primary'
                          : 'bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10'
                      }`}
                    >
                      Organizer
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                    <Input 
                      id="email" 
                      type="email"
                      placeholder="alex@codecraft.dev" 
                      value={formData.email}
                      onChange={handleInputChange}
                      className="pl-10 bg-black/20 border-white/10 focus:border-primary" 
                      aria-label="Email address"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                    <Input 
                      id="password" 
                      type={showPassword ? "text" : "password"} 
                      placeholder="••••••••" 
                      value={formData.password}
                      onChange={handleInputChange}
                      className="pl-10 pr-10 bg-black/20 border-white/10 focus:border-primary" 
                      aria-label="Password"
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

                <p className="text-center text-sm text-muted-foreground">
                  Don't have an account?{' '}
                  <button 
                    type="button" 
                    onClick={switchToSignup}
                    className="text-primary hover:underline font-semibold"
                    aria-label="Go to sign up page"
                  >
                    Sign up
                  </button>
                </p>
              </form>
            </TabsContent>
            
            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4" noValidate>
                <div className="space-y-2">
                  <Label>Join as</Label>
                  <div className="flex gap-2 flex-wrap">
                    <button
                      type="button"
                      onClick={() => setSignupRole('student')}
                      className={`flex-1 py-2 px-3 rounded-lg border transition-all text-sm ${
                        signupRole === 'student'
                          ? 'bg-primary/20 border-primary text-primary'
                          : 'bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10'
                      }`}
                    >
                      Student
                    </button>
                    <button
                      type="button"
                      onClick={() => setSignupRole('recruiter')}
                      className={`flex-1 py-2 px-3 rounded-lg border transition-all text-sm ${
                        signupRole === 'recruiter'
                          ? 'bg-primary/20 border-primary text-primary'
                          : 'bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10'
                      }`}
                    >
                      Recruiter
                    </button>
                    <button
                      type="button"
                      onClick={() => setSignupRole('organizer')}
                      className={`flex-1 py-2 px-3 rounded-lg border transition-all text-sm ${
                        signupRole === 'organizer'
                          ? 'bg-primary/20 border-primary text-primary'
                          : 'bg-white/5 border-white/10 text-muted-foreground hover:bg-white/10'
                      }`}
                    >
                      Organizer
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                      <Input 
                        id="firstName" 
                        placeholder="Alex" 
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="pl-10 bg-black/20 border-white/10"
                        aria-label="First name"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                      <Input 
                        id="lastName" 
                        placeholder="Coder" 
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="pl-10 bg-black/20 border-white/10"
                        aria-label="Last name"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signupEmail">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                    <Input 
                      id="signupEmail" 
                      type="email"
                      placeholder="alex@example.com" 
                      value={formData.signupEmail}
                      onChange={handleInputChange}
                      className="pl-10 bg-black/20 border-white/10"
                      aria-label="Email address"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signupPassword">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" aria-hidden="true" />
                    <Input 
                      id="signupPassword" 
                      type={showSignupPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.signupPassword}
                      onChange={handleInputChange}
                      className="pl-10 pr-10 bg-black/20 border-white/10"
                      aria-label="Password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowSignupPassword(!showSignupPassword)}
                      className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={showSignupPassword ? 'Hide password' : 'Show password'}
                    >
                      {showSignupPassword ? <EyeOff className="h-4 w-4" aria-hidden="true" /> : <Eye className="h-4 w-4" aria-hidden="true" />}
                    </button>
                  </div>
                  {formData.signupPassword && <PasswordStrengthIndicator password={formData.signupPassword} />}
                </div>

                <NeonButton type="submit" className="w-full mt-4" disabled={isLoading} aria-busy={isLoading}>
                  {isLoading ? (
                    <span className="animate-pulse">Creating Account...</span>
                  ) : (
                    <>Create Account <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" /></>
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
                  onClick={handleGithubLogin}
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors disabled:opacity-50"
                  aria-label="Sign up with GitHub"
                >
                  <Github className="w-5 h-5" aria-hidden="true" />
                  <span>GitHub</span>
                </button>

                <p className="text-center text-sm text-muted-foreground">
                  Already have an account?{' '}
                  <button 
                    type="button" 
                    onClick={switchToLogin}
                    className="text-primary hover:underline font-semibold"
                    aria-label="Go to sign in page"
                  >
                    Sign in
                  </button>
                </p>
              </form>
            </TabsContent>
          </Tabs>
        </GlassCard>
      </div>
    </div>
  );
};

export default AuthPage;
