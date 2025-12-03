import React, { useState, useRef, useEffect } from 'react';
import Layout from '@/components/Layout';
import GlassCard from '@/components/GlassCard';
import NeonButton from '@/components/NeonButton';
import { Input } from '@/components/ui/input';
import { Bot, Send, User, AlertCircle, Star, Clock, DollarSign, Calendar, Loader2, MapPin, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { chatWithAI } from '@/api/openai';
import { getMentors, bookMentorSession, getSessions, MentorProfile, MentorSession } from '@/api/mentors';
import ReactMarkdown from 'react-markdown';
import { toast } from 'sonner';

interface Message {
  id: string;
  role: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

const Mentor = () => {
  const [tab, setTab] = useState<'ai' | 'mentors'>('ai');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'ai',
      text: "Hello! I'm your AI coding mentor powered by Groq (free & super fast). How can I help you improve your skills today? Feel free to ask me anything about coding, algorithms, data structures, or career advice.",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showApiInput, setShowApiInput] = useState(true);
  const [error, setError] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Mentor states
  const [mentors, setMentors] = useState<MentorProfile[]>([]);
  const [sessions, setSessions] = useState<MentorSession[]>([]);
  const [mentorLoading, setMentorLoading] = useState(true);
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState<MentorProfile | null>(null);
  const [bookingData, setBookingData] = useState({
    topic: '',
    scheduledAt: '',
    duration: 60
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSetApiKey = (key: string) => {
    if (!key.trim()) {
      setError('API key cannot be empty');
      return;
    }
    setApiKey(key);
    // Store in sessionStorage instead of localStorage for better security
    sessionStorage.setItem('groq_api_key', key);
    setShowApiInput(false);
    setError('');
  };

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    if (!apiKey.trim()) {
      setError('Please enter your Groq API key first');
      return;
    }

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    setError('');

    try {
      // Build conversation history for context
      const conversationHistory = messages.map(msg => ({
        role: msg.role === 'ai' ? 'assistant' : 'user',
        content: msg.text
      }));
      
      conversationHistory.push({
        role: 'user',
        content: userMsg.text
      });

      const aiResponse = await chatWithAI(conversationHistory, apiKey);
      
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        text: aiResponse,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        text: `Error: ${err instanceof Error ? err.message : 'Failed to get response from AI'}. Please check your API key and try again.`,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
      setError(err instanceof Error ? err.message : 'Failed to get response');
    } finally {
      setIsTyping(false);
    }
  };

  const handleChangeApiKey = () => {
    setShowApiInput(true);
    setApiKey('');
  };

  // Check for saved API key on component mount
  useEffect(() => {
    const savedKey = sessionStorage.getItem('groq_api_key');
    if (savedKey) {
      setApiKey(savedKey);
      setShowApiInput(false);
    }
  }, []);

  // Load mentors
  useEffect(() => {
    const loadMentors = async () => {
      try {
        const mentorData = await getMentors();
        setMentors(mentorData);
        setSessions(getSessions());
      } finally {
        setMentorLoading(false);
      }
    };
    loadMentors();
  }, []);

  const handleBookMentor = (mentor: MentorProfile) => {
    setSelectedMentor(mentor);
    setShowBookingDialog(true);
  };

  const handleSubmitBooking = () => {
    if (!selectedMentor || !bookingData.topic || !bookingData.scheduledAt) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    try {
      const session = bookMentorSession(
        selectedMentor.id,
        selectedMentor.name,
        bookingData.scheduledAt,
        bookingData.duration,
        bookingData.topic
      );

      setSessions(getSessions());
      toast.success(`Booked session with ${selectedMentor.name}!`);
      setShowBookingDialog(false);
      setBookingData({ topic: '', scheduledAt: '', duration: 60 });
      setSelectedMentor(null);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to book session');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto space-y-8 pb-20">
        {/* Tab Selector */}
        <div className="flex gap-2 border-b border-white/10">
          <button
            onClick={() => setTab('ai')}
            className={`px-6 py-3 font-medium transition-all border-b-2 ${
              tab === 'ai'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <Bot className="w-4 h-4 inline mr-2" /> AI Mentor (Groq)
          </button>
          <button
            onClick={() => setTab('mentors')}
            className={`px-6 py-3 font-medium transition-all border-b-2 ${
              tab === 'mentors'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            <User className="w-4 h-4 inline mr-2" /> Real Mentors
          </button>
        </div>

        {/* AI Mentor Tab */}
        {tab === 'ai' && (
          <div className="h-[calc(100vh-12rem)] flex flex-col">
            {showApiInput ? (
              <GlassCard className="flex flex-col items-center justify-center gap-6 py-12">
                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-bold">Groq API Setup</h2>
                  <p className="text-muted-foreground">Enter your Groq API key to use the AI Mentor (Free & Fast!)</p>
                  <p className="text-xs text-muted-foreground">Get your free API key from <a href="https://console.groq.com/keys" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">console.groq.com</a></p>
                </div>
                <div className="w-full max-w-md space-y-4">
                  <Input 
                    type="password"
                    placeholder="Paste your Groq API key here"
                    onChange={(e) => setApiKey(e.target.value)}
                    value={apiKey}
                    className="bg-black/20 border-white/10 focus:border-primary"
                  />
                  {error && (
                    <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {error}
                    </div>
                  )}
                  <Button 
                    onClick={() => handleSetApiKey(apiKey)}
                    disabled={!apiKey.trim()}
                    className="w-full bg-primary text-black hover:bg-primary/80"
                  >
                    Start Chatting
                  </Button>
                </div>
              </GlassCard>
            ) : (
              <GlassCard className="flex-1 flex flex-col overflow-hidden p-0 relative">
                {/* Header */}
                <div className="p-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <Bot className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold">AI Mentor (Groq)</h3>
                      <span className="text-xs text-green-400 flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        Online
                      </span>
                    </div>
                  </div>
                  <button 
                    onClick={handleChangeApiKey}
                    className="text-xs text-muted-foreground hover:text-foreground px-3 py-1 rounded hover:bg-white/5 transition-colors"
                  >
                    Change Key
                  </button>
                </div>

                {/* Chat Area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                  {messages.map((msg) => (
                    <div 
                      key={msg.id} 
                      className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                    >
                      <div className={`
                        w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0
                        ${msg.role === 'ai' ? 'bg-primary/20' : 'bg-secondary/20'}
                      `}>
                        {msg.role === 'ai' ? <Bot className="w-5 h-5 text-primary" /> : <User className="w-5 h-5 text-secondary" />}
                      </div>
                      <div className={`
                        max-w-[80%] p-4 rounded-2xl
                        ${msg.role === 'user' 
                          ? 'bg-secondary/10 border border-secondary/20 rounded-tr-none' 
                          : 'bg-white/5 border border-white/10 rounded-tl-none'}
                      `}>
                        <div className="text-sm leading-relaxed">
                          <ReactMarkdown
                            components={{
                              p: ({node, ...props}) => <p className="mb-3 text-foreground" {...props} />,
                              ul: ({node, ...props}) => <ul className="list-disc list-inside mb-3 ml-2" {...props} />,
                              ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-3 ml-2" {...props} />,
                              li: ({node, ...props}) => <li className="mb-2 text-foreground" {...props} />,
                              code: ({node, inline, children, className, ...props}: any) => 
                                inline ? 
                                  <code className="bg-black/30 px-2 py-1 rounded text-primary font-mono text-xs" {...props}>{children}</code> :
                                  <pre className="bg-black/40 p-3 rounded mb-3 overflow-x-auto border border-white/10">
                                    <code className="text-primary text-xs font-mono" {...props}>{children}</code>
                                  </pre>,
                              strong: ({node, ...props}) => <strong className="font-bold text-primary" {...props} />,
                              em: ({node, ...props}) => <em className="italic text-foreground/90" {...props} />,
                              h1: ({node, ...props}) => <h1 className="text-lg font-bold mb-3 mt-4 text-primary border-b border-primary/30 pb-2" {...props} />,
                              h2: ({node, ...props}) => <h2 className="text-base font-bold mb-2 mt-3 text-primary" {...props} />,
                              h3: ({node, ...props}) => <h3 className="text-sm font-bold mb-2 mt-2 text-primary/90" {...props} />,
                              blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-primary/50 pl-3 italic text-foreground/80 my-3 py-1" {...props} />,
                              a: ({node, ...props}) => <a className="text-primary hover:underline" {...props} />,
                            }}
                          >
                            {msg.text}
                          </ReactMarkdown>
                        </div>
                        <span className="text-xs text-muted-foreground mt-3 block opacity-50">
                          {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <Bot className="w-5 h-5 text-primary" />
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-none p-4 flex items-center gap-1">
                        <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-white/10 bg-black/20 backdrop-blur-sm">
                  {error && (
                    <div className="mb-3 flex items-center gap-2 p-2 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs">
                      <AlertCircle className="w-3 h-3" />
                      {error}
                    </div>
                  )}
                  <form onSubmit={handleSend} className="flex gap-3">
                    <Input 
                      value={input} 
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask me anything about coding..." 
                      disabled={isTyping}
                      className="flex-1 bg-black/20 border-white/10 focus:border-primary"
                    />
                    <Button 
                      type="submit" 
                      size="icon" 
                      disabled={isTyping || !input.trim()}
                      className="bg-primary text-black hover:bg-primary/80"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </form>
                </div>
              </GlassCard>
            )}
            </div>
          )}

        {/* Real Mentors Tab */}
        {tab === 'mentors' && (
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold">Connect with Expert Mentors</h2>
              <p className="text-muted-foreground">Book 1-on-1 sessions with experienced professionals</p>
            </div>

            {/* Mentors Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mentors.map((mentor) => (
                <GlassCard key={mentor.id} className="flex flex-col group">
                  {/* Profile Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <img 
                      src={mentor.avatar} 
                      alt={mentor.name} 
                      className="w-16 h-16 rounded-full border-2 border-primary/30"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{mentor.name}</h3>
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-bold">{mentor.rating}</span>
                        <span className="text-muted-foreground">({mentor.reviews})</span>
                      </div>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-sm text-muted-foreground mb-4 flex-1">{mentor.bio}</p>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 mb-4 p-3 rounded-lg bg-white/5">
                    <div>
                      <p className="text-xs text-muted-foreground">Sessions</p>
                      <p className="text-lg font-bold">{mentor.totalSessions || 0}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Students</p>
                      <p className="text-lg font-bold">{mentor.studentsSessions || 0}</p>
                    </div>
                  </div>

                  {/* Expertise Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {mentor.expertise.map(skill => (
                      <span key={skill} className="text-xs px-2 py-1 rounded bg-primary/20 text-primary border border-primary/30">
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Info Row */}
                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <DollarSign className="w-4 h-4" />
                      <span>${mentor.hourlyRate}/hour</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>{mentor.responseTime}</span>
                    </div>
                  </div>

                  {/* Reviews Preview */}
                  {mentor.reviews_list && mentor.reviews_list.length > 0 && (
                    <div className="mb-4 p-3 rounded-lg bg-white/5 border border-white/10">
                      <p className="text-xs font-bold mb-2 text-foreground">Recent Review</p>
                      <p className="text-xs text-muted-foreground italic">"{mentor.reviews_list[0].comment}"</p>
                      <p className="text-xs text-muted-foreground mt-1">— {mentor.reviews_list[0].userName}</p>
                    </div>
                  )}

                  {/* Action */}
                  <NeonButton 
                    className="w-full mt-auto"
                    onClick={() => handleBookMentor(mentor)}
                  >
                    Book Session
                  </NeonButton>
                </GlassCard>
              ))}
            </div>

            {/* Booking Dialog */}
            <Dialog open={showBookingDialog} onOpenChange={setShowBookingDialog}>
              <DialogContent className="bg-black/90 border-white/10 backdrop-blur-xl max-w-lg">
                <DialogHeader>
                  <DialogTitle>Book Mentor Session</DialogTitle>
                  <DialogDescription>
                    {selectedMentor?.name} • ${selectedMentor?.hourlyRate}/hour
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="topic">Topic (What do you want to learn?)</Label>
                    <Input
                      id="topic"
                      placeholder="e.g., System Design Interview Prep"
                      value={bookingData.topic}
                      onChange={(e) => setBookingData(prev => ({ ...prev, topic: e.target.value }))}
                      className="bg-white/5 border-white/10"
                    />
                  </div>

                  <div>
                    <Label htmlFor="scheduled-at">Preferred Date & Time</Label>
                    <Input
                      id="scheduled-at"
                      type="datetime-local"
                      value={bookingData.scheduledAt}
                      onChange={(e) => setBookingData(prev => ({ ...prev, scheduledAt: e.target.value }))}
                      className="bg-white/5 border-white/10"
                    />
                  </div>

                  <div>
                    <Label htmlFor="duration">Duration (minutes)</Label>
                    <select
                      value={bookingData.duration}
                      onChange={(e) => setBookingData(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
                      className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-foreground"
                    >
                      <option value={30}>30 minutes - ${(selectedMentor?.hourlyRate || 0) * 0.5}</option>
                      <option value={60}>60 minutes - ${selectedMentor?.hourlyRate}</option>
                      <option value={90}>90 minutes - ${(selectedMentor?.hourlyRate || 0) * 1.5}</option>
                    </select>
                  </div>
                </div>

                <DialogFooter>
                  <NeonButton variant="ghost" onClick={() => setShowBookingDialog(false)}>
                    Cancel
                  </NeonButton>
                  <NeonButton 
                    onClick={handleSubmitBooking}
                    disabled={isSubmitting}
                  >
                    {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                    Book & Pay
                  </NeonButton>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Your Sessions */}
            {sessions.length > 0 && (
              <GlassCard className="bg-gradient-to-br from-secondary/10 to-transparent border-secondary/30">
                <h3 className="font-bold mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5" /> Your Booked Sessions ({sessions.length})
                </h3>
                <div className="space-y-3">
                  {sessions.map(session => (
                    <div key={session.id} className="p-3 rounded-lg bg-white/5 border border-white/10">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium text-sm">{session.mentorName}</p>
                          <p className="text-xs text-muted-foreground">{session.topic} • {session.duration}min</p>
                          <p className="text-xs text-muted-foreground">{new Date(session.scheduledAt).toLocaleString()}</p>
                        </div>
                        <span className={`text-xs font-bold px-2 py-1 rounded ${
                          session.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                          session.status === 'cancelled' ? 'bg-red-500/20 text-red-400' :
                          'bg-blue-500/20 text-blue-400'
                        }`}>
                          {session.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Mentor;
