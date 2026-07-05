const nodemailer = require("nodemailer");

let transporter = null;
if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
}

async function sendBookingConfirmation(booking, listing) {
  const subject = `Reservation confirmee - ${listing.title}`;
  const text = `Nouvelle reservation confirmee sur Amazigh Farm

Hebergement : ${listing.title}
Client : ${booking.name} (${booking.email}, ${booking.phone || "telephone non fourni"})
Arrivee : ${booking.checkin}
Depart : ${booking.checkout}
Nuits : ${booking.nights}
Voyageurs : ${booking.guests}
Montant paye : ${booking.amount} ${booking.currency.toUpperCase()}
Reference : ${booking.id}
`;

  if (!transporter) {
    console.log("[mailer] SMTP non configure, email non envoye :\n", text);
    return;
  }

  const notifyEmail = process.env.NOTIFY_EMAIL || process.env.SMTP_USER;
  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: [notifyEmail, booking.email].filter(Boolean).join(","),
      subject,
      text,
    });
  } catch (err) {
    console.error("[mailer] echec envoi email :", err.message);
  }
}

module.exports = { sendBookingConfirmation };
