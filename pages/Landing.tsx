import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const Landing: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      <div className="max-w-3xl space-y-8 animate-fade-in-up">
        <h1 className="font-serif text-5xl md:text-7xl font-semibold text-stone-900 leading-[1.1] tracking-tight">
          Stop Missing The <br />
          <span className="text-red-900 italic">Right Jobs.</span>
        </h1>
        
        <p className="font-sans text-lg md:text-xl text-stone-500 max-w-xl mx-auto leading-relaxed">
          Precision-matched job discovery delivered daily at 9AM. 
          Curated specifically for your seniority and domain.
        </p>

        <div className="pt-8">
          <Link
            to="/settings"
            className="group inline-flex items-center gap-3 bg-red-900 text-stone-50 px-8 py-4 rounded-sm text-lg font-medium transition-all duration-300 hover:bg-red-800 hover:shadow-lg hover:shadow-red-900/10"
          >
            Start Tracking
            <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="pt-24 opacity-60 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-sm font-serif text-stone-400">
          <div>Senior Roles</div>
          <div>Remote Options</div>
          <div>Salary Transparency</div>
          <div>Direct Apply</div>
        </div>
      </div>
    </div>
  );
};