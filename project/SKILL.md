---
name: al-rehman-design
description: Use this skill to generate well-branded interfaces and assets for Al Rehman Fee Manager (the Al Rehman Academy fee-management SaaS), either for production or throwaway prototypes/mocks. Contains essential design guidelines, colors, type, fonts, logo assets, and a full UI kit of components and screens for prototyping.
user-invocable: true
---

Read the `readme.md` file within this skill, and explore the other available files (tokens,
components, ui_kits, guidelines, assets).

If creating visual artifacts (slides, mocks, throwaway prototypes, etc.), copy assets out and
create static HTML files for the user to view. If working on production code, copy assets and
read the rules here to become an expert in designing with this brand.

Quick map:
- `styles.css` — link this one file to inherit every token.
- `tokens/` — colors, typography, spacing, shadows, motion as CSS custom properties.
- `components/` — React primitives (Button, Badge, Avatar, Card, Input, Select, StatCard,
  ProgressBar) under `window.AlRehmanFeeManagerDesignSystem_ad9d9e`.
- `ui_kits/fee_manager/` — full click-through app recreation (dashboard, students, fee
  collection, reports, WhatsApp reminders, receipt, settings).
- `assets/` — Al Rehman Academy logo lockups (horizontal, stacked, mark; light + white).

Brand in one line: clean blue-and-white premium SaaS, brand blue **#248DCE** on slate/white,
navy sidebar, Plus Jakarta Sans + IBM Plex Mono, soft cool shadows, Lucide line icons, no
emoji, status = green/amber/red.

If the user invokes this skill without other guidance, ask them what they want to build,
ask a few focused questions, then act as an expert designer who outputs HTML artifacts or
production code as needed.
