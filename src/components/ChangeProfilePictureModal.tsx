import React, { useState, useRef } from 'react';
import {
  X,
  Upload,
  Check,
  Image as ImageIcon,
  Link as LinkIcon,
  RefreshCw,
  Camera,
  Sparkles
} from 'lucide-react';
import { BackgroundTheme } from './SocialMediaBackground';

export interface CreatorPresetAvatar {
  name: string;
  handle: string;
  url: string;
}

export const INDIAN_CREATOR_PRESETS: CreatorPresetAvatar[] = [
  {
    name: 'Samay Raina',
    handle: '@maisamayhoon',
    url: '/avatars/samay-raina.jpg',
  },
  {
    name: 'Pranit More',
    handle: '@pranit.more',
    url: '/avatars/pranit-more.jpg',
  },
  {
    name: 'Kusha Kapila',
    handle: '@kushakapila',
    url: '/avatars/kusha-kapila.jpg',
  },
  {
    name: 'Ankur Warikoo',
    handle: '@ankurwarikoo',
    url: '/avatars/ankur-warikoo.jpg',
  },
  {
    name: 'Bhuvan Bam',
    handle: '@bhuvan.bam22',
    url: '/avatars/bhuvan-bam.jpg',
  },
  {
    name: 'Prajakta Koli',
    handle: '@mostlysane',
    url: '/avatars/prajakta-koli.jpg',
  },
  {
    name: 'Ranveer Allahbadia',
    handle: '@beerbiceps',
    url: '/avatars/ranveer-allahbadia.jpg',
  },
  {
    name: 'Tanmay Bhat',
    handle: '@tanmaybhat',
    url: '/avatars/tanmay-bhat.jpg',
  },
];

interface ChangeProfilePictureModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentAvatar: string;
  creatorName: string;
  onSaveAvatar: (newAvatarUrl: string) => void;
  theme?: BackgroundTheme;
}

export const ChangeProfilePictureModal: React.FC<ChangeProfilePictureModalProps> = ({
  isOpen,
  onClose,
  currentAvatar,
  creatorName,
  onSaveAvatar,
  theme = 'dark',
}) => {
  const isLight = theme === 'light';
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [activeTab, setActiveTab] = useState<'upload' | 'presets' | 'url'>('upload');
  const [selectedUrl, setSelectedUrl] = useState<string>(currentAvatar);
  const [customUrlInput, setCustomUrlInput] = useState<string>('');
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setSelectedUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApplyCustomUrl = () => {
    if (customUrlInput.trim()) {
      setSelectedUrl(customUrlInput.trim());
    }
  };

  const handleSave = () => {
    onSaveAvatar(selectedUrl);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className={`w-full max-w-lg rounded-3xl border shadow-2xl overflow-hidden transition-colors ${
          isLight
            ? 'bg-white border-slate-200 text-slate-900'
            : 'bg-[#0f1118] border-white/15 text-white'
        }`}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between px-6 py-4 border-b ${
            isLight ? 'border-slate-200' : 'border-white/10'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-white shadow-xs">
              <Camera className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-black tracking-tight">Change Profile Picture</h3>
              <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Updating photo for {creatorName}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-1.5 rounded-full transition-colors cursor-pointer ${
              isLight ? 'hover:bg-slate-100 text-slate-500' : 'hover:bg-white/10 text-slate-400'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Preview Ring */}
        <div
          className={`flex flex-col items-center justify-center p-6 border-b ${
            isLight ? 'bg-slate-50 border-slate-200' : 'bg-black/40 border-white/10'
          }`}
        >
          <div className="relative group">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-[3px] bg-gradient-to-tr from-rose-500 via-purple-500 to-amber-500 shadow-xl shadow-rose-500/25">
              <img
                src={selectedUrl || currentAvatar}
                alt="Profile Preview"
                className={`w-full h-full rounded-full object-cover border-2 ${
                  isLight ? 'border-white bg-slate-200' : 'border-slate-950 bg-slate-900'
                }`}
                onError={(e) => {
                  // Fallback if image load fails
                  (e.currentTarget as HTMLImageElement).src = currentAvatar;
                }}
              />
            </div>
            <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-white shadow-md" />
          </div>
          <p className={`mt-3 text-xs font-semibold ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
            Live Profile Preview
          </p>
        </div>

        {/* Method Switcher Tabs */}
        <div
          className={`flex border-b text-xs font-bold ${
            isLight ? 'border-slate-200 bg-slate-100/60' : 'border-white/10 bg-white/5'
          }`}
        >
          <button
            onClick={() => setActiveTab('upload')}
            className={`flex-1 py-3 flex items-center justify-center gap-1.5 border-b-2 transition-all cursor-pointer ${
              activeTab === 'upload'
                ? 'border-rose-500 text-rose-500 bg-white/5'
                : isLight
                ? 'border-transparent text-slate-600 hover:text-black'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>Upload Device Photo</span>
          </button>

          <button
            onClick={() => setActiveTab('presets')}
            className={`flex-1 py-3 flex items-center justify-center gap-1.5 border-b-2 transition-all cursor-pointer ${
              activeTab === 'presets'
                ? 'border-rose-500 text-rose-500 bg-white/5'
                : isLight
                ? 'border-transparent text-slate-600 hover:text-black'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Indian Creator Avatars</span>
          </button>

          <button
            onClick={() => setActiveTab('url')}
            className={`flex-1 py-3 flex items-center justify-center gap-1.5 border-b-2 transition-all cursor-pointer ${
              activeTab === 'url'
                ? 'border-rose-500 text-rose-500 bg-white/5'
                : isLight
                ? 'border-transparent text-slate-600 hover:text-black'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            <LinkIcon className="w-4 h-4" />
            <span>Image URL</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'upload' && (
            <div className="space-y-4">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <div
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-2 ${
                  isLight
                    ? 'border-slate-300 hover:border-rose-500 bg-slate-50 hover:bg-rose-50/20'
                    : 'border-white/20 hover:border-rose-400 bg-white/5 hover:bg-white/10'
                }`}
              >
                <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center shadow-xs">
                  <Upload className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold">
                    Click to browse or drag & drop photo
                  </p>
                  <p className={`text-[11px] mt-0.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                    Supports PNG, JPG, WEBP, GIF (up to 10MB)
                  </p>
                </div>
                {uploadedFileName && (
                  <span className="text-[11px] font-mono text-emerald-500 font-bold mt-1">
                    ✓ Selected: {uploadedFileName}
                  </span>
                )}
              </div>
            </div>
          )}

          {activeTab === 'presets' && (
            <div className="space-y-3">
              <p className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                Select from top Indian creators:
              </p>
              <div className="grid grid-cols-4 gap-3 max-h-56 overflow-y-auto pr-1">
                {INDIAN_CREATOR_PRESETS.map((preset) => {
                  const isSelected = selectedUrl === preset.url;
                  return (
                    <button
                      key={preset.handle}
                      type="button"
                      onClick={() => setSelectedUrl(preset.url)}
                      className={`flex flex-col items-center gap-1.5 p-2 rounded-2xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'border-rose-500 bg-rose-500/10 ring-2 ring-rose-500/30'
                          : isLight
                          ? 'border-slate-200 hover:border-slate-300 bg-slate-50'
                          : 'border-white/10 hover:border-white/20 bg-white/5'
                      }`}
                    >
                      <div className="relative w-12 h-12 rounded-full overflow-hidden">
                        <img
                          src={preset.url}
                          alt={preset.name}
                          className="w-full h-full object-cover"
                        />
                        {isSelected && (
                          <div className="absolute inset-0 bg-rose-500/40 flex items-center justify-center text-white">
                            <Check className="w-4 h-4 font-black" />
                          </div>
                        )}
                      </div>
                      <span className="text-[10px] font-bold text-center leading-tight truncate w-full">
                        {preset.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'url' && (
            <div className="space-y-3">
              <label
                className={`text-xs font-bold block ${
                  isLight ? 'text-slate-700' : 'text-slate-300'
                }`}
              >
                Paste Image Web Address:
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="https://example.com/avatar.jpg"
                  value={customUrlInput}
                  onChange={(e) => setCustomUrlInput(e.target.value)}
                  className={`flex-1 px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none transition-colors ${
                    isLight
                      ? 'border-slate-300 bg-white text-slate-900 focus:border-rose-500'
                      : 'border-white/20 bg-slate-950 text-white focus:border-rose-500'
                  }`}
                />
                <button
                  type="button"
                  onClick={handleApplyCustomUrl}
                  className="px-4 py-2.5 bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
                >
                  Preview
                </button>
              </div>
              <p className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                Enter any direct HTTPS image link to use as the profile picture.
              </p>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div
          className={`flex items-center justify-between px-6 py-4 border-t ${
            isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-black/40'
          }`}
        >
          <button
            type="button"
            onClick={() => {
              setSelectedUrl(currentAvatar);
              setUploadedFileName(null);
            }}
            className={`text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer ${
              isLight ? 'text-slate-600 hover:text-black' : 'text-slate-400 hover:text-white'
            }`}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 text-xs font-bold rounded-full transition-colors cursor-pointer ${
                isLight ? 'text-slate-700 hover:bg-slate-200' : 'text-slate-300 hover:bg-white/10'
              }`}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2 text-xs font-bold text-white bg-gradient-to-r from-rose-500 via-pink-500 to-orange-500 hover:brightness-110 rounded-full shadow-md transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Save Profile Picture</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
