---
name: optimization
description: Website optimization, performance tuning, and production readiness checklist.
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
---

# Optimization

Everything needed to take a development build to production-ready. Covers image optimization, loading strategies, bundle size, accessibility, deployment config, and a pre-deploy checklist.

---

## Image Optimization

### PNG to WebP Conversion

WebP delivers dramatically smaller files with negligible quality loss. Always convert before deploying.

**Single file conversion:**
```javascript
const sharp = require('sharp');

sharp('public/images/hero.png')
  .webp({ quality: 80 })
  .toFile('public/images/hero.webp')
  .then(info => console.log('Done:', info.size, 'bytes'));
```

**Batch conversion script** (save as `scripts/optimize-images.js`):
```javascript
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const INPUT_DIR = 'public/images';
const QUALITY = 80;

async function optimizeAll() {
  const files = fs.readdirSync(INPUT_DIR);
  let totalSaved = 0;

  for (const file of files) {
    if (!/\.(png|jpg|jpeg)$/i.test(file)) continue;

    const inputPath = path.join(INPUT_DIR, file);
    const outputPath = path.join(INPUT_DIR, file.replace(/\.(png|jpg|jpeg)$/i, '.webp'));
    const inputSize = fs.statSync(inputPath).size;

    await sharp(inputPath)
      .webp({ quality: QUALITY })
      .toFile(outputPath);

    const outputSize = fs.statSync(outputPath).size;
    const savings = ((1 - outputSize / inputSize) * 100).toFixed(1);
    totalSaved += inputSize - outputSize;

    console.log(`${file} → ${path.basename(outputPath)}: ${savings}% smaller`);
  }

  console.log(`\nTotal saved: ${(totalSaved / 1024 / 1024).toFixed(1)} MB`);
}

optimizeAll();
```

**Typical savings:** 40MB of PNGs compresses to ~1.1MB of WebP (97% reduction).

**Install sharp:**
```bash
npm install sharp --save-dev
```

### Size Targets

| Image Type | Max File Size | Resolution |
|-----------|---------------|------------|
| Hero background | 500 KB | 2880 x 1080 (2x) |
| Feature/section image | 200 KB | 1440 x 810 (2x) |
| Card thumbnail | 80 KB | 800 x 600 (2x) |
| Logo/icon | 20 KB | SVG preferred |
| OG/social image | 200 KB | 1200 x 630 (JPG required) |

If an image exceeds these targets after WebP conversion, reduce quality to 70 or resize.

---

## Image Loading Strategy

Different loading strategies for different positions on the page:

### Above the Fold (Hero Images)

Preload hero images so they appear instantly:

```html
<!-- In <head> -->
<link rel="preload" as="image" href="/images/hero.webp" fetchpriority="high" />
```

In React/Vite, add to `index.html`:
```html
<head>
  <link rel="preload" as="image" href="/images/hero.webp" fetchpriority="high" />
</head>
```

**Rules for hero images:**
- Always `fetchpriority="high"`
- Never `loading="lazy"` on hero images
- Inline critical CSS that styles the hero section

### Below the Fold (Prefetch)

For images that appear after scrolling:

```html
<link rel="prefetch" as="image" href="/images/feature-section.webp" />
```

**Important:** When using `prefetch`, do NOT also add `loading="lazy"` to the `<img>` tag. Prefetch tells the browser to fetch early; lazy loading tells it to wait. They conflict. Pick one:
- **Prefetch** for images likely to be seen soon (first scroll)
- **Lazy loading** for images far down the page

### Far Below the Fold (Lazy Load)

For images the user may never scroll to:

```tsx
<img
  src="/images/testimonial-bg.webp"
  alt="Customer testimonial background"
  loading="lazy"
  decoding="async"
  width={1440}
  height={810}
/>
```

Always include explicit `width` and `height` to prevent layout shift (CLS).

---

## Vercel Deployment Configuration

Create `vercel.json` at project root:

```json
{
  "headers": [
    {
      "source": "/images/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/fonts/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ],
  "rewrites": [
    {
      "source": "/((?!assets|images|fonts|.*\\..*).*)",
      "destination": "/index.html"
    }
  ]
}
```

**What this does:**
- Images, fonts, and assets cached for 1 year (immutable — Vite hashes filenames)
- SPA fallback: all non-asset routes serve `index.html` for client-side routing
- Vercel auto-deploys on push to `main` branch

For full deployment pipeline setup, see `Atelier/workflows/DEPLOYMENT.md`.

---

## Lighthouse Targets

All production sites must score **90+ on all 4 categories**:

| Category | Target | Key Factors |
|----------|--------|-------------|
| Performance | 90+ | Image size, bundle size, LCP, CLS |
| Accessibility | 90+ | Alt text, contrast, heading hierarchy, landmarks |
| Best Practices | 90+ | HTTPS, no console errors, no deprecated APIs |
| SEO | 90+ | Meta tags, canonical URL, sitemap, robots.txt |

### Core Web Vitals

| Metric | Target | What It Measures |
|--------|--------|-----------------|
| LCP (Largest Contentful Paint) | < 2.5s | How fast the hero loads |
| FID (First Input Delay) | < 100ms | How fast the page responds to clicks |
| CLS (Cumulative Layout Shift) | < 0.1 | How much the page layout jumps around |

---

## Bundle Size

### Targets

| Metric | Target |
|--------|--------|
| Total JS (gzipped) | < 200 KB |
| Total CSS (gzipped) | < 50 KB |
| Largest single chunk | < 100 KB |

### Analyze Bundle

```bash
# Vite bundle analysis
npx vite-bundle-visualizer
```

### Common Size Offenders

| Library | Gzipped Size | Alternative |
|---------|-------------|-------------|
| moment.js | 72 KB | date-fns (tree-shakeable) |
| lodash (full) | 71 KB | lodash-es (tree-shakeable) |
| framer-motion (full) | 45 KB | Import only what you use |
| three.js | 150 KB | Only if 3D is core to the page |

### Code Splitting

Use `React.lazy` for heavy below-fold sections to keep initial bundle small:

```tsx
const HeavySection = lazy(() => import('./components/HeavySection'));
// Wrap in <Suspense fallback={<div className="h-96 animate-pulse bg-gray-100" />}>
```

---

## Font Loading

### Self-Host Fonts (Always)

Never use Google Fonts CDN in production. Download and self-host for performance and privacy.

```css
@font-face {
  font-family: 'Satoshi';
  src: url('/fonts/Satoshi-Variable.woff2') format('woff2');
  font-weight: 400 700;
  font-display: swap;
  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+2000-206F;
}
```

**Critical rules:**
- `font-display: swap` — ALWAYS. Prevents invisible text during load.
- Use `.woff2` format only (best compression, universal browser support)
- Use `unicode-range` to subset if only using Latin characters
- Preload the primary font:
  ```html
  <link rel="preload" as="font" href="/fonts/Satoshi-Variable.woff2" type="font/woff2" crossorigin />
  ```

### Font File Targets

| Font Type | Max Size |
|-----------|----------|
| Variable font (woff2) | < 100 KB |
| Static weight (woff2) | < 30 KB per weight |
| Total font payload | < 200 KB |

---

## Pre-Deploy Checklist

Run through every item before pushing to production:

### 1. Images
- [ ] All images converted to WebP
- [ ] Hero image preloaded in `<head>`
- [ ] Below-fold images use prefetch or lazy loading
- [ ] All images have descriptive `alt` text
- [ ] No image exceeds size targets (see table above)

### 2. Performance
- [ ] Bundle size under 200KB JS gzipped
- [ ] Fonts self-hosted with `font-display: swap`
- [ ] Primary font preloaded
- [ ] No unused CSS or JS imported
- [ ] Heavy components code-split with React.lazy

### 3. Accessibility & SEO
- [ ] One `<h1>` per page, headings don't skip levels (h1 > h2 > h3)
- [ ] Landmark elements: `<header>`, `<main>`, `<nav>`, `<footer>`
- [ ] All `<img>` have `alt` text (decorative: `alt=""`, content: descriptive)
- [ ] Color contrast meets WCAG AA (4.5:1 text, 3:1 large text)
- [ ] All interactive elements keyboard-accessible with visible focus styles
- [ ] `<title>` (50-60 chars) and `<meta name="description">` (150-160 chars)
- [ ] OG image (1200x630, JPG) and `<link rel="canonical">`

### 4. Responsive
- [ ] Tested at 375px (mobile), 768px (tablet), 1440px (desktop)
- [ ] No horizontal overflow at any breakpoint
- [ ] Touch targets at least 44x44px, body text at least 16px on mobile
- [ ] Hero images use `object-fit: cover` and responsive `<picture>` element

### 5. Deployment
- [ ] `vercel.json` configured with cache headers and SPA rewrite
- [ ] Environment variables set in Vercel dashboard (not committed)
- [ ] Build succeeds locally with `npm run build`
- [ ] No TypeScript errors (`npx tsc --noEmit`)
- [ ] No console errors in production build
- [ ] Favicon and manifest configured

### 7. Final Verification
- [ ] Lighthouse scores 90+ on all 4 categories
- [ ] Screenshot comparison matches design brief
- [ ] All links and CTAs functional
- [ ] Forms submit correctly
- [ ] Analytics/tracking code installed (if applicable)

---

## GitHub to Vercel Auto-Deploy Pipeline

**Summary** (see `Atelier/workflows/DEPLOYMENT.md` for full setup):

1. Connect GitHub repo to Vercel project
2. Set framework preset to Vite
3. Configure build command: `npm run build`
4. Configure output directory: `dist`
5. Set environment variables in Vercel dashboard
6. Push to `main` triggers automatic production deploy
7. Push to any other branch creates a preview deployment

**Branch strategy:**
- `main` = production (auto-deploys to live URL)
- `dev` or feature branches = preview URLs for review
- Never push directly to `main` without testing on a preview first

---

## Quick Commands

```bash
# Build and check for errors
npm run build

# Check TypeScript
npx tsc --noEmit

# Analyze bundle
npx vite-bundle-visualizer

# Convert all images to WebP
node scripts/optimize-images.js

# Run Lighthouse (requires Chrome)
npx lighthouse http://localhost:5173 --view

# Check for unused dependencies
npx depcheck
```

---

## Integration with Other Skills

| Skill | Relationship |
|-------|-------------|
| `vibe-design` | Runs BEFORE optimization. Generates raw images that need conversion. |
| `screenshot-loop` | Runs AFTER optimization to verify nothing broke during compression. |
| `color-system` | Contrast ratios from color-system feed into accessibility checks. |
| `typography` | Font loading strategy defined here; font selection defined in typography. |
