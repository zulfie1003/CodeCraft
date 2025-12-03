import React, { Suspense } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/context/AuthContext';
import GlassCard from '@/components/GlassCard';

interface RoleProtectedRouteProps {
  component: React.ComponentType<any>;
  requiredRoles?: ('student' | 'recruiter' | 'organizer')[];
}

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

export function RoleProtectedRoute({ 
  component: Component, 
  requiredRoles = [] 
}: RoleProtectedRouteProps) {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  // Not authenticated
  if (!user) {
    React.useEffect(() => {
      setLocation('/auth');
    }, [setLocation]);
    return null;
  }

  // Authenticated but role not allowed
  if (requiredRoles.length > 0 && !requiredRoles.includes(user.role)) {
    React.useEffect(() => {
      setLocation('/forbidden');
    }, [setLocation]);
    return null;
  }

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Component />
    </Suspense>
  );
}

export default RoleProtectedRoute;
