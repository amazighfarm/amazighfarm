require("dotenv").config();
const path = require("path");
const express = require("express");
const cors = require("cors");
const cron = require("node-cron");

const listingsRouter = require("./routes/listings");
const availabilityRouter = require("./routes/availability");
const bookingRouter = require("./routes/booking");
const adminRouter = require("./routes/admin");
const { stripeWebhookHandler } = require("./webhook");
const { syncAll } = require("./lib/icalSync");
const listings = require("./data/listings");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.post("/api/webhook", express.raw({ type: "application/json" }), stripeWebhookHandler);

app.use(express.json());

app.use("/api/listings", listingsRouter);
app.use("/api/availability", availabilityRouter);
app.use("/api/booking", bookingRouter);
app.use("/api/admin", adminRouter);

app.get("/api/config", (req, res) => {
  res.json({
    stripePublicKey: process.env.STRIPE_PUBLIC_KEY || "",
    currency: (process.env.CURRENCY || "eur").toUpperCase(),
    whatsapp: "212665773800",
  });
});

app.use(express.static(path.join(__dirname, "..", "public")));

app.listen(PORT, () => {
  console.log(`Amazigh Farm - serveur demarre sur le port ${PORT}`);
});

const hasIcalConfigured = listings.some((l) => l.icalUrl);
if (hasIcalConfigured) {
  cron.schedule("*/30 * * * *", async () => {
    console.log("[cron] Synchronisation des calendriers Airbnb...");
    const results = await syncAll();
    console.log("[cron] Resultat :", results);
  });
  syncAll().then((results) => console.log("[startup sync]", results));
} else {
  console.log("Aucune URL iCal configuree : le blocage automatique depuis Airbnb est desactive.");
  console.log("Voir server/lib/icalSync.js pour l'activer.");
}
