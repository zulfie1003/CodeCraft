// Hackathon Registrations & Organizer API
export interface HackathonRegistration {
  id: string;
  hackathonId: string;
  userId: string;
  registeredAt: string;
  teamName?: string;
  teamMembers?: string[];
  status: 'registered' | 'checkedin' | 'completed';
}

const HACKATHON_REGISTRATIONS_KEY = 'codecraft_hackathon_registrations';
const USER_HACKATHONS_KEY = 'codecraft_user_hackathons';

// Get user's created hackathons
export const getUserHackathons = (): any[] => {
  try {
    const data = sessionStorage.getItem(USER_HACKATHONS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

// Create new hackathon (organizer only)
export const createHackathon = (title: string, organizer: string, date: string, prizes: string, description: string, tags: string[]): any => {
  const hackathons = getUserHackathons();
  
  const newHackathon = {
    id: `hackathon_${Date.now()}`,
    title,
    organizer,
    date,
    prizes,
    description,
    image: `https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80`,
    tags,
    isLive: false,
    createdAt: new Date().toISOString(),
    registrations: 0
  };

  hackathons.push(newHackathon);
  sessionStorage.setItem(USER_HACKATHONS_KEY, JSON.stringify(hackathons));
  
  return newHackathon;
};

// Register for hackathon
export const registerForHackathon = (hackathonId: string, teamName?: string, teamMembers?: string[]): HackathonRegistration => {
  const registrations = getHackathonRegistrations();
  
  // Check if already registered
  const existing = registrations.find(r => r.hackathonId === hackathonId);
  if (existing) {
    throw new Error('You are already registered for this hackathon');
  }

  const newRegistration: HackathonRegistration = {
    id: `reg_${Date.now()}`,
    hackathonId,
    userId: 'current_user',
    registeredAt: new Date().toISOString(),
    teamName,
    teamMembers,
    status: 'registered'
  };

  registrations.push(newRegistration);
  sessionStorage.setItem(HACKATHON_REGISTRATIONS_KEY, JSON.stringify(registrations));
  
  return newRegistration;
};

// Get all registrations
export const getHackathonRegistrations = (): HackathonRegistration[] => {
  try {
    const data = sessionStorage.getItem(HACKATHON_REGISTRATIONS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

// Check if user is registered for hackathon
export const isRegisteredForHackathon = (hackathonId: string): boolean => {
  const registrations = getHackathonRegistrations();
  return registrations.some(r => r.hackathonId === hackathonId);
};

// Cancel hackathon registration
export const cancelHackathonRegistration = (hackathonId: string): void => {
  const registrations = getHackathonRegistrations();
  const filtered = registrations.filter(r => r.hackathonId !== hackathonId);
  sessionStorage.setItem(HACKATHON_REGISTRATIONS_KEY, JSON.stringify(filtered));
};
