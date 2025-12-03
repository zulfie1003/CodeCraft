import React from 'react';
import { Link } from 'wouter';
import NeonButton from '@/components/NeonButton';
import GlassCard from '@/components/GlassCard';
import { LockIcon, Home, ArrowLeft } from 'lucide-react';

const ForbiddenPage = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <GlassCard className="max-w-md border-red-500/30 bg-red-500/5">
        <div className="space-y-6">
          <div className="flex items-center justify-center">
            <LockIcon className="w-16 h-16 text-red-400" />
          </div>

          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-2">403</h1>
            <h2 className="text-2xl font-bold text-foreground mb-4">Access Denied</h2>
            <p className="text-muted-foreground mb-2">
              You don't have permission to access this resource.
            </p>
            <p className="text-sm text-muted-foreground">
              This feature is only available for specific user roles. Please log in with the correct account.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
            <p className="text-sm text-red-300">
              <span className="font-semibold">Why am I seeing this?</span>
              <br />
              You're trying to access a feature that requires a different role or higher permissions.
            </p>
          </div>

          <div className="space-y-3">
            <Link href="/dashboard">
              <NeonButton className="w-full">
                <Home className="w-4 h-4 mr-2" />
                Go to Dashboard
              </NeonButton>
            </Link>
            <button
              onClick={() => window.history.back()}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
};

export default ForbiddenPage;
