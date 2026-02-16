import React from 'react';
import { Mail } from 'lucide-react';

export const Digest: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="border-b border-stone-200 pb-4 mb-12 flex justify-between items-baseline">
        <h1 className="font-serif text-3xl text-stone-900">Daily Digest</h1>
        <span className="text-stone-400 font-serif italic text-sm">Delivered at 9:00 AM</span>
      </div>

      <div className="flex flex-col items-center justify-center py-24 px-6 text-center">
        <div className="bg-red-50 p-6 rounded-full mb-8">
           <Mail size={32} className="text-red-900" />
        </div>
        <h2 className="font-serif text-2xl text-stone-900 mb-4">You're all caught up</h2>
        <p className="text-stone-500 max-w-md leading-relaxed">
          Your next curated digest will arrive tomorrow morning. We are currently scanning over 500+ sources for your perfect role.
        </p>
      </div>
    </div>
  );
};