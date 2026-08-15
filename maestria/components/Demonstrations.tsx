import { DemoDevis } from "./DemoDevis";
import { DemoRelance, DemoImpaye } from "./DemosAnimees";
import { whatsappAutomatisation } from "@/lib/site";

/** Placée juste après le hero : c'est le seul actif de preuve du site, et
 *  personne n'a jamais vendu ça au visiteur. On ne nomme pas la catégorie
 *  technique, on montre.
 *
 *  Trois métiers qui font de vrais devis et courent après de vrais paiements :
 *  garage (manipulable), gîte, artisan du bâtiment. */
export function Demonstrations() {
  return (
    <section id="demonstrations" className="band">
      <div className="band-inner">
        <p className="band-label">Voir avant de croire</p>

        <div className="band-col">
          <h2>Je préfère vous montrer</h2>
          <p>
            Je n&apos;ai pas encore de client à vous citer. Alors je ne vous
            raconte rien : essayez. Écrivez ce qu&apos;un de vos clients vous
            écrirait. Le devis sort pendant que vous lisez cette phrase.
          </p>
        </div>
      </div>

      {/* 1. Manipulable. Garage. */}
      <div className="border-t border-[var(--color-border)] bg-[var(--color-surface-raised)]">
        <div className="band-inner">
          <p className="band-label">Garage</p>
          <div className="band-col">
            <h3 className="!mt-0">Un client demande un prix. Le devis sort.</h3>
            <p>
              Écrivez ce qu&apos;un client vous écrirait, et regardez. Essayez
              « vidange », « freins », « pneus », « révision », « clim », ou
              votre propre phrase.
            </p>
            <DemoDevis />
          </div>
        </div>
      </div>

      {/* 2. Animée. Gîte. */}
      <div className="border-t border-[var(--color-border)]">
        <div className="band-inner">
          <p className="band-label">Gîte</p>
          <div className="band-col">
            <h3 className="!mt-0">
              Le devis part. Vous ne pensez plus à relancer.
            </h3>
            <p>
              C&apos;est là que l&apos;argent se perd : pas au moment du devis,
              trois jours après, quand personne n&apos;a rappelé.
            </p>
            <DemoRelance />
          </div>
        </div>
      </div>

      {/* 3. Animée. Artisan, BTP. Le poste où l'argent se perd vraiment. */}
      <div className="border-t border-[var(--color-border)] bg-[var(--color-surface-raised)]">
        <div className="band-inner">
          <p className="band-label">Artisan, BTP</p>
          <div className="band-col">
            <h3 className="!mt-0">
              Le chantier est fini. La facture est partie. Trois semaines plus
              tard, elle n&apos;est toujours pas payée.
            </h3>
            <p>
              C&apos;est le poste où l&apos;argent se perd vraiment. Pas au
              moment du devis : à l&apos;échéance, quand personne n&apos;a
              rappelé.
            </p>
            <DemoImpaye />

            <p className="!mt-6 font-[family-name:var(--font-display)] text-[1.3rem] leading-snug !text-[var(--color-text)]">
              Vous n&apos;avez passé aucun appel, et vous n&apos;avez pas eu à
              jouer le mauvais rôle.
            </p>

            <p className="!mt-8 text-[0.9375rem]">
              Décrivez votre tâche en deux lignes. Je vous montre la machine
              avant qu&apos;on parle d&apos;argent.
            </p>
            <p className="!mt-4">
              <a
                href={whatsappAutomatisation}
                target="_blank"
                rel="noopener noreferrer"
                className="gem"
              >
                Écrire sur WhatsApp
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
