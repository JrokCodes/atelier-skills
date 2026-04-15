# Agent Team Design Workflow

> Deploy multiple Claude Code agents in parallel to generate unique design variations, then cherry-pick the best elements for a final synthesized build.

## Concept

Each agent gets the SAME project brief but a DIFFERENT creative constraint (tone, color direction, hero archetype, reference site). This produces 3-5 genuinely different designs, giving you a palette of elements to pick from instead of iterating on a single direction.

---

## Prerequisites

- Frontend master skill loaded from `Atelier/skills/frontend-master/SKILL.md`
- Screenshot tool at `Atelier/tools/screenshot/screenshot.js`
- A clear project brief with: purpose, audience, content, technical constraints

---

## Step 1: Write the Shared Project Brief

Create a base directive — IDENTICAL for all agents:

```markdown
## Project: [Client Name] Landing Page

### Purpose
[What the site needs to accomplish]

### Audience
[Who will visit]

### Content
- Hero: [headline, subheadline, CTA text]
- Sections: [list of sections with content]
- Footer: [contact info, links]

### Technical
- React 19 + TypeScript + Vite + Tailwind v4 + Framer Motion
- Single-page or multi-page
- Mobile-first responsive

### Brand Assets
- Logo: [path or "not available yet"]
- Colors: [if known, otherwise "agent's choice"]
```

---

## Step 2: Create Creative Variants

Each agent gets the shared brief PLUS a unique creative seed:

| Agent | Tone | Color Direction | Hero Archetype | Reference Site |
|-------|------|----------------|----------------|----------------|
| A | Luxury/Editorial | Dark + gold accent | Manifesto Hero | ciridae.com |
| B | Minimalist/Clean | Light + single accent | Centered Hero | linear.app |
| C | Bold/Maximalist | Warm + earth tones | Split Hero | apple.com |
| D | Retro-Futuristic | Dark + neon accent | Full-Bleed Media | raycast.com |
| E | Organic/Warm | Light + sage/teal | Asymmetric Overlap | calm.com |

Mix and match — the point is MAXIMUM creative variation.

---

## Step 3: Launch Agents

### Option A: Separate Terminal Sessions
Open 2-3 Claude Code terminals (don't run all 5 simultaneously — RAM constraint).

Each agent creates a project in a separate directory:
```
~/designs/[project]-agent-a/
~/designs/[project]-agent-b/
...
```

### Option B: Claude Code Worktrees
Use `git worktree` to create isolated branches for each agent.

### Prompt Template for Each Agent
```
Read ~/.claude/skills/frontend-master/SKILL.md.

Build the homepage for [Client Name] using this directive:
[paste shared brief]

Your creative seed:
- Tone: [Agent X tone]
- Color direction: [Agent X colors]
- Hero archetype: [Agent X hero]
- Reference site vibe: [Agent X reference]

Use a DIFFERENT localhost port: [5173/5174/5175/5176/5177]
Make bold, distinctive choices. This should NOT look like any other agent's output.
```

---

## Step 4: Screenshot All Outputs

After agents finish, capture each:
```bash
node screenshot.js http://localhost:5173 ./agent-a.png --full-page
node screenshot.js http://localhost:5174 ./agent-b.png --full-page
# etc.
```

---

## Step 5: Cherry-Pick Best Elements

Review all screenshots and make a selection list:

```markdown
## Final Design Synthesis

- **Hero layout**: from Agent B (clean centered with product screenshot)
- **Color palette**: from Agent A (dark + gold is stunning)
- **Typography**: from Agent C (Clash Display + DM Sans pairing)
- **Card design**: from Agent D (glass morphism with neon border on hover)
- **Animation style**: from Agent B (subtle scroll reveals, not overdone)
- **Navigation**: from Agent A (sticky blur nav with logo left)
- **CTA buttons**: from Agent D (gradient glow effect)
- **Footer**: from Agent C (clean, organized columns)
```

---

## Step 6: Synthesize Final Build

Give a new Claude Code session access to all agent directories:

```
Read the frontend-master skill. Now synthesize a final landing page by combining
the best elements from 5 agent outputs.

Here's what I want from each:
[paste your selection list from Step 5]

The agent projects are at:
- Agent A: ~/designs/[project]-agent-a/
- Agent B: ~/designs/[project]-agent-b/
[etc.]

Pull the actual code from each agent's output for the specified elements.
Unify them into a single cohesive design with consistent spacing, colors, and typography.
```

---

## Practical Tips

- **RAM**: Each Vite dev server + Puppeteer ≈ 500MB. Run 2-3 at a time, screenshot, then next batch.
- **Ports**: Use 5173, 5174, 5175, 5176, 5177 to avoid conflicts.
- **Time**: Each agent takes 5-15 minutes. Total process: ~45-60 minutes for 5 agents + synthesis.
- **Cleanup**: After synthesis, delete individual agent directories.
- **Iteration**: After synthesis, use the screenshot loop to iterate on the final build.
