export type ContentTone =
  | 'Professional'
  | 'Friendly'
  | 'Aesthetic'
  | 'Exciting'
  | 'Corporate'
  | 'College/Youth'
  | 'Traditional'
  | 'Minimal';

export type ContentTypeId =
  | 'instagram_caption'
  | 'instagram_post'
  | 'whatsapp_invitation'
  | 'linkedin_post'
  | 'twitter_post'
  | 'email_invitation'
  | 'poster_text'
  | 'event_announcement'
  | 'hashtags'
  | 'short_promo'
  // Attendee / Participant Experience Content Types
  | 'linkedin_experience'
  | 'instagram_experience'
  | 'twitter_experience'
  | 'organizer_shoutout'
  | 'project_showcase';

export interface ContentTypeMeta {
  id: ContentTypeId;
  label: string;
  category: 'social' | 'messaging' | 'marketing' | 'print' | 'participant';
  icon: string;
  characterLimit?: number;
  description: string;
}

export type AppMode = 'organizer' | 'participant' | 'creator';

// ==========================================
// USER ACCOUNTS & AUTH DEFINITIONS
// ==========================================
export interface UserAccount {
  id: string;
  name: string;
  email: string;
  password?: string;
  avatar?: string;
  role: AppMode; // 'organizer' | 'participant' | 'creator'
  organization?: string;
  collegeOrCompany?: string;
  bio?: string;
  createdAt: string;
}

export interface EventDetails {
  eventName: string;
  eventType: string;
  eventDate: string;
  eventTime: string;
  venue: string;
  organizer: string;
  description: string;
  targetAudience: string;
  registrationLink?: string;
  contactInfo?: string;
  additionalInfo?: string;
  tone: ContentTone;
  selectedTypes: ContentTypeId[];
  selectedSuggestions?: string[];
}

export interface GeneratedContentItem {
  id: string;
  typeId: ContentTypeId;
  title: string;
  content: string;
  lastUpdated: string;
  tone: ContentTone;
  isCustomized?: boolean;
}

export interface CampaignDay {
  dayNumber: number;
  dayTitle: string;
  stage: string;
  recommendedTiming: string;
  headline: string;
  postContent: string;
  suggestedPlatform: string;
  hashtags: string[];
}

export interface EventCampaign {
  id: string;
  eventName: string;
  campaignTitle: string;
  overview: string;
  days: CampaignDay[];
  createdAt: string;
}

export interface SavedEventRecord {
  id: string;
  name: string;
  date: string;
  createdAt: string;
  details: EventDetails;
  generatedItems: GeneratedContentItem[];
  campaign?: EventCampaign;
  isPublishedForAttendees?: boolean;
}

export type RegenerationStyle =
  | 'more_professional'
  | 'more_creative'
  | 'shorter'
  | 'more_engaging'
  | 'more_aesthetic'
  | 'add_emojis'
  | 'remove_emojis';

export interface SmartSuggestion {
  id: string;
  title: string;
  description: string;
  badge: string;
  promptSnippet: string;
}

export interface EventTemplate {
  id: string;
  name: string;
  category: string;
  icon: string;
  summary: string;
  details: Partial<EventDetails>;
}

// ==========================================
// PARTICIPANT / ATTENDEE ROLE DEFINITIONS
// ==========================================
export type ParticipantRole =
  | 'Attendee'
  | 'Hackathon Participant'
  | 'Winner / Awardee'
  | 'Project Builder'
  | 'Speaker / Panelist'
  | 'Volunteer / Organizer Staff';

export interface ParticipantDetails {
  eventName: string;
  eventType: string;
  eventDate: string;
  venue: string;
  organizer: string;
  participantRole: ParticipantRole;
  projectOrHighlight: string;
  keyLearnings: string;
  teamOrMentors?: string;
  certificateOrPrize?: string;
  tone: ContentTone;
}

export interface ParticipantExperienceRecord {
  id: string;
  eventId?: string;
  details: ParticipantDetails;
  posts: GeneratedContentItem[];
  createdAt: string;
}

// ==========================================
// REEL & VIRAL SHORT VIDEO DEFINITIONS
// ==========================================
export type ReelPlatform = 'instagram' | 'facebook' | 'linkedin';

export interface ReelRequest {
  topic: string;
  platforms: ReelPlatform[];
  targetAge: '16-24' | '25-34' | '35-49' | 'all';
  tone?: string;
  duration?: '15s' | '30s' | '60s';
  goal?: string; // 'Virality & Reach' | 'Audience Conversion' | 'Educational / Authority' | 'Event Hype'
}

export interface ReelScene {
  timeframe: string; // e.g. "0:00 - 0:03"
  visual: string; // "Close-up of laptop typing + text pop-up"
  narration: string; // "Stop doing hackathons the wrong way..."
  onScreenText: string; // "3 HACKATHON SECRETS 🤫"
}

export interface ReelResponse {
  id?: number | string;
  title: string;
  hook: string;
  hookVariations: string[];
  scenes: ReelScene[];
  fullVoiceover: string;
  caption: string;
  callToAction: string;
  audienceAnalysis: {
    ageGroup: string;
    psychologicalTriggers: string[];
    corePainPoints: string[];
    whyThisFormatWorks: string;
  };
  seoRanking: {
    primaryKeywords: string[];
    trendingHashtags: string[];
    nicheHashtags: string[];
    broadHashtags: string[];
    algorithmRankingTips: string[];
  };
  bestPublishTimes: {
    instagram: string;
    facebook: string;
    linkedin: string;
    peakDays: string[];
    timingExplanation: string;
  };
  creatorSuggestions: {
    audioRecommendation: string;
    pacingAndFraming: string;
    retentionScore: number;
  };
}

// ==========================================
// MEDIA AI STUDIO DEFINITIONS (3 Core Features)
// ==========================================

export interface ImageAnalysisResult {
  visualDetails: {
    description: string;
    detectedObjects: string[];
    dominantColors: string[];
    mood: string;
    detectedText?: string;
    keyThemes: string[];
  };
  postContent: {
    hook: string;
    caption: string;
    shortCaption: string;
    callToAction: string;
    hashtags: string[];
    keywords: string[];
    emojis: string[];
  };
}

export interface MediaItemAnalysis {
  id: string;
  name: string;
  type: 'image' | 'video';
  thumbnailUrl?: string;
  score: number; // 0 - 100
  role: 'main' | 'supporting';
  strengths: string[];
  weaknesses: string[];
  recommendedPlacement: string;
}

export interface MediaRecommendationResult {
  bestMediaId: string;
  bestMediaName: string;
  bestMediaType: 'image' | 'video';
  mainMediaRationale: string;
  supportingMediaRoles: {
    mediaId: string;
    mediaName: string;
    recommendedRole: string;
    whySupporting: string;
  }[];
  comparativeAnalysis: string;
  mediaItems: MediaItemAnalysis[];
  option1: {
    title: string;
    angle: string;
    hook: string;
    caption: string;
    shortCaption: string;
    callToAction: string;
    hashtags: string[];
  };
  option2: {
    title: string;
    angle: string;
    hook: string;
    caption: string;
    shortCaption: string;
    callToAction: string;
    hashtags: string[];
  };
}

export interface VideoAnalysisResult {
  visualAnalysis: {
    visuals: string;
    objects: string[];
    people: {
      count: string;
      description: string;
      expressions: string;
    };
    products: string[];
    scenes: {
      timestamp: string;
      description: string;
    }[];
    visibleText: string[];
    importantMoments: {
      timestamp: string;
      title: string;
      description: string;
    }[];
    context: string;
  };
  audioSpeechAnalysis: {
    hasAudioOrSpeech: boolean;
    extractedSpeech: string;
    spokenInformation: string;
    importantDetails: string[];
    mainTopic: string;
    toneAndDelivery: string;
  };
  combinedSynthesis: string;
  option1: {
    title: string;
    angle: string;
    hook: string;
    caption: string;
    shortCaption: string;
    callToAction: string;
    hashtags: string[];
    keyHighlights: string[];
  };
  option2: {
    title: string;
    angle: string;
    hook: string;
    caption: string;
    shortCaption: string;
    callToAction: string;
    hashtags: string[];
    keyHighlights: string[];
  };
}

