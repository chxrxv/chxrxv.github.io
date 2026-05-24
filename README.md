# ✦ Charuvi Suresh — Portfolio

> AI-focused full stack developer portfolio. Dark luxury aesthetic · Cinematic UI · GitHub Pages ready.

## 🚀 Deploy in 3 steps

### Step 1 — Upload to your repo
```bash
# In your existing chxrxv.github.io repo:
git clone https://github.com/chxrxv/chxrxv.github.io
cd chxrxv.github.io

# Replace the old files
cp /path/to/new/index.html .
cp /path/to/new/style.css .
cp /path/to/new/script.js .
```

### Step 2 — Customize (see below)
Update your name, links, email, and project GitHub URLs in `index.html`.

### Step 3 — Push and go live
```bash
git add .
git commit -m "✦ complete portfolio redesign"
git push origin main
# Your site goes live at chxrxv.github.io within 1-2 minutes
```

---

## 📁 File structure
```
chxrxv.github.io/
├── index.html      ← all HTML, content, sections
├── style.css       ← all styles, tokens, animations
├── script.js       ← cursor, particles, typed text, filters
├── resume.pdf      ← add your resume here
└── assets/
    └── og-image.png    ← 1200×630 social preview image
```

---

## ✏️ How to customize

### Update personal links
Search for these in `index.html` and replace:

| Placeholder | Replace with |
|---|---|
| `charuvi@email.com` | Your real email |
| `linkedin.com/in/charuvisuresh` | Your LinkedIn URL |
| `github.com/chxrxv` | Your GitHub URL |

### Update project GitHub links
Each project card has:
```html
<a href="https://github.com/chxrxv" target="_blank" class="plink">
```
Replace with the direct repo URL, e.g.:
```html
<a href="https://github.com/chxrxv/resume-analyzer" target="_blank" class="plink">
```

### Add your resume
Drop `resume.pdf` in the root folder. The download button is already wired up.

### Add real GitHub stats
The GitHub stats cards use your username `chxrxv` — they're already live at:
- `https://github-readme-stats.vercel.app/api?username=chxrxv`

If stats don't show, make sure your GitHub profile is public.

### Add a contact form (free)
1. Go to [formspree.io](https://formspree.io) → create a free form
2. Get your endpoint: `https://formspree.io/f/YOUR_ID`
3. In `script.js`, replace the fake submit with:
```js
const res = await fetch('https://formspree.io/f/YOUR_ID', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name, email, message }),
});
```

---

## 🎨 Design tokens

All colors live in `style.css` under `:root`. To change the accent color:
```css
:root {
  --green: #39d353;        /* main accent */
  --cyan:  #67e8f9;        /* secondary accent */
}
```

---

## 📱 Features included

- ✅ Custom animated cursor (desktop)
- ✅ Loading screen with progress bar
- ✅ Scroll progress indicator
- ✅ Typing animation (hero)
- ✅ Particle canvas background
- ✅ Magnetic CTA buttons
- ✅ Scroll-triggered reveal animations
- ✅ Project filtering system
- ✅ Dark / light mode toggle (persisted)
- ✅ Mobile responsive + hamburger menu
- ✅ Contact form (fake → replace with Formspree)
- ✅ GitHub stats cards
- ✅ SEO meta tags + Open Graph
- ✅ Resume download button
- ✅ Smooth scroll + active nav highlighting
- ✅ Glassmorphism cards
- ✅ Gradient ambient blobs + parallax
