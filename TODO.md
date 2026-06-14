# Tide Tracker — Recommended Improvements

## Maintenance
- **Refresh station list** — `stations.json` is a static NOAA snapshot. Re-run every few months to pick up new/changed stations:
  ```bash
  ./scripts/refresh-stations.sh
  ```
  Then commit and push. No SW cache bump needed.

## High value, straightforward
1. ~~**PWA manifest + service worker**~~ — app icon, splash screen, offline support. *(implemented)*
2. ~~**Auto-refresh on a timer**~~ — 15-minute background refresh to keep live reading current. *(implemented)*
3. **Tide height unit toggle (ft / m)** — one tap to switch, persisted in localStorage.

## Improves the core experience
4. ~~**"Next tide" countdown that ticks in real time**~~ — "2h 14m" should count down live like a clock. *(implemented)*
5. ~~**Moon phase from an actual calculation**~~ — real lunar cycle math (~20 lines) instead of random emojis. *(implemented)*
6. ~~**Date picker on the Timeline tab**~~ — calendar popup to jump to a specific date without many taps. *(implemented)*

## Polish
7. **Smooth tab transitions** — slide or fade between tabs instead of instant switch.
8. **Chart touch interaction** — tap a point on the chart to see exact height and time at that position.
9. ~~**Better empty/error states**~~ — if NOAA is down, show a clear message instead of dashes. *(implemented)*
10. ~~**App icon and name**~~ — proper wave favicon/icon for home screen. *(implemented)*

## Performance — reduce API calls
On a fresh dashboard load the app makes ~9 API calls. Two fixes would cut that significantly.

**11. Cache wind and water temp** (biggest win)
- `fetchWind()` and `fetchWaterTemp()` have no caching at all. They fire a fresh NOAA call on every `loadDashboard()` invocation, including the 15-minute auto-refresh timer.
- Fix: add a `conditionsCache` object keyed by station ID, storing `{ wind, waterTemp, fetchedAt }`. Skip the fetch if `Date.now() - fetchedAt < 15 * 60 * 1000`. Clear on `reloadData()` (manual refresh) but NOT on the auto-refresh timer (the timer fires at 15 min anyway).
- These are in `loadDashboard()` around line 975–976 in index.html.

**12. Smarter auto-refresh cache clearing**
- On auto-refresh (the `setInterval` at ~line 1358) and on `reloadData()` (~line 1339), the code does `tideData = {}` which nukes everything — including hilo predictions for future days that don't change.
- Fix: instead of clearing the whole object, only delete today's hourly key: `delete tideData[\`hourly-${station.id}-${fmt(new Date())}\`]`. HiLo predictions for any date are stable and safe to keep cached indefinitely.
- NWS weather (`nwsWeather = null`) can stay as-is since forecasts do update during the day.
