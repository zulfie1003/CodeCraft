// Job Applications API
export interface JobApplication {
  id: string;
  jobId: string;
  userId: string;
  jobTitle: string;
  company: string;
  appliedAt: string;
  status: 'applied' | 'reviewing' | 'interview' | 'rejected' | 'offer';
  resumeUrl?: string;
  coverLetter?: string;
  notes?: string;
}

// Store applications in sessionStorage
const APPLICATIONS_KEY = 'codecraft_applications';

export const getApplications = (): JobApplication[] => {
  try {
    const data = sessionStorage.getItem(APPLICATIONS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const applyForJob = (jobId: string, jobTitle: string, company: string, resumeUrl?: string, coverLetter?: string): JobApplication => {
  const applications = getApplications();
  
  // Check if already applied
  const existing = applications.find(app => app.jobId === jobId);
  if (existing) {
    throw new Error('You have already applied for this job');
  }

  const newApplication: JobApplication = {
    id: `app_${Date.now()}`,
    jobId,
    userId: 'current_user', // In real app, get from AuthContext
    jobTitle,
    company,
    appliedAt: new Date().toISOString(),
    status: 'applied',
    resumeUrl,
    coverLetter
  };

  applications.push(newApplication);
  sessionStorage.setItem(APPLICATIONS_KEY, JSON.stringify(applications));
  
  return newApplication;
};

export const getApplicationStatus = (jobId: string): JobApplication | undefined => {
  const applications = getApplications();
  return applications.find(app => app.jobId === jobId);
};

export const updateApplicationStatus = (applicationId: string, status: JobApplication['status'], notes?: string): JobApplication => {
  const applications = getApplications();
  const app = applications.find(a => a.id === applicationId);
  
  if (!app) {
    throw new Error('Application not found');
  }

  app.status = status;
  if (notes) {
    app.notes = notes;
  }
  
  sessionStorage.setItem(APPLICATIONS_KEY, JSON.stringify(applications));
  return app;
};

export const withdrawApplication = (applicationId: string): void => {
  const applications = getApplications();
  const filtered = applications.filter(a => a.id !== applicationId);
  sessionStorage.setItem(APPLICATIONS_KEY, JSON.stringify(filtered));
};
