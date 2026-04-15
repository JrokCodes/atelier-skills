#!/usr/bin/env node

/**
 * Screenshot utility for Claude Code design feedback loop.
 *
 * Usage:
 *   node screenshot.js <url> [output] [flags]
 *
 * Examples:
 *   node screenshot.js http://localhost:5173 ./hero.png
 *   node screenshot.js http://localhost:5173 ./full.png --full-page
 *   node screenshot.js http://localhost:5173 ./mobile.png --width=375 --height=812
 *   node screenshot.js https://reference-site.com ./reference.png --full-page --delay=3000
 *   node screenshot.js http://localhost:5173 ./full.png --full-page --scroll-first
 *
 * Flags:
 *   --full-page      Capture entire scrollable page (default: viewport only)
 *   --width=N        Viewport width in pixels (default: 1440)
 *   --height=N       Viewport height in pixels (default: 900)
 *   --delay=N        Wait N milliseconds after load before screenshot (default: 1000)
 *   --output-dir=P   Directory for output (default: ./screenshots)
 *   --scroll-first   Smoothly scroll the entire page before capturing.
 *                    REQUIRED for sites with scroll-triggered animations
 *                    (Framer Motion useInView, GSAP ScrollTrigger, IntersectionObserver
 *                    fade-ins). Without this, sections below the initial viewport
 *                    appear empty in full-page screenshots because their reveal
 *                    animations never fired. Auto-implied when --full-page is set.
 */

const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

function parseArgs(args) {
  const flags = {
    url: null,
    output: null,
    fullPage: false,
    width: 1440,
    height: 900,
    delay: 1000,
    outputDir: './screenshots',
    scrollFirst: false,
  };

  const positional = [];

  for (const arg of args) {
    if (arg === '--full-page') {
      flags.fullPage = true;
    } else if (arg === '--scroll-first') {
      flags.scrollFirst = true;
    } else if (arg.startsWith('--width=')) {
      flags.width = parseInt(arg.split('=')[1], 10);
    } else if (arg.startsWith('--height=')) {
      flags.height = parseInt(arg.split('=')[1], 10);
    } else if (arg.startsWith('--delay=')) {
      flags.delay = parseInt(arg.split('=')[1], 10);
    } else if (arg.startsWith('--output-dir=')) {
      flags.outputDir = arg.split('=')[1];
    } else if (!arg.startsWith('--')) {
      positional.push(arg);
    }
  }

  flags.url = positional[0];
  flags.output = positional[1] || null;

  // Auto-imply scroll-first when capturing a full page — almost every modern
  // site has scroll-triggered reveal animations that won't fire without it.
  if (flags.fullPage) {
    flags.scrollFirst = true;
  }

  return flags;
}

/**
 * Smoothly scrolls the entire page in viewport-half steps to trigger every
 * scroll-driven IntersectionObserver / useInView observer, then returns to top.
 * Without this, sections below the fold render at opacity:0 in full-page
 * screenshots because their reveal animations never ran.
 */
async function scrollThroughPage(page, viewportHeight) {
  const totalHeight = await page.evaluate(() => document.body.scrollHeight);
  const step = Math.max(200, Math.floor(viewportHeight / 2));

  for (let pos = 0; pos < totalHeight; pos += step) {
    await page.evaluate((p) => window.scrollTo(0, p), pos);
    await new Promise((r) => setTimeout(r, 220));
  }

  // Force absolute bottom
  await page.evaluate((h) => window.scrollTo(0, h), totalHeight);
  await new Promise((r) => setTimeout(r, 700));

  // Let any in-flight animations settle
  await new Promise((r) => setTimeout(r, 800));

  // Return to top before capture
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 400));
}

async function screenshot(flags) {
  if (!flags.url) {
    console.error('Usage: node screenshot.js <url> [output.png] [--full-page] [--width=1440] [--height=900] [--delay=1000]');
    process.exit(1);
  }

  // Determine output path
  let outputPath = flags.output;
  if (!outputPath) {
    fs.mkdirSync(flags.outputDir, { recursive: true });
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    outputPath = path.join(flags.outputDir, `screenshot-${timestamp}.png`);
  } else {
    const dir = path.dirname(outputPath);
    if (dir !== '.') {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  console.log(`Capturing:    ${flags.url}`);
  console.log(`Viewport:     ${flags.width}x${flags.height}`);
  console.log(`Full page:    ${flags.fullPage}`);
  console.log(`Scroll first: ${flags.scrollFirst}`);
  console.log(`Delay:        ${flags.delay}ms`);

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();
    await page.setViewport({ width: flags.width, height: flags.height });
    await page.goto(flags.url, { waitUntil: 'networkidle2', timeout: 30000 });

    // Wait for any entrance animations to settle
    if (flags.delay > 0) {
      await new Promise(resolve => setTimeout(resolve, flags.delay));
    }

    // Trigger scroll-driven animations before capturing
    if (flags.scrollFirst) {
      await scrollThroughPage(page, flags.height);
    }

    await page.screenshot({
      path: outputPath,
      fullPage: flags.fullPage,
    });

    console.log(`Saved:        ${path.resolve(outputPath)}`);
  } finally {
    await browser.close();
  }
}

const flags = parseArgs(process.argv.slice(2));
screenshot(flags).catch(err => {
  console.error('Screenshot failed:', err.message);
  process.exit(1);
});
