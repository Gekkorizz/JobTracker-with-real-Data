import React, { useState, useEffect } from 'react';
import { ShieldCheck, Link as LinkIcon, Copy, Check, ExternalLink, AlertTriangle, Circle, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const FinalProof: React.FC = () => {
  const [links, setLinks] = useState({
    lovable: '',
    github: '',
    deploy: ''
  });
  const [checklistCount, setChecklistCount] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Load links
    const storedLinks = localStorage.getItem('jobTracker_submission_links');
    if (storedLinks) setLinks(JSON.parse(storedLinks));

    // Load checklist count from previous step
    const storedChecklist = localStorage.getItem('jobTracker_qa_checklist');
    const items = storedChecklist ? JSON.parse(storedChecklist) : [];
    setChecklistCount(items.length);
  }, []);

  const handleLinkChange = (key: keyof typeof links, value: string) => {
    const newLinks = { ...links, [key]: value };
    setLinks(newLinks);
    localStorage.setItem('jobTracker_submission_links', JSON.stringify(newLinks));
  };

  const isValidUrl = (url: string) => {
    try {
      if (!url) return false;
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const allLinksValid = isValidUrl(links.lovable) && isValidUrl(links.github) && isValidUrl(links.deploy);
  const allTestsPassed = checklistCount === 10;
  const isShipped = allLinksValid && allTestsPassed;

  const getStatus = () => {
    if (isShipped) return 'Shipped';
    if (checklistCount > 0 || links.lovable || links.github || links.deploy) return 'In Progress';
    return 'Not Started';
  };

  const status = getStatus();

  const handleCopy = () => {
    if (!isShipped) {
      alert("Please complete all requirements before copying the final submission.");
      return;
    }

    const text = `------------------------------------------
Job Notification Tracker — Final Submission

Lovable Project:
${links.lovable}

GitHub Repository:
${links.github}

Live Deployment:
${links.deploy}

Core Features:
- Intelligent match scoring
- Daily digest simulation
- Status tracking
- Test checklist enforced
------------------------------------------`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const steps = [
    { label: 'Project Initialization', status: 'Completed' },
    { label: 'Dashboard & Filters', status: 'Completed' },
    { label: 'Settings & Scoring Engine', status: 'Completed' },
    { label: 'Saved Jobs Persistence', status: 'Completed' },
    { label: 'Status Workflow', status: 'Completed' },
    { label: 'Email Digest Simulation', status: 'Completed' },
    { label: `QA Verification (${checklistCount}/10)`, status: allTestsPassed ? 'Completed' : 'Pending' },
    { label: 'Deployment Artifacts', status: allLinksValid ? 'Completed' : 'Pending' },
  ];

  return (
    <div className="max-w-3xl mx-auto pb-24">
      {/* Header */}
      <div className="mb-10 border-b border-stone-200 pb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="font-serif text-3xl text-stone-900 mb-2">Project 1 — Job Notification Tracker</h1>
            <p className="text-stone-500">Final Verification & Submission Protocol</p>
          </div>
          
          <div className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border ${
            status === 'Shipped' ? 'bg-green-100 text-green-800 border-green-200' :
            status === 'In Progress' ? 'bg-amber-100 text-amber-800 border-amber-200' :
            'bg-stone-100 text-stone-600 border-stone-200'
          }`}>
            {status}
          </div>
        </div>
      </div>

      {/* Completion Message */}
      {status === 'Shipped' && (
        <div className="mb-8 bg-stone-50 border-l-4 border-green-600 p-4 flex items-center gap-3 animate-fade-in-up">
           <ShieldCheck className="text-green-700" size={20} />
           <p className="font-serif text-lg text-stone-800">Project 1 Shipped Successfully.</p>
        </div>
      )}

      {/* Section A: Step Summary */}
      <div className="mb-12">
        <h2 className="font-serif text-xl font-bold text-stone-900 mb-6">A) Step Completion Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {steps.map((step, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-white border border-stone-200 rounded-sm">
              <span className="text-sm font-medium text-stone-700">{step.label}</span>
              {step.status === 'Completed' ? (
                <div className="flex items-center gap-1.5 text-xs font-bold text-green-700 uppercase tracking-wider">
                  <CheckCircle2 size={14} />
                  Done
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 uppercase tracking-wider">
                  <Circle size={14} />
                  Pending
                </div>
              )}
            </div>
          ))}
        </div>
        {!allTestsPassed && (
          <div className="mt-4">
             <Link to="/jt/07-test" className="text-sm text-red-900 font-medium hover:underline flex items-center gap-1">
               <AlertTriangle size={14} />
               Complete QA Checklist ({checklistCount}/10)
             </Link>
          </div>
        )}
      </div>

      {/* Section B: Artifacts */}
      <div className="mb-12">
        <h2 className="font-serif text-xl font-bold text-stone-900 mb-6">B) Artifact Collection</h2>
        <div className="space-y-6 bg-white p-8 border border-stone-200 rounded-sm shadow-sm">
          
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
              Lovable Project Link <span className="text-red-900">*</span>
            </label>
            <div className="relative">
              <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
              <input 
                type="url" 
                placeholder="https://lovable.dev/..."
                value={links.lovable}
                onChange={(e) => handleLinkChange('lovable', e.target.value)}
                className={`w-full pl-10 pr-4 py-3 bg-stone-50 border rounded-sm focus:outline-none focus:ring-1 transition-all ${
                  isValidUrl(links.lovable) 
                    ? 'border-stone-200 focus:border-stone-400' 
                    : 'border-amber-200 focus:border-amber-400'
                }`}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
              GitHub Repository <span className="text-red-900">*</span>
            </label>
            <div className="relative">
              <ExternalLink className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
              <input 
                type="url" 
                placeholder="https://github.com/..."
                value={links.github}
                onChange={(e) => handleLinkChange('github', e.target.value)}
                className={`w-full pl-10 pr-4 py-3 bg-stone-50 border rounded-sm focus:outline-none focus:ring-1 transition-all ${
                  isValidUrl(links.github) 
                    ? 'border-stone-200 focus:border-stone-400' 
                    : 'border-amber-200 focus:border-amber-400'
                }`}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">
              Deployed URL <span className="text-red-900">*</span>
            </label>
            <div className="relative">
              <ExternalLink className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
              <input 
                type="url" 
                placeholder="https://job-tracker.vercel.app"
                value={links.deploy}
                onChange={(e) => handleLinkChange('deploy', e.target.value)}
                className={`w-full pl-10 pr-4 py-3 bg-stone-50 border rounded-sm focus:outline-none focus:ring-1 transition-all ${
                  isValidUrl(links.deploy) 
                    ? 'border-stone-200 focus:border-stone-400' 
                    : 'border-amber-200 focus:border-amber-400'
                }`}
              />
            </div>
          </div>

        </div>
      </div>

      {/* Section C: Export */}
      <div>
        <h2 className="font-serif text-xl font-bold text-stone-900 mb-6">C) Final Submission</h2>
        <div className="bg-stone-100 p-8 rounded-sm border border-stone-200 text-center">
          <p className="text-stone-500 mb-6 max-w-lg mx-auto">
            Ensure all steps are completed and valid URLs are provided above. The submission copy will be generated automatically.
          </p>
          <button 
            onClick={handleCopy}
            disabled={!isShipped}
            className={`flex items-center justify-center gap-2 mx-auto px-8 py-3 rounded-sm font-bold shadow-lg transition-all ${
              isShipped 
                ? 'bg-stone-900 text-white hover:bg-stone-800 hover:shadow-xl' 
                : 'bg-stone-200 text-stone-400 cursor-not-allowed'
            }`}
          >
            {copied ? <Check size={18} /> : <Copy size={18} />}
            {copied ? 'Copied to Clipboard' : 'Copy Final Submission'}
          </button>
        </div>
      </div>

    </div>
  );
};