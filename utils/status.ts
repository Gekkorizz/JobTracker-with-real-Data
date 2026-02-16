
export type JobStatus = 'Not Applied' | 'Applied' | 'Rejected' | 'Selected';

export interface StatusUpdate {
  jobId: string;
  title: string;
  company: string;
  status: JobStatus;
  date: string;
}

export const getStoredStatuses = (): Record<string, JobStatus> => {
  try {
    return JSON.parse(localStorage.getItem('jobTrackerStatuses') || '{}');
  } catch {
    return {};
  }
};

export const getStatusHistory = (): StatusUpdate[] => {
  try {
    return JSON.parse(localStorage.getItem('jobTrackerStatusHistory') || '[]');
  } catch {
    return [];
  }
};

export const updateJobStatus = (job: {id: string, title: string, company: string}, status: JobStatus) => {
  const statuses = getStoredStatuses();
  statuses[job.id] = status;
  localStorage.setItem('jobTrackerStatuses', JSON.stringify(statuses));

  const history = getStatusHistory();
  const update: StatusUpdate = {
    jobId: job.id,
    title: job.title,
    company: job.company,
    status,
    date: new Date().toISOString()
  };
  
  // Add to beginning
  history.unshift(update);
  // Keep last 50 entries
  const trimmed = history.slice(0, 50);
  localStorage.setItem('jobTrackerStatusHistory', JSON.stringify(trimmed));
  
  return statuses;
};
