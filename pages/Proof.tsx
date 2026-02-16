import React from 'react';
import { Shield } from 'lucide-react';

export const Proof: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="border-b border-stone-200 pb-4 mb-12">
        <h1 className="font-serif text-3xl text-stone-900">Verification & Proof</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 border border-stone-200 rounded-sm">
           <Shield className="text-stone-300 mb-4" size={32} />
           <h3 className="font-serif text-lg text-stone-900 mb-2">Identity Verification</h3>
           <p className="text-stone-500 text-sm mb-6">Secure your account with multi-factor authentication and identity proofing.</p>
           <button className="text-xs font-bold uppercase tracking-wider text-stone-400 border border-stone-200 px-4 py-2 rounded-sm cursor-not-allowed">Coming Soon</button>
        </div>

        <div className="bg-white p-8 border border-stone-200 rounded-sm opacity-60">
           <h3 className="font-serif text-lg text-stone-900 mb-2">Career Artifacts</h3>
           <p className="text-stone-500 text-sm mb-6">Upload verified credentials and certifications to boost your matching score.</p>
        </div>
      </div>
    </div>
  );
};