import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import GlassCard from '@/components/GlassCard';
import NeonButton from '@/components/NeonButton';
import { DashboardSkeleton } from '@/components/DashboardSkeleton';
import { fetchGitHubRepos, GitHubRepo } from '@/api/github';
import { fetchLeetCodeStats, LeetCodeStats } from '@/api/leetcode';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  RadialBarChart, RadialBar, Legend 
} from 'recharts';
import { Activity, GitCommit, Code, Trophy, ArrowUpRight, Zap } from 'lucide-react';
import { Link } from 'wouter';
import { Progress } from '@/components/ui/progress';

// Mock data for charts since we don't have full history
const activityData = [
  { name: 'Mon', commits: 4, problems: 2 },
  { name: 'Tue', commits: 7, problems: 1 },
  { name: 'Wed', commits: 2, problems: 5 },
  { name: 'Thu', commits: 9, problems: 3 },
  { name: 'Fri', commits: 5, problems: 4 },
  { name: 'Sat', commits: 12, problems: 8 },
  { name: 'Sun', commits: 8, problems: 6 },
];

const skillData = [
  { name: 'Frontend', uv: 90, fill: '#00f3ff' },
  { name: 'Backend', uv: 65, fill: '#bc13fe' },
  { name: 'DSA', uv: 75, fill: '#ff0055' },
];

const Dashboard = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  // @ts-ignore
  const [leetStats, setLeetStats] = useState<LeetCodeStats | null>(null);

  useEffect(() => {
    // Fetch mock data
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [reposData, statsData] = await Promise.all([
          fetchGitHubRepos('facebook'),
          // @ts-ignore
          fetchLeetCodeStats('dummy')
        ]);
        setRepos(reposData);
        setLeetStats(statsData);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  if (isLoading) {
    return (
      <Layout>
        <DashboardSkeleton />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="text-sm text-muted-foreground">
            Last synced: <span className="text-primary">Just now</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <GlassCard hoverEffect className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-primary/10 text-primary">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Weekly Activity</p>
              <p className="text-2xl font-bold">Top 5%</p>
            </div>
          </GlassCard>
          
          <GlassCard hoverEffect className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-secondary/10 text-secondary">
              <GitCommit className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Commits</p>
              <p className="text-2xl font-bold">1,248</p>
            </div>
          </GlassCard>

          <GlassCard hoverEffect className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-pink-500/10 text-pink-500">
              <Code className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Problems Solved</p>
              <p className="text-2xl font-bold">342</p>
            </div>
          </GlassCard>

          <GlassCard hoverEffect className="flex items-center gap-4">
            <div className="p-3 rounded-lg bg-yellow-500/10 text-yellow-500">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Current Streak</p>
              <p className="text-2xl font-bold">12 Days</p>
            </div>
          </GlassCard>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Activity Chart */}
          <GlassCard className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold">Activity Overview</h3>
              <div className="flex gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded" style={{ backgroundColor: 'var(--color-primary)' }} />
                  <span className="text-muted-foreground">Commits</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded" style={{ backgroundColor: 'var(--color-secondary)' }} />
                  <span className="text-muted-foreground">Problems</span>
                </div>
              </div>
            </div>
            <div className="h-80 w-full -mx-2 px-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart 
                  data={activityData}
                  margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    stroke="#888" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                  />
                  <YAxis 
                    stroke="#888" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(0, 0, 0, 0.8)',
                      border: '1px solid rgba(0, 243, 255, 0.3)',
                      borderRadius: '8px',
                      padding: '8px 12px'
                    }} 
                    itemStyle={{ color: '#fff' }}
                    cursor={{ fill: 'rgba(0, 243, 255, 0.1)' }}
                  />
                  <Bar 
                    dataKey="commits" 
                    fill="var(--color-primary)" 
                    radius={[4, 4, 0, 0]}
                    name="Commits"
                  />
                  <Bar 
                    dataKey="problems" 
                    fill="var(--color-secondary)" 
                    radius={[4, 4, 0, 0]}
                    name="Problems"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          {/* Skill Distribution */}
          <GlassCard className="flex flex-col">
            <div className="flex items-center gap-2 mb-6">
              <Zap className="w-5 h-5 text-secondary" />
              <h3 className="text-lg font-bold">Skill Mastery</h3>
            </div>
            
            <div className="space-y-6">
              {skillData.map((skill) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">{skill.name}</span>
                    <span className="text-sm font-bold" style={{ color: skill.fill }}>
                      {skill.uv}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${skill.uv}%`,
                        backgroundColor: skill.fill,
                        boxShadow: `0 0 10px ${skill.fill}40`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <Link href="/practice">
              <NeonButton variant="outline" className="w-full mt-8">Continue Practice</NeonButton>
            </Link>
          </GlassCard>
        </div>

        {/* Recent Repos */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold">Recent Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {repos.slice(0, 3).map((repo) => (
              <GlassCard key={repo.id} hoverEffect className="group cursor-pointer">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 rounded bg-white/5 group-hover:bg-primary/10 transition-colors">
                    <GitCommit className="w-5 h-5 text-muted-foreground group-hover:text-primary" />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-white transition-colors" />
                </div>
                <h4 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">{repo.name}</h4>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{repo.description || "No description provided."}</p>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-yellow-400" />
                    {repo.language || "JavaScript"}
                  </span>
                  <span>Updated recently</span>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
