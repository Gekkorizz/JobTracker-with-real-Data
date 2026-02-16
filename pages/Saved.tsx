import React, { useState, useEffect } from 'react';
import { Bookmark, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { jobs, Job } from '../data/jobs';
import { JobCard } from '../components/JobCard';
import { JobDetailsModal } from '../components/JobDetailsModal';

export const Saved: React.FC = () => {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('savedJobIds');
    if (stored) {
      setSavedIds(JSON.parse(stored));
    }
  }, []);

  const toggleSave = (id: string) => {
    const newIds = savedIds.filter(savedId => savedId !== id);
    setSavedIds(newIds);
    localStorage.setItem('savedJobIds', JSON.stringify(newIds));
  };

  // Find job objects for saved IDs
  const savedJobs = jobs.filter(job => savedIds.includes(job.id));

  return (
    <div className="w-full">
      <div className="border-b border-stone-200 pb-4 mb-8 flex justify-between items-end">
        <div>
          <h1 className="font-serif text-3xl font-bold text-stone-900 mb-2">Saved Opportunities</h1>
          <p className="text-stone-500">Review your shortlisted roles.</p>
        </div>
        {savedJobs.length > 0 && (
           <span className="bg-stone-100 text-stone-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
             {savedJobs.length} Saved
           </span>
        )}
      </div>

      {savedJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedJobs.map(job => (
            <JobCard 
              key={job.id} 
              job={job} 
              isSaved={true}
              onToggleSave={toggleSave}
              onView={setSelectedJob}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 bg-white border border-stone-100 rounded-sm shadow-sm text-center px-4">
          <Bookmark size={48} className="text-stone-200 mb-6 stroke-1" />
          <h3 className="font-serif text-xl text-stone-900 mb-2">Your collection is empty</h3>
          <p className="text-stone-400 max-w-sm mb-8 leading-relaxed">
            Jobs you bookmark from your dashboard will appear here. Build your shortlist to compare opportunities effectively.
          </p>
          <Link 
            to="/dashboard" 
            className="inline-flex items-center gap-2 bg-stone-900 text-stone-50 px-6 py-3 rounded-sm font-medium hover:bg-red-900 transition-colors"
          >
            <ArrowLeft size={16} />
            Browse Jobs
          </Link>
        </div>
      )}

      <JobDetailsModal 
        job={selectedJob} 
        onClose={() => setSelectedJob(null)} 
      />
    </div>
  );
};