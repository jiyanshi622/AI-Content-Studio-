import { db } from './index.ts';
import {
  users,
  events,
  generatedItems,
  participantExperiences,
  experiencePosts,
  reels,
} from './schema.ts';
import { eq, desc } from 'drizzle-orm';
import { EventDetails, GeneratedContentItem, ParticipantDetails } from '../types.ts';
import { adminFirestore } from '../lib/firebase-admin.ts';

// In-memory fallback cache to ensure zero crashes and blazing-fast local caching
const memoryStore = {
  users: new Map<string, any>(),
  events: new Map<number | string, any>(),
  eventItems: new Map<number | string, any[]>(),
  experiences: new Map<number | string, any>(),
  experiencePosts: new Map<number | string, any[]>(),
  reels: new Map<number | string, any>(),
  nextId: 100,
};

// Seed initial default user
memoryStore.users.set('default-organizer-uid', {
  id: 1,
  uid: 'default-organizer-uid',
  email: 'organizer@aicontent.studio',
  name: 'Creative Studio Organizer',
  role: 'organizer',
  organization: 'Creator Hub India',
  collegeOrCompany: 'Digital Media Collective',
  bio: 'Empowering digital storytellers across India',
  createdAt: new Date().toISOString(),
});

// Seed default events
memoryStore.events.set(1, {
  id: 1,
  userId: 1,
  eventName: 'India Creator Summit 2026',
  eventType: 'Conference & Masterclass',
  eventDate: 'October 15, 2026',
  eventTime: '10:00 AM - 6:00 PM IST',
  venue: 'Jio World Convention Centre, Mumbai',
  organizer: 'National Creators Guild',
  description: 'Annual gathering of over 1,500 digital creators, comedians, podcasters, and brand leaders.',
  targetAudience: 'Content Creators, Influencers, Marketers, Students',
  registrationLink: 'https://creatorsummit.in/register',
  contactInfo: 'hello@creatorsummit.in',
  additionalInfo: 'Featuring keynote masterclasses by top Indian digital creators.',
  tone: 'Inspirational & High-Energy',
  selectedTypes: JSON.stringify(['instagram_caption', 'linkedin_post', 'whatsapp_invitation']),
  isPublished: true,
  createdAt: new Date().toISOString(),
});

// User helper
export async function getOrCreateUser(params: {
  uid: string;
  email: string;
  name: string;
  role: 'organizer' | 'participant';
  organization?: string;
  collegeOrCompany?: string;
}) {
  if (db) {
    try {
      const result = await db
        .insert(users)
        .values({
          uid: params.uid,
          email: params.email,
          name: params.name || 'User',
          role: params.role || 'organizer',
          organization: params.organization,
          collegeOrCompany: params.collegeOrCompany,
        })
        .onConflictDoUpdate({
          target: users.uid,
          set: {
            email: params.email,
            name: params.name,
            role: params.role,
            organization: params.organization,
            collegeOrCompany: params.collegeOrCompany,
          },
        })
        .returning();

      return result[0];
    } catch (error) {
      console.warn('SQL query failed in getOrCreateUser, falling back to Firestore/Memory:', error);
    }
  }

  // Firestore & Memory Store
  const existing = memoryStore.users.get(params.uid);
  const userRecord = {
    id: existing?.id || ++memoryStore.nextId,
    uid: params.uid,
    email: params.email,
    name: params.name || 'User',
    role: params.role || 'organizer',
    organization: params.organization || '',
    collegeOrCompany: params.collegeOrCompany || '',
    bio: existing?.bio || '',
    createdAt: existing?.createdAt || new Date().toISOString(),
  };

  memoryStore.users.set(params.uid, userRecord);

  if (adminFirestore) {
    try {
      await adminFirestore.collection('users').doc(params.uid).set(userRecord, { merge: true });
    } catch (err) {
      console.warn('Firestore write warning:', err);
    }
  }

  return userRecord;
}

export async function getUserByUid(uid: string) {
  if (db) {
    try {
      const found = await db.select().from(users).where(eq(users.uid, uid));
      if (found.length > 0) return found[0];
    } catch (error) {
      console.warn('SQL query failed in getUserByUid, falling back to Firestore/Memory:', error);
    }
  }

  if (memoryStore.users.has(uid)) {
    return memoryStore.users.get(uid);
  }

  if (adminFirestore) {
    try {
      const doc = await adminFirestore.collection('users').doc(uid).get();
      if (doc.exists) {
        const data = doc.data();
        memoryStore.users.set(uid, data);
        return data;
      }
    } catch (err) {
      console.warn('Firestore read warning:', err);
    }
  }

  return null;
}

export async function getAllUsers() {
  if (db) {
    try {
      return await db.select({
        id: users.id,
        uid: users.uid,
        email: users.email,
        name: users.name,
        role: users.role,
        organization: users.organization,
        collegeOrCompany: users.collegeOrCompany,
        bio: users.bio,
        createdAt: users.createdAt,
      }).from(users);
    } catch (error) {
      console.warn('SQL query failed in getAllUsers, falling back to Firestore/Memory:', error);
    }
  }

  if (adminFirestore) {
    try {
      const snapshot = await adminFirestore.collection('users').get();
      if (!snapshot.empty) {
        return snapshot.docs.map((doc: any) => doc.data());
      }
    } catch (err) {
      console.warn('Firestore read warning in getAllUsers:', err);
    }
  }

  return Array.from(memoryStore.users.values());
}

// Organizer Events in Cloud SQL & Firestore
export async function createEventWithItems(
  userId: number,
  details: EventDetails,
  items: GeneratedContentItem[]
) {
  if (db) {
    try {
      const newEvent = await db
        .insert(events)
        .values({
          userId,
          eventName: details.eventName,
          eventType: details.eventType,
          eventDate: details.eventDate,
          eventTime: details.eventTime,
          venue: details.venue,
          organizer: details.organizer,
          description: details.description,
          targetAudience: details.targetAudience,
          registrationLink: details.registrationLink,
          contactInfo: details.contactInfo,
          additionalInfo: details.additionalInfo,
          tone: details.tone,
          selectedTypes: JSON.stringify(details.selectedTypes || []),
        })
        .returning();

      const createdEvent = newEvent[0];

      if (items && items.length > 0) {
        await db.insert(generatedItems).values(
          items.map((item) => ({
            eventId: createdEvent.id,
            typeId: item.typeId,
            title: item.title,
            content: item.content,
            tone: item.tone,
            isCustomized: item.isCustomized || false,
          }))
        );
      }

      return createdEvent;
    } catch (error) {
      console.warn('SQL query failed in createEventWithItems, falling back to Firestore/Memory:', error);
    }
  }

  const eventId = ++memoryStore.nextId;
  const eventRecord = {
    id: eventId,
    userId,
    eventName: details.eventName,
    eventType: details.eventType,
    eventDate: details.eventDate,
    eventTime: details.eventTime || '',
    venue: details.venue,
    organizer: details.organizer,
    description: details.description || '',
    targetAudience: details.targetAudience || '',
    registrationLink: details.registrationLink || '',
    contactInfo: details.contactInfo || '',
    additionalInfo: details.additionalInfo || '',
    tone: details.tone || 'Exciting',
    selectedTypes: JSON.stringify(details.selectedTypes || []),
    isPublished: true,
    createdAt: new Date().toISOString(),
  };

  memoryStore.events.set(eventId, eventRecord);
  if (items && items.length > 0) {
    memoryStore.eventItems.set(eventId, items);
  }

  if (adminFirestore) {
    try {
      await adminFirestore.collection('events').doc(String(eventId)).set(eventRecord);
    } catch (err) {
      console.warn('Firestore write warning for event:', err);
    }
  }

  return eventRecord;
}

export async function getAllEvents() {
  if (db) {
    try {
      return await db.select().from(events).orderBy(desc(events.createdAt));
    } catch (error) {
      console.warn('SQL query failed in getAllEvents, falling back to Firestore/Memory:', error);
    }
  }

  if (adminFirestore) {
    try {
      const snap = await adminFirestore.collection('events').get();
      if (!snap.empty) {
        const eventsList = snap.docs.map((d: any) => d.data());
        eventsList.forEach((e: any) => memoryStore.events.set(e.id, e));
        return eventsList;
      }
    } catch (err) {
      console.warn('Firestore read warning in getAllEvents:', err);
    }
  }

  return Array.from(memoryStore.events.values()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function getEventsByUser(userId: number) {
  if (db) {
    try {
      return await db
        .select()
        .from(events)
        .where(eq(events.userId, userId))
        .orderBy(desc(events.createdAt));
    } catch (error) {
      console.warn('SQL query failed in getEventsByUser, falling back to Firestore/Memory:', error);
    }
  }

  return Array.from(memoryStore.events.values())
    .filter((e) => e.userId === userId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getEventItems(eventId: number) {
  if (db) {
    try {
      return await db
        .select()
        .from(generatedItems)
        .where(eq(generatedItems.eventId, eventId));
    } catch (error) {
      console.warn('SQL query failed in getEventItems, falling back to Firestore/Memory:', error);
    }
  }

  return memoryStore.eventItems.get(eventId) || [];
}

// Participant Experience
export async function createExperienceWithPosts(
  userId: number,
  details: ParticipantDetails,
  posts: GeneratedContentItem[]
) {
  if (db) {
    try {
      const newExp = await db
        .insert(participantExperiences)
        .values({
          userId,
          eventName: details.eventName,
          eventType: details.eventType,
          eventDate: details.eventDate,
          venue: details.venue,
          organizer: details.organizer,
          participantRole: details.participantRole,
          projectOrHighlight: details.projectOrHighlight,
          keyLearnings: details.keyLearnings,
          teamOrMentors: details.teamOrMentors,
          certificateOrPrize: details.certificateOrPrize,
          tone: details.tone,
        })
        .returning();

      const createdExp = newExp[0];

      if (posts && posts.length > 0) {
        await db.insert(experiencePosts).values(
          posts.map((post) => ({
            experienceId: createdExp.id,
            typeId: post.typeId,
            title: post.title,
            content: post.content,
            tone: post.tone,
          }))
        );
      }

      return createdExp;
    } catch (error) {
      console.warn('SQL query failed in createExperienceWithPosts, falling back to Firestore/Memory:', error);
    }
  }

  const expId = ++memoryStore.nextId;
  const expRecord = {
    id: expId,
    userId,
    eventName: details.eventName,
    eventType: details.eventType,
    eventDate: details.eventDate,
    venue: details.venue,
    organizer: details.organizer,
    participantRole: details.participantRole,
    projectOrHighlight: details.projectOrHighlight,
    keyLearnings: details.keyLearnings,
    teamOrMentors: details.teamOrMentors || '',
    certificateOrPrize: details.certificateOrPrize || '',
    tone: details.tone || 'Exciting',
    createdAt: new Date().toISOString(),
  };

  memoryStore.experiences.set(expId, expRecord);
  if (posts && posts.length > 0) {
    memoryStore.experiencePosts.set(expId, posts);
  }

  if (adminFirestore) {
    try {
      await adminFirestore.collection('participantExperiences').doc(String(expId)).set(expRecord);
    } catch (err) {
      console.warn('Firestore write warning for experience:', err);
    }
  }

  return expRecord;
}

export async function getAllParticipantExperiences() {
  if (db) {
    try {
      return await db
        .select()
        .from(participantExperiences)
        .orderBy(desc(participantExperiences.createdAt));
    } catch (error) {
      console.warn('SQL query failed in getAllParticipantExperiences, falling back to Firestore/Memory:', error);
    }
  }

  return Array.from(memoryStore.experiences.values()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function getParticipantExperiencesByUser(userId: number) {
  if (db) {
    try {
      return await db
        .select()
        .from(participantExperiences)
        .where(eq(participantExperiences.userId, userId))
        .orderBy(desc(participantExperiences.createdAt));
    } catch (error) {
      console.warn('SQL query failed in getParticipantExperiencesByUser, falling back to Firestore/Memory:', error);
    }
  }

  return Array.from(memoryStore.experiences.values())
    .filter((e) => e.userId === userId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getExperiencePosts(experienceId: number) {
  if (db) {
    try {
      return await db
        .select()
        .from(experiencePosts)
        .where(eq(experiencePosts.experienceId, experienceId));
    } catch (error) {
      console.warn('SQL query failed in getExperiencePosts, falling back to Firestore/Memory:', error);
    }
  }

  return memoryStore.experiencePosts.get(experienceId) || [];
}

// Reels in Cloud SQL & Firestore
export async function createReel(data: {
  userId?: number;
  title: string;
  topic: string;
  platforms: string;
  targetAge: string;
  hook: string;
  script: string;
  caption: string;
  callToAction: string;
  audienceAnalysis: string;
  seoKeywords: string;
  hashtags: string;
  bestPublishTimes: string;
  retentionTips?: string;
  tone?: string;
}) {
  if (db) {
    try {
      const res = await db
        .insert(reels)
        .values({
          userId: data.userId || null,
          title: data.title,
          topic: data.topic,
          platforms: data.platforms,
          targetAge: data.targetAge,
          hook: data.hook,
          script: data.script,
          caption: data.caption,
          callToAction: data.callToAction,
          audienceAnalysis: data.audienceAnalysis,
          seoKeywords: data.seoKeywords,
          hashtags: data.hashtags,
          bestPublishTimes: data.bestPublishTimes,
          retentionTips: data.retentionTips || null,
          tone: data.tone || 'High-Energy & Viral',
        })
        .returning();

      return res[0];
    } catch (error) {
      console.warn('SQL query failed in createReel, falling back to Firestore/Memory:', error);
    }
  }

  const reelId = ++memoryStore.nextId;
  const reelRecord = {
    id: reelId,
    userId: data.userId || null,
    title: data.title,
    topic: data.topic,
    platforms: data.platforms,
    targetAge: data.targetAge,
    hook: data.hook,
    script: data.script,
    caption: data.caption,
    callToAction: data.callToAction,
    audienceAnalysis: data.audienceAnalysis,
    seoKeywords: data.seoKeywords,
    hashtags: data.hashtags,
    bestPublishTimes: data.bestPublishTimes,
    retentionTips: data.retentionTips || '',
    tone: data.tone || 'High-Energy & Viral',
    createdAt: new Date().toISOString(),
  };

  memoryStore.reels.set(reelId, reelRecord);

  if (adminFirestore) {
    try {
      await adminFirestore.collection('reels').doc(String(reelId)).set(reelRecord);
    } catch (err) {
      console.warn('Firestore write warning for reel:', err);
    }
  }

  return reelRecord;
}

export async function getAllReels() {
  if (db) {
    try {
      return await db.select().from(reels).orderBy(desc(reels.createdAt));
    } catch (error) {
      console.warn('SQL query failed in getAllReels, falling back to Firestore/Memory:', error);
    }
  }

  if (adminFirestore) {
    try {
      const snap = await adminFirestore.collection('reels').get();
      if (!snap.empty) {
        return snap.docs.map((d: any) => d.data());
      }
    } catch (err) {
      console.warn('Firestore read warning in getAllReels:', err);
    }
  }

  return Array.from(memoryStore.reels.values()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function getReelById(id: number) {
  if (db) {
    try {
      const res = await db.select().from(reels).where(eq(reels.id, id));
      if (res.length > 0) return res[0];
    } catch (error) {
      console.warn('SQL query failed in getReelById, falling back to Firestore/Memory:', error);
    }
  }

  return memoryStore.reels.get(id) || null;
}
