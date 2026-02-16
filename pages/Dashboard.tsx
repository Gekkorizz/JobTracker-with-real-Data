import React, { useState, useEffect, useMemo } from 'react';
import { Search, Filter, SlidersHorizontal, ChevronDown, Zap, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { jobs, Job, locations, modes, experiences, sources } from '../data/jobs';
import { JobCard } from '../components/JobCard';
import { JobDetailsModal } from '../components/JobDetailsModal';
import { calculateMatchScore, getPreferences, Preferences } from '../utils/scoring';

export const Dashboard: React.FC = () => {
  // State for Filters
  const [keyword, setKeyword] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [modeFilter, setModeFilter] = useState('');
  const [expFilter, setExpFilter] = useState('');
  const [sourceFilter, setSourceFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('match-desc'); // default to match score

  const [showMatchesOnly, setShowMatchesOnly] = useState(false);
  const [preferences, setPreferences] = useState<Preferences | null>(null);

  // State for Saved Jobs (Local Storage)
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    const stored = localStorage.getItem('savedJobIds');
    return stored ? JSON.parse(stored) : [];
  });

  // State for Modal
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  useEffect(() => {
    const prefs = getPreferences();
    setPreferences(prefs);
    if (prefs) {
      setShowMatchesOnly(true); // Auto-enable if prefs exist
    }
  }, []);

  // Persist Saved IDs
  useEffect(() => {
    localStorage.setItem('savedJobIds', JSON.stringify(savedIds));
  }, [savedIds]);

  const toggleSave = (id: string) => {
    setSavedIds(prev => 
      prev.includes(id) ? prev.filter(savedId => savedId !== id) : [...prev, id]
    );
  };

  // Process jobs with scores
  const processedJobs = useMemo(() => {
    return jobs.map(job => ({
      ...job,
      score: calculateMatchScore(job, preferences)
    }));
  }, [preferences]);

  // Filtering Logic
  const filteredJobs = useMemo(() => {
    return processedJobs.filter(job => {
      // 1. Match Score Threshold
      if (showMatchesOnly && preferences) {
        if (job.score < preferences.minMatchScore) return false;
      }

      // 2. Standard Filters
      const matchKeyword = !keyword || job.title.toLowerCase().includes(keyword.toLowerCase()) || 
                           job.company.toLowerCase().includes(keyword.toLowerCase());
      const matchLocation = !locationFilter || job.location === locationFilter;
      const matchMode = !modeFilter || job.mode === modeFilter;
      const matchExp = !expFilter || job.experience === expFilter;
      const matchSource = !sourceFilter || job.source === sourceFilter;

      return matchKeyword && matchLocation && matchMode && matchExp && matchSource;
    }).sort((a, b) => {
      if (sortOrder === 'match-desc') return b.score - a.score;
      if (sortOrder === 'latest') return a.postedDaysAgo - b.postedDaysAgo;
      if (sortOrder === 'oldest') return b.postedDaysAgo - a.postedDaysAgo;
      return 0;
    });
  }, [processedJobs, keyword, locationFilter, modeFilter, expFilter, sourceFilter, sortOrder, showMatchesOnly, preferences]);

  return (
    <div className="space-y-8">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-stone-200 pb-6">
        <div>
          <h1 className="font-serif text-3xl font-bold text-stone-900 mb-2">Job Feed</h1>
          <p className="text-stone-500">Discover precision-matched opportunities.</p>
        </div>
        <div className="flex items-center gap-4">
           {!preferences ? (
             <Link to="/settings" className="flex items-center gap-2 text-sm text-red-800 bg-red-50 px-3 py-1.5 rounded-sm border border-red-100 hover:bg-red-100 transition-colors">
               <AlertCircle size={14} />
               Set preferences to enable scoring
             </Link>
           ) : (
             <label className="flex items-center gap-2 cursor-pointer select-none">
               <div className="relative">
                 <input 
                    type="checkbox" 
                    className="peer sr-only" 
                    checked={showMatchesOnly}
                    onChange={() => setShowMatchesOnly(!showMatchesOnly)}
                 />
                 <div className="w-11 h-6 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-900"></div>
               </div>
               <span className="text-sm font-medium text-stone-700">Show Matches Only ({preferences.minMatchScore}+)</span>
             </label>
           )}
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
              <option value="match-desc">Match Score</option>
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
              matchScore={job.score}
              onToggleSave={toggleSave}
              onView={setSelectedJob}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Filter size={48} className="text-stone-200 mb-4" />
          <h3 className="font-serif text-xl text-stone-900 mb-2">No matching jobs found</h3>
          <p className="text-stone-500 max-w-md mx-auto">
            {preferences && showMatchesOnly 
              ? `No jobs met your match threshold of ${preferences.minMatchScore}. Try lowering it in Settings or adjusting your filters.` 
              : "Try adjusting your filters to see more results."}
          </p>
          <div className="flex gap-4 mt-6">
             <button 
              onClick={() => {
                setKeyword('');
                setLocationFilter('');
                setModeFilter('');
                setExpFilter('');
                setSourceFilter('');
                setShowMatchesOnly(false);
              }}
              className="text-stone-600 font-medium hover:text-stone-900 transition-colors"
            >
              Clear filters
            </button>
            {preferences && showMatchesOnly && (
               <Link 
                 to="/settings"
                 className="text-red-900 font-medium border-b border-red-900/30 hover:border-red-900 pb-0.5 transition-colors"
               >
                 Adjust threshold &rarr;
               </Link>
            )}
          </div>
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