# PR #89 — full meta-description audit

*Lisa Collio, Real Estate Agent · 2 August 2026 · Claude Code*

**Report only. Nothing changed.** Merge commit `d4ef3d8`, merged **Thursday
30 July 2026, 00:00:18 −0400**, base `main`. 52 files, 51 meta descriptions
rewritten.

## Summary

| | |
|---|---|
| Meta descriptions rewritten | **51** |
| Carrying a phone number afterwards | **19** (14 EN, 5 ES) |
| Carrying one beforehand | **9** |
| **Newly gained a phone number** | **10** |
| Had their phone phrasing changed | **9** |
| Lost a phone number | **0** |
| Outside the 145–160 band afterwards | **0** — all 51 land 145–158 |
| Locked-identity or Fair Housing violations | **0** |

## The phrasings

**Before** — four different forms across nine descriptions:

| Count | Form |
|---|---|
| 5 | `Call (574) 370-5410` |
| 2 | `Llame al (574) 370-5410` |
| 1 | `Lisa Collio, (574) 370-5410` |
| 1 | `Llame o texto: (574) 370-5410` |

**After** — two forms, consistently applied:

| Count | Form |
|---|---|
| 14 | `Call or text (574) 370-5410.` |
| 5 | `Llame o escriba al (574) 370-5410.` |

**The convention is internally consistent.** Every English description that
carries the number uses one form and every Spanish one uses the other, with no
exceptions across the 51. `Llame o texto` — a literal calque — was retired.

Note the ES form here (`Llame o escriba al`) is **not** the form CLAUDE.md
records for on-page CTAs (`Llame o mande un mensaje de texto`). That is a
deliberate split recorded in the punch list: the shorter form exists because the
CTA phrasing costs 35 characters and would not fit the 145–160 band. It is a
divergence between two field classes, which is worth knowing given the standing
field-class rule.

## Compliance scan — all 51 new strings

Scanned for REALTOR® without the mark, leading with the designation, "Northern
Indiana" as a service-area descriptor, the superseded phone number, `REMAX`,
"Alford", the brand name without its comma, superlatives (`best`, `#1`,
`top-rated`, `premier`, `leading`, `most trusted`, `mejor agente`, `la mejor`),
and every term in `content/source/fair-housing-terms.txt` in both languages.

**Zero flags.**

## Every change, before → after


### 1. `/about/`  📞

> **Before** (154)     
> Meet Lisa Collio, Real Estate Agent in Goshen and Elkhart, Indiana — 120+ families served, $20M+ in closed sales, and full service in English and Spanish.

> **After** (145) 📞  
> Meet Lisa Collio, Real Estate Agent in Goshen and Elkhart, Indiana — 120+ families served and $20M+ in closed sales. Call or text (574) 370-5410.

### 2. `/blog/buyers/are-homes-goshen-indiana-competitive-to-buy/`  📞

> **Before** (157) 📞  
> How competitive is the Goshen, Indiana housing market? What drives multiple offers, and how to compete — from Lisa Collio, Real Estate Agent. (574) 370-5410.

> **After** (156) 📞  
> How competitive is the Goshen, Indiana housing market? What drives multiple offers, and how to compete when inventory is tight. Call or text (574) 370-5410.

### 3. `/blog/buyers/good-time-to-buy-home-goshen-indiana/`  📞

> **Before** (158) 📞  
> Wondering if now is a good time to buy a home in Goshen, Indiana? Lisa Collio explains what actually matters — timing, finances, and fit. Call (574) 370-5410.

> **After** (156) 📞  
> Wondering if now is a good time to buy a home in Goshen, Indiana? Lisa Collio on what actually matters — timing, finances, fit. Call or text (574) 370-5410.

### 4. `/blog/buyers/how-to-compete-with-other-buyers-elkhart-indiana/`  📞

> **Before** (147) 📞  
> Losing out on homes in Elkhart, Indiana? How to build a competitive offer and move fast — from Lisa Collio, Real Estate Agent. Call (574) 370-5410.

> **After** (155) 📞  
> Losing out on homes in Elkhart, Indiana? How to build a competitive offer and move fast — from Lisa Collio, Real Estate Agent. Call or text (574) 370-5410.

### 5. `/blog/buyers/what-to-prioritize-buying-house-goshen-indiana/`  📞

> **Before** (155) 📞  
> Not sure what matters most when buying a house in Goshen, Indiana? Lisa Collio breaks down the real priorities — beyond the listing photos. (574) 370-5410.

> **After** (158) 📞  
> Not sure what matters most when buying a house in Goshen, Indiana? Lisa Collio on the real priorities, beyond the listing photos. Call or text (574) 370-5410.

### 6. `/blog/buyers/why-buy-home-elkhart-indiana-lisa-collio/`  📞

> **Before** (154) 📞  
> Buying a home in Elkhart, Indiana? Lisa Collio offers bilingual, step-by-step guidance for buyers — from first search to closing day. Call (574) 370-5410.

> **After** (145) 📞  
> Buying a home in Elkhart, Indiana? Lisa Collio offers bilingual, step-by-step guidance from first search to closing. Call or text (574) 370-5410.

### 7. `/blog/community/community-events-in-goshen-indiana/`    

> **Before** (166)     
> What happens in Goshen, Indiana through the year — First Fridays, the Farmers Market, the Elkhart County 4-H Fair, and the events that fill the calendar between them.

> **After** (146)     
> What happens in Goshen, Indiana through the year — First Fridays, the Farmers Market, the 4-H Fair, and the events that fill the calendar between.

### 8. `/blog/community/cost-of-living-in-elkhart-indiana/`    

> **Before** (124)     
> What it actually costs to live in Elkhart, Indiana — housing, property taxes, utilities, and what current market data shows.

> **After** (145)     
> What it actually costs to live in Elkhart, Indiana — housing, property taxes, utilities, groceries, and what the current local market data shows.

### 9. `/blog/community/downtown-elkhart-indiana/`    

> **Before** (140)     
> A guide to downtown Elkhart, Indiana — the Lerner Theatre, Civic Plaza, DORA, the Farmers Market, and the district's ongoing revitalization.

> **After** (147)     
> A guide to downtown Elkhart, Indiana — the Lerner Theatre, Civic Plaza, DORA, the Farmers Market, and the district's ongoing revitalisation effort.

### 10. `/blog/community/downtown-goshen-indiana/`    

> **Before** (127)     
> A guide to downtown Goshen, Indiana — the Goshen Theater, the Old Bag Factory, First Fridays, and the district's historic core.

> **After** (146)     
> A guide to downtown Goshen, Indiana — the Goshen Theater, the Old Bag Factory, First Fridays, and the historic core still in daily commercial use.

### 11. `/blog/community/elkhart-indiana-location-nearby-cities/`    

> **Before** (141)     
> Where is Elkhart, Indiana located? Just east of South Bend and Mishawaka, near the Indiana–Michigan state line, about 25 minutes from Goshen.

> **After** (152)     
> Where is Elkhart, Indiana? Just east of South Bend and Mishawaka, near the Indiana-Michigan line, about 25 minutes from Goshen and 2 hours from Chicago.

### 12. `/blog/community/elkhart-indiana-school-districts/`    

> **Before** (168)     
> The three public school districts serving Elkhart, Indiana — Elkhart Community Schools, Concord, and Baugo — and how to confirm which one applies to a specific address.

> **After** (147)     
> The three districts serving Elkhart, Indiana — Elkhart Community Schools, Concord, and Baugo — and how to confirm which one covers a given address.

### 13. `/blog/community/goshen-indiana-industries-employers/`    

> **Before** (131)     
> The major industries and employers in Goshen, Indiana — RV manufacturing, healthcare, education, and the diversification beyond it.

> **After** (146)     
> The major industries and employers in Goshen, Indiana — RV manufacturing, healthcare, education, and the quieter diversification beyond all three.

### 14. `/blog/community/goshen-indiana-landmarks-amenities/`    

> **Before** (140)     
> The landmarks, trails, and parks that define Goshen, Indiana — the Old Bag Factory, the Pumpkinvine Trail, and the city's historic district.

> **After** (151)     
> The landmarks, trails, and parks that define Goshen, Indiana — the Old Bag Factory, the Pumpkinvine Trail, and the 45-block historic district downtown.

### 15. `/blog/community/goshen-indiana-school-district/`    

> **Before** (133)     
> Goshen Community Schools and the district boundaries that cross into Middlebury, Concord, and WaNee — what to confirm before you buy.

> **After** (145)     
> Goshen Community Schools, and the district boundaries that cross into Middlebury, Concord, and WaNee — what to confirm before you write an offer.

### 16. `/blog/community/moving-to-elkhart-indiana-from-out-of-state/`    

> **Before** (131)     
> A step-by-step timeline for relocating to Elkhart, Indiana from another state — financing, house hunting, closing, and settling in.

> **After** (147)     
> A step-by-step timeline for relocating to Elkhart, Indiana from another state — financing, house hunting, closing, and settling in once you arrive.

### 17. `/blog/community/things-to-do-in-elkhart-indiana/`    

> **Before** (143)     
> A local real estate agent's guide to things to do in Elkhart, Indiana — downtown, Wellfield Botanic Gardens, museums, parks, and the Riverwalk.

> **After** (151)     
> A local real estate agent's guide to things to do in Elkhart, Indiana — downtown, Wellfield Botanic Gardens, the museums, the parks, and the Riverwalk.

### 18. `/blog/community/what-is-elkhart-indiana-known-for/`    

> **Before** (134)     
> Why Elkhart, Indiana is called the RV Capital of the World — plus its lesser-known history in musical instruments and pharmaceuticals.

> **After** (150)     
> Why Elkhart, Indiana is called the RV Capital of the World — plus its lesser-known history in musical instruments, pharmaceuticals, and the railroads.

### 19. `/blog/community/what-is-goshen-indiana-known-for/`    

> **Before** (113)     
> Why Goshen, Indiana is called the Maple City — its historic downtown, RV manufacturing roots, and Goshen College.

> **After** (149)     
> Why Goshen, Indiana is called the Maple City — its 45-block historic downtown, its place in the RV manufacturing corridor, and Goshen College nearby.

### 20. `/blog/community/what-makes-lisa-collio-different/`  📞

> **Before** (158) 📞  
> What makes Lisa Collio different from other agents in Goshen and Elkhart, Indiana? Clear communication, local strategy, and bilingual service. (574) 370-5410.

> **After** (151) 📞  
> What makes Lisa Collio different from other agents in Goshen and Elkhart, Indiana? Clear communication and local strategy. Call or text (574) 370-5410.

### 21. `/blog/relocation/`    

> **Before** (162)     
> Articles for people relocating to Goshen and Elkhart, Indiana from Lisa Collio, Real Estate Agent — timelines, industry context, and what to know before you move.

> **After** (152)     
> Articles for people relocating to Goshen and Elkhart, Indiana from Lisa Collio, Real Estate Agent — timelines, industry context, and what to know first.

### 22. `/blog/relocation/moving-to-goshen-indiana-from-out-of-state/`    

> **Before** (163)     
> A step-by-step timeline for moving to Goshen, Indiana from another state — what to do first, what to do on a scouting visit, and the steps people get out of order.

> **After** (155)     
> A step-by-step timeline for moving to Goshen, Indiana from another state — what to do first, what to do on a scouting visit, and the steps people misorder.

### 23. `/blog/sellers/good-time-to-sell-home-elkhart-indiana/`  📞

> **Before** (158) 📞  
> Thinking about selling your home in Elkhart, Indiana? Lisa Collio explains what decides good timing — your equity, your goals, and local data. (574) 370-5410.

> **After** (151) 📞  
> Is now a good time to sell your home in Elkhart, Indiana? What the season, your own timeline, and local data actually say. Call or text (574) 370-5410.

### 24. `/blog/sellers/how-much-is-my-home-elkhart-indiana-worth/`  📞

> **Before** (154) 📞  
> Wondering how much your Elkhart, Indiana home is worth? Lisa Collio explains what actually drives value — beyond the online estimate. Call (574) 370-5410.

> **After** (152) 📞  
> What is my Elkhart, Indiana home worth? Why a local agent's pricing analysis beats an automated online estimate every time. Call or text (574) 370-5410.

### 25. `/blog/sellers/mistakes-to-avoid-selling-home-goshen-indiana/`  📞

> **Before** (152) 📞  
> Selling a home in Goshen, Indiana? Avoid the mistakes that cost sellers money — overpricing, weak photos, and skipped prep. Lisa Collio, (574) 370-5410.

> **After** (147) 📞  
> The mistakes that cost Goshen, Indiana sellers money — pricing, timing, and prep — and how to avoid every one of them. Call or text (574) 370-5410.

### 26. `/blog/sellers/why-sell-home-elkhart-indiana-lisa-collio/`  📞

> **Before** (159) 📞  
> Selling your home in Elkhart, Indiana? Lisa Collio brings strategic pricing, professional marketing, and communication you never have to chase. (574) 370-5410.

> **After** (152) 📞  
> Selling a home in Elkhart, Indiana? Lisa Collio chases down every detail so you get real answers instead of waiting around. Call or text (574) 370-5410.

### 27. `/blog/spanish/comprar-casa-antigua-goshen-indiana/`    

> **Before** (166)     
> Goshen tiene muchas casas antiguas con verdadero carácter. Qué revisar primero — electricidad, calefacción, techo, ventanas y drenaje del cimiento — antes de ofertar.

> **After** (152)     
> Goshen tiene muchas casas antiguas con carácter. Qué revisar primero — electricidad, calefacción, techo, ventanas y drenaje — antes de hacer una oferta.

### 28. `/blog/spanish/costo-de-vida-goshen-indiana/`    

> **Before** (166)     
> Lo que de verdad cuesta vivir en Goshen, Indiana — vivienda, impuestos a la propiedad, servicios y transporte, más los gastos que la gente que llega suele subestimar.

> **After** (148)     
> Lo que de verdad cuesta vivir en Goshen, Indiana — vivienda, impuestos, servicios y transporte, más los gastos que quienes llegan suelen subestimar.

### 29. `/blog/spanish/eventos-comunitarios-goshen-indiana/`    

> **Before** (165)     
> Lo que pasa en Goshen, Indiana a lo largo del año — First Fridays, el mercado de agricultores, la feria 4-H del condado de Elkhart y todo lo que llena el calendario.

> **After** (147)     
> Lo que pasa en Goshen, Indiana a lo largo del año — First Fridays, el mercado de agricultores, la feria 4-H y lo que llena el resto del calendario.

### 30. `/blog/spanish/industria-rv-comprar-casa-goshen-indiana/`    

> **Before** (170)     
> ¿Se muda a Goshen, Indiana por un trabajo en la industria RV? Qué significan el pago por producción, la ubicación de la planta y el ciclo de la industria al comprar casa.

> **After** (156)     
> ¿Se muda a Goshen por un trabajo en la industria RV? Qué significan el pago por producción, la ubicación de la planta y el ciclo de la industria al comprar.

### 31. `/blog/spanish/mudarse-a-goshen-desde-otro-estado/`    

> **Before** (174)     
> Una guía paso a paso para mudarse a Goshen, Indiana desde otro estado — qué hacer primero, cómo aprovechar la visita de exploración y los pasos que la gente hace en desorden.

> **After** (148)     
> Guía paso a paso para mudarse a Goshen, Indiana desde otro estado — qué hacer primero, cómo aprovechar la visita de exploración y el orden correcto.

### 32. `/blog/spanish/que-hacer-en-goshen-indiana/`    

> **Before** (161)     
> La guía de una agente local sobre qué hacer en Goshen, Indiana — el centro histórico, el Old Bag Factory, el Goshen Theater, parques, senderos y paseos cercanos.

> **After** (152)     
> La guía de una agente local sobre qué hacer en Goshen, Indiana — el centro histórico, el Old Bag Factory, el Goshen Theater, los parques y los senderos.

### 33. `/contact/thank-you/`    

> **Before** (130)     
> Thank you — your message has reached Lisa Collio, Real Estate Agent in Goshen and Elkhart, Indiana. She'll be in touch personally.

> **After** (151)     
> Thank you — your message has reached Lisa Collio, Real Estate Agent in Goshen and Elkhart, Indiana. She will be in touch with you personally, and soon.

### 34. `/disclaimers/`    

> **Before** (169)     
> Disclaimers for lisacolliorealtor.com — the general-information, school, third-party, and market-data disclaimers covering the website of Lisa Collio, Real Estate Agent.

> **After** (147)     
> Disclaimers for lisacolliorealtor.com — the general-information, school-district, third-party, and market-data notices covering this whole website.

### 35. `/es/accesibilidad/`    

> **Before** (187)     
> Declaración de accesibilidad de lisacolliorealtor.com, construido con la meta de cumplir con WCAG 2.1 Nivel AA. Si alguna parte del sitio le resulta difícil de usar, comuníquese con Lisa.

> **After** (152)     
> Declaración de accesibilidad de lisacolliorealtor.com, con la meta de cumplir WCAG 2.1 Nivel AA. Si algo del sitio le resulta difícil de usar, avísenos.

### 36. `/es/compradores/`  📞

> **Before** (152) 📞  
> Comprar una casa en Goshen y Elkhart, Indiana, con acompañamiento en español: educación clara, sin presión y paso a paso. Llame o texto: (574) 370-5410.

> **After** (152) 📞  
> Comprar casa en Goshen y Elkhart, Indiana, con acompañamiento en español: educación clara, sin presión y paso a paso. Llame o escriba al (574) 370-5410.

### 37. `/es/contacto/gracias/`    

> **Before** (139)     
> Gracias — su mensaje llegó a Lisa Collio, agente de bienes raíces en Goshen y Elkhart, Indiana. Ella se comunicará con usted personalmente.

> **After** (152)     
> Gracias — su mensaje llegó a Lisa Collio, agente de bienes raíces en Goshen y Elkhart, Indiana. Ella se comunicará con usted personalmente y muy pronto.

### 38. `/es/disclaimers/`    

> **Before** (171)     
> Descargos de responsabilidad del sitio web de Lisa Collio — información general, no es asesoría profesional, e información sobre distritos escolares y enlaces de terceros.

> **After** (150)     
> Descargos de responsabilidad del sitio de Lisa Collio — información general, no es asesoría profesional, y notas sobre distritos escolares y terceros.

### 39. `/es/estadisticas-del-mercado/`  📞

> **Before** (154)     
> Precios actuales de casas, días en el mercado, y datos de ventas en Goshen y Elkhart, Indiana — con información del MLS local, actualizada cada trimestre.

> **After** (150) 📞  
> Precios de casas, días en el mercado y datos de ventas en Goshen y Elkhart, Indiana, del MLS local, cada trimestre. Llame o escriba al (574) 370-5410.

### 40. `/es/fuentes/`    

> **Before** (167)     
> Las fuentes usadas para investigar y escribir el contenido de comunidad y área en lisacolliorealtor.com, organizadas por la página o artículo que cada fuente respalda.

> **After** (148)     
> Las fuentes usadas para investigar el contenido de comunidad y área en lisacolliorealtor.com, organizadas por la página o el artículo que respaldan.

### 41. `/es/`  📞

> **Before** (148) 📞  
> Lisa Collio, Agente de Bienes Raíces en Goshen y Elkhart, Indiana. Acompañamiento en español para comprar o vender su casa. Llame al (574) 370-5410.

> **After** (158) 📞  
> Lisa Collio, Agente de Bienes Raíces en Goshen y Elkhart, Indiana. Acompañamiento en español para comprar o vender su casa. Llame o escriba al (574) 370-5410.

### 42. `/es/mudarse-a-elkhart/`    

> **Before** (161)     
> Cómo es realmente vivir en Elkhart, Indiana — el trabajo, las escuelas, las casas, los costos y lo que nadie le dice — explicado en español por una agente local.

> **After** (148)     
> Cómo es vivir en Elkhart, Indiana — el trabajo, las escuelas, las casas y los costos — explicado en español por una agente que trabaja este mercado.

### 43. `/es/terminos/`    

> **Before** (164)     
> Términos de uso de lisacolliorealtor.com. Información general sobre comprar y vender casa en Goshen y Elkhart, Indiana — no constituye asesoría legal ni financiera.

> **After** (152)     
> Términos de uso de lisacolliorealtor.com. Información general sobre comprar y vender casa en Goshen y Elkhart, Indiana — no es asesoría legal ni fiscal.

### 44. `/es/tu-proximo-capitulo/`  📞

> **Before** (152)     
> Tu Próximo Capítulo™ es la manera en que Lisa Collio ayuda a las familias de Goshen y Elkhart a tomar decisiones de vivienda con claridad y sin presión.

> **After** (152) 📞  
> Tu Próximo Capítulo™ es la manera en que Lisa Collio ayuda a las familias de Goshen y Elkhart a decidir con claridad. Llame o escriba al (574) 370-5410.

### 45. `/es/vendedores/`  📞

> **Before** (157) 📞  
> Venda su casa en Goshen y Elkhart, Indiana, con Lisa Collio: precio estratégico, presentación profesional y mercadeo en dos idiomas. Llame al (574) 370-5410.

> **After** (150) 📞  
> Venda su casa en Goshen y Elkhart, Indiana: precio estratégico, presentación profesional y mercadeo en dos idiomas. Llame o escriba al (574) 370-5410.

### 46. `/es/vivienda-justa/`    

> **Before** (172)     
> Declaración de vivienda justa: servicio profesional igualitario para todos, conforme a la Ley Federal de Vivienda Justa, la ley de Indiana y el Código de Ética de REALTOR®.

> **After** (149)     
> Declaración de vivienda justa: servicio profesional igualitario, conforme a la Ley Federal de Vivienda Justa, la ley de Indiana y el Código de Ética.

### 47. `/es/viviendo-en-elkhart/`    

> **Before** (124)     
> La guía de una agente local sobre Elkhart, Indiana — el centro, los parques, los museos y la historia, explicada en español.

> **After** (148)     
> La guía de una agente local sobre Elkhart, Indiana — el centro, los parques, los museos y la historia de la ciudad, explicada en español para usted.

### 48. `/living-in-elkhart/`    

> **Before** (141)     
> A local real estate agent's guide to Elkhart, Indiana — downtown, parks, museums, and history, from someone who works this market every week.

> **After** (153)     
> A local real estate agent's guide to Elkhart, Indiana — downtown, the rivers and parks, the museums, and the history, from someone who works this market.

### 49. `/market-stats/`  📞

> **Before** (160)     
> Current home prices, days on market, and sales data for Goshen and Elkhart, Indiana — sourced from the Elkhart County Board of REALTORS® MLS, updated quarterly.

> **After** (145) 📞  
> Home prices, days on market, and sales data for Goshen and Elkhart, Indiana — from the local MLS, updated quarterly. Call or text (574) 370-5410.

### 50. `/next-chapter-method/`  📞

> **Before** (155)     
> The Next Chapter Method™ is how Lisa Collio helps Goshen and Elkhart, Indiana clients make real estate decisions that fit their life — not just the market.

> **After** (153) 📞  
> The Next Chapter Method™ is how Lisa Collio helps clients in Goshen and Elkhart, Indiana make decisions that fit their life. Call or text (574) 370-5410.

### 51. `/sellers/`  📞

> **Before** (157) 📞  
> Selling your home in Goshen or Elkhart, Indiana? Lisa Collio brings strategy-first pricing, professional marketing, and two buyer pools. Call (574) 370-5410.

> **After** (155) 📞  
> Selling in Goshen or Elkhart, Indiana? Lisa Collio brings strategy-first pricing, professional marketing, and two buyer pools. Call or text (574) 370-5410.


---

**📞 marks a description carrying the phone number.** Ten gained one in this PR;
nine had one already and had it renormalised; the other 32 carry none, which is
the recorded scope decision — high-intent pages only, not the authority articles.

