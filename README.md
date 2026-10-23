# Φλιτζάνι: one-page site για φανταστικό καφέ

Demo one-page site για το φανταστικό καφέ «Φλιτζάνι» (specialty καφές στην Ψυρρή της Αθήνας), φτιαγμένο ως άσκηση. Το όνομα, η διεύθυνση, το τηλέφωνο και το email είναι επινοημένα.

**Live:** https://flitzani-cafe.netlify.app/

## Τι περιλαμβάνει

- **Hero** με φωτογραφία και κάλεσμα σε ενέργεια
- **Η ιστορία μας** με τρία highlights
- **Μενού** σε τρεις κατηγορίες (ζεστοί και κρύοι καφέδες, γλυκά), με περιγραφές και tags (Νέο, Vegan)
- **Ωράριο** με αυτόματη επισήμανση της σημερινής ημέρας και ένδειξη «Ανοιχτά / Κλειστά τώρα» (ώρα Ελλάδας)
- **Φόρμα επικοινωνίας** με Netlify Forms, honeypot κατά του spam και μήνυμα επιτυχίας χωρίς ανανέωση σελίδας
- **Χάρτης** OpenStreetMap (χωρίς API key) και κουμπί οδηγιών
- **Mobile-first σχεδίαση:** hamburger menu, σταθερή μπάρα «Κάλεσέ μας / Οδηγίες» μόνο σε κινητό

## Τεχνολογίες

Καθαρό HTML, CSS και JavaScript, χωρίς frameworks ή βιβλιοθήκες και χωρίς build step.

- **Σχεδίαση:** σκούρη γήινη παλέτα με CSS variables, γραμματοσειρές Noto Serif Display και Inter (Google Fonts, με υποστήριξη ελληνικών)
- **JavaScript:** hamburger menu, scrollspy και fade-in animations με `IntersectionObserver`, υπολογισμός ωραρίου με `Intl.DateTimeFormat`
- **Hosting:** Netlify, με αυτόματο deploy σε κάθε push στο `main`

## Ποιότητα

Μέτρηση με Lighthouse στο live link (23 Οκτωβρίου 2026, δύο μετρήσεις):

| Κατηγορία | Σκορ |
|---|---|
| Performance | 96 και 99 |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

Επιπλέον:

- Έλεγχος αντίθεσης χρωμάτων με WCAG AA (≥ 4,5:1)
- Έλεγχος με axe-core: 0 παραβάσεις
- Skip link, ορατά focus states, πλοήγηση με πληκτρολόγιο (Escape κλείνει το menu)
- Σεβασμός στο `prefers-reduced-motion`, και το περιεχόμενο μένει ορατό χωρίς JavaScript
- Έλεγχος σε πλάτη από 320px έως 1680px χωρίς οριζόντιο scroll
- Open Graph meta tags και JSON-LD (`CafeOrCoffeeShop`)

## Δομή

```
├── index.html          # η σελίδα (όλα τα sections)
├── style.css           # στυλ, παλέτα, responsive
├── script.js           # menu, ωράριο, φόρμα, animations, scrollspy
├── favicon.svg
├── apple-touch-icon.png
└── images/
    ├── hero.webp       # φόντο hero
    ├── interior.webp   # «Η ιστορία μας»
    ├── sweets.webp     # banner μενού
    └── og-image.jpg    # κάρτα κοινοποίησης (1200×630)
```

## Τοπική εκτέλεση

Αρκεί να ανοίξεις το `index.html` στον browser. Για πιο πιστή εικόνα μπορείς να τρέξεις έναν τοπικό server:

```bash
python -m http.server 8000
# και άνοιξε http://localhost:8000
```

Η φόρμα επικοινωνίας δουλεύει μόνο όταν το site είναι στο Netlify (το Netlify Forms χρειάζεται τον server τους). Τοπικά θα εμφανίσει μήνυμα σφάλματος, και αυτό είναι αναμενόμενο.

## Πώς δουλεύτηκε

Το site χτίστηκε σε βήματα με τη βοήθεια του Claude: πρώτα ο σκελετός και η παλέτα, μετά κάθε section ξεχωριστά, και στο τέλος τρία πακέτα βελτιώσεων (φωτογραφίες και animations, SEO και προσβασιμότητα, λεπτομέρειες στο μενού και στο footer). Κάθε αλλαγή καταγράφηκε σε ξεχωριστό commit ώστε το ιστορικό να δείχνει την εξέλιξη.

<!-- Προσθήκη φωτογράφων/πηγών των φωτογραφιών στην ενότητα «Φωτογραφίες» όταν γίνει γνωστή η πηγή. -->
