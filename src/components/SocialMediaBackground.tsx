import React from 'react';
import {
  Heart,
  TrendingUp,
  MessageCircle,
  Share2,
  Sparkles,
  Zap,
  Repeat2,
  CheckCheck,
} from 'lucide-react';

export type BackgroundTheme = 'sunset' | 'midnight' | 'aurora';

interface SocialMediaBackgroundProps {
  theme?: BackgroundTheme;
}

export const SocialMediaBackground: React.FC<SocialMediaBackgroundProps> = ({
  theme = 'sunset',
}) => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* 1. Base Gradient Canvas based on selected theme */}
      {theme === 'sunset' && (
        <>
          {/* Warm Peach-Rose Sunset Radiant Mesh Glow */}
          <div className="absolute -top-[15%] left-1/2 -translate-x-1/2 w-[1100px] h-[750px] bg-gradient-to-br from-rose-500/25 via-pink-500/20 to-amber-500/20 blur-[130px] rounded-full animate-pulse-glow" />
          <div className="absolute top-[35%] -left-[10%] w-[650px] h-[650px] bg-gradient-to-tr from-rose-600/20 via-orange-500/15 to-pink-500/10 blur-[140px] rounded-full" />
          <div className="absolute top-[45%] -right-[10%] w-[700px] h-[700px] bg-gradient-to-bl from-purple-600/20 via-pink-500/15 to-rose-500/15 blur-[140px] rounded-full" />
          <div className="absolute bottom-0 left-1/3 w-[800px] h-[400px] bg-gradient-to-t from-rose-900/20 via-pink-900/10 to-transparent blur-[120px] rounded-full" />

          {/* Subtle warm micro-grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #ff80a5 1px, transparent 0)`,
              backgroundSize: '36px 36px',
            }}
          />
        </>
      )}

      {theme === 'midnight' && (
        <>
          {/* Deep Cyber Midnight with electric neon highlights */}
          <div className="absolute -top-[15%] left-1/2 -translate-x-1/2 w-[1000px] h-[700px] bg-indigo-600/18 blur-[140px] rounded-full" />
          <div className="absolute top-[30%] -left-[10%] w-[600px] h-[600px] bg-purple-600/15 blur-[130px] rounded-full" />
          <div className="absolute top-[40%] -right-[10%] w-[600px] h-[600px] bg-cyan-600/15 blur-[130px] rounded-full" />
          <div
            className="absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)`,
              backgroundSize: '32px 32px',
            }}
          />
        </>
      )}

      {theme === 'aurora' && (
        <>
          {/* Emerald & Violet Aurora */}
          <div className="absolute -top-[15%] left-1/2 -translate-x-1/2 w-[1000px] h-[700px] bg-emerald-600/18 blur-[140px] rounded-full" />
          <div className="absolute top-[30%] -left-[10%] w-[600px] h-[600px] bg-teal-600/15 blur-[130px] rounded-full" />
          <div className="absolute top-[40%] -right-[10%] w-[600px] h-[600px] bg-violet-600/15 blur-[130px] rounded-full" />
        </>
      )}

      {/* 2. Giant Ambient Typographic Watermark (gives modern creator agency atmosphere) */}
      <div className="absolute top-28 left-0 right-0 overflow-hidden opacity-[0.035] flex justify-center items-center pointer-events-none">
        <span className="text-[12vw] font-black uppercase tracking-tighter whitespace-nowrap text-white select-none">
          SOCIAL MEDIA STUDIO
        </span>
      </div>

      {/* 3. Floating 3D-Styled Social Media Badges */}
      {/* Badge A: Instagram Engagement Card (Top-Left) */}
      <div className="hidden lg:flex items-center gap-3 absolute top-32 left-8 xl:left-14 p-3 rounded-2xl bg-slate-900/60 border border-pink-500/25 backdrop-blur-md shadow-2xl social-glow-instagram animate-float-slow">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-yellow-400 via-rose-500 to-purple-600 flex items-center justify-center text-white shadow-md">
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-white">Instagram Caption</span>
            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
              Viral Ready
            </span>
          </div>
          <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-300">
            <span className="flex items-center gap-1 text-pink-400 font-semibold">
              <Heart className="w-3 h-3 fill-pink-400" /> 18.4K likes
            </span>
            <span>·</span>
            <span className="text-slate-400">1.2K comments</span>
          </div>
        </div>
      </div>

      {/* Badge B: LinkedIn Professional Reach Card (Top-Right) */}
      <div className="hidden lg:flex items-center gap-3 absolute top-40 right-8 xl:right-16 p-3 rounded-2xl bg-slate-900/60 border border-blue-500/25 backdrop-blur-md shadow-2xl social-glow-linkedin animate-float-reverse">
        <div className="w-10 h-10 rounded-xl bg-[#0A66C2] flex items-center justify-center text-white font-extrabold text-base shadow-md">
          in
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-white">LinkedIn Executive Post</span>
            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
              High CTR
            </span>
          </div>
          <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-300">
            <span className="flex items-center gap-1 text-blue-400 font-semibold">
              <TrendingUp className="w-3 h-3" /> 4,820 impressions
            </span>
            <span>·</span>
            <span className="text-slate-400">324 reposts</span>
          </div>
        </div>
      </div>

      {/* Badge C: WhatsApp Group Broadcast (Mid-Left) */}
      <div className="hidden xl:flex items-center gap-2.5 absolute top-[62%] left-10 p-3 rounded-2xl bg-slate-900/60 border border-emerald-500/25 backdrop-blur-md shadow-2xl social-glow-whatsapp animate-float-drift">
        <div className="w-9 h-9 rounded-xl bg-[#25D366] flex items-center justify-center text-white shadow-md">
          <MessageCircle className="w-4 h-4 fill-white" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-white">WhatsApp Broadcast</span>
            <CheckCheck className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-[10px] text-emerald-300/90 font-medium">
            Formatted with *bold* & RSVPs
          </div>
        </div>
      </div>

      {/* Badge D: X (Twitter) Viral Post (Mid-Right) */}
      <div className="hidden xl:flex items-center gap-2.5 absolute top-[68%] right-12 p-3 rounded-2xl bg-slate-900/60 border border-sky-500/25 backdrop-blur-md shadow-2xl social-glow-twitter animate-float-slow">
        <div className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-white font-extrabold text-sm shadow-md">
          𝕏
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-white">X / Twitter Thread</span>
            <span className="text-[9px] font-bold text-sky-400 bg-sky-950/60 px-1 rounded border border-sky-800/40">
              280 / 280
            </span>
          </div>
          <div className="flex items-center gap-2 mt-0.5 text-[10px] text-slate-400">
            <span className="flex items-center gap-1 text-slate-300">
              <Repeat2 className="w-3 h-3 text-emerald-400" /> 890 Retweets
            </span>
          </div>
        </div>
      </div>

      {/* 4. Floating Reaction Emoji Particles */}
      <div className="absolute top-[22%] left-[26%] text-xl animate-float-reverse opacity-75">
        🔥
      </div>
      <div className="absolute top-[18%] right-[28%] text-xl animate-float-slow opacity-80">
        ✨
      </div>
      <div className="absolute top-[78%] left-[20%] text-lg animate-float-drift opacity-70">
        🚀
      </div>
      <div className="absolute top-[82%] right-[22%] text-lg animate-float-slow opacity-75">
        💡
      </div>
      <div className="absolute top-[52%] left-[4%] text-base animate-float-reverse opacity-60">
        ❤️
      </div>
      <div className="absolute top-[48%] right-[5%] text-base animate-float-drift opacity-60">
        🎉
      </div>
    </div>
  );
};
