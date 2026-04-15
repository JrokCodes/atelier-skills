# Google Stitch Mastery Guide

The definitive reference for using Google Stitch effectively for UI design. Consulted whenever Stitch is used for any project.

---

## What Is Stitch

Google Stitch ([stitch.withgoogle.com](https://stitch.withgoogle.com)) is a free AI-powered UI design tool that generates full UI screens from text prompts. It is the design layer in the build pipeline -- Stitch handles how it looks, code generation tools (Lovable, Claude Code) handle how it works.

**Core capabilities:**
- Generates complete, production-quality UI screens from natural language descriptions
- Supports multi-screen projects with shared design systems
- Iteration on individual screens and individual elements within screens
- Export to HTML/CSS, downloadable .zip, or direct handoff to Google AI Studio
- Works via the web UI at stitch.withgoogle.com or via MCP integration (Claude Code, Cursor, VS Code, Gemini CLI)

**Two generation modes:**

| Mode | Model | Speed | Monthly Limit | Features |
|------|-------|-------|---------------|----------|
| **Standard** | Gemini 2.5 Flash | Fast (~30-60s) | More generous | Text prompts, iterations |
| **Experimental** | Gemini 2.5 Pro | Slower (~60-120s) | 50 generations/month | Image upload as reference, higher fidelity output |

**Key features:**
- **3x Mode**: Generates 3 alternative versions of any screen simultaneously for A/B/C comparison
- **Input Sources**: Add competitor URLs or reference images before prompting to inherit visual language
- **Theme Editor**: Edit colors, corner radius, fonts directly after generation (Edit > Theme) without re-prompting
- **Element Selection**: Click any element on a generated screen, give targeted feedback, regenerate just that part
- **Nano Banana**: Google's built-in image generation model -- images are auto-generated in designs without external tools
- **Export Options**: AI Studio (cloud-based), .zip download (local), or MCP fetch (programmatic)

---

## The Prompt Formula

A high-quality Stitch prompt has five components in a specific order. Every component matters. Skipping one produces generic output.

### 1. Context & Purpose (2-3 sentences)

What the screen is, who it is for, what it needs to accomplish emotionally. This is the framing that prevents Stitch from producing generic SaaS templates.

**Example:**
```
CONTEXT: This is the main dashboard of a RevOps client portal where marketing
agencies show clients their performance data. The client is a B2B risk management
consultancy. This screen needs to feel like a command center -- every metric at a glance.
```

**Why it matters:** Without context, Stitch defaults to generic patterns. With context, it makes design decisions that serve the specific use case -- card sizes, data density, color temperature, visual weight distribution.

### 2. Design Direction (1-2 sentences)

Aesthetic mood, reference products, emotional quality. Name specific products or design systems as anchors.

**Example:**
```
DESIGN DIRECTION: Dark, premium, atmospheric. Think Linear.app meets Vercel dashboard.
Glass morphism cards, subtle depth, generous whitespace.
```

**Strong reference products by aesthetic:**
- **Dark premium SaaS**: Linear, Vercel, Raycast, Arc Browser
- **Light clean SaaS**: Notion, Stripe Dashboard, Zendesk
- **Bold/editorial**: Apple.com, Framer, Readymag
- **Warm/personal**: Calm, Headspace, Mailchimp
- **Data-dense**: Bloomberg Terminal, Datadog, Grafana

### 3. Layout Structure (the bulk of the prompt)

Specific components, dimensions, colors, content. Use directional language that Stitch can interpret spatially.

**Directional language that works well:**
- "left sidebar 240px wide"
- "3 cards in a row, equal width, 24px gap"
- "full-width card below the row"
- "hero section taking 60% of viewport height"
- "split layout: photo left (45%), text right (55%)"
- "sticky navbar, 64px height, transparent"

**Be explicit about:**
- Card backgrounds with exact rgba values
- Border radius (16px, not "rounded")
- Padding and spacing in px
- Font sizes for each text level
- Icon set name (Material Icons Outlined, Lucide, etc.)

### 4. Content & Data

Real-looking data, not lorem ipsum. Actual names, numbers, dates that match the project context. This is what separates professional output from AI slop.

**Bad:** "Show some metrics in the cards"
**Good:** "Card 1: 'Active Patients' with value '1,349' and a green +12% badge. Card 2: 'Calls Today' with value '47' and a neutral 0% badge."

**Rules:**
- Use real client names, real city names, real-sounding numbers
- Dates should be current (2026) and in the correct timezone
- Phone numbers should be formatted correctly for the locale
- Currency should match the business context

### 5. Interactive States & Overall Feel

Hover, focus, active, disabled states for clickable elements. Then close with 1-2 sentences about emotional impact.

**Example:**
```
INTERACTIVE STATES:
- Cards: hover lift (translateY -4px) with enhanced shadow
- Buttons: hover to darker shade, active to pressed state
- Nav links: hover from gray to white, active has teal underline

OVERALL FEEL: When the user sees this, they should think: "This team knows
exactly what they're doing." Every pixel should communicate competence and care.
```

---

## Prompt Length Rules

| Range | Quality | Notes |
|-------|---------|-------|
| Under 500 chars | Poor | Too vague, produces generic templates |
| 500-800 chars | Acceptable | Works for simple screens, misses details |
| **800-2500 chars** | **Optimal** | **Sweet spot. Enough detail without overload** |
| 2500-5000 chars | Good but risky | May drop elements. Monitor output carefully |
| Over 5000 chars | Degraded | Stitch starts ignoring components. Break into multiple prompts |

**If your prompt exceeds 5000 characters:**
1. Move less critical details (hover states, animation notes, secondary elements) to iteration prompts
2. Focus the main prompt on layout structure and primary content
3. Use iteration prompts to add polish: "Add hover states to all cards: translateY(-4px) with enhanced shadow"

---

## Design Token Seeding

Always establish design tokens in the first prompt or as a prefix to every prompt. This produces variants that follow your system from the start instead of Stitch inventing its own.

**Token block format:**
```
Design tokens: 8pt grid, radius 16px, font [heading font] + [body font],
colors: bg [hex], surface [hex], border [hex], text [hex], accent [hex]
```

**Full example:**
```
Design tokens: 8pt grid system, border-radius 16px (cards) / 12px (inputs) / 9999px (pills),
typography: Clash Display for headings + DM Sans for body,
colors: bg #0D0D0D, surface rgba(255,255,255,0.05), border rgba(255,255,255,0.08),
text-primary #FFFFFF, text-secondary #9CA3AF, accent #2BBCB3, accent-hover #24A39C
```

**Why this matters:** Without explicit tokens, Stitch approximates. It might pick #3B82F6 when you wanted #2BBCB3. It might use Inter when you wanted Clash Display. Seeding tokens upfront anchors every generation to your system.

---

## Screen Generation Strategy

### Order Matters

Generate screens in this order for maximum consistency:

1. **Login/Landing page first** -- establishes palette, typography, glassmorphism style, overall aesthetic
2. **Main Dashboard/Home second** -- establishes the layout shell (sidebar, header, card system)
3. **Detail/Inner pages 3rd** -- each references "same sidebar and header as Dashboard"
4. **Content-heavy pages (settings, notes, comments) last** -- these inherit the established system

**Why this order:** Stitch uses each generated screen as implicit context for the next one within a project. The first screen sets the DNA. If your first screen is a settings page, the DNA will be boring.

### One Screen at a Time

- Generate each screen individually with a full prompt
- Do NOT try to generate multiple complex screens in one prompt
- For simpler apps (5 screens or fewer), a comprehensive single prompt can work
- For complex dashboards (8+ screens), always go one at a time

### Reference Previous Screens

After Screen 2, every subsequent prompt should start with a reference to maintain layout consistency:

```
Same left sidebar and top header as the Dashboard screen. Same design tokens,
same glassmorphism card style, same spacing system.
```

This tells Stitch to maintain the structural elements while generating new content.

---

## Iteration Workflow

### The Generate -> Review -> Iterate -> Export Loop

1. **Generate**: Paste full prompt, get initial output
2. **Review**: Check typography, colors, layout, content accuracy against your design tokens
3. **Iterate**: Make 1-2 specific changes per iteration prompt
4. **Lock**: When satisfied, export immediately (sessions can timeout and lose unsaved work)

### Iteration Prompt Rules

- **ONE or TWO changes per iteration prompt** -- this is critical
- Be surgical and specific, not vague
- Reference exact values (hex codes, pixel dimensions, font names)

| Quality | Example |
|---------|---------|
| **Bad** | "Fix the layout, change colors, and update the content" |
| **Bad** | "Make the page better" |
| **Bad** | "The cards look wrong" |
| **Good** | "Change the primary CTA button color to #3B82F6 and increase its padding to px-8 py-3" |
| **Good** | "Move the search bar to full width and increase height to 56px" |
| **Good** | "Replace the hero headline with: 'AI Systems That Actually Work For Your Business'" |

### When to Use Which Tool

| Need | Use | Do Not Use |
|------|-----|------------|
| Color/theme tweaks | UI Customization Panel (Edit > Theme) | Re-prompting from scratch |
| Alternative designs | 3x Mode (generates 3 variants) | Generating from scratch repeatedly |
| Layout restructure | New iteration prompt | UI Panel (it cannot restructure layout) |
| Typography change | Iteration prompt with exact font names | UI Panel |
| Minor spacing adjustments | UI Panel | Re-prompting |
| Replacing one element | Element Selection (click + feedback) | Full re-generation |
| Content/copy changes | Iteration prompt | UI Panel |

---

## Common Stitch Issues & Fixes

### Problem: Wrong Typography

Stitch defaults to Inter, Roboto, or system fonts regardless of what you specified.

**Fix:** "Change all typography to [Heading Font] for headings and [Body Font] for body text. Do not use Inter, Roboto, or Arial."

**Prevention:** Include font names explicitly in EVERY prompt, not just the first one. Add "Do not use Inter or Roboto" as a negative instruction.

### Problem: Colors Drift

Stitch approximates colors, especially subtle ones. Your #2BBCB3 might render as #34D399.

**Fix:** Re-paste your full design token block with exact hex codes. Use the UI Customization Panel (Edit > Theme) for quick color fixes without re-generating.

**Prevention:** Always use explicit hex codes (#3B82F6) not color names ("blue"). Include the full token block in every prompt.

### Problem: Too Symmetrical / Generic

Stitch tends toward perfectly balanced, safe layouts with equal-width cards and centered everything.

**Fix:** "Break the symmetry. Vary card heights. Add visual weight to the left side. Make the hero section take up 60% of the viewport. The first card should be 2x width of the others."

**Prevention:** Include "asymmetric layout" or "visual hierarchy with clear focal point" in prompts. Specify exact width ratios (55%/45%, not 50%/50%).

### Problem: Missing Glass Morphism

Stitch sometimes ignores backdrop-blur and transparency, rendering solid opaque cards instead.

**Fix:** "Apply backdrop-blur-xl and rgba(17,17,17,0.60) background to all cards with border 1px solid rgba(255,255,255,0.06)"

**Prevention:** Describe glass morphism with specific CSS property values, not just the term "glassmorphism." Stitch responds better to exact values than design terminology.

### Problem: Elements Dropped

Long prompts (4000+ chars) cause Stitch to skip components -- usually the last ones mentioned.

**Fix:** Break into two prompts. Generate the base layout first, then add missing elements in an iteration prompt: "Add a floating chat button in the bottom-right corner: 56px teal circle with white chat icon."

**Prevention:** Keep prompts under 5000 characters. Front-load the most important elements. Move secondary elements (floating buttons, tooltips, badges) to iteration prompts.

### Problem: Charts Look Wrong

Stitch struggles with complex data visualizations. Bar charts may render as tables, area charts may look flat.

**Fix:** Describe chart type explicitly: "area chart with gradient fill from teal to transparent, showing 7 data points for Mon-Sun, peak on Wednesday" not just "chart."

**Prevention:** Keep chart descriptions simple. Focus on shape and feel, not exact data points. Accept that Stitch chart output will be approximate -- real charts come from Recharts/D3/Chart.js in code. Stitch charts are layout placeholders, not final implementations.

### Problem: Icons Not Matching

Stitch may not have your exact icon set and will substitute with generic icons.

**Fix:** Name icons specifically from a known set: "Use Material Icons Outlined: 'dashboard', 'person', 'settings', 'notifications'."

**Prevention:** Include your icon set name in the design tokens block. Lucide and Material Icons Outlined have the best recognition in Stitch.

### Problem: Gradient Orbs Not Rendering

Stitch sometimes ignores background gradient orb/blob requests.

**Fix:** Be extremely specific: "Place a 500px diameter circular shape at position top-right, teal (#2BBCB3) at 20% opacity, with Gaussian blur 120px. This is a decorative background element behind all content."

**Prevention:** Describe orbs as "circular shapes" with exact size, position, color, opacity, and blur values. The word "orb" alone is too vague.

---

## Anti-"AI Slop" Rules

These rules prevent generic, template-looking output that screams "AI-generated":

1. **No Inter/Roboto/Arial** -- use distinctive fonts. Strong choices: Plus Jakarta Sans, Clash Display, Satoshi, General Sans, DM Sans, Cabinet Grotesk, Space Grotesk
2. **No generic purple gradients** -- pick a deliberate, brand-specific color palette with exact hex codes
3. **No perfectly symmetrical layouts** -- vary card sizes, create visual hierarchy, use asymmetric splits (55/45, 60/40)
4. **No predictable card designs** -- mix card styles within a page (one featured card larger, rest smaller), add accent elements (colored top border, icon badge)
5. **No bouncy/playful animations** -- match motion to brand tone. Premium brands use ease-out, subtle transforms, not spring physics
6. **Real content always** -- actual names, real numbers, current dates, proper formatting. Never "Lorem ipsum" or "John Doe" or "$XX.XX"
7. **Distinctive typography pairing** -- heading font should visually differ from body font. Clash Display + DM Sans works. Inter + Inter does not
8. **Intentional whitespace** -- generous padding (32-48px on cards, 24px gaps between elements, py-24 on sections). Cramped layouts look cheap
9. **Specific border treatments** -- "1px solid rgba(255,255,255,0.06)" not "a border." Specificity prevents Stitch from choosing ugly defaults
10. **Named aesthetic references** -- "Like Linear.app" gives Stitch a concrete target. "Modern and clean" gives it nothing

---

## Stitch SDK Integration (Recommended)

### SDK vs MCP

The official `@google/stitch-sdk` (npm) is now the **recommended** way to interact with Stitch programmatically. It replaces the community MCP server (`@_davideast/stitch-mcp`).

| Aspect | SDK (Recommended) | MCP (Legacy) |
|--------|-------------------|--------------|
| Package | `@google/stitch-sdk` (official Google) | `@_davideast/stitch-mcp` (community) |
| Runs as | In-process npm dependency | Separate MCP server process |
| Edit existing screens | **Yes** — `screen.edit()` | No |
| Generate variants | **Yes** — `screen.variants()` | No |
| Fragility | Standard npm install | Binary in npx cache (cache clear = broken) |
| Tool count | 8 tools | 9 tools (slightly different naming) |

**SDK location**: `Atelier/tools/stitch-sdk/` (installed, validated)

### SDK Quick Reference

```javascript
import { stitch } from "@google/stitch-sdk";
// Reads STITCH_API_KEY from environment automatically

// Projects
const projects = await stitch.projects();
const project = stitch.project("4851278974952505848");

// Screens
const screens = await project.screens();
const screen = await project.generate("A dark SaaS dashboard with sidebar and charts");

// Assets
const htmlUrl = await screen.getHtml();
const imageUrl = await screen.getImage();

// Edit (NEW — surgical changes without regenerating)
const edited = await screen.edit("Change the CTA button to #2BBCB3");

// Variants (NEW — A/B/C comparison)
const variants = await screen.variants("Try different color schemes", {
  variantCount: 3,                          // 1-5
  creativeRange: "EXPLORE",                 // REFINE | EXPLORE | REIMAGINE
  aspects: ["COLOR_SCHEME", "LAYOUT"],      // LAYOUT | COLOR_SCHEME | IMAGES | TEXT_FONT | TEXT_CONTENT
});

// Agent tool calling
const tools = await stitch.listTools();
await stitch.callTool("create_project", { title: "My App" });
```

### Iterative Editing Workflow (SDK)

The single biggest improvement over the MCP-only workflow. When a screen is 80-90% right:

1. **Review** the generated screen (screenshot + HTML)
2. **Edit** with surgical precision: `screen.edit("Change the card background to rgba(17,17,17,0.60)")`
3. **Review** the edit result
4. **Edit** again if needed (still 1-2 changes max per call)
5. **Export** when satisfied

**Rules for editing:**
- ONE or TWO changes per `edit()` call (same rule as iteration prompts)
- Reference exact values: hex codes, px dimensions, font names
- Edit preserves everything you didn't mention — much better consistency than regenerating
- Bad: `screen.edit("Fix the layout and change colors")`
- Good: `screen.edit("Change heading font to Clash Display and accent color to #2BBCB3")`

**When to edit vs regenerate:**
| Situation | Action |
|-----------|--------|
| Overall layout is wrong | Regenerate with updated prompt |
| Colors or typography off | Edit |
| Missing a component | Edit: "Add a notification bell icon in the top-right header" |
| Content/copy wrong | Edit: "Replace hero text with 'AI Systems That Actually Work'" |
| Major structural change | Regenerate |

### Variant Generation Workflow (SDK)

Replaces the manual "3x Mode" in the Stitch web UI:

```javascript
const variants = await screen.variants("Explore alternative visual directions", {
  variantCount: 3,
  creativeRange: "EXPLORE",
  aspects: ["COLOR_SCHEME", "LAYOUT"],
});
// Compare screenshots of variants[0], variants[1], variants[2]
```

**Creative range options:**
| Range | Effect | Use when |
|-------|--------|----------|
| `REFINE` | Subtle variations | You like the direction, want fine-tuning |
| `EXPLORE` | Moderate alternatives | Unsure about specific aspect, want options |
| `REIMAGINE` | Dramatic departures | Starting fresh, want very different directions |

**Aspect options:** `LAYOUT`, `COLOR_SCHEME`, `IMAGES`, `TEXT_FONT`, `TEXT_CONTENT`

**Best used for:**
- First screen of a new project (sets the DNA)
- Hero sections where visual impact matters
- When the user says "show me options" or "I'm not sure about the direction"

### SDK MCP Proxy

The SDK can also serve as a drop-in MCP server replacement:

```javascript
// Atelier/tools/stitch-sdk/proxy.js
import { StitchProxy } from "@google/stitch-sdk";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const proxy = new StitchProxy({ apiKey: process.env.STITCH_API_KEY });
await proxy.start(new StdioServerTransport());
```

To use as MCP server in `settings.local.json`:
```json
"stitch": {
  "command": "node",
  "args": ["tools/stitch-sdk/proxy.js"],
  "env": { "STITCH_API_KEY": "<key>" }
}
```

### Available Tools (SDK + MCP)

| Tool | SDK Method | MCP Tool Name | Purpose |
|------|-----------|---------------|---------|
| List projects | `stitch.projects()` | `list_projects` | See all Stitch projects |
| Get project | `stitch.project(id)` | `get_project` | Get project metadata |
| Create project | `stitch.callTool("create_project", ...)` | `create_project` | Create new project |
| List screens | `project.screens()` | `list_screens` | List screens in project |
| Get screen | `project.getScreen(id)` | `get_screen` | Get screen metadata |
| Generate screen | `project.generate(prompt)` | `generate_screen_from_text` | Generate from text |
| Edit screen | `screen.edit(prompt)` | `edit_screens` | **SDK/new MCP only** |
| Generate variants | `screen.variants(...)` | `generate_variants` | **SDK/new MCP only** |
| Get HTML | `screen.getHtml()` | `fetch_screen_code` | Get HTML/CSS code |
| Get image | `screen.getImage()` | `fetch_screen_image` | Get screenshot PNG |

### MCP Legacy Setup (Still Works)

The community MCP server still works and is configured in `~/.claude/settings.local.json`. The API key is stored in `~/.claude/secrets/your-api-key.txt`.

**Prerequisite:** Sharing must be enabled on any Stitch project you want to access via MCP. Open the project in Stitch > Share > Enable sharing and remixing.

### Optimal Pipeline (with Claude Code Skills)

The full design-to-code pipeline:

```
Step 1: enhance-prompt       -> Refines raw prompt with UI/UX terminology and design system context
Step 2: generate (SDK/MCP)   -> Generates the screen in Stitch
Step 2.5: edit (SDK only)    -> Iterate with surgical edits (1-2 changes per call)
Step 2.5: variants (SDK)     -> Generate A/B/C alternatives for comparison
Step 3: design-md            -> Analyzes project and generates DESIGN.md
Step 4: stitch-loop          -> Orchestrates autonomous multi-screen creation
Step 5: react-components     -> Converts Stitch HTML into React + Tailwind components
Step 6: remotion (optional)  -> Generates walkthrough video from Stitch screens
```

**Quality gate**: After converting Stitch HTML to React (Step 5), run `npm run validate <file>` from the react-components skill directory for AST-based validation (checks Props interfaces, detects hardcoded hex codes). See `resources/architecture-checklist.md` for the full pre-flight checklist.

### Skills Installation

Custom skills are maintained in `Atelier/skills/` and synced to `~/.claude/skills/`. They are auto-discovered by Claude Code.

### SDK Validation

Run the validation script to confirm everything works:
```bash
cd tools/stitch-sdk && STITCH_API_KEY="$(cat ~/.claude/secrets/your-api-key.txt)" node validate.js
```

---

## Export & Handoff

### From Stitch to React

1. Use `fetch_screen_code` (via MCP) or download .zip (via web UI) to get HTML/CSS
2. Convert to React components with Tailwind classes
3. Replace hardcoded hex values with CSS custom properties / design tokens
4. Add Framer Motion animations (Stitch output is entirely static)
5. Wire up real data, props, and state management
6. Add responsive breakpoints (Stitch generates single-viewport designs)

### What Stitch Gives You vs What You Build

| Stitch Provides | You Build |
|----------------|-----------|
| Layout structure and spatial relationships | Responsive breakpoints (mobile, tablet, desktop) |
| Color palette with exact hex values | CSS custom properties and theme system |
| Component hierarchy and nesting | React component architecture with props |
| Static visual design | Animations and transitions (Framer Motion) |
| Placeholder/example content | Real data binding, API integration |
| Single desktop viewport (1440px) | Full responsive behavior across all viewports |
| HTML/CSS output | Tailwind utility classes, component library |
| Visual states (shown statically) | Interactive state management (hover, focus, loading, error) |
| Image placeholders | Real images, optimized assets, lazy loading |

### Stitch -> Code Tool -> Deploy Pipeline

```
1. Design in Stitch (iterate with 3x mode + element editing)
2. Connect Stitch MCP to Claude Code (or other code tool)
3. Extract design context + screen code via MCP
4. Build React + Tailwind components matching the Stitch designs
5. Push to GitHub repository
6. Connect GitHub repo to Vercel (or other host)
7. Future changes via code tool -> auto-deploy via Vercel
```

---

## Prompt Templates

### Dark SaaS Dashboard Template

```
Design [screen name] for "[App Name]" -- a [brief description]. Dark mode, premium SaaS quality.

CONTEXT: [2-3 sentences about what this screen does and who uses it]

DESIGN DIRECTION: [aesthetic references and emotional quality, e.g., "Think Linear meets Vercel"]

DESIGN TOKENS: 8pt grid, radius 16px, font [heading font] + [body font],
colors: bg #0D0D0D, surface rgba(255,255,255,0.05), border rgba(255,255,255,0.08),
text #FFFFFF, text-secondary #9CA3AF, accent [hex], accent-hover [hex].
Do not use Inter or Roboto.

LAYOUT STRUCTURE:
[Sidebar / header reference if applicable -- "Same left sidebar and top header as Dashboard"]
[Row-by-row layout description with specific components, hex colors, dimensions, real content]
[Card specifications with exact rgba backgrounds, border values, padding]

CONTENT:
[Real data: names, numbers, dates, labels -- never lorem ipsum]

INTERACTIVE STATES:
- Cards: [hover behavior]
- Buttons: [hover/active behavior]
- Nav: [hover/active behavior]
- Inputs: [focus behavior]

OVERALL FEEL: [1-2 sentences about what the user should think/feel when seeing this screen]
```

### Light SaaS / Portal Template

```
Design [screen name] for "[App Name]" -- a [brief description]. Light mode, clean and professional.

CONTEXT: [2-3 sentences about the screen, user, and purpose]
AUDIENCE: [who uses this, their context, tech comfort level]
DESIGN DIRECTION: [aesthetic references, e.g., "Notion meets Zendesk, warm and approachable"]

DESIGN TOKENS: 8pt grid, radius 16px, font [heading font] + [body font],
colors: bg #FAFAF8, surface #FFFFFF, border rgba(0,0,0,0.06),
text #1A1A1A, text-secondary #6B7280, accent [hex], accent-hover [hex].
Do not use Inter or Roboto.

LAYOUT:
[Detailed layout with hex colors, dimensions, real content, card specifications]

INTERACTIVE STATES:
[Hover, focus, active states for all clickable elements]

OVERALL FEEL: [emotional closing -- what should the user think when they see this?]
```

### Mobile App Screen Template

```
Design a mobile [screen type] for "[App Name]" -- [brief description].

[Theme] theme with [style details]. Use a [grid/layout type] for [primary content].

DESIGN TOKENS: [condensed token block for mobile -- smaller type scale, tighter spacing]

App name "[Name]" in the [position]. [Navigation description -- bottom tab bar, hamburger, etc.]

LAYOUT:
[Top-to-bottom layout description, accounting for mobile viewport constraints]
[Touch targets minimum 44px]
[Bottom safe area for gesture bar]

CONTENT:
[Data/content specifications with real values]

OVERALL FEEL: [emotional summary for mobile context]
```

### Landing Page Section Template

```
Design [section name] for the "[Brand Name]" landing page -- [brief description of the brand].

This section appears [position on page -- after hero, before testimonials, etc.].
[If not the first section]: Same design tokens as previous screens.

BACKGROUND: [color/treatment -- dark with gradient orbs, light with subtle texture, etc.]

SECTION HEADER (centered):
- Tag/label: "[LABEL]" in uppercase, tracking-widest, 12px, accent text with accent/10 bg pill
- Headline: "[Headline Text]" in [color], [size], font-bold
- Subtitle: "[Subtitle text]" in [secondary color], [size], max-width ~[px]

LAYOUT:
[Detailed component descriptions]

INTERACTIVE STATES:
[All hover/focus behaviors]

OVERALL FEEL: [What does this section accomplish in the page narrative?]
```

---

## Lessons from a 10-Screen Dashboard Build

### Sidebar Inconsistency Problem
When generating 10 screens in sequence, Stitch generates DIFFERENT sidebar navigation items for every single screen, even when explicitly told "same sidebar as Dashboard." This is the #1 consistency issue with multi-screen projects.

**Solution:** Accept that Stitch will generate inconsistent sidebars. Use ONE canonical sidebar from the best screen (typically Screen 2, the main dashboard) and apply it uniformly in code. Don't waste iteration prompts trying to fix sidebars -- fix it in the React build.

### Noise/Grain Overlay Opacity
Stitch generates noise overlays with `opacity-40 mix-blend-overlay` which is WAY too aggressive. In production code, use `opacity: 0.015` to `0.03` for a subtle film grain effect. The Stitch value will wash out your design.

### Screenshot Fuzziness is Not a Code Issue
Some Stitch-generated screenshots appear "fuzzy" (screens 4, 6, 7 in our build). This is a screenshot rendering artifact in Stitch, NOT a code quality issue. The HTML/CSS in the export is clean. Fuzzy screenshots tend to have larger file sizes (1.2-1.3MB vs 240KB) due to complex gradient rendering in the PNG. Don't waste time debugging fuzziness -- the code is fine.

### Charts Are Placeholder-Quality Only
Stitch-generated charts (area charts, bar charts, line charts) look approximate at best and broken at worst. Always plan to replace them with Recharts/D3/Chart.js in code. Use Stitch chart output only for layout planning (where the chart goes, how big it is).

### Glass Morphism Token Values That Actually Work
After testing across the dashboard build, these are the exact values that produce premium glass morphism:
```
Card background: bg-[#111111]/60 OR rgba(17, 17, 17, 0.60)
Backdrop blur: backdrop-blur-xl (24px) -- NOT just backdrop-blur (8px)
Border: border border-white/[0.06] OR 1px solid rgba(255,255,255,0.06)
Glow: box-shadow: 0 0 40px -10px rgba(59, 131, 247, 0.15)
```

### KPI Card Pattern That Works
The Stitch-generated KPI card layout that looked best across all pages:
- Icon in a colored circle (bg-{color}-500/10 with text-{color}-500)
- Trend badge as a pill (bg-green-500/10 text-green-500 rounded-full px-2 py-0.5)
- Label text above the large value number
- Use a static colorMap object to avoid Tailwind dynamic class purging issues

### Traffic Source Bars: CSS > Recharts
For horizontal progress bars showing traffic sources, proportions, or completion, CSS animated bars (`motion.div` with width animation) look significantly better than Recharts BarChart. Recharts adds unnecessary chart chrome (axes, grid lines) that clutters simple proportion displays.

### What to Fix in Code vs What to Fix in Stitch
| Fix in Stitch (iteration prompts) | Fix in Code |
|---|---|
| Overall layout structure | Sidebar consistency across pages |
| Color palette and typography | Noise overlay opacity |
| Card visual treatment | Charts (replace with Recharts) |
| Content and data values | Responsive breakpoints |
| Visual hierarchy | Animations (Framer Motion) |
| Hero/focal element design | State management |
| Icon choices | Interactive hover/click states |

### Prompt Length Confirmation
The optimal range of 800-2500 chars per prompt was confirmed. Our dashboard prompts averaged ~1200-2000 chars each and produced high-quality output. The enhanced prompts with CONTEXT, DESIGN DIRECTION, INTERACTIVE STATES, and OVERALL FEEL sections consistently outperformed the shorter originals.

### Layout Shell Bug: min-h-screen vs h-screen (CRITICAL)

When converting Stitch designs to React with a sidebar + header + scrollable content layout, the PortalLayout container sizing is critical and easy to get wrong.

**The bug:** Using `min-h-screen` on both the outer wrapper AND the inner content wrapper causes the layout to appear "compressed" -- elements overflow off-screen, content doesn't scroll properly, and the entire page formatting breaks. Stitch outputs static HTML that doesn't need scroll containers, so this issue only surfaces when you build the real React shell.

**Root cause:** `min-h-screen` sets minimum height to 100vh but allows the container to grow infinitely. When nested (outer AND inner both have it), the inner div doesn't constrain itself to the viewport, so `flex-1` on the main content area doesn't calculate remaining space correctly. The content overflows instead of scrolling.

**The fix (matches a working portal pattern):**
```tsx
// BROKEN - content overflows, layout compressed
<div className="min-h-screen bg-bg">
  <Sidebar />
  <div className="lg:ml-[240px] flex flex-col min-h-screen">
    <Header />
    <main className="flex-1 p-6">
      <Outlet />
    </main>
  </div>
</div>

// FIXED - proper scroll container, content stays in viewport
<div className="h-screen bg-bg overflow-hidden">
  <Sidebar />
  <div className="lg:ml-[240px] flex flex-col h-screen">
    <Header />
    <main className="flex-1 overflow-y-auto p-6">
      <Outlet />
    </main>
  </div>
</div>
```

**Key changes:**
| Element | Broken | Fixed |
|---------|--------|-------|
| Outer wrapper | `min-h-screen` | `h-screen overflow-hidden` |
| Inner wrapper | `min-h-screen` | `h-screen` |
| Main content | `flex-1 p-6` | `flex-1 overflow-y-auto p-6` |

**Why it works:** `h-screen` locks both containers to exactly 100vh. The header takes its fixed height (64px). `flex-1` on main then correctly fills the remaining space (`100vh - 64px`). `overflow-y-auto` creates the scroll container for page content. `overflow-hidden` on the outer wrapper prevents any body-level scrollbar.

**Rule:** Always use `h-screen` (not `min-h-screen`) on dashboard layout shells with fixed sidebars. Always add `overflow-y-auto` on the scrollable content area. This applies to ANY Stitch-to-React conversion with sidebar layouts.

---

## Quality Checklist (Run After Every Generation)

Use this checklist to evaluate every generated screen before moving on:

- [ ] **Typography correct?** Not defaulting to Inter/Roboto/Arial. Heading and body fonts match spec.
- [ ] **Colors match design system?** Check bg, surface, border, text-primary, text-secondary, accent against token block.
- [ ] **Cards have the right treatment?** Glass morphism / shadows / borders rendering as specified.
- [ ] **Spacing follows grid system?** Padding and gaps in 8px increments. Sections have generous vertical padding (py-20+).
- [ ] **Content is realistic?** Real names, numbers, dates. No lorem ipsum, no "John Doe", no "$XX.XX".
- [ ] **Visual hierarchy is clear?** One hero/focal element stands out. Eye knows where to go first.
- [ ] **Layout is not perfectly symmetrical?** Cards vary in size or emphasis. Not everything is centered and equal.
- [ ] **Interactive elements look clickable?** Buttons have contrast, links have color differentiation, cards have hover indicators.
- [ ] **Icons are from the specified set?** Not random or mismatched icons.
- [ ] **Overall feel matches the brief?** The emotional response matches what was described in "Overall Feel."
- [ ] **No AI slop indicators?** No generic purple gradients, no perfectly balanced grids, no bouncy animation hints, no stock imagery.
- [ ] **Gradient orbs / background effects rendered?** If specified, confirm they actually appear and are not dropped.

---

## Example Project History with Stitch

### Completed Projects

| Project | Type | Theme | Key Fonts | Accent |
|---------|------|-------|-----------|--------|
| B2B Quote Wizard | B2B quote wizard (5 screens) | Dark | Clash Display + DM Sans | Gold #D4A853 |
| B2C Estimate Wizard | B2C estimate wizard (5 screens) | Light | Inter + DM Sans | Green #2E7D32 |
| Agency Landing Page | Agency landing page (6 sections) | Dark + Light alternating | Inter | Teal #2BBCB3 |
| RevOps Client Portal | B2B RevOps dashboard (10 screens) | Dark | Plus Jakarta Sans + DM Sans | Blue #3B82F6 |

### Stitch Project References

| Project | Stitch ID | Prompt File |
|---------|-----------|-------------|
| B2B Quote Wizard | YOUR_PROJECT_ID | `your-project/STITCH-PROMPT.md` |
| Agency Landing Page | -- | `your-project/STITCH-PROMPTS.md` |
| RevOps Client Portal | -- | `your-project/STITCH-PROMPTS.md` |

---

## Tool Selection for Stitch Workflows

**Best approach:** Design in Stitch (web UI or via MCP). Extract via MCP in whichever code tool you are building in. Build in Claude Code for complex projects, or use other AI coding tools for rapid visual iteration.

---

*Last updated: March 2026*
*Source: Analysis of successful Stitch builds (multiple quote wizards, landing pages, portal concepts, and dashboard projects) + Google official docs + official Stitch SDK (`@google/stitch-sdk` v0.0.3) + Jack Roberts tutorial (Feb 2026) + community research*
