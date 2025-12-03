// Mentor Connections API
export interface MentorReview {
  id: string;
  rating: number;
  comment: string;
  userId: string;
  userName: string;
  date: string;
}

export interface MentorProfile {
  id: string;
  name: string;
  avatar: string;
  expertise: string[];
  hourlyRate: number;
  rating: number;
  reviews: number;
  bio: string;
  isAvailable: boolean;
  responseTime: string;
  totalSessions?: number;
  studentsSessions?: number;
  reviews_list?: MentorReview[];
}

export interface MentorSession {
  id: string;
  mentorId: string;
  mentorName: string;
  userId: string;
  scheduledAt: string;
  duration: number; // in minutes
  topic: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
  review?: MentorReview;
}

const MENTORS_KEY = 'codecraft_mentors';
const SESSIONS_KEY = 'codecraft_mentor_sessions';

const DEFAULT_MENTORS: MentorProfile[] = [
  {
    id: 'mentor_1',
    name: 'Sarah Chen',
    avatar: 'https://ui-avatars.com/api/?name=Sarah+Chen&background=00f3ff&color=fff',
    expertise: ['React', 'TypeScript', 'System Design'],
    hourlyRate: 50,
    rating: 4.9,
    reviews: 156,
    totalSessions: 500,
    studentsSessions: 156,
    bio: 'Senior Engineer at Google with 10+ years experience. Specializes in scalable frontend architecture.',
    isAvailable: true,
    responseTime: '< 1 hour',
    reviews_list: [
      { id: '1', rating: 5, comment: 'Excellent mentor! Very clear explanations.', userId: 'u1', userName: 'Alex', date: '2024-11-15' },
      { id: '2', rating: 4.9, comment: 'Helped me ace system design interviews.', userId: 'u2', userName: 'Jordan', date: '2024-11-10' }
    ]
  },
  {
    id: 'mentor_2',
    name: 'Alex Rodriguez',
    avatar: 'https://ui-avatars.com/api/?name=Alex+Rodriguez&background=bc13fe&color=fff',
    expertise: ['Node.js', 'MongoDB', 'DevOps'],
    hourlyRate: 45,
    rating: 4.7,
    reviews: 98,
    totalSessions: 280,
    studentsSessions: 98,
    bio: 'Full Stack Developer, ex-Amazon. Expert in backend optimization and deployment.',
    isAvailable: true,
    responseTime: '< 2 hours',
    reviews_list: [
      { id: '3', rating: 4.8, comment: 'Great DevOps guidance!', userId: 'u3', userName: 'Taylor', date: '2024-11-12' }
    ]
  },
  {
    id: 'mentor_3',
    name: 'Priya Patel',
    avatar: 'https://ui-avatars.com/api/?name=Priya+Patel&background=ff0055&color=fff',
    expertise: ['DSA', 'Competitive Programming', 'AI/ML'],
    hourlyRate: 40,
    rating: 4.8,
    reviews: 203,
    totalSessions: 610,
    studentsSessions: 203,
    bio: 'Data Scientist at Meta, IIT Delhi Alumna. Strong background in algorithms.',
    isAvailable: true,
    responseTime: '< 30 min',
    reviews_list: [
      { id: '4', rating: 5, comment: 'Best for competitive coding prep!', userId: 'u4', userName: 'Morgan', date: '2024-11-18' },
      { id: '5', rating: 4.8, comment: 'Very knowledgeable about ML concepts.', userId: 'u5', userName: 'Casey', date: '2024-11-08' }
    ]
  }
];

export const getMentors = async (): Promise<MentorProfile[]> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  return DEFAULT_MENTORS;
};

export const bookMentorSession = (mentorId: string, mentorName: string, scheduledAt: string, duration: number, topic: string): MentorSession => {
  const sessions = getSessions();
  
  const newSession: MentorSession = {
    id: `session_${Date.now()}`,
    mentorId,
    mentorName,
    userId: 'current_user',
    scheduledAt,
    duration,
    topic,
    status: 'scheduled'
  };

  sessions.push(newSession);
  sessionStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
  
  return newSession;
};

export const getSessions = (): MentorSession[] => {
  try {
    const data = sessionStorage.getItem(SESSIONS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const completeMentorSession = (sessionId: string, notes?: string): MentorSession => {
  const sessions = getSessions();
  const session = sessions.find(s => s.id === sessionId);
  
  if (!session) {
    throw new Error('Session not found');
  }

  session.status = 'completed';
  if (notes) {
    session.notes = notes;
  }
  
  sessionStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
  return session;
};

export const cancelMentorSession = (sessionId: string): void => {
  const sessions = getSessions();
  const session = sessions.find(s => s.id === sessionId);
  
  if (session) {
    session.status = 'cancelled';
    sessionStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
  }
};
