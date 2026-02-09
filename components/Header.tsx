
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_ITEMS } from '../constants';

const Header: React.FC = () => {
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#05070C]/90 backdrop-blur-xl border-b border-slate-800/80">
      {/* Animated Top Border */}
      <div className="absolute top-0 left-0 w-full h-[1px] animate-border-flow opacity-50"></div>
      
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between relative overflow-hidden">
        <div className="scanline opacity-30"></div>
        
        <Link to="/" className="flex items-center gap-4 group relative">
          <img width="60" height="60"
            src="assets/logo.png"
            alt="Lynx Running" 
           />
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`relative text-xs font-bold uppercase tracking-widest transition-all py-1 px-2 ${
                  isActive ? 'text-cyan-400' : 'text-slate-500 hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute -bottom-[21px] left-0 w-full h-[2px] bg-cyan-500 shadow-[0_0_10px_#22d3ee]"></span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-6">
            <a href="https://github.com/DirikTi/corecdtl" target="_blank" className="text-slate-400 hover:text-cyan-400 transition-colors">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
        
        </div>
      </div>
    </header>
  );
};

export default Header;
