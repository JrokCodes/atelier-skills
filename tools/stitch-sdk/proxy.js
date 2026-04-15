/**
 * Stitch SDK MCP Proxy Server
 * Drop-in replacement for @_davideast/stitch-mcp using the official SDK.
 *
 * Usage in settings.local.json:
 *   "stitch": {
 *     "command": "node",
 *     "args": ["tools/stitch-sdk/proxy.js"],
 *     "env": { "STITCH_API_KEY": "<key>" }
 *   }
 */

import { StitchProxy } from "@google/stitch-sdk";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const proxy = new StitchProxy({
  apiKey: process.env.STITCH_API_KEY,
});

const transport = new StdioServerTransport();
await proxy.start(transport);
