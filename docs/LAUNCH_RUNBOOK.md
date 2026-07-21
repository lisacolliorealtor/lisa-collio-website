# Launch Runbook — lisacolliorealtor.com

**For Lisa. Plain-language steps to take the site live. No technical background
needed — each step says exactly where to click and what you should see.**

Work through the steps in order. Steps A–C happen before the domain goes live;
step D flips the switch; step E is the same-week follow-up.

---

## A · Confirm the site builds and deploys on Netlify

1. Log in at **app.netlify.com** and open the site for this repository
   (lisacolliorealtor). If no site exists yet: click **Add new site → Import an
   existing project → GitHub**, choose the `lisa-collio-website` repository,
   leave the build settings exactly as Netlify detects them (this site needs no
   build command; the publish folder is the repository root), and click
   **Deploy**.
2. On the site's **Deploys** tab, the top entry should show a green
   **"Published"** label for the latest commit on `main`. If it shows red
   "Failed", click it and send the log to your web helper — do not continue
   until the deploy is green.

## B · Final walkthrough on the preview link

Open the temporary Netlify URL (it looks like `something-random.netlify.app`,
shown at the top of the site's Overview page) and check, on your phone if
possible:

- [ ] **Homepage pair** — the English homepage and, via the red
      "Hablo español" badge, the Spanish homepage. Headline, photo, phone
      number all correct; the badge and "English" toggle jump between the two.
- [ ] **One buyer article and one seller article** — open any article from
      /blog/; text reads correctly, the footer looks right, the "More from
      Lisa" links work.
- [ ] **Market stats numbers** — /market-stats/ shows exactly the figures you
      approved from the MLS data (spot-check two or three against your copy).
- [ ] **Tap-to-call from a phone** — on the Contact page, tap
      **Call or Text (574) 370-5410**: your phone should offer to dial the
      number. Tap the text/SMS link too if shown.
- [ ] **Spanish pages read-aloud test** — open /es/ and
      /es/compradores/ and read a few paragraphs out loud. They should sound
      like natural Spanish, not translation. Anything that sounds off, note
      the page and sentence and flag it before launch.

## C · Broker sign-off

- [ ] Your managing broker has reviewed the site (or the pages changed since
      their last review) and their **advertising sign-off is recorded in
      writing** (email is fine). The FLAGGED items in
      `docs/LAUNCH_REPORT.md` (§7) are specifically called out for this
      sign-off.

## D · Connect the domain

1. In Netlify, open your site → **Domain management** (sometimes shown as
   "Domain settings") → **Add a domain** → type `lisacolliorealtor.com` →
   **Verify** → also add `www.lisacolliorealtor.com` when offered.
2. Netlify will now show DNS records to set at your **domain registrar** (the
   company where you bought lisacolliorealtor.com — e.g. GoDaddy or
   Namecheap). Log in there, find **DNS settings** for the domain, and enter
   what Netlify shows. Typically that is:
   - An **A record** for the bare domain (`@`) pointing to Netlify's load
     balancer IP — Netlify displays the exact IP (currently `75.2.60.5`), or
     an **ALIAS/ANAME record** pointing to `apex-loadbalancer.netlify.com`
     if your registrar supports it (use whichever Netlify's screen shows).
   - A **CNAME record** for `www` pointing to your Netlify site name
     (`your-site-name.netlify.app`).
   *(Alternative: Netlify will offer "Use Netlify DNS" — pointing the domain's
   nameservers at Netlify. That also works; pick one approach, not both.)*
3. **Wait.** DNS changes can take up to **24–48 hours** to propagate,
   though it is often much faster. Netlify's Domain management page shows a
   green check when the domain resolves.
4. **HTTPS is automatic.** After DNS resolves, Netlify issues the SSL
   certificate itself (Let's Encrypt) — usually within an hour. When Domain
   management shows the certificate as active, visit
   `https://lisacolliorealtor.com` and confirm the padlock appears and the
   site loads.

## E · After the site is live

1. **Google Search Console** — at search.google.com/search-console, add the
   property `lisacolliorealtor.com` (Domain property; it will ask you to add
   one more DNS record to verify ownership). Then go to **Sitemaps** and
   submit: `https://lisacolliorealtor.com/sitemap.xml`. You should see
   "Success" within a day or two.
2. **Google Business Profile** — in your Business Profile, edit the
   **Website** field to `https://lisacolliorealtor.com` (and the appointment
   link to `https://lisacolliorealtor.com/contact/` if you use one).
3. **GBP description update is a separate task** — rewriting the Business
   Profile description to match the new brand language needs **broker
   sign-off first** (it is advertising). Treat it as its own post-launch
   to-do; do not change it during launch week.

---

*Keep this file with the site. If anything in Netlify looks different from
these steps, the labels may have moved — the sequence (deploy green → domain →
DNS at registrar → wait → HTTPS automatic → Search Console + GBP) stays the
same.*
