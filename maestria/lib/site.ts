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

/** La seule réalisation livrée et payée à ce jour. */
export const dylan = {
  name: "Dylan Etonno",
  metier: "graphiste, monteur vidéo et community manager",
  url: "https://dylan-etonno.pages.dev",
  /** {{À CONFIRMER PAR MAT}} — mois et année de mise en ligne réels. */
  livraison: "{{À CONFIRMER PAR MAT}}",
  capture: "/realisations/dylan-etonno.webp",
  captureLargeur: 390,
  captureHauteur: 844,
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
