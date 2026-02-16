import React, { useState, useEffect, useMemo } from 'react';
import { Search, Filter, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { jobs, Job } from '../data/jobs';
import { JobCard } from '../components/JobCard';
import { JobDetailsModal } from '../components/JobDetailsModal';

export const Dashboard: React.FC = () => {
  // State for Filters
  const [keyword, setKeyword] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [modeFilter, setModeFilter] = useState('');
  const [expFilter, setExpFilter] = useState('');
  const [sourceFilter, setSourceFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('latest'); // latest, salary-high, salary-low

  // State for Saved Jobs (Local Storage)
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    const stored = localStorage.getItem('savedJobIds');
    return stored ? JSON.parse(stored) : [];
  });

  // State for Modal
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  // Persist Saved IDs
  useEffect(() => {
    localStorage.setItem('savedJobIds', JSON.stringify(savedIds));
  }, [savedIds]);

  const toggleSave = (id: string) => {
    setSavedIds(prev => 
      prev.includes(id) ? prev.filter(savedId => savedId !== id) : [...prev, id]
    );
  };

  // Derived Filters Lists
  const locations = useMemo(() => Array.from(new Set(jobs.map(j => j.location))).sort(), []);
  const modes = useMemo(() => Array.from(new Set(jobs.map(j => j.mode))).sort(), []);
  const experiences = useMemo(() => Array.from(new Set(jobs.map(j => j.experience))).sort(), []);
  const sources = useMemo(() => Array.from(new Set(jobs.map(j => j.source))).sort(), []);

  // Filtering Logic
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchKeyword = job.title.toLowerCase().includes(keyword.toLowerCase()) || 
                           job.company.toLowerCase().includes(keyword.toLowerCase());
      const matchLocation = locationFilter ? job.location === locationFilter : true;
      const matchMode = modeFilter ? job.mode === modeFilter : true;
      const matchExp = expFilter ? job.experience === expFilter : true;
      const matchSource = sourceFilter ? job.source === sourceFilter : true;

      return matchKeyword && matchLocation && matchMode && matchExp && matchSource;
    }).sort((a, b) => {
      if (sortOrder === 'latest') {
        return a.postedDaysAgo - b.postedDaysAgo;
      }
      // Simple heuristic for salary sort (parsing range strings is complex, mocking simple sort)
      if (sortOrder === 'oldest') {
        return b.postedDaysAgo - a.postedDaysAgo;
      }
      return 0;
    });
  }, [keyword, locationFilter, modeFilter, expFilter, sourceFilter, sortOrder]);

  return (
    <div className="space-y-8">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <h1 className="font-serif text-3xl font-bold text-stone-900 mb-2">Job Feed</h1>
          <p className="text-stone-500">Discover precision-matched opportunities.</p>
        </div>
        <div className="text-sm font-medium text-stone-400">
          Showing {filteredJobs.length} results
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 border border-stone-200 rounded-sm shadow-sm space-y-4">
        {/* Top Row: Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by role or company..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-stone-50 border border-stone-200 rounded-sm focus:outline-none focus:border-red-900 focus:ring-1 focus:ring-red-900 text-stone-800 placeholder:text-stone-400"
          />
        </div>

        {/* Bottom Row: Dropdowns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          
          <div className="relative group">
            <select 
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="w-full appearance-none bg-white border border-stone-200 text-stone-700 text-sm px-3 py-2 rounded-sm focus:outline-none focus:border-stone-400 cursor-pointer hover:border-stone-300"
            >
              <option value="">All Locations</option>
              {locations.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
          </div>

          <div className="relative group">
            <select 
              value={modeFilter}
              onChange={(e) => setModeFilter(e.target.value)}
              className="w-full appearance-none bg-white border border-stone-200 text-stone-700 text-sm px-3 py-2 rounded-sm focus:outline-none focus:border-stone-400 cursor-pointer hover:border-stone-300"
            >
              <option value="">Any Mode</option>
              {modes.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
          </div>

          <div className="relative group">
            <select 
              value={expFilter}
              onChange={(e) => setExpFilter(e.target.value)}
              className="w-full appearance-none bg-white border border-stone-200 text-stone-700 text-sm px-3 py-2 rounded-sm focus:outline-none focus:border-stone-400 cursor-pointer hover:border-stone-300"
            >
              <option value="">Experience</option>
              {experiences.map(e => <option key={e} value={e}>{e}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
          </div>

          <div className="relative group">
            <select 
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className="w-full appearance-none bg-white border border-stone-200 text-stone-700 text-sm px-3 py-2 rounded-sm focus:outline-none focus:border-stone-400 cursor-pointer hover:border-stone-300"
            >
              <option value="">All Sources</option>
              {sources.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
          </div>

          <div className="relative group">
            <select 
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full appearance-none bg-stone-100 border border-stone-200 text-stone-900 font-medium text-sm px-3 py-2 rounded-sm focus:outline-none focus:border-stone-400 cursor-pointer"
            >
              <option value="latest">Latest First</option>
              <option value="oldest">Oldest First</option>
            </select>
            <SlidersHorizontal size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-500 pointer-events-none" />
          </div>

        </div>
      </div>

      {/* Results Grid */}
      {filteredJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredJobs.map(job => (
            <JobCard 
              key={job.id} 
              job={job} 
              isSaved={savedIds.includes(job.id)}
              onToggleSave={toggleSave}
              onView={setSelectedJob}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Filter size={48} className="text-stone-200 mb-4" />
          <h3 className="font-serif text-xl text-stone-900 mb-2">No jobs found</h3>
          <p className="text-stone-500">Try adjusting your filters to see more results.</p>
          <button 
            onClick={() => {
              setKeyword('');
              setLocationFilter('');
              setModeFilter('');
              setExpFilter('');
              setSourceFilter('');
            }}
            className="mt-6 text-red-900 font-medium border-b border-red-900/30 hover:border-red-900 transition-colors"
          >
            Clear all filters
          </button>
        </div>
      )}

      {/* Modal */}
      <JobDetailsModal 
        job={selectedJob} 
        onClose={() => setSelectedJob(null)} 
      />
    </div>
  );
};