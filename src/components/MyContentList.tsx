import React, { useState } from 'react';
import {
  Calendar,
  FolderOpen,
  Edit3,
  Copy,
  Trash2,
  Search,
  Sparkles,
  Layers,
  ArrowRight,
  Clock,
} from 'lucide-react';
import { SavedEventRecord } from '../types';

interface MyContentListProps {
  events: SavedEventRecord[];
  onOpenEvent: (event: SavedEventRecord) => void;
  onEditEventDetails: (event: SavedEventRecord) => void;
  onDuplicateEvent: (eventId: string) => void;
  onDeleteEvent: (eventId: string) => void;
  onStartNewEvent: () => void;
}

export const MyContentList: React.FC<MyContentListProps> = ({
  events,
  onOpenEvent,
  onEditEventDetails,
  onDuplicateEvent,
  onDeleteEvent,
  onStartNewEvent,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const filteredEvents = events.filter((ev) => {
    const q = searchQuery.toLowerCase();
    return (
      ev.name.toLowerCase().includes(q) ||
      ev.details.eventType.toLowerCase().includes(q) ||
      ev.details.venue.toLowerCase().includes(q)
    );
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
            Workspace History
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            My Content
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Access, duplicate, and modify previously generated events and campaigns.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onStartNewEvent}
            className="flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg shadow-sm transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Create New Content</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by event name, type, or venue..."
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-900 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
        <span className="text-xs text-slate-500">
          Showing {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'}
        </span>
      </div>

      {/* Events List */}
      {filteredEvents.length === 0 ? (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-12 text-center">
          <Layers className="w-10 h-10 text-slate-600 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-white">No events found</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            {searchQuery
              ? 'No events match your search query.'
              : 'You haven’t generated any events yet. Start by entering your first event details.'}
          </p>
          <button
            onClick={onStartNewEvent}
            className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors inline-flex items-center gap-1.5"
          >
            <span>Create Content Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredEvents.map((record) => {
            const isConfirming = confirmDeleteId === record.id;
            return (
              <div
                key={record.id}
                className="rounded-xl border border-slate-800 bg-slate-900/50 p-5 hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Event Title & Type */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-base font-bold text-white hover:text-indigo-300 transition-colors">
                        {record.name}
                      </h3>
                      <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
                        <span className="text-indigo-400 font-medium">{record.details.eventType}</span>
                        <span>·</span>
                        <span>Tone: {record.details.tone}</span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[11px] font-mono text-slate-400 bg-slate-800/80 border border-slate-700/60 shrink-0">
                      {record.generatedItems.length} formats
                    </span>
                  </div>

                  {/* Metadata: Date & Created */}
                  <div className="mt-3.5 space-y-1 text-xs text-slate-400 border-t border-slate-800/60 pt-3">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span>Event Date: <strong className="text-slate-300 font-medium">{record.date || record.details.eventDate}</strong></span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500">
                      <Clock className="w-3.5 h-3.5 shrink-0" />
                      <span>Saved on: {new Date(record.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  {/* Generated Formats Pills/Badges */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {record.generatedItems.slice(0, 4).map((item) => (
                      <span
                        key={item.id}
                        className="text-[11px] text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800"
                      >
                        {item.title}
                      </span>
                    ))}
                    {record.generatedItems.length > 4 && (
                      <span className="text-[11px] text-slate-500 px-1.5 py-0.5">
                        +{record.generatedItems.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions: Open | Edit | Duplicate | Delete */}
                <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onOpenEvent(record)}
                      className="flex items-center gap-1.5 px-3 py-1.5 font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors"
                    >
                      <FolderOpen className="w-3.5 h-3.5" />
                      <span>Open</span>
                    </button>
                    <button
                      onClick={() => onEditEventDetails(record)}
                      className="flex items-center gap-1 px-2.5 py-1.5 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => onDuplicateEvent(record.id)}
                      className="flex items-center gap-1 px-2.5 py-1.5 text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
                      title="Duplicate this event"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Duplicate</span>
                    </button>
                  </div>

                  <div>
                    {isConfirming ? (
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => onDeleteEvent(record.id)}
                          className="px-2 py-1 bg-rose-600 hover:bg-rose-500 text-white rounded text-[11px] font-semibold"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => setConfirmDeleteId(null)}
                          className="px-2 py-1 text-slate-400 hover:text-slate-200 text-[11px]"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmDeleteId(record.id)}
                        className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-slate-800/60 rounded-lg transition-colors"
                        title="Delete event"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
