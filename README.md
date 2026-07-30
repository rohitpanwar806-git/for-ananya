# 🌸 For Ananya — A Girlfriend's Day Website

A playful, romantic single-page website made by **Rohit** for **Ananya**.
Features a live "days since we met" counter (26 July 2026), floating petals, a photo
gallery, an interactive **build-your-bouquet** section, a music toggle, and a hidden
love letter. 💛

## 📁 What's inside

```
for-ananya/
├── index.html        ← the website
├── style.css         ← all the styling & animations
├── script.js         ← countdown, bouquet, music, letter
├── photos/           ← drop your couple photos here (see photos/README.md)
└── assets/
    └── our-song.mp3  ← add your favorite song here (optional)
```

## ✨ Personalize it (2 easy steps)

1. **Add your photos** — put `photo1.jpg … photo6.jpg` in the `photos/` folder.
   See [photos/README.md](photos/README.md) for the exact names.
2. **Add your song** — drop an mp3 named `our-song.mp3` inside the `assets/` folder,
   then click the ♪ button on the site to play it.

That's it — nothing else needs editing. If you skip either step, the site still works
and shows friendly placeholders.

## 🚀 Publish it on GitHub Pages (free live link)

Your GitHub account: https://github.com/rohitpanwar806-git

### Option A — website upload (no commands)
1. Go to **https://github.com/new** and create a repository named
   **`for-ananya`** (set it to **Public**). Click **Create repository**.
2. On the new repo page, click **"uploading an existing file"**.
3. Drag in **everything inside this `for-ananya` folder** (index.html, style.css,
   script.js, the `photos/` folder, and `assets/` if you added a song). Click
   **Commit changes**.
4. Go to **Settings → Pages**. Under **Build and deployment → Branch**, choose
   **`main`** and folder **`/ (root)`**, then click **Save**.
5. Wait ~1 minute, refresh the Pages settings, and your live link appears:
   **`https://rohitpanwar806-git.github.io/for-ananya/`** 🎉

### Option B — using Git (command line)
Run these from inside the `for-ananya` folder:

```bash
git init
git add .
git commit -m "A Girlfriend's Day surprise for Ananya 🌸"
git branch -M main
git remote add origin https://github.com/rohitpanwar806-git/for-ananya.git
git push -u origin main
```

Then do step 4 above (Settings → Pages) to turn on GitHub Pages.

## 👀 Preview locally first
Just double-click `index.html` — it opens in your browser. (The music/photos need the
files added, but everything else works instantly.)

---

Made with love, only for Ananya. 💛
