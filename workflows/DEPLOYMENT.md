# GitHub to Vercel Deployment Pipeline

> Local dev → GitHub → Vercel auto-deploy

---

## First-Time Setup (Per Project)

### 1. Create GitHub Repository
```bash
gh repo create your-username/[project-name] --private --source=. --push
```

### 2. Connect to Vercel
1. Go to [vercel.com/new](https://vercel.com/new)
2. Import from GitHub → select `your-username/[project-name]`
3. Framework preset: **Vite**
4. Build command: `npm run build`
5. Output directory: `dist`
6. Root directory: `.` (or subfolder if monorepo)
7. Deploy

### 3. Add vercel.json
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}
```

### 4. Custom Domain (Optional)
In Vercel → Project Settings → Domains → Add domain:
- **CNAME**: Point to `cname.vercel-dns.com`
- **A Record**: Point to `76.76.21.21`

---

## Ongoing Workflow

### Local Development
```bash
npm run dev        # Start dev server (localhost:5173)
# Make changes, test with screenshot loop
```

### Push Changes
```bash
git add .
git commit -m "description of changes"
git push
```
Vercel auto-deploys from main branch (~30 seconds).

### IMPORTANT: Test Locally First
The CLAUDE.md should instruct Claude Code:
- Always test on localhost before pushing
- Never push untested changes
- Only push when explicitly told to: "Push to GitHub" or "Deploy this"

---

## Image Optimization (Pre-Deploy)

Convert PNG to WebP for massive size reduction (typically 97%):

```javascript
// optimize-images.js
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imageDir = './public/images';
const files = fs.readdirSync(imageDir).filter(f => f.endsWith('.png'));

for (const file of files) {
  const input = path.join(imageDir, file);
  const output = path.join(imageDir, file.replace('.png', '.webp'));
  await sharp(input).webp({ quality: 80 }).toFile(output);
  console.log(`${file} → ${path.basename(output)}`);
}
```

Install: `npm install sharp`

### Prefetch Images
```html
<!-- Hero image: high priority -->
<link rel="preload" as="image" href="/images/hero.webp" fetchpriority="high" />

<!-- Below-fold images: prefetch -->
<link rel="prefetch" as="image" href="/images/section2.webp" />
```

---

## Active Deployments

| Project | GitHub Repo | Vercel URL | Custom Domain |
|---------|-------------|-----------|---------------|
| Example Project | your-username/your-repo | your-project.vercel.app | — |

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| 404 on direct URL access | Add SPA rewrites to `vercel.json` (see above) |
| Build fails | Check Vercel build logs; common: Tailwind v4 PostCSS config |
| Images slow | Convert PNG → WebP with sharp script |
| CSS not updating | Clear Vercel cache: Deployments → Redeploy (clear cache) |
| Environment variables | Add in Vercel → Settings → Environment Variables |
