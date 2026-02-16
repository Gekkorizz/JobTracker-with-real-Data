import React from 'react';
import { Bookmark } from 'lucide-react';

export const Saved: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="border-b border-stone-200 pb-4 mb-12">
        <h1 className="font-serif text-3xl text-stone-900">Saved Opportunities</h1>
      </div>

      <div className="flex flex-col items-center justify-center py-20 bg-white border border-stone-100 rounded-sm shadow-sm">
        <Bookmark size={48} className="text-stone-200 mb-6 stroke-1" />
        <h3 className="font-serif text-xl text-stone-900 mb-2">Your collection is empty</h3>
        <p className="text-stone-400 text-center max-w-sm">
          Jobs you bookmark from your dashboard will appear here for easy access and review.
        </p>
      </div>
    </div>
  );
};