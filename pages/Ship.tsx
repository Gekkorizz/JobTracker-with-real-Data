import React, { useEffect, useState } from 'react';
import { Rocket, Lock, ArrowLeft, CheckCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const Ship: React.FC = () => {
  const [locked, setLocked] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('jobTracker_qa_checklist');
    const items = stored ? JSON.parse(stored) : [];
    // Hardcoded expected length from TestChecklist
    const EXPECTED_COUNT = 10; 

    if (items.length >= EXPECTED_COUNT) {
      setLocked(false);
    } else {
      setLocked(true);
    }
  }, []);

  if (locked) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mb-6 animate-pulse">
          <Lock size={40} className="text-stone-400" />
        </div>
        <h1 className="font-serif text-4xl text-stone-900 mb-4">Access Denied</h1>
        <p className="text-stone-500 max-w-md mx-auto mb-8">
          The application is not ready for shipping. All 10 QA tests must be passed and verified before accessing the deployment protocol.
        </p>
        <Link 
          to="/jt/07-test"
          className="bg-red-900 text-white px-6 py-3 rounded-sm font-medium hover:bg-red-800 transition-colors"
        >
          Return to Flight Check
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center animate-fade-in-up">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-green-200 rounded-full blur-xl opacity-50"></div>
        <div className="relative w-24 h-24 bg-green-50 border-2 border-green-100 rounded-full flex items-center justify-center">
          <Rocket size={48} className="text-green-700 ml-1" />
        </div>
        <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-1 border border-stone-100 shadow-sm">
           <CheckCircle size={24} className="text-green-600 fill-green-100" />
        </div>
      </div>
      
      <h1 className="font-serif text-5xl text-stone-900 mb-4">Ready for Liftoff</h1>
      <p className="text-stone-500 max-w-lg mx-auto mb-10 text-lg">
        All systems verified. Quality assurance checks passed. The application is stable and ready for production deployment.
      </p>

      <div className="flex gap-4">
        <Link 
          to="/dashboard"
          className="text-stone-500 hover:text-stone-900 font-medium px-6 py-3 border border-stone-200 rounded-sm hover:border-stone-400 transition-all"
        >
          Back to App
        </Link>
        <button 
          onClick={() => alert('Simulating deployment... Success!')}
          className="bg-stone-900 text-white px-8 py-3 rounded-sm font-medium hover:bg-stone-800 shadow-lg hover:shadow-xl transition-all"
        >
          Deploy v1.0.0
        </button>
      </div>
    </div>
  );
};