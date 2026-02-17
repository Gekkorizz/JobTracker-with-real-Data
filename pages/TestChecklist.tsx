import React, { useState, useEffect } from 'react';
import { CheckSquare, Square, AlertTriangle, RotateCcw, Lock, Unlock, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const TEST_ITEMS = [
  { id: 'prefs', label: 'Preferences persist after refresh', hint: 'Go to Settings, change a keyword, refresh page. Is it still there?' },
  { id: 'score', label: 'Match score calculates correctly', hint: 'Check a job card. Does the score reflect your settings?' },
  { id: 'toggle', label: '"Show only matches" toggle works', hint: 'On Dashboard, turn on toggle. Do low score jobs disappear?' },
  { id: 'save', label: 'Save job persists after refresh', hint: 'Save a job, refresh, check /saved route.' },
  { id: 'apply', label: 'Apply opens in new tab', hint: 'Click Apply. Does it open a new window?' },
  { id: 'status_persist', label: 'Status update persists after refresh', hint: 'Change status to "Applied", refresh. Is it still blue?' },
  { id: 'status_filter', label: 'Status filter works correctly', hint: 'Filter by "Rejected". Do you only see rejected jobs?' },
  { id: 'digest_gen', label: 'Digest generates top 10 by score', hint: 'Go to Digest, generate. Are they high match scores?' },
  { id: 'digest_persist', label: 'Digest persists for the day', hint: 'Refresh Digest page. Is the list still there?' },
  { id: 'console', label: 'No console errors on main pages', hint: 'Open F12 Developer Tools. Any red text?' },
];

export const TestChecklist: React.FC = () => {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('jobTracker_qa_checklist');
    if (stored) {
      setCheckedItems(JSON.parse(stored));
    }
  }, []);

  const toggleItem = (id: string) => {
    const newItems = checkedItems.includes(id)
      ? checkedItems.filter(i => i !== id)
      : [...checkedItems, id];
    
    setCheckedItems(newItems);
    localStorage.setItem('jobTracker_qa_checklist', JSON.stringify(newItems));
  };

  const resetTests = () => {
    if (window.confirm('Are you sure you want to reset all test progress?')) {
      setCheckedItems([]);
      localStorage.setItem('jobTracker_qa_checklist', JSON.stringify([]));
    }
  };

  const isComplete = checkedItems.length === TEST_ITEMS.length;

  return (
    <div className="max-w-3xl mx-auto pb-20">
      
      {/* Header */}
      <div className="mb-10 border-b border-stone-200 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="bg-stone-900 text-white p-2 rounded-sm">
            <CheckSquare size={24} />
          </div>
          <h1 className="font-serif text-3xl text-stone-900">QA & Flight Check</h1>
        </div>
        <p className="text-stone-500">
          Verify system integrity before shipping to production. 
          <span className="font-mono text-xs bg-stone-200 text-stone-600 px-2 py-0.5 rounded ml-2">v1.0.0-RC1</span>
        </p>
      </div>

      {/* Progress Card */}
      <div className={`p-6 rounded-sm border mb-8 transition-colors duration-500 ${isComplete ? 'bg-green-50 border-green-200' : 'bg-stone-50 border-stone-200'}`}>
        <div className="flex justify-between items-center mb-4">
          <h2 className={`font-serif text-xl font-bold ${isComplete ? 'text-green-800' : 'text-stone-900'}`}>
            {isComplete ? 'All Systems Go' : 'Pre-flight Checks Incomplete'}
          </h2>
          <span className="font-mono font-bold text-2xl">
            {checkedItems.length} <span className="text-stone-400 text-lg">/ {TEST_ITEMS.length}</span>
          </span>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full h-3 bg-stone-200 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-500 ${isComplete ? 'bg-green-600' : 'bg-red-900'}`}
            style={{ width: `${(checkedItems.length / TEST_ITEMS.length) * 100}%` }}
          />
        </div>

        {!isComplete && (
           <div className="flex items-center gap-2 mt-4 text-amber-700 text-sm font-medium">
             <AlertTriangle size={16} />
             <span>Cannot ship until all tests pass.</span>
           </div>
        )}
      </div>

      {/* Checklist */}
      <div className="bg-white border border-stone-200 rounded-sm shadow-sm overflow-hidden mb-10">
        {TEST_ITEMS.map((item, index) => {
          const isChecked = checkedItems.includes(item.id);
          return (
            <div 
              key={item.id}
              onClick={() => toggleItem(item.id)}
              className={`flex items-start gap-4 p-5 border-b border-stone-100 last:border-0 cursor-pointer transition-colors hover:bg-stone-50 group ${isChecked ? 'bg-stone-50/50' : ''}`}
            >
              <div className={`mt-1 ${isChecked ? 'text-green-600' : 'text-stone-300 group-hover:text-stone-400'}`}>
                {isChecked ? <CheckSquare size={20} /> : <Square size={20} />}
              </div>
              <div>
                <h3 className={`font-medium text-base mb-1 ${isChecked ? 'text-stone-400 line-through' : 'text-stone-900'}`}>
                  {item.label}
                </h3>
                <p className="text-xs text-stone-500 font-mono opacity-80">
                  Try: {item.hint}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <button 
          onClick={resetTests}
          className="flex items-center gap-2 text-stone-500 hover:text-red-900 text-sm font-medium transition-colors"
        >
          <RotateCcw size={14} />
          Reset Test Status
        </button>

        {isComplete ? (
          <Link 
            to="/jt/08-ship"
            className="flex items-center gap-2 bg-green-700 text-white px-8 py-3 rounded-sm font-bold shadow-lg hover:bg-green-800 transition-all hover:scale-105"
          >
            <Unlock size={18} />
            Proceed to Ship
            <ArrowRight size={18} />
          </Link>
        ) : (
          <button 
            disabled
            className="flex items-center gap-2 bg-stone-200 text-stone-400 px-8 py-3 rounded-sm font-bold cursor-not-allowed"
          >
            <Lock size={18} />
            Ship Locked
          </button>
        )}
      </div>

    </div>
  );
};