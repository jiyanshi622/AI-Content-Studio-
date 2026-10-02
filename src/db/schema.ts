import { relations } from 'drizzle-orm';
import { boolean, integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

// Users table (holds both Event Organizers and Participants/Attendees/Creators)
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(), // Firebase Auth UID
  email: text('email').notNull(),
  name: text('name').notNull().default('User'),
  role: text('role').notNull().default('organizer'), // 'organizer' | 'participant'
  organization: text('organization'),
  collegeOrCompany: text('college_or_company'),
  bio: text('bio'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Events conducted by Organizers
export const events = pgTable('events', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .references(() => users.id)
    .notNull(),
  eventName: text('event_name').notNull(),
  eventType: text('event_type').notNull(),
  eventDate: text('event_date').notNull(),
  eventTime: text('event_time'),
  venue: text('venue').notNull(),
  organizer: text('organizer').notNull(),
  description: text('description'),
  targetAudience: text('target_audience'),
  registrationLink: text('registration_link'),
  contactInfo: text('contact_info'),
  additionalInfo: text('additional_info'),
  tone: text('tone').default('Exciting'),
  selectedTypes: text('selected_types'),
  isPublished: boolean('is_published').default(true),
  createdAt: timestamp('created_at').defaultNow(),
});

// Generated social deliverables for an organizer event
export const generatedItems = pgTable('generated_items', {
  id: serial('id').primaryKey(),
  eventId: integer('event_id')
    .references(() => events.id, { onDelete: 'cascade' })
    .notNull(),
  typeId: text('type_id').notNull(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  tone: text('tone'),
  isCustomized: boolean('is_customized').default(false),
  createdAt: timestamp('created_at').defaultNow(),
});

// Participant experiences (events attended by users)
export const participantExperiences = pgTable('participant_experiences', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .references(() => users.id)
    .notNull(),
  eventName: text('event_name').notNull(),
  eventType: text('event_type').notNull(),
  eventDate: text('event_date').notNull(),
  venue: text('venue').notNull(),
  organizer: text('organizer').notNull(),
  participantRole: text('participant_role').notNull(),
  projectOrHighlight: text('project_or_highlight').notNull(),
  keyLearnings: text('key_learnings').notNull(),
  teamOrMentors: text('team_or_mentors'),
  certificateOrPrize: text('certificate_or_prize'),
  tone: text('tone').default('Exciting'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Generated social posts for a participant experience
export const experiencePosts = pgTable('experience_posts', {
  id: serial('id').primaryKey(),
  experienceId: integer('experience_id')
    .references(() => participantExperiences.id, { onDelete: 'cascade' })
    .notNull(),
  typeId: text('type_id').notNull(),
  title: text('title').notNull(),
  content: text('content').notNull(),
  tone: text('tone'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Reel & Short Video Content (Instagram Reels, Facebook Reels, LinkedIn Video)
export const reels = pgTable('reels', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  title: text('title').notNull(),
  topic: text('topic').notNull(),
  platforms: text('platforms').notNull(), // 'instagram,facebook,linkedin'
  targetAge: text('target_age').notNull(), // '16-24', '25-34', '35-49', 'all'
  hook: text('hook').notNull(),
  script: text('script').notNull(), // Scene-by-scene visual + narration script
  caption: text('caption').notNull(),
  callToAction: text('call_to_action').notNull(),
  audienceAnalysis: text('audience_analysis').notNull(),
  seoKeywords: text('seo_keywords').notNull(),
  hashtags: text('hashtags').notNull(),
  bestPublishTimes: text('best_publish_times').notNull(),
  retentionTips: text('retention_tips'),
  tone: text('tone').default('High-Energy & Viral'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  events: many(events),
  experiences: many(participantExperiences),
  reels: many(reels),
}));

export const eventsRelations = relations(events, ({ one, many }) => ({
  author: one(users, {
    fields: [events.userId],
    references: [users.id],
  }),
  items: many(generatedItems),
}));

export const generatedItemsRelations = relations(generatedItems, ({ one }) => ({
  event: one(events, {
    fields: [generatedItems.eventId],
    references: [events.id],
  }),
}));

export const participantExperiencesRelations = relations(
  participantExperiences,
  ({ one, many }) => ({
    user: one(users, {
      fields: [participantExperiences.userId],
      references: [users.id],
    }),
    posts: many(experiencePosts),
  })
);

export const experiencePostsRelations = relations(experiencePosts, ({ one }) => ({
  experience: one(participantExperiences, {
    fields: [experiencePosts.experienceId],
    references: [participantExperiences.id],
  }),
}));

export const reelsRelations = relations(reels, ({ one }) => ({
  author: one(users, {
    fields: [reels.userId],
    references: [users.id],
  }),
}));
