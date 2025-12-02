import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import GlassCard from '@/components/GlassCard';
import NeonButton from '@/components/NeonButton';
import { fetchHackathons, Hackathon } from '@/api/hackathons';
import { Calendar, Trophy, Tag } from 'lucide-react';

const Hackathons = () => {
  const [events, setEvents] = useState<Hackathon[]>([]);

  useEffect(() => {
    fetchHackathons().then(setEvents);
  }, []);

  return (
    <Layout>
      <div className="space-y-8">
        <h1 className="text-3xl font-bold">Upcoming Hackathons</h1>

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

                <NeonButton className="w-full mt-auto">Register Now</NeonButton>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Hackathons;
