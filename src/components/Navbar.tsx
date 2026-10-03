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
  Bell,
  Search,
  Sun,
  Moon,
  Database,
} from 'lucide-react';
import { PrismaticStar } from './PrismaticStar';
import { BackgroundTheme } from './SocialMediaBackground';
import { AppMode, UserAccount } from '../types';

export type NavTab =
  | 'home'
  | 'media-studio'
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
  onOpenDatabaseInspector?: () => void;
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
  onOpenDatabaseInspector,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Dynamic Navigation Links based on active User Role
  const organizerLinks: { id: NavTab; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'media-studio', label: '📸 Media AI Studio' },
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
    { id: 'media-studio', label: '📸 Media AI Studio' },
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
    <header
      className={`sticky top-0 z-40 w-full transition-colors duration-200 ${
        theme === 'light'
          ? 'border-b border-slate-200 bg-white/95 text-slate-900 shadow-xs'
          : 'border-b border-white/10 bg-black/90 text-white'
      } backdrop-blur-2xl`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Zone 1: Brand title & Role Switcher */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <button
            onClick={() => handleNavClick(mode === 'organizer' ? 'home' : 'explore')}
            className={`text-left font-bold text-lg tracking-tight flex items-center gap-2.5 group cursor-pointer shrink-0 ${
              theme === 'light' ? 'text-slate-900' : 'text-white'
            }`}
          >
            {/* Prismatic star from reference design */}
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform shrink-0 relative overflow-hidden ${
                theme === 'light'
                  ? 'bg-slate-100 border border-slate-300'
                  : 'bg-black/60 border border-white/15'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/20 to-purple-500/20 blur-sm" />
              <PrismaticStar size={20} className="relative z-10" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base sm:text-lg tracking-tight whitespace-nowrap leading-tight flex items-center gap-1.5">
                <span>Adverse</span>
                <span
                  className={`text-[10px] uppercase font-bold px-1.5 py-0.2 rounded-full font-mono ${
                    theme === 'light'
                      ? 'bg-slate-200 text-slate-700'
                      : 'bg-white/10 text-slate-300'
                  }`}
                >
                  Studio
                </span>
              </span>
            </div>
          </button>

          {/* Mode Switcher Pill */}
          <div
            className={`hidden sm:flex items-center rounded-full p-0.5 shrink-0 border ${
              theme === 'light'
                ? 'bg-slate-100 border-slate-200'
                : 'bg-black/60 border-white/10'
            }`}
          >
            <button
              onClick={() => handleModeSwitch('organizer')}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                mode === 'organizer'
                  ? 'bg-gradient-to-r from-rose-500 to-orange-500 text-white shadow-md'
                  : theme === 'light'
                  ? 'text-slate-600 hover:text-slate-900'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Conducting and promoting events"
            >
              <Building className="w-3.5 h-3.5" />
              <span>Organizer</span>
            </button>
            <button
              onClick={() => handleModeSwitch('participant')}
              className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                mode === 'participant'
                  ? 'bg-gradient-to-r from-rose-500 to-orange-500 text-white shadow-md'
                  : theme === 'light'
                  ? 'text-slate-600 hover:text-slate-900'
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
        <nav
          className={`hidden lg:flex items-center gap-3.5 xl:gap-5 text-xs sm:text-sm font-medium shrink-0 ${
            theme === 'light' ? 'text-slate-600' : 'text-slate-300'
          }`}
        >
          {currentLinks.map((link) => {
            const isActive = currentTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`transition-colors py-1 relative cursor-pointer whitespace-nowrap ${
                  isActive
                    ? theme === 'light'
                      ? 'text-black font-extrabold'
                      : 'text-white font-extrabold'
                    : theme === 'light'
                    ? 'text-slate-600 hover:text-black'
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
          {/* TWO THEMES ONLY Switcher (Light vs Dark) */}
          {onSelectTheme && (
            <div className="relative">
              <button
                type="button"
                onClick={() => setThemeMenuOpen(!themeMenuOpen)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl transition-colors cursor-pointer border ${
                  theme === 'light'
                    ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-900'
                    : 'bg-black border-white/20 text-white hover:bg-neutral-900'
                }`}
                title="Switch Theme (Light / Dark)"
              >
                {theme === 'light' ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-500" />
                    <span>☀️ Light Theme</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-blue-400" />
                    <span>🌙 Dark Theme</span>
                  </>
                )}
                <ChevronDown className="w-3 h-3 opacity-60" />
              </button>

              {themeMenuOpen && (
                <div
                  className={`absolute right-0 top-full mt-2 w-52 rounded-xl shadow-2xl p-1.5 z-50 space-y-1 animate-in fade-in border ${
                    theme === 'light'
                      ? 'bg-white border-slate-200 text-slate-900'
                      : 'bg-neutral-950 border-neutral-800 text-white'
                  }`}
                >
                  <div
                    className={`px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${
                      theme === 'light' ? 'text-slate-400' : 'text-neutral-500'
                    }`}
                  >
                    Select Theme
                  </div>
                  {[
                    {
                      id: 'light' as BackgroundTheme,
                      label: '☀️ Light Theme',
                      desc: 'White background, Black font',
                    },
                    {
                      id: 'dark' as BackgroundTheme,
                      label: '🌙 Dark Theme',
                      desc: 'Black background, White font',
                    },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => {
                        onSelectTheme(t.id);
                        setThemeMenuOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors flex flex-col cursor-pointer ${
                        theme === t.id
                          ? theme === 'light'
                            ? 'bg-slate-100 text-slate-900 font-bold border border-slate-300'
                            : 'bg-neutral-800 text-white font-bold border border-white/20'
                          : theme === 'light'
                          ? 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                          : 'text-neutral-400 hover:bg-neutral-900 hover:text-white'
                      }`}
                    >
                      <span className="font-semibold">{t.label}</span>
                      <span
                        className={`text-[10px] ${
                          theme === 'light' ? 'text-slate-500' : 'text-neutral-400'
                        }`}
                      >
                        {t.desc}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Database Inspector Icon */}
          <button
            type="button"
            onClick={onOpenDatabaseInspector}
            className={`relative p-2 rounded-full transition-all cursor-pointer border ${
              theme === 'light'
                ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
                : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300 hover:text-white'
            }`}
            title="Database Inspector (Live Tables & Records)"
          >
            <Database className="w-4 h-4 text-amber-400" />
            <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-emerald-400" />
          </button>

          {/* Notification Bell matching reference top right */}
          <button
            type="button"
            onClick={() => handleNavClick('my-content')}
            className={`relative p-2 rounded-full transition-all cursor-pointer border ${
              theme === 'light'
                ? 'bg-slate-100 hover:bg-slate-200 border-slate-200 text-slate-700'
                : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300 hover:text-white'
            }`}
            title="Notifications & Activity"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
          </button>

          {/* User Auth Control / Avatar */}
          {currentUser ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 p-1 pl-1.5 pr-2.5 rounded-full bg-black/60 border border-white/15 hover:border-white/30 text-xs font-semibold text-white transition-all cursor-pointer"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-rose-500 to-amber-400 p-[1.5px] overflow-hidden">
                  <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-white text-[11px] font-bold uppercase">
                    {currentUser.name.slice(0, 1)}
                  </div>
                </div>
                <span className="max-w-[80px] truncate hidden sm:inline">{currentUser.name.split(' ')[0]}</span>
                <span className="text-[10px] font-mono text-rose-300 bg-rose-950/60 px-1.5 py-0.5 rounded-full border border-rose-800/40 hidden md:inline">
                  {currentUser.role === 'organizer' ? '🏢 Org' : '🎓 User'}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
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
        <div
          className={`lg:hidden border-b px-4 pt-2 pb-4 space-y-2 ${
            theme === 'light'
              ? 'border-slate-200 bg-white text-slate-900 shadow-lg'
              : 'border-slate-800 bg-slate-950 text-white'
          }`}
        >
          {/* Mobile Theme Switcher (2 Themes Only) */}
          {onSelectTheme && (
            <div
              className={`flex items-center justify-between p-2 rounded-xl border ${
                theme === 'light'
                  ? 'bg-slate-100 border-slate-200'
                  : 'bg-slate-900 border-slate-800'
              }`}
            >
              <span className="text-xs font-semibold">Theme:</span>
              <button
                type="button"
                onClick={() => onSelectTheme(theme === 'dark' ? 'light' : 'dark')}
                className={`flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-lg border transition-colors ${
                  theme === 'light'
                    ? 'bg-white border-slate-300 text-slate-900 shadow-xs'
                    : 'bg-slate-800 border-slate-700 text-white'
                }`}
              >
                {theme === 'light' ? (
                  <>
                    <Sun className="w-3.5 h-3.5 text-amber-500" />
                    <span>☀️ Light Theme</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-3.5 h-3.5 text-blue-400" />
                    <span>🌙 Dark Theme</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* Mobile Role Switcher */}
          <div
            className={`flex items-center justify-between p-2 rounded-xl border ${
              theme === 'light'
                ? 'bg-slate-100 border-slate-200'
                : 'bg-slate-900 border-slate-800'
            }`}
          >
            <span
              className={`text-xs font-semibold ${
                theme === 'light' ? 'text-slate-600' : 'text-slate-400'
              }`}
            >
              Active Role:
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => handleModeSwitch('organizer')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg ${
                  mode === 'organizer'
                    ? 'bg-rose-600 text-white'
                    : theme === 'light'
                    ? 'text-slate-600'
                    : 'text-slate-400'
                }`}
              >
                🏢 Organizer
              </button>
              <button
                onClick={() => handleModeSwitch('participant')}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg ${
                  mode === 'participant'
                    ? 'bg-rose-600 text-white'
                    : theme === 'light'
                    ? 'text-slate-600'
                    : 'text-slate-400'
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
                  ? theme === 'light'
                    ? 'bg-slate-200 text-black font-bold'
                    : 'bg-rose-950/60 text-rose-300 font-bold border border-rose-800/40'
                  : theme === 'light'
                  ? 'text-slate-600 hover:bg-slate-100'
                  : 'text-slate-400 hover:bg-slate-900/60 hover:text-slate-200'
              }`}
            >
              {link.label}
            </button>
          ))}

          {!currentUser && (
            <div
              className={`pt-2 border-t flex items-center gap-2 ${
                theme === 'light' ? 'border-slate-200' : 'border-slate-800'
              }`}
            >
              <button
                onClick={() => {
                  onOpenAuth('login');
                  setMobileMenuOpen(false);
                }}
                className={`w-1/2 py-2 text-xs font-bold text-center border rounded-xl ${
                  theme === 'light'
                    ? 'bg-slate-100 border-slate-300 text-slate-900'
                    : 'bg-slate-900 border-slate-800 text-white'
                }`}
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
