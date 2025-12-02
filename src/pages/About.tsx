import React from 'react';
import Layout from '@/components/Layout';
import GlassCard from '@/components/GlassCard';
import { Users, Target, Zap, Heart, Code2, Globe, Github, Linkedin, Twitter, Instagram } from 'lucide-react';

const About = () => {
  const team = [
    {
      name: 'Zulfiquar Ali',
      role: 'Founder & Team Leader',
      image: 'zulfiquar.png',
      social: {
        github: 'https://github.com/zulfie1003',
        linkedin: 'https://www.linkedin.com/in/zulfiquar-ali-931774281/',
        twitter: 'https://twitter.com/zulfie1900',
        instagram: 'https://www.instagram.com/__aayan___2003/'
      }
    },
    {
      name: 'Vipul Paswan',
      role: 'Lead Developer',
      image: 'vipul.jpeg',
      social: {
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
        instagram: 'https://instagram.com'
      }
    },
    {
      name: 'Anas',
      role: 'Backend Engineer',
      image: 'anas.jpeg',
      social: {
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
        instagram: 'https://instagram.com'
      }
    },
    {
      name: 'Furqan',
      role: 'Product Manager',
      image: 'furqan.jpeg',
      social: {
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
        instagram: 'https://instagram.com'
      }
    },
    {
      name: 'Raj Kumar Singh',
      role: 'Design Lead',
      image: 'rajkumar.jpeg',
      social: {
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
        instagram: 'https://instagram.com'
      }
    }
  ];

  const values = [
    {
      icon: Target,
      title: 'Mission Driven',
      desc: 'Empowering developers to reach their full potential through quality education and real-world projects.'
    },
    {
      icon: Zap,
      title: 'Innovation First',
      desc: 'Leveraging cutting-edge AI and modern technologies to create the best learning experience.'
    },
    {
      icon: Users,
      title: 'Community Focus',
      desc: 'Building a supportive community where developers help each other grow and succeed.'
    },
    {
      icon: Heart,
      title: 'Accessibility',
      desc: 'Making quality coding education accessible to everyone, regardless of background or location.'
    }
  ];

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Hero Section */}
        <GlassCard className="relative overflow-hidden py-16 px-8">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-primary/20 to-secondary/20" />
          <div className="relative text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">
              About <span className="text-neon-cyan">CodeCraft</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We're on a mission to transform how developers learn, practice, and launch their careers.
            </p>
          </div>
        </GlassCard>

        {/* Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <GlassCard className="p-8 space-y-4">
            <h2 className="text-2xl font-bold">Our Story</h2>
            <p className="text-muted-foreground leading-relaxed">
              CodeCraft was founded in 2025 by a team of passionate developers who believed that quality coding education should be accessible to everyone. Starting as a simple practice platform, we've grown into a comprehensive ecosystem that combines learning, practice, mentorship, and career opportunities.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Today, thousands of developers use CodeCraft to master new skills, solve real-world problems, and land their dream jobs at top tech companies.
            </p>
          </GlassCard>

          <GlassCard className="p-8 space-y-4">
            <h2 className="text-2xl font-bold">Why CodeCraft?</h2>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <Code2 className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <span><strong>AI-Powered Learning:</strong> Our AI mentor adapts to your learning pace</span>
              </li>
              <li className="flex items-start gap-3">
                <Globe className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <span><strong>Global Community:</strong> Connect with developers worldwide</span>
              </li>
              <li className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <span><strong>Real-World Projects:</strong> Work on practical problems used by tech companies</span>
              </li>
            </ul>
          </GlassCard>
        </div>

        {/* Values Section */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <GlassCard key={i} className="p-6 space-y-3 text-center hover:border-primary/50 transition-colors">
                  <div className="flex justify-center">
                    <Icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-bold">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.desc}</p>
                </GlassCard>
              );
            })}
          </div>
        </div>

        {/* Team Section */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">Meet Our Team</h2>
            <p className="text-muted-foreground">Passionate developers and educators building the future of tech education</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {team.map((member, i) => (
              <GlassCard key={i} className="p-6 text-center space-y-4 hover:border-primary/50 transition-colors">
                <div className="w-24 h-24 mx-auto rounded-full border-2 border-primary/50 overflow-hidden">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{member.name}</h3>
                  <p className="text-sm text-primary">{member.role}</p>
                </div>
                
                {/* Social Media Links */}
                <div className="flex justify-center gap-3 pt-2">
                  {member.social.github && (
                    <a href={member.social.github} target="_blank" rel="noopener noreferrer" title="GitHub" className="text-muted-foreground hover:text-primary transition-colors">
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                  {member.social.linkedin && (
                    <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn" className="text-muted-foreground hover:text-primary transition-colors">
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                  {member.social.twitter && (
                    <a href={member.social.twitter} target="_blank" rel="noopener noreferrer" title="Twitter" className="text-muted-foreground hover:text-primary transition-colors">
                      <Twitter className="w-5 h-5" />
                    </a>
                  )}
                  {member.social.instagram && (
                    <a href={member.social.instagram} target="_blank" rel="noopener noreferrer" title="Instagram" className="text-muted-foreground hover:text-primary transition-colors">
                      <Instagram className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <GlassCard className="p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">50K+</div>
              <div className="text-muted-foreground">Active Users</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-secondary mb-2">500+</div>
              <div className="text-muted-foreground">Coding Problems</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-pink-500 mb-2">100+</div>
              <div className="text-muted-foreground">Companies Partnered</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-500 mb-2">1000+</div>
              <div className="text-muted-foreground">Placements Made</div>
            </div>
          </div>
        </GlassCard>

        {/* Contact Section */}
        <GlassCard className="p-8 text-center space-y-4">
          <h2 className="text-2xl font-bold">Get In Touch</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a question or want to collaborate? We'd love to hear from you!
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4 mt-6">
            <a href="mailto:contact@codecraft.dev" className="px-6 py-2 bg-primary text-black rounded-lg hover:bg-primary/80 transition-colors font-medium">
              Email Us
            </a>
            <a href="https://twitter.com/codecraft_dev" target="_blank" rel="noopener noreferrer" className="px-6 py-2 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-colors">
              Follow on Twitter
            </a>
          </div>
        </GlassCard>
      </div>
    </Layout>
  );
};

export default About;
