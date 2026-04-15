---
name: typography
description: Font selection, pairing, discovery, hierarchy, and implementation. Includes font sniping workflow for finding distinctive typefaces. Use when choosing fonts, establishing type hierarchy, or upgrading generic typography.
allowed-tools: Bash, Read, Write, Edit, Glob, Grep, WebFetch
---

# Typography

## TL;DR (5 rules)
1. **Never use Inter, Roboto, Arial, or Open Sans for display text** — these signal "no thought was put into this"
2. **Max 3 fonts per project**: display + body + mono (for data). Most projects need only 2.
3. **Geist Sans + Geist Mono** for dashboards/SaaS. **Cabinet Grotesk + Plus Jakarta Sans** for consulting/agency. **Instrument Serif + Space Grotesk** for editorial.
4. **Always preload above-the-fold fonts** and use `font-display: block` (not swap) to prevent FOUT jitter
5. **Test at real sizes** — a font that looks great at 72px might be unreadable at 16px

## When To Use
- Starting any new frontend project (before writing code)
- Typography feels "generic" or "AI-generated"
- Client feedback says the site looks "template-y"
- Choosing fonts for a dashboard with financial data

## Checklist
- [ ] Display font is NOT on the banned list
- [ ] Font is free for commercial use (Google Fonts, Fontshare, or licensed)
- [ ] Tested pairing at real sizes (headlines, body, captions)
- [ ] Configured in Tailwind `@theme` as `--font-heading`, `--font-body`, `--font-mono`
- [ ] Font files preloaded for above-the-fold text
- [ ] `font-display: block` set with `document.fonts.ready` gate
- [ ] Fallback system fonts in font stack

---

## Proven Pairings

### Dashboard / SaaS / Data-Heavy
| Display | Body | Mono | Vibe | Source |
|---------|------|------|------|--------|
| **Geist Sans** | Geist Sans | **Geist Mono** | Linear/Vercel — clean, authoritative | Vercel CDN |
| **Space Grotesk** | Space Grotesk | **JetBrains Mono** | Technical, dev tools | Google Fonts |
| **Satoshi** | Satoshi | **JetBrains Mono** | Modern premium SaaS | Fontshare + Google |
| **IBM Plex Sans** | IBM Plex Sans | **IBM Plex Mono** | Enterprise, trustworthy | Google Fonts |

### Agency / Consulting / B2B
| Display | Body | Vibe | Source |
|---------|------|------|--------|
| **Cabinet Grotesk** | Plus Jakarta Sans | Bold editorial | Fontshare + Google |
| **Clash Display** | General Sans | High contrast | Fontshare |
| **Syne** | Outfit | Creative tech | Google Fonts |

### Premium / Luxury / Healthcare
| Display | Body | Vibe | Source |
|---------|------|------|--------|
| **Instrument Serif** | Space Grotesk | Editorial tech | Google Fonts |
| **Fraunces** | Source Sans 3 | Warm premium | Google Fonts |
| **Boska** | Switzer | Dramatic editorial | Fontshare |

---

## Type Scale

```
Hero Headline:    48-72px, 700 weight
Section Headline: 32-48px, 600 weight
Subheadline:      24-32px, 500 weight
Body:             16-18px, 400 weight
Small/Caption:    12-14px, 400 weight
Data/Numbers:     14-16px, 500 weight, monospace
```

## Font Loading (FOUT Prevention)

```tsx
// main.tsx — gate rendering until fonts are loaded
document.fonts.ready.then(() => {
  document.documentElement.classList.add('fonts-loaded');
});
```

```html
<!-- index.html — preload critical fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="preload" href="/fonts/GeistSans-Variable.woff2" as="font" type="font/woff2" crossorigin />
```

```css
/* Use font-display: block (not swap) to prevent jitter */
@font-face {
  font-family: 'Geist Sans';
  src: url('/fonts/GeistSans-Variable.woff2') format('woff2');
  font-display: block;
}
```

## Tailwind v4 Setup

```css
@theme {
  --font-heading: 'Geist Sans', system-ui, sans-serif;
  --font-body: 'Geist Sans', system-ui, sans-serif;
  --font-mono: 'Geist Mono', 'JetBrains Mono', ui-monospace, monospace;
}
```

---

## Font Discovery (Sniping)

When you need to find fonts beyond the proven pairings above.

### Sources (in priority order)
1. **Fontshare** (fontshare.com) — Highest free quality. Cabinet Grotesk, Satoshi, Clash Display, Zodiak.
2. **Google Fonts** (fonts.google.com) — Largest catalog. Hidden gems: Instrument Serif, Syne, Bricolage Grotesque, Fraunces.
3. **Typewolf** (typewolf.com) — Curated "Best Google Fonts" lists. Fastest path to quality free fonts.
4. **Fonts In Use** (fontsinuse.com) — Real-world usage database. Search by industry.

### Discovery Process
1. Browse 2 sources for 10 min. Collect 5-8 screenshots of typefaces that match the project tone.
2. Identify: use browser DevTools (Computed > font-family) or ask Claude with a screenshot.
3. Source free version: Google Fonts → Fontshare → similar free alternative.
4. Test pairing at real sizes before committing.

### Text Effects (Use Sparingly)

**Gradient Text:**
```css
.gradient-text {
  background: linear-gradient(135deg, var(--accent) 0%, var(--accent-hover) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

**Animated Underline:**
```css
.animated-underline {
  background-image: linear-gradient(currentColor, currentColor);
  background-position: 0% 100%;
  background-repeat: no-repeat;
  background-size: 0% 2px;
  transition: background-size 0.3s;
}
.animated-underline:hover { background-size: 100% 2px; }
```
