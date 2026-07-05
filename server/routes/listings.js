const express = require("express");
const router = express.Router();
const listings = require("../data/listings");

router.get("/", (req, res) => {
  const summary = listings.map(
    ({ slug, title, shortDescription, type, guests, bedrooms, beds, baths, rating, reviews, pricePerNight, currency, locationLabel, images }) => ({
      slug, title, shortDescription, type, guests, bedrooms, beds, baths, rating, reviews, pricePerNight, currency, locationLabel,
      cover: images[0],
    })
  );
  res.json(summary);
});

router.get("/:slug", (req, res) => {
  const listing = listings.find((l) => l.slug === req.params.slug);
  if (!listing) return res.status(404).json({ error: "Hebergement introuvable" });
  res.json(listing);
});

module.exports = router;
