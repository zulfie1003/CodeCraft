import React, { useState } from 'react';
import Layout from '@/components/Layout';
import GlassCard from '@/components/GlassCard';
import { useAuth } from '@/context/AuthContext';
import { Github, Linkedin, Globe, MapPin, Mail, Edit2, Save, X } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Portfolio = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || 'John Doe',
    title: 'Full Stack Engineer & AI Enthusiast',
    location: 'San Francisco, CA',
    email: user?.email || 'john@example.com',
    avatar: user?.avatar || 'https://ui-avatars.com/api/?name=JD&background=random',
    bio: 'Passionate about building scalable applications and AI solutions',
    github: 'github.com/johndoe',
    linkedin: 'linkedin.com/in/johndoe',
    website: 'johndoe.dev'
  });

  const [editData, setEditData] = useState(profileData);

  // Mock Data
  const skills = [
    { name: 'React', level: 95 },
    { name: 'TypeScript', level: 88 },
    { name: 'Node.js', level: 82 },
    { name: 'Python', level: 75 },
    { name: 'PostgreSQL', level: 70 },
  ];

  const projects = [
    {
      title: "E-Commerce Platform",
      desc: "Full-stack shop with Stripe integration.",
      tags: ["React", "Node", "Stripe"],
      image: "https://ui-avatars.com/api/?name=E+C&background=random"
    },
    {
      title: "Task Manager AI",
      desc: "Smart todo list with NLP parsing.",
      tags: ["Python", "OpenAI", "FastAPI"],
      image: "https://ui-avatars.com/api/?name=T+M&background=random"
    },
    {
      title: "Crypto Dashboard",
      desc: "Real-time price tracking with WebSocket.",
      tags: ["React", "WebSockets", "D3.js"],
      image: "https://ui-avatars.com/api/?name=C+D&background=random"
    }
  ];

  const handleEditToggle = () => {
    if (isEditing) {
      setEditData(profileData);
    }
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setProfileData(editData);
    setIsEditing(false);
    // Store in sessionStorage for security (cleared on browser close)
    // Note: For production, send this to a secure backend API
    try {
      sessionStorage.setItem('userProfile', JSON.stringify(editData));
    } catch (error) {
      console.error('Failed to save profile:', error);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header / Bio - Edit Mode */}
        <GlassCard className="relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-primary/20 to-secondary/20" />
          
          {isEditing ? (
            // Edit Mode
            <div className="relative pt-8 px-6 pb-6 space-y-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Edit Profile</h2>
                <div className="flex gap-3">
                  <Button onClick={handleSave} className="bg-primary text-black hover:bg-primary/80 flex items-center gap-2">
                    <Save className="w-4 h-4" /> Save
                  </Button>
                  <Button onClick={handleEditToggle} className="bg-white/10 hover:bg-white/20 flex items-center gap-2">
                    <X className="w-4 h-4" /> Cancel
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Avatar Upload */}
                <div className="col-span-1">
                  <label className="block text-sm font-medium mb-2">Profile Picture</label>
                  <div className="w-32 h-32 rounded-2xl border-4 border-primary/50 bg-black overflow-hidden shadow-2xl mb-4">
                    <img src={editData.avatar} alt="Profile" className="w-full h-full object-cover" />
                  </div>
                  <Input
                    type="url"
                    placeholder="Image URL"
                    value={editData.avatar}
                    onChange={(e) => handleInputChange('avatar', e.target.value)}
                    className="bg-black/20 border-white/10 focus:border-primary"
                  />
                </div>

                {/* Name & Title */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name</label>
                    <Input
                      type="text"
                      placeholder="Your Name"
                      value={editData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="bg-black/20 border-white/10 focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Professional Title</label>
                    <Input
                      type="text"
                      placeholder="e.g., Full Stack Engineer & AI Enthusiast"
                      value={editData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className="bg-black/20 border-white/10 focus:border-primary"
                    />
                  </div>
                </div>

                {/* Location & Email */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Location</label>
                    <Input
                      type="text"
                      placeholder="City, Country"
                      value={editData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="bg-black/20 border-white/10 focus:border-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={editData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="bg-black/20 border-white/10 focus:border-primary"
                    />
                  </div>
                </div>

                {/* Bio */}
                <div>
                  <label className="block text-sm font-medium mb-2">Bio</label>
                  <textarea
                    placeholder="Tell us about yourself..."
                    value={editData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    rows={4}
                    className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm focus:border-primary focus:outline-none resize-none"
                  />
                </div>

                {/* Social Links */}
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-medium mb-3">Social Links</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">GitHub</label>
                      <Input
                        type="text"
                        placeholder="github.com/username"
                        value={editData.github}
                        onChange={(e) => handleInputChange('github', e.target.value)}
                        className="bg-black/20 border-white/10 focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">LinkedIn</label>
                      <Input
                        type="text"
                        placeholder="linkedin.com/in/username"
                        value={editData.linkedin}
                        onChange={(e) => handleInputChange('linkedin', e.target.value)}
                        className="bg-black/20 border-white/10 focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">Website</label>
                      <Input
                        type="text"
                        placeholder="yourwebsite.com"
                        value={editData.website}
                        onChange={(e) => handleInputChange('website', e.target.value)}
                        className="bg-black/20 border-white/10 focus:border-primary"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // View Mode
            <>
              <div className="relative pt-16 px-4 pb-4 flex flex-col md:flex-row items-end md:items-center gap-6">
                <div className="w-32 h-32 rounded-2xl border-4 border-black bg-black overflow-hidden shadow-2xl">
                  <img src={profileData.avatar} alt="Profile" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 mb-2">
                  <h1 className="text-3xl font-bold">{profileData.name}</h1>
                  <p className="text-muted-foreground text-lg">{profileData.title}</p>
                  <p className="text-muted-foreground text-sm mb-3">{profileData.bio}</p>
                  <div className="flex gap-4 mt-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {profileData.location}</span>
                    <span className="flex items-center gap-1"><Mail className="w-4 h-4" /> {profileData.email}</span>
                  </div>
              </div>
              <div className="flex gap-3 mb-2">
                <a href={`https://${profileData.github}`} target="_blank" rel="noopener noreferrer">
                  <GlassCard className="p-2 rounded-lg hover:bg-white/10 cursor-pointer"><Github className="w-5 h-5" /></GlassCard>
                </a>
                <a href={`https://${profileData.linkedin}`} target="_blank" rel="noopener noreferrer">
                  <GlassCard className="p-2 rounded-lg hover:bg-white/10 cursor-pointer"><Linkedin className="w-5 h-5" /></GlassCard>
                </a>
                <a href={`https://${profileData.website}`} target="_blank" rel="noopener noreferrer">
                  <GlassCard className="p-2 rounded-lg hover:bg-white/10 cursor-pointer"><Globe className="w-5 h-5" /></GlassCard>
                </a>
              </div>
            </div>
            {!isEditing && (
              <div className="flex justify-end mt-4">
                <Button onClick={handleEditToggle} className="bg-primary text-black hover:bg-primary/80 flex items-center gap-2">
                  <Edit2 className="w-4 h-4" /> Edit Profile
                </Button>
              </div>
            )}
          </>
          )}
        </GlassCard>

        {!isEditing && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Skills */}
            <div className="md:col-span-1 space-y-6">
              <GlassCard>
                <h3 className="text-xl font-bold mb-6">Top Skills</h3>
                <div className="space-y-4">
                  {skills.map(skill => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>{skill.name}</span>
                        <span className="text-primary">{skill.level}%</span>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full" 
                          style={{ width: `${skill.level}%` }} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
              
              <GlassCard>
                <h3 className="text-xl font-bold mb-4">Stats</h3>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="p-4 rounded bg-white/5">
                    <div className="text-2xl font-bold text-primary">342</div>
                    <div className="text-xs text-muted-foreground">Problems</div>
                  </div>
                  <div className="p-4 rounded bg-white/5">
                    <div className="text-2xl font-bold text-secondary">15</div>
                    <div className="text-xs text-muted-foreground">Projects</div>
                  </div>
                  <div className="p-4 rounded bg-white/5">
                    <div className="text-2xl font-bold text-pink-500">1.2k</div>
                    <div className="text-xs text-muted-foreground">Commits</div>
                  </div>
                  <div className="p-4 rounded bg-white/5">
                    <div className="text-2xl font-bold text-yellow-500">Top 5%</div>
                    <div className="text-xs text-muted-foreground">Rank</div>
                  </div>
                </div>
              </GlassCard>
            </div>

            {/* Projects */}
            <div className="md:col-span-2 space-y-6">
              <h2 className="text-2xl font-bold">Featured Projects</h2>
              <div className="grid gap-6">
                {projects.map((project, i) => (
                  <GlassCard key={i} hoverEffect className="flex gap-6 group cursor-pointer">
                    <div className="w-32 h-32 rounded-lg bg-white/5 overflow-hidden flex-shrink-0">
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                      <p className="text-muted-foreground mb-4">{project.desc}</p>
                      <div className="flex gap-2">
                        {project.tags.map(tag => (
                          <span key={tag} className="px-2 py-1 rounded text-xs bg-primary/10 text-primary border border-primary/20">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Portfolio;
