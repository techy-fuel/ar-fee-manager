# Fee Manager — Mobile UI Kit

The **mobile companion** to the Al Rehman Fee Manager desktop app, presented inside an iOS
device frame. Open `index.html` and use the bottom tab bar to move between screens — every
screen is interactive (search, tap-to-upload + OCR, send WhatsApp reminders).

## Screens (bottom tabs)
- **Home** — collection-rate header gauge, 2×2 KPI tiles (Students / Collected / Pending /
  Expected), collection trend, recent payments.
- **Students** — search + scrollable student cards with status, monthly fee, fee badge and a
  one-tap WhatsApp action.
- **Collect** — tap-to-upload payment screenshot with simulated OCR auto-detect and a compact
  confirm-payment form.
- **Remind** — pending-fee list with per-student and bulk WhatsApp send, plus reminder
  history.
- **More** — menu opening the rest of the product:
  - **Reports** — yearly revenue, top/lowest months, expected-vs-received, PDF/Excel export.
  - **Receipts** — branded fee receipt with download / print / send-to-parent.
  - **Notifications** — payments, pending alerts, reminder logs.
  - **Parent Portal** — parent-facing view: dues, next-due, fee history, downloadable receipts.
  - **Settings** — academy info, logo, WhatsApp integration, user roles, payment methods.

Every admin feature of the desktop app is reachable on mobile (4 primary tabs + a More menu;
sub-screens have a back button).

## Files
- `index.html` — entry; mounts the iOS frame, screens and bottom tab bar.
- `mobile.jsx` — all mobile screens (Home, Students, Collect, Remind + Reports, Receipt,
  Notifications, Settings, Parent Portal, More menu) and shared header/section/tile chrome.
- `ios-frame.jsx` — device bezel, status bar, home indicator (starter component).
- Reuses `../fee_manager/{icons,data,charts}.jsx` and the design-system components — no
  duplicated data or logic.

## Notes
- Cosmetic recreation: no backend, no real OCR or WhatsApp delivery.
- Same brand language as the desktop kit (navy header, brand-blue accents, Plus Jakarta Sans,
  WhatsApp green for reminders).
