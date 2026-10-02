import React, { useState } from 'react';
import {
  Compass,
  Calendar,
  MapPin,
  Building,
  Sparkles,
  Search,
  Filter,
  Users,
  Award,
  ArrowRight,
  ExternalLink,
  PlusCircle,
  Tag,
} from 'lucide-react';
import { SavedEventRecord } from '../types';

interface ExploreEventsViewProps {
  events: SavedEventRecord[];
  onSelectEventForExperience: (event: SavedEventRecord) => void;
  onCustomExperience: () => void;
  onSwitchToOrganizer: () => void;
}

export const ExploreEventsView: React.FC<ExploreEventsViewProps> = ({
  events,
  onSelectEventForExperience,
  onCustomExperience,
  onSwitchToOrganizer,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredEvents = events.filter((ev) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      ev.name.toLowerCase().includes(q) ||
      ev.details.venue.toLowerCase().includes(q) ||
      ev.details.organizer.toLowerCase().includes(q) ||
      ev.details.eventType.toLowerCase().includes(q);

    if (!matchesSearch) return false;

    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'hackathon') {
      return ev.details.eventType.toLowerCase().includes('hackathon');
    }
    if (selectedCategory === 'college') {
      return (
        ev.details.eventType.toLowerCase().includes('tech fest') ||
        ev.details.eventType.toLowerCase().includes('college')
      );
    }
    if (selectedCategory === 'workshop') {
      return (
        ev.details.eventType.toLowerCase().includes('workshop') ||
        ev.details.eventType.toLowerCase().includes('webinar')
      );
    }
    if (selectedCategory === 'conference') {
      return ev.details.eventType.toLowerCase().includes('conference');
    }
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in">
      {/* Hero Banner for Attendees & Explorers */}
      <div className="rounded-3xl border border-rose-500/25 bg-slate-900/85 p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-40 bg-gradient-to-bl from-rose-500/20 via-pink-500/15 to-amber-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-rose-300 uppercase tracking-wider bg-rose-950/60 border border-rose-800/50 px-3 py-1 rounded-full mb-3">
            <Compass className="w-3.5 h-3.5 text-rose-400" />
            <span>Attendee & Participant Hub · Explore Events</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
            Attended an Event?{' '}
            <span className="bg-gradient-to-r from-rose-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">
              Turn Your Experience Into Viral Social Posts.
            </span>
          </h1>

          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
            Browse campus fests, hackathons, conferences, and meetups. Select any event you attended to generate polished LinkedIn write-ups, Instagram photo dumps, X threads, and thank-you notes in seconds.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={onCustomExperience}
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 rounded-xl shadow-lg shadow-rose-500/25 transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Share Experience for Any Event</span>
            </button>

            <button
              onClick={onSwitchToOrganizer}
              className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-colors cursor-pointer"
            >
              <Building className="w-3.5 h-3.5 text-slate-400" />
              <span>Conducting an Event? Switch to Organizer</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800/80">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: 'all', label: `All Events (${events.length})` },
            { id: 'hackathon', label: 'Hackathons 🚀' },
            { id: 'college', label: 'College Tech Fests 🎓' },
            { id: 'workshop', label: 'Workshops & Masterclasses 💡' },
            { id: 'conference', label: 'Conferences & Summits 💼' },
          ].map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-slate-800/80'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        <div className="relative shrink-0">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search events, hosts, venue..."
            className="pl-8 pr-3 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 w-full sm:w-60 transition-colors"
          />
        </div>
      </div>

      {/* Events Grid */}
      {filteredEvents.length === 0 ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-12 text-center text-slate-400 text-xs">
          No events found matching your criteria.
          <button
            onClick={onCustomExperience}
            className="block mx-auto mt-3 text-rose-400 hover:underline font-bold text-sm"
          >
            Create experience post for custom event →
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => {
            const d = event.details;
            return (
              <div
                key={event.id}
                className="flex flex-col justify-between rounded-2xl border border-slate-800/90 bg-slate-900/70 hover:border-rose-500/40 hover:shadow-xl transition-all duration-300 p-5 group backdrop-blur-md relative"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-300 bg-rose-950/60 border border-rose-800/50 px-2.5 py-0.5 rounded-full">
                      {d.eventType}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      {d.eventDate}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-rose-200 transition-colors line-clamp-2">
                    {d.eventName}
                  </h3>

                  <div className="mt-3 space-y-1.5 text-xs text-slate-400">
                    <div className="flex items-center gap-2">
                      <Building className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span className="truncate">{d.organizer || 'Organizing Team'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span className="truncate">{d.venue}</span>
                    </div>
                  </div>

                  <p className="mt-3 text-xs text-slate-400 line-clamp-3 leading-relaxed">
                    {d.description || 'Join this exciting community gathering and learn from top experts.'}
                  </p>
                </div>

                <div className="pt-5 mt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  <button
                    onClick={() => onSelectEventForExperience(event)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-bold text-white bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 rounded-xl shadow-md shadow-rose-500/20 active:scale-98 transition-all cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>I Attended This! ✨</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Attendee Callout Box */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-white">Don't see the event you attended?</h4>
          <p className="text-xs text-slate-400 mt-1">
            You can type any hackathon, workshop, or conference you took part in and generate custom recaps!
          </p>
        </div>
        <button
          onClick={onCustomExperience}
          className="px-4 py-2 text-xs font-bold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-colors cursor-pointer whitespace-nowrap"
        >
          Add Custom Event Experience
        </button>
      </div>
    </div>
  );
};
