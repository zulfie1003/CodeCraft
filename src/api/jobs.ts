// Jobs API (Mock/Public)
// Simulating JSearch / Remotive API structure for Skill Matching

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary?: string;
  logo?: string;
  postedAt: string;
  required_skills: string[]; // Critical for matching
  tags: string[]; // Display tags
  matchScore?: number; // Calculated on frontend
  missingSkills?: string[]; // Calculated on frontend
}

// Mock User Skills (In real app, this comes from AuthContext/Profile)
export const MOCK_USER_SKILLS = [
  "React", "JavaScript", "HTML", "CSS", "Tailwind", "Git", "Figma"
];

export const calculateMatchScore = (jobSkills: string[], userSkills: string[]) => {
  if (!jobSkills || jobSkills.length === 0) return { score: 0, missing: [] };
  
  const normalizedUserSkills = userSkills.map(s => s.toLowerCase());
  const normalizedJobSkills = jobSkills.map(s => s.toLowerCase());
  
  const matches = normalizedJobSkills.filter(skill => 
    normalizedUserSkills.includes(skill)
  );
  
  const missing = jobSkills.filter(skill => 
    !normalizedUserSkills.includes(skill.toLowerCase())
  );

  const score = Math.round((matches.length / jobSkills.length) * 100);
  
  return { score, missing };
};

export const fetchJobs = async (): Promise<Job[]> => {
  await new Promise(resolve => setTimeout(resolve, 800));

  const rawJobs = [
    {
      id: "1",
      title: "Frontend Engineer",
      company: "TechCorp",
      location: "Remote",
      type: "Full-time",
      salary: "$120k - $160k",
      logo: "https://ui-avatars.com/api/?name=TC&background=00f3ff&color=fff",
      postedAt: "2 days ago",
      required_skills: ["React", "TypeScript", "Tailwind", "Redux"],
      tags: ["React", "TypeScript", "Tailwind"]
    },
    {
      id: "2",
      title: "Full Stack Developer",
      company: "StartupX",
      location: "San Francisco, CA",
      type: "Contract",
      salary: "$80 - $120 / hr",
      logo: "https://ui-avatars.com/api/?name=SX&background=bc13fe&color=fff",
      postedAt: "5 hours ago",
      required_skills: ["Node.js", "PostgreSQL", "React", "AWS", "Docker"],
      tags: ["Node.js", "PostgreSQL", "React"]
    },
    {
      id: "3",
      title: "Junior Web Developer",
      company: "Creative Agency",
      location: "London, UK",
      type: "Full-time",
      salary: "£35k - £45k",
      logo: "https://ui-avatars.com/api/?name=CA&background=ff0055&color=fff",
      postedAt: "1 week ago",
      required_skills: ["HTML", "CSS", "JavaScript", "Git"],
      tags: ["HTML", "CSS", "JavaScript"]
    },
    {
      id: "4",
      title: "AI Interface Designer",
      company: "FutureSystems",
      location: "Remote",
      type: "Full-time",
      salary: "$140k - $180k",
      logo: "https://ui-avatars.com/api/?name=FS&background=random",
      postedAt: "Just now",
      required_skills: ["Figma", "UI/UX", "AI", "React"],
      tags: ["UI/UX", "Figma", "AI"]
    },
    {
      id: "5",
      title: "Senior React Native Dev",
      company: "MobileFirst",
      location: "Remote",
      type: "Full-time",
      salary: "$150k+",
      logo: "https://ui-avatars.com/api/?name=MF&background=random",
      postedAt: "1 day ago",
      required_skills: ["React Native", "iOS", "Android", "TypeScript"],
      tags: ["Mobile", "React Native"]
    }
  ];

  // Enhancing jobs with match scores
  return rawJobs.map(job => {
    const { score, missing } = calculateMatchScore(job.required_skills, MOCK_USER_SKILLS);
    return { ...job, matchScore: score, missingSkills: missing };
  }).sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0)); // Sort by best match
};

export const getTrendingSkills = () => {
  return [
    { name: "TypeScript", growth: "+38%", count: 1240 },
    { name: "Next.js", growth: "+24%", count: 980 },
    { name: "Docker", growth: "+15%", count: 850 },
    { name: "GraphQL", growth: "+12%", count: 620 },
  ];
};
