# Site Teardowns

> Full breakdowns of award-winning and exceptional websites

## How to Document a Teardown

For each site, capture:
1. **URL** and date visited
2. **Tone**: Which aesthetic archetype (Brutalist, Luxury, etc.)
3. **Typography**: Fonts used, hierarchy, effects
4. **Color**: Palette, accent strategy, gradients
5. **Motion**: Key animations, timing, scroll behavior
6. **Layout**: Grid strategy, whitespace, asymmetry
7. **What to steal**: Specific patterns to adapt
8. **Code adaptation**: How to implement in React + Tailwind + Framer Motion

---

## Reference Sites to Monitor

| Site | Why | Check Frequency |
|------|-----|-----------------|
| stripe.com | Clean whitespace, subtle gradients | Monthly |
| linear.app | Dark sections, smooth animations | Monthly |
| vercel.com | Developer-focused, bold type | Monthly |
| notion.so | Simple hierarchy, good typography | Monthly |
| raycast.com | Dark mode excellence, micro-interactions | Monthly |
| resend.com | Minimal, code-forward, clean | Monthly |

---

## Teardowns

### 1. Ciridae.com — AI Consulting SaaS
**Date:** 2026-02-08
**URL:** https://www.ciridae.com
**Awwwards SOTD:** Feb 6, 2026 (Score: 7.26, Dev: 7.56)
**Category:** AI Services / B2B SaaS

#### Tone
**Archetype:** "Confident Authority" — Bold claims, manifesto-style copy, premium feel
**Vibe:** Tech-forward but warm. Reads like a partner, not a vendor.

#### Typography
- **Display:** Large, bold sans-serif headlines
- **Body:** Clean sans-serif, generous line-height
- **Effects:** None excessive — clarity prioritized
- **Numbering System:** Uses "01 - WD" style section labels (distinctive)

```css
/* Typography pattern to steal */
--font-display: 'Inter', sans-serif;
--text-hero: clamp(3rem, 6vw, 5rem);
--text-section-label: 0.875rem; /* Small caps for section numbers */
letter-spacing: 0.1em;
text-transform: uppercase;
```

#### Color
**Palette:** 2-color constraint (noted by Awwwards)
- Background: Near-black (#0A0A0A estimated)
- Text: Off-white (#F5F5F5)
- Accent: Subtle warm tones in testimonials

**Why it works:** Constraint forces elegance. No decision fatigue.

```css
:root {
  --bg-primary: #0A0A0A;
  --text-primary: #F5F5F5;
  --text-muted: #888888;
  --border: rgba(255, 255, 255, 0.1);
}
```

#### Motion
- **Animation Score:** 7.80/10
- **Key patterns:**
  - Cards animation on scroll
  - Footer reveal (content slides up as you scroll)
  - FAQ accordion with smooth height transitions
  - Testimonial carousel with fade
- **Responsive Score:** 7.80/10

#### Layout
- **Hero:** Centered, manifesto-style headline
- **Services:** 3-column grid with numbered sections
- **Blog:** Card grid with hover states
- **Footer reveal:** Fixed position footer revealed as content scrolls away

#### What to Steal

1. **Section Numbering System**
```tsx
const SectionLabel = ({ number, code, title }: { number: string; code: string; title: string }) => (
  <div className="flex items-center gap-3 text-sm tracking-widest text-muted-foreground">
    <span>{number} - {code}</span>
  </div>
);
// Usage: <SectionLabel number="01" code="WD" title="WORKFLOW REDESIGN" />
```

2. **Footer Reveal Pattern**
```tsx
// Footer is position: fixed at bottom
// Main content has margin-bottom equal to footer height
// Creates reveal-on-scroll effect without JS
<main className="relative z-10 bg-background mb-[400px]">
  {/* Content */}
</main>
<footer className="fixed bottom-0 left-0 right-0 z-0 h-[400px]">
  {/* Footer content */}
</footer>
```

3. **Manifesto Headlines**
```tsx
<h1 className="text-center text-4xl md:text-6xl lg:text-7xl font-medium leading-tight">
  <span className="block">AUTOMATE THE MUNDANE</span>
  <span className="block text-muted-foreground">UNLEASH THE REMARKABLE</span>
</h1>
```

#### Apply to Healthcare SaaS
- Use 2-color dark mode as option
- Steal section numbering for services
- Footer reveal for premium feel
- Manifesto-style hero: "AUTOMATE THE ADMIN. FOCUS ON PATIENTS."

---

### 2. Linear.app — SaaS Product Tool
**Date:** 2026-02-08
**URL:** https://linear.app
**Category:** SaaS / Developer Tools

#### Tone
**Archetype:** "Precision Engineering" — Clean, fast, purposeful
**Vibe:** No fluff. Product speaks for itself.

#### Typography
- **Display:** Inter or custom sans, medium weight
- **Body:** Inter, high readability
- **Hero Size:** Large but not overwhelming (~48-64px)
- **Unique:** Heavy use of product UI as typography

```css
--font-family: 'Inter', -apple-system, sans-serif;
--text-hero: 3rem;
--text-section: 2rem;
--line-height-relaxed: 1.6;
```

#### Color
- **Dark mode dominant** (matches their product)
- Deep navy/black background (#0A0A0B)
- White text, purple/blue accents for CTAs
- Gradient accents on product screenshots

```css
:root {
  --bg-dark: #0A0A0B;
  --bg-card: rgba(255, 255, 255, 0.05);
  --accent-purple: #5E6AD2;
  --text-primary: #FFFFFF;
  --text-secondary: #8A8F98;
}
```

#### Motion
- **Scroll-triggered product reveals**
- **Smooth section transitions**
- **Interactive product demos inline**
- **Micro-animations on CTAs**

#### Layout
- **Hero:** Centered headline + subhead + CTA + product preview
- **Features:** Full-width sections with product screenshots
- **Grid:** Asymmetric feature grids with varying card sizes
- **Logo Bar:** Grayscale client logos, animated on scroll

#### What to Steal

1. **Product-as-Hero Pattern**
```tsx
<section className="relative overflow-hidden py-24">
  <div className="mx-auto max-w-4xl text-center">
    <h1 className="text-5xl font-medium">Plan and build products</h1>
    <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto">
      Streamline issues, projects, and product roadmaps.
    </p>
    <div className="mt-8 flex justify-center gap-4">
      <Button>Get started</Button>
      <Button variant="ghost">Book a demo</Button>
    </div>
  </div>
  {/* Product screenshot with gradient overlay */}
  <div className="mt-16 relative">
    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10" />
    <img src="/product-hero.png" className="w-full rounded-xl shadow-2xl" />
  </div>
</section>
```

2. **Feature Grid with Varying Sizes**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div className="lg:col-span-2 bg-card p-8 rounded-2xl">
    {/* Large feature */}
  </div>
  <div className="bg-card p-6 rounded-2xl">
    {/* Small feature */}
  </div>
  {/* Repeat pattern */}
</div>
```

3. **Trust Badges with Context**
```tsx
<div className="flex items-center gap-3">
  <Badge variant="outline">SOC 2</Badge>
  <Badge variant="outline">GDPR</Badge>
  <Badge variant="outline">HIPAA</Badge>
</div>
```

#### Apply to Healthcare SaaS
- HIPAA badge prominent (healthcare requirement)
- Product screenshot as hero
- Feature grid with varying card sizes
- Dark mode option (modern, reduces eye strain)

---

### 3. Resend.com — Developer Email SaaS
**Date:** 2026-02-08
**URL:** https://resend.com
**Category:** Developer Tools / SaaS

#### Tone
**Archetype:** "Developer-First" — Code is content, simplicity is king
**Vibe:** Clean, technical, trustworthy

#### Typography
- **Display:** Sans-serif, bold but approachable
- **Body:** High readability, code-friendly
- **Unique:** Code snippets as design elements
- **Headline pattern:** "X for Y" ("Email for developers")

```css
--font-display: 'Inter', sans-serif;
--font-mono: 'JetBrains Mono', monospace;
--text-hero: 3.5rem;
```

#### Color
- Light mode default (developer trust signal)
- White background, dark text
- Bright blue accent (#0A84FF or similar)
- Subtle gray cards

```css
:root {
  --bg-primary: #FFFFFF;
  --bg-secondary: #F8F9FA;
  --text-primary: #111111;
  --accent: #0A84FF;
  --border: #E5E5E5;
}
```

#### Motion
- Minimal, purposeful animations
- Code block reveals
- Subtle hover states
- Tab switching with crossfade

#### Layout
- **Hero:** "Email for developers" + CTA + logo bar
- **Code examples:** Side-by-side code + preview
- **Features:** Icon + title + description grid
- **Social proof:** Testimonial cards with photos

#### What to Steal

1. **Code-as-Content Pattern**
```tsx
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
  {/* Code editor side */}
  <div className="bg-slate-900 rounded-lg p-6 font-mono text-sm">
    <pre className="text-slate-300">
      {codeExample}
    </pre>
  </div>
  {/* Preview side */}
  <div className="bg-white border rounded-lg p-6">
    {/* Rendered preview */}
  </div>
</div>
```

2. **Feature Grid with Icons**
```tsx
const features = [
  { icon: <ShieldIcon />, title: "Proactive blocklist tracking", desc: "..." },
  { icon: <ZapIcon />, title: "Faster Time to Inbox", desc: "..." },
];

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {features.map(f => (
    <div key={f.title} className="p-6 border rounded-lg">
      <div className="text-primary mb-4">{f.icon}</div>
      <h3 className="font-semibold mb-2">{f.title}</h3>
      <p className="text-muted-foreground text-sm">{f.desc}</p>
    </div>
  ))}
</div>
```

3. **Testimonial with Photo + Company**
```tsx
<blockquote className="border-l-2 border-primary pl-6">
  <p className="text-lg italic mb-4">"Quote here..."</p>
  <footer className="flex items-center gap-3">
    <img src="/avatar.jpg" className="w-10 h-10 rounded-full" />
    <div>
      <cite className="font-medium not-italic">Name</cite>
      <p className="text-sm text-muted-foreground">Title at Company</p>
    </div>
  </footer>
</blockquote>
```

#### Apply to Healthcare SaaS
- Clean light mode for healthcare trust
- Feature grid with medical icons
- Testimonials from practice managers
- "Practice Management for Modern Healthcare"

---

## Patterns Summary (Feb 2026)

### Common Across All Three Sites

| Pattern | Ciridae | Linear | Resend | Notes |
|---------|---------|--------|--------|-------|
| 2-Color palette | ✓ | ✓ | ✓ | Constraint = elegance |
| Section numbering | ✓ | - | - | Adds structure/credibility |
| Footer reveal | ✓ | - | - | Premium feel |
| Product hero | - | ✓ | ✓ | Show, don't tell |
| Trust badges | - | ✓ | ✓ | SOC2, HIPAA, GDPR |
| Logo bar | - | ✓ | ✓ | Social proof |
| Code as content | - | - | ✓ | Dev audience only |
| Testimonial cards | ✓ | - | ✓ | Human connection |

### Top Patterns for Healthcare SaaS

1. **Trust Signals Early** — HIPAA badge above fold
2. **Product Screenshot Hero** — Show the dashboard
3. **Section Numbering** — Creates credibility/order
4. **Testimonials with Photos** — Real practice managers
5. **Light Mode Default** — Healthcare = clean/clinical
6. **Feature Grid** — Icon + title + short desc
7. **Stats Section** — "425+ practices, 98% satisfaction"

---

## Research Queue
- [x] Awwwards SOTD analysis (Feb 2026)
- [x] Linear.app teardown
- [x] Resend.com teardown
- [ ] Raycast.com (dark mode patterns)
- [ ] Healthcare-specific SaaS sites
- [ ] Stripe.com (gradients, whitespace)
