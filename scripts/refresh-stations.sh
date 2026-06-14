#!/bin/sh
# Downloads the latest NOAA tide station list and updates public/stations.json.
# Run from the repo root: ./scripts/refresh-stations.sh

set -e

cd "$(dirname "$0")/.."

echo "Fetching NOAA station list..."
curl -sf "https://api.tidesandcurrents.noaa.gov/mdapi/prod/webapi/stations.json?expand=details&type=tidepredictions" \
  | node -e "
const d=JSON.parse(require('fs').readFileSync('/dev/stdin','utf8'));
const out=d.stations.map(s=>[s.id,s.name,s.state??'',parseFloat(s.lat),parseFloat(s.lng)]);
process.stdout.write(JSON.stringify(out));
" > public/stations.json

echo "Done. $(node -e "console.log(JSON.parse(require('fs').readFileSync('public/stations.json')).length)") stations written to public/stations.json"
echo "Commit and push when ready — no SW cache bump needed."
