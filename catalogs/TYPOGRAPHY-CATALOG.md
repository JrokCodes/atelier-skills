# Typography Catalog

> Font pairings, type scales, text effects, and kinetic typography

## Proven Pairings (Baseline)

### Clash Display + DM Sans
**Vibe:** Bold modern, tech-forward
**Best for:** SaaS, fintech, dashboards
```css
--font-display: 'Clash Display', sans-serif;
--font-body: 'DM Sans', sans-serif;
```

### Fraunces + Source Sans 3
**Vibe:** Elegant editorial, warm authority
**Best for:** Healthcare, professional services, luxury
```css
--font-display: 'Fraunces', serif;
--font-body: 'Source Sans 3', sans-serif;
```

### Cabinet Grotesk + Inter
**Vibe:** Clean editorial, structured
**Best for:** Portfolios, agencies, content-heavy sites
```css
--font-display: 'Cabinet Grotesk', sans-serif;
--font-body: 'Inter', sans-serif;
```

### Space Grotesk + JetBrains Mono
**Vibe:** Developer/tech, code-forward
**Best for:** Dev tools, API docs, tech products
```css
--font-display: 'Space Grotesk', sans-serif;
--font-mono: 'JetBrains Mono', monospace;
```

---

## Type Scale (Default)

```css
--text-hero: clamp(2.5rem, 5vw, 4.5rem);    /* 40-72px */
--text-section: clamp(1.75rem, 3.5vw, 3rem); /* 28-48px */
--text-sub: clamp(1.25rem, 2vw, 2rem);       /* 20-32px */
--text-body: clamp(1rem, 1.125vw, 1.125rem); /* 16-18px */
--text-caption: clamp(0.75rem, 1vw, 0.875rem); /* 12-14px */
```

---

## Text Effects (Baseline)

### Gradient Text
```tsx
<span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
  Gradient headline
</span>
```

### Animated Underline on Hover
```tsx
<a className="relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-current after:transition-all hover:after:w-full">
  Link text
</a>
```

### Text Stroke / Outline
```tsx
<h1 className="text-transparent" style={{ WebkitTextStroke: '2px white' }}>
  Outline Text
</h1>
```

---

## New Finds

<!-- Agent adds new typography discoveries below this line -->
