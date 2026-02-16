import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Bookmark, FileText, Settings, ShieldCheck } from 'lucide-react';

export const Navigation: React.FC = () => {
  const location = useLocation();
  const isLanding = location.pathname === '/';

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Saved', path: '/saved', icon: Bookmark },
    { name: 'Digest', path: '/digest', icon: FileText },
    { name: 'Settings', path: '/settings', icon: Settings },
    { name: 'Proof', path: '/proof', icon: ShieldCheck },
  ];

  return (
    <header className={`w-full py-6 px-6 md:px-12 flex items-center justify-between transition-all duration-500 ${isLanding ? 'bg-transparent' : 'bg-stone-50 border-b border-stone-200'}`}>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-red-900 rounded-sm flex items-center justify-center">
           <span className="text-stone-50 font-serif font-bold text-lg">J</span>
        </div>
        <span className="font-serif font-bold text-xl tracking-tight text-stone-900 hidden sm:block">
          Job Notification Tracker
        </span>
      </div>

      <nav className="hidden md:flex items-center gap-8">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-2 text-sm font-medium tracking-wide transition-colors duration-300 ${
                isActive 
                  ? 'text-red-900' 
                  : 'text-stone-500 hover:text-stone-800'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon size={16} className={isActive ? 'stroke-[2.5px]' : 'stroke-[1.5px]'} />
                {item.name}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Mobile Menu Placeholder - keeping it simple for desktop-first premium feel as requested */}
      <div className="md:hidden">
        <NavLink to="/dashboard" className="text-stone-900 font-serif font-medium">Menu</NavLink>
      </div>
    </header>
  );
};