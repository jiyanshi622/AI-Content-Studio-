import React, { useState, useEffect } from 'react';
import { Database, X, RefreshCw, ExternalLink, Table, Users, Calendar, Film, CheckCircle2, Search } from 'lucide-react';

interface DatabaseInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLight?: boolean;
}

export const DatabaseInspectorModal: React.FC<DatabaseInspectorModalProps> = ({
  isOpen,
  onClose,
  isLight = false,
}) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'events' | 'users' | 'reels' | 'participant_experiences'>('events');
  const [searchQuery, setSearchQuery] = useState('');

  const consoleUrl =
    'https://console.firebase.google.com/project/gen-lang-client-0956879968/firestore/databases/ai-studio-aicontentstudio-c3fee910-bda5-4143-a562-db533e76b597/data';

  const fetchOverview = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/sql/overview');
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (err) {
      console.error('Failed to load database overview:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchOverview();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentRecords: any[] = data?.tables?.[activeTab]?.data || [];
  const filteredRecords = currentRecords.filter((item) => {
    if (!searchQuery) return true;
    const str = JSON.stringify(item).toLowerCase();
    return str.includes(searchQuery.toLowerCase());
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div
        className={`w-full max-w-4xl max-h-[88vh] rounded-2xl flex flex-col shadow-2xl overflow-hidden border ${
          isLight
            ? 'bg-white border-slate-200 text-slate-900 shadow-slate-300/60'
            : 'bg-slate-950/95 border-white/15 text-white shadow-black/80'
        }`}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between px-6 py-4 border-b ${
            isLight ? 'border-slate-200 bg-slate-50' : 'border-white/10 bg-white/[0.02]'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-white shadow-md shadow-rose-500/20">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold tracking-tight">Cloud Database Inspector</h3>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  <CheckCircle2 className="w-3 h-3" /> Live & Connected
                </span>
              </div>
              <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                Database ID: <code className="text-rose-400 font-mono text-[11px]">ai-studio-aicontentstudio-...</code>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchOverview}
              disabled={loading}
              title="Refresh database records"
              className={`p-2 rounded-lg transition-all cursor-pointer ${
                isLight ? 'hover:bg-slate-200 text-slate-600' : 'hover:bg-white/10 text-slate-400 hover:text-white'
              }`}
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <a
              href={consoleUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white shadow-md shadow-rose-500/20 cursor-pointer"
            >
              <span>Firebase Console</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg transition-all cursor-pointer ${
                isLight ? 'hover:bg-slate-200 text-slate-600' : 'hover:bg-white/10 text-slate-400 hover:text-white'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div
          className={`flex items-center justify-between px-6 py-2.5 border-b gap-4 ${
            isLight ? 'border-slate-200 bg-slate-100/60' : 'border-white/10 bg-white/[0.01]'
          }`}
        >
          <div className="flex items-center gap-2 overflow-x-auto py-1">
            <button
              onClick={() => setActiveTab('events')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'events'
                  ? 'bg-rose-500 text-white shadow-sm shadow-rose-500/30'
                  : isLight
                  ? 'text-slate-600 hover:bg-slate-200'
                  : 'text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Events</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-black/20">
                {data?.tables?.events?.count ?? 0}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('users')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'users'
                  ? 'bg-rose-500 text-white shadow-sm shadow-rose-500/30'
                  : isLight
                  ? 'text-slate-600 hover:bg-slate-200'
                  : 'text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Users</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-black/20">
                {data?.tables?.users?.count ?? 0}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('reels')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'reels'
                  ? 'bg-rose-500 text-white shadow-sm shadow-rose-500/30'
                  : isLight
                  ? 'text-slate-600 hover:bg-slate-200'
                  : 'text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>Reels & Scripts</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-black/20">
                {data?.tables?.reels?.count ?? 0}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('participant_experiences')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'participant_experiences'
                  ? 'bg-rose-500 text-white shadow-sm shadow-rose-500/30'
                  : isLight
                  ? 'text-slate-600 hover:bg-slate-200'
                  : 'text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              <Table className="w-3.5 h-3.5" />
              <span>Experiences</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-black/20">
                {data?.tables?.participant_experiences?.count ?? 0}
              </span>
            </button>
          </div>

          {/* Quick Search */}
          <div className="relative min-w-[180px] max-w-xs">
            <Search className={`w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 ${isLight ? 'text-slate-400' : 'text-slate-500'}`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search records..."
              className={`w-full pl-8 pr-3 py-1 text-xs rounded-lg border focus:outline-none focus:ring-1 focus:ring-rose-500 ${
                isLight ? 'bg-white border-slate-300 text-slate-800' : 'bg-slate-900 border-white/10 text-white'
              }`}
            />
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {loading && !data ? (
            <div className="flex items-center justify-center py-20 text-sm text-slate-400">
              <RefreshCw className="w-5 h-5 animate-spin mr-2" />
              Loading database state...
            </div>
          ) : filteredRecords.length === 0 ? (
            <div className={`text-center py-16 rounded-xl border border-dashed ${isLight ? 'border-slate-300 bg-slate-50' : 'border-white/10 bg-white/[0.02]'}`}>
              <Database className="w-10 h-10 mx-auto text-slate-500 mb-2 opacity-60" />
              <p className="text-sm font-semibold">No records found in {activeTab}</p>
              <p className={`text-xs mt-1 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                {searchQuery ? 'Try clearing your search query' : 'Create new items in the studio to populate this collection.'}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredRecords.map((record, idx) => (
                <div
                  key={record.id || idx}
                  className={`p-4 rounded-xl border transition-all ${
                    isLight
                      ? 'bg-slate-50/70 border-slate-200 hover:border-slate-300'
                      : 'bg-white/[0.03] border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 text-[10px] font-mono font-bold rounded bg-rose-500/20 text-rose-400 border border-rose-500/30">
                          ID: {record.id}
                        </span>
                        <h4 className="text-sm font-bold">
                          {record.eventName || record.title || record.name || 'Record'}
                        </h4>
                      </div>
                      {record.eventType && (
                        <p className={`text-xs mt-0.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                          Type: <span className="font-medium text-slate-300">{record.eventType}</span> • Venue:{' '}
                          <span className="font-medium text-slate-300">{record.venue}</span>
                        </p>
                      )}
                      {record.email && (
                        <p className={`text-xs mt-0.5 ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>
                          Email: <span className="font-medium text-slate-300">{record.email}</span> • Role:{' '}
                          <span className="font-medium text-slate-300">{record.role}</span>
                        </p>
                      )}
                    </div>
                    {record.createdAt && (
                      <span className={`text-[11px] font-mono ${isLight ? 'text-slate-400' : 'text-slate-500'}`}>
                        {new Date(record.createdAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>

                  {record.description && (
                    <p className={`text-xs line-clamp-2 mt-1 ${isLight ? 'text-slate-600' : 'text-slate-300'}`}>
                      {record.description}
                    </p>
                  )}

                  {/* Expandable Raw Data */}
                  <details className="mt-3 group">
                    <summary className="text-[11px] font-medium text-rose-400 hover:text-rose-300 cursor-pointer select-none">
                      View Raw JSON Record
                    </summary>
                    <pre
                      className={`mt-2 p-3 rounded-lg text-[11px] font-mono overflow-x-auto ${
                        isLight ? 'bg-slate-200/80 text-slate-900' : 'bg-black/60 text-emerald-400'
                      }`}
                    >
                      {JSON.stringify(record, null, 2)}
                    </pre>
                  </details>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div
          className={`flex items-center justify-between px-6 py-3 border-t text-xs ${
            isLight ? 'border-slate-200 bg-slate-50 text-slate-500' : 'border-white/10 bg-slate-900/60 text-slate-400'
          }`}
        >
          <span>
            API Endpoint: <code className="text-rose-400">/api/sql/overview</code>
          </span>
          <span>Showing {filteredRecords.length} of {currentRecords.length} records</span>
        </div>
      </div>
    </div>
  );
};
