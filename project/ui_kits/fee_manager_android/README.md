# Fee Manager — Android UI Kit

The **Android (Material 3)** build of the Al Rehman Fee Manager mobile app, shown inside an
Android device frame with a Material status bar, gesture nav, and a Material 3 navigation bar
(pill indicator behind the active tab).

It **reuses the exact same screens** as the iOS kit (`../fee_manager_mobile/mobile.jsx`) — only
the device frame and the bottom navigation differ, so the two platforms stay in sync. The
shared header simply uses a smaller top inset on Android (`window.MOBILE_STATUS_TOP = 12`).

## Screens
Same full feature set as the iOS kit — Home, Students, Collect, Remind (bottom nav) plus a
**More** tab opening Reports, Receipts, Notifications, Parent Portal and Settings.

## Files
- `index.html` — entry; mounts the Android frame + Material 3 navigation bar and the shared
  screens.
- `android-frame.jsx` — Material 3 device bezel, status bar, gesture nav (starter component).
- Screens, data, icons and charts are reused from `../fee_manager*/` — nothing duplicated.

## Notes
- Cosmetic recreation: no backend, no real OCR or WhatsApp delivery.
- To change which screens appear or their content, edit the shared
  `../fee_manager_mobile/mobile.jsx` — both iOS and Android update together.
