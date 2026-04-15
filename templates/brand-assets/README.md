# Brand Assets Template

Copy this folder into each client project at: `[project]/brand-assets/`

## How to Populate

### Required
- [ ] `logo.svg` (or `.png`) — primary logo
- [ ] `logo-dark.svg` — logo for dark backgrounds (if different)
- [ ] `brand-guidelines.md` — filled out from the template in this folder

### Optional
- [ ] `favicon.svg` or `favicon.ico`
- [ ] Custom font files (`.woff2`) if not on Google Fonts
- [ ] `og-image.png` — Open Graph image for social sharing (1200x630)
- [ ] Client-provided photos (team, office, products, before/after)

## Claude Code Integration

When Claude Code starts a frontend build, it should:
1. Check for `brand-assets/` in the project root
2. Read `brand-guidelines.md` for colors, fonts, voice
3. Use logo files in the nav and footer
4. Ask about any missing items before building

## File Naming Convention

```
brand-assets/
  logo.svg
  logo-dark.svg
  favicon.svg
  og-image.png
  brand-guidelines.md
  assets/
    hero-photo.webp
    team-photo.webp
    product-1.webp
    ...
```
