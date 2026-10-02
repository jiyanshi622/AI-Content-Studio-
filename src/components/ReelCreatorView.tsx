import React, { useState } from 'react';
import {
  Sparkles,
  Video,
  Clock,
  Target,
  Hash,
  Share2,
  Copy,
  Check,
  Zap,
  TrendingUp,
  Instagram,
  Facebook,
  Linkedin,
  BarChart3,
  Lightbulb,
  Music,
  Layers,
  Database,
  ArrowRight,
  Flame,
  Volume2,
} from 'lucide-react';
import { ReelPlatform, ReelRequest, ReelResponse } from '../types';

interface ReelCreatorViewProps {
  onCopyText: (text: string, title?: string) => void;
  userUid?: string;
}

export const ReelCreatorView: React.FC<ReelCreatorViewProps> = ({
  onCopyText,
  userUid,
}) => {
  // Input State
  const [topic, setTopic] = useState('');
  const [platforms, setPlatforms] = useState<ReelPlatform[]>([
    'instagram',
    'facebook',
    'linkedin',
  ]);
  const [targetAge, setTargetAge] = useState<'16-24' | '25-34' | '35-49' | 'all'>('16-24');
  const [duration, setDuration] = useState<'15s' | '30s' | '60s'>('30s');
  const [goal, setGoal] = useState('Virality & Reach');
  const [tone, setTone] = useState('High-Energy & Viral');

  // Loading & Result State
  const [isLoading, setIsLoading] = useState(false);
  const [reelData, setReelData] = useState<ReelResponse | null>(null);
  const [activeTab, setActiveTab] = useState<'script' | 'audience' | 'seo' | 'timing' | 'tips'>('script');
  const [savedToSql, setSavedToSql] = useState(false);

  // Toggle platform selection
  const togglePlatform = (p: ReelPlatform) => {
    if (platforms.includes(p)) {
      if (platforms.length === 1) return; // Keep at least one
      setPlatforms(platforms.filter((item) => item !== p));
    } else {
      setPlatforms([...platforms, p]);
    }
  };

  // Sample prompt ideas
  const sampleTopics = [
    '3 common mistakes every student makes at hackathons',
    'How I built an AI tool in 24 hours (Step-by-step)',
    'Why traditional networking is dead and what works instead',
    '5 free tools every content creator needs in 2026',
  ];

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;

    setIsLoading(true);
    setSavedToSql(false);

    try {
      const response = await fetch('/api/generate-reel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          platforms,
          targetAge,
          duration,
          goal,
          tone,
          userUid,
        }),
      });

      if (!response.ok) {
        throw new Error(`Generation failed (${response.status})`);
      }

      const data = await response.json();
      if (data.reel) {
        setReelData(data.reel);
        setSavedToSql(true);
      }
    } catch (err) {
      console.error('Reel generation error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 animate-in fade-in">
      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-rose-500/20 via-pink-500/20 to-purple-500/20 border border-rose-500/30 text-rose-300 text-xs font-bold uppercase tracking-wider mb-3">
          <Video className="w-4 h-4 text-rose-400" />
          <span>Viral Reel & Short Video Studio</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Reel Script, Age Targeting & <span className="bg-gradient-to-r from-rose-400 via-pink-400 to-amber-300 bg-clip-text text-transparent">Backend SEO</span>
        </h1>
        <p className="mt-3 text-sm sm:text-base text-slate-400">
          Craft high-retention vertical reels for Instagram, Facebook, and LinkedIn with scene-by-scene visual cues, target audience age psychology, algorithmic ranking hashtags, and optimal publishing schedules.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: Input Form (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl backdrop-blur-md">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-rose-400" />
              <span>Configure Your Reel</span>
            </h2>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded-md flex items-center gap-1">
              <Database className="w-3 h-3" />
              <span>Cloud SQL Connected</span>
            </span>
          </div>

          <form onSubmit={handleGenerate} className="space-y-5">
            {/* Topic Input */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Reel Topic or Concept *
              </label>
              <textarea
                required
                rows={3}
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. 3 common mistakes students make in 24-hour hackathons, and how our project won 1st place"
                className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-2xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 transition-colors resize-none"
              />

              {/* Sample Quick Prompts */}
              <div className="mt-2.5">
                <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                  ⚡ Try an idea:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {sampleTopics.map((sample, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setTopic(sample)}
                      className="text-[11px] px-2.5 py-1 bg-slate-800/70 hover:bg-rose-950/60 hover:text-rose-300 hover:border-rose-700/50 border border-slate-700/60 rounded-lg text-slate-300 transition-all text-left cursor-pointer"
                    >
                      {sample}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Target Social Platforms */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Publishing Platforms *
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => togglePlatform('instagram')}
                  className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                    platforms.includes('instagram')
                      ? 'border-pink-500 bg-pink-950/40 text-pink-300 shadow-md shadow-pink-500/10'
                      : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <Instagram className="w-4 h-4 text-pink-400" />
                  <span>Instagram</span>
                </button>

                <button
                  type="button"
                  onClick={() => togglePlatform('facebook')}
                  className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                    platforms.includes('facebook')
                      ? 'border-blue-500 bg-blue-950/40 text-blue-300 shadow-md shadow-blue-500/10'
                      : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <Facebook className="w-4 h-4 text-blue-400" />
                  <span>Facebook</span>
                </button>

                <button
                  type="button"
                  onClick={() => togglePlatform('linkedin')}
                  className={`p-2.5 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                    platforms.includes('linkedin')
                      ? 'border-sky-500 bg-sky-950/40 text-sky-300 shadow-md shadow-sky-500/10'
                      : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <Linkedin className="w-4 h-4 text-sky-400" />
                  <span>LinkedIn</span>
                </button>
              </div>
            </div>

            {/* Target Age Demographic */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Target Audience Age Demographic *
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: '16-24', label: '🎓 Gen Z (16 - 24)', desc: 'Fast cuts, bold hooks, tech/student' },
                  { id: '25-34', label: '💼 Young Pros (25 - 34)', desc: 'Career, productivity, tools' },
                  { id: '35-49', label: '👔 Leaders (35 - 49)', desc: 'Industry insights, strategy' },
                  { id: 'all', label: '🌍 Broad (18 - 45)', desc: 'High-relatability general reach' },
                ].map((age) => (
                  <button
                    key={age.id}
                    type="button"
                    onClick={() => setTargetAge(age.id as any)}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      targetAge === age.id
                        ? 'border-rose-500 bg-rose-950/40 text-rose-200 shadow-sm'
                        : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="text-xs font-bold text-white">{age.label}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{age.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Duration & Goal */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Duration
                </label>
                <div className="grid grid-cols-3 gap-1">
                  {(['15s', '30s', '60s'] as const).map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setDuration(d)}
                      className={`py-1.5 text-xs font-bold rounded-lg border text-center transition-all cursor-pointer ${
                        duration === d
                          ? 'border-rose-500 bg-rose-950/50 text-rose-300'
                          : 'border-slate-800 bg-slate-950 text-slate-400'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Content Goal
                </label>
                <select
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="w-full py-1.5 px-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:outline-none focus:border-rose-500"
                >
                  <option value="Virality & Reach">Virality & Reach</option>
                  <option value="Educational / Authority">Educational Authority</option>
                  <option value="Audience Conversion">Audience Conversion</option>
                  <option value="Event Hype">Event & Fest Hype</option>
                </select>
              </div>
            </div>

            {/* Tone Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Vibe / Delivery Style
              </label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className="w-full py-2 px-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-rose-500"
              >
                <option value="High-Energy & Viral">⚡ High-Energy & Viral (Pattern Interrupt)</option>
                <option value="Conversational & Authentic">🗣️ Conversational & Authentic (Behind-the-scenes)</option>
                <option value="Direct & Tactical">🎯 Direct & Tactical (Step-by-step value)</option>
                <option value="Inspirational & Cinematic">✨ Inspirational & Cinematic (Story driven)</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 px-4 font-bold text-sm text-white bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-600 rounded-2xl shadow-lg shadow-rose-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Analyzing SEO & Scripting Reel...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Reel & SEO Package</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* RIGHT COLUMN: Reel Package Output (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {!reelData && !isLoading && (
            <div className="rounded-3xl border border-dashed border-slate-800 bg-slate-900/40 p-12 text-center">
              <div className="w-14 h-14 rounded-2xl bg-rose-950/60 border border-rose-800/40 flex items-center justify-center mx-auto mb-4 text-rose-400">
                <Video className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-white">Your Reel Studio is Ready</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto mt-2 leading-relaxed">
                Enter your topic, pick your platforms (Instagram, Facebook, LinkedIn), and select your target age to generate a scene-by-scene script, 3-second hooks, audience psychology, SEO ranking hashtags, and the best publish times!
              </p>
            </div>
          )}

          {isLoading && (
            <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-12 text-center space-y-4">
              <div className="w-12 h-12 border-3 border-rose-500/20 border-t-rose-500 rounded-full animate-spin mx-auto" />
              <div className="space-y-1">
                <div className="text-sm font-bold text-white">Optimizing Reel for Social Algorithms...</div>
                <div className="text-xs text-slate-400">
                  Formulating 3-second hook, scene timeline, age psychological triggers, and peak publishing schedule.
                </div>
              </div>
            </div>
          )}

          {reelData && (
            <div className="rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl p-6 sm:p-7 relative overflow-hidden text-slate-100">
              {/* Top Meta Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-950/60 border border-rose-800/50 text-rose-300 text-[10px] font-bold uppercase tracking-wider mb-1">
                    <Flame className="w-3 h-3 text-rose-400" />
                    <span>Viral Video Package</span>
                  </div>
                  <h2 className="text-xl font-black text-white">{reelData.title}</h2>
                </div>

                {savedToSql && (
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2.5 py-1 rounded-xl flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5" />
                    <span>Stored in Cloud SQL</span>
                  </span>
                )}
              </div>

              {/* Segmented Navigation Tabs */}
              <div className="flex items-center gap-1.5 p-1 bg-slate-950 border border-slate-800 rounded-2xl my-5 overflow-x-auto">
                {[
                  { id: 'script', label: '🎬 Script & Scenes', icon: Video },
                  { id: 'audience', label: '📊 Age & Audience', icon: Target },
                  { id: 'seo', label: '🔍 SEO & Hashtags', icon: Hash },
                  { id: 'timing', label: '⏰ Best Post Times', icon: Clock },
                  { id: 'tips', label: '🎧 Creator Tips', icon: Lightbulb },
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                        activeTab === tab.id
                          ? 'bg-rose-600 text-white shadow-md'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* TAB 1: SCRIPT & TIMELINE */}
              {activeTab === 'script' && (
                <div className="space-y-5 animate-in fade-in">
                  {/* Hook Card */}
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-rose-950/50 via-pink-950/30 to-purple-950/30 border border-rose-500/30">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-black uppercase tracking-wider text-rose-400 flex items-center gap-1">
                        <Zap className="w-3.5 h-3.5" />
                        <span>First 3 Seconds Scroll-Stopping Hook</span>
                      </span>
                      <button
                        onClick={() => onCopyText(reelData.hook, 'Primary Hook')}
                        className="text-xs text-rose-300 hover:text-white flex items-center gap-1 cursor-pointer"
                      >
                        <Copy className="w-3 h-3" />
                        <span>Copy</span>
                      </button>
                    </div>
                    <div className="text-sm font-bold text-white leading-relaxed">
                      "{reelData.hook}"
                    </div>

                    {/* Hook Variations */}
                    {reelData.hookVariations && (
                      <div className="mt-3 pt-3 border-t border-rose-900/40">
                        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                          Alternative Hooks to A/B Test:
                        </div>
                        <div className="space-y-1">
                          {reelData.hookVariations.map((v, i) => (
                            <div
                              key={i}
                              className="text-xs text-slate-300 flex items-start gap-1.5"
                            >
                              <span className="text-rose-400 font-bold">{i + 1}.</span>
                              <span>{v}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Scene Timeline */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                        Scene-by-Scene Visual & Narration Timeline
                      </h4>
                      <button
                        onClick={() => onCopyText(reelData.fullVoiceover, 'Full Voiceover')}
                        className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                      >
                        <Volume2 className="w-3 h-3 text-rose-400" />
                        <span>Copy Voiceover Script</span>
                      </button>
                    </div>

                    <div className="space-y-2.5">
                      {reelData.scenes.map((scene, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800/80 hover:border-slate-700 transition-colors"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-mono font-bold text-rose-400 bg-rose-950/60 px-2 py-0.5 rounded border border-rose-800/40">
                              ⏱️ {scene.timeframe}
                            </span>
                            <span className="text-[10px] font-bold text-amber-300 bg-amber-950/50 px-2 py-0.5 rounded border border-amber-800/40">
                              TEXT: "{scene.onScreenText}"
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                            <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800/60">
                              <span className="text-[10px] font-bold uppercase text-slate-400 block mb-0.5">
                                📹 Visual / Camera Action
                              </span>
                              <span className="text-slate-200">{scene.visual}</span>
                            </div>

                            <div className="p-2 rounded-xl bg-slate-900/60 border border-slate-800/60">
                              <span className="text-[10px] font-bold uppercase text-slate-400 block mb-0.5">
                                🎙️ Verbal Narration
                              </span>
                              <span className="text-slate-200">"{scene.narration}"</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Caption & Call to Action */}
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-300">
                        Optimized Reel Caption
                      </span>
                      <button
                        onClick={() => onCopyText(reelData.caption, 'Reel Caption')}
                        className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 cursor-pointer font-bold"
                      >
                        <Copy className="w-3 h-3" />
                        <span>Copy Caption</span>
                      </button>
                    </div>
                    <pre className="text-xs text-slate-300 whitespace-pre-wrap font-sans bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                      {reelData.caption}
                    </pre>
                  </div>
                </div>
              )}

              {/* TAB 2: AUDIENCE ANALYSIS & AGE TARGETING */}
              {activeTab === 'audience' && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                    <div className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-1">
                      Demographic Target Breakdown
                    </div>
                    <div className="text-base font-extrabold text-white">
                      {reelData.audienceAnalysis.ageGroup}
                    </div>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      {reelData.audienceAnalysis.whyThisFormatWorks}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                      <div className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-amber-400" />
                        <span>Psychological Triggers</span>
                      </div>
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        {reelData.audienceAnalysis.psychologicalTriggers.map((t, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-amber-400 font-bold">•</span>
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                      <div className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Target className="w-3.5 h-3.5 text-rose-400" />
                        <span>Core Pain Points Solved</span>
                      </div>
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        {reelData.audienceAnalysis.corePainPoints.map((p, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-rose-400 font-bold">•</span>
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: BACKEND SEO & HASHTAGS */}
              {activeTab === 'seo' && (
                <div className="space-y-4 animate-in fade-in">
                  {/* Primary Keywords for Audio/Transcript Indexing */}
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                    <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                      🔑 Backend SEO Keywords (For Audio & Explore Indexing)
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {reelData.seoRanking.primaryKeywords.map((kw, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 text-xs bg-slate-900 border border-slate-800 rounded-lg text-rose-300 font-mono"
                        >
                          {kw}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Hashtags Breakdown */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                      <div className="text-[11px] font-bold text-pink-400 uppercase tracking-wider">
                        🔥 Trending (High Volume)
                      </div>
                      <div className="text-xs text-slate-300 space-y-1">
                        {reelData.seoRanking.trendingHashtags.map((h, i) => (
                          <div key={i} className="font-mono text-[11px] text-pink-300">
                            {h}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                      <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                        🎯 Niche (Fast Rank)
                      </div>
                      <div className="text-xs text-slate-300 space-y-1">
                        {reelData.seoRanking.nicheHashtags.map((h, i) => (
                          <div key={i} className="font-mono text-[11px] text-amber-300">
                            {h}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                      <div className="text-[11px] font-bold text-blue-400 uppercase tracking-wider">
                        🌐 Broad Category
                      </div>
                      <div className="text-xs text-slate-300 space-y-1">
                        {reelData.seoRanking.broadHashtags.map((h, i) => (
                          <div key={i} className="font-mono text-[11px] text-blue-300">
                            {h}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Copy All Hashtags */}
                  <button
                    onClick={() => {
                      const allTags = [
                        ...reelData.seoRanking.trendingHashtags,
                        ...reelData.seoRanking.nicheHashtags,
                        ...reelData.seoRanking.broadHashtags,
                      ].join(' ');
                      onCopyText(allTags, 'All SEO Hashtags');
                    }}
                    className="w-full py-2.5 px-3 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-bold text-slate-200 flex items-center justify-center gap-2 cursor-pointer transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5 text-rose-400" />
                    <span>Copy All Algorithm Ranking Hashtags</span>
                  </button>

                  {/* Algorithm Ranking Checklist */}
                  <div className="p-4 rounded-2xl bg-rose-950/30 border border-rose-900/40 space-y-2">
                    <div className="text-xs font-bold text-rose-300 uppercase tracking-wider flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5 text-rose-400" />
                      <span>Explore Algorithm Ranking Secrets</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {reelData.seoRanking.algorithmRankingTips.map((tip, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {/* TAB 4: BEST PUBLISHING TIME */}
              {activeTab === 'timing' && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-pink-400">
                        <Instagram className="w-4 h-4 text-pink-400" />
                        <span>Instagram Reels</span>
                      </div>
                      <div className="text-xs font-mono font-bold text-white">
                        {reelData.bestPublishTimes.instagram}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Highest active scroll volume
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-blue-400">
                        <Facebook className="w-4 h-4 text-blue-400" />
                        <span>Facebook Reels</span>
                      </div>
                      <div className="text-xs font-mono font-bold text-white">
                        {reelData.bestPublishTimes.facebook}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Afternoon & late evening spikes
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-sky-400">
                        <Linkedin className="w-4 h-4 text-sky-400" />
                        <span>LinkedIn Video</span>
                      </div>
                      <div className="text-xs font-mono font-bold text-white">
                        {reelData.bestPublishTimes.linkedin}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Morning work starts & lunch slots
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-300">
                        Top Performing Days:
                      </span>
                      <div className="flex items-center gap-1.5">
                        {reelData.bestPublishTimes.peakDays.map((d, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded-md bg-rose-950/60 border border-rose-800/40 text-rose-300 text-xs font-bold"
                          >
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-slate-400 pt-1 leading-relaxed">
                      {reelData.bestPublishTimes.timingExplanation}
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 5: CREATOR TIPS & RETENTION */}
              {activeTab === 'tips' && (
                <div className="space-y-4 animate-in fade-in">
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-slate-300">
                        Algorithmic Retention Forecast
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Predicted completion rate based on script pacing & hook
                      </div>
                    </div>
                    <div className="text-2xl font-black text-emerald-400 font-mono bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-800/40">
                      {reelData.creatorSuggestions.retentionScore}%
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                    <div className="text-xs font-bold text-rose-400 flex items-center gap-1.5">
                      <Music className="w-3.5 h-3.5" />
                      <span>Audio & Sound Beat Recommendation</span>
                    </div>
                    <div className="text-xs text-slate-200">
                      {reelData.creatorSuggestions.audioRecommendation}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1.5">
                    <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5" />
                      <span>Framing, Cuts & Text Safe-Zones</span>
                    </div>
                    <div className="text-xs text-slate-200">
                      {reelData.creatorSuggestions.pacingAndFraming}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
