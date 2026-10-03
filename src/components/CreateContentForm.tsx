import React, { useState } from 'react';
import {
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  Building,
  Users,
  Link as LinkIcon,
  Phone,
  FilePlus,
  CheckSquare,
  Square,
  HelpCircle,
  Lightbulb,
  Plus,
  Check,
  CheckCircle2,
  ChevronDown,
} from 'lucide-react';
import { ContentTone, ContentTypeId, EventDetails, SmartSuggestion } from '../types';
import { CONTENT_TYPE_REGISTRY, EVENT_TEMPLATES } from '../data/templates';
import { CalendarDatePickerModal } from './CalendarDatePickerModal';
import { ClockTimePickerModal } from './ClockTimePickerModal';

interface CreateContentFormProps {
  initialDetails?: Partial<EventDetails>;
  onSubmit: (details: EventDetails) => void;
  isLoading: boolean;
  onApplySuggestion: (suggestionText: string) => void;
}

const TONE_OPTIONS: { id: ContentTone; label: string; desc: string }[] = [
  { id: 'Exciting', label: 'Exciting', desc: 'High energy, punchy & enthusiastic' },
  { id: 'College/Youth', label: 'College/Youth', desc: 'Vibrant, campus-ready, viral' },
  { id: 'Professional', label: 'Professional', desc: 'Polished, authoritative, credible' },
  { id: 'Corporate', label: 'Corporate', desc: 'Executive, B2B, structured' },
  { id: 'Friendly', label: 'Friendly', desc: 'Warm, approachable, conversational' },
  { id: 'Aesthetic', label: 'Aesthetic', desc: 'Minimalist, refined, atmospheric' },
  { id: 'Traditional', label: 'Traditional', desc: 'Dignified, cultural, respectful' },
  { id: 'Minimal', label: 'Minimal', desc: 'Direct, crisp, zero fluff' },
];

const COMMON_EVENT_TYPES = [
  'College Tech Fest',
  'Hackathon',
  'Technical Workshop',
  'Webinar / Masterclass',
  'Cultural Fest / Concert',
  'Business Conference',
  'Product Launch',
  'Seminar & Panel',
  'Sports Tournament',
  'Startup Pitch Competition',
  'Community Meetup',
  'Other',
];

export const CreateContentForm: React.FC<CreateContentFormProps> = ({
  initialDetails,
  onSubmit,
  isLoading,
  onApplySuggestion,
}) => {
  const [eventName, setEventName] = useState(initialDetails?.eventName || '');
  const [eventType, setEventType] = useState(initialDetails?.eventType || 'College Tech Fest');
  const [customEventType, setCustomEventType] = useState('');
  const [eventDate, setEventDate] = useState(initialDetails?.eventDate || '');
  const [eventTime, setEventTime] = useState(initialDetails?.eventTime || '');
  const [venue, setVenue] = useState(initialDetails?.venue || '');
  const [organizer, setOrganizer] = useState(initialDetails?.organizer || '');
  const [description, setDescription] = useState(initialDetails?.description || '');
  const [targetAudience, setTargetAudience] = useState(initialDetails?.targetAudience || '');
  const [registrationLink, setRegistrationLink] = useState(initialDetails?.registrationLink || '');
  const [contactInfo, setContactInfo] = useState(initialDetails?.contactInfo || '');
  const [additionalInfo, setAdditionalInfo] = useState(initialDetails?.additionalInfo || '');
  const [tone, setTone] = useState<ContentTone>(initialDetails?.tone || 'Exciting');

  // Modal Picker States
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isClockOpen, setIsClockOpen] = useState(false);

  // Selected content types
  const allTypeIds: ContentTypeId[] = CONTENT_TYPE_REGISTRY.map((c) => c.id as ContentTypeId);
  const [selectedTypes, setSelectedTypes] = useState<ContentTypeId[]>(
    initialDetails?.selectedTypes && initialDetails.selectedTypes.length > 0
      ? initialDetails.selectedTypes
      : [
          'instagram_caption',
          'whatsapp_invitation',
          'linkedin_post',
          'poster_text',
          'hashtags',
          'email_invitation',
        ]
  );

  // Selected Smart Suggestions
  const [selectedSuggestions, setSelectedSuggestions] = useState<string[]>(
    initialDetails?.selectedSuggestions || []
  );

  const [formError, setFormError] = useState<string | null>(null);

  // Suggestions registry
  const smartSuggestions: SmartSuggestion[] = [
    {
      id: 'sug-1',
      title: 'Instagram Announcement',
      description: 'Official reveal post with catchy hook and high reach hashtags.',
      badge: 'Announcement',
      promptSnippet: 'Include an official social reveal announcement highlighting date and venue.',
    },
    {
      id: 'sug-2',
      title: 'Registration Reminder',
      description: 'Mid-campaign reminder highlighting limited seats filling quickly.',
      badge: 'Conversions',
      promptSnippet: 'Generate a mid-sprint registration reminder post stressing urgency.',
    },
    {
      id: 'sug-3',
      title: 'Last-Day Reminder',
      description: 'Urgent 24-hour final call for WhatsApp groups & Instagram stories.',
      badge: 'Urgent',
      promptSnippet: 'Create a final call message emphasizing registrations close tonight.',
    },
    {
      id: 'sug-4',
      title: 'Countdown Post',
      description: 'T-Minus 48h excitement booster building attendee anticipation.',
      badge: 'Hype',
      promptSnippet: 'Draft a 2-day countdown post hyping key sessions and activities.',
    },
    {
      id: 'sug-5',
      title: 'Speaker Introduction',
      description: 'Bio spotlight post introducing keynote mentors and presenters.',
      badge: 'Speakers',
      promptSnippet: 'Add a dedicated speaker introduction highlight for invited guests.',
    },
    {
      id: 'sug-6',
      title: 'Post-Event Thank You & Recap',
      description: 'Appreciation post celebrating attendee turnout and memorable moments.',
      badge: 'Recap',
      promptSnippet: 'Prepare a post-event celebration and appreciation thank you note.',
    },
  ];

  const handleToggleType = (typeId: ContentTypeId) => {
    if (selectedTypes.includes(typeId)) {
      if (selectedTypes.length === 1) {
        setFormError('Please keep at least one content type selected.');
        return;
      }
      setSelectedTypes(selectedTypes.filter((t) => t !== typeId));
      setFormError(null);
    } else {
      setSelectedTypes([...selectedTypes, typeId]);
      setFormError(null);
    }
  };

  const handleSelectAllTypes = () => {
    setSelectedTypes(allTypeIds);
    setFormError(null);
  };

  const handleClearAllTypes = () => {
    setSelectedTypes(['instagram_caption']);
  };

  const handleQuickLoadTemplate = (templateId: string) => {
    const tmpl = EVENT_TEMPLATES.find((t) => t.id === templateId);
    if (!tmpl || !tmpl.details) return;
    const d = tmpl.details;
    if (d.eventName) setEventName(d.eventName);
    if (d.eventType) setEventType(d.eventType);
    if (d.eventDate) setEventDate(d.eventDate);
    if (d.eventTime) setEventTime(d.eventTime);
    if (d.venue) setVenue(d.venue);
    if (d.organizer) setOrganizer(d.organizer);
    if (d.description) setDescription(d.description);
    if (d.targetAudience) setTargetAudience(d.targetAudience);
    if (d.registrationLink) setRegistrationLink(d.registrationLink);
    if (d.contactInfo) setContactInfo(d.contactInfo);
    if (d.additionalInfo) setAdditionalInfo(d.additionalInfo);
    if (d.tone) setTone(d.tone);
    if (d.selectedTypes) setSelectedTypes(d.selectedTypes);
    setFormError(null);
  };

  // Toggle selection for a smart suggestion
  const handleToggleSuggestion = (sug: SmartSuggestion) => {
    if (selectedSuggestions.includes(sug.id)) {
      setSelectedSuggestions(selectedSuggestions.filter((id) => id !== sug.id));
      onApplySuggestion(`Deselected ${sug.title}`);
    } else {
      setSelectedSuggestions([...selectedSuggestions, sug.id]);
      onApplySuggestion(`Selected ${sug.title}`);
    }
  };

  const handleSelectAllSuggestions = () => {
    const allIds = smartSuggestions.map((s) => s.id);
    setSelectedSuggestions(allIds);
    onApplySuggestion('Selected all smart suggestions');
  };

  const handleClearAllSuggestions = () => {
    setSelectedSuggestions([]);
    onApplySuggestion('Cleared all suggestions');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventName.trim()) {
      setFormError('Please enter an Event Name.');
      window.scrollTo({ top: 100, behavior: 'smooth' });
      return;
    }

    if (selectedTypes.length === 0) {
      setFormError('Please select at least one content type to generate.');
      return;
    }

    setFormError(null);
    const resolvedEventType =
      eventType === 'Other' && customEventType.trim() ? customEventType.trim() : eventType;

    // Map selected suggestions into titles for prompt enrichment
    const activeSuggestionTitles = smartSuggestions
      .filter((s) => selectedSuggestions.includes(s.id))
      .map((s) => s.title);

    onSubmit({
      eventName: eventName.trim(),
      eventType: resolvedEventType,
      eventDate: eventDate.trim() || 'Date to be announced',
      eventTime: eventTime.trim() || 'Time to be announced',
      venue: venue.trim() || 'Venue to be announced',
      organizer: organizer.trim() || 'Organizing Team',
      description: description.trim(),
      targetAudience: targetAudience.trim() || 'General community & attendees',
      registrationLink: registrationLink.trim(),
      contactInfo: contactInfo.trim(),
      additionalInfo: additionalInfo.trim(),
      tone,
      selectedTypes,
      selectedSuggestions: activeSuggestionTitles,
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Calendar Date Picker Modal */}
      <CalendarDatePickerModal
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        onSelectDate={(formatted) => setEventDate(formatted)}
        currentValue={eventDate}
      />

      {/* Clock Time Picker Modal */}
      <ClockTimePickerModal
        isOpen={isClockOpen}
        onClose={() => setIsClockOpen(false)}
        onSelectTime={(formatted) => setEventTime(formatted)}
        currentValue={eventTime}
      />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
            Content Generator
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            Enter Event Information
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Fill in your event details once. AI will adapt the exact facts across all selected channels.
          </p>
        </div>

        {/* Quick Sample Presets */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400 font-medium">Quick Fill:</span>
          <button
            type="button"
            onClick={() => handleQuickLoadTemplate('college-tech-fest')}
            className="px-2.5 py-1 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-lg transition-colors"
          >
            Tech Fest
          </button>
          <button
            type="button"
            onClick={() => handleQuickLoadTemplate('ai-workshop')}
            className="px-2.5 py-1 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-lg transition-colors"
          >
            AI Workshop
          </button>
          <button
            type="button"
            onClick={() => handleQuickLoadTemplate('national-hackathon')}
            className="px-2.5 py-1 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-lg transition-colors"
          >
            Hackathon
          </button>
        </div>
      </div>

      {formError && (
        <div className="mt-4 p-3 rounded-lg bg-rose-950/60 border border-rose-800/80 text-rose-300 text-xs font-medium">
          {formError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-8">
        {/* Section 1: Event Primary Details */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5 sm:p-6 space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <span className="w-5 h-5 rounded bg-indigo-900/60 border border-indigo-700/50 text-indigo-300 text-xs flex items-center justify-center font-mono">
              1
            </span>
            <span>Core Event Details</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            {/* Event Name */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Event Name <span className="text-rose-400">*</span>
              </label>
              <input
                type="text"
                required
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
                placeholder="e.g. Technovate 2026: Annual College Tech Fest"
                className="w-full px-3.5 py-2.5 text-sm bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
              />
            </div>

            {/* Event Type */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Event Type <span className="text-rose-400">*</span>
              </label>
              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-slate-950 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
              >
                {COMMON_EVENT_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {eventType === 'Other' && (
                <input
                  type="text"
                  value={customEventType}
                  onChange={(e) => setCustomEventType(e.target.value)}
                  placeholder="Specify event type"
                  className="mt-2 w-full px-3.5 py-2 text-sm bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              )}
            </div>

            {/* Organizer Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Organizer / Organization Name
              </label>
              <div className="relative">
                <Building className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
                <input
                  type="text"
                  value={organizer}
                  onChange={(e) => setOrganizer(e.target.value)}
                  placeholder="e.g. Student Council & ACM Chapter"
                  className="w-full pl-9 pr-3.5 py-2.5 text-sm bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                />
              </div>
            </div>

            {/* Interactive Date Picker Field */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-300">
                  Event Date
                </label>
                <button
                  type="button"
                  onClick={() => setIsCalendarOpen(true)}
                  className="text-[11px] font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Open Calendar ▾</span>
                </button>
              </div>

              <div className="relative flex items-center">
                <button
                  type="button"
                  onClick={() => setIsCalendarOpen(true)}
                  title="Click to open calendar"
                  className="absolute left-2.5 p-1 rounded hover:bg-slate-800 text-indigo-400 hover:text-white transition-colors z-10"
                >
                  <Calendar className="w-4 h-4" />
                </button>

                <input
                  type="text"
                  value={eventDate}
                  onClick={() => setIsCalendarOpen(true)}
                  onChange={(e) => setEventDate(e.target.value)}
                  placeholder="e.g. 30-09-2026 or April 18-19, 2026"
                  className="w-full pl-10 pr-24 py-2.5 text-sm bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors cursor-pointer"
                />

                <button
                  type="button"
                  onClick={() => setIsCalendarOpen(true)}
                  className="absolute right-1.5 px-2.5 py-1 text-xs font-semibold text-indigo-300 hover:text-white bg-indigo-950/80 hover:bg-indigo-900 border border-indigo-800/60 rounded-md transition-colors flex items-center gap-1 shadow-xs"
                >
                  <Calendar className="w-3 h-3 text-indigo-400" />
                  <span>Pick Date</span>
                </button>
              </div>

              {/* Quick Date Chips */}
              <div className="mt-1.5 flex flex-wrap items-center gap-1 text-[11px] text-slate-400">
                <span className="text-[10px] text-slate-500">Quick:</span>
                <button
                  type="button"
                  onClick={() => setEventDate('30-09-2026')}
                  className="px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 hover:border-slate-700 hover:text-slate-200 transition-colors font-mono"
                >
                  30-09-2026
                </button>
                <button
                  type="button"
                  onClick={() => setEventDate('01-10-2026')}
                  className="px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 hover:border-slate-700 hover:text-slate-200 transition-colors font-mono"
                >
                  01-10-2026
                </button>
                <button
                  type="button"
                  onClick={() => setEventDate('Oct 03-04, 2026')}
                  className="px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 hover:border-slate-700 hover:text-slate-200 transition-colors"
                >
                  This Weekend
                </button>
                <button
                  type="button"
                  onClick={() => setEventDate('April 18-19, 2026')}
                  className="px-1.5 py-0.5 rounded bg-indigo-950/60 border border-indigo-800/40 text-indigo-300 hover:text-white transition-colors"
                >
                  Fest Range (Apr 18-19)
                </button>
              </div>
            </div>

            {/* Interactive Time Picker Field */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-300">
                  Event Time
                </label>
                <button
                  type="button"
                  onClick={() => setIsClockOpen(true)}
                  className="text-[11px] font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors"
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Open Clock ▾</span>
                </button>
              </div>

              <div className="relative flex items-center">
                <button
                  type="button"
                  onClick={() => setIsClockOpen(true)}
                  title="Click to open clock"
                  className="absolute left-2.5 p-1 rounded hover:bg-slate-800 text-indigo-400 hover:text-white transition-colors z-10"
                >
                  <Clock className="w-4 h-4" />
                </button>

                <input
                  type="text"
                  value={eventTime}
                  onClick={() => setIsClockOpen(true)}
                  onChange={(e) => setEventTime(e.target.value)}
                  placeholder="e.g. 9:00 AM - 6:00 PM"
                  className="w-full pl-10 pr-24 py-2.5 text-sm bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors cursor-pointer"
                />

                <button
                  type="button"
                  onClick={() => setIsClockOpen(true)}
                  className="absolute right-1.5 px-2.5 py-1 text-xs font-semibold text-indigo-300 hover:text-white bg-indigo-950/80 hover:bg-indigo-900 border border-indigo-800/60 rounded-md transition-colors flex items-center gap-1 shadow-xs"
                >
                  <Clock className="w-3 h-3 text-indigo-400" />
                  <span>Pick Time</span>
                </button>
              </div>

              {/* Quick Time Chips */}
              <div className="mt-1.5 flex flex-wrap items-center gap-1 text-[11px] text-slate-400">
                <span className="text-[10px] text-slate-500">Quick:</span>
                <button
                  type="button"
                  onClick={() => setEventTime('9:00 AM - 6:00 PM')}
                  className="px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 hover:border-slate-700 hover:text-slate-200 transition-colors font-mono"
                >
                  9 AM - 6 PM
                </button>
                <button
                  type="button"
                  onClick={() => setEventTime('10:00 AM - 1:00 PM')}
                  className="px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 hover:border-slate-700 hover:text-slate-200 transition-colors font-mono"
                >
                  10 AM - 1 PM
                </button>
                <button
                  type="button"
                  onClick={() => setEventTime('2:00 PM - 5:00 PM')}
                  className="px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 hover:border-slate-700 hover:text-slate-200 transition-colors font-mono"
                >
                  2 PM - 5 PM
                </button>
                <button
                  type="button"
                  onClick={() => setEventTime('6:00 PM - 9:30 PM')}
                  className="px-1.5 py-0.5 rounded bg-slate-950 border border-slate-800 hover:border-slate-700 hover:text-slate-200 transition-colors font-mono"
                >
                  6 PM - 9:30 PM
                </button>
              </div>
            </div>

            {/* Venue */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Venue / Platform
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
                <input
                  type="text"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  placeholder="e.g. Main Campus Auditorium, Block 4 or Zoom / Google Meet Link"
                  className="w-full pl-9 pr-3.5 py-2.5 text-sm bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Narrative & Audience */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5 sm:p-6 space-y-4">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <span className="w-5 h-5 rounded bg-indigo-900/60 border border-indigo-700/50 text-indigo-300 text-xs flex items-center justify-center font-mono">
              2
            </span>
            <span>Description & Audience</span>
          </h2>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Event Description & Purpose
            </label>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Explain what the event is about, what participants will experience, key activities, and why someone should attend..."
              className="w-full px-3.5 py-2.5 text-sm bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors resize-y"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Target Audience */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Target Audience
              </label>
              <div className="relative">
                <Users className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
                <input
                  type="text"
                  value={targetAudience}
                  onChange={(e) => setTargetAudience(e.target.value)}
                  placeholder="e.g. Engineering students, tech founders, creators"
                  className="w-full pl-9 pr-3.5 py-2.5 text-sm bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                />
              </div>
            </div>

            {/* Registration Link */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Registration / RSVP Link
              </label>
              <div className="relative">
                <LinkIcon className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
                <input
                  type="text"
                  value={registrationLink}
                  onChange={(e) => setRegistrationLink(e.target.value)}
                  placeholder="e.g. https://bit.ly/my-event-pass"
                  className="w-full pl-9 pr-3.5 py-2.5 text-sm bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                />
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Contact Information
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
                <input
                  type="text"
                  value={contactInfo}
                  onChange={(e) => setContactInfo(e.target.value)}
                  placeholder="e.g. info@event.edu | +91 9876543210"
                  className="w-full pl-9 pr-3.5 py-2.5 text-sm bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                />
              </div>
            </div>

            {/* Additional Info */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Additional Highlights / Perks
              </label>
              <div className="relative">
                <FilePlus className="w-4 h-4 text-slate-500 absolute left-3 top-3 pointer-events-none" />
                <input
                  type="text"
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                  placeholder="e.g. $5,000 cash prizes, free snacks, certificates"
                  className="w-full pl-9 pr-3.5 py-2.5 text-sm bg-slate-950 border border-slate-800 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section: Smart Suggestions — Full Interactive Selection */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/30 p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800/70">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                  Smart Suggestions: You might also need…
                </h3>
                <p className="text-[11px] text-slate-400">
                  Click any card to select it for inclusion in your event content plan.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold text-indigo-300 bg-indigo-950/70 border border-indigo-800/50 px-2 py-0.5 rounded-full">
                {selectedSuggestions.length} of {smartSuggestions.length} selected
              </span>
              <button
                type="button"
                onClick={handleSelectAllSuggestions}
                className="px-2 py-1 text-[11px] font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded transition-colors"
              >
                Select All
              </button>
              {selectedSuggestions.length > 0 && (
                <button
                  type="button"
                  onClick={handleClearAllSuggestions}
                  className="px-2 py-1 text-[11px] font-medium text-slate-400 hover:text-slate-200 bg-slate-900 border border-slate-800 rounded transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 pt-1">
            {smartSuggestions.map((sug) => {
              const isSelected = selectedSuggestions.includes(sug.id);

              return (
                <button
                  key={sug.id}
                  type="button"
                  onClick={() => handleToggleSuggestion(sug)}
                  className={`text-left p-3.5 rounded-xl border transition-all cursor-pointer relative group flex flex-col justify-between ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-950/70 ring-1 ring-indigo-500 shadow-md shadow-indigo-950/50'
                      : 'border-slate-800/90 bg-slate-950/70 hover:bg-slate-900 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <span
                        className={`text-xs font-bold transition-colors ${
                          isSelected ? 'text-white' : 'text-slate-200 group-hover:text-indigo-300'
                        }`}
                      >
                        {sug.title}
                      </span>

                      {isSelected ? (
                        <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400 shrink-0">
                          <Check className="w-3 h-3 stroke-3" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 group-hover:text-indigo-400 group-hover:border-indigo-800 shrink-0 transition-colors">
                          <Plus className="w-3 h-3" />
                        </div>
                      )}
                    </div>

                    <p className="text-[11px] text-slate-400 leading-normal mb-2.5">
                      {sug.description}
                    </p>
                  </div>

                  {/* Selection Status Badge */}
                  <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px]">
                    <span className="text-slate-500 font-medium">{sug.badge}</span>
                    {isSelected ? (
                      <span className="font-bold text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Included in generation</span>
                      </span>
                    ) : (
                      <span className="text-indigo-400 group-hover:text-indigo-300">
                        + Click to select
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 3: Tone Selection */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5 sm:p-6 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <span className="w-5 h-5 rounded bg-indigo-900/60 border border-indigo-700/50 text-indigo-300 text-xs flex items-center justify-center font-mono">
                3
              </span>
              <span>Select Content Tone</span>
            </h2>
            <span className="text-xs text-slate-400">Current: {tone}</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
            {TONE_OPTIONS.map((item) => {
              const isSelected = tone === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTone(item.id)}
                  className={`text-left p-3 rounded-lg border transition-all ${
                    isSelected
                      ? 'border-indigo-500 bg-indigo-950/60 text-white shadow-sm shadow-indigo-950/40'
                      : 'border-slate-800 bg-slate-950/50 text-slate-300 hover:border-slate-700 hover:bg-slate-900/50'
                  }`}
                >
                  <div className="text-xs font-bold">{item.label}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                    {item.desc}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 4: Content Type Selection */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/40 p-5 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-800/80">
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="w-5 h-5 rounded bg-indigo-900/60 border border-indigo-700/50 text-indigo-300 text-xs flex items-center justify-center font-mono">
                  4
                </span>
                <span>Select Content Types to Generate</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                {selectedTypes.length} of {allTypeIds.length} formats selected
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleSelectAllTypes}
                className="px-3 py-1.5 text-xs font-semibold text-indigo-300 hover:text-white bg-indigo-950/60 border border-indigo-800/50 rounded-lg transition-colors whitespace-nowrap"
              >
                Generate Everything ✨
              </button>
              <button
                type="button"
                onClick={handleClearAllTypes}
                className="px-2.5 py-1.5 text-xs font-medium text-slate-400 hover:text-slate-200 bg-slate-900 border border-slate-800 rounded-lg transition-colors"
              >
                Reset
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {CONTENT_TYPE_REGISTRY.map((type) => {
              const isChecked = selectedTypes.includes(type.id as ContentTypeId);
              return (
                <div
                  key={type.id}
                  onClick={() => handleToggleType(type.id as ContentTypeId)}
                  className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer select-none transition-all ${
                    isChecked
                      ? 'border-indigo-500/80 bg-indigo-950/30 text-white'
                      : 'border-slate-800/80 bg-slate-950/40 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="mt-0.5 shrink-0 text-indigo-400">
                    {isChecked ? (
                      <CheckSquare className="w-4 h-4 text-indigo-400" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-600" />
                    )}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-200">{type.label}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                      {type.description}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-4 px-6 rounded-2xl font-bold text-base text-white flex items-center justify-center gap-3 shadow-xl transition-all cursor-pointer ${
              isLoading
                ? 'bg-rose-700/60 cursor-not-allowed opacity-80'
                : 'bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-pink-600 active:scale-[0.99] shadow-rose-500/30 hover:shadow-rose-500/40'
            }`}
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Crafting Platform Copy with Gemini AI...</span>
              </>
            ) : (
              <>
                <span>Generate Content ✨</span>
                <Sparkles className="w-5 h-5 text-white" />
              </>
            )}
          </button>
          <div className="mt-3 text-center text-xs text-slate-400">
            Generates {selectedTypes.length} ready-to-post platform assets
            {selectedSuggestions.length > 0 && ` with ${selectedSuggestions.length} custom requirements`} · Instant one-click copy & editing
          </div>
        </div>
      </form>
    </div>
  );
};
