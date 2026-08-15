import { whatsappConstruire } from "@/lib/site";

/** La section la plus importante de la page.
 *
 *  Mat n'a aucune installation chez un client : il ne peut donc rien prouver
 *  par la référence. Il le retourne en offre, et l'offre est vraie tant qu'il
 *  cherche son premier cas. Traitement typographique au niveau de la section
 *  prix, pas en note de bas de page. */
export function ConstruireDabord() {
  return (
    <section id="construire-dabord" className="band bg-[var(--color-surface-raised)]">
      <div className="band-inner">
        <p className="band-label">Sans risque pour vous</p>

        <div className="band-col">
          <h2>Je construis d&apos;abord. Vous payez si ça tourne.</h2>

          <p className="!text-[var(--color-text)]">
            Vous n&apos;avez aucune raison de me croire sur parole. Je ne vais
            pas vous demander de le faire.
          </p>

          <p>
            Donnez-moi une tâche et vos vrais dossiers : vos derniers devis, vos
            vrais montants, vos vraies factures. Je construis la machine, et je
            vous la montre en marche sur vos données à vous. Si elle ne fait pas
            le travail, vous ne payez rien et vous ne me devez rien.
          </p>

          <p>
            Je le fais parce que j&apos;ai besoin d&apos;un premier cas autant
            que vous avez besoin d&apos;être tranquille. Ça ne durera pas : le
            jour où les premières installations tournent chez des clients, je
            facturerai avant de construire, comme tout le monde.
          </p>

          {/* {{À CONFIRMER PAR MAT — seuil exact : « les premières », « trois
              installations », une date ? La phrase doit rester vraie.}} */}

          <p className="!mt-8">
            <a
              href={whatsappConstruire}
              target="_blank"
              rel="noopener noreferrer"
              className="gem"
            >
              Lui décrire ma tâche
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
