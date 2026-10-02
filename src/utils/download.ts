import { EventCampaign, EventDetails, GeneratedContentItem } from '../types';

export function downloadContentPack(details: EventDetails, items: GeneratedContentItem[]): void {
  const dateStr = new Date().toLocaleDateString();
  const divider = '='.repeat(60);
  const subDivider = '-'.repeat(40);

  let output = `${divider}\n`;
  output += `AI CONTENT STUDIO — COMPLETE CONTENT PACK\n`;
  output += `Generated on: ${dateStr}\n`;
  output += `${divider}\n\n`;

  output += `EVENT OVERVIEW\n`;
  output += `${subDivider}\n`;
  output += `Event Name: ${details.eventName}\n`;
  output += `Event Type: ${details.eventType}\n`;
  output += `Date: ${details.eventDate}\n`;
  output += `Time: ${details.eventTime}\n`;
  output += `Venue: ${details.venue}\n`;
  output += `Organizer: ${details.organizer}\n`;
  output += `Target Audience: ${details.targetAudience}\n`;
  output += `Selected Tone: ${details.tone}\n`;
  if (details.registrationLink) output += `Registration: ${details.registrationLink}\n`;
  if (details.contactInfo) output += `Contact: ${details.contactInfo}\n`;
  if (details.additionalInfo) output += `Additional Info: ${details.additionalInfo}\n`;
  output += `\n${divider}\n\n`;

  output += `GENERATED PROMOTIONAL & SOCIAL MEDIA CONTENT\n`;
  output += `Total Deliverables: ${items.length}\n`;
  output += `${divider}\n\n`;

  items.forEach((item, index) => {
    output += `[DELIVERABLE ${index + 1} OF ${items.length}]\n`;
    output += `TYPE: ${item.title.toUpperCase()}\n`;
    output += `LAST REVISED: ${new Date(item.lastUpdated).toLocaleString()}\n`;
    output += `${subDivider}\n\n`;
    output += `${item.content}\n\n`;
    output += `${divider}\n\n`;
  });

  output += `\nCreated with AI Content Studio — One Event. Endless Content.\n`;

  const blob = new Blob([output], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const safeName = details.eventName.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
  a.href = url;
  a.download = `ContentPack_${safeName}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function downloadCampaignPlan(campaign: EventCampaign): void {
  const divider = '='.repeat(60);
  const subDivider = '-'.repeat(40);

  let output = `${divider}\n`;
  output += `AI CONTENT STUDIO — EVENT CAMPAIGN SPRINT\n`;
  output += `Campaign: ${campaign.campaignTitle}\n`;
  output += `Event: ${campaign.eventName}\n`;
  output += `Generated: ${new Date(campaign.createdAt).toLocaleDateString()}\n`;
  output += `${divider}\n\n`;

  output += `CAMPAIGN STRATEGY & OVERVIEW\n`;
  output += `${subDivider}\n`;
  output += `${campaign.overview}\n\n`;
  output += `${divider}\n\n`;

  campaign.days.forEach((day) => {
    output += `[DAY ${day.dayNumber}: ${day.dayTitle.toUpperCase()}]\n`;
    output += `Stage: ${day.stage} | Timing: ${day.recommendedTiming}\n`;
    output += `Suggested Platforms: ${day.suggestedPlatform}\n`;
    output += `Headline Hook: ${day.headline}\n`;
    output += `${subDivider}\n`;
    output += `${day.postContent}\n\n`;
    output += `Hashtags: ${day.hashtags.join(' ')}\n\n`;
    output += `${divider}\n\n`;
  });

  output += `\nCreated with AI Content Studio — One Event. Endless Content.\n`;

  const blob = new Blob([output], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const safeName = campaign.eventName.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
  a.href = url;
  a.download = `CampaignPlan_${safeName}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
