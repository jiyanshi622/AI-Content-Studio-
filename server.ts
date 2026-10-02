import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '2mb' }));

// Server-side Gemini client
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Fallback generator in case Gemini API key is missing or quota is exceeded
function generateFallbackContent(details: any, typeId: string): string {
  const { eventName, eventType, eventDate, eventTime, venue, organizer, description, targetAudience, registrationLink, contactInfo, additionalInfo, tone } = details;
  const reg = registrationLink ? `\n🔗 Register: ${registrationLink}` : '';
  const contact = contactInfo ? `\n📞 Contact: ${contactInfo}` : '';
  const extra = additionalInfo ? `\n✨ Highlights: ${additionalInfo}` : '';
  const org = organizer ? `by ${organizer}` : '';

  switch (typeId) {
    case 'instagram_caption':
      return `🚀 ${eventName} is officially here!\n\n${description || `Get ready for the most awaited ${eventType.toLowerCase()} of the season!`}\n\nJoin us ${org} for an unforgettable experience tailored for ${targetAudience || 'passionate changemakers'}.\n\n📅 Date: ${eventDate || 'Mark your calendar'}\n⏰ Time: ${eventTime || 'TBA'}\n📍 Venue: ${venue || 'Announced soon'}${extra}\n\nSeats are filling up fast! Hit the link in bio to secure your spot today.${reg}\n\n#${eventName.replace(/\s+/g, '')} #${eventType.replace(/\s+/g, '')} #Event2026 #JoinUs #CampusLife #Networking`;

    case 'instagram_post':
      return `[SLIDE 1 - HOOK]\n🚨 Big Announcement: ${eventName}\n\n[SLIDE 2 - THE EXPERIENCE]\n${description || `An exclusive ${eventType} bringing together ideas, inspiration, and high-impact connections.`}\n\n[SLIDE 3 - KEY DETAILS]\n🗓️ ${eventDate} | ⏰ ${eventTime}\n📍 ${venue}\nOrganized with care by ${organizer || 'the team'}.\n\n[SLIDE 4 - ACTION]\nDon't miss out! Drop a comment or tap the link in bio to register.${reg}`;

    case 'whatsapp_invitation':
      return `🌟 *INVITATION: ${eventName.toUpperCase()}* 🌟\n\nDear Friends & Colleagues,\n\nYou are cordially invited to *${eventName}* (${eventType}), proudly organized by *${organizer || 'our team'}*!\n\n📝 *About the Event:*\n${description || `A premier ${eventType} curated especially for ${targetAudience}.`}\n\n🗓️ *Date:* ${eventDate || 'Upcoming'}\n⏰ *Time:* ${eventTime || 'To be confirmed'}\n📍 *Venue:* ${venue || 'TBA'}${extra}\n\n👉 *Secure Your Free/Pass Entry:*${reg || '\nRegistration link will follow shortly.'}${contact}\n\nPlease share this with peers who would love to be part of this! See you there! 🙌`;

    case 'linkedin_post':
      return `Excited to announce ${eventName}! 🚀\n\nAs organizations and communities adapt to an ever-evolving landscape, knowledge sharing and peer collaboration are more essential than ever. That is why ${organizer || 'we'} are hosting ${eventName}, a dedicated ${eventType.toLowerCase()} curated for ${targetAudience || 'industry leaders and students'}.\n\nKey takeaways & agenda highlights:\n• Deep dive into ${eventType.toLowerCase()} best practices and practical takeaways\n• Interactive sessions with community peers and mentors\n• Direct networking opportunities\n\nLogistics:\n🗓 Date: ${eventDate}\n⏰ Time: ${eventTime}\n📍 Location: ${venue}\n\nWhether you are looking to expand your skill set or connect with like-minded professionals, we would love to have you participate.\n\nReserve your spot here: ${registrationLink || 'Link in comments'}\n\n#ProfessionalDevelopment #Networking #${eventType.replace(/\s+/g, '')} #Leadership #Innovation`;

    case 'twitter_post':
      const tweetText = `📣 It's happening! ${eventName} is scheduled for ${eventDate} at ${venue}. Don't miss out on top insights and networking. Register now: ${registrationLink || 'bit.ly/event'} #${eventType.replace(/\s+/g, '')} #Innovation`;
      return tweetText.slice(0, 275);

    case 'email_invitation':
      return `Subject: You're Invited: ${eventName} (${eventDate})\n\nDear Attendee,\n\nWe are pleased to invite you to ${eventName}, an exclusive ${eventType.toLowerCase()} hosted by ${organizer || 'our organization'}.\n\n${description || 'This event brings together energetic minds for a focused day of inspiration, skill-building, and networking.'}\n\nEVENT SUMMARY:\n• Event: ${eventName}\n• Date: ${eventDate}\n• Time: ${eventTime}\n• Venue: ${venue}\n• Target Audience: ${targetAudience}${extra}\n\nSpaces are limited to ensure a high-quality experience. Please confirm your attendance using the link below:\n\n[ Confirm Your Registration: ${registrationLink || 'RSVP Link'} ]\n\nIf you have any questions, feel free to contact us at ${contactInfo || 'our support channel'}.\n\nWarm regards,\n${organizer || 'Event Organizing Committee'}`;

    case 'poster_text':
      return `[POSTER HEADLINE]\n${eventName.toUpperCase()}\n\n[SUB-HEADLINE]\nThe Ultimate ${eventType} for ${targetAudience}\n\n[HIGHLIGHTS / BULLETS]\n• Experiential Sessions & Keynotes\n• Networking & Collaboration Hub\n• Certificates & Exclusive Resources${extra}\n\n[DATE & VENUE BLOCK]\n🗓 ${eventDate}  |  ⏰ ${eventTime}\n📍 ${venue}\n\n[CALL TO ACTION]\nREGISTER NOW: ${registrationLink || 'Scan QR Code to Enter'}\nOrganized by: ${organizer || 'Event Team'}\nContact: ${contactInfo || 'info@event.org'}`;

    case 'event_announcement':
      return `📢 OFFICIAL ANNOUNCEMENT: ${eventName}\n\nWe are delighted to formally announce that ${organizer || 'the team'} will be hosting ${eventName} on ${eventDate}.\n\n${description || `This ${eventType} is crafted specifically to empower ${targetAudience} through shared insights and interactive experiences.`}\n\nAll interested participants are invited to review the schedule and register before seats close.\n\nKey Information:\n- Date: ${eventDate}\n- Time: ${eventTime}\n- Venue: ${venue}\n- Registration: ${registrationLink || 'Open now'}\n\nStay tuned for further announcements and speaker reveals!`;

    case 'hashtags':
      const cleanEvent = eventName.replace(/[^a-zA-Z0-9]/g, '');
      const cleanType = eventType.replace(/[^a-zA-Z0-9]/g, '');
      const cleanOrg = organizer.replace(/[^a-zA-Z0-9]/g, '');
      return `#${cleanEvent} #${cleanType} #Event2026 #${cleanOrg || 'Community'} #EventPromotion #MustAttend #Networking #SkillBuilding #TrendingEvent #LiveExperience #CommunityFirst #StudentLife #TechSummit #InnovationHub`;

    case 'short_promo':
      return `🚀 Don't miss ${eventName} on ${eventDate} at ${venue}! High-energy ${eventType.toLowerCase()} with ${organizer || 'top leaders'}. Limited spots: ${registrationLink || 'RSVP now'}`;

    default:
      return `${eventName} - ${eventDate} at ${venue}.\n${description}\nRegister: ${registrationLink}`;
  }
}

// Main generation endpoint
app.post('/api/generate', async (req, res) => {
  try {
    const { details, types } = req.body;
    if (!details || !details.eventName) {
      return res.status(400).json({ error: 'Event details and Event Name are required.' });
    }

    const selectedTypes: string[] = types && types.length > 0 ? types : ['instagram_caption', 'whatsapp_invitation', 'linkedin_post', 'hashtags'];

    // If Gemini client is available, generate via AI model
    if (ai) {
      const prompt = `You are an elite creative director and copywriter for events and organizations.
Create platform-tailored promotional copy for the following event:
- Event Name: ${details.eventName}
- Event Type: ${details.eventType || 'Event'}
- Date: ${details.eventDate || 'TBA'}
- Time: ${details.eventTime || 'TBA'}
- Venue: ${details.venue || 'TBA'}
- Organizer: ${details.organizer || 'Event Committee'}
- Description: ${details.description || 'Exciting community event'}
- Target Audience: ${details.targetAudience || 'General audience'}
- Registration Link: ${details.registrationLink || 'Link in bio / Announcement'}
- Contact Information: ${details.contactInfo || 'Contact organizer'}
- Additional Information: ${details.additionalInfo || 'None'}
- Selected Content Tone: ${details.tone || 'Exciting'}
- Special Promotional Elements to Emphasize: ${Array.isArray(details.selectedSuggestions) && details.selectedSuggestions.length > 0 ? details.selectedSuggestions.join(', ') : 'Standard event promotions'}

Generate content for each requested content type: ${selectedTypes.join(', ')}.

CRITICAL RULES:
1. Never invent event facts (names, dates, times, venues, links). Preserve all real facts accurately.
2. Tone must strictly reflect "${details.tone || 'Exciting'}".
3. Each platform content must be formatted specifically for that medium:
   - "instagram_caption": captivating hook, readable spacing, bullet points, clear CTA to link in bio, 10-15 targeted hashtags at the end.
   - "instagram_post": multi-slide or high-impact carousel visual outline with exact slide captions.
   - "whatsapp_invitation": clear bold headers (*like this*), clean emoji usage, structured schedule block, friendly warm invitation format.
   - "linkedin_post": professional narrative hook, industry/career value proposition, clean bullet points, thoughtful concluding question, 3-5 professional hashtags.
   - "twitter_post": punchy, under 280 characters, strong call to action, date & short link.
   - "email_invitation": Subject Line, Salutation, Compelling Body, Logistics Block, prominent Registration Link, Sign-off.
   - "poster_text": Catchy Poster Headline, Subtitle, 3 Key Highlights/Agenda bullets, Date/Time/Venue block, RSVP/QR text.
   - "event_announcement": Formal yet energetic community/press announcement.
   - "hashtags": Categorized hashtags for optimal reach (Event, Domain, Community, Trending).
   - "short_promo": 1-2 punchy sentences ideal for SMS, Telegram broadcast, or direct messaging.
4. Output MUST be a valid JSON array of objects with schema:
[
  {
    "typeId": "instagram_caption",
    "title": "Instagram Caption",
    "content": "..."
  }
]
Do not wrap in markdown quotes if possible, output pure JSON.`;

      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            systemInstruction: 'You are an expert social media and event marketing copywriter. Produce ready-to-post, highly engaging, accurate content. Return JSON strictly.',
            responseMimeType: 'application/json',
          },
        });

        const text = response.text || '';
        const parsed = JSON.parse(text);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const items = parsed.map((item: any, idx: number) => ({
            id: `item-${Date.now()}-${idx}`,
            typeId: item.typeId,
            title: item.title || item.typeId.replace(/_/g, ' ').toUpperCase(),
            content: item.content,
            lastUpdated: new Date().toISOString(),
            tone: details.tone,
          }));
          return res.json({ items });
        }
      } catch (err: any) {
        console.warn('Gemini generation error, falling back to built-in generator:', err?.message || err);
      }
    }

    // Fallback generation
    const items = selectedTypes.map((typeId: string, idx: number) => {
      const titles: Record<string, string> = {
        instagram_caption: 'Instagram Caption',
        instagram_post: 'Instagram Post / Carousel',
        whatsapp_invitation: 'WhatsApp Invitation',
        linkedin_post: 'LinkedIn Post',
        twitter_post: 'X (Twitter) Post',
        email_invitation: 'Email Invitation',
        poster_text: 'Poster & Banner Copy',
        event_announcement: 'Official Announcement',
        hashtags: 'Targeted Hashtags',
        short_promo: 'Short Promotional Message',
      };

      return {
        id: `item-${Date.now()}-${idx}`,
        typeId,
        title: titles[typeId] || typeId,
        content: generateFallbackContent(details, typeId),
        lastUpdated: new Date().toISOString(),
        tone: details.tone,
      };
    });

    res.json({ items });
  } catch (error: any) {
    console.error('Error generating content:', error);
    res.status(500).json({ error: error.message || 'Failed to generate content.' });
  }
});

// Single card AI regeneration endpoint
app.post('/api/regenerate', async (req, res) => {
  try {
    const { details, typeId, currentContent, styleTweak } = req.body;
    if (!typeId) {
      return res.status(400).json({ error: 'Content type is required.' });
    }

    const tweakPrompts: Record<string, string> = {
      more_professional: 'Make this more professional, authoritative, and corporate-ready with elevated vocabulary.',
      more_creative: 'Make this more creative, catchy, vibrant, and emotionally resonant with an inventive hook.',
      shorter: 'Condense this to be significantly shorter, punchier, and straight to the point while keeping key dates/links.',
      more_engaging: 'Make this much more engaging with conversational hooks, open questions, and high-energy excitement.',
      more_aesthetic: 'Format with elegant spacing, minimalist aesthetic phrasing, clean line breaks, and tasteful style.',
      add_emojis: 'Infuse relevant, vibrant, well-placed emojis to heighten visual excitement and readability.',
      remove_emojis: 'Remove all emojis for a sleek, serious, text-only aesthetic.',
    };

    const instruction = tweakPrompts[styleTweak] || 'Provide a fresh, compelling alternative version of this copy.';

    if (ai) {
      const prompt = `You are an expert event copywriter.
Revise the following ${typeId} for this event:
- Event: ${details?.eventName || 'Event'} (${details?.eventDate || ''} at ${details?.venue || ''})
- Tone: ${details?.tone || 'Modern'}
- Current Content:
"""
${currentContent}
"""

REVISION GOAL: ${instruction}

CRITICAL RULES:
1. Preserve all factual details (dates, names, venues, links) accurately.
2. Return ONLY the revised content ready to copy and paste. No preambles or meta-commentary.`;

      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
        });

        const revised = response.text?.trim();
        if (revised) {
          return res.json({ content: revised });
        }
      } catch (err: any) {
        console.warn('Gemini regeneration error, falling back:', err?.message || err);
      }
    }

    // Fallback tweak
    let fallbackTweak = currentContent || generateFallbackContent(details, typeId);
    if (styleTweak === 'add_emojis') {
      fallbackTweak = `✨ 🔥 ` + fallbackTweak.replace(/\n\n/g, '\n\n💫 ');
    } else if (styleTweak === 'remove_emojis') {
      fallbackTweak = fallbackTweak.replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu, '');
    } else if (styleTweak === 'shorter') {
      const lines = fallbackTweak.split('\n').filter((l: string) => l.trim().length > 0);
      fallbackTweak = lines.slice(0, Math.max(3, Math.floor(lines.length * 0.6))).join('\n\n');
    } else {
      fallbackTweak = `[Updated Version - ${styleTweak.replace(/_/g, ' ')}]\n\n` + fallbackTweak;
    }

    res.json({ content: fallbackTweak });
  } catch (error: any) {
    console.error('Error in regenerate:', error);
    res.status(500).json({ error: error.message || 'Failed to regenerate content.' });
  }
});

// Event Campaign Generator endpoint (7-Day campaign)
app.post('/api/campaign', async (req, res) => {
  try {
    const { details } = req.body;
    if (!details || !details.eventName) {
      return res.status(400).json({ error: 'Event details are required.' });
    }

    if (ai) {
      const prompt = `Create a high-converting 7-Day Promotional Event Campaign for:
Event Name: ${details.eventName}
Event Type: ${details.eventType}
Date: ${details.eventDate}
Time: ${details.eventTime}
Venue: ${details.venue}
Organizer: ${details.organizer}
Description: ${details.description}
Audience: ${details.targetAudience}
Registration Link: ${details.registrationLink}
Tone: ${details.tone}

Output a complete 7-day marketing sequence:
Day 1 → Official Announcement & Vision
Day 2 → Value Proposition & Event Benefits
Day 3 → Speaker / Experience / Feature Highlights
Day 4 → Mid-Campaign Registration Reminder
Day 5 → Countdown (48 Hours Left)
Day 6 → Final Call / Urgent Last Day
Day 7 → Event Day Welcome & Live Participation Post

Output MUST be a valid JSON object matching:
{
  "eventName": "${details.eventName}",
  "campaignTitle": "7-Day High-Impact Launch Campaign",
  "overview": "A strategic day-by-day promotional sprint designed to maximize attendee turnout and build community momentum.",
  "days": [
    {
      "dayNumber": 1,
      "dayTitle": "The Grand Announcement",
      "stage": "Awareness",
      "recommendedTiming": "10:00 AM (Peak morning engagement)",
      "headline": "Catchy post hook",
      "postContent": "Complete ready-to-post copy with hashtags and link",
      "suggestedPlatform": "Instagram & LinkedIn",
      "hashtags": ["#Tag1", "#Tag2"]
    }
    ... through day 7
  ]
}`;

      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            systemInstruction: 'You are a veteran campaign strategist. Output strict JSON only.',
            responseMimeType: 'application/json',
          },
        });

        const text = response.text || '';
        const campaign = JSON.parse(text);
        campaign.id = `camp-${Date.now()}`;
        campaign.createdAt = new Date().toISOString();
        return res.json({ campaign });
      } catch (err: any) {
        console.warn('Gemini campaign error, falling back:', err?.message || err);
      }
    }

    // High quality procedural campaign fallback
    const days = [
      {
        dayNumber: 1,
        dayTitle: 'The Grand Reveal',
        stage: 'Awareness',
        recommendedTiming: '10:00 AM',
        headline: `It's Official: ${details.eventName} is coming!`,
        postContent: `🚀 Big news! We are thrilled to announce ${details.eventName}, taking place on ${details.eventDate} at ${details.venue}.\n\nCurated especially for ${details.targetAudience || 'creators and learners'}, this ${details.eventType.toLowerCase()} will feature game-changing sessions and peer connections.\n\nSave the date and be among the first to register: ${details.registrationLink || 'Link in bio'}!`,
        suggestedPlatform: 'Instagram & LinkedIn',
        hashtags: [`#${details.eventName.replace(/\s+/g, '')}`, '#Announcement', '#MustAttend'],
      },
      {
        dayNumber: 2,
        dayTitle: 'Why You Cannot Miss This',
        stage: 'Interest',
        recommendedTiming: '2:30 PM',
        headline: `3 Reasons why ${details.eventName} is your must-attend event`,
        postContent: `Wondering what makes ${details.eventName} unique?\n\n1️⃣ Direct insights into cutting-edge ${details.eventType.toLowerCase()} developments\n2️⃣ Unmatched networking with peers & industry mentors\n3️⃣ Hands-on takeaways you can put into practice immediately\n\nMark your calendar for ${details.eventDate}. Register here: ${details.registrationLink || 'Link in bio'}`,
        suggestedPlatform: 'LinkedIn & Twitter',
        hashtags: ['#ProfessionalGrowth', '#SkillBuilding', '#Networking'],
      },
      {
        dayNumber: 3,
        dayTitle: 'Speakers & Experience Spotlight',
        stage: 'Consideration',
        recommendedTiming: '11:00 AM',
        headline: 'Behind the Scenes & Highlights',
        postContent: `At ${details.eventName}, we are committed to delivering an unforgettable experience.\n\nFrom interactive formats to practical workshops organized by ${details.organizer || 'our team'}, every minute is designed for you.\n\n📅 Date: ${details.eventDate}\n📍 Venue: ${details.venue}\n\nHave you grabbed your pass yet? 👉 ${details.registrationLink || 'Register today'}`,
        suggestedPlatform: 'Instagram & WhatsApp',
        hashtags: ['#SpeakerReveal', '#BehindTheScenes', '#EventPrep'],
      },
      {
        dayNumber: 4,
        dayTitle: 'Mid-Way Registration Reminder',
        stage: 'Intent',
        recommendedTiming: '5:00 PM',
        headline: 'Seats are filling up rapidly!',
        postContent: `Quick reminder for our community: seats for ${details.eventName} on ${details.eventDate} are being claimed fast.\n\nWhether you are joining individually or with colleagues, secure your spot now so you don't miss out:\n${details.registrationLink || 'bit.ly/register'}\n\nTag someone who needs to be there! 👇`,
        suggestedPlatform: 'Instagram, WhatsApp & Slack',
        hashtags: ['#Reminder', '#CommunityFirst', '#JoinTheMovement'],
      },
      {
        dayNumber: 5,
        dayTitle: 'Countdown: 48 Hours Out',
        stage: 'Urgency',
        recommendedTiming: '9:00 AM',
        headline: 'T-Minus 48 Hours!',
        postContent: `⏳ The countdown is on! Just 2 days until ${details.eventName} kicks off at ${details.venue}.\n\nOur team is putting the final touches on what promises to be an extraordinary day.\n\nCheck-in details, schedule overview, and pass links: ${details.registrationLink || 'Link in bio'}`,
        suggestedPlatform: 'All Platforms',
        hashtags: ['#Countdown', '#48Hours', '#ExcitementBuilding'],
      },
      {
        dayNumber: 6,
        dayTitle: 'Final Call / Tomorrow is the Day',
        stage: 'Action',
        recommendedTiming: '6:30 PM',
        headline: 'Tomorrow! Are you ready?',
        postContent: `🚨 LAST CALL: ${details.eventName} takes place TOMORROW at ${details.eventTime || 'scheduled time'}.\n\nFinal registrations are closing shortly. Do not wait for the door:\n${details.registrationLink || 'Secure Final Pass'}\n\nSee everyone tomorrow at ${details.venue}!`,
        suggestedPlatform: 'WhatsApp, Instagram Stories & Email',
        hashtags: ['#LastChance', '#Tomorrow', '#FinalCall'],
      },
      {
        dayNumber: 7,
        dayTitle: 'Event Day & Live Energy',
        stage: 'Advocacy',
        recommendedTiming: '8:00 AM',
        headline: 'Today is the Day! Welcome to ' + details.eventName,
        postContent: `🎉 Welcome to ${details.eventName}!\n\nDoors open soon at ${details.venue}. We cannot wait to welcome each one of you.\n\nShare your photos and thoughts using our official hashtag: #${details.eventName.replace(/\s+/g, '')}!\n\nLet's make today historic! 🙌`,
        suggestedPlatform: 'Live Stories, Tweets & Community Chat',
        hashtags: [`#${details.eventName.replace(/\s+/g, '')}`, '#LiveNow', '#EventDay'],
      },
    ];

    const campaign = {
      id: `camp-${Date.now()}`,
      eventName: details.eventName,
      campaignTitle: '7-Day High-Impact Promotional Campaign',
      overview: 'A turnkey daily marketing strategy from first announcement to post-event engagement.',
      days,
      createdAt: new Date().toISOString(),
    };

    res.json({ campaign });
  } catch (error: any) {
    console.error('Error generating campaign:', error);
    res.status(500).json({ error: error.message || 'Failed to create campaign.' });
  }
});

// Smart Suggestions endpoint
app.post('/api/suggestions', async (req, res) => {
  try {
    const { eventName, description, eventType } = req.body;

    if (ai && description) {
      const prompt = `Based on this event: "${eventName}" (${eventType || 'Event'}) - Description: "${description}".
Provide 6 smart tactical content suggestions that the organizer might also need (e.g. countdown post, speaker reveal, FAQs, sponsor shoutout, parking/logistics guide, last day reminder, thank you recap).

Output pure JSON array:
[
  {
    "id": "sug-1",
    "title": "Speaker Introduction Post",
    "description": "Spotlight key facilitators or special guests with bio snippets.",
    "badge": "High Engagement",
    "promptSnippet": "Create an introduction post spotlighting key speakers"
  }
]`;

      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
          },
        });

        const text = response.text || '';
        const suggestions = JSON.parse(text);
        if (Array.isArray(suggestions) && suggestions.length > 0) {
          return res.json({ suggestions });
        }
      } catch (err: any) {
        console.warn('Gemini suggestions fallback:', err?.message || err);
      }
    }

    // Default intelligent suggestions
    const defaultSuggestions = [
      {
        id: 'sug-1',
        title: 'Instagram Countdown Post',
        description: 'Create anticipation with a "3 Days to Go" graphic & caption concept.',
        badge: 'High Reach',
        promptSnippet: 'Create a countdown announcement post highlighting urgency and remaining seats.',
      },
      {
        id: 'sug-2',
        title: 'Speaker & Guest Reveal',
        description: 'Spotlight key presenters, judges, or performers with their credentials.',
        badge: 'Credibility',
        promptSnippet: 'Write a dedicated speaker announcement post highlighting background and session topic.',
      },
      {
        id: 'sug-3',
        title: 'Last-Day Registration Reminder',
        description: 'Urgent final call message for WhatsApp groups and Instagram stories.',
        badge: 'Conversions',
        promptSnippet: 'Generate an urgent last chance message reminding attendees that registration is ending.',
      },
      {
        id: 'sug-4',
        title: 'Venue & Logistics Guide',
        description: 'Helpful directions, parking details, check-in timings, and entry guidelines.',
        badge: 'Attendee Care',
        promptSnippet: 'Create a helpful logistics guide outlining how to reach the venue and what to bring.',
      },
      {
        id: 'sug-5',
        title: 'Post-Event Thank You & Recap',
        description: 'Express gratitude to attendees, partners, and share highlight memories.',
        badge: 'Retention',
        promptSnippet: 'Draft a post-event thank you message celebrating the success and community turnout.',
      },
      {
        id: 'sug-6',
        title: 'Sponsor & Partner Shoutout',
        description: 'Professional recognition post celebrating supporting brands and organizations.',
        badge: 'Sponsors',
        promptSnippet: 'Write an appreciative sponsor recognition post honoring key event partners.',
      },
    ];

    res.json({ suggestions: defaultSuggestions });
  } catch (error: any) {
    console.error('Error generating suggestions:', error);
    res.status(500).json({ error: 'Failed to fetch suggestions' });
  }
});

// Participant / Attendee Experience Post Generator Endpoint
app.post('/api/generate-experience', async (req, res) => {
  try {
    const { details } = req.body;
    if (!details || !details.eventName) {
      return res.status(400).json({ error: 'Event details and Event Name are required.' });
    }

    const {
      eventName,
      eventType = 'Event',
      eventDate = 'Recently',
      venue = 'Campus / Venue',
      organizer = 'Organizers',
      participantRole = 'Attendee',
      projectOrHighlight = '',
      keyLearnings = '',
      teamOrMentors = '',
      certificateOrPrize = '',
      tone = 'Exciting',
    } = details;

    if (ai) {
      try {
        const prompt = `You are an elite personal branding strategist and social media ghostwriter for students, creators, and event attendees.
Write 4 tailored social media recap posts for a participant who attended the following event:
- Event: ${eventName} (${eventType})
- Date & Venue: ${eventDate} at ${venue}
- Host/Organizer: ${organizer}
- User's Role: ${participantRole}
- What User Built / Experienced: ${projectOrHighlight || 'Engaged in interactive workshops, met mentors, and learned new concepts'}
- Key Learnings: ${keyLearnings || 'Expanded technical horizons, collaborated with peers, and received industry feedback'}
- Teammates / Mentors: ${teamOrMentors || 'Collaborated with fantastic peers and mentors'}
- Award / Certificate: ${certificateOrPrize || 'Received official certificate of participation'}
- Desired Tone: ${tone}

Return a valid JSON array of objects. Each object must have:
- "typeId": one of "linkedin_experience", "instagram_experience", "twitter_experience", "organizer_shoutout"
- "title": descriptive title
- "content": the complete ready-to-post text with authentic formatting, line breaks, hashtags, and appropriate emojis.

JSON Schema format:
[
  { "typeId": "linkedin_experience", "title": "LinkedIn Professional Recap & Learnings", "content": "..." },
  { "typeId": "instagram_experience", "title": "Instagram Photo Dump & Story Caption", "content": "..." },
  { "typeId": "twitter_experience", "title": "X (Twitter) Project & Takeaways Thread", "content": "..." },
  { "typeId": "organizer_shoutout", "title": "Thank You & Organizer Appreciation Note", "content": "..." }
]`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            temperature: 0.7,
          },
        });

        const text = response.text || '';
        const parsed = JSON.parse(text);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const items = parsed.map((item: any, idx: number) => ({
            id: `exp-post-${Date.now()}-${idx}`,
            typeId: item.typeId,
            title: item.title,
            content: item.content,
            tone: tone,
            lastUpdated: new Date().toISOString(),
          }));
          return res.json({ items });
        }
      } catch (err: any) {
        console.warn('Gemini experience generation fallback triggered:', err?.message || err);
      }
    }

    // Procedural Fallback Generator for Participant Experience
    const cleanEventTag = eventName.replace(/[^a-zA-Z0-9]/g, '');
    const cleanOrgTag = organizer.replace(/[^a-zA-Z0-9]/g, '');
    const prizeText = certificateOrPrize ? `\n🏆 Honor: ${certificateOrPrize}` : '';

    const fallbackItems = [
      {
        id: `exp-post-${Date.now()}-1`,
        typeId: 'linkedin_experience',
        title: 'LinkedIn Professional Recap & Learnings',
        tone: tone,
        lastUpdated: new Date().toISOString(),
        content: `Reflecting on an incredible experience at ${eventName} hosted by ${organizer}! 🚀\n\nAttending as a ${participantRole}, it was an extraordinary opportunity to dive deep into ${eventType.toLowerCase()} and connect with passionate minds across the community.\n\nKey takeaways from the event:\n• ${keyLearnings || 'Gained hands-on exposure to practical industry frameworks and emerging trends'}\n• ${projectOrHighlight || 'Collaborated on problem statements and explored creative solutions under tight timelines'}\n• Expanded my network with inspiring peers, mentors, and thought leaders\n${prizeText}\n\nSpecial thanks to ${teamOrMentors || 'my peers and mentors'} for the collaboration, and gratitude to ${organizer} for curating a world-class platform.\n\nExcited to apply these learnings in upcoming initiatives!\n\n#${cleanEventTag} #ContinuousLearning #Networking #${cleanOrgTag || 'Community'} #ProfessionalGrowth`,
      },
      {
        id: `exp-post-${Date.now()}-2`,
        typeId: 'instagram_experience',
        title: 'Instagram Photo Dump & Story Caption',
        tone: tone,
        lastUpdated: new Date().toISOString(),
        content: `Unmatched energy at ${eventName}! ✨📸\n\nAttended as a ${participantRole} and made memories for a lifetime! From high-speed brainstorming to 4 AM breakthroughs and inspiring conversations, this was definitely one for the books.${prizeText}\n\nHighlight of the weekend: ${projectOrHighlight || 'Meeting incredible creators and building something meaningful!'}\n\nHuge love to ${teamOrMentors || 'the best crew'} and the team at ${organizer} for an unforgettable event. Swipe to see the chaos → celebration! 🚀\n\n#${cleanEventTag} #EventDump #StudentLife #DevCrew #Memories #Innovate`,
      },
      {
        id: `exp-post-${Date.now()}-3`,
        typeId: 'twitter_experience',
        title: 'X (Twitter) Project & Takeaways Thread',
        tone: tone,
        lastUpdated: new Date().toISOString(),
        content: `Just wrapped up ${eventName} as a ${participantRole}! ⚡️\n\nKey lessons from the experience: 🧵👇\n\n1/ ${keyLearnings || 'Execution speed always beats overthinking.'}\n2/ ${projectOrHighlight || 'Surround yourself with builders who push you to do better.'}\n3/ Community is the ultimate cheat code.\n\nProps to @${cleanOrgTag || 'organizers'} for putting together a top-tier event! 🔥 #${cleanEventTag}`,
      },
      {
        id: `exp-post-${Date.now()}-4`,
        typeId: 'organizer_shoutout',
        title: 'Thank You & Organizer Appreciation Note',
        tone: 'Friendly',
        lastUpdated: new Date().toISOString(),
        content: `A big shoutout and sincere thank you to ${organizer} and all the dedicated volunteers behind ${eventName}! 👏✨\n\nOrganizing a major ${eventType.toLowerCase()} takes monumental effort, and your team delivered an engaging, seamless, and high-impact experience for all of us.\n\nThank you for fostering a supportive space for students, creators, and professionals to thrive. Looking forward to the next edition! 🙌`,
      },
    ];

    res.json({ items: fallbackItems });
  } catch (error: any) {
    console.error('Error generating experience posts:', error);
    res.status(500).json({ error: 'Failed to generate experience posts' });
  }
});

// ==========================================
// CLOUD SQL RELATIONAL DATABASE ENDPOINTS
// ==========================================
import {
  getOrCreateUser,
  getUserByUid,
  getAllUsers,
  createEventWithItems,
  getAllEvents,
  createExperienceWithPosts,
  getAllParticipantExperiences,
  getEventItems,
  getExperiencePosts,
  createReel,
  getAllReels,
} from './src/db/queries.ts';

// Sync/Save User to Cloud SQL
app.post('/api/sql/sync-user', async (req, res) => {
  try {
    const { uid, email, name, role, organization, collegeOrCompany } = req.body;
    if (!uid || !email) {
      return res.status(400).json({ error: 'UID and Email are required.' });
    }

    const user = await getOrCreateUser({
      uid,
      email,
      name: name || 'User',
      role: role || 'organizer',
      organization,
      collegeOrCompany,
    });

    res.json({ success: true, user });
  } catch (error: any) {
    console.error('Error syncing user with Cloud SQL:', error);
    res.status(500).json({ error: 'Failed to sync user with database' });
  }
});

// Save Event to Cloud SQL
app.post('/api/sql/events', async (req, res) => {
  try {
    const { userUid, details, items } = req.body;
    if (!details || !details.eventName) {
      return res.status(400).json({ error: 'Event details are required.' });
    }

    // Lookup or fallback user
    let userId = 1;
    if (userUid) {
      const u = await getUserByUid(userUid);
      if (u) userId = u.id;
    }

    // If no user found, ensure a default organizer user exists
    if (!userId) {
      const defUser = await getOrCreateUser({
        uid: userUid || 'default-organizer-uid',
        email: 'organizer@aicontent.studio',
        name: details.organizer || 'Event Organizer',
        role: 'organizer',
        organization: details.organizer,
      });
      userId = defUser.id;
    }

    const created = await createEventWithItems(userId, details, items || []);
    res.json({ success: true, event: created });
  } catch (error: any) {
    console.error('Error storing event in Cloud SQL:', error);
    res.status(500).json({ error: 'Failed to store event in database' });
  }
});

// Fetch All Events from Cloud SQL
app.get('/api/sql/events', async (_req, res) => {
  try {
    const rows = await getAllEvents();
    res.json({ events: rows });
  } catch (error: any) {
    console.error('Error fetching events from Cloud SQL:', error);
    res.status(500).json({ error: 'Failed to fetch events from database' });
  }
});

// Save Participant Experience to Cloud SQL
app.post('/api/sql/experiences', async (req, res) => {
  try {
    const { userUid, details, posts } = req.body;
    if (!details || !details.eventName) {
      return res.status(400).json({ error: 'Participant details are required.' });
    }

    // Lookup or ensure user exists
    let userId = 1;
    if (userUid) {
      const u = await getUserByUid(userUid);
      if (u) userId = u.id;
    }

    if (!userId) {
      const defUser = await getOrCreateUser({
        uid: userUid || 'default-participant-uid',
        email: 'user@aicontent.studio',
        name: 'Participant User',
        role: 'participant',
        collegeOrCompany: details.venue,
      });
      userId = defUser.id;
    }

    const created = await createExperienceWithPosts(userId, details, posts || []);
    res.json({ success: true, experience: created });
  } catch (error: any) {
    console.error('Error storing experience in Cloud SQL:', error);
    res.status(500).json({ error: 'Failed to store experience in database' });
  }
});

// Fetch All Participant Experiences from Cloud SQL
app.get('/api/sql/experiences', async (_req, res) => {
  try {
    const rows = await getAllParticipantExperiences();
    res.json({ experiences: rows });
  } catch (error: any) {
    console.error('Error fetching experiences from Cloud SQL:', error);
    res.status(500).json({ error: 'Failed to fetch experiences from database' });
  }
});

// Fetch All Registered Users from Cloud SQL
app.get('/api/sql/users', async (_req, res) => {
  try {
    const rows = await getAllUsers();
    res.json({ users: rows });
  } catch (error: any) {
    console.error('Error fetching users from Cloud SQL:', error);
    res.status(500).json({ error: 'Failed to fetch users from database' });
  }
});

// Fetch All Reels from Cloud SQL
app.get('/api/sql/reels', async (_req, res) => {
  try {
    const rows = await getAllReels();
    res.json({ reels: rows });
  } catch (error: any) {
    console.error('Error fetching reels from Cloud SQL:', error);
    res.status(500).json({ error: 'Failed to fetch reels from database' });
  }
});

// Generate Viral Reel with Script, Audience Analysis, SEO Hashtags, and Best Timing
app.post('/api/generate-reel', async (req, res) => {
  try {
    const {
      topic,
      platforms = ['instagram', 'facebook', 'linkedin'],
      targetAge = '16-24',
      duration = '30s',
      goal = 'Virality & Reach',
      tone = 'High-Energy & Viral',
      userUid,
    } = req.body;

    if (!topic || !topic.trim()) {
      return res.status(400).json({ error: 'Reel topic or concept is required.' });
    }

    const platformListStr = Array.isArray(platforms) ? platforms.join(', ') : 'Instagram, Facebook, LinkedIn';

    let resultData: any = null;

    if (ai) {
      try {
        const prompt = `You are a world-class viral short-form video creator, social media algorithm expert, and SEO strategist.
Create an elite high-retention vertical Reel / Short video package for:
- Topic / Concept: "${topic}"
- Target Platforms: ${platformListStr}
- Target Audience Age Demographic: ${targetAge} (e.g. Gen Z 16-24, Young Professionals 25-34, Mid-Career 35-49, or Broad 18-45)
- Video Duration: ${duration}
- Primary Goal: ${goal}
- Tone / Vibe: ${tone}

You must return a valid, strictly formatted JSON object with this exact structure:
{
  "title": "Short punchy title for this reel",
  "hook": "The visual action + exact verbal words in first 3 seconds to immediately stop scrolling",
  "hookVariations": [
    "Alternative psychological curiosity hook #1",
    "Alternative contrarian hook #2",
    "Alternative direct-benefit hook #3"
  ],
  "scenes": [
    {
      "timeframe": "0:00 - 0:03",
      "visual": "Exact visual scene, camera movement, B-roll, gesture, or prop",
      "narration": "Exact verbal script to speak",
      "onScreenText": "BOLD ON-SCREEN SUBTITLE POP-UP"
    },
    {
      "timeframe": "0:03 - 0:10",
      "visual": "Fast cut to demo / laptop / face with expression",
      "narration": "Value point #1 script",
      "onScreenText": "PUNCHY TEXT 2"
    },
    {
      "timeframe": "0:10 - 0:22",
      "visual": "Screen recording / quick transition / high-speed gesture",
      "narration": "Value point #2 & proof script",
      "onScreenText": "CORE TIP HIGHLIGHT"
    },
    {
      "timeframe": "0:22 - 0:30",
      "visual": "Pointing to camera / caption gesture",
      "narration": "Call to action script",
      "onScreenText": "SAVE FOR LATER & FOLLOW"
    }
  ],
  "fullVoiceover": "Full uninterrupted speech script",
  "caption": "Complete engaging caption with emojis, hook line, body, and micro-CTA",
  "callToAction": "High-conversion CTA designed for saves and shares",
  "audienceAnalysis": {
    "ageGroup": "Detailed age demographic breakdown for ${targetAge}",
    "psychologicalTriggers": ["FOMO / Curiosity trigger", "Status / Growth trigger", "Relatability trigger"],
    "corePainPoints": ["Pain point #1", "Pain point #2", "Pain point #3"],
    "whyThisFormatWorks": "Scientific explanation of why this script keeps this demographic watching to the last second"
  },
  "seoRanking": {
    "primaryKeywords": ["keyword 1", "keyword 2", "keyword 3", "keyword 4"],
    "trendingHashtags": ["#Tag1", "#Tag2", "#Tag3", "#Tag4"],
    "nicheHashtags": ["#NicheTag1", "#NicheTag2", "#NicheTag3"],
    "broadHashtags": ["#BroadTag1", "#BroadTag2", "#BroadTag3"],
    "algorithmRankingTips": [
      "Keep first frame text within safe zones so it isn't covered by caption or icons",
      "Add automated synced captions for 80% of viewers watching without sound",
      "Include key search terms spoken aloud in first 5 seconds for audio SEO transcript indexing",
      "Reply to first 5 comments within 30 minutes to trigger the velocity multiplier"
    ]
  },
  "bestPublishTimes": {
    "instagram": "11:30 AM - 1:00 PM & 7:00 PM - 9:00 PM (Local)",
    "facebook": "1:00 PM - 3:30 PM & 8:00 PM (Local)",
    "linkedin": "7:45 AM - 9:00 AM & 12:00 PM - 1:30 PM (Tuesday - Thursday)",
    "peakDays": ["Tuesday", "Thursday", "Sunday Evening"],
    "timingExplanation": "Why these specific time windows capture peak scroll attention and algorithmic momentum"
  },
  "creatorSuggestions": {
    "audioRecommendation": "Trending upbeat lofi synth / fast trap phonk beat / subtle acoustic riser",
    "pacingAndFraming": "9:16 vertical ratio. Cut every 2.5 seconds to reset audience attention span. Text positioned center-upper third.",
    "retentionScore": 94
  }
}`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            temperature: 0.7,
          },
        });

        const text = response.text || '';
        const parsed = JSON.parse(text);
        if (parsed.hook && parsed.scenes) {
          resultData = parsed;
        }
      } catch (err: any) {
        console.warn('Gemini reel generation fallback:', err?.message || err);
      }
    }

    // Procedural Fallback if AI is offline or rate-limited
    if (!resultData) {
      const cleanTopicTag = topic.replace(/[^a-zA-Z0-9]/g, '');
      resultData = {
        title: `${topic} — Viral Reel Script`,
        hook: `Stop scrolling if you're trying to figure out ${topic.toLowerCase()}! 🛑`,
        hookVariations: [
          `Nobody is talking about this ONE thing about ${topic}... 🤫`,
          `If you do ${topic.toLowerCase()} like everyone else, you're losing hours of work.`,
          `This 30-second breakdown of ${topic} will save you a whole month of trial and error.`
        ],
        scenes: [
          {
            timeframe: '0:00 - 0:03',
            visual: 'Direct to camera, dynamic snap or finger point + quick zoom-in',
            narration: `Stop scrolling if you want to master ${topic.toLowerCase()}!`,
            onScreenText: 'STOP SCROLLING 🚨',
          },
          {
            timeframe: '0:03 - 0:11',
            visual: 'Screen capture or B-roll showing the common frustration / mistake',
            narration: `Most people make the mistake of overcomplicating it, but here is what actually works.`,
            onScreenText: 'THE #1 MISTAKE ❌',
          },
          {
            timeframe: '0:11 - 0:22',
            visual: 'Side-by-side demonstration or high-speed workflow with hand gestures',
            narration: `Step 1: Simplify your focus. Step 2: Leverage standard frameworks so you don't rebuild from scratch. Step 3: Test with real feedback.`,
            onScreenText: 'THE 3-STEP SHORTCUT ⚡️',
          },
          {
            timeframe: '0:22 - 0:30',
            visual: 'Pointing down towards caption with high energy smile',
            narration: `Save this video for your next project, and drop a comment below with your biggest question!`,
            onScreenText: 'SAVE & DROP A COMMENT 👇',
          }
        ],
        fullVoiceover: `Stop scrolling if you want to master ${topic.toLowerCase()}! Most people make the mistake of overcomplicating it, but here is what actually works: Step 1: Simplify your focus. Step 2: Leverage standard frameworks. Step 3: Test with real feedback. Save this video for your next project, and drop a comment below with your biggest question!`,
        caption: `Ready to level up your ${topic}? 🚀\n\nMost creators and builders spend weeks overthinking this, when the solution comes down to 3 simple tweaks:\n\n1️⃣ Stop rebuilding what already exists\n2️⃣ Keep your feedback loop under 24 hours\n3️⃣ Measure real output over perfection\n\n💾 Save this post so you have it ready when you need it.\n💬 What's your biggest hurdle with this right now? Drop it in the comments!\n\n#${cleanTopicTag || 'ContentCreation'} #ViralReels #CreatorTips #GrowthHacks #InstaReels #LinkedInVideo`,
        callToAction: 'Save this reel right now & share it with someone who needs this shortcut today! 📌',
        audienceAnalysis: {
          ageGroup: `${targetAge} Demographic Focus`,
          psychologicalTriggers: [
            'Immediate Curiosity & Pattern Interrupt',
            'Time-saving / High-utility value',
            'Relatability & peer validation',
          ],
          corePainPoints: [
            'Wasting hours on inefficient workflows',
            'Information overload from contradictory advice',
            'Fear of falling behind current industry trends',
          ],
          whyThisFormatWorks: `Viewers in the ${targetAge} group have a sub-3 second filter. By addressing the exact problem before the 3-second mark, we eliminate swipe-away behavior.`,
        },
        seoRanking: {
          primaryKeywords: [topic, 'viral reel', 'tutorial', 'quick tips', 'best practices'],
          trendingHashtags: [`#${cleanTopicTag}`, '#CreatorStudio', '#TrendingReels', '#LearnOnTikTok', '#ShortFormContent'],
          nicheHashtags: [`#${cleanTopicTag}Tips`, `#${cleanTopicTag}Strategy`, '#BuilderMindset'],
          broadHashtags: ['#ReelsViral', '#GrowthTips', '#Productivity', '#ContentStrategy'],
          algorithmRankingTips: [
            'Spoken keywords in the first 3 seconds are transcribed by Instagram/LinkedIn audio indexing bots for Explore feed ranking',
            'Use high-contrast text overlays in the upper center third (safe zone)',
            'Prompt a specific single-word comment to trigger instant engagement velocity'
          ],
        },
        bestPublishTimes: {
          instagram: '11:30 AM - 1:15 PM & 7:30 PM - 9:00 PM',
          facebook: '1:00 PM - 3:00 PM & 8:15 PM',
          linkedin: '8:00 AM - 9:30 AM & 12:00 PM - 1:30 PM (Tuesday & Thursday)',
          peakDays: ['Tuesday', 'Thursday', 'Sunday'],
          timingExplanation: `For target age ${targetAge}, mobile usage spikes during mid-day lunch breaks (12-1 PM) and evening wind-down hours (7:30-9 PM).`,
        },
        creatorSuggestions: {
          audioRecommendation: 'Trending high-tempo lofi or synthwave instrumental',
          pacingAndFraming: '9:16 vertical framing. Keep cuts under 3 seconds. Use bold animated subtitles.',
          retentionScore: 94,
        },
      };
    }

    // Persist Reel into Cloud SQL
    try {
      let resolvedUserId: number | undefined = undefined;
      if (userUid) {
        const u = await getUserByUid(userUid);
        if (u) resolvedUserId = u.id;
      }

      const savedDbReel = await createReel({
        userId: resolvedUserId,
        title: resultData.title,
        topic,
        platforms: platformListStr,
        targetAge,
        hook: resultData.hook,
        script: JSON.stringify(resultData.scenes),
        caption: resultData.caption,
        callToAction: resultData.callToAction,
        audienceAnalysis: JSON.stringify(resultData.audienceAnalysis),
        seoKeywords: JSON.stringify(resultData.seoRanking),
        hashtags: resultData.seoRanking.trendingHashtags.join(' '),
        bestPublishTimes: JSON.stringify(resultData.bestPublishTimes),
        retentionTips: JSON.stringify(resultData.creatorSuggestions),
        tone,
      });

      resultData.id = savedDbReel.id;
    } catch (dbErr: any) {
      console.warn('Notice: Reel generated successfully, database sync logged:', dbErr?.message || dbErr);
    }

    res.json({ success: true, reel: resultData });
  } catch (error: any) {
    console.error('Error generating reel:', error);
    res.status(500).json({ error: 'Failed to generate reel package' });
  }
});

// Overview of Cloud SQL tables and record counts
app.get('/api/sql/overview', async (_req, res) => {
  try {
    const [allUsers, allEvents, allExps] = await Promise.all([
      getAllUsers(),
      getAllEvents(),
      getAllParticipantExperiences(),
    ]);

    res.json({
      database: 'Cloud SQL (PostgreSQL)',
      region: 'asia-southeast1',
      tables: {
        users: { count: allUsers.length, data: allUsers },
        events: { count: allEvents.length, data: allEvents },
        participant_experiences: { count: allExps.length, data: allExps },
      },
    });
  } catch (error: any) {
    console.error('Error generating Cloud SQL overview:', error);
    res.status(500).json({ error: 'Failed to retrieve database overview' });
  }
});

// Setup Vite middleware in dev or static serve in prod
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`AI Content Studio server running at http://0.0.0.0:${port}`);
  });
}

startServer();
