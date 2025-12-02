import React from 'react';
import Layout from '@/components/Layout';
import GlassCard from '@/components/GlassCard';
import NeonButton from '@/components/NeonButton';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Moon, Sun, Github, Trash2, Download } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

const Settings = () => {
  const { isDark, toggleDarkMode } = useTheme();

  return (
    <Layout>
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold">Settings</h1>

        <GlassCard>
          <h3 className="text-xl font-bold mb-6">Appearance</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Moon className="w-5 h-5 text-primary" />
              <div className="space-y-1">
                <Label>Dark Mode</Label>
                <p className="text-xs text-muted-foreground">Experience the neon glow.</p>
              </div>
            </div>
            <Switch checked={isDark} onCheckedChange={toggleDarkMode} />
          </div>
        </GlassCard>

        <GlassCard>
          <h3 className="text-xl font-bold mb-6">Integrations</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="flex items-center gap-4">
                <Github className="w-5 h-5" />
                <div>
                  <p className="font-medium">GitHub</p>
                  <p className="text-xs text-green-400">Connected as alexcoder</p>
                </div>
              </div>
              <NeonButton variant="ghost" size="sm" className="text-destructive hover:text-destructive">Disconnect</NeonButton>
            </div>
            
            <div className="flex items-center justify-between p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="flex items-center gap-4">
                <div className="w-5 h-5 rounded bg-yellow-500/20 flex items-center justify-center text-yellow-500 font-bold text-xs">LC</div>
                <div>
                  <p className="font-medium">LeetCode</p>
                  <p className="text-xs text-muted-foreground">Not connected</p>
                </div>
              </div>
              <NeonButton variant="secondary" size="sm">Connect</NeonButton>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="border-destructive/20">
          <h3 className="text-xl font-bold mb-6 text-destructive">Danger Zone</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-medium">Export Data</p>
                <p className="text-xs text-muted-foreground">Download all your progress and code.</p>
              </div>
              <NeonButton variant="outline" size="sm"><Download className="w-4 h-4 mr-2" /> Export</NeonButton>
            </div>
            <div className="h-px bg-white/10" />
            <div className="flex items-center justify-between">
               <div className="space-y-1">
                <p className="font-medium text-destructive">Delete Account</p>
                <p className="text-xs text-muted-foreground">Permanently remove your data.</p>
              </div>
              <NeonButton variant="ghost" size="sm" className="bg-destructive/10 text-destructive hover:bg-destructive hover:text-white">
                <Trash2 className="w-4 h-4 mr-2" /> Delete
              </NeonButton>
            </div>
          </div>
        </GlassCard>
      </div>
    </Layout>
  );
};

export default Settings;
