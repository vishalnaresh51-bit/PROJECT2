// Simulated field sensors and irrigation logic.
// Readings are computed from the timestamp, so they work on serverless
// platforms (Vercel) without a database or in-memory state.

const THRESHOLDS = { soilMoistureMin: 35, tempMax: 40 };

// Deterministic pseudo-random value in [0, 1) for a given seed
function rand(seed) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

function readingAt(ts) {
  const slot = Math.floor(ts / 5000);
  const noise = (k) => rand(slot * 7 + k) - 0.5;
  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

  const soilMoisture = clamp(50 + 20 * Math.sin(ts / 600000) + noise(1) * 6, 10, 80);
  const temperature = clamp(30 + 8 * Math.sin(ts / 900000 + 1) + noise(2) * 2, 15, 45);
  const humidity = clamp(60 + 15 * Math.sin(ts / 700000 + 2) + noise(3) * 4, 30, 95);
  const ph = clamp(6.5 + 0.4 * Math.sin(ts / 1200000) + noise(4) * 0.1, 5, 8);
  const lightLevel = Math.round(clamp(600 + 400 * Math.sin(ts / 3600000 * Math.PI) , 0, 1000));

  return {
    timestamp: new Date(ts).toISOString(),
    soilMoisture: +soilMoisture.toFixed(1),
    temperature: +temperature.toFixed(1),
    humidity: +humidity.toFixed(1),
    ph: +ph.toFixed(2),
    lightLevel,
  };
}

// mode: "auto" uses thresholds, "manual" uses the user's on/off choice
function decideIrrigation(reading, mode, manualOn) {
  if (mode === "manual") return !!manualOn;
  return (
    reading.soilMoisture < THRESHOLDS.soilMoistureMin ||
    reading.temperature > THRESHOLDS.tempMax
  );
}

module.exports = { THRESHOLDS, readingAt, decideIrrigation };
