import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  Share2,
  Copy,
  Check,
  Calendar,
  MessageCircle,
  FileText,
  Mail,
  Hash,
  Layers,
  ChevronRight,
  Zap,
  TrendingUp,
  Heart,
  Instagram,
  Linkedin,
  Twitter,
  ArrowUpRight,
} from 'lucide-react';
import { SAMPLE_SAVED_EVENTS } from '../data/sampleEvents';
import { GeneratedContentItem } from '../types';

interface HeroProps {
  onStartCreating: () => void;
  onExploreTemplates: () => void;
  onLoadDemoEvent: (eventName: string) => void;
  onCopyText: (text: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onStartCreating,
  onExploreTemplates,
  onLoadDemoEvent,
  onCopyText,
}) => {
  const sampleEvent = SAMPLE_SAVED_EVENTS[0];
  const [activeTab, setActiveTab] = useState<string>('instagram_caption');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const activeItem: GeneratedContentItem | undefined =
    sampleEvent.generatedItems.find((item) => item.typeId === activeTab) ||
    sampleEvent.generatedItems[0];

  const handleCopy = (text: string, id: string) => {
    onCopyText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const previewTabs = [
    {
      id: 'instagram_caption',
      label: 'Instagram Caption',
      icon: Instagram,
      color: 'text-rose-400',
      activeBg: 'bg-gradient-to-r from-rose-500 to-pink-500 text-white',
    },
    {
      id: 'whatsapp_invitation',
      label: 'WhatsApp Invitation',
      icon: MessageCircle,
      color: 'text-emerald-400',
      activeBg: 'bg-[#25D366] text-slate-950 font-bold',
    },
    {
      id: 'linkedin_post',
      label: 'LinkedIn Post',
      icon: Linkedin,
      color: 'text-blue-400',
      activeBg: 'bg-[#0A66C2] text-white',
    },
    {
      id: 'poster_text',
      label: 'Poster Text',
      icon: Layers,
      color: 'text-amber-400',
      activeBg: 'bg-amber-500 text-slate-950 font-bold',
    },
    {
      id: 'hashtags',
      label: 'Hashtags',
      icon: Hash,
      color: 'text-fuchsia-400',
      activeBg: 'bg-gradient-to-r from-fuchsia-600 to-pink-500 text-white',
    },
    {
      id: 'email_invitation',
      label: 'Email Invitation',
      icon: Mail,
      color: 'text-indigo-400',
      activeBg: 'bg-indigo-600 text-white',
    },
  ];

  return (
    <div className="relative overflow-hidden pt-6 pb-16 lg:pt-12 lg:pb-24">
      {/* Background glow effects - Sunset Peach / Rose mesh */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-br from-rose-500/20 via-pink-500/15 to-amber-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[300px] bg-purple-600/10 blur-[110px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Hero Header */}
        <div className="text-center max-w-3xl mx-auto">
          {/* Tagline kicker with warm rose gradient */}
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-wider uppercase text-rose-300 mb-5 px-4 py-1.5 rounded-full bg-rose-950/60 border border-rose-500/30 shadow-lg shadow-rose-500/10 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-rose-400 animate-spin" style={{ animationDuration: '4s' }} />
            <span>One Event. Endless Content. · Instant Social Virality</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12] text-balance">
            Turn Your Event Details Into{' '}
            <span className="bg-gradient-to-r from-rose-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">
              Ready-to-Post Content.
            </span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed text-balance max-w-2xl mx-auto">
            Describe your event once. AI Content Studio creates captions, invitations,
            announcements, hashtags and promotional content in seconds.
          </p>

          {/* Call to Actions */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onStartCreating}
              className="flex items-center gap-2.5 px-7 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-600 active:scale-95 rounded-2xl shadow-xl shadow-rose-500/30 transition-all cursor-pointer hover:shadow-rose-500/40"
            >
              <span>Create Content</span>
              <Sparkles className="w-4 h-4 text-white" />
            </button>
            <a
              href="#how-it-works"
              className="flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-200 hover:text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 rounded-2xl transition-colors backdrop-blur-md cursor-pointer"
            >
              <span>See How It Works</span>
              <ArrowRight className="w-4 h-4 text-slate-400" />
            </a>
          </div>

          {/* Social Proof & Value Props */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Zero Prompting Required</span>
            </span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-rose-400" />
              <span>One-Click Copy</span>
            </span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              <span>7-Day Campaign Sprint</span>
            </span>
          </div>
        </div>

        {/* Live Transformation Demo Block with Elevated Social UI */}
        <div className="mt-12 max-w-4xl mx-auto rounded-3xl border border-rose-500/20 bg-slate-900/85 p-5 sm:p-7 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          {/* Subtle Ambient Background Gradient Inside Card */}
          <div className="absolute top-0 right-0 w-80 h-32 bg-rose-500/10 blur-3xl pointer-events-none" />

          {/* Transformation Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-800 relative z-10">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wide">
                  Live Interactive Transformation
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-800/40 text-[10px] font-bold text-emerald-400">
                  Try It Below
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-slate-400 font-medium">Input Event:</span>
                <span className="text-sm font-extrabold text-white">“College Tech Fest 2026”</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onLoadDemoEvent('College Tech Fest 2026')}
                className="px-3.5 py-1.5 text-xs font-bold text-rose-300 hover:text-white bg-rose-950/70 hover:bg-rose-900/80 border border-rose-800/60 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Open in Studio Results</span>
              </button>
            </div>
          </div>

          {/* Transformation Pipeline Arrow */}
          <div className="py-3.5 flex items-center justify-center gap-2 text-xs font-semibold text-slate-400">
            <span className="text-slate-300">1. Enter Event Details Once</span>
            <ChevronRight className="w-4 h-4 text-rose-400 animate-pulse" />
            <span className="text-rose-300 font-bold">2. Select Social Deliverables</span>
            <ChevronRight className="w-4 h-4 text-rose-400 animate-pulse" />
            <span className="text-amber-300 font-bold">3. Copy & Post Everywhere</span>
          </div>

          {/* Platform Switcher Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none border-b border-slate-800/60">
            {previewTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? `${tab.activeBg} shadow-md`
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-inherit' : tab.color}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Generated Content Preview Area */}
          <div className="mt-4 bg-slate-950/90 rounded-2xl border border-slate-800/90 p-4 sm:p-5 relative group">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800/80">
              <div className="flex items-center gap-2.5">
                <span className="text-xs font-bold text-white tracking-tight">
                  {activeItem?.title || 'Generated Output'}
                </span>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2.5 py-0.5 rounded-full">
                  ✓ Ready to Post
                </span>
              </div>

              {activeItem && (
                <button
                  onClick={() => handleCopy(activeItem.content, activeItem.id)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-slate-800 hover:bg-slate-700 active:scale-95 border border-slate-700 rounded-xl transition-all cursor-pointer"
                >
                  {copiedId === activeItem.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-300">Copied ✓</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-300" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              )}
            </div>

            <pre className="text-xs sm:text-sm text-slate-200 whitespace-pre-wrap font-sans leading-relaxed max-h-72 overflow-y-auto pr-2 selection:bg-rose-500">
              {activeItem?.content}
            </pre>
          </div>
        </div>

        {/* Section 9: Innovative Feature — Event-to-Everything™ Workflow */}
        <div id="how-it-works" className="mt-24 pt-10 border-t border-slate-800/80">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold tracking-wider uppercase text-rose-400">
              Innovative Architecture
            </span>
            <h2 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              Event-to-Everything™
            </h2>
            <p className="mt-2 text-sm text-slate-400 leading-relaxed">
              Enter your event details once. The engine automatically constructs tailored copy
              for every communication channel.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-5 gap-3.5">
            {[
              {
                step: '01',
                title: 'Event Details',
                desc: 'Enter title, date, venue, audience, and choose your tone.',
                icon: Calendar,
                tag: 'Input Once',
                glow: 'border-slate-800 hover:border-indigo-500/50',
              },
              {
                step: '02',
                title: 'Social Media',
                desc: 'Instagram captions, carousels, LinkedIn articles, and X posts.',
                icon: Share2,
                tag: 'Social Reach',
                glow: 'border-slate-800 hover:border-pink-500/50',
              },
              {
                step: '03',
                title: 'Invitations',
                desc: 'WhatsApp groups & email templates with registration links.',
                icon: MessageCircle,
                tag: 'Direct Invites',
                glow: 'border-slate-800 hover:border-emerald-500/50',
              },
              {
                step: '04',
                title: 'Promotion',
                desc: 'Print poster text, targeted hashtags, and short SMS promos.',
                icon: Layers,
                tag: 'Amplification',
                glow: 'border-slate-800 hover:border-amber-500/50',
              },
              {
                step: '05',
                title: 'Announcement',
                desc: 'Formal releases, press blurbs, and multi-day campaign sprints.',
                icon: Sparkles,
                tag: 'Full Launch',
                glow: 'border-slate-800 hover:border-rose-500/50',
              },
            ].map((node) => {
              const NodeIcon = node.icon;
              return (
                <div
                  key={node.step}
                  className={`relative rounded-2xl border bg-slate-900/60 p-5 ${node.glow} transition-all duration-300 hover:shadow-xl group backdrop-blur-sm`}
                >
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-3 font-mono">
                    <span className="font-bold text-slate-400">{node.step}</span>
                    <span className="text-rose-400 font-sans font-bold text-[10px] uppercase tracking-wider bg-rose-950/50 px-2 py-0.5 rounded-full border border-rose-800/40">
                      {node.tag}
                    </span>
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-rose-400 mb-3 group-hover:scale-105 transition-transform">
                    <NodeIcon className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-bold text-white tracking-tight">{node.title}</h3>
                  <p className="mt-1 text-xs text-slate-400 leading-normal">{node.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Feature Grid: Who it's built for */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 hover:border-rose-500/30 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-rose-950/60 border border-rose-800/40 flex items-center justify-center text-rose-400 mb-3 text-sm font-bold">
              🎓
            </div>
            <h4 className="text-base font-bold text-white">For Students & Colleges</h4>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              Create buzz for college tech fests, hackathons, cultural nights, and club workshops
              with viral youth-focused captions and WhatsApp group broadcasts.
            </p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6 hover:border-pink-500/30 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-pink-950/60 border border-pink-800/40 flex items-center justify-center text-pink-400 mb-3 text-sm font-bold">
              ⚡
            </div>
            <h4 className="text-base font-bold text-white">For Creators & Community Leaders</h4>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              Generate webinar invitations, community meetups, live streams, and countdown
              stories without spending hours drafting separate posts.
            </p>
          </div>
          <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-6 hover:border-blue-500/30 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-blue-950/60 border border-blue-800/40 flex items-center justify-center text-blue-400 mb-3 text-sm font-bold">
              💼
            </div>
            <h4 className="text-base font-bold text-white">For Businesses & Organizers</h4>
            <p className="mt-2 text-xs text-slate-400 leading-relaxed">
              Produce executive LinkedIn announcements, product launch keynotes, sponsor invitations,
              and full 7-day promotional campaigns in seconds.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
