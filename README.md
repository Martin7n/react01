# ⚡ SevenTech Node Platform

A high-performance, secure, responsive documentation portal built with a decoupled architecture utilizing **React (Vite)**, **Tailwind CSS**, and **Supabase (PostgREST API)**.

## 🚀 Live Production Deployment

- **Web UI Hosting Layer:** [Vercel Deployment Pipeline](https://vercel.com)
- **Secure Database Infrastructure:** [Supabase Cluster Nodes](https://supabase.com)

---

## 🛠️ System Architecture & Data Topology

The application operates as an optimized Single Page Application (SPA) utilizing explicit PostgREST collection querying to avoid redundant network bottlenecks.

[ React Frontend Web UI ]
│
├── (Bearer JWT Auth) ──► [ Supabase PostgREST Engine ]
│ │
└── (Public Schema Reads) ◄────────────┼── [ Table: articles ]
├── [ Table: techs ]
└── [ Table: profiles ]

### 1. Database Relational Entities Schema

- **`public.profiles`**: Connects directly to secure internal `auth.users` records using a PostgreSQL database trigger. Tracks account emails and a unique data matrix array of user subscriptions (`subscribed_categories: uuid[]`).
- **`public.techs`**: Stores technical category topics, complete with image tracking nodes and a unified collection map array of child article pointers (`articles: uuid[]`).
- **`public.articles`**: Houses full documentation copy markdown rows mapped with precise creator foreign keys (`article_author: uuid`).

---

## ⚡ Core Operational Features

- **Proactive State Tracking Matrix**: Implements a self-healing frontend token evaluation cycle mapped onto route parameter location shifts to instantly intercept expired sessions.
- **Unified Event Cleanup System**: Custom `session_clear()` script that forcefully removes stale localStorage variables and updates active context layout arrays synchronously.
- **Instant Client Density Metrics**: Reads `.length` attributes directly from database string array collections to overlay article counts on catalog cards with 0ms network latency.
- **Personalized Dashboard Stream**: Leverages concurrent execution loops (`Promise.all`) to gather content rows from multiple subscribed categories into a single chronological timeline feed.
- **Humorous Memory Mismatch Engine**: A lighthearted, static forgot-password wizard featuring progressive situational troubleshooting tips and custom validation alert overrides.

---

## 🛡️ Production Security Configuration (RLS Matrix)

The application implements a comprehensive **Row-Level Security (RLS)** policy structure inside the database to protect records from public anon tampering.

- **Profiles Security Checkpoint**: Users possess exclusive permissions to patch (`UPDATE`) subscription cell parameters inside their own record row (`auth.uid() = id`).
- **Multi-Author Collaboration Logic**: Any registered user can publish a new category track or contribute text documentation rows under their signature token.
- **Airtight Content Boundaries**: Modifying (`UPDATE`) or purging (`DELETE`) existing category configurations or article text blocks is restricted to the original creator (`auth.uid() = article_author`).

---

## ⚙️ Environment Parameters Installation

To launch the project workspace locally, establish a `.env` file within the core layout root path:

```env
VITE_SUPABASE_URL=https://supabase.co
VITE_SUPABASE_KEY=your-public-anon-key-string
```

### Script Execution Execution Commands:

```bash
# Install core package requirements
npm install

# Launch local hot-module development server
npm run dev

# Compile optimized static production build pipeline variables
npm run build
```

### 1. Database Relational Entities Schema

- **`public.profiles`**: Connects directly to secure internal `auth.users` records using an automated PostgreSQL database trigger. Tracks account emails and a unique data matrix array of user subscriptions (`subscribed_categories: uuid[]`).
- **`public.techs` (Categories)**: Stores technical category topics, complete with image tracking nodes and a unified collection map array of child article pointers (`articles: uuid[]`).
- **`public.articles`**: Houses full documentation copy text blocks mapped with precise creator foreign keys (`article_author: uuid`).

---

## ⚡ Core Operational Features

- **Proactive State Tracking Matrix**: Implements a self-healing frontend token evaluation cycle mapped onto route parameter location shifts (`useLocation`) to instantly intercept expired or stale user sessions on every page transition.
- **Unified Event Cleanup System**: Custom `session_clear()` script that forcefully removes stale `localStorage` session keys and updates active React context memory layouts synchronously.
- **Instant Client Density Metrics**: Reads `.length` attributes directly from database string array collections to overlay real-time article counts on catalog grid cards with 0ms network latency.
- **Personalized Dashboard Stream**: Leverages concurrent execution loops (`Promise.all`) to gather content rows from multiple subscribed categories into a single, flattened, chronological timeline feed.
- **Humorous Memory Mismatch Engine**: A lighthearted, static forgot-password wizard featuring progressive situational troubleshooting tips and custom validation alert overrides to handle lost credentials natively.
- **Responsive Fixed Navigation**: A fully accessible dark-themed global navbar utilizing **external CSS media queries** to guarantee fluid menu drawer transitions on mobile devices while preventing layout padding overlaps.

---

## 🛡️ Production Security Configuration (RLS Matrix)

The application implements a comprehensive **Row-Level Security (RLS)** policy structure inside the PostgreSQL database to protect records from public anonymous tampering or cross-user scripting.

- **Profiles Security Checkpoint**: Users possess exclusive permissions to patch (`UPDATE`) subscription cell parameters inside their own record row (`auth.uid() = id`).
- **Multi-Author Collaboration Logic**: Any registered user can publish a new category track or contribute text documentation rows under their valid signature token.
- **Airtight Content Boundaries**: Modifying (`UPDATE`) or purging (`DELETE`) existing category configurations or article text blocks is restricted to the original creator (`auth.uid() = article_author`). Any unauthorized cross-user modifications are intercepted and rejected server-side.

---

## ⚙️ Environment Parameters Installation

To launch the project workspace locally, establish a `.env` file within the core layout root path:

```env
VITE_SUPABASE_URL=https://supabase.co
VITE_SUPABASE_KEY=your-public-anon-key-string
```

### Script Execution Commands:

```bash
# Install core package requirements
npm install

# Launch local hot-module development server
npm run dev

# Compile optimized static production build pipeline variables
npm run build
```
