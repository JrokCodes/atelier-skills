# Atelier Router

> The brain of the Atelier design system. Maps user intents to the right skills, catalogs, and workflows.

## How Routing Works

1. User describes what they want to build or do
2. Read this file to identify which skills and catalogs apply
3. Load only the relevant skills into context (don't load everything)
4. Reference catalogs as needed during the build

---

## Skill Routing Table

### Core Skills (Load for every build)

| Skill | Path | When to Load |
|-------|------|-------------|
| **frontend-master** | `skills/frontend-master/SKILL.md` | ALWAYS — master design skill, anti-slop checklist, typography, motion, color |
| **screenshot-loop** | `skills/screenshot-loop/SKILL.md` | ALWAYS — QA comparison workflow |

### Pre-Build Skills

| Skill | Path | When to Load |
|-------|------|-------------|
| **design-scout** | `skills/design-scout/SKILL.md` | **NEW** — Live research: current UI trends, new components, industry patterns. Run BEFORE every build. |
| **conversion-audit** | `skills/conversion-audit/SKILL.md` | Auditing or redesigning an existing site — runs BEFORE design-advisor |
| **design-advisor** | `skills/design-advisor/SKILL.md` | New projects — produces DESIGN-BRIEF.md |
| **reference-analysis** | `skills/reference-analysis/SKILL.md` | Client has reference sites OR analyzing existing site for redesign (merged brand-extractor + site-reference) |

### Build Skills

| Skill | Path | When to Load |
|-------|------|-------------|
| **premium-layer** | `skills/premium-layer/SKILL.md` | **NEW** — Grain, inner glow, surface elevation, desaturated accents, micro-interaction timing. Apply after layout works. |
| **typography** | `skills/typography/SKILL.md` | Font selection, pairing, discovery, implementation (merged font-sniping) |
| **color-system** | `skills/color-system/SKILL.md` | Palette creation, CSS variables, dark mode surface system |
| **motion** | `skills/motion/SKILL.md` | Framer Motion, GSAP, scroll animations |
| **component-sniping** | `skills/component-sniping/SKILL.md` | Finding components: Magic UI, Tremor, shadcn, 21st.dev, Aceternity |
| **optimization** | `skills/optimization/SKILL.md` | Performance tuning, Lighthouse, pre-deploy checks |

### Specialty Skills

| Skill | Path | When to Load |
|-------|------|-------------|
| **scroll-frames** | `skills/scroll-frames/SKILL.md` | Apple-style scroll-driven frame animations |
| **spline-3d** | `skills/spline-3d/SKILL.md` | Spline.design + React Three Fiber 3D integration |

### Stitch Skills (AI Prototyping — SDK + MCP)

| Skill | Path | When to Load |
|-------|------|-------------|
| **stitch-prompt** | `skills/stitch-prompt/SKILL.md` | Enhancing prompts for Stitch generation + variant prompts |
| **stitch-loop** | `skills/stitch-loop/SKILL.md` | Autonomous multi-page Stitch builds (supports SDK edit mode) |
| **stitch-design-md** | `skills/stitch-design-md/SKILL.md` | Analyzing Stitch output into DESIGN.md |
| **stitch-to-react** | `skills/stitch-to-react/SKILL.md` | Converting Stitch screens to React components |
| **remotion** | `skills/remotion/SKILL.md` | Generating walkthrough videos from Stitch screens |

**SDK utility**: `tools/stitch-sdk/` — official `@google/stitch-sdk` with validation script and MCP proxy

### Component Library Skills

| Skill | Path | When to Load |
|-------|------|-------------|
| **shadcn-ui** | `skills/shadcn-ui/SKILL.md` | Installing/customizing shadcn/ui components in React projects |

---

## Catalog Reference Table

Read catalogs during builds for patterns and inspiration. Do NOT load all catalogs at once — pick the relevant ones.

| Catalog | Path | Contains |
|---------|------|----------|
| **HERO-CATALOG** | `catalogs/HERO-CATALOG.md` | Hero layouts, CTA patterns, background treatments |
| **COMPONENT-CATALOG** | `catalogs/COMPONENT-CATALOG.md` | Cards, nav, stats, trust badges, testimonials |
| **ANIMATION-CATALOG** | `catalogs/ANIMATION-CATALOG.md` | Framer Motion, GSAP, CSS animation recipes |
| **TYPOGRAPHY-CATALOG** | `catalogs/TYPOGRAPHY-CATALOG.md` | Font pairings, type scale, text effects |
| **COLOR-CATALOG** | `catalogs/COLOR-CATALOG.md` | Palettes, dark mode systems, gradient strategies |
| **SITE-TEARDOWNS** | `catalogs/SITE-TEARDOWNS.md` | Full breakdowns of award-winning sites |
| **REFERENCE-SITES** | `catalogs/REFERENCE-SITES.md` | Curated list of reference sites by category |
| **STITCH-MASTERY** | `catalogs/STITCH-MASTERY.md` | Stitch MCP best practices and advanced techniques |
| **PROMPT-EXAMPLES** | `catalogs/PROMPT-EXAMPLES.md` | Proven Stitch prompt templates |

---

## Workflow Reference

| Workflow | Path | When to Use |
|----------|------|-------------|
| **Agent Team Design** | `workflows/AGENT-TEAM-DESIGN.md` | Multi-agent build coordination |
| **Deployment** | `workflows/DEPLOYMENT.md` | GitHub to Vercel deploy pipeline |
| **NotebookLM Design RAG** | `workflows/NOTEBOOKLM-DESIGN-RAG.md` | Using NotebookLM as a design knowledge base |

---

## Tools

| Tool | Path | Purpose |
|------|------|---------|
| **Screenshot** | `tools/screenshot/screenshot.js` | Puppeteer screenshot capture for QA loop |
| **Stitch SDK** | `tools/stitch-sdk/` | Official Google Stitch SDK utility (generate, edit, variants, proxy) |

Screenshot usage:
```bash
node "tools/screenshot/screenshot.js" <url> <output.png> [--full-page] [--width=1440] [--delay=2000]
```

Stitch SDK validation:
```bash
cd tools/stitch-sdk && STITCH_API_KEY="$(cat ~/.claude/secrets/your-api-key.txt)" node validate.js [projectId]
```

---

## Templates

| Template | Path | Purpose |
|----------|------|---------|
| **Brand Assets** | `templates/brand-assets/` | Logo, colors, typography, brand guidelines template |
| **Directive Template** | `templates/directive-template.md` | Standard project directive format |
| **Project Brief** | `templates/project-brief-template.md` | Standardized intake for any build |
| **Design Brief** | `templates/design-brief-template.md` | Creative Director output format |

---

## Snippets

| Snippet | Path | Contains |
|---------|------|----------|
| **Animation Snippets** | `snippets/animation-snippets.md` | Copy-paste Framer Motion and CSS recipes |
| **Framer Motion Recipes** | `snippets/framer-motion-recipes.md` | Advanced Framer Motion patterns and examples |
| **GSAP Recipes** | `snippets/gsap-recipes.md` | GSAP scroll triggers, timelines, and effects |
| **Tailwind Patterns** | `snippets/tailwind-patterns.md` | Glass, grain, blur, grids, noise, dark mode tokens |
| **Scroll Frame Component** | `snippets/scroll-frame-component.tsx` | Production React scroll-frame animation component |

---

## Agent Definitions

| Agent | Path | Role |
|-------|------|------|
| **Creative Director** | `agents/creative-director.md` | Orchestrator — designs, delegates, reviews. Cannot edit code directly. |
| **Page Builder** | `agents/page-builder.md` | Builds individual pages/sections from design briefs. |
| **Frontend Builder** | `agents/frontend-builder.md` | Full-stack frontend engineer for complex builds. |
| **UI Reviewer** | `agents/ui-reviewer.md` | Screenshot QA, anti-slop validation, accessibility audit. |

---

## Intent -> Skill Mapping

Quick lookup for common user requests:

| User says... | Load these skills |
|-------------|-------------------|
| "Build me a website" | design-scout, frontend-master, design-advisor, screenshot-loop |
| "Build a landing page" | design-scout, frontend-master, design-advisor, screenshot-loop |
| "Audit my site" | conversion-audit |
| "Redesign this existing site" | conversion-audit, reference-analysis, design-advisor, frontend-master |
| "I have a reference site" | reference-analysis, frontend-master |
| "Choose fonts" | typography |
| "Add animations" | motion |
| "Make this look premium" | premium-layer, color-system, frontend-master |
| "It looks like AI slop" | premium-layer, typography, color-system |
| "Dark mode dashboard" | premium-layer, color-system, shadcn-ui |
| "Build a dashboard" | design-scout, frontend-master, shadcn-ui, premium-layer |
| "Financial/commission dashboard" | design-scout, shadcn-ui, premium-layer, component-sniping |
| "Research current UI trends" | design-scout |
| "Add 3D elements" | spline-3d |
| "Apple scroll effect" | scroll-frames |
| "Find me a component for X" | component-sniping |
| "Optimize for production" | optimization |
| "Use Stitch to prototype" | stitch-prompt, stitch-loop |
| "Convert Stitch to React" | stitch-to-react |
| "Edit a Stitch screen" | stitch-loop (SDK edit mode) |
| "Show me design alternatives" | stitch-prompt (variant generation) |
| "Create a demo video" | remotion |
| "Add shadcn components" | shadcn-ui |
| "Set up a component library" | shadcn-ui, frontend-master |
| "Set up colors and dark mode" | color-system, premium-layer |
| "QA this build" | screenshot-loop |

---

## Build Phase Order

When doing a full build, skills load in this sequence:

```
Phase 0: design-scout         → research what's current
Phase 1: reference-analysis   → analyze client references (if provided)
Phase 2: design-advisor       → create DESIGN-BRIEF.md
Phase 3: frontend-master      → build with anti-slop enforcement
Phase 4: premium-layer        → apply premium techniques
Phase 5: screenshot-loop      → QA verification
```

For dashboard builds specifically:
```
Phase 0: design-scout         → research dashboard trends
Phase 1: premium-layer        → load surface system + grain + borders
Phase 2: shadcn-ui            → component foundation
Phase 3: component-sniping    → Tremor charts, Magic UI effects
Phase 4: frontend-master      → anti-slop enforcement
Phase 5: screenshot-loop      → QA
```

---

## Self-Improvement

After every build, update `EXPERTISE.md` with:
- Which skills were used and how effective they were
- Design decisions that worked vs. failed
- New patterns to add to catalogs
- Tool issues encountered and workarounds

All paths in this file are relative to the Atelier root directory.
