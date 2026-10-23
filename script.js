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

// Scroll animations (fade-in) με IntersectionObserver
(function initReveal() {
  const targets = document.querySelectorAll(
    ".section h2, .story-text, .story-media, .menu-banner, .menu-card, .hours-list, .contact-form, .map-info, .map-frame"
  );
  if (!("IntersectionObserver" in window)) return; // χωρίς υποστήριξη, όλα μένουν ορατά

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );

  targets.forEach((el, i) => {
    el.classList.add("reveal");
    // μικρή καθυστέρηση ανά κάρτα μενού για πιο ομαλό εφέ
    if (el.classList.contains("menu-card")) {
      el.style.setProperty("--delay", `${(i % 3) * 90}ms`);
    }
    observer.observe(el);
  });
})();

// Scrollspy: επισήμανση του ενεργού συνδέσμου στο menu
(function initScrollspy() {
  const links = [...document.querySelectorAll(".nav a[href^='#']")];
  const sections = links
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter((el) => el && el.tagName === "SECTION");
  if (!sections.length || !("IntersectionObserver" in window)) return;

  const setActive = (id) => {
    links.forEach((a) => {
      const isActive = id && a.getAttribute("href") === `#${id}`;
      a.classList.toggle("active", Boolean(isActive));
      if (isActive) a.setAttribute("aria-current", "true");
      else a.removeAttribute("aria-current");
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        } else if (entry.target === sections[0] && entry.boundingClientRect.top > 0) {
          setActive(null); // έχουμε γυρίσει πάνω από την πρώτη ενότητα (hero)
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px" } // ενεργό είναι το section που περνά από τη μέση της οθόνης
  );

  sections.forEach((s) => observer.observe(s));
})();

// Τρέχον έτος στο footer
document.getElementById("year").textContent = new Date().getFullYear();
