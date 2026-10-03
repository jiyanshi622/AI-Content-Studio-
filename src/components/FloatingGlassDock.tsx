import React from 'react';
import {
  Menu,
  Film,
  User,
  Plus
} from 'lucide-react';
import { PrismaticStar } from './PrismaticStar';
import { NavTab } from './Navbar';
import { AppMode, UserAccount } from '../types';
import { BackgroundTheme } from './SocialMediaBackground';

interface FloatingGlassDockProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  mode: AppMode;
  onSelectMode: (mode: AppMode) => void;
  currentUser: UserAccount | null;
  onOpenAuth: (mode: 'login' | 'register') => void;
  theme?: BackgroundTheme;
}

export const FloatingGlassDock: React.FC<FloatingGlassDockProps> = ({
  currentTab,
  onSelectTab,
  mode,
  onSelectMode,
  currentUser,
  onOpenAuth,
  theme = 'dark',
}) => {
  const isLight = theme === 'light';

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
      <nav
        aria-label="Floating Navigation Dock"
        className={`glass-dock flex items-center gap-4 sm:gap-6 px-5 py-2.5 rounded-full transition-all hover:scale-[1.02] shadow-2xl ${
          isLight
            ? 'bg-white/95 border border-slate-300 text-slate-900 shadow-slate-300/50'
            : 'border border-white/16 text-white'
        }`}
      >
        {/* Item 1: Home / Menu */}
        <button
          onClick={() => onSelectTab(mode === 'organizer' ? 'home' : 'explore')}
          className={`p-2 rounded-full transition-all cursor-pointer relative group ${
            currentTab === 'home' || currentTab === 'explore'
              ? isLight
                ? 'text-slate-950 bg-slate-200'
                : 'text-white bg-white/15'
              : isLight
              ? 'text-slate-600 hover:text-black hover:bg-slate-100'
              : 'text-slate-400 hover:text-white hover:bg-white/10'
          }`}
          title="Home & Feed"
        >
          <Menu className="w-5 h-5" />
          <span className="sr-only">Home</span>
          {(currentTab === 'home' || currentTab === 'explore') && (
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-rose-500" />
          )}
        </button>

        {/* Item 2: Quick Create / Content Form */}
        <button
          onClick={() => onSelectTab(mode === 'organizer' ? 'create' : 'participant-create')}
          className={`p-2 rounded-full transition-all cursor-pointer relative group ${
            currentTab === 'create' || currentTab === 'participant-create'
              ? isLight
                ? 'text-slate-950 bg-slate-200'
                : 'text-white bg-white/15'
              : isLight
              ? 'text-slate-600 hover:text-black hover:bg-slate-100'
              : 'text-slate-400 hover:text-white hover:bg-white/10'
          }`}
          title="Create Content Copy"
        >
          <Plus className="w-5 h-5" />
          <span className="sr-only">Create Content</span>
          {(currentTab === 'create' || currentTab === 'participant-create') && (
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-rose-500" />
          )}
        </button>

        {/* Item 3: Centerpiece Gemini Icon (Clickable -> redirects to https://gemini.google.com/) */}
        <a
          href="https://gemini.google.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="relative p-2.5 rounded-full bg-gradient-to-tr from-rose-500/25 via-purple-500/25 to-amber-500/25 border border-rose-400/40 hover:border-rose-400 shadow-lg shadow-rose-500/25 hover:scale-110 active:scale-95 transition-all cursor-pointer group flex items-center justify-center"
          title="Google Gemini (gemini.google.com)"
        >
          <div className="absolute inset-0 rounded-full bg-rose-500/20 blur-md group-hover:bg-rose-500/35 transition-all" />
          <PrismaticStar size={24} className="relative z-10 drop-shadow-md group-hover:rotate-12 transition-transform" />
        </a>

        {/* Item 4: Reel Studio */}
        <button
          onClick={() => onSelectTab('reels')}
          className={`p-2 rounded-full transition-all cursor-pointer relative group ${
            currentTab === 'reels'
              ? isLight
                ? 'text-slate-950 bg-slate-200'
                : 'text-white bg-white/15'
              : isLight
              ? 'text-slate-600 hover:text-black hover:bg-slate-100'
              : 'text-slate-400 hover:text-white hover:bg-white/10'
          }`}
          title="🎬 Reel Creator Studio"
        >
          <Film className="w-5 h-5" />
          <span className="sr-only">Reel Studio</span>
          {currentTab === 'reels' && (
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-amber-500" />
          )}
        </button>

        {/* Item 5: User Profile Avatar */}
        <button
          onClick={() => {
            if (!currentUser) {
              onOpenAuth('login');
            } else {
              onSelectMode(mode === 'organizer' ? 'participant' : 'organizer');
            }
          }}
          className={`p-1 rounded-full border transition-all cursor-pointer relative group ${
            isLight ? 'border-slate-300 hover:border-rose-500' : 'border-white/20 hover:border-rose-400'
          }`}
          title={currentUser ? `Signed in as ${currentUser.name} (Click to toggle role)` : 'Sign in / Profile'}
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-rose-500 to-amber-400 p-[1.5px] overflow-hidden">
            <div className={`w-full h-full rounded-full flex items-center justify-center text-[10px] font-bold overflow-hidden ${
              isLight ? 'bg-slate-100 text-slate-900' : 'bg-slate-950 text-white'
            }`}>
              {currentUser?.avatar ? (
                <img src={currentUser.avatar} alt={currentUser.name} className="w-full h-full object-cover" />
              ) : currentUser ? (
                currentUser.name.slice(0, 1).toUpperCase()
              ) : (
                <User className={`w-3.5 h-3.5 ${isLight ? 'text-slate-700' : 'text-slate-300'}`} />
              )}
            </div>
          </div>
          {/* Status Dot matching reference */}
          <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-emerald-500 border border-white" />
        </button>
      </nav>
    </div>
  );
};
