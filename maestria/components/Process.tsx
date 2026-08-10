const etapesSite = [
  {
    titre: "On s'écrit sur WhatsApp",
    texte:
      "Vous me dites ce que vous faites et ce qui vous manque. Dix minutes, ça ne vous engage à rien.",
  },
  {
    titre: "Je vous envoie une proposition écrite",
    texte:
      "Ce que je fais, ce que ça coûte, quand c'est prêt. Un prix ferme, pas une fourchette.",
  },
  {
    titre: "Je fabrique, et je vous montre avant que ce soit public",
    texte: "Vous corrigez, on ajuste. Rien n'est en ligne sans votre accord.",
  },
  {
    titre: "Je mets en ligne et je m'occupe de l'hébergement",
    texte:
      "Vous recevez le lien. Vous pouvez l'envoyer à vos clients le jour même.",
  },
];

/* Le parcours automatisation ne part pas d'une page à fabriquer mais d'une
   tâche à décrire. Première étape différente, et une étape de surveillance
   à la fin qui n'existe pas pour un site. */
const etapesAuto = [
  {
    titre: "Vous me montrez la tâche, telle que vous la faites",
    texte:
      "En vocal, en photo du carnet, ou en partageant l'écran cinq minutes. Je regarde comment vous faites vraiment, pas comment ça devrait se faire.",
  },
  {
    titre: "Je vous dis ce qui est automatisable, et ce qui ne l'est pas",
    texte:
      "Certaines tâches ne valent pas le coup. Je vous le dis avant que vous payiez, pas après.",
  },
  {
    titre: "Je fabrique et on teste sur vos vrais dossiers",
    texte:
      "Pas sur un exemple. Sur vos derniers devis, vos vrais clients, vos vrais montants.",
  },
  {
    titre: "Ça tourne, et je surveille que ça continue de tourner",
    texte:
      "Une automatisation qui casse en silence est pire que pas d'automatisation. Si ça s'arrête, je le vois.",
  },
];

/** Séquences ordonnées sémantiquement (<ol> pour les lecteurs d'écran), mais
 *  sans numéros affichés : la hiérarchie passe par les filets, comme partout
 *  ailleurs sur la page. */
export function Process() {
  return (
    <section id="comment" className="band">
      <div className="band-inner">
        <p className="band-label">Comment ça se passe</p>

        <div className="band-col">
          <h2>Du premier message à la mise en ligne</h2>
          <p>Pour un site.</p>
          <Etapes etapes={etapesSite} />
        </div>
      </div>

      <div className="border-t border-[var(--color-border)] bg-[var(--color-surface-raised)]">
        <div className="band-inner">
          <p className="band-label">Et pour une tâche</p>
          <div className="band-col">
            <h3 className="!mt-0">
              Quand il s&apos;agit d&apos;arrêter de refaire la même chose
            </h3>
            <p>
              Le parcours n&apos;est pas le même : on ne part pas d&apos;une page
              à fabriquer, mais d&apos;une tâche que vous faites déjà.
            </p>
            <Etapes etapes={etapesAuto} />

            <p className="!mt-10 font-[family-name:var(--font-display)] text-[1.35rem] leading-snug !text-[var(--color-text)]">
              Si vous hésitez, je peux fabriquer une première version de votre
              site avant que vous décidiez quoi que ce soit. Vous la regardez, et
              vous me dites oui ou non.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Etapes({ etapes }: { etapes: { titre: string; texte: string }[] }) {
  return (
    <ol className="!mt-8 list-none">
      {etapes.map((e) => (
        <li
          key={e.titre}
          className="border-t border-[var(--color-border)] py-5 first:border-t-0 first:pt-0"
        >
          <h3 className="!mt-0 text-[1.15rem]">{e.titre}</h3>
          <p className="mt-2">{e.texte}</p>
        </li>
      ))}
    </ol>
  );
}
