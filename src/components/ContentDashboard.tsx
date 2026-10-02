import React, { useState } from 'react';
import {
  Copy,
  Check,
  RotateCw,
  Edit3,
  CheckCircle2,
  Download,
  Share2,
  Sparkles,
  Calendar,
  Layers,
  Save,
  X,
  Sliders,
  ChevronDown,
  Eye,
  FileCode,
  Search,
  Filter,
  Instagram,
  Linkedin,
  Twitter,
  MessageCircle,
  Mail,
  Hash,
  ArrowRight,
} from 'lucide-react';
import { EventDetails, GeneratedContentItem, RegenerationStyle } from '../types';
import { downloadContentPack } from '../utils/download';
import { PlatformResultCard } from './PlatformResultCard';

interface ContentDashboardProps {
  details: EventDetails;
  items: GeneratedContentItem[];
  onUpdateItemContent: (itemId: string, newContent: string) => void;
  onRegenerateItem: (itemId: string, styleTweak: RegenerationStyle) => Promise<void>;
  onCopyText: (text: string, title?: string) => void;
  onCopyAll: () => void;
  onSaveToMyContent: () => void;
  onCreateCampaign: () => void;
  onEditDetails: () => void;
  isRegeneratingId: string | null;
}

export const ContentDashboard: React.FC<ContentDashboardProps> = ({
  details,
  items,
  onUpdateItemContent,
  onRegenerateItem,
  onCopyText,
  onCopyAll,
  onSaveToMyContent,
  onCreateCampaign,
  onEditDetails,
  isRegeneratingId,
}) => {
  // Category filter & Search state
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState<string>('');

  // Filter items by category & search
  const filteredItems = items.filter((item) => {
    if (selectedCategoryFilter === 'social') {
      if (!['instagram_caption', 'instagram_post', 'linkedin_post', 'twitter_post'].includes(item.typeId)) {
        return false;
      }
    } else if (selectedCategoryFilter === 'messaging') {
      if (!['whatsapp_invitation', 'short_promo'].includes(item.typeId)) {
        return false;
      }
    } else if (selectedCategoryFilter === 'marketing') {
      if (!['email_invitation', 'event_announcement'].includes(item.typeId)) {
        return false;
      }
    } else if (selectedCategoryFilter === 'print') {
      if (!['poster_text'].includes(item.typeId)) {
        return false;
      }
    } else if (selectedCategoryFilter === 'hashtags') {
      if (item.typeId !== 'hashtags') {
        return false;
      }
    }

    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase();
      return (
        item.title.toLowerCase().includes(q) ||
        item.content.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in">
      {/* Top Banner & Master Control Deck with Sunset Peach / Rose Glow */}
      <div className="rounded-3xl border border-rose-500/25 bg-slate-900/85 p-6 sm:p-7 shadow-2xl backdrop-blur-xl relative overflow-hidden">
        {/* Ambient Top Glow Orbs */}
        <div className="absolute top-0 right-0 w-96 h-36 bg-gradient-to-bl from-rose-500/20 via-pink-500/15 to-amber-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-72 h-28 bg-indigo-500/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-rose-400 mb-1.5 uppercase tracking-wider">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
              <span>AI Content Studio</span>
              <span aria-hidden="true">·</span>
              <span>Generated Results & Social Media Boxes</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              {details.eventName}
            </h1>
            <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-slate-300">
              <span className="font-bold text-rose-300 bg-rose-950/60 border border-rose-800/50 px-2.5 py-0.5 rounded-full">
                {details.eventType}
              </span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="font-mono text-slate-200">🗓 {details.eventDate}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="font-mono text-slate-200">⏰ {details.eventTime}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>📍 {details.venue}</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-amber-300 font-semibold bg-amber-950/50 px-2 py-0.5 rounded-full border border-amber-800/40">
                Tone: {details.tone}
              </span>
            </div>
          </div>

          {/* Master Actions Deck */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={onCopyAll}
              className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 active:scale-95 rounded-xl shadow-lg shadow-rose-500/25 transition-all cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy All Content</span>
            </button>

            <button
              onClick={() => downloadContentPack(details, items)}
              className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 active:scale-95 border border-slate-700 rounded-xl transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-slate-300" />
              <span>Download Pack</span>
            </button>

            <button
              onClick={onSaveToMyContent}
              className="flex items-center gap-2 px-3.5 py-2.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-800 rounded-xl transition-colors cursor-pointer"
            >
              <Save className="w-3.5 h-3.5 text-slate-400" />
              <span>Save Event</span>
            </button>

            <button
              onClick={onEditDetails}
              className="flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 rounded-xl transition-colors cursor-pointer"
            >
              <span>Edit Details</span>
            </button>
          </div>
        </div>

        {/* Campaign Strategic Sprint Banner */}
        <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs relative z-10">
          <div className="flex items-center gap-2.5 text-slate-300">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              Need a full multi-day promotional strategy? Generate a <strong>7-Day Event Marketing Sprint</strong> with day-by-day countdown posts!
            </span>
          </div>
          <button
            onClick={onCreateCampaign}
            className="self-start sm:self-auto px-4 py-1.5 font-bold text-amber-300 hover:text-white bg-amber-950/70 hover:bg-amber-900 border border-amber-800/60 rounded-xl transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer shadow-md hover:scale-102"
          >
            <span>Create 7-Day Campaign ✨</span>
          </button>
        </div>
      </div>

      {/* Filter and View Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-800/80">
        {/* Category Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: 'all', label: `All Deliverables (${items.length})` },
            { id: 'social', label: 'Instagram, LinkedIn & X' },
            { id: 'messaging', label: 'WhatsApp Broadcast' },
            { id: 'marketing', label: 'Email & Announcement' },
            { id: 'print', label: 'Poster & Banner' },
            { id: 'hashtags', label: 'Hashtags Cloud' },
          ].map((cat) => {
            const isActive = selectedCategoryFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategoryFilter(cat.id)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-md shadow-rose-500/20'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-slate-800/70'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Search within deliverables */}
        <div className="relative shrink-0">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5 pointer-events-none" />
          <input
            type="text"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            placeholder="Search in copy..."
            className="pl-8 pr-3 py-1.5 text-xs bg-slate-950 border border-slate-800 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 w-44 sm:w-52 transition-colors"
          />
        </div>
      </div>

      {/* Generated Platform Result Boxes Grid */}
      {filteredItems.length === 0 ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-12 text-center text-slate-400 text-xs">
          No content matches your selected category or search query.
          <button
            onClick={() => {
              setSelectedCategoryFilter('all');
              setSearchFilter('');
            }}
            className="block mx-auto mt-3 text-rose-400 hover:underline font-bold"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredItems.map((item) => (
            <PlatformResultCard
              key={item.id}
              item={item}
              details={details}
              onCopy={onCopyText}
              onSaveEdit={(newContent) => onUpdateItemContent(item.id, newContent)}
              onRegenerate={(styleTweak) => onRegenerateItem(item.id, styleTweak)}
              isRegenerating={isRegeneratingId === item.id}
            />
          ))}
        </div>
      )}

      {/* Sticky Bottom Floating Quick Bar */}
      <div className="sticky bottom-6 z-30 max-w-2xl mx-auto rounded-2xl border border-rose-500/25 bg-slate-900/90 shadow-2xl backdrop-blur-md p-3 px-4 flex items-center justify-between gap-3">
        <div className="text-xs text-slate-300 font-semibold pl-1 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>{items.length} Ready-to-Post Deliverables</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => downloadContentPack(details, items)}
            className="px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors cursor-pointer border border-slate-700"
          >
            Download Pack (.txt)
          </button>
          <button
            onClick={onCopyAll}
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 rounded-xl shadow-md transition-all cursor-pointer"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Copy All</span>
          </button>
        </div>
      </div>
    </div>
  );
};
