---
name: component-sniping
description: Discover and integrate production-ready UI components from curated sources
allowed-tools: Bash, Read, Write, Edit, Glob, Grep, WebFetch
---

# Component Sniping

Grab production-ready UI components from curated open-source libraries and community sources, then adapt them to your design system. This is not about using a component library wholesale — it is about surgical extraction and customization.

## What Component Sniping Is

Component sniping is the practice of:

1. **Finding** a specific component that matches your design intent
2. **Evaluating** it for quality (a11y, TypeScript, responsiveness)
3. **Extracting** just the code you need
4. **Adapting** colors, fonts, spacing, and motion to match your design system
5. **Shipping** it as if you built it from scratch

The goal is speed without sacrificing uniqueness. You get the engineering quality of battle-tested components with the visual identity of custom work.

## Primary Sources

### 21st.dev — AI-Optimized Components

The fastest path from "I need a component" to "it's in my project."

**What it is**: Curated React + Tailwind component registry. Built on shadcn/ui architecture. TypeScript-first. Copy-paste or CLI install.

**Install a component**:
```bash
npx 21st@latest add [component-name]
```

**Browse**: Visit 21st.dev and search by category (buttons, cards, navigation, hero sections, etc.)

**What you get**:
- Fully typed React components
- Tailwind CSS styling (v4 compatible)
- Composable primitives (not monolithic blocks)
- Dark mode support out of the box

**Integration pattern**:
```bash
# Install a specific component
npx 21st@latest add shimmer-button

# It drops into your project as a local file
# Typically at: components/ui/shimmer-button.tsx
```

Then customize:
```tsx
// Before: default 21st.dev styling
<ShimmerButton>Get Started</ShimmerButton>

// After: adapted to your design system
<ShimmerButton
  className="font-display tracking-tight"
  shimmerColor="var(--accent)"
  background="var(--surface-elevated)"
>
  Get Started
</ShimmerButton>
```

**Best for**: Buttons, form inputs, dialogs, dropdowns, tabs, accordions, navigation menus.

---

### Aceternity UI — Animated Components

**What it is**: 200+ copy-paste React components with Framer Motion animations. Heavy on visual impact.

**URL**: ui.aceternity.com

**How to use**:
1. Browse by category or search
2. Click a component to see live preview + code
3. Copy the component code into your project
4. Install any missing dependencies (usually `framer-motion` and `clsx`)

**Popular components**:
- `BackgroundBeams` — animated beam lines for hero backgrounds
- `TextReveal` — scroll-driven text reveal animation
- `CardHoverEffect` — cards with animated hover states
- `InfiniteMovingCards` — horizontal scrolling testimonial carousel
- `SparklesCore` — particle sparkle effect
- `TypewriterEffect` — animated text typing

**Integration pattern**:
```tsx
// Copy from Aceternity, then adapt
// 1. Replace hardcoded colors with CSS variables or Tailwind tokens
// 2. Replace hardcoded font families with your typography
// 3. Adjust animation timing to match your motion system
// 4. Add proper aria labels and keyboard support if missing
```

**Best for**: Hero sections, text animations, background effects, card interactions, scroll-driven reveals.

**Watch out for**: Some components prioritize visual flash over accessibility. Always audit for keyboard navigation and screen reader support after copying.

---

### Magic UI — Polished Animated Components

**What it is**: Clean, minimal animated components. Less flashy than Aceternity, more polished.

**Key components**:
- `ShimmerButton` — button with shimmer sweep animation
- `AnimatedText` — word-by-word or character-by-character text entrance
- `NumberTicker` — animated counting numbers (great for stats sections)
- `Marquee` — infinite horizontal scroll for logos or testimonials
- `DotPattern` / `GridPattern` — subtle background textures
- `BlurFade` — content sections that blur-in on scroll

**Integration**: Similar to Aceternity — copy-paste, then customize.

**Best for**: Subtle animations, stats sections, logo bars, text entrances.

---

### CodePen — Interactive Widgets and Effects

**URL**: codepen.io/trending

**What it is**: Community code playground. Massive library of HTML/CSS/JS experiments. Not React-native, but easily converted.

**Discovery workflow**:
1. Browse **Trending** for fresh inspiration
2. Search by keyword: "button hover", "card animation", "navigation", "scroll effect"
3. Filter by **CSS** or **JavaScript** depending on what you need
4. Fork interesting pens to study the code

**Conversion to React**: See the conversion guide below.

**Best for**: Novel hover effects, CSS-only animations, experimental interactions, micro-interactions.

## Integration Workflow

### Step 1: Find

Search your sources with a specific intent. "I need a testimonial carousel" not "I need components."

Prioritize in this order:
1. **21st.dev** — fastest integration, best TypeScript support
2. **Aceternity / Magic UI** — when you need animation-forward components
3. **CodePen** — when you need something truly custom or novel

### Step 2: Evaluate

Before copying anything, check:

| Criteria | Must Have | Nice to Have |
|----------|-----------|-------------|
| TypeScript | Yes | — |
| Responsive | Yes | — |
| Keyboard accessible | Yes | — |
| Screen reader friendly | Audit after copy | Built in |
| Framer Motion (not raw CSS) | Preferred | CSS ok for simple |
| Tailwind (not inline styles) | Preferred | Convertible |
| No external runtime deps | Preferred | Evaluate each |

### Step 3: Copy/Install

For 21st.dev:
```bash
npx 21st@latest add [component]
```

For Aceternity / Magic UI:
1. Copy the component code
2. Create the file in your project: `src/components/ui/[component-name].tsx`
3. Install dependencies listed in the component docs

For CodePen:
1. Fork the pen
2. Extract HTML structure, CSS, and JS logic
3. Convert to React (see below)

### Step 4: Customize

This is the critical step that prevents your site from looking like every other dev's site.

**Colors**: Replace all hardcoded hex/rgb values with your design tokens:
```tsx
// Before (generic)
className="bg-[#6366f1] text-white"

// After (design system)
className="bg-accent text-on-accent"
```

**Typography**: Replace font families and sizes:
```tsx
// Before (generic)
className="text-4xl font-bold"

// After (design system)
className="font-display text-4xl tracking-tight"
```

**Motion**: Align animation timing with your motion system:
```tsx
// Before (Aceternity default)
transition={{ duration: 0.5, ease: "easeInOut" }}

// After (your motion tokens)
transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
```

**Spacing**: Use your spacing scale, not arbitrary values:
```tsx
// Before
className="p-[30px] mb-[60px]"

// After
className="p-8 mb-16"
```

### Step 5: Test

- [ ] Renders correctly at 320px, 768px, 1024px, 1440px
- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] No hydration errors in dev console
- [ ] Animation performs at 60fps (check with DevTools Performance tab)
- [ ] No layout shift on load

## Converting CodePen to React

### Simple CSS-only Pen

```html
<!-- CodePen HTML -->
<button class="fancy-btn">
  <span>Click me</span>
</button>
```

```css
/* CodePen CSS */
.fancy-btn {
  position: relative;
  padding: 12px 24px;
  background: transparent;
  border: 2px solid #fff;
  overflow: hidden;
}
.fancy-btn::after {
  content: "";
  position: absolute;
  inset: 0;
  background: #fff;
  transform: translateX(-100%);
  transition: transform 0.3s ease;
}
.fancy-btn:hover::after {
  transform: translateX(0);
}
```

**Converted to React + Tailwind**:

```tsx
export function FancyButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="group relative overflow-hidden border-2 border-white px-6 py-3 bg-transparent">
      <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
        {children}
      </span>
      <span className="absolute inset-0 -translate-x-full bg-white transition-transform duration-300 ease-out group-hover:translate-x-0" />
    </button>
  );
}
```

### JavaScript-heavy Pen

For pens with JS interactivity:

1. Identify the state: what changes? (hover state, scroll position, mouse position, toggle)
2. Map to React state: `useState` for toggles, `useRef` for DOM refs, `useEffect` for event listeners
3. Replace `document.querySelector` with `useRef`
4. Replace `element.addEventListener` with React event handlers or `useEffect`
5. Replace `element.style.x = y` with state-driven className or inline style

```js
// CodePen JS
const card = document.querySelector(".card");
card.addEventListener("mousemove", (e) => {
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  card.style.setProperty("--x", `${x}px`);
  card.style.setProperty("--y", `${y}px`);
});
```

```tsx
// React equivalent
import { useRef, type MouseEvent } from "react";

export function GlowCard({ children }: { children: React.ReactNode }) {
  const cardRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current?.style.setProperty("--x", `${x}px`);
    cardRef.current?.style.setProperty("--y", `${y}px`);
  }

  return (
    <div ref={cardRef} onMouseMove={handleMouseMove} className="glow-card">
      {children}
    </div>
  );
}
```

## Tailwind CSS v4 Compatibility Notes

Tailwind v4 has breaking changes from v3. When copying components written for v3:

| v3 Syntax | v4 Equivalent | Notes |
|-----------|---------------|-------|
| `dark:bg-gray-900` | `dark:bg-gray-900` | Same (still works) |
| `@apply` in CSS | `@apply` in CSS | Still supported |
| `tailwind.config.js` theme | `@theme` in CSS | v4 uses CSS-based config |
| `bg-opacity-50` | `bg-black/50` | Opacity modifier syntax preferred |
| `ring-offset-2` | `ring-offset-2` | Same |

**Key change**: v4 uses CSS `@theme` directive instead of `tailwind.config.js` for custom tokens. If a copied component references custom config values, migrate them:

```css
/* v4: define in your global CSS */
@theme {
  --color-accent: #6366f1;
  --font-display: "Satoshi", sans-serif;
}
```

## Anti-Patterns

1. **Using a library as-is** — If every button on your site screams "shadcn default," you have not sniped, you have surrendered. Always customize.

2. **Mixing library aesthetics** — Aceternity's maximalist glow effects next to Magic UI's minimalist counters looks incoherent. Pick a visual direction and stick to it.

3. **Importing entire libraries** — Never `npm install aceternity-ui`. Copy only the components you use. Tree-shaking is not a substitute for not adding code you don't need.

4. **Skipping accessibility** — A beautiful component that cannot be used with a keyboard is not production-ready. Audit every sniped component.

5. **Ignoring bundle size** — Some Aceternity components ship with heavy dependencies (three.js, etc.). Check what you are importing before committing.

## Quick Reference: What to Snipe Where

| I need... | Go to |
|-----------|-------|
| Form inputs, dialogs, menus | 21st.dev |
| Hero text animations | Aceternity UI |
| Stats counters / number tickers | Magic UI |
| Logo marquee / testimonial scroll | Magic UI or Aceternity |
| Background effects (beams, particles) | Aceternity UI |
| Subtle scroll reveals | Magic UI (BlurFade) |
| Novel hover effects | CodePen |
| Navigation menus | 21st.dev |
| Card layouts with hover states | Aceternity UI |
| Button micro-interactions | CodePen or 21st.dev |
