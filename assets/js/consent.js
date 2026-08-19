/*
 * Cookie consent banner + gated tag loader.
 *
 * Load-on-accept, not load-then-suppress: the Google tag (gtag.js, serving
 * both Analytics and Ads) and the Meta pixel are never requested from the
 * network at all until the visitor clicks Accept. Declining, or leaving the
 * banner unanswered, means zero third-party script or network activity.
 *
 * Storage distinguishes three states, and they must never collapse into
 * each other: no stored value ("no choice yet" -> show banner, load
 * nothing), {choice:"declined"} (load nothing, don't show banner again),
 * {choice:"accepted"} (load tags, don't show banner again). A cleared or
 * unreadable storage value is always treated as "no choice yet" -- never
 * defaults to accepted.
 */
(function () {
  "use strict";

  var STORAGE_KEY = "lc-cookie-consent";
  var GA_ID = "G-K02P9DZ2JL";
  var ADS_ID = "AW-10807670744";
  var META_ID = "1510998314037084";

  var lang = document.documentElement.lang === "es" ? "es" : "en";

  var COPY = {
    en: {
      text:
        'This site uses cookies to measure traffic and to show Lisa’s ads to people who have visited. You can accept or decline — declining doesn’t affect anything you came here to do. See the <a href="/privacy/">Privacy Policy</a>.',
      accept: "Accept",
      decline: "Decline",
      label: "Cookie choices"
    },
    es: {
      text:
        'Este sitio usa cookies para medir el tráfico y para mostrar los anuncios de Lisa a las personas que lo han visitado. Usted puede aceptar o rechazar — rechazar no afecta nada de lo que vino a hacer aquí. Consulte la <a href="/es/privacidad/">Política de Privacidad</a>.',
      accept: "Aceptar",
      decline: "Rechazar",
      label: "Opciones de cookies"
    }
  };

  function readConsent() {
    var raw;
    try {
      raw = window.localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null; // storage unavailable -> treat as no choice yet
    }
    if (!raw) return null;
    try {
      var parsed = JSON.parse(raw);
      if (parsed && (parsed.choice === "accepted" || parsed.choice === "declined")) {
        return parsed;
      }
    } catch (e) {
      /* fall through */
    }
    return null; // unreadable/malformed -> no choice yet, never inherit a prior decline
  }

  function writeConsent(choice) {
    var record = { choice: choice, ts: new Date().toISOString() };
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
    } catch (e) {
      /* storage unavailable: the in-memory choice still governs this page load */
    }
    return record;
  }

  function loadGoogleTag() {
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;
    gtag("js", new Date());
    // Three settings deliberately NOT enabled here -- each would send
    // visitor-identifying data to Google and make the Privacy Policy false.
    // Google Signals, "Allow user-provided data capabilities," and
    // "Manage automatic event detection" are account-dashboard toggles,
    // outside this file's reach -- confirm they stay off there too.
    gtag("config", GA_ID, { anonymize_ip: true });
    gtag("config", ADS_ID);

    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
    document.head.appendChild(s);
  }

  function loadMetaPixel() {
    window._fbq_lc = window._fbq_lc || [];
    function fbq() {
      window._fbq_lc.push(arguments);
    }
    if (!window.fbq) window.fbq = fbq;
    window.fbq("init", META_ID);
    window.fbq("track", "PageView");

    var s = document.createElement("script");
    s.async = true;
    s.src = "https://connect.facebook.net/en_US/fbevents.js";
    s.onload = function () {
      // Replay any calls queued before the real fbq loaded.
      if (window._fbq_lc && window._fbq_lc.length && typeof window.fbq === "function") {
        window._fbq_lc.forEach(function (args) {
          window.fbq.apply(null, args);
        });
      }
    };
    document.head.appendChild(s);
  }

  var tagsLoaded = false;
  function loadTags() {
    if (tagsLoaded) return;
    tagsLoaded = true;
    loadGoogleTag();
    loadMetaPixel();
  }

  function buildBanner() {
    var copy = COPY[lang];
    var banner = document.createElement("div");
    banner.id = "consent-banner";
    banner.className = "consent-banner";
    banner.setAttribute("role", "region");
    banner.setAttribute("aria-label", copy.label);
    banner.hidden = true;
    banner.innerHTML =
      '<div class="wrap consent-banner__inner">' +
      '<p class="consent-banner__text">' + copy.text + "</p>" +
      '<div class="consent-banner__actions">' +
      '<button type="button" class="consent-banner__btn" data-consent="accept">' + copy.accept + "</button>" +
      '<button type="button" class="consent-banner__btn" data-consent="decline">' + copy.decline + "</button>" +
      "</div></div>";
    var skipLink = document.querySelector(".skip-link");
    if (skipLink && skipLink.parentNode) {
      skipLink.parentNode.insertBefore(banner, skipLink.nextSibling);
    } else {
      document.body.insertBefore(banner, document.body.firstChild);
    }
    return banner;
  }

  function showBanner(returnFocusEl) {
    var banner = document.getElementById("consent-banner") || buildBanner();
    banner.hidden = false;

    var acceptBtn = banner.querySelector('[data-consent="accept"]');
    var declineBtn = banner.querySelector('[data-consent="decline"]');

    function onChoice(choice) {
      writeConsent(choice);
      banner.hidden = true;
      if (choice === "accepted") loadTags();
      var target = returnFocusEl || document.getElementById("main");
      if (target && typeof target.focus === "function") {
        if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
        target.focus();
      }
    }

    acceptBtn.addEventListener("click", function () {
      onChoice("accepted");
    });
    declineBtn.addEventListener("click", function () {
      onChoice("declined");
    });

    if (returnFocusEl) acceptBtn.focus();
  }

  function wireFooterReopenLink() {
    var link = document.querySelector("[data-consent-reopen]");
    if (!link) return;
    link.addEventListener("click", function (e) {
      e.preventDefault();
      showBanner(link);
    });
  }

  function init() {
    wireFooterReopenLink();
    var record = readConsent();
    if (record && record.choice === "accepted") {
      loadTags();
    } else if (record && record.choice === "declined") {
      // nothing to do -- declined, don't show the banner again
    } else {
      showBanner(null);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
