Here’s a polished, well-structured Markdown version of your technical specification, with consistent headings, tables, code blocks, and improved readability.

Writing

# Functional Specification: Technical Documentation Platform

## 1\. System Overview

The **Technical Documentation Platform** is a secure, high-performance Single-Page Application (SPA) built using a decoupled architecture.

The frontend leverages **React** and **Tailwind CSS** to deliver a responsive, modern, dark-themed user interface. The backend relies on **Supabase (PostgREST)** through direct HTTP REST collection requests.

The platform provides the following core capabilities:

- An interactive catalog of technical documentation categories.
- Individual article creation, editing, deletion, and reading views.
- Personalized subscriber channels and category-based feeds.
- Authentication, session management, and access control.
- A centralized API request layer with fault-tolerant error handling.

---

## 2\. Database Schema Architecture

The relational schema is designed to support PostgREST collection filtering, category-based content retrieval, and array-based relationship handling.

### 2.1. `profiles` Table

Stores public user metadata associated with the private authentication registry.

| Column                  | Type     | Constraints / Description                                    |
| ----------------------- | -------- | ------------------------------------------------------------ |
| `id`                    | `UUID`   | Primary key referencing `auth.users.id`.                     |
| `email`                 | `TEXT`   | Not null; synchronized user registration email.              |
| `subscribed_categories` | `UUID[]` | Array of unique category identifiers referencing `techs.id`. |

### 2.2. `techs` Table (Categories)

Groups related documentation articles under individual technical categories.

| Column        | Type     | Constraints / Description                               |
| ------------- | -------- | ------------------------------------------------------- |
| `id`          | `UUID`   | Primary key; automatically generated unique identifier. |
| `name`        | `TEXT`   | Not null; name of the technical category.               |
| `description` | `TEXT`   | Optional category summary.                              |
| `imgUrl`      | `TEXT`   | Optional URL or path to category graphic media.         |
| `articles`    | `UUID[]` | Array of article identifiers referencing `articles.id`. |

### 2.3. `articles` Table

Stores individual documentation articles and their Markdown content.

| Column           | Type        | Constraints / Description                        |
| ---------------- | ----------- | ------------------------------------------------ |
| `id`             | `UUID`      | Primary key; unique article identifier.          |
| `idx`            | `BIGINT`    | Auto-incrementing numerical tracking identifier. |
| `created_at`     | `TIMESTAMP` | Database-generated creation timestamp.           |
| `category`       | `UUID`      | Foreign key referencing `public.techs.id`.       |
| `article_author` | `UUID`      | Foreign key referencing `public.profiles.id`.    |
| `imgUrl`         | `TEXT`      | Optional article banner or cover image path.     |
| `content`        | `TEXT`      | Not null; main Markdown documentation content.   |

---

## 3\. Core Functional Capabilities

### 3.1. Category Catalog Dashboard

The catalog dashboard provides an interactive overview of available documentation categories.

#### Dynamic Article Counting

Article counts are calculated directly on the client side using the length of the category's article identifier array.

```
category.articles.length
```

This avoids additional database queries solely for calculating category article counts.

#### Subscription State Indicators

During initialization, the application reads the authenticated user's profile and checks the `subscribed_categories` array.

Categories followed by the current user display a **✓ Followed** state indicator on their respective cards.

### 3.2. Article Management and CRUD Operations

The platform supports article creation, editing, and deletion through a modal-based workflow.

#### Article Creation

1. The user opens the article creation modal.
2. The application displays an asynchronous form.
3. Upon submission, the application creates a new row in the `articles` table.
4. The newly generated article ID is captured from the database response.
5. The parent category's `articles` array is updated with the new identifier.

The array is formatted according to PostgreSQL array syntax when submitted through the REST interface.

Example:

```
{id1,id2,id3}
```

#### Author Validation

Edit and delete controls are displayed only when the authenticated user matches the article's recorded author.

```
user.id === item.article_author
```

This condition controls the visibility of article management actions in the interface.

**Security requirement:** Client-side ownership checks must be reinforced with database-level authorization policies, such as Supabase Row-Level Security (RLS), to prevent unauthorized direct API requests.

#### Article Deletion and Relationship Cleanup

When an article is deleted:

1. The corresponding row is removed from the `articles` table.
2. JavaScript's `.filter()` method removes the article identifier from the parent category's `articles` array.
3. The updated array is persisted back to Supabase.

Example:

```
const updatedArticles = category.articles.filter(
  (articleId) => articleId !== deletedArticleId
);
```

This process prevents deleted article identifiers from remaining in the category's array.

### 3.3. Premium User Dashboard Workspace

The dashboard provides personalized documentation feeds based on the categories followed by the authenticated user.

#### Personalized Live Feed

The application retrieves articles across all subscribed categories concurrently using `Promise.all()`.

The resulting collections are flattened and sorted chronologically to create a unified documentation feed.

Conceptual workflow:

```
const articleGroups = await Promise.all(
  followedCategories.map((category) => fetchArticles(category))
);

const feed = articleGroups
  .flat()
  .sort(
    (a, b) =>
      new Date(b.created_at) - new Date(a.created_at)
  );
```

_Note:**`fetchArticles`**represents the application's category-specific article retrieval function._

#### Dashboard Layout Switching

A built-in tab bar enables users to switch between two dashboard layouts:

- **Live Feed:** A chronological stream of documentation articles from followed categories.
- **Category Directory:** A grid-based index of followed categories.

Switching tabs updates the visible layout in real time without requiring a full page reload.

---

## 4\. Fault-Tolerant Authentication and Token Management

Authentication is managed through a centralized context and API request layer designed to handle expired sessions and unauthorized requests consistently.

### 4.1. Authentication Request Lifecycle

The following sequence describes the application's global authentication cleanup mechanism.

```
flowchart TD
    A[Network Interceptor<br/>apiRequests.js]
    B{HTTP 401 / 403?}
    C[Clear Session<br/>session_clear]
    D[Remove Local Session Data]
    E[Update React Auth Context]
    F[Re-render UI and Navigation]
    G[Continue Normal Request Handling]

    A --> B
    B -- Yes --> C
    C --> D
    D --> E
    E --> F
    B -- No --> G
```

### 4.2. Core Authentication Context

The authentication system maintains a global user state through an `AuthProvider` component.

The provider is mounted inside `BrowserRouter` so that authentication state can be accessed throughout the application's routing hierarchy.

Core responsibilities include:

- Maintaining the current authenticated user.
- Validating existing sessions during application initialization.
- Checking authentication state when protected routes are mounted.
- Coordinating token refresh and session cleanup.
- Updating navigation and other user-dependent interface elements.

### 4.3. Self-Healing `getUser()` Routine

The `getUser()` routine validates the current session and attempts to recover from expired access tokens.

#### Validation Workflow

1. Retrieve the locally stored `access_token`.
2. Validate the token against the backend.
3. If the token has expired, attempt to obtain a new access and refresh token pair using the stored `refresh_token`.
4. Update the stored session credentials if the refresh succeeds.
5. If refresh fails or the refresh token is missing, invoke the global session cleanup routine.

This mechanism allows recoverable session expiration to be handled without unnecessarily forcing users to log in again.

### 4.4. Unified Client-Side Session Clearing

A centralized utility function, `session_clear()`, coordinates session teardown across browser storage and React application state.

Its responsibilities are:

1. Remove `access_token` from `localStorage`.
2. Remove `refresh_token` from `localStorage`.
3. Remove `user_profile` from `localStorage`.
4. Invoke a registered callback to update the authentication context.
5. Set the current user state to `null`.
6. Trigger the appropriate UI updates and navigation changes.

Example:

```
function session_clear() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("user_profile");

  authStateCallback?.(null);
}
```

_Note:**`authStateCallback`**is a conceptual placeholder for the application's registered authentication-state callback._

### 4.5. Security Fail-Safes: HTTP 401 and 403 Interception

Every database request passes through the centralized `apiCollectionRequests` fetch layer.

The interceptor handles unauthorized responses consistently across the application.

#### Interception Workflow

- Detect HTTP `401 Unauthorized` and `403 Forbidden` responses.
- Invoke the session cleanup mechanism when required by the authentication policy.
- Clear stale client-side authentication state.
- Redirect the user to the `/unauthorized` fallback route when appropriate.
- Prevent protected interface elements from remaining accessible through stale React state.

**Important distinction:** A `401` response may indicate an expired session and trigger token refresh. A `403` response may instead indicate insufficient permissions. The implementation should distinguish these cases and avoid repeatedly clearing valid sessions when a user simply lacks access to a resource.

---

## 5\. Security and Access Control

### 5.1. Route Gatekeepers

The application separates publicly accessible routes from authenticated dashboard routes.

#### Public Routes

| Route              | Purpose                                                             |
| ------------------ | ------------------------------------------------------------------- |
| `/catalog`         | Browse the documentation category catalog.                          |
| `/catalog/:id`     | View a specific documentation category.                             |
| `/article/:id`     | Read an individual documentation article.                           |
| `/forgot-password` | Display the password recovery interface or associated hint content. |
| `*`                | Render a terminal-style 404 fallback page.                          |

#### Protected Routes

| Route        | Protection       | Behavior                                     |
| ------------ | ---------------- | -------------------------------------------- |
| `/dashboard` | `ProtectedRoute` | Redirects unauthenticated users to `/login`. |

The `/dashboard` route is wrapped in a dedicated `ProtectedRoute` component that verifies the current authentication state before rendering private content.

### 5.2. Action-Level Authorization

Creation modals and other privileged controls do not require separate routes. Instead, access is controlled through component rendering and event-handler validation.

#### Conditional Rendering

Privileged controls are rendered only when an authenticated user exists.

```
{user && <button>Create Article</button>}
```

#### Modal Mount Protection

Privileged modal components are mounted only when both the modal and authentication conditions are satisfied.

```
{isOpen && user && <Modal />}
```

#### Handler Guard Clauses

Submission handlers validate authentication before initiating database requests.

```
async function handleSubmit() {
  if (!user) {
    return;
  }

  // Continue with the authenticated submission workflow.
}
```

These checks reduce accidental access to privileged UI actions and prevent unauthenticated event handlers from initiating normal submission workflows.

**Security requirement:** UI visibility and client-side guard clauses are not sufficient authorization boundaries. All sensitive database operations must also be protected by appropriate Supabase Row-Level Security policies and server-side permission checks.

---

## 6\. Technical Summary

The Technical Documentation Platform combines a responsive React interface with a Supabase-powered data layer to deliver a personalized, category-driven documentation experience.

Its primary architectural characteristics include:

- **Frontend:** React and Tailwind CSS.
- **Backend and database access:** Supabase through PostgREST REST requests.
- **Data organization:** Relational tables with UUID-based identifiers and array-based category relationships.
- **Content management:** Article creation, editing, deletion, and reading workflows.
- **Personalization:** Followed categories and a consolidated chronological article feed.
- **Authentication:** Global React context, access-token validation, and refresh-token recovery.
- **Error handling:** Centralized HTTP response interception and session cleanup.
- **Access control:** Public and protected routes, conditional UI rendering, and authenticated action guards.
- **Security enforcement:** Database-level authorization policies to complement client-side controls.

Together, these components provide a modular foundation for a technical documentation platform that supports structured content management, personalized discovery, and centralized authentication handling.
