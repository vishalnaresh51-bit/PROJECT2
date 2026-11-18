const { THRESHOLDS, readingAt, decideIrrigation } = require("../lib/sim");

// GET /api/sensors?mode=auto|manual&on=true|false
module.exports = (req, res) => {
  const mode = req.query.mode === "manual" ? "manual" : "auto";
  const manualOn = req.query.on === "true";

  const reading = readingAt(Date.now());
  const irrigationOn = decideIrrigation(reading, mode, manualOn);

  res.setHeader("Cache-Control", "no-store");
  res.status(200).json({ ...reading, mode, irrigationOn, thresholds: THRESHOLDS });
};
