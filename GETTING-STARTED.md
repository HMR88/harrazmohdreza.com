# Getting Started: GitHub + Claude Code (for a first-timer)

This guide takes you from "a zip file on my computer" to "a live website I can edit
by talking to Claude." No prior experience assumed. Budget 45–60 minutes.

**The big picture, in plain English:**
- **GitHub** is a website that stores your code and keeps a history of every change
  (so you can never truly break anything — you can always go back).
- **A repository ("repo")** is just a project folder that GitHub tracks.
- **GitHub Pages** is GitHub's free hosting — it takes the files in your repo and
  serves them as a live website.
- **Claude Code** is Claude working directly inside your project folder — it reads
  your files, makes edits you approve, and can save changes to GitHub for you.

The flow: your files → a GitHub repo → GitHub Pages makes it live → Claude Code
becomes your editor from then on.

---

## Part 1 — Get your files ready (5 min)

1. Download `harraz-site.zip` from our conversation.
2. Find it in your **Downloads** folder and unzip it:
   - **Windows:** right-click → "Extract All…" → Extract.
   - **Mac:** double-click it.
3. You now have a folder called `harraz-site`. Move it somewhere permanent and easy
   to find — for example, `Documents/harraz-site`. This folder IS your website:
   every `.html` file is a page, `styles.css` is the design, `CLAUDE.md` and
   `DEPLOY.md` are instructions for Claude and for deployment.

> Don't rename the files. `index.html` must keep that exact name — it's the
> universal convention for "the home page."

---

## Part 2 — Create your GitHub account (5 min)

1. Go to **github.com** and click **Sign up** (skip if you already have an account).
2. You already have your account: **HMR88** (github.com/HMR88). The site's
   GitHub links already point there — just sign in.
3. Verify your email. The **Free** plan is all you need.

---

## Part 3 — Install GitHub Desktop and publish your repo (15 min)

GitHub Desktop is a friendly app that moves files between your computer and GitHub
without ever touching a command line.

1. Download it from **desktop.github.com** and install it.
2. Open it → **Sign in to GitHub.com** → log in in the browser window that appears
   → allow it to connect.
3. In GitHub Desktop: **File → New repository…** and fill in:
   - **Name:** `harrazmohdreza.com` (naming it after your domain keeps things tidy)
   - **Local path:** click Choose… and select your `Documents` folder
   - Leave everything else unchecked → **Create repository**.
   This creates a new, empty tracked folder: `Documents/harrazmohdreza.com`.
4. Open that new folder and **copy everything from inside `harraz-site` into it**
   (the files themselves — `index.html`, `styles.css`, etc. — not the
   `harraz-site` folder). Every file, including `CLAUDE.md`, `DEPLOY.md`,
   `robots.txt`, the favicons, and `og-image.png`.
5. Go back to GitHub Desktop. It now lists all your files as changes. In the
   bottom-left box, type a short description like `Initial site` (this is a
   "commit message" — a label for this snapshot in history) → click
   **Commit to main**.
6. Click **Publish repository** (top bar). **IMPORTANT: uncheck
   "Keep this code private."** GitHub Pages is only free on public repositories —
   and a portfolio is meant to be public anyway. → **Publish**.

Your files are now on GitHub. Check: go to `github.com/YOUR-USERNAME` and you
should see the repository with all your files.

**This is the loop you'll reuse forever:** change files → GitHub Desktop shows the
changes → write a short message → Commit → **Push origin** (the Publish button
becomes Push). That's it. (Claude Code can also do this loop for you — Part 5.)

---

## Part 4 — Make it live with GitHub Pages (10 min + waiting)

1. On github.com, open your repository → **Settings** (tab on the right) →
   **Pages** (left sidebar).
2. Under **Build and deployment → Source**, choose **Deploy from a branch**.
3. Set Branch to **main**, folder **/ (root)** → **Save**.
4. Wait a minute, refresh the page — a link appears like
   `https://YOUR-USERNAME.github.io/harrazmohdreza.com/`. Click it. **Your site
   is live on the internet.** Click around and enjoy that moment.
5. To connect your real domain (harrazmohdreza.com from Porkbun), follow
   **Part C of `DEPLOY.md`** — it has the exact DNS records to enter at Porkbun,
   step by step. DNS can take a few hours to settle; that's normal. Once the
   check passes, tick **Enforce HTTPS** on the same Pages settings screen.

---

## Part 5 — Install Claude Code and take the wheel (15 min)

Good news: **Claude Code is built into the Claude Desktop app** — no terminal, no
developer tools to install.

> Requirement: Claude Code needs a paid Claude plan (Pro or higher). If the Code
> tab asks you to upgrade, that's why.

1. Download the Claude Desktop app from **claude.com/download** (pick your
   operating system), install it, and sign in with the same account you use for
   claude.ai.
2. Click the **Code** tab at the top of the app.
3. Choose **Local** (meaning: work on files on this computer), then select your
   repository folder: `Documents/harrazmohdreza.com`.
4. Claude Code automatically reads the `CLAUDE.md` file in that folder — the
   project brief we wrote together. It will already know your design rules, file
   structure, security setup, and the open to-do list. You don't need to
   re-explain anything.
5. **How working with it feels:** you type a request in plain English; Claude
   proposes changes; you see a **diff view** — a before/after of exactly what
   will change in each file — with **Accept / Reject** buttons. By default
   (Manual mode) nothing is changed until you approve it. This is the safest way
   to learn: read the diffs, accept what looks right.

**Your first three requests, in order** (copy-paste these):

1. `Read CLAUDE.md and give me a summary of this project and the open items.`
   (A warm-up — confirms it understands the project.)
2. `Review the field note draft in note-cog-iterations.html and read it back to
   me so I can edit the voice.` (The contact form is already live — submissions
   reach your inbox privately via Formspree; your email exists only in their
   dashboard, never in the site code.)
3. `Walk me through DEPLOY.md Part C and help me connect harrazmohdreza.com.`
   (The domain connection — the last step to fully live.)

Then, to publish any changes: either use GitHub Desktop (Commit → Push, as in
Part 3), **or simply ask Claude Code**: `Commit these changes with a good message
and push to GitHub.` GitHub Pages redeploys automatically about a minute after
every push.

---

## Part 6 — Your ongoing rhythm

- **Design decisions and brainstorming** → claude.ai (like our conversation).
- **"Change this on the site"** → Claude Code in the desktop app.
- **Every push = automatic redeploy.** Roughly a minute later, the live site
  updates.
- **You can't permanently break anything.** Every commit is a snapshot; ask
  Claude Code to "revert the last change" and it's undone.

**Remaining to-dos** (all tracked in CLAUDE.md, all doable by asking Claude Code):
- Replace placeholder contact links (Part 5, request #2)
- Review/approve the field note draft
- Enable analytics (CLAUDE.md has exact GoatCounter instructions)
- Restore the credentials section when your first certification lands
- Connect the custom domain (DEPLOY.md Part C)

---

## If something goes wrong

- **Pages shows a 404:** confirm `index.html` is at the top level of the repo
  (not inside a subfolder), and Pages is set to `main` + `/ (root)`.
- **Site looks unstyled:** `styles.css` probably didn't get copied — check it's
  in the repo next to `index.html`.
- **Domain not working yet:** DNS takes up to 24h. Re-check the records against
  DEPLOY.md exactly.
- **Code tab asks you to upgrade:** Claude Code requires a paid plan.
- **Anything else:** paste the error message into Claude Code and ask. Genuinely —
  that's the workflow. Screenshots work too.

Official references: GitHub Pages docs (docs.github.com/pages), Claude Code
desktop quickstart (code.claude.com/docs/en/desktop-quickstart).
