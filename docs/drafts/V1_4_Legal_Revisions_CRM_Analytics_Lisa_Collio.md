# Legal Page Revisions — CRM Automation, Automated Messaging, Advertising & Retargeting, Embedded Forms, and Analytics

**Prepared for Lisa Collio, Real Estate Agent · August 2026**
**Version:** v1.4 — FINAL · **Status: FOR MANAGING BROKER REVIEW. No open questions. Not yet approved.**

**What this document is:** a redline against `Lisa_Collio_Legal_Pages_APPROVED_2026.docx` (English) and `V1.0 ES Legal Pages Lisa Collio.md` (Spanish). It replaces specific sections only. Every section not listed here stays exactly as approved.

**Why it is written now, for capabilities not yet in use.** Lisa is launching on the existing Netlify Forms with no automation running. GoHighLevel forms, automated follow-up, and paid advertising are planned for after the site is live. Rather than seek broker approval repeatedly, this document covers the full intended end state so one approval carries the whole plan.

**Changes in v1.1:** automated and prerecorded voice messaging added throughout; phased Netlify → GoHighLevel rollout; publication schedule; Indiana automated-calling exposure (§4.7).
**Changes in v1.2:** Google Analytics confirmed live at launch; publication schedule collapsed to a single publication.
**Changes in v1.3:** paid advertising, social pixels, and retargeting added at Lisa's direction (§1.2, new §1.7, §1.8, §3.2, §3.7, §3.8). **The bolded "no advertising cookies / nothing shared with advertising networks" promise is removed** and the "never sold" wording is qualified — see §4.11 for why. Fair Housing special-ad-category obligations added (§4.8). Cookie banner question raised (§4.9). Section numbering in Parts 1 and 3 shifted to accommodate the new advertising section.
**Changes in v1.4 — FINAL:** all four open questions decided by Lisa, 18 August 2026. Cookie consent banner **confirmed** and its build requirements written into §4.9. Pixels installed at launch, limited to **two tags** (Meta and Google) covering five platforms; TikTok and LinkedIn disclosed but not installed (§4.10). Google Signals **off** (§1.2). Part 6 now records decisions rather than asking questions. No copy in Parts 1–3 changed from v1.3.

---

## PART 0 — WHAT IS BEING AUTHORIZED

| # | Capability | Live at launch? |
| --- | --- | --- |
| 1 | Google Analytics (sets cookies), Google Signals **off** | **Yes** |
| 2 | Consent checkbox on all forms | **Yes — must ship at launch** |
| 3 | Cookie consent banner, bilingual, gating analytics and advertising | **Yes** |
| 4 | Advertising tags: **Meta pixel** (Facebook, Instagram) and **Google tag** (Search, Display, YouTube) | **Yes — at launch** |
| 5 | Retargeting — showing ads, including listings, to prior Site visitors | With the tags |
| 6 | LinkedIn and TikTok advertising | **Disclosed, not installed** — no second approval needed if added later |
| 7 | Yelp, Google Business Profile | Profile only — no code on the Site |
| 8 | Routing leads into a customer-relationship system (GoHighLevel) | After launch |
| 9 | Automated follow-up by text and email | After launch |
| 10 | Automated, prerecorded, or artificial-voice calls and voicemail | Possible future use |
| 11 | Embedded GoHighLevel forms replacing the Netlify forms | After launch |
| 12 | Web chat / AI chatbot, call recording, email open tracking | Possible future use |

**Item 2 cannot wait.** Leads captured between DNS cutover and the GoHighLevel integration will have no consent on record, and none may lawfully be enrolled in automated messaging afterward. Ship the checkbox from day one.

**Items 3 and 4 are what changed most in this version.** They alter the character of the Site's privacy posture, not just its wording. See §4.11.

---

## PART 1 — PRIVACY POLICY (`/privacy/`) — ENGLISH

### 1.1 Opening summary paragraph — REPLACE

**Currently approved:**

> …The short version: your information is used to respond to you and help with your real estate needs — it is never sold, and it isn't shared with anyone except the service providers that keep the Site and scheduling tools running.

**Replace with:**

> The Site is owned and operated by Lisa Collio, a real estate agent licensed in Indiana (License #RB21002460), affiliated with RE/MAX Results and a member of The Viruez Team. The short version: what you tell Lisa is used to respond to you and help with your real estate needs, and it is never sold for money. This Site does use analytics and advertising services that place cookies and tell those companies which pages you visited, so that Lisa's ads can reach people who have shown interest. Some privacy laws describe that as "sharing" or even as a "sale," so it is spelled out plainly below — along with how to turn it off.

---

### 1.2 "Information collected automatically" — REPLACE

**Currently approved:**

> **Information collected automatically.** The Site's hosting provider, Netlify, keeps standard server logs (IP address, browser type, pages visited) for security and performance, and Site traffic is measured through Netlify's server-side analytics. This measurement happens on the server: it does not place cookies on your device, run tracking scripts in your browser, or build profiles of individual visitors.

**Replace with:**

> **Information collected automatically.** The Site's hosting provider, Netlify, keeps standard server logs (IP address, browser type, pages visited) for security and performance.
>
> Site traffic is measured using Google Analytics. It places cookies in your browser and records how the Site is used — pages viewed, time on page, approximate location derived from IP address, device and browser type, and the website or search that brought you here. It is configured so that it does not receive your name, email address, or phone number, and your IP address is not stored in full.
>
> The Site also includes advertising tags from the platforms where Lisa advertises. These are described in "Advertising and retargeting" below.

**Build note (Claude Code):** Google Analytics configured with IP anonymization on. Google Signals may now be enabled if Lisa wants ads audiences from GA — but if it is, that is an advertising feature and §1.7 covers it. Confirm which before building.

---

### 1.3 "Information you provide" — REPLACE

**Corrected 18 August 2026 (Claude Code, at Lisa's direction):** this section was originally drafted against a stale baseline that predated the home-valuation form and its broker-approved property-address language (added July 2026). The replacement text below merges that approved content in rather than dropping it — see the build-report finding this correction resolves.

**Replace the first bullet with:**

> **Information you provide.** When you fill out a contact form, request a consultation, request a home valuation, or schedule an appointment, you may provide your name, email address, phone number, the property address you'd like valued (only if you request a home valuation), and whatever you write in your message — for example, whether you're thinking about buying or selling and your general timeline. Contact and home-valuation forms include a checkbox asking you to authorize this collection before you submit, and a separate, optional checkbox asking whether Lisa may follow up by automated message — described under "Calls and texts" below. What you submit is delivered to Lisa and stored in the customer-relationship system she uses to manage inquiries and appointments.

---

### 1.4 "How your information is used" — REPLACE THE FOLLOW-UP BULLET, ADD ONE

**Replace the third bullet with:**

> To follow up about your inquiry and to send relevant information about your home search or sale. If you have given permission on a form, some of this follow-up may be sent automatically — a scheduled series of messages, sent by software rather than composed individually. You can stop these at any time, and stopping them does not affect Lisa's ability to reply to you personally.

**Add a new bullet:**

> To show you Lisa's advertising, including listings, on the websites and apps described below, and to measure whether that advertising is working.

---

### 1.5 "Calls and texts" — REPLACE IN FULL

**Currently approved:**

> If you provide your phone number in a form, you're agreeing that Lisa may call or text you at that number about your inquiry. **Calls and texts come personally from (574) 370-5410 — no automatic dialing systems, no prerecorded or artificial voice messages.** Message and data rates from your carrier may apply. You can stop texts at any time by replying STOP, and you can ask to stop all contact by emailing lisacolliorealtor@gmail.com or calling (574) 370-5410. Providing a phone number is never a condition of buying or selling property or receiving any service.

**Replace with:**

> If you provide your phone number and check the consent box on a form, you're agreeing that Lisa may contact you at that number about your inquiry and about buying or selling a home.
>
> **Some of this contact may be automated.** Lisa uses messaging software that can send text messages on a schedule rather than one at a time, and that may also place calls or leave voicemail using an automated system or a prerecorded or artificial voice. Many messages still come personally from Lisa at (574) 370-5410 — but you should understand when you give consent that automated messages, calls, and voicemail are included.
>
> Message frequency varies depending on what you asked about. Message and data rates from your carrier may apply. **You can stop text messages at any time by replying STOP**, and reply HELP for help. You can stop automated calls and voicemail, or stop all contact, by emailing lisacolliorealtor@gmail.com or calling (574) 370-5410. Requests to stop are honored promptly.
>
> **Giving your phone number and agreeing to automated contact is never required.** It is not a condition of buying or selling property, of receiving any service, or of getting an answer to your question. You can leave the consent box unchecked and still send your message, and you can always reach Lisa directly by phone or email instead.

---

### 1.6 "Sharing" — REPLACE

**Currently approved:**

> Your personal information is not sold, rented, or traded — and it never has been. It is shared only with the service providers that operate the Site's infrastructure — website hosting and the customer-relationship and scheduling system used to manage inquiries and appointments — and only so they can perform those functions. It may also be disclosed if the law requires it, or to protect safety and legal rights. No form submission on this Site is shared with any lender, title company, or other settlement service provider.

**Replace with:**

> **Lisa does not sell your personal information for money, and never has.** It is shared in these ways and no others:
>
> - **Website hosting**, which serves the pages you view and keeps security logs.
> - **A customer-relationship and messaging system**, which stores your inquiry, schedules appointments, and sends the follow-up messages, calls, and emails described above.
> - **Analytics**, which reports how the Site is used and does not receive your name, email address, or phone number.
> - **Advertising platforms**, which receive information about your visit so Lisa's ads can be shown to people who have visited the Site. This is described fully in the next section, including how to opt out.
> - **When the law requires it**, or to protect safety and legal rights.
>
> **No form submission on this Site is shared with any lender, title company, or other settlement service provider.**

*The RESPA sentence in bold is unchanged and must stay. It is load-bearing.*

---

### 1.7 "Advertising and retargeting" — NEW SECTION

Insert after Sharing, before Cookies.

> ## Advertising and retargeting
>
> Lisa advertises her real estate services on Facebook, Instagram, YouTube, Google, LinkedIn, and TikTok. To make that work, this Site includes small pieces of code from those platforms — usually called pixels or tags. They record that a browser visited the Site and which pages it looked at, and report that back to the platform.
>
> **What this means for you.** After visiting this Site, you may later see Lisa's ads — including ads featuring homes for sale — while using those platforms or other websites. This is commonly called retargeting. The platforms use cookies and similar identifiers to recognize a browser; they are not told your name, email address, or phone number by this Site.
>
> Separately, if you have given Lisa your contact information, she may include it in an audience list she provides to an advertising platform so that her ads reach you. You can ask her to remove you from those lists at any time by emailing lisacolliorealtor@gmail.com or calling (574) 370-5410, and she will.
>
> **Housing advertising is regulated, and Lisa's ads follow those rules.** Advertising for real estate falls into a restricted category on these platforms. Targeting by age, sex, ZIP code, income and similar characteristics is not permitted for housing ads, and Lisa does not attempt to use it. This restriction exists to prevent housing discrimination, and it applies to every ad she runs.
>
> **How to opt out.**
>
> - Use your browser's cookie settings to block or delete advertising cookies.
> - Most platforms offer their own ad settings — for example, Google's at myadcenter.google.com, and the ad preference controls inside Facebook, Instagram, LinkedIn and TikTok.
> - Industry opt-out tools are available at optout.aboutads.info and optout.networkadvertising.org.
> - Many browsers and devices support a "Global Privacy Control" or similar opt-out signal. Where the law requires it to be honored, it is.
>
> Opting out of advertising does not affect your ability to contact Lisa or to receive any service.

---

### 1.8 "Cookies" — REPLACE IN FULL

**Currently approved:**

> This Site does not set tracking or advertising cookies. Traffic statistics come from Netlify's server-side analytics, which works without placing anything on your device. If you schedule a consultation, that happens through a linked scheduling system that operates under its own privacy practices — you can review them there before booking.

**Replace with:**

> This Site uses cookies — small files stored by your browser — in three categories:
>
> - **Necessary.** Cookies that make the Site and its forms work. These can't be switched off without breaking something.
> - **Analytics.** Google Analytics cookies, which count visits and show which pages are useful. These don't identify you by name.
> - **Advertising.** Cookies and similar identifiers set by the platforms described in "Advertising and retargeting" above, used to show you Lisa's ads later and to measure whether they worked.
>
> **Lisa does not sell advertising space on this Site, and no third party is permitted to use these cookies to build a profile of you for anyone other than the advertising described above.**
>
> You can control cookies through your browser settings — most browsers let you block them, delete them, or warn you before one is set. Blocking cookies may stop the forms on this Site from working, in which case you can always reach Lisa directly at (574) 370-5410 or lisacolliorealtor@gmail.com. See the previous section for advertising-specific opt-outs.
>
> If you schedule a consultation, that happens through a linked scheduling system that operates under its own privacy practices — you can review them there before booking.

---

### 1.9 "Your choices and rights" — ADD ONE PARAGRAPH

**Add after the existing first paragraph:**

> You can also stop automated text messages by replying STOP, stop automated calls and voicemail by asking at (574) 370-5410 or lisacolliorealtor@gmail.com, unsubscribe from marketing email using the link at the bottom of any such message, opt out of analytics and advertising using the controls described above, and ask to be removed from any advertising audience list. None of these affect your ability to contact Lisa or receive the services you've asked for.

---

## PART 2 — FORM CONSENT LANGUAGE

Unchanged from v1.2. Ships at launch on the existing Netlify forms.

### 2.1 English consent checkbox — NEW

Immediately above the submit button, **unchecked by default**, on every form collecting a phone number:

> ☐ Yes — Lisa Collio may contact me at the phone number and email address I've provided about buying or selling a home, **including by automated text messages, automated emails, and automated or prerecorded voice calls and voicemail**. I understand this is not required to buy or sell a home or to receive any service, that message frequency varies, that message and data rates may apply, that I can reply STOP to end texts or HELP for help, and that I can ask at any time to stop calls. See the [Privacy Policy](/privacy/) and [Terms of Use](/terms/).

### 2.2 Spanish consent checkbox — NEW

> ☐ Sí — autorizo a Lisa Collio a comunicarse conmigo al número de teléfono y al correo electrónico que proporcioné, sobre la compra o venta de una vivienda, **incluyendo mensajes de texto automatizados, correos electrónicos automatizados y llamadas o mensajes de voz automatizados o pregrabados**. Entiendo que esto no es requisito para comprar o vender una vivienda ni para recibir ningún servicio, que la frecuencia de los mensajes varía, que pueden aplicar tarifas de mensajes y datos, que puedo responder STOP para dejar de recibir mensajes de texto o HELP para obtener ayuda, y que puedo pedir en cualquier momento que se detengan las llamadas. Consulte el [Aviso de Privacidad](/es/privacidad/) y los [Términos de Uso](/es/terminos/).

**STOP and HELP stay in English** — those are the keywords carriers and the messaging platform recognize. Do not translate them.

### 2.3 Mandatory build requirements (Claude Code)

Each of these is what makes the consent legally valid.

- Unchecked by default. A pre-checked box is not consent.
- The form **submits successfully with the box unchecked**. Consent cannot be a condition of service.
- The phone field is **not required**.
- An unchecked submission is flagged and **never enrolled** in any automated sequence.
- **Consent state and an exact timestamp are stored with the submission and retained indefinitely.** Indiana's statute does not require written consent, but consent can only be *proven* if recorded. This is the entire defense if a complaint is made.
- The consent record must survive the Netlify → GoHighLevel migration. Leads imported without their flag and timestamp are not enrollable.

---

## PART 3 — AVISO DE PRIVACIDAD (`/es/privacidad/`) — SPANISH

Written natively in usted register.

### 3.1 Párrafo de resumen inicial — REEMPLAZAR

> El Sitio es propiedad y está operado por Lisa Collio, agente de bienes raíces con licencia en Indiana (Licencia #RB21002460), afiliada con RE/MAX Results y miembro de The Viruez Team. La versión corta: lo que usted le cuenta a Lisa se usa para responderle y ayudarle con sus necesidades de bienes raíces, y nunca se vende por dinero. Este Sitio sí usa servicios de análisis y de publicidad que colocan cookies y que informan a esas empresas qué páginas visitó usted, para que los anuncios de Lisa puedan llegar a las personas que han mostrado interés. Algunas leyes de privacidad describen eso como "compartir" o incluso como una "venta", así que aquí se explica con claridad — junto con cómo desactivarlo.

### 3.2 "Información recopilada automáticamente" — REEMPLAZAR

> **Información recopilada automáticamente.** El proveedor de hosting del Sitio, Netlify, mantiene registros de servidor estándar (dirección IP, tipo de navegador, páginas visitadas) por razones de seguridad y desempeño.
>
> El tráfico del Sitio se mide con Google Analytics. Este coloca cookies en su navegador y registra cómo se usa el Sitio: páginas vistas, tiempo en cada página, ubicación aproximada derivada de la dirección IP, tipo de dispositivo y navegador, y el sitio web o la búsqueda que le trajo aquí. Está configurado de manera que no recibe su nombre, su correo electrónico ni su número de teléfono, y su dirección IP no se almacena completa.
>
> El Sitio también incluye etiquetas publicitarias de las plataformas donde Lisa anuncia. Se describen en la sección "Publicidad y remercadeo" más abajo.

### 3.3 "Información que usted proporciona" — REEMPLAZAR

**Corregido el 18 de agosto de 2026 (Claude Code, a instrucción de Lisa):** esta sección se redactó originalmente contra una base desactualizada, anterior al formulario de valuación de vivienda y a su lenguaje de dirección de propiedad, aprobado por el broker en julio de 2026. El texto de reemplazo a continuación incorpora ese contenido aprobado en lugar de eliminarlo — véase el hallazgo del informe de construcción que esta corrección resuelve.

> **Información que usted proporciona.** Cuando llena un formulario de contacto, solicita una consulta, pide una valuación de su vivienda o programa una cita, puede proporcionar su nombre, dirección de correo electrónico, número de teléfono, la dirección de la propiedad que desea valuar (solo si solicita una valuación) y lo que escriba en su mensaje — por ejemplo, si está pensando en comprar o vender, y su plazo aproximado. Los formularios de contacto y de valuación incluyen una casilla que le pide autorizar esta recopilación antes de enviar, y una casilla adicional y opcional que pregunta si Lisa puede darle seguimiento por mensajes automatizados — descrita más abajo en "Llamadas y mensajes de texto." Lo que usted envía se entrega a Lisa y se guarda en el sistema de gestión de relaciones con clientes que ella usa para manejar consultas y citas.

### 3.4 "Cómo se usa su información" — REEMPLAZAR EL TERCER PUNTO Y AGREGAR UNO

> - Para darle seguimiento sobre su consulta y enviarle información relevante sobre su búsqueda o venta de vivienda. Si usted dio su permiso en un formulario, parte de este seguimiento puede enviarse de forma automatizada — una serie programada de mensajes, enviados por un software en lugar de redactarse uno por uno. Usted puede detenerlos en cualquier momento, y detenerlos no afecta la capacidad de Lisa de responderle personalmente.
> - Para mostrarle la publicidad de Lisa, incluyendo propiedades en venta, en los sitios web y las aplicaciones que se describen más abajo, y para medir si esa publicidad está funcionando.

### 3.5 "Llamadas y mensajes de texto" — REEMPLAZAR COMPLETO

> Si usted proporciona su número de teléfono y marca la casilla de consentimiento en un formulario, está aceptando que Lisa pueda comunicarse con usted a ese número sobre su consulta y sobre la compra o venta de una vivienda.
>
> **Parte de este contacto puede ser automatizado.** Lisa usa un software de mensajería que puede enviar mensajes de texto según un calendario, en lugar de uno por uno, y que también puede realizar llamadas o dejar mensajes de voz mediante un sistema automatizado o con voz pregrabada o artificial. Muchos mensajes siguen viniendo personalmente de Lisa al (574) 370-5410 — pero al dar su consentimiento usted debe entender que se incluyen mensajes, llamadas y buzones de voz automatizados.
>
> La frecuencia de los mensajes varía según lo que usted haya consultado. Pueden aplicar tarifas de mensajes y datos de su compañía telefónica. **Puede detener los mensajes de texto en cualquier momento respondiendo STOP**, y responder HELP para obtener ayuda. Puede detener las llamadas y los mensajes de voz automatizados, o detener todo contacto, escribiendo a lisacolliorealtor@gmail.com o llamando al (574) 370-5410. Las solicitudes para detener el contacto se atienden de inmediato.
>
> **Dar su número de teléfono y aceptar el contacto automatizado nunca es obligatorio.** No es condición para comprar o vender una propiedad, ni para recibir ningún servicio, ni para obtener respuesta a su pregunta. Puede dejar la casilla sin marcar y enviar su mensaje de todos modos, y siempre puede comunicarse con Lisa directamente por teléfono o correo electrónico.

### 3.6 "Compartir información" — REEMPLAZAR

> **Lisa no vende su información personal por dinero, y nunca lo ha hecho.** Se comparte únicamente de estas maneras:
>
> - **Hosting del sitio web**, que entrega las páginas que usted ve y mantiene registros de seguridad.
> - **Un sistema de gestión de relaciones con clientes y de mensajería**, que guarda su consulta, programa citas y envía los mensajes, llamadas y correos de seguimiento descritos arriba.
> - **Análisis de tráfico**, que reporta cómo se usa el Sitio y no recibe su nombre, su correo electrónico ni su número de teléfono.
> - **Plataformas de publicidad**, que reciben información sobre su visita para que los anuncios de Lisa puedan mostrarse a las personas que han visitado el Sitio. Esto se explica por completo en la siguiente sección, incluyendo cómo desactivarlo.
> - **Cuando la ley lo requiere**, o para proteger la seguridad y los derechos legales.
>
> **Ningún envío de formulario en este Sitio se comparte con ningún prestamista, compañía de títulos u otro proveedor de servicios de cierre.**

### 3.7 "Publicidad y remercadeo" — SECCIÓN NUEVA

> ## Publicidad y remercadeo
>
> Lisa anuncia sus servicios de bienes raíces en Facebook, Instagram, YouTube, Google, LinkedIn y TikTok. Para que eso funcione, este Sitio incluye pequeños fragmentos de código de esas plataformas — comúnmente llamados píxeles o etiquetas. Estos registran que un navegador visitó el Sitio y qué páginas vio, y lo reportan a la plataforma.
>
> **Qué significa esto para usted.** Después de visitar este Sitio, es posible que más adelante vea anuncios de Lisa — incluyendo anuncios de casas en venta — mientras usa esas plataformas u otros sitios web. Esto se conoce comúnmente como remercadeo o retargeting. Las plataformas usan cookies e identificadores similares para reconocer un navegador; este Sitio no les da su nombre, su correo electrónico ni su número de teléfono.
>
> Por separado, si usted le ha dado sus datos de contacto a Lisa, ella puede incluirlos en una lista de audiencia que entrega a una plataforma de publicidad para que sus anuncios le lleguen. Usted puede pedir que la eliminen de esas listas en cualquier momento escribiendo a lisacolliorealtor@gmail.com o llamando al (574) 370-5410, y así se hará.
>
> **La publicidad de vivienda está regulada, y los anuncios de Lisa cumplen esas reglas.** La publicidad de bienes raíces pertenece a una categoría restringida en estas plataformas. No se permite segmentar anuncios de vivienda por edad, sexo, código postal, ingresos ni características similares, y Lisa no intenta hacerlo. Esta restricción existe para prevenir la discriminación en la vivienda, y aplica a cada anuncio que ella publica.
>
> **Cómo desactivarlo.**
>
> - Use la configuración de cookies de su navegador para bloquear o borrar las cookies de publicidad.
> - La mayoría de las plataformas ofrecen sus propios controles de anuncios — por ejemplo, Google en myadcenter.google.com, y los controles de preferencias de anuncios dentro de Facebook, Instagram, LinkedIn y TikTok.
> - Existen herramientas de la industria en optout.aboutads.info y optout.networkadvertising.org.
> - Muchos navegadores y dispositivos permiten una señal de "Global Privacy Control" u opción similar. Donde la ley exige respetarla, se respeta.
>
> Desactivar la publicidad no afecta su capacidad de comunicarse con Lisa ni de recibir ningún servicio.

### 3.8 "Cookies" — REEMPLAZAR COMPLETO

> Este Sitio usa cookies — pequeños archivos que su navegador guarda — en tres categorías:
>
> - **Necesarias.** Cookies que hacen funcionar el Sitio y sus formularios. No se pueden desactivar sin romper algo.
> - **De análisis.** Cookies de Google Analytics, que cuentan las visitas y muestran qué páginas son útiles. No lo identifican a usted por nombre.
> - **De publicidad.** Cookies e identificadores similares colocados por las plataformas descritas en "Publicidad y remercadeo", usados para mostrarle después los anuncios de Lisa y medir si funcionaron.
>
> **Lisa no vende espacio publicitario en este Sitio, y ningún tercero tiene permiso de usar estas cookies para construir un perfil suyo para nadie más que la publicidad descrita arriba.**
>
> Usted puede controlar las cookies desde la configuración de su navegador — la mayoría permite bloquearlas, borrarlas o avisarle antes de colocar una. Bloquear las cookies puede impedir que los formularios de este Sitio funcionen; en ese caso, siempre puede comunicarse con Lisa directamente al (574) 370-5410 o a lisacolliorealtor@gmail.com. Consulte la sección anterior para las opciones específicas de publicidad.
>
> Si usted programa una consulta, eso ocurre a través de un sistema de programación externo que opera bajo sus propias prácticas de privacidad — puede revisarlas antes de reservar.

### 3.9 "Sus opciones y derechos" — AGREGAR UN PÁRRAFO

> También puede detener los mensajes de texto automatizados respondiendo STOP, detener las llamadas y mensajes de voz automatizados llamando al (574) 370-5410 o escribiendo a lisacolliorealtor@gmail.com, cancelar la suscripción al correo de mercadeo con el enlace al final de cualquiera de esos mensajes, desactivar el análisis y la publicidad con los controles descritos arriba, y pedir que lo eliminen de cualquier lista de audiencia publicitaria. Ninguna de estas acciones afecta su capacidad de comunicarse con Lisa ni de recibir los servicios que usted ha solicitado.

---

## PART 4 — CONSEQUENCES THE BROKER SHOULD SEE

### 4.1 Accessibility Statement — RISK, DEFERRED WITH THE FORMS

The approved Accessibility Statement commits the Site to WCAG 2.1 Level AA. Embedded third-party forms commonly fail AA. Because the GoHighLevel forms are deferred, this risk does not exist at launch — it becomes live at changeover. Test with a keyboard alone and with a screen reader before the embedded forms replace the Netlify forms. If they fail, remediate or revise the statement honestly.

### 4.2 Content Security Policy — WIDENED IN STAGES

The current CSP permits no third-party scripts. Google Analytics requires it opened at launch. Each advertising pixel requires another host. The GoHighLevel embed requires a further widening later. Claude Code must derive exact domains from the live snippets rather than guessing, and name specific hosts rather than using a wildcard. **Six pixels plus analytics is a real page-weight and Core Web Vitals cost** — measure before and after.

### 4.3 Forms — PHASED

- **At launch:** the four existing Netlify forms (`lead-capture`, `contacto-es`, `home-valuation`, `valor-vivienda-es`), confirmed working 18 August 2026, plus the new consent checkbox. Bilingual thank-you pages remain in use.
- **After launch:** GoHighLevel forms replace them. One system of record, not two.
- **At changeover:** consent flags and timestamps migrate with the leads, thank-you behaviour is re-tested, and §4.1 is completed first.

### 4.4 One-language-per-page rule

Two separate GoHighLevel forms will be required, with all labels, error messages, validation text, and confirmations in the page's language. GoHighLevel's defaults are English and must be overridden.

### 4.5 Automated message content is advertising

Every automated text, email, call, and voicemail is real estate advertising, subject to the same rules as the Site: IREC brokerage disclosure, Fair Housing language, no interest-rate references (RESPA), approved identity block. **Approving this document does not approve the messages.** Templates need their own broker review.

### 4.6 Do-not-call obligations

Automated calling brings DNC scrubbing into scope — national registry and Indiana's own list. Form consent is a defense, but honoring stop requests promptly and maintaining a suppression list sits with Lisa regardless of what the platform automates.

### 4.7 Indiana automated-calling exposure — FOR COUNSEL

Automated voice into Indiana numbers sits under two regimes. Federal TCPA covers autodialed and prerecorded calls and texts to cell phones. Indiana adds IC 24-5-14, which permits an automatic dialing-announcing device only where the subscriber has knowingly or voluntarily consented, or where a live operator obtains consent immediately before the recording plays. The statute does not say "written," but consent can only be proven if documented with a timestamp.

State violations are actionable by the Indiana Attorney General as a deceptive act, with civil penalties reported up to $10,000 for a first violation and up to $25,000 for subsequent ones, applied per call. The federal TCPA separately carries a private right of action at $500–$1,500 per violating call or text.

Ringless voicemail is the highest-risk feature in this package: a recipient who did not consent receives a durable artifact they can attach to a complaint.

**Before voice features are switched on — not before this document is approved — brokerage counsel should confirm the consent flow satisfies both IC 24-5-14 and the TCPA.**

### 4.8 Fair Housing and the housing advertising category — THE BIGGEST ITEM IN v1.3

Real estate advertising is a restricted category on every platform Lisa named. This is not a platform preference; it descends from HUD's 2022 Fair Housing settlement with Meta.

**What the restrictions do.** Housing ads must be declared in the special category. Targeting by age, sex, ZIP code, income and similar characteristics is removed. Radius targeting carries a minimum (15 miles on Meta), which is wider than Goshen-to-Elkhart. Audience exclusion is disabled entirely. Google applies comparable restrictions to housing under its personalized-advertising policy.

**What is still permitted, and is what Lisa asked for.** Custom audiences built from her own data — Site visitors captured by her pixel, uploaded client lists, video viewers, page engagers — remain available inside the housing category. **Retargeting prior Site visitors with listings is allowed.**

**What is not permitted.** Lookalike audiences have never been allowed in the housing category. The "Special Ad Audience" substitute was discontinued in October 2023 with no replacement. Current-dated marketing advice still recommends Special Ad Audiences; that advice is stale and should not be followed.

**Two obligations that are Lisa's, not the platform's.**
1. Declaring the housing category is her responsibility on every campaign. Meta now detects real-estate imagery and applies restrictions automatically, and attempting to avoid the category counts as evasion.
2. Even where a platform permits a custom audience, *how she builds it* is her Fair Housing exposure. An uploaded client list that skews along a protected characteristic, used to target housing ads, is a steering problem regardless of what the platform allowed her to upload.

**Recommendation:** ad campaign setup and audience construction should be reviewed alongside creative in the same broker pass as §4.5, and the Fair Housing rules already locked for Site copy apply verbatim to ad creative — no "walkable," no "quiet," no "desirable," no coded qualitative terms.

### 4.9 Cookie consent banner — CONFIRMED, WITH BUILD REQUIREMENTS

**Decision (Lisa, 18 August 2026): build it.** At launch the Site moves from zero trackers to analytics plus two advertising tags. Advertising cookies are the category privacy frameworks treat most strictly, and a banner is far cheaper to build once now than to retrofit after a complaint.

These are requirements, not preferences. Each one is load-bearing for a different reason.

1. **It must actually gate the tags.** Analytics and advertising scripts do not load until the visitor chooses. A banner that fires the pixels and then displays a notice is decorative and provides no protection — it is worse than no banner, because it claims a choice that was never offered. Only strictly necessary cookies may load before a decision.
2. **Reject must be as easy as accept.** Two buttons of equal prominence at the same level. No "manage preferences" maze standing between the visitor and declining.
3. **Bilingual.** A Spanish page shows a Spanish banner; an English page shows an English one. This follows the locked one-language-per-page rule — a Spanish banner on an English page, or the reverse, is a compliance defect, not a cosmetic one.
4. **Accessible.** The Site publicly commits to WCAG 2.1 Level AA. The banner must be reachable and operable by keyboard alone, must not trap focus, must return focus sensibly on dismissal, must meet contrast requirements, and must be announced to screen readers. An inaccessible consent banner is the worst possible place to fail an accessibility commitment, because it sits between the visitor and the entire site.
5. **The choice persists** across pages and visits, and the visitor can change it later — a persistent link in the footer legal group is sufficient.
6. **The choice is recorded** with a timestamp, in the same spirit as the form consent record (§2.3).
7. **No cookie wall.** The Site remains fully usable if advertising and analytics are declined.

**Banner copy — English:**

> This site uses cookies to measure traffic and to show Lisa's ads to people who have visited. You can accept or decline — declining doesn't affect anything you came here to do. See the [Privacy Policy](/privacy/).
> **[Accept] [Decline]**

**Banner copy — Spanish (native usted register, not translated):**

> Este sitio usa cookies para medir el tráfico y para mostrar los anuncios de Lisa a las personas que lo han visitado. Usted puede aceptar o rechazar — rechazar no afecta nada de lo que vino a hacer aquí. Consulte el [Aviso de Privacidad](/es/privacidad/).
> **[Aceptar] [Rechazar]**

### 4.10 Social profiles are not the same as pixels

Google Business Profile, Yelp, and a LinkedIn or TikTok profile page put no code on the Site and raise no privacy question here. Only the **advertising pixels** do. Yelp in particular should be treated as a listing/review presence only. If any of these platforms are later used only as profiles and never as ad channels, their pixels should not be installed.

### 4.11 What changed in the Site's privacy posture, and why the wording moved

The approved policy contained two absolute promises that cannot survive advertising pixels:

- *"This Site does not set tracking or advertising cookies"* — **removed.** It becomes false the moment a pixel is installed.
- *"Your personal information is not sold, rented, or traded"* — **qualified to "not sold for money."** No money changes hands in pixel-based advertising, but several state privacy frameworks define "sale" or "sharing" broadly enough to cover it. Saying "never sold" without qualification would be defensible in ordinary English and arguable under those definitions; saying "never sold for money" and then disclosing the advertising plainly is accurate under both.

**This is a genuine trade, and the broker should see it named.** A no-tracking, no-cookies privacy policy was an unusual trust asset for an agent site. It is being exchanged for retargeting capability. The exchange is defensible — the ads don't work without the pixels — but it is an exchange, not an addition, and the drafting above is written to keep as much of the trust posture as honesty allows.

---

## PART 5 — PUBLICATION SCHEDULE

**Single publication. Every section publishes together, at launch.**

At launch: Google Analytics is running, so §1.2 and §1.8 are accurate from day one. The consent checkbox is on all four Netlify forms, so every lead has consent and a timestamp. The automated-messaging language in §1.5 is live *before* any consent is collected under it — consent gathered under the old paragraph, which promised no automated contact, would not support automated messaging later.

The advertising language in §1.7 / §3.7 should publish at launch **if the pixels are installed at launch**. If pixel installation is deferred, §1.7 and the advertising bullet in §1.8 must be held back until the day they go live, and the sections must not claim advertising cookies are set before they are.

No automation is sending at launch. The policy says contact "may" be automated — the permission exists, the switch is off.

Privacy Policy and Aviso de Privacidad effective dates set to the publication date and **matched across both languages.** Already an open item in §I of the Pre-Launch Punch List.

---

## PART 6 — DECISIONS RECORDED (Lisa, 18 August 2026)

All four questions from v1.3 are closed. Nothing in this document is open.

1. **Pixels at launch.** Retargeting audiences need history; a tag installed later cannot reach earlier visitors, and launch week is the highest-traffic period the Site will have for some time. The banner gates them properly, so early installation carries no privacy cost.
2. **Cookie consent banner: yes.** Requirements in §4.9.
3. **Two tags, six platforms disclosed.** Facebook and Instagram share one Meta pixel; Google Search, Display, and YouTube share one Google tag. TikTok and LinkedIn are **named in §1.7 / §3.7 but not installed** — LinkedIn is priced for B2B and converts poorly for residential real estate, and TikTok's tag is only worth carrying against actual paid campaigns. Because the disclosure already covers them, adding either later needs no further broker approval. Yelp and Google Business Profile are profile-only and put no code on the Site.
4. **Google Signals: off.** It mainly buys cross-device remarketing audiences and demographic reporting. The remarketing audiences come from the Google Ads tag directly, and the demographic reporting has no compliant use for a housing advertiser who cannot target on those characteristics — collecting it creates a record with no legitimate application.

**Net effect on the build:** three third-party scripts (Google tag serving both Analytics and Ads, Meta pixel, and the banner's own logic) rather than seven. Materially better for Core Web Vitals on mobile, and a much smaller CSP surface.

---

## SIGN-OFF

- [ ] **Lisa Collio** — reviewed and approved
- [ ] **Managing Broker, RE/MAX Results / The Viruez Team** — advertising and legal content approved
- [ ] **Managing Broker** — Fair Housing review of ad targeting and audience practices (§4.8)
- [ ] **Brokerage counsel** — automated-voice consent flow reviewed against IC 24-5-14 and the TCPA (§4.7). *Required before voice features are enabled, not before this document is approved.*
- [ ] Effective dates set on both language versions, matched
- [ ] Build authorized

**Nothing in this document is approved copy until the boxes above are checked. Do not build from this file in its draft state.**
