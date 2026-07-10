# Publishing harrazmohdreza.com

Your site is plain static files (HTML/CSS/JS), so hosting is simple and free.
This guide uses **GitHub Pages** (easiest, since you already have a GitHub repo)
with your **Porkbun** domain. A Cloudflare Pages alternative is at the bottom.

Estimated time: ~20 minutes of work, then up to 24h for DNS to fully settle
(usually much faster).

---

## Part A — Put the site in your GitHub repo

The seven site files must sit at the **root** of the repo, with `index.html`
at the top level (not inside a subfolder).

Files to commit:
```
index.html
about.html
work.html
contact.html
case-study-routing-automation.html
case-study-arcgis-popups.html
case-study-cog-tool.html
styles.css
main.js
```
(You can also keep `DEPLOY.md` and `CLAUDE.md` in the repo — they won't affect the site.)

**Using the terminal:**
```bash
# from inside the unzipped harraz-site folder
git init                 # skip if the repo already exists here
git add .
git commit -m "Portfolio site"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git   # skip if already set
git push -u origin main
```
*Not comfortable with the terminal?* Use **GitHub Desktop** instead: drag the files
into your repo folder, write a summary, click **Commit**, then **Push**.

---

## Part B — Turn on GitHub Pages

1. On GitHub, open your repo → **Settings** → **Pages** (left sidebar).
2. Under **Build and deployment → Source**, choose **Deploy from a branch**.
3. Set **Branch** to `main` and folder to **/ (root)** → **Save**.
4. Wait ~1 minute. A temporary URL appears at the top of the Pages screen
   (e.g. `https://<your-username>.github.io/<your-repo>`). Confirm the site loads there.

---

## Part C — Connect harrazmohdreza.com (Porkbun)

**Step 1 — Tell GitHub your domain**
- Still in **Settings → Pages**, under **Custom domain**, type `harrazmohdreza.com` → **Save**.
  (This adds a `CNAME` file to your repo automatically.)

**Step 2 — Point Porkbun's DNS at GitHub**
- Log in to Porkbun → **Domain Management** → click **Details / DNS** for `harrazmohdreza.com`.
- **Delete** the default parking records Porkbun added (usually an `ALIAS` on the
  root and a `CNAME` on `www`). Leave any `MX`/email records alone.
- Add **four A records** (Type `A`, Host **left blank** = the apex, TTL default):
  ```
  185.199.108.153
  185.199.109.153
  185.199.110.153
  185.199.111.153
  ```
- *(Optional, IPv6)* Add **four AAAA records** (Host blank):
  ```
  2606:50c0:8000::153
  2606:50c0:8001::153
  2606:50c0:8002::153
  2606:50c0:8003::153
  ```
- Add **one CNAME record** so `www` works too:
  ```
  Type: CNAME   Host: www   Answer: <your-username>.github.io
  ```

**Step 3 — Turn on HTTPS**
- Return to **Settings → Pages**. Once the DNS check passes (minutes to a few hours),
  tick **Enforce HTTPS**. Done.

Visit **https://harrazmohdreza.com** — it should load your site, and
`www.harrazmohdreza.com` should redirect to it.

> If it doesn't work immediately, DNS can take up to 24 hours. Re-check the
> Pages settings screen for a green check, and confirm the four A records are
> exactly as above with the host left blank.

---

## Part D — Updating the site later

Any change is just: edit the file → commit → push. GitHub Pages redeploys in ~1 minute.
This is exactly the loop Claude Code is built for (see `CLAUDE.md`).

---

## Alternative — Cloudflare Pages (also free, very fast)

1. Create a free Cloudflare account → **Workers & Pages** → **Create** → **Pages** →
   **Connect to Git** → pick your repo. Framework preset: **None**. Build command: *(blank)*.
   Output directory: `/`. Deploy.
2. In the new Pages project → **Custom domains** → add `harrazmohdreza.com` and
   `www.harrazmohdreza.com`; Cloudflare walks you through the DNS records
   (simplest if you also move Porkbun's nameservers to Cloudflare, which it offers to do).

Both are good. GitHub Pages keeps everything in one place; Cloudflare has a slightly
snappier global network. Either is fine for this site.
