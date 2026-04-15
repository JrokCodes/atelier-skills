# Color Catalog

> Palettes, dark mode systems, gradients, and color strategies

## Healthcare Palettes

### Warm Trust (Primary Care)
```css
--color-primary: #E07A5F;     /* Terracotta - warm, approachable */
--color-secondary: #3D405B;   /* Charcoal - authority */
--color-accent: #81B29A;      /* Sage green - health, calm */
--color-bg: #F4F1DE;          /* Warm cream */
--color-text: #2C2C2C;        /* Near-black */
```

### Ocean Professional (Medical SaaS)
```css
--color-primary: #2A9D8F;     /* Teal - modern medical */
--color-secondary: #264653;   /* Deep navy */
--color-accent: #E9C46A;      /* Warm gold */
--color-bg: #FAFBFC;          /* Cool white */
--color-text: #1A1A2E;        /* Dark navy */
```

## Dark Mode Structure

```css
:root {
  --bg-primary: #FFFFFF;
  --bg-secondary: #F8FAFC;
  --bg-elevated: #FFFFFF;
  --text-primary: #0F172A;
  --text-secondary: #64748B;
  --border: #E2E8F0;
}

.dark {
  --bg-primary: #0F172A;
  --bg-secondary: #1E293B;
  --bg-elevated: #334155;
  --text-primary: #F8FAFC;
  --text-secondary: #94A3B8;
  --border: #334155;
}
```

---

## New Finds

<!-- Agent adds new color discoveries below this line -->

### AI Authority Dark (Ciridae Pattern)
**Source:** ciridae.com (SOTD Feb 6, 2026)
**Vibe:** Confident, premium, tech-forward

```css
:root {
  --bg-primary: #0A0A0A;
  --bg-secondary: #111111;
  --bg-card: rgba(255, 255, 255, 0.03);
  --text-primary: #F5F5F5;
  --text-secondary: #888888;
  --border: rgba(255, 255, 255, 0.08);
  --accent: #FFFFFF; /* White as accent on dark */
}
```

**Tailwind config:**
```js
colors: {
  background: '#0A0A0A',
  foreground: '#F5F5F5',
  muted: { DEFAULT: '#888888', foreground: '#888888' },
  card: { DEFAULT: 'rgba(255, 255, 255, 0.03)', foreground: '#F5F5F5' },
  border: 'rgba(255, 255, 255, 0.08)',
}
```

### Developer Clean (Resend Pattern)
**Source:** resend.com
**Vibe:** Technical, trustworthy, approachable

```css
:root {
  --bg-primary: #FFFFFF;
  --bg-secondary: #F8F9FA;
  --bg-code: #1E1E1E;
  --text-primary: #111111;
  --text-secondary: #666666;
  --accent: #0A84FF;
  --border: #E5E5E5;
}
```

### Gradient Accent Strategy (Linear Pattern)
Don't use gradients on backgrounds — use them on:
- CTA buttons (subtle)
- Product screenshot overlays
- Accent borders on hover

```tsx
// Gradient border on hover
<div className="group relative p-[1px] rounded-xl bg-gradient-to-r from-transparent via-transparent to-transparent hover:from-purple-500 hover:via-blue-500 hover:to-cyan-500 transition-all duration-300">
  <div className="bg-background rounded-xl p-6">
    {/* Card content */}
  </div>
</div>

// Gradient overlay on images
<div className="relative">
  <img src="/screenshot.png" className="rounded-xl" />
  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
</div>
```
