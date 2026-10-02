import { SavedEventRecord, ParticipantExperienceRecord } from '../types';
import { SAMPLE_SAVED_EVENTS } from '../data/sampleEvents';

const STORAGE_KEY = 'ai_content_studio_saved_events_v1';
const PARTICIPANT_STORAGE_KEY = 'ai_content_studio_participant_experiences_v1';

export const SAMPLE_PARTICIPANT_EXPERIENCES: ParticipantExperienceRecord[] = [
  {
    id: 'exp-sample-1',
    eventId: 'event-sample-1',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    details: {
      eventName: 'College Tech Fest 2026',
      eventType: 'Hackathon & Tech Fest',
      eventDate: 'April 18-19, 2026',
      venue: 'Main Auditorium & CS Labs',
      organizer: 'College Student Tech Board',
      participantRole: 'Winner / Awardee',
      projectOrHighlight: 'Built an AI-powered accessibility tool for neurodivergent students in 24 hours',
      keyLearnings: 'Fast-paced agile development, prompt engineering, edge AI optimization, and pitching to industry leaders',
      teamOrMentors: 'Proud of our team @DevCrew and huge thanks to mentors @SarahAI for late-night guidance',
      certificateOrPrize: '1st Place Winner — Best AI Innovation Award 🏆',
      tone: 'Exciting',
    },
    posts: [
      {
        id: 'post-exp-1',
        typeId: 'linkedin_experience',
        title: 'LinkedIn Professional Recap',
        tone: 'Exciting',
        lastUpdated: new Date().toISOString(),
        content: `Excited and humbled to share that our team took 1st Place at College Tech Fest 2026! 🏆🚀\n\nOver an intense 24-hour sprint, we built "NeuroBridge" — an AI accessibility copilot designed to empower neurodivergent students with real-time audio and comprehension support.\n\nKey takeaways from the hackathon:\n1. Problem-First Thinking: Technology is only as good as the human pain point it resolves.\n2. Iteration Speed: Shipping a functional prototype under pressure forces crystal-clear prioritization.\n3. Mentorship & Community: The feedback from industry judges helped us refine our architecture in real time.\n\nHuge shoutout to the College Student Tech Board for putting together an incredible experience, and immense gratitude to my teammates and mentors!\n\nCan't wait to continue building on this solution.\n\n#HackathonWinner #AIInnovation #EdTech #Accessibility #StudentDevs #CollegeTechFest2026`,
      },
      {
        id: 'post-exp-2',
        typeId: 'instagram_experience',
        title: 'Instagram Photo Dump & Story Caption',
        tone: 'Exciting',
        lastUpdated: new Date().toISOString(),
        content: `24 hours, infinite cups of coffee, zero sleep, and 1ST PLACE at College Tech Fest 2026!! 🏆✨\n\nStill processing this crazy weekend! We hacked together an AI accessibility platform from scratch, battled endless bugs at 4 AM, and pitched on the main stage.\n\nForever grateful to our dream team and the amazing organizers. Swipe to see the chaos → celebration! 📸🚀\n\n#TechFest2026 #HackathonLife #Winners #CodeSprint #CollegeMemories #DevLife`,
      },
      {
        id: 'post-exp-3',
        typeId: 'twitter_experience',
        title: 'X (Twitter) Project & Takeaways Thread',
        tone: 'Exciting',
        lastUpdated: new Date().toISOString(),
        content: `Just won 1st Place at College Tech Fest 2026! 🏆\n\nWe built "NeuroBridge" in 24 hours — an assistive AI engine for students. Here's what we learned building on zero sleep: 🧵👇\n\n1/ Simplicity beats complexity every time.\n2/ Edge inference cut our latency by 80%.\n3/ Shoutout to @CollegeTechFest for an incredible event! 🔥`,
      },
      {
        id: 'post-exp-4',
        typeId: 'organizer_shoutout',
        title: 'Thank You & Organizer Appreciation Note',
        tone: 'Friendly',
        lastUpdated: new Date().toISOString(),
        content: `A heartfelt thank you to College Student Tech Board and all the volunteers behind College Tech Fest 2026! 👏\n\nFrom seamless check-ins to mentorship support and delicious late-night snacks, you created an inspiring space for creators and students to push boundaries. Thank you for championing youth innovation! ✨`,
      },
    ],
  },
];

export function getSavedEvents(): SavedEventRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Initialize with sample events
      localStorage.setItem(STORAGE_KEY, JSON.stringify(SAMPLE_SAVED_EVENTS));
      return SAMPLE_SAVED_EVENTS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : SAMPLE_SAVED_EVENTS;
  } catch (err) {
    console.error('Error reading saved events:', err);
    return SAMPLE_SAVED_EVENTS;
  }
}

export function saveEventRecord(record: SavedEventRecord): void {
  try {
    const existing = getSavedEvents();
    const index = existing.findIndex((e) => e.id === record.id);
    let updated: SavedEventRecord[];
    if (index >= 0) {
      updated = [...existing];
      updated[index] = record;
    } else {
      updated = [record, ...existing];
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Error saving event record:', err);
  }
}

export function deleteEventRecord(id: string): SavedEventRecord[] {
  try {
    const existing = getSavedEvents();
    const updated = existing.filter((e) => e.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Error deleting event record:', err);
    return getSavedEvents();
  }
}

export function duplicateEventRecord(id: string): SavedEventRecord | null {
  try {
    const existing = getSavedEvents();
    const target = existing.find((e) => e.id === id);
    if (!target) return null;

    const duplicated: SavedEventRecord = {
      ...target,
      id: `saved-${Date.now()}`,
      name: `${target.name} (Copy)`,
      createdAt: new Date().toISOString(),
      details: {
        ...target.details,
        eventName: `${target.details.eventName} (Copy)`,
      },
      generatedItems: target.generatedItems.map((item, idx) => ({
        ...item,
        id: `item-${Date.now()}-${idx}`,
      })),
    };

    const updated = [duplicated, ...existing];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return duplicated;
  } catch (err) {
    console.error('Error duplicating event record:', err);
    return null;
  }
}

// ==========================================
// PARTICIPANT EXPERIENCES STORAGE
// ==========================================

export function getParticipantExperiences(): ParticipantExperienceRecord[] {
  try {
    const raw = localStorage.getItem(PARTICIPANT_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(
        PARTICIPANT_STORAGE_KEY,
        JSON.stringify(SAMPLE_PARTICIPANT_EXPERIENCES)
      );
      return SAMPLE_PARTICIPANT_EXPERIENCES;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : SAMPLE_PARTICIPANT_EXPERIENCES;
  } catch (err) {
    console.error('Error reading participant experiences:', err);
    return SAMPLE_PARTICIPANT_EXPERIENCES;
  }
}

export function saveParticipantExperience(record: ParticipantExperienceRecord): void {
  try {
    const existing = getParticipantExperiences();
    const index = existing.findIndex((e) => e.id === record.id);
    let updated: ParticipantExperienceRecord[];
    if (index >= 0) {
      updated = [...existing];
      updated[index] = record;
    } else {
      updated = [record, ...existing];
    }
    localStorage.setItem(PARTICIPANT_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Error saving participant experience:', err);
  }
}

export function deleteParticipantExperience(id: string): ParticipantExperienceRecord[] {
  try {
    const existing = getParticipantExperiences();
    const updated = existing.filter((e) => e.id !== id);
    localStorage.setItem(PARTICIPANT_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Error deleting participant experience:', err);
    return getParticipantExperiences();
  }
}
