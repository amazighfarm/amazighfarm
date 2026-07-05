const ical = require("node-ical");
const db = require("../db");
const listings = require("../data/listings");
const { toISODate } = require("./dates");

async function syncListing(listing) {
  if (!listing.icalUrl) return { slug: listing.slug, synced: false, reason: "pas d'URL iCal configuree" };

  try {
    const events = await ical.async.fromURL(listing.icalUrl);
    const ranges = Object.values(events)
      .filter((e) => e.type === "VEVENT" && e.start && e.end)
      .map((e) => ({
        startDate: toISODate(new Date(e.start)),
        endDate: toISODate(new Date(e.end)),
      }));

    db.get("blocks").remove({ slug: listing.slug, source: "airbnb-ical" }).write();

    for (const range of ranges) {
      db.get("blocks")
        .push({
          id: `ical-${listing.slug}-${range.startDate}-${range.endDate}`,
          slug: listing.slug,
          startDate: range.startDate,
          endDate: range.endDate,
          source: "airbnb-ical",
          reason: "Reserve sur Airbnb",
          createdAt: new Date().toISOString(),
        })
        .write();
    }

    return { slug: listing.slug, synced: true, blockedRanges: ranges.length };
  } catch (err) {
    return { slug: listing.slug, synced: false, reason: err.message };
  }
}

async function syncAll() {
  const results = [];
  for (const listing of listings) {
    results.push(await syncListing(listing));
  }
  return results;
}

module.exports = { syncListing, syncAll };
