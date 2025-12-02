import React, { useState } from 'react';
import Layout from '@/components/Layout';
import GlassCard from '@/components/GlassCard';
import NeonButton from '@/components/NeonButton';
import { 
  CheckCircle, Circle, Lock, Sparkles, ArrowRight, 
  Cpu, Database, Globe, Server, Layout as LayoutIcon,
  AlertTriangle, Lightbulb, BookOpen, Clock
} from 'lucide-react';

// Types for our Roadmap Data
interface Task {
  name: string;
  isCompleted?: boolean;
}

interface Module {
  id: number;
  title: string;
  desc: string;
  time: string;
  tasks: Task[];
  status: 'completed' | 'in-progress' | 'locked';
}

interface Project {
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  desc: string;
}

interface RoadmapData {
  title: string;
  summary: string;
  modules: Module[];
  tree: string[];
  projects: Project[];
  mistakes: string[];
  advice: string;
}

const Roadmap = () => {
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);
  const [roadmap, setRoadmap] = useState<RoadmapData | null>(null);

  const handleGenerate = () => {
    if (!input.trim()) return;
    
    setIsGenerating(true);
    setRoadmap(null);
    setGenerationStep(0);

    // Simulate AI Generation Steps
    const steps = [
      "Analyzing your current level...",
      "Identifying key skill gaps...",
      "Structuring learning modules...",
      "Curating project ideas...",
      "Finalizing your personalized path..."
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      setGenerationStep(currentStep);
      
      if (currentStep >= steps.length) {
        clearInterval(interval);
        setIsGenerating(false);
        setRoadmap(mockMernRoadmap); // In real app, this would come from AI
      }
    }, 800);
  };

  const mockMernRoadmap: RoadmapData = {
    title: "MERN Stack Developer Path",
    summary: "A comprehensive guide to becoming a full-stack developer using MongoDB, Express.js, React, and Node.js. This path focuses on building real-world applications from scratch.",
    tree: ["HTML/CSS", "JavaScript", "React", "Node.js", "Express", "MongoDB", "Deployment"],
    modules: [
      {
        id: 1,
        title: "Module 1: Web Fundamentals",
        desc: "Master the building blocks of the web before diving into frameworks.",
        time: "2-3 Weeks",
        status: "completed",
        tasks: [
          { name: "HTML5 Semantic Structure", isCompleted: true },
          { name: "CSS3 Flexbox & Grid", isCompleted: true },
          { name: "Responsive Design & Media Queries", isCompleted: true },
          { name: "Git & GitHub Basics", isCompleted: true }
        ]
      },
      {
        id: 2,
        title: "Module 2: JavaScript Mastery",
        desc: "Deep dive into ES6+, async programming, and DOM manipulation.",
        time: "4 Weeks",
        status: "in-progress",
        tasks: [
          { name: "ES6+ Features (Arrow fns, Destructuring)", isCompleted: true },
          { name: "Async/Await & Promises", isCompleted: false },
          { name: "DOM Manipulation", isCompleted: false },
          { name: "Fetch API & JSON", isCompleted: false }
        ]
      },
      {
        id: 3,
        title: "Module 3: Frontend with React",
        desc: "Build interactive UIs with the most popular library.",
        time: "6 Weeks",
        status: "locked",
        tasks: [
          { name: "Components & Props" },
          { name: "Hooks (useState, useEffect)" },
          { name: "Context API & State Management" },
          { name: "React Router" }
        ]
      },
      {
        id: 4,
        title: "Module 4: Backend Engineering",
        desc: "Server-side logic with Node.js and Express.",
        time: "5 Weeks",
        status: "locked",
        tasks: [
          { name: "Node.js Runtime Basics" },
          { name: "Express Routing & Middleware" },
          { name: "REST API Design" },
          { name: "Authentication (JWT)" }
        ]
      }
    ],
    projects: [
      {
        title: "Task Management App",
        difficulty: "Beginner",
        desc: "A simple CRUD app with local storage to master React state."
      },
      {
        title: "E-Commerce Dashboard",
        difficulty: "Intermediate",
        desc: "Full-stack shop with cart, payments, and admin panel."
      },
      {
        title: "Real-time Chat App",
        difficulty: "Advanced",
        desc: "WebSockets implementation using Socket.io and MERN."
      }
    ],
    mistakes: [
      "Don't spend too much time on CSS frameworks before learning raw CSS.",
      "Avoid 'Tutorial Hell' - build projects without following a video step-by-step.",
      "Don't ignore TypeScript - it's industry standard now."
    ],
    advice: "Consistency is key. Code every day, even if it's just for 30 minutes. Focus on building things that solve real problems, not just copying tutorials."
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto pb-20">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 mb-6 animate-float">
            <Sparkles className="w-4 h-4" />
            <span className="font-bold text-sm">AI Career Mentor</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Design Your <span className="text-neon-cyan">Perfect Career Path</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Tell us your goal (e.g., "I want to be a MERN developer" or "First year CS student"), 
            and our AI will generate a personalized step-by-step roadmap for you.
          </p>
        </div>

        {/* Input Section */}
        {!roadmap && !isGenerating && (
          <div className="max-w-2xl mx-auto">
            <GlassCard className="p-2 flex items-center gap-2 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 animate-pulse -z-10" />
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="e.g. I want to become a Full Stack Developer..."
                className="flex-1 bg-transparent border-none focus:ring-0 text-lg px-4 py-2 placeholder:text-muted-foreground/50"
                onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
              />
              <NeonButton onClick={handleGenerate} disabled={!input.trim()}>
                Generate Roadmap
              </NeonButton>
            </GlassCard>
            
            {/* Pre-made suggestions */}
            <div className="flex flex-wrap justify-center gap-3 mt-6">
              {["MERN Stack", "Android Dev", "Data Science", "DevOps", "First Year Student"].map(tag => (
                <button 
                  key={tag}
                  onClick={() => setInput(`I want to learn ${tag}`)}
                  className="px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-primary/50 hover:text-primary transition-all text-sm"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Loading State */}
        {isGenerating && (
          <div className="max-w-2xl mx-auto text-center py-20">
            <div className="relative w-24 h-24 mx-auto mb-8">
              <div className="absolute inset-0 border-4 border-primary/20 rounded-full" />
              <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin" />
              <Sparkles className="absolute inset-0 m-auto text-primary w-8 h-8 animate-pulse" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Generating Roadmap...</h3>
            <p className="text-muted-foreground h-6 transition-all duration-300">
              {[
                "Analyzing your current level...",
                "Identifying key skill gaps...",
                "Structuring learning modules...",
                "Curating project ideas...",
                "Finalizing your personalized path..."
              ][generationStep] || "Finalizing..."}
            </p>
          </div>
        )}

        {/* Generated Roadmap Result */}
        {roadmap && (
          <div className="space-y-12 animate-fade-in">
            
            {/* 1. Title & Summary */}
            <div className="text-center space-y-4 border-b border-white/10 pb-12">
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                {roadmap.title}
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                {roadmap.summary}
              </p>
              <NeonButton variant="ghost" size="sm" onClick={() => setRoadmap(null)}>
                Start Over
              </NeonButton>
            </div>

            {/* 4. Visual Tree Breakdown (Placed earlier for overview) */}
            <div className="overflow-x-auto pb-4">
              <div className="flex items-center min-w-max gap-4 px-4">
                <div className="px-4 py-2 rounded-lg bg-primary/20 text-primary border border-primary/50 font-bold">
                  Start
                </div>
                {roadmap.tree.map((node, i) => (
                  <React.Fragment key={i}>
                    <div className="w-8 h-0.5 bg-white/20" />
                    <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 font-medium whitespace-nowrap">
                      {node}
                    </div>
                  </React.Fragment>
                ))}
                <div className="w-8 h-0.5 bg-white/20" />
                <div className="px-4 py-2 rounded-lg bg-secondary/20 text-secondary border border-secondary/50 font-bold">
                  Goal
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* 3. Modules List (Left Column) */}
              <div className="lg:col-span-2 space-y-6">
                <h3 className="text-2xl font-bold flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-primary" /> Learning Modules
                </h3>
                
                <div className="space-y-6 relative before:absolute before:inset-0 before:ml-6 before:w-0.5 before:-translate-x-px before:bg-gradient-to-b before:from-primary before:via-secondary before:to-transparent before:h-full">
                  {roadmap.modules.map((module, index) => (
                    <div key={index} className="relative pl-16">
                      {/* Status Icon */}
                      <div className={`
                        absolute left-0 top-6 -translate-y-1/2 w-12 h-12 rounded-full border-4 border-black flex items-center justify-center z-10 bg-background
                        ${module.status === 'completed' ? 'text-primary border-primary/20' : 
                          module.status === 'in-progress' ? 'text-secondary border-secondary/20 animate-pulse' : 'text-muted-foreground border-white/10'}
                      `}>
                        {module.status === 'completed' ? <CheckCircle className="w-6 h-6" /> :
                         module.status === 'in-progress' ? <Circle className="w-6 h-6" /> : <Lock className="w-6 h-6" />}
                      </div>

                      <GlassCard className={`
                        relative transition-all duration-300 hover:border-primary/30
                        ${module.status === 'locked' ? 'opacity-60' : ''}
                      `}>
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-xl font-bold">{module.title}</h4>
                          <span className="text-xs px-2 py-1 rounded bg-white/10 flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {module.time}
                          </span>
                        </div>
                        <p className="text-muted-foreground mb-4 text-sm">{module.desc}</p>
                        
                        <div className="space-y-2 bg-black/20 rounded-lg p-3">
                          {module.tasks.map((task, tIndex) => (
                            <div key={tIndex} className="flex items-center gap-3 text-sm">
                              <div className={`w-4 h-4 rounded border flex items-center justify-center
                                ${task.isCompleted ? 'bg-green-500/20 border-green-500 text-green-500' : 'border-white/20'}
                              `}>
                                {task.isCompleted && <CheckCircle className="w-3 h-3" />}
                              </div>
                              <span className={task.isCompleted ? 'text-muted-foreground line-through' : ''}>
                                {task.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      </GlassCard>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Projects & Advice */}
              <div className="space-y-8">
                {/* 5. Projects Section */}
                <div>
                  <h3 className="text-2xl font-bold flex items-center gap-2 mb-6">
                    <Cpu className="w-6 h-6 text-secondary" /> Projects
                  </h3>
                  <div className="space-y-4">
                    {roadmap.projects.map((project, i) => (
                      <GlassCard key={i} hoverEffect className="group">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold group-hover:text-primary transition-colors">{project.title}</h4>
                          <span className={`
                            text-[10px] px-2 py-0.5 rounded uppercase font-bold tracking-wider
                            ${project.difficulty === 'Beginner' ? 'bg-green-500/20 text-green-400' : 
                              project.difficulty === 'Intermediate' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}
                          `}>
                            {project.difficulty}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{project.desc}</p>
                      </GlassCard>
                    ))}
                  </div>
                </div>

                {/* 6. Mistakes to Avoid */}
                <GlassCard className="border-red-500/30 bg-red-500/5">
                  <h3 className="text-lg font-bold flex items-center gap-2 mb-4 text-red-400">
                    <AlertTriangle className="w-5 h-5" /> Mistakes to Avoid
                  </h3>
                  <ul className="space-y-3">
                    {roadmap.mistakes.map((mistake, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="text-red-500 mt-1">•</span>
                        {mistake}
                      </li>
                    ))}
                  </ul>
                </GlassCard>

                {/* 7. Final Advice */}
                <GlassCard className="bg-gradient-to-br from-primary/10 to-secondary/10 border-none">
                  <h3 className="text-lg font-bold flex items-center gap-2 mb-4 text-foreground">
                    <Lightbulb className="w-5 h-5 text-yellow-400" /> Mentor's Advice
                  </h3>
                  <blockquote className="text-sm italic text-muted-foreground border-l-2 border-primary pl-4">
                    "{roadmap.advice}"
                  </blockquote>
                </GlassCard>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Roadmap;
