# protfolio — Mechanical Engineering & CAD Portfolio

Single-page, zero-build static site (HTML + Tailwind via CDN + vanilla JS) —
built to be pushed straight to the `main` branch of a GitHub Pages repo
named `protfolio`.

## What's real vs. placeholder

- **All 5 project images are real** — extracted directly from
  `Muhammad_Arslan_Professional_SolidWorks_Portfolio.pdf` (the FYP
  amphibious robot, robot arm assembly, lunch box, bracket, and detergent
  scoop). Nothing here is a stock photo.
- **Capabilities grid** only lists tools/skills actually on the CV
  (SolidWorks, AutoCAD, MATLAB, DFM/DFA, etc.) — I did not add ANSYS,
  Fusion 360, or Proteus since those aren't on Muhammad's CV. Add them
  once there's real experience with them.
- **"Analysis / Prototype Status" field** on the FYP card is left as an
  honest placeholder — the source documents don't contain specific
  FEA/CFD numbers, so I didn't invent any. Fill in real figures there
  once formal analysis is documented.

## Deploy to GitHub Pages

```bash
# from inside this protfolio/ folder
git init
git add .
git commit -m "Initial CAD portfolio"
git branch -M main
git remote add origin https://github.com/<your-username>/protfolio.git
git push -u origin main
```

Then in the GitHub repo: **Settings → Pages → Source → Deploy from a
branch → `main` / `/ (root)`**. Your site will be live at
`https://<your-username>.github.io/protfolio/` within a minute or two.

No build step, no `npm install` — it's plain HTML/CSS/JS, so GitHub
Pages serves it directly.

## Wiring the contact form (EmailJS)

1. Create a free account at [emailjs.com](https://www.emailjs.com/).
2. Add an email service connected to `muhammadarslanpro08@gmail.com`.
3. Create a template with variables: `from_name`, `from_email`,
   `subject`, `message`.
4. Open `index.html`, find the `<script>` block near the bottom, and
   replace:
   ```js
   window.EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
   window.EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
   window.EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
   ```
   with your real IDs.
5. Commit and push — the form will start sending real emails.

Until you fill those in, the form will show a "couldn't send" status
if someone submits it (EmailJS will reject the placeholder IDs) — so
there's no risk of silently losing a message.

## File structure

```
protfolio/
├── index.html              # entire site — hero, projects, capabilities, timeline, contact
├── assets/
│   ├── css/style.css        # design tokens, blueprint grid, wireframe overlay, dark mode
│   ├── js/main.js           # dark mode, lightbox, wireframe toggle, scroll reveal, EmailJS
│   └── img/
│       ├── fyp-amphibious-robot.png
│       ├── robot-arm-assembly.png
│       ├── lunch-box.png
│       ├── bracket.png
│       └── detergent-scoop.png
└── .nojekyll                # tells GitHub Pages not to run Jekyll processing
```

## Editing content later

- **Add a project:** copy one `<article>` block in the "PROJECTS"
  section of `index.html`, swap the image path, alt text, badge, and
  copy.
- **Swap an image:** drop the new file into `assets/img/` and update
  the `src` in the matching `<img>` tag (filenames aren't
  auto-discovered here — this is a plain static site, not a bundler).
- **Dark mode:** toggled via the sun/moon button in the nav; preference
  is remembered in `localStorage`.
- **Wireframe toggle:** per-card button that adds a blueprint-grid
  overlay + desaturation filter over the real screenshot — a visual
  inspection *effect*, not a true 3D wireframe render (there's no 3D
  geometry behind these images, only the CAD screenshots themselves).
