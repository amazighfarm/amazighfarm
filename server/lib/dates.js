function toISODate(d) {
  return d.toISOString().slice(0, 10);
}

function parseISODate(s) {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

function addDays(date, days) {
  const d = new Date(date);
  d.setUTCDate(d.getUTCDate() + days);
  return d;
}

function nightsBetween(checkinISO, checkoutISO) {
  const nights = [];
  let cur = parseISODate(checkinISO);
  const end = parseISODate(checkoutISO);
  while (cur < end) {
    nights.push(toISODate(cur));
    cur = addDays(cur, 1);
  }
  return nights;
}

function countNights(checkinISO, checkoutISO) {
  const checkin = parseISODate(checkinISO);
  const checkout = parseISODate(checkoutISO);
  const diffMs = checkout.getTime() - checkin.getTime();
  return Math.round(diffMs / (1000 * 60 * 60 * 24));
}

function isValidDateRange(checkinISO, checkoutISO) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(checkinISO)) return false;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(checkoutISO)) return false;
  return countNights(checkinISO, checkoutISO) > 0;
}

module.exports = {
  toISODate,
  parseISODate,
  addDays,
  nightsBetween,
  countNights,
  isValidDateRange,
};
