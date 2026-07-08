// Sur YouTube, pour la chaîne « Eurosport France », remplace tout titre
// contenant « Tour de France <année> » par « Tour de France <année> » :
//   - le titre principal de la vidéo en cours (/watch), suivi de la date de
//     publication au format « Jeudi 12 Juillet » quand elle est disponible ;
//   - les vignettes (suggestions latérales, accueil, recherche), sans la date
//     (aucune date exacte n'est exposée pour une vignette).
//
// Le content script s'exécute dans le « monde principal » (voir manifest,
// "world": "MAIN") afin de pouvoir lire window.ytInitialPlayerResponse, la
// seule source fiable de la date de publication. Tout est encapsulé dans une
// IIFE pour ne rien laisser fuiter dans le scope global de la page.

(function () {
  "use strict";

  // Nom(s) de chaîne acceptés (comparaison insensible à la casse et aux espaces).
  const CHANNEL_NAMES = ["eurosport france", "eurosport"];

  // Handles acceptés (partie après @ dans /@handle), en minuscules.
  const CHANNEL_HANDLES = ["eurosportfrance"];

  // Détecte « Tour de France 2025 » (ou toute autre année sur 4 chiffres).
  const TDF_REGEX = /Tour de France\s+(\d{4})/i;

  // --- Titre principal de la vidéo en cours -----------------------------------
  const MAIN_TITLE_SEL = [
    "ytd-watch-metadata h1 yt-formatted-string",
    "ytd-video-primary-info-renderer h1.title yt-formatted-string",
  ].join(",");

  const MAIN_OWNER_SEL = [
    "ytd-watch-metadata ytd-video-owner-renderer #channel-name a",
    "ytd-watch-metadata #owner #channel-name a",
    "ytd-watch-metadata ytd-video-owner-renderer ytd-channel-name a[href]",
  ].join(",");

  // --- Vignettes / cartes vidéo -----------------------------------------------
  const CARD_SEL = [
    "ytd-video-renderer", // recherche
    "ytd-rich-item-renderer", // accueil, page de chaîne
    "ytd-grid-video-renderer", // grilles
    "ytd-compact-video-renderer", // suggestions latérales (ancien format)
    "yt-lockup-view-model", // suggestions / accueil (nouveau format)
  ].join(",");

  const TITLE_IN_CARD = [
    "#video-title",
    "a#video-title-link",
    "a.ytLockupMetadataViewModelTitle",
    ".yt-lockup-metadata-view-model-wiz__title",
    "h3 a",
  ].join(",");

  const CHANNEL_IN_CARD = [
    "ytd-channel-name a",
    "ytd-channel-name yt-formatted-string",
    "#channel-name a",
    "#channel-name",
    ".yt-content-metadata-view-model-wiz__metadata-text",
  ].join(",");

  function normalize(text) {
    return (text || "").trim().replace(/\s+/g, " ").toLowerCase();
  }

  // Renvoie « Tour de France <année> » si le texte correspond, sinon null.
  function cleanedTitleFor(text) {
    const match = (text || "").match(TDF_REGEX);
    return match ? `Tour de France ${match[1]}` : null;
  }

  // --- Date de publication ----------------------------------------------------

  function currentVideoId() {
    return new URLSearchParams(location.search).get("v");
  }

  // Date de publication de la vidéo en cours au format ISO « YYYY-MM-DD »,
  // ou null. On vérifie que les données correspondent bien à la vidéo affichée
  // (ytInitialPlayerResponse peut être périmé après une navigation SPA).
  function publishDateIso() {
    try {
      const pr = window.ytInitialPlayerResponse;
      if (!pr) return null;
      const vid = pr.videoDetails && pr.videoDetails.videoId;
      if (vid && vid !== currentVideoId()) return null;
      const r = pr.microformat && pr.microformat.playerMicroformatRenderer;
      return (r && r.publishDate) || null;
    } catch (e) {
      return null;
    }
  }

  // « 2026-07-12 » -> « Jeudi 12 Juillet » (null si non parsable).
  function formatFrenchDate(iso) {
    const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso || "");
    if (!m) return null;
    const dt = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
    if (Number.isNaN(dt.getTime())) return null;
    const s = new Intl.DateTimeFormat("fr-FR", {
      weekday: "long",
      day: "numeric",
      month: "long",
    }).format(dt);
    // Capitalise chaque mot : « jeudi 12 juillet » -> « Jeudi 12 Juillet ».
    return s.replace(/\p{L}+/gu, (w) => w[0].toUpperCase() + w.slice(1));
  }

  // --- Application ------------------------------------------------------------

  // Applique le titre nettoyé et efface les attributs qui révéleraient
  // l'original au survol (title, aria-label) sur l'élément et son lien.
  function setCleanTitle(titleEl, newTitle) {
    if (titleEl.textContent.trim() === newTitle) return; // déjà propre
    titleEl.textContent = newTitle;
    const targets = [titleEl, titleEl.closest("a"), titleEl.querySelector("a")];
    for (const el of targets) {
      if (!el) continue;
      if (el.hasAttribute("title")) el.setAttribute("title", newTitle);
      if (el.hasAttribute("aria-label")) el.setAttribute("aria-label", newTitle);
    }
  }

  function handleFromHref(href) {
    const m = /\/@([^/?#]+)/.exec(href || "");
    return m ? m[1].toLowerCase() : null;
  }

  function ownerIsEurosport() {
    const el = document.querySelector(MAIN_OWNER_SEL);
    if (!el) return false;
    if (CHANNEL_NAMES.includes(normalize(el.textContent))) return true;
    const h = handleFromHref(el.getAttribute("href"));
    return !!h && CHANNEL_HANDLES.includes(h);
  }

  function cardIsEurosport(card) {
    // 1) Nom de chaîne affiché en toutes lettres.
    for (const el of card.querySelectorAll(CHANNEL_IN_CARD)) {
      if (CHANNEL_NAMES.includes(normalize(el.textContent))) return true;
    }
    // 2) Handle dans un lien /@EurosportFrance (le plus fiable).
    for (const a of card.querySelectorAll('a[href*="/@"]')) {
      const h = handleFromHref(a.getAttribute("href"));
      if (h && CHANNEL_HANDLES.includes(h)) return true;
    }
    // 3) aria-label du type « Accéder à la chaîne Eurosport France ».
    for (const el of card.querySelectorAll("[aria-label]")) {
      const al = normalize(el.getAttribute("aria-label"));
      if (CHANNEL_NAMES.some((n) => al.endsWith(n))) return true;
    }
    return false;
  }

  function cleanAll() {
    // 1. Titre principal de la vidéo en cours (+ date de publication si dispo).
    if (location.pathname === "/watch" && ownerIsEurosport()) {
      const mainTitle = document.querySelector(MAIN_TITLE_SEL);
      if (mainTitle) {
        const base = cleanedTitleFor(mainTitle.textContent);
        if (base) {
          const date = formatFrenchDate(publishDateIso());
          const newTitle = date ? `${base} - ${date}` : base;
          setCleanTitle(mainTitle, newTitle);
          document.title = `${newTitle} - YouTube`;
        }
      }
    }

    // 2. Toutes les vignettes / cartes vidéo (année seule, sans date).
    for (const card of document.querySelectorAll(CARD_SEL)) {
      const titleEl = card.querySelector(TITLE_IN_CARD);
      if (!titleEl) continue;
      const cleaned = cleanedTitleFor(titleEl.textContent);
      if (!cleaned) continue; // pas un titre « Tour de France <année> »
      if (!cardIsEurosport(card)) continue; // pas la chaîne Eurosport France
      setCleanTitle(titleEl, cleaned);
    }
  }

  // YouTube est une SPA : le DOM change en permanence sans rechargement de page.
  // On debounce via requestAnimationFrame pour ne pas surcharger le thread.
  let pending = false;
  function schedule() {
    if (pending) return;
    pending = true;
    requestAnimationFrame(() => {
      pending = false;
      cleanAll();
    });
  }

  new MutationObserver(schedule).observe(document.documentElement, {
    childList: true,
    subtree: true,
  });

  window.addEventListener("yt-navigate-finish", schedule);
  window.addEventListener("load", schedule);
  schedule();
})();
