import React, { useState } from 'react';
import {
  Sparkles,
  Menu,
  X,
  Palette,
  Building,
  Users,
  Compass,
  Trophy,
  User,
  LogOut,
  LogIn,
  UserPlus,
  ChevronDown,
} from 'lucide-react';
import { BackgroundTheme } from './SocialMediaBackground';
import { AppMode, UserAccount } from '../types';

export type NavTab =
  | 'home'
  | 'create'
  | 'reels'
  | 'dashboard'
  | 'campaigns'
  | 'templates'
  | 'my-content'
  | 'about'
  | 'explore'
  | 'participant-create'
  | 'passport';

interface NavbarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  hasActiveContent?: boolean;
  theme?: BackgroundTheme;
  onSelectTheme?: (theme: BackgroundTheme) => void;
  mode: AppMode;
  onSelectMode: (mode: AppMode) => void;
  currentUser: UserAccount | null;
  onOpenAuth: (mode: 'login' | 'register') => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  hasActiveContent,
  theme = 'sunset',
  onSelectTheme,
  mode,
  onSelectMode,
  currentUser,
  onOpenAuth,
  onLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Dynamic Navigation Links based on active User Role
  const organizerLinks: { id: NavTab; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'create', label: 'Create Event Copy' },
    { id: 'reels', label: '🎬 Reel Studio' },
    ...(hasActiveContent ? [{ id: 'dashboard' as NavTab, label: 'Results' }] : []),
    { id: 'my-content', label: 'My Events' },
    { id: 'campaigns', label: 'Campaigns' },
    { id: 'templates', label: 'Templates' },
    { id: 'about', label: 'About' },
  ];

  const participantLinks: { id: NavTab; label: string }[] = [
    { id: 'explore', label: 'Explore Events' },
    { id: 'participant-create', label: 'Share Experience' },
    { id: 'reels', label: '🎬 Reel Studio' },
    ...(hasActiveContent ? [{ id: 'dashboard' as NavTab, label: 'Results' }] : []),
    { id: 'passport', label: 'My Event Passport' },
    { id: 'about', label: 'About' },
  ];

  const currentLinks = mode === 'organizer' ? organizerLinks : participantLinks;

  const handleNavClick = (tab: NavTab) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
  };

  const handleModeSwitch = (newMode: AppMode) => {
    onSelectMode(newMode);
    if (newMode === 'participant') {
      onSelectTab('explore');
    } else {
      onSelectTab('home');
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-rose-500/20 bg-slate-950/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Zone 1: Brand title & Role Switcher */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <button
            onClick={() => handleNavClick(mode === 'organizer' ? 'home' : 'explore')}
            className="text-left font-bold text-lg tracking-tight text-white flex items-center gap-2.5 group cursor-pointer shrink-0"
          >
            <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-500 via-pink-500 to-amber-400 flex items-center justify-center text-white shadow-md shadow-rose-500/25 group-hover:scale-105 transition-transform shrink-0">
              <Sparkles className="w-4 h-4" />
            </span>
            <span className="font-black text-base sm:text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-rose-200 bg-clip-text text-transparent whitespace-nowrap select-none leading-none">
              AI Content Studio
            </span>
          </button>

          {/* Mode Switcher Pill */}
          <div className="hidden sm:flex items-center bg-slate-900 border border-slate-800 rounded-xl p-0.5 shrink-0">
            <button
              onClick={() => handleModeSwitch('organizer')}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                mode === 'organizer'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Conducting and promoting events"
            >
              <Building className="w-3.5 h-3.5" />
              <span>Organizer</span>
            </button>
            <button
              onClick={() => handleModeSwitch('participant')}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                mode === 'participant'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Attending events and sharing experience posts"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Attendee</span>
            </button>
          </div>
        </div>

        {/* Zone 2: Navigation links */}
        <nav className="hidden lg:flex items-center gap-3.5 xl:gap-5 text-xs sm:text-sm font-medium text-slate-300 shrink-0">
          {currentLinks.map((link) => {
            const isActive = currentTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`transition-colors py-1 relative cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'text-white font-bold'
                    : 'text-slate-400 hover:text-slate-100'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Ambiance, Auth & Primary Action Button */}
        <div className="hidden md:flex items-center gap-2 sm:gap-2.5 shrink-0">
          {/* Ambiance Switcher */}
          {onSelectTheme && (
            <div className="relative">
              <button
                type="button"
                onClick={() => setThemeMenuOpen(!themeMenuOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
                title="Change Ambient Background"
              >
                <Palette className="w-3.5 h-3.5 text-rose-400" />
                <span className="capitalize hidden xl:inline">
                  {theme === 'sunset' ? '🌅 Sunset' : theme === 'midnight' ? '🌌 Midnight' : '🔮 Aurora'}
                </span>
              </button>

              {themeMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 rounded-xl border border-slate-700 bg-slate-900 shadow-2xl p-1.5 z-50 space-y-1 animate-in fade-in">
                  <div className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Background Ambiance
                  </div>
                  {[
                    { id: 'sunset' as BackgroundTheme, label: '🌅 Sunset Glow (Warm)', desc: 'Peachy rose creator vibe' },
                    { id: 'midnight' as BackgroundTheme, label: '🌌 Midnight Studio', desc: 'Deep cyber slate' },
                    { id: 'aurora' as BackgroundTheme, label: '🔮 Aurora Violet', desc: 'Emerald & violet pulse' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => {
                        onSelectTheme(t.id);
                        setThemeMenuOpen(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors flex flex-col cursor-pointer ${
                        theme === t.id
                          ? 'bg-rose-950/80 text-rose-200 font-bold border border-rose-800/50'
                          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <span>{t.label}</span>
                      <span className="text-[10px] text-slate-500 font-normal">{t.desc}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* User Auth Control */}
          {currentUser ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 p-1 pl-2 pr-3 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-semibold text-white transition-colors cursor-pointer"
              >
                <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center text-white text-[11px] font-bold uppercase">
                  {currentUser.name.slice(0, 1)}
                </div>
                <span className="max-w-[90px] truncate">{currentUser.name.split(' ')[0]}</span>
                <span className="text-[10px] font-mono text-rose-400 bg-rose-950/60 px-1.5 py-0.5 rounded border border-rose-800/40">
                  {currentUser.role === 'organizer' ? '🏢 Organizer' : '🎓 User'}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-500" />
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl p-3 z-50 animate-in fade-in space-y-3">
                  <div className="pb-2.5 border-b border-slate-800">
                    <div className="font-bold text-white text-xs">{currentUser.name}</div>
                    <div className="text-[11px] text-slate-400 truncate">{currentUser.email}</div>
                    <div className="mt-1 text-[10px] text-rose-400 font-semibold">
                      Role: {currentUser.role === 'organizer' ? 'Event Organizer' : 'Attendee / Participant'}
                    </div>
                    {currentUser.organization && (
                      <div className="text-[10px] text-slate-400 mt-0.5 truncate">
                        Org: {currentUser.organization}
                      </div>
                    )}
                  </div>

                  <div className="space-y-1">
                    <button
                      type="button"
                      onClick={() => {
                        handleModeSwitch(currentUser.role === 'organizer' ? 'participant' : 'organizer');
                        setUserMenuOpen(false);
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs hover:bg-slate-800 text-slate-300 transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <Users className="w-3.5 h-3.5 text-rose-400" />
                      <span>Switch to {currentUser.role === 'organizer' ? 'Attendee' : 'Organizer'} Mode</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        onLogout();
                        setUserMenuOpen(false);
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg text-xs hover:bg-rose-950/60 text-rose-300 transition-colors flex items-center gap-2 cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => onOpenAuth('login')}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl transition-colors cursor-pointer"
              >
                <LogIn className="w-3 h-3 text-slate-400" />
                <span>Sign In</span>
              </button>
              <button
                type="button"
                onClick={() => onOpenAuth('register')}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-white bg-rose-950/80 hover:bg-rose-900 border border-rose-800/60 text-rose-200 rounded-xl transition-colors cursor-pointer"
              >
                <UserPlus className="w-3 h-3" />
                <span>Register</span>
              </button>
            </div>
          )}

          {/* Action Button: Mode sensitive */}
          {mode === 'organizer' ? (
            <button
              onClick={() => handleNavClick('create')}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 active:scale-95 rounded-xl shadow-md shadow-rose-500/25 transition-all whitespace-nowrap cursor-pointer"
            >
              <span>Create Event Copy</span>
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </button>
          ) : (
            <button
              onClick={() => handleNavClick('participant-create')}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 active:scale-95 rounded-xl shadow-md shadow-rose-500/25 transition-all whitespace-nowrap cursor-pointer"
            >
              <span>Share Experience</span>
              <Trophy className="w-3.5 h-3.5 text-amber-300" />
            </button>
          )}
        </div>

        {/* Mobile menu trigger */}
        <div className="flex lg:hidden items-center gap-2">
          {currentUser ? (
            <button
              onClick={() => onLogout()}
              className="p-1.5 text-xs text-rose-300 bg-slate-900 border border-slate-800 rounded-lg"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => onOpenAuth('login')}
              className="px-2.5 py-1 text-xs font-bold text-rose-300 bg-slate-900 border border-slate-800 rounded-lg"
            >
              Sign In
            </button>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-400 hover:text-white rounded-lg focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-800 bg-slate-950 px-4 pt-2 pb-4 space-y-2">
          {/* Mobile Role Switcher */}
          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900 border border-slate-800">
            <span className="text-xs text-slate-400 font-semibold">Active Role:</span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => handleModeSwitch('organizer')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg ${
                  mode === 'organizer' ? 'bg-rose-600 text-white' : 'text-slate-400'
                }`}
              >
                🏢 Organizer
              </button>
              <button
                onClick={() => handleModeSwitch('participant')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg ${
                  mode === 'participant' ? 'bg-rose-600 text-white' : 'text-slate-400'
                }`}
              >
                🎓 Attendee
              </button>
            </div>
          </div>

          {currentLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`block w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                currentTab === link.id
                  ? 'bg-rose-950/60 text-rose-300 font-bold border border-rose-800/40'
                  : 'text-slate-400 hover:bg-slate-900/60 hover:text-slate-200'
              }`}
            >
              {link.label}
            </button>
          ))}

          {!currentUser && (
            <div className="pt-2 border-t border-slate-800 flex items-center gap-2">
              <button
                onClick={() => {
                  onOpenAuth('login');
                  setMobileMenuOpen(false);
                }}
                className="w-1/2 py-2 text-xs font-bold text-center bg-slate-900 border border-slate-800 rounded-xl text-white"
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  onOpenAuth('register');
                  setMobileMenuOpen(false);
                }}
                className="w-1/2 py-2 text-xs font-bold text-center bg-rose-600 text-white rounded-xl"
              >
                Register
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
