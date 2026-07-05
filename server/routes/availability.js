const express = require("express");
const router = express.Router();
const listings = require("../data/listings");
const { getBlockedNightsSet } = require("../lib/availability");

router.get("/:slug", (req, res) => {
  const listing = listings.find((l) => l.slug === req.params.slug);
  if (!listing) return res.status(404).json({ error: "Hebergement introuvable" });

  const blockedNights = Array.from(getBlockedNightsSet(listing.slug)).sort();
  res.json({ slug: listing.slug, blockedNights });
});

module.exports = router;
