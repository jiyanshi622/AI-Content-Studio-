import React from 'react';
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  Check,
  CheckCheck,
  ThumbsUp,
  Repeat2,
  Send,
  Linkedin,
  Instagram,
  Twitter,
  Mail,
  FileText,
} from 'lucide-react';
import { GeneratedContentItem, EventDetails } from '../types';

interface LivePlatformMockupProps {
  item: GeneratedContentItem;
  details: EventDetails;
}

export const LivePlatformMockup: React.FC<LivePlatformMockupProps> = ({ item, details }) => {
  const orgHandle = details.organizer
    ? details.organizer.toLowerCase().replace(/[^a-z0-9]/g, '_')
    : 'event_official';

  // 1. Instagram Post Mockup
  if (item.typeId === 'instagram_caption' || item.typeId === 'instagram_post') {
    return (
      <div className="rounded-xl border border-slate-700/80 bg-slate-950 overflow-hidden text-xs shadow-xl">
        {/* Instagram Header */}
        <div className="flex items-center justify-between p-3 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 p-[1.5px]">
              <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center text-[10px] font-bold text-white uppercase">
                {orgHandle.slice(0, 2)}
              </div>
            </div>
            <div>
              <div className="font-bold text-slate-100 flex items-center gap-1">
                <span>{orgHandle}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              </div>
              <div className="text-[10px] text-slate-500">{details.venue.slice(0, 24)}</div>
            </div>
          </div>
          <MoreHorizontal className="w-4 h-4 text-slate-500" />
        </div>

        {/* Visual Simulated Media Box */}
        <div className="aspect-[4/3] bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 flex flex-col items-center justify-center p-6 text-center border-y border-slate-800 relative">
          <div className="text-[10px] font-mono uppercase tracking-widest text-indigo-400 font-bold mb-1">
            {details.eventType}
          </div>
          <div className="text-base sm:text-lg font-black text-white max-w-xs leading-tight">
            {details.eventName}
          </div>
          <div className="mt-2 text-[11px] text-indigo-200/90 font-medium">
            🗓 {details.eventDate} · ⏰ {details.eventTime}
          </div>
          <div className="mt-4 px-3 py-1 rounded-full bg-white text-slate-950 font-bold text-[11px] shadow-md">
            Tap Link in Bio
          </div>
        </div>

        {/* Action icons */}
        <div className="p-3 pb-1 flex items-center justify-between text-slate-300">
          <div className="flex items-center gap-3">
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500/20 hover:scale-110 transition-transform" />
            <MessageCircle className="w-4 h-4 hover:text-white" />
            <Share2 className="w-4 h-4 hover:text-white" />
          </div>
          <Bookmark className="w-4 h-4 hover:text-white" />
        </div>

        {/* Likes & Caption */}
        <div className="p-3 pt-1 space-y-1">
          <div className="font-bold text-slate-200 text-[11px]">842 likes</div>
          <div className="text-slate-300 whitespace-pre-wrap leading-relaxed line-clamp-6 text-[11px]">
            <span className="font-bold text-white mr-1.5">{orgHandle}</span>
            {item.content}
          </div>
        </div>
      </div>
    );
  }

  // 2. WhatsApp Invitation Mockup
  if (item.typeId === 'whatsapp_invitation') {
    return (
      <div className="rounded-xl border border-emerald-950/80 bg-slate-950 overflow-hidden text-xs shadow-xl">
        {/* WhatsApp Top Bar */}
        <div className="bg-[#1f2c34] p-3 flex items-center justify-between text-slate-200 border-b border-emerald-900/40">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-emerald-600 flex items-center justify-center font-bold text-white text-[11px]">
              {details.eventName.slice(0, 1)}
            </div>
            <div>
              <div className="font-semibold text-slate-100 text-xs">Event Announcement Group</div>
              <div className="text-[10px] text-emerald-400">online</div>
            </div>
          </div>
          <div className="text-[10px] text-slate-400">WhatsApp</div>
        </div>

        {/* Chat Background with Bubble */}
        <div className="p-4 bg-[#0b141a] min-h-[220px] flex flex-col justify-end">
          <div className="bg-[#005c4b] text-slate-100 rounded-lg p-3.5 max-w-[90%] self-end shadow-md border border-emerald-800/40">
            <div className="whitespace-pre-wrap font-sans text-xs leading-relaxed">
              {item.content}
            </div>
            <div className="mt-2 flex items-center justify-end gap-1 text-[10px] text-emerald-200/70">
              <span>Just now</span>
              <CheckCheck className="w-3.5 h-3.5 text-cyan-400" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 3. LinkedIn Post Mockup
  if (item.typeId === 'linkedin_post') {
    return (
      <div className="rounded-xl border border-slate-700/80 bg-slate-950 p-4 text-xs shadow-xl space-y-3">
        {/* Author Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-indigo-700 flex items-center justify-center text-white font-bold text-xs uppercase">
              {details.organizer ? details.organizer.slice(0, 2) : 'EX'}
            </div>
            <div>
              <div className="font-bold text-white flex items-center gap-1.5">
                <span>{details.organizer || 'Event Leadership Board'}</span>
                <span className="text-[10px] text-slate-500 font-normal">· 1st</span>
              </div>
              <div className="text-[10px] text-slate-400">Organizing Committee & Community Host</div>
              <div className="text-[10px] text-slate-500">1d · Edited · 🌐</div>
            </div>
          </div>
          <Linkedin className="w-4 h-4 text-blue-400" />
        </div>

        {/* LinkedIn Post Body */}
        <div className="text-slate-200 whitespace-pre-wrap leading-relaxed max-h-56 overflow-y-auto font-sans pr-1">
          {item.content}
        </div>

        {/* Reaction Bar */}
        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-slate-400 text-[11px]">
          <div className="flex items-center gap-1">
            <div className="flex -space-x-1">
              <span className="w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center text-[9px] text-white">
                👍
              </span>
              <span className="w-4 h-4 rounded-full bg-emerald-600 flex items-center justify-center text-[9px] text-white">
                👏
              </span>
            </div>
            <span className="text-slate-400 ml-1">142 reactions</span>
          </div>
          <span>36 comments · 12 reposts</span>
        </div>

        <div className="pt-2 border-t border-slate-800/80 grid grid-cols-4 text-center text-slate-400 text-[11px]">
          <button className="py-1 hover:text-white flex items-center justify-center gap-1">
            <ThumbsUp className="w-3.5 h-3.5" />
            <span>Like</span>
          </button>
          <button className="py-1 hover:text-white flex items-center justify-center gap-1">
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Comment</span>
          </button>
          <button className="py-1 hover:text-white flex items-center justify-center gap-1">
            <Repeat2 className="w-3.5 h-3.5" />
            <span>Repost</span>
          </button>
          <button className="py-1 hover:text-white flex items-center justify-center gap-1">
            <Send className="w-3.5 h-3.5" />
            <span>Send</span>
          </button>
        </div>
      </div>
    );
  }

  // 4. Twitter / X Post Mockup
  if (item.typeId === 'twitter_post' || item.typeId === 'short_promo') {
    return (
      <div className="rounded-xl border border-slate-700/80 bg-slate-950 p-4 text-xs shadow-xl space-y-2.5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-white">
              {orgHandle.slice(0, 1).toUpperCase()}
            </div>
            <div>
              <div className="font-bold text-white flex items-center gap-1">
                <span>{details.organizer || 'Official Organizers'}</span>
                <span className="text-slate-400 font-normal">@{orgHandle}</span>
              </div>
              <div className="text-[10px] text-slate-500">Official Channel</div>
            </div>
          </div>
          <Twitter className="w-4 h-4 text-sky-400" />
        </div>

        <div className="text-slate-100 text-sm whitespace-pre-wrap leading-relaxed">
          {item.content}
        </div>

        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-slate-500 text-[11px]">
          <span>10:30 AM · Today · 2,410 Views</span>
        </div>
      </div>
    );
  }

  // 5. Default Clean Text Display
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 text-xs font-sans text-slate-200 leading-relaxed whitespace-pre-wrap max-h-64 overflow-y-auto">
      {item.content}
    </div>
  );
};
