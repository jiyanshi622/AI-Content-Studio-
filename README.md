AI Content Studio 🚀
“AI-powered event content and marketing platform that transforms event information into ready-to-publish content, campaigns, and social experiences.”
AI Content Studio is a full-stack AI application designed to help event organizers, creators, colleges, communities, and businesses create and manage promotional content from a single event brief.
Instead of creating content separately for every platform, users provide their event details once and the platform generates structured, platform-specific content such as Instagram posts, WhatsApp invitations, LinkedIn posts, X posts, email invitations, hashtags, marketing campaigns, and short-form video scripts.

✨ Key Features
🤖 AI Content Generation
Generate platform-specific promotional content from structured event information.
Supported content includes:
Instagram captions
WhatsApp invitations
LinkedIn posts
X posts
Email invitations
Hashtags
Event announcements
Promotional messages
📅 AI Marketing Campaigns
Generate a structured 7-day event marketing campaign containing:
Event announcement
Audience engagement content
Speaker/organizer highlights
Registration reminders
Countdown posts
Final-day promotions
Post-event engagement
🎬 AI Reel Generator
Generate short-form video concepts and scripts including:
9:16 reel structure
Scene-by-scene timeline
Hook
Content pacing
Audience targeting
SEO metadata
Publishing schedule
👥 Multi-Role Experiences
The platform supports different user experiences:
Organizer — Create and promote events
Participant — Build and manage event experiences
Creator — Create promotional and social content
📝 Experience-to-Post Generation
Participants can convert their event experience into social content using information such as:
Projects built
Roles
Key learnings
Achievements
Certificates
Event experiences
🔄 AI Regeneration
Users can regenerate content while maintaining the original event context.
📋 One-Click Copy
Generated content can be copied directly to the clipboard for publishing on external platforms.

🏗️ System Architecture
                        ┌───────────────────────┐
                         │        USERS          │
                         │ Organizer / Creator   │
                         │      / Participant    │
                         └───────────┬───────────┘
                                     │
                                     ▼
                         ┌───────────────────────┐
                         │   React + TypeScript  │
                         │      Frontend         │
                         └───────────┬───────────┘
                                     │
                              REST API / JSON
                                     │
                                     ▼
                         ┌───────────────────────┐
                         │    Express Server     │
                         │       Node.js         │
                         └───────┬───────┬───────┘
                                 │       │
                     ┌───────────┘       └────────────┐
                     ▼                                ▼
          ┌─────────────────────┐          ┌─────────────────────┐
          │   Google Gemini     │          │ Firebase Admin SDK  │
          │    AI Inference     │          │ Authentication      │
          └──────────┬──────────┘          └─────────────────────┘
                     │
                     ▼
          ┌─────────────────────┐
          │    Drizzle ORM      │
          └──────────┬──────────┘
                     │
                     ▼
          ┌─────────────────────┐
          │ PostgreSQL / Cloud  │
          │       SQL           │
          └─────────────────────┘


🛠️ Technology Stack
Layer
Technology
Frontend
React 19
Language
TypeScript
Build Tool
Vite 8
Styling
Tailwind CSS 4
UI Icons
Lucide React
Animations
Motion
Backend
Node.js 20+
API Framework
Express 4
Server Runtime
TSX
Database
PostgreSQL
Database Hosting
Google Cloud SQL
ORM
Drizzle ORM
Database Driver
node-postgres
AI SDK
Google GenAI SDK
AI Model
Gemini
Authentication
Firebase Authentication
Server Authentication
Firebase Admin SDK
API Architecture
REST
Version Control
Git / GitHub



📦 Project Structure
AI-Content-Studio/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── middleware/
│   │   └── auth.ts
│   ├── types.ts
│   └── ...
│
├── server.ts
│
├── db/
│   ├── schema/
│   └── migrations/
│
├── public/
│
├── dist/
│
├── package.json
├── tsconfig.json
├── vite.config.ts
├── drizzle.config.ts
├── .env.example
├── .gitignore
└── README.md





🧠 AI Architecture
AI Content Studio uses the Google GenAI SDK to communicate with the Gemini model.
The backend prepares structured prompts using the event information and requested content type.
Event Information
       │
       ▼
Prompt Construction
       │
       ▼
Gemini AI
       │
       ▼
Structured Response
       │
       ▼
Validation / Processing
       │
       ▼
Platform-Specific Content

The AI layer is designed to generate structured outputs rather than treating every request as a generic text-generation task.





🔐 Authentication & Security
Authentication is implemented using Firebase.
Client
Firebase Client SDK handles:
User registration
Login
Credential persistence
ID token generation
Server
Firebase Admin SDK validates authenticated requests using Firebase ID tokens.
Client
   │
   │ Firebase ID Token
   ▼
Express API
   │
   │ verifyIdToken()
   ▼
Authenticated Request
   │
   ▼
Protected API Resource

Security Principles
API keys remain server-side.
Database credentials are never exposed to the frontend.
Gemini credentials are stored using environment variables.
Protected APIs require authentication.
Sensitive configuration is excluded from Git using .gitignore.


🗄️ Database Architecture
The application uses PostgreSQL hosted on Google Cloud SQL with Drizzle ORM.
Core Tables
users
Stores user identity and application role information.
users
├── id
├── role
├── organization
├── college
└── created_at

Supported roles:
Organizer
Participant
Creator
events
Stores event information used throughout the platform.
events
├── id
├── name
├── venue
├── start_date
├── end_date
├── audience
├── registration_link
├── tone
└── organizer_id



generated_items
Stores AI-generated content associated with an event.
generated_items
├── id
├── event_id
├── content_type
├── content
└── created_at

participant_experiences
Stores participant event experiences.
participant_experiences
├── id
├── user_id
├── event_id
├── role
├── projects
├── learnings
└── certificates

experience_posts
Stores social posts generated from participant experiences.
experience_posts
├── id
├── experience_id
├── platform
├── content
└── created_at




reels
Stores AI-generated short-form video configurations.
reels
├── id
├── event_id
├── script
├── scene_timeline
├── audience
├── seo_tags
└── publish_schedule


🔌 API Architecture
The backend exposes RESTful endpoints for AI generation, event management, authentication, and persistence.
AI Generation
POST /api/generate

Generates platform-specific event content.
Reel Generation
POST /api/generate-reel

Generates a short-form video script and scene structure.
Event APIs
GET    /api/sql/events
POST   /api/sql/events
PUT    /api/sql/events/:id
DELETE /api/sql/events/:id


Generated Content
GET    /api/sql/generated-items
POST   /api/sql/generated-items

API routes may evolve as the application architecture develops.


⚙️ Local Development
Prerequisites
Install the following:
Node.js 20+
npm
Git
PostgreSQL / Google Cloud SQL access
Firebase project
Google Gemini API credentials

1. Clone Repository
git clone https://github.com/<your-username>/ai-content-studio.git

cd ai-content-studio


2. Install Dependencies
npm install


3. Configure Environment Variables
Create a .env file in the project root.
Example:
PORT=3000

DATABASE_URL=your_postgresql_connection_string

GEMINI_API_KEY=your_gemini_api_key

FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_CLIENT_EMAIL=your_firebase_client_email
FIREBASE_PRIVATE_KEY=your_firebase_private_key

Use the actual variable names defined by the application configuration.
Never commit .env to GitHub.

4. Database Setup
Run the required Drizzle database commands:
npm run db:push

For projects using migrations:
npm run db:migrate

Use the database command configured in your package.json.

5. Start Development Server
npm run dev

The application runs through the Express server with Vite development middleware.
Default development port:
http://localhost:3000


🏭 Production Build
Build the frontend:
npm run build

Start the production server:
npm start

In production, Express serves the compiled frontend assets from the dist/ directory.

🧪 Development Principles
The project follows several engineering practices:
Type-safe development with TypeScript
Component-based React architecture
RESTful API design
Server-side secret management
Database schema versioning
Authentication middleware
AI response validation
Separation of frontend and backend responsibilities
Graceful AI fallback handling
Environment-based configuration


🚀 Roadmap
Current
AI content generation
Multi-platform content
Content regeneration
Event management
Firebase authentication
PostgreSQL persistence
AI campaign generation
Reel script generation
Participant experience posts
Fallback generation engine
Planned
AI poster generation
AI image generation
Dynamic QR code generation
Multilingual content generation
Advanced campaign analytics
Social media scheduling
Team collaboration
Content performance analytics
Automated event reminders
Additional AI providers

🔒 Environment & Secret Management
The following should never be committed to the repository:
.env
Firebase private keys
Database passwords
Gemini API keys
Service-account credentials
Production secrets
Use .env.example to document required configuration without exposing credentials.
📊 Project Goals
AI Content Studio aims to reduce the time and effort required to create event communication by providing a centralized AI-powered workflow:
                   ONE EVENT
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
     SOCIAL         CAMPAIGN        VIDEO
     CONTENT          PLAN           REELS
        │              │              │
        └──────────────┼──────────────┘
                       ▼
                READY TO PUBLISH



🤝 Contributing
Contributions, issues, and feature requests are welcome.
Fork the repository
git fork

Create a feature branch
git checkout -b feature/your-feature

Commit changes
git commit -m "feat: add your feature"

Push changes
git push origin feature/your-feature

Then open a Pull Request.

📄 License
This project is licensed under the MIT License.
See the LICENSE file for more information.


⭐ Support
If you find this project useful, consider giving the repository a ⭐ on GitHub.

