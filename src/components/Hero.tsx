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
  ChevronLeft,
  Zap,
  TrendingUp,
  Heart,
  Instagram,
  Linkedin,
  Twitter,
  ArrowUpRight,
  Flame,
  Radio,
  Users,
  Eye,
  Send,
  Bookmark,
  Bell,
  Award,
  CheckCircle2,
  UserCheck,
  Camera
} from 'lucide-react';
import { PrismaticStar } from './PrismaticStar';
import { SAMPLE_SAVED_EVENTS } from '../data/sampleEvents';
import { GeneratedContentItem } from '../types';
import { BackgroundTheme } from './SocialMediaBackground';
import { ChangeProfilePictureModal, INDIAN_CREATOR_PRESETS } from './ChangeProfilePictureModal';

interface HeroProps {
  onStartCreating: () => void;
  onExploreTemplates: () => void;
  onLoadDemoEvent: (eventName: string) => void;
  onCopyText: (text: string, title?: string) => void;
  onOpenMediaStudio?: () => void;
  theme?: BackgroundTheme;
}

export const Hero: React.FC<HeroProps> = ({
  onStartCreating,
  onExploreTemplates,
  onLoadDemoEvent,
  onCopyText,
  onOpenMediaStudio,
  theme = 'dark',
}) => {
  const isLight = theme === 'light';
  const sampleEvent = SAMPLE_SAVED_EVENTS[0];
  const [activeTab, setActiveTab] = useState<string>('instagram_caption');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedCreatorIndex, setSelectedCreatorIndex] = useState<number>(0);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number>(0);
  const [isFollowingKusha, setIsFollowingKusha] = useState<boolean>(false);
  const [isFollowingPranit, setIsFollowingPranit] = useState<boolean>(false);
  const [isChangePictureOpen, setIsChangePictureOpen] = useState<boolean>(false);
  const [customAvatars, setCustomAvatars] = useState<Record<string, string>>({});
  const [followedCreatorIds, setFollowedCreatorIds] = useState<Record<string, boolean>>({
    c1: true,
  });

  const activeItem: GeneratedContentItem | undefined =
    sampleEvent.generatedItems.find((item) => item.typeId === activeTab) ||
    sampleEvent.generatedItems[0];

  const handleCopy = (text: string, id: string) => {
    onCopyText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleFollow = (creatorId: string) => {
    setFollowedCreatorIds((prev) => ({
      ...prev,
      [creatorId]: !prev[creatorId],
    }));
  };

  // Story avatars list matching Reference Image 1 ("Your Circles") - STRICTLY RECOGNIZABLE INDIAN CREATORS
  const yourCircles = [
    {
      id: 'c1',
      name: 'Samay Raina',
      handle: '@maisamayhoon',
      followers: '5.8M',
      creations: '620',
      avatar: INDIAN_CREATOR_PRESETS[0].url,
      active: true,
      role: 'Standup Comic & Live Streamer',
      circleType: 'Comedy & Chess Circle',
    },
    {
      id: 'c2',
      name: 'Pranit More',
      handle: '@pranit.more',
      followers: '1.4M',
      creations: '480',
      avatar: INDIAN_CREATOR_PRESETS[1].url,
      active: true,
      role: 'Standup Comedian & Storyteller',
      circleType: 'Standup Circle',
    },
    {
      id: 'c3',
      name: 'Kusha Kapila',
      handle: '@kushakapila',
      followers: '3.6M',
      creations: '720',
      avatar: INDIAN_CREATOR_PRESETS[2].url,
      active: true,
      role: 'Fashion & Entertainment Lead',
      circleType: 'Fashion Circle',
    },
    {
      id: 'c4',
      name: 'Ankur Warikoo',
      handle: '@ankurwarikoo',
      followers: '3.8M',
      creations: '940',
      avatar: INDIAN_CREATOR_PRESETS[3].url,
      active: true,
      role: 'Author, Entrepreneur & Educator',
      circleType: 'Career Circle',
    },
    {
      id: 'c5',
      name: 'Bhuvan Bam',
      handle: '@bhuvan.bam22',
      followers: '16.5M',
      creations: '430',
      avatar: INDIAN_CREATOR_PRESETS[4].url,
      active: true,
      role: 'Writer, Actor & Performer',
      circleType: 'Entertainment Circle',
    },
    {
      id: 'c6',
      name: 'Prajakta Koli',
      handle: '@mostlysane',
      followers: '5.2M',
      creations: '860',
      avatar: INDIAN_CREATOR_PRESETS[5].url,
      active: true,
      role: 'Digital Creator & Youth Icon',
      circleType: 'Lifestyle Circle',
    },
    {
      id: 'c7',
      name: 'Ranveer Allahbadia',
      handle: '@beerbiceps',
      followers: '9.4M',
      creations: '1,280',
      avatar: INDIAN_CREATOR_PRESETS[6].url,
      active: true,
      role: 'Podcast Host & Media Lead',
      circleType: 'Podcasting Circle',
    },
    {
      id: 'c8',
      name: 'Tanmay Bhat',
      handle: '@tanmaybhat',
      followers: '4.9M',
      creations: '1,120',
      avatar: INDIAN_CREATOR_PRESETS[7].url,
      active: true,
      role: 'Comedy & Content Producer',
      circleType: 'Comedy Circle',
    },
  ];

  // Top Creators spotlight list - STRICTLY INDIAN CREATORS ONLY (as requested)
  const topCreators = [
    {
      id: 'tc1',
      rank: 1,
      name: 'Samay Raina',
      handle: '@maisamayhoon',
      role: 'Standup Comic & India’s Top Streamer',
      followers: '5.8M',
      creations: '620',
      score: '99.9%',
      avatar: INDIAN_CREATOR_PRESETS[0].url,
      badge: '⭐ #1 Viral Streamer & Comic',
    },
    {
      id: 'tc2',
      rank: 2,
      name: 'Ranveer Allahbadia',
      handle: '@beerbiceps',
      role: 'Podcast Host & Digital Media Lead',
      followers: '9.4M',
      creations: '1,280',
      score: '99.4%',
      avatar: INDIAN_CREATOR_PRESETS[6].url,
      badge: '🎙️ Top Indian Podcaster & Host',
    },
    {
      id: 'tc3',
      rank: 3,
      name: 'Bhuvan Bam',
      handle: '@bhuvan.bam22',
      role: 'Writer, Actor & Performer',
      followers: '16.5M',
      creations: '430',
      score: '98.9%',
      avatar: INDIAN_CREATOR_PRESETS[4].url,
      badge: '🎬 #1 Independent Video Pioneer',
    },
    {
      id: 'tc4',
      rank: 4,
      name: 'Prajakta Koli',
      handle: '@mostlysane',
      role: 'Digital Creator & Youth Icon',
      followers: '5.2M',
      creations: '860',
      score: '98.2%',
      avatar: INDIAN_CREATOR_PRESETS[5].url,
      badge: '🔥 Top Indian Youth & Lifestyle',
    },
  ];

  const activeCreator = yourCircles[selectedCreatorIndex] || yourCircles[0];
  const activeAvatar = customAvatars[activeCreator.id] || activeCreator.avatar;

  // Gallery thumbnails matching reference right sheet
  const galleryThumbnails = [
    {
      id: 'g1',
      title: 'Greek Salad Recipe',
      category: 'Food & Lifestyle',
      img: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&auto=format&fit=crop&q=80',
    },
    {
      id: 'g2',
      title: 'Culinary Masterclass',
      category: 'Gourmet Showcase',
      img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=300&auto=format&fit=crop&q=80',
    },
    {
      id: 'g3',
      title: 'Al Fresco Table',
      category: 'Experience & Travel',
      img: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=300&auto=format&fit=crop&q=80',
    },
    {
      id: 'g4',
      title: 'Artisan Prep',
      category: 'Behind the Scenes',
      img: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=300&auto=format&fit=crop&q=80',
    },
  ];

  const previewTabs = [
    {
      id: 'instagram_caption',
      label: 'Instagram Caption',
      icon: Instagram,
      color: 'text-rose-500',
      activeBg: 'bg-gradient-to-r from-rose-500 to-pink-500 text-white',
    },
    {
      id: 'whatsapp_invitation',
      label: 'WhatsApp Invitation',
      icon: MessageCircle,
      color: 'text-emerald-500',
      activeBg: 'bg-[#25D366] text-slate-950 font-bold',
    },
    {
      id: 'linkedin_post',
      label: 'LinkedIn Post',
      icon: Linkedin,
      color: 'text-blue-500',
      activeBg: 'bg-[#0A66C2] text-white',
    },
    {
      id: 'poster_text',
      label: 'Poster Text',
      icon: Layers,
      color: 'text-amber-500',
      activeBg: 'bg-amber-500 text-slate-950 font-bold',
    },
    {
      id: 'hashtags',
      label: 'Hashtags',
      icon: Hash,
      color: 'text-fuchsia-500',
      activeBg: 'bg-gradient-to-r from-fuchsia-600 to-pink-500 text-white',
    },
    {
      id: 'email_invitation',
      label: 'Email Invitation',
      icon: Mail,
      color: 'text-indigo-500',
      activeBg: 'bg-indigo-600 text-white',
    },
  ];

  return (
    <div
      className={`relative pt-4 pb-20 lg:pt-8 lg:pb-32 transition-colors duration-200 ${
        isLight ? 'text-black' : 'text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Main Hero Header */}
        <div className="text-center max-w-3xl mx-auto">
          {/* Prismatic kicker pill */}
          <div
            className={`inline-flex items-center gap-2.5 text-xs font-bold tracking-wider uppercase mb-5 px-4 py-1.5 rounded-full border shadow-sm ${
              isLight
                ? 'bg-slate-100 border-slate-300 text-slate-800'
                : 'bg-black/60 border-white/15 text-slate-200'
            }`}
          >
            <PrismaticStar size={16} />
            <span>Adverse Creative Engine · AI Media & Content Studio</span>
          </div>

          <h1
            className={`text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12] text-balance ${
              isLight ? 'text-black' : 'text-white'
            }`}
          >
            Create High-Impact Content &{' '}
            <span className="bg-gradient-to-r from-[#FFAA80] via-[#FF4D6D] to-[#C724B1] bg-clip-text text-transparent">
              Visual Media in Seconds.
            </span>
          </h1>

          <p
            className={`mt-4 text-base sm:text-lg leading-relaxed text-balance max-w-2xl mx-auto ${
              isLight ? 'text-slate-800' : 'text-slate-300'
            }`}
          >
            Upload images & videos, extract visual & spoken details, compare media to select the best hero asset, and generate ready-to-post copy across every platform.
          </p>

          {/* Call to Actions matching reference buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={onStartCreating}
              className="flex items-center gap-2.5 px-6 sm:px-7 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-rose-500 via-pink-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 active:scale-95 rounded-full shadow-lg transition-all cursor-pointer"
            >
              <span>Create Event Copy</span>
              <Sparkles className="w-4 h-4 text-white" />
            </button>

            {onOpenMediaStudio && (
              <button
                onClick={onOpenMediaStudio}
                className={`flex items-center gap-2.5 px-6 py-3.5 text-sm font-bold rounded-full border shadow-md transition-all cursor-pointer group ${
                  isLight
                    ? 'bg-slate-900 hover:bg-black text-white border-slate-800'
                    : 'bg-neutral-900 hover:bg-neutral-800 text-white border-white/20'
                }`}
              >
                <PrismaticStar size={18} className="group-hover:rotate-12 transition-transform" />
                <span>📸 Media AI Studio</span>
                <span className="px-2 py-0.5 text-[10px] bg-rose-500 text-white rounded-full uppercase font-black">
                  New
                </span>
              </button>
            )}

            <button
              onClick={onExploreTemplates}
              className={`flex items-center gap-2 px-5 sm:px-6 py-3.5 text-sm font-semibold rounded-full border transition-colors cursor-pointer ${
                isLight
                  ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
                  : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300 hover:text-white'
              }`}
            >
              <span>Browse Templates</span>
              <ArrowRight className="w-4 h-4 opacity-70" />
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION: YOUR CIRCLES (Indian Creators matching Reference Image 1) */}
        {/* ========================================================================= */}
        <div
          className={`space-y-3.5 p-5 rounded-3xl border transition-colors ${
            isLight
              ? 'bg-slate-50 border-slate-200 shadow-xs'
              : 'bg-neutral-950/80 border-white/10 shadow-lg'
          }`}
        >
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <h3
                className={`text-xs sm:text-sm font-bold uppercase tracking-wider ${
                  isLight ? 'text-black' : 'text-slate-200'
                }`}
              >
                Your Circles
              </h3>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                  isLight
                    ? 'bg-slate-200 text-slate-900 border-slate-300'
                    : 'bg-white/10 text-slate-300 border-white/15'
                }`}
              >
                {yourCircles.length} Active Circles
              </span>
            </div>
            <span className="text-xs text-rose-500 font-semibold cursor-pointer hover:underline">
              View All Circles
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto pb-2 scrollbar-none">
            {yourCircles.map((creator, idx) => (
              <button
                key={creator.id}
                onClick={() => setSelectedCreatorIndex(idx)}
                className={`flex flex-col items-center gap-1.5 p-1 shrink-0 transition-transform cursor-pointer group ${
                  selectedCreatorIndex === idx ? 'scale-105' : 'hover:scale-105'
                }`}
              >
                <div
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full p-[2px] transition-all relative ${
                    selectedCreatorIndex === idx
                      ? 'bg-gradient-to-tr from-[#FFAA80] via-[#FF4D6D] to-[#7928CA] shadow-md shadow-rose-500/30'
                      : isLight
                      ? 'bg-slate-300 group-hover:bg-slate-400'
                      : 'bg-white/15 group-hover:bg-white/30'
                  }`}
                >
                  <img
                    src={customAvatars[creator.id] || creator.avatar}
                    alt={creator.name}
                    className={`w-full h-full rounded-full object-cover border ${
                      isLight ? 'border-white bg-slate-100' : 'border-black bg-slate-900'
                    }`}
                  />
                  {/* Active Online Indicator (matching green dot in reference) */}
                  <span className="absolute bottom-0.5 right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white shadow-xs" />
                </div>
                <span
                  className={`text-[11px] font-semibold max-w-[68px] truncate ${
                    isLight ? 'text-black' : 'text-slate-300'
                  }`}
                >
                  {creator.name.split(' ')[0]}
                </span>
                <span
                  className={`text-[9px] px-1.5 py-0.2 rounded-full font-mono font-bold ${
                    isLight
                      ? 'bg-slate-200 text-slate-900'
                      : 'bg-white/10 text-slate-400'
                  }`}
                >
                  {creator.followers}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTION: TOP CREATORS (Indian Creators matching Reference Image 3) */}
        {/* ========================================================================= */}
        <div
          className={`space-y-4 p-5 sm:p-6 rounded-3xl border transition-colors ${
            isLight
              ? 'bg-slate-50 border-slate-200 shadow-xs'
              : 'bg-neutral-950/80 border-white/10 shadow-lg'
          }`}
        >
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-500" />
              <h3
                className={`text-xs sm:text-sm font-bold uppercase tracking-wider ${
                  isLight ? 'text-slate-800' : 'text-slate-200'
                }`}
              >
                Top Creators
              </h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600">
                Verified Indian Creators
              </span>
            </div>
            <span className="text-xs text-rose-500 font-semibold cursor-pointer hover:underline">
              Leaderboard
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {topCreators.map((creator) => {
              const isFollowed = !!followedCreatorIds[creator.id];
              return (
                <div
                  key={creator.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    isLight
                      ? 'bg-white border-slate-200 shadow-sm hover:border-slate-300 hover:shadow-md'
                      : 'bg-black/60 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="relative">
                        <img
                          src={customAvatars[creator.id] || creator.avatar}
                          alt={creator.name}
                          className="w-10 h-10 rounded-full object-cover border border-white/20"
                        />
                        <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-black flex items-center justify-center shadow-xs">
                          {creator.rank}
                        </span>
                      </div>
                      <div className="text-left">
                        <div className="flex items-center gap-1">
                          <span
                            className={`text-xs font-black leading-tight ${
                              isLight ? 'text-black' : 'text-white'
                            }`}
                          >
                            {creator.name}
                          </span>
                          <CheckCircle2 className="w-3 h-3 text-blue-500 shrink-0" />
                        </div>
                        <div
                          className={`text-[10px] font-mono font-bold ${
                            isLight ? 'text-slate-700' : 'text-slate-400'
                          }`}
                        >
                          {creator.handle}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleFollow(creator.id)}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer shrink-0 ${
                        isFollowed
                          ? isLight
                            ? 'bg-slate-200 text-slate-900 border border-slate-300'
                            : 'bg-white/20 text-white'
                          : 'bg-rose-500 hover:bg-rose-600 text-white shadow-xs'
                      }`}
                    >
                      {isFollowed ? 'Following' : '+ Follow'}
                    </button>
                  </div>

                  <div
                    className={`text-[11px] font-semibold mb-2.5 ${
                      isLight ? 'text-slate-800' : 'text-slate-300'
                    }`}
                  >
                    {creator.role}
                  </div>

                  <div
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-md mb-3 inline-block ${
                      isLight
                        ? 'bg-amber-100 text-amber-950 border border-amber-300'
                        : 'bg-amber-950/40 text-amber-300 border border-amber-800/40'
                    }`}
                  >
                    {creator.badge}
                  </div>

                  <div
                    className={`grid grid-cols-2 gap-2 pt-2.5 border-t text-center text-xs ${
                      isLight ? 'border-slate-200' : 'border-white/10'
                    }`}
                  >
                    <div>
                      <div
                        className={`font-black ${
                          isLight ? 'text-black' : 'text-white'
                        }`}
                      >
                        {creator.followers}
                      </div>
                      <div
                        className={`text-[10px] font-bold ${
                          isLight ? 'text-slate-600' : 'text-slate-400'
                        }`}
                      >
                        Followers
                      </div>
                    </div>
                    <div>
                      <div
                        className={`font-black ${
                          isLight ? 'text-black' : 'text-white'
                        }`}
                      >
                        {creator.creations}
                      </div>
                      <div
                        className={`text-[10px] font-bold ${
                          isLight ? 'text-slate-600' : 'text-slate-400'
                        }`}
                      >
                        Creations
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* SECTION 2: REFERENCE DUAL-PANEL SHOWCASE */}
        {/* Left Side: "Live Now / Spotlight Cards" (from reference left screen) */}
        {/* Right Side: "Samay Raina" Frosted Profile Sheet (Indian Creator Spotlight) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* LEFT SUB-GRID: SPOTLIGHT / LIVE NOW CARDS (6 Cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center justify-between px-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-ping" />
                <h3
                  className={`text-xs sm:text-sm font-bold uppercase tracking-wider ${
                    isLight ? 'text-slate-800' : 'text-slate-200'
                  }`}
                >
                  Spotlight on Live
                </h3>
              </div>
              <span
                className={`text-xs font-mono ${
                  isLight ? 'text-slate-500' : 'text-slate-400'
                }`}
              >
                Real-time Feed
              </span>
            </div>

            {/* 2 Portrait Cards Grid matching reference */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* CARD 1: "WINDS OF DESTINY" (Matching reference exactly!) */}
              <div
                className={`relative rounded-[28px] overflow-hidden border p-4 sm:p-5 flex flex-col justify-between min-h-[380px] shadow-xl group transition-all ${
                  isLight
                    ? 'border-slate-300 bg-slate-950 text-white'
                    : 'border-white/15 bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white hover:border-white/30'
                }`}
              >
                {/* Background Artwork */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=600&auto=format&fit=crop&q=80')`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/30" />

                {/* Top Floating Pill: Creator info + Follow button */}
                <div className="relative z-10 glass-pill rounded-full p-1.5 pl-2 pr-2 flex items-center justify-between gap-2 shadow-lg">
                  <div className="flex items-center gap-2">
                    <img
                      src="/avatars/kusha-kapila.jpg"
                      alt="Kusha Kapila"
                      className="w-7 h-7 rounded-full object-cover border border-white/20"
                    />
                    <div className="text-left">
                      <div className="text-[11px] font-bold text-white leading-tight">Kusha Kapila</div>
                      <div className="text-[9px] text-slate-300 uppercase font-mono">3.6M FOLLOWERS</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsFollowingKusha(!isFollowingKusha)}
                    className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                      isFollowingKusha
                        ? 'bg-white/20 text-white'
                        : 'bg-white/10 hover:bg-white/25 text-amber-300 border border-amber-400/30'
                    }`}
                  >
                    {isFollowingKusha ? 'Following ✓' : 'Follow'}
                  </button>
                </div>

                {/* Bottom Content: Bold Uppercase Title + Live Pill Badge */}
                <div className="relative z-10 space-y-2.5 pt-20">
                  <h4 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase leading-tight drop-shadow-md">
                    WINDS OF DESTINY
                  </h4>

                  <div className="flex items-center gap-2 flex-wrap text-xs">
                    {/* Live Pill matching reference */}
                    <div className="live-pill text-white px-2.5 py-0.5 rounded-full text-[11px] font-bold flex items-center gap-1.5 uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      <span>LIVE</span>
                    </div>
                    <span className="text-slate-300 text-[11px]">• 2m</span>
                    <span className="text-slate-200 text-[11px] font-semibold flex items-center gap-1">
                      <span>👤</span> 86.54k
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/10 text-slate-300 font-mono">
                      +15
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      if (onOpenMediaStudio) onOpenMediaStudio();
                    }}
                    className="w-full mt-2 py-2 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 text-xs font-semibold text-white transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>Analyze in Media Studio</span>
                    <ArrowRight className="w-3.5 h-3.5 text-rose-400" />
                  </button>
                </div>
              </div>

              {/* CARD 2: "TECH SUMMIT 2026" */}
              <div
                className={`relative rounded-[28px] overflow-hidden border p-4 sm:p-5 flex flex-col justify-between min-h-[380px] shadow-xl group transition-all ${
                  isLight
                    ? 'border-slate-300 bg-slate-950 text-white'
                    : 'border-white/15 bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white hover:border-white/30'
                }`}
              >
                {/* Background Artwork */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=80')`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/30" />

                {/* Top Floating Pill: Creator info */}
                <div className="relative z-10 glass-pill rounded-full p-1.5 pl-2 pr-2 flex items-center justify-between gap-2 shadow-lg">
                  <div className="flex items-center gap-2">
                    <img
                      src="/avatars/pranit-more.jpg"
                      alt="Pranit More"
                      className="w-7 h-7 rounded-full object-cover border border-white/20"
                    />
                    <div className="text-left">
                      <div className="text-[11px] font-bold text-white leading-tight">Pranit More</div>
                      <div className="text-[9px] text-slate-300 uppercase font-mono">1.4M FOLLOWERS</div>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsFollowingPranit(!isFollowingPranit)}
                    className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                      isFollowingPranit
                        ? 'bg-white/20 text-white'
                        : 'bg-white/10 hover:bg-white/25 text-amber-300 border border-amber-400/30'
                    }`}
                  >
                    {isFollowingPranit ? 'Following ✓' : 'Follow'}
                  </button>
                </div>

                {/* Bottom Content */}
                <div className="relative z-10 space-y-2.5 pt-20">
                  <h4 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase leading-tight drop-shadow-md">
                    TECH SUMMIT 2026
                  </h4>

                  <div className="flex items-center gap-2 flex-wrap text-xs">
                    <div className="live-pill text-white px-2.5 py-0.5 rounded-full text-[11px] font-bold flex items-center gap-1.5 uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      <span>LIVE</span>
                    </div>
                    <span className="text-slate-300 text-[11px]">• 5m</span>
                    <span className="text-slate-200 text-[11px] font-semibold flex items-center gap-1">
                      <span>👤</span> 52.1k
                    </span>
                    <span className="date-pill text-white px-2 py-0.5 rounded-full text-[10px] font-bold">
                      20th Oct
                    </span>
                  </div>

                  <button
                    onClick={() => onLoadDemoEvent('College Tech Fest 2026')}
                    className="w-full mt-2 py-2 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 text-xs font-semibold text-white transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>Load Event Copy</span>
                    <ArrowRight className="w-3.5 h-3.5 text-rose-400" />
                  </button>
                </div>
              </div>
            </div>

            {/* Date-Pill upcoming row (matching "Popular Casino's 20th Oct" in reference) */}
            <div
              className={`p-4 rounded-2xl flex items-center justify-between text-xs border transition-colors ${
                isLight
                  ? 'bg-white border-slate-200 shadow-sm'
                  : 'bg-neutral-950/80 border-white/10'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="date-pill text-white px-3 py-1 rounded-full text-xs font-bold">
                  20th Oct
                </span>
                <div>
                  <span
                    className={`font-bold block ${
                      isLight ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    Next Multi-Day Sprint
                  </span>
                  <span
                    className={`text-[11px] ${
                      isLight ? 'text-slate-500' : 'text-slate-400'
                    }`}
                  >
                    7-Day Automated Launch Campaign
                  </span>
                </div>
              </div>
              <button
                onClick={onStartCreating}
                className="text-rose-500 hover:text-rose-600 font-bold flex items-center gap-1 cursor-pointer"
              >
                <span>Plan Event</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* RIGHT SUB-GRID: "OLIVER BENNET" PROFILE & CREATIONS SHEET (Matching reference right screen!) */}
          <div className="lg:col-span-6">
            <div
              className={`rounded-[32px] p-6 sm:p-7 shadow-xl space-y-6 relative overflow-hidden border transition-colors ${
                isLight
                  ? 'bg-white border-slate-200 text-slate-900'
                  : 'bg-neutral-950/80 border-white/12 text-white'
              }`}
            >
              {/* Sheet Top Bar: Back button, handle, Edit Profile */}
              <div
                className={`flex items-center justify-between pb-4 border-b ${
                  isLight ? 'border-slate-200' : 'border-white/10'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setSelectedCreatorIndex((prev) => (prev === 0 ? yourCircles.length - 1 : prev - 1))}
                  className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors cursor-pointer ${
                    isLight
                      ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700'
                      : 'bg-white/10 hover:bg-white/20 border-white/10 text-slate-300'
                  }`}
                  title="Previous Creator"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <div
                  className={`text-xs font-mono font-semibold tracking-wide ${
                    isLight ? 'text-slate-700' : 'text-slate-300'
                  }`}
                >
                  {activeCreator.handle}
                </div>

                <button
                  onClick={() => setIsChangePictureOpen(true)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer shadow-xs border flex items-center gap-1.5 ${
                    isLight
                      ? 'bg-slate-900 hover:bg-black text-white border-slate-800'
                      : 'bg-white/15 hover:bg-white/25 text-white border-white/20'
                  }`}
                  title="Change Profile Picture"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Change Photo</span>
                </button>
              </div>

              {/* Profile Headline + Avatar + Action Buttons */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3.5 sm:gap-4">
                  {/* Circular Profile Picture with camera change button */}
                  <div className="relative group/avatar shrink-0">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full p-[2.5px] bg-gradient-to-tr from-[#FFAA80] via-[#FF4D6D] to-[#7928CA] shadow-xl shadow-rose-500/25">
                      <img
                        src={activeAvatar}
                        alt={activeCreator.name}
                        className={`w-full h-full rounded-full object-cover border-2 ${
                          isLight ? 'border-white bg-slate-100' : 'border-black bg-slate-900'
                        }`}
                      />
                    </div>
                    {/* Active Online Indicator */}
                    <span className="absolute bottom-0.5 right-0.5 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white shadow-xs" />

                    {/* Hover Camera Overlay Button */}
                    <button
                      onClick={() => setIsChangePictureOpen(true)}
                      className="absolute inset-0 rounded-full bg-black/60 opacity-0 group-hover/avatar:opacity-100 flex flex-col items-center justify-center text-white transition-opacity cursor-pointer backdrop-blur-[2px]"
                      title="Click to Change Profile Picture"
                    >
                      <Camera className="w-4 h-4 mb-0.5 text-white" />
                      <span className="text-[9px] font-bold uppercase tracking-wider">Change</span>
                    </button>
                  </div>

                  <div>
                    <h3
                      className={`text-xl sm:text-2xl font-black tracking-tight leading-none ${
                        isLight ? 'text-black' : 'text-white'
                      }`}
                    >
                      {activeCreator.name}
                    </h3>
                    <p
                      className={`text-xs font-mono font-bold mt-1 ${
                        isLight ? 'text-slate-700' : 'text-slate-400'
                      }`}
                    >
                      {activeCreator.handle}
                    </p>
                    <button
                      onClick={() => setIsChangePictureOpen(true)}
                      className="mt-1.5 text-[11px] font-bold text-rose-500 hover:text-rose-600 flex items-center gap-1 cursor-pointer group"
                    >
                      <Camera className="w-3 h-3 group-hover:scale-110 transition-transform" />
                      <span>Change Profile Picture</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Glowing Prismatic Star Button */}
                  <button
                    onClick={() => {
                      if (onOpenMediaStudio) onOpenMediaStudio();
                    }}
                    className="p-2.5 rounded-full bg-gradient-to-tr from-rose-500/20 to-purple-500/20 border border-rose-500/40 hover:border-rose-400 text-rose-500 shadow-xs transition-all cursor-pointer group"
                    title="Launch Media Studio"
                  >
                    <PrismaticStar size={18} className="group-hover:rotate-12 transition-transform" />
                  </button>
                  {/* Message Envelope button matching reference */}
                  <button
                    type="button"
                    onClick={() => onCopyText(`${activeCreator.handle.replace('@', '')}@creatorstudio.ai`, 'Creator Email')}
                    className={`p-2.5 rounded-full border transition-all cursor-pointer ${
                      isLight
                        ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
                        : 'bg-black/60 hover:bg-black border-white/15 text-slate-300 hover:text-white'
                    }`}
                    title="Copy Contact Link"
                  >
                    <Mail className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Bio description */}
              <p
                className={`text-xs sm:text-sm leading-relaxed ${
                  isLight ? 'text-slate-800 font-medium' : 'text-slate-300'
                }`}
              >
                {activeCreator.role} · Creator of India's biggest community streaming nights and digital content.
              </p>

              {/* 3-Column Stats Counter matching reference */}
              <div
                className={`grid grid-cols-3 gap-2 py-3 border-y text-center ${
                  isLight ? 'border-slate-200' : 'border-white/10'
                }`}
              >
                <div>
                  <div
                    className={`text-lg sm:text-xl font-black ${
                      isLight ? 'text-black' : 'text-white'
                    }`}
                  >
                    {activeCreator.followers}
                  </div>
                  <div
                    className={`text-[11px] font-bold ${
                      isLight ? 'text-slate-700' : 'text-slate-400'
                    }`}
                  >
                    Followers
                  </div>
                </div>
                <div>
                  <div
                    className={`text-lg sm:text-xl font-black ${
                      isLight ? 'text-black' : 'text-white'
                    }`}
                  >
                    420
                  </div>
                  <div
                    className={`text-[11px] font-bold ${
                      isLight ? 'text-slate-700' : 'text-slate-400'
                    }`}
                  >
                    Following
                  </div>
                </div>
                <div>
                  <div
                    className={`text-lg sm:text-xl font-black ${
                      isLight ? 'text-black' : 'text-white'
                    }`}
                  >
                    {activeCreator.creations}
                  </div>
                  <div
                    className={`text-[11px] font-bold ${
                      isLight ? 'text-slate-700' : 'text-slate-400'
                    }`}
                  >
                    Creations
                  </div>
                </div>
              </div>

              {/* Pill tags chips row matching reference */}
              <div className="flex flex-wrap gap-2">
                {[
                  '@standup',
                  '@streamer',
                  '@chess',
                  '@roast',
                  '@creator',
                  '@mumbai',
                ].map((tag) => (
                  <span
                    key={tag}
                    className={`text-xs font-mono px-3 py-1 rounded-full border transition-colors cursor-pointer ${
                      isLight
                        ? 'bg-slate-100 border-slate-300 text-slate-900 font-semibold hover:bg-slate-200'
                        : 'bg-white/5 border-white/10 text-slate-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Mini Gallery Strip with Navigation Arrows matching reference */}
              <div className="space-y-2.5 pt-1">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-bold uppercase tracking-wider ${
                      isLight ? 'text-black' : 'text-slate-400'
                    }`}
                  >
                    Featured Creations
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() =>
                        setActiveGalleryIndex((prev) =>
                          prev === 0 ? galleryThumbnails.length - 1 : prev - 1
                        )
                      }
                      className={`p-1 rounded-full border cursor-pointer ${
                        isLight
                          ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
                          : 'bg-white/5 hover:bg-white/15 border-white/10 text-slate-300'
                      }`}
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() =>
                        setActiveGalleryIndex((prev) =>
                          (prev + 1) % galleryThumbnails.length
                        )
                      }
                      className={`p-1 rounded-full border cursor-pointer ${
                        isLight
                          ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
                          : 'bg-white/5 hover:bg-white/15 border-white/10 text-slate-300'
                      }`}
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-2.5">
                  {galleryThumbnails.map((item, idx) => (
                    <div
                      key={item.id}
                      onClick={() => setActiveGalleryIndex(idx)}
                      className={`relative aspect-square rounded-2xl overflow-hidden border cursor-pointer transition-all ${
                        activeGalleryIndex === idx
                          ? 'border-rose-500 ring-2 ring-rose-500/40 scale-105 shadow-md'
                          : isLight
                          ? 'border-slate-200 opacity-90 hover:opacity-100'
                          : 'border-white/10 opacity-75 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={item.img}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Testimonial Quote Card matching reference bottom right */}
              <div
                className={`p-4 rounded-2xl border space-y-2 text-xs ${
                  isLight
                    ? 'bg-slate-50 border-slate-200'
                    : 'bg-black/60 border-white/10'
                }`}
              >
                <div className="flex items-start gap-3">
                  <img
                    src="/avatars/ankur-warikoo.jpg"
                    alt="Ankur Warikoo"
                    className="w-8 h-8 rounded-full object-cover border border-white/20 shrink-0"
                  />
                  <div>
                    <p
                      className={`italic leading-relaxed text-[11px] ${
                        isLight ? 'text-slate-800 font-medium' : 'text-slate-300'
                      }`}
                    >
                      “The Adverse creative engine transformed how we distribute high-impact social media assets across YouTube, LinkedIn, and Instagram. Built for the Indian creator economy!”
                    </p>
                    <div className="mt-1.5 flex items-center justify-between text-[11px]">
                      <div>
                        <span
                          className={`font-black block ${
                            isLight ? 'text-black' : 'text-white'
                          }`}
                        >
                          Ankur Warikoo
                        </span>
                        <span
                          className={`font-mono text-[10px] font-bold ${
                            isLight ? 'text-slate-600' : 'text-slate-400'
                          }`}
                        >
                          @ankurwarikoo
                        </span>
                      </div>
                      <span className="text-amber-600 font-bold text-[10px]">
                        Verified Indian Educator
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 3: LIVE COPY GENERATOR / DEMO PIPELINE */}
        <div
          className={`max-w-4xl mx-auto rounded-3xl border p-5 sm:p-7 shadow-xl relative overflow-hidden transition-colors ${
            isLight
              ? 'bg-white border-slate-200 text-slate-900'
              : 'bg-neutral-950/80 border-white/12 text-white'
          }`}
        >
          <div
            className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b relative z-10 ${
              isLight ? 'border-slate-200' : 'border-white/10'
            }`}
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-rose-500 uppercase tracking-wide">
                  Live Interactive Transformation
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-bold text-emerald-600">
                  Try It Below
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className={`text-xs font-medium ${
                    isLight ? 'text-slate-500' : 'text-slate-400'
                  }`}
                >
                  Input Event:
                </span>
                <span
                  className={`text-sm font-extrabold ${
                    isLight ? 'text-black' : 'text-white'
                  }`}
                >
                  “College Tech Fest 2026”
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onLoadDemoEvent('College Tech Fest 2026')}
                className="px-4 py-2 text-xs font-bold text-white bg-gradient-to-r from-rose-500 to-pink-500 hover:brightness-110 rounded-full transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <Zap className="w-3.5 h-3.5 text-amber-300" />
                <span>Open in Studio Results</span>
              </button>
            </div>
          </div>

          {/* Transformation Pipeline Arrow */}
          <div
            className={`py-3.5 flex items-center justify-center gap-2 text-xs font-semibold ${
              isLight ? 'text-slate-600' : 'text-slate-400'
            }`}
          >
            <span>1. Enter Event Details Once</span>
            <ChevronRight className="w-4 h-4 text-rose-500 animate-pulse" />
            <span className="text-rose-500 font-bold">2. Select Social Deliverables</span>
            <ChevronRight className="w-4 h-4 text-rose-500 animate-pulse" />
            <span className="text-amber-500 font-bold">3. Copy & Post Everywhere</span>
          </div>

          {/* Platform Switcher Tabs */}
          <div
            className={`flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none border-b ${
              isLight ? 'border-slate-200' : 'border-white/10'
            }`}
          >
            {previewTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? `${tab.activeBg} shadow-sm`
                      : isLight
                      ? 'text-slate-600 hover:text-black hover:bg-slate-100 border border-transparent'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-inherit' : tab.color}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Generated Content Preview Area */}
          <div
            className={`mt-4 rounded-2xl border p-4 sm:p-5 relative group transition-colors ${
              isLight
                ? 'bg-slate-50 border-slate-200 text-slate-900'
                : 'bg-black/80 border-white/10 text-slate-200'
            }`}
          >
            <div
              className={`flex items-center justify-between pb-3 mb-3 border-b ${
                isLight ? 'border-slate-200' : 'border-white/10'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className={`text-xs font-bold tracking-tight ${
                    isLight ? 'text-black' : 'text-white'
                  }`}
                >
                  {activeItem?.title || 'Generated Output'}
                </span>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                  ✓ Ready to Post
                </span>
              </div>

              {activeItem && (
                <button
                  onClick={() => handleCopy(activeItem.content, activeItem.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-full transition-all cursor-pointer border ${
                    isLight
                      ? 'bg-white hover:bg-slate-100 text-slate-900 border-slate-300 shadow-xs'
                      : 'bg-white/10 hover:bg-white/20 text-white border-white/15'
                  }`}
                >
                  {copiedId === activeItem.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-emerald-600 font-bold">Copied ✓</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 opacity-70" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              )}
            </div>

            <pre
              className={`text-xs sm:text-sm whitespace-pre-wrap font-sans leading-relaxed max-h-72 overflow-y-auto pr-2 ${
                isLight ? 'text-slate-800' : 'text-slate-200'
              }`}
            >
              {activeItem?.content}
            </pre>
          </div>
        </div>

        {/* Section 4: Workflow Grid */}
        <div
          id="how-it-works"
          className={`pt-10 border-t ${
            isLight ? 'border-slate-200' : 'border-white/10'
          }`}
        >
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold tracking-wider uppercase text-rose-500">
              Turnkey Architecture
            </span>
            <h2
              className={`mt-2 text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight ${
                isLight ? 'text-black' : 'text-white'
              }`}
            >
              Event-to-Everything™ Workflow
            </h2>
            <p
              className={`mt-2 text-sm leading-relaxed ${
                isLight ? 'text-slate-800 font-medium' : 'text-slate-400'
              }`}
            >
              Enter your event details once. The engine automatically constructs tailored copy
              for every communication channel.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-5 gap-3.5">
            {[
              {
                step: '01',
                title: 'Event Details',
                desc: 'Enter title, date, venue, audience, and choose your tone.',
                icon: Calendar,
                tag: 'Input Once',
              },
              {
                step: '02',
                title: 'Social Media',
                desc: 'Instagram captions, carousels, LinkedIn articles, and X posts.',
                icon: Share2,
                tag: 'Social Reach',
              },
              {
                step: '03',
                title: 'Invitations',
                desc: 'WhatsApp groups & email templates with registration links.',
                icon: MessageCircle,
                tag: 'Direct Invites',
              },
              {
                step: '04',
                title: 'Promotion',
                desc: 'Print poster text, targeted hashtags, and short SMS promos.',
                icon: Layers,
                tag: 'Amplification',
              },
              {
                step: '05',
                title: 'Announcement',
                desc: 'Formal releases, press blurbs, and multi-day campaign sprints.',
                icon: Sparkles,
                tag: 'Full Launch',
              },
            ].map((node) => {
              const NodeIcon = node.icon;
              return (
                <div
                  key={node.step}
                  className={`relative rounded-2xl border p-5 transition-all duration-300 hover:shadow-lg group ${
                    isLight
                      ? 'bg-white border-slate-200 text-slate-900 hover:border-slate-300'
                      : 'bg-neutral-950/80 border-white/10 text-white hover:border-white/25'
                  }`}
                >
                  <div
                    className={`flex items-center justify-between text-xs mb-3 font-mono ${
                      isLight ? 'text-slate-700 font-bold' : 'text-slate-400'
                    }`}
                  >
                    <span className="font-bold">{node.step}</span>
                    <span className="text-rose-500 font-sans font-bold text-[10px] uppercase tracking-wider bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20">
                      {node.tag}
                    </span>
                  </div>
                  <div
                    className={`w-9 h-9 rounded-xl border flex items-center justify-center text-rose-500 mb-3 group-hover:scale-105 transition-transform ${
                      isLight
                        ? 'bg-slate-100 border-slate-200'
                        : 'bg-white/5 border-white/10'
                    }`}
                  >
                    <NodeIcon className="w-4 h-4" />
                  </div>
                  <h3
                    className={`text-sm font-bold tracking-tight ${
                      isLight ? 'text-black' : 'text-white'
                    }`}
                  >
                    {node.title}
                  </h3>
                  <p
                    className={`mt-1 text-xs leading-normal ${
                      isLight ? 'text-slate-700 font-medium' : 'text-slate-400'
                    }`}
                  >
                    {node.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Change Profile Picture Modal */}
      <ChangeProfilePictureModal
        isOpen={isChangePictureOpen}
        onClose={() => setIsChangePictureOpen(false)}
        currentAvatar={activeAvatar}
        creatorName={activeCreator.name}
        onSaveAvatar={(newUrl) => {
          setCustomAvatars((prev) => ({
            ...prev,
            [activeCreator.id]: newUrl,
          }));
          onCopyText(newUrl, `Profile picture updated for ${activeCreator.name}`);
        }}
        theme={theme}
      />
    </div>
  );
};
