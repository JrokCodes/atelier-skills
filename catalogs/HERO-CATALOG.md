# Hero Section Catalog

> Above-fold layouts, CTA patterns, and background treatments

## Hero Archetypes

### 1. Split Hero (Text Left + Visual Right)
**Best for:** SaaS, healthcare, B2B
```
[Nav]
[Headline + Sub + CTA] | [Image/3D/Dashboard]
[Social proof strip]
```

### 2. Centered Hero (Full-width text)
**Best for:** Product launches, landing pages
```
[Nav]
        [Headline]
       [Subheadline]
     [CTA1]  [CTA2]
    [Visual/Screenshot]
```

### 3. Full-Bleed Media Hero
**Best for:** Luxury, real estate, portfolios
```
[Background Video/Image fills viewport]
  [Overlay text + CTA]
[Scroll indicator]
```

### 4. Asymmetric Overlap Hero
**Best for:** Creative, editorial, agencies
```
[Nav]
     [Large headline breaking grid]
  [Image overlapping text area]
        [CTA offset right]
```

---

## Background Treatments

### Gradient Mesh
```tsx
<div className="relative overflow-hidden">
  <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-emerald-500/20 blur-3xl" />
  <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />
  {/* Content */}
</div>
```

### Dot Grid Pattern
```tsx
<div className="bg-[radial-gradient(circle,_rgba(0,0,0,0.1)_1px,_transparent_1px)] bg-[size:20px_20px]">
  {/* Content */}
</div>
```

### Noise Texture Overlay
```tsx
<div className="relative">
  <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url(/noise.svg)' }} />
  {/* Content */}
</div>
```

---

## New Finds

<!-- Agent adds new hero section discoveries below this line -->

### Manifesto Hero (Ciridae Pattern)
**Source:** ciridae.com (SOTD Feb 6, 2026)
**Best for:** AI/consulting, B2B services, bold brands

Two-line bold statement, second line muted. No product image — words ARE the hero.

```tsx
<section className="min-h-screen flex items-center justify-center px-6">
  <div className="text-center max-w-5xl">
    <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-none">
      <span className="block">AUTOMATE THE MUNDANE</span>
      <span className="block text-muted-foreground mt-2">UNLEASH THE REMARKABLE</span>
    </h1>
    <p className="mt-8 text-xl text-muted-foreground max-w-2xl mx-auto">
      We re-architect businesses for a faster, smarter tomorrow.
    </p>
    <div className="mt-10">
      <Button size="lg">Work with us</Button>
    </div>
  </div>
</section>
```

**Healthcare SaaS Adaptation:**
```tsx
<h1>
  <span>AUTOMATE THE ADMIN</span>
  <span className="text-muted-foreground">FOCUS ON PATIENTS</span>
</h1>
```

### Product-Forward Hero (Linear Pattern)
**Source:** linear.app
**Best for:** SaaS, dashboards, tools

Centered text + CTA above, product screenshot below with gradient fade.

```tsx
<section className="relative py-24 overflow-hidden">
  <div className="mx-auto max-w-4xl text-center px-6">
    <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium">
      Practice management that just works
    </h1>
    <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
      Streamline scheduling, billing, and patient records. Built for modern healthcare.
    </p>
    <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
      <Button size="lg">Start free trial</Button>
      <Button size="lg" variant="outline">Book a demo</Button>
    </div>
  </div>
  
  {/* Product screenshot with fade */}
  <div className="mt-16 mx-auto max-w-6xl px-6 relative">
    <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    <motion.img 
      src="/dashboard-hero.png" 
      alt="Product Dashboard"
      className="w-full rounded-xl shadow-2xl border"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    />
  </div>
</section>
```
