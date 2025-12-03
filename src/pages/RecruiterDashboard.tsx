import React, { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import GlassCard from '@/components/GlassCard';
import NeonButton from '@/components/NeonButton';
import { Input } from '@/components/ui/input';
import { Search, Filter, Github, ExternalLink, Mail, Plus, X, Upload, Trash2, Edit2, LogIn } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface JobPosting {
  id: string;
  title: string;
  location: string;
  skills: string[];
  description: string;
  createdAt: string;
  applicants: number;
}

interface Candidate {
  id: number;
  name: string;
  role: string;
  match: number;
  skills: string[];
  github: string;
  bio: string;
  projects: number;
  commits: number;
}

const RecruiterDashboard = () => {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [isPostJobOpen, setIsPostJobOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [isGuestMode, setIsGuestMode] = useState(!user);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [editingJob, setEditingJob] = useState<JobPosting | null>(null);
  const [jobFormData, setJobFormData] = useState({
    title: '',
    location: '',
    skills: '',
    description: ''
  });
  
  const [candidates] = useState<Candidate[]>([
    { id: 1, name: "Alex Coder", role: "Frontend Dev", match: 95, skills: ["React", "TS", "Tailwind"], github: "alexcoder", bio: "Passionate frontend engineer with 3 years of experience building responsive web apps.", projects: 12, commits: 3400 },
    { id: 2, name: "Sarah Backend", role: "System Architect", match: 88, skills: ["Go", "K8s", "Postgres"], github: "sarahb", bio: "Backend specialist focused on scalable distributed systems.", projects: 8, commits: 5200 },
    { id: 3, name: "Mike Fullstack", role: "Full Stack", match: 82, skills: ["Node", "React", "AWS"], github: "mikefs", bio: "Full stack jack-of-all-trades with a love for cloud infra.", projects: 15, commits: 2100 },
  ]);

  // Load jobs from sessionStorage on mount
  useEffect(() => {
    const savedJobs = sessionStorage.getItem('jobPostings');
    if (savedJobs) {
      setJobs(JSON.parse(savedJobs));
    }
  }, []);

  const handleJobInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setJobFormData(prev => ({ ...prev, [id]: value }));
  };

  const handlePostJob = (e: React.FormEvent) => {
    e.preventDefault();

    if (isGuestMode) {
      toast.error('Please log in as a recruiter to post jobs');
      setShowLoginPrompt(true);
      return;
    }

    if (!jobFormData.title || !jobFormData.location || !jobFormData.skills || !jobFormData.description) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (editingJob) {
      // Update existing job
      const updatedJobs = jobs.map(job => 
        job.id === editingJob.id 
          ? {
              ...job,
              title: jobFormData.title,
              location: jobFormData.location,
              skills: jobFormData.skills.split(',').map(s => s.trim()),
              description: jobFormData.description
            }
          : job
      );
      setJobs(updatedJobs);
      sessionStorage.setItem('jobPostings', JSON.stringify(updatedJobs));
      toast.success('Job updated successfully! ✏️');
      setEditingJob(null);
    } else {
      // Create new job
      const newJob: JobPosting = {
        id: Date.now().toString(),
        title: jobFormData.title,
        location: jobFormData.location,
        skills: jobFormData.skills.split(',').map(s => s.trim()),
        description: jobFormData.description,
        createdAt: new Date().toLocaleDateString(),
        applicants: Math.floor(Math.random() * 50) + 5
      };

      const updatedJobs = [newJob, ...jobs];
      setJobs(updatedJobs);
      sessionStorage.setItem('jobPostings', JSON.stringify(updatedJobs));
      toast.success('Job posted successfully! 🎉 AI matching candidates now...');
    }

    setJobFormData({
      title: '',
      location: '',
      skills: '',
      description: ''
    });
    setIsPostJobOpen(false);
  };

  const handleDeleteJob = (jobId: string) => {
    const updatedJobs = jobs.filter(job => job.id !== jobId);
    setJobs(updatedJobs);
    sessionStorage.setItem('jobPostings', JSON.stringify(updatedJobs));
    toast.success('Job deleted successfully');
  };

  const handleEditJob = (job: JobPosting) => {
    setEditingJob(job);
    setJobFormData({
      title: job.title,
      location: job.location,
      skills: job.skills.join(', '),
      description: job.description
    });
    setIsPostJobOpen(true);
  };

  const handleCloseDialog = () => {
    setIsPostJobOpen(false);
    setEditingJob(null);
    setJobFormData({
      title: '',
      location: '',
      skills: '',
      description: ''
    });
  };

  return (
    <Layout>
      {/* Guest Mode Warning */}
      {isGuestMode && (
        <div className="mb-6 p-4 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-between">
          <div>
            <p className="font-semibold text-primary mb-1">Browsing as Guest</p>
            <p className="text-sm text-muted-foreground">Log in as a recruiter to post jobs and manage your candidates.</p>
          </div>
          <button
            onClick={() => setLocation('/auth')}
            className="ml-4 flex items-center gap-2 px-4 py-2 bg-primary/20 hover:bg-primary/30 border border-primary/40 rounded-lg text-primary transition-colors whitespace-nowrap"
          >
            <LogIn className="w-4 h-4" />
            Login as Recruiter
          </button>
        </div>
      )}

      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
             <h1 className="text-3xl font-bold">Recruiter Dashboard</h1>
             <p className="text-muted-foreground">Find the top 1% of engineering talent.</p>
          </div>
          
          <Dialog open={isPostJobOpen} onOpenChange={(open) => {
            if (!open) handleCloseDialog();
            setIsPostJobOpen(open);
          }}>
            <DialogTrigger asChild>
              <NeonButton 
                disabled={isGuestMode}
                onClick={() => {
                  if (isGuestMode) {
                    toast.error('Please log in to post jobs');
                    setShowLoginPrompt(true);
                  }
                }}
              >
                <Plus className="w-4 h-4 mr-2" /> Post New Job
              </NeonButton>
            </DialogTrigger>
            <DialogContent className="bg-black/90 border-white/10 backdrop-blur-xl max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">
                  {editingJob ? 'Edit Job Posting' : 'Create Job Posting'}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handlePostJob} className="space-y-6 py-4" noValidate>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Job Title *</Label>
                    <Input 
                      id="title"
                      placeholder="e.g. Senior React Engineer"
                      value={jobFormData.title}
                      onChange={handleJobInputChange}
                      className="bg-white/5 border-white/10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location *</Label>
                    <Input 
                      id="location"
                      placeholder="Remote / San Francisco"
                      value={jobFormData.location}
                      onChange={handleJobInputChange}
                      className="bg-white/5 border-white/10"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="skills">Required Skills (Comma separated) *</Label>
                  <Input 
                    id="skills"
                    placeholder="React, TypeScript, Node.js..."
                    value={jobFormData.skills}
                    onChange={handleJobInputChange}
                    className="bg-white/5 border-white/10"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Job Description *</Label>
                  <Textarea 
                    id="description"
                    placeholder="Describe the role, responsibilities, and perks..."
                    value={jobFormData.description}
                    onChange={handleJobInputChange}
                    className="h-32 bg-white/5 border-white/10 resize-none"
                  />
                </div>

                <div className="flex items-center gap-4 p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Filter className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-sm">AI Auto-Match Enabled</p>
                    <p className="text-xs text-muted-foreground">We'll automatically notify candidates with &gt;80% skill match.</p>
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <NeonButton type="button" variant="ghost" onClick={handleCloseDialog}>Cancel</NeonButton>
                  <NeonButton type="submit">{editingJob ? 'Update Job' : 'Publish Job'}</NeonButton>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search & Filter */}
        <GlassCard className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search candidates by skill, role, or name..." className="pl-10 bg-black/20 border-white/10" />
          </div>
          <NeonButton variant="outline"><Filter className="w-4 h-4 mr-2" /> Filters</NeonButton>
        </GlassCard>

        {/* Your Posted Jobs Section */}
        {!isGuestMode ? (
          jobs.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold">Your Job Postings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {jobs.map(job => (
                  <GlassCard key={job.id} className="flex flex-col">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-bold text-lg">{job.title}</h3>
                        <p className="text-sm text-muted-foreground">{job.location}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditJob(job)}
                          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                          aria-label="Edit job"
                        >
                          <Edit2 className="w-4 h-4 text-muted-foreground hover:text-primary" />
                        </button>
                        <button
                          onClick={() => handleDeleteJob(job.id)}
                          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                          aria-label="Delete job"
                        >
                          <Trash2 className="w-4 h-4 text-muted-foreground hover:text-red-500" />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.skills.map(skill => (
                        <Badge key={skill} variant="secondary" className="bg-white/10 text-xs">{skill}</Badge>
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{job.description}</p>
                    <div className="flex justify-between items-center text-sm pt-4 border-t border-white/10">
                      <span className="text-muted-foreground">{job.applicants} applicants</span>
                      <span className="text-xs text-muted-foreground">{job.createdAt}</span>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>
          )
        ) : (
          <GlassCard className="p-8 text-center">
            <p className="text-muted-foreground mb-4">Sign in as a recruiter to manage your job postings</p>
            <NeonButton onClick={() => setLocation('/auth')}>
              <LogIn className="w-4 h-4 mr-2" /> Login Now
            </NeonButton>
          </GlassCard>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Candidate List */}
          <div className="lg:col-span-2 space-y-6">
             <h2 className="text-xl font-bold">Top Matches</h2>
             {candidates.map(candidate => (
               <GlassCard 
                 key={candidate.id} 
                 hoverEffect 
                 className="flex items-center gap-4 cursor-pointer group"
                 onClick={() => setSelectedCandidate(candidate)}
               >
                 <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-black font-bold text-lg group-hover:scale-110 transition-transform">
                   {candidate.name.charAt(0)}
                 </div>
                 <div className="flex-1">
                   <div className="flex justify-between">
                     <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{candidate.name}</h3>
                     <span className="text-green-400 font-mono">{candidate.match}% Match</span>
                   </div>
                   <p className="text-sm text-muted-foreground mb-2">{candidate.role}</p>
                   <div className="flex gap-2">
                     {candidate.skills.map(skill => (
                       <span key={skill} className="text-xs px-2 py-0.5 rounded bg-white/10 border border-white/5">{skill}</span>
                     ))}
                   </div>
                 </div>
                 <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                   <NeonButton size="sm" variant="ghost"><Github className="w-4 h-4" /></NeonButton>
                 </div>
               </GlassCard>
             ))}
          </div>

          {/* Analytics Side */}
          <div className="space-y-6">
             <GlassCard>
               <h3 className="font-bold mb-4">Pipeline Status</h3>
               <div className="space-y-4">
                 <div className="flex justify-between items-center">
                   <span className="text-sm text-muted-foreground">Total Job Postings</span>
                   <span className="font-bold">{jobs.length}</span>
                 </div>
                 <div className="flex justify-between items-center">
                   <span className="text-sm text-muted-foreground">New Applications</span>
                   <span className="font-bold">124</span>
                 </div>
                 <div className="flex justify-between items-center">
                   <span className="text-sm text-muted-foreground">Screening</span>
                   <span className="font-bold text-primary">45</span>
                 </div>
                 <div className="flex justify-between items-center">
                   <span className="text-sm text-muted-foreground">Interviewing</span>
                   <span className="font-bold text-secondary">12</span>
                 </div>
                 <div className="flex justify-between items-center">
                   <span className="text-sm text-muted-foreground">Offers Sent</span>
                   <span className="font-bold text-green-400">3</span>
                 </div>
               </div>
             </GlassCard>

             <GlassCard className="bg-gradient-to-br from-primary/10 to-transparent">
               <h3 className="font-bold mb-2">Talent Insights</h3>
               <p className="text-sm text-muted-foreground mb-4">
                 React developers are trending up 15% this week in your pipeline.
               </p>
               <NeonButton variant="outline" size="sm" className="w-full">View Reports</NeonButton>
             </GlassCard>
          </div>
        </div>

        {/* Candidate Details Modal */}
        <Dialog open={!!selectedCandidate} onOpenChange={(open) => !open && setSelectedCandidate(null)}>
          <DialogContent className="bg-black/90 border-white/10 backdrop-blur-xl max-w-3xl">
            {selectedCandidate && (
              <>
                <DialogHeader className="flex flex-row items-start gap-6 border-b border-white/10 pb-6">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-black font-bold text-3xl">
                     {selectedCandidate.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <DialogTitle className="text-3xl font-bold mb-1">{selectedCandidate.name}</DialogTitle>
                    <p className="text-lg text-primary mb-2">{selectedCandidate.role}</p>
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><Github className="w-4 h-4" /> @{selectedCandidate.github}</span>
                      <span className="flex items-center gap-1"><Filter className="w-4 h-4" /> {selectedCandidate.projects} Projects</span>
                    </div>
                  </div>
                  <div className="text-right">
                     <div className="text-4xl font-bold text-green-400">{selectedCandidate.match}%</div>
                     <div className="text-sm text-muted-foreground">Match Score</div>
                  </div>
                </DialogHeader>

                <div className="grid grid-cols-3 gap-6 py-4">
                  <div className="col-span-2 space-y-6">
                    <div>
                      <h4 className="font-bold mb-2">About</h4>
                      <p className="text-muted-foreground leading-relaxed">{selectedCandidate.bio}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-bold mb-2">Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedCandidate.skills.map((skill: string) => (
                          <Badge key={skill} variant="secondary" className="bg-white/10 hover:bg-white/20">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                      <h4 className="font-bold mb-4">GitHub Stats</h4>
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Total Commits</span>
                          <span className="font-mono">{selectedCandidate.commits}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Repositories</span>
                          <span className="font-mono">24</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Active Since</span>
                          <span className="font-mono">2021</span>
                        </div>
                      </div>
                    </div>
                    <NeonButton className="w-full"><Mail className="w-4 h-4 mr-2" /> Contact Candidate</NeonButton>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default RecruiterDashboard;
