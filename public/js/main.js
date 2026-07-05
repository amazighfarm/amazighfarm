document.getElementById("year").textContent = new Date().getFullYear();

async function loadListings() {
  const grid = document.getElementById("listings-grid");
  try {
    const res = await fetch("/api/listings");
    const listings = await res.json();

    grid.innerHTML = listings
      .map(
        (l) => `
      <div class="listing-item">
        <a href="/gite.html?slug=${l.slug}">
          <div class="photo"><img src="${l.cover}" alt="${l.title}" loading="lazy" /></div>
          <h3>${l.title}</h3>
          <div class="meta">${l.guests} voyageurs · ${l.bedrooms} chambre(s)</div>
          ${l.locationLabel ? `<div class="location-note">${l.locationLabel}</div>` : ""}
        </a>
      </div>`
      )
      .join("");
  } catch (err) {
    grid.innerHTML = `<p style="text-align:center;grid-column:1/-1;">Impossible de charger les hébergements pour le moment.</p>`;
  }
}

loadListings();

function initHeroCarousel() {
  const carousel = document.getElementById("hero-carousel");
  if (!carousel) return;
  let slides = Array.from(carousel.querySelectorAll("img"));
  if (slides.length < 1) return;

  slides.forEach((img) => {
    img.addEventListener("error", () => {
      img.remove();
      slides = slides.filter((s) => s !== img);
    });
  });

  let current = 0;
  let timer = null;

  function goTo(index) {
    if (slides.length < 2) return;
    slides[current].classList.remove("active");
    current = (index + slides.length) % slides.length;
    slides[current].classList.add("active");
  }

  function startAutoplay() {
    if (timer) clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), 5000);
  }

  const prevBtn = document.getElementById("hero-prev");
  const nextBtn = document.getElementById("hero-next");

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      goTo(current - 1);
      startAutoplay();
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      goTo(current + 1);
      startAutoplay();
    });
  }

  startAutoplay();
}

initHeroCarousel();
