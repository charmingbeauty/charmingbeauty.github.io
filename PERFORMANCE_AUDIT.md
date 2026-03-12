# Performance Audit for SEO | Charming Beauty

**Audit Date:** March 12, 2026  
**Baseline (from Clarity):** Score 85/100 | LCP 2.2s ✓ | INP 190ms ✓ | CLS 0 ✓

---

## Summary

Your site was already in good shape (all Core Web Vitals "good"), but the **16.7% "needs improvement"** pageviews indicated room to optimize. The changes below target LCP and INP to push more sessions into the green zone and improve search rankings over time.

---

## Changes Implemented

### 1. LCP (Largest Contentful Paint) Optimizations
- **Preload hero image** – Added `<link rel="preload" as="image" href="/images/hero-2.pmg.webp">` so the hero background (your LCP element) loads as soon as possible
- **Preconnect** – Added preconnect hints for `fonts.googleapis.com`, `fonts.gstatic.com`, and `unpkg.com` to start connections earlier
- **Hero background on mobile** – Switched `background-attachment: fixed` to `scroll` on mobile; restored `fixed` only for viewports ≥1024px to avoid jank and repaints that hurt INP

### 2. Resource Loading
- **Defer scripts** – Swiper and main.js now use `defer` so they don’t block parsing and rendering
- **Lazy load below-fold images** – Added `loading="lazy"` to services, gallery, reviews, and about images (~17 images)
- **Lazy load booking iframe** – Square iframe uses `loading="lazy"` so it doesn’t compete with LCP

### 3. Font Loading
- Fonts already used `display=swap` ✓  
- Preconnect to Google Fonts reduces time to first byte

---

## Remaining Recommendations (Manual)

### High Impact

| Item | Issue | Action |
|------|-------|--------|
| **hero-2.pmg.png** | 4.4 MB fallback image (used in `@supports` for old browsers) | Create a smaller PNG version (~200KB) or remove the fallback if you no longer support those browsers |
| **n-white.png** | 3 MB – not referenced in index.html | Remove if unused, or optimize and lazy-load where needed |
| **Review large images** | Several PNGs are 300–700KB each | Prefer WebP everywhere; add `<source>` for WebP in picture elements that still use PNG only |

### Medium Impact

| Item | Suggestion |
|------|------------|
| **Swiper CSS** | Load Swiper CSS with `media="print" onload="this.media='all'"` for non-critical above-the-fold styling, or inline critical carousel CSS |
| **Font subsets** | Restrict to Latin if that’s all you need: add `&subset=latin` or use variable fonts to cut font size |

### Monitor in Clarity

- **URL Performance** – Compare homepage vs location/service pages
- **Device breakdown** – Mobile vs desktop LCP and INP
- **Rage clicks / dead clicks** – Indicate UX or INP issues

---

## Core Web Vitals Reference

| Metric | Good | Needs Improvement | Poor |
|--------|------|-------------------|------|
| **LCP** | ≤ 2.5s | 2.5–4s | > 4s |
| **INP** | ≤ 200ms | 200–500ms | > 500ms |
| **CLS** | ≤ 0.1 | 0.1–0.25 | > 0.25 |

---

## Files Modified

- `index.html` – Preload, preconnect, lazy loading, defer scripts
- `css/main.css` – Hero `background-attachment` scoped to desktop only
