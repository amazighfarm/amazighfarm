const db = require("../db");
const { nightsBetween } = require("./dates");

function getBlockedNightsSet(slug) {
  const blocks = db.get("blocks").filter({ slug }).value();
  const set = new Set();
  for (const block of blocks) {
    for (const night of nightsBetween(block.startDate, block.endDate)) {
      set.add(night);
    }
  }
  return set;
}

function isRangeAvailable(slug, checkinISO, checkoutISO) {
  const blocked = getBlockedNightsSet(slug);
  const wanted = nightsBetween(checkinISO, checkoutISO);
  return wanted.every((n) => !blocked.has(n));
}

module.exports = { getBlockedNightsSet, isRangeAvailable };
