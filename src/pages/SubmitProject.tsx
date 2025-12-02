import React, { useState } from 'react';
import Layout from '@/components/Layout';
import GlassCard from '@/components/GlassCard';
import NeonButton from '@/components/NeonButton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Github, Upload, CheckCircle, AlertCircle, FileText, Image as ImageIcon, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { fetchRecentCommits } from '@/api/github';

const SubmitProject = () => {
  const { toast } = useToast();
  const [repoUrl, setRepoUrl] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStep, setVerificationStep] = useState(0);
  const [isVerified, setIsVerified] = useState(false);
  const [projectDetails, setProjectDetails] = useState<any>(null);

  const handleVerify = async () => {
    if (!repoUrl.includes('github.com')) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid GitHub repository URL",
        variant: "destructive"
      });
      return;
    }

    setIsVerifying(true);
    setVerificationStep(0);

    // Simulate verification steps
    const steps = [
      "Connecting to GitHub API...",
      "Checking repository visibility...",
      "Analyzing language statistics...",
      "Verifying README.md existence...",
      "Fetching recent commit history..."
    ];

    for (let i = 0; i < steps.length; i++) {
      setVerificationStep(i);
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    // Mock success
    setIsVerifying(false);
    setIsVerified(true);
    setProjectDetails({
      name: repoUrl.split('/').pop(),
      languages: ["TypeScript", "React", "CSS"],
      commits: 142,
      lastUpdate: "2 days ago",
      readme: true
    });

    toast({
      title: "Verification Successful",
      description: "Your project has been verified and is ready to publish.",
    });
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Project Builder</h1>
          <p className="text-muted-foreground">Convert your code into a verified portfolio showcase.</p>
        </div>

        <GlassCard className="p-8">
          {/* Step 1: Repo Input */}
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="repo">GitHub Repository URL</Label>
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <Github className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="repo" 
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                    placeholder="https://github.com/username/project-name" 
                    className="pl-10 bg-black/20 border-white/10"
                    disabled={isVerified || isVerifying}
                  />
                </div>
                <NeonButton onClick={handleVerify} disabled={isVerified || isVerifying || !repoUrl}>
                  {isVerifying ? <Loader2 className="w-4 h-4 animate-spin" /> : "Verify Repo"}
                </NeonButton>
              </div>
            </div>

            {/* Verification Progress */}
            {isVerifying && (
              <div className="space-y-2 p-4 rounded-lg bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 text-primary animate-pulse">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm font-medium">
                    {[
                      "Connecting to GitHub API...",
                      "Checking repository visibility...",
                      "Analyzing language statistics...",
                      "Verifying README.md existence...",
                      "Fetching recent commit history..."
                    ][verificationStep]}
                  </span>
                </div>
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-500" 
                    style={{ width: `${((verificationStep + 1) / 5) * 100}%` }} 
                  />
                </div>
              </div>
            )}

            {/* Verified Status */}
            {isVerified && projectDetails && (
              <div className="animate-fade-in space-y-6">
                <div className="flex items-start gap-4 p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-green-400">Repository Verified</h3>
                    <p className="text-sm text-muted-foreground mb-3">We successfully connected to your repo and extracted the metadata.</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="bg-black/20 p-2 rounded">
                        <span className="block text-muted-foreground text-xs">Commits</span>
                        <span className="font-mono">{projectDetails.commits}</span>
                      </div>
                      <div className="bg-black/20 p-2 rounded">
                        <span className="block text-muted-foreground text-xs">Languages</span>
                        <span className="font-mono">{projectDetails.languages.join(', ')}</span>
                      </div>
                      <div className="bg-black/20 p-2 rounded">
                        <span className="block text-muted-foreground text-xs">README</span>
                        <span className="font-mono text-green-400">{projectDetails.readme ? 'Found' : 'Missing'}</span>
                      </div>
                      <div className="bg-black/20 p-2 rounded">
                        <span className="block text-muted-foreground text-xs">Last Update</span>
                        <span className="font-mono">{projectDetails.lastUpdate}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 2: Media Upload */}
                <div className="space-y-4 pt-6 border-t border-white/10">
                  <h3 className="text-xl font-bold">Add Visuals</h3>
                  <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer bg-white/5 hover:bg-white/10">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                      <Upload className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <p className="font-medium">Drop screenshots or demo video here</p>
                    <p className="text-xs text-muted-foreground mt-1">Supports JPG, PNG, MP4 (Max 50MB)</p>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="aspect-video rounded-lg bg-black/40 border border-white/10 flex items-center justify-center">
                        <ImageIcon className="w-6 h-6 text-white/10" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Step 3: Description */}
                <div className="space-y-2">
                  <Label>Project Story</Label>
                  <textarea 
                    className="w-full h-32 bg-black/20 border border-white/10 rounded-lg p-3 text-sm focus:border-primary outline-none resize-none"
                    placeholder="Describe the problem you solved, tech stack decisions, and challenges faced..."
                  />
                </div>

                <div className="flex justify-end gap-4 pt-4">
                  <NeonButton variant="ghost" onClick={() => {
                    setIsVerified(false);
                    setRepoUrl('');
                  }}>Cancel</NeonButton>
                  <NeonButton>Publish to Portfolio</NeonButton>
                </div>
              </div>
            )}
          </div>
        </GlassCard>
      </div>
    </Layout>
  );
};

export default SubmitProject;
