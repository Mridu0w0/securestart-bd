# SecureStart BD

Free security starter kit for small development teams in Bangladesh. It gives developers copy ready secure code templates, a security checklist with a score, and a fake link checker.

- **Live demo:** {{[vercel url](https://securestart-bd.vercel.app/)}}

![SecureStart BD landing page](./public/Screenshot.PNG)

## The problem

Mobile financial services, online banking and public services in Bangladesh are expanding quickly, but many systems lack strong security and the skilled engineers to build it. Small teams ship fast, and basic security steps get skipped when deadlines tighten. Users pay for it with lost money and exposed personal details such as National ID records.

## The idea

Instead of building an expensive enterprise security tool, SecureStart BD puts the safe version of each basic step one copy away. Templates are free, small and easy to adopt, so a team without a security budget can still start from safe defaults.

## Features

**Core feature**

- **Secure template library.** Browse templates for safe password handling (bcrypt), encrypted data storage (AES 256 GCM) and strict API validation (Zod). Each template explains the attack it prevents and has a copy button.

**Supporting features**

- **Security checklist.** Eight weighted checks produce a live score out of 100 and the three fixes to make first.
- **Fake link checker.** Paste a URL and see a risk level and the exact red flags found: raw IP addresses, uncommon domain endings, lookalike (punycode) characters, shortened links, brand impersonation (for example a fake bKash page), credentials hidden in the URL and more. 10 checks in total.
- **Shareable reports.** Save a checklist result and get a link such as `/report/abc123`. Reports are stored in Firestore.

**Also included**

- Landing page with a scroll reveal tagline section, FAQ with FAQ schema, and responsive floating navigation
- Skip to content link, visible focus states, reduced motion support
- Custom 404 page, privacy and terms pages, favicon, meta and social tags
- Security headers on every response

## Tech stack

| Area       | Choice                                           |
| ---------- | ------------------------------------------------ |
| Framework  | Next.js (App Router), JavaScript                 |
| Styling    | Tailwind CSS v4                                  |
| Icons      | Phosphor Icons                                   |
| Font       | Geist and Geist Mono                             |
| Validation | Zod                                              |
| Database   | Firebase Firestore (server side, firebase-admin) |
| Hosting    | Vercel                                           |

## Getting started

### Prerequisites

- Node.js 18.18 or newer
- A Firebase project with Firestore enabled (only needed for saving and sharing reports)

### Install

```bash
git clone {{repo url}}
cd securestart-bd
npm install
```

### Environment variables

Create a `.env.local` file in the project root:

```
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project-id.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

To get the Firebase values:

1. Create a project at the Firebase console.
2. Open **Firestore Database** and create a database in production mode. Rules stay locked because only the server reads and writes.
3. Open **Project settings, Service accounts** and generate a new private key.
4. Copy `project_id`, `client_email` and `private_key` from the downloaded JSON file. Keep the `\n` characters in the private key exactly as written.

Never commit `.env.local`. It is already listed in `.gitignore`.

Without these variables, the templates, checklist and link checker still work. Only saving a report fails.

### Run

```bash
npm run dev
```

Open http://localhost:3000.

### Build

```bash
npm run build
npm start
```

## Project structure

```
src/
  app/
    (tools)/              Tool pages, share one layout (route group, not in the URL)
      templates/          Template library
      checklist/          Security checklist
      link-checker/       Fake link checker
      report/[id]/        Saved report page
      privacy/  terms/
    api/
      check-link/route.js Link analysis endpoint
      reports/route.js    Save a report to Firestore
    layout.js             Root layout, fonts, metadata, navbar, footer
    page.js               Landing page
    not-found.js          Custom 404
    globals.css           Theme tokens and text styles
  components/             Navbar, Footer, Reveal, TaglineReveal
  lib/
    templates.js          Template content
    checklist.js          Checklist items and scoring
    linkCheck.js          Link risk rules
    firebaseAdmin.js      Firestore connection (server only)
```

## API

Both endpoints validate input with Zod and return JSON.

### `POST /api/check-link`

Request:

```json
{ "url": "http://bkash-verify-account.xyz/login?otp=1" }
```

Success (`200`):

```json
{
  "valid": true,
  "host": "bkash-verify-account.xyz",
  "score": 100,
  "level": "high",
  "reasons": ["Connection is not encrypted (HTTP).", "..."]
}
```

Errors: `400` for a missing or oversized `url` or invalid JSON, `422` for a value that is not a valid http or https URL.

### `POST /api/reports`

Request:

```json
{ "checked": ["hash", "https", "validate"] }
```

Success (`201`):

```json
{ "id": "abc123" }
```

The score is recalculated on the server from the checked items, so it cannot be set by the client. Errors: `400` for invalid data, `500` if the report cannot be saved.

## Deploy to Vercel

1. Push the repository to GitHub.
2. Import it at vercel.com with **Add New, Project**.
3. Add `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY` and `NEXT_PUBLIC_SITE_URL` under **Environment Variables**. Paste the private key with the `\n` characters as in `.env.local`.
4. Deploy, then test saving a report on the live URL.

## Design decisions

- **Light theme with flat backgrounds**, one typeface (Geist), and a fixed text style scale defined once in `globals.css`.
- **Spacing and radius** come from a small set of values, and nested radii follow the outer radius minus the gap.
- **Motion** uses a single easing curve, animates only transform and opacity, and respects `prefers-reduced-motion`.
- **Server side validation** on every API route, with specific error messages and no raw errors exposed to the client.

## Limitations

- Templates cannot fix every issue. Teams under pressure can still skip steps, and open source tools cannot stop advanced attacks without regulation, infrastructure upgrades and ongoing maintenance of major financial systems.
- The link checker uses simple rules. It does not query a live threat database, and a low score does not prove a link is safe.
- Saved reports are public to anyone who has the link, and there is no sign in.
- Templates are starting points. Review and test any code before using it in production.

## Roadmap

- More templates: rate limiting, secure sessions, OTP handling
- Template search and filters
- Bangla language support
- Optional review of pasted code against the checklist

## License

{{license}}
