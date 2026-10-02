import React, { useState } from 'react';
import {
  GraduationCap,
  Cpu,
  Terminal,
  Briefcase,
  Sparkles,
  Music,
  BookOpen,
  Trophy,
  Video,
  Flame,
  Heart,
  Coffee,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { EVENT_TEMPLATES } from '../data/templates';
import { EventTemplate } from '../types';

interface TemplatesViewProps {
  onSelectTemplate: (template: EventTemplate) => void;
}

const CATEGORIES = [
  'All',
  'College Events',
  'Workshops',
  'Seminars',
  'Hackathons',
  'Festivals',
  'Conferences',
  'Business Events',
  'Product Launches',
  'Webinars',
  'Cultural Events',
  'Competitions',
  'Sports Events',
];

export const TemplatesView: React.FC<TemplatesViewProps> = ({ onSelectTemplate }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredTemplates =
    selectedCategory === 'All'
      ? EVENT_TEMPLATES
      : EVENT_TEMPLATES.filter((t) => t.category === selectedCategory);

  const renderIcon = (name: string) => {
    switch (name) {
      case 'GraduationCap':
        return <GraduationCap className="w-5 h-5 text-indigo-400" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-cyan-400" />;
      case 'Terminal':
        return <Terminal className="w-5 h-5 text-emerald-400" />;
      case 'Briefcase':
        return <Briefcase className="w-5 h-5 text-blue-400" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-amber-400" />;
      case 'Music':
        return <Music className="w-5 h-5 text-fuchsia-400" />;
      case 'BookOpen':
        return <BookOpen className="w-5 h-5 text-teal-400" />;
      case 'Trophy':
        return <Trophy className="w-5 h-5 text-yellow-400" />;
      case 'Video':
        return <Video className="w-5 h-5 text-rose-400" />;
      case 'Flame':
        return <Flame className="w-5 h-5 text-orange-400" />;
      case 'Heart':
        return <Heart className="w-5 h-5 text-red-400" />;
      case 'Coffee':
        return <Coffee className="w-5 h-5 text-amber-500" />;
      default:
        return <Sparkles className="w-5 h-5 text-indigo-400" />;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="pb-6 border-b border-slate-800">
        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
          Template Library
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
          Event Starter Templates
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Select any pre-configured template to auto-populate high-performing event structures.
        </p>
      </div>

      {/* Category Pills Filter */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                isSelected
                  ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-slate-800/80'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Template Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTemplates.map((tmpl) => (
          <div
            key={tmpl.id}
            className="rounded-xl border border-slate-800 bg-slate-900/50 p-5 hover:border-slate-700 transition-all flex flex-col justify-between group shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center">
                  {renderIcon(tmpl.icon)}
                </div>
                <span className="text-[11px] font-medium text-slate-400 bg-slate-950 border border-slate-800 px-2 py-0.5 rounded">
                  {tmpl.category}
                </span>
              </div>

              <h3 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors">
                {tmpl.name}
              </h3>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed line-clamp-3">
                {tmpl.summary}
              </p>

              {/* Sample Tone & Audience preview */}
              <div className="mt-3.5 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-500">
                <span>Tone: <strong className="text-slate-300 font-medium">{tmpl.details.tone || 'Exciting'}</strong></span>
                <span>{tmpl.details.selectedTypes?.length || 6} content types</span>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-800">
              <button
                onClick={() => onSelectTemplate(tmpl)}
                className="w-full py-2 px-3 text-xs font-semibold text-white bg-slate-800 group-hover:bg-indigo-600 active:scale-98 rounded-lg transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Use This Template</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
