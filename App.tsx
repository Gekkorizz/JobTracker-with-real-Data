import React from 'react';
import { HashRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Landing } from './pages/Landing';
import { Dashboard } from './pages/Dashboard';
import { Settings } from './pages/Settings';
import { Saved } from './pages/Saved';
import { Digest } from './pages/Digest';
import { Proof } from './pages/Proof';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans selection:bg-red-900 selection:text-white">
      <Navigation />
      <main className="max-w-5xl mx-auto px-6 py-12 md:py-20">
        {children}
      </main>
    </div>
  );
};

const AppRoutes = () => {
  const location = useLocation();
  const isLanding = location.pathname === '/';

  if (isLanding) {
    return (
      <div className="min-h-screen bg-stone-50 text-stone-800 font-sans selection:bg-red-900 selection:text-white">
         <Navigation />
         <Landing />
      </div>
    );
  }

  return (
    <Layout>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/digest" element={<Digest />} />
        <Route path="/proof" element={<Proof />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
};

export default function App() {
  return (
    <HashRouter>
      <AppRoutes />
    </HashRouter>
  );
}