import React, { useState, useEffect } from 'react';
import { Mail, Copy, Send, RefreshCw, AlertCircle, Calendar, History, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { jobs, Job } from '../data/jobs';
import { calculateMatchScore, getPreferences, Preferences } from '../utils/scoring';
import { getStatusHistory, StatusUpdate } from '../utils/status';

type ScoredJob = Job & { score: number };

export const Digest: React.FC = () => {
  const [digest, setDigest] = useState<ScoredJob[] | null>(null);
  const [preferences, setPreferences] = useState<Preferences | null>(null);
  const [loading, setLoading] = useState(false);
  const [dateStr, setDateStr] = useState('');
  const [statusHistory, setStatusHistory] = useState<StatusUpdate[]>([]);

  useEffect(() => {
    // 1. Load Preferences
    const prefs = getPreferences();
    setPreferences(prefs);

    // 2. Determine Today's Key
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const keyDate = `${yyyy}-${mm}-${dd}`;
    setDateStr(today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));

    const storageKey = `jobTrackerDigest_${keyDate}`;

    // 3. Check for existing digest
    const storedDigest = localStorage.getItem(storageKey);
    if (storedDigest) {
      setDigest(JSON.parse(storedDigest));
    }

    // 4. Load Status History
    setStatusHistory(getStatusHistory());
  }, []);

  const generateDigest = () => {
    if (!preferences) return;

    setLoading(true);

    // Simulate API/Processing delay
    setTimeout(() => {
      // Logic:
      // 1. Score all jobs
      // 2. Filter by minMatchScore
      // 3. Sort by Score DESC, then PostedDaysAgo ASC
      // 4. Slice top 10

      const scoredJobs: ScoredJob[] = jobs.map(job => ({
        ...job,
        score: calculateMatchScore(job, preferences)
      }));

      const filtered = scoredJobs.filter(j => j.score >= preferences.minMatchScore);

      const sorted = filtered.sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return a.postedDaysAgo - b.postedDaysAgo;
      });

      const top10 = sorted.slice(0, 10);

      // Save
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const dd = String(today.getDate()).padStart(2, '0');
      const keyDate = `${yyyy}-${mm}-${dd}`;
      const storageKey = `jobTrackerDigest_${keyDate}`;

      localStorage.setItem(storageKey, JSON.stringify(top10));
      setDigest(top10);
      setLoading(false);
    }, 800);
  };

  const copyToClipboard = () => {
    if (!digest) return;
    const text = digest.map(j => 
      `Role: ${j.title}\nCompany: ${j.company}\nLocation: ${j.location} (${j.mode})\nMatch Score: ${j.score}/100\nLink: ${j.applyUrl}\n`
    ).join('\n---\n\n');
    
    navigator.clipboard.writeText(`My 9AM Job Digest - ${dateStr}\n\n${text}`);
    alert('Digest copied to clipboard!');
  };

  const createEmailDraft = () => {
    if (!digest) return;
    const subject = encodeURIComponent("My 9AM Job Digest");
    const bodyContent = digest.map(j => 
      `${j.title} at ${j.company} (${j.score}% Match)%0D%0A${j.location} | ${j.mode}%0D%0ALink: ${j.applyUrl}%0D%0A`
    ).join('%0D%0A');
    
    const body = encodeURIComponent(`Here is my daily job digest for ${dateStr}:\n\n`) + bodyContent;
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  // Helper to format history date
  const formatHistoryDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  // RENDER STATES

  // 1. No Preferences
  if (!preferences) {
    return (
       <div className="w-full max-w-4xl mx-auto py-20 text-center">
         <div className="inline-block p-4 bg-stone-100 rounded-full mb-6">
           <AlertCircle size={32} className="text-stone-400" />
         </div>
         <h2 className="font-serif text-2xl text-stone-900 mb-4">Preferences Required</h2>
         <p className="text-stone-500 max-w-md mx-auto mb-8">
           To generate a personalized daily digest, we need to know what you are looking for.
         </p>
         <Link to="/settings" className="bg-stone-900 text-stone-50 px-6 py-3 rounded-sm font-medium hover:bg-red-900 transition-colors">
           Configure Preferences
         </Link>
       </div>
    );
  }

  // 2. Not Generated Yet (and not loading)
  if (!digest && !loading) {
    return (
      <div className="w-full max-w-4xl mx-auto py-24 px-6 text-center">
        <div className="bg-red-50 p-6 rounded-full mb-8 inline-block">
           <Mail size={48} className="text-red-900" />
        </div>
        <h1 className="font-serif text-4xl text-stone-900 mb-4">Daily Digest</h1>
        <p className="text-stone-500 max-w-lg mx-auto mb-10 leading-relaxed">
          Your personalized morning briefing. We scan newly posted roles and curate the top 10 matches based on your specific criteria.
        </p>
        
        <button 
          onClick={generateDigest}
          className="group inline-flex items-center gap-3 bg-red-900 text-white px-8 py-4 rounded-sm text-lg font-medium shadow-lg shadow-red-900/10 hover:bg-red-800 hover:shadow-xl hover:translate-y-[-1px] transition-all"
        >
          <RefreshCw size={20} className="group-hover:rotate-180 transition-transform duration-500" />
          Generate Today's 9AM Digest
        </button>
        
        <p className="mt-8 text-xs text-stone-400 font-mono">
          (Simulated: Demo Mode)
        </p>
      </div>
    );
  }

  // 3. Loading
  if (loading) {
     return (
       <div className="w-full h-[60vh] flex flex-col items-center justify-center">
         <div className="w-12 h-12 border-4 border-stone-200 border-t-red-900 rounded-full animate-spin mb-6"></div>
         <p className="font-serif text-xl text-stone-600 animate-pulse">Curating your feed...</p>
       </div>
     );
  }

  // 4. Empty Digest (No matches found)
  if (digest && digest.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto py-20 text-center">
         <h2 className="font-serif text-2xl text-stone-900 mb-4">No matching roles today</h2>
         <p className="text-stone-500 max-w-md mx-auto mb-8">
           We couldn't find any jobs matching your strict criteria (Score &ge; {preferences.minMatchScore}). Try adjusting your preferences or checking back tomorrow.
         </p>
         <Link to="/settings" className="text-red-900 font-medium border-b border-red-900/30 hover:border-red-900 pb-0.5 transition-colors">
            Adjust Preferences
         </Link>
         <button 
           onClick={() => setDigest(null)}
           className="block mx-auto mt-6 text-sm text-stone-400 hover:text-stone-600"
         >
           Reset Digest
         </button>
      </div>
    );
  }

  // 5. Display Digest
  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col lg:flex-row gap-8 items-start">
      
      {/* Main Digest Column */}
      <div className="flex-1 w-full">
        {/* Tools Bar */}
        <div className="flex justify-between items-center mb-8">
          <Link to="/dashboard" className="text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors">
            &larr; Back to Dashboard
          </Link>
          <div className="flex gap-3">
            <button onClick={copyToClipboard} className="flex items-center gap-2 px-4 py-2 bg-white border border-stone-200 text-stone-700 rounded-sm text-sm font-medium hover:bg-stone-50 transition-colors">
              <Copy size={14} /> Copy
            </button>
            <button onClick={createEmailDraft} className="flex items-center gap-2 px-4 py-2 bg-stone-900 text-white rounded-sm text-sm font-medium hover:bg-stone-800 transition-colors">
              <Send size={14} /> Email Draft
            </button>
          </div>
        </div>

        {/* Email Container */}
        <div className="bg-white border border-stone-200 shadow-sm rounded-sm overflow-hidden">
          
          {/* Header */}
          <div className="bg-stone-50 border-b border-stone-100 p-8 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-red-900 rounded-full text-white mb-4">
              <span className="font-serif font-bold text-xl">J</span>
            </div>
            <h1 className="font-serif text-2xl md:text-3xl font-bold text-stone-900 mb-2">
              Top 10 Jobs For You
            </h1>
            <div className="flex items-center justify-center gap-2 text-stone-500 text-sm font-medium uppercase tracking-wider">
              <Calendar size={14} />
              {dateStr}
            </div>
          </div>

          {/* Content */}
          <div className="p-8 space-y-8">
            {digest && digest.map((job, index) => (
              <div key={job.id} className="group flex flex-col sm:flex-row gap-4 sm:items-start justify-between pb-8 border-b border-stone-100 last:border-0 last:pb-0">
                <div className="space-y-1">
                  <div className="flex items-baseline gap-3">
                     <h3 className="font-serif text-lg font-bold text-stone-900 group-hover:text-red-900 transition-colors">
                       {index + 1}. {job.title}
                     </h3>
                     {/* Score Badge */}
                     <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-sm ${
                        job.score && job.score >= 80 ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                     }`}>
                       {job.score}% Match
                     </span>
                  </div>
                  <p className="text-stone-600 font-medium">{job.company}</p>
                  <div className="flex items-center gap-3 text-sm text-stone-500">
                    <span>{job.location} ({job.mode})</span>
                    <span>&bull;</span>
                    <span>{job.experience}</span>
                    <span>&bull;</span>
                    <span>{job.salaryRange}</span>
                  </div>
                </div>

                <a 
                  href={job.applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="self-start sm:self-center shrink-0 px-4 py-2 bg-stone-100 text-stone-700 text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-red-900 hover:text-white transition-all"
                >
                  Apply
                </a>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="bg-stone-50 border-t border-stone-100 p-6 text-center text-stone-400 text-xs">
            <p className="mb-2">This digest was generated based on your preferences.</p>
            <p>Job Notification Tracker &copy; {new Date().getFullYear()}</p>
          </div>

        </div>

        <div className="text-center mt-6 text-stone-300 text-xs font-mono">
          Demo Mode: Daily 9AM trigger simulated manually.
        </div>
      </div>

      {/* Side Column: Recent Updates */}
      <div className="w-full lg:w-80 shrink-0">
        <div className="bg-white border border-stone-200 rounded-sm p-6 sticky top-6">
           <div className="flex items-center gap-2 mb-4 text-stone-900 font-bold uppercase tracking-wider text-sm border-b border-stone-100 pb-2">
             <History size={16} className="text-red-900" />
             Recent Status Updates
           </div>
           
           {statusHistory.length === 0 ? (
             <p className="text-sm text-stone-400 italic">No updates tracked yet.</p>
           ) : (
             <div className="space-y-4">
               {statusHistory.slice(0, 10).map((item, idx) => (
                 <div key={idx} className="flex gap-3 items-start">
                   <div className="mt-1">
                     <CheckCircle2 size={14} className="text-stone-300" />
                   </div>
                   <div>
                     <p className="text-xs font-bold text-stone-800">{item.title}</p>
                     <p className="text-[10px] text-stone-500 mb-1">{item.company}</p>
                     <div className="flex items-center gap-2">
                       <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-sm uppercase ${
                         item.status === 'Applied' ? 'bg-blue-50 text-blue-700' :
                         item.status === 'Rejected' ? 'bg-red-50 text-red-700' :
                         item.status === 'Selected' ? 'bg-green-50 text-green-700' :
                         'bg-stone-100 text-stone-600'
                       }`}>
                         {item.status}
                       </span>
                       <span className="text-[10px] text-stone-400">{formatHistoryDate(item.date)}</span>
                     </div>
                   </div>
                 </div>
               ))}
             </div>
           )}
        </div>
      </div>
    </div>
  );
};