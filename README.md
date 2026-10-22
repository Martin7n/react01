⚡ SevenTech Node Platform

A modern, responsive technical documentation platform built with React, Vite, Tailwind CSS, and Supabase. SevenTech Node provides a centralized space for browsing technical categories, reading and publishing documentation, and discovering personalized content through category subscriptions.

✨ Features
📚 Technical Catalog — Browse documentation categories with dynamically displayed article counts.
📝 Article Management — Create, edit, delete, and read documentation articles.
🔐 Authentication & Session Recovery — Validate access tokens, refresh expired sessions, and handle authentication failures.
📌 Category Subscriptions — Follow technical categories and manage subscription preferences.
📰 Personalized Dashboard — View a chronological feed of articles from followed categories.
📱 Responsive Dark Interface — Navigate the application through a responsive interface designed for desktop and mobile devices.
🛡️ Database Access Control — Enforce permissions through Supabase Row-Level Security (RLS).
💡 Humorous Password Recovery Page — A lighthearted interface for users who have forgotten their credentials.
🛠️ Tech Stack
Technology Purpose
React Component-based user interface
Vite Development server and production build tooling
Tailwind CSS Styling and responsive layouts
Supabase PostgreSQL database and authentication infrastructure
PostgREST REST interface for database operations
JavaScript Application logic and asynchronous request handling
🏗️ Architecture

SevenTech Node follows a decoupled Single-Page Application (SPA) architecture. The frontend communicates with Supabase through REST requests and authentication endpoints.

flowchart TD
A[React + Vite Frontend]
B[React Authentication Context]
C[API Request Layer]
D[Authentication API Layer]
E[Supabase REST API]
F[(PostgreSQL Database)]
G[RLS Policies]

    A --> B
    A --> C
    A --> D
    C --> E
    D --> E
    E --> F
    F --> G

The application separates interface components, authentication state, request execution, and resource-specific API operations into dedicated modules.

📁 Project Structure
src/
├── api/
│ ├── apiRequests.js # Centralized API request handling
│ ├── articleApi.js # Article-related API operations
│ ├── authApi.js # Authentication orchestration and token refresh
│ ├── authRequests.js # Direct authentication requests to Supabase
│ ├── catalogApi.js # Category catalog operations
│ └── profileApi.js # Profile and subscription operations
│
├── assets/ # Images and static resources
│
├── components/
│ ├── AuthComponents/ # Authentication interface components
│ ├── MainComponents/ # Main application interface components
│ ├── SharedComponents/ # Reusable UI components
│ ├── StaticComponents/ # Static and informational components
│ ├── UserProfile/ # User profile interface components
│ └── Home.jsx # Home page component
│
├── context/
│ └── authContext.jsx # Global authentication state and provider
│
├── helpers/ # Supporting application functions
├── hooks/ # Custom React hooks
├── utils/ # Shared utility functions
│
├── App.css # Application-level styles
├── App.jsx # Root component and routing
├── index.css # Global CSS
└── main.jsx # Application entry point

Module Responsibilities
API Layer — src/api/

The API layer separates authentication workflows from the execution of requests and resource-specific data operations.

File Responsibility
apiRequests.js Centralized API request handling and shared response processing.
articleApi.js Operations for retrieving and managing documentation articles.
authApi.js Manages authentication request parameters, coordinates token refresh, and handles re-requesting operations when an access token expires.
authRequests.js Executes the underlying authentication requests directly against Supabase.
catalogApi.js Retrieves and manages technical category catalog data.
profileApi.js Handles user profile data and category subscription operations.
Authentication Context — src/context/
File Responsibility
authContext.jsx Maintains shared authentication state and exposes user information and authentication functionality throughout the React component tree.
UI Components — src/components/
Directory / File Responsibility
AuthComponents/ Authentication-related interface components.
MainComponents/ Components supporting the primary application interface.
SharedComponents/ Reusable UI elements shared across different parts of the application.
StaticComponents/ Static pages and informational components.
UserProfile/ User profile and subscription-related interface components.
Home.jsx Home page component.
Supporting Directories
Directory Responsibility
assets/ Images and other static resources.
helpers/ Supporting functions for application workflows.
hooks/ Custom React hooks for reusable stateful logic.
utils/ Shared utility functions and application helpers.
🔑 Authentication and Request Flow

Authentication is managed through a dedicated API workflow and a global React authentication context.

Authentication Responsibilities
authContext.jsx maintains the application's current authentication state.
authApi.js manages authentication request parameters, coordinates token refresh, and handles retrying requests when an access token expires.
authRequests.js performs the underlying authentication requests directly against Supabase.
apiRequests.js provides centralized handling for API requests and shared response processing.
Token Refresh Workflow

When an access token expires, the authentication workflow attempts to refresh the session before retrying the affected operation.

flowchart TD
A[Authentication Request]
B[authApi.js]
C{Access Token Valid?}
D[Execute Request]
E[Refresh Token]
F{Refresh Successful?}
G[Retry Original Operation]
H[Clear Session]
I[Update Authentication Context]
J[Continue Application]

    A --> B
    B --> C
    C -- Yes --> D
    C -- No --> E
    E --> F
    F -- Yes --> G
    F -- No --> H
    H --> I
    I --> J
    D --> J
    G --> J

The session_clear() utility removes stale session data from browser storage and updates the React authentication context. This allows navigation and user-dependent components to respond to changes in authentication state.

The application also handles unauthorized responses through its centralized request infrastructure. Authentication failures and permission errors should be distinguished so that a 403 Forbidden response does not automatically invalidate an otherwise valid session.

🗄️ Database Schema

The platform uses three primary tables in the Supabase PostgreSQL database:

public.profiles
public.techs
public.articles

1. public.profiles

Stores user profile metadata and category subscription preferences.

Column Type Description
id UUID Primary key linked to auth.users.id.
email TEXT User email address.
subscribed_categories UUID[] Identifiers of followed technical categories.

Profile records are intended to be created and synchronized using a PostgreSQL trigger associated with Supabase Auth.

2. public.techs

Stores the documentation categories displayed in the catalog.

Column Type Description
id UUID Unique category identifier.
name TEXT Category name.
description TEXT Category description.
imgUrl TEXT Category image URL.
articles UUID[] Article identifiers associated with the category. 3. public.articles

Stores individual documentation articles.

Column Type Description
id UUID Unique article identifier.
idx BIGINT Numeric tracking identifier.
created_at TIMESTAMP Article creation timestamp.
category UUID Associated category identifier.
article_author UUID Identifier of the article's author.
imgUrl TEXT Article cover image URL.
content TEXT Main documentation content.
Data Relationships
A user can subscribe to multiple categories.
A category can contain multiple articles.
Each article records its category and author.
Category and article associations are maintained using the category's articles UUID array and the article's category field.

Database design note: Because category membership is represented both by techs.articles and articles.category, these values must remain synchronized. PostgreSQL foreign-key constraints cannot directly enforce individual elements within a UUID array. A normalized junction table is an alternative if the project later requires stronger relational integrity.

⚡ Core Functionality
Dynamic Article Counts

The catalog displays article counts using the length of each category's article identifier array.

category.articles.length

This avoids a separate count request when the array already contains the relevant article identifiers.

Category Subscriptions

The application checks the authenticated user's subscribed_categories array to determine which categories are followed. Subscription indicators are displayed on the corresponding category cards.

Article Management

Article creation, editing, and deletion are handled through the application's API layer.

New articles are created in the articles table.
Newly created article identifiers are added to the associated category.
Editing and deletion controls are displayed according to article ownership.
Deleted article identifiers are removed from the category's array.

The interface uses the authenticated user's ID to check ownership before displaying author-specific controls.

Personalized Dashboard

The dashboard retrieves articles from followed categories using concurrent requests through Promise.all(). The resulting collections are combined and sorted by creation time to produce a chronological feed.

The dashboard provides two primary views:

Live Feed: Articles from followed categories in chronological order.
Category Directory: A grid displaying followed categories.
Responsive Navigation

The interface uses responsive styling and navigation layouts to support different screen sizes, including mobile navigation and desktop layouts.

Password Recovery Interface

The application includes a humorous, static password recovery interface with contextual hints for users who have forgotten their credentials.

🛡️ Security and Access Control

The platform combines frontend authentication checks with database-level access policies.

Route Protection

Public routes include:

Route Purpose
/catalog Browse documentation categories.
/catalog/:id View a category.
/article/:id Read an article.
/forgot-password Access the password recovery interface.

- Display the fallback 404 page.

The /dashboard route is protected by a ProtectedRoute component. Unauthenticated users are redirected to /login.

Action-Level Checks

The application conditionally renders privileged controls and validates authentication state before submitting protected operations.

These checks improve the user experience but are not a replacement for backend authorization.

Row-Level Security (RLS)

Supabase RLS policies should enforce the following intended permissions:

Profiles: Users may modify their own permitted profile fields.
Article creation: Authenticated users may create articles according to the applicable policy.
Article updates and deletion: Only the original author may modify or delete an article, if that is the configured policy.
Category operations: Category creation, updates, and deletion must follow explicitly defined authorization rules.
Public reads: Public catalog and article access must follow the configured read policies.

Actual permissions depend on the SQL policies deployed in Supabase. RLS should be enabled and tested for every exposed table, including checks on both existing and proposed row values where appropriate.

🚀 Getting Started
Prerequisites

Before running the application, make sure you have:

Node.js installed.
npm available in your terminal.
A configured Supabase project.
The required database tables, authentication settings, and RLS policies.

1. Clone the Repository
   git clone <your-repository-url>
   cd <your-project-directory>

Replace the placeholders with your actual repository URL and project directory.

2. Install Dependencies
   npm install

3. Configure Environment Variables

Create a .env file in the project root:

VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_KEY=your-supabase-publishable-or-anon-key

Replace both values with the credentials from your Supabase project.

Security considerations:

Use a Supabase publishable key or legacy anon key intended for browser applications.
Never expose a Supabase service*role key or secret key in frontend code.
Variables prefixed with VITE* are exposed in the client-side bundle.
Configure RLS policies before making database tables accessible to the frontend.
Ensure that the environment variable names match those referenced by the application code. 4. Start the Development Server
npm run dev

Vite will display the local development URL in the terminal. The default is commonly http://localhost:5173.

5. Build for Production
   npm run build

The optimized production build is generated in the dist/ directory by default.

To preview the production build locally:

npm run preview

🌐 Deployment

The frontend can be deployed to a static hosting provider such as Vercel, while Supabase provides the database and authentication infrastructure.

Deployment Checklist
Configure the production environment variables.
Confirm that the Supabase database schema is deployed.
Enable and verify the appropriate RLS policies.
Configure SPA rewrites or fallback rules for client-side routes.
Configure the production site URL and authentication redirect URLs in Supabase.
Test sign-in, sign-out, token refresh, and session expiration.
Test article creation, editing, and deletion with multiple user accounts.
Verify that users cannot modify records they do not own.
Test category subscriptions and dashboard feeds.
Confirm that no secret backend credentials are included in the production bundle.
📌 Available Scripts
Command Description
npm install Install project dependencies.
npm run dev Start the development server.
npm run build Build the application for production.
npm run preview Preview the production build locally.

These commands assume the corresponding scripts are defined in package.json.

🔮 Potential Improvements

Possible future enhancements include:

Replacing UUID arrays with normalized relational tables where appropriate.
Adding article search, pagination, and server-side filtering.
Introducing automated tests for authentication workflows and RLS policies.
Adding continuous integration and automated deployment checks.
Improving keyboard navigation and accessibility.
Adding database indexes and query optimizations as the content collection grows.
📄 License

No license has been specified in this README. Add a LICENSE file and update this section when the project's distribution terms have been decided.
