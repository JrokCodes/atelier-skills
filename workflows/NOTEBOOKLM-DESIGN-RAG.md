# NotebookLM as a Design Knowledge Base

Use Google NotebookLM as a persistent RAG-powered research tool for design intelligence. Store competitor analyses, brand research, design patterns, and client context in structured notebooks.

---

## What Is NotebookLM?

[notebooklm.google.com](https://notebooklm.google.com) is Google's AI research tool that stores your uploaded sources and lets you query them with RAG-based Q&A. Unlike a chat session that forgets context, NotebookLM retains everything you add.

**Key capabilities**:
- Upload PDFs, docs, websites, YouTube videos, audio files as sources
- Ask questions across all sources with cited answers
- Generate structured notes and summaries
- Create audio overviews (podcast-style summaries)
- Deep Research: autonomous web research that compiles findings

---

## Use Cases for Design Work

### Competitive Intelligence
Store analyses of competitor websites, industry leaders, and award-winning designs.

**Sources to add**:
- Screenshots + written breakdowns of competitor sites
- Awwwards/FWA case studies
- Industry benchmark reports
- Site teardown documents (from SITE-TEARDOWNS.md)

**Example queries**:
- "What hero patterns do healthcare SaaS sites use most?"
- "How do competitors handle dark mode transitions?"
- "What CTA language converts best in B2B consulting?"

### Brand Research
Upload everything about a client's brand identity.

**Sources to add**:
- Brand guidelines PDFs
- Logo usage documents
- Competitor brand analyses
- Industry tone-of-voice references
- Client meeting notes

**Example queries**:
- "What font pairings match this brand's personality?"
- "Summarize the brand voice in 3 adjectives"
- "What colors do competitors in this space avoid?"

### Design Patterns
Build a searchable library of proven patterns.

**Sources to add**:
- Atelier catalog exports (hero, animation, typography, etc.)
- CSS-Tricks articles on specific techniques
- Smashing Magazine design breakdowns
- Component library documentation

**Example queries**:
- "Show me parallax scroll implementations that work on mobile"
- "What glass morphism patterns work best on dark backgrounds?"
- "Compare staggered animations vs simultaneous reveals"

### Client-Specific Knowledge
One notebook per client with all research and context.

**Sources to add**:
- Discovery call transcripts
- Industry research documents
- Target audience demographics
- Previous design iterations and feedback
- Analytics reports from existing sites

---

## Setup

### Creating Notebooks

Organize by topic or client:

```
Notebooks/
├── Design Patterns        — Cross-project pattern library
├── Competitive Intel      — Industry and competitor research
├── [Client] - Brand       — Per-client brand research
├── [Client] - Industry    — Per-client industry context
├── Typography Research    — Font pairings, type systems
└── Animation Techniques   — Motion design references
```

### Adding Sources

1. Open a notebook at notebooklm.google.com
2. Click **"+"** to add sources
3. Supported types:
   - Google Docs/Slides
   - PDFs (up to 500K words each)
   - Website URLs (scrapes content)
   - YouTube videos (extracts transcript)
   - Copied text
   - Audio files
4. NotebookLM indexes the content for RAG queries

**Tip**: Add 5-10 high-quality sources per notebook rather than 50 mediocre ones. Quality of sources directly affects answer quality.

---

## MCP Integration (Community Server)

A community-built MCP server provides programmatic access to NotebookLM from Claude Code and other AI coding tools.

### Installation

```bash
pip install notebooklm-mcp
```

### Configuration

Add to `settings.local.json`:

```json
{
  "mcpServers": {
    "notebooklm": {
      "command": "python",
      "args": ["-m", "notebooklm_mcp"],
      "env": {
        "GOOGLE_AUTH_TOKEN": "<your-google-auth-token>"
      }
    }
  }
}
```

### Available Tools (29 total)

Key tools for design workflows:

| Tool | Purpose |
|------|---------|
| `list_notebooks` | List all notebooks |
| `create_notebook` | Create a new notebook |
| `add_source` | Add URL/text/file as source |
| `query_notebook` | Ask questions against sources |
| `get_notes` | Retrieve generated notes |
| `create_audio_overview` | Generate podcast summary |
| `deep_research` | Autonomous web research |

### Workflow Example

```
1. Claude Code receives brief: "Build landing page for AI dental practice"
2. Query NotebookLM: "What design patterns work for dental/healthcare sites?"
3. Get cited answers from your stored research
4. Query: "What hero archetypes do premium healthcare brands use?"
5. Use findings to inform design brief
6. Build with Atelier stack
```

---

## Deep Research Feature

NotebookLM's Deep Research mode autonomously searches the web, evaluates sources, and compiles findings into a structured report.

**How to use**:
1. Open a notebook
2. Click **Deep Research**
3. Enter a research question: "What are the top design trends for healthcare SaaS landing pages in 2026?"
4. NotebookLM searches, reads, and synthesizes multiple web sources
5. Output: A structured research document added as a note

**Best for**:
- Pre-build industry research for a new client
- Trend analysis before a redesign
- Gathering competitive intelligence at scale

---

## Audio Overviews

Generate a podcast-style audio summary of any notebook's contents.

**Use cases**:
- Listen to a brand research summary during commute
- Share audio briefing with a client or team
- Quick refresher before a design review meeting

**How to generate**:
1. Open notebook with 3+ sources
2. Click **Audio Overview**
3. Wait for generation (2-5 minutes)
4. Listen or download the MP3

---

## Gemini Integration

Chat with multiple notebooks simultaneously through Gemini:

1. Open [gemini.google.com](https://gemini.google.com)
2. Select notebooks as context sources
3. Ask cross-notebook questions:
   - "Compare the brand guidelines from Client A and Client B"
   - "What patterns from my design library match Client C's brand?"
   - "Generate a color palette based on my typography research and this client's industry"

---

## When to Use NotebookLM vs. EXPERTISE.md

| Scenario | Use NotebookLM | Use EXPERTISE.md |
|----------|----------------|------------------|
| Quick pattern recall during a build | | X |
| Deep research on a new industry | X | |
| Storing 50+ pages of brand docs | X | |
| Recording a lesson learned from a project | | X |
| Querying across multiple client contexts | X | |
| Sharing a quick tip with the team | | X |
| Preparing for a client discovery call | X | |
| Referencing during prompt writing | | X |

**Rule of thumb**: EXPERTISE.md for quick, actionable patterns. NotebookLM for deep, research-heavy knowledge that benefits from RAG retrieval.

---

## Limitations

- **No official API**: Community MCP server uses reverse-engineered access; may break
- **Google auth required**: Needs a Google account and authentication token
- **Source limits**: ~50 sources per notebook, 500K words per source
- **Latency**: RAG queries take 3-10 seconds vs. instant local file reads
- **No real-time sync**: Sources are indexed at upload time, not continuously updated
- **Privacy**: Sources are processed by Google's infrastructure

---

## Best Practices

1. **One notebook per purpose** — Don't mix client research with pattern libraries
2. **Name sources clearly** — "Awwwards-Healthcare-2026" not "Document 1"
3. **Refresh quarterly** — Remove outdated sources, add new research
4. **Export key findings** — Copy the best insights into EXPERTISE.md for fast access
5. **Use Deep Research sparingly** — It's powerful but slow; save for significant research needs
6. **Combine with Atelier catalogs** — NotebookLM for research, catalogs for implementation
