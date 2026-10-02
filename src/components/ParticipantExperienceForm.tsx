import React, { useState } from 'react';
import {
  Sparkles,
  Award,
  BookOpen,
  Users,
  Trophy,
  Calendar,
  MapPin,
  Building,
  Check,
  ChevronDown,
  ArrowLeft,
  Share2,
} from 'lucide-react';
import { ContentTone, ParticipantDetails, ParticipantRole } from '../types';

interface ParticipantExperienceFormProps {
  initialData?: Partial<ParticipantDetails>;
  onSubmit: (details: ParticipantDetails) => void;
  isLoading: boolean;
  onCancel?: () => void;
}

const PARTICIPANT_ROLES: { id: ParticipantRole; label: string; desc: string }[] = [
  { id: 'Winner / Awardee', label: '🏆 Winner / Awardee', desc: 'Won a prize, top hack, or special recognition' },
  { id: 'Project Builder', label: '🛠️ Project Builder', desc: 'Built and submitted a working project or demo' },
  { id: 'Hackathon Participant', label: '💻 Hackathon Participant', desc: 'Competed, coded overnight, and learned with peers' },
  { id: 'Attendee', label: '🎓 Attendee / Learner', desc: 'Participated in sessions, workshops, and networking' },
  { id: 'Speaker / Panelist', label: '🎤 Speaker / Panelist', desc: 'Delivered a talk, workshop, or panel contribution' },
  { id: 'Volunteer / Organizer Staff', label: '🤝 Volunteer / Staff', desc: 'Helped coordinate and run the event behind the scenes' },
];

const TONE_OPTIONS: { id: ContentTone; label: string; desc: string }[] = [
  { id: 'Exciting', label: 'Exciting & Hype', desc: 'High energy, enthusiastic, celebratory' },
  { id: 'Professional', label: 'Professional & Polished', desc: 'Authoritative, great for LinkedIn thought leadership' },
  { id: 'Friendly', label: 'Warm & Grateful', desc: 'Appreciative, focused on community and friends' },
  { id: 'Aesthetic', label: 'Aesthetic & Clean', desc: 'Minimalist line breaks, stylish photo dump tone' },
  { id: 'Minimal', label: 'Crisp & Direct', desc: 'Punchy key points, zero filler words' },
];

export const ParticipantExperienceForm: React.FC<ParticipantExperienceFormProps> = ({
  initialData,
  onSubmit,
  isLoading,
  onCancel,
}) => {
  const [eventName, setEventName] = useState(initialData?.eventName || '');
  const [eventType, setEventType] = useState(initialData?.eventType || 'Hackathon / Tech Fest');
  const [eventDate, setEventDate] = useState(initialData?.eventDate || 'April 18-19, 2026');
  const [venue, setVenue] = useState(initialData?.venue || 'Campus Auditorium');
  const [organizer, setOrganizer] = useState(initialData?.organizer || 'College Tech Board');
  const [participantRole, setParticipantRole] = useState<ParticipantRole>(
    initialData?.participantRole || 'Winner / Awardee'
  );
  const [projectOrHighlight, setProjectOrHighlight] = useState(
    initialData?.projectOrHighlight || 'Built an AI accessibility tool for neurodivergent students in 24 hours'
  );
  const [keyLearnings, setKeyLearnings] = useState(
    initialData?.keyLearnings || 'Prompt engineering, rapid prototyping under pressure, and pitching to industry judges'
  );
  const [teamOrMentors, setTeamOrMentors] = useState(
    initialData?.teamOrMentors || 'Teammates @Alex & @Priya, mentors from Google AI'
  );
  const [certificateOrPrize, setCertificateOrPrize] = useState(
    initialData?.certificateOrPrize || '1st Place Winner — Best AI Hack Award 🏆'
  );
  const [tone, setTone] = useState<ContentTone>(initialData?.tone || 'Exciting');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventName.trim()) return;

    onSubmit({
      eventName,
      eventType,
      eventDate,
      venue,
      organizer,
      participantRole,
      projectOrHighlight,
      keyLearnings,
      teamOrMentors,
      certificateOrPrize,
      tone,
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Explorer</span>
          </button>
        )}
        <div className="text-right ml-auto">
          <span className="text-[11px] font-bold text-rose-400 uppercase tracking-wider bg-rose-950/60 border border-rose-800/50 px-2.5 py-0.5 rounded-full">
            🎓 Attendee Social Post Generator
          </span>
        </div>
      </div>

      <div className="rounded-3xl border border-rose-500/25 bg-slate-900/85 p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-32 bg-gradient-to-bl from-rose-500/20 via-pink-500/10 to-amber-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 mb-6 pb-6 border-b border-slate-800/80">
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Share Your Experience at{' '}
            <span className="bg-gradient-to-r from-rose-400 to-amber-300 bg-clip-text text-transparent">
              {eventName || 'Your Event'}
            </span>
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
            Enter what you built, learned, or experienced. AI Content Studio creates high-impact LinkedIn recaps, Instagram photo dump captions, and X threads that highlight your achievements!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
          {/* Section 1: Event Identity */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5 space-y-4">
            <span className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-rose-950 text-rose-300 border border-rose-800/50 flex items-center justify-center text-[10px]">
                1
              </span>
              <span>Event Details</span>
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Event Name *
                </label>
                <input
                  type="text"
                  required
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  placeholder="e.g. College Tech Fest 2026, AI Summit"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-900 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Event Type
                </label>
                <input
                  type="text"
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  placeholder="e.g. 24h Hackathon, Robotics Fest, Workshop"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-900 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Organizer / Host Name
                </label>
                <input
                  type="text"
                  value={organizer}
                  onChange={(e) => setOrganizer(e.target.value)}
                  placeholder="e.g. College Student Tech Board"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-900 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Event Date & Venue
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    placeholder="Date"
                    className="w-1/2 px-3 py-2 text-xs bg-slate-900 border border-slate-700/80 rounded-xl text-white focus:outline-none focus:border-rose-500"
                  />
                  <input
                    type="text"
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                    placeholder="Venue"
                    className="w-1/2 px-3 py-2 text-xs bg-slate-900 border border-slate-700/80 rounded-xl text-white focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Your Participation Role */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5 space-y-4">
            <span className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-rose-950 text-rose-300 border border-rose-800/50 flex items-center justify-center text-[10px]">
                2
              </span>
              <span>Your Role at the Event</span>
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {PARTICIPANT_ROLES.map((r) => {
                const isSelected = participantRole === r.id;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setParticipantRole(r.id)}
                    className={`text-left p-3 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-rose-500 bg-rose-950/40 text-white shadow-md shadow-rose-500/15'
                        : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="font-bold text-xs">{r.label}</div>
                    <div className="text-[10px] text-slate-400 mt-1">{r.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 3: Highlights, Project & Learnings */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5 space-y-4">
            <span className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-rose-950 text-rose-300 border border-rose-800/50 flex items-center justify-center text-[10px]">
                3
              </span>
              <span>What You Built & Learned</span>
            </span>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  What Did You Build / Key Highlight? *
                </label>
                <textarea
                  rows={2}
                  required
                  value={projectOrHighlight}
                  onChange={(e) => setProjectOrHighlight(e.target.value)}
                  placeholder="e.g. Created NeuroBridge: a real-time accessibility copilot that generates visual notes during college lectures"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-900 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Key Learnings & Takeaways *
                </label>
                <textarea
                  rows={2}
                  required
                  value={keyLearnings}
                  onChange={(e) => setKeyLearnings(e.target.value)}
                  placeholder="e.g. Designing low-latency prompts, pitch deck storytelling for tech VCs, and shipping code under a 24-hour deadline"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-900 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Teammates, Mentors, or Partners to Tag
                  </label>
                  <input
                    type="text"
                    value={teamOrMentors}
                    onChange={(e) => setTeamOrMentors(e.target.value)}
                    placeholder="e.g. @Alex (UI/UX), @Sam (Backend), Mentor Dr. Roy"
                    className="w-full px-3.5 py-2 text-xs bg-slate-900 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Prize / Certificate Received
                  </label>
                  <input
                    type="text"
                    value={certificateOrPrize}
                    onChange={(e) => setCertificateOrPrize(e.target.value)}
                    placeholder="e.g. 1st Place Winner, Best Innovation Award, Certificate"
                    className="w-full px-3.5 py-2 text-xs bg-slate-900 border border-slate-700/80 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Post Tone */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5 space-y-3">
            <span className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-rose-950 text-rose-300 border border-rose-800/50 flex items-center justify-center text-[10px]">
                4
              </span>
              <span>Select Writing Tone</span>
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
              {TONE_OPTIONS.map((t) => {
                const isSelected = tone === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTone(t.id)}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'border-rose-500 bg-rose-950/50 text-white font-bold'
                        : 'border-slate-800 bg-slate-900 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="text-xs">{t.label}</div>
                    <div className="text-[9px] text-slate-500 mt-0.5 truncate">{t.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-4 px-6 rounded-2xl font-bold text-base text-white flex items-center justify-center gap-3 shadow-xl transition-all cursor-pointer ${
                isLoading
                  ? 'bg-rose-700/60 cursor-not-allowed opacity-80'
                  : 'bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-600 active:scale-98 shadow-rose-500/30'
              }`}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Synthesizing Your Experience Posts...</span>
                </>
              ) : (
                <>
                  <span>Generate My Social Posts ✨</span>
                  <Sparkles className="w-5 h-5 text-white" />
                </>
              )}
            </button>
            <p className="text-center text-xs text-slate-500 mt-2.5">
              Generates ready-to-post LinkedIn recap, Instagram dump caption, X thread, and thank-you note with one-click copy.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
