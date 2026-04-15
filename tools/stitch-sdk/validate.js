/**
 * Stitch SDK Validation Script
 * Tests all SDK operations against an existing project to confirm parity with MCP
 * and validates new capabilities (edit, variants).
 *
 * Usage:
 *   STITCH_API_KEY=<key> node validate.js [projectId]
 *
 * If no projectId is provided, lists all projects and uses the first one.
 */

import { stitch, StitchError } from "@google/stitch-sdk";

const projectId = process.argv[2];

async function log(label, fn) {
  process.stdout.write(`  ${label}... `);
  try {
    const result = await fn();
    console.log("OK");
    return result;
  } catch (err) {
    if (err instanceof StitchError) {
      console.log(`FAIL (${err.code}: ${err.message})`);
    } else {
      console.log(`FAIL (${err.message})`);
    }
    return null;
  }
}

async function run() {
  console.log("\n=== Stitch SDK Validation ===\n");

  // 1. List projects
  console.log("1. Project Management");
  const projects = await log("List projects", () => stitch.projects());
  if (!projects || projects.length === 0) {
    console.log("\n  No projects found. Create one in stitch.withgoogle.com first.\n");
    return;
  }

  console.log(`     Found ${projects.length} project(s)`);
  for (const p of projects.slice(0, 5)) {
    console.log(`     - ${p.id}`);
  }

  // Use provided project ID or the first one
  const targetId = projectId || projects[0].id;
  console.log(`\n  Using project: ${targetId}`);

  const project = stitch.project(targetId);

  // 2. List screens
  console.log("\n2. Screen Operations");
  const screens = await log("List screens", () => project.screens());
  if (screens && screens.length > 0) {
    console.log(`     Found ${screens.length} screen(s)`);

    const screen = screens[0];
    console.log(`     Using screen: ${screen.id}`);

    // 3. Fetch HTML
    const htmlUrl = await log("Get HTML URL", () => screen.getHtml());
    if (htmlUrl) {
      console.log(`     HTML: ${htmlUrl.substring(0, 80)}...`);
    }

    // 4. Fetch Image
    const imageUrl = await log("Get image URL", () => screen.getImage());
    if (imageUrl) {
      console.log(`     Image: ${imageUrl.substring(0, 80)}...`);
    }

    // 5. Edit screen (NEW capability)
    console.log("\n3. New Capabilities");
    const edited = await log("Edit screen", () =>
      screen.edit("Change the primary button color to teal (#2BBCB3)")
    );
    if (edited) {
      console.log(`     Edited screen ID: ${edited.id}`);
      const editedHtml = await log("Get edited HTML", () => edited.getHtml());
      if (editedHtml) {
        console.log(`     Edited HTML: ${editedHtml.substring(0, 80)}...`);
      }
    }

    // 6. Generate variants (NEW capability)
    const variants = await log("Generate variants", () =>
      screen.variants("Try different color schemes", {
        variantCount: 2,
        creativeRange: "REFINE",
        aspects: ["COLOR_SCHEME"],
      })
    );
    if (variants) {
      console.log(`     Generated ${variants.length} variant(s)`);
      for (const v of variants) {
        console.log(`     - Variant: ${v.id}`);
      }
    }
  } else {
    console.log("     No screens found. Generating a test screen...");

    // Generate a test screen
    const generated = await log("Generate screen", () =>
      project.generate("A simple login page with email and password fields, dark theme, teal accent")
    );
    if (generated) {
      console.log(`     Generated screen ID: ${generated.id}`);
      await log("Get HTML URL", () => generated.getHtml());
      await log("Get image URL", () => generated.getImage());
    }
  }

  // 7. Tool client APIs
  console.log("\n4. Agent Tool APIs");
  const toolResult = await log("List tools", () => stitch.listTools());
  if (toolResult && toolResult.tools) {
    console.log(`     Available tools: ${toolResult.tools.length}`);
    for (const tool of toolResult.tools) {
      console.log(`     - ${tool.name}`);
    }
  }

  console.log("\n=== Validation Complete ===\n");
}

run().catch((err) => {
  console.error("Fatal error:", err.message);
  process.exit(1);
});
