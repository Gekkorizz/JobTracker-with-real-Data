import React from 'react';
import { Sliders, MapPin, Briefcase, Award } from 'lucide-react';

export const Settings: React.FC = () => {
  return (
    <div className="space-y-10 max-w-2xl mx-auto">
      <div className="border-b border-stone-200 pb-6">
        <h2 className="font-serif text-3xl text-stone-900 mb-2">Tracking Preferences</h2>
        <p className="text-stone-500">Configure your parameters to ensure high-signal matches.</p>
      </div>

      <div className="space-y-8">
        
        {/* Role Keywords */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-semibold text-stone-900 uppercase tracking-wider">
            <Briefcase size={16} className="text-red-900" />
            Role Keywords
          </label>
          <input 
            type="text" 
            placeholder="e.g. Senior Product Designer, React Engineer, Staff Architect"
            className="w-full bg-white border border-stone-200 p-4 text-stone-800 placeholder:text-stone-300 focus:outline-none focus:border-red-900 focus:ring-1 focus:ring-red-900 transition-all rounded-sm"
          />
          <p className="text-xs text-stone-400">Separate multiple roles with commas.</p>
        </div>

        {/* Locations */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-semibold text-stone-900 uppercase tracking-wider">
            <MapPin size={16} className="text-red-900" />
            Preferred Locations
          </label>
          <input 
            type="text" 
            placeholder="e.g. San Francisco, New York, London, Berlin"
            className="w-full bg-white border border-stone-200 p-4 text-stone-800 placeholder:text-stone-300 focus:outline-none focus:border-red-900 focus:ring-1 focus:ring-red-900 transition-all rounded-sm"
          />
        </div>

        {/* Experience Level */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-semibold text-stone-900 uppercase tracking-wider">
            <Award size={16} className="text-red-900" />
            Experience Level
          </label>
          <div className="relative">
            <select className="w-full bg-white border border-stone-200 p-4 text-stone-800 appearance-none focus:outline-none focus:border-red-900 focus:ring-1 focus:ring-red-900 rounded-sm cursor-pointer">
              <option value="" disabled selected>Select your seniority...</option>
              <option value="entry">Entry Level (0-2 years)</option>
              <option value="mid">Mid Level (3-5 years)</option>
              <option value="senior">Senior (5-8 years)</option>
              <option value="staff">Staff / Principal (8+ years)</option>
              <option value="executive">Executive / VP</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-stone-400">
              ▼
            </div>
          </div>
        </div>

        {/* Mode */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-semibold text-stone-900 uppercase tracking-wider">
            <Sliders size={16} className="text-red-900" />
            Work Mode
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['Remote', 'Hybrid', 'Onsite'].map((mode) => (
              <label key={mode} className="cursor-pointer group">
                <input type="radio" name="mode" className="peer hidden" />
                <div className="border border-stone-200 bg-white p-4 text-center text-stone-600 rounded-sm transition-all peer-checked:border-red-900 peer-checked:text-red-900 peer-checked:bg-stone-50 group-hover:border-stone-300">
                  {mode}
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="pt-8 flex justify-end">
          <button className="bg-stone-900 text-stone-50 px-8 py-3 rounded-sm font-medium hover:bg-red-900 transition-colors duration-300">
            Save Preferences
          </button>
        </div>

      </div>
    </div>
  );
};