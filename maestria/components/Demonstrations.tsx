import { DemoDevis } from "./DemoDevis";
import { DemoRelance, DemoTri } from "./DemosAnimees";
import { whatsappAutomatisation } from "@/lib/site";

/** Les démonstrations. Aucun client n'a encore commandé d'automatisation :
 *  ces trois blocs sont donc la preuve, à la place d'une référence. Le
 *  visiteur manipule le premier, regarde les deux autres.
 *
 *  Trois secteurs différents, volontairement : garage, gîte, restaurant. */
export function Demonstrations() {
  return (
    <section id="demonstrations" className="band">
      <div className="band-inner">
        <p className="band-label">Voir avant de croire</p>

        <div className="band-col">
          <h2>Je préfère vous montrer</h2>
          <p>
            Je n&apos;ai encore installé d&apos;automatisation chez aucun
            client : c&apos;est nouveau dans ce que je propose. Alors plutôt
            que de vous raconter ce que ça donnerait, voilà les machines.
            Celle du dessous, vous pouvez l&apos;essayer.
          </p>
        </div>
      </div>

      {/* 1 — Manipulable. Garage. */}
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

      {/* 2 — Animée. Gîte. */}
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

      {/* 3 — Animée. Restaurant. */}
      <div className="border-t border-[var(--color-border)] bg-[var(--color-surface-raised)]">
        <div className="band-inner">
          <p className="band-label">Restaurant</p>
          <div className="band-col">
            <h3 className="!mt-0">
              La boîte mail se range avant que vous l&apos;ouvriez
            </h3>
            <p>
              Ce qui demande une réponse d&apos;un côté, ce qui part à la
              compta de l&apos;autre, le reste archivé. Vous n&apos;ouvrez que
              la première pile.
            </p>
            <DemoTri />

            <p className="!mt-8">
              <a
                href={whatsappAutomatisation}
                target="_blank"
                rel="noopener noreferrer"
                className="gem"
              >
                Me dire ce qui vous prend le plus de temps
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
