const { readingAt, decideIrrigation } = require("../lib/sim");

// GET /api/history?mode=auto|manual&on=true|false
// Returns the last 20 readings, one every 30 seconds.
module.exports = (req, res) => {
  const mode = req.query.mode === "manual" ? "manual" : "auto";
  const manualOn = req.query.on === "true";
  const now = Date.now();

  const history = [];
  for (let i = 19; i >= 0; i--) {
    const r = readingAt(now - i * 30000);
    r.irrigationOn = decideIrrigation(r, mode, manualOn);
    history.push(r);
  }

  res.setHeader("Cache-Control", "no-store");
  res.status(200).json(history);
};
