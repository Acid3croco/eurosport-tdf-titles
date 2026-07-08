# Eurosport — Titre Tour de France

Extension Chrome (Manifest V3) qui, sur YouTube, remplace les titres des vidéos
de la chaîne **Eurosport France** contenant « Tour de France \<année\> » par
simplement **« Tour de France \<année\> »**.

Ça s'applique :

- au **titre principal** de la vidéo en cours (`/watch`) — et à l'onglet — suivi
  de la **date de publication** au format « Jeudi 12 Juillet » lorsqu'elle est
  disponible ;
- au **titre affiché dans le lecteur** (l'overlay `.ytp-title-link` en haut de la
  vidéo), avec le même format que le titre principal ;
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

Pour résister aux changements fréquents du HTML de YouTube, la détection ne
s'appuie **pas** sur les classes CSS (qui changent souvent) mais sur des
invariants stables : le titre d'une carte est le lien vers `/watch`, et la
chaîne est identifiée par son **handle** `/@EurosportFrance`.

## Installation

### Le plus simple (depuis une release)

1. Va sur la page [Releases](https://github.com/Acid3croco/eurosport-tdf-titles/releases)
   et télécharge le fichier `eurosport-tdf-titles-vX.Y.Z.zip` de la dernière version.
2. **Décompresse** le zip (tu obtiens un dossier `eurosport-tdf-titles`).
3. Ouvre `chrome://extensions`.
4. Active le **Mode développeur** (en haut à droite).
5. Clique **Charger l'extension non empaquetée** et sélectionne le dossier décompressé.
6. Ouvre / recharge une page YouTube.

> Chrome exige le Mode développeur pour les extensions hors Chrome Web Store.
> Ne supprime pas le dossier décompressé : Chrome le lit à chaque démarrage.

### Depuis le code source (pour bidouiller)

1. Clone le dépôt : `git clone https://github.com/Acid3croco/eurosport-tdf-titles.git`
2. Suis les étapes 3 à 6 ci-dessus en sélectionnant le dossier cloné.

## Personnalisation

Dans `content.js` :

- `CHANNEL_HANDLES` — les handles ciblés (par défaut `eurosportfrance`) — signal principal.
- `CHANNEL_NAMES` — les noms de chaîne acceptés en secours (par défaut `eurosport france`).
- `TDF_REGEX` — le motif détecté (`/Tour de France\s+(\d{4})/i`).

## Fichiers

- `manifest.json` — déclaration de l'extension et du content script.
- `content.js` — la logique (détection + réécriture, gestion SPA de YouTube).
