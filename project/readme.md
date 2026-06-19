# Al Rehman Fee Manager — Design System

A modern, premium SaaS design system for **Al Rehman Fee Manager** — a fee-management web
application for schools, academies, madrasas and educational institutes. The product is
built for the **Al Rehman Academy** brand and helps administrators track students, collect
fees, generate receipts, send WhatsApp reminders, and report on collection performance.

Visual direction: **clean, professional, blue-and-white**, inspired by Stripe, Notion and
modern admin dashboards. Minimal but premium — soft elevation, generous spacing, tabular
figures, calm slate neutrals against a confident brand blue.

## Sources provided

- `uploads/AR logo .pdf` — the Al Rehman Academy logo (vector). It contained **two lockups**
  (horizontal + stacked) in blue calligraphy reading "Al Rehman Academy" with the Arabic
  الرحمن mark. These were extracted to SVG (see `assets/`). The brand blue **#248DCE** was
  sampled directly from the logo artwork.
- No codebase, Figma, or existing UI was provided — the product UI, component set, and
  visual language in this system were designed from scratch against the brief and the logo.

---

## Content Fundamentals

How copy is written across the product:

- **Voice:** plain, calm, administrative-professional. Short and factual — this is a tool
  people use daily to handle money, so clarity beats personality. No marketing fluff.
- **Tense / person:** address the admin as an implicit "you" in actions ("Add Student",
  "Send Reminder", "Export PDF"). Records are stated in third person ("Ahmed Raza paid the
  July fee").
- **Casing:** **Title Case** for buttons, nav items, page titles and table headers
  ("Fee Collection", "Add Student"). Sentence case for body copy, hints and empty states.
  **UPPERCASE** only for tiny overline labels (letter-spaced), never for headlines.
- **Numbers & currency:** always tabular. Currency is Pakistani Rupees, written
  **`Rs 3,42,000`** (lakh grouping) in prose/headlines and **`₨ 3,000.00`** with the rupee
  glyph in receipts and figure chips. Percentages are whole or one-decimal ("82%", "8.2%").
- **Dates:** human and short — "12 Jul 2025", "2 days ago", "July 2025" for fee months.
- **Status language:** a fixed vocabulary — **Paid / Pending / Overdue** for fees,
  **Active / Inactive** for students, **Sent / Delivered / Failed** for reminders.
- **Emoji:** none. The brand is professional; status is shown with colored dots/badges and
  line icons, never emoji.
- **Tone examples:**
  - Button: `Add Student`, `Send Reminder`, `Download Receipt`, `Export Excel`
  - Empty state: `No pending fees this month. Everything is collected.`
  - Toast: `Reminder sent to 14 parents on WhatsApp.`
  - Hint: `Upload a payment screenshot — we'll auto-detect the transaction details.`

---

## Visual Foundations

- **Color:** a single confident brand blue (**#248DCE**, scale 50–900) on a white/slate
  canvas. Deep **navy (#0B1F38)** anchors the sidebar and dark surfaces. Semantic accents are
  reserved and meaningful — **green** = collected/paid/active, **amber** = pending,
  **red** = overdue. WhatsApp green (#25D366) is used only in the reminder module. No purple,
  no multi-hue gradients.
- **Backgrounds:** flat. App canvas is `--slate-50` (#F7F9FC); cards are pure white. No
  photographic backgrounds, no textures, no decorative gradients. The only "gradient"
  permitted is a subtle navy depth on the sidebar if needed.
- **Typography:** **Plus Jakarta Sans** for all UI and display (modern, geometric-humanist,
  premium). **IBM Plex Mono** for figures that must align — transaction IDs, receipt numbers,
  phone numbers, money in receipts. Headlines are tight (`-0.02em`), extra-bold for big stats.
  Body is 15px. Tabular numerics everywhere money appears.
- **Spacing:** 4px base grid. Cards use 24px padding, dashboards a 16–24px gap rhythm.
  Comfortable, never cramped; whitespace signals premium.
- **Corner radii:** controls **10px**, cards **14px**, large panels **20px**, pills full.
  Consistent rounding is a core brand signature — soft but not bubbly.
- **Cards:** white surface, **1px `--slate-200` border + soft `--shadow-sm`** (cool-tinted,
  low-opacity). No heavy drop shadows. Interactive cards lift 2px and deepen to `--shadow-md`
  on hover. Never use a colored left-border-only accent card.
- **Shadows:** soft and cool (tinted with navy `rgba(19,27,39,...)`), five steps xs→xl.
  Inputs get `xs`, cards `sm`, hover `md`, popovers `lg`, modals `xl`.
- **Borders & dividers:** hairline `--slate-200`. Focus rings are a 3px translucent blue halo
  (`--ring-primary`), red for invalid fields.
- **Animation:** quick and restrained. `120–180ms` with a soft `ease-out`
  (`cubic-bezier(0.22,1,0.36,1)`). Buttons nudge up 1px on hover; cards lift 2px; progress
  bars ease their width. No bounce, no infinite decorative loops.
- **Hover states:** buttons darken one step (primary 500→600) and lift; secondary/ghost get a
  slate-100 wash; rows get a slate-50 wash.
- **Press states:** color deepens one more step (600→700); no scale-down.
- **Transparency / blur:** used sparingly — modal scrims (`rgba(11,31,56,0.45)`), the
  sidebar active/hover washes, and translucent status pills. No glassmorphism.
- **Imagery:** product is data-first; there is little photography. Avatars are
  initials-based with deterministic brand-tinted colors. Receipts carry the logo.
- **Layout:** fixed 264px navy sidebar (collapsible to 76px), fixed 64px topbar, fluid
  content to a 1440px max with 32px gutters. Responsive down to tablet/mobile (sidebar becomes
  a drawer).

---

## Iconography

- **Library:** [**Lucide**](https://lucide.dev) — clean 2px-stroke, rounded-join line icons.
  This matches the Stripe/Notion aesthetic and pairs well with Plus Jakarta Sans. Load from
  CDN: `https://unpkg.com/lucide@latest` (or inline the SVGs you need).
- **Style rules:** line icons only, **2px stroke**, `round` caps and joins, 16–22px in UI,
  24px in stat-card chips. Icons inherit `currentColor`. Stat-card icons sit in a tinted
  rounded chip matching the card tone.
- **Money / currency:** the **₨ (U+20A8) / "Rs"** glyph is used as a text icon for amounts,
  not a drawn SVG.
- **WhatsApp:** the official WhatsApp glyph (filled) appears only on reminder send buttons and
  the reminders module, always in WhatsApp green.
- **Emoji / unicode icons:** not used as UI icons.
- No icon font is bundled (no custom brand icon set was supplied) — Lucide is the substitute,
  flagged here. Swap in a bespoke set later if the brand defines one.

---

## Index / Manifest

**Root**
- `styles.css` — global entry (import manifest). Consumers link this one file.
- `readme.md` — this guide.
- `SKILL.md` — Agent-Skill front-matter for use in Claude Code.

**Tokens** (`tokens/`)
- `colors.css` — brand/navy/slate scales, semantic + status aliases, chart palette.
- `typography.css` — families, weights, type scale, line-height, tracking.
- `spacing.css` — spacing, radii, border widths, shadows, layout, motion.
- `fonts.css` — Plus Jakarta Sans + IBM Plex Mono (Google Fonts).
- `base.css` — light element resets, scrollbar, selection.

**Components** (`components/`) — namespace `window.AlRehmanFeeManagerDesignSystem_ad9d9e`
- `core/` — `Button`, `Badge`, `Avatar`, `Card`
- `forms/` — `Input`, `Select`
- `data/` — `StatCard`, `ProgressBar`

**Foundation cards** (`guidelines/`) — specimen cards shown in the Design System tab
(Colors, Type, Spacing, Brand).

**UI kits** (`ui_kits/`)
- `fee_manager/` — full-screen desktop recreation of the product: dashboard, students, fee
  collection, reports, WhatsApp reminders, receipt, settings. See its README.
- `fee_manager_mobile/` — mobile companion app in an iOS frame: home, students, collect,
  reminders + a More menu (reports, receipts, notifications, parent portal, settings). See its README.
- `fee_manager_android/` — the same mobile screens in an Android (Material 3) frame with a
  Material navigation bar. Reuses `fee_manager_mobile/mobile.jsx`. See its README.

**Assets** (`assets/`)
- `logo-horizontal.svg` / `logo-horizontal-white.svg` — primary lockup.
- `logo-stacked.svg` / `logo-stacked-white.svg` — alternate stacked lockup.
- `logo-mark.svg` / `logo-mark-white.svg` — calligraphic app mark / favicon.

---

### Fonts note (action needed)

No brand font files were supplied, so the system uses **Plus Jakarta Sans** (UI/display) and
**IBM Plex Mono** (figures) from Google Fonts as the canonical typefaces. If Al Rehman Academy
has licensed brand fonts, drop the files into `tokens/` and replace the `@import` in
`tokens/fonts.css` with `@font-face` rules.
