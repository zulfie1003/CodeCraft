import React from 'react';
import { Link } from 'wouter';
import NeonButton from '@/components/NeonButton';
import { Code2, Rocket, Users, Zap } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 glass border-b-0 border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-primary to-secondary animate-pulse" />
            <span className="text-2xl font-bold tracking-tighter">
              Code<span className="text-neon-cyan">Craft</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/auth">
              <NeonButton variant="ghost" glow={false} className="hidden md:inline-flex">Sign In</NeonButton>
            </Link>
            <Link href="/auth?mode=signup">
              <NeonButton>Get Started</NeonButton>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] -z-10 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[128px] -z-10 animate-pulse delay-1000" />

        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium animate-float">
            🚀 The Future of Coding Education
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
            Master Coding. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary animate-glow">
              Build Your Future.
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Join the ultimate platform for developers. Practice real-world problems, 
            build verified projects, and get hired by top tech companies.
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <Link href="/auth?mode=signup">
              <NeonButton className="w-full md:w-auto text-lg px-8 py-4">
                Start Coding Now
              </NeonButton>
            </Link>
            <Link href="/auth">
              <NeonButton variant="outline" className="w-full md:w-auto text-lg px-8 py-4">
                Explore Platform
              </NeonButton>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-black/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Code2,
                title: "Interactive Practice",
                desc: "Solve problems in our advanced Monaco-based editor with real-time execution."
              },
              {
                icon: Rocket,
                title: "Project Builder",
                desc: "Create verified portfolio projects with GitHub integration and automated review."
              },
              {
                icon: Users,
                title: "AI Mentorship",
                desc: "Get instant feedback and guidance from our advanced AI coding mentor."
              }
            ].map((feature, i) => (
              <div key={i} className="glass-card p-8 rounded-2xl hover:-translate-y-2 transition-transform duration-300 group">
                <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-white/5 py-12 glass">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-primary to-secondary" />
            <span className="text-xl font-bold">CodeCraft</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2025 CodeCraft Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
