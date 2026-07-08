# Anti-spoiler Tour de France sur YouTube — extension Chrome pour Eurosport France

**Marre que les titres YouTube d'Eurosport France vous spoilent le résultat du Tour de France avant même d'avoir lancé la vidéo ?** Cette extension Chrome **gratuite** et **open source** remplace automatiquement les titres à rallonge et « putaclic » (par ex. « TOUR DE FRANCE 2026 - POGAČAR PERD LE JAUNE… ») par un titre **neutre et sans spoiler** : `Tour de France 2026 - Mercredi 8 Juillet`.

> En une phrase : **une extension Chrome qui enlève les spoilers des titres du Tour de France publiés par Eurosport France sur YouTube**, pour pouvoir regarder les résumés d'étape le soir sans connaître l'arrivée.

---

## 😤 Le problème (celui dont tout le monde se plaint)

Chaque été, la chaîne **Eurosport France** publie les résumés et temps forts du **Tour de France** sur YouTube… avec des titres qui **révèlent le résultat de l'étape directement dans le titre**, souvent EN MAJUSCULES et interminables :

> « TOUR DE FRANCE 2026 - POGAČAR PERD LE JAUNE, Pedersen écrase ses compagnons d'échappée au sprint »

Impossible d'ouvrir YouTube le soir sans se faire **spoiler l'étape** : le titre apparaît sur la page d'accueil, dans les suggestions, dans la recherche, et même dans le lecteur de la vidéo. Pour un fan de cyclisme qui a évité les résultats toute la journée, c'est rageant — et c'est une plainte **très courante** sur Reddit, Twitter/X et les forums.

## ✅ La solution

Cette extension détecte les vidéos de la chaîne **Eurosport France** dont le titre contient « Tour de France \<année\> » et remplace le titre par une version **propre et sans spoiler**.

| | Titre affiché |
|---|---|
| **Avant** ❌ | `TOUR DE FRANCE 2026 - POGAČAR PERD LE JAUNE, Pedersen écrase ses compagnons…` |
| **Après** ✅ | `Tour de France 2026 - Mercredi 8 Juillet` |

Le nettoyage s'applique **partout** où le titre pourrait vous spoiler :

- ✅ la **page d'accueil** de YouTube
- ✅ les **résultats de recherche**
- ✅ les **suggestions** (colonne de droite d'une vidéo)
- ✅ le **titre de la vidéo** que vous regardez (+ l'onglet du navigateur)
- ✅ le **titre affiché dans le lecteur** (l'overlay en haut de la vidéo)

Et la **date de publication** est ajoutée (« Mercredi 8 Juillet ») pour distinguer les étapes entre elles sans rien dévoiler.

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

### Les titres d'Eurosport sur le Tour de France sont trop longs / spoilent le résultat, comment faire ?
C'est exactement le problème que règle cette extension : elle raccourcit les titres à rallonge et masque le spoiler, sans que tu aies à changer tes habitudes.

### Est-ce que c'est gratuit ?
Oui, 100 % gratuit et **open source** (licence libre). Aucun compte, aucun achat.

### Est-ce que l'extension collecte mes données ?
Non. **Aucune donnée** n'est collectée, envoyée ou stockée. Tout se passe **localement** dans ton navigateur : l'extension ne fait que modifier le texte affiché des titres. Pas de tracking, pas de serveur, pas de permission réseau.

### Ça marche sur quels navigateurs ?
Sur **Google Chrome** et les navigateurs basés sur Chromium : **Brave, Microsoft Edge, Opera, Vivaldi**. (Firefox : non testé pour l'instant.)

### Est-ce que ça ralentit YouTube ?
Non. Le traitement est « throttlé » (limité à quelques fois par seconde maximum) et ne touche qu'au texte des titres. Aucun impact perceptible.

### Ça touche les autres chaînes YouTube ?
Non. Seule **Eurosport France** est ciblée (identifiée de façon fiable par son handle `@EurosportFrance`). La chaîne officielle « Tour de France » et les autres chaînes gardent leurs titres d'origine.

### Et si YouTube change et que ça ne marche plus ?
La détection s'appuie sur des repères stables (les liens `/watch` et le handle `/@EurosportFrance`) plutôt que sur les classes CSS, qui changent souvent. Si un titre passe malgré tout au travers, [ouvre une issue](https://github.com/Acid3croco/eurosport-tdf-titles/issues) avec une capture d'écran.

---

## 🔒 Confidentialité

Cette extension **ne collecte rien**. Pas de compte, pas d'analytics, pas de requête réseau, pas de permission d'accès à l'historique. Elle lit uniquement le texte des titres sur les pages `youtube.com` pour les réécrire à l'affichage. Le code est entièrement consultable dans ce dépôt.

## ⚙️ Personnalisation

Tout est dans `content.js`, en haut du fichier :

- `CHANNEL_HANDLES` — les handles de chaîne ciblés (par défaut `eurosportfrance`) — **signal principal**.
- `CHANNEL_NAMES` — les noms de chaîne acceptés en secours (par défaut `eurosport france`).
- `TDF_REGEX` — le motif détecté (`/Tour de France\s+(\d{4})/i`).

Tu peux l'adapter à une autre chaîne ou un autre événement en quelques secondes.

## 🛠️ Comment ça marche (technique)

- **Manifest V3**, un seul content script exécuté dans le **monde principal** (`"world": "MAIN"`) pour lire `ytInitialPlayerResponse` (la seule source fiable de la **date de publication** exacte).
- Détection **résiliente aux changements de YouTube** : on cible le lien `/watch` (le titre) et le handle `/@EurosportFrance` (la chaîne), pas les classes CSS.
- YouTube étant une **SPA**, un `MutationObserver` (throttlé ~200 ms) + l'événement `yt-navigate-finish` réappliquent le nettoyage à chaque navigation et re-rendu.

## 🤝 Contribuer

Les contributions sont les bienvenues : ouvre une [issue](https://github.com/Acid3croco/eurosport-tdf-titles/issues) ou une pull request. Idées utiles : support Firefox, page de la chaîne, autres chaînes de cyclisme, publication sur le Chrome Web Store.

---

## Mots-clés

Extension Chrome anti-spoiler · enlever spoiler Tour de France YouTube · Eurosport France titres · titre YouTube trop long Eurosport · masquer résultat étape Tour de France · résumé étape sans spoiler · cyclisme YouTube spoiler · nettoyer titres YouTube · spoiler-free Tour de France · clickbait Eurosport.

## In English

**Spoiler-free Tour de France on YouTube.** A free, open-source Chrome extension that rewrites the clickbait, result-spoiling video titles from the **Eurosport France** YouTube channel into a neutral `Tour de France <year> - <date>`, everywhere on YouTube (home, search, suggestions, watch page, player overlay). No data collected, everything runs locally. Works on Chrome and Chromium browsers (Brave, Edge, Opera, Vivaldi).
