import React, { useState } from 'react';
import {
  Copy,
  Check,
  RotateCw,
  Edit3,
  Save,
  ChevronDown,
  Eye,
  FileCode,
  Share2,
  Sparkles,
  ExternalLink,
  ThumbsUp,
  MessageCircle,
  Repeat2,
  Send,
  MoreHorizontal,
  Bookmark,
  Heart,
  CheckCheck,
  Hash,
  ArrowUpRight,
  Sliders,
  X,
  Type,
  AlignLeft,
} from 'lucide-react';
import { GeneratedContentItem, EventDetails, RegenerationStyle } from '../types';

interface PlatformResultCardProps {
  item: GeneratedContentItem;
  details: EventDetails;
  onCopy: (text: string, title?: string) => void;
  onSaveEdit: (newContent: string) => void;
  onRegenerate: (style: RegenerationStyle) => void;
  isRegenerating: boolean;
}

const REGEN_OPTIONS: { id: RegenerationStyle; label: string; desc: string }[] = [
  { id: 'more_creative', label: 'More Creative & Viral', desc: 'Punchy hooks, vivid vocabulary, high energy' },
  { id: 'more_professional', label: 'More Professional', desc: 'Authoritative, polished vocabulary for executives' },
  { id: 'shorter', label: 'Shorter & Punchier', desc: 'Condensed, mobile-first quick read' },
  { id: 'more_engaging', label: 'More Engaging (High CTR)', desc: 'Provocative question & call-to-action' },
  { id: 'more_aesthetic', label: 'More Aesthetic & Minimal', desc: 'Elegant spacing & curated aesthetic vibe' },
  { id: 'add_emojis', label: 'Add Trending Emojis 🚀', desc: 'Boost visual flair and stop the scroll' },
  { id: 'remove_emojis', label: 'Remove All Emojis', desc: 'Clean, pristine corporate text presentation' },
];

export const PlatformResultCard: React.FC<PlatformResultCardProps> = ({
  item,
  details,
  onCopy,
  onSaveEdit,
  onRegenerate,
  isRegenerating,
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isCopiedSubject, setIsCopiedSubject] = useState(false);
  const [isCopiedHashtag, setIsCopiedHashtag] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editBuffer, setEditBuffer] = useState(item.content);
  const [isRegenMenuOpen, setIsRegenMenuOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'editor' | 'mockup'>('editor');

  const charCount = item.content.length;
  const wordCount = item.content.split(/\s+/).filter(Boolean).length;
  const readingTimeSeconds = Math.max(5, Math.round((wordCount / 200) * 60));

  const handleCopyMain = () => {
    onCopy(item.content, item.title);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2200);
  };

  const handleSave = () => {
    onSaveEdit(editBuffer);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditBuffer(item.content);
    setIsEditing(false);
  };

  const handleRegenSelect = (style: RegenerationStyle) => {
    setIsRegenMenuOpen(false);
    onRegenerate(style);
  };

  // Helper to extract Subject Line for Email
  const extractEmailSubject = () => {
    const match = item.content.match(/Subject:\s*(.*?)(\n|$)/i);
    return match ? match[1].trim() : `${details.eventName} — Official Invitation`;
  };

  // Helper to extract email body without the subject prefix
  const extractEmailBody = () => {
    return item.content.replace(/^Subject:.*?\n+/i, '').trim();
  };

  // Helper to extract individual hashtags
  const extractHashtags = () => {
    const tags = item.content.match(/#[a-zA-Z0-9_]+/g);
    return tags ? Array.from(new Set(tags)) : [];
  };

  // External Direct Sharing Helpers
  const getWhatsAppShareUrl = () => {
    return `https://api.whatsapp.com/send?text=${encodeURIComponent(item.content)}`;
  };

  const getTwitterShareUrl = () => {
    return `https://twitter.com/intent/tweet?text=${encodeURIComponent(item.content.slice(0, 280))}`;
  };

  const getLinkedInShareUrl = () => {
    return `https://www.linkedin.com/feed/?shareActive=true&text=${encodeURIComponent(item.content)}`;
  };

  // Platform Branded Configurations
  const getBranding = () => {
    switch (item.typeId) {
      case 'instagram_caption':
      case 'instagram_post':
        return {
          name: 'Instagram',
          categoryTag: 'Social Feed & Reels Caption',
          topBar: 'bg-gradient-to-r from-[#f09433] via-[#dc2743] to-[#bc1888]',
          badgeBg: 'bg-rose-500/15 border-rose-500/30 text-rose-300',
          copyBtn: 'bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white shadow-rose-500/20',
          accentBorder: 'hover:border-rose-500/40',
          copyLabel: 'Copy Caption',
          limit: 2200,
          hasMockup: true,
          iconSvg: (
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          ),
        };

      case 'linkedin_post':
        return {
          name: 'LinkedIn',
          categoryTag: 'Professional Thought Leadership',
          topBar: 'bg-[#0A66C2]',
          badgeBg: 'bg-blue-500/15 border-blue-500/30 text-blue-300',
          copyBtn: 'bg-[#0A66C2] hover:bg-[#004182] text-white shadow-blue-500/20',
          accentBorder: 'hover:border-blue-500/40',
          copyLabel: 'Copy Post',
          limit: 3000,
          hasMockup: true,
          iconSvg: (
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          ),
        };

      case 'whatsapp_invitation':
        return {
          name: 'WhatsApp',
          categoryTag: 'Direct Chat & Group Broadcast',
          topBar: 'bg-[#25D366]',
          badgeBg: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300',
          copyBtn: 'bg-[#25D366] hover:bg-[#128C7E] text-slate-950 font-bold shadow-emerald-500/20',
          accentBorder: 'hover:border-emerald-500/40',
          copyLabel: 'Copy for WhatsApp',
          limit: 1024,
          hasMockup: true,
          iconSvg: (
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
            </svg>
          ),
        };

      case 'twitter_post':
        return {
          name: 'X (Twitter)',
          categoryTag: 'Viral Thread & Post',
          topBar: 'bg-[#1DA1F2]',
          badgeBg: 'bg-sky-500/15 border-sky-500/30 text-sky-300',
          copyBtn: 'bg-slate-100 hover:bg-white text-slate-950 font-bold shadow-slate-100/10',
          accentBorder: 'hover:border-sky-500/40',
          copyLabel: 'Copy Tweet',
          limit: 280,
          hasMockup: true,
          iconSvg: (
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          ),
        };

      case 'email_invitation':
        return {
          name: 'Email Newsletter',
          categoryTag: 'High-Conversion RSVP Invitation',
          topBar: 'bg-gradient-to-r from-indigo-500 to-purple-600',
          badgeBg: 'bg-indigo-500/15 border-indigo-500/30 text-indigo-300',
          copyBtn: 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/20',
          accentBorder: 'hover:border-indigo-500/40',
          copyLabel: 'Copy Email Body',
          limit: 4000,
          hasMockup: false,
          iconSvg: (
            <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
              <rect width="20" height="16" x="2" y="4" rx="2"/>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
          ),
        };

      case 'poster_text':
        return {
          name: 'Poster & Banner',
          categoryTag: 'Print & Digital Typography Layout',
          topBar: 'bg-gradient-to-r from-amber-500 to-orange-500',
          badgeBg: 'bg-amber-500/15 border-amber-500/30 text-amber-300',
          copyBtn: 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shadow-amber-500/20',
          accentBorder: 'hover:border-amber-500/40',
          copyLabel: 'Copy Poster Text',
          limit: 1500,
          hasMockup: false,
          iconSvg: (
            <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
              <rect width="18" height="18" x="3" y="3" rx="2"/>
              <path d="M3 9h18M9 21V9"/>
            </svg>
          ),
        };

      case 'hashtags':
        return {
          name: 'Hashtags Cloud',
          categoryTag: 'SEO Discoverability & Reach Multiplier',
          topBar: 'bg-gradient-to-r from-fuchsia-500 via-pink-500 to-indigo-500',
          badgeBg: 'bg-fuchsia-500/15 border-fuchsia-500/30 text-fuchsia-300',
          copyBtn: 'bg-gradient-to-r from-fuchsia-600 to-indigo-600 hover:from-fuchsia-500 hover:to-indigo-500 text-white shadow-fuchsia-500/20',
          accentBorder: 'hover:border-fuchsia-500/40',
          copyLabel: 'Copy All Hashtags',
          limit: 500,
          hasMockup: false,
          iconSvg: <Hash className="w-4 h-4 text-fuchsia-300" />,
        };

      // Attendee / Participant Experience Content Types
      case 'linkedin_experience':
        return {
          name: 'LinkedIn (Attendee Experience)',
          categoryTag: 'Professional Learnings & Project Recap',
          topBar: 'bg-[#0A66C2]',
          badgeBg: 'bg-blue-500/15 border-blue-500/30 text-blue-300',
          copyBtn: 'bg-[#0A66C2] hover:bg-[#004182] text-white shadow-blue-500/20',
          accentBorder: 'hover:border-blue-500/40',
          copyLabel: 'Copy LinkedIn Recap',
          limit: 3000,
          hasMockup: true,
          iconSvg: (
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          ),
        };

      case 'instagram_experience':
        return {
          name: 'Instagram (Attendee Dump & Story)',
          categoryTag: 'Visual Highlights & Event Memories',
          topBar: 'bg-gradient-to-r from-[#f09433] via-[#dc2743] to-[#bc1888]',
          badgeBg: 'bg-rose-500/15 border-rose-500/30 text-rose-300',
          copyBtn: 'bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white shadow-rose-500/20',
          accentBorder: 'hover:border-rose-500/40',
          copyLabel: 'Copy Instagram Post',
          limit: 2200,
          hasMockup: true,
          iconSvg: (
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          ),
        };

      case 'twitter_experience':
        return {
          name: 'X (Twitter Thread)',
          categoryTag: 'Key Takeaways & Lessons Learned',
          topBar: 'bg-[#1DA1F2]',
          badgeBg: 'bg-sky-500/15 border-sky-500/30 text-sky-300',
          copyBtn: 'bg-slate-100 hover:bg-white text-slate-950 font-bold shadow-slate-100/10',
          accentBorder: 'hover:border-sky-500/40',
          copyLabel: 'Copy Thread',
          limit: 280,
          hasMockup: true,
          iconSvg: (
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          ),
        };

      case 'organizer_shoutout':
        return {
          name: 'Organizer & Mentor Shoutout',
          categoryTag: 'Heartfelt Gratitude & Appreciation',
          topBar: 'bg-gradient-to-r from-emerald-500 to-teal-500',
          badgeBg: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300',
          copyBtn: 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/20',
          accentBorder: 'hover:border-emerald-500/40',
          copyLabel: 'Copy Shoutout Note',
          limit: 1500,
          hasMockup: false,
          iconSvg: <Heart className="w-4 h-4 text-emerald-300" />,
        };

      case 'project_showcase':
        return {
          name: 'Project & Hack Showcase',
          categoryTag: 'Technical Highlights & Build Story',
          topBar: 'bg-gradient-to-r from-purple-600 to-pink-600',
          badgeBg: 'bg-purple-500/15 border-purple-500/30 text-purple-300',
          copyBtn: 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-500/20',
          accentBorder: 'hover:border-purple-500/40',
          copyLabel: 'Copy Project Story',
          limit: 2500,
          hasMockup: false,
          iconSvg: <Sparkles className="w-4 h-4 text-purple-300" />,
        };

      default:
        return {
          name: item.title,
          categoryTag: 'Event Promotion Asset',
          topBar: 'bg-gradient-to-r from-slate-600 to-slate-500',
          badgeBg: 'bg-slate-500/15 border-slate-500/30 text-slate-300',
          copyBtn: 'bg-indigo-600 hover:bg-indigo-500 text-white',
          accentBorder: 'hover:border-slate-600',
          copyLabel: 'Copy Content',
          limit: 2000,
          hasMockup: false,
          iconSvg: <Sparkles className="w-4 h-4 text-indigo-300" />,
        };
    }
  };

  const branding = getBranding();
  const isTwitter = item.typeId === 'twitter_post';
  const isEmail = item.typeId === 'email_invitation';
  const isHashtag = item.typeId === 'hashtags';
  const isWhatsApp = item.typeId === 'whatsapp_invitation';
  const isLinkedIn = item.typeId === 'linkedin_post';
  const isInstagram = item.typeId === 'instagram_caption' || item.typeId === 'instagram_post';

  const hashtagsList = isHashtag ? extractHashtags() : [];

  // Twitter live character progress calculation
  const twitterProgress = Math.min(100, Math.round((charCount / 280) * 100));
  const twitterOverLimit = charCount > 280;

  return (
    <div
      className={`flex flex-col justify-between rounded-2xl border border-slate-800/90 bg-slate-900/80 ${branding.accentBorder} shadow-xl hover:shadow-2xl overflow-hidden transition-all duration-300 group relative backdrop-blur-md`}
    >
      {/* 1. Signature Platform Brand Accent Stripe */}
      <div className={`h-1.5 w-full ${branding.topBar}`} />

      {/* 2. Platform Box Header with Proper UX/UI */}
      <div className="p-4 sm:p-5 border-b border-slate-800/80 bg-slate-950/50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
          {/* Platform Identity & Badges */}
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg ${branding.topBar} text-white shrink-0`}
            >
              {branding.iconSvg}
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base font-extrabold text-white tracking-tight flex items-center gap-1.5">
                  <span>{branding.name}</span>
                </h3>
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${branding.badgeBg}`}
                >
                  {item.tone} Tone
                </span>
                {item.isCustomized && (
                  <span className="text-[10px] font-medium text-amber-300 bg-amber-950/60 border border-amber-800/60 px-1.5 py-0.5 rounded flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                    Edited
                  </span>
                )}
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                {branding.categoryTag}
              </p>
            </div>
          </div>

          {/* Header Controls: Mode Selector & Action Buttons */}
          <div className="flex items-center gap-2 flex-wrap self-end sm:self-auto">
            {/* Mode Switcher: Studio View vs Live Platform Mockup */}
            {branding.hasMockup && !isEditing && (
              <div className="flex items-center bg-slate-950 border border-slate-800 rounded-lg p-0.5">
                <button
                  type="button"
                  onClick={() => setViewMode('editor')}
                  className={`flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold rounded transition-colors cursor-pointer ${
                    viewMode === 'editor'
                      ? 'bg-slate-800 text-white shadow-xs'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                  title="Studio Text View"
                >
                  <FileCode className="w-3.5 h-3.5" />
                  <span>Editor</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('mockup')}
                  className={`flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold rounded transition-colors cursor-pointer ${
                    viewMode === 'mockup'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                  title="Live Platform Simulation"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Mockup</span>
                </button>
              </div>
            )}

            {/* Inline Edit Trigger */}
            {!isEditing && (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors cursor-pointer"
                title="Edit copy manually"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
            )}

            {/* AI Regeneration Tone Menu */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsRegenMenuOpen(!isRegenMenuOpen)}
                disabled={isRegenerating}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/90 hover:bg-slate-700 border border-slate-700/80 rounded-lg transition-colors cursor-pointer"
              >
                <RotateCw
                  className={`w-3.5 h-3.5 text-indigo-400 ${
                    isRegenerating ? 'animate-spin' : ''
                  }`}
                />
                <span className="hidden sm:inline">Regenerate</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {isRegenMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-72 rounded-xl border border-slate-700 bg-slate-900 shadow-2xl z-30 p-2 space-y-1 animate-in fade-in zoom-in-95">
                  <div className="px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-800 mb-1 flex items-center justify-between">
                    <span>Regenerate Variation</span>
                    <Sparkles className="w-3 h-3 text-indigo-400" />
                  </div>
                  {REGEN_OPTIONS.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleRegenSelect(opt.id)}
                      className="w-full text-left px-2.5 py-2 rounded-lg text-xs hover:bg-indigo-950/80 hover:text-white text-slate-300 transition-colors flex flex-col cursor-pointer"
                    >
                      <span className="font-semibold">{opt.label}</span>
                      <span className="text-[10px] text-slate-500">{opt.desc}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Primary One-Click Copy Button */}
            <button
              type="button"
              onClick={handleCopyMain}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-lg shadow-md transition-all active:scale-95 cursor-pointer ${branding.copyBtn}`}
            >
              {isCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-white" />
                  <span>Copied ✓</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>{branding.copyLabel}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Special Email Subject Line Box with One-Click Copy */}
        {isEmail && !isEditing && (
          <div className="mt-3.5 p-3 rounded-xl bg-slate-900 border border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div className="text-xs">
              <span className="text-amber-400 font-bold uppercase text-[10px] tracking-wider block mb-0.5">
                Suggested Subject Line
              </span>
              <span className="font-semibold text-slate-100 select-all">
                {extractEmailSubject()}
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                onCopy(extractEmailSubject(), 'Email Subject Line');
                setIsCopiedSubject(true);
                setTimeout(() => setIsCopiedSubject(false), 2000);
              }}
              className="self-start sm:self-auto px-3 py-1.5 text-[11px] font-bold text-amber-300 hover:text-white bg-amber-950/70 hover:bg-amber-900/80 border border-amber-800/60 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              {isCopiedSubject ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span>Copied ✓</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy Subject Only</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Special Instagram Hook Indicator */}
        {isInstagram && !isEditing && viewMode === 'editor' && (
          <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-400 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-800/60">
            <span className="text-rose-300 font-medium">
              💡 First 125 characters form the scroll-stopping hook before the “...more” fold.
            </span>
            <span className="font-mono text-slate-500 text-[10px]">
              Optimal hashtags: 5-8
            </span>
          </div>
        )}
      </div>

      {/* 3. Card Body: Text Editor, Simulated Mockup, or Hashtags Cloud */}
      <div className="p-4 sm:p-5 flex-1 bg-slate-950/65">
        {isEditing ? (
          /* Inline Rich Textarea Editor */
          <div className="space-y-3">
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span className="flex items-center gap-1.5 font-semibold text-indigo-400">
                <Edit3 className="w-3.5 h-3.5" /> Editing Deliverable Content
              </span>
              <span className="font-mono text-slate-500">
                {editBuffer.length} characters · {editBuffer.split(/\s+/).filter(Boolean).length} words
              </span>
            </div>
            <textarea
              rows={9}
              value={editBuffer}
              onChange={(e) => setEditBuffer(e.target.value)}
              className="w-full p-4 text-xs sm:text-sm bg-slate-900 border border-indigo-500/40 rounded-xl text-white font-sans leading-relaxed focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20 resize-y"
              placeholder="Refine copy here..."
            />
            <div className="flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={handleCancel}
                className="px-3.5 py-1.5 text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        ) : viewMode === 'mockup' ? (
          /* Live Platform Realistic Simulation Box */
          <div>
            {isInstagram ? (
              <div className="rounded-xl border border-slate-800 bg-slate-900 p-4 text-xs space-y-3.5 shadow-inner">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 via-rose-500 to-purple-600 p-[1.5px]">
                      <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center font-bold text-white text-[11px]">
                        {details.eventName.slice(0, 1).toUpperCase()}
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-1 font-bold text-white">
                        <span>{details.organizer.toLowerCase().replace(/[^a-z0-9]/g, '_') || 'event_official'}</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      </div>
                      <span className="text-[10px] text-slate-400 block">{details.venue}</span>
                    </div>
                  </div>
                  <MoreHorizontal className="w-4 h-4 text-slate-400" />
                </div>

                <div className="aspect-[16/9] bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 rounded-lg border border-slate-800 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
                  <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-rose-500/30 text-rose-300 text-[10px] font-bold border border-rose-500/40">
                    {details.eventType}
                  </div>
                  <span className="text-lg sm:text-xl font-black text-white max-w-sm leading-snug">
                    {details.eventName}
                  </span>
                  <div className="mt-2 text-xs font-semibold text-indigo-300">
                    🗓 {details.eventDate} · 📍 {details.venue}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-3 text-slate-300">
                    <Heart className="w-4 h-4 text-rose-500 fill-rose-500/20" />
                    <MessageCircle className="w-4 h-4" />
                    <Send className="w-4 h-4" />
                  </div>
                  <Bookmark className="w-4 h-4 text-slate-400" />
                </div>

                <div className="space-y-1">
                  <div className="font-bold text-white text-[11px]">Liked by 1,248 event enthusiasts</div>
                  <pre className="text-xs text-slate-200 whitespace-pre-wrap font-sans leading-relaxed line-clamp-6">
                    <span className="font-bold text-white mr-1.5">
                      {details.organizer.toLowerCase().replace(/[^a-z0-9]/g, '_') || 'event_official'}
                    </span>
                    {item.content}
                  </pre>
                </div>
              </div>
            ) : isLinkedIn ? (
              <div className="rounded-xl border border-slate-800 bg-slate-900 p-4 text-xs space-y-3 shadow-inner">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#0A66C2] flex items-center justify-center font-bold text-white text-xs">
                    in
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-white">{details.organizer}</span>
                      <span className="text-slate-400 font-normal">· 1st</span>
                    </div>
                    <span className="text-[10px] text-slate-400 block">
                      Organizing Committee · Event Host · {details.eventType}
                    </span>
                  </div>
                </div>
                <pre className="text-xs text-slate-200 whitespace-pre-wrap font-sans leading-relaxed max-h-56 overflow-y-auto">
                  {item.content}
                </pre>
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                  <div className="flex items-center gap-1 text-blue-400">
                    <ThumbsUp className="w-3.5 h-3.5 fill-blue-500/20" />
                    <span>342 reactions · 48 comments</span>
                  </div>
                  <span>95% engagement</span>
                </div>
              </div>
            ) : isWhatsApp ? (
              <div className="rounded-xl border border-emerald-950/80 bg-[#0b141a] p-4 text-xs">
                <div className="bg-[#005c4b] text-white p-3.5 rounded-2xl rounded-tr-xs shadow-md max-w-[95%] ml-auto space-y-2">
                  <pre className="whitespace-pre-wrap font-sans text-xs leading-relaxed text-slate-100">
                    {item.content}
                  </pre>
                  <div className="text-right text-[10px] text-emerald-200/70 flex items-center justify-end gap-1">
                    <span>10:30 AM</span>
                    <CheckCheck className="w-3.5 h-3.5 text-cyan-400" />
                  </div>
                </div>
              </div>
            ) : isTwitter ? (
              <div className="rounded-xl border border-slate-800 bg-slate-900 p-4 text-xs space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-white">
                    𝕏
                  </div>
                  <div>
                    <span className="font-bold text-white">{details.organizer}</span>
                    <span className="text-slate-400 ml-1.5">
                      @{details.organizer.toLowerCase().replace(/[^a-z0-9]/g, '') || 'official'}
                    </span>
                  </div>
                </div>
                <pre className="text-xs sm:text-sm text-slate-100 whitespace-pre-wrap font-sans leading-relaxed">
                  {item.content}
                </pre>
                <div className="flex items-center gap-6 pt-2 border-t border-slate-800 text-slate-400 text-[11px]">
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3.5 h-3.5" /> 84
                  </span>
                  <span className="flex items-center gap-1">
                    <Repeat2 className="w-3.5 h-3.5" /> 240
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5" /> 920
                  </span>
                </div>
              </div>
            ) : null}
          </div>
        ) : isHashtag ? (
          /* Specialized Hashtag Interactive Cloud Box */
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-fuchsia-400">
                  Interactive Tag Cloud (Click any hashtag to copy individually):
                </span>
                <span className="text-[10px] text-slate-500 font-mono">
                  {hashtagsList.length} tags detected
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {hashtagsList.map((tag, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      onCopy(tag, tag);
                      setIsCopiedHashtag(tag);
                      setTimeout(() => setIsCopiedHashtag(null), 1800);
                    }}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all flex items-center gap-1.5 cursor-pointer group/tag ${
                      isCopiedHashtag === tag
                        ? 'bg-emerald-600 border-emerald-500 text-white'
                        : 'bg-indigo-950/70 hover:bg-indigo-900 border-indigo-800/60 text-indigo-300 hover:text-white'
                    }`}
                  >
                    <span>{tag}</span>
                    {isCopiedHashtag === tag ? (
                      <Check className="w-3 h-3 text-white" />
                    ) : (
                      <Copy className="w-3 h-3 text-slate-500 group-hover/tag:text-indigo-400 opacity-60 group-hover/tag:opacity-100" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-3.5 bg-slate-900/90 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">
                  Raw Hashtags Block (Ready to paste):
                </span>
                <button
                  type="button"
                  onClick={handleCopyMain}
                  className="text-[11px] font-bold text-fuchsia-400 hover:text-fuchsia-300 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <Copy className="w-3 h-3" />
                  <span>Copy All</span>
                </button>
              </div>
              <pre className="text-xs text-slate-300 font-mono whitespace-pre-wrap select-all leading-relaxed">
                {item.content}
              </pre>
            </div>
          </div>
        ) : (
          /* Standard Pristine Text Output with Line Break Preservation */
          <div className="relative">
            {isRegenerating && (
              <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-xs flex items-center justify-center rounded-xl z-10">
                <div className="flex items-center gap-2.5 text-xs font-semibold text-indigo-300 bg-slate-900 px-4 py-2 rounded-xl border border-indigo-500/40 shadow-xl">
                  <RotateCw className="w-4 h-4 animate-spin text-indigo-400" />
                  <span>Synthesizing tailored version with Gemini AI...</span>
                </div>
              </div>
            )}
            <pre className="text-xs sm:text-sm text-slate-200 whitespace-pre-wrap font-sans leading-relaxed max-h-80 overflow-y-auto pr-1">
              {item.content}
            </pre>
          </div>
        )}
      </div>

      {/* 4. Platform Result Box Footer Bar: Direct Actions & Metrics */}
      <div className="px-4 py-3 bg-slate-950 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-[11px] text-slate-400">
        {/* Left: Platform Limits & Word Count */}
        <div className="flex items-center gap-3">
          <span className="font-semibold text-slate-300">{wordCount} words</span>
          <span>·</span>
          <span>{charCount} chars</span>
          <span>·</span>
          <span>~{readingTimeSeconds}s read</span>

          {/* Twitter live meter indicator */}
          {isTwitter && (
            <div className="flex items-center gap-1.5 ml-2">
              <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all ${
                    twitterOverLimit ? 'bg-rose-500' : 'bg-sky-400'
                  }`}
                  style={{ width: `${twitterProgress}%` }}
                />
              </div>
              <span
                className={`font-mono font-bold text-[10px] ${
                  twitterOverLimit ? 'text-rose-400' : 'text-slate-400'
                }`}
              >
                {280 - charCount} left
              </span>
            </div>
          )}
        </div>

        {/* Right: Direct Platform Launch Link or Quick Copy */}
        <div className="flex items-center gap-3 self-end sm:self-auto">
          {/* Direct Platform Links */}
          {isWhatsApp && (
            <a
              href={getWhatsAppShareUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>Send via WhatsApp</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          )}

          {isTwitter && (
            <a
              href={getTwitterShareUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>Post on 𝕏</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          )}

          {isLinkedIn && (
            <a
              href={getLinkedInShareUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <span>Share on LinkedIn</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          )}

          <button
            type="button"
            onClick={handleCopyMain}
            className="text-xs font-semibold text-rose-400 hover:text-rose-300 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>One-Click Copy</span>
            <Copy className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
