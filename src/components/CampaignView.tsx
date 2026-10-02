import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Share2,
  Copy,
  Check,
  Download,
  Sparkles,
  Edit3,
  Save,
  RotateCw,
  Hash,
  ChevronRight,
  ArrowLeft,
} from 'lucide-react';
import { CampaignDay, EventCampaign, EventDetails } from '../types';
import { downloadCampaignPlan } from '../utils/download';

interface CampaignViewProps {
  details: EventDetails;
  campaign: EventCampaign | null;
  isLoading: boolean;
  onGenerateCampaign: () => Promise<void>;
  onCopyText: (text: string, label?: string) => void;
  onBackToDashboard: () => void;
  onUpdateCampaignDay?: (dayNumber: number, newContent: string) => void;
}

export const CampaignView: React.FC<CampaignViewProps> = ({
  details,
  campaign,
  isLoading,
  onGenerateCampaign,
  onCopyText,
  onBackToDashboard,
  onUpdateCampaignDay,
}) => {
  const [copiedDay, setCopiedDay] = useState<number | null>(null);
  const [editingDay, setEditingDay] = useState<number | null>(null);
  const [editBuffer, setEditBuffer] = useState<string>('');

  const handleCopyDay = (day: CampaignDay) => {
    const fullText = `${day.headline}\n\n${day.postContent}\n\n${day.hashtags.join(' ')}`;
    onCopyText(fullText, `Day ${day.dayNumber} Post`);
    setCopiedDay(day.dayNumber);
    setTimeout(() => setCopiedDay(null), 2500);
  };

  const handleCopyEntireCampaign = () => {
    if (!campaign) return;
    let full = `7-DAY PROMOTIONAL CAMPAIGN: ${campaign.eventName}\n\n`;
    campaign.days.forEach((d) => {
      full += `--- DAY ${d.dayNumber}: ${d.dayTitle.toUpperCase()} (${d.stage}) ---\n`;
      full += `Best Time: ${d.recommendedTiming} | Platforms: ${d.suggestedPlatform}\n`;
      full += `${d.headline}\n\n${d.postContent}\n\n${d.hashtags.join(' ')}\n\n`;
    });
    onCopyText(full, 'Complete 7-Day Campaign');
  };

  const handleStartEdit = (day: CampaignDay) => {
    setEditingDay(day.dayNumber);
    setEditBuffer(day.postContent);
  };

  const handleSaveEdit = (dayNumber: number) => {
    if (onUpdateCampaignDay) {
      onUpdateCampaignDay(dayNumber, editBuffer);
    }
    setEditingDay(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Campaign Header */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl backdrop-blur-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Multi-Day Strategy Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              7-Day Event Campaign Generator
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-400">
              Transform your event into a complete 7-day marketing sequence with structured pacing,
              engagement hooks, and platform timing.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {campaign && (
              <>
                <button
                  onClick={handleCopyEntireCampaign}
                  className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-sm transition-all"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Entire Campaign</span>
                </button>
                <button
                  onClick={() => downloadCampaignPlan(campaign)}
                  className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-slate-300" />
                  <span>Download Plan</span>
                </button>
              </>
            )}
            <button
              onClick={onBackToDashboard}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-400 hover:text-slate-200 bg-slate-900 border border-slate-800 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Content</span>
            </button>
          </div>
        </div>

        {/* Campaign Generation Status / Trigger */}
        {!campaign && !isLoading && (
          <div className="pt-6 text-center max-w-md mx-auto py-8">
            <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-800/50 text-cyan-400 flex items-center justify-center mx-auto mb-3">
              <Calendar className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-white">Generate 7-Day Campaign Strategy</h2>
            <p className="text-xs text-slate-400 mt-1">
              AI will architect a daily promotional schedule for “{details.eventName}” across Announcement,
              Benefits, Speaker Spotlights, Urgency Reminders, and Event Day engagement.
            </p>
            <button
              onClick={onGenerateCampaign}
              className="mt-5 px-6 py-3 text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 rounded-xl shadow-lg transition-all"
            >
              Generate 7-Day Campaign ✨
            </button>
          </div>
        )}

        {isLoading && (
          <div className="pt-6 py-12 text-center">
            <div className="w-10 h-10 border-3 border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin mx-auto mb-4" />
            <h3 className="text-base font-semibold text-white">Architecting 7-Day Marketing Sprint...</h3>
            <p className="text-xs text-slate-400 mt-1">
              Designing pacing, headline hooks, and conversion triggers for each milestone.
            </p>
          </div>
        )}

        {campaign && (
          <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-400">
            <div>
              <span className="font-semibold text-slate-300">Campaign: </span>
              <span>{campaign.campaignTitle}</span>
              <span className="mx-2">·</span>
              <span>7 Strategic Touchpoints</span>
            </div>
            <button
              onClick={onGenerateCampaign}
              className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Regenerate Campaign</span>
            </button>
          </div>
        )}
      </div>

      {/* 7-Day Roadmap Timeline */}
      {campaign && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {campaign.days.map((day) => {
              const isCopied = copiedDay === day.dayNumber;
              const isEditing = editingDay === day.dayNumber;

              return (
                <div
                  key={day.dayNumber}
                  className="rounded-xl border border-slate-800 bg-slate-900/50 p-5 sm:p-6 transition-all hover:border-slate-700/80 shadow-md"
                >
                  {/* Top Bar for Day */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-700/50 text-cyan-300 font-extrabold text-base flex items-center justify-center font-mono shrink-0">
                        D{day.dayNumber}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold text-white">{day.dayTitle}</h3>
                          <span className="text-[11px] font-medium text-cyan-300 bg-cyan-950/60 border border-cyan-800/50 px-2 py-0.5 rounded">
                            {day.stage}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                          <Clock className="w-3.5 h-3.5 text-slate-500" />
                          <span>Post at {day.recommendedTiming}</span>
                          <span>·</span>
                          <Share2 className="w-3.5 h-3.5 text-slate-500" />
                          <span>{day.suggestedPlatform}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCopyDay(day)}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 active:scale-95 border border-slate-700 rounded-lg transition-all"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-300">Copied ✓</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5 text-slate-300" />
                            <span>Copy Day {day.dayNumber}</span>
                          </>
                        )}
                      </button>

                      {!isEditing && (
                        <button
                          onClick={() => handleStartEdit(day)}
                          className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors"
                          title="Edit post"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Headline Hook */}
                  <div className="mt-4 pb-2">
                    <span className="text-[11px] uppercase tracking-wider text-slate-500 font-bold">
                      Headline Hook
                    </span>
                    <p className="text-sm font-semibold text-slate-100 mt-0.5">{day.headline}</p>
                  </div>

                  {/* Body Content */}
                  <div className="mt-2 bg-slate-950/80 rounded-lg border border-slate-800/80 p-4">
                    {isEditing ? (
                      <div className="space-y-3">
                        <textarea
                          rows={6}
                          value={editBuffer}
                          onChange={(e) => setEditBuffer(e.target.value)}
                          className="w-full p-2.5 text-xs sm:text-sm bg-slate-900 border border-slate-700 rounded-lg text-white font-sans focus:outline-none focus:border-cyan-500"
                        />
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setEditingDay(null)}
                            className="px-3 py-1.5 text-xs text-slate-400 hover:text-slate-200"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleSaveEdit(day.dayNumber)}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg"
                          >
                            <Save className="w-3.5 h-3.5" />
                            <span>Save Changes</span>
                          </button>
                        </div>
                      </div>
                    ) : (
                      <pre className="text-xs sm:text-sm text-slate-200 whitespace-pre-wrap font-sans leading-relaxed">
                        {day.postContent}
                      </pre>
                    )}
                  </div>

                  {/* Hashtags */}
                  {day.hashtags && day.hashtags.length > 0 && (
                    <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs text-indigo-400">
                      <Hash className="w-3.5 h-3.5 text-slate-500" />
                      {day.hashtags.map((tag, idx) => (
                        <span key={idx} className="hover:text-indigo-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
