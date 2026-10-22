Functional Specification: Technical Documentation Platform

1. System Overview

The Technical Documentation Platform is a secure, high-performance, single-page application (SPA) built using a decoupled architecture. The frontend leverages React and Tailwind CSS for a responsive, modern dark-themed user interface, while the backend relies on Supabase (PostgREST) via direct HTTP REST collection requests. The system provides an interactive catalog of categories, individual article creation, full-text reading views, and personalized subscriber channels.

2. Database Schema Architecture

The relational schema is optimized for PostgREST collection filtering and array handling.

2.1. profiles Table

Stores public metadata mapped directly to the private authentication registry.
• id (UUID, Primary Key): References auth.users.id.
• email (TEXT, Not Null): Synchronized user registration email.
• subscribed_categories (UUID[]): Array containing unique identifiers (techs.id) followed by the user.

2.2. techs (Categories) Table

Groups related documentation parameters under individual operational nodes.
• id (UUID, Primary Key): Auto-generated unique row identifier.
• name (TEXT, Not Null): Name of the technical category track.
• description (TEXT): Category summary overview text.
• imgUrl (TEXT): Graphic media URL path.
• articles (UUID[]): Array mapping containing unique child element pointers (articles.id).

2.3. articles Table

Holds the granular markdown documentation content body rows.
• id (UUID, Primary Key): Unique string identifier.
• idx (BIGINT): Auto-incrementing numerical tracking identifier.
• created_at (TIMESTAMP): Database generation stamp.
• category (UUID): Foreign Key referencing public.techs.id.
• article_author (UUID): Foreign Key referencing public.profiles.id.
• imgUrl (TEXT): Core article banner cover file path.
• content (TEXT, Not Null): Main descriptive framework copy parameters.

3. Core Functional Capabilities & Features

3.1. Category Catalog Dashboard

• Dynamic Article Counting: Instantly parses and prints density metrics directly from the array length on the client side (category.articles.length), eliminating slow secondary database lookups.
• Subscription State Indicators: Reads the authenticated user profile array on initialization to mark specific cards with a ✓ Followed state badge overlay.

3.2. Article Management & CRUD Matrix

• Creation Workflow: Persists a new row via an asynchronous modal form. Upon confirmation, captures the generated ID and updates the parent record row in techs.articles via array formatting ({id1,id2}).
• Author Validation: Displays action buttons (Edit/Delete) only if the logged-in context ID matches the element's creator (user.id === item.article_author).
• Deletion Scrubbing: Purges the object entry from the core table while utilizing JavaScript .filter() arrays to clean orphaned tokens from the category array matrix before patching it back to Supabase.

3.3. Premium User Dashboard Workspace

• Personalized Live Feed: Gathers arrays concurrently across all followed category nodes via Promise.all, sorting and flattening them into a chronological stream of documentation entries.
• Layout Switching Tabs: Built-in tabs bar enabling real-time toggling between the live stream view and the follow category directory index layout grid.

4. Fault-Tolerant Authentication & Token Management

text
[Network Interceptor] (apiRequests.js)
│
Intercepts 401 / 403 Response
│
▼
[Clear Utility] (session_clear()) ── Wipe Local Disk Storage
│
▼
[React Memory Context] ───────────── Update useAuth() User to null
│
▼
[UI Re-Render] ───────────────────── Navigation instantly clears
Use code with caution.

4.1. Core Authentication Context

• Maintains a global state engine via an <AuthProvider> container wrapped securely inside <BrowserRouter>.
• Leverages self-healing token checks on initial application load and route mounts.

4.2. Self-Healing getUser Routine

• Attempts to validate the local storage access_token against the backend.
• If a expired token error (PGRST303 / JWT expired) is intercepted, it requests a new session pair using the refresh_token.
• If token refresh fails (or is missing), it invokes a global cleanup sequence to prevent application lock.

4.3. Unified Client-Side Session Clearing

A central utility function (session_clear) coordinates multi-layer session teardowns:

1. Clears access_token, refresh_token, and user_profile from localStorage.
2. Connects back to the context tree via a registered callback routine, setting the active user memory parameter to null to update navigation structures instantly.

4.4. Security Fail-Safes (401/403 Interceptor)

• Every API call goes through a central apiCollectionRequests fetch layer.
• If a database call throws an unhandled 401 Unauthorized or 403 Forbidden response, the interceptor wipes the local disk instantly and redirects the tab to the /unauthorized route fallback view to block illegal page inspection.

5. Security & Access Control Permissions

5.1. Route Gatekeepers

• Public Route Paths: /catalog, /catalog/:id, /article/:id, /forgot-password (Static funny hint matrix), and \* (Terminal-style 404 fallback page).
• Protected Private Route Paths: /dashboard wrapped within a standalone <ProtectedRoute> guard element. Bounces guest nodes to /login if security variables evaluate to null.

5.2. Action Level Checks

Modals and creation inputs lack standalone routing targets. They are guarded by:

1. Conditional Hiding: Controls button compilation layouts via template expressions ({user && <button>}).
2. Mount Short-Circuiting: Prevents component injection into the virtual DOM tree ({isOpen && user && <Modal />}).
3. Handler Guard Clauses: Evaluates authentication states right inside submission functions before hitting connection streams.
