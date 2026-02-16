import React from 'react';
import { MapPin, Clock, DollarSign, Briefcase, Bookmark, ExternalLink, Eye, Target } from 'lucide-react';
import { Job } from '../data/jobs';

interface JobCardProps {
  job: Job;
  isSaved: boolean;
  matchScore: number;
  onToggleSave: (id: string) => void;
  onView: (job: Job) => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, isSaved, matchScore, onToggleSave, onView }) => {
  
  let scoreColorClass = 'bg-stone-100 text-stone-600 border-stone-200';
  if (matchScore >= 80) {
    scoreColorClass = 'bg-green-50 text-green-800 border-green-200';
  } else if (matchScore >= 60) {
    scoreColorClass = 'bg-amber-50 text-amber-800 border-amber-200';
  } else if (matchScore < 40) {
    scoreColorClass = 'bg-stone-50 text-stone-400 border-stone-100';
  }

  return (
    <div className="bg-white border border-stone-200 rounded-sm p-5 hover:shadow-lg hover:border-stone-300 transition-all duration-300 group relative flex flex-col h-full">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-serif text-lg font-bold text-stone-900 leading-tight group-hover:text-red-900 transition-colors line-clamp-2">
            {job.title}
          </h3>
          <p className="text-stone-600 font-medium text-sm mt-1">{job.company}</p>
        </div>
        
        <div className="flex flex-col items-end gap-2">
           {matchScore > 0 && (
             <div className={`flex items-center gap-1 px-2 py-0.5 rounded-sm border text-[10px] font-bold uppercase tracking-wider ${scoreColorClass}`}>
               <Target size={10} />
               {matchScore}
             </div>
           )}
           <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm border ${
             job.source === 'LinkedIn' ? 'bg-blue-50 text-blue-700 border-blue-100' :
             job.source === 'Naukri' ? 'bg-yellow-50 text-yellow-700 border-yellow-100' :
             'bg-stone-100 text-stone-600 border-stone-200'
           }`}>
             {job.source}
           </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-y-2 gap-x-4 mb-4 flex-grow content-start">
        <div className="flex items-center gap-1.5 text-xs text-stone-500">
          <MapPin size={14} className="text-red-900 shrink-0" />
          <span className="truncate">{job.location} ({job.mode})</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-stone-500">
          <Briefcase size={14} className="text-red-900 shrink-0" />
          <span className="truncate">{job.experience}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-stone-500">
          <DollarSign size={14} className="text-red-900 shrink-0" />
          <span className="truncate">{job.salaryRange}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-stone-500">
          <Clock size={14} className="text-red-900 shrink-0" />
          <span className="truncate">{job.postedDaysAgo === 0 ? 'Today' : `${job.postedDaysAgo}d ago`}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 pt-4 border-t border-stone-100 mt-auto">
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