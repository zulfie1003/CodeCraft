import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import GlassCard from '@/components/GlassCard';
import NeonButton from '@/components/NeonButton';
import { fetchJobs, getTrendingSkills, Job, MOCK_USER_SKILLS } from '@/api/jobs';
import { MapPin, DollarSign, Clock, Building2, Zap, CheckCircle, XCircle, TrendingUp, AlertTriangle } from 'lucide-react';

const Jobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [trending, setTrending] = useState<any[]>([]);

  useEffect(() => {
    fetchJobs().then(setJobs);
    setTrending(getTrendingSkills());
  }, []);

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
            {jobs.map((job) => (
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
                    <NeonButton variant="primary" className="w-full">Apply Now</NeonButton>
                    {(job.missingSkills?.length ?? 0) > 0 && (
                      <NeonButton variant="outline" size="sm" className="w-full text-xs border-yellow-500/50 text-yellow-500 hover:text-yellow-400 hover:border-yellow-400">
                        <AlertTriangle className="w-3 h-3 mr-2" /> Learn Skills
                      </NeonButton>
                    )}
                  </div>
                </div>
              </GlassCard>
            ))}
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
      </div>
    </Layout>
  );
};

export default Jobs;
