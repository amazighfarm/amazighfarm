document.getElementById("year").textContent = new Date().getFullYear();

const params = new URLSearchParams(window.location.search);
const slug = params.get("slug");

let listing = null;
let blockedNights = new Set();
let images = [];
let currentImageIndex = 0;

function formatMoney(amount, currency) {
  return `${amount} ${currency}`;
}

function dateToISO(date) {
  return date.toISOString().slice(0, 10);
}

function nightsCount(checkinISO, checkoutISO) {
  const a = new Date(checkinISO + "T00:00:00Z");
  const b = new Date(checkoutISO + "T00:00:00Z");
  return Math.round((b - a) / 86400000);
}

async function init() {
  if (!slug) {
    document.getElementById("listing-title").textContent = "Hébergement introuvable";
    return;
  }

  const [listingRes, availRes] = await Promise.all([
    fetch(`/api/listings/${slug}`),
    fetch(`/api/availability/${slug}`),
  ]);

  if (!listingRes.ok) {
    document.getElementById("listing-title").textContent = "Hébergement introuvable";
    return;
  }

  listing = await listingRes.json();
  const avail = await availRes.json();
  blockedNights = new Set(avail.blockedNights || []);
  images = listing.images;

  renderListing();
  renderGallery();
  setupGuestSelect();
  setupDatePicker();
  setupLightbox();
  document.getElementById("book-btn").addEventListener("click", handleBooking);
}

function renderListing() {
  document.title = `${listing.title} — Amazigh Farm`;
  document.getElementById("page-title").textContent = `${listing.title} — Amazigh Farm`;
  document.getElementById("listing-title").textContent = listing.title;
  document.getElementById("listing-meta").textContent =
    `${listing.type} · ${listing.guests} voyageurs · ${listing.bedrooms} chambre(s) · ${listing.beds} lit(s) · ${listing.baths} salle(s) de bain ${listing.bathType}`;

  const locationEl = document.getElementById("listing-location");
  locationEl.textContent = listing.locationLabel || "";
  locationEl.style.display = listing.locationLabel ? "block" : "none";

  document.getElementById("listing-description").textContent = listing.description;

  document.getElementById("listing-amenities").innerHTML = listing.amenities
    .map((a) => `<span>${a}</span>`)
    .join("");

  document.getElementById("box-price").textContent = formatMoney(listing.pricePerNight, listing.currency);
  document.getElementById("box-rating").textContent = listing.rating
    ? `${listing.rating} · ${listing.reviews} avis`
    : "Nouvelle annonce";
}

function renderGallery() {
  const gallery = document.getElementById("gallery");
  gallery.innerHTML = images
    .map((img, i) => `<img src="${img}" data-index="${i}" alt="${listing.title}" />`)
    .join("");
  gallery.querySelectorAll("img").forEach((img) => {
    img.addEventListener("click", () => openLightbox(Number(img.dataset.index)));
  });
}

function setupLightbox() {
  const lb = document.getElementById("lightbox");
  document.getElementById("lb-close").addEventListener("click", () => lb.classList.remove("open"));
  document.getElementById("lb-prev").addEventListener("click", () => moveLightbox(-1));
  document.getElementById("lb-next").addEventListener("click", () => moveLightbox(1));
  lb.addEventListener("click", (e) => { if (e.target === lb) lb.classList.remove("open"); });
}

function openLightbox(index) {
  currentImageIndex = index;
  document.getElementById("lb-img").src = images[index];
  document.getElementById("lightbox").classList.add("open");
}

function moveLightbox(delta) {
  currentImageIndex = (currentImageIndex + delta + images.length) % images.length;
  document.getElementById("lb-img").src = images[currentImageIndex];
}

function setupGuestSelect() {
  const select = document.getElementById("guests");
  select.innerHTML = Array.from({ length: listing.guests }, (_, i) => i + 1)
    .map((n) => `<option value="${n}">${n} voyageur${n > 1 ? "s" : ""}</option>`)
    .join("");
}

function setupDatePicker() {
  const checkinInput = document.getElementById("checkin");
  const checkoutInput = document.getElementById("checkout");

  const disableDates = (date) => {
    const iso = dateToISO(date);
    return blockedNights.has(iso);
  };

  const fp = flatpickr([checkinInput, checkoutInput], {
    mode: "range",
    locale: "fr",
    minDate: "today",
    dateFormat: "Y-m-d",
    altInput: true,
    altFormat: "d M Y",
    disable: [disableDates],
    onDayCreate: function (dObj, dStr, fpInstance, dayElem) {
      const iso = dateToISO(dayElem.dateObj);
      if (blockedNights.has(iso)) dayElem.classList.add("blocked-night");
    },
    onChange: function (selectedDates) {
      if (selectedDates.length === 2) {
        updatePriceBreakdown(dateToISO(selectedDates[0]), dateToISO(selectedDates[1]));
      }
    },
  });

  window._flatpickrInstance = fp;
}

function updatePriceBreakdown(checkinISO, checkoutISO) {
  const nights = nightsCount(checkinISO, checkoutISO);
  const bookBtn = document.getElementById("book-btn");
  const msg = document.getElementById("form-msg");
  msg.textContent = "";
  msg.className = "form-msg";

  if (nights < listing.minNights) {
    document.getElementById("price-breakdown").style.display = "none";
    bookBtn.disabled = true;
    bookBtn.textContent = `Séjour minimum de ${listing.minNights} nuit(s)`;
    return;
  }

  const stayTotal = nights * listing.pricePerNight;
  const total = stayTotal + listing.cleaningFee;

  document.getElementById("pb-nights-label").textContent = `${listing.pricePerNight} ${listing.currency} x ${nights} nuit(s)`;
  document.getElementById("pb-nights-amount").textContent = formatMoney(stayTotal, listing.currency);
  document.getElementById("pb-cleaning").textContent = formatMoney(listing.cleaningFee, listing.currency);
  document.getElementById("pb-total").textContent = formatMoney(total, listing.currency);
  document.getElementById("price-breakdown").style.display = "block";

  bookBtn.disabled = false;
  bookBtn.textContent = "Réserver et payer";
}

async function handleBooking() {
  const msg = document.getElementById("form-msg");
  const bookBtn = document.getElementById("book-btn");
  const dates = window._flatpickrInstance.selectedDates;

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const guests = document.getElementById("guests").value;

  if (dates.length !== 2) {
    msg.textContent = "Merci de choisir vos dates d'arrivée et de départ.";
    msg.className = "form-msg error";
    return;
  }
  if (!name || !email) {
    msg.textContent = "Merci de renseigner votre nom et votre email.";
    msg.className = "form-msg error";
    return;
  }

  bookBtn.disabled = true;
  bookBtn.textContent = "Redirection…";
  msg.textContent = "";

  try {
    const res = await fetch("/api/booking/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slug,
        checkin: dateToISO(dates[0]),
        checkout: dateToISO(dates[1]),
        guests,
        name,
        email,
        phone,
      }),
    });
    const data = await res.json();

    if (!res.ok) {
      msg.textContent = data.error || "Une erreur est survenue.";
      msg.className = "form-msg error";
      bookBtn.disabled = false;
      bookBtn.textContent = "Réserver et payer";
      return;
    }

    window.location.href = data.url;
  } catch (err) {
    msg.textContent = "Impossible de contacter le serveur de paiement.";
    msg.className = "form-msg error";
    bookBtn.disabled = false;
    bookBtn.textContent = "Réserver et payer";
  }
}

init();
