# Tidewatch — Recommended Improvements

## Maintenance

- **Refresh station list** — `stations.json` is a static NOAA snapshot. Re-run every few months to pick up new/changed stations:
  ```bash
  ./scripts/refresh-stations.sh
  ```
  Then commit and push. No SW cache bump needed.

- **Fix Cloudflare project name mismatch** — `wrangler.toml` says `name = "tidewatch"` but the Cloudflare project is named `portsmouth-tides`. The Cloudflare bot keeps opening a branch `update_worker_name_to_portsmouth-tides` to "fix" this. Resolve by either:
  - Updating `wrangler.toml` to `name = "portsmouth-tides"` (no URL change), or
  - Renaming the Cloudflare project to `tidewatch` in the dashboard Settings (changes `.pages.dev` subdomain)

## Remaining features

3. **Tide height unit toggle (ft / m)** — one tap to switch, persisted in localStorage.
7. **Smooth tab transitions** — slide or fade between tabs instead of instant switch.
8. **Chart touch interaction** — tap a point on the chart to see exact height and time at that position.

## Timeline improvements

**13. Hourly weather forecast on Timeline**
- Add hourly weather below the existing weather summary (emoji/desc/temp/UV) and above the tide events list
- Data source: NWS `forecastHourly` endpoint — same points call already used for daily forecast, just a different URL (`ptJson.properties.forecastHourly`)
- Cache as `cachedHourlyWeather` (module-level, cleared on station change alongside `nwsWeather`)
- Filter to hours on `selectedDate` for display
- Design TBD: every 3 hours (6AM/9AM/noon/3PM/6PM/9PM) or all 24? Columns: time, emoji, temp, rain %. Wind optional.
