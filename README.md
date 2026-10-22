# SevenTech Node Platform

A high-performance, secure, and fully responsive documentation hub engineered as a decoupled single-page application (SPA) architecture utilizing **React (Vite)**, **Tailwind CSS**, and a **Supabase (PostgREST API)** backend.

Check out the live deployment on [Vercel](https://react01-eight.vercel.app/)

## Live Production Deployment

- **Frontend Hosting Layer:** [Vercel Deployment Pipeline](https://vercel.com)
- **Secure Database Infrastructure:** [Supabase Cluster Nodes](https://supabase.com)

* **Web UI Hosting Layer:** [SevenTech Portal on Vercel](https://react01-eight.vercel.app/)

---

## System Architecture & Data Topology

The application operates as an optimized SPA utilizing direct PostgREST collection filtering to minimize database query latency and eliminate redundant network joins.

[ React Frontend Web UI ]
│
├── (Bearer JWT Auth Headers) ──► [ Supabase PostgREST Engine ]
│ │
└── (Public Schema Relation Reads) ◄───────────┼── [ Table: articles ]
├── [ Table: techs ]
└── [ Table: profiles ]

### 1. Database Relational Entities Schema

- **`public.profiles`**: Mapped directly to secure internal `auth.users` records using a real-time PostgreSQL database trigger. Tracks account emails and stores a dynamic array matrix of user subscription indicators (`subscribed_categories: uuid[]`).
- **`public.techs` (Categories)**: Grouping node elements that store technical track titles, cover images, and a unified collection map array tracking child resource pointers (`articles: uuid[]`).
- **`public.articles`**: Houses granular documentation copy text records linked to precise creator foreign keys (`article_author: uuid`).

---

## ⚡ Core Operational Features

- **Proactive State Tracking Matrix**: Implements a self-healing frontend token evaluation cycle bound to active router parameter location shifts to instantly detect and handle expired user sessions on every page transition.
- **Unified Event Sessions Cleanup**: A centralized `session_clear()` utility macro that forcefully purges stale authentication keys from `localStorage` and updates active React context memory layout hooks synchronously.
- **Instant Client Density Metrics**: Computes article counters directly from the data string array attribute (`category.articles.length`), displaying real-time content density metrics on catalog grid cards with 0ms asynchronous server delay.
- **Personalized Dashboard Stream**: Leverages concurrent execution loops (`Promise.all`) to gather multi-channel content records across all followed topics into a single, flattened, chronological timeline stream feed.
- **Humorous Memory Mismatch Engine**: A lighthearted, static forgot-password wizard featuring progressive diagnostic troubleshooting tips and custom validation overrides to handle lost credentials natively.
- **Responsive Fixed Navigation**: A fully accessible dark-themed global header layout utilizing **external CSS media queries** to manage mobile hamburger menu drawer transitions smoothly with zero viewport layout overlaps.

---

## Production Security & Error Handling Matrix

The application implements comprehensive server-side access controls coupled with fail-safe network interceptors to guarantee structural safety on live environments.

### 1. Row-Level Security (RLS) Configuration

- **Profiles Security Boundary**: Users hold exclusive permissions to patch (`UPDATE`) subscription parameters inside their own record row via verified ID tokens (`auth.uid() = id`).
- **Multi-Author Collaboration Logic**: Any registered profile possesses the clearance to write brand new category tracks or contribute documentation data rows under their signature token.
- **Airtight Content Boundaries**: Modifying (`UPDATE`) or purging (`DELETE`) existing category configurations or article text rows is restricted to the original creator (`auth.uid() = article_author`), preventing cross-user data tampering.

### 2. Network-Level Error Guards

- **401/403 Security Interceptor**: Centralized handler inside `apiRequests.js` that catches unhandled credential expiration codes, forcefully clears the local disk cache, and bounces the browser to a custom `/unauthorized` fallback page.
- **400 Bad Request Fallback Guard**: Intercepts fatal PostgreSQL UUID type compilation syntax issues (triggered when a user types random symbols into an article or category URL route path) and cleanly redirects the entire browser tab over to a terminal-themed `/not-found` 404 canvas screen.

---

### Additional Information:

## Project Structure and Directory Responsibilities

    File or Directory	Responsibility
    api/	API communication and backend request workflows.
    api/apiRequests.js	Centralized API request handling and response processing.
    api/articleApi.js	Article-related API operations.
    api/authApi.js	Authentication request parameters, token refresh, and request retries.
    api/authRequests.js	Executes authentication requests directly against Supabase.
    api/catalogApi.js	Technical category catalog operations.
    api/profileApi.js	User profile and category subscription operations.
    assets/	Images and static resources.
    components/AuthComponents/	Authentication interface components.
    components/MainComponents/	Main application interface components.
    components/SharedComponents/	Reusable UI components.
    components/StaticComponents/	Static and informational components.
    components/UserProfile/	User profile and subscription interface components.
    components/Home.jsx	Home page component.
    context/authContext.jsx	Global authentication state and provider.
    helpers/	Supporting application functions.
    hooks/	Custom React hooks.
    utils/	Shared utility functions.
    App.jsx	Root component and application routing.
    App.css	Application-specific styling.
    index.css	Global CSS rules.
    main.jsx	React application entry point.

### Authentication and Session Management

##### Authentication is managed through a dedicated API workflow and a global React authentication context.

    Authentication Responsibilities
    authContext.jsx maintains the current authentication state.
    authApi.js manages authentication request parameters, coordinates token refresh, and retries requests when an access token expires.
    authRequests.js executes the underlying authentication requests directly against Supabase.
    apiRequests.js centralizes API request handling and shared response processing.

##### Token Refresh Workflow

When an access token expires, the authentication workflow attempts to refresh the session before retrying the affected operation.

The session_clear() utility removes stale session data from browser storage and updates the React authentication context. This allows navigation and user-dependent components to respond to changes in authentication state.

Unauthorized responses are handled through the centralized request infrastructure. HTTP 401 Unauthorized and 403 Forbidden responses are distinguished so that insufficient permissions do not automatically invalidate a valid session.

### Script Execution Commands:

    Prerequisites
    Node.js
    npm
    A configured Supabase project
    The required database tables, authentication settings, and RLS policies
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


    Replace the example values with the credentials from your Supabase project.

    Security considerations:

    Use a Supabase publishable key or legacy anon key intended for browser applications.
    Never expose a Supabase service_role key or secret key in frontend code.
    Variables prefixed with VITE_ are exposed in the client-side bundle.
    Configure RLS policies before making database tables accessible to the frontend.
    Ensure the environment variable names match those referenced by the application code.
    4. Start the Development Server
    npm run dev


    Vite will display the local development URL in the terminal. The default is commonly http://localhost:5173.

    5. Build for Production
    npm run build


    The optimized production build is generated in the dist/ directory by default.

    To preview the production build locally:

    npm run preview
