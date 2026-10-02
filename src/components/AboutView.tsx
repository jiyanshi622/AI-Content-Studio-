import React from 'react';
import {
  Sparkles,
  Zap,
  ShieldCheck,
  Languages,
  Image as ImageIcon,
  Video,
  BarChart3,
  Calendar,
  Layers,
  ArrowRight,
  Building,
  Users,
  Trophy,
  Compass,
} from 'lucide-react';

interface AboutViewProps {
  onStartCreating: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onStartCreating }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 animate-in fade-in">
      {/* Hero section */}
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-rose-300 mb-3 px-3.5 py-1 rounded-full bg-rose-950/60 border border-rose-800/50">
          <Sparkles className="w-3.5 h-3.5 text-rose-400" />
          <span>Our Vision & Architecture</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Two Roles. Endless Event Content.
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
          AI Content Studio powers both sides of the event lifecycle: <strong>Event Organizers</strong> conducting the event and <strong>Users / Participants</strong> attending and sharing their experiences.
        </p>
      </div>

      {/* Two Roles Architecture Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Role 1: Event Organizer */}
        <div className="rounded-3xl border border-rose-500/30 bg-slate-900/85 p-6 sm:p-7 shadow-xl backdrop-blur-xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-64 h-24 bg-rose-500/10 blur-2xl pointer-events-none" />

          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-500 flex items-center justify-center text-white shadow-md">
                <Building className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 block">
                  Role 1
                </span>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  Event Organizer (Conducting Events)
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-2">
              For student leaders, clubs, businesses, and event directors who conduct events and need full promotional coverage.
            </p>

            <div className="mt-4 space-y-2 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">✓</span>
                <span><strong>Enter Once:</strong> Input date, venue, target audience, and registration link once.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">✓</span>
                <span><strong>Multi-Channel Content:</strong> Generates Instagram captions, WhatsApp broadcasts, LinkedIn articles, posters, and hashtags.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">✓</span>
                <span><strong>7-Day Marketing Sprint:</strong> Automatic day-by-day countdown posts leading to event day.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-rose-400 font-bold">✓</span>
                <span><strong>Event Storage:</strong> Save, duplicate, and manage conducted events in history.</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800">
            <span className="text-[11px] font-bold text-rose-300 bg-rose-950/60 border border-rose-800/40 px-2.5 py-1 rounded-full">
              Promote · Broadcast · Convert
            </span>
          </div>
        </div>

        {/* Role 2: Users & Participants */}
        <div className="rounded-3xl border border-blue-500/30 bg-slate-900/85 p-6 sm:p-7 shadow-xl backdrop-blur-xl relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-64 h-24 bg-blue-500/10 blur-2xl pointer-events-none" />

          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-md">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 block">
                  Role 2
                </span>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  Users / Participants (Attending Events)
                </h3>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-2">
              For attendees, hackers, winners, speakers, and volunteers who attend events and want to share their achievements.
            </p>

            <div className="mt-4 space-y-2 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">✓</span>
                <span><strong>Explore Events Hub:</strong> Discover upcoming hackathons, fests, workshops, and summits.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">✓</span>
                <span><strong>Personal Experience Generator:</strong> Enter what you built, learned, and your team highlights.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">✓</span>
                <span><strong>Attendee Posts:</strong> High-impact LinkedIn recaps, Instagram photo dump captions, X threads, and thank-you notes.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">✓</span>
                <span><strong>My Event Passport:</strong> Store your event history, badges, honors, and export an attendee portfolio.</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800">
            <span className="text-[11px] font-bold text-cyan-300 bg-cyan-950/60 border border-cyan-800/40 px-2.5 py-1 rounded-full">
              Explore · Share Learnings · Build Portfolio
            </span>
          </div>
        </div>
      </div>

      {/* Quality Guarantees */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-6 sm:p-7">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300 mb-4 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Core AI Precision Principles</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-400">
          <div>
            <h4 className="font-bold text-white text-sm">Zero Fact Hallucination</h4>
            <p className="mt-1.5 leading-relaxed">
              Dates, venues, times, entry fees, and registration links are preserved faithfully without AI inventing random logistics.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-white text-sm">Native Platform Voice</h4>
            <p className="mt-1.5 leading-relaxed">
              We never paste the exact same text across channels. LinkedIn posts sound professional; Instagram captions sound engaging; WhatsApp invites sound personal.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-white text-sm">Full User Control</h4>
            <p className="mt-1.5 leading-relaxed">
              Every card contains an inline editor and one-click regeneration with 7 tonal modifiers so you are always the final editor.
            </p>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="rounded-3xl border border-rose-500/25 bg-gradient-to-r from-rose-950/60 via-slate-900 to-slate-900 p-8 text-center relative overflow-hidden">
        <h3 className="text-xl sm:text-2xl font-black text-white">Ready to create your next event campaign?</h3>
        <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-md mx-auto">
          Conducting an event or sharing your attendee experience — generate ready-to-post copy in seconds.
        </p>
        <button
          onClick={onStartCreating}
          className="mt-6 inline-flex items-center gap-2 px-7 py-3 text-xs font-bold text-white bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 rounded-xl shadow-lg shadow-rose-500/25 transition-all cursor-pointer"
        >
          <span>Get Started ✨</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
