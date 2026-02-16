import { Job } from '../data/jobs';

export interface Preferences {
  roleKeywords: string[];
  locations: string[];
  modes: string[];
  experience: string;
  skills: string[];
  minMatchScore: number;
}

export const getPreferences = (): Preferences | null => {
  const stored = localStorage.getItem('jobTrackerPreferences');
  try {
    return stored ? JSON.parse(stored) : null;
  } catch (e) {
    return null;
  }
};

export const calculateMatchScore = (job: Job, prefs: Preferences | null): number => {
  if (!prefs) return 0;
  
  let score = 0;

  // +25 if any roleKeyword appears in job.title (case-insensitive)
  const titleLower = job.title.toLowerCase();
  if (prefs.roleKeywords.some(k => k.trim() && titleLower.includes(k.trim().toLowerCase()))) {
    score += 25;
  }

  // +15 if any roleKeyword appears in job.description
  const descLower = job.description.toLowerCase();
  if (prefs.roleKeywords.some(k => k.trim() && descLower.includes(k.trim().toLowerCase()))) {
    score += 15;
  }

  // +15 if job.location matches preferredLocations
  if (prefs.locations.includes(job.location)) {
    score += 15;
  }

  // +10 if job.mode matches preferredMode
  if (prefs.modes.includes(job.mode)) {
    score += 10;
  }

  // +10 if job.experience matches experienceLevel
  if (job.experience === prefs.experience) {
    score += 10;
  }

  // +15 if overlap between job.skills and user.skills (any match)
  const jobSkillsLower = job.skills.map(s => s.toLowerCase());
  if (prefs.skills.some(s => s.trim() && jobSkillsLower.includes(s.trim().toLowerCase()))) {
    score += 15;
  }

  // +5 if postedDaysAgo <= 2
  if (job.postedDaysAgo <= 2) {
    score += 5;
  }

  // +5 if source is LinkedIn
  if (job.source === 'LinkedIn') {
    score += 5;
  }

  // Cap score at 100
  return Math.min(score, 100);
};