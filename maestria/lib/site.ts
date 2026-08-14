/** Coordonnées et références réelles du site.
 *  Seul endroit à modifier pour changer un contact.
 */

export const site = {
  name: "Johària",

  /** Numéro au format international, sans + ni espaces, pour wa.me.
   *  0691260627 → on retire le 0 initial et on préfixe l'indicatif 590. */
  whatsapp: "590691260627",

  /** Le même numéro, tel qu'on l'écrit en Guadeloupe. */
  telephoneAffiche: "0691 26 06 27",

  email: "flasonmathis@gmail.com",

  zone: "Guadeloupe",
} as const;

/** Messages pré-remplis : le prospect n'a plus qu'à appuyer sur envoyer.
 *  Un message par point d'entrée — le contexte du clic est conservé, ce qui
 *  évite de redemander « vous venez pour quoi ? » au premier échange. */
const lien = (message: string) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;

export const whatsappUrl = lien(
  "Bonjour, je vous écris depuis votre site. Voici mon activité : "
);

export const whatsappAutomatisation = lien(
  "Bonjour, je vous écris depuis votre site. La tâche qui me prend le plus de temps, c'est : "
);

export const whatsappFacturation = lien(
  "Bonjour, je vous écris depuis votre site au sujet des factures électroniques. Mon activité : "
);

export const mailtoUrl = `mailto:${site.email}`;

/** Les sites livrés et payés. Rien d'autre ne figure comme réalisation :
 *  Auto Center Services reste une maquette non commandée, jamais publiée. */
export const CAPTURE_L = 390;
export const CAPTURE_H = 844;

export const realisations = [
  {
    slug: "domaine-de-richard",
    nom: "Domaine de Richard",
    quoi: "deux bungalows à Saint-Louis, Marie-Galante",
    url: "https://domaine-de-richard.pages.dev",
    livraison: "le 8 août 2026",
    capture: "/realisations/domaine-de-richard.webp",
    // Ce qui est vérifiable en ouvrant le lien, rien de plus.
    contenu: [
      "Les deux logements, avec leur prix à la nuit, ce qu'il y a dedans, et pour combien de personnes.",
      "Les horaires d'arrivée et de départ, le stationnement, la piscine.",
      "Un bouton qui ouvre WhatsApp pour réserver, le téléphone, et le plan pour venir.",
    ],
    apport:
      "Tout ce qu'on lui demandait au téléphone est maintenant sur la page. Il n'a plus à répéter les mêmes informations à chaque personne qui appelle.",
  },
  {
    slug: "dylan-etonno",
    nom: "Dylan Etonno",
    quoi: "graphiste, monteur vidéo et community manager",
    url: "https://dylan-etonno.pages.dev",
    livraison: "le 5 août 2026",
    capture: "/realisations/dylan-etonno.webp",
    contenu: [
      "Ses travaux, ses catalogues et ses œuvres, sur une seule page.",
      "Deux publications de 26 et 14 pages, des réalisations pour la Médiathèque du Lamentin et Cyber-Corsaire.",
      "Le contact en bas, sans formulaire compliqué.",
    ],
    apport:
      "Son travail vivait dans des fichiers. Il tient maintenant dans un lien qu'il envoie à un recruteur.",
  },
] as const;

/** Tarifs — PROPOSITION à valider par Mat.
 *
 *  Raisonnement : une automatisation type demande une vingtaine d'heures de
 *  travail réel, livrée en trois semaines. Face au calcul de la page — un
 *  artisan qui perd 130 h par an à 35 €/h, soit 4 550 € — l'installation est
 *  remboursée en moins de quatre mois. Assez haut pour que le travail soit
 *  payé, assez bas pour décider un patron de TPE sans réunion.
 *
 *  Ces deux nombres sont le seul endroit à changer. */
export const tarifs = {
  installation: 1200,
  mensuel: 70,
  delai: "trois semaines",
} as const;

/** Réforme de la facturation électronique — faits vérifiés le 9 août 2026 sur
 *  impots.gouv.fr et economie.gouv.fr, confirmés par le décret n° 2026-677 et
 *  l'arrêté du 27 juillet 2026.
 *
 *  Précisions qui comptent et qu'on ne peut pas raccourcir n'importe comment :
 *  - le critère légal est l'assujetti ÉTABLI en France ; la Guadeloupe est dans
 *    le champ, la Guyane et Mayotte n'y sont pas (TVA non applicable, art. 294-1
 *    du CGI). Le site s'adressant à la Guadeloupe, l'échéance concerne bien ses
 *    lecteurs — mais on écrit « en Guadeloupe », jamais « toute entreprise ».
 *  - en 2026 l'obligation porte sur la RÉCEPTION seulement. L'ÉMISSION arrive en
 *    septembre 2027 pour les TPE/PME. Ne pas mélanger les deux.
 *  - le terme officiel est « plateforme agréée » depuis le décret du 27/07/2026
 *    (il remplace « PDP »).
 */
export const facturation = {
  dateReception: "1er septembre 2026",
  dateEmissionTpe: "1er septembre 2027",
  source: "https://www.impots.gouv.fr/professionnel/questions/partir-de-quand-suis-je-concerne-par-la-reforme-de-la-facturation",
} as const;
