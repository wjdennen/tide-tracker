# Changelog

## [Unreleased]

## [v21] — 2026-06-14
### Fixed
- Timeline trend badge showed "↑ FALLING" — arrow was hardcoded to ↑; now correctly shows ↑/↓
- Timeline "Current Height" showed first H/L tide value on non-today dates — now shows "—" since there is no meaningful current height for future/past dates
- Station cards next-tide finder ignored the date, breaking after midnight — now uses `parseTideTime()` for full Date comparison
- NOAA API error responses (station offline, bad params) were silently cached as empty data — now throws so callers can show error state and retry
- Timeline weather section was blank when navigating directly to Timeline before Dashboard loaded — now fetches NWS weather on demand
- `locateMe` called `runSearch('')` as a side-effect, briefly showing 8 random stations — now uses dedicated `loadNoaaStations()` helper
- `getTrend` could return wrong result with fewer than 2 hourly readings — now guards with early return
- `fmtTime` would throw on malformed NOAA timestamp — now returns "—" safely
### Changed
- Wind and water temp now cached for 15 minutes; subsequent renders within the window skip the NOAA fallback chain
- Auto-refresh (every 15 min) now only clears today's hourly tide data instead of wiping all cached predictions for future days
- Manual reload now also clears UV index and conditions cache for a true full refresh
- Station switch clears UV index and conditions cache in addition to tide and weather
- Chart gradient IDs are now deterministic (based on SVG element ID) instead of random per render
- Extracted `loadNoaaStations()` helper; `runSearch` and `locateMe` both use it, eliminating duplicate fetch/parse code
- Removed dead `weekData` state variable (was declared and cleared but never used)

## [1.0.0] — 2026-06-14
First stable release. Bundles all features developed across build versions v1–v17:
- Live tide height, chart, rising/falling indicator, next-tide countdown
- Dashboard conditions: wind, water temp (with sensor fallbacks), sunrise/sunset, moon phase
- 7-Day Outlook with NWS weather, H/L temps, UV index (Open-Meteo), chronological tides
- Timeline tab with date picker, weather summary, and astro info for any date
- Multi-location support — search ~3,400 NOAA stations, save favorites
- Map tab with satellite/street toggle (Esri via Leaflet)
- PWA — installable on iOS and Android, offline app shell, iOS safe area support

---
*Build history below*

## [v17] — 2026-06-14
### Fixed
- 7-Day Forecast tab showed "undefined°F" — `loadWeekView()` used a stale `wx.tempF` field (removed when H/L temps were added); now renders `H xx°F / L xx°F` consistent with the dashboard outlook

## [v16] — 2026-06-14
### Fixed
- Timeline sunrise/sunset times were blank — duplicate `getSunTimes` definition caused the second to override the first with an incompatible return shape; merged into one function returning both Date objects and formatted strings
### Added
- Timeline now shows weather forecast for the selected date — emoji, description, H/L temps, and UV index

## [v15] — 2026-06-14
### Fixed
- Wind and water temp showed "—" just after midnight — NOAA has no observations yet for a brand new day; now queries yesterday through today and takes the most recent reading

## [v14] — 2026-06-13
### Fixed
- Rising/Falling badge showed "Rising" incorrectly after 11 PM — loop didn't cover the last hour, fell through to hardcoded default; now falls back to comparing the final two data points
- Current-time dot overflowed the right edge of the chart near midnight — nowIdx now clamped to chart bounds

## [v13] — 2026-06-13
### Fixed
- `dateKey()` now uses local date instead of UTC — late-night UTC rollover was causing weather and UV lookups to match the wrong day
- Open-Meteo UV fetch increased to `forecast_days=8` to ensure all 7 outlook days are covered

## [v12] — 2026-06-13
### Added
- 7-Day Outlook now shows high and low temps: `H 72°F / L 61°F` (low is NWS overnight low)
- UV index moved to its own line below temps

## [v11] — 2026-06-13
### Added
- UV index in 7-Day Outlook — daily max from Open-Meteo (free, no API key, lat/lon based), color-coded: green ≤2, yellow ≤5, orange ≤7, red ≤10, purple 11+

## [v10] — 2026-06-13
### Fixed
- 7-Day Outlook tides now shown in chronological order — previously highs were grouped before lows, making the first-of-day low appear to belong to the next day

## [v9] — 2026-06-13
### Fixed
- 7-Day Outlook on dashboard was only fetching 4 days — now correctly shows 7

## [v8] — 2026-06-13
### Changed
- Replaced Station conditions card with Sunrise/Sunset card — times calculated locally from station lat/lon (no API call)

## [v7] — 2026-06-13
### Fixed
- Conditions cards: fallback source ("via Newport", "via Narragansett") now renders as a small muted sub-label instead of inline text, keeping all four cards visually consistent
- Bottom nav padding reduced in browser mode — tab bottom padding 16px → 6px, letting `env(safe-area-inset-bottom)` handle home indicator spacing

## [v6] — 2026-06-13
### Fixed
- Wind and Water Temp conditions cards now show data for stations without sensors — falls back to nearest station with a live sensor (Newport for wind, Narragansett Pier for water temp), labelled with source

## [v5] — 2026-06-13
### Fixed
- Header pushed under iOS status bar — added `env(safe-area-inset-top)` to top nav padding
- Empty space below bottom nav on iOS — `min-height: 100dvh` on `html`/`body` so background fills to physical screen edge

## [v4] — 2026-06-13
### Changed
- Moon phase icons replaced with inline SVGs (warm `#e8d5a3` lit portion on dark disk) — visible on dark background across all 8 phases

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
