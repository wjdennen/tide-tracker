# Tidewatch

A PWA tide tracker for coastal locations, built by [ClamCode](https://github.com/wjdennen). Defaults to Sakonnet River, RI. Deployed on Cloudflare Pages.

## Features

- **Live tide height** with rising/falling indicator and animated chart
- **Next tide countdown** — ticks live, carries over into the next day
- **Multi-location support** — search any of ~3,400 NOAA tide stations, save favorites
- **7-day outlook** — high/low tides with NWS weather, UV index, and temp per day
- **Moon phase** — calculated from lunar cycle math, rendered as inline SVG
- **Sunrise/sunset** — calculated from station lat/lon, no API call
- **Conditions** — wind and water temperature from NOAA sensors (falls back to nearest station with a sensor if the selected station has none)
- **Timeline tab** — browse any date with a calendar picker
- **Map tab** — Leaflet map with satellite/street toggle
- **PWA** — installable on iOS and Android, works offline (app shell cached)
- Works in Safari and Chrome on iOS without installing

## Data sources (all free, no API key)

- **Tide predictions**: [NOAA CO-OPS API](https://tidesandcurrents.noaa.gov/api/)
- **Weather**: [NWS API](https://www.weather.gov/documentation/services-web-api) (`api.weather.gov`)
- **UV index**: [Open-Meteo](https://open-meteo.com/) — daily max, 7-day forecast
- **Station list**: bundled as `public/stations.json` (sourced from NOAA metadata — no CORS headers on the upstream endpoint so served locally)

### Data sources for Sakonnet Point (lat 41.4551, lon −71.1997)

| What | Source | Station / Endpoint |
|------|--------|--------------------|
| Tide predictions & hourly heights | NOAA CO-OPS | [Station 8454049 — Sakonnet Point, RI](https://tidesandcurrents.noaa.gov/stationhome.html?id=8454049) |
| Wind | NOAA CO-OPS | Falls back to [Newport, RI (8452660)](https://tidesandcurrents.noaa.gov/stationhome.html?id=8452660) — Sakonnet Point has no wind sensor |
| Water temperature | NOAA CO-OPS | Falls back to [Narragansett Pier, RI (8452944)](https://tidesandcurrents.noaa.gov/stationhome.html?id=8452944) — Sakonnet Point has no water temp sensor |
| Weather forecast (desc, H/L temps, wind) | [NWS API](https://www.weather.gov/documentation/services-web-api) | [Gridpoint 41.4551,−71.1997](https://api.weather.gov/points/41.4551,-71.1997) → office [BOX (Boston/Norton, MA)](https://www.weather.gov/box/) — land-based forecast for the Portsmouth/Little Compton area |
| UV index | [Open-Meteo](https://open-meteo.com/) | Model-interpolated daily max at lat/lon — no station |
| Sunrise / Sunset | Calculated in-app | Julian date algorithm using station coordinates — no API call |
| Moon phase | Calculated in-app | Lunar cycle math from a known new moon epoch — no API call |

> Wind and water temp readings are marine conditions (open water sensors). The NWS weather forecast is land-based.

## Station list

`stations.json` is a static snapshot of NOAA tide stations. Refresh it periodically to pick up new/changed stations:

```bash
./scripts/refresh-stations.sh
```

Then commit and push — no SW cache bump needed.

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

> **Note:** bump `const CACHE = 'tidewatch-vN'` in `public/sw.js` on every deploy that changes app shell files (`index.html`, `manifest.json`, icons), so installed PWAs pick up the update.

## Stack

- Vanilla HTML/CSS/JS — no framework, no build step
- [Leaflet](https://leafletjs.com/) for the map (Esri satellite + street tiles)
- [Open-Meteo](https://open-meteo.com/) for UV index
- Cloudflare Pages (static assets via `wrangler.toml`)
