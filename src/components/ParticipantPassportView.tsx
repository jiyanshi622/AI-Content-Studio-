import React, { useState } from 'react';
import {
  Award,
  Calendar,
  Building,
  MapPin,
  Trophy,
  Copy,
  Check,
  Trash2,
  Share2,
  ExternalLink,
  PlusCircle,
  Download,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { ParticipantExperienceRecord } from '../types';

interface ParticipantPassportViewProps {
  records: ParticipantExperienceRecord[];
  onOpenRecord: (record: ParticipantExperienceRecord) => void;
  onDeleteRecord: (id: string) => void;
  onStartNewExperience: () => void;
  onCopyText: (text: string, title?: string) => void;
}

export const ParticipantPassportView: React.FC<ParticipantPassportViewProps> = ({
  records,
  onOpenRecord,
  onDeleteRecord,
  onStartNewExperience,
  onCopyText,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleDownloadPortfolio = () => {
    if (records.length === 0) return;
    let txt = `========================================================\n`;
    txt += `MY EVENT PASSPORT & EXPERIENCE PORTFOLIO\n`;
    txt += `Generated via AI Content Studio\n`;
    txt += `Total Events Attended: ${records.length}\n`;
    txt += `========================================================\n\n`;

    records.forEach((rec, idx) => {
      const d = rec.details;
      txt += `[${idx + 1}] ${d.eventName.toUpperCase()} (${d.eventType})\n`;
      txt += `Role: ${d.participantRole}\n`;
      txt += `Date & Venue: ${d.eventDate} at ${d.venue}\n`;
      txt += `Organizer: ${d.organizer}\n`;
      if (d.certificateOrPrize) txt += `Award/Honor: ${d.certificateOrPrize}\n`;
      txt += `Highlight: ${d.projectOrHighlight}\n`;
      txt += `Key Learnings: ${d.keyLearnings}\n`;
      if (d.teamOrMentors) txt += `Team/Mentors: ${d.teamOrMentors}\n`;
      txt += `\n--- Generated Posts ---\n`;
      rec.posts.forEach((p) => {
        txt += `\n>> ${p.title.toUpperCase()}:\n${p.content}\n`;
      });
      txt += `\n--------------------------------------------------------\n\n`;
    });

    const blob = new Blob([txt], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `My-Event-Passport-${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in">
      {/* Top Banner */}
      <div className="rounded-3xl border border-rose-500/25 bg-slate-900/85 p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-36 bg-gradient-to-bl from-rose-500/20 via-pink-500/10 to-amber-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800/80">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-rose-300 uppercase tracking-wider bg-rose-950/60 border border-rose-800/50 px-3 py-1 rounded-full mb-2">
              <Trophy className="w-3.5 h-3.5 text-rose-400" />
              <span>Attendee Portfolio · Event Passport</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              My Attended Events & Experiences
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-300">
              Track your hackathons, workshops, and fests. Reuse, edit, and copy your personal experience posts anytime.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onStartNewExperience}
              className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 rounded-xl shadow-lg shadow-rose-500/25 transition-all cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add Event Experience</span>
            </button>

            {records.length > 0 && (
              <button
                onClick={handleDownloadPortfolio}
                className="flex items-center gap-2 px-3.5 py-2.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4 text-slate-400" />
                <span>Export Passport (.txt)</span>
              </button>
            )}
          </div>
        </div>

        {/* Quick Stats Counter */}
        <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Total Events</span>
            <span className="text-xl font-black text-white mt-0.5 block">{records.length}</span>
          </div>
          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Awards & Honors</span>
            <span className="text-xl font-black text-amber-400 mt-0.5 block">
              {records.filter((r) => r.details.certificateOrPrize).length}
            </span>
          </div>
          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Generated Posts</span>
            <span className="text-xl font-black text-rose-400 mt-0.5 block">
              {records.reduce((acc, r) => acc + (r.posts ? r.posts.length : 0), 0)}
            </span>
          </div>
          <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80">
            <span className="text-slate-400 block text-[10px] uppercase font-bold">Network Reach</span>
            <span className="text-xl font-black text-blue-400 mt-0.5 block">LinkedIn & IG</span>
          </div>
        </div>
      </div>

      {/* History Records List */}
      {records.length === 0 ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-12 text-center text-slate-400 text-xs">
          <Trophy className="w-10 h-10 text-slate-600 mx-auto mb-3" />
          <p className="font-bold text-sm text-slate-300">No attended events logged yet</p>
          <p className="mt-1">
            Browse upcoming fests or write an experience write-up for any past event you attended!
          </p>
          <button
            onClick={onStartNewExperience}
            className="mt-4 px-4 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 rounded-xl transition-colors cursor-pointer"
          >
            Add Your First Event
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {records.map((rec) => {
            const d = rec.details;
            return (
              <div
                key={rec.id}
                className="rounded-2xl border border-slate-800/90 bg-slate-900/70 p-5 sm:p-6 hover:border-rose-500/40 transition-all duration-300 backdrop-blur-md shadow-xl"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-rose-300 bg-rose-950/60 border border-rose-800/50 px-2.5 py-0.5 rounded-full">
                        {d.participantRole}
                      </span>
                      {d.certificateOrPrize && (
                        <span className="text-xs font-bold text-amber-300 bg-amber-950/60 border border-amber-800/50 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                          <Award className="w-3 h-3 text-amber-400" />
                          <span>{d.certificateOrPrize}</span>
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-white tracking-tight mt-1.5">
                      {d.eventName}
                    </h3>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400 mt-1">
                      <span>{d.eventType}</span>
                      <span>·</span>
                      <span>🗓 {d.eventDate}</span>
                      <span>·</span>
                      <span>📍 {d.venue}</span>
                      <span>·</span>
                      <span>Host: {d.organizer}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onOpenRecord(rec)}
                      className="px-3.5 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 rounded-xl transition-all shadow-sm cursor-pointer"
                    >
                      View & Copy Posts
                    </button>
                    <button
                      onClick={() => onDeleteRecord(rec.id)}
                      className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                      title="Delete record"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Highlights and Posts Preview */}
                <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/70">
                    <span className="font-bold text-slate-300 block mb-1">🛠️ Built / Highlight:</span>
                    <p className="text-slate-400 leading-relaxed">{d.projectOrHighlight}</p>
                  </div>

                  <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/70">
                    <span className="font-bold text-slate-300 block mb-1">💡 Key Learnings:</span>
                    <p className="text-slate-400 leading-relaxed">{d.keyLearnings}</p>
                  </div>
                </div>

                {/* Quick Post Cards Snippets */}
                {rec.posts && rec.posts.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
                    <span>{rec.posts.length} generated social posts (LinkedIn, Instagram, X, Thank You)</span>
                    <button
                      onClick={() => onOpenRecord(rec)}
                      className="text-rose-400 hover:text-rose-300 font-bold transition-colors cursor-pointer"
                    >
                      Open in Results Studio →
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
