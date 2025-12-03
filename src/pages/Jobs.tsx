import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import GlassCard from '@/components/GlassCard';
import NeonButton from '@/components/NeonButton';
import { JobsSkeleton } from '@/components/JobsSkeleton';
import { fetchJobs, getTrendingSkills, Job, MOCK_USER_SKILLS } from '@/api/jobs';
import { applyForJob, getApplicationStatus, JobApplication, getApplications } from '@/api/applications';
import { MapPin, DollarSign, Clock, Building2, Zap, CheckCircle, XCircle, TrendingUp, AlertTriangle, Loader2, Search, Filter, History } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const Jobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [trending, setTrending] = useState<any[]>([]);
  const [applicationStatus, setApplicationStatus] = useState<{ [key: string]: JobApplication | null }>({});
  const [showApplicationDialog, setShowApplicationDialog] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [resumeUrl, setResumeUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'applied' | 'not-applied'>('all');
  const [sortBy, setSortBy] = useState<'match' | 'recent' | 'salary'>('match');
  const [showApplicationHistory, setShowApplicationHistory] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const jobsData = await fetchJobs();
        setJobs(jobsData);
        setFilteredJobs(jobsData);
        setTrending(getTrendingSkills());
        
        // Load application status for each job
        const statuses: { [key: string]: JobApplication | null } = {};
        jobsData.forEach(job => {
          statuses[job.id] = getApplicationStatus(job.id) || null;
        });
        setApplicationStatus(statuses);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  // Apply filters and search
  useEffect(() => {
    let result = jobs;

    // Filter by application status
    if (selectedFilter === 'applied') {
      result = result.filter(job => applicationStatus[job.id]);
    } else if (selectedFilter === 'not-applied') {
      result = result.filter(job => !applicationStatus[job.id]);
    }

    // Search by title, company, or location
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(job =>
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.location.toLowerCase().includes(query)
      );
    }

    // Sort
    if (sortBy === 'recent') {
      result = result.sort((a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime());
    } else if (sortBy === 'salary') {
      result = result.sort((a, b) => {
        const aNum = parseInt(a.salary?.match(/\d+/)?.[0] || '0');
        const bNum = parseInt(b.salary?.match(/\d+/)?.[0] || '0');
        return bNum - aNum;
      });
    }

    setFilteredJobs(result);
  }, [searchQuery, selectedFilter, sortBy, jobs, applicationStatus]);

  const handleApplyClick = (job: Job) => {
    setSelectedJob(job);
    setShowApplicationDialog(true);
  };

  const handleSubmitApplication = async () => {
    if (!selectedJob) return;
    
    setIsSubmitting(true);
    try {
      const application = applyForJob(
        selectedJob.id,
        selectedJob.title,
        selectedJob.company,
        resumeUrl,
        coverLetter
      );
      
      setApplicationStatus(prev => ({
        ...prev,
        [selectedJob.id]: application
      }));
      
      toast.success(`Applied for ${selectedJob.title} at ${selectedJob.company}!`);
      setShowApplicationDialog(false);
      setCoverLetter('');
      setResumeUrl('');
      setSelectedJob(null);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to apply for job');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto">
          <JobsSkeleton />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              Smart Job Board <span className="px-2 py-1 rounded bg-primary/20 text-primary text-xs border border-primary/50">AI Matched</span>
            </h1>
            <p className="text-muted-foreground">Real-time skill matching based on your practice history.</p>
          </div>
          <div className="flex items-center gap-4">
             <div className="hidden md:flex flex-col items-end text-sm">
               <span className="text-muted-foreground">Your Skills Detected:</span>
               <span className="text-primary font-mono">{MOCK_USER_SKILLS.length} Skills</span>
             </div>
             <NeonButton>Update Profile</NeonButton>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Job Feed */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search & Filters */}
            <div className="space-y-4">
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by title, company, or location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-white/5 border-white/10"
                  />
                </div>
                <NeonButton 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowApplicationHistory(!showApplicationHistory)}
                  className="flex items-center gap-2"
                >
                  <History className="w-4 h-4" /> Applications ({Object.values(applicationStatus).filter(Boolean).length})
                </NeonButton>
              </div>

              {/* Filter Tabs */}
              <div className="flex gap-2 flex-wrap">
                {(['all', 'applied', 'not-applied'] as const).map(filter => (
                  <button
                    key={filter}
                    onClick={() => setSelectedFilter(filter)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedFilter === filter
                        ? 'bg-primary text-black'
                        : 'bg-white/5 text-foreground hover:bg-white/10'
                    }`}
                  >
                    {filter === 'all' && '📋 All Jobs'}
                    {filter === 'applied' && '✓ Applied'}
                    {filter === 'not-applied' && '○ Not Applied'}
                  </button>
                ))}

                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="ml-auto px-3 py-2 rounded-lg text-sm bg-white/5 border border-white/10 text-foreground cursor-pointer hover:border-white/20 transition-all"
                >
                  <option value="match">Best Match</option>
                  <option value="recent">Most Recent</option>
                  <option value="salary">Highest Salary</option>
                </select>
              </div>
            </div>

            {/* Jobs List */}
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
              <GlassCard key={job.id} hoverEffect className="group relative overflow-hidden">
                {/* Match Score Badge */}
                <div className="absolute top-0 right-0 p-4 z-10 flex flex-col items-end">
                  <div className={`
                    flex items-center gap-2 px-3 py-1 rounded-full border backdrop-blur-md font-bold shadow-lg mb-2
                    ${(job.matchScore || 0) >= 70 ? 'bg-green-500/10 border-green-500 text-green-400' : 
                      (job.matchScore || 0) >= 40 ? 'bg-yellow-500/10 border-yellow-500 text-yellow-400' : 'bg-red-500/10 border-red-500 text-red-400'}
                  `}>
                    <Zap className="w-4 h-4 fill-current" />
                    {job.matchScore}% Match
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                  {/* Logo & Basic Info */}
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-16 h-16 rounded-xl bg-white/10 overflow-hidden flex-shrink-0 border border-white/10">
                      <img src={job.logo} alt={job.company} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{job.title}</h3>
                      <div className="flex items-center gap-2 text-muted-foreground mb-3">
                        <Building2 className="w-4 h-4" />
                        <span>{job.company}</span>
                        <span className="mx-2 text-white/20">|</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {job.location}</span>
                        <span className="mx-2 text-white/20">|</span>
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {job.postedAt}</span>
                      </div>
                      
                      {/* Skill Gap Analysis */}
                      <div className="bg-black/20 rounded-lg p-3 border border-white/5 mb-4">
                        <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm">
                           <div className="flex items-center gap-2">
                             <span className="text-muted-foreground">Matched:</span>
                             <div className="flex gap-1">
                               {job.required_skills.filter(s => !job.missingSkills?.includes(s)).map(s => (
                                 <span key={s} className="text-green-400 flex items-center gap-1 bg-green-500/5 px-1.5 py-0.5 rounded">
                                   <CheckCircle className="w-3 h-3" /> {s}
                                 </span>
                               ))}
                             </div>
                           </div>
                           
                           {job.missingSkills && job.missingSkills.length > 0 && (
                             <div className="flex items-center gap-2">
                               <span className="text-muted-foreground">Missing:</span>
                               <div className="flex gap-1">
                                 {job.missingSkills.map(s => (
                                   <span key={s} className="text-red-400 flex items-center gap-1 bg-red-500/5 px-1.5 py-0.5 rounded border border-red-500/20">
                                     <XCircle className="w-3 h-3" /> {s}
                                   </span>
                                 ))}
                               </div>
                             </div>
                           )}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3 text-sm text-muted-foreground items-center">
                        <span className="flex items-center gap-1 text-white bg-white/5 px-2 py-1 rounded">
                          <DollarSign className="w-3 h-3 text-green-400" /> {job.salary}
                        </span>
                        {job.tags.map(tag => (
                          <span key={tag} className="px-2 py-1 rounded text-xs bg-white/5 border border-white/10">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action */}
                  <div className="flex flex-col justify-end gap-3 min-w-[140px]">
                    {applicationStatus[job.id] ? (
                      <div className="w-full p-3 rounded-lg bg-green-500/10 border border-green-500/30 text-center">
                        <p className="text-sm font-bold text-green-400">
                          {applicationStatus[job.id]?.status === 'applied' && '✓ Applied'}
                          {applicationStatus[job.id]?.status === 'reviewing' && '📋 Reviewing'}
                          {applicationStatus[job.id]?.status === 'interview' && '🎤 Interview'}
                          {applicationStatus[job.id]?.status === 'offer' && '🎉 Offer'}
                        </p>
                        <p className="text-xs text-green-400/70 mt-1">
                          {new Date(applicationStatus[job.id]?.appliedAt || '').toLocaleDateString()}
                        </p>
                      </div>
                    ) : (
                      <>
                        <NeonButton 
                          variant="primary" 
                          className="w-full"
                          onClick={() => handleApplyClick(job)}
                        >
                          Apply Now
                        </NeonButton>
                        {(job.missingSkills?.length ?? 0) > 0 && (
                          <NeonButton variant="outline" size="sm" className="w-full text-xs border-yellow-500/50 text-yellow-500 hover:text-yellow-400 hover:border-yellow-400">
                            <AlertTriangle className="w-3 h-3 mr-2" /> Learn Skills
                          </NeonButton>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </GlassCard>
              ))
            ) : (
              <GlassCard className="text-center py-12">
                <Search className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                <p className="text-muted-foreground">No jobs found. Try adjusting your filters.</p>
              </GlassCard>
            )}

            {/* Application History */}
            {showApplicationHistory && (
              <GlassCard className="bg-gradient-to-br from-primary/10 to-transparent border-primary/30">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <History className="w-5 h-5" /> Your Applications ({Object.values(applicationStatus).filter(Boolean).length})
                </h3>
                <div className="space-y-3">
                  {Object.values(applicationStatus).filter(Boolean).length > 0 ? (
                    Object.entries(applicationStatus)
                      .filter(([_, app]) => app)
                      .map(([jobId, app]) => {
                        const job = jobs.find(j => j.id === jobId);
                        return (
                          <div key={app!.id} className="p-3 rounded-lg bg-white/5 border border-white/10">
                            <div className="flex items-start justify-between">
                              <div>
                                <p className="font-medium text-sm">{app!.jobTitle}</p>
                                <p className="text-xs text-muted-foreground">{app!.company} • {new Date(app!.appliedAt).toLocaleDateString()}</p>
                              </div>
                              <span className={`text-xs font-bold px-2 py-1 rounded ${
                                app!.status === 'offer' ? 'bg-green-500/20 text-green-400' :
                                app!.status === 'interview' ? 'bg-blue-500/20 text-blue-400' :
                                app!.status === 'reviewing' ? 'bg-yellow-500/20 text-yellow-400' :
                                'bg-white/10 text-foreground'
                              }`}>
                                {app!.status.toUpperCase()}
                              </span>
                            </div>
                          </div>
                        );
                      })
                  ) : (
                    <p className="text-sm text-muted-foreground">No applications yet</p>
                  )}
                </div>
              </GlassCard>
            )}
          </div>

          {/* Sidebar: Market Demand */}
          <div className="space-y-6">
            <GlassCard className="bg-gradient-to-br from-primary/5 to-transparent border-primary/20">
              <h3 className="font-bold flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-primary" /> Market Trends
              </h3>
              <p className="text-xs text-muted-foreground mb-4">Based on 15,000+ live job listings analyzed today.</p>
              
              <div className="space-y-4">
                {trending.map((skill, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                    <div>
                      <p className="font-bold text-sm">{skill.name}</p>
                      <p className="text-xs text-muted-foreground">{skill.count} open roles</p>
                    </div>
                    <span className="text-green-400 text-xs font-bold bg-green-500/10 px-2 py-1 rounded">
                      {skill.growth}
                    </span>
                  </div>
                ))}
              </div>
              
              <NeonButton variant="ghost" className="w-full mt-4 text-xs">View Full Report</NeonButton>
            </GlassCard>

            <GlassCard>
              <h3 className="font-bold mb-2">Career Tip</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Adding <span className="text-primary">Docker</span> to your skill set could increase your match rate by <span className="text-green-400 font-bold">15%</span> for Full Stack roles.
              </p>
            </GlassCard>
          </div>
        </div>

        {/* Application Dialog */}
        <Dialog open={showApplicationDialog} onOpenChange={setShowApplicationDialog}>
          <DialogContent className="bg-black/90 border-white/10 backdrop-blur-xl max-w-lg">
            <DialogHeader>
              <DialogTitle>Apply for Position</DialogTitle>
              <DialogDescription>
                {selectedJob && `${selectedJob.title} at ${selectedJob.company}`}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <Label htmlFor="resume-url">Resume URL</Label>
                <Input
                  id="resume-url"
                  placeholder="https://example.com/resume.pdf"
                  value={resumeUrl}
                  onChange={(e) => setResumeUrl(e.target.value)}
                  className="bg-white/5 border-white/10"
                />
              </div>

              <div>
                <Label htmlFor="cover-letter">Cover Letter</Label>
                <Textarea
                  id="cover-letter"
                  placeholder="Tell the company why you're interested in this role..."
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  className="bg-white/5 border-white/10 resize-none h-32"
                />
              </div>
            </div>

            <DialogFooter>
              <NeonButton variant="ghost" onClick={() => setShowApplicationDialog(false)}>
                Cancel
              </NeonButton>
              <NeonButton 
                onClick={handleSubmitApplication}
                disabled={isSubmitting}
              >
                {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Submit Application
              </NeonButton>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default Jobs;
