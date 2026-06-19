# Fee Manager — UI Kit

A high-fidelity, click-through recreation of the **Al Rehman Fee Manager** web app. Open
`index.html` and navigate via the sidebar — every screen is interactive (search students,
send reminders, upload a payment screenshot for OCR, etc.).

## Screens
- **Dashboard** — 5 KPI stat cards (Total Students, Expected, Collected, Pending,
  Collection %), Expected-vs-Received bar chart, collection-rate donut, yearly trend, recent
  payments feed.
- **Students** — searchable table with avatars, class, monthly fee, status & fee-status
  badges, parent WhatsApp numbers, row actions.
- **Fee Collection** — drag-and-drop screenshot upload with simulated OCR auto-detect, plus a
  payment-record form (transaction ID, amount, fee month, status).
- **Reports** — yearly revenue bars, top/lowest collection months, full-year analytics, PDF &
  Excel export buttons.
- **WhatsApp Reminders** — pending-fee list with per-student & bulk send, reminder history,
  automated schedule note.
- **Receipts** — professional printable fee receipt with academy logo, student details,
  amount, transaction ID; download / print / send-to-parent actions.
- **Settings** — academy info, logo upload, WhatsApp integration status, payment methods.

## Files
- `index.html` — app shell + router (the entry point / `@dsCard` thumbnail).
- `shell.jsx` — `Sidebar` + `Topbar`.
- `screens.jsx` — all seven screens.
- `charts.jsx` — lightweight inline-SVG charts (no chart library).
- `icons.jsx` — Lucide line-icon registry + WhatsApp glyph.
- `data.jsx` — realistic mock data (students, transactions, monthly collection, reminders).

## Notes
- Composes the design-system primitives from
  `window.AlRehmanFeeManagerDesignSystem_ad9d9e` — it does not re-implement Button, Card, etc.
- This is a cosmetic recreation: no backend, no real OCR, no real WhatsApp delivery.
