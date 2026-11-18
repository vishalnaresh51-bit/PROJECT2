# Smart Agriculture Monitoring System

Monitors farm field conditions and controls irrigation in auto or manual mode. Built for Vercel.

## Features
- Live readings: soil moisture, temperature, humidity, soil pH, light level
- Auto irrigation: ON when soil moisture < 35% or temperature > 40°C
- Manual mode with Start / Stop irrigation
- Recent readings table (last 10)

## Project Structure
```
smart-agriculture/
├── index.html          # Dashboard (served at /)
├── api/
│   ├── sensors.js      # GET /api/sensors
│   └── history.js      # GET /api/history
├── lib/
│   └── sim.js          # Sensor simulation + irrigation logic
├── package.json
└── README.md
```

## Deploy on Vercel
1. Push this folder to a GitHub repo, or drag the folder into Vercel.
2. Import the project in Vercel. No build command or output directory is needed.
3. Deploy. Open the URL shown, e.g. `https://your-project.vercel.app`.

## Run locally
Install Vercel CLI once, then run:
```bash
npm i -g vercel
vercel dev
```
Open http://localhost:3000

## API
| Method | Endpoint | Query | Description |
|--------|----------|-------|-------------|
| GET | /api/sensors | `mode=auto\|manual`, `on=true\|false` | Latest reading + irrigation state |
| GET | /api/history | same | Last 20 readings (30s apart) |

## Notes
- Sensor values are simulated from the current time. To use real hardware, replace `lib/sim.js` with data from your sensors or an IoT gateway (ESP32/Arduino via MQTT or a cloud API).
- Mode and manual on/off are saved in the browser (localStorage). For shared state across devices, add a database such as Vercel KV or MongoDB.
