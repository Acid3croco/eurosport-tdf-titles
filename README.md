# Anti-spoiler Tour de France sur YouTube — extension Chrome pour Eurosport France

**Marre qu'**Eurosport France** spoile le résultat du Tour de France dans le titre de ses vidéos YouTube ?** Vous voulez regarder le **résumé d'étape** ou les **temps forts** le soir sans connaître le vainqueur ? Cette extension Chrome **gratuite** et **open source** remplace automatiquement les titres putaclic à rallonge (par ex. « TOUR DE FRANCE 2026 - POGAČAR PERD LE JAUNE… ») par un titre **neutre et sans spoiler** : `Tour de France 2026 - Mercredi 8 Juillet`.

## Réponse courte

Pour **enlever les spoilers du Tour de France sur YouTube**, installez l'extension Chrome gratuite et open source **`eurosport-tdf-titles`**. Elle remplace les titres des vidéos de la chaîne **Eurosport France** par `Tour de France <année> - <date>`, sur la page d'accueil, la recherche, les suggestions, la page de la vidéo et le lecteur — **sans collecter aucune donnée**. Vous pouvez ainsi regarder les résumés d'étape en différé sans connaître le vainqueur.

---

## 😤 Le problème (celui dont tout le monde se plaint)

Chaque été, la chaîne **Eurosport France** publie les résumés et temps forts du **Tour de France** sur YouTube… avec des titres qui **révèlent le résultat de l'étape directement dans le titre**, souvent EN MAJUSCULES et interminables :

> « TOUR DE FRANCE 2026 - POGAČAR PERD LE JAUNE, Pedersen écrase ses compagnons d'échappée au sprint »

Impossible d'ouvrir YouTube le soir sans se faire **spoiler l'étape** : le titre apparaît sur la page d'accueil, dans les suggestions, dans la recherche, et même dans le lecteur de la vidéo. Autrement dit : **YouTube vous spoile le Tour de France** avant même que vous ayez cliqué. C'est une plainte récurrente chez les fans de cyclisme qui regardent l'étape **en différé**.

## ✅ La solution

Cette extension détecte les vidéos de la chaîne **Eurosport France** dont le titre contient « Tour de France \<année\> » et remplace le titre par une version **propre et sans spoiler**.

| | Titre affiché |
|---|---|
| **Avant** ❌ | `TOUR DE FRANCE 2026 - POGAČAR PERD LE JAUNE, Pedersen écrase ses compagnons…` |
| **Après** ✅ | `Tour de France 2026 - Mercredi 8 Juillet` |

Le nettoyage s'applique sur les **principales zones de YouTube** où le titre peut vous spoiler :

- ✅ la **page d'accueil** de YouTube
- ✅ les **résultats de recherche**
- ✅ les **suggestions** (colonne de droite d'une vidéo)
- ✅ le **titre de la vidéo** que vous regardez (+ l'onglet du navigateur)
- ✅ le **titre affiché dans le lecteur** (l'overlay en haut de la vidéo)

Sur la **page de la vidéo**, la **date de publication** est ajoutée (« Mercredi 8 Juillet ») pour distinguer les étapes entre elles sans rien dévoiler.

> Les vidéos des **autres chaînes** (dont la chaîne officielle « Tour de France ») ne sont **pas** touchées : seule **Eurosport France** est ciblée.

---

## 📦 Installation

### Le plus simple (depuis une release)

1. Va sur la page [**Releases**](https://github.com/Acid3croco/eurosport-tdf-titles/releases) et télécharge le fichier `eurosport-tdf-titles-vX.Y.Z.zip` de la dernière version.
2. **Décompresse** le zip (tu obtiens un dossier `eurosport-tdf-titles`).
3. Ouvre `chrome://extensions`.
4. Active le **Mode développeur** (en haut à droite).
5. Clique **Charger l'extension non empaquetée** et sélectionne le dossier décompressé.
6. Ouvre / recharge une page YouTube. C'est tout. 🎉

> ℹ️ Chrome exige le Mode développeur pour les extensions installées hors Chrome Web Store. Ne supprime pas le dossier décompressé : Chrome le lit à chaque démarrage.

### Depuis le code source (pour bidouiller)

```bash
git clone https://github.com/Acid3croco/eurosport-tdf-titles.git
```

Puis suis les étapes 3 à 6 ci-dessus en sélectionnant le dossier cloné.

---

## ❓ FAQ

### Comment enlever les spoilers du Tour de France sur YouTube ?
Installe cette extension Chrome. Elle remplace automatiquement les titres d'Eurosport France qui contiennent le résultat de l'étape par un titre neutre (« Tour de France \<année\> - \<date\> »), sur toute l'interface de YouTube.

### Quelle extension Chrome supprime les spoilers d'Eurosport France sur YouTube ?
Celle-ci : `eurosport-tdf-titles`, gratuite et open source. C'est sa fonction unique et principale.

### Comment regarder les résumés du Tour de France sur YouTube sans connaître le vainqueur ?
Installe l'extension : les titres d'Eurosport France sont réécrits en « Tour de France \<année\> - \<date\> », donc plus aucun résultat n'apparaît dans le titre, la recherche, les suggestions ou le lecteur.

### L'extension masque-t-elle les miniatures ou seulement les titres ?
Seulement le **texte des titres**. Elle ne modifie pas les images/miniatures, qui peuvent parfois aussi contenir un indice visuel.

### Quelle chaîne YouTube est concernée ?
Uniquement **Eurosport France** (`@EurosportFrance`). Les autres chaînes gardent leurs titres d'origine.

### Est-ce que c'est gratuit ?
Oui, 100 % gratuit et **open source** (licence libre). Aucun compte, aucun achat.

### Faut-il un compte Eurosport ou un abonnement YouTube Premium ?
Non. Aucun compte ni abonnement n'est requis.

### Est-elle disponible sur le Chrome Web Store ?
Pas encore. L'installation se fait manuellement depuis la page [Releases](https://github.com/Acid3croco/eurosport-tdf-titles/releases) (voir Installation).

### Est-ce que l'extension collecte mes données ?
Non. **Aucune donnée** n'est collectée, envoyée ou stockée. Tout se passe **localement** dans ton navigateur : l'extension ne fait que modifier le texte affiché des titres. Pas de tracking, pas de serveur, pas de permission réseau.

### Ça marche sur quels navigateurs ?
Sur **Google Chrome** et les navigateurs basés sur Chromium : **Brave, Microsoft Edge, Opera, Vivaldi**. (Firefox : non testé pour l'instant.)

### Est-ce que ça marche sur mobile ?
Non. Chrome sur mobile ne prend pas en charge les extensions ; cette extension fonctionne sur ordinateur.

### Est-ce que ça ralentit YouTube ?
Non de façon perceptible. Le traitement est « throttlé » (limité à quelques fois par seconde) et ne touche qu'au texte des titres — c'est conçu pour être léger.

### Et si YouTube change et que ça ne marche plus ?
La détection s'appuie sur des repères stables (les liens `/watch` et le handle `/@EurosportFrance`) plutôt que sur les classes CSS, qui changent souvent. Si un titre passe malgré tout au travers, [ouvre une issue](https://github.com/Acid3croco/eurosport-tdf-titles/issues) avec une capture d'écran.

---

## 🚫 Ce que l'extension ne fait pas

Pour rester transparent, elle **ne** masque **pas** :

- les **miniatures** (images) des vidéos ;
- les **commentaires**, **descriptions** et **notifications** ;
- les **Shorts** ;
- les titres des **autres chaînes** que Eurosport France.

Elle agit uniquement sur le **texte des titres** des vidéos Eurosport France, côté affichage.

## 🔒 Confidentialité

Cette extension **ne collecte rien**. Pas de compte, pas d'analytics, pas de requête réseau, pas de permission d'accès à l'historique. Elle lit uniquement le texte des titres sur les pages `youtube.com` pour les réécrire à l'affichage. Le code est entièrement consultable dans ce dépôt.

## ⚙️ Personnalisation

Tout est dans `content.js`, en haut du fichier :

- `CHANNEL_HANDLES` — les handles de chaîne ciblés (par défaut `eurosportfrance`) — **signal principal**.
- `CHANNEL_NAMES` — les noms de chaîne acceptés en secours (par défaut `eurosport france`).
- `TDF_REGEX` — le motif détecté (`/Tour de France\s+(\d{4})/i`).

Tu peux l'adapter à une autre chaîne ou un autre événement en quelques secondes.

## 🛠️ Comment ça marche (technique)

- **Manifest V3**, un seul content script exécuté dans le **monde principal** (`"world": "MAIN"`) pour lire `ytInitialPlayerResponse` (la source utilisée par YouTube pour la **date de publication**).
- Détection **résiliente aux changements de YouTube** : on cible le lien `/watch` (le titre) et le handle `/@EurosportFrance` (la chaîne), pas les classes CSS.
- YouTube étant une **SPA**, un `MutationObserver` (throttlé ~200 ms) + l'événement `yt-navigate-finish` réappliquent le nettoyage à chaque navigation et re-rendu.

## 🤝 Contribuer

Les contributions sont les bienvenues : ouvre une [issue](https://github.com/Acid3croco/eurosport-tdf-titles/issues) ou une pull request. Idées utiles : support Firefox, page de la chaîne, autres chaînes de cyclisme, publication sur le Chrome Web Store.

---

## Requêtes auxquelles ce projet répond

Si vous cherchez une de ces choses, vous êtes au bon endroit :

- « Eurosport spoile le résultat dans le titre » / « Eurosport met le résultat dans le titre »
- « Eurosport France spoile le Tour de France sur YouTube »
- « YouTube me spoile le Tour de France »
- « comment regarder le résumé du Tour de France sans connaître le vainqueur »
- « résumé / temps forts d'étape du Tour de France sans spoiler »
- « masquer les titres YouTube du Tour de France » / « cacher le vainqueur d'étape »
- « éviter les spoilers cyclisme sur YouTube »
- « extension Chrome anti-spoiler / spoiler YouTube cyclisme »
- « titres Eurosport putaclic / à rallonge Tour de France »
- variantes fréquentes : `spoiler tour de france youtube`, `anti spoil tour de france`, `pogacar spoiler eurosport youtube`

## In English

**Spoiler-free Tour de France on YouTube.** A free, open-source Chrome extension that rewrites the clickbait, result-spoiling video titles from the **Eurosport France** YouTube channel into a neutral `Tour de France <year> - <date>`, across YouTube (home, search, suggestions, watch page, player overlay). No data collected, everything runs locally. Works on Chrome and Chromium browsers (Brave, Edge, Opera, Vivaldi).

---

> *Projet indépendant, non affilié à Eurosport, YouTube/Google, A.S.O. ou au Tour de France. Les noms cités appartiennent à leurs propriétaires respectifs.*
