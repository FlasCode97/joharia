import { whatsappUrl } from "@/lib/site";

/** C'est l'argument le plus fort de la page. Il était en note de bas de
 *  section, introduit par « Si vous hésitez » : la formulation la plus faible
 *  possible. Il devient une section entière, traitée comme sur l'accueil. */
export function FabriquerDabord() {
  return (
    <section
      id="fabriquer-dabord"
      className="band bg-[var(--color-surface-raised)]"
    >
      <div className="band-inner">
        <p className="band-label">Sans risque pour vous</p>

        <div className="band-col">
          <h2>Je fabrique d&apos;abord. Vous décidez après.</h2>

          <p className="!text-[var(--color-text)]">
            Je peux construire une première version de votre site avant que
            vous vous engagiez à quoi que ce soit. Vous l&apos;ouvrez sur votre
            téléphone, vous la montrez à qui vous voulez, et vous me dites oui
            ou non.
          </p>

          <p>Si c&apos;est non, vous ne me devez rien et le sujet est clos.</p>

          <p className="!mt-8">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="gem"
            >
              Écrire sur WhatsApp
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
