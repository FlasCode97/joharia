import Link from "next/link";
import { ChaineAutomatisation } from "./ChaineAutomatisation";
import { whatsappAutomatisation } from "@/lib/site";

/** Hero de la page principale — l'automatisation.
 *
 *  L'accroche est celle qui a le mieux tenu au test de substitution : deux
 *  chiffres, un écart, aucune explication. L'inconfort est dans le blanc
 *  entre les deux phrases. Elle serait fausse sur le site d'un éditeur de
 *  logiciel, ce qui est exactement ce qu'on cherche.
 *
 *  Le texte est rendu côté serveur et n'est jamais recouvert par la chaîne,
 *  qui occupe sa propre colonne — contraste garanti en toutes circonstances. */
export function Hero() {
  return (
    <section className="on-dark relative bg-[var(--color-surface-inverse)] text-[var(--color-text-inverse)]">
      <div className="mx-auto grid max-w-[78rem] items-center gap-10 px-6 pb-16 pt-10 md:grid-cols-[1.05fr_0.95fr] md:gap-12 md:px-12 md:pb-28 md:pt-20">
        <div className="max-w-[36rem]">
          <h1 className="font-[family-name:var(--font-display)] text-[clamp(2.25rem,7vw,4rem)] font-semibold leading-[1.03] tracking-[-0.025em] text-balance">
            Vous fermez à 19 h.
            <br />
            <span className="text-[var(--color-action-inverse)]">
              Vous finissez à 22 h.
            </span>
          </h1>

          <p className="mt-6 max-w-[34rem] text-[1.0625rem] leading-relaxed text-[var(--color-text-inverse-muted)] text-pretty md:text-lg">
            Je fabrique des machines qui font à votre place ce que vous refaites
            chaque semaine : les devis, les relances, les messages auxquels vous
            répondez pour la trentième fois. En Guadeloupe, un seul
            interlocuteur.
          </p>

          <ul className="mt-7 flex flex-col gap-x-6 gap-y-2 sm:flex-row sm:flex-wrap">
            <li>
              <a
                href="#demonstrations"
                className="tap group inline-flex items-baseline gap-2 text-[0.9375rem] text-[var(--color-text-inverse-muted)] transition-colors duration-150 hover:text-[var(--color-text-inverse)] active:opacity-70"
              >
                <span aria-hidden="true" className="text-[var(--color-action-inverse)]">↓</span>
                <span className="underline-offset-4 group-hover:underline">
                  Essayer une démonstration
                </span>
              </a>
            </li>
            <li>
              <Link
                href="/sites-web"
                className="tap group inline-flex items-baseline gap-2 text-[0.9375rem] text-[var(--color-text-inverse-muted)] transition-colors duration-150 hover:text-[var(--color-text-inverse)] active:opacity-70"
              >
                <span aria-hidden="true" className="text-[var(--color-action-inverse)]">→</span>
                <span className="underline-offset-4 group-hover:underline">
                  Je cherche plutôt un site
                </span>
              </Link>
            </li>
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            <a
              href={whatsappAutomatisation}
              target="_blank"
              rel="noopener noreferrer"
              className="gem"
            >
              Écrire sur WhatsApp
            </a>
          </div>
        </div>

        {/* La chaîne : message reçu → lu → devis envoyé → relance prévue.
            Hauteur réservée, aucun décalage au chargement. */}
        <div
          data-pause-hors-champ
          className="flex min-h-[13rem] items-center justify-center md:min-h-[16rem]"
        >
          <ChaineAutomatisation />
        </div>
      </div>
    </section>
  );
}
