import React from 'react';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Dashboard: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center space-y-6">
      <div className="w-20 h-20 bg-stone-100 rounded-full flex items-center justify-center mb-4">
        <Search size={32} className="text-stone-300" />
      </div>
      
      <h2 className="font-serif text-3xl text-stone-900">No jobs yet</h2>
      
      <p className="text-stone-500 max-w-md mx-auto leading-relaxed">
        Your feed is currently empty. In the next step, you will load a realistic dataset based on your preferences.
      </p>

      <div className="pt-4">
        <Link 
          to="/settings" 
          className="text-red-900 font-medium border-b border-red-900/30 hover:border-red-900 pb-0.5 transition-colors"
        >
          Adjust preferences &rarr;
        </Link>
      </div>
    </div>
  );
};