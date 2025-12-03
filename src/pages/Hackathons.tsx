import React, { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/context/AuthContext';
import Layout from '@/components/Layout';
import GlassCard from '@/components/GlassCard';
import NeonButton from '@/components/NeonButton';
import { fetchHackathons, Hackathon } from '@/api/hackathons';
import { 
  registerForHackathon, 
  isRegisteredForHackathon, 
  getUserHackathons,
  cancelHackathonRegistration 
} from '@/api/hackathon-registrations';
import { Calendar, Trophy, Tag, Plus, X, LogIn, CheckCircle, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { toast } from 'sonner';

interface CreateHackathonForm {
  title: string;
  organizer: string;
  date: string;
  prizes: string;
  tags: string;
  image: string;
  description: string;
}

const Hackathons = () => {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [events, setEvents] = useState<Hackathon[]>([]);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [showRegisterDialog, setShowRegisterDialog] = useState(false);
  const [selectedHackathon, setSelectedHackathon] = useState<Hackathon | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [registrations, setRegistrations] = useState<{ [key: string]: boolean }>({});
  const [formData, setFormData] = useState<CreateHackathonForm>({
    title: '',
    organizer: '',
    date: '',
    prizes: '',
    tags: '',
    image: '',
    description: ''
  });
  const [registrationData, setRegistrationData] = useState({
    teamName: '',
    teamMembers: ''
  });

  useEffect(() => {
    const loadHackathons = async () => {
      const fetchedEvents = await fetchHackathons();
      setEvents(fetchedEvents);
      
      // Load registration status for each hackathon
      const regs: { [key: string]: boolean } = {};
      fetchedEvents.forEach(event => {
        regs[event.id] = isRegisteredForHackathon(event.id);
      });
      setRegistrations(regs);
    };
    
    loadHackathons();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleCreateHackathon = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user || user.role !== 'organizer') {
      toast.error('Only organizers can create hackathons');
      return;
    }

    if (!formData.title || !formData.organizer || !formData.date || !formData.prizes) {
      toast.error('Please fill in all required fields');
      return;
    }

    const newHackathon: Hackathon = {
      id: Date.now().toString(),
      title: formData.title,
      organizer: formData.organizer,
      date: formData.date,
      prizes: formData.prizes,
      tags: formData.tags.split(',').map(t => t.trim()),
      image: formData.image || 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&h=300&fit=crop',
      isLive: false
    };

    const updatedEvents = [newHackathon, ...events];
    setEvents(updatedEvents);
    sessionStorage.setItem('hackathons', JSON.stringify(updatedEvents));

    setFormData({
      title: '',
      organizer: '',
      date: '',
      prizes: '',
      tags: '',
      image: '',
      description: ''
    });
    setIsCreateOpen(false);
    toast.success('Hackathon created successfully! 🎉');
  };

  const handleRegisterClick = (hackathon: Hackathon) => {
    if (!user) {
      toast.error('Please log in to register for a hackathon');
      setLocation('/auth');
      return;
    }
    setSelectedHackathon(hackathon);
    setShowRegisterDialog(true);
  };

  const handleSubmitRegistration = () => {
    if (!selectedHackathon) return;
    
    setIsSubmitting(true);
    try {
      const teamMembers = registrationData.teamMembers
        ? registrationData.teamMembers.split(',').map(m => m.trim())
        : [];

      registerForHackathon(
        selectedHackathon.id,
        registrationData.teamName,
        teamMembers.length > 0 ? teamMembers : undefined
      );

      setRegistrations(prev => ({
        ...prev,
        [selectedHackathon.id]: true
      }));

      toast.success(`Registered for ${selectedHackathon.title}! 🎉`);
      setShowRegisterDialog(false);
      setRegistrationData({ teamName: '', teamMembers: '' });
      setSelectedHackathon(null);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to register');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelRegistration = (hackathonId: string) => {
    cancelHackathonRegistration(hackathonId);
    setRegistrations(prev => ({
      ...prev,
      [hackathonId]: false
    }));
    toast.success('Registration cancelled');
  };

  return (
    <Layout>
      {/* Non-Organizer Message */}
      {!user || user.role !== 'organizer' ? (
        <div className="mb-6 p-4 rounded-lg bg-blue/10 border border-blue/20 flex items-center justify-between">
          <div>
            <p className="font-semibold text-blue-400 mb-1">
              {!user ? 'Browsing as Guest' : `Viewing as ${user.role}`}
            </p>
            <p className="text-sm text-muted-foreground">
              {!user 
                ? 'Log in as an organizer to create and manage hackathons.'
                : 'Only organizers can create hackathons.'}
            </p>
          </div>
          {!user && (
            <button
              onClick={() => setLocation('/auth')}
              className="ml-4 flex items-center gap-2 px-4 py-2 bg-primary/20 hover:bg-primary/30 border border-primary/40 rounded-lg text-primary transition-colors whitespace-nowrap"
            >
              <LogIn className="w-4 h-4" />
              Login as Organizer
            </button>
          )}
        </div>
      ) : null}

      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Upcoming Hackathons</h1>
          <Dialog open={isCreateOpen} onOpenChange={isCreateOpen => {
            if (user?.role === 'organizer' || isCreateOpen === false) {
              setIsCreateOpen(isCreateOpen);
            }
          }}>
            <DialogTrigger asChild>
              <NeonButton 
                disabled={!user || user.role !== 'organizer'}
                onClick={() => {
                  if (!user) {
                    toast.error('Please log in as an organizer to create hackathons');
                  } else if (user.role !== 'organizer') {
                    toast.error('Only organizers can create hackathons');
                  }
                }}
              >
                <Plus className="w-4 h-4 mr-2" /> Create Hackathon
              </NeonButton>
            </DialogTrigger>
            <DialogContent className="bg-black/90 border-white/10 backdrop-blur-xl max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">Create New Hackathon</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreateHackathon} className="space-y-6 py-4" noValidate>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Hackathon Title *</Label>
                    <Input 
                      id="title"
                      placeholder="e.g. AI Innovation Challenge"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="bg-white/5 border-white/10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="organizer">Organizer Name *</Label>
                    <Input 
                      id="organizer"
                      placeholder="Your organization"
                      value={formData.organizer}
                      onChange={handleInputChange}
                      className="bg-white/5 border-white/10"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Event Date *</Label>
                    <Input 
                      id="date"
                      placeholder="Dec 15-17, 2025"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="bg-white/5 border-white/10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="prizes">Prize Pool *</Label>
                    <Input 
                      id="prizes"
                      placeholder="$50,000 in prizes"
                      value={formData.prizes}
                      onChange={handleInputChange}
                      className="bg-white/5 border-white/10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input 
                    id="tags"
                    placeholder="AI, Web3, Mobile, ML"
                    value={formData.tags}
                    onChange={handleInputChange}
                    className="bg-white/5 border-white/10"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Event Image URL</Label>
                  <Input 
                    id="image"
                    placeholder="https://..."
                    value={formData.image}
                    onChange={handleInputChange}
                    className="bg-white/5 border-white/10"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Event Description</Label>
                  <Textarea 
                    id="description"
                    placeholder="Tell participants about your hackathon..."
                    value={formData.description}
                    onChange={handleInputChange}
                    className="h-24 bg-white/5 border-white/10 resize-none"
                  />
                </div>

                <div className="flex justify-end gap-3">
                  <NeonButton type="button" variant="ghost" onClick={() => setIsCreateOpen(false)}>Cancel</NeonButton>
                  <NeonButton type="submit">Create Hackathon</NeonButton>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <GlassCard key={event.id} className="group overflow-hidden p-0 flex flex-col h-full">
              <div className="relative h-48 w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10" />
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 z-20">
                  {event.isLive && (
                    <span className="px-3 py-1 rounded-full bg-red-500 text-white text-xs font-bold animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]">
                      LIVE NOW
                    </span>
                  )}
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{event.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">by {event.organizer}</p>
                
                <div className="space-y-3 mb-6 flex-1">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Trophy className="w-4 h-4 text-yellow-500" />
                    <span>{event.prizes}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {event.tags.map(tag => (
                    <span key={tag} className="text-xs px-2 py-1 rounded bg-white/5 border border-white/10">
                      {tag}
                    </span>
                  ))}
                </div>

                {registrations[event.id] ? (
                  <div className="w-full flex flex-col gap-2">
                    <div className="w-full p-2 rounded-lg bg-green-500/10 border border-green-500/30 text-center">
                      <p className="text-sm font-bold text-green-400 flex items-center justify-center gap-1">
                        <CheckCircle className="w-4 h-4" /> Registered
                      </p>
                    </div>
                    <NeonButton 
                      variant="ghost" 
                      size="sm" 
                      className="w-full text-xs"
                      onClick={() => handleCancelRegistration(event.id)}
                    >
                      Cancel Registration
                    </NeonButton>
                  </div>
                ) : (
                  <NeonButton 
                    className="w-full mt-auto"
                    onClick={() => handleRegisterClick(event)}
                  >
                    Register Now
                  </NeonButton>
                )}
              </div>
            </GlassCard>
          ))}
        </div>

        {events.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No hackathons yet. Be the first to create one!</p>
            <NeonButton><Plus className="w-4 h-4 mr-2" /> Create Hackathon</NeonButton>
          </div>
        )}

        {/* Registration Dialog */}
        <Dialog open={showRegisterDialog} onOpenChange={setShowRegisterDialog}>
          <DialogContent className="bg-black/90 border-white/10 backdrop-blur-xl max-w-lg">
            <DialogHeader>
              <DialogTitle>Register for Hackathon</DialogTitle>
              <DialogDescription>
                {selectedHackathon?.title}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <Label htmlFor="team-name">Team Name (Optional)</Label>
                <Input
                  id="team-name"
                  placeholder="My Awesome Team"
                  value={registrationData.teamName}
                  onChange={(e) => setRegistrationData(prev => ({ ...prev, teamName: e.target.value }))}
                  className="bg-white/5 border-white/10"
                />
              </div>

              <div>
                <Label htmlFor="team-members">Team Members (Comma-separated, Optional)</Label>
                <Textarea
                  id="team-members"
                  placeholder="john@example.com, jane@example.com"
                  value={registrationData.teamMembers}
                  onChange={(e) => setRegistrationData(prev => ({ ...prev, teamMembers: e.target.value }))}
                  className="bg-white/5 border-white/10 resize-none h-20"
                />
              </div>
            </div>

            <DialogFooter>
              <NeonButton variant="ghost" onClick={() => setShowRegisterDialog(false)}>
                Cancel
              </NeonButton>
              <NeonButton 
                onClick={handleSubmitRegistration}
                disabled={isSubmitting}
              >
                {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Complete Registration
              </NeonButton>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default Hackathons;
