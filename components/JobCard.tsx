import React from 'react';
import { MapPin, Clock, DollarSign, Briefcase, Bookmark, ExternalLink, Eye } from 'lucide-react';
import { Job } from '../data/jobs';

interface JobCardProps {
  job: Job;
  isSaved: boolean;
  onToggleSave: (id: string) => void;
  onView: (job: Job) => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, isSaved, onToggleSave, onView }) => {
  return (
    <div className="bg-white border border-stone-200 rounded-sm p-5 hover:shadow-lg hover:border-stone-300 transition-all duration-300 group relative">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-serif text-lg font-bold text-stone-900 leading-tight group-hover:text-red-900 transition-colors">
            {job.title}
          </h3>
          <p className="text-stone-600 font-medium text-sm mt-1">{job.company}</p>
        </div>
        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-sm border ${
          job.source === 'LinkedIn' ? 'bg-blue-50 text-blue-700 border-blue-100' :
          job.source === 'Naukri' ? 'bg-yellow-50 text-yellow-700 border-yellow-100' :
          'bg-stone-100 text-stone-600 border-stone-200'
        }`}>
          {job.source}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-y-2 gap-x-4 mb-4">
        <div className="flex items-center gap-1.5 text-xs text-stone-500">
          <MapPin size={14} className="text-red-900" />
          <span>{job.location} ({job.mode})</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-stone-500">
          <Briefcase size={14} className="text-red-900" />
          <span>{job.experience}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-stone-500">
          <DollarSign size={14} className="text-red-900" />
          <span>{job.salaryRange}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-stone-500">
          <Clock size={14} className="text-red-900" />
          <span>{job.postedDaysAgo === 0 ? 'Today' : `${job.postedDaysAgo}d ago`}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-4 border-t border-stone-100 mt-2">
        <button 
          onClick={() => onView(job)}
          className="flex-1 flex items-center justify-center gap-2 bg-stone-50 hover:bg-stone-100 text-stone-700 text-xs font-semibold py-2 rounded-sm transition-colors border border-stone-200"
        >
          <Eye size={14} />
          View
        </button>
        <button 
          onClick={() => onToggleSave(job.id)}
          className={`flex-1 flex items-center justify-center gap-2 text-xs font-semibold py-2 rounded-sm transition-colors border ${
            isSaved 
              ? 'bg-red-50 text-red-900 border-red-100 hover:bg-red-100' 
              : 'bg-stone-50 hover:bg-stone-100 text-stone-700 border-stone-200'
          }`}
        >
          <Bookmark size={14} className={isSaved ? 'fill-current' : ''} />
          {isSaved ? 'Saved' : 'Save'}
        </button>
        <a 
          href={job.applyUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 bg-stone-900 hover:bg-red-900 text-stone-50 text-xs font-semibold py-2 rounded-sm transition-colors"
        >
          Apply <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
};