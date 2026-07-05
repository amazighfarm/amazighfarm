let token = localStorage.getItem("amazigh_admin_token") || "";

function authHeaders() {
  return { Authorization: `Bearer ${token}`, "Content-Type": "application/json" };
}

async function tryLogin() {
  const res = await fetch("/api/admin/bookings", { headers: authHeaders() });
  if (res.ok) {
    document.getElementById("login-box").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
    loadEverything();
    return true;
  }
  return false;
}

document.getElementById("login-btn").addEventListener("click", async (e) => {
  e.preventDefault();
  token = document.getElementById("token-input").value.trim();
  const ok = await tryLogin();
  if (ok) {
    localStorage.setItem("amazigh_admin_token", token);
  } else {
    document.getElementById("login-msg").textContent = "Jeton invalide.";
  }
});

async function loadEverything() {
  await Promise.all([loadListingsForSelect(), loadBookings(), loadBlocks()]);
}

async function loadListingsForSelect() {
  const res = await fetch("/api/listings");
  const listings = await res.json();
  document.getElementById("block-slug").innerHTML = listings
    .map((l) => `<option value="${l.slug}">${l.title}</option>`)
    .join("");
}

async function loadBookings() {
  const res = await fetch("/api/admin/bookings", { headers: authHeaders() });
  const bookings = await res.json();
  document.getElementById("bookings-body").innerHTML = bookings
    .map(
      (b) => `
    <tr>
      <td><span class="tag ${b.status === "confirmed" ? "tag-confirmed" : "tag-pending"}">${b.status}</span></td>
      <td>${b.slug}</td>
      <td>${b.name}<br><small>${b.email}</small></td>
      <td>${b.checkin}</td>
      <td>${b.checkout}</td>
      <td>${b.amount} ${b.currency.toUpperCase()}</td>
    </tr>`
    )
    .join("");
}

async function loadBlocks() {
  const res = await fetch("/api/admin/blocks", { headers: authHeaders() });
  const blocks = await res.json();
  document.getElementById("blocks-body").innerHTML = blocks
    .map(
      (b) => `
    <tr>
      <td>${b.slug}</td>
      <td>${b.startDate}</td>
      <td>${b.endDate}</td>
      <td>${b.source}</td>
      <td>${b.reason || ""}</td>
      <td>${b.source === "manual" ? `<a href="#" data-id="${b.id}" class="unblock-link">Supprimer</a>` : ""}</td>
    </tr>`
    )
    .join("");

  document.querySelectorAll(".unblock-link").forEach((link) => {
    link.addEventListener("click", async (e) => {
      e.preventDefault();
      await fetch(`/api/admin/blocks/${link.dataset.id}`, { method: "DELETE", headers: authHeaders() });
      loadBlocks();
    });
  });
}

document.getElementById("block-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const msg = document.getElementById("block-msg");
  const body = {
    slug: document.getElementById("block-slug").value,
    startDate: document.getElementById("block-start").value,
    endDate: document.getElementById("block-end").value,
    reason: document.getElementById("block-reason").value,
  };
  const res = await fetch("/api/admin/blocks", { method: "POST", headers: authHeaders(), body: JSON.stringify(body) });
  const data = await res.json();
  if (res.ok) {
    msg.className = "form-msg success";
    msg.textContent = "Dates bloquées.";
    loadBlocks();
  } else {
    msg.className = "form-msg error";
    msg.textContent = data.error || "Erreur";
  }
});

if (token) tryLogin();
