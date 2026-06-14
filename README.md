# Tidewatch

A PWA tide tracker for coastal locations, built by [ClamCode](https://github.com/wjdennen). Defaults to Sakonnet River, RI. Deployed on Cloudflare Pages.

## Features

- **Live tide height** with rising/falling indicator and animated chart
- **Next tide countdown** — ticks live, carries over into the next day
- **Multi-location support** — search any of ~3,400 NOAA tide stations, save favorites
- **7-day forecast** — high/low tides with NWS weather per day
- **Moon phase** — calculated from lunar cycle math
- **Timeline tab** — browse any date with a calendar picker
- **Conditions** — wind and water temperature from NOAA sensors
- **PWA** — installable on iOS and Android, works offline (app shell cached)
- Works in Safari and Chrome on iOS without installing

## Data sources (all free, no API key)

- **Tide predictions**: [NOAA CO-OPS API](https://tidesandcurrents.noaa.gov/api/)
- **Weather**: [NWS API](https://www.weather.gov/documentation/services-web-api) (`api.weather.gov`)
- **Station list**: bundled as `public/stations.json` (sourced from NOAA metadata, no CORS headers on the upstream endpoint so served locally)

## Local dev

```bash
npx vite public
# or
npx serve public
```

## Deploy

Deploys automatically via Cloudflare Pages on push to `main`. Manual deploy:

```bash
npx wrangler deploy
```

> **Note:** bump `const CACHE = 'tidewatch-vN'` in `public/sw.js` whenever app shell files change (`index.html`, `manifest.json`, icons), so installed PWAs pick up the update.

## Stack

- Vanilla HTML/CSS/JS — no framework, no build step
- [Leaflet](https://leafletjs.com/) for the station map
- Cloudflare Pages (static assets via `wrangler.toml`)
