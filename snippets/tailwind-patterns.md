# Tailwind CSS v4 Patterns

Reusable Tailwind patterns for the Atelier design system. Copy-paste ready. All patterns assume Tailwind v4 with CSS-first configuration.

---

## Glass Morphism Card

Frosted glass effect for cards, modals, and overlays. Works best on dark backgrounds with colorful elements behind.

```html
<div class="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 shadow-2xl">
  Card content
</div>
```

**Variations**:
```html
<!-- Stronger glass (lighter background, more blur) -->
<div class="rounded-2xl bg-white/10 backdrop-blur-2xl border border-white/15 p-8">

<!-- Colored glass -->
<div class="rounded-2xl bg-blue-500/10 backdrop-blur-xl border border-blue-500/20 p-8">

<!-- Light mode glass -->
<div class="rounded-2xl bg-black/5 backdrop-blur-xl border border-black/10 p-8">
```

---

## Grain Texture Overlay

Subtle film grain that adds organic texture to flat backgrounds. Apply to a section or the entire page.

```html
<div class="relative">
  <!-- Grain overlay -->
  <div class="pointer-events-none absolute inset-0 opacity-[0.015]"
    style="background-image: url(&quot;data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E&quot;); background-repeat: repeat;">
  </div>
  <!-- Content -->
  <div class="relative z-10">
    Your content here
  </div>
</div>
```

**Important**: Use `opacity-[0.015]` to `opacity-[0.03]` for subtlety. Higher values look heavy.

---

## Dot Grid Background

Repeating dot pattern for subtle section texturing.

```html
<div class="relative bg-neutral-950">
  <div class="absolute inset-0"
    style="background-image: radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px); background-size: 24px 24px;">
  </div>
  <div class="relative z-10">
    Content here
  </div>
</div>
```

**Variations**:
```css
/* Larger dots, wider spacing */
background-size: 40px 40px;

/* Colored dots */
radial-gradient(circle, rgba(59,130,246,0.1) 1px, transparent 1px)

/* Fading at edges (combine with mask) */
mask-image: radial-gradient(ellipse at center, black 40%, transparent 70%);
```

---

## Noise Texture Overlay

Alternative to grain using a CSS noise pattern.

```html
<div class="pointer-events-none absolute inset-0 opacity-[0.02]"
  style="background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwBAMAAAClLOS0AAAAElBMVEUAAAD8/vz08teleHh4eHh4eOjPgQAAAKRJREFUeF6V0DEOwyAMBdBf0Q2JAdYMSL1AbnAD7n+UqEq7YKH+E0/+siXhU2p9s6gJEOqnXAJRY1yDMVBIKISmTPMBpEhmC4A8EJmAhEYE8JNILuACrAhpMh6ASIgN6HNgBkCLQs5SBFLmAPJhBojjT+TAAJRt4M3+TAbMACzaLIDGJNiB9xAlpT0RPI6VKYJrSQ7HbSIqsaxPVfbJeLafgDfj0rrRZwOPQAAAABJRU5ErkJggg==');">
</div>
```

**Important**: Keep opacity between `opacity-[0.015]` and `opacity-[0.03]`. Never use `opacity-40` or similar — that's a common mistake that creates an ugly, heavy overlay.

---

## Gradient Mesh Background

Multi-color gradient blobs for rich, ambient backgrounds.

```html
<div class="relative min-h-screen bg-neutral-950 overflow-hidden">
  <!-- Gradient blobs -->
  <div class="absolute top-0 -left-40 h-[500px] w-[500px] rounded-full bg-blue-600/20 blur-[120px]"></div>
  <div class="absolute top-40 right-0 h-[400px] w-[400px] rounded-full bg-purple-600/20 blur-[120px]"></div>
  <div class="absolute bottom-0 left-1/3 h-[600px] w-[600px] rounded-full bg-emerald-600/10 blur-[120px]"></div>

  <!-- Content -->
  <div class="relative z-10">
    Your content here
  </div>
</div>
```

---

## Blur Navigation Bar

Sticky top nav with glass morphism and smooth scroll behavior.

```html
<nav class="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-neutral-950/80 border-b border-white/5">
  <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
    <a href="/" class="text-lg font-semibold">Brand</a>
    <div class="flex items-center gap-8">
      <a href="#features" class="text-sm text-neutral-400 transition-colors hover:text-white">Features</a>
      <a href="#pricing" class="text-sm text-neutral-400 transition-colors hover:text-white">Pricing</a>
      <button class="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition-opacity hover:opacity-90">
        Get Started
      </button>
    </div>
  </div>
</nav>
```

---

## Responsive Grid Patterns

Common grid layouts with auto-fit and explicit breakpoints.

```html
<!-- Auto-fit: cards fill available space, min 300px each -->
<div class="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-8">

<!-- Explicit breakpoints: 1 → 2 → 3 columns -->
<div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">

<!-- Feature grid: 2 → 3 → 4 columns -->
<div class="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">

<!-- Asymmetric: sidebar + main -->
<div class="grid grid-cols-1 gap-8 lg:grid-cols-[300px_1fr]">

<!-- Bento grid (mixed sizes) -->
<div class="grid grid-cols-2 gap-4 lg:grid-cols-4">
  <div class="col-span-2 row-span-2">Large feature</div>
  <div>Small card</div>
  <div>Small card</div>
  <div class="col-span-2">Wide card</div>
</div>
```

---

## Dark Mode Token Structure

CSS variables for consistent dark/light theming. Tailwind v4 uses CSS-first configuration.

```css
/* In your main CSS file (e.g., app.css) */
@import "tailwindcss";

:root {
  --color-bg-primary: #ffffff;
  --color-bg-secondary: #f5f5f5;
  --color-bg-tertiary: #e5e5e5;
  --color-text-primary: #0a0a0a;
  --color-text-secondary: #525252;
  --color-text-muted: #a3a3a3;
  --color-border: #e5e5e5;
  --color-accent: #3b82f6;
  --color-accent-hover: #2563eb;
}

.dark {
  --color-bg-primary: #0a0a0a;
  --color-bg-secondary: #141414;
  --color-bg-tertiary: #1f1f1f;
  --color-text-primary: #fafafa;
  --color-text-secondary: #a3a3a3;
  --color-text-muted: #525252;
  --color-border: #262626;
  --color-accent: #3b82f6;
  --color-accent-hover: #60a5fa;
}
```

Usage in Tailwind:
```html
<div class="bg-(--color-bg-primary) text-(--color-text-primary)">
  <p class="text-(--color-text-secondary)">Themed text</p>
  <button class="bg-(--color-accent) hover:bg-(--color-accent-hover)">
    Themed button
  </button>
</div>
```

---

## Section Numbering System

Editorial-style numbered sections (e.g., "01 -- SERVICES").

```html
<section class="py-24">
  <div class="mx-auto max-w-7xl px-6">
    <div class="flex items-center gap-4 text-sm tracking-widest text-neutral-500 uppercase">
      <span class="font-mono">01</span>
      <span class="h-px w-12 bg-neutral-700"></span>
      <span>Services</span>
    </div>
    <h2 class="mt-6 text-5xl font-bold">What We Build</h2>
  </div>
</section>
```

---

## Trust Badge Row

Social proof strip with logos and metrics.

```html
<div class="border-y border-white/5 py-12">
  <p class="text-center text-sm uppercase tracking-widest text-neutral-500">
    Trusted by leading teams
  </p>
  <div class="mx-auto mt-8 flex max-w-4xl items-center justify-center gap-12">
    <img src="/logos/company-1.svg" alt="Company 1" class="h-8 opacity-40 transition-opacity hover:opacity-100" />
    <img src="/logos/company-2.svg" alt="Company 2" class="h-8 opacity-40 transition-opacity hover:opacity-100" />
    <img src="/logos/company-3.svg" alt="Company 3" class="h-8 opacity-40 transition-opacity hover:opacity-100" />
    <img src="/logos/company-4.svg" alt="Company 4" class="h-8 opacity-40 transition-opacity hover:opacity-100" />
  </div>
</div>
```

---

## Logo Bar with Grayscale-to-Color Hover

Client logos that reveal color on hover.

```html
<div class="flex items-center justify-center gap-12">
  <img
    src="/logos/client.svg"
    alt="Client"
    class="h-8 grayscale opacity-40 transition-all duration-300 hover:grayscale-0 hover:opacity-100"
  />
  <!-- Repeat for each logo -->
</div>
```

---

## Animated Gradient Border

Rotating gradient border for cards and CTAs.

```html
<div class="relative rounded-2xl p-px">
  <!-- Animated gradient border -->
  <div class="absolute inset-0 rounded-2xl bg-[conic-gradient(from_var(--angle),#3b82f6,#8b5cf6,#ec4899,#3b82f6)] animate-[spin_4s_linear_infinite]"
    style="--angle: 0deg;">
  </div>
  <!-- Inner content -->
  <div class="relative rounded-2xl bg-neutral-950 p-8">
    Card content with animated border
  </div>
</div>
```

CSS for the animation:
```css
@property --angle {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}

@keyframes spin {
  to { --angle: 360deg; }
}
```

Simpler alternative without `@property` (static gradient, no rotation):
```html
<div class="relative rounded-2xl p-px bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
  <div class="rounded-2xl bg-neutral-950 p-8">
    Card content with gradient border
  </div>
</div>
```
