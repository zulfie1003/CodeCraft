import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import GlassCard from '@/components/GlassCard';
import NeonButton from '@/components/NeonButton';
import { PracticeSkeleton } from '@/components/PracticeSkeleton';
import { 
  Briefcase, Code2, Users, CheckCircle, Plus, X, ExternalLink, 
  Zap, TrendingUp, Award 
} from 'lucide-react';
import { getCompaniesBySkills, getPracticeResources, COMPANY_SKILLS } from '@/api/practice';
import { Link } from 'wouter';

const Practice = () => {
  const [mode, setMode] = useState<'skills' | 'company'>('skills');
  const [selectedSkills, setSelectedSkills] = useState<string[]>(['React', 'JavaScript']);
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [allSkills] = useState([
    'DSA', 'React', 'Node.js', 'System Design', 'SQL', 'JavaScript', 
    'Java', 'AWS', 'Databases', 'C#', 'GraphQL', 'CSS'
  ]);

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <Layout>
        <div className="max-w-6xl mx-auto">
          <PracticeSkeleton />
        </div>
      </Layout>
    );
  }

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const companyMatches = getCompaniesBySkills(selectedSkills);

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">Smart Practice Recommender</h1>
          <p className="text-muted-foreground">Connect your skills to company requirements and find what to practice.</p>
        </div>

        {/* Mode Toggle */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => setMode('skills')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
              mode === 'skills'
                ? 'bg-primary text-black'
                : 'bg-white/10 text-foreground hover:bg-white/20'
            }`}
          >
            <Code2 className="w-5 h-5" /> Skills → Companies
          </button>
          <button
            onClick={() => setMode('company')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
              mode === 'company'
                ? 'bg-secondary text-white'
                : 'bg-white/10 text-foreground hover:bg-white/20'
            }`}
          >
            <Briefcase className="w-5 h-5" /> Company → Skills
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Skills/Company Selection */}
          <div className="lg:col-span-1 space-y-6">
            {mode === 'skills' ? (
              <>
                <GlassCard>
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <Code2 className="w-5 h-5 text-primary" /> Select Your Skills
                  </h3>
                  <div className="space-y-2">
                    {allSkills.map(skill => (
                      <button
                        key={skill}
                        onClick={() => toggleSkill(skill)}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                          selectedSkills.includes(skill)
                            ? 'bg-primary/20 border border-primary text-primary'
                            : 'bg-white/5 border border-white/10 hover:bg-white/10'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded border flex items-center justify-center ${
                          selectedSkills.includes(skill) ? 'bg-primary border-primary' : 'border-white/20'
                        }`}>
                          {selectedSkills.includes(skill) && <CheckCircle className="w-4 h-4" />}
                        </div>
                        <span className="text-sm font-medium">{skill}</span>
                      </button>
                    ))}
                  </div>
                </GlassCard>

                <GlassCard className="bg-gradient-to-br from-primary/10 to-transparent">
                  <p className="text-sm text-muted-foreground mb-2">Selected Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedSkills.map(skill => (
                      <span key={skill} className="px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/50 text-xs font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              </>
            ) : (
              <GlassCard>
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-secondary" /> Select Company
                </h3>
                <div className="space-y-2">
                  {Object.keys(COMPANY_SKILLS).map(company => (
                    <button
                      key={company}
                      onClick={() => setSelectedCompany(selectedCompany === company ? null : company)}
                      className={`w-full text-left p-3 rounded-lg transition-all font-medium ${
                        selectedCompany === company
                          ? 'bg-secondary/20 border border-secondary text-secondary'
                          : 'bg-white/5 border border-white/10 hover:bg-white/10'
                      }`}
                    >
                      {company}
                    </button>
                  ))}
                </div>
              </GlassCard>
            )}

            {/* Progress Widget */}
            <Link href="/progress">
              <GlassCard className="bg-gradient-to-br from-yellow-500/10 to-transparent cursor-pointer hover:border-yellow-500/50 transition-all">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-5 h-5 text-yellow-400" />
                  <span className="font-bold text-sm">View External Progress</span>
                </div>
                <p className="text-xs text-muted-foreground">Connect GFG, LeetCode, Codeforces</p>
              </GlassCard>
            </Link>
          </div>

          {/* Right: Results */}
          <div className="lg:col-span-2 space-y-6">
            {mode === 'skills' ? (
              <>
                <h2 className="text-2xl font-bold">Companies Needing Your Skills</h2>
                {companyMatches.length === 0 ? (
                  <GlassCard className="text-center py-12">
                    <p className="text-muted-foreground">Select skills to see matching companies</p>
                  </GlassCard>
                ) : (
                  <div className="space-y-4">
                    {companyMatches.map(match => (
                      <GlassCard key={match.company} hoverEffect className="group">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{match.company}</h3>
                            <p className="text-sm text-muted-foreground">{match.roles.join(', ')}</p>
                          </div>
                          <div className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold ${
                            match.matchPercentage >= 70 ? 'bg-green-500/10 text-green-400' :
                            match.matchPercentage >= 40 ? 'bg-yellow-500/10 text-yellow-400' :
                            'bg-red-500/10 text-red-400'
                          }`}>
                            <Zap className="w-4 h-4 fill-current" />
                            {match.matchPercentage}% Match
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-black/20 p-3 rounded-lg">
                            <p className="text-xs text-green-400 font-mono mb-1">✓ Matched Skills</p>
                            <div className="space-y-1">
                              {match.matchedSkills.map(skill => (
                                <span key={skill} className="block text-sm">{skill}</span>
                              ))}
                            </div>
                          </div>
                          <div className="bg-black/20 p-3 rounded-lg">
                            <p className="text-xs text-red-400 font-mono mb-1">⚠ Missing Skills</p>
                            <div className="space-y-1">
                              {match.missingSkills.map(skill => (
                                <span key={skill} className="block text-sm text-muted-foreground">{skill}</span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 p-3 rounded-lg bg-blue-500/5 border border-blue-500/20">
                          <p className="text-xs text-blue-400 font-mono mb-2">📚 Practice Missing Skills:</p>
                          <div className="flex flex-wrap gap-2">
                            {match.missingSkills.slice(0, 2).map(skill => (
                              <a
                                key={skill}
                                href={getPracticeResources(skill)[0]?.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs px-2 py-1 rounded bg-blue-500/10 text-blue-400 border border-blue-500/30 hover:border-blue-500/50 transition-all flex items-center gap-1"
                              >
                                {skill} <ExternalLink className="w-3 h-3" />
                              </a>
                            ))}
                          </div>
                        </div>
                      </GlassCard>
                    ))}
                  </div>
                )}
              </>
            ) : selectedCompany ? (
              <>
                <h2 className="text-2xl font-bold">Skills Required for {selectedCompany}</h2>
                {(() => {
                  const required = COMPANY_SKILLS[selectedCompany as keyof typeof COMPANY_SKILLS]?.required || [];
                  const userSkills = selectedSkills;
                  const matched = userSkills.filter(s => required.includes(s));
                  const missing = required.filter(s => !userSkills.includes(s));

                  return (
                    <GlassCard hoverEffect>
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-2xl font-bold">{selectedCompany}</h3>
                        <div className="text-4xl font-bold text-primary">
                          {Math.round((matched.length / required.length) * 100)}%
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-bold text-green-400 mb-3 flex items-center gap-2">
                            <CheckCircle className="w-5 h-5" /> Your Skills
                          </h4>
                          <div className="space-y-2">
                            {matched.map(skill => (
                              <div key={skill} className="p-2 rounded bg-green-500/10 border border-green-500/20 text-sm">
                                {skill}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-bold text-red-400 mb-3 flex items-center gap-2">
                            <X className="w-5 h-5" /> Learn These
                          </h4>
                          <div className="space-y-2">
                            {missing.map(skill => (
                              <a
                                key={skill}
                                href={getPracticeResources(skill)[0]?.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded bg-red-500/10 border border-red-500/20 text-sm cursor-pointer hover:bg-red-500/20 transition-all block"
                              >
                                {skill}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 p-4 rounded-lg bg-blue-500/5 border border-blue-500/20">
                        <h4 className="font-bold text-blue-400 mb-3">📖 Practice Resources</h4>
                        <div className="space-y-2">
                          {missing.slice(0, 3).map(skill => (
                            <div key={skill}>
                              <p className="text-xs text-muted-foreground mb-1">{skill}:</p>
                              {getPracticeResources(skill).map(resource => (
                                <a
                                  key={resource.url}
                                  href={resource.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs block text-blue-400 hover:text-blue-300 mb-1 flex items-center gap-1"
                                >
                                  {resource.title} ({resource.platform}) <ExternalLink className="w-3 h-3" />
                                </a>
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>
                    </GlassCard>
                  );
                })()}
              </>
            ) : (
              <GlassCard className="text-center py-12">
                <Briefcase className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                <p className="text-muted-foreground">Select a company to see required skills</p>
              </GlassCard>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Practice;
