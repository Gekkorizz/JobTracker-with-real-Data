import React from 'react';
import { X, MapPin, Briefcase, DollarSign, ExternalLink } from 'lucide-react';
import { Job } from '../data/jobs';

interface JobDetailsModalProps {
  job: Job | null;
  onClose: () => void;
}

export const JobDetailsModal: React.FC<JobDetailsModalProps> = ({ job, onClose }) => {
  if (!job) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white w-full max-w-2xl rounded-sm shadow-xl overflow-hidden animate-fade-in-up" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-start p-6 border-b border-stone-100 bg-stone-50/50">
          <div>
            <h2 className="font-serif text-2xl font-bold text-stone-900 mb-1">{job.title}</h2>
            <div className="flex items-center gap-2 text-stone-600">
              <span className="font-semibold">{job.company}</span>
              <span className="text-stone-300">•</span>
              <span className="text-sm">{job.location}</span>
            </div>
          </div>
          <button onClick={onClose} className="text-stone-400 hover:text-stone-900 transition-colors p-1">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="p-3 bg-stone-50 rounded-sm border border-stone-100">
              <div className="text-xs text-stone-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                <MapPin size={12} /> Work Mode
              </div>
              <div className="font-medium text-stone-900">{job.mode}</div>
            </div>
            <div className="p-3 bg-stone-50 rounded-sm border border-stone-100">
              <div className="text-xs text-stone-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                <Briefcase size={12} /> Experience
              </div>
              <div className="font-medium text-stone-900">{job.experience}</div>
            </div>
            <div className="p-3 bg-stone-50 rounded-sm border border-stone-100">
              <div className="text-xs text-stone-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                <DollarSign size={12} /> Salary
              </div>
              <div className="font-medium text-stone-900">{job.salaryRange}</div>
            </div>
          </div>

          <div>
            <h4 className="font-serif font-bold text-lg text-stone-900 mb-2">Description</h4>
            <p className="text-stone-600 leading-relaxed whitespace-pre-line text-sm md:text-base">
              {job.description}
            </p>
          </div>

          <div>
            <h4 className="font-serif font-bold text-lg text-stone-900 mb-2">Skills & Requirements</h4>
            <div className="flex flex-wrap gap-2">
              {job.skills.map(skill => (
                <span key={skill} className="px-3 py-1 bg-stone-100 text-stone-700 text-sm font-medium rounded-full border border-stone-200">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-stone-100 flex justify-end gap-3 bg-stone-50/30">
          <button onClick={onClose} className="px-5 py-2.5 text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors">
            Close
          </button>
          <a 
            href={job.applyUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-red-900 text-white px-6 py-2.5 rounded-sm text-sm font-medium hover:bg-red-800 transition-colors shadow-sm"
          >
            Apply Now <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </div>
  );
};