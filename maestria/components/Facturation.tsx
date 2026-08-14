import { facturation, whatsappFacturation } from "@/lib/site";

/** Cible du lien du bandeau d'échéance. Factuel et borné : en 2026 il s'agit
 *  de RECEVOIR, pas d'émettre — confondre les deux serait vendre par la peur
 *  sur un point juridiquement faux. */
export function Facturation() {
  return (
    <section id="facture-electronique" className="band">
      <div className="band-inner">
        <p className="band-label">Factures électroniques</p>
        <div className="band-col">
          <h2>Ce qui change le {facturation.dateReception}</h2>

          <p>
            À cette date, votre entreprise doit pouvoir{" "}
            <strong className="font-semibold text-[var(--color-text)]">
              recevoir
            </strong>{" "}
            les factures de vos fournisseurs au format électronique. Pas par
            mail, pas en PDF : par une plateforme agréée par l&apos;État. Cela
            vaut quelle que soit votre taille, y compris en franchise de TVA.
          </p>

          <p>
            Ce que vous devez faire d&apos;ici là tient en une ligne : choisir
            votre plateforme. C&apos;est souvent votre logiciel de compta ou
            votre expert-comptable qui la fournit : il faut vérifier, pas
            supposer.
          </p>

          <p>
            Ce que vous n&apos;avez{" "}
            <strong className="font-semibold text-[var(--color-text)]">
              pas
            </strong>{" "}
            à faire tout de suite : émettre vos propres factures en
            électronique. Pour une TPE, c&apos;est le{" "}
            {facturation.dateEmissionTpe}. D&apos;ici là, aucun client ne peut
            vous l&apos;imposer.
          </p>

          <p className="!mt-8">
            <a
              href={whatsappFacturation}
              target="_blank"
              rel="noopener noreferrer"
              className="gem-quiet"
            >
              Savoir si vous êtes prêt
              <span aria-hidden="true">→</span>
            </a>
          </p>

          <p className="!mt-6 text-[0.8125rem] text-[var(--color-text-muted)]">
            Source :{" "}
            <a
              href={facturation.source}
              target="_blank"
              rel="noopener noreferrer"
              className="link tap"
            >
              impots.gouv.fr
            </a>
            . Je ne vends pas de plateforme et je ne touche rien dessus.
          </p>
        </div>
      </div>
    </section>
  );
}
