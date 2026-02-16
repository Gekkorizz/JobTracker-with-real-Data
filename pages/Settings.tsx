import React, { useState, useEffect } from 'react';
import { Sliders, MapPin, Briefcase, Award, Zap, ChevronDown, Check } from 'lucide-react';
import { locations as allLocations, modes as allModes, experiences as allExperiences } from '../data/jobs';
import { Preferences } from '../utils/scoring';

export const Settings: React.FC = () => {
  const [roleKeywords, setRoleKeywords] = useState('');
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedModes, setSelectedModes] = useState<string[]>([]);
  const [experience, setExperience] = useState('');
  const [skills, setSkills] = useState('');
  const [minMatchScore, setMinMatchScore] = useState(40);
  
  const [isLocDropdownOpen, setIsLocDropdownOpen] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('jobTrackerPreferences');
    if (stored) {
      const prefs: Preferences = JSON.parse(stored);
      setRoleKeywords(prefs.roleKeywords.join(', '));
      setSelectedLocations(prefs.locations);
      setSelectedModes(prefs.modes);
      setExperience(prefs.experience);
      setSkills(prefs.skills.join(', '));
      setMinMatchScore(prefs.minMatchScore);
    }
  }, []);

  const handleSave = () => {
    const prefs: Preferences = {
      roleKeywords: roleKeywords.split(',').map(s => s.trim()).filter(Boolean),
      locations: selectedLocations,
      modes: selectedModes,
      experience,
      skills: skills.split(',').map(s => s.trim()).filter(Boolean),
      minMatchScore
    };
    localStorage.setItem('jobTrackerPreferences', JSON.stringify(prefs));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const toggleLocation = (loc: string) => {
    setSelectedLocations(prev => 
      prev.includes(loc) ? prev.filter(l => l !== loc) : [...prev, loc]
    );
  };

  const toggleMode = (mode: string) => {
    setSelectedModes(prev => 
      prev.includes(mode) ? prev.filter(m => m !== mode) : [...prev, mode]
    );
  };

  return (
    <div className="space-y-10 max-w-2xl mx-auto pb-12">
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
            value={roleKeywords}
            onChange={(e) => setRoleKeywords(e.target.value)}
            placeholder="e.g. Senior Product Designer, React Engineer, Staff Architect"
            className="w-full bg-white border border-stone-200 p-4 text-stone-800 placeholder:text-stone-300 focus:outline-none focus:border-red-900 focus:ring-1 focus:ring-red-900 transition-all rounded-sm"
          />
          <p className="text-xs text-stone-400">Separate multiple keywords with commas.</p>
        </div>

        {/* Locations (Multi-select Dropdown) */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-semibold text-stone-900 uppercase tracking-wider">
            <MapPin size={16} className="text-red-900" />
            Preferred Locations
          </label>
          <div className="relative">
            <button 
              onClick={() => setIsLocDropdownOpen(!isLocDropdownOpen)}
              className="w-full bg-white border border-stone-200 p-4 text-left flex justify-between items-center rounded-sm hover:border-stone-400 transition-colors"
            >
              <span className={selectedLocations.length ? 'text-stone-800' : 'text-stone-300'}>
                {selectedLocations.length > 0 ? selectedLocations.join(', ') : 'Select locations...'}
              </span>
              <ChevronDown size={16} className="text-stone-400" />
            </button>
            
            {isLocDropdownOpen && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setIsLocDropdownOpen(false)} 
                />
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-stone-200 shadow-lg rounded-sm z-20 max-h-60 overflow-y-auto">
                  {allLocations.map(loc => (
                    <div 
                      key={loc}
                      onClick={() => toggleLocation(loc)}
                      className="px-4 py-3 flex items-center justify-between hover:bg-stone-50 cursor-pointer text-stone-700"
                    >
                      <span>{loc}</span>
                      {selectedLocations.includes(loc) && <Check size={16} className="text-red-900" />}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Experience Level */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-semibold text-stone-900 uppercase tracking-wider">
            <Award size={16} className="text-red-900" />
            Experience Level
          </label>
          <div className="relative">
            <select 
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full bg-white border border-stone-200 p-4 text-stone-800 appearance-none focus:outline-none focus:border-red-900 focus:ring-1 focus:ring-red-900 rounded-sm cursor-pointer"
            >
              <option value="" disabled>Select your seniority...</option>
              {allExperiences.map(exp => (
                <option key={exp} value={exp}>{exp}</option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-stone-400">
              <ChevronDown size={16} />
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
            {allModes.map((mode) => (
              <label key={mode} className="cursor-pointer group">
                <input 
                  type="checkbox" 
                  checked={selectedModes.includes(mode)}
                  onChange={() => toggleMode(mode)}
                  className="peer hidden" 
                />
                <div className="border border-stone-200 bg-white p-4 text-center text-stone-600 rounded-sm transition-all peer-checked:border-red-900 peer-checked:text-red-900 peer-checked:bg-stone-50 group-hover:border-stone-300">
                  {mode}
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm font-semibold text-stone-900 uppercase tracking-wider">
            <Zap size={16} className="text-red-900" />
            Priority Skills
          </label>
          <input 
            type="text" 
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            placeholder="e.g. Python, AWS, Docker"
            className="w-full bg-white border border-stone-200 p-4 text-stone-800 placeholder:text-stone-300 focus:outline-none focus:border-red-900 focus:ring-1 focus:ring-red-900 transition-all rounded-sm"
          />
          <p className="text-xs text-stone-400">These boost your match score significantly.</p>
        </div>

        {/* Min Match Score */}
        <div className="space-y-6 pt-4 border-t border-stone-100">
          <div className="flex justify-between items-center">
             <label className="flex items-center gap-2 text-sm font-semibold text-stone-900 uppercase tracking-wider">
                Minimum Match Score
             </label>
             <span className="text-2xl font-serif font-bold text-red-900">{minMatchScore}</span>
          </div>
          
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={minMatchScore}
            onChange={(e) => setMinMatchScore(parseInt(e.target.value))}
            className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-red-900"
          />
          <p className="text-sm text-stone-500">
            Jobs with a score below {minMatchScore} will be hidden when "Show matches only" is enabled.
          </p>
        </div>

        <div className="pt-8 flex justify-end">
          <button 
            onClick={handleSave}
            className={`px-8 py-3 rounded-sm font-medium transition-all duration-300 ${
              saved 
              ? 'bg-green-700 text-white' 
              : 'bg-stone-900 text-stone-50 hover:bg-red-900'
            }`}
          >
            {saved ? 'Preferences Saved' : 'Save Preferences'}
          </button>
        </div>

      </div>
    </div>
  );
};