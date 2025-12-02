import React, { useState } from 'react';
import Layout from '@/components/Layout';
import GlassCard from '@/components/GlassCard';
import NeonButton from '@/components/NeonButton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  fetchLeetCodeProgress,
  fetchGFGProgress,
  fetchCodeforcesProgress,
  ExternalProgress
} from '@/api/practice';
import { Loader2, CheckCircle, AlertCircle, Zap, TrendingUp } from 'lucide-react';

const Progress = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [progress, setProgress] = useState<{ [key: string]: ExternalProgress | null }>({
    leetcode: null,
    geeksforgeeks: null,
    codeforces: null
  });

  const [usernames, setUsernames] = useState({
    leetcode: '',
    geeksforgeeks: '',
    codeforces: ''
  });

  const handleFetch = async (platform: string, username: string) => {
    if (!username) return;
    
    setIsFetching(true);
    let result = null;

    try {
      switch (platform) {
        case 'leetcode':
          result = await fetchLeetCodeProgress(username);
          break;
        case 'geeksforgeeks':
          result = await fetchGFGProgress(username);
          break;
        case 'codeforces':
          result = await fetchCodeforcesProgress(username);
          break;
      }
    } catch (error) {
      console.error(`Error fetching ${platform}:`, error);
    }

    setProgress(prev => ({ ...prev, [platform]: result }));
    setIsFetching(false);
  };

  const totalProblems = Object.values(progress).reduce((sum, p) => sum + (p?.totalSolved || 0), 0);

  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-8 pb-20">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">Unified Progress Dashboard</h1>
          <p className="text-muted-foreground">Connect your external platform accounts to see all progress in one place.</p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassCard className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Problems Solved</p>
              <p className="text-3xl font-bold">{totalProblems}</p>
            </div>
          </GlassCard>

          <GlassCard className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Platforms Connected</p>
              <p className="text-3xl font-bold">{Object.values(progress).filter(p => p).length}</p>
            </div>
          </GlassCard>

          <GlassCard className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-yellow-500/10 flex items-center justify-center text-yellow-400">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Match Score</p>
              <p className="text-3xl font-bold">{Math.min(totalProblems, 100)}%</p>
            </div>
          </GlassCard>
        </div>

        {/* Platform Connectors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* LeetCode */}
          <GlassCard className="space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-yellow-500/20 flex items-center justify-center text-yellow-500 font-bold">LC</div>
              LeetCode
            </h3>

            <div className="space-y-2">
              <Label>Username</Label>
              <div className="flex gap-2">
                <Input
                  value={usernames.leetcode}
                  onChange={(e) => setUsernames(prev => ({ ...prev, leetcode: e.target.value }))}
                  placeholder="Your LeetCode username"
                  className="bg-white/5 border-white/10"
                />
                <NeonButton
                  onClick={() => handleFetch('leetcode', usernames.leetcode)}
                  disabled={isFetching || !usernames.leetcode}
                  size="sm"
                >
                  {isFetching ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Fetch'}
                </NeonButton>
              </div>
            </div>

            {progress.leetcode && (
              <div className="p-4 rounded-lg bg-yellow-500/5 border border-yellow-500/20 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Solved:</span>
                  <span className="font-bold">{progress.leetcode.totalSolved}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Easy:</span>
                  <span className="text-green-400">{progress.leetcode.easySolved}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Medium:</span>
                  <span className="text-yellow-400">{progress.leetcode.mediumSolved}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Hard:</span>
                  <span className="text-red-400">{progress.leetcode.hardSolved}</span>
                </div>
                {progress.leetcode.streak && (
                  <div className="flex justify-between pt-2 border-t border-yellow-500/20">
                    <span className="text-muted-foreground">Current Streak:</span>
                    <span className="font-bold text-primary">{progress.leetcode.streak} days 🔥</span>
                  </div>
                )}
              </div>
            )}
          </GlassCard>

          {/* GeeksForGeeks */}
          <GlassCard className="space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-green-500/20 flex items-center justify-center text-green-500 text-xs font-bold">GFG</div>
              GeeksForGeeks
            </h3>

            <div className="space-y-2">
              <Label>Username</Label>
              <div className="flex gap-2">
                <Input
                  value={usernames.geeksforgeeks}
                  onChange={(e) => setUsernames(prev => ({ ...prev, geeksforgeeks: e.target.value }))}
                  placeholder="Your GFG username"
                  className="bg-white/5 border-white/10"
                />
                <NeonButton
                  onClick={() => handleFetch('geeksforgeeks', usernames.geeksforgeeks)}
                  disabled={isFetching || !usernames.geeksforgeeks}
                  size="sm"
                >
                  {isFetching ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Fetch'}
                </NeonButton>
              </div>
            </div>

            {progress.geeksforgeeks && (
              <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/20 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Problems Solved:</span>
                  <span className="font-bold text-green-400">{progress.geeksforgeeks.totalSolved}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Easy:</span>
                  <span className="text-green-400">{progress.geeksforgeeks.easySolved}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Medium:</span>
                  <span className="text-yellow-400">{progress.geeksforgeeks.mediumSolved}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Hard:</span>
                  <span className="text-red-400">{progress.geeksforgeeks.hardSolved}</span>
                </div>
              </div>
            )}
          </GlassCard>

          {/* Codeforces */}
          <GlassCard className="space-y-4">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-blue-500/20 flex items-center justify-center text-blue-500 text-xs font-bold">CF</div>
              Codeforces
            </h3>

            <div className="space-y-2">
              <Label>Handle</Label>
              <div className="flex gap-2">
                <Input
                  value={usernames.codeforces}
                  onChange={(e) => setUsernames(prev => ({ ...prev, codeforces: e.target.value }))}
                  placeholder="Your Codeforces handle"
                  className="bg-white/5 border-white/10"
                />
                <NeonButton
                  onClick={() => handleFetch('codeforces', usernames.codeforces)}
                  disabled={isFetching || !usernames.codeforces}
                  size="sm"
                >
                  {isFetching ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Fetch'}
                </NeonButton>
              </div>
            </div>

            {progress.codeforces && (
              <div className="p-4 rounded-lg bg-blue-500/5 border border-blue-500/20 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Problems Solved:</span>
                  <span className="font-bold text-blue-400">{progress.codeforces.totalSolved}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Current Rating:</span>
                  <span className="font-bold text-primary">{progress.codeforces.rating}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Max Rating:</span>
                  <span className="font-bold text-yellow-400">{progress.codeforces.maxRating}</span>
                </div>
              </div>
            )}
          </GlassCard>
        </div>

        {/* Combined View */}
        {Object.values(progress).some(p => p) && (
          <GlassCard className="space-y-4">
            <h3 className="text-2xl font-bold">Combined Progress Summary</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-bold text-lg">Achievement Breakdown</h4>
                {progress.leetcode && (
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                    <p className="text-sm text-muted-foreground">LeetCode: {progress.leetcode.totalSolved} problems</p>
                  </div>
                )}
                {progress.geeksforgeeks && (
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                    <p className="text-sm text-muted-foreground">GeeksForGeeks: {progress.geeksforgeeks.totalSolved} problems</p>
                  </div>
                )}
                {progress.codeforces && (
                  <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                    <p className="text-sm text-muted-foreground">Codeforces: {progress.codeforces.totalSolved} problems ({progress.codeforces.rating} rating)</p>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-lg">Career Insights</h4>
                <div className="p-4 rounded-lg bg-gradient-to-br from-primary/10 to-transparent border border-primary/20">
                  <p className="text-sm">
                    With <span className="font-bold text-primary">{totalProblems} problems solved</span>, you're ready for mid-level coding interviews at top companies.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-gradient-to-br from-secondary/10 to-transparent border border-secondary/20">
                  <p className="text-sm">
                    Focus on <span className="font-bold text-secondary">system design</span> and <span className="font-bold text-secondary">behavioral interviews</span> next.
                  </p>
                </div>
              </div>
            </div>
          </GlassCard>
        )}
      </div>
    </Layout>
  );
};

export default Progress;
