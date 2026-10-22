// Hamburger menu για κινητό
const toggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("nav");

toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
});

// Κλείσιμο του μενού όταν πατηθεί κάποιο link
nav.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  })
);

// Ωράριο: επισήμανση σημερινής ημέρας + badge "Ανοιχτά / Κλειστά"
// Χρησιμοποιούμε ώρα Ελλάδας ώστε το αποτέλεσμα να είναι σωστό όπου κι αν βρίσκεται ο επισκέπτης.
(function updateOpeningStatus() {
  const rows = document.querySelectorAll(".hours-list li");
  const badge = document.getElementById("open-badge");
  if (!rows.length || !badge) return;

  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Athens",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date());

  const get = (type) => parts.find((p) => p.type === type).value;
  const dayIndex = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  const nowMinutes = (parseInt(get("hour"), 10) % 24) * 60 + parseInt(get("minute"), 10);

  const toMinutes = (hhmm) => {
    const [h, m] = hhmm.split(":").map(Number);
    return h * 60 + m;
  };

  rows.forEach((row) => {
    if (Number(row.dataset.day) !== dayIndex) return;
    row.classList.add("today");

    const isOpen =
      nowMinutes >= toMinutes(row.dataset.open) &&
      nowMinutes < toMinutes(row.dataset.close);

    badge.hidden = false;
    badge.classList.add(isOpen ? "is-open" : "is-closed");
    badge.textContent = isOpen
      ? `Ανοιχτά τώρα · κλείνουμε στις ${row.dataset.close}`
      : `Κλειστά τώρα · ανοίγουμε στις ${row.dataset.open}`;
  });
})();

// Φόρμα επικοινωνίας: αποστολή στο Netlify Forms χωρίς ανανέωση σελίδας
const form = document.getElementById("contact-form");
const statusEl = document.getElementById("form-status");

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const button = form.querySelector('button[type="submit"]');
    button.disabled = true;
    statusEl.className = "form-status";
    statusEl.textContent = "Αποστολή…";

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(new FormData(form)).toString(),
      });
      if (!response.ok) throw new Error("Αποτυχία αποστολής");

      form.reset();
      statusEl.classList.add("success");
      statusEl.textContent = "Ευχαριστούμε! Λάβαμε το μήνυμά σου και θα επικοινωνήσουμε σύντομα.";
    } catch (error) {
      statusEl.classList.add("error");
      statusEl.textContent = "Κάτι πήγε στραβά. Δοκίμασε ξανά σε λίγο.";
    } finally {
      button.disabled = false;
    }
  });
}

// Τρέχον έτος στο footer
document.getElementById("year").textContent = new Date().getFullYear();
