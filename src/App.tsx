import React, { useState, useEffect } from 'react';
import { Navbar, NavTab } from './components/Navbar';
import { Hero } from './components/Hero';
import { CreateContentForm } from './components/CreateContentForm';
import { ContentDashboard } from './components/ContentDashboard';
import { CampaignView } from './components/CampaignView';
import { MyContentList } from './components/MyContentList';
import { TemplatesView } from './components/TemplatesView';
import { AboutView } from './components/AboutView';
import { ExploreEventsView } from './components/ExploreEventsView';
import { ParticipantExperienceForm } from './components/ParticipantExperienceForm';
import { ParticipantPassportView } from './components/ParticipantPassportView';
import { ReelCreatorView } from './components/ReelCreatorView';
import { MediaStudioView } from './components/MediaStudioView';
import { FloatingGlassDock } from './components/FloatingGlassDock';
import { AuthModal } from './components/AuthModal';
import { DatabaseInspectorModal } from './components/DatabaseInspectorModal';
import { ToastContainer, ToastMessage } from './components/Toast';
import {
  AppMode,
  EventCampaign,
  EventDetails,
  EventTemplate,
  GeneratedContentItem,
  ParticipantDetails,
  ParticipantExperienceRecord,
  RegenerationStyle,
  SavedEventRecord,
  UserAccount,
} from './types';
import {
  deleteEventRecord,
  duplicateEventRecord,
  getSavedEvents,
  saveEventRecord,
  getParticipantExperiences,
  saveParticipantExperience,
  deleteParticipantExperience,
  SAMPLE_PARTICIPANT_EXPERIENCES,
} from './utils/storage';
import { getCurrentUser, logoutUser } from './utils/auth';
import { SAMPLE_SAVED_EVENTS } from './data/sampleEvents';
import { Sparkles, Calendar, Heart, Building, Users } from 'lucide-react';
import { SocialMediaBackground, BackgroundTheme } from './components/SocialMediaBackground';

export default function App() {
  // Application Mode: Organizer (Conducting an Event) vs Participant (Attending an Event)
  const [appMode, setAppMode] = useState<AppMode>('organizer');

  // Authentication State
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register'>('login');
  const [isDbInspectorOpen, setIsDbInspectorOpen] = useState(false);

  const [currentTab, setCurrentTab] = useState<NavTab>('home');
  const [bgTheme, setBgTheme] = useState<BackgroundTheme>(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('app_theme') : null;
    return saved === 'light' || saved === 'dark' ? (saved as BackgroundTheme) : 'dark';
  });

  useEffect(() => {
    try {
      localStorage.setItem('app_theme', bgTheme);
      if (bgTheme === 'light') {
        document.documentElement.classList.add('light');
        document.documentElement.classList.remove('dark');
        document.body.classList.add('light');
        document.body.classList.remove('dark');
      } else {
        document.documentElement.classList.add('dark');
        document.documentElement.classList.remove('light');
        document.body.classList.add('dark');
        document.body.classList.remove('light');
      }
    } catch {
      // storage unavailable
    }
  }, [bgTheme]);

  // Organizer state
  const [activeDetails, setActiveDetails] = useState<EventDetails>(
    SAMPLE_SAVED_EVENTS[0].details
  );
  const [generatedItems, setGeneratedItems] = useState<GeneratedContentItem[]>(
    SAMPLE_SAVED_EVENTS[0].generatedItems
  );
  const [currentCampaign, setCurrentCampaign] = useState<EventCampaign | null>(null);
  const [savedEvents, setSavedEvents] = useState<SavedEventRecord[]>([]);

  // Participant / Attendee state
  const [participantRecords, setParticipantRecords] = useState<ParticipantExperienceRecord[]>([]);
  const [activeParticipantDetails, setActiveParticipantDetails] = useState<ParticipantDetails>(
    SAMPLE_PARTICIPANT_EXPERIENCES[0].details
  );

  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isCampaignLoading, setIsCampaignLoading] = useState<boolean>(false);
  const [isRegeneratingId, setIsRegeneratingId] = useState<string | null>(null);

  // Toast notifications state
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Initialize storage & auth session
  useEffect(() => {
    const records = getSavedEvents();
    setSavedEvents(records);

    const expRecords = getParticipantExperiences();
    setParticipantRecords(expRecords);

    const existingUser = getCurrentUser();
    if (existingUser) {
      setCurrentUser(existingUser);
      setAppMode(existingUser.role);
    }
  }, []);

  // Universal clipboard copy helper
  const handleCopyText = async (text: string, title?: string) => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      showToast(title ? `${title} copied to clipboard ✓` : 'Copied to clipboard ✓', 'success');
    } catch (err) {
      console.error('Clipboard copy failed:', err);
      showToast('Could not copy to clipboard. Please copy manually.', 'error');
    }
  };

  // Copy All Content Deliverables
  const handleCopyAll = () => {
    if (generatedItems.length === 0) return;
    let full = `AI CONTENT STUDIO — ${activeDetails.eventName.toUpperCase()}\n`;
    full += `Event Date: ${activeDetails.eventDate} | Venue: ${activeDetails.venue}\n`;
    full += `============================================================\n\n`;

    generatedItems.forEach((item, idx) => {
      full += `--- [${idx + 1}/${generatedItems.length}] ${item.title.toUpperCase()} ---\n`;
      full += `${item.content}\n\n`;
    });

    handleCopyText(full, 'All Content');
    showToast(`All ${generatedItems.length} content formats copied to clipboard ✓`, 'success');
  };

  // ==========================================
  // AUTHENTICATION HANDLERS
  // ==========================================
  const handleAuthSuccess = (user: UserAccount) => {
    setCurrentUser(user);
    setAppMode(user.role);
    if (user.role === 'organizer') {
      setCurrentTab('home');
    } else {
      setCurrentTab('explore');
    }

    // Sync user with Cloud SQL backend
    fetch('/api/sql/sync-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        uid: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        organization: user.organization,
        collegeOrCompany: user.collegeOrCompany,
      }),
    }).catch((err) => console.warn('Cloud SQL user sync:', err));

    showToast(
      `Welcome, ${user.name}! Signed in as ${
        user.role === 'organizer' ? 'Event Organizer 🏢' : 'Attendee / Participant 🎓'
      }`,
      'success'
    );
  };

  const handleLogout = () => {
    logoutUser();
    setCurrentUser(null);
    showToast('Signed out successfully.', 'info');
  };

  const handleOpenAuth = (mode: 'login' | 'register') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  // ==========================================
  // ORGANIZER WORKFLOW HANDLERS
  // ==========================================

  // Handle Generate Event Copy
  const handleGenerateContent = async (details: EventDetails) => {
    setActiveDetails(details);
    setIsGenerating(true);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          details,
          types: details.selectedTypes,
        }),
      });

      if (!response.ok) {
        throw new Error(`Generation failed with status ${response.status}`);
      }

      const data = await response.json();
      if (data.items && Array.isArray(data.items)) {
        setGeneratedItems(data.items);
        setCurrentTab('dashboard');
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Save record into history
        const newRecord: SavedEventRecord = {
          id: `event-${Date.now()}`,
          name: details.eventName,
          date: details.eventDate,
          createdAt: new Date().toISOString(),
          details,
          generatedItems: data.items,
        };
        saveEventRecord(newRecord);
        setSavedEvents(getSavedEvents());

        // Sync to Cloud SQL relational database
        fetch('/api/sql/events', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userUid: currentUser?.id,
            details,
            items: data.items,
          }),
        }).catch((err) => console.warn('Cloud SQL event sync:', err));

        showToast(`✨ Generated ${data.items.length} assets for “${details.eventName}”!`, 'success');
      } else {
        throw new Error('Invalid response structure received.');
      }
    } catch (err: any) {
      console.error('Generation error:', err);
      showToast(`Generation notice: ${err?.message || 'Check connection'}`, 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  // Handle Single Item Regeneration
  const handleRegenerateItem = async (itemId: string, styleTweak: RegenerationStyle) => {
    const item = generatedItems.find((i) => i.id === itemId);
    if (!item) return;

    setIsRegeneratingId(itemId);
    try {
      const response = await fetch('/api/regenerate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          details: activeDetails,
          typeId: item.typeId,
          currentContent: item.content,
          styleTweak,
        }),
      });

      if (!response.ok) {
        throw new Error(`Regeneration failed (${response.status})`);
      }

      const data = await response.json();
      if (data.content) {
        setGeneratedItems((prev) =>
          prev.map((i) =>
            i.id === itemId
              ? {
                  ...i,
                  content: data.content,
                  lastUpdated: new Date().toISOString(),
                  isCustomized: true,
                }
              : i
          )
        );
        showToast(`Regenerated ${item.title} (${styleTweak.replace(/_/g, ' ')}) ✓`, 'success');
      }
    } catch (err: any) {
      console.error('Regenerate error:', err);
      showToast('Could not regenerate item at this moment.', 'error');
    } finally {
      setIsRegeneratingId(null);
    }
  };

  // Handle Editing Item Content inline
  const handleUpdateItemContent = (itemId: string, newContent: string) => {
    setGeneratedItems((prev) =>
      prev.map((i) =>
        i.id === itemId
          ? { ...i, content: newContent, lastUpdated: new Date().toISOString(), isCustomized: true }
          : i
      )
    );
    showToast('Saved changes ✓', 'success');
  };

  // Handle Save to My Content
  const handleSaveToMyContent = () => {
    const record: SavedEventRecord = {
      id: `saved-${Date.now()}`,
      name: activeDetails.eventName,
      date: activeDetails.eventDate,
      createdAt: new Date().toISOString(),
      details: activeDetails,
      generatedItems,
      campaign: currentCampaign || undefined,
    };
    saveEventRecord(record);
    setSavedEvents(getSavedEvents());
    showToast('Event saved to “My Events” ✓', 'success');
  };

  // Generate 7-Day Campaign
  const handleGenerateCampaign = async () => {
    setIsCampaignLoading(true);
    try {
      const response = await fetch('/api/campaign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ details: activeDetails }),
      });

      if (!response.ok) {
        throw new Error(`Campaign generation failed (${response.status})`);
      }

      const data = await response.json();
      if (data.campaign) {
        setCurrentCampaign(data.campaign);
        setCurrentTab('campaigns');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        showToast('7-Day Event Campaign created successfully! ✨', 'success');
      }
    } catch (err: any) {
      console.error('Campaign error:', err);
      showToast('Failed to create campaign plan.', 'error');
    } finally {
      setIsCampaignLoading(false);
    }
  };

  // Update specific campaign day
  const handleUpdateCampaignDay = (dayNumber: number, newContent: string) => {
    if (!currentCampaign) return;
    const updatedDays = currentCampaign.days.map((d) =>
      d.dayNumber === dayNumber ? { ...d, postContent: newContent } : d
    );
    setCurrentCampaign({ ...currentCampaign, days: updatedDays });
    showToast(`Updated Day ${dayNumber} content ✓`, 'success');
  };

  // Select Template
  const handleSelectTemplate = (template: EventTemplate) => {
    setActiveDetails((prev) => ({
      ...prev,
      ...template.details,
      eventName: template.details.eventName || prev.eventName,
      eventType: template.details.eventType || prev.eventType,
    }));
    setCurrentTab('create');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(`Loaded template: “${template.name}”`, 'info');
  };

  // Load Demo Event
  const handleLoadDemoEvent = (eventName: string) => {
    const demo = SAMPLE_SAVED_EVENTS.find((e) => e.name === eventName) || SAMPLE_SAVED_EVENTS[0];
    setActiveDetails(demo.details);
    setGeneratedItems(demo.generatedItems);
    setCurrentTab('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(`Loaded demo: “${demo.name}”`, 'info');
  };

  // Open saved event
  const handleOpenSavedEvent = (record: SavedEventRecord) => {
    setActiveDetails(record.details);
    setGeneratedItems(record.generatedItems);
    if (record.campaign) {
      setCurrentCampaign(record.campaign);
    }
    setCurrentTab('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(`Opened “${record.name}”`, 'info');
  };

  // Edit saved event details
  const handleEditSavedDetails = (record: SavedEventRecord) => {
    setActiveDetails(record.details);
    setGeneratedItems(record.generatedItems);
    setCurrentTab('create');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Duplicate saved event
  const handleDuplicateSavedEvent = (id: string) => {
    const dup = duplicateEventRecord(id);
    if (dup) {
      setSavedEvents(getSavedEvents());
      showToast(`Duplicated “${dup.name}” ✓`, 'success');
    }
  };

  // Delete saved event
  const handleDeleteSavedEvent = (id: string) => {
    const updated = deleteEventRecord(id);
    setSavedEvents(updated);
    showToast('Event removed from history.', 'info');
  };

  // ==========================================
  // PARTICIPANT / ATTENDEE WORKFLOW HANDLERS
  // ==========================================

  // Select an event from Explorer to write experience
  const handleSelectEventForExperience = (event: SavedEventRecord) => {
    setActiveParticipantDetails({
      eventName: event.details.eventName,
      eventType: event.details.eventType,
      eventDate: event.details.eventDate,
      venue: event.details.venue,
      organizer: event.details.organizer,
      participantRole: 'Attendee',
      projectOrHighlight: `Attended sessions and collaborated with community members at ${event.details.eventName}`,
      keyLearnings: `Learned new practical strategies and networked with peers in ${event.details.eventType}`,
      teamOrMentors: 'Fellow attendees & event mentors',
      certificateOrPrize: '',
      tone: 'Exciting',
    });
    setCurrentTab('participant-create');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(`Selected “${event.name}”. Add your personal highlights!`, 'info');
  };

  // Generate Participant Experience Posts
  const handleGenerateExperience = async (details: ParticipantDetails) => {
    setActiveParticipantDetails(details);
    setIsGenerating(true);

    try {
      const response = await fetch('/api/generate-experience', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ details }),
      });

      if (!response.ok) {
        throw new Error(`Generation failed (${response.status})`);
      }

      const data = await response.json();
      if (data.items && Array.isArray(data.items)) {
        setGeneratedItems(data.items);

        // Also reflect in activeDetails for Dashboard card rendering
        setActiveDetails({
          eventName: `${details.eventName} (My Experience)`,
          eventType: `${details.participantRole} · ${details.eventType}`,
          eventDate: details.eventDate,
          eventTime: 'Attendee Experience',
          venue: details.venue,
          organizer: details.organizer,
          description: details.projectOrHighlight,
          targetAudience: 'LinkedIn, Instagram & Community',
          tone: details.tone,
          selectedTypes: data.items.map((i: any) => i.typeId),
        });

        // Save into Participant Passport storage
        const newRecord: ParticipantExperienceRecord = {
          id: `exp-${Date.now()}`,
          details,
          posts: data.items,
          createdAt: new Date().toISOString(),
        };
        saveParticipantExperience(newRecord);
        setParticipantRecords(getParticipantExperiences());

        // Sync to Cloud SQL relational database
        fetch('/api/sql/experiences', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userUid: currentUser?.id,
            details,
            posts: data.items,
          }),
        }).catch((err) => console.warn('Cloud SQL experience sync:', err));

        setCurrentTab('dashboard');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        showToast(`✨ Generated ${data.items.length} social recap posts for “${details.eventName}”!`, 'success');
      } else {
        throw new Error('Invalid response structure received.');
      }
    } catch (err: any) {
      console.error('Participant experience generation error:', err);
      showToast('Could not complete generation. Please retry.', 'error');
    } finally {
      setIsGenerating(false);
    }
  };

  // Open saved participant record from passport
  const handleOpenSavedExperience = (record: ParticipantExperienceRecord) => {
    setActiveParticipantDetails(record.details);
    setGeneratedItems(record.posts);
    setActiveDetails({
      eventName: `${record.details.eventName} (My Experience)`,
      eventType: `${record.details.participantRole} · ${record.details.eventType}`,
      eventDate: record.details.eventDate,
      eventTime: 'Attendee Experience',
      venue: record.details.venue,
      organizer: record.details.organizer,
      description: record.details.projectOrHighlight,
      targetAudience: 'LinkedIn, Instagram & Community',
      tone: record.details.tone,
      selectedTypes: record.posts.map((i) => i.typeId),
    });
    setCurrentTab('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast(`Opened experience for “${record.details.eventName}”`, 'info');
  };

  // Delete participant experience record
  const handleDeleteParticipantRecord = (id: string) => {
    const updated = deleteParticipantExperience(id);
    setParticipantRecords(updated);
    showToast('Experience removed from Event Passport.', 'info');
  };

  return (
    <div
      className={`min-h-screen flex flex-col relative transition-colors duration-200 ${
        bgTheme === 'light' ? 'text-slate-900 light' : 'text-white dark'
      } selection:bg-rose-500 selection:text-white`}
    >
      {/* Background Style: Faithfully matching Reference Image 4 texture & depth */}
      <SocialMediaBackground theme={bgTheme} />

      {/* Toast Notification Container */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Login & Registration Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
        initialMode={authModalMode}
        initialRole={appMode}
      />

      {/* Cloud Database Inspector Modal */}
      <DatabaseInspectorModal
        isOpen={isDbInspectorOpen}
        onClose={() => setIsDbInspectorOpen(false)}
        isLight={bgTheme === 'light'}
      />

      {/* Top Bar Navigation with Role Switcher & Auth */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        hasActiveContent={generatedItems.length > 0}
        theme={bgTheme}
        onSelectTheme={setBgTheme}
        mode={appMode}
        onSelectMode={(newMode) => {
          setAppMode(newMode);
          if (newMode === 'organizer') {
            showToast('Switched to Event Organizer Mode 🏢', 'info');
          } else {
            showToast('Switched to Attendee / Participant Mode 🎓', 'info');
          }
        }}
        currentUser={currentUser}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
        onOpenDatabaseInspector={() => setIsDbInspectorOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* ORGANIZER TAB: Home Landing Page */}
        {currentTab === 'home' && (
          <Hero
            onStartCreating={() => {
              setCurrentTab('create');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onExploreTemplates={() => {
              setCurrentTab('templates');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onLoadDemoEvent={handleLoadDemoEvent}
            onCopyText={handleCopyText}
            onOpenMediaStudio={() => {
              setCurrentTab('media-studio');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            theme={bgTheme}
          />
        )}

        {/* MULTIMODAL MEDIA AI STUDIO (Image Upload + Post, Media Evaluator, Video Intelligence) */}
        {currentTab === 'media-studio' && (
          <MediaStudioView
            onCopyText={handleCopyText}
          />
        )}

        {/* ORGANIZER TAB: Create Event Content Form */}
        {currentTab === 'create' && (
          <CreateContentForm
            initialDetails={activeDetails}
            onSubmit={handleGenerateContent}
            isLoading={isGenerating}
            onApplySuggestion={(suggestion) => {
              showToast(`Applied smart requirement: “${suggestion.slice(0, 30)}...”`, 'info');
            }}
          />
        )}

        {/* REEL CREATOR STUDIO (Instagram, Facebook & LinkedIn) */}
        {currentTab === 'reels' && (
          <ReelCreatorView
            onCopyText={handleCopyText}
            userUid={currentUser?.id}
          />
        )}

        {/* SHARED RESULTS STUDIO: Content Dashboard (Event Copy & Participant Recaps) */}
        {currentTab === 'dashboard' && (
          <ContentDashboard
            details={activeDetails}
            items={generatedItems}
            onUpdateItemContent={handleUpdateItemContent}
            onRegenerateItem={handleRegenerateItem}
            onCopyText={handleCopyText}
            onCopyAll={handleCopyAll}
            onSaveToMyContent={handleSaveToMyContent}
            onCreateCampaign={() => {
              setCurrentTab('campaigns');
              if (!currentCampaign) {
                handleGenerateCampaign();
              }
            }}
            onEditDetails={() => {
              if (appMode === 'participant') {
                setCurrentTab('participant-create');
              } else {
                setCurrentTab('create');
              }
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            isRegeneratingId={isRegeneratingId}
          />
        )}

        {/* ORGANIZER TAB: 7-Day Campaign Generator */}
        {currentTab === 'campaigns' && (
          <CampaignView
            details={activeDetails}
            campaign={currentCampaign}
            isLoading={isCampaignLoading}
            onGenerateCampaign={handleGenerateCampaign}
            onCopyText={handleCopyText}
            onBackToDashboard={() => setCurrentTab('dashboard')}
            onUpdateCampaignDay={handleUpdateCampaignDay}
          />
        )}

        {/* ORGANIZER TAB: My Events History */}
        {currentTab === 'my-content' && (
          <MyContentList
            events={savedEvents}
            onOpenEvent={handleOpenSavedEvent}
            onEditEventDetails={handleEditSavedDetails}
            onDuplicateEvent={handleDuplicateSavedEvent}
            onDeleteEvent={handleDeleteSavedEvent}
            onStartNewEvent={() => {
              setCurrentTab('create');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* ORGANIZER TAB: Template Library */}
        {currentTab === 'templates' && (
          <TemplatesView onSelectTemplate={handleSelectTemplate} />
        )}

        {/* PARTICIPANT TAB: Explore Events Hub */}
        {currentTab === 'explore' && (
          <ExploreEventsView
            events={savedEvents}
            onSelectEventForExperience={handleSelectEventForExperience}
            onCustomExperience={() => {
              setActiveParticipantDetails({
                eventName: '',
                eventType: 'Hackathon / Conference',
                eventDate: 'Recently',
                venue: 'Main Campus',
                organizer: 'Organizing Committee',
                participantRole: 'Attendee',
                projectOrHighlight: '',
                keyLearnings: '',
                teamOrMentors: '',
                certificateOrPrize: '',
                tone: 'Exciting',
              });
              setCurrentTab('participant-create');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSwitchToOrganizer={() => {
              setAppMode('organizer');
              setCurrentTab('home');
              showToast('Switched to Event Organizer Mode 🏢', 'info');
            }}
          />
        )}

        {/* PARTICIPANT TAB: Share Experience Generator */}
        {currentTab === 'participant-create' && (
          <ParticipantExperienceForm
            initialData={activeParticipantDetails}
            onSubmit={handleGenerateExperience}
            isLoading={isGenerating}
            onCancel={() => setCurrentTab('explore')}
          />
        )}

        {/* PARTICIPANT TAB: My Event Passport & History */}
        {currentTab === 'passport' && (
          <ParticipantPassportView
            records={participantRecords}
            onOpenRecord={handleOpenSavedExperience}
            onDeleteRecord={handleDeleteParticipantRecord}
            onStartNewExperience={() => {
              setCurrentTab('participant-create');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onCopyText={handleCopyText}
          />
        )}

        {/* SHARED TAB: About & Architecture */}
        {currentTab === 'about' && (
          <AboutView
            onStartCreating={() => {
              if (appMode === 'participant') {
                setCurrentTab('participant-create');
              } else {
                setCurrentTab('create');
              }
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* Reference Design: Floating Frosted Glass Dock */}
      <FloatingGlassDock
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        mode={appMode}
        onSelectMode={(newMode) => {
          setAppMode(newMode);
          if (newMode === 'organizer') {
            showToast('Switched to Event Organizer Mode 🏢', 'info');
          } else {
            showToast('Switched to Attendee / Participant Mode 🎓', 'info');
          }
        }}
        currentUser={currentUser}
        onOpenAuth={handleOpenAuth}
        theme={bgTheme}
      />

      {/* Global Clean Footer */}
      <footer
        className={`border-t py-8 text-xs transition-colors duration-200 ${
          bgTheme === 'light'
            ? 'border-slate-200/80 bg-transparent text-slate-700'
            : 'border-white/10 bg-transparent text-slate-400'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className={`font-bold ${bgTheme === 'light' ? 'text-slate-900' : 'text-slate-300'}`}>
              AI Content Studio
            </span>
            <span>·</span>
            <span>Two Specialized Roles: Organizers & Attendees</span>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={() => {
                setAppMode('organizer');
                setCurrentTab('home');
              }}
              className={`transition-colors flex items-center gap-1 cursor-pointer ${
                appMode === 'organizer'
                  ? 'text-rose-500 font-bold'
                  : bgTheme === 'light'
                  ? 'hover:text-black'
                  : 'hover:text-slate-300'
              }`}
            >
              <Building className="w-3.5 h-3.5" />
              <span>Organizer Mode</span>
            </button>
            <button
              onClick={() => {
                setAppMode('participant');
                setCurrentTab('explore');
              }}
              className={`transition-colors flex items-center gap-1 cursor-pointer ${
                appMode === 'participant'
                  ? 'text-rose-500 font-bold'
                  : bgTheme === 'light'
                  ? 'hover:text-black'
                  : 'hover:text-slate-300'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Attendee Mode</span>
            </button>
            <button
              onClick={() => setCurrentTab('about')}
              className={`transition-colors cursor-pointer ${
                bgTheme === 'light' ? 'hover:text-black' : 'hover:text-slate-300'
              }`}
            >
              Architecture & About
            </button>
          </div>

          <div>Create Once · Post Everywhere</div>
        </div>
      </footer>
    </div>
  );
}
