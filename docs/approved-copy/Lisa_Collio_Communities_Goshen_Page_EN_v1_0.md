# /living-in-goshen/ — Page Rewrite (English)

*Prepared for Lisa Collio, Real Estate Agent · July 2026*
*Per Master Plan v2.5 (§6, §7, §8), Federal Fair Housing Act Website Compliance Reference, Goshen–Elkhart Reference Data Sheet, and the Goshen Chamber of Commerce city page (goshen.org/city-of-goshen/) supplied by Lisa.*

**STATUS: APPROVED BY LISA — 23 July 2026.**
**Managing Broker sign-off: RECEIVED — 23 July 2026.** Both flagged items — the Amish Country day-trip section in Article 1 and the 2008–2009 industry downturn paragraph in Article 6 — are approved as written. **Cleared for build.**

**Version:** v1.0 · **Phase:** 1.b (ships before DNS cutover) · **Supersedes:** all prior Goshen page drafts


> **⚠️ AS-BUILT CORRECTION — 5 August 2026 (Claude Code, at Lisa's direction).**
> This file was committed to the repo on 5 August 2026, having previously existed
> only as a Project upload — the gap Build Procedure rule 3 exists to close. Four
> defects were found and repaired on the way in. **The live page governs; this
> file is the authoring record and was reconstructed to match it.**
>
> **1. The uploaded copy was spliced, and the marker was broken.** A line reading
> `═══ PAGE CONTENT ═══` welded to the tail of the BUILD INSTRUCTION sat at line
> 50, and lines 50–73 duplicated the BUILD INSTRUCTION, the Fair Housing warning
> and the entire SEO/AEO Notes block. Because this file's own build instruction
> says *"Publish ONLY the content between the `═══ PAGE CONTENT ═══` markers,"*
> anything following it literally would have found the broken marker first and
> published the internal SEO notes, the photo-slot list and the Compliance Fix
> Log as page copy. The duplicated block is removed; the genuine marker is the
> only one remaining. No unique content was lost — the Compliance Fix Log that
> followed the duplicate is retained in full.
>
> **2. The retail business names are amended to match the live page.** This file
> predates the retail/dining ruling (evergreen pillar pages name no specific
> retail or dining businesses; landmarks and employers stay, including tenants of
> a named landmark coming out). The live page applies the ruling; this file did
> not. Amended rather than annotated, because a note does not stop a rebuild —
> restoring ten business names to an evergreen pillar page is exactly what a
> rebuild from the unamended file would have done.
>
> *What the paragraph said before amendment, preserved as record:*
> > Long-running local businesses anchor it. **The Nut Shoppe** has operated downtown for over 25 years. **Olympia Candy Kitchen** is an old-fashioned candy store attached to one of the more intact vintage diner counters left in the region. **Woldruff's Footwear** occupies a restored building. **Fables Books** deals in used books. **The Electric Brew** on East Washington Street is the long-standing coffee shop. **Found** and **Ten Thousand Villages** both sell handcrafted goods sourced internationally, **The Soapy Gnome** makes its soaps on site, and **Jules Boutique** and **Twice as Nice** cover clothing new and consigned.
>
> *And the Old Bag Factory sentence:*
> > The **Old Bag Factory** sits north of downtown: a century-old brick industrial building converted into working studios, shops, and eateries, home to Swartzendruber Hardwood Creations, John Mishler Sculpture Studio, and makers producing pottery, quilts, ironware, stained glass, and musical instruments.
>
> **3. The Compliance Fix Log below is describing a page state that no longer
> exists.** Measured against the live page on 5 August 2026: `walkab` returns
> **zero hits**; "compact downtown business district" appears **once**, in the
> opening paragraph, **not in FAQ 1**; and live FAQ 1 reads *"Its downtown — a
> 45-block National Register historic district still in daily commercial use — its
> place in the RV manufacturing corridor running through Goshen, Elkhart, and
> Middlebury, and Goshen College. Locals call it the Maple City."* — which matches
> this file's own FAQ section verbatim. Three states existed: the Fix Log's
> "walkable" original, the retraction's "compact downtown business district"
> (real text, but the retraction misattributed it to FAQ 1), and the live third
> rewrite. **Both the Fix Log and the retraction above it are historical; neither
> describes the current page.** Left in place as record, per the Changelog
> Citation Standard, rather than edited.
>
> **4. Divergence measured, not assumed.** Every sentence of this file's PAGE
> CONTENT section was compared against the live `/living-in-goshen/`: 49
> paragraphs, 8 divergent sentences, all of them the two paragraphs amended in
> item 2. An initial pass reported 16 — nine were artifacts of the check itself
> (`<strong>` tags inject a space before a comma, so `Water Tower Park, Hay Park`
> failed a verbatim match). The corrected figure is the one recorded here.
>
> Two headings appear on the live page and not in this file — "What Lisa's
> clients say" and the closing CTA. Both are site components added after this
> document was approved; this file's own Rewrite Note 11 records that no review
> was embedded, reserved for the Batch 2b rotation. Not a divergence.

**BUILD INSTRUCTION (Claude Code — mandatory):** Publish ONLY the content between the `═══ PAGE CONTENT ═══` markers. Strip the SEO/AEO Notes, the Compliance Fix Log, and the Rewrite Notes. Apply the standard locked footer partial.

⚠️ **THIS REWRITE FIXES TWO LIVE FAIR HOUSING / BRAND VIOLATIONS.** See the Compliance Fix Log below. Prioritize accordingly.

---

## SEO/AEO Notes (internal — not for publication)

- **URL:** `/living-in-goshen/` — **RENAMED from `/communities/goshen/`, 23 July 2026.** Set up a 301 redirect: old path → new path.
- **Title tag (≤60 char):** Living in Goshen, Indiana: A Guide | Lisa Collio
- **Meta description (145–160 char):** A local real estate agent's guide to Goshen, Indiana — downtown, parks, employers, schools, and ZIP codes, from someone who works this market every week.
- **Schema:** WebPage + Article + FAQPage + Place
- **hreflang pair:** `/es/viviendo-en-goshen/` — the ES page needs the same rewrite applied. Cultural adaptation per Volume 37, not a translation.
- **Primary keyword:** "living in Goshen Indiana"; secondary: "what is Goshen Indiana known for," "downtown Goshen Indiana," "Goshen Indiana community guide"
- **Phase:** reclassified from Phase 2 to **Phase 1.b** per Lisa, July 2026 — ships before DNS cutover.
- **Language:** English (`lang="en"`)
- **Required elements:** "Hablo español" banner · EN | ES toggle · locked footer stack · RE/MAX Results at equal-or-greater prominence (876 IAC 8-1-8)
- **Featured image:** Template A, 1200×630. Use `assets/images/goshen/downtown-main-street.jpg`. Overlay text exactly: **Living in Goshen, Indiana: A Local Agent's Guide to the City**. Check the four-variant rotation log.
- **Cannibalization guardrail:** This page = "what Goshen is / Lisa's authority here." `/moving-to-goshen/` = "should I move here." Cross-link once each; never target the same phrase.
- **Photo slots** (`assets/images/goshen/`, all still placeholders): `old-bag-factory.jpg`, `downtown-main-street.jpg`, `first-fridays.jpg`, `millrace-trail.jpg`, `goshen-college.jpg`, `neighborhood-street.jpg` — **note:** the Photo Shot List doc still uses `communities/goshen/` and needs updating to match
- **Review slot:** reserve one for the Batch 2b rotation. None embedded here.

---

## Compliance status — CORRECTED July 2026

**Retraction.** An earlier version of this file flagged two live violations in FAQ 1 ("walkable downtown," "being part of Elkhart County"). Lisa's screenshot of the current build shows FAQ 1 now reads "compact downtown business district." **PR 12 has evidently run.** My flag was based on a draft captured during an earlier build session, not the current build. Apologies for the false alarm.

**Still worth doing:** confirm the sweep reached *production*, not just deploy-preview-42, and confirm the known `/buyers/` instance is resolved. The Goshen–Elkhart Reference Data Sheet still says "walkable" in §3 and §5 and will keep re-seeding the term into new drafts until corrected (approved by Lisa — C2).

**"Elkhart County" usage:** approved by Lisa as plain geographic and governmental fact. Two instances retained.

**Two live items found in the current build, unrelated to this page:**

1. **Review attribution.** The landmarks article shows "Naun C." (correct) alongside "Maria Baltazar" (full name). Your standing rule is first name + last initial unless full-name consent is documented. Worth an audit across all 62 reviews before Batch 2b.
2. **Reviews currently appear on authority articles.** Per D4 you want reviews only on main pages. That's a template change, not just a content instruction — the article layout is injecting them site-wide.

---

## ⚠️ Compliance Fix Log — what this rewrite corrects on the LIVE page

| # | Live text | Problem | Fix |
|---|---|---|---|
| 1 | FAQ 1: "Goshen is known for its **walkable** downtown…" | **Live Fair Housing violation.** Ambulatory-based phrasing, banned under your locked July 2026 rule. | Rewritten as "a dense, compact downtown business district." |
| 2 | FAQ 1: "…and **being part of Elkhart County** — the center of the U.S. RV manufacturing industry." | Locked service-area rule: "Elkhart County" appears only inside the top-20% agent stat, never as a place-identity descriptor. | Rewritten to name the RV corridor by its cities instead. |

**This also means PR 12 (the fair housing sweep) did not catch every instance** — or has not been run. Instance #1 above is a second live "walkable," in addition to the known one on `/buyers/`. Recommend re-running the sweep against the whole repo with the full banned-term list before DNS cutover.

**Third, upstream:** the Goshen–Elkhart Reference Data Sheet still says "walkable" in §3 and §5. That file is the permitted factual source for all Communities content, so it will keep re-seeding the term into new drafts until it's corrected.

---

═══ PAGE CONTENT ═══

# Living in Goshen, Indiana: A Local Agent's Guide to the City

Goshen — known locally as the **Maple City** — is a city of roughly 34,000 people and the county seat, built around a dense, compact downtown business district that people actually use rather than drive past. This page is an orientation to the city itself — where things are, who employs people, what the housing looks like — from an agent who works this market every week.

If you're still deciding whether to move here, the [moving-to-Goshen guide](/moving-to-goshen/) is the better starting point. This page assumes you're already curious about the place.

## What Goshen is known for

Goshen was platted in 1831 — named for the biblical Land of Goshen — on land long inhabited by the Miami, Peoria, and Potawatomi peoples. It sits in the region known as Michiana, and together with Elkhart forms the Elkhart–Goshen Metropolitan Statistical Area. In 2017 the Indiana Chamber of Commerce named it the state's Community of the Year.

The city's layout is simple once you know it: **Main Street divides Goshen east and west; Lincoln Avenue divides it north and south.** The Elkhart River winds through, joined by Rock Run Creek, with a dam on the south side forming Goshen Dam Pond.

Three things define it now.

The first is downtown. The Goshen Historic District was added to the National Register of Historic Places in 1983, covers roughly 45 city blocks, and has the Elkhart County Courthouse at its center. Storefronts dating to the late 1800s and early 1900s are still in active commercial use. That's unusual for a city this size, and it's the thing visitors comment on first.

The second is manufacturing. The Goshen–Elkhart–Middlebury corridor produces the great majority of North America's recreational vehicles. Jayco, Keystone RV, Dutchmen Manufacturing, Thor Industries, Forest River, and Lippert Components all operate within a short drive, and that industry shapes the local economy more than any other single factor.

The third is Goshen College — a small liberal arts college known for its international programs, which brings public lectures, concerts, and a steady flow of people from elsewhere into a city that would otherwise be more insular.

## Downtown Goshen

Main Street is the spine. Independent retail sits alongside restaurants and coffee places in a tight cluster rather than spread along a strip — you can park once and cover the district, and the city maintains free public parking lots with an interactive map showing where they are.

Long-running independent businesses anchor it. The mix runs to a used bookstore, an old-fashioned candy shop attached to a vintage diner counter, a longtime coffee shop, fair-trade and handcrafted-goods retailers, a soap maker producing on site, a footwear store in a restored building, and clothing both new and consigned — a dense, independent mix rather than a chain strip.

Downtown also operates as a **Designated Outdoor Refreshment Area (DORA)**, which permits open containers from participating businesses within a defined boundary — a small thing that changes how the district feels on a summer evening.

**First Fridays** happens on the first Friday of every month, organized by Downtown Goshen, Inc. — concerts, classes, promotions, vendors, and a general reason for the whole city to be in one place. If you only get one evening in Goshen before deciding anything, make it that one.

The **Old Bag Factory** sits north of downtown: a century-old brick industrial building converted into working studios, shops, and eateries, home to furniture and sculpture studios and makers producing pottery, quilts, ironware, stained glass, and musical instruments.

## Arts, culture, and gathering places

The **Goshen Theater** at 216 S. Main Street is a restored 600-seat historic venue — originally the Jefferson Theatre in 1905 — now programming live music, theater, dance, film, and community events, and participating in First Fridays. Worth noting for anyone who needs it: the theater offers assistive listening devices, sensory backpacks, and a range of seating options at no charge. **New World Arts** and the **Goshen Art House** also produce and host downtown.

The **Goshen Historical Society** operates a museum downtown in one of the city's original store buildings — it's wheelchair accessible and typically takes about an hour. The **Goshen Public Library** runs programming year-round. The **Goshen Farmers Market** runs on a regular weekly schedule — check the market's own calendar for current days and hours. West of downtown, **Linway Plaza** on Lincoln Avenue holds a ten-screen cinema and a cluster of restaurants.

A local curiosity worth knowing: downtown still has the small police booth built during the John Dillinger era, when banks in towns like this one had reason to worry.

## Parks and outdoor spaces

Goshen runs a substantial parks system for a city its size. **Fidler Pond Park** has water, paths, and seasonal pedal boat, kayak, and canoe rentals. **Abshire Park** sits along the Elkhart River, and **Water Tower Park**, **Hay Park**, and **Mullet Park** fill in around the city. There's a skatepark, and two dog parks — **Robert L. Nelson** and **Sprocket**.

The city maintains seven parks plus a greenway system. The **Millrace** — Goshen's historic hydraulic canal, which once powered a hydroelectric plant — has a path alongside it feeding into the **Maple City Greenway**, the city's connected trail network. The **Pumpkinvine Nature Trail** is the best-known: a rail-trail on the former Pumpkin Vine Railroad corridor, starting northeast of town at Abshire Park and running toward Middlebury and Shipshewana. **Ox Bow Park**, a county park a short drive north along the river, adds trails and a disc golf course.

## Where people work

The RV industry and its supply chain employ a large share of the area, and it's the single most common reason people relocate here.

Outside that sector, **IU Health Goshen Hospital** is the area's primary hospital and one of the largest employers. **Goshen Community Schools** and **Goshen College** round out the top tier. Healthcare, education, construction, agriculture, and non-RV manufacturing fill in the rest — including **Janus Motorcycles**, which hand-builds small-displacement motorcycles in Goshen and ships them nationally.

Manufacturing here isn't only RVs. **Benteler** builds automotive components, and **Supreme**, **Independent Protection**, and **Showhauler Trucks** build custom bodies onto chassis.

**Goshen Municipal Airport** — the city calls it the Gateway of Goshen — sits about 3.5 miles southeast of downtown, serves general aviation, and coordinates rental cars and lodging for arriving travelers. For commercial flights, South Bend International is roughly 36 miles away and Fort Wayne International about 61.

## Schools

Goshen is served by **Goshen Community Schools** — nine schools, roughly 6,200 to 6,500 students. That includes Goshen High School (the RedHawks), Goshen Junior High, Goshen Intermediate, Chandler Innovation Academy, and five elementary schools. Private and parochial options exist in the area, and Goshen College serves the community at the post-secondary level.

Here's the part that catches people: **not all of Goshen is served by Goshen Community Schools.** Small portions of the city fall within Middlebury, Concord, and WaNee Community Schools. Concord Community Schools in particular reaches into a small section of northern Goshen — the same district that also reaches into southern Elkhart, since Dunlap sits between the two and the district doesn't follow city lines. A Goshen mailing address does not guarantee a Goshen Community Schools assignment, and the reverse is true in Elkhart as well.

There's also a practical wrinkle worth knowing before an offer, not after: **bus service isn't guaranteed for every address**, even within a student's assigned district. It depends on the specific route and boundary, and it changes from year to year.

Lisa does not rank schools or steer buyers toward particular attendance areas — no agent should. What she will do is confirm which district and boundary a specific address actually falls in before you write an offer, and point you to the district's own enrollment office to confirm assignment and bus eligibility directly — that confirmation should always come from the district, not from an agent or a website.

## The housing, by ZIP

Goshen covers two ZIP codes — **46526** and **46528**. They behave differently in the market, and Lisa tracks them separately.

The housing stock follows the city's growth: older homes with real character near the center, mid-century construction on larger lots further out, post-2000 subdivisions and current new construction toward the edges, and acreage beyond the city limits.

For what any of that actually costs right now — median sale price, days on market, inventory, broken out by ZIP — see the [market data page](/market-stats/). It's sourced from the local MLS and refreshed quarterly, and it's the only place on this site where price figures live, so they're never stale in one spot and current in another.

## Water, weather, and what the city has done about it

Goshen sits on the Elkhart River, and that cuts both ways. In February 2018, heavy rain and snowmelt pushed the river to a record 13.2 feet, damaging more than 300 structures and forcing evacuations. It is the single most important thing a buyer should know about geography here, and it is the reason Lisa checks the flood map on every address before a client gets attached to a house.

The city's response has been substantial: expanded stormwater management, an initiative to grow the urban tree canopy by 45%, and a solar buildout that is genuinely unusual for a city this size — 92 solar projects completed in 2019, at a per-capita solar output that year exceeding Phoenix, Sacramento, Los Angeles, San Francisco, and Denver.

## City resources worth knowing about

Three things on the City of Goshen's own site are more useful to a buyer than most people realize, and Lisa points clients to all of them:

- **The flood zone map.** Goshen sits on the Elkhart River and the Millrace. Checking a specific address before you fall in love with it is five minutes well spent.
- **Neighborhood associations.** The city maintains a list. Talking to one is the fastest way to learn what a street is actually like.
- **Community resources for newcomers.** A practical orientation to utilities, services, and getting settled.

The city also publishes a resource guide and a community calendar, and permits golf carts and off-road vehicles on certain streets under its own ordinance — which surprises people, and matters if you were planning on one.

## Why Lisa works this market

Lisa Collio has closed 120+ transactions and more than $20M in sales across Goshen and Elkhart, Indiana, placing her in the top 20% of Elkhart County agents. She is a Seniors Real Estate Specialist (SRES®) and works with buyers and sellers in both English and Spanish.

The practical value of that isn't the number. It's that she has been inside enough houses in both ZIP codes to know what a 1920s foundation in this soil tends to look like, which streets flood, and what a listing is really worth before the appraisal says so. That's the part you can't get from a search portal — and it's the thinking behind [The Next Chapter Method™](/next-chapter-method/), which starts with the life you're building and lets the house serve it.

## Frequently Asked Questions

### What is Goshen, Indiana known for?

Its downtown — a 45-block National Register historic district still in daily commercial use — its place in the RV manufacturing corridor running through Goshen, Elkhart, and Middlebury, and Goshen College. Locals call it the Maple City. → [Read the full article](/blog/community/what-is-goshen-indiana-known-for/)

### What school district serves Goshen, Indiana?

Goshen Community Schools, with nine schools including Goshen High School, Goshen Junior High, Goshen Intermediate, Chandler Innovation Academy, and its elementary schools. Note that small portions of the city fall within Middlebury, Concord, or WaNee Community Schools instead — a Goshen mailing address does not guarantee a Goshen Community Schools assignment. → [Read the full article](/blog/community/goshen-indiana-school-district/)

### What is downtown Goshen like?

A compact historic district where independent retail, restaurants, and coffee shops sit in a tight cluster rather than spread along a strip — plus the restored 600-seat Goshen Theater, the Old Bag Factory's working studios, First Fridays every month since 2007, and a Designated Outdoor Refreshment Area covering much of it. → [Read the full article](/blog/community/downtown-goshen-indiana/)

### What industries and employers are in the Goshen area?

RV manufacturing and its supply chain dominate — Jayco, Keystone, Dutchmen, Forest River, Thor, and Lippert all operate within a short drive. Beyond RVs: IU Health Goshen Hospital, Goshen Community Schools, and Goshen College, plus Benteler in automotive components, custom body builders including Supreme and Showhauler, and Janus Motorcycles, which hand-builds bikes here. → [Read the full article](/blog/community/goshen-indiana-industries-employers/)

### What landmarks and amenities does Goshen have?

The Old Bag Factory, six National Register properties including the Elkhart County Courthouse and the Goshen Carnegie Public Library, seven city parks, the Millrace and Maple City Greenway trails, the Pumpkinvine Nature Trail, and easy access to Wellfield Botanic Gardens and the Lerner Theatre in Elkhart. → [Read the full article](/blog/community/goshen-indiana-landmarks-amenities/)

## Have questions about Goshen?

Lisa is glad to talk through any part of it — neighborhoods, ZIP codes, commutes, current values, or what a specific street is actually like. No pressure, no obligation.

**[Start a conversation with Lisa →](/contact/)**

**Lisa Collio, Real Estate Agent**
RE/MAX Results, The Viruez Team
(574) 370-5410 · lisacolliorealtor@gmail.com
Serving Goshen and Elkhart, Indiana · Hablo español
REALTOR® · NAR® Member · SRES®

═══ END PAGE CONTENT ═══

---

## Rewrite Notes (internal)

**1. Two live violations fixed** — see the Compliance Fix Log above. These are the reason to move this one first.

**2. I need your existing FAQ questions 4 and 5.** I recovered questions 1–3 from our build session, but not 4 and 5. I've proposed replacements and marked them clearly. Paste me the live Q4/Q5 and I'll swap the real ones back in — the point is that the five existing articles keep their inbound links.

**3. What changed in role.** The old page and the new `/moving-to-goshen/` page were going to fight each other for the same searches. This rewrite pushes the community page toward "what Goshen is, and why Lisa's judgment about it is worth something," and hands all the "should I move here" intent to the relocation pillar. The two now cross-link once each and target different phrases.

**4. New material, from five sources.** Goshen Chamber of Commerce, the City of Goshen (goshen.in.gov), Visit Elkhart County, Goshen College's Maple City guide, and TripAdvisor. Added: the Maple City nickname, the 1831 founding, the 2017 Indiana Chamber Community of the Year award, the ~95-mile distance to Chicago, the DORA designation, free downtown parking, the Maple City Greenway, Janus Motorcycles, the Dillinger-era police booth, Farmers Market days, the Goshen Art House, the city's flood zone map and neighborhood association list, and roughly a dozen named downtown businesses. Specificity like this is what separates a page that ranks from one that doesn't — generic community pages are interchangeable, and search engines treat them that way.

**5. Evergreen filter applied, per your instruction.** Everything above is either permanent (founding date, historic district, geography), institutional (parks, library, theater, airport, employers), or annually recurring (Farmers Market days, First Fridays, the 4-H Fair). Deliberately excluded: prices and admission fees, one-off performances and workshops, seasonal promotions, anything with a specific 2026 date, and TripAdvisor's ranking order — which reshuffles constantly and currently places Walmart, Kohl's, Target, and Ross above the Old Bag Factory. TripAdvisor was useful for *discovering* places, useless as a citation.

**6. I verified the Goshen Theater separately** before naming it, since the Chamber page was last updated in January 2025 and restored theaters have a way of going quiet. It's active: 600 seats, 216 S. Main, currently programming and participating in First Fridays. The accessibility services are real and I included them deliberately — they support the commitments on your `/accessibility/` page, and almost no competitor site mentions anything like it.

**7. What I deliberately left out.** The Chamber's city description leans on "young professionals," "retirees," and "families find a friendly environment" — all protected-class framing you can't reproduce. Goshen College's guide references a retirement community by name and describes distances in walking terms. None of that made it in. I also used no Amish material on this page. (It appears in one new article, strictly as regional tourist destinations, flagged there for broker review.) And I dropped Amish Acres entirely — it closed in 2020, and the Chamber page hasn't caught up.

**8. One correction you should know about.** My earlier draft said 46526 was central/downtown and 46528 the east side. City Hall's own address is 202 S. 5th St., **46528** — which is downtown. The two ZIPs don't split as cleanly as I'd assumed, so I removed the geographic descriptions and now just name both. Your Market Stats page currently labels 46526 as "downtown Goshen" and 46528 as "Goshen's east side." That labeling is worth a look before the next quarterly refresh.

**9. Farmers Market days — resolved per Lisa, July 2026.** Sources conflicted (city site: Saturday mornings; Goshen College: Tuesdays and Saturdays). Per Lisa's instruction, no days or hours are stated anywhere; copy points readers to the market's own calendar. More evergreen, and removes a maintenance item.

**10. Maintenance.** Named local businesses go stale. Annual verification pass on this page and the two community articles, same cadence as the Reference Data Sheet.

**11. No review embedded** — reserved for the Batch 2b rotation.
