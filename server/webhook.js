const Stripe = require("stripe");
const db = require("./db");
const listings = require("./data/listings");
const { sendBookingConfirmation } = require("./lib/mailer");

const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;

async function stripeWebhookHandler(req, res) {
  if (!stripe || !process.env.STRIPE_WEBHOOK_SECRET) {
    console.warn("[webhook] Stripe ou STRIPE_WEBHOOK_SECRET non configure, requete ignoree");
    return res.status(200).send();
  }

  let event;
  try {
    const signature = req.headers["stripe-signature"];
    event = stripe.webhooks.constructEvent(req.body, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("[webhook] signature invalide :", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const bookingId = session.metadata && session.metadata.bookingId;
    const booking = db.get("bookings").find({ id: bookingId }).value();

    if (booking && booking.status !== "confirmed") {
      db.get("bookings")
        .find({ id: bookingId })
        .assign({ status: "confirmed", confirmedAt: new Date().toISOString() })
        .write();

      db.get("blocks")
        .push({
          id: `booking-${bookingId}`,
          slug: booking.slug,
          startDate: booking.checkin,
          endDate: booking.checkout,
          source: "booking",
          reason: `Reservation ${bookingId} (${booking.name})`,
          createdAt: new Date().toISOString(),
        })
        .write();

      const listing = listings.find((l) => l.slug === booking.slug);
      await sendBookingConfirmation(booking, listing);
    }
  }

  res.json({ received: true });
}

module.exports = { stripeWebhookHandler };
