# Atelier Skills

A design system and skill library for Claude Code that makes it dramatically better at building frontends. 20 skills, 9 reference catalogs, 4 agent definitions, code snippets, and workflow guides -- all structured so Claude loads only what it needs for each task.

Built by builders, for builders. If you use Claude Code to ship websites, dashboards, or SaaS UIs, this will save you hours of prompt engineering and produce noticeably better output.

---

## Tech Stack

Everything in Atelier targets this stack:

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + TypeScript |
| Build | Vite 7+ |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion 12+ |
| Routing | React Router 7+ |
| Components | shadcn/ui, Magic UI, Aceternity UI, Tremor |
| Fonts | Google Fonts / Fontshare (free, commercial-use) |

---

## Quick Start

1. Clone the repo:

```bash
git clone https://github.com/your-username/atelier-skills.git
```

2. Copy the folders into your project, or reference them from a shared location:

```
your-project/
  Atelier/
    skills/
    catalogs/
    agents/
    snippets/
    workflows/
    templates/
    ROUTER.md
```

3. Add this line to your project's `CLAUDE.md`:

```
For any frontend work, read Atelier/ROUTER.md first to determine which skills and catalogs to load.
```

That's it. Claude Code will now consult the router before any frontend task and load the right skills automatically.

---

## What's Inside

### Skills (20)

Skills are injectable context files. Claude loads them on demand based on what you're building.

| Category | Skills | Purpose |
|----------|--------|---------|
| **Core** | frontend-master, screenshot-loop | Loaded on every build. Master design rules + QA loop. |
| **Pre-Build Research** | design-scout, conversion-audit, design-advisor, reference-analysis | Research current trends, audit existing sites, produce design briefs, analyze reference sites. |
| **Build** | premium-layer, typography, color-system, motion, component-sniping, optimization | Font selection, palettes, animations, component discovery, performance tuning. Premium-layer adds grain, inner glow, surface elevation, and micro-interaction timing. |
| **Specialty** | scroll-frames, spline-3d | Apple-style scroll animations, 3D integration with Spline + React Three Fiber. |
| **Stitch AI Prototyping** | stitch-prompt, stitch-loop, stitch-design-md, stitch-to-react, remotion | AI prototyping pipeline: generate screens, iterate, extract design systems, convert to React, create demo videos. |
| **Components** | shadcn-ui | Install and customize shadcn/ui components. |

### Catalogs (9)

Reference material Claude reads during builds for patterns and inspiration.

| Catalog | Contains |
|---------|----------|
| HERO-CATALOG | Hero layouts, CTA patterns, background treatments |
| COMPONENT-CATALOG | Cards, nav, stats, trust badges, testimonials |
| ANIMATION-CATALOG | Framer Motion, GSAP, CSS animation recipes |
| TYPOGRAPHY-CATALOG | Font pairings, type scale, text effects |
| COLOR-CATALOG | Palettes, dark mode systems, gradient strategies |
| SITE-TEARDOWNS | Full breakdowns of award-winning sites |
| REFERENCE-SITES | Curated list of reference sites by category |
| STITCH-MASTERY | Stitch best practices and advanced techniques |
| PROMPT-EXAMPLES | Proven Stitch prompt templates |

### Agents (4)

Agent definitions for multi-agent builds using Claude Code Agent Teams.

| Agent | Role |
|-------|------|
| creative-director | Orchestrator. Makes design decisions, delegates work. Cannot write code. |
| frontend-builder | Full-stack React engineer. Handles complex builds. |
| page-builder | Focuses on one page or section at a time. |
| ui-reviewer | Screenshot QA and anti-slop validation. |

### Snippets

Copy-paste code recipes:

- **Framer Motion Recipes** -- Advanced animation patterns and examples
- **GSAP Recipes** -- Scroll triggers, timelines, effects
- **Animation Snippets** -- Quick Framer Motion and CSS recipes
- **Tailwind Patterns** -- Glass, grain, blur, grids, noise, dark mode tokens
- **Scroll Frame Component** -- Production React component for Apple-style scroll animations

### Templates

- **Project Brief** -- Standardized intake for any build
- **Design Brief** -- Creative Director output format
- **Brand Assets** -- Logo, colors, typography, brand guidelines
- **Directive** -- Standard project directive format

### Workflows

- **Agent Team Design** -- How to coordinate multi-agent builds
- **Deployment** -- GitHub to Vercel deploy pipeline
- **NotebookLM Design RAG** -- Using NotebookLM as a design knowledge base

---

## The Router

`ROUTER.md` is the brain of the system. It maps what you're trying to do to the minimum set of skills and catalogs Claude should load. This keeps context lean -- Claude doesn't load 20 skills when it only needs 2.

Examples:

| Task | What Gets Loaded |
|------|-----------------|
| Quick CSS fix | frontend-master |
| New landing page | design-scout + frontend-master + design-advisor + screenshot-loop |
| Dashboard build | design-scout + frontend-master + shadcn-ui + premium-layer |
| "Make this look premium" | premium-layer + color-system + frontend-master |
| "It looks like AI slop" | premium-layer + typography + color-system |
| Apple scroll effect | scroll-frames |
| Font selection | typography |
| Add animations | motion |
| Stitch prototyping | stitch-prompt + stitch-loop |
| Production optimization | optimization |

The router also defines a **build phase order** for full builds:

```
Phase 0: design-scout         -> research what's current
Phase 1: reference-analysis   -> analyze reference sites (if provided)
Phase 2: design-advisor       -> create design brief
Phase 3: frontend-master      -> build with anti-slop enforcement
Phase 4: premium-layer        -> apply premium techniques
Phase 5: screenshot-loop      -> QA verification
```

---

## Agent Team Pattern

For larger builds, the 4 agents work together as a team:

**creative-director** runs the show. It reads the router, interviews you about the project (tone, colors, typography, references), writes a design brief, then delegates sections to builders. It reviews everything but never writes code directly.

**frontend-builder** handles complex, full-stack React work. Use this for builds that touch routing, state management, API integration -- anything beyond a single page.

**page-builder** focuses on one section at a time. The creative-director assigns it a specific page or section from the design brief. For multi-page sites, you can run multiple page-builders in parallel.

**ui-reviewer** does QA. It takes screenshots, compares against the design brief, and runs anti-slop validation. It catches generic patterns, bad font choices, and AI-looking output before you ship.

Team structure for a full build:

```
Team Lead:  creative-director  (orchestrates, cannot code)
Builders:   page-builder x N   (one per page/section)
QA:         ui-reviewer        (screenshots, anti-slop checks)
```

For simpler builds, skip the agents entirely and just load the relevant skills directly.

---

## Anti-Slop Rules

One of the biggest problems with AI-generated frontends is they all look the same. Atelier has built-in anti-slop validation to catch and prevent this.

The system enforces rules like:

- **No default display fonts.** Inter, Roboto, and Arial are banned for headings and display text. They're fine for body copy, but display text needs personality.
- **No generic stock patterns.** Cookie-cutter hero sections, testimonial carousels, and pricing tables get flagged for redesign.
- **No overused gradients.** The purple-to-blue gradient that every AI tool defaults to gets caught and replaced.
- **Surface depth over flat cards.** Premium-layer adds grain texture, inner glow, subtle borders, and elevation instead of flat white cards on gray backgrounds.
- **Micro-interaction timing.** Animations need easing curves and staggered timing, not everything fading in at once.

The ui-reviewer agent enforces these rules during QA, and frontend-master checks for them during builds.

---

## Self-Improvement

Atelier includes an `EXPERTISE.md` file that acts as a self-improving knowledge base. After every build, record what worked and what didn't:

- Which skills were effective
- Design decisions that landed vs. ones that flopped
- New patterns worth adding to catalogs
- Tool issues and workarounds

This means the system gets measurably better the more you use it.

---

## Contributing

Found a pattern that works? Open a PR. Found a bug? Open an issue. This system gets smarter with every build.

Good contributions:
- New entries for existing catalogs (hero patterns, animation recipes, font pairings)
- New snippets with working code
- Bug fixes in skill instructions
- New skills for patterns not yet covered
- Site teardowns of well-designed sites

---

## License

MIT
