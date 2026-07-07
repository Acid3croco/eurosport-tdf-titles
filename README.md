# Eurosport — Titre Tour de France

Extension Chrome (Manifest V3) qui, sur YouTube, remplace les titres des vidéos
de la chaîne **Eurosport France** contenant « Tour de France \<année\> » par
simplement **« Tour de France \<année\> »**.

Ça s'applique :

- au **titre principal** de la vidéo en cours (`/watch`) — et à l'onglet — suivi
  de la **date de publication** au format « Jeudi 12 Juillet » lorsqu'elle est
  disponible ;
- aux **vignettes** : suggestions latérales, page d'accueil, résultats de
  recherche (année seule, sans date : une vignette n'expose pas de date exacte).

Les vidéos des autres chaînes (dont la chaîne officielle « Tour de France ») ne
sont **pas** modifiées : seul « Eurosport France » est ciblé.

## Note technique

Le content script s'exécute dans le **monde principal** (`"world": "MAIN"` dans
le manifest) afin de lire `ytInitialPlayerResponse`, la seule source fiable de la
date de publication exacte. Si la date n'est pas disponible (données absentes ou
d'une autre vidéo après une navigation), le titre reste « Tour de France
\<année\> » sans date : le comportement de base n'est jamais cassé.

## Installation

1. Ouvre `chrome://extensions`.
2. Active le **Mode développeur** (en haut à droite).
3. Clique **Charger l'extension non empaquetée**.
4. Sélectionne ce dossier (`eurosport-tdf-extension`).
5. Ouvre / recharge une page YouTube.

## Personnalisation

Dans `content.js` :

- `CHANNEL_NAMES` — les noms de chaîne ciblés (par défaut `eurosport france`, `eurosport`).
- `TDF_REGEX` — le motif détecté (`/Tour de France\s+(\d{4})/i`).

## Fichiers

- `manifest.json` — déclaration de l'extension et du content script.
- `content.js` — la logique (détection + réécriture, gestion SPA de YouTube).
