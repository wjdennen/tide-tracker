# Tide Tracker — Recommended Improvements

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
9. **Better empty/error states** — if NOAA is down, show a clear message instead of dashes.
10. **App icon and name** — proper wave favicon/icon for home screen.
