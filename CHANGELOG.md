# Changelog

## [Unreleased]

## [v3] — 2026-06-13
### Added
- Satellite/street map toggle button overlaid on Map tab

## [v2] — 2026-06-13
### Added
- Multi-location support — search ~3,400 NOAA tide stations, save favorites
- Station list bundled locally as `stations.json` (fixes CORS error with NOAA metadata API)
- Error states with retry buttons on all data-loading screens
- Next-tide countdown carries over midnight (fetches tomorrow's tides)
- Smooth tide chart using Catmull-Rom interpolation
- Wave-only app icon, PWA installable on iOS and Android
- Works in Safari and Chrome on iOS without installing (bottom nav visible behind browser chrome)

### Fixed
- H/L marker placement uses exact minutes, not just the hour
- Current-time dot and H/L markers use consistent coordinate system
- Bottom nav hidden behind Safari toolbar on iOS (`100dvh` + `env(safe-area-inset-bottom)`)

## [v1] — 2026-06-13
### Added
- Initial release as **Tidewatch** (formerly Portsmouth Tides)
- Live tide height with rising/falling indicator
- Animated tide chart for today
- Next-tide countdown (live)
- Today's tide events (H/L times)
- Conditions grid — wind, water temperature, moon phase, station info
- 4-day outlook
- Timeline tab with date picker
- 7-Day tab with NWS weather per day
- Map tab with Leaflet satellite view
- PWA service worker (offline app shell)
- Moon phase from lunar cycle calculation
- Cloudflare Pages deployment
