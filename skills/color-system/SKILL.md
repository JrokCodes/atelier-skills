---
name: color-system
description: Consolidated color guidance, CSS variable systems, palette creation, and dark mode implementation.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# Color System

Build maintainable, accessible color systems using CSS custom properties. Covers palette strategies, dark mode token swaps, gradient rules, contrast requirements, and anti-patterns.

---

## Core Principle: Never Hardcode Hex Values

Every color in the project flows through CSS custom properties. This makes theming, dark mode, and future palette changes trivial.

```css
/* Always this */
color: var(--text-primary);
background: var(--bg-primary);

/* Never this */
color: #111111;
background: #FFFFFF;
```

The only place raw hex values appear is in the `:root` and `.dark` variable definitions.

---

## CSS Variables System

### Light Mode Foundation

```css
:root {
  /* Backgrounds */
  --bg-primary: #FFFFFF;
  --bg-secondary: #F8F9FA;
  --bg-tertiary: #F1F3F5;
  --bg-elevated: #FFFFFF;

  /* Text */
  --text-primary: #111111;
  --text-secondary: #6B7280;
  --text-tertiary: #9CA3AF;
  --text-inverse: #FFFFFF;

  /* Accent */
  --accent: #3B82F6;
  --accent-hover: #2563EB;
  --accent-subtle: rgba(59, 130, 246, 0.1);

  /* Borders */
  --border: rgba(0, 0, 0, 0.08);
  --border-strong: rgba(0, 0, 0, 0.15);

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.08);
  --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.12);

  /* Semantic */
  --success: #10B981;
  --warning: #F59E0B;
  --error: #EF4444;
  --info: #3B82F6;
}
```

### Dark Mode Token Swap

Dark mode swaps the token values. Components don't change — only the root definitions do.

```css
.dark {
  /* Backgrounds — semantic layering */
  --bg-primary: #0A0A0A;
  --bg-secondary: #111111;
  --bg-tertiary: #1A1A1A;
  --bg-elevated: #1E1E1E;

  /* Text */
  --text-primary: #F5F5F5;
  --text-secondary: #A1A1AA;
  --text-tertiary: #71717A;
  --text-inverse: #111111;

  /* Accent — may need adjustment for dark backgrounds */
  --accent: #60A5FA;
  --accent-hover: #93C5FD;
  --accent-subtle: rgba(96, 165, 250, 0.15);

  /* Borders */
  --border: rgba(255, 255, 255, 0.08);
  --border-strong: rgba(255, 255, 255, 0.15);

  /* Shadows — more pronounced in dark mode */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.5);
}
```

### Tailwind CSS v4 Integration

In Tailwind v4, define tokens in your CSS file:

```css
@import "tailwindcss";

@theme {
  --color-bg-primary: var(--bg-primary);
  --color-bg-secondary: var(--bg-secondary);
  --color-text-primary: var(--text-primary);
  --color-text-secondary: var(--text-secondary);
  --color-accent: var(--accent);
  --color-accent-hover: var(--accent-hover);
  --color-border: var(--border);
}
```

Then use in components:
```tsx
<div className="bg-bg-primary text-text-primary border-border">
  <h1 className="text-text-primary">Heading</h1>
  <p className="text-text-secondary">Body text</p>
  <button className="bg-accent hover:bg-accent-hover text-white">
    CTA
  </button>
</div>
```

---

## Palette Strategies

### Strategy 1: Dominant + Sharp Accent (60/30/10 Rule)

The most versatile strategy. Works for most projects.

- **60%** — Dominant background (neutral)
- **30%** — Secondary elements (cards, sections, borders)
- **10%** — Accent color (CTAs, links, highlights)

```css
:root {
  /* 60% — dominant */
  --bg-primary: #FFFFFF;

  /* 30% — secondary */
  --bg-secondary: #F8F9FA;
  --text-secondary: #6B7280;
  --border: rgba(0, 0, 0, 0.08);

  /* 10% — accent */
  --accent: #E85D3A;        /* Warm orange */
  --accent-hover: #D14E2E;
}
```

### Strategy 2: 2-Color Constraint (Ciridae Pattern)

Extreme restraint. Just background + text + one accent. Creates an editorial, intentional feel.

```css
:root {
  --bg-primary: #FAFAF8;    /* Warm white */
  --text-primary: #1A1A1A;  /* Near black */
  --accent: #D4754E;        /* Terracotta — the ONLY color */
  --accent-hover: #C0643F;
  --text-secondary: #71717A;
  --border: rgba(0, 0, 0, 0.06);
}
```

Rules for 2-color constraint:
- No gradients anywhere
- Accent used sparingly: CTAs, links, active states only
- All other elements are shades of the base neutral
- Images provide the color variety

### Strategy 3: Healthcare Warm Palette

Designed for medical/wellness brands. Avoids cold clinical blue.

```css
:root {
  --bg-primary: #FAF8F5;    /* Warm off-white */
  --bg-secondary: #F5F0EB;  /* Cream */
  --text-primary: #2D2D2D;  /* Charcoal (not pure black) */
  --text-secondary: #6B6B6B;
  --accent: #D4754E;        /* Terracotta */
  --accent-hover: #C0643F;
  --accent-secondary: #87A878; /* Sage green */
  --border: rgba(45, 45, 45, 0.08);
}
```

### Strategy 4: Dark Mode Semantic Layering

For dark-mode-first designs. The key is creating depth through subtle background layers.

```css
.dark {
  /* Layer 0 — deepest background (page bg) */
  --bg-primary: #0A0A0A;

  /* Layer 1 — surface (cards, panels) */
  --bg-secondary: #111111;

  /* Layer 2 — elevated surface (dropdowns, modals) */
  --bg-tertiary: #1A1A1A;

  /* Layer 3 — highest elevation (tooltips, popovers) */
  --bg-elevated: #222222;

  /* Text adjusts for dark backgrounds */
  --text-primary: #F5F5F5;     /* Not pure white (#FFF is too harsh) */
  --text-secondary: #A1A1AA;
  --text-tertiary: #71717A;

  /* Borders are subtle white */
  --border: rgba(255, 255, 255, 0.06);
  --border-strong: rgba(255, 255, 255, 0.12);
}
```

**Layer spacing rules:**
- Each layer is ~6-8 lightness points apart
- #0A0A0A → #111111 → #1A1A1A → #222222
- Never jump directly from #0A0A0A to #333333 (too much contrast)

---

## Gradient Rules

Gradients are powerful when used sparingly and disastrous when overused.

### Where to Use Gradients

| Location | Example |
|----------|---------|
| CTA buttons | `background: linear-gradient(135deg, var(--accent), var(--accent-hover))` |
| Accent borders | `border-image: linear-gradient(to right, #3B82F6, #8B5CF6) 1` |
| Text highlights | `background: linear-gradient(...)` with `-webkit-background-clip: text` |
| Overlay on images | `background: linear-gradient(to top, rgba(0,0,0,0.8), transparent)` |
| Subtle section dividers | Very faint gradient from one bg tone to another |

### Where to NEVER Use Gradients

- Full section backgrounds (screams AI-generated)
- Navigation bars
- Card backgrounds (use solid colors with subtle borders)
- Body text color
- Multiple gradients on the same page (one is enough)

### Gradient Construction

```css
/* CTA gradient — subtle depth */
.cta { background: linear-gradient(135deg, #3B82F6, #2563EB); }

/* Image overlay — readable text on any image */
.hero-overlay {
  background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 40%, transparent 100%);
}
```

---

## Contrast Checking

### WCAG AA Requirements (Minimum)

| Element | Minimum Contrast Ratio |
|---------|----------------------|
| Normal text (< 18px) | 4.5:1 |
| Large text (>= 18px bold or >= 24px) | 3:1 |
| UI components (borders, icons) | 3:1 |
| Decorative elements | No requirement |

**How to check:** In Chrome DevTools, click any color swatch in the Styles pane — it shows the contrast ratio with pass/fail. Or use WebAIM's contrast checker online.

### Common Contrast Traps

| Combination | Ratio | Verdict |
|-------------|-------|---------|
| Light gray text (#9CA3AF) on white (#FFFFFF) | 2.9:1 | FAILS. Use #6B7280 instead. |
| White text (#FFFFFF) on accent blue (#3B82F6) | 3.8:1 | Passes for large text only. |
| White text (#FFFFFF) on dark bg (#0A0A0A) | 19.3:1 | Passes easily. |
| Gray text (#A1A1AA) on dark bg (#0A0A0A) | 7.1:1 | Passes. Good for secondary text in dark mode. |

---

## Canva Color Extraction Hack

Screenshot any website or brand material, upload to Canva (canva.com), and it auto-extracts dominant hex codes. Alternative: use DevTools color picker directly on the client's live site. Record results in `brand-assets/colors.json`.

---

## Anti-Patterns

| Anti-Pattern | Why It's Bad | Fix |
|-------------|-------------|-----|
| Purple/blue gradient (`#667eea → #764ba2`) | AI slop signature, on thousands of generated sites | Use a single flat accent color |
| Neon on white (`#00FF88` on `#FFF`) | Fails WCAG contrast | Neon only on dark backgrounds |
| 3+ accent colors | Visual chaos, no hierarchy | Max 2 accents (primary + secondary) |
| Pure black on pure white (`#000` / `#FFF`) | Harsh, causes eye strain | Use #111111 on #FFFFFF (17.4:1, softer) |
| Dark mode = just inverting colors | Washed out, no depth | Use semantic layering + #F5F5F5 text (not #FFF) + brighter accents |

---

## Implementation Patterns

### React Dark Mode Toggle

```tsx
function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('theme') === 'dark' ||
      (!localStorage.getItem('theme') &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return [isDark, setIsDark] as const;
}
```

### Preventing Flash of Wrong Theme

Add this to `index.html` `<head>` BEFORE any CSS (runs synchronously before paint):

```html
<script>
  (function() {
    var t = localStorage.getItem('theme');
    if (t === 'dark' || (!t && matchMedia('(prefers-color-scheme: dark)').matches))
      document.documentElement.classList.add('dark');
  })();
</script>
```

### Tailwind v4 Dark Mode

No `dark:` prefix needed when using CSS variable tokens. The `.dark` class swaps the variables automatically:

```tsx
<div className="bg-bg-primary text-text-primary border-border">
  <button className="bg-accent hover:bg-accent-hover">CTA</button>
</div>
```

---

## Starter Palettes

| Palette | bg-primary | bg-secondary | text-primary | accent | Use Case |
|---------|-----------|-------------|-------------|--------|----------|
| Warm Neutral | #FAF8F5 | #F5F0EB | #2D2D2D | #D4754E | Healthcare, wellness |
| Cool Professional | #FFFFFF | #F8FAFC | #0F172A | #3B82F6 | SaaS, corporate |
| Dark Premium | #0A0A0A | #111111 | #F5F5F5 | #14B8A6 | Tech, creative |
| Earth Luxury | #1A1A1A | #242424 | #F5F0EB | #C9A962 | Real estate, premium |

---

## Reference

For the full palette library with more variations, industry-specific palettes, and gradient recipes, see:

`Atelier/catalogs/COLOR-CATALOG.md`

---

## Integration with Other Skills

| Skill | Relationship |
|-------|-------------|
| `design-advisor` | Defines the palette direction. Color system implements it. |
| `typography` | Text colors from this system. Font colors must pass contrast checks. |
| `vibe-design` | AI images must match the colors defined here. Pass hex codes to image prompts. |
| `screenshot-loop` | Validates colors render correctly in the actual build. |
| `optimization` | Contrast ratios feed into accessibility scoring. |
| `frontend-master` | Consumes the CSS variables during the build. |
