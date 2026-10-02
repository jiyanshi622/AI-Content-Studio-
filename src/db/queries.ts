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

// User helper
export async function getOrCreateUser(params: {
  uid: string;
  email: string;
  name: string;
  role: 'organizer' | 'participant';
  organization?: string;
  collegeOrCompany?: string;
}) {
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
    console.error('Database query failed in getOrCreateUser:', error);
    throw new Error('Failed to retrieve or create user in database.', { cause: error });
  }
}

export async function getUserByUid(uid: string) {
  try {
    const found = await db.select().from(users).where(eq(users.uid, uid));
    return found[0] || null;
  } catch (error) {
    console.error('Database query failed in getUserByUid:', error);
    throw new Error('Failed to fetch user by UID.', { cause: error });
  }
}

export async function getAllUsers() {
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
    console.error('Database query failed in getAllUsers:', error);
    throw new Error('Failed to fetch users from database.', { cause: error });
  }
}

// Organizer Events in Cloud SQL
export async function createEventWithItems(
  userId: number,
  details: EventDetails,
  items: GeneratedContentItem[]
) {
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
    console.error('Database query failed in createEventWithItems:', error);
    throw new Error('Failed to store event in database.', { cause: error });
  }
}

export async function getAllEvents() {
  try {
    return await db.select().from(events).orderBy(desc(events.createdAt));
  } catch (error) {
    console.error('Database query failed in getAllEvents:', error);
    throw new Error('Failed to fetch events from database.', { cause: error });
  }
}

export async function getEventsByUser(userId: number) {
  try {
    return await db
      .select()
      .from(events)
      .where(eq(events.userId, userId))
      .orderBy(desc(events.createdAt));
  } catch (error) {
    console.error('Database query failed in getEventsByUser:', error);
    throw new Error('Failed to fetch user events.', { cause: error });
  }
}

export async function getEventItems(eventId: number) {
  try {
    return await db
      .select()
      .from(generatedItems)
      .where(eq(generatedItems.eventId, eventId));
  } catch (error) {
    console.error('Database query failed in getEventItems:', error);
    throw new Error('Failed to fetch event generated deliverables.', { cause: error });
  }
}

// Participant Experience in Cloud SQL
export async function createExperienceWithPosts(
  userId: number,
  details: ParticipantDetails,
  posts: GeneratedContentItem[]
) {
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
    console.error('Database query failed in createExperienceWithPosts:', error);
    throw new Error('Failed to store attendee experience in database.', { cause: error });
  }
}

export async function getAllParticipantExperiences() {
  try {
    return await db
      .select()
      .from(participantExperiences)
      .orderBy(desc(participantExperiences.createdAt));
  } catch (error) {
    console.error('Database query failed in getAllParticipantExperiences:', error);
    throw new Error('Failed to fetch participant experiences from database.', { cause: error });
  }
}

export async function getParticipantExperiencesByUser(userId: number) {
  try {
    return await db
      .select()
      .from(participantExperiences)
      .where(eq(participantExperiences.userId, userId))
      .orderBy(desc(participantExperiences.createdAt));
  } catch (error) {
    console.error('Database query failed in getParticipantExperiencesByUser:', error);
    throw new Error('Failed to fetch user participant experiences.', { cause: error });
  }
}

export async function getExperiencePosts(experienceId: number) {
  try {
    return await db
      .select()
      .from(experiencePosts)
      .where(eq(experiencePosts.experienceId, experienceId));
  } catch (error) {
    console.error('Database query failed in getExperiencePosts:', error);
    throw new Error('Failed to fetch posts for experience.', { cause: error });
  }
}

// Reels in Cloud SQL
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
    console.error('Database query failed in createReel:', error);
    throw new Error('Failed to store reel in Cloud SQL database.', { cause: error });
  }
}

export async function getAllReels() {
  try {
    return await db.select().from(reels).orderBy(desc(reels.createdAt));
  } catch (error) {
    console.error('Database query failed in getAllReels:', error);
    throw new Error('Failed to fetch reels from database.', { cause: error });
  }
}

export async function getReelById(id: number) {
  try {
    const res = await db.select().from(reels).where(eq(reels.id, id));
    return res[0] || null;
  } catch (error) {
    console.error('Database query failed in getReelById:', error);
    throw new Error('Failed to fetch reel by ID.', { cause: error });
  }
}
