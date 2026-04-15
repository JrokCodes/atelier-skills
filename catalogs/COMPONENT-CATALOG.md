# Component Catalog

> Cards, navigation, forms, CTAs, and reusable UI patterns

## SVG Architecture Diagrams

### Layered Blueprint Map
A hand-coded SVG system map with layer bands, hover-highlighted nodes, and animated bezier connections. Use for "how the system works" sections — premium architectural feel, no third-party diagram library, ~3KB of code.

**Pattern:**
```tsx
// Single SVG with viewBox, three motion.g layer bands, nodes overlaid,
// connections rendered BELOW nodes for proper z-stacking.
<svg viewBox="0 0 1400 900" preserveAspectRatio="xMidYMid meet">
  <defs>
    <pattern id="dotgrid" width="28" height="28" patternUnits="userSpaceOnUse">
      <circle cx="1" cy="1" r="1" fill="#D8D8D8" opacity="0.5" />
    </pattern>
  </defs>
  <rect width="1400" height="900" fill="url(#dotgrid)" />
  {LAYERS.map((layer) => <LayerBand {...layer} />)}      {/* dashed bg */}
  {EDGES.map((edge) => <BlueprintConnection {...edge} />)} {/* below nodes */}
  {NODES.map((node) => <BlueprintNode {...node} />)}     {/* above edges */}
</svg>
```

**Key implementation details:**
- **Node cards**: Pure SVG `<rect>` + `<text>` + small `<foreignObject>` for the Lucide icon. Avoids DOM/SVG clipping edge cases on mobile.
- **Connections**: SVG `<path>` with bezier curves. Animate the draw with `strokeDasharray={pathLength}` + `strokeDashoffset` transitioning from `pathLength` to `0`. After draw, overlay a second path with `strokeDasharray={\`${len*0.08} ${len*0.92}\`}` + a CSS keyframe animating `stroke-dashoffset` for the flow shimmer.
- **Theming via CSS vars**: Use `stroke="var(--color-accent)"` directly in JSX — works inside SVG, makes the diagram theme-able from `index.css`.
- **Responsive**: `viewBox` + `preserveAspectRatio="xMidYMid meet"` + container with `aspectRatio: '1400 / 900'`. The whole SVG scales to container width on mobile without layout breaking.
- **Mobile interaction**: Replace hover with tap-to-select. Detect via `matchMedia('(max-width: 767px)')`, store `selectedId` separately from `hoveredId`, dismiss on outside tap.

**Critical bug to avoid — the dim-on-default trap:**
```tsx
// WRONG — dims every node when nothing is hovered
const dimmed = !isHovered && !isConnectedToHovered;

// RIGHT — only dims when SOMETHING is active and this node isn't part of it
const dimmed = anyActive && !isHovered && !isConnectedToHovered;
```
Pass `anyActive={activeId !== null}` from the parent. Without this, the default state (nothing hovered) makes every node ghost-faded and the diagram appears empty.

**Layer band structure:**
```tsx
const LAYERS = [
  { name: "PRESENTATION", yBand: 60,  hBand: 230 },
  { name: "SERVICES",     yBand: 355, hBand: 230 },
  { name: "DATA",         yBand: 650, hBand: 230 },
];
// Each band is a dashed-border rect + monospace label in the upper-left
```

**When to use:** System architecture pages, "how it works" sections, technical proposals.

## Cards

### Glass Morphism Card
```tsx
<div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-xl shadow-xl">
  {/* Card content */}
</div>
```

### Hover Reveal Card
```tsx
<motion.div
  className="group relative overflow-hidden rounded-2xl bg-slate-900 p-8"
  whileHover={{ y: -4 }}
  transition={{ duration: 0.3 }}
>
  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 opacity-0 transition-opacity group-hover:opacity-100" />
  <div className="relative z-10">{/* Content */}</div>
</motion.div>
```

## Navigation

### Sticky Blur Nav
```tsx
<nav className="sticky top-0 z-50 border-b border-white/10 bg-white/80 backdrop-blur-lg dark:bg-slate-900/80">
  {/* Nav content */}
</nav>
```

## Stats Section

### Animated Stats Row
```tsx
const stats = [
  { value: 425, label: "Practices Served", suffix: "+" },
  { value: 98, label: "Satisfaction Rate", suffix: "%" },
  { value: 15, label: "Years Experience", suffix: "+" },
];
// Use Framer Motion animated counter for each value
```

---

## New Finds

<!-- Agent adds new component discoveries below this line -->

### Section Numbering System (Ciridae Pattern)
**Source:** ciridae.com (SOTD Feb 6, 2026)
**Use:** Services pages, process explanations, multi-step content

Creates structure and authority. Medical/enterprise clients love this.

```tsx
interface SectionLabelProps {
  number: string;
  code: string;
  title: string;
}

const SectionLabel = ({ number, code, title }: SectionLabelProps) => (
  <div className="flex items-center gap-3 mb-6">
    <span className="text-sm font-mono tracking-widest text-muted-foreground">
      {number} - {code}
    </span>
  </div>
);

// Usage
<SectionLabel number="01" code="PM" title="PATIENT MANAGEMENT" />
<h2 className="text-3xl font-medium mb-4">Patient Management</h2>
<p>Description...</p>
```

**Full section component:**
```tsx
const NumberedSection = ({ 
  number, 
  code, 
  title, 
  description, 
  children 
}: {
  number: string;
  code: string;
  title: string;
  description: string;
  children?: React.ReactNode;
}) => (
  <motion.section 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="py-16 border-t border-border"
  >
    <div className="flex items-center gap-3 mb-4">
      <span className="text-sm font-mono tracking-widest text-muted-foreground uppercase">
        {number} - {code}
      </span>
    </div>
    <h2 className="text-2xl md:text-3xl font-medium mb-4">{title}</h2>
    <p className="text-muted-foreground max-w-2xl mb-8">{description}</p>
    {children}
  </motion.section>
);
```

### Trust Badge Row (Linear Pattern)
**Source:** linear.app
**Use:** Healthcare SaaS (HIPAA critical), enterprise

```tsx
const TrustBadges = () => (
  <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
    <Badge variant="outline" className="text-xs font-medium">
      <ShieldCheck className="w-3 h-3 mr-1" />
      HIPAA Compliant
    </Badge>
    <Badge variant="outline" className="text-xs font-medium">
      <Lock className="w-3 h-3 mr-1" />
      SOC 2 Type II
    </Badge>
    <Badge variant="outline" className="text-xs font-medium">
      <Globe className="w-3 h-3 mr-1" />
      GDPR Ready
    </Badge>
  </div>
);
```

### Logo Bar with Animation (Linear/Resend Pattern)
**Source:** linear.app, resend.com
**Use:** Social proof, above fold or after hero

```tsx
const logos = [
  { name: "Company 1", src: "/logos/company1.svg" },
  // ... more logos
];

const LogoBar = () => (
  <section className="py-12 border-y border-border/50">
    <p className="text-center text-sm text-muted-foreground mb-8">
      Trusted by 425+ healthcare practices
    </p>
    <motion.div 
      className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6 opacity-60"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 0.6 }}
      viewport={{ once: true }}
    >
      {logos.map((logo) => (
        <img 
          key={logo.name}
          src={logo.src} 
          alt={logo.name}
          className="h-8 grayscale hover:grayscale-0 transition-all"
        />
      ))}
    </motion.div>
  </section>
);
```

### Testimonial Card (Ciridae Pattern)
**Source:** ciridae.com

```tsx
interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
  company: string;
  image?: string;
}

const TestimonialCard = ({ quote, author, role, company, image }: TestimonialProps) => (
  <div className="bg-card border rounded-2xl p-8">
    <blockquote className="text-lg leading-relaxed mb-6">
      "{quote}"
    </blockquote>
    <div className="flex items-center gap-4">
      {image && (
        <img src={image} alt={author} className="w-12 h-12 rounded-full object-cover" />
      )}
      <div>
        <cite className="font-medium not-italic block">{author}</cite>
        <span className="text-sm text-muted-foreground uppercase tracking-wide">
          {role} at {company}
        </span>
      </div>
    </div>
  </div>
);
```
