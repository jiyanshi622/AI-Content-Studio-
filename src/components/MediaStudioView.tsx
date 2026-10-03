import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Image as ImageIcon,
  Video as VideoIcon,
  Upload,
  Check,
  Copy,
  Layers,
  ArrowRight,
  TrendingUp,
  Award,
  Zap,
  Volume2,
  FileText,
  Eye,
  Hash,
  Tag,
  Smile,
  Film,
  Play,
  Pause,
  RotateCcw,
  Sliders,
  Share2,
  CheckCircle2,
  Clock,
  User,
  Heart,
  MessageCircle,
  Bookmark,
  Send,
  HelpCircle,
  Maximize2,
  Download,
  AlertCircle
} from 'lucide-react';
import { PrismaticStar } from './PrismaticStar';
import {
  ImageAnalysisResult,
  MediaItemAnalysis,
  MediaRecommendationResult,
  VideoAnalysisResult
} from '../types';

interface MediaStudioViewProps {
  onCopyText: (text: string, title?: string) => void;
  initialMode?: 'image-post' | 'multi-media' | 'video-analysis';
}

interface UploadedMediaItem {
  id: string;
  name: string;
  type: 'image' | 'video';
  dataUrl: string;
  size: number;
  duration?: number;
  thumbnailUrl?: string;
}

export const MediaStudioView: React.FC<MediaStudioViewProps> = ({
  onCopyText,
  initialMode = 'image-post',
}) => {
  // Active feature tab: 1, 2, or 3
  const [activeFeature, setActiveFeature] = useState<'image-post' | 'multi-media' | 'video-analysis'>(initialMode);

  // Platform simulation for visual preview
  const [previewPlatform, setPreviewPlatform] = useState<'instagram' | 'linkedin' | 'twitter' | 'facebook'>('instagram');

  // ========================================================
  // FEATURE 1 STATE: Image Upload + Analysis + Post Creation
  // ========================================================
  const [f1Image, setF1Image] = useState<string | null>(null);
  const [f1ImageName, setF1ImageName] = useState<string>('');
  const [f1Context, setF1Context] = useState<string>('');
  const [f1Tone, setF1Tone] = useState<string>('Exciting & High-Impact');
  const [f1Platform, setF1Platform] = useState<string>('Instagram');
  const [f1Loading, setF1Loading] = useState<boolean>(false);
  const [f1Result, setF1Result] = useState<ImageAnalysisResult | null>(null);
  const [f1ActiveTab, setF1ActiveTab] = useState<'visual-post' | 'breakdown' | 'content-items'>('visual-post');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // ========================================================
  // FEATURE 2 STATE: Image + Video Upload + Best Media Recommendation
  // ========================================================
  const [f2MediaList, setF2MediaList] = useState<UploadedMediaItem[]>([]);
  const [f2Goal, setF2Goal] = useState<string>('Maximum Reach & Virality');
  const [f2Platform, setF2Platform] = useState<string>('Instagram & LinkedIn');
  const [f2Loading, setF2Loading] = useState<boolean>(false);
  const [f2Result, setF2Result] = useState<MediaRecommendationResult | null>(null);
  const [f2SelectedOption, setF2SelectedOption] = useState<'option1' | 'option2'>('option1');

  // ========================================================
  // FEATURE 3 STATE: Video Upload + Visual + Audio/Speech Analysis
  // ========================================================
  const [f3VideoUrl, setF3VideoUrl] = useState<string | null>(null);
  const [f3VideoName, setF3VideoName] = useState<string>('');
  const [f3VideoDuration, setF3VideoDuration] = useState<number>(15);
  const [f3SpeechTranscript, setF3SpeechTranscript] = useState<string>('');
  const [f3Context, setF3Context] = useState<string>('');
  const [f3Loading, setF3Loading] = useState<boolean>(false);
  const [f3Result, setF3Result] = useState<VideoAnalysisResult | null>(null);
  const [f3SelectedOption, setF3SelectedOption] = useState<'option1' | 'option2'>('option1');
  const [f3AnalysisTab, setF3AnalysisTab] = useState<'post-preview' | 'visuals' | 'audio-speech' | 'moments'>('post-preview');

  // Hidden file input refs
  const f1FileInputRef = useRef<HTMLInputElement>(null);
  const f2FileInputRef = useRef<HTMLInputElement>(null);
  const f3FileInputRef = useRef<HTMLInputElement>(null);
  const f3VideoPlayerRef = useRef<HTMLVideoElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const copyWithFeedback = (text: string, key: string, title?: string) => {
    onCopyText(text, title);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // ========================================================
  // PRELOADED DEMO ASSETS FOR INSTANT 1-CLICK TESTING
  // ========================================================
  // Generate crisp procedural SVG canvas for demo media
  const generateDemoCanvasImage = (title: string, subtitle: string, color1: string, color2: string): string => {
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1080;
    const ctx = canvas.getContext('2d');
    if (!ctx) return '';

    // Gradient background
    const gradient = ctx.createLinearGradient(0, 0, 1080, 1080);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1080, 1080);

    // Decorative grid/pattern
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 2;
    for (let x = 0; x < 1080; x += 60) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 1080);
      ctx.stroke();
    }
    for (let y = 0; y < 1080; y += 60) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(1080, y);
      ctx.stroke();
    }

    // Glow circle
    const glow = ctx.createRadialGradient(540, 500, 50, 540, 500, 400);
    glow.addColorStop(0, 'rgba(255, 255, 255, 0.25)');
    glow.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(540, 500, 400, 0, Math.PI * 2);
    ctx.fill();

    // Central card
    ctx.fillStyle = 'rgba(15, 23, 42, 0.75)';
    ctx.roundRect(140, 240, 800, 600, 36);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Text Badge
    ctx.fillStyle = '#f43f5e';
    ctx.roundRect(200, 300, 240, 54, 27);
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 22px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('FEATURED SHOWCASE', 320, 335);

    // Main Title
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 64px system-ui, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(title, 200, 440);

    // Subtitle
    ctx.fillStyle = '#cbd5e1';
    ctx.font = '32px system-ui, sans-serif';
    ctx.fillText(subtitle, 200, 510);

    // Bullet points / highlights
    ctx.fillStyle = '#f8fafc';
    ctx.font = '28px system-ui, sans-serif';
    ctx.fillText('✨ Live Demonstrations & Strategy Breakdown', 200, 590);
    ctx.fillText('⚡️ Unmatched Networking & Community Energy', 200, 650);
    ctx.fillText('🚀 Direct Takeaways for Builders & Creators', 200, 710);

    // Watermark / Brand
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.font = 'bold 26px system-ui, sans-serif';
    ctx.fillText('AI CONTENT STUDIO · OFFICIAL LAUNCH 2026', 200, 780);

    return canvas.toDataURL('image/jpeg', 0.92);
  };

  // Generate short sample video via canvas WebM recording
  const generateDemoVideo = (): Promise<string> => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      canvas.width = 720;
      canvas.height = 720;
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve('');
        return;
      }

      const stream = canvas.captureStream(30);
      let mediaRecorder: MediaRecorder;
      try {
        mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
      } catch (e) {
        // Fallback if mimeType not supported
        mediaRecorder = new MediaRecorder(stream);
      }

      const chunks: Blob[] = [];
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result as string);
        };
        reader.readAsDataURL(blob);
      };

      mediaRecorder.start();

      let frame = 0;
      const totalFrames = 90; // ~3 seconds at 30fps

      const drawFrame = () => {
        const progress = frame / totalFrames;
        // Background
        const grad = ctx.createLinearGradient(0, 0, 720, 720);
        grad.addColorStop(0, '#0f172a');
        grad.addColorStop(1, '#881337');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 720, 720);

        // Animated pulsating circles
        const radius = 120 + Math.sin(progress * Math.PI * 4) * 40;
        ctx.fillStyle = 'rgba(244, 63, 94, 0.35)';
        ctx.beginPath();
        ctx.arc(360, 320, radius, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = 'rgba(251, 146, 60, 0.5)';
        ctx.beginPath();
        ctx.arc(360, 320, radius * 0.6, 0, Math.PI * 2);
        ctx.fill();

        // Text
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 36px system-ui, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('LIVE VIDEO INTELLIGENCE', 360, 480);

        ctx.font = '22px system-ui, sans-serif';
        ctx.fillStyle = '#fca5a5';
        ctx.fillText('Speech & Visual AI Demonstration', 360, 525);

        // Progress bar at bottom
        ctx.fillStyle = '#f43f5e';
        ctx.fillRect(40, 660, (720 - 80) * progress, 8);

        frame++;
        if (frame < totalFrames) {
          requestAnimationFrame(drawFrame);
        } else {
          mediaRecorder.stop();
        }
      };

      drawFrame();
    });
  };

  // Pre-load demo for Feature 1
  const handleLoadDemoImage = () => {
    const demoImg = generateDemoCanvasImage(
      'Tech Summit 2026',
      'The premier gathering for developers & designers',
      '#1e1b4b',
      '#e11d48'
    );
    setF1Image(demoImg);
    setF1ImageName('tech_summit_keynote_banner.jpg');
    setF1Context('Official event banner announcing keynote speakers, hackathon tracks, and developer awards.');
    setF1Tone('Exciting & High-Impact');
  };

  // Pre-load demo for Feature 2
  const handleLoadDemoMultiMedia = async () => {
    const img1 = generateDemoCanvasImage('Hero Keynote', 'Main Stage Announcement', '#064e3b', '#059669');
    const img2 = generateDemoCanvasImage('Hands-on Workshop', 'Interactive Labs & Coding', '#701a75', '#d946ef');
    const videoData = await generateDemoVideo();

    const demoItems: UploadedMediaItem[] = [
      {
        id: `media-demo-1`,
        name: 'keynote_hero_presentation.jpg',
        type: 'image',
        dataUrl: img1,
        size: 320000,
      },
      {
        id: `media-demo-2`,
        name: 'live_demo_screen_recording.webm',
        type: 'video',
        dataUrl: videoData,
        size: 850000,
        duration: 3,
      },
      {
        id: `media-demo-3`,
        name: 'workshop_breakout_session.jpg',
        type: 'image',
        dataUrl: img2,
        size: 290000,
      },
    ];

    setF2MediaList(demoItems);
  };

  // Pre-load demo for Feature 3
  const handleLoadDemoVideo = async () => {
    const videoData = await generateDemoVideo();
    setF3VideoUrl(videoData);
    setF3VideoName('product_launch_speech_clip.webm');
    setF3VideoDuration(15);
    setF3SpeechTranscript(
      '“The biggest mistake creators make is waiting for perfection. When you build with clarity and share your honest process, the community rallies behind you from day one.”'
    );
    setF3Context('Product founder speaking on stage at demo day, addressing crowd on building in public.');
  };

  // ========================================================
  // FEATURE 1 HANDLERS: Image Analysis & Post Creation
  // ========================================================
  const handleImageFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setF1ImageName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      setF1Image(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyzeImage = async () => {
    if (!f1Image) return;
    setF1Loading(true);

    try {
      const response = await fetch('/api/media/analyze-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: f1Image,
          platform: f1Platform,
          context: f1Context,
          tone: f1Tone,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      if (data.result) {
        setF1Result(data.result);
        setF1ActiveTab('visual-post');
      }
    } catch (err: any) {
      console.error('Image analysis error:', err);
    } finally {
      setF1Loading(false);
    }
  };

  // ========================================================
  // FEATURE 2 HANDLERS: Multi-Media Upload & Recommendation
  // ========================================================
  const handleMultiMediaSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const isVideo = file.type.startsWith('video');
      const reader = new FileReader();
      reader.onload = () => {
        const newItem: UploadedMediaItem = {
          id: `media-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          name: file.name,
          type: isVideo ? 'video' : 'image',
          dataUrl: reader.result as string,
          size: file.size,
        };
        setF2MediaList((prev) => [...prev, newItem]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleRemoveMediaItem = (id: string) => {
    setF2MediaList((prev) => prev.filter((item) => item.id !== id));
  };

  const handleRecommendMedia = async () => {
    if (f2MediaList.length === 0) return;
    setF2Loading(true);

    try {
      const response = await fetch('/api/media/recommend-media', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mediaList: f2MediaList.map((m) => ({
            id: m.id,
            name: m.name,
            type: m.type,
            size: m.size,
            dataBase64: m.dataUrl.slice(0, 300000), // pass sample data
            duration: m.duration || 10,
          })),
          postGoal: f2Goal,
          platform: f2Platform,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      if (data.recommendation) {
        setF2Result(data.recommendation);
      }
    } catch (err: any) {
      console.error('Media recommendation error:', err);
    } finally {
      setF2Loading(false);
    }
  };

  // ========================================================
  // FEATURE 3 HANDLERS: Video Visual + Audio/Speech Analysis
  // ========================================================
  const handleVideoFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setF3VideoName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      setF3VideoUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyzeVideo = async () => {
    if (!f3VideoUrl) return;
    setF3Loading(true);

    try {
      // Extract up to 3 video sample frames if player ready
      const sampleFrames: string[] = [];
      if (f3VideoPlayerRef.current) {
        const canvas = document.createElement('canvas');
        canvas.width = 480;
        canvas.height = 480;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(f3VideoPlayerRef.current, 0, 0, 480, 480);
          sampleFrames.push(canvas.toDataURL('image/jpeg', 0.8));
        }
      }

      const response = await fetch('/api/media/analyze-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          videoMeta: {
            name: f3VideoName || 'Uploaded Video',
            duration: f3VideoDuration || 15,
          },
          audioTranscript: f3SpeechTranscript,
          hasAudio: true,
          sampleFrames: sampleFrames.length > 0 ? sampleFrames : undefined,
          videoBase64: f3VideoUrl.length < 5000000 ? f3VideoUrl : undefined,
          context: f3Context,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      if (data.result) {
        setF3Result(data.result);
        setF3AnalysisTab('post-preview');
      }
    } catch (err: any) {
      console.error('Video analysis error:', err);
    } finally {
      setF3Loading(false);
    }
  };

  const toggleVideoPlayback = () => {
    if (!f3VideoPlayerRef.current) return;
    if (f3VideoPlayerRef.current.paused) {
      f3VideoPlayerRef.current.play();
      setIsVideoPlaying(true);
    } else {
      f3VideoPlayerRef.current.pause();
      setIsVideoPlaying(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-8">
      {/* Studio Header matching reference aesthetic */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/60 border border-white/15 text-slate-200 text-xs sm:text-sm font-semibold mb-4 shadow-xl backdrop-blur-xl">
          <PrismaticStar size={16} />
          <span>Multimodal Intelligence Studio · Vision & Audio AI</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
          Visual, Audio & Media AI Studio
        </h1>
        <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
          Upload images & videos, extract visual & spoken details, compare media to find the best hero asset, and generate ready-to-publish social posts with live previews.
        </p>
      </div>

      {/* 3 Main Mode Switcher Tabs with rounded-[24px] frosted glass */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
        {/* Tab 1: Image to Post */}
        <button
          onClick={() => setActiveFeature('image-post')}
          className={`flex items-start gap-3 p-4 sm:p-5 rounded-[24px] border text-left transition-all cursor-pointer relative overflow-hidden ${
            activeFeature === 'image-post'
              ? 'bg-black/80 border-white/30 shadow-2xl ring-1 ring-white/20'
              : 'glass-card border-white/10 hover:border-white/20 text-slate-400 hover:text-slate-200'
          }`}
        >
          <div
            className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
              activeFeature === 'image-post'
                ? 'bg-gradient-to-tr from-[#FFAA80] to-[#FF4D6D] text-white shadow-lg'
                : 'bg-white/10 text-slate-400'
            }`}
          >
            <ImageIcon className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400">Feature 1</span>
              {activeFeature === 'image-post' && (
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />
              )}
            </div>
            <h3 className="font-bold text-white text-base sm:text-lg mt-0.5">Image Upload + Post</h3>
            <p className="text-xs text-slate-400 mt-1 leading-snug">
              Extract visual details, hook, caption, CTA, hashtags, keywords, emojis & generate visual post mockup.
            </p>
          </div>
        </button>

        {/* Tab 2: Best Media Recommendation */}
        <button
          onClick={() => setActiveFeature('multi-media')}
          className={`flex items-start gap-3 p-4 sm:p-5 rounded-[24px] border text-left transition-all cursor-pointer relative overflow-hidden ${
            activeFeature === 'multi-media'
              ? 'bg-black/80 border-white/30 shadow-2xl ring-1 ring-white/20'
              : 'glass-card border-white/10 hover:border-white/20 text-slate-400 hover:text-slate-200'
          }`}
        >
          <div
            className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
              activeFeature === 'multi-media'
                ? 'bg-gradient-to-tr from-[#C724B1] to-[#7928CA] text-white shadow-lg'
                : 'bg-white/10 text-slate-400'
            }`}
          >
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-purple-400">Feature 2</span>
              {activeFeature === 'multi-media' && (
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
              )}
            </div>
            <h3 className="font-bold text-white text-base sm:text-lg mt-0.5">Image + Video Evaluator</h3>
            <p className="text-xs text-slate-400 mt-1 leading-snug">
              Compare images & videos, pick main vs supporting media, explain why, & get 2 distinct post options.
            </p>
          </div>
        </button>

        {/* Tab 3: Video Visual + Audio/Speech */}
        <button
          onClick={() => setActiveFeature('video-analysis')}
          className={`flex items-start gap-3 p-4 sm:p-5 rounded-[24px] border text-left transition-all cursor-pointer relative overflow-hidden ${
            activeFeature === 'video-analysis'
              ? 'bg-black/80 border-white/30 shadow-2xl ring-1 ring-white/20'
              : 'glass-card border-white/10 hover:border-white/20 text-slate-400 hover:text-slate-200'
          }`}
        >
          <div
            className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
              activeFeature === 'video-analysis'
                ? 'bg-gradient-to-tr from-amber-400 to-orange-500 text-slate-950 font-bold shadow-lg'
                : 'bg-white/10 text-slate-400'
            }`}
          >
            <Film className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">Feature 3</span>
              {activeFeature === 'video-analysis' && (
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
              )}
            </div>
            <h3 className="font-bold text-white text-base sm:text-lg mt-0.5">Video + Speech Intelligence</h3>
            <p className="text-xs text-slate-400 mt-1 leading-snug">
              Analyze scenes, people, products, visible text & speech/audio track to generate 2 tailored post options.
            </p>
          </div>
        </button>
      </div>

      {/* ========================================================
          FEATURE 1: IMAGE UPLOAD + IMAGE ANALYSIS + POST CREATION
          ======================================================== */}
      {activeFeature === 'image-post' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* Left Column: Image Upload & Input Configuration */}
            <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-rose-400" />
                    <span>Upload & Frame Image</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    JPG, PNG, WEBP supported. Analyze visual details & generate post.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleLoadDemoImage}
                  className="px-2.5 py-1 text-xs font-semibold text-rose-300 bg-rose-950/70 border border-rose-800/80 rounded-lg hover:bg-rose-900 transition-colors cursor-pointer"
                  title="Load pre-built event poster image"
                >
                  ⚡️ Load Sample
                </button>
              </div>

              {/* Upload Drop Zone / Image Preview */}
              <div
                onClick={() => f1FileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all relative overflow-hidden group ${
                  f1Image
                    ? 'border-rose-500/50 bg-slate-950/60'
                    : 'border-slate-700 hover:border-rose-500/50 hover:bg-slate-950/40 bg-slate-950/30'
                }`}
              >
                <input
                  type="file"
                  ref={f1FileInputRef}
                  onChange={handleImageFileSelect}
                  accept="image/*"
                  className="hidden"
                />

                {f1Image ? (
                  <div className="relative group">
                    <img
                      src={f1Image}
                      alt="Uploaded preview"
                      className="w-full max-h-72 object-contain rounded-xl shadow-lg mx-auto bg-slate-950"
                    />
                    <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center rounded-xl transition-opacity">
                      <Upload className="w-8 h-8 text-rose-400 mb-2" />
                      <span className="text-xs font-semibold text-white">Click to Change Image</span>
                      <span className="text-[11px] text-slate-300 mt-0.5">{f1ImageName}</span>
                    </div>
                  </div>
                ) : (
                  <div className="py-8 flex flex-col items-center justify-center">
                    <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 mb-3 group-hover:scale-110 transition-transform">
                      <Upload className="w-7 h-7" />
                    </div>
                    <span className="text-sm font-semibold text-white">Click or Drag & Drop Image</span>
                    <span className="text-xs text-slate-400 mt-1 max-w-xs">
                      Posters, event banners, speaker graphics, products, or behind-the-scenes moments
                    </span>
                  </div>
                )}
              </div>

              {/* Optional Creative Modifiers */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Context / Goal (Optional)
                  </label>
                  <input
                    type="text"
                    value={f1Context}
                    onChange={(e) => setF1Context(e.target.value)}
                    placeholder="e.g. Announcing tickets, spotlighting speaker, product release..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Target Platform
                    </label>
                    <select
                      value={f1Platform}
                      onChange={(e) => setF1Platform(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-rose-500"
                    >
                      <option value="Instagram">Instagram Feed & Story</option>
                      <option value="LinkedIn">LinkedIn Professional</option>
                      <option value="Twitter/X">Twitter / X Post</option>
                      <option value="Facebook">Facebook Page</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Voice Tone
                    </label>
                    <select
                      value={f1Tone}
                      onChange={(e) => setF1Tone(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-rose-500"
                    >
                      <option value="Exciting & High-Impact">Exciting & High-Impact</option>
                      <option value="Professional & Authoritative">Professional & Authoritative</option>
                      <option value="Aesthetic & Minimalist">Aesthetic & Minimalist</option>
                      <option value="Community & Friendly">Community & Friendly</option>
                      <option value="Urgent & Action-Oriented">Urgent & Action-Oriented</option>
                    </select>
                  </div>
                </div>

                <button
                  type="button"
                  disabled={!f1Image || f1Loading}
                  onClick={handleAnalyzeImage}
                  className={`w-full py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer ${
                    !f1Image || f1Loading
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 text-white hover:brightness-110 shadow-rose-500/25 active:scale-[0.99]'
                  }`}
                >
                  {f1Loading ? (
                    <>
                      <Sparkles className="w-4 h-4 animate-spin" />
                      <span>Analyzing Visuals & Generating Post...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Analyze Image & Create Post</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right Column: Visual Post Output + Extracted Elements */}
            <div className="lg:col-span-7 space-y-6">
              {!f1Result ? (
                <div className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-8 sm:p-12 text-center flex flex-col items-center justify-center min-h-[420px]">
                  <div className="w-16 h-16 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-400 mb-4">
                    <ImageIcon className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Visual Post Generator Ready</h3>
                  <p className="text-xs sm:text-sm text-slate-400 max-w-md mt-1.5 leading-relaxed">
                    Upload an image or tap <strong className="text-rose-400">“Load Sample”</strong> on the left, then click analyze to generate your full post copy, hashtags, keywords, and live visual preview.
                  </p>
                </div>
              ) : (
                <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
                  {/* Results Sub-Tab Navigation */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setF1ActiveTab('visual-post')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                          f1ActiveTab === 'visual-post'
                            ? 'bg-rose-500 text-white shadow-sm'
                            : 'text-slate-400 hover:text-white bg-slate-800/60'
                        }`}
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Live Visual Post</span>
                      </button>
                      <button
                        onClick={() => setF1ActiveTab('content-items')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                          f1ActiveTab === 'content-items'
                            ? 'bg-rose-500 text-white shadow-sm'
                            : 'text-slate-400 hover:text-white bg-slate-800/60'
                        }`}
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Generated Copy & Metadata</span>
                      </button>
                      <button
                        onClick={() => setF1ActiveTab('breakdown')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                          f1ActiveTab === 'breakdown'
                            ? 'bg-rose-500 text-white shadow-sm'
                            : 'text-slate-400 hover:text-white bg-slate-800/60'
                        }`}
                      >
                        <Sliders className="w-3.5 h-3.5" />
                        <span>Extracted Visual Details</span>
                      </button>
                    </div>

                    {/* Copy All */}
                    <button
                      onClick={() => {
                        const fullText = `HOOK:\n${f1Result.postContent.hook}\n\nCAPTION:\n${f1Result.postContent.caption}\n\nSHORT CAPTION:\n${f1Result.postContent.shortCaption}\n\nCTA:\n${f1Result.postContent.callToAction}\n\nHASHTAGS:\n${f1Result.postContent.hashtags.join(' ')}\n\nKEYWORDS:\n${f1Result.postContent.keywords.join(', ')}`;
                        copyWithFeedback(fullText, 'f1-all', 'Complete Post Package');
                      }}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold text-rose-300 bg-rose-950/60 border border-rose-800/60 hover:bg-rose-900 transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      {copiedKey === 'f1-all' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>Copy Full Post</span>
                    </button>
                  </div>

                  {/* SUB-VIEW 1: LIVE VISUAL POST (Image + Generated Content Mockup) */}
                  {f1ActiveTab === 'visual-post' && (
                    <div className="space-y-4">
                      {/* Platform Switcher for Visual Mockup */}
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400 font-medium">Render as:</span>
                        <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 rounded-lg p-1">
                          {(['instagram', 'linkedin', 'twitter', 'facebook'] as const).map((plat) => (
                            <button
                              key={plat}
                              onClick={() => setPreviewPlatform(plat)}
                              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                                previewPlatform === plat
                                  ? 'bg-rose-500 text-white shadow-sm'
                                  : 'text-slate-400 hover:text-slate-200'
                              }`}
                            >
                              {plat}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Visual Mockup Card */}
                      <div className="max-w-md mx-auto bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
                        {/* Header */}
                        <div className="p-3.5 flex items-center justify-between border-b border-slate-800/80">
                          <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-rose-500 to-amber-400 p-0.5">
                              <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-rose-400 font-bold text-xs">
                                AI
                              </div>
                            </div>
                            <div>
                              <div className="text-xs font-bold text-white flex items-center gap-1">
                                <span>your_brand_studio</span>
                                <CheckCircle2 className="w-3 h-3 text-rose-400" />
                              </div>
                              <span className="text-[10px] text-slate-400">{previewPlatform.toUpperCase()} · Sponsored / Creator</span>
                            </div>
                          </div>
                          <span className="text-slate-500 text-xs">•••</span>
                        </div>

                        {/* Image Display */}
                        {f1Image && (
                          <div className="relative bg-slate-900 border-y border-slate-800/40">
                            <img
                              src={f1Image}
                              alt="Generated visual post"
                              className="w-full max-h-96 object-contain mx-auto"
                            />
                            {/* Overlay Badge */}
                            <div className="absolute bottom-2.5 left-2.5 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-slate-700/60 text-[10px] font-semibold text-rose-300 flex items-center gap-1">
                              <Sparkles className="w-3 h-3 text-rose-400" />
                              <span>{f1Result.visualDetails.mood}</span>
                            </div>
                          </div>
                        )}

                        {/* Social Interaction Buttons */}
                        <div className="p-3.5 space-y-3">
                          <div className="flex items-center justify-between text-slate-300">
                            <div className="flex items-center gap-4">
                              <Heart className="w-5 h-5 hover:text-rose-500 cursor-pointer transition-colors" />
                              <MessageCircle className="w-5 h-5 hover:text-rose-400 cursor-pointer transition-colors" />
                              <Send className="w-5 h-5 hover:text-rose-400 cursor-pointer transition-colors" />
                            </div>
                            <Bookmark className="w-5 h-5 hover:text-rose-400 cursor-pointer transition-colors" />
                          </div>

                          {/* Hook & Caption Display */}
                          <div className="space-y-1.5 text-xs text-slate-200">
                            <p className="font-bold text-rose-300 text-sm">
                              {f1Result.postContent.hook}
                            </p>
                            <p className="text-slate-300 whitespace-pre-line leading-relaxed text-[12px]">
                              {f1Result.postContent.caption}
                            </p>

                            <div className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] text-rose-300 font-medium">
                              👉 {f1Result.postContent.callToAction}
                            </div>

                            <p className="text-rose-400/90 text-[11px] font-mono leading-relaxed pt-1">
                              {f1Result.postContent.hashtags.join(' ')}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SUB-VIEW 2: INDIVIDUAL CONTENT ITEMS */}
                  {f1ActiveTab === 'content-items' && (
                    <div className="space-y-4">
                      {/* Hook */}
                      <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                            <Zap className="w-3.5 h-3.5" />
                            <span>Hook (Scroll-Stopper)</span>
                          </span>
                          <button
                            onClick={() => copyWithFeedback(f1Result.postContent.hook, 'f1-hook', 'Hook')}
                            className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                          >
                            {copiedKey === 'f1-hook' ? <Check className="w-3 h-3 text-rose-400" /> : <Copy className="w-3 h-3" />}
                            <span>Copy</span>
                          </button>
                        </div>
                        <p className="text-sm font-semibold text-white leading-relaxed">
                          {f1Result.postContent.hook}
                        </p>
                      </div>

                      {/* Full Caption */}
                      <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                            <FileText className="w-3.5 h-3.5 text-rose-400" />
                            <span>Full Caption</span>
                          </span>
                          <button
                            onClick={() => copyWithFeedback(f1Result.postContent.caption, 'f1-caption', 'Caption')}
                            className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                          >
                            {copiedKey === 'f1-caption' ? <Check className="w-3 h-3 text-rose-400" /> : <Copy className="w-3 h-3" />}
                            <span>Copy</span>
                          </button>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-300 whitespace-pre-line leading-relaxed">
                          {f1Result.postContent.caption}
                        </p>
                      </div>

                      {/* Short Caption */}
                      <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                            Short Caption (1-2 lines)
                          </span>
                          <button
                            onClick={() => copyWithFeedback(f1Result.postContent.shortCaption, 'f1-short', 'Short Caption')}
                            className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                          >
                            {copiedKey === 'f1-short' ? <Check className="w-3 h-3 text-rose-400" /> : <Copy className="w-3 h-3" />}
                            <span>Copy</span>
                          </button>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                          {f1Result.postContent.shortCaption}
                        </p>
                      </div>

                      {/* Call to Action (CTA) */}
                      <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                            Call To Action (CTA)
                          </span>
                          <button
                            onClick={() => copyWithFeedback(f1Result.postContent.callToAction, 'f1-cta', 'CTA')}
                            className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                          >
                            {copiedKey === 'f1-cta' ? <Check className="w-3 h-3 text-rose-400" /> : <Copy className="w-3 h-3" />}
                            <span>Copy</span>
                          </button>
                        </div>
                        <p className="text-xs sm:text-sm text-rose-300 font-semibold">
                          {f1Result.postContent.callToAction}
                        </p>
                      </div>

                      {/* Hashtags, Keywords & Emojis */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {/* Hashtags */}
                        <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-xs font-bold text-slate-300 flex items-center gap-1">
                              <Hash className="w-3.5 h-3.5 text-rose-400" />
                              <span>Hashtags ({f1Result.postContent.hashtags.length})</span>
                            </span>
                            <button
                              onClick={() => copyWithFeedback(f1Result.postContent.hashtags.join(' '), 'f1-tags', 'Hashtags')}
                              className="text-[11px] text-slate-400 hover:text-white cursor-pointer"
                            >
                              Copy
                            </button>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {f1Result.postContent.hashtags.map((tag, i) => (
                              <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-rose-300">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Keywords */}
                        <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-xs font-bold text-slate-300 flex items-center gap-1">
                              <Tag className="w-3.5 h-3.5 text-amber-400" />
                              <span>SEO Keywords</span>
                            </span>
                            <button
                              onClick={() => copyWithFeedback(f1Result.postContent.keywords.join(', '), 'f1-kw', 'Keywords')}
                              className="text-[11px] text-slate-400 hover:text-white cursor-pointer"
                            >
                              Copy
                            </button>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {f1Result.postContent.keywords.map((kw, i) => (
                              <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-amber-300">
                                {kw}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Emojis */}
                        <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-xs font-bold text-slate-300 flex items-center gap-1">
                              <Smile className="w-3.5 h-3.5 text-pink-400" />
                              <span>Themed Emojis</span>
                            </span>
                            <button
                              onClick={() => copyWithFeedback(f1Result.postContent.emojis.join(' '), 'f1-emojis', 'Emojis')}
                              className="text-[11px] text-slate-400 hover:text-white cursor-pointer"
                            >
                              Copy
                            </button>
                          </div>
                          <div className="text-xl flex flex-wrap gap-2 mt-2">
                            {f1Result.postContent.emojis.map((emoji, i) => (
                              <span key={i} className="hover:scale-125 transition-transform cursor-pointer" title="Click to copy single emoji" onClick={() => copyWithFeedback(emoji, `emoji-${i}`, 'Emoji')}>
                                {emoji}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SUB-VIEW 3: EXTRACTED VISUAL DETAILS */}
                  {f1ActiveTab === 'breakdown' && (
                    <div className="space-y-4">
                      <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
                          Visual Breakdown Summary
                        </span>
                        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                          {f1Result.visualDetails.description}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Detected Objects */}
                        <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                          <span className="text-xs font-bold text-slate-300 block mb-2">Detected Objects & Elements</span>
                          <ul className="space-y-1.5 text-xs text-slate-300">
                            {f1Result.visualDetails.detectedObjects.map((obj, i) => (
                              <li key={i} className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                                <span>{obj}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Dominant Color Palette */}
                        <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                          <span className="text-xs font-bold text-slate-300 block mb-2">Dominant Color Palette</span>
                          <div className="space-y-2 text-xs">
                            {f1Result.visualDetails.dominantColors.map((col, i) => (
                              <div key={i} className="flex items-center gap-2">
                                <span className="w-4 h-4 rounded-md border border-slate-700 shrink-0 bg-slate-800" />
                                <span className="text-slate-300 font-mono text-[11px]">{col}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Visible Text Detected */}
                        <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                          <span className="text-xs font-bold text-slate-300 block mb-1">Visible Text / Signage</span>
                          <p className="text-xs text-slate-300 italic">
                            “{f1Result.visualDetails.detectedText || 'No explicit typography detected'}”
                          </p>
                        </div>

                        {/* Core Themes & Mood */}
                        <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                          <span className="text-xs font-bold text-slate-300 block mb-1">Atmosphere & Mood</span>
                          <p className="text-xs text-rose-300 font-semibold mb-2">
                            {f1Result.visualDetails.mood}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {f1Result.visualDetails.keyThemes.map((theme, i) => (
                              <span key={i} className="px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/20 text-[10px]">
                                {theme}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          FEATURE 2: IMAGE + VIDEO UPLOAD + BEST MEDIA RECOMMENDATION
          ======================================================== */}
      {activeFeature === 'multi-media' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* Left Column: Media Manager */}
            <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Layers className="w-5 h-5 text-purple-400" />
                    <span>Upload Images & Videos</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Upload multiple files to determine the best main media vs supporting media.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleLoadDemoMultiMedia}
                  className="px-2.5 py-1 text-xs font-semibold text-purple-300 bg-purple-950/70 border border-purple-800/80 rounded-lg hover:bg-purple-900 transition-colors cursor-pointer"
                >
                  ⚡️ Load Demo Pack
                </button>
              </div>

              {/* Upload Dropzone */}
              <div
                onClick={() => f2FileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-700 hover:border-purple-500/50 rounded-2xl p-5 text-center cursor-pointer transition-all bg-slate-950/40 hover:bg-slate-950/60"
              >
                <input
                  type="file"
                  ref={f2FileInputRef}
                  onChange={handleMultiMediaSelect}
                  accept="image/*,video/*"
                  multiple
                  className="hidden"
                />
                <div className="flex flex-col items-center justify-center">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-2">
                    <Upload className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-semibold text-white">Click or Drop Images & Videos</span>
                  <span className="text-xs text-slate-400 mt-0.5">Select 2 or more files to compare</span>
                </div>
              </div>

              {/* Uploaded Media Items List */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400 font-semibold px-1">
                  <span>Selected Assets ({f2MediaList.length})</span>
                  {f2MediaList.length > 0 && (
                    <button
                      onClick={() => setF2MediaList([])}
                      className="text-rose-400 hover:underline cursor-pointer"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {f2MediaList.length === 0 ? (
                  <div className="p-4 rounded-xl bg-slate-950/50 border border-slate-800/80 text-center text-xs text-slate-500">
                    No files uploaded yet. Add at least 2 files or tap “Load Demo Pack”.
                  </div>
                ) : (
                  <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                    {f2MediaList.map((item, index) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center text-[10px] font-bold shrink-0">
                            #{index + 1}
                          </span>
                          <div className="w-8 h-8 rounded-lg overflow-hidden bg-slate-900 shrink-0 border border-slate-800 flex items-center justify-center">
                            {item.type === 'video' ? (
                              <VideoIcon className="w-4 h-4 text-purple-400" />
                            ) : (
                              <img src={item.dataUrl} alt={item.name} className="w-full h-full object-cover" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-white truncate max-w-[170px]" title={item.name}>
                              {item.name}
                            </p>
                            <span className="text-[10px] text-purple-300 uppercase font-mono">
                              {item.type}
                            </span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleRemoveMediaItem(item.id)}
                          className="text-slate-500 hover:text-rose-400 p-1 cursor-pointer transition-colors"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Goal & Target Platform Options */}
              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Campaign Goal
                  </label>
                  <select
                    value={f2Goal}
                    onChange={(e) => setF2Goal(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-purple-500"
                  >
                    <option value="Maximum Reach & Virality">Maximum Reach & Virality (Algorithm push)</option>
                    <option value="High Conversion & Registrations">High Conversion & Registrations / Tickets</option>
                    <option value="Community Education & Thought Leadership">Community Education & Authority</option>
                    <option value="Aesthetic Showcase & Branding">Aesthetic Showcase & Premium Branding</option>
                  </select>
                </div>

                <button
                  type="button"
                  disabled={f2MediaList.length < 2 || f2Loading}
                  onClick={handleRecommendMedia}
                  className={`w-full py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer ${
                    f2MediaList.length < 2 || f2Loading
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-white hover:brightness-110 shadow-purple-500/25 active:scale-[0.99]'
                  }`}
                >
                  {f2Loading ? (
                    <>
                      <Sparkles className="w-4 h-4 animate-spin" />
                      <span>Evaluating Media Quality & Selecting Best...</span>
                    </>
                  ) : (
                    <>
                      <Award className="w-4 h-4" />
                      <span>Analyze Media & Recommend Best</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right Column: Comparative Recommendation + 2 Post Options */}
            <div className="lg:col-span-7 space-y-6">
              {!f2Result ? (
                <div className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-8 sm:p-12 text-center flex flex-col items-center justify-center min-h-[420px]">
                  <div className="w-16 h-16 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-400 mb-4">
                    <Layers className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Media Evaluator Ready</h3>
                  <p className="text-xs sm:text-sm text-slate-400 max-w-md mt-1.5 leading-relaxed">
                    Upload multiple images and videos or tap <strong className="text-purple-400">“Load Demo Pack”</strong> to discover which asset will perform best as the hero media and view 2 full post copy options.
                  </p>
                </div>
              ) : (
                <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
                  {/* Hero Winner Banner */}
                  <div className="p-5 rounded-2xl bg-gradient-to-r from-purple-950/80 via-slate-950 to-slate-950 border border-purple-500/50 shadow-lg">
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                      <div className="flex items-center gap-2">
                        <span className="p-1.5 rounded-lg bg-purple-500 text-white">
                          <Award className="w-4 h-4" />
                        </span>
                        <div>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-purple-400">
                            Recommended Main Media
                          </span>
                          <h4 className="text-base sm:text-lg font-extrabold text-white">
                            {f2Result.bestMediaName}
                          </h4>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 text-xs font-bold uppercase">
                        {f2Result.bestMediaType} · Lead Hero
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {f2Result.mainMediaRationale}
                    </p>
                  </div>

                  {/* Why Selected Media is Better */}
                  <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-purple-400 flex items-center gap-1.5">
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>Why This Selected Media is Better</span>
                    </h5>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {f2Result.comparativeAnalysis}
                    </p>
                  </div>

                  {/* Supporting Media Strategy */}
                  {f2Result.supportingMediaRoles.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block px-1">
                        Supporting Media Strategy
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {f2Result.supportingMediaRoles.map((sup, idx) => (
                          <div key={idx} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="font-semibold text-white truncate max-w-[180px]">{sup.mediaName}</span>
                              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-purple-300">
                                {sup.recommendedRole}
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-400 leading-snug">
                              {sup.whySupporting}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 2 Post Content Options Switcher */}
                  <div className="space-y-4 pt-2">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div>
                        <h4 className="text-sm font-bold text-white">
                          2 Post-Content Options (Based on Best Media)
                        </h4>
                        <p className="text-xs text-slate-400">Choose the angle that best fits your campaign tone</p>
                      </div>

                      <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 rounded-xl p-1">
                        <button
                          onClick={() => setF2SelectedOption('option1')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            f2SelectedOption === 'option1'
                              ? 'bg-purple-600 text-white shadow-md'
                              : 'text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          Option 1: Viral Story
                        </button>
                        <button
                          onClick={() => setF2SelectedOption('option2')}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            f2SelectedOption === 'option2'
                              ? 'bg-purple-600 text-white shadow-md'
                              : 'text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          Option 2: Value Guide
                        </button>
                      </div>
                    </div>

                    {/* Active Option Card */}
                    {(() => {
                      const opt = f2Result[f2SelectedOption];
                      return (
                        <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="text-[11px] font-bold uppercase tracking-wider text-purple-400">
                                {opt.title}
                              </span>
                              <p className="text-xs text-slate-400 font-medium">Angle: {opt.angle}</p>
                            </div>
                            <button
                              onClick={() => {
                                const full = `HOOK:\n${opt.hook}\n\nCAPTION:\n${opt.caption}\n\nCTA:\n${opt.callToAction}\n\nHASHTAGS:\n${opt.hashtags.join(' ')}`;
                                copyWithFeedback(full, `f2-${f2SelectedOption}`, opt.title);
                              }}
                              className="px-2.5 py-1 text-xs font-semibold text-purple-300 bg-purple-950/60 border border-purple-800/80 rounded-lg hover:bg-purple-900 transition-colors flex items-center gap-1 cursor-pointer"
                            >
                              {copiedKey === `f2-${f2SelectedOption}` ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                              <span>Copy Option</span>
                            </button>
                          </div>

                          {/* Hook */}
                          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800/80">
                            <span className="text-[10px] font-bold uppercase text-purple-300 block mb-1">Hook</span>
                            <p className="text-xs sm:text-sm font-bold text-white">{opt.hook}</p>
                          </div>

                          {/* Caption */}
                          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800/80">
                            <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Caption</span>
                            <p className="text-xs text-slate-300 whitespace-pre-line leading-relaxed">{opt.caption}</p>
                          </div>

                          {/* CTA & Hashtags */}
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs pt-1">
                            <div className="text-rose-300 font-semibold">
                              👉 {opt.callToAction}
                            </div>
                            <div className="text-purple-300 font-mono text-[11px]">
                              {opt.hashtags.join(' ')}
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          FEATURE 3: VIDEO UPLOAD + VISUAL + AUDIO/SPEECH ANALYSIS
          ======================================================== */}
      {activeFeature === 'video-analysis' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* Left Column: Video Upload & Configuration */}
            <div className="lg:col-span-5 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Film className="w-5 h-5 text-amber-400" />
                    <span>Upload & Inspect Video</span>
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Analyzes objects, people, products, scenes, visible text & speech.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleLoadDemoVideo}
                  className="px-2.5 py-1 text-xs font-semibold text-amber-300 bg-amber-950/70 border border-amber-800/80 rounded-lg hover:bg-amber-900 transition-colors cursor-pointer"
                >
                  ⚡️ Load Demo Video
                </button>
              </div>

              {/* Video Player / Upload Area */}
              <div
                onClick={() => {
                  if (!f3VideoUrl) f3FileInputRef.current?.click();
                }}
                className={`border-2 border-dashed rounded-2xl p-4 text-center transition-all relative overflow-hidden ${
                  f3VideoUrl
                    ? 'border-amber-500/50 bg-slate-950'
                    : 'border-slate-700 hover:border-amber-500/50 hover:bg-slate-950/40 bg-slate-950/30 cursor-pointer'
                }`}
              >
                <input
                  type="file"
                  ref={f3FileInputRef}
                  onChange={handleVideoFileSelect}
                  accept="video/*"
                  className="hidden"
                />

                {f3VideoUrl ? (
                  <div className="space-y-3">
                    <div className="relative rounded-xl overflow-hidden bg-black max-h-64 flex items-center justify-center">
                      <video
                        ref={f3VideoPlayerRef}
                        src={f3VideoUrl}
                        controls
                        playsInline
                        className="w-full max-h-64 object-contain rounded-xl"
                        onPlay={() => setIsVideoPlaying(true)}
                        onPause={() => setIsVideoPlaying(false)}
                      />
                    </div>

                    <div className="flex items-center justify-between px-1 text-xs text-slate-400">
                      <span className="truncate max-w-[200px]" title={f3VideoName}>
                        {f3VideoName}
                      </span>
                      <button
                        type="button"
                        onClick={() => f3FileInputRef.current?.click()}
                        className="text-amber-400 hover:underline cursor-pointer font-medium"
                      >
                        Change Video
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="py-8 flex flex-col items-center justify-center">
                    <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-3">
                      <VideoIcon className="w-7 h-7" />
                    </div>
                    <span className="text-sm font-semibold text-white">Click or Drop Video (MP4, WebM)</span>
                    <span className="text-xs text-slate-400 mt-1 max-w-xs">
                      Product demos, founder speech, tutorial reels, or live presentations
                    </span>
                  </div>
                )}
              </div>

              {/* Optional Speech Transcript / Audio Clues */}
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                      <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                      <span>Audio / Spoken Dialogue Notes (Optional)</span>
                    </label>
                  </div>
                  <textarea
                    rows={3}
                    value={f3SpeechTranscript}
                    onChange={(e) => setF3SpeechTranscript(e.target.value)}
                    placeholder="If you have an audio transcript or want to highlight specific quotes spoken in the video, paste them here..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                  />
                  <span className="text-[11px] text-slate-500 mt-1 block">
                    Our AI models analyze both the visual stream and the audio speech track to generate post options.
                  </span>
                </div>

                <button
                  type="button"
                  disabled={!f3VideoUrl || f3Loading}
                  onClick={handleAnalyzeVideo}
                  className={`w-full py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer ${
                    !f3VideoUrl || f3Loading
                      ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-slate-950 font-black hover:brightness-110 shadow-amber-500/25 active:scale-[0.99]'
                  }`}
                >
                  {f3Loading ? (
                    <>
                      <Sparkles className="w-4 h-4 animate-spin text-slate-950" />
                      <span>Analyzing Visuals + Speech Modalities...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-slate-950" />
                      <span>Analyze Visual + Audio Intelligence</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right Column: Visual + Audio Synthesis & 2 Post Options */}
            <div className="lg:col-span-7 space-y-6">
              {!f3Result ? (
                <div className="bg-slate-900/40 border border-slate-800/80 rounded-3xl p-8 sm:p-12 text-center flex flex-col items-center justify-center min-h-[420px]">
                  <div className="w-16 h-16 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-400 mb-4">
                    <Film className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Video Intelligence Ready</h3>
                  <p className="text-xs sm:text-sm text-slate-400 max-w-md mt-1.5 leading-relaxed">
                    Upload a video or tap <strong className="text-amber-400">“Load Demo Video”</strong> to inspect visuals, objects, people, products, scenes, visible text, and spoken speech to generate 2 distinct posts.
                  </p>
                </div>
              ) : (
                <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
                  {/* Analysis Tabs */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <button
                        onClick={() => setF3AnalysisTab('post-preview')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                          f3AnalysisTab === 'post-preview'
                            ? 'bg-amber-500 text-slate-950 font-black shadow-sm'
                            : 'text-slate-400 hover:text-white bg-slate-800/60'
                        }`}
                      >
                        2 Post Options
                      </button>
                      <button
                        onClick={() => setF3AnalysisTab('visuals')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                          f3AnalysisTab === 'visuals'
                            ? 'bg-amber-500 text-slate-950 font-black shadow-sm'
                            : 'text-slate-400 hover:text-white bg-slate-800/60'
                        }`}
                      >
                        Visuals & Objects
                      </button>
                      <button
                        onClick={() => setF3AnalysisTab('audio-speech')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                          f3AnalysisTab === 'audio-speech'
                            ? 'bg-amber-500 text-slate-950 font-black shadow-sm'
                            : 'text-slate-400 hover:text-white bg-slate-800/60'
                        }`}
                      >
                        Audio & Speech
                      </button>
                      <button
                        onClick={() => setF3AnalysisTab('moments')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                          f3AnalysisTab === 'moments'
                            ? 'bg-amber-500 text-slate-950 font-black shadow-sm'
                            : 'text-slate-400 hover:text-white bg-slate-800/60'
                        }`}
                      >
                        Key Moments & Scenes
                      </button>
                    </div>

                    <span className="text-[11px] text-amber-300 font-semibold bg-amber-950/60 border border-amber-800/60 px-2 py-0.5 rounded-md">
                      Visual + Audio Synced ✓
                    </span>
                  </div>

                  {/* TAB 1: 2 POST OPTIONS (COMBINED VISUAL + AUDIO) */}
                  {f3AnalysisTab === 'post-preview' && (
                    <div className="space-y-5">
                      {/* Combined Synthesis Callout */}
                      <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30 text-xs">
                        <span className="text-amber-400 font-bold block mb-1">
                          ⚡️ Visual + Audio Multi-Modal Synthesis:
                        </span>
                        <p className="text-slate-300 leading-relaxed">
                          {f3Result.combinedSynthesis}
                        </p>
                      </div>

                      {/* Option Switcher Buttons */}
                      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                        <span className="text-xs font-bold uppercase text-slate-400">
                          Select Generated Post Option:
                        </span>
                        <div className="flex items-center gap-1.5 bg-slate-950 border border-slate-800 rounded-xl p-1">
                          <button
                            onClick={() => setF3SelectedOption('option1')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                              f3SelectedOption === 'option1'
                                ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                                : 'text-slate-400 hover:text-slate-200'
                            }`}
                          >
                            Option A: Narrative Story
                          </button>
                          <button
                            onClick={() => setF3SelectedOption('option2')}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                              f3SelectedOption === 'option2'
                                ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                                : 'text-slate-400 hover:text-slate-200'
                            }`}
                          >
                            Option B: Action Masterclass
                          </button>
                        </div>
                      </div>

                      {/* Render Selected Post Option */}
                      {(() => {
                        const opt = f3Result[f3SelectedOption];
                        return (
                          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                                  {opt.title}
                                </span>
                                <p className="text-xs text-slate-400 font-medium">Angle: {opt.angle}</p>
                              </div>
                              <button
                                onClick={() => {
                                  const full = `HOOK:\n${opt.hook}\n\nCAPTION:\n${opt.caption}\n\nCTA:\n${opt.callToAction}\n\nHASHTAGS:\n${opt.hashtags.join(' ')}`;
                                  copyWithFeedback(full, `f3-${f3SelectedOption}`, opt.title);
                                }}
                                className="px-2.5 py-1 text-xs font-semibold text-amber-300 bg-amber-950/60 border border-amber-800/80 rounded-lg hover:bg-amber-900 transition-colors flex items-center gap-1 cursor-pointer"
                              >
                                {copiedKey === `f3-${f3SelectedOption}` ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                                <span>Copy Option</span>
                              </button>
                            </div>

                            {/* Hook */}
                            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800/80">
                              <span className="text-[10px] font-bold uppercase text-amber-300 block mb-1">Hook</span>
                              <p className="text-xs sm:text-sm font-bold text-white">{opt.hook}</p>
                            </div>

                            {/* Caption */}
                            <div className="p-3.5 rounded-xl bg-slate-900/90 border border-slate-800/80">
                              <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Caption</span>
                              <p className="text-xs text-slate-300 whitespace-pre-line leading-relaxed">{opt.caption}</p>
                            </div>

                            {/* Highlights */}
                            {opt.keyHighlights && opt.keyHighlights.length > 0 && (
                              <div className="flex flex-wrap gap-1.5 pt-1">
                                {opt.keyHighlights.map((hl, i) => (
                                  <span key={i} className="text-[11px] px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20">
                                    ✓ {hl}
                                  </span>
                                ))}
                              </div>
                            )}

                            {/* CTA & Hashtags */}
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs pt-1">
                              <div className="text-amber-300 font-semibold">
                                👉 {opt.callToAction}
                              </div>
                              <div className="text-amber-400/90 font-mono text-[11px]">
                                {opt.hashtags.join(' ')}
                              </div>
                            </div>
                          </div>
                        );
                      })()}
                    </div>
                  )}

                  {/* TAB 2: VISUALS, OBJECTS, PEOPLE, PRODUCTS */}
                  {f3AnalysisTab === 'visuals' && (
                    <div className="space-y-4">
                      <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                        <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-1.5">
                          Visual Aesthetic & Composition
                        </span>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {f3Result.visualAnalysis.visuals}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* People */}
                        <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2 text-xs">
                          <span className="font-bold text-white flex items-center gap-1.5">
                            <User className="w-3.5 h-3.5 text-amber-400" />
                            <span>People ({f3Result.visualAnalysis.people.count})</span>
                          </span>
                          <p className="text-slate-300">{f3Result.visualAnalysis.people.description}</p>
                          <div className="text-[11px] text-amber-300 font-medium">
                            Expressions: {f3Result.visualAnalysis.people.expressions}
                          </div>
                        </div>

                        {/* Visible Text Detected (OCR) */}
                        <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2 text-xs">
                          <span className="font-bold text-white flex items-center gap-1.5">
                            <FileText className="w-3.5 h-3.5 text-amber-400" />
                            <span>Visible On-Screen Text</span>
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {f3Result.visualAnalysis.visibleText.map((txt, i) => (
                              <span key={i} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-300">
                                {txt}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Objects Detected */}
                        <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2 text-xs">
                          <span className="font-bold text-white">Detected Objects</span>
                          <div className="flex flex-wrap gap-1">
                            {f3Result.visualAnalysis.objects.map((obj, i) => (
                              <span key={i} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px] text-amber-300">
                                {obj}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Products Detected */}
                        <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2 text-xs">
                          <span className="font-bold text-white">Featured Products / Interfaces</span>
                          <div className="flex flex-wrap gap-1">
                            {f3Result.visualAnalysis.products.map((prod, i) => (
                              <span key={i} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px] text-rose-300">
                                {prod}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Context & Environment */}
                      <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs">
                        <span className="font-bold text-slate-300 block mb-1">Context & Atmosphere</span>
                        <p className="text-slate-400">{f3Result.visualAnalysis.context}</p>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: AUDIO & SPEECH ANALYSIS */}
                  {f3AnalysisTab === 'audio-speech' && (
                    <div className="space-y-4">
                      {/* Extracted Speech / Transcript */}
                      <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                            <Volume2 className="w-3.5 h-3.5" />
                            <span>Extracted Speech / Spoken Dialogue</span>
                          </span>
                          <button
                            onClick={() => copyWithFeedback(f3Result.audioSpeechAnalysis.extractedSpeech, 'f3-speech', 'Speech Transcript')}
                            className="text-xs text-slate-400 hover:text-white flex items-center gap-1 cursor-pointer"
                          >
                            {copiedKey === 'f3-speech' ? <Check className="w-3 h-3 text-amber-400" /> : <Copy className="w-3 h-3" />}
                            <span>Copy Transcript</span>
                          </button>
                        </div>
                        <p className="text-xs sm:text-sm text-slate-200 italic bg-slate-900/80 p-3 rounded-xl border border-slate-800 leading-relaxed">
                          {f3Result.audioSpeechAnalysis.extractedSpeech}
                        </p>
                      </div>

                      {/* Spoken Information & Main Topic */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2 text-xs">
                          <span className="font-bold text-white block">Main Spoken Topic</span>
                          <p className="text-amber-300 font-semibold">{f3Result.audioSpeechAnalysis.mainTopic}</p>
                          <p className="text-slate-400 mt-1">{f3Result.audioSpeechAnalysis.spokenInformation}</p>
                        </div>

                        <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2 text-xs">
                          <span className="font-bold text-white block">Tone & Delivery Analysis</span>
                          <p className="text-slate-300">{f3Result.audioSpeechAnalysis.toneAndDelivery}</p>
                        </div>
                      </div>

                      {/* Important Spoken Details Extracted */}
                      <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-300 block">
                          Important Spoken Details & Takeaways
                        </span>
                        <ul className="space-y-1.5 text-xs text-slate-300">
                          {f3Result.audioSpeechAnalysis.importantDetails.map((det, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-amber-400 font-bold">•</span>
                              <span>{det}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* TAB 4: KEY MOMENTS & SCENES BREAKDOWN */}
                  {f3AnalysisTab === 'moments' && (
                    <div className="space-y-4">
                      {/* Important Key Moments Timeline */}
                      <div className="space-y-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block px-1">
                          Peak Engagement Moments
                        </span>
                        <div className="space-y-2.5">
                          {f3Result.visualAnalysis.importantMoments.map((mom, idx) => (
                            <div key={idx} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                              <span className="px-2 py-1 rounded-md bg-amber-500/20 text-amber-300 font-mono text-[11px] font-bold shrink-0">
                                {mom.timestamp}
                              </span>
                              <div>
                                <h6 className="font-bold text-white text-xs">{mom.title}</h6>
                                <p className="text-slate-400 text-[11px] mt-0.5">{mom.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Scene Transitions */}
                      <div className="space-y-2 pt-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block px-1">
                          Scene by Scene Breakdown
                        </span>
                        <div className="space-y-2">
                          {f3Result.visualAnalysis.scenes.map((sc, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs">
                              <span className="font-mono text-slate-400 text-[11px]">{sc.timestamp}</span>
                              <span className="text-slate-200 text-right max-w-sm">{sc.description}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
