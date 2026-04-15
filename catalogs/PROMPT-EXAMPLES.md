# Stitch Prompt Examples

> Real prompts from actual builds that produced excellent results.
> Use these as templates — adapt the structure, replace the specifics.

---

## Example 1: Light Mode Support Portal

**Project**: Practice Management — client support portal for medical billing software
**Style**: Light, airy, clean. Calming blues and teals. "Notion meets Zendesk."
**Result**: Premium support portal with AI chat widget, knowledge base, and trainer dashboard

### Prompt 1A: Dashboard / Home Page

```
Design a modern client support portal for a practice management software company serving 425+ healthcare practices. This is a full redesign of an outdated current site. Do NOT replicate the old design — start fresh.

CONTEXT: This is the main portal clients use to get help with practice management billing software. Users are medical office staff — receptionists, billing clerks, office managers — who handle charge entry, claims, scheduling, and payer interactions. They come here when they're stuck. The portal needs to feel like instant relief: "I can find my answer here."

The biggest new feature is an AI support assistant that can answer questions instantly. This should be the HERO of the entire design — the first thing users see and interact with.

AUDIENCE: Non-technical healthcare workers, ages 30-60, desktop during work hours. Need clarity and speed. Many are not tech-savvy.

DESIGN DIRECTION:
Light, airy, clean — generous white space
Calming palette: soft blues and teals as primary, warm neutral (sand/light stone) as secondary. Nothing harsh or saturated.
Rounded corners, soft shadows, no hard edges
Clean sans-serif typography (Inter or similar). Strong hierarchy.
No gradients, no glass-morphism. Calm and professional.
Feel: Notion meets Zendesk meets a trusted healthcare portal
Subtle island/Hawaii warmth — not tropical, just warm and welcoming

LAYOUT (Desktop, 1440px):

LEFT SIDEBAR (220px, fixed):
Top: "Your PM" text logo with small icon
Nav links with icons (vertical stack): Home (active state highlighted), Knowledge Base, Support, Payer Resources, Release Notes, Account Settings
Bottom of sidebar: small green dot + "All Systems Operational"
Very light off-white background, subtle right border

TOP HEADER BAR (spans main content area):
Left side: breadcrumb or page title
Right side: small quick-search icon, notification bell with count badge, user avatar + "Example Practice" text

MAIN CONTENT — HERO AI SEARCH (this is the star):
Large, centered section at the very top of the main area
Heading: "How can we help you today?" in a warm, confident tone
Below: a large, prominent search/input bar — full width, generous height (50-56px), rounded, soft shadow. Placeholder: "Ask a question or describe what you need help with..."
Small "Powered by AI" badge or sparkle icon near the input
Below the search bar: 4-5 clickable suggestion chips: "How do I enter a charge?" / "HMSA claim status" / "GET tax reporting" / "Connect my EMR" / "Latest updates"

BELOW THE HERO — QUICK ACCESS SECTION:
Section heading: "Quick Access"
3 cards in a row:
Card 1: "Knowledge Base" — book icon, "Browse articles and how-to guides"
Card 2: "Submit a Request" — headset icon, "Contact our training team directly"
Card 3: "Payer Resources" — shield icon, "Insurance portals, EDI settings, directories"
Cards: white background, light border, subtle hover lift.

BELOW — RECENT UPDATES:
Section heading: "Latest Updates"
5 list items with colored category pills (Payer, Software, Tax, Security, Regulatory), title text, date

OVERALL FEEL: The AI search hero should take up meaningful visual space — it's the primary action on the page. Everything below supports it but doesn't compete. The page should feel like: "Type your question here and we'll handle it." Calm confidence. Clean. No clutter.

Generate as a web design, desktop viewport, light mode.
```

**Why this worked:**
- Clear CONTEXT and AUDIENCE sections
- Emotional framing: "needs to feel like instant relief"
- Specific layout with dimensions
- Real content (not lorem ipsum)
- OVERALL FEEL closing ties it together
- Clear about what NOT to do (no gradients, no glass morphism)

---

### Prompt 1B: Internal Trainer Dashboard

```
Add a new screen to this project: the Trainer Dashboard. This is the INTERNAL view that the support team (trainers) would see — NOT the client portal. It shows AI performance metrics, live conversations, escalation queue, and knowledge gaps.

IMPORTANT: This should look visually distinct from the client portal — still the same design system (Inter font, similar spacing) but with a darker header/sidebar to signal "this is the admin/internal view."

DESIGN APPROACH:
Same font (Inter), same rounded corners, same shadow patterns
But sidebar/header area uses a darker treatment: dark navy/slate sidebar (bg-slate-900 or bg-gray-900) with white/light text
Main content area stays light (bg-gray-50) for readability
Data cards use white backgrounds with colored accents for metrics

LAYOUT:

LEFT SIDEBAR (220px, dark navy/slate bg):
Top: "Support Team" with a shield icon, white text
Nav links: Dashboard (active), Conversations, Escalation Queue, Knowledge Base (manage), Analytics, Settings
Bottom: logged-in user "Sarah K. — Lead Trainer" with small avatar

TOP HEADER:
Left: "Dashboard" page title
Center: Date range selector pills — "Today" (selected), "This Week", "This Month"
Right: "Last updated: 2 min ago" with refresh icon

ROW 1 — KEY METRICS (4 stat cards):
Card 1: CONVERSATIONS TODAY — "47", "+12% vs daily average", green up arrow
Card 2: AI RESOLUTION RATE — "73%", "Up from 68% last week", green
Card 3: ESCALATED TO TRAINER — "13", "Down 22% vs last week", green down (good)
Card 4: AVG RESOLUTION TIME — "2.1 min" (AI) and "8.5 min" (Trainer), "4x faster with AI"

ROW 2 — TWO COLUMNS (60/40):
LEFT: Live Conversation Feed — 10 rows with time, practice name, question preview, status badge (Resolved green, Escalated yellow, Active blue)
RIGHT: Escalation Queue — 4 pending tickets with wait time (color-coded urgency), "Claim" buttons

ROW 3:
TRENDING TOPICS: Horizontal bar chart (Charge Entry 34, HMSA Claims 28, Software Updates 19...)
KNOWLEDGE GAPS: Table of questions AI couldn't answer with "Create Article" buttons

BOTTOM SUMMARY:
"This Week: AI handled 247 conversations"
"Estimated 34 hours saved for your training team"
"That's approximately $1,360 in trainer time redirected to complex cases"

OVERALL FEEL: This is the "wow" slide. When the client sees this, they should think: "My trainers would love this." The knowledge gaps section shows the AI tells you what documentation to create next — it gets smarter. This dashboard makes the AI feel like a team member, not a replacement.

Generate as a web design, desktop viewport, light mode.
```

**Why this worked:**
- "IMPORTANT" callout for key design distinction
- The BOTTOM SUMMARY sells ROI in concrete numbers ($1,360 saved)
- OVERALL FEEL describes the business impact, not just aesthetics
- Clear visual distinction strategy (dark sidebar = admin view)
- Real data that tells a story (73% resolution rate)

---

## Example 2: Dark Mode Client Dashboard

**Project**: RevOps client performance portal for marketing agency clients
**Style**: Premium dark SaaS. Linear.app / Vercel / Stripe tier. Glass morphism.
**Result**: 10-screen dark dashboard with analytics, pipeline, AI visibility

### Prompt 2A: Login Page

```
Design a full-screen login page for "AppName" — a premium RevOps client performance portal. Dark mode only.

CONTEXT: This is the entry point to an exclusive client portal where marketing agencies show clients their growth metrics. The client (a B2B consultancy) logs in to see their marketing ROI. This screen needs to feel like walking into a premium private office — exclusive, confident, polished.

DESIGN DIRECTION: Dark, atmospheric, premium. Think the login screen of a luxury fintech app. Reference aesthetic: Linear.app, Vercel. Glass morphism on cards, subtle depth, cinematic gradient background.

Background: Full bleed #0A0A0A with two large, soft gradient orbs — one blue (#3B82F6 at 15% opacity, 400px diameter) drifting upper-right, one teal (#10B981 at 10% opacity, 350px) lower-left. Subtle film grain texture at 3% opacity.

Centered login card, 420px wide, glass morphism: bg rgba(17,17,17,0.60), backdrop-blur-2xl, border 1px solid #1F1F1F, rounded-2xl, padding 48px. Box-shadow: 0 0 80px rgba(59,130,246,0.05).

Card contents:
1. "AppName" wordmark — Plus Jakarta Sans extrabold 32px #FAFAFA, letter-spacing -0.02em. Below: "Client Performance Portal" DM Sans 14px #71717A.
2. Email input — 48px height, bg #0A0A0A, border #1F1F1F, rounded-xl, mail icon left, placeholder "Email address"
3. Password input — same style, lock icon, placeholder "Password"
4. "Forgot password?" — right-aligned, DM Sans 13px #3B82F6
5. Sign In button — full width, 48px, bg #3B82F6, rounded-xl, "Sign In" DM Sans medium 14px
6. Divider line #1F1F1F
7. Demo credentials hint: "Demo: demo@example.com / demo2026" DM Sans 12px #71717A

Footer: "Powered by AppName · V3 Framework" DM Sans 12px #71717A, pinned to bottom.

INTERACTIVE STATES: Input focus — border transitions to #3B82F6 at 50% opacity. Button hover — bg shifts to #2563EB. Forgot password hover — underline appears.

OVERALL FEEL: Walking into a premium private office. The gradient orbs add warmth to the dark void. The glass card says "this is exclusive." The user should feel like they're accessing something valuable — not just another login form.

Typography: Plus Jakarta Sans for wordmark, DM Sans for everything else. Do NOT use Inter or Roboto.
```

### Prompt 2B: Main Dashboard

```
Design the main dashboard for "AppName" — a RevOps client performance portal. Dark mode, premium SaaS quality.

CONTEXT: This is the command center. When a B2B consultancy client logs in, this is the first thing they see. It needs to answer "How is my marketing performing?" in 3 seconds. The V3 Score Cards (Visibility, Velocity, Verifiability) are the hero — they're the agency's proprietary framework. Every number should feel like evidence of ROI.

DESIGN DIRECTION: Data-rich but never cluttered. Reference: Linear.app for layout, Vercel dashboard for data cards, Stripe for typographic hierarchy. Premium dark mode with glass morphism accents on hero elements.

LAYOUT:
Left sidebar: 240px, bg #0A0A0A, border-right #1F1F1F. "AppName" wordmark top (Plus Jakarta Sans bold 20px). 9 nav items with Material Icons Outlined. Active item: bg #1A1A1A, 3px left border #3B82F6. Bottom: user avatar + name.

Top header: 64px, border-bottom #1F1F1F. Left: tenant name "Example Corp" (Plus Jakarta Sans semibold 16px), subtitle "B2B Consultancy" (DM Sans 12px #71717A). Right: notification bell + avatar.

ROW 1 — V3 Score Cards (HERO): 3 cards, glass morphism (rgba(17,17,17,0.60), backdrop-blur-xl). Each: label, 80px SVG progress ring (6px stroke), score number centered.
- Visibility: 72, ring #3B82F6
- Velocity: 65, ring #10B981
- Verifiability: 88, ring #F59E0B

ROW 2 — KPI Grid: 4x2 cards, bg #111111. Each: icon, label, large value, trend arrow.
Active Users 340 (+12.5%), Sessions 1,280 (+8.3%), Bounce 42.3% (-3.1%), Duration 2:45 (+5.2%), Email Open 28.4% (+2.1%), ROAS 4.2x (+15.8%), Social 3,420 (+6.7%), Pipeline $1.2M (+22.4%)

ROW 3 — Area Chart: "Website Traffic" last 30 days. Line #3B82F6, gradient fill fading to transparent. Upward trend with natural variance.

INTERACTIVE STATES: Nav items hover bg #1A1A1A. KPI cards hover border shifts to #3B82F6 at 30%. Chart tooltip on hover with dark bg.

OVERALL FEEL: Command center for growth. Every metric at a glance, every number tells a story. The V3 Score Cards answer "how are we doing?" in 3 seconds. The client should look at this and think: "My money is well spent." Data-rich, confident, never overwhelming.

Typography: Plus Jakarta Sans for headings/numbers, DM Sans for body. No Inter or Roboto.
```

---

## Prompt Structure Comparison

### What Makes Dark Mode Prompts Different from Light Mode

| Element | Light Mode (Support Portal) | Dark Mode (Dashboard) |
|---------|--------------------|--------------------|
| Background | "light, airy, white space" | Explicit hex codes (#0A0A0A) |
| Cards | "white bg, light border, subtle hover lift" | Glass morphism with rgba values |
| Typography | "Clean sans-serif" (less specific) | Explicit font names + weights |
| Color | "soft blues and teals" (descriptive) | Hex codes for every element |
| Texture | None needed | Grain overlay specification |
| Mood words | "calm, professional, warm" | "premium, atmospheric, exclusive" |

**Key insight**: Dark mode requires MORE specificity in prompts because there are many ways to do "dark" badly. Light mode is more forgiving — "clean and white" gets you 80% there.

---

## Prompt Anti-Patterns (What NOT to Do)

### Too Vague
```
Design a dark dashboard for a marketing agency
```
Result: Generic, template-looking, probably uses Inter font and purple gradients.

### Too Long (5000+ chars)
```
[3 pages of pixel-perfect specifications for every element including exact
padding on every nested div, precise font sizes for every piece of text,
exact hex values for 20 different states...]
```
Result: Stitch drops elements, ignores later specifications, produces incomplete output.

### No Emotional Context
```
Left sidebar 240px with 9 nav items. Main area has 3 score cards,
8 KPI cards, and 1 chart. Use dark colors.
```
Result: Technically correct but emotionally flat. No design personality.

### Mixing Too Many Changes in Iteration
```
Change the sidebar to be darker, update all the card borders,
switch the font to Satoshi, add a notification badge, and make
the chart area larger.
```
Result: Stitch applies some changes, ignores others, may break existing layout.

### The Fix
```
Make the sidebar background #0A0A0A (darker) and update nav item
hover to #1A1A1A.
```
Then in next iteration:
```
Change all typography to Satoshi for headings and DM Sans for body.
```

---

## Template: Starting a New Project

When starting any new Stitch project, use this checklist:

1. **Define design tokens first**
   ```
   Design tokens: bg [hex], surface [hex], border [hex], text [hex],
   accent [hex], font [heading] + [body], radius [px], grid [px]
   ```

2. **Pick 2-3 reference sites** (see REFERENCE-SITES.md)

3. **Write Screen 1 with full context** (CONTEXT + AUDIENCE + DESIGN DIRECTION + LAYOUT + FEEL)

4. **Write Screen 2** establishing the layout shell (sidebar + header)

5. **Write remaining screens** referencing "same sidebar/header as Screen 2"

6. **Iterate** with surgical, focused prompts (1-2 changes each)

7. **Export** code and screenshots after each satisfactory screen

---

*Last updated: February 2026*
*Source: Support Portal build + RevOps Dashboard build*
