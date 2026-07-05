const express = require("express");
const router = express.Router();
const { nanoid } = require("nanoid");
const Stripe = require("stripe");
const listings = require("../data/listings");
const db = require("../db");
const { isValidDateRange, countNights } = require("../lib/dates");
const { isRangeAvailable } = require("../lib/availability");

const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;

router.post("/checkout", async (req, res) => {
  try {
    if (!stripe) {
      return res.status(500).json({
        error: "Paiement non configure. Ajoute STRIPE_SECRET_KEY dans le fichier .env du serveur.",
      });
    }

    const { slug, checkin, checkout, guests, name, email, phone } = req.body || {};

    const listing = listings.find((l) => l.slug === slug);
    if (!listing) return res.status(404).json({ error: "Hebergement introuvable" });

    if (!name || !email) {
      return res.status(400).json({ error: "Nom et email requis" });
    }
    if (!isValidDateRange(checkin, checkout)) {
      return res.status(400).json({ error: "Dates de sejour invalides" });
    }

    const nights = countNights(checkin, checkout);
    if (nights < listing.minNights) {
      return res.status(400).json({ error: `Sejour minimum de ${listing.minNights} nuit(s) pour cet hebergement` });
    }

    const guestCount = Number(guests) || 1;
    if (guestCount > listing.guests) {
      return res.status(400).json({ error: `Ce logement accueille au maximum ${listing.guests} voyageurs` });
    }

    if (!isRangeAvailable(slug, checkin, checkout)) {
      return res.status(409).json({ error: "Ces dates ne sont plus disponibles, merci d'en choisir d'autres" });
    }

    const amount = nights * listing.pricePerNight + listing.cleaningFee;
    const currency = (process.env.CURRENCY || listing.currency || "eur").toLowerCase();
    const bookingId = nanoid(10);
    const siteUrl = process.env.SITE_URL || `${req.protocol}://${req.get("host")}`;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency,
            unit_amount: Math.round(amount * 100),
            product_data: {
              name: `${listing.title} - ${nights} nuit(s)`,
              description: `Du ${checkin} au ${checkout} - Amazigh Farm (Oumnass, Marrakech)`,
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${siteUrl}/merci.html?booking=${bookingId}`,
      cancel_url: `${siteUrl}/gite.html?slug=${slug}`,
      metadata: { bookingId, slug, checkin, checkout, guests: String(guestCount), name, email, phone: phone || "" },
    });

    db.get("bookings")
      .push({
        id: bookingId,
        slug,
        checkin,
        checkout,
        guests: guestCount,
        name,
        email,
        phone: phone || "",
        nights,
        amount,
        currency,
        status: "pending",
        stripeSessionId: session.id,
        createdAt: new Date().toISOString(),
      })
      .write();

    res.json({ url: session.url });
  } catch (err) {
    console.error("[booking/checkout]", err);
    res.status(500).json({ error: "Erreur lors de la creation du paiement" });
  }
});

module.exports = router;
