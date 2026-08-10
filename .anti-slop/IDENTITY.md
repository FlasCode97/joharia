# Identité — Johària

Site vitrine d'un micro-entrepreneur en Guadeloupe. Vend des sites vitrines,
de l'automatisation de tâches et un abonnement de communication mensuel à des
PME antillaises : garage, pizzeria, événementiel, conciergerie de locatifs.

**Lecteur type :** un gérant de garage aux Abymes qui ouvre le lien depuis
WhatsApp, sur un Android milieu de gamme, en 4G moyenne, entre deux voitures.
Il n'a jamais entendu le mot « API ». S'il ne comprend pas un titre, il ferme.

---

## 1. Système typographique

| Rôle | Police | Usage |
|---|---|---|
| Display | **Fraunces** | Titres, accroche, chiffres |
| Corps | **Archivo** | Texte courant, boutons, navigation |

Fraunces est une serif variable à contraste doux : elle a de la chaleur et de
la main, elle ne ressemble pas à un gabarit. Archivo est une grotesque dessinée
pour rester lisible en petit corps sur écran, avec un jeu d'accents français
complet. Les deux sont servies en local via `next/font/google` — aucune requête
externe, aucun décalage de police au chargement.

**Interdit :** Inter, Space Grotesk, Geist, Instrument Serif, Plus Jakarta Sans,
Manrope, Poppins. Space Grotesk était la police de corps de la version
précédente — c'est la première chose qui change.

---

## 2. Palette — « papier chaud, encre, une seule émeraude »

Deux zones, une coupure franche. Le hero est sombre parce que la sphère
émeraude ne se lit que sur du sombre ; tout le reste est sur papier parce que
c'est là qu'on lit. Pas de dégradé de fond sur la page, pas de fond violet,
pas de verre dépoli.

### Zone hero (sombre)

**Nommage par fonction, jamais par apparence.** Un dégradé n'a pas de fonction,
donc il n'obtient pas de token, donc il ne peut pas être posé quelque part. La
convention applique la règle à notre place — c'est plus durable qu'un rappel au
bon goût. Aucun token ne porte le mot « emerald », « paper » ou « hero ».

### Surface sombre — hero, contact, pied de page

| Token | Hex | Rôle |
|---|---|---|
| `--color-surface-inverse` | `#0A0F0C` | Fond des zones sombres |
| `--color-text-inverse` | `#F4F1E8` | Titre sur sombre |
| `--color-text-inverse-muted` | `#B8C7BE` | Texte secondaire sur sombre |
| `--color-action-inverse` | `#6EE7B7` | Liens et actions sur sombre |

### Surface claire — corps du site

| Token | Hex | Rôle |
|---|---|---|
| `--color-surface` | `#FAF7F0` | Fond de page |
| `--color-surface-raised` | `#F1EBDE` | Encarts |
| `--color-surface-pressed` | `#E8E0CF` | Survol du bouton discret |
| `--color-text` | `#16150F` | Texte courant |
| `--color-text-muted` | `#4A4A3C` | Texte secondaire |
| `--color-action` | `#0A6B4A` | Liens, boutons pleins |
| `--color-border` | `rgba(22,21,15,0.14)` | Filets de séparation |
| `--color-border-strong` | `rgba(22,21,15,0.28)` | Contour du bouton discret |

### Contrastes mesurés (WCAG AA = 4,5:1)

```
17.09:1  AAA   text / surface — corps de texte
 8.40:1  AAA   text-muted / surface — texte secondaire
15.40:1  AAA   text / surface-raised
 7.57:1  AAA   text-muted / surface-raised
 6.11:1        action / surface — liens
 5.50:1        action / surface-raised
17.11:1  AAA   text-inverse / surface-inverse — titre hero
11.00:1  AAA   text-inverse-muted / surface-inverse
12.68:1  AAA   action-inverse / surface-inverse
 6.11:1        surface / action — bouton plein
 5.83:1        #052E22 / #10B981 — texte du bouton gem
13.93:1  AAA   text / surface-pressed — bouton discret au survol
 4.98:1        action / surface-pressed
```

13 paires sur 13 conformes AA. Aucune paire du site n'est en dessous de 4,5:1.

**Piège de mesure.** Un script qui remonte au premier ancêtre opaque pour
trouver le fond se trompe sur l'en-tête : celui-ci est transparent au-dessus
du hero sombre, donc la remontée atteint le `body` clair et annonce 17:1 là où
l'œil voit 1,15:1. Toute mesure automatique doit être confirmée à l'écran.

### Cascade — contrainte structurelle

Tout CSS écrit à la main vit dans `@layer base` ou `@layer components`. En
Tailwind v4 les utilitaires sont dans `@layer utilities` ; du CSS **hors
couche** bat toute règle en couche, quelle que soit la spécificité. Un
`a { color: inherit }` non calqué écrase silencieusement chaque classe de
couleur posée sur un lien.

### Rampe de facettes du bouton gem — valeurs déclarées

Le bouton principal est la seule surface du site qui porte un dégradé, et
c'est le seul endroit où un dégradé a une fonction : il décrit une pierre
taillée, pas une décoration. La rampe est donc déclarée ici, au même titre
qu'une couleur pleine.

| Position | Hex | Rôle dans la taille |
|---|---|---|
| 0 % | `#A4F4D1` | Table, réflexion haute |
| 26 % | `#4FDDA9` | Première couronne |
| 58 % | `#22C78D` | Seconde couronne |
| 100 % | `#10B981` | Culasse — **borne sombre, non négociable** |

**Contrainte AA :** la rampe ne descend jamais sous `#10B981` derrière le
texte (`#052E22` sur `#10B981` = 5,83:1). `#065F46` donnerait 1,92:1 — échec
net. La profondeur de la pierre vient des ombres internes en bordure et de la
facette `::after`, jamais d'un assombrissement du fond sous le texte.

Aucun autre dégradé n'est autorisé sur le site.

---

## 3. Primitive de mise en page

**Bande pleine largeur, séparée par un filet, avec une étiquette en gouttière
gauche et une colonne de texte asymétrique de 62 caractères maximum.**

```
┌──────────────────────────────────────────────┐
│ ÉTIQUETTE   Titre de la bande                │
│             Texte courant sur une colonne     │
│             étroite, calée à gauche, jamais   │
│             centrée, jamais pleine largeur.   │
├──────────────────────────────────────────────┤  ← filet 1px
│ ÉTIQUETTE   Bande suivante, même structure    │
```

Sur mobile, l'étiquette passe au-dessus du titre et la colonne prend toute la
largeur. Une seule structure, répétée pour chaque section — c'est ce qui fait
lire « conçu » plutôt que « assemblé ».

**Conséquence :** pas de grille de cartes, pas de carrousel, pas d'empilement
sticky. La section projets à cartes empilées de la version précédente disparaît
avec les projets fictifs qu'elle affichait.

---

## 4. Interdits spécifiques à ce projet

- **Aucune preuve inventée.** Un seul client livré : Dylan Etonno. Pas de logos
  clients, pas de témoignage rédigé, pas de « +40 % de visibilité », pas de
  bandeau de statistiques.
- **Auto Center Services n'est pas une référence.** Refonte spéculative, jamais
  commandée, en noindex. Ne figure pas sur le site comme réalisation. La pratique
  devient un argument de vente — « je peux vous montrer une première version
  avant que vous décidiez » — sans lien public.
- **Pas de section vide.** Si une section n'a pas de contenu réel, elle n'existe
  pas. La bande photo à emplacements pointillés est supprimée.
- **Pas de jargon.** Interdits dans la copy : agent IA, SaaS, API, workflow,
  orchestration, LLM, pipeline, stack, scalable, solution, écosystème.
- **Français, registre local.** WhatsApp est le canal principal, pas le mail.

---

## 5. Motion

La scène 3D du hero est conservée — décision du client, assumée : elle prouve
un savoir-faire visuel qu'aucune phrase ne prouve, ce qui compte pour la cible
événementiel.

Elle coûte 211 Ko compressés (~800 Ko à analyser). Contreparties obligatoires :

- Le titre et le bouton WhatsApp sont en HTML statique, rendus avant la 3D
- La scène se charge après l'affichage du texte, jamais devant
- Désactivée si : `prefers-reduced-motion`, `navigator.connection.saveData`,
  `effectiveType` en `2g`/`slow-2g`, ou moins de 4 cœurs logiques
- Repli : un aplat `--hero-bg` uni. Aucune perte de lisibilité, aucun décalage

Tout le reste du mouvement décoratif est supprimé : curseur personnalisé,
molette d'intensité du fond, grain animé, boutons magnétiques.

---

## 6. Bloc de contraintes — à coller dans CLAUDE.md

```
Polices : Fraunces (display) + Archivo (corps). Jamais Inter, Space Grotesk,
Geist, Instrument Serif, Plus Jakarta Sans, Manrope, Poppins.
Couleurs : papier #FAF7F0 / encre #16150F / émeraude #0A6B4A. Hero sombre
#0A0F0C uniquement. Pas de dégradé de fond, pas de violet, pas de glassmorphism.
Primitive : bande pleine largeur + filet + étiquette en gouttière + colonne 62ch.
Pas de grille de cartes à icône, pas de séquence 1/2/3, pas de bandeau de stats.
Preuves : un seul client réel (Dylan Etonno). Rien d'autre ne peut être présenté
comme une référence. Auto Center Services n'apparaît jamais comme réalisation.
Contraste AA vérifié numériquement sur chaque paire. :hover, :focus-visible et
:active sur tout élément interactif.
```
