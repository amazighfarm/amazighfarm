const express = require("express");
const router = express.Router();
const { nanoid } = require("nanoid");
const db = require("../db");
const listings = require("../data/listings");
const { isValidDateRange } = require("../lib/dates");
const { syncAll, syncListing } = require("../lib/icalSync");

router.use((req, res, next) => {
  const token = (req.headers.authorization || "").replace("Bearer ", "");
  if (!process.env.ADMIN_TOKEN || token !== process.env.ADMIN_TOKEN) {
    return res.status(401).json({ error: "Non autorise" });
  }
  next();
});

router.get("/bookings", (req, res) => {
  res.json(db.get("bookings").sortBy("createdAt").reverse().value());
});

router.get("/blocks", (req, res) => {
  res.json(db.get("blocks").value());
});

router.post("/blocks", (req, res) => {
  const { slug, startDate, endDate, reason } = req.body || {};
  const listing = listings.find((l) => l.slug === slug);
  if (!listing) return res.status(404).json({ error: "Hebergement introuvable" });
  if (!isValidDateRange(startDate, endDate)) return res.status(400).json({ error: "Dates invalides" });

  const block = {
    id: nanoid(10),
    slug,
    startDate,
    endDate,
    source: "manual",
    reason: reason || "Blocage manuel",
    createdAt: new Date().toISOString(),
  };
  db.get("blocks").push(block).write();
  res.json(block);
});

router.delete("/blocks/:id", (req, res) => {
  db.get("blocks").remove({ id: req.params.id }).write();
  res.json({ ok: true });
});

router.post("/sync-ical", async (req, res) => {
  const { slug } = req.query;
  if (slug) {
    const listing = listings.find((l) => l.slug === slug);
    if (!listing) return res.status(404).json({ error: "Hebergement introuvable" });
    return res.json(await syncListing(listing));
  }
  res.json(await syncAll());
});

module.exports = router;
