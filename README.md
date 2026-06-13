# Portsmouth Tides

A tide tracking app for Sakonnet River / Portsmouth, RI. Built for Cloudflare Pages.

## Tide Data

All data is free from the **NOAA CO-OPS API** (no API key required):
- **Tide predictions**: Sakonnet Point station `8454049`
- **Wind conditions**: Newport station `8452660`
- **Water temperature**: Providence station `8454000`

## Deploy to Cloudflare

```bash
npx wrangler deploy
```

This deploys as a **Cloudflare Worker with static assets** (the modern approach).
Alternatively, for Cloudflare Pages:

```bash
npx wrangler pages deploy public --project-name portsmouth-tides
```

## Local dev

```bash
npx serve public
```
